from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from .exam import Exam
from .examinee import Examinee

Base = declarative_base()


class Participant(Base):
    __tablename__ = 'Participant'
    __table_args__ = {'quote': False}  # Prevent query using double quote in query
    exam_id = Column(Integer, ForeignKey(Exam.exam_id))
    examinee_account_id = Column(Integer, ForeignKey(Examinee.account_id))

    __mapper_args__ = {
        "primary_key": [exam_id, examinee_account_id]
    }
