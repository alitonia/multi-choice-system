from typing import List
from sqlalchemy.ext.asyncio import AsyncSession

from app.utils.unique_list import unique
from app.utils.dict_list import DictList

from sqlalchemy.future import select
from sqlalchemy import update, delete, text
from app.utils.unique_list import unique


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

    async def get_complete_percent(self, exam_id, account_id):
        q = text(f"""
        with all_correct_choices as(
            SELECT 
                Account.account_id,
                Choice.question_id,
                Choice.answer_id,
                Question_type.description
                FROM Exam
                inner join Question on Exam.exam_id = Question.exam_id
                inner join Answer on Answer.question_id = Question.question_id
                inner join Choice on Answer.answer_id = Choice.answer_id
                inner join Account on Account.account_id = Choice.examinee_account_id
                inner join Question_type on Question.question_type_id = Question_type.question_type_id
                where Exam.exam_id = {exam_id} 
                    and Answer.is_correct = TRUE
                    and Exam.creator = {account_id}
        ),
        correct_answers as(
                SELECT 
                Question.question_id,
                Answer.answer_id,
                Question_type.description
                FROM Exam
                inner join Question on Exam.exam_id = Question.exam_id
                inner join Answer on Answer.question_id = Question.question_id
                inner join Question_type on Question.question_type_id = Question_type.question_type_id
                where Exam.exam_id = {exam_id} 
                    and Answer.is_correct = TRUE
                    and Exam.creator = {account_id}
        ),
        correct_answer_count as (
            SELECT correct_answers.question_id,
            correct_answers.description,
            count(DISTINCT correct_answers.answer_id)
            from correct_answers
            group by (
            correct_answers.question_id,
            correct_answers.description
            )
        ),
        correct_choice_count as(
            select account_id,question_id, count(*)
            from all_correct_choices
            group by (
                account_id,question_id
            )
            order by account_id, question_id
        ),
        count_correct_question_per_account as (
            select account_id, count(correct_choice_count.question_id)
            from correct_choice_count, correct_answer_count 
            where 
            correct_choice_count.question_id = correct_answer_count.question_id
            and correct_choice_count.count = correct_answer_count.count
            group by (account_id)
        ),
        count_all_questions as(
            select count(*) as total_question
             from question
             where question.exam_id = {exam_id}
        )
        select count_correct_question_per_account.account_id,
        (cast(count_correct_question_per_account.count as decimal)/ count_all_questions.total_question
        ) as percent
        from count_correct_question_per_account, count_all_questions;    
            """
                 )
        result_iter = await self.session.execute(q)

        raw_list = [x for x in result_iter]

        processed_dict = []
        for (account_id, percent) in raw_list:
            processed_dict.append({
                "account_id": account_id,
                "percent": percent,
            })

        return processed_dict

    async def get_scores(self, exam_id, account_id):
        percent_dicts = await self.get_complete_percent(exam_id, account_id)

        processed_dict = []
        for pd in percent_dicts:
            processed_dict.append({
                "account_id": pd["account_id"],
                "score": pd["percent"] * 10,
            })

        return processed_dict

    async def get_score_overview(self, exam_id, account_id):
        score_dicts = await self.get_scores(exam_id, account_id)
        scores = [x["score"] for x in score_dicts]

        avg_s = sum(scores) / len(scores)
        min_s = min(scores)
        max_s = max(scores)

        unq_scores = unique(scores)
        unq_scores.sort()

        count_dict = dict({})
        for score in unq_scores:
            count_dict[score] = scores.count(score)

        return {
            "avg_score": avg_s,
            "min_score": min_s,
            "max_score": max_s,
            "distribution": count_dict
        }
