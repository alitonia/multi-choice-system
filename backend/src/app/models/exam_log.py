from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, Text, DateTime, Time
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql.expression import text

from app.models.base import Base


class ExamLog(Base):
    __tablename__ = 'exam_log'

    log_id = Column(Integer, primary_key=True, server_default=text(
        "nextval('exam_log_log_id_seq'::regclass)"))
    examinee_account_id = Column(ForeignKey(
        'examinee.account_id'), nullable=False)
    exam_id = Column(ForeignKey('exam.exam_id'), nullable=False)
    action = Column(String(50), nullable=False)
    time = Column(DateTime, nullable=False,
                  server_default=text("CURRENT_TIMESTAMP"))

    exam = relationship('Exam')
    examinee_account = relationship('Examinee')
