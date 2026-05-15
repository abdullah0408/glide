import { createServer } from "node:http";
import { createLogger, DEPLOYMENT_STATUSES } from "@glide/shared";

const host = process.env.API_HOST ?? "0.0.0.0";
const port = Number(process.env.API_PORT ?? 3001);
const logger = createLogger({ service: "api" });

const server = createServer((request, response) => {
  response.setHeader("content-type", "application/json");

  if (request.url === "/health") {
    response.end(
      JSON.stringify({
        service: "api",
        status: "ok"
      })
    );
    return;
  }

  if (request.url === "/deployment-statuses") {
    response.end(
      JSON.stringify({
        statuses: DEPLOYMENT_STATUSES
      })
    );
    return;
  }

  response.statusCode = 404;
  response.end(
    JSON.stringify({
      error: "Not found"
    })
  );
});

server.listen(port, host, () => {
  logger.info("server listening", {
    host,
    port,
    url: `http://${host}:${port}`
  });
});
