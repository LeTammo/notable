const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./wiki.db', (err) => {
    if (err) {
        console.error('Could not connect to database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

module.exports = db;