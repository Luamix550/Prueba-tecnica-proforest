/**
 * @file auth.controller.js
 * @description Controlador para gestionar la autenticación de usuarios.
 * Este archivo contiene las funciones para registrar, iniciar sesión y cerrar sesión de usuarios.
 */

import bcrypt from 'bcrypt'; // Importa bcrypt para el hashing de contraseñas.
import pool from '../config/db.config.js'; // Importa el pool de conexiones a la base de datos.
import { createAccessToken } from '../libs/jwt.js'; // Importa la función para crear tokens JWT.

/**
 * @function register
 * @description Registra un nuevo usuario en la base de datos.
 * @param {Object} req - Objeto de solicitud HTTP que contiene los datos del usuario.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>} Respuesta con un mensaje de éxito, ID del usuario y token de acceso o un mensaje de error.
 */
export const register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!password) {
        return res.status(400).send({ message: "Password is required" }); // Manejo de errores si no se proporciona contraseña.
    }
    try {
        const [results] = await pool.query('SELECT * FROM users WHERE email = ?', [email]); // Verifica si el usuario ya existe.

        if (results.length > 0) {
            return res.status(400).send({ message: "User already exists" }); // Manejo de errores si el usuario ya existe.
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Hashea la contraseña antes de guardarla.

        const [insertResult] = await pool.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)', 
            [username, email, hashedPassword] // Inserta el nuevo usuario en la base de datos.
        );

        const token = createAccessToken(insertResult.insertId); // Crea un token de acceso para el nuevo usuario.

        res.status(201).send({ 
            message: "User registered successfully!", 
            userId: insertResult.insertId,
            token 
        });
    } catch (error) {
        console.error('Server error:', error); // Registro del error en la consola.
        return res.status(500).send({ message: "Server error" }); // Manejo de errores.
    }
};

/**
 * @function login
 * @description Inicia sesión de un usuario existente.
 * @param {Object} req - Objeto de solicitud HTTP que contiene las credenciales del usuario.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>} Respuesta con un mensaje de éxito y token de acceso o un mensaje de error.
 */
export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ message: "Email and password are required" }); // Manejo de errores si faltan credenciales.
    }

    try {
        const [results] = await pool.query('SELECT * FROM users WHERE email = ?', [email]); // Verifica si el usuario existe.

        if (results.length === 0) {
            return res.status(400).send({ message: "User not found" }); // Manejo de errores si el usuario no se encuentra.
        }

        const user = results[0];

        const isMatch = await bcrypt.compare(password, user.password); // Compara la contraseña proporcionada con la almacenada.
        if (!isMatch) {
            return res.status(400).send({ message: "Invalid credentials" }); // Manejo de errores si las credenciales son inválidas.
        }

        const token = createAccessToken(user.id); // Crea un token de acceso para el usuario.

        res.status(200).send({ 
            message: "Login successful!", 
            token
        });
    } catch (error) {
        console.error('Server error:', error); // Registro del error en la consola.
        return res.status(500).send({ message: "Server error" }); // Manejo de errores.
    }
};

/**
 * @function logout
 * @description Cierra la sesión del usuario.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>} Respuesta con un mensaje de éxito.
 */
export const logout = async (req, res) => {
    res.status(200).send({ message: "Logout successful!" }); // Mensaje de éxito al cerrar sesión.
};
