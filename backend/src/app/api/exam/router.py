from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio.session import AsyncSession
from sqlalchemy.orm import Session

from app.core import errors
from app.core.db import get_session
from app.core.principal import Principal
from app.api.libs import security
from app.services.exam_service import Exam_Service
from app.services.question_service import Question_Service
from app.services import choice_service
from app.schemas.question import (
    Question_Schema,
    Question_Schema_POST_Params,
    Question_Schema_PUT_Params,
    Question_Schema_DEL_Params
)
from backend.src.app.schemas.exam import ExamAnswerSchemaIn

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


@router.get("/exam/get/{exam_id}")
async def get_examinee_exam(exam_id: int, session: AsyncSession = Depends(get_session), principal: Principal = Depends(security.get_current_user)):
    exam_service = Exam_Service(session=session)
    question_service = Question_Service(session=session)
    account_id = principal.account_id

    participant = await exam_service.get_participant_exam(
        exam_id=exam_id, examinee_id=account_id)
    if not participant:
        raise HTTPException(status_code=400, detail=errors.create_http_exception_detail(
            f"Exam does not exist or you don't have permission to access this"))

    questions = await question_service.get_exam_questions(exam_id=exam_id)

    output_questions = []
    for question in questions:
        answers = await question_service.get_question_answers(question_id=question.question_id)
        answers_dict = [answer.__dict__ for answer in answers]
        question_dict = question.__dict__
        question_dict["answers"] = answers_dict
        output_questions.append(question_dict)

    output_exam = participant.exam.__dict__
    output_exam["questions"] = output_questions

    # TODO: construct a schema output for this
    return output_exam


@router.post("/exam/{exam_id}/answers")
async def answer_question(exam_id: int, body: ExamAnswerSchemaIn, session: AsyncSession = Depends(get_session), principal: Principal = Depends(security.get_current_user)):
    exam_service = Exam_Service(session=session)
    question_service = Question_Service(session=session)

    account_id = principal.account_id
    # TODO: check for legibility

    question_id = body.question_id
    answers_id = body.answers_id

    question = await question_service.get_question(question_id=question_id)
    question_answers_id = [answer.answer_id for answer in question.answers]
    if not all(item in question_answers_id for item in answers_id):
        raise HTTPException(status_code=400, detail=errors.create_http_exception_detail(
            f"Answers don't belong to this question"))

    # delete previous choices and save the new ones
    await choice_service.delete_choices(session=session, question_id=question_id, examinee_id=account_id)

    await choice_service.save_choices(session=session, question_id=question_id, answers_id=answers_id, examinee_id=account_id)

    # TODO construct a schema output for this
    return {"message": "ok"}

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
