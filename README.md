# MoMo Data Analysis - End-to-End Application

This repository contains a fullstack application built to process, interpret, and visualize transaction data from MTN MoMo SMS messages. The solution includes a backend for data parsing and storage, a relational database to organize and maintain transaction records, and a user-facing dashboard for interactive data exploration.

---

## **Main Features**

### 1. **SMS Data Processing**
- Reads and sanitizes transaction data from XML SMS files.
- Automatically classifies transactions (e.g., Incoming Funds, Payments, Transfers).
- Logs invalid or unrecognized data entries for review.

### 2. **Relational Database**
- Utilizes a normalized schema to efficiently store structured data.
- Saves processed and tagged transaction records in SQLite.

### 3. **User Interface (Dashboard)**
- Developed using HTML, CSS, and vanilla JavaScript.
- Core features include:
  - Transaction search and filters (by amount, date, or category).
  - Dynamic visualizations using bar and pie charts.
  - In-depth inspection of transaction details.
- Fetches data directly from the database in JSON format (no server or Flask API used).

### 4. **Backend Automation**
- Python scripts parse XML data and populate the database.
- JavaScript on the frontend fetches and displays transaction data via the Fetch API.

---

## **Technology Stack**

- **Backend**: Python (`xml.etree.ElementTree`, `sqlite3`)
- **Frontend**: HTML, CSS, JavaScript (uses Chart.js)
- **Database**: SQLite
- **Version Control**: Git & GitHub

---

## **How to Get Started**

### 1. **Clone the Repository**
Clone the codebase to your machine:
```bash
git clone https://github.com/your_user/repo_name
cd repo_name

## 2. Set Up the Backend:**
Install necessary dependencies:

pip install -r requirements.txt
Run the Python script to process the SMS data and populate the database:
python backend/populate_db.py

## 3. Launch the Frontend:
Open the frontend/index.html file in your browser. The frontend will automatically fetch transaction data in JSON format from the backend and display it in interactive charts and tables.

This `README.md` is structured for clarity and includes all the instructions and details about setting up and running the application. You can now add this file to your project repository, and it will be ready for others to use.


