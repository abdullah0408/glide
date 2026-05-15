import { createLogger, type DeploymentStatus } from "@glide/shared";

const intervalMs = Number(process.env.WORKER_INTERVAL_MS ?? 10_000);
const logger = createLogger({ service: "worker" });

function logHeartbeat(status: DeploymentStatus): void {
  logger.info("deployment queue heartbeat", { status });
}

logHeartbeat("queued");

setInterval(() => {
  logHeartbeat("queued");
}, intervalMs);
