from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, Text, DateTime, Time
from sqlalchemy.orm import relationship
from .account import Account
from app.models.base import Base


class Admin(Base):
    __tablename__ = 'Admin'
    # Prevent query using double quote in query
    __table_args__ = {'quote': False}
    account_id = Column(Integer, ForeignKey(
        Account.account_id), primary_key=True)
