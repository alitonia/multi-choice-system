from typing import List
from pydantic import BaseModel


class ExamAnswerSchemaIn(BaseModel):
    question_id: int
    answers_id: List[int]


class ExamFinishSchemaIn(BaseModel):
    exam_id: int


class ExamAnswer(BaseModel):
    answer_id: int
    content: str


class ExamQuestion(BaseModel):
    question_id: int
    question_content: str
    question_group_id: int
    question_type_id: int
    answers: List[ExamAnswer]


class ExamSchemaOut(BaseModel):
    exam_id: int
    exam_name: str
    subject: str
    start_time: str
    duration: int
    questions: List[ExamQuestion]
