import { Router } from "express";
import { healthController } from "../modules/health/health.controller.js";
import { healthRoutes } from "../modules/health/health.routes.js";
import { userRoutes } from "../modules/user/user.routes.js";

export const routes: Router = Router();

routes.get("/", healthController.check);
routes.use("/health", healthRoutes);
routes.use("/users", userRoutes);
