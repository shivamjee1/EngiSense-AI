import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import {
  analyzeDataset,
  getAnalysisResults,
  getAnalysisResult,
} from "../services/analysisService";

const API_BASE_URL = "http://127.0.0.1:8000";

function Analysis() {
  const { id } = useParams();
  const { token } = useAuth();

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);

  const [error, setError] = useState("");

  // --------------------------------
  // Load latest saved analysis
  // --------------------------------

  const loadLatestAnalysis = async () => {
    try {
      setLoading(true);
      setError("");

      const historyData =
        await getAnalysisResults(
          id,
          token
        );

      const results =
        historyData.results || [];

      if (results.length === 0) {
        setResult(null);
        return;
      }

      // Backend returns newest first.
      const latest = results[0];

      const fullResult =
        await getAnalysisResult(
          id,
          latest.analysis_id,
          token
        );

      setResult({
        analysis_id:
          fullResult.analysis_id,

        dataset_id:
          fullResult.dataset_id,

        dataset_name:
          fullResult.dataset_name,

        analysis:
          fullResult.result,

        created_at:
          fullResult.created_at,
      });

    } catch (err) {
      console.error(
        "Load analysis error:",
        err
      );

      const detail =
        err.response?.data?.detail;

      setError(
        typeof detail === "string"
          ? detail
          : "Failed to load analysis."
      );

    } finally {
      setLoading(false);
    }
  };

  // --------------------------------
  // Load when page opens
  // --------------------------------

  useEffect(() => {
    if (token) {
      loadLatestAnalysis();
    }
  }, [id, token]);

  // --------------------------------
  // Run new analysis
  // --------------------------------

  const handleAnalyze = async () => {
    try {
      setAnalyzing(true);
      setError("");

      const data =
        await analyzeDataset(
          id,
          token
        );

      setResult(data);

    } catch (err) {
      console.error(
        "Analysis error:",
        err
      );

      const detail =
        err.response?.data?.detail;

      setError(
        typeof detail === "string"
          ? detail
          : Array.isArray(detail)
          ? detail
              .map((item) =>
                typeof item === "string"
                  ? item
                  : item.msg ||
                    JSON.stringify(item)
              )
              .join(", ")
          : "Analysis failed."
      );

    } finally {
      setAnalyzing(false);
    }
  };

  // --------------------------------
  // Loading state
  // --------------------------------

  if (loading) {
    return (
      <div style={{ padding: "40px" }}>
        <h1>
          Engineering Analysis
        </h1>

        <p>
          Loading previous analysis...
        </p>
      </div>
    );
  }

  // --------------------------------
  // UI
  // --------------------------------

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "40px 30px",
      }}
    >

      {/* Header */}

      <div
        style={{
          marginBottom: "30px",
        }}
      >

        <Link to={`/datasets/${id}`}>
          ← Back to Dataset
        </Link>

        <h1
          style={{
            marginTop: "20px",
            marginBottom: "8px",
          }}
        >
          Engineering Analysis
        </h1>

        <p
          style={{
            color: "#666",
          }}
        >
          Statistical and engineering
          analysis of your dataset.
        </p>

      </div>


      {/* Run Analysis */}

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "25px",
          marginBottom: "25px",
        }}
      >

        <h2>
          Run Analysis
        </h2>

        <p
          style={{
            color: "#666",
          }}
        >
          Run a new analysis using the
          current dataset.
        </p>

        <button
          onClick={handleAnalyze}
          disabled={analyzing}
          style={{
            marginTop: "15px",
            padding: "10px 20px",
            border: "none",
            borderRadius: "6px",
            background: "#111",
            color: "#fff",
            cursor: analyzing
              ? "not-allowed"
              : "pointer",
            opacity: analyzing
              ? 0.6
              : 1,
          }}
        >
          {analyzing
            ? "Analyzing..."
            : "Run New Analysis"}
        </button>

      </div>


      {/* Error */}

      {error && (
        <div
          style={{
            padding: "14px 18px",
            marginBottom: "25px",
            borderRadius: "6px",
            background: "#ffebee",
            color: "#c62828",
          }}
        >
          {error}
        </div>
      )}


      {/* No Analysis */}

      {!result && !error && (
        <div
          style={{
            border: "1px dashed #aaa",
            borderRadius: "10px",
            padding: "50px",
            textAlign: "center",
          }}
        >

          <h2>
            No Analysis Available
          </h2>

          <p
            style={{
              color: "#666",
            }}
          >
            Run an analysis to generate
            engineering insights.
          </p>

        </div>
      )}


      {/* Analysis Result */}

      {result && (
        <div>

          {/* Result Information */}

          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "25px",
              marginBottom: "25px",
            }}
          >

            <h2>
              Analysis Result
            </h2>

            <p>
              Dataset:{" "}
              <strong>
                {result.dataset_name}
              </strong>
            </p>

            <p>
              Analysis ID:{" "}
              <strong>
                {result.analysis_id}
              </strong>
            </p>

            {result.created_at && (
              <p
                style={{
                  color: "#666",
                }}
              >
                Created:{" "}
                {new Date(
                  result.created_at
                ).toLocaleString()}
              </p>
            )}

          </div>


          {/* Summary */}

          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "25px",
              marginBottom: "25px",
            }}
          >

            <h2>
              Dataset Summary
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "20px",
                marginTop: "20px",
              }}
            >

              <div>
                <p
                  style={{
                    color: "#777",
                    marginBottom: "5px",
                  }}
                >
                  Rows
                </p>

                <strong>
                  {result.analysis.summary.rows}
                </strong>
              </div>

              <div>
                <p
                  style={{
                    color: "#777",
                    marginBottom: "5px",
                  }}
                >
                  Columns
                </p>

                <strong>
                  {result.analysis.summary.columns}
                </strong>
              </div>

            </div>

          </div>


          {/* Columns */}

          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "25px",
              marginBottom: "25px",
            }}
          >

            <h2>
              Columns
            </h2>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginTop: "15px",
              }}
            >

              {result.analysis.summary.column_names.map(
                (column) => (
                  <span
                    key={column}
                    style={{
                      padding: "7px 10px",
                      background: "#eee",
                      borderRadius: "5px",
                      fontSize: "14px",
                    }}
                  >
                    {column}
                  </span>
                )
              )}

            </div>

          </div>


          {/* Charts */}

          <div
            style={{
              marginBottom: "25px",
            }}
          >

            <h2>
              Engineering Visualizations
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(450px, 1fr))",
                gap: "25px",
                marginTop: "20px",
              }}
            >

              <ChartCard
                title="Temperature Trend"
                src={
                  result.analysis.charts
                    .temperature
                }
                alt="Temperature trend"
              />

              <ChartCard
                title="Current Trend"
                src={
                  result.analysis.charts
                    .current
                }
                alt="Current trend"
              />

              <ChartCard
                title="Voltage Trend"
                src={
                  result.analysis.charts
                    .voltage
                }
                alt="Voltage trend"
              />

              <ChartCard
                title="Correlation Heatmap"
                src={
                  result.analysis.charts
                    .correlation_heatmap
                }
                alt="Correlation heatmap"
              />

            </div>

          </div>


          {/* Correlation */}

          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "25px",
              marginBottom: "25px",
            }}
          >

            <h2>
              Correlation Analysis
            </h2>

            <pre
              style={{
                marginTop: "15px",
                background: "#f5f5f5",
                padding: "15px",
                borderRadius: "6px",
                overflowX: "auto",
              }}
            >
              {JSON.stringify(
                result.analysis.correlation,
                null,
                2
              )}
            </pre>

          </div>


          {/* Outliers */}

          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "25px",
            }}
          >

            <h2>
              Outlier Detection
            </h2>

            <pre
              style={{
                marginTop: "15px",
                background: "#f5f5f5",
                padding: "15px",
                borderRadius: "6px",
                overflowX: "auto",
              }}
            >
              {JSON.stringify(
                result.analysis.outliers,
                null,
                2
              )}
            </pre>

          </div>

        </div>
      )}

    </div>
  );
}


// --------------------------------
// Chart Card
// --------------------------------

function ChartCard({
  title,
  src,
  alt,
}) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "15px",
      }}
    >

      <h3>
        {title}
      </h3>

      <img
        src={`${API_BASE_URL}${src}`}
        alt={alt}
        style={{
          width: "100%",
          marginTop: "10px",
        }}
      />

    </div>
  );
}

export default Analysis;