import { Router, type Router as ExpressRouter } from "express";
import { healthController } from "./health.controller.js";

export const healthRoutes: ExpressRouter = Router();

healthRoutes.get("/", healthController.check);
