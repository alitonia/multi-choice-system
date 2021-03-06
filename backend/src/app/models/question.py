from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, Text, DateTime, Time
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from .examiner import Examiner
from .question_group import Question_Group
from .question_type import Question_Type

from app.models.base import Base

class Question(Base):
    __tablename__ = 'question'
    question_id = Column(Integer, primary_key=True)
    question_content = Column(Text, nullable=False)
    exam_id = Column(Integer, ForeignKey(Examiner.account_id), nullable=False)
    question_group_id = Column(Integer, ForeignKey(Question_Group.question_group_id), nullable=False)
    question_type_id = Column(Integer, ForeignKey(Question_Type.question_type_id), nullable=False)
