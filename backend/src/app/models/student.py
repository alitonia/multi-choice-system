from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, Text, DateTime
from .base import Base, TimeStampMixin


class StudentModel(Base, TimeStampMixin):
    __tablename__ = "academy_student"
    id = Column(Integer, autoincrement=True, primary_key=True, index=True)
    email = Column(Text)
