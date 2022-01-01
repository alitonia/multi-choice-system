from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, Text, DateTime, Time
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.sql.schema import Table

from app.models.base import Base
from .question import Question




class Answer(Base):
    __tablename__ = 'answer'
    # Prevent query using double quote in query
    __table_args__ = {'quote': False}
    answer_id = Column(Integer, primary_key=True)
    content = Column(Text, nullable=False)
    is_correct = Column(Boolean, default=False)
    question_id = Column(Integer, ForeignKey(
        Question.question_id), nullable=False)
    question = relationship('Question',  foreign_keys=[
        question_id], primaryjoin="Answer.question_id==Question.question_id", lazy="immediate")
