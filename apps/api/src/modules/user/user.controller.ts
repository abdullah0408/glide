import type { RequestHandler } from "express";
import { sendSuccess } from "../../utils/api-response.js";
import { userService } from "./user.service.js";
import { validateCreateUser } from "./user.validation.js";

type UserController = {
  create: RequestHandler;
  getById: RequestHandler;
  getAll: RequestHandler;
};

export const userController: UserController = {
  create: async (request, response, next) => {
    try {
      const validation = validateCreateUser(request.body);

      if (!validation.success) {
        response.status(400).json({ error: validation.error });
        return;
      }

      const user = await userService.createUser(validation.data);

      if (!user) {
        response.status(409).json({
          error: "User with this email already exists"
        });
        return;
      }

      sendSuccess(response, user, 201);
    } catch (error) {
      next(error);
    }
  },

  getById: async (request, response, next) => {
    try {
      const { id } = request.params;

      if (!id) {
        response.status(400).json({ error: "id is required" });
        return;
      }

      const user = await userService.getUserById(id);

      if (!user) {
        response.status(404).json({ error: "User not found" });
        return;
      }

      sendSuccess(response, user);
    } catch (error) {
      next(error);
    }
  },

  getAll: async (_request, response, next) => {
    try {
      const users = await userService.getUsers();

      sendSuccess(response, users);
    } catch (error) {
      next(error);
    }
  }
};
