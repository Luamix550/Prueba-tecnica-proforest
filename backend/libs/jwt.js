import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

const JWT_SECRET = process.env.TOKEN_SECRET;

export const createAccessToken = (userId) => {
    const payload = { id: userId };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
};