from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, Text, DateTime, Time
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.sql.schema import PrimaryKeyConstraint, Table

from app.models.base import Base
from app.models.answer import Answer
from app.models.question import Question
from app.models.examinee import Examinee
from app.models.exam import Exam


class ParticipantExam(Base):
    __tablename__ = 'participant_exam'
    __table_args__ = (PrimaryKeyConstraint('exam_id', 'examinee_account_id'),)
    exam_id = Column(Integer, ForeignKey(Exam.exam_id))
    examinee_account_id = Column(Integer, ForeignKey(Examinee.account_id))
    status = Column(Integer)  # 1 = in progress  2 = finished
    score = Column(Integer)
    exam = relationship('Answer',  foreign_keys=[
        exam_id], primaryjoin="Participant.exam_id==Exam.exam_id", lazy="immediate")
    examinee = relationship('Examinee',  foreign_keys=[
        examinee_account_id], primaryjoin="Exam.examinee_account_id==Examinee.account_id", lazy="immediate")
