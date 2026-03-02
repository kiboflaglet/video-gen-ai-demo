import { aiController } from "@/controllers/ai.controller";
import express, { type Router } from "express";

export const aiRoute: Router = express.Router();

aiRoute.post("/video/generate", aiController.generateVideo);
aiRoute.get("/video/status/:id", aiController.getVideo);
