from typing import List, Optional

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql.expression import delete, select

from app.models.participant_exam import ParticipantExam


async def get_participant_exam(session: AsyncSession, exam_id: int, examinee_id: int) -> Optional[ParticipantExam]:
    result = await session.execute(select(ParticipantExam).where(ParticipantExam.exam_id == exam_id, ParticipantExam.examinee_account_id == examinee_id))
    return result.scalars().first()


async def create_participant_exam(session: AsyncSession, exam_id: int, examinee_id: int):
    exam = ParticipantExam()
    exam.exam_id = exam_id
    exam.examinee_account_id = examinee_id
    exam.score = 0
    exam.status = 1
    session.add(exam)
    await session.commit()


async def finish_participant_exam(session: AsyncSession, participant_exam: ParticipantExam,  score: int):
    participant_exam.score = score
    participant_exam.status = 2
    await session.commit()
