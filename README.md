# Workly ⏱️

![React](https://img.shields.io/badge/frontend-React_Vite-61DAFB?logo=react)
![FastAPI](https://img.shields.io/badge/backend-FastAPI-009688?logo=fastapi)
![PostgreSQL](https://img.shields.io/badge/database-PostgreSQL-336791?logo=postgresql)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

> **Workly** is a streamlined time-tracking and payroll calculation application. It allows employees to log working hours and automatically calculates monthly earnings based on historical data.

## 📖 Overview

Workly solves the problem of manual timekeeping by providing a modern interface for logging start and end times. The system processes these entries to generate detailed history logs and calculates the total pay for the month based on the employee's assigned hourly rate.

**Current Status:** The project currently supports manual time entry and utilizes a high-performance backend with raw SQL queries for maximum control and efficiency.

## ✨ Key Features

* **Time Logging**: Precision entry of start and end work times.
* **Payroll Calculation**: Automatic computation of monthly salary based on logged hours.
* **History Tracking**: Comprehensive view of past work sessions.
* **Performance**: Optimized SQL queries via a custom Data Access Layer (no ORM overhead).

## 🛠️ Tech Stack

* **Frontend**: React.js, Vite, CSS Modules/Tailwind
* **Backend**: Python 3.x, FastAPI
* **Database**: PostgreSQL (using `psycopg2` or similar driver)
* **Architecture**: RESTful API with custom Class-based Data Access logic.

## 🚀 Installation & Setup

Since the project does not use Docker yet, you will need to set up the Frontend and Backend separately.

### Prerequisites
* **Node.js** (v16+) & npm/yarn
* **Python** (v3.9+)
* **PostgreSQL** installed and running locally

### 1. Database Configuration
Before running the app, you must set up the database.

1.  Create a PostgreSQL database named `workly_db`.
2.  Import the schema (tables for Users and TimeEntries).
    * *Note: Check the `sql/` folder or the initialization script in the backend root to create the necessary tables.*

### 2. Backend Setup (FastAPI)

```bash
# Navigate to the server directory
cd server

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure Environment Variables
# Create a .env file and add your DB credentials:
# DB_HOST=localhost
# DB_NAME=workly_db
# DB_USER=postgres
# DB_PASS=yourpassword

# Run the server
uvicorn main:app --reload
The API will be available at http://localhost:8000
```
### 3. Frontend Setup (React + Vite)

```bash
# Open a new terminal and navigate to the client directory
cd client

# Install dependencies
npm install

# Run the development server
npm run dev

The application will launch at http://localhost:5173 (or similar)
```

### 📄 License
All Rights Reserved.
