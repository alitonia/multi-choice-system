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
from app.services.exam_analytic_service import ExamAnalyticService
from app.core.principal import Principal
from app.api.libs import security

router = APIRouter()


@router.get("/exam_analytic/account/{exam_id}")
async def get_all_status(
        exam_id: int,
        s: Session = Depends(get_session),
        principal: Principal = Depends(security.get_current_user)
):
    qs = ExamAnalyticService(s)
    account_id = principal.account_id
    return await qs.get_all_progress_by_examinee(exam_id, account_id)


@router.get("/exam_analytic/question/{exam_id}")
async def get_all_status(
        exam_id: int,
        s: Session = Depends(get_session),
        principal: Principal = Depends(security.get_current_user)
):
    qs = ExamAnalyticService(s)
    account_id = principal.account_id
    return await qs.get_all_progress_by_question(exam_id, account_id)


@router.get("/exam_analytic/complete_percent/{exam_id}")
async def get_all_status(
        exam_id: int,
        s: Session = Depends(get_session),
        principal: Principal = Depends(security.get_current_user)
):
    qs = ExamAnalyticService(s)
    account_id = principal.account_id
    return await qs.get_complete_percent(exam_id, account_id)

@router.get("/exam_analytic/score/{exam_id}")
async def get_all_status(
        exam_id: int,
        s: Session = Depends(get_session),
        principal: Principal = Depends(security.get_current_user)
):
    qs = ExamAnalyticService(s)
    account_id = principal.account_id
    return await qs.get_scores(exam_id, account_id)

@router.get("/exam_analytic/score_overview/{exam_id}")
async def get_all_status(
        exam_id: int,
        s: Session = Depends(get_session),
        principal: Principal = Depends(security.get_current_user)
):
    qs = ExamAnalyticService(s)
    account_id = principal.account_id
    return await qs.get_score_overview(exam_id, account_id)
