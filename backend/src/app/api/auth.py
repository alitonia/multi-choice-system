from typing import Any
from fastapi import APIRouter, HTTPException
import httpx
from app.core import config, errors


router = APIRouter()
