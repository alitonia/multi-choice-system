from sqlalchemy import Column, Integer, String, ForeignKey
from .account import Account


from app.models.base import Base


class Examinee(Base):
    __tablename__ = 'Examinee'
    # Prevent query using double quote in query
    __table_args__ = {'quote': False}
    account_id = Column(Integer, ForeignKey(
        Account.account_id), primary_key=True)
    classname = Column(String(50))
    major = Column(String(50))
    examinee_id = Column(String(10))
