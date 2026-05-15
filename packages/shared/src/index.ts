export const DEPLOYMENT_STATUSES = [
  "queued",
  "cloning",
  "building",
  "deploying",
  "running",
  "failed",
  "stopped"
] as const;

export type DeploymentStatus = (typeof DEPLOYMENT_STATUSES)[number];

export type Project = {
  id: string;
  name: string;
  repositoryUrl: string;
  domain?: string;
  createdAt: string;
};

export type Deployment = {
  id: string;
  projectId: string;
  status: DeploymentStatus;
  commitSha: string;
  createdAt: string;
  finishedAt?: string;
};
