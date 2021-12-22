from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from .account import Account

Base = declarative_base()


class Examiner(Base):
    __tablename__ = 'Examiner'
    __table_args__ = {'quote': False}  # Prevent query using double quote in query
    account_id = Column(Integer, ForeignKey(Account.account_id), primary_key=True)
    department = Column(String(50))
