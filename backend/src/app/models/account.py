from sqlalchemy import Column, Integer, String, Date, Boolean, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from .role import Role

Base = declarative_base()


class Account(Base):
    __tablename__ = 'Account'
    __table_args__ = {'quote': False}  # Prevent query using "Account"
    account_id = Column(Integer, primary_key=True)
    email = Column(String(256), nullable=False, unique=True)
    hash_password = Column(String(60), nullable=False)
    salt = Column(String(29), nullable=False)
    name = Column(String(50), nullable=False)
    date_of_birth = Column(Date, nullable=False)
    phone_number = Column(String(50), nullable=False)
    enable = Column(Boolean, nullable=False, default=True)
    role_id = Column(Integer, ForeignKey(Role.role_id))
    role = relationship(
        Role,
    )
