import jwt
import time

from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from starlette.requests import Request
from starlette.status import HTTP_401_UNAUTHORIZED

from app.core.principal import Principal
from backend.src.app.core.config import JWT_SECRET_KEY


jwt_header = HTTPBearer()


def get_current_user(*, creds: HTTPAuthorizationCredentials = Depends(jwt_header)):
    credentials_exception = HTTPException(
        status_code=HTTP_401_UNAUTHORIZED, detail="Could not validate credentials"
    )
    token = creds.credentials
    try:
        data = jwt.decode(token)

        if data['exp'] < time.time():
            raise HTTPException(
                status_code=HTTP_401_UNAUTHORIZED, detail="Credentials expired"
            )
    except (jwt.DecodeError):
        raise credentials_exception

    return Principal(data['sub'])


def generate_token(account_id: int):
    # token currently last for 5 hours
    data = jwt.encode(
        payload={"sub": account_id, "exp": time.time() + 3600*5}, key=JWT_SECRET_KEY)
    return data
