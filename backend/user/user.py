# user.py
import datetime

from backend.user.user_schema import UserIn, UserOut


class User:
    def __init__(self, conn):
        self.conn = conn
        self.table = "Users"

    async def add_user(self, user_data: UserIn):
        query = f"""
        INSERT INTO {self.table} (first_name, last_name, email, password_hash, role, is_active)
        VALUES (%s, %s, %s, %s, %s, %s)
        RETURNING id;
        """

        async with self.conn.cursor() as cursor:
            await cursor.execute(query,
                                 (user_data.first_name,
                                  user_data.last_name,
                                  user_data.email,
                                  user_data.password,
                                  user_data.role,
                                  True,))
            result = await cursor.fetchone()
            await self.conn.commit()

        return result["id"], "ok"


    async def get_user_by_email(self, email: str):
        query = f"""
            SELECT id, email, password_hash, is_active
            FROM {self.table}
            WHERE email = %s
        """

        async with self.conn.cursor() as cursor:
            await cursor.execute(query,
                                 (email,))

            result = await cursor.fetchone()

        return result

    async def get_full_profile_by_email(self, email:str):
        query = f"""
            SELECT id, first_name, last_name, email, role, is_active, created_at
            FROM {self.table}
            WHERE email = %s
        """

        async with self.conn.cursor() as cursor:
            await cursor.execute(query,
                                 (email,))

            result = await cursor.fetchone()

        return result

    async def get_user_for_auth(self, email:str):
        query = f"""
            SELECT id, password_hash, email, is_active, role
            FROM {self.table}
            WHERE email = %s 
            """

        async with self.conn.cursor() as cursor:
            await cursor.execute(query,
                                 (email,))
            result = await cursor.fetchone()

        return result

    async def get_user_dashboard_by_id(self, user_id: int):

        # ==== User Query ===
        query_user = f"""
            SELECT id, first_name, last_name, email, role
            FROM {self.table}
            WHERE id = %s
            """

        async with self.conn.cursor() as cursor:
            await cursor.execute(query_user,
                                 (user_id,))

            user_row = await cursor.fetchone()

        # If not exist, return None
        if user_row is None:
            return None

        # ==== Time Entries Query ===
        query_entries = f"""
            SELECT t.id, t.time_start, t.time_end, a.activity_name
            FROM timeentries AS t
                                JOIN activities AS a ON t.activity_id = a.id
            WHERE t.user_id = %s AND DATE_TRUNC('month', t.time_start) = DATE_TRUNC('month', CURRENT_DATE)
            ORDER BY t.time_start DESC
            """

        async with self.conn.cursor() as cursor:
            await cursor.execute(query_entries,
                                 (user_id,))

            entries_rows = await cursor.fetchall() # get all entries for the user


        # ==== Hourly Rates Query ===
        query_rates = f"""
            SELECT hr.hourly_rate_gross, hr.activity_id, a.activity_name
            FROM hourlyrates AS hr
                                JOIN activities AS a ON a.id = hr.activity_id
            WHERE hr.user_id = %s
            """

        async with self.conn.cursor() as cursor:
            await cursor.execute(query_rates,
                                 (user_id,))

            rates_rows = await cursor.fetchall()  # get all rates for the user



        # === Prepare the response ===

        # === Rates map ===
        rates_map = {}
        for rate in rates_rows:
            rates_map[rate["activity_name"]] = float(rate["hourly_rate_gross"])

        #print(rates_map)

        entries_list = []
        total_hours = 0.0

        total_course_gross = 0.0
        total_demo_gross = 0.0
        total_meeting_gross = 0.0
        total_make_up_lesson_gross = 0.0
        total_other_gross = 0.0

        for row in entries_rows:

            # === Calculate total hours worked ===
            start = row["time_start"]
            end = row["time_end"]
            delta_time = (end - start).total_seconds() / 3600 # time for every row, means every activity
            total_hours += delta_time
            total_hours = round(total_hours, 1)


            # === Calculate gross salary per activity ===

            """
            rates rows:
            0 - Course
            1 - Demo
            2 - Meeting
            3 - Make-up lesson
            4 - Other
            """

            # === Course activity only ===
            if row["activity_name"] == "Course":
                total_course_gross += rates_map.get("Course", 0.0) * delta_time


            # === Demo activity only ===
            if row["activity_name"] == "Demo":
                total_demo_gross += rates_map.get("Demo", 0.0) * delta_time
                #print(total_demo_gross)


            # === Meeting activity only ===
            if row["activity_name"] == "Meeting":
                total_meeting_gross += rates_map.get("Meeting", 0.0) * delta_time


            # === Make-up lesson activity only ===
            if row["activity_name"] == "Make-up lesson":
                total_make_up_lesson_gross += rates_map.get("Make-up lesson", 0.0) * delta_time


            # === Other activity only ===
            if row["activity_name"] == "Other":
             total_other_gross += rates_map.get("Other", 0.0) * delta_time


            # === Prepare the history table Date/Activity/Hours/Rate_Hour/Total ===
            activity_date = row["time_start"].strftime("%d %b %Y")

            entries_list.append({
                "id": row["id"],
                "time_start": row["time_start"],
                "time_end": row["time_end"],
                "activity_date": activity_date,
                "activity_name": row["activity_name"],
                "activity_hours": delta_time,
                "rate_hour": rates_map.get(row["activity_name"], 0.0),
                "activity_total": rates_map.get(row["activity_name"], 0.0) * delta_time
            })

        # === Calculate total gross salary ===
        total_gross_salary = (total_course_gross + total_demo_gross +
                              total_meeting_gross + total_make_up_lesson_gross +
                              total_other_gross)

        # === Calculate hourly average
        hourly_average = 0
        hourly_average = total_gross_salary / total_hours if total_hours > 0 else 0

        #print(total_gross_salary)

        dashboard_data = {
            "user_info": {
                "id": user_row["id"],
                "first_name": user_row["first_name"],
                "last_name": user_row["last_name"],
                "email": user_row["email"],
                "role": user_row["role"]
            },
            "time_entries": entries_list, # empty list if no entries
            "hourly_rates": rates_rows,
            "total_hours": total_hours,
            "total_gross_salary": total_gross_salary,
            "hourly_average": hourly_average,
            "rates_map": rates_map,
        }

        return dashboard_data

    async def get_all_users(self, limit: int = 100):
        query = f"""
            SELECT * FROM {self.table}
            LIMIT {limit}
        """

        async with self.conn.cursor() as cursor:
            await cursor.execute(query)

            results = await cursor.fetchall()

        return results

    async def delete_user_by_email(self, user_data: UserOut):
        query = f"""
            DELETE FROM {self.table}
            WHERE email = %s
        """

        async with self.conn.cursor() as cursor:
            await cursor.execute(query,
                                 (user_data.email,))
            await self.conn.commit()
        return "Ok"


