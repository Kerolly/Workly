# time_entry.py

import psycopg
from backend.schemas.time_entry_schema import TimeEntryOut, TimeEntryIn


class TimeEntry:
    def __init__(self, conn):
        self.conn = conn
        self.table = "TimeEntries"

    async def add_entry(self, entry_data: TimeEntryIn):
        query = f"""
            INSERT INTO {self.table} (user_id, activity_id, time_start, time_end)
            VALUES (%s, %s, %s, %s) RETURNING id;
            """

        async with self.conn.cursor() as cursor:
            cursor.execute(query,
                           (entry_data.user_id,
                            entry_data.activity_id,
                            entry_data.time_start,
                            entry_data.time_end))
            result = cursor.fetchone()
            self.conn.commit()

        return result

    async def get_entry_by_id(self, entry_id: int):
        query = f"""
            SELECT * FROM {self.table}
            WHERE id = %s;
        """

        async with self.conn.cursor() as cursor:
            cursor.execute(query,
                           (entry_id,))

        return "Ok"

    async def get_entries_with_details(self, user_id: int):
        query = f"""
            SELECT t.id, t.time_start, t.time_end, 
            u.first_name, u.last_name, a.activity_name
            FROM {self.table} AS t
            JOIN users as u ON u.id = t.user_id
            JOIN activities as a ON a.id = t.activity_id
            WHERE t.user_id = %s;
            ORDER BY t.time_start DESC
        """

        async with self.conn.cursor() as cursor:
            cursor.execute(query,
                           (user_id,))


