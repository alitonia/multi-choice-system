from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, Text, DateTime, Time
from sqlalchemy.ext.declarative import declarative_base
from .question import Question

Base = declarative_base()


class Answer(Base):
    __tablename__ = 'answer'
    __table_args__ = {'quote': False}  # Prevent query using double quote in query
    answer_id = Column(Integer, primary_key=True)
    content = Column(Text, nullable=False)
    is_correct = Column(Boolean, default=False)
    question_id = Column(Integer, ForeignKey(Question.question_id), nullable=False)
