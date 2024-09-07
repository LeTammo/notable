require('dotenv').config();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./wiki.db');
const bcrypt = require('bcryptjs');

initializeDatabase();

function initializeDatabase() {
    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [
        process.env.ADMIN_USERNAME,
        bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10)
    ], (err) => {
        if (err) return console.log(err.message);
        console.log('Admin user created');
    });
}