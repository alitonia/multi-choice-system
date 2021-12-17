from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, Text, DateTime, Time
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Exam(Base):
    __tablename__ = 'Exam'
    exam_id = Column(Integer, primary_key=True)
    exam_name = Column(String(50), nullable=False)
    subject = Column(String(50), nullable=False)
    start_time = Column(DateTime, nullable=False)
    duration = Column(Time, nullable=False)
    creator = Column(Integer, ForeignKey('Examiner.account_id'))
