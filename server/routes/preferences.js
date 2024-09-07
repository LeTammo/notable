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

router.get('/', authenticateToken, (req, res) => {
    const userId = req.user.id;
    db.get(`SELECT dark_mode, accent_color FROM preferences WHERE user_id = ?`, [userId], (err, row) => {
        if (err) return res.status(500).json({ error: 'Failed to fetch preferences' });
        res.status(200).json(row);
    });
});

router.post('/', authenticateToken, (req, res) => {
    const userId = req.user.id;
    const { dark_mode, accent_color } = req.body;

    db.run(`
        INSERT INTO preferences (user_id, dark_mode, accent_color) 
        VALUES (?, ?, ?) 
        ON CONFLICT(user_id) 
        DO UPDATE SET dark_mode=excluded.dark_mode, accent_color=excluded.accent_color
    `, [userId, dark_mode, accent_color], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to update preferences' });
        res.status(200).json({ message: 'Preferences updated successfully' });
    });
});

module.exports = router;