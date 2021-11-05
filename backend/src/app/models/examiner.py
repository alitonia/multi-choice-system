from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Examiner(Base):
    __tablename__ = 'Examiner'
    account_id = Column(Integer, primary_key=True)
    department = Column(String(50))
