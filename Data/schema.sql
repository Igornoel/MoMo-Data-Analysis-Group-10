CREATE TABLE transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    transaction_id TEXT UNIQUE,
    transaction_type TEXT,
    sender TEXT,
    receiver TEXT,
    amount INTEGER,
    fee INTEGER,
    date TIMESTAMP,
    extra_details TEXT
);

CREATE TABLE logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT,
    error_reason TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
