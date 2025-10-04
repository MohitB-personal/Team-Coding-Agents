from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel       # <-- Must be present
from app.db import get_db, Base, engine
from app.models.user import User
from app.core.security import get_password_hash

router = APIRouter()

class SignupRequest(BaseModel):      # <-- Must be inside or before route
    name: str
    email: str
    password: str

@router.post("/signup")
def signup(signup_data: SignupRequest, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == signup_data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_pw = get_password_hash(signup_data.password[:72])
    user = User(
        name=signup_data.name,
        email=signup_data.email,
        hashed_password=hashed_pw,
        role="Admin"
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"msg": "Admin created", "user_id": user.id}
