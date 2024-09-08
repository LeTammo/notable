require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../db');
const authenticateToken = require('./middleware');

const router = express.Router();

router.get('/validate-token', authenticateToken, (req, res) => {
    res.status(200).json({ message: 'Token is valid' });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('User not found.');

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) return res.status(401).send('Invalid password.');

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 86400 });

        db.run('INSERT INTO tokens (user_id, token) VALUES (?, ?)', [user.id, token], (err) => {
            if (err) return res.status(500).send('Error saving token to the server.');

            res.status(200).send({ auth: true, token });
        });
    });
});

router.post('/logout', authenticateToken, (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    db.run('DELETE FROM tokens WHERE token = ?', [token], (err) => {
        if (err) return res.status(500).send({ error: 'Failed to log out.' });
        res.status(200).send({ message: 'Logged out successfully.' });
    });
});


router.post('/register', (req, res) => {
    const { username, password } = req.body;

    db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
        if (err) return res.status(500).send('Error on the server.');
        if (user) return res.status(409).send('Username already exists.');

        const hashedPassword = bcrypt.hashSync(password, 10);

        db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err) => {
            if (err) return res.status(500).send('Error on the server.');

            db.get('SELECT * FROM users WHERE username = ?', [username], (err, newUser) => {
                if (err) return res.status(500).send('Error on the server.');

                const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
                    expiresIn: 86400
                });

                res.status(201).send({ auth: true, token });
            });
        });
    });
});


module.exports = router;