from typing import List
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.student import StudentModel
from sqlalchemy.future import select


# legacy for demonstration purpose only
async def get_students(session: AsyncSession, academy_id: int) -> List[StudentModel]:
    result = await session.execute(select(StudentModel).where(StudentModel.academy_id == academy_id))
    return result.scalars().all()
