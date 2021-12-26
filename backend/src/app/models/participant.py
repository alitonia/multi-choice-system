from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, Text, DateTime, Time
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.sql.schema import Table

from app.models.base import Base
from app.models.answer import Answer
from app.models.question import Question
from app.models.examinee import Examinee
from app.models.exam import Exam


class Participant(Base):
    __tablename__ = 'Exam'
    exam_id = Column(Integer, ForeignKey(Exam.exam_id))
    examinee_account_id = Column(Integer, ForeignKey(Examinee.account_id))
    Exam = relationship('Answer',  foreign_keys=[
        exam_id], primaryjoin="Participant.exam_id==Exam.exam_id", lazy="immediate")
    Examinee = relationship('Examinee',  foreign_keys=[
        examinee_account_id], primaryjoin="Exam.examinee_account_id==Examinee.account_id", lazy="immediate")
