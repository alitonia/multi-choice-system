from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, Text, DateTime, Time
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Question(Base):
    __tablename__ = 'question'
    question_id = Column(Integer, primary_key=True)
    question_content = Column(Text, nullable=False)
    exam_id = Column(Integer, ForeignKey('Examiner.account_id'), nullable=False)
    question_group_id = Column(Integer, ForeignKey('Question_group.question_group_id'), nullable=False)
    question_type_id = Column(Integer, ForeignKey('Question_type.question_type_id'), nullable=False)
