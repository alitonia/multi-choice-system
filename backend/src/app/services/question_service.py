from typing import List
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.question import Question
from app.models.question_group import Question_Group
from app.models.question_type import Question_Type
from app.models.answer import Answer

from app.utils.unique_list import unique
from app.utils.dict_list import DictList

from sqlalchemy.future import select
from sqlalchemy import update, delete


class Question_Service:
    def __init__(self, session):
        self.session = session

    def get_generic_questions_query(self):
        return (
            select(Question, Question_Group, Question_Type, Answer)
                .join(Question_Group, Question.question_group_id == Question_Group.question_group_id)
                .join(Question_Type, Question.question_type_id == Question_Type.question_type_id)
                .join(Answer, Answer.question_id == Question.question_id, isouter=True)
        )

    # GET
    async def get_question(self, question_id: int):
        resultIter = await self.session.execute(
            self.get_generic_questions_query()
                .where(Question.question_id == question_id)
        )

        resultList = [t for t in resultIter]
        question_group = unique([q for (_, q, _, _) in resultList])
        question_type = unique([q for (_, _, q, _) in resultList])
        answers = [q for (_, _, _, q) in resultList]

        result = resultList[0] if len(resultList) > 0 else None
        if result is None:
            return None

        (question_body, _, _, _) = result

        question_body.question_group = question_group
        question_body.question_type = question_type
        question_body.answers = answers if answers != [None] else []

        return question_body

    # GET
    async def get_questions(self, skip, limit, exam_id):
        print(exam_id)
        q = (
            self.get_generic_questions_query()
        )
        if exam_id is not None:
            q = q.where(Question.exam_id == exam_id)

        resultIter = await self.session.execute(
            q
        )
        resultList = [t for t in resultIter]
        question_group_dict = DictList(unique=True)
        question_type_dict = DictList(unique=True)
        answer_dict = DictList(unique=True)
        uniq_questions = unique([q for (q, _, _, _) in resultList])

        for (q, question_group, question_type, answer) in resultList:
            question_group_dict.add(q.question_id, question_group)
            question_type_dict.add(q.question_id, question_type)
            answer_dict.add(q.question_id, answer)

        for q in uniq_questions:
            q.question_group = question_group_dict.get(q.question_id)
            q.question_type = question_type_dict.get(q.question_id)
            q.answers = answer_dict.get(q.question_id)
            if q.answers == [None]:
                q.answers = []

        return uniq_questions

    # POST
    async def add_question(self, question_content, exam_id, question_group_id, question_type_id):
        new_q = Question(
            question_content=question_content,
            exam_id=exam_id,
            question_group_id=question_group_id,
            question_type_id=question_type_id
        )
        self.session.add(new_q)
        await self.session.commit()

    # PUT
    async def edit_question(self, question_id, question_content, question_group_id, question_type_id):
        q = (update(Question).where(Question.question_id == question_id)
             .values(question_content=question_content)
             .values(question_group_id=question_group_id)
             .values(question_type_id=question_type_id)
             )
        q.execution_options(synchronize_session="fetch")
        await self.session.execute(q)
        await self.session.commit()

    # DELETE
    async def delete_question(self, question_id):
        q = delete(Question).where(Question.question_id == question_id)
        await self.session.execute(q)
        await self.session.commit()

    # GET
    async def check_question_viewer(self, question_id: int, exam_id: int, account):
        role_name = account["role"]["name"]

        q = None
        if role_name == 'examiner':
            q = (
                select(Question, Exam, Examiner)
                    .join(Exam, Question.exam_id == Exam.exam_id)
                    .join(Examiner, Examiner.account_id == Exam.creator)
                        .where(Exam.creator == account["account_id"])
            )
        elif role_name == 'examinee':
            q = (
                select(Question, Exam, Participant)
                    .join(Exam, Question.exam_id == Exam.exam_id)
                    .join(Participant, Participant.exam_id == Exam.exam_id)
                        .where(Participant.examinee_account_id == account["account_id"])
            )

        if(question_id > 0):
            q = q.where(Question.question_id == question_id)

        if(exam_id > 0):
            q = q.where(Exam.exam_id == exam_id)

        result_iter = await self.session.execute(q)
        result_list = [tup for tup in result_iter]

        if len(result_list) == 0:
            return False

        return True
