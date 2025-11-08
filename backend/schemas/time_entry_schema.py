# time_entry_schema.py

from pydantic import BaseModel
from datetime import datetime
from typing import Optional

# create the time_entry in model
class TimeEntryIn(BaseModel):
    user_id: int
    activity_id: int
    time_start: datetime
    time_end: datetime


# create the time_entry out mode
class TimeEntryOut(BaseModel):
    id: int
    user_id: int
    activity_id: int
    time_start: datetime
    time_end: datetime

    model_config = {'from_attributes': True}

