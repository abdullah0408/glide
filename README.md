# Glide

Glide is a self-hosted deployment platform focused on simple, fast deployments from GitHub repositories.

## Workspace

```txt
apps/web       React dashboard
apps/api       Node.js API
apps/worker    Background deployment worker
packages/shared Shared TypeScript types and helpers
packages/config Shared TypeScript configuration
infra/         Container and gateway configuration
storage/       Runtime storage for repos, builds, certificates, logs, and app volumes
```

## Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm typecheck
```
