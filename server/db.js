const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./wiki.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS wiki_entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        title TEXT,
        content TEXT,
        tags TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS preferences (
        user_id INTEGER PRIMARY KEY,
        dark_mode BOOLEAN,
        accent_color TEXT,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )`);
});

module.exports = db;