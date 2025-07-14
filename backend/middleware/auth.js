console.log("Middleware auth.js loaded");
const jwt = require('jsonwebtoken');
const jwtSecret = 'your_jwt_secret';

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401); // No token, unauthorized

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
            console.error('JWT verification error:', err);
            return res.sendStatus(403); // Forbidden if token is invalid
        }
        req.user = user; // Attach user info to request
        next(); // Move on to the next middleware or route handler
    });
}

module.exports = authenticateToken;