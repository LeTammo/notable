const express = require('express');
const db = require('../db');
const router = express.Router();
const authenticateToken = require('./middleware');

router.get('/', authenticateToken, (req, res) => {
    const userId = req.user.id;
    db.get(`SELECT dark_mode, accent_color FROM preferences WHERE user_id = ?`, [userId], (err, row) => {
        if (err) return res.status(500).json({ error: 'Failed to fetch preferences' });
        res.status(200).json(row);
    });
});

router.post('/accent-color', authenticateToken, (req, res) => {
    const userId = req.user.id;
    const { accent_color } = req.body;

    const query = `
        INSERT INTO preferences (user_id, accent_color) 
        VALUES (?, ?)
        ON CONFLICT(user_id) 
        DO UPDATE SET accent_color = excluded.accent_color;
    `;

    db.run(query, [userId, accent_color], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to update accent color preference' });
        }
        res.status(200).json({ message: 'Accent color preference updated successfully' });
    });
});

router.post('/dark-mode', authenticateToken, (req, res) => {
    const userId = req.user.id;
    const { dark_mode } = req.body;

    db.run(`
        INSERT INTO preferences (user_id, dark_mode) 
        VALUES (?, ?) 
        ON CONFLICT(user_id) 
        DO UPDATE SET dark_mode=excluded.dark_mode
    `, [userId, dark_mode], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to update dark mode preference' });
        res.status(200).json({ message: 'Dark mode preference updated successfully' });
    });
});

module.exports = router;