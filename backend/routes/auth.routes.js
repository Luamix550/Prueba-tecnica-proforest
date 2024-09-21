/**
 * @file auth.routes.js
 * @description Rutas para la autenticación de usuarios en la API.
 * Este archivo define las rutas HTTP para las operaciones de login y registro.
 */

import express from 'express'; // Importa el framework Express para el enrutamiento.
import { login, register, logout} from '../controllers/auth.controller.js'; // Importa los controladores de autenticación.

const router = express.Router(); // Crea una instancia del enrutador de Express.

/**
 * @route {POST} /api/register
 * @description Registra un nuevo usuario.
 * @access Public
 */
router.post('/register', register);

/**
 * @route {POST} /api/login
 * @description Inicia sesión de un usuario existente.
 * @access Public
 */
router.post('/login', login);

/**
 * @route {POST} /api/logout
 * @description Cierra la seccion.
 * @access Public
 */
router.post("/logout", logout); 

export default router; // Exporta el enrutador para su uso en otros módulos.
