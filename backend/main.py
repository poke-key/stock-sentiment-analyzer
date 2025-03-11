from fastapi import FastAPI, HTTPException, status
from fastapi.staticfiles import StaticFiles
from config import config
from db import DatabaseClient, GetSessionValid
from starlette.responses import FileResponse
import uuid
import time
import os

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

@app.post("/api/signup", status_code=status.HTTP_201_CREATED)
async def request_new_account(username: str, password: str, signup_pass: str):
    if signup_pass != config.signup_pass:
        raise HTTPException(status_code=401, detail="signup code invalid")
    user = db.GetUser(username)
    if user:
        raise HTTPException(status_code=401, detail="user already exists with that name")
    db.AddUser(username, password)
    return {"message" : "OK"}

@app.post("/api/login", status_code=status.HTTP_200_OK)
async def login(username: str, password: str):
    with Session(engine) as session:
        user = db.GetUser(username)
        if not user:
            raise HTTPException(status_code=401, detail="user doesn't exist")
        if user.password != password:
            raise HTTPException(status_code=401, detail="invalid login credentials")
        # Generate session token for use now.
        user.session = uuid.uuid4()
        user.lastTime = time.time()
        session.add(user)
        session.commit()
        session.refresh(user)
        return {"session" : user.session}

# Do NOT put API routes after this line!
app.mount("/static", StaticFiles(directory="frontend/dist", html=True), name="static")

# Serve the React index.html for all other routes
# For client-side routing
@app.get("/{full_path:path}")  # Catch all paths
async def catch_all(full_path: str):
    index_path = "frontend/dist/index.html"
    if os.path.exists(index_path):
        return FileResponse(index_path)  # Serve React app
    return {"error": "index.html not found"}
