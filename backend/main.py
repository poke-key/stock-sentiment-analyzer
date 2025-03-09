from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from config import config
from db import DatabaseClient

app = FastAPI()

# print("Database URL: " + config.database_url)
# print("Stock API Key: " + config.stock_api_key)

db = DatabaseClient()
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

@app.post("/api/signup")
async def request_new_account(username: str, password: str, signup_pass: str):
    if signup_pass != config.signup_pass:
        raise HTTPException(status_code=401, detail="signup code invalid")
    user = db.GetUser(username)
    if user:
        raise HTTPException(status_code=401, detail="user already exists with that name")
    db.AddUser(username, password)

# Do NOT put API routes after this line!
app.mount("/", StaticFiles(directory="frontend/dist", html=True), name="frontend")
