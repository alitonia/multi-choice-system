from httpx import AsyncClient
import logging

import pytest
import asyncio
from starlette.testclient import TestClient
from starlette.config import environ
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy_utils import create_database, database_exists, drop_database
from nest_asyncio import apply

apply()

environ["ENVIRONMENT"] = "testing"
environ["DATABASE_URL"] = "mysql+aiomysql://root:123456@db/study_test"
environ["DATABASE_URL_TEST"] = "mysql+pymysql://root:123456@db/study_test"

from app.core import config
from app.core.db import Base, get_session
from app.main import app


logger = logging.getLogger("databases")
logger.setLevel(logging.DEBUG)
s_handler = logging.StreamHandler()
logger.addHandler(s_handler)


engine = create_async_engine(config.SQLALCHEMY_DATABASE_URI, echo=True, future=True)
async_session = sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False, autoflush=False
)


@pytest.fixture(scope="function", autouse=True)
async def override_get_session(session):
    async def _override_get_session():
        yield session
    
    app.dependency_overrides[get_session] = _override_get_session


@pytest.fixture(scope="function")
async def session():
    connection = await engine.connect()
    transaction = await connection.begin()
    async_session.configure(bind = connection)
    async with async_session() as session:
        yield session
    await transaction.rollback()
    await connection.close()


@pytest.fixture(scope="session", autouse=True)
async def db():
    if database_exists(str(config.SQLALCHEMY_DATABASE_URI_TEST)):
        drop_database(str(config.SQLALCHEMY_DATABASE_URI_TEST))
    create_database(str(config.SQLALCHEMY_DATABASE_URI_TEST))
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


@pytest.fixture(scope='session')
def event_loop():
    """Create an instance of the default event loop for each test case."""
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()


@pytest.fixture(scope="function")
async def test_client():
    async with AsyncClient(app= app, base_url="http://test") as client:   # context manager will invoke startup event 
        yield client
