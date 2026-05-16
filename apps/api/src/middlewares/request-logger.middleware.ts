import type { RequestHandler } from "express";
import { logger } from "../config/logger.js";

export const requestLoggerMiddleware: RequestHandler = (
  request,
  response,
  next
) => {
  const startedAt = Date.now();

  response.on("finish", () => {
    logger.info("request completed", {
      method: request.method,
      path: request.originalUrl,
      statusCode: response.statusCode,
      durationMs: Date.now() - startedAt
    });
  });

  next();
};
