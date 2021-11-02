from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, Text, DateTime, Time
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Question_Group(Base):
    __tablename__ = 'Question_group'
    question_group_id = Column(Integer, primary_key=True)
    description = Column(String(50), nullable=False)
