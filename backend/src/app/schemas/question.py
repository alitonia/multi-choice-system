from pydantic import BaseModel
from typing import Optional, List

from .answer import AnswerContentSchema


class Question_Schema_Base(BaseModel):
    question_content: str
    question_group_id: int
    question_type_id: int


class Question_Schema_No_ID(Question_Schema_Base):
    exam_id: int


class Question_Schema(Question_Schema_No_ID):
    question_id: int


class Question_Schema_POST_Params(Question_Schema_No_ID):
    answers: Optional[List[AnswerContentSchema]]


class Question_Schema_PUT_Params(Question_Schema_Base):
    question_id: int
    answers: Optional[List[AnswerContentSchema]]


class Question_Schema_DEL_Params(BaseModel):
    question_id: int
