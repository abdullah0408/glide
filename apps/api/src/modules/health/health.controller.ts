import type { RequestHandler } from "express";
import { sendSuccess } from "../../utils/api-response.js";

type HealthController = {
  check: RequestHandler;
};

export const healthController: HealthController = {
  check: ((_request, response) => {
    sendSuccess(response, {
      service: "api",
      status: "ok",
    });
  }) satisfies RequestHandler,
};
