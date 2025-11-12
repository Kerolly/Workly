# auth_deps.py
from fastapi import HTTPException, status
from fastapi.params import Depends

from backend.user.user import User
from backend.user.user_schema import UserOut
from backend.utils.database import get_db_connection
from backend.auth.jwt_handler import oauth2_scheme, verify_token


async def get_current_user(token: str = Depends(oauth2_scheme), db = Depends(get_db_connection)):

    token_data = verify_token(token)
    user_repo = User(conn=db)

    user_dict = await user_repo.get_user_for_auth(token_data.email)

    if user_dict is None:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User does not exist",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user_dict.pop("password_hash", None)

    return UserOut(**user_dict)

def get_current_active_user(current_user: UserOut = Depends(get_current_user)):
    if not current_user.is_active:
        raise HTTPException(status_code=403,
                            detail="Inactive user"
                            )
    return current_user

