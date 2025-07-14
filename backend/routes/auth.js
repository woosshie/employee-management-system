const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

//const { db } = require('../index');
const db = require('../db');
const authenticateToken = require('../middleware/auth');

const jwtSecret = 'your_jwt_secret'; // Replace with a strong secret key


// Register a new user
router.post('/register', (req, res) => {
    
    const { username, email, password, role } = req.body;

    // Check if the user already exists
    const checkUserQuery = 'SELECT * FROM User WHERE Username = ? OR Email = ?';
    db.query(checkUserQuery, [username, email], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password and store the user
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) throw err;

            const newUser = {
                Username: username,
                PasswordHash: hash,
                Email: email,
                Role: role || 'user',
                CreatedDate: new Date(),
            };
            const sql = 'INSERT INTO User SET ?';
            db.query(sql, newUser, (err, result) => {
                if (err) throw err;
                res.status(201).json({ message: 'User registered successfully' });
            });
        });
    });
});

// User login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM User WHERE Username = ?';
    try {
        const [users] = await db.query(sql, [username]);
        if (users.length === 0) {
            return res.status(400).json({ error: 'User not found' });
        }
        const user = users[0];
        // Compare the provided password with the stored hash
        bcrypt.compare(password, user.PasswordHash, (err, isMatch) => {
            if (err) {
                console.error('Password comparison error:', err);
                return res.status(500).json({ message: 'Server error' });
            }
            if (!isMatch) {
                return res.status(400).json({ message: 'Incorrect password' });
            }

            // Create a JWT token
            const token = jwt.sign(
                { userID: user.UserID, username: user.Username, role: user.Role },
                jwtSecret,
                { expiresIn: '1h' }
            );

            res.json({  
                message: 'Login successful',
                token,
                user: {
                    userID: user.UserID,
                    username: user.Username,
                    email: user.Email,
                    role: user.Role
                }
            });
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;