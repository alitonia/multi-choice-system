from fastapi import APIRouter, Depends
from .test.router import router as test_router
from .question.router import router as question_router
from .account.router import router as account_router
from .exam.router import router as exam_router
from .exam_analytic.router import router as exam_analytic_router

from . import auth

from app.api.libs import security

api_router = APIRouter()
authenticated_router = APIRouter()

api_router.include_router(auth.router, tags=["auth"])
authenticated_router.include_router(test_router, tags=["test"])

authenticated_router.include_router(question_router, tags=["questions"])
authenticated_router.include_router(account_router, tags=["accounts"])

authenticated_router.include_router(exam_router, tags=["exams"])
authenticated_router.include_router(exam_analytic_router, tags=["exam_analytic"])

api_router.include_router(authenticated_router, dependencies=[
    Depends(security.jwt_header)])
# api_router.include_router(authenticated_router, dependencies=[
#                           Depends(security.jwt_header)])
