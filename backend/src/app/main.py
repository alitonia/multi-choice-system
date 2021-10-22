from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import routers
from app.core import config


app = FastAPI(
    title="Multi-choice API",
    description="API for Multi-choices system",
    version="0.0.1",
    redoc_url=None,
    docs_url=None if config.ENVIRONMENT == "production" else "/_api_"
)

app.include_router(routers.api_router)


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
    return {"status": "covid 19 - 2nd"}
