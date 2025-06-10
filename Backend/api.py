from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

DB_NAME = "../Data/sms_transactions.db"

def dict_from_row(row):
    return {
        "id": row[0],
        "transaction_id": row[1],
        "transaction_type": row[2],
        "sender": row[3],
        "receiver": row[4],
        "amount": row[5],
        "fee": row[6],
        "date": row[7],
        "extra_details": row[8]
    }

@app.route('/transactions', methods=['GET'])
def get_transactions():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM transactions")
    data = cursor.fetchall()
    conn.close()
    
    transactions = [dict_from_row(row) for row in data]
    return jsonify(transactions)

if __name__ == "__main__":
    app.run(debug=True)

