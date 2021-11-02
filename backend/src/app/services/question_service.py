from typing import List
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.question import Question
from sqlalchemy.future import select
from sqlalchemy import update, delete


class Question_Service:
    def __init__(self, session):
        self.session = session

    # GET
    async def get_questions(self):
        result = await self.session.execute(select(Question).limit(10))
        return result.scalars().all()

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
