from fastapi import FastAPI
from app.routes import auth  # <-- this is valid because app/ has __init__.py

app = FastAPI()

app.include_router(auth.router, prefix="/auth", tags=["Authentication"])

@app.get("/")
def root():
    return {"message": "Backend is running 🚀"}
