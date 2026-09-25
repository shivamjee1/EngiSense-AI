import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await registerUser(email, password);

      navigate("/login");
    } catch (err) {
      const detail = err.response?.data?.detail;

      setError(
        typeof detail === "string"
          ? detail
          : "Registration failed. Please try again."
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
            Build insights
            <br />
            <span>from engineering data.</span>
          </h1>

          <p>
            Create your engineering workspace and
            start exploring datasets, analytics,
            visualization and AI-powered technical
            intelligence.
          </p>

          <div className="auth-features">

            <div className="auth-feature">
              <strong>Upload</strong>
              <span>
                Manage engineering datasets
              </span>
            </div>

            <div className="auth-feature">
              <strong>Analyze</strong>
              <span>
                Extract meaningful statistics
              </span>
            </div>

            <div className="auth-feature">
              <strong>Visualize</strong>
              <span>
                Understand engineering trends
              </span>
            </div>

            <div className="auth-feature">
              <strong>Ask AI</strong>
              <span>
                Explore technical documents intelligently
              </span>
            </div>

          </div>

        </div>
      </section>

      <section className="auth-form-panel">

        <div className="auth-card">

          <h2>Create your account</h2>

          <p className="auth-card-subtitle">
            Set up your EngiSense AI engineering workspace.
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
                placeholder="Create a password"
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
                ? "Creating account..."
                : "Create account"}
            </button>

          </form>

          <div className="auth-switch">
            Already have an account?{" "}
            <Link to="/login">
              Sign in
            </Link>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Register;