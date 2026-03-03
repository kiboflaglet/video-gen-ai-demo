import express, { type Express } from "express";
import { aiRoute } from "./routes/ai.route";
import { toNodeHandler } from "better-auth/node";
import "./config/worker"
import { auth } from "./utils/auth";
import cors from "cors";
const app: Express = express();


app.use(express.json())
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use(aiRoute);

export { app };
