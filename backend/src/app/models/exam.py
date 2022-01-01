from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, Text, DateTime, Time
from sqlalchemy.orm import relationship
from .examiner import Examiner

from app.models.base import Base


class Exam(Base):
    __tablename__ = 'Exam'
    # Prevent query using double quote in query
    __table_args__ = {'quote': False}
    exam_id = Column(Integer, primary_key=True)
    exam_name = Column(String(50), nullable=False)
    subject = Column(String(50), nullable=False)
    start_time = Column(DateTime, nullable=False)
    duration = Column(Time, nullable=False)
    creator = Column(Integer, ForeignKey(Examiner.account_id))
