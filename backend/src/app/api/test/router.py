from fastapi import APIRouter

router = APIRouter()


@router.get("/test", tags=["users"])
async def read_users():
    return [{"username": "Rick"}, {"username": "Morty"}]
