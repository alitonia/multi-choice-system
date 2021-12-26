from typing import List
from pydantic import BaseModel


class ExamAnswerSchemaIn(BaseModel):
    question_id: int
    answers_id: List[int]
