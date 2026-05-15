import type { DeploymentStatus } from "@glide/shared";

const intervalMs = Number(process.env.WORKER_INTERVAL_MS ?? 10_000);

function logHeartbeat(status: DeploymentStatus): void {
  console.log(`[worker] deployment queue status: ${status}`);
}

logHeartbeat("queued");

setInterval(() => {
  logHeartbeat("queued");
}, intervalMs);
