# MoMo Data Analysis - End-to-End Application

A comprehensive fullstack application designed to process, analyze, and visualize MTN Mobile Money (MoMo) transaction data from SMS messages. This solution provides end-to-end functionality from data ingestion to interactive dashboard visualization.

##  Overview

This application transforms raw MTN MoMo SMS data into actionable insights through automated data processing and interactive visualizations. Built with a focus on data integrity and user experience, it provides a complete solution for transaction data analysis.

##  Features

###  SMS Data Processing
- **Automated Data Extraction**: Reads and sanitizes transaction data from XML SMS files
- **Smart Classification**: Automatically categorizes transactions (Incoming Funds, Payments, Transfers, etc.)
- **Error Handling**: Logs invalid or unrecognized data entries for manual review
- **Data Validation**: Ensures data integrity through comprehensive validation rules

###  Database Management
- **Normalized Schema**: Efficiently organized relational database structure
- **SQLite Integration**: Lightweight, serverless database solution
- **Data Persistence**: Secure storage of processed transaction records
- **Query Optimization**: Fast data retrieval for dashboard operations

###  Interactive Dashboard
- **Modern UI**: Clean, responsive interface built with vanilla JavaScript
- **Advanced Filtering**: Search and filter by amount, date range, transaction type, and more
- **Dynamic Visualizations**: Interactive bar charts and pie charts using Chart.js
- **Transaction Details**: Comprehensive view of individual transaction records
- **Real-time Updates**: Live data fetching without page refresh

### Backend Automation
- **Batch Processing**: Efficient handling of large SMS datasets
- **Automated Pipeline**: Streamlined data flow from XML to database
- **RESTful Architecture**: JSON-based data exchange between frontend and backend

## Technology Stack

| Category | Technologies |
|----------|-------------|
| **Backend** | Python 3.8+, xml.etree.ElementTree, sqlite3 |
| **Frontend** | HTML5, CSS3, JavaScript (ES6+) |
| **Visualization** | Chart.js |
| **Database** | SQLite 3.0+ |
| **Version Control** | Git, GitHub |

## Installation

### Prerequisites

- Python 3.8 or higher
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Git

### Step 1: Clone the Repository

```bash
git clone https://github.com/Igornoel/MoMo-Data-Analysis-Group-10
cd MoMo-Data-Analysis-Group-10
```

### Step 2: Set Up Python Environment

```bash
# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### Step 3: Prepare Your Data

1. Place your XML SMS files in the home directory
2. Ensure files follow the expected XML format (see documentation)

### Step 4: Initialize Database

```bash
# Process SMS data and populate database
python backend/database_setup.py
```

### Step 5: Launch Dashboard

1. Open `frontend/index.html` in your web browser
2. The dashboard will automatically load and display your transaction data

## Usage

### Processing New Data

To process additional SMS files:

```bash
# Add new XML files to data/raw/
# Run the processing script
python backend/database_setup.py --update
```

### Dashboard Navigation

1. **Overview Tab**: Summary statistics and key metrics
2. **Transactions Tab**: Detailed transaction list with filtering
3. **Analytics Tab**: Interactive charts and visualizations
4. **Reports Tab**: Generate and export custom reports

### Filtering Data

- **Date Range**: Use the date picker to filter by time period
- **Amount Range**: Set minimum and maximum transaction amounts
- **Transaction Type**: Filter by category (Payment, Transfer, etc.)
- **Search**: Use keywords to find specific transactions

## 🔌 API Reference

The frontend communicates with the SQLite database through JavaScript's Fetch API. Key endpoints include:

- `GET /api/transactions`: Retrieve transaction list
- `GET /api/analytics`: Get analytics data
- `GET /api/summary`: Fetch summary statistics

## Video

The brief video walkthrough link of our project <https://www.loom.com/share/8632519a5fd940ec817b4b2656b3884d?sid=f7765a64-bb2e-4ccd-b26a-47e341fa2889>

## Acknowledgments

- MTN for MoMo services
- Chart.js community for visualization tools
- SQLite team for the excellent database engine

---

**Made with ❤️ for financial data analysis**
