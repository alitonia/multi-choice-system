from pydantic import BaseModel

class AnswerContentSchema(BaseModel):
    content: str
    is_correct: bool

class AnswerNewInputSchema(BaseModel):
    content: str
    is_correct: bool
    question_id: int

    class Config:
        arbitrary_types_allowed = True
        orm_mode = True

class AnswerEditInputSchema(AnswerNewInputSchema):
    answer_id: int
    content: str
    is_correct: bool

    class Config:
        arbitrary_types_allowed = True
        orm_mode = True
