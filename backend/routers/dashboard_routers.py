# dashboard_routers.py

from fastapi import APIRouter, Depends, HTTPException, status

from backend.auth.auth_deps import get_current_active_user
from backend.time_entry.time_entry import TimeEntry
from backend.time_entry.time_entry_schema import TimeEntryIn
from backend.user.user import User
from backend.user.user_schema import UserOut, UserIn
from backend.utils.database import get_db_connection

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/employee/{user_id}")
async def get_employee_dashboard(user_id: int, current_user: UserOut = Depends(get_current_active_user), db=Depends(get_db_connection)):

    #print("User id: ", user_id)
    user_repo = User(db)
    user_data = await user_repo.get_user_dashboard_by_id(user_id)

    if user_data is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found")

    return user_data

@router.post("/employee/time-entry")
async def create_time_entry(entry: TimeEntryIn, current_user:UserOut = Depends(get_current_active_user), db=Depends(get_db_connection)):
    print("User: ", current_user)
    print("Entry: ", entry.time_start)

    time_entry_repo = TimeEntry(db)

    response = await time_entry_repo.add_entry(current_user.id, entry)

    if not response:
        raise HTTPException(status_code=400, detail="Time entry not created!")

    return {"message": "Time entry created successfully!", "id": response}


@router.delete("/employee/time-entry/{entry_id}")
async def delete_time_entry(entry_id: int, current_user: UserOut = Depends(get_current_active_user), db=Depends(get_db_connection)):
    print("User: ", current_user)
    print("Entry id: ", entry_id)

    time_entry_repo = TimeEntry(db)
    response = await time_entry_repo.delete_entry(entry_id, current_user.id)

    if not response:
        raise HTTPException(status_code=400, detail="Time entry not deleted!")

    return {"message": "Time entry deleted successfully!"}
