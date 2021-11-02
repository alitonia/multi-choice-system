from fastapi import APIRouter, Depends
from app.core.db import get_session
from app.services.question_service import get_questions
from sqlalchemy.orm import Session
from typing import List
from app.models.question import Question
from sqlalchemy.future import select

router = APIRouter()


@router.get("/test", tags=["users"])
async def read_users():
    return [{"username": "Rick"}, {"username": "Morty"}]


# @router.get("/question", tags=["users"])
# async def get_all_questions():
#     s = get_session()
#     return  get_questions(s)
#     return [{"username": "Rick"}, {"username": "Morty"}]

@router.get("/records/")
async def show_records(db: Session = Depends(get_session)):
    questions = get_questions(db)
    return await questions
