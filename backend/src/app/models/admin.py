from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, Text, DateTime, Time
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from .account import Account

Base = declarative_base()


class Admin(Base):
    __tablename__ = 'Admin'
    __table_args__ = {'quote': False}  # Prevent query using double quote in query
    account_id = Column(Integer, ForeignKey(Account.account_id), primary_key=True)
