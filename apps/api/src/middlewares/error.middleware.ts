import type { ErrorRequestHandler } from "express";
import { logger } from "../config/logger.js";

export const errorMiddleware: ErrorRequestHandler = (
  error,
  _request,
  response,
  _next
) => {
  logger.error("request failed", { error });

  response.status(500).json({
    error: "Internal server error"
  });
};
