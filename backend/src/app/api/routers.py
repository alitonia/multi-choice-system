from fastapi import APIRouter, Depends
from .test.router import router as test_router
from .question.router import router as question_router
from .account.router import router as account_router

from . import auth

from app.api.libs import security


api_router = APIRouter()
authenticated_router = APIRouter()

authenticated_router.include_router(test_router, tags=["test"])

authenticated_router.include_router(question_router, tags=["questions"])
authenticated_router.include_router(account_router, tags=["accounts"])
api_router.include_router(authenticated_router, dependencies=[
                          Depends(security.jwt_header)])
