import mysql2 from "mysql2";

export const dbConnection = mysql2.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "prueba-tecnica"
});

dbConnection.getConnection((err, connection) => {
    if (err) {
        console.error("Error connecting to the DB: " + err.stack);
        return;
    }
    console.log("Connected as ID: " + connection.threadId);
    
    connection.release();
});
