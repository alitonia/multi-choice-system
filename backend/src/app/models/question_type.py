from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, Text, DateTime, Time
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

from app.models.base import Base

class Question_Type(Base):
    __tablename__ = 'Question_type'
    __table_args__ = {'quote': False}  # Prevent query using double quote in query
    question_type_id = Column(Integer, primary_key=True)
    description = Column(String(50), nullable=False)
