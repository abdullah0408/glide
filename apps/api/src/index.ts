import { app } from "./app.js";
import { env } from "./config/env.js";
import { logger } from "./config/logger.js";

app.listen(env.port, env.host, () => {
  logger.info("server listening", {
    host: env.host,
    port: env.port,
    url: `http://${env.host}:${env.port}`
  });
});
