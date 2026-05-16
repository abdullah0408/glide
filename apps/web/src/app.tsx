import { type FormEvent, useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";
const SESSION_EMAIL_KEY = "glide:user-email";

type User = {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
};

type ApiSuccess<T> = {
  success: true;
  data: T;
};

type FormState = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};

export function App() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    avatar: ""
  });
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [createdUser, setCreatedUser] = useState<User | null>(null);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setSessionEmail(localStorage.getItem(SESSION_EMAIL_KEY));
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          avatar: form.avatar || undefined
        })
      });

      const payload = await response.json();

      if (!response.ok) {
        setMessage(payload.error ?? "Unable to create user");
        return;
      }

      const user = (payload as ApiSuccess<User>).data;
      localStorage.setItem(SESSION_EMAIL_KEY, user.email);
      setSessionEmail(user.email);
      setCreatedUser(user);
      setForm({
        name: "",
        email: "",
        password: "",
        avatar: ""
      });
      setMessage("User created and signed in.");
    } catch {
      setMessage("Unable to reach the API.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleSignOut() {
    localStorage.removeItem(SESSION_EMAIL_KEY);
    setSessionEmail(null);
    setCreatedUser(null);
    setMessage("Signed out.");
  }

  return (
    <main className="shell" aria-label="User signup test">
      <section className="auth-panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Glide test auth</p>
            <h1>Create User</h1>
          </div>

          {sessionEmail ? (
            <button className="secondary-button" type="button" onClick={handleSignOut}>
              Sign out
            </button>
          ) : null}
        </div>

        {sessionEmail ? (
          <div className="session-box">
            <span>Signed in as</span>
            <strong>{sessionEmail}</strong>
          </div>
        ) : (
          <form className="signup-form" onSubmit={handleSubmit}>
            <label>
              Name
              <input
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({ ...current, name: event.target.value }))
                }
                placeholder="Ada Lovelace"
              />
            </label>

            <label>
              Email
              <input
                type="email"
                value={form.email}
                onChange={(event) =>
                  setForm((current) => ({ ...current, email: event.target.value }))
                }
                placeholder="ada@example.com"
              />
            </label>

            <label>
              Password
              <input
                type="password"
                value={form.password}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    password: event.target.value
                  }))
                }
                placeholder="Plain text for testing"
              />
            </label>

            <label>
              Avatar URL
              <input
                value={form.avatar}
                onChange={(event) =>
                  setForm((current) => ({ ...current, avatar: event.target.value }))
                }
                placeholder="https://example.com/avatar.png"
              />
            </label>

            <button className="primary-button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create user"}
            </button>
          </form>
        )}

        {message ? <p className="message">{message}</p> : null}

        {createdUser ? (
          <dl className="user-summary">
            <div>
              <dt>Role</dt>
              <dd>{createdUser.role}</dd>
            </div>
            <div>
              <dt>User ID</dt>
              <dd>{createdUser.id}</dd>
            </div>
          </dl>
        ) : null}
      </section>
    </main>
  );
}
