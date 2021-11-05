from fastapi import APIRouter, Depends
from app.core.db import get_session
from app.services.question_service import Question_Service
from sqlalchemy.orm import Session
from typing import List
from app.schemas.question import (
    Question_Schema,
    Question_Schema_POST_Params,
    Question_Schema_PUT_Params,
    Question_Schema_DEL_Params
)

router = APIRouter()


@router.get("/test", tags=["users"])
async def read_users():
    return [{"username": "Rick"}, {"username": "Morty"}]


# @router.get("/question", tags=["users"])
# async def get_all_questions():
#     s = get_session()
#     return  get_questions(s)
#     return [{"username": "Rick"}, {"username": "Morty"}]

@router.get("/question/")
async def show_questions(s: Session = Depends(get_session)) -> List[Question_Schema]:
    qs = Question_Service(s)
    questions = qs.get_questions()
    return await questions


@router.post("/question/")
async def create_question(item: Question_Schema_POST_Params, s: Session = Depends(get_session)):
    qs = Question_Service(s)
    questions = qs.add_question(
        item.question_content,
        item.exam_id,
        item.question_group_id,
        item.question_type_id
    )
    return await questions


@router.put("/question/")
async def update_question(item: Question_Schema_PUT_Params, s: Session = Depends(get_session)):
    qs = Question_Service(s)
    questions = qs.edit_question(
        item.question_id,
        item.question_content,
        item.question_group_id,
        item.question_type_id
    )
    return await questions


@router.delete("/question/")
async def update_question(item: Question_Schema_DEL_Params, s: Session = Depends(get_session)):
    qs = Question_Service(s)
    questions = qs.delete_question(
        item.question_id,
    )
    return await questions
