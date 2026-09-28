import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import ReactMarkdown from "react-markdown";


import {
  analyzeDataset,
  getAnalysisResults,
  getAnalysisResult,
} from "../services/analysisService";

import { analyzeUnifiedAI } from "../services/unifiedAIService";
import { getDocuments } from "../services/documentService";

const API_BASE_URL = "http://127.0.0.1:8000";

function Analysis() {
  const { id } = useParams();
  const { token } = useAuth();

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);

  const [error, setError] = useState("");
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiResult, setAiResult] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  const [documents, setDocuments] = useState([]);
  const [selectedDocumentId, setSelectedDocumentId] = useState("");
  const [documentsLoading, setDocumentsLoading] = useState(false);

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

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        setDocumentsLoading(true);
        setAiError("");

        const data = await getDocuments(token);

        setDocuments(data.documents || []);
      } catch (err) {
        console.error("Failed to load documents:", err);

        const detail = err.response?.data?.detail;

        setAiError(
          typeof detail === "string"
            ? detail
            : "Failed to load documents."
        );
      } finally {
        setDocumentsLoading(false);
      }
    };

    if (token) {
      loadDocuments();
    }
  }, [token]);

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
  // Unified AI
  // --------------------------------
  const handleUnifiedAI = async () => {
    if (!aiQuestion.trim()) {
      setAiError("Please enter a question.");
      return;
    }

    if (!selectedDocumentId) {
      setAiError("Please select a technical document.");
      return;
    }

    try {
      setAiLoading(true);
      setAiError("");
      setAiResult(null);

      const data = await analyzeUnifiedAI(
        id,
        selectedDocumentId,
        aiQuestion,
        token
      );

      setAiResult(data);
    } catch (err) {
      console.error("Unified AI error:", err);

      const detail = err.response?.data?.detail;

      setAiError(
        typeof detail === "string"
          ? detail
          : "Unified AI analysis failed."
      );
    } finally {
      setAiLoading(false);
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
      
      //somwthing new
      {/* Unified AI */}

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "25px",
          marginBottom: "25px",
        }}
      >
        <h2>EngiSense AI</h2>

        <p style={{ color: "#666" }}>
          Ask an engineering question about this dataset and
          supporting technical documentation.
        </p>
        
        <div style={{ marginTop: "20px" }}>
          <label
            htmlFor="ai-document"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
            }}
          >
            Technical Document
          </label>

          <select
            id="ai-document"
            value={selectedDocumentId}
            onChange={(e) =>
              setSelectedDocumentId(e.target.value)
            }
            disabled={documentsLoading || aiLoading}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              background: "#fff",
              boxSizing: "border-box",
            }}
          >
            <option value="">
              {documentsLoading
                ? "Loading documents..."
                : "Select a technical document"}
            </option>

            {documents.map((document) => (
              <option
                key={document.id}
                value={document.id}
              >
                {document.name}
              </option>
            ))}
          </select>
        </div>

        <textarea
          value={aiQuestion}
          onChange={(e) => setAiQuestion(e.target.value)}
          placeholder="Example: Is the vibration level statistically abnormal?"
          rows={4}
          style={{
            width: "100%",
            marginTop: "15px",
            padding: "12px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            resize: "vertical",
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={handleUnifiedAI}
          disabled={aiLoading || !aiQuestion.trim()}
          style={{
            marginTop: "15px",
            padding: "10px 20px",
            border: "none",
            borderRadius: "6px",
            background: "#111",
            color: "#fff",
            cursor:
              aiLoading || !aiQuestion.trim()
                ? "not-allowed"
                : "pointer",
            opacity:
              aiLoading || !aiQuestion.trim()
                ? 0.6
                : 1,
          }}
        >
          {aiLoading ? "Thinking..." : "Ask EngiSense AI"}
        </button>

        {aiError && (
          <div
            style={{
              marginTop: "15px",
              padding: "12px",
              borderRadius: "6px",
              background: "#ffebee",
              color: "#c62828",
            }}
          >
            {aiError}
          </div>
        )}

        {aiResult && (
          <div
            style={{
              marginTop: "25px",
              padding: "20px",
              background: "#f7f7f7",
              borderRadius: "8px",
            }}
          >
            <h3>AI Engineering Assessment</h3>

            <p>
              <strong>Tool used:</strong>{" "}
              {aiResult.tool_used}
            </p>

            <div
              style={{
                marginTop: "15px",
                background: "#fff",
                padding: "15px",
                borderRadius: "6px",
                whiteSpace: "pre-wrap",
                lineHeight: "1.6",
              }}
            >
              <ReactMarkdown>
                {aiResult.answer}
              </ReactMarkdown>
            </div>
          </div>
        )}
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