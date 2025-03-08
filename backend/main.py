from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from config import config
from db import DatabaseClient

app = FastAPI()

# print("Database URL: " + config.database_url)
# print("Stock API Key: " + config.stock_api_key)

# API Routes go here
@app.get("/api/hello")
async def root():
    return {"message": "Hello World"}

# Do NOT put API routes after this line!
app.mount("/", StaticFiles(directory="frontend/dist", html=True), name="frontend")
