from sqlalchemy import Column, Integer, String, ForeignKey
from .account import Account

from app.models.base import Base


class Examiner(Base):
    __tablename__ = 'Examiner'
    __table_args__ = {'quote': False}  # Prevent query using double quote in query
    account_id = Column(Integer, ForeignKey(Account.account_id), primary_key=True)
    department = Column(String(50))
