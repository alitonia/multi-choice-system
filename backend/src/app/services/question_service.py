from typing import List
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.question import Question
from sqlalchemy.future import select


async def get_questions(session: AsyncSession):
    result = await session.execute(select(Question))
    return result.scalars().all()
