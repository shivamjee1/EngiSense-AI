import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await loginUser(
        email,
        password
      );

      login(data.access_token);

      navigate("/dashboard");
    } catch (err) {
      const detail = err.response?.data?.detail;

      setError(
        typeof detail === "string"
          ? detail
          : "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <section className="auth-brand-panel">
        <div className="auth-brand-content">

          <div className="auth-logo">
            <span className="auth-logo-mark">
              E
            </span>

            <span>EngiSense AI</span>
          </div>

          <h1>
            Engineering data,
            <br />
            <span>made intelligent.</span>
          </h1>

          <p>
            Analyze engineering datasets, visualize
            critical parameters, detect anomalies,
            and build intelligent insights from your
            technical data.
          </p>

          <div className="auth-features">

            <div className="auth-feature">
              <strong>Data Analytics</strong>
              <span>
                Statistics, correlations and outliers
              </span>
            </div>

            <div className="auth-feature">
              <strong>Engineering Insights</strong>
              <span>
                Turn technical data into useful information
              </span>
            </div>

            <div className="auth-feature">
              <strong>Visualization</strong>
              <span>
                Engineering trends and correlation charts
              </span>
            </div>

            <div className="auth-feature">
              <strong>AI + RAG</strong>
              <span>
                Intelligent document-based engineering analysis
              </span>
            </div>

          </div>
        </div>
      </section>

      <section className="auth-form-panel">

        <div className="auth-card">

          <h2>Welcome back</h2>

          <p className="auth-card-subtitle">
            Sign in to continue to your engineering workspace.
          </p>

          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >

            <div className="form-group">
              <label htmlFor="email">
                Email address
              </label>

              <input
                id="email"
                type="email"
                value={email}
                placeholder="you@example.com"
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                placeholder="Enter your password"
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                required
              />
            </div>

            <button
              className="primary-button"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Signing in..."
                : "Sign in"}
            </button>

          </form>

          <div className="auth-switch">
            Don't have an account?{" "}
            <Link to="/register">
              Create an account
            </Link>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Login;