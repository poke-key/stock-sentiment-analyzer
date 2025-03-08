from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from config import config
from sqlmodel import Field, Session, SQLModel, create_engine, select

app = FastAPI()

# print("Database URL: " + config.database_url)
# print("Stock API Key: " + config.stock_api_key)

# SQL Models

# password is raw-text for now. VERY INSECURE
class User(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    password: str = Field(index=True)

# API Routes go here
@app.get("/api/hello")
async def root():
    return {"message": "Hello World"}

# Do NOT put API routes after this line!
app.mount("/", StaticFiles(directory="frontend/dist", html=True), name="frontend")
