import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "dotenv";

const currentDir = dirname(fileURLToPath(import.meta.url));
const apiDir = resolve(currentDir, "../..");
const rootDir = resolve(apiDir, "../..");
const apiEnvPath = resolve(apiDir, ".env");
const rootEnvPath = resolve(rootDir, ".env");

config({
  path: existsSync(apiEnvPath) ? apiEnvPath : rootEnvPath
});

export const env = {
  host: process.env.API_HOST ?? "0.0.0.0",
  port: Number(process.env.API_PORT ?? 3001),
  databaseUrl: process.env.DATABASE_URL
};
