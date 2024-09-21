/**
 * @file contact.controller.js
 * @description Controlador para gestionar las operaciones CRUD de contactos.
 * Este archivo contiene las funciones que manejan las solicitudes relacionadas con los contactos.
 */

import pool from "../config/db.config.js"; // Importa el pool de conexiones a la base de datos.

 /**
  * @function contacts
  * @description Obtiene la lista de todos los contactos.
  * @param {Object} req - Objeto de solicitud HTTP.
  * @param {Object} res - Objeto de respuesta HTTP.
  * @returns {Promise<void>} Respuesta con la lista de contactos o un mensaje de error.
  */
export const contacts = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM contacts'); // Realiza una consulta a la base de datos para obtener contactos.
        res.status(200).json(rows); // Envía la lista de contactos como respuesta.
    } catch (error) {
        res.status(500).json({ message: error.message }); // Manejo de errores.
    }
};

/**
 * @function createContact
 * @description Crea un nuevo contacto en la base de datos.
 * @param {Object} req - Objeto de solicitud HTTP que contiene los datos del contacto.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>} Respuesta con un mensaje de éxito o un mensaje de error.
 */
export const createContact = async (req, res) => {
    const { first_name, last_name, email } = req.body; // Desestructura los datos del contacto desde el cuerpo de la solicitud.

    try {
        const [result] = await pool.query(
            'INSERT INTO contacts (first_name, last_name, email) VALUES (?, ?, ?)', 
            [first_name, last_name, email] // Inserta el nuevo contacto en la base de datos.
        );

        res.status(201).send({ 
            message: "Contact created successfully!", 
            contactId: result.insertId // Devuelve el ID del nuevo contacto.
        });
    } catch (error) {
        console.error('Error creating contact:', error); // Registro del error en la consola.
        res.status(500).send({ message: "Server error" }); // Manejo de errores.
    }
};

/**
 * @function updateContact
 * @description Actualiza un contacto existente en la base de datos.
 * @param {Object} req - Objeto de solicitud HTTP que contiene el ID del contacto y los nuevos datos.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>} Respuesta con un mensaje de éxito o un mensaje de error.
 */
export const updateContact = async (req, res) => {
    const { id } = req.params; // Obtiene el ID del contacto de los parámetros de la solicitud.
    const { first_name, last_name, email } = req.body; // Desestructura los nuevos datos del contacto.

    try {
        const [result] = await pool.query(
            'UPDATE contacts SET first_name = ?, last_name = ?, email = ? WHERE id = ?', 
            [first_name, last_name, email, id] // Actualiza el contacto en la base de datos.
        );

        if (result.affectedRows === 0) {
            return res.status(404).send({ message: "Contact not found" }); // Manejo de errores si el contacto no se encuentra.
        }

        res.status(200).send({ message: "Contact updated successfully!" }); // Mensaje de éxito.
    } catch (error) {
        console.error('Error updating contact:', error); // Registro del error en la consola.
        res.status(500).send({ message: "Server error" }); // Manejo de errores.
    }
};

/**
 * @function deleteContact
 * @description Elimina un contacto existente de la base de datos.
 * @param {Object} req - Objeto de solicitud HTTP que contiene el ID del contacto a eliminar.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>} Respuesta con un mensaje de éxito o un mensaje de error.
 */
export const deleteContact = async (req, res) => {
    const { id } = req.params; // Obtiene el ID del contacto de los parámetros de la solicitud.

    try {
        const [result] = await pool.query(
            'DELETE FROM contacts WHERE id = ?', 
            [id] // Elimina el contacto de la base de datos.
        );

        if (result.affectedRows === 0) {
            return res.status(404).send({ message: "Contact not found" }); // Manejo de errores si el contacto no se encuentra.
        }

        res.status(200).send({ message: "Contact deleted successfully!" }); // Mensaje de éxito.
    } catch (error) {
        console.error('Error deleting contact:', error); // Registro del error en la consola.
        res.status(500).send({ message: "Server error" }); // Manejo de errores.
    }
};
