import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <>
      <section className="dashboard-hero">

        <span className="dashboard-hero-badge">
          Engineering Intelligence Platform
        </span>

        <h1>
          Welcome to EngiSense AI
        </h1>

        <p>
          Analyze engineering datasets, identify
          patterns, visualize technical parameters,
          and build intelligent insights from your
          engineering knowledge.
        </p>

      </section>

      <section className="kpi-grid">

        <div className="kpi-card">
          <div className="kpi-label">
            Datasets
          </div>

          <div className="kpi-value">
            —
          </div>

          <div className="kpi-description">
            Uploaded engineering datasets
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-label">
            Analyses
          </div>

          <div className="kpi-value">
            —
          </div>

          <div className="kpi-description">
            Completed analysis runs
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-label">
            Documents
          </div>

          <div className="kpi-value">
            —
          </div>

          <div className="kpi-description">
            Technical documents
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-label">
            AI Insights
          </div>

          <div className="kpi-value">
            —
          </div>

          <div className="kpi-description">
            Intelligent engineering insights
          </div>
        </div>

      </section>

      <section className="card">

        <div className="card-header">
          <div>
            <h2>
              Quick Actions
            </h2>

            <p>
              Start working with your engineering data.
            </p>
          </div>
        </div>

        <div className="quick-actions">

          <Link
            to="/datasets"
            className="action-card"
          >
            <div className="action-icon">
              CSV
            </div>

            <h3>
              Manage Datasets
            </h3>

            <p>
              Upload, inspect and manage your engineering
              datasets.
            </p>
          </Link>

          <Link
            to="/history"
            className="action-card"
          >
            <div className="action-icon">
              ANA
            </div>

            <h3>
              Analysis History
            </h3>

            <p>
              Review previous engineering analysis runs
              and results.
            </p>
          </Link>

          <div className="action-card">
            <div className="action-icon">
              AI
            </div>

            <h3>
              AI Engineering Assistant
            </h3>

            <p>
              Document intelligence and RAG-powered
              engineering Q&A are coming next.
            </p>
          </div>

        </div>

      </section>
    </>
  );
}

export default Dashboard;