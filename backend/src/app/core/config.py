import logging
from starlette.config import Config


config = Config("../../.env")

ENVIRONMENT                     = config("ENVIRONMENT", default="local")
LOG_LEVEL                       = config("LOG_LEVEL", default=logging.WARNING)
SQLALCHEMY_ECHO                 = 1
# set correct URI
SQLALCHEMY_DATABASE_URI         = config("DATABASE_URL")
SQLALCHEMY_DATABASE_URI_TEST    = config("DATABASE_URL_TEST", default="")
JWT_TOKEN_EXPIRE                = config("JWT_TOKEN_EXPIRE", default=3600)
JWT_SECRET_KEY                  = config("JWT_SECRET_KEY", default="SECRET_KEY")
JWT_ALGORITHM                   = config("JWT_ALGORITHM", default="HS256")
LEGACY_URL                      = config("LEGACY_URL", default="http://host.docker.internal:8001")
PORT                            = config("UVICORN_PORT", default=5000)
