from typing import List
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.question import Question
from app.models.question_group import Question_Group
from app.models.question_type import Question_Type
from app.models.answer import Answer
from app.models.participant import Participant
from app.models.examinee import Examinee
from app.models.exam import Exam

from app.utils.unique_list import unique
from app.utils.dict_list import DictList

from sqlalchemy.future import select
from sqlalchemy import update, delete, text


class ExamAnalyticService:
    def __init__(self, session):
        self.session = session

    async def get_all_progress_by_examinee(self, exam_id, account_id):
        q = text(f"""
            SELECT 
            Account.email,
            Account.phone_number,
            count(DISTINCT Choice.question_id)
            FROM Exam
            inner join Question on Exam.exam_id = Question.exam_id
            inner join Choice on Choice.question_id = Question.question_id
            inner join Account on Account.account_id = Choice.examinee_account_id
            where Exam.exam_id = {exam_id} and Exam.creator = {account_id}

            group by (
            Account.email, Account.phone_number
            )
            """
                 )
        result_iter = await self.session.execute(q)
        raw_list = [x for x in result_iter]

        processed_dict = []
        for (email, phone_number, count) in raw_list:
            processed_dict.append({
                "email": email,
                "phone_number": phone_number,
                "question_count": count
            })

        return processed_dict

    async def get_all_progress_by_question(self, exam_id, account_id):
        q = text(f"""
            SELECT 
            Question.question_id,
            Answer.answer_id,
            count(DISTINCT Choice.examinee_account_id)
            FROM Exam
            inner join Question     on Exam.exam_id = Question.exam_id
            inner join Answer       on Question.question_id = Answer.question_id
            left outer join Choice  on Choice.answer_id = Answer.answer_id   
            where Exam.exam_id = {exam_id} 
                and Exam.creator = {account_id}
            
            group by (
                Question.question_id,
                Answer.answer_id
            )
            order by Question.question_id, Answer.answer_id
            """
                 )
        result_iter = await self.session.execute(q)
        raw_list = [x for x in result_iter]

        processed_dict = []
        for (question_id, answer_id, count) in raw_list:
            processed_dict.append({
                "question_id": question_id,
                "answer_id": answer_id,
                "answer_count": count
            })

        return processed_dict
