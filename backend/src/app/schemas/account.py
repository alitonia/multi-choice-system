from pydantic import BaseModel
from sqlalchemy.orm import relationship


class Account_Schema_Base(BaseModel):
    email: str
    name: int
    date_of_birth: str
    phone_number: str
    role_id: int
    role = relationship("Role", back_populates="role")

    class Config:
        arbitrary_types_allowed = True
        orm_mode = True


class Account_Schema_Input_New(Account_Schema_Base):
    password: str


class Account_Schema_Output(Account_Schema_Base):
    account_id: int
    enable: bool


class Account_Schema_Input_Edit(Account_Schema_Base):
    id: int  # this is account_id, but use id in accordance with doc


class Account_Schema_Status(BaseModel):
    enable: bool
