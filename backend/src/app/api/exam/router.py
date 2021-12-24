from fastapi import APIRouter, Depends
from app.core.db import get_session
from app.services.exam_service import Exam_Service
from sqlalchemy.orm import Session
from typing import List, Optional
from app.schemas.question import (
    Question_Schema,
    Question_Schema_POST_Params,
    Question_Schema_PUT_Params,
    Question_Schema_DEL_Params
)

router = APIRouter()


@router.get("/exam/get/{exam_id}")
async def show_exam(exam_id: int, s: Session = Depends(get_session)):
    qs = Exam_Service(s)
    exam = await qs.get_one_exam(exam_id)
    return exam


@router.get("/exams/get")
async def show_accounts(
        skip: int = 0,
        limit: int = 15,
        s: Session = Depends(get_session)
):
    qs = Exam_Service(s)
    exams = await qs.get_exams(skip, limit)
    return exams

#
# @router.post("/question/")
# async def create_question(item: Question_Schema_POST_Params, s: Session = Depends(get_session)):
#     qs = Question_Service(s)
#     questions = qs.add_question(
#         item.question_content,
#         item.exam_id,
#         item.question_group_id,
#         item.question_type_id
#     )
#     return await questions
#
#
# @router.put("/question/")
# async def update_question(item: Question_Schema_PUT_Params, s: Session = Depends(get_session)):
#     qs = Question_Service(s)
#     questions = qs.edit_question(
#         item.question_id,
#         item.question_content,
#         item.question_group_id,
#         item.question_type_id
#     )
#     return await questions
#
#
# @router.delete("/question/")
# async def update_question(item: Question_Schema_DEL_Params, s: Session = Depends(get_session)):
#     qs = Question_Service(s)
#     questions = qs.delete_question(
#         item.question_id,
#     )
#     return await questions
