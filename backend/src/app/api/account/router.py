from fastapi import APIRouter, Depends
from app.core.db import get_session
from app.services.account_service import Account_Service

from sqlalchemy.orm import Session
from typing import List, Union, Optional
from app.schemas.account import (
    Account_Schema_Base,
    Account_Schema_Input_New,
    Account_Schema_Output
)

router = APIRouter()


@router.get("/account/{account_id}")
async def show_account(account_id: int, s: Session = Depends(get_session)) -> Union[Account_Schema_Output, None]:
    qs = Account_Service(s)
    account = qs.get_one_account_no_pass(account_id)
    return await account


@router.get("/accounts")
async def show_accounts(
        skip: int = 0,
        limit: int = 15,
        email: Optional[str] = None,
        role: Optional[str] = None,
        s: Session = Depends(get_session)
) -> List[Account_Schema_Output]:
    qs = Account_Service(s)
    accounts = qs.get_accounts_no_pass(skip, limit, email, role)
    return await accounts

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
