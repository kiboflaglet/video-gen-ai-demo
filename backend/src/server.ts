import express, { type Express } from "express";
import { aiRoute } from "./routes/ai.route";
import "./config/worker"
const app: Express = express();

app.use(express.json())
app.use(aiRoute);

export { app };
