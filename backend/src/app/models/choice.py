from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, Text, DateTime, Time
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.sql.schema import Table

from app.models.base import Base
from app.models.answer import Answer
from app.models.question import Question
from app.models.examinee import Examinee


class Choice(Base):
    __tablename__ = 'Choice'
    question_id = Column(Integer, ForeignKey(Question.question_id))
    answer_id = Column(Integer, ForeignKey(Answer.answer_id))
    examinee_account_id = Column(Integer, ForeignKey(Examinee.account_id))
    question = relationship('Question',  foreign_keys=[
        question_id], primaryjoin="Choice.question_id==Question.question_id", lazy="immediate")
    answer = relationship('Answer',  foreign_keys=[
        answer_id], primaryjoin="Choice.answer_id==Answer.answer_id", lazy="immediate")
    examinee = relationship('Examinee',  foreign_keys=[
        examinee_account_id], primaryjoin="Choice.examinee_account_id==Examinee.account_id", lazy="immediate")
