# user_schema.py

from pydantic import BaseModel, Field, EmailStr
from datetime import datetime
from typing import Optional

# create the user in model
class UserIn(BaseModel):
    first_name: str = Field(min_length=2, max_length=30)
    last_name: str = Field(min_length=2, max_length=30)
    email: str
    password: str = Field(min_length=2)
    role: str = Field(pattern="^(employee|manager|admin)$")

# create the user out mode
class UserOut(BaseModel):
    id: Optional[int] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    role: Optional[str] = None
    created_at: Optional[datetime] = None
    is_active: Optional[bool] = None

    model_config = {'from_attributes': True}

