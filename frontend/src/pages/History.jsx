import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { getDatasets } from "../services/datasetService";
import { getAnalysisResults } from "../services/analysisService";

function History() {
  const { token } = useAuth();

  const [datasets, setDatasets] = useState([]);
  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadHistory = async () => {
    try {
      setLoading(true);
      setError("");

      const datasetData = await getDatasets(token);

      const datasetList = Array.isArray(datasetData)
        ? datasetData
        : datasetData.datasets || [];

      setDatasets(datasetList);

      const allResults = [];

      for (const dataset of datasetList) {
        try {
          const resultData = await getAnalysisResults(
            dataset.id,
            token
          );

          const results = resultData.results || [];

          results.forEach((result) => {
            allResults.push({
              ...result,
              dataset_id: dataset.id,
              dataset_name: dataset.name,
            });
          });
        } catch (err) {
          console.error(
            `Failed to load history for dataset ${dataset.id}`,
            err
          );
        }
      }

      allResults.sort(
        (a, b) =>
          new Date(b.created_at) -
          new Date(a.created_at)
      );

      setHistory(allResults);

    } catch (err) {
      console.error(
        "History loading error:",
        err
      );

      const detail =
        err.response?.data?.detail;

      setError(
        typeof detail === "string"
          ? detail
          : "Failed to load analysis history."
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, [token]);

  if (loading) {
    return (
      <div style={{ padding: "40px" }}>
        <h1>Analysis History</h1>
        <p>Loading analysis history...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1100px",
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
        <h1>
          Analysis History
        </h1>

        <p
          style={{
            color: "#666",
          }}
        >
          Review previous engineering
          analysis runs.
        </p>
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


      {/* Empty State */}

      {!error && history.length === 0 && (
        <div
          style={{
            border: "1px dashed #aaa",
            borderRadius: "10px",
            padding: "50px",
            textAlign: "center",
          }}
        >
          <h2>
            No Analysis History
          </h2>

          <p
            style={{
              color: "#666",
            }}
          >
            Run an analysis on one of
            your datasets to see it here.
          </p>

          <Link
            to="/datasets"
            style={{
              display: "inline-block",
              marginTop: "15px",
              padding: "10px 18px",
              borderRadius: "6px",
              background: "#111",
              color: "#fff",
              textDecoration: "none",
            }}
          >
            Go to Datasets
          </Link>
        </div>
      )}


      {/* History */}

      {history.length > 0 && (
        <div>

          <div
            style={{
              marginBottom: "20px",
              color: "#666",
            }}
          >
            {history.length} analysis
            {history.length !== 1
              ? " runs"
              : " run"}
          </div>


          <div
            style={{
              display: "grid",
              gap: "15px",
            }}
          >

            {history.map((item) => (
              <div
                key={item.analysis_id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "22px",
                  background: "#fff",
                }}
              >

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "20px",
                    flexWrap: "wrap",
                  }}
                >

                  <div>

                    <h3
                      style={{
                        marginBottom: "8px",
                      }}
                    >
                      {item.dataset_name}
                    </h3>

                    <p
                      style={{
                        color: "#666",
                        margin: "4px 0",
                      }}
                    >
                      Analysis ID:{" "}
                      <strong>
                        {item.analysis_id}
                      </strong>
                    </p>

                    <p
                      style={{
                        color: "#666",
                        margin: "4px 0",
                      }}
                    >
                      Created:{" "}
                      {new Date(
                        item.created_at
                      ).toLocaleString()}
                    </p>

                  </div>


                  <Link
                    to={`/analysis/${item.dataset_id}`}
                    style={{
                      padding: "9px 16px",
                      borderRadius: "6px",
                      background: "#111",
                      color: "#fff",
                      textDecoration: "none",
                    }}
                  >
                    Open Analysis
                  </Link>

                </div>

              </div>
            ))}

          </div>

        </div>
      )}

    </div>
  );
}

export default History;