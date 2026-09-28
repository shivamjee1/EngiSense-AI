import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { getDatasets } from "../services/datasetService";
import { getDocuments } from "../services/documentService";

function Dashboard() {
  const { token } = useAuth();

  const [datasetsCount, setDatasetsCount] = useState(null);
  const [documentsCount, setDocumentsCount] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const [datasetsData, documentsData] =
          await Promise.all([
            getDatasets(token),
            getDocuments(token),
          ]);

        setDatasetsCount(
          datasetsData.datasets?.length ?? 0
        );

        setDocumentsCount(
          documentsData.documents?.length ?? 0
        );

      } catch (err) {
        console.error(
          "Dashboard data error:",
          err
        );

        setError(
          "Failed to load dashboard data."
        );

      } finally {
        setLoading(false);
      }
    };

    if (token) {
      loadDashboardData();
    }
  }, [token]);

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


      {error && (
        <div
          style={{
            marginBottom: "20px",
            padding: "12px 16px",
            borderRadius: "8px",
            background: "#ffebee",
            color: "#c62828",
          }}
        >
          {error}
        </div>
      )}


      <section className="kpi-grid">

        <div className="kpi-card">

          <div className="kpi-label">
            Datasets
          </div>

          <div className="kpi-value">
            {loading
              ? "..."
              : datasetsCount}
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
            {loading
              ? "..."
              : documentsCount}
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


          <Link
            to="/documents"
            className="action-card"
          >

            <div className="action-icon">
              DOC
            </div>

            <h3>
              Technical Documents
            </h3>

            <p>
              Upload and manage technical documents
              for AI-powered engineering Q&A.
            </p>

          </Link>

        </div>

      </section>
    </>
  );
}

export default Dashboard;