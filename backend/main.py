from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from config import config
from db import DatabaseClient

app = FastAPI()

# print("Database URL: " + config.database_url)
# print("Stock API Key: " + config.stock_api_key)

# db = DatabaseClient()
# user = db.GetUser(username="testname")
# if user:
#     print("user already exists")
# else:
#     print("user doesn't exist yet")

# if not user:
#     db.AddUser(username="testname", password="testpass")
#     user = db.GetUser(username="testname")
#     print(user)


# API Routes go here
@app.get("/api/hello")
async def root():
    return {"message": "Hello World"}

# Do NOT put API routes after this line!
app.mount("/", StaticFiles(directory="frontend/dist", html=True), name="frontend")
