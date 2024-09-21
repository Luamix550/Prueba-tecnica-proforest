import bcrypt from 'bcrypt';
import pool from '../config/db.config.js';
import { createAccessToken } from '../libs/jwt.js';

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!password) {
        return res.status(400).send({ message: "Password is required" });
    }

    try {
        const [results] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

        if (results.length > 0) {
            return res.status(400).send({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [insertResult] = await pool.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)', 
            [username, email, hashedPassword]
        );


        const token = createAccessToken(insertResult.insertId);

        res.status(201).send({ 
            message: "User registered successfully!", 
            userId: insertResult.insertId,
            token 
        });
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).send({ message: "Server error" });
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ message: "Email and password are required" });
    }

    try {
        const [results] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

        if (results.length === 0) {
            return res.status(400).send({ message: "User not found" });
        }

        const user = results[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ message: "Invalid credentials" });
        }

        const token = createAccessToken(user.id);

        res.status(200).send({ 
            message: "Login successful!", 
            token
        });
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).send({ message: "Server error" });
    }
};