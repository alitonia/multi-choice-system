from fastapi import FastAPI
from dotenv import load_dotenv
load_dotenv()  # take environment variables from .env.

import os
frontend_url = os.environ.get("FRONTEND_URL")

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello Word"}

@app.get("/frontend-url")
async def root():
    return {"message": frontend_url}