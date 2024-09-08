const db = require('../db');
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).send({ error: 'No token provided.' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send({ error: 'Invalid token.' });

        db.get('SELECT * FROM tokens WHERE token = ?', [token], (err, tokenRecord) => {
            if (err || !tokenRecord) return res.status(401).send({ error: 'Invalid token.' });

            req.user = { id: decoded.id };
            next();
        });
    });
}

module.exports = authenticateToken;