/**
 * @file db.config.js
 * @description Configuración de la conexión a la base de datos MySQL utilizando un pool de conexiones.
 * Este archivo establece la conexión con la base de datos a través de la configuración definida en las variables de entorno.
 */

import mysql from 'mysql2/promise'; // Importa mysql2 con soporte para promesas.
import dotenv from 'dotenv'; // Importa dotenv para gestionar variables de entorno.

dotenv.config(); // Carga las variables de entorno desde el archivo .env.

const pool = mysql.createPool({
    host: process.env.DB_HOST, // Host de la base de datos.
    user: process.env.DB_USER, // Usuario de la base de datos.
    password: process.env.DB_PASSWORD, // Contraseña del usuario de la base de datos.
    database: process.env.DB_NAME // Nombre de la base de datos.
});

export default pool; // Exporta el pool de conexiones para su uso en otros módulos.