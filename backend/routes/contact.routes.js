import express from "express";
import { createContact, contacts, updateContact, deleteContact } from "../controllers/contact.controller.js";

const router = express.Router();

router.get("/contacts", contacts);
router.post("/contacts/create", createContact);
router.put("/contacts/:id/update", updateContact);
router.delete("/contacts/:id/delete", deleteContact);

export default router;
