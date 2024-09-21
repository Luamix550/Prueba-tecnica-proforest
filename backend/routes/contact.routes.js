/**
 * @file contact.routes.js
 * @description Rutas para la gestión de contactos en la API.
 * Este archivo define las rutas HTTP para las operaciones CRUD sobre los contactos.
 */

import express from "express"; // Importa el framework Express para el enrutamiento.
import { createContact, contacts, updateContact, deleteContact } from "../controllers/contact.controller.js"; // Importa los controladores de contactos.

const router = express.Router(); // Crea una instancia del enrutador de Express.

/**
 * @route {GET} /api/contacts
 * @description Obtiene la lista de todos los contactos.
 * @access Public
 */
router.get("/contacts", contacts);

/**
 * @route {POST} /api/contacts/create
 * @description Crea un nuevo contacto.
 * @access Public
 */
router.post("/contacts/create", createContact);

/**
 * @route {PUT} /api/contacts/:id/update
 * @description Actualiza un contacto existente por su ID.
 * @param {string} id - ID del contacto a actualizar.
 * @access Public
 */
router.put("/contacts/:id/update", updateContact);

/**
 * @route {DELETE} /api/contacts/:id/delete
 * @description Elimina un contacto existente por su ID.
 * @param {string} id - ID del contacto a eliminar.
 * @access Public
 */
router.delete("/contacts/:id/delete", deleteContact);

export default router; // Exporta el enrutador para su uso en otros módulos.
