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
    can_view_question = account["role"]["name"] == 'examinee'
    if can_view_question is False:
        return None

    qs1 = Question_Service(s)
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
    can_view_question = account["role"]["name"] == 'examiner'
    if can_view_question is False:
        return None

    qs1 = Question_Service(s)
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
    can_create_question = account["role"]["name"] == 'examiner'
    if can_create_question is False:
        return None
    
    qs1 = Question_Service(s)
    questions = qs1.add_question(
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
    can_update_question = account["role"]["name"] == 'examiner'
    if can_update_question is False:
        return None

    qs1 = Question_Service(s)
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
    can_delete_question = account["role"]["name"] == 'examiner'
    if can_delete_question is False:
        return None

    qs1 = Question_Service(s)
    questions = qs1.delete_question(
        item.question_id,
    )
    return await questions
