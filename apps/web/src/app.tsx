import { DEPLOYMENT_STATUSES } from "@glide/shared";

const statusPreview = DEPLOYMENT_STATUSES.join(" -> ");

export function App() {
  return (
    <main className="shell">
      <section className="hero">
        <p className="eyebrow">Self-hosted deployment platform</p>
        <h1>Glide</h1>
        <p className="summary">
          Connect a repository, build it, deploy it, and route traffic from one
          small control plane.
        </p>
      </section>

      <section className="panel" aria-label="Deployment status flow">
        <h2>Deployment Flow</h2>
        <p>{statusPreview}</p>
      </section>
    </main>
  );
}
