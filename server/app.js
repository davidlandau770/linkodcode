import express from "express";
import cors from "cors";
import { configRoutes } from "./routes/configRoutes.js";
import { notFound } from "./middleware/notFound.js";
import { config } from "dotenv"
import cookieParser from "cookie-parser";
config()

const PORT = process.env.PORT;

const app = express()
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type","Authorization"]
}));
app.use(cookieParser())

configRoutes(app)

app.use('/', notFound)

app.listen(PORT, () => {
    console.log(`Express server running on http://localhost:${PORT}`);
})