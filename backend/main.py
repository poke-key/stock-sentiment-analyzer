from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# API Routes go here
@app.get("/api/hello")
async def root():
    return {"message": "Hello World"}

# Do NOT put API routes after this line!
app.mount("/", StaticFiles(directory="frontend/dist", html=True), name="frontend")
