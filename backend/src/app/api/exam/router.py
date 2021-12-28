from fastapi import APIRouter, Depends
from app.core.db import get_session
from app.services.exam_service import Exam_Service
from sqlalchemy.orm import Session
from typing import List, Optional

from app.schemas.exam import (
    ExamNewInputSchema,
    ExamEditInputSchema,
    ExamDelInputSchema,
    ExamAddExamineeInputSchema
)
from app.core.principal import Principal
from app.api.libs import security
from app.services.account_service import Account_Service

router = APIRouter()


@router.get("/exam/get/{exam_id}")
async def show_exam(
        exam_id: int,
        s: Session = Depends(get_session),
        principal: Principal = Depends(security.get_current_user)
):
    qs = Exam_Service(s)
    account_id = principal.account_id

    qs1 = Account_Service(s)
    account = await qs1.get_one_account_no_pass(account_id)

    exam = await qs.get_one_exam(exam_id, account)
    return exam


@router.get("/exams/get")
async def show_exams(
        skip: int = 0,
        limit: int = 15,
        s: Session = Depends(get_session),
        sort: str = None,
        principal: Principal = Depends(security.get_current_user)
):
    qs = Exam_Service(s)
    account_id = principal.account_id

    qs1 = Account_Service(s)
    account = await qs1.get_one_account_no_pass(account_id)

    exams = await qs.get_exams(account, skip, limit, sort)
    return exams


@router.post("/exam/new")
async def create_exam(
        item: ExamNewInputSchema,
        s: Session = Depends(get_session),
        principal: Principal = Depends(security.get_current_user)
):
    qs = Exam_Service(s)
    account_id = principal.account_id

    qs1 = Account_Service(s)
    account = await qs1.get_one_account_no_pass(account_id)
    can_create_exam = account["role"]["name"] in ['examiner', 'admin']

    if can_create_exam is False:
        return None

    # return account
    exam = qs.add_exam(
        item.exam_name,
        item.subject,
        item.start_time,
        item.duration,
        account_id
    )
    return await exam


@router.put("/exam/edit")
async def update_question(
        item: ExamEditInputSchema,
        s: Session = Depends(get_session),
        principal: Principal = Depends(security.get_current_user)
):
    qs = Exam_Service(s)
    account_id = principal.account_id

    qs1 = Account_Service(s)
    account = await qs1.get_one_account_no_pass(account_id)
    can_create_exam = account["role"]["name"] in ['examiner', 'admin']

    if can_create_exam is False:
        return None

    # return account
    exam = qs.edit_exam(
        item.exam_id,
        item.exam_name,
        item.subject,
        item.start_time,
        item.duration,
    )
    return await exam


@router.delete("/exam/del/{exam_id}")
async def update_question(
        exam_id,
        s: Session = Depends(get_session),
        principal: Principal = Depends(security.get_current_user)
):
    qs = Exam_Service(s)
    account_id = principal.account_id

    qs1 = Account_Service(s)
    account = await qs1.get_one_account_no_pass(account_id)
    can_create_exam = account["role"]["name"] in ['examiner', 'admin']

    if can_create_exam is False:
        return None

    questions = qs.delete_exam(
        exam_id
    )
    return await questions


@router.put("/exam/edit/add_examinees")
async def add_examinees_to_exam(
        item: ExamAddExamineeInputSchema,
        s: Session = Depends(get_session),
        principal: Principal = Depends(security.get_current_user)
):
    qs = Exam_Service(s)
    account_id = principal.account_id

    qs1 = Account_Service(s)
    account = await qs1.get_one_account_no_pass(account_id)
    can_create_exam = account["role"]["name"] in ['examiner', 'admin']
    if can_create_exam is False:
        return None

    exam = await qs.add_examinees(
        item.exam_id,
        item.emails
    )
    return exam


@router.put("/exam/edit/remove_examinees")
async def add_examinees_to_exam(
        item: ExamAddExamineeInputSchema,
        s: Session = Depends(get_session),
        principal: Principal = Depends(security.get_current_user)
):
    qs = Exam_Service(s)
    account_id = principal.account_id

    qs1 = Account_Service(s)
    account = await qs1.get_one_account_no_pass(account_id)
    can_create_exam = account["role"]["name"] in ['examiner', 'admin']

    if can_create_exam is False:
        return None

    exam = await qs.remove_examinees(
        item.exam_id,
        item.emails
    )
    return exam


@router.get("/exam/get_examinees")
async def add_examinees_to_exam(
        exam_id: str = None,
        s: Session = Depends(get_session),
        principal: Principal = Depends(security.get_current_user)
):
    qs = Exam_Service(s)

    exam = await qs.get_examinees(
        exam_id
    )
    return exam


@router.get("/exam/get_not_examinees")
async def ge_not_examinees(
        exam_id: str = None,
        s: Session = Depends(get_session),
        principal: Principal = Depends(security.get_current_user)
):
    qs = Exam_Service(s)

    exam = await qs.get_non_examinees(
        exam_id
    )
    return exam
