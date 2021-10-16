from fastapi import APIRouter, Depends

from . import auth
# from app.api.libs import security


api_router = APIRouter()
authenticated_router = APIRouter()

# authenticated_router.include_router(questions.router, tags=["questions"])
# authenticated_router.include_router(tests.router, tags=["tests"])
# authenticated_router.include_router(students.router, tags=["students"])
# api_router.include_router(authenticated_router, dependencies=[
#                           Depends(security.jwt_header)])
