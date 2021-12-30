from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.exam import Exam
from app.models.examiner import Examiner
from app.models.examinee import Examinee

from app.models.account import Account
from app.models.question import Question
from app.models.participant import Participant

from sqlalchemy.future import select
from sqlalchemy import update, delete, text, desc, asc, func

import datetime
from dateutil import parser
from fastapi.encoders import jsonable_encoder


class Exam_Service:
    def __init__(self, session):
        self.session = session

    # GET one exam
    async def get_one_exam(self, exam_id: int, account):
        # Will need to check jwt to differentiate users

        q = (
            select(Exam, Examiner, Account, Question)
                .join(Examiner, Examiner.account_id == Exam.creator)
                .join(Account, Account.account_id == Examiner.account_id)
                .join(Question, Question.exam_id == Exam.exam_id, isouter=True)
        )

        if account is not None:
            role_name = account["role"]["name"]

            if role_name == 'examiner':
                q = q.where(Examiner.account_id == account["account_id"])
            elif role_name == 'examinee':
                q = q = (
                    q.join(Participant, Participant.exam_id == Exam.exam_id)
                        .where(Participant.examinee_account_id == account["account_id"])
                )

        q = q.where(Exam.exam_id == exam_id)

        result_iter = await self.session.execute(q)
        result_list = [tup for tup in result_iter]

        if len(result_list) == 0:
            return None

        result = result_list[0]
        questions = [question.question_id for (_, _, _, question) in result_list if question is not None]

        exam, examiner, account, _ = result
        exam.creator = examiner
        examiner.name = account.name
        exam.questions = questions
        return exam

    # GET
    async def get_exams(
            self,
            account,
            skip: int = 0,
            limit: int = 15,
            sort: str = None
    ):
        # Will need to check jwt to differentiate users
        q = select(Exam).limit(limit).offset(skip)
        role_name = account["role"]["name"]

        if role_name == 'examiner':
            q = q.where(Exam.creator == account["account_id"])
        elif role_name == 'examinee':
            q = (
                q.join(Participant, Participant.exam_id == Exam.exam_id)
                    .where(Participant.examinee_account_id == account["account_id"])
            )
        if sort == 'name':
            q = q.order_by(asc(Exam.exam_name))
        elif sort == 'recent':
            q = q.order_by(desc(Exam.start_time))

        result = await self.session.execute(q)
        return result.scalars().all()

    async def get_exams_count(
            self,
            account,
    ):
        # Will need to check jwt to differentiate users
        q = select(func.count(Exam.exam_id))
        role_name = account["role"]["name"]

        if role_name == 'examiner':
            q = q.where(Exam.creator == account["account_id"])
        elif role_name == 'examinee':
            q = (
                q.join(Participant, Participant.exam_id == Exam.exam_id)
                    .where(Participant.examinee_account_id == account["account_id"])
            )

        result = await self.session.execute(q)
        print(result)
        return {"total": result.scalar()}

    # POST
    async def add_exam(self,
                       exam_name,
                       subject,
                       start_time,
                       duration,
                       creator
                       ):
        new_q = Exam(
            exam_name=exam_name,
            subject=subject,
            start_time=parser.parse(start_time).replace(tzinfo=None),
            duration=datetime.datetime.strptime(duration, "%H:%M"),
            creator=creator
        )
        self.session.add(new_q)
        await self.session.commit()
        return new_q

    # PUT
    async def edit_exam(self,
                        exam_id,
                        exam_name,
                        subject,
                        start_time,
                        duration,
                        ):
        q = (update(Exam).where(Exam.exam_id == exam_id)
             .values(exam_name=exam_name)
             .values(subject=subject)
             .values(start_time=parser.parse(start_time).replace(tzinfo=None))
             .values(duration=datetime.datetime.strptime(duration, "%H:%M"))
             )
        q.execution_options(synchronize_session="fetch")
        await self.session.execute(q)
        await self.session.commit()
        return await self.get_one_exam(exam_id, None)

    # DELETE
    async def delete_exam(self, exam_id):
        q = (
            delete(Exam).where(Exam.exam_id == int(exam_id))
        )
        await self.session.execute(q)
        await self.session.commit()
        return {"status": "OK"}

    async def get_uniq_not_added_examinees(self, exam_id, emails):
        # extremely poor support for membership and list
        q = text(f"""
        SELECT examinee_account_id FROM Participant
        inner join Account on Participant.examinee_account_id = Account.account_id
        where exam_id={exam_id} 
        and Account.email in ({','.join([f"'{str(email)}'" for email in emails])})
        """)
        result_iter = await self.session.execute(q)
        print(q)
        return [x.examinee_account_id for x in result_iter]

    async def get_ids_from_email(self, exam_id, emails):
        # extremely poor support for membership and list
        q = text(f"""
        SELECT account_id FROM Account
        where Account.email in ({','.join([f"'{str(email)}'" for email in emails])})
        """)
        result_iter = await self.session.execute(q)
        print(q)
        return [x.account_id for x in result_iter]

    # POST + PUT
    async def add_examinees(self, exam_id, emails):
        dup_participants = await self.get_uniq_not_added_examinees(exam_id, emails)
        account_id_list = await self.get_ids_from_email(exam_id, emails)

        participants = [
            Participant(
                exam_id=exam_id,
                examinee_account_id=examinee_id
            ) for examinee_id in account_id_list
            if examinee_id not in dup_participants
        ]
        for p in participants:
            self.session.add(p)

        await self.session.commit()
        return {"status": "OK"}

    async def remove_examinees(self, exam_id, emails):
        account_id_list = await self.get_ids_from_email(exam_id, emails)

        q = text(f"""
        DELETE FROM Participant
        where exam_id={exam_id} 
        and examinee_account_id in ({','.join([str(id) for id in account_id_list])})

        """)

        await self.session.execute(q)
        await self.session.commit()
        return {"status": "OK"}

    # GET
    async def check_exam_viewer(self, exam_id: int, account):
        role_name = account["role"]["name"]

        q = None
        if role_name == 'examiner':
            q = (
                select(Exam, Examiner)
                    .join(Examiner, Examiner.account_id == Exam.creator)
                        .where(Exam.creator == account["account_id"])
            )
        elif role_name == 'examinee':
            q = (
                select(Exam, Participant)
                    .join(Participant, Participant.exam_id == Exam.exam_id)
                        .where(Participant.examinee_account_id == account["account_id"])
            )

        if(exam_id > 0):
            q = q.where(Exam.exam_id == exam_id)

        result_iter = await self.session.execute(q)
        result_list = [tup for tup in result_iter]

        if len(result_list) == 0:
            return False

        return True

    async def generic_participant(self, exam_id, equal=True):
        print(exam_id)
        q = (
            select(Account, Examinee)
                .join(Examinee, Examinee.account_id == Account.account_id)
                .join(Participant, Participant.examinee_account_id == Examinee.account_id)
        )
        if exam_id is not None:
            if equal is True:
                q = q.where(Participant.exam_id == int(exam_id))
            else:
                q = q.where(Participant.exam_id != int(exam_id))

        else:
            return []

        result_iter = await self.session.execute(q)
        result_list = [x for x in result_iter]
        return_list = []

        for (account, examinee_info) in result_list:
            filtered_account = Account(
                account_id=account.account_id,
                email=account.email,
                name=account.name,
                date_of_birth=account.date_of_birth,
                phone_number=account.phone_number,
                role_id=account.role_id,
            )

            filtered_account.additional_info = examinee_info
            json_account = jsonable_encoder(filtered_account)

            json_account["date_of_birth"] = (
                datetime.datetime.strptime(json_account["date_of_birth"], "%Y-%m-%d")
                    .strftime("%d-%m-%Y")
            )
            return_list.append(json_account)

        await self.session.commit()
        return return_list

    async def get_examinees(self, exam_id):
        return await self.generic_participant(exam_id, True)

    async def get_non_examinees(self, exam_id):
        return await self.generic_participant(exam_id, False)
