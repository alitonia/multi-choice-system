from typing import List

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql.expression import delete

from app.models.choice import Choice


async def save_choices(session: AsyncSession, question_id: int, answers_id: List[int], examinee_id: int):
    for answer_id in answers_id:
        choice = Choice()
        choice.answer_id = answer_id
        choice.question_id = question_id
        choice.examinee_account_id = examinee_id
        session.add(choice)

    await session.commit()


async def delete_choices(session: AsyncSession, question_id: int, examinee_id: int):
    await session.execute(delete(Choice).where(Choice.question_id == question_id, Choice.examinee_account_id == examinee_id))
