import express, { type Express } from "express";
import { routes } from "./routes/index.js";
import { corsMiddleware } from "./middlewares/cors.middleware.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { notFoundMiddleware } from "./middlewares/not-found.middleware.js";
import { requestLoggerMiddleware } from "./middlewares/request-logger.middleware.js";

export const app: Express = express();

app.use(corsMiddleware);
app.options("*", (_request, response) => {
  response.sendStatus(204);
});
app.use(express.json());
app.use(requestLoggerMiddleware);

app.use("/api", routes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);
