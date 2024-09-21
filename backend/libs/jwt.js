/**
 * @file token.utils.js
 * @description Módulo para la creación de tokens de acceso JWT.
 * Este archivo contiene funciones relacionadas con la generación de tokens de acceso.
 */

import dotenv from "dotenv"; // Importa dotenv para gestionar variables de entorno.
import jwt from "jsonwebtoken"; // Importa jsonwebtoken para la creación de tokens JWT.

dotenv.config(); // Carga las variables de entorno desde el archivo .env.

const JWT_SECRET = process.env.TOKEN_SECRET; // Obtiene la clave secreta para firmar el token desde las variables de entorno.

/**
 * @function createAccessToken
 * @description Crea un token de acceso para un usuario dado.
 * @param {string} userId - ID del usuario para el cual se crea el token.
 * @returns {string} Token de acceso firmado.
 * @throws {Error} Si la firma del token falla.
 */
export const createAccessToken = (userId) => {
    const payload = { id: userId }; // Define el payload del token que incluye el ID del usuario.
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' }); // Firma el token con la clave secreta y establece una expiración de 1 día.
};
