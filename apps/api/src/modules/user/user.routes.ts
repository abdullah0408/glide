import { Router, type Router as ExpressRouter } from "express";
import { userController } from "./user.controller.js";

export const userRoutes: ExpressRouter = Router();

userRoutes.post("/", userController.create);
userRoutes.get("/", userController.getAll);
userRoutes.get("/:id", userController.getById);
