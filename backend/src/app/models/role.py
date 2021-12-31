from sqlalchemy import Column, Integer, String, Date, Boolean
from sqlalchemy.ext.declarative import declarative_base

from app.models.base import Base

class Role(Base):
    __tablename__ = 'Role'
    __table_args__ = {'quote': False}  # Prevent query using "Account"
    role_id = Column(Integer, primary_key=True)
    name = Column(String(30))
