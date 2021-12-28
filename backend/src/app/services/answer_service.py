from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.exam import Exam
from app.models.examiner import Examiner
from app.models.account import Account
from app.models.question import Question
from app.models.participant import Participant
from app.models.answer import Answer

from sqlalchemy.future import select
from sqlalchemy import update, delete, text

import datetime
from dateutil import parser


class Answer_Service:
    def __init__(self, session):
        self.session = session

    # GET one answer
    async def get_one_answer(self, answer_id: int):
        # Will need to check jwt to differentiate users

        q = (
            select(Answer)
                .where(Answer.answer_id == answer_id)
        )

        result_iter = await self.session.execute(q)

        return result_iter.scalar()

    # POST
    async def add_answer(self,
                         content,
                         is_correct,
                         question_id,
                         ):
        new_q = Answer(
            content=content,
            is_correct=is_correct,
            question_id=question_id,
        )
        self.session.add(new_q)
        await self.session.commit()
        return new_q

    # PUT
    async def edit_answer(self,
                        answer_id,
                        content,
                        is_correct,
                        ):
        q = (update(Answer).where(Answer.answer_id == answer_id)
             .values(content=content)
             .values(is_correct=is_correct)
             )
        q.execution_options(synchronize_session="fetch")
        await self.session.execute(q)
        await self.session.commit()
        return await self.get_one_answer(answer_id)

    # DELETE
    async def delete_answer(self, answer_id):
        q = (
            delete(Answer).where(Answer.answer_id == int(answer_id))
        )
        await self.session.execute(q)
        await self.session.commit()
        return {"status": "OK"}
