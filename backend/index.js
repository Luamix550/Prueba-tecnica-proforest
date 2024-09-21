/**
 * @file app.js
 * @description Configuración y creación de la aplicación Express.
 * Este archivo establece la configuración básica del servidor, incluyendo middleware y rutas.
 */

import express from "express"; // Importa el framework Express para la creación del servidor.
import morgan from "morgan"; // Importa Morgan, un middleware para el registro de solicitudes HTTP.
import authRoutes from "./routes/auth.routes.js"; // Importa las rutas para la autenticación de usuarios.
import contactsRouter from "./routes/contact.routes.js"; // Importa las rutas para la gestión de contactos.
import dotenv from "dotenv"; // Importa dotenv para manejar variables de entorno.

dotenv.config(); // Carga las variables de entorno desde un archivo .env.
const app = express(); // Crea una instancia de la aplicación Express.

console.log("Server running on the port 3000")

/**
 * Middleware para el registro de solicitudes HTTP.
 * Utiliza Morgan para registrar las solicitudes en el formato de desarrollo.
 */
app.use(morgan('dev'));

/**
 * Middleware para parsear el cuerpo de las solicitudes como JSON.
 * Permite que la aplicación maneje datos JSON en las solicitudes entrantes.
 */
app.use(express.json());

/**
 * Configuración de las rutas de la API.
 * 
 * @route {GET|POST|PUT|DELETE} /api/auth
 * @description Rutas para autenticación de usuarios.
 */
app.use("/api", authRoutes); // Rutas de autenticación.

/**
 * @route {GET|POST|PUT|DELETE} /api/contacts
 * @description Rutas para la gestión de contactos.
 */
app.use("/api", contactsRouter); // Rutas de contactos.

export default app; // Exporta la instancia de la aplicación para su uso en otros módulos.

