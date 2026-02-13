import { useState, type FormEvent } from "react";
import ThemeToggle from "../components/layout/ThemeToggle";
import NeonRing from "../components/layout/NeonRing";

interface LoginPageProps {
  onBack: () => void;
  onLogin: (email: string, password: string) => Promise<void>;
}

export default function LoginPage({ onBack, onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    try {
      setSubmitting(true);
      await onLogin(email.trim(), password.trim());
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Login failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="login-page">
      <NeonRing />
      <div className="container py-5">
        <div className="d-flex justify-content-between mb-4">
          <button className="btn btn-outline-theme" onClick={onBack} type="button">
            Back
          </button>
          <ThemeToggle />
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-5">
            <section className="glass-card p-4 p-md-5 animate-fade-hero">
              <h2 className="mb-1">Welcome Back</h2>
              <p className="text-secondary mb-4">Sign in to continue managing expenses.</p>
              <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                <div>
                  <label className="form-label">Email</label>
                  <input
                    className="form-control form-control-modern"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Password</label>
                  <input
                    className="form-control form-control-modern"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                </div>
                {error ? <div className="alert alert-danger py-2 mb-0">{error}</div> : null}
                <button className="btn btn-accent" type="submit" disabled={submitting}>
                  {submitting ? "Signing in..." : "Login"}
                </button>
              </form>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
