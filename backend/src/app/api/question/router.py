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
from typing import Optional
from app.services.account_service import Account_Service
from app.api.libs import security
from app.core.principal import Principal
from app.services.exam_service import Exam_Service

router = APIRouter()


@router.get("/question/get/{question_id}")
async def show_question(
        question_id: int,
        s: Session = Depends(get_session),
        principal: Principal = Depends(security.get_current_user)
) -> List[Question_Schema]:

    account_id = principal.account_id

    qs = Account_Service(s)
    account = await qs.get_one_account_no_pass(account_id)

    qs1 = Question_Service(s)
    role_name = account["role"]["name"]
    if role_name != "admin":
        permission = qs1.check_question_viewer(question_id, -1, account)
        if permission is False:
            return None

    questions = await qs1.get_question(question_id)
    return questions


@router.get("/questions/get")
async def show_questions(
        skip: int = 0,
        limit: int = 15,
        exam_id: Optional[int] = None,
        s: Session = Depends(get_session),
        principal: Principal = Depends(security.get_current_user)
) -> List[Question_Schema]:

    account_id = principal.account_id

    qs = Account_Service(s)
    account = await qs.get_one_account_no_pass(account_id)

    qs1 = Question_Service(s)
    role_name = account["role"]["name"]
    if role_name != "admin":
        if exam_id != None:
            permission = qs1.check_question_viewer(-1, exam_id, account)
        else:
            permission = qs1.check_question_viewer(-1, -1, account)
        if permission is False:
            return None

    questions = qs1.get_questions(skip, limit, exam_id)
    return await questions


@router.post("/question/")
async def create_question(
        item: Question_Schema_POST_Params, 
        s: Session = Depends(get_session),
        principal: Principal = Depends(security.get_current_user)
):
    account_id = principal.account_id
    
    qs = Account_Service(s)
    account = await qs.get_one_account_no_pass(account_id)
    
    qs1 = Exam_Service(s)
    role_name = account["role"]["name"]
    if role_name != "admin":
        permission = qs1.check_exam_viewer(item.exam_id, account)
        if permission is False:
            return None

    qs2 = Question_Service(s)
    questions = qs2.add_question(
        item.question_content,
        item.exam_id,
        item.question_group_id,
        item.question_type_id
    )
    return await questions


@router.put("/question/")
async def update_question(
        item: Question_Schema_PUT_Params, 
        s: Session = Depends(get_session),
        principal: Principal = Depends(security.get_current_user)
):
    account_id = principal.account_id
    
    qs = Account_Service(s)
    account = await qs.get_one_account_no_pass(account_id)

    qs1 = Question_Service(s)
    role_name = account["role"]["name"]
    if role_name != "admin":
        permission = qs1.check_question_viewer(question_id , -1, account)
        if permission is False:
            return None

    questions = qs1.edit_question(
        item.question_id,
        item.question_content,
        item.question_group_id,
        item.question_type_id
    )
    return await questions


@router.delete("/question/")
async def update_question(
        item: Question_Schema_DEL_Params, 
        s: Session = Depends(get_session),
        principal: Principal = Depends(security.get_current_user)
):
    account_id = principal.account_id
    
    qs = Account_Service(s)
    account = await qs.get_one_account_no_pass(account_id)

    qs1 = Question_Service(s)
    role_name = account["role"]["name"]
    if role_name != "admin":
        permission = qs1.check_question_viewer(question_id , -1, account)
        if permission is False:
            return None

    questions = qs1.delete_question(
        item.question_id,
    )
    return await questions
