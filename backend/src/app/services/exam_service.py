from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.exam import Exam
from app.models.examiner import Examiner
from app.models.account import Account
from app.models.question import Question
from app.models.participant import Participant

from sqlalchemy.future import select
from sqlalchemy import update, delete, text, desc, asc

import datetime
from dateutil import parser


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

    async def get_uniq_not_added_examinees(self, exam_id, examinee_ids):
        # extremely poor support for membership and list

        q = text(f"""
        SELECT examinee_account_id FROM Participant
        where exam_id={exam_id} 
        and examinee_account_id in ({','.join([str(id) for id in examinee_ids])})

        """)
        result_iter = await self.session.execute(q)
        print(q)
        return [x.examinee_account_id for x in result_iter]

    # POST + PUT
    async def add_examinees(self, exam_id, examinee_ids):
        dup_participants = await self.get_uniq_not_added_examinees(exam_id, examinee_ids)

        participants = [
            Participant(
                exam_id=exam_id,
                examinee_account_id=examinee_id
            ) for examinee_id in examinee_ids
            if examinee_id not in dup_participants
        ]
        for p in participants:
            self.session.add(p)

        await self.session.commit()
        return {"status": "OK"}

    async def remove_examinees(self, exam_id, examinee_ids):
        q = text(f"""
        DELETE FROM Participant
        where exam_id={exam_id} 
        and examinee_account_id in ({','.join([str(id) for id in examinee_ids])})

        """)

        await self.session.execute(q)
        await self.session.commit()
        return {"status": "OK"}
