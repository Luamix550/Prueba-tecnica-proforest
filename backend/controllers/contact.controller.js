import pool from "../config/db.config.js"

export const contacts = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM contacts');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createContact = async (req, res) => {
    const { first_name, last_name, email } = req.body;

    try {
        const [result] = await pool.query(
            'INSERT INTO contacts (first_name, last_name, email) VALUES (?, ?, ?)', 
            [first_name, last_name, email]
        );

        res.status(201).send({ 
            message: "Contact created successfully!", 
            contactId: result.insertId 
        });
    } catch (error) {
        console.error('Error creating contact:', error);
        res.status(500).send({ message: "Server error" });
    }
};


export const updateContact = async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email } = req.body; 

    try {
        const [result] = await pool.query(
            'UPDATE contacts SET first_name = ?, last_name = ?, email = ? WHERE id = ?', 
            [first_name, last_name, email, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).send({ message: "Contact not found" });
        }

        res.status(200).send({ message: "Contact updated successfully!" });
    } catch (error) {
        console.error('Error updating contact:', error);
        res.status(500).send({ message: "Server error" });
    }
};

export const deleteContact = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query(
            'DELETE FROM contacts WHERE id = ?', 
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).send({ message: "Contact not found" });
        }

        res.status(200).send({ message: "Contact deleted successfully!" });
    } catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).send({ message: "Server error" });
    }
};