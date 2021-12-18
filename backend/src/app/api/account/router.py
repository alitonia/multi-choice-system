from fastapi import APIRouter, Depends
from app.core.db import get_session
from app.services.account_service import Account_Service

from sqlalchemy.orm import Session
from typing import List, Union, Optional, Dict

from app.schemas.account import (
    Account_Schema_Base,
    Account_Schema_Input_New,
    Account_Schema_Output,
    Account_Schema_Input_Edit
)

router = APIRouter()


@router.get("/account/{account_id}")
async def show_account(
        account_id: int,
        s: Session = Depends(get_session)
) -> Union[Account_Schema_Output, None]:
    qs = Account_Service(s)
    account = await qs.get_one_account_no_pass(account_id)
    return account


@router.get("/accounts")
async def show_accounts(
        skip: int = 0,
        limit: int = 15,
        email: Optional[str] = None,
        role: Optional[str] = None,
        s: Session = Depends(get_session)
) -> List[Account_Schema_Output]:
    qs = Account_Service(s)
    accounts = await qs.get_accounts_no_pass(skip, limit, email, role)
    return accounts


@router.post("/account/new")
async def create_account(
        item: Account_Schema_Input_New,
        s: Session = Depends(get_session)
) -> Union[Account_Schema_Output, None]:
    qs = Account_Service(s)

    new_account = await qs.add_account(
        item.email,
        item.name,
        item.date_of_birth,
        item.phone_number,
        item.role_id,
        item.password
    )
    return new_account


@router.put("/account/edit")
async def update_account(
        item: Account_Schema_Input_Edit,
        s: Session = Depends(get_session)
) -> Union[Account_Schema_Output, None]:
    qs = Account_Service(s)

    status = await qs.edit_account(
        item.id,
        item.email,
        item.name,
        item.date_of_birth,
        item.phone_number,
        item.role_id,
    )

    return status


@router.post("/account/enable/{account_id}")
async def enable_account(
        account_id: int,
        s: Session = Depends(get_session)
):
    qs = Account_Service(s)

    status = await qs.enable_account(
        account_id
    )

    return status

@router.post("/account/disable/{account_id}")
async def enable_account(
        account_id: int,
        s: Session = Depends(get_session)
):
    qs = Account_Service(s)

    status = await qs.disable_account(
        account_id
    )

    return status
