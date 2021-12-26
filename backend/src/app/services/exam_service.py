from typing import List, Optional

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.models.exam import Exam
from app.models.examiner import Examiner
from app.models.account import Account
from app.models.question import Question
from app.models.participant import Participant


class Exam_Service:
    def __init__(self, session):
        self.session = session

    # GET one exam
    async def get_one_exam(self, exam_id: int):
        # Will need to check jwt to differentiate users
        result_iter = await self.session.execute(
            select(Exam, Examiner, Account, Question)
            .join(Examiner, Examiner.account_id == Exam.creator)
            .join(Account, Account.account_id == Examiner.account_id)
            .join(Question, Question.exam_id == Exam.exam_id, isouter=True)
            .where(Exam.exam_id == exam_id)
        )
        result_list = [tup for tup in result_iter]

        if len(result_list) == 0:
            return None

        result = result_list[0]
        questions = [question.question_id for (
            _, _, _, question) in result_list if question is not None]

        exam, examiner, account, _ = result
        exam.creator = examiner
        examiner.name = account.name
        exam.questions = questions
        return exam

    # GET
    async def get_exams(
            self,
            skip: int = 0,
            limit: int = 15,
    ):
        # Will need to check jwt to differentiate users
        result = await self.session.execute(
            select(Exam).limit(limit).offset(skip)
        )
        return result.scalars().all()

    async def get_participant_exam(self, exam_id: int, examinee_id: int) -> Optional[Participant]:
        result = await self.session.execute(select(Participant).where(Participant.exam_id == exam_id, Participant.examinee_account_id == examinee_id))
        return result.scalars().first()

        # # POST
        # async def add_question(self, question_content, exam_id, question_group_id, question_type_id):
        #     new_q = Question(
        #         question_content=question_content,
        #         exam_id=exam_id,
        #         question_group_id=question_group_id,
        #         question_type_id=question_type_id
        #     )
        #     self.session.add(new_q)
        #     await self.session.commit()
        #
        # # PUT
        # async def edit_question(self, question_id, question_content, question_group_id, question_type_id):
        #     q = (update(Question).where(Question.question_id == question_id)
        #          .values(question_content=question_content)
        #          .values(question_group_id=question_group_id)
        #          .values(question_type_id=question_type_id)
        #          )
        #     q.execution_options(synchronize_session="fetch")
        #     await self.session.execute(q)
        #     await self.session.commit()
        #
        # # DELETE
        # async def delete_question(self, question_id):
        #     q = delete(Question).where(Question.question_id == question_id)
        #     await self.session.execute(q)
        #     await self.session.commit()
