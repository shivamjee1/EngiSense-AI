import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { getDataset } from "../services/datasetService";

function DatasetDetails() {
  const { id } = useParams();
  const { token } = useAuth();

  const [dataset, setDataset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDataset = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getDataset(id, token);

      setDataset(data);

    } catch (err) {
      console.error(
        "Dataset details error:",
        err
      );

      const detail =
        err.response?.data?.detail;

      setError(
        typeof detail === "string"
          ? detail
          : "Failed to load dataset."
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDataset();
  }, [id, token]);

  if (loading) {
    return (
      <div style={{ padding: "40px" }}>
        <h1>Dataset Details</h1>
        <p>Loading dataset...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "40px" }}>
        <h1>Dataset Details</h1>

        <p style={{ color: "red" }}>
          {error}
        </p>

        <Link to="/datasets">
          ← Back to Datasets
        </Link>
      </div>
    );
  }

  if (!dataset) {
    return (
      <div style={{ padding: "40px" }}>
        <h1>Dataset Not Found</h1>

        <Link to="/datasets">
          ← Back to Datasets
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1000px",
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
        <Link to="/datasets">
          ← Back to Datasets
        </Link>

        <h1
          style={{
            marginTop: "20px",
            marginBottom: "8px",
          }}
        >
          {dataset.name}
        </h1>

        <p
          style={{
            color: "#666",
          }}
        >
          Dataset information and analysis
        </p>
      </div>


      {/* Dataset Information */}

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "25px",
          marginBottom: "25px",
        }}
      >

        <h2>
          Dataset Information
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
              Dataset ID
            </p>

            <strong>
              {dataset.id}
            </strong>
          </div>


          <div>
            <p
              style={{
                color: "#777",
                marginBottom: "5px",
              }}
            >
              File Type
            </p>

            <strong>
              {dataset.file_type}
            </strong>
          </div>


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
              {dataset.row_count}
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
              {dataset.column_count}
            </strong>
          </div>


          {dataset.created_at && (
            <div>
              <p
                style={{
                  color: "#777",
                  marginBottom: "5px",
                }}
              >
                Created
              </p>

              <strong>
                {new Date(
                  dataset.created_at
                ).toLocaleString()}
              </strong>
            </div>
          )}

        </div>

      </div>


      {/* Analysis */}

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "25px",
        }}
      >

        <h2>
          Engineering Analysis
        </h2>

        <p
          style={{
            color: "#666",
          }}
        >
          Run statistical analysis, correlation
          analysis, outlier detection, and
          engineering visualizations on this dataset.
        </p>

        <Link
          to={`/analysis/${dataset.id}`}
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
          Analyze Dataset
        </Link>

      </div>

    </div>
  );
}

export default DatasetDetails;