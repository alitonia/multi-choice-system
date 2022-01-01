from typing import List

from pydantic import BaseModel


class ExamDelInputSchema(BaseModel):
    exam_id: int


class ExamNewInputSchema(BaseModel):
    exam_name: str
    subject: str
    start_time: str
    duration: str

    class Config:
        arbitrary_types_allowed = True
        orm_mode = True


class ExamEditInputSchema(ExamNewInputSchema):
    exam_id: int

    class Config:
        arbitrary_types_allowed = True
        orm_mode = True


class ExamAddExamineeInputSchema(BaseModel):
    exam_id: int
    emails: List[str]

    class Config:
        arbitrary_types_allowed = True
        orm_mode = True
