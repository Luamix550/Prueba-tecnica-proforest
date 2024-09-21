import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import contactsRouter from "./routes/contact.routes.js"
import dotenv from "dotenv";

dotenv.config();

const app = express();


app.use(morgan('dev'));
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", contactsRouter)

export default app;