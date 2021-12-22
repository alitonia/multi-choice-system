from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import uvicorn
from .api import routers
from .core import config

prefix = config.config("BACKEND_PREFIX", default='/api/v1')
app = FastAPI(
    title="Multi-choice API",
    description="API for Multi-choices system",
    version="0.0.1",
    redoc_url=None,
    docs_url=None if config.ENVIRONMENT == "production" else "/_api_",
)

app.include_router(routers.api_router, prefix=prefix)

# TODO: authenticate this
app.include_router(routers.authenticated_router, prefix=prefix)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/pings", tags=["systems"], summary="Health checking", include_in_schema=False)
async def health_check():
    """
    Service health checking endpoint
    """
    return {"hello": "there"}
