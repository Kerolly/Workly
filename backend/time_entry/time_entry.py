# time_entry.py

from backend.time_entry.time_entry_schema import TimeEntryIn


class TimeEntry:
    def __init__(self, conn):
        self.conn = conn
        self.table = "TimeEntries"

    async def add_entry(self, user_id, entry_data: TimeEntryIn):

        query_find_activity_id = f"""
            SELECT id FROM activities WHERE activity_name = %s;
        """

        async with self.conn.cursor() as cursor:
            await cursor.execute(query_find_activity_id,
                           (entry_data.activity,))
            result = await cursor.fetchone()

            if not result:
                print(f"Error: {entry_data.activity} is not a valid activity name.")
                return None

            activity_id = result["id"]

        query_insert = f"""
            INSERT INTO {self.table} (user_id, activity_id, time_start, time_end)
            VALUES (%s, %s, %s, %s) RETURNING id;
            """

        async with self.conn.cursor() as cursor:
            await cursor.execute(query_insert,
                           (user_id,
                            activity_id,
                            entry_data.time_start,
                            entry_data.time_end))
            result = await cursor.fetchone()
            await self.conn.commit()

        return result



    async def delete_entry(self, entry_id: int, user_id: int):
        query = f"""
            DELETE FROM {self.table}
            WHERE user_id = %s AND id = %s;
            """

        try:
            async with self.conn.cursor() as cursor:
                await cursor.execute(query,
                                     (user_id, entry_id),)

                await self.conn.commit()
        except Exception as e:
            print("[DELETE ERROR]: ", e)

        return "ok"

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


