from fastapi import APIRouter, Depends
from app.core.db import get_session
from app.services.exam_service import Exam_Service
from app.services.answer_service import Answer_Service

from sqlalchemy.orm import Session
from typing import List, Optional

from app.schemas.exam import (
    ExamNewInputSchema,
    ExamEditInputSchema,
    ExamDelInputSchema,
    ExamAddExamineeInputSchema
)

from app.schemas.answer import (
    AnswerNewInputSchema,
    AnswerEditInputSchema
)

from app.core.principal import Principal
from app.api.libs import security
from app.services.account_service import Account_Service

router = APIRouter()


@router.post("/answer/new")
async def create_exam(
        item: AnswerNewInputSchema,
        s: Session = Depends(get_session),
        principal: Principal = Depends(security.get_current_user)
):
    qs = Answer_Service(s)

    # return account
    answer = await qs.add_answer(
        item.content,
        item.is_correct,
        item.question_id,
    )
    return answer


@router.put("/answer/edit")
async def update_question(
        item: AnswerEditInputSchema,
        s: Session = Depends(get_session),
        principal: Principal = Depends(security.get_current_user)
):
    qs = Answer_Service(s)

    answer = await qs.edit_answer(
        item.answer_id,
        item.content,
        item.is_correct,
    )
    return answer


@router.delete("/answer/del/{answer_id}")
async def update_question(
        answer_id,
        s: Session = Depends(get_session),
        principal: Principal = Depends(security.get_current_user)
):
    qs = Answer_Service(s)

    answer = await qs.delete_answer(
        answer_id
    )
    return answer
