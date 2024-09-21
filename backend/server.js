/**
 * @file app.js
 * @description Configuración principal de la aplicación Express para la API de gestión de contactos.
 * Este archivo establece la configuración básica del servidor, incluyendo middleware, rutas, 
 * y configuración de CORS para permitir solicitudes desde el frontend.
 */

import express from "express"; // Importa Express para crear y configurar la aplicación.
import morgan from "morgan"; // Importa Morgan, middleware para el registro de solicitudes HTTP.
import authRoutes from "./routes/auth.routes.js"; // Importa las rutas para autenticación de usuarios.
import contactsRouter from "./routes/contact.routes.js"; // Importa las rutas para la gestión de contactos.
import dotenv from "dotenv"; // Importa dotenv para cargar las variables de entorno.
import cors from "cors"; // Importa CORS para habilitar solicitudes entre dominios.

dotenv.config(); // Carga las variables de entorno desde el archivo .env.

/**
 * Configuración de CORS.
 * Permite solicitudes desde el frontend de Angular en localhost:4200.
 * 
 * @property {string} origin - Dominio permitido.
 * @property {string} methods - Métodos HTTP permitidos (GET, POST, PUT, DELETE).
 * @property {string} allowedHeaders - Headers permitidos en las solicitudes.
 * @property {number} optionsSuccessStatus - Código de estado para respuestas exitosas en opciones.
 */
const corsOptions = {
  origin: 'http://localhost:3000', // Permitir solicitudes desde el frontend de Angular.
  methods: 'GET,POST,PUT,DELETE', // Métodos HTTP permitidos.
  allowedHeaders: 'Content-Type,Authorization', // Headers permitidos.
  optionsSuccessStatus: 200 // Estado para respuestas exitosas.
};

// Usar CORS en todas las rutas de la aplicación.
const app = express(); // Crea una instancia de la aplicación Express.
app.use(cors(corsOptions)); // Aplica las opciones de CORS.


/**
 * Middleware de Morgan para registrar las solicitudes HTTP en el formato 'dev'.
 * Esto permite ver detalles de las solicitudes en la consola.
 */
app.use(morgan('dev'));

/**
 * Middleware de Express para parsear el cuerpo de las solicitudes entrantes como JSON.
 * Necesario para manejar datos JSON en los endpoints.
 */
app.use(express.json());

/**
 * Configuración de rutas de autenticación.
 * 
 */
app.use("/api", authRoutes); // Rutas de autenticación de usuarios.

/**
 * Configuración de rutas para la gestión de contactos.
 * 
 */
app.use("/api", contactsRouter); // Rutas de gestión de contactos.

export default app; // Exporta la instancia de la aplicación para su uso en otros módulos.
