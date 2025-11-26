# auth_schema.py

from pydantic import BaseModel, EmailStr
from typing import Optional


# create the user login
class UserLogin(BaseModel):
    email: str
    password: str

# create the token model
class Token(BaseModel):
    access_token: str
    token_type: str
    role: str
    id: int

# create the model for token data
class TokenData(BaseModel):
    email: Optional[str] = None