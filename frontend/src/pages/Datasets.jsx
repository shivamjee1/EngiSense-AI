import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import {
  uploadDataset,
  getDatasets,
  deleteDataset,
} from "../services/datasetService";

function Datasets() {
  const { token } = useAuth();

  const [datasets, setDatasets] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // --------------------------------
  // Load datasets
  // --------------------------------

  const loadDatasets = async () => {
    if (!token) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await getDatasets(token);

      /*
       * The backend currently returns a list.
       *
       * If the backend later returns:
       * {
       *   "datasets": [...]
       * }
       * we can adjust this here.
       */

      setDatasets(
        Array.isArray(data)
          ? data
          : data.datasets || []
      );

    } catch (err) {
      console.error(
        "Load datasets error:",
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
                  : item.msg || JSON.stringify(item)
              )
              .join(", ")
          : "Failed to load datasets."
      );

    } finally {
      setLoading(false);
    }
  };

  // --------------------------------
  // Load datasets when page opens
  // --------------------------------

  useEffect(() => {
    loadDatasets();
  }, [token]);

  // --------------------------------
  // File selection
  // --------------------------------

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    setSelectedFile(file || null);

    setMessage("");
    setError("");
  };

  // --------------------------------
  // Upload
  // --------------------------------

  const handleUpload = async () => {
    if (!selectedFile) {
      setError(
        "Please select a CSV file first."
      );

      return;
    }

    if (!selectedFile.name.toLowerCase().endsWith(".csv")) {
      setError(
        "Only CSV files are supported."
      );

      return;
    }

    try {
      setUploading(true);

      setError("");
      setMessage("");

      const result = await uploadDataset(
        selectedFile,
        token
      );

      console.log(
        "Upload response:",
        result
      );

      setMessage(
        "Dataset uploaded successfully."
      );

      setSelectedFile(null);

      // Clear file input
      const fileInput =
        document.getElementById(
          "dataset-file-input"
        );

      if (fileInput) {
        fileInput.value = "";
      }

      // Refresh dataset list
      await loadDatasets();

    } catch (err) {
      console.error(
        "Upload error:",
        err
      );

      const detail =
        err.response?.data?.detail;

      let errorMessage =
        "Dataset upload failed.";

      if (typeof detail === "string") {
        errorMessage = detail;
      } else if (Array.isArray(detail)) {
        errorMessage = detail
          .map((item) => {
            if (typeof item === "string") {
              return item;
            }

            if (item?.msg) {
              return item.msg;
            }

            return JSON.stringify(item);
          })
          .join(", ");
      }

      setError(errorMessage);

    } finally {
      setUploading(false);
    }
  };

  // --------------------------------
  // Delete
  // --------------------------------

  const handleDelete = async (
    datasetId
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this dataset?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setMessage("");

      await deleteDataset(
        datasetId,
        token
      );

      setMessage(
        "Dataset deleted successfully."
      );

      await loadDatasets();

    } catch (err) {
      console.error(
        "Delete error:",
        err
      );

      const detail =
        err.response?.data?.detail;

      setError(
        typeof detail === "string"
          ? detail
          : "Failed to delete dataset."
      );
    }
  };

  // --------------------------------
  // UI
  // --------------------------------

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "40px 30px",
      }}
    >

      {/* Page Header */}

      <div
        style={{
          marginBottom: "30px",
        }}
      >
        <h1
          style={{
            fontSize: "36px",
            marginBottom: "8px",
          }}
        >
          Datasets
        </h1>

        <p
          style={{
            color: "#666",
            fontSize: "16px",
          }}
        >
          Upload, manage, and analyze
          your engineering datasets.
        </p>
      </div>


      {/* Upload Card */}

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "25px",
          marginBottom: "25px",
          background: "#fff",
        }}
      >

        <h2>
          Upload Dataset
        </h2>

        <p
          style={{
            color: "#666",
          }}
        >
          Upload a CSV engineering
          dataset for analysis.
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginTop: "20px",
          }}
        >

          <input
            id="dataset-file-input"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
          />

          <button
            onClick={handleUpload}
            disabled={
              uploading || !selectedFile
            }
            style={{
              padding: "9px 18px",
              border: "none",
              borderRadius: "6px",
              background: "#111",
              color: "#fff",
              cursor:
                uploading || !selectedFile
                  ? "not-allowed"
                  : "pointer",
              opacity:
                uploading || !selectedFile
                  ? 0.6
                  : 1,
            }}
          >
            {uploading
              ? "Uploading..."
              : "Upload CSV"}
          </button>

        </div>

        {selectedFile && (
          <p
            style={{
              marginTop: "12px",
              color: "#555",
            }}
          >
            Selected file:{" "}
            <strong>
              {selectedFile.name}
            </strong>
          </p>
        )}

      </div>


      {/* Success Message */}

      {message && (
        <div
          style={{
            padding: "12px 16px",
            marginBottom: "20px",
            borderRadius: "6px",
            background: "#e8f5e9",
            color: "#2e7d32",
          }}
        >
          {message}
        </div>
      )}


      {/* Error Message */}

      {error && (
        <div
          style={{
            padding: "12px 16px",
            marginBottom: "20px",
            borderRadius: "6px",
            background: "#ffebee",
            color: "#c62828",
          }}
        >
          {error}
        </div>
      )}


      {/* Dataset Section Header */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >

        <h2>
          Your Datasets
        </h2>

        <span
          style={{
            color: "#666",
          }}
        >
          {datasets.length} dataset
          {datasets.length !== 1
            ? "s"
            : ""}
        </span>

      </div>


      {/* Loading */}

      {loading && (
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "30px",
          }}
        >
          <p>
            Loading datasets...
          </p>
        </div>
      )}


      {/* Empty */}

      {!loading &&
        datasets.length === 0 && (
          <div
            style={{
              border: "1px dashed #aaa",
              borderRadius: "10px",
              padding: "50px",
              textAlign: "center",
              color: "#666",
            }}
          >

            <h3>
              No datasets yet
            </h3>

            <p>
              Upload your first CSV
              dataset to start
              engineering analysis.
            </p>

          </div>
        )}


      {/* Dataset Cards */}

      {!loading &&
        datasets.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "20px",
            }}
          >

            {datasets.map(
              (dataset) => (
                <div
                  key={dataset.id}
                  style={{
                    border:
                      "1px solid #ddd",
                    borderRadius:
                      "10px",
                    padding: "22px",
                    background:
                      "#fff",
                  }}
                >

                  <h3
                    style={{
                      marginBottom:
                        "10px",
                      wordBreak:
                        "break-word",
                    }}
                  >
                    {dataset.name}
                  </h3>

                  <span
                    style={{
                      display:
                        "inline-block",
                      padding:
                        "4px 8px",
                      borderRadius:
                        "4px",
                      background:
                        "#eee",
                      fontSize:
                        "12px",
                    }}
                  >
                    {dataset.file_type}
                  </span>


                  {/* Statistics */}

                  <div
                    style={{
                      display:
                        "flex",
                      gap: "50px",
                      marginTop:
                        "20px",
                      marginBottom:
                        "15px",
                    }}
                  >

                    <div>
                      <span
                        style={{
                          display:
                            "block",
                          color:
                            "#777",
                          fontSize:
                            "13px",
                        }}
                      >
                        Rows
                      </span>

                      <strong>
                        {
                          dataset.row_count
                        }
                      </strong>
                    </div>

                    <div>
                      <span
                        style={{
                          display:
                            "block",
                          color:
                            "#777",
                          fontSize:
                            "13px",
                        }}
                      >
                        Columns
                      </span>

                      <strong>
                        {
                          dataset.column_count
                        }
                      </strong>
                    </div>

                  </div>


                  {/* Date */}

                  {dataset.created_at && (
                    <p
                      style={{
                        color:
                          "#777",
                        fontSize:
                          "13px",
                      }}
                    >
                      Created:{" "}
                      {new Date(
                        dataset.created_at
                      ).toLocaleString()}
                    </p>
                  )}


                  {/* Actions */}

                  <div
                    style={{
                      display:
                        "flex",
                      gap: "10px",
                      marginTop:
                        "20px",
                    }}
                  >

                    <Link
                      to={`/datasets/${dataset.id}`}
                      style={{
                        padding:
                          "9px 14px",
                        borderRadius:
                          "6px",
                        background:
                          "#111",
                        color:
                          "#fff",
                        textDecoration:
                          "none",
                      }}
                    >
                      View Dataset
                    </Link>

                    <button
                      onClick={() =>
                        handleDelete(
                          dataset.id
                        )
                      }
                      style={{
                        padding:
                          "9px 14px",
                        borderRadius:
                          "6px",
                        border:
                          "1px solid #c62828",
                        background:
                          "#fff",
                        color:
                          "#c62828",
                        cursor:
                          "pointer",
                      }}
                    >
                      Delete
                    </button>

                  </div>

                </div>
              )
            )}

          </div>
        )}

    </div>
  );
}

export default Datasets;