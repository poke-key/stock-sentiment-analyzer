from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI()

@app.get("/api/hello")
async def root():
    return {"message": "Hello World"}

app.mount("/", StaticFiles(directory="frontend/dist", html=True), name="frontend")
