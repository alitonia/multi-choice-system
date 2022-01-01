from typing import Any
from fastapi import APIRouter, HTTPException
from fastapi.params import Depends
import httpx
from sqlalchemy.ext.asyncio.session import AsyncSession
from app.api.libs.security import generate_token
from app.core import config, errors
from app.core.db import get_session
from app.schemas.account import Account_Schema_Login
from app.services import choice_service
from app.services.account_service import Account_Service
from app.schemas.account import Account_Schema_Login_Output

router = APIRouter()


@router.post("/account/login", summary="Login using email and password", operation_id="login")
async def login(
        item: Account_Schema_Login,
        s: AsyncSession = Depends(get_session)
):
    qs = Account_Service(s)
    account = await qs.login(email=item.email, password=item.password)
    if not account:
        raise HTTPException(status_code=400, detail=errors.create_http_exception_detail(
            f"Email or password is invalid"))
    return {
        "access_token": generate_token(account_id=account["account_id"]),
        "account": account
    }


@router.get("/aa")
async def aaa(session: AsyncSession = Depends(get_session)):
    return await choice_service.get_choices(session=session, question_id=1, examinee_id=1)
