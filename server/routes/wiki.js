const express = require('express');
const db = require('../db');
const jwt = require('jsonwebtoken');
const router = express.Router();

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied, token missing!' });

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        res.status(400).json({ error: 'Token is not valid' });
    }
};

router.post('/create', authenticateToken, (req, res) => {
    const { title, content, tags } = req.body;
    const user_id = req.user.id;

    db.run('INSERT INTO wiki_entries (user_id, title, content, tags) VALUES (?, ?, ?, ?)',
        [user_id, title, content, tags], (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'Entry created' });
        });
});

router.get('/entries', authenticateToken, (req, res) => {
    const user_id = req.user.id;
    const { page = 1, search = '' } = req.query;
    const limit = 10;
    const offset = (page - 1) * limit;

    db.all('SELECT * FROM wiki_entries WHERE user_id = ? AND title LIKE ? LIMIT ? OFFSET ?',
        [user_id, `%${search}%`, limit, offset], (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            db.get('SELECT COUNT(*) as count FROM wiki_entries WHERE user_id = ? AND title LIKE ?',
                [user_id, `%${search}%`], (err, countRow) => {
                    if (err) return res.status(500).json({ error: err.message });
                    res.json({ entries: rows, hasMore: offset + rows.length < countRow.count });
                });
        });
});

module.exports = router;