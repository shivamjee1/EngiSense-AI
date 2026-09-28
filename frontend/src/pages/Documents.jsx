import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getDocuments,
  uploadDocument,
  deleteDocument,
} from "../services/documentService";

function Documents() {
  const { token } = useAuth();

  const [documents, setDocuments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadDocuments = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getDocuments(token);

      setDocuments(data.documents || []);
    } catch (err) {
      console.error("Failed to load documents:", err);

      const detail = err.response?.data?.detail;

      setError(
        typeof detail === "string"
          ? detail
          : "Failed to load documents."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadDocuments();
    }
  }, [token]);

  const handleFileChange = (event) => {
    setError("");
    setSuccess("");

    const file = event.target.files?.[0];

    if (!file) {
      setSelectedFile(null);
      return;
    }

    const extension = file.name
      .split(".")
      .pop()
      .toLowerCase();

    if (!["pdf", "docx"].includes(extension)) {
      setSelectedFile(null);
      setError(
        "Only PDF and DOCX files are supported."
      );
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError(
        "Please select a PDF or DOCX file."
      );
      return;
    }

    try {
      setUploading(true);
      setError("");
      setSuccess("");

      await uploadDocument(
        selectedFile,
        token
      );

      setSuccess(
        "Document uploaded successfully."
      );

      setSelectedFile(null);

      const fileInput =
        document.getElementById(
          "document-file"
        );

      if (fileInput) {
        fileInput.value = "";
      }

      await loadDocuments();
    } catch (err) {
      console.error(
        "Document upload failed:",
        err
      );

      const detail =
        err.response?.data?.detail;

      setError(
        typeof detail === "string"
          ? detail
          : "Failed to upload document."
      );
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (documentId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this document?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(documentId);
      setError("");
      setSuccess("");

      await deleteDocument(
        documentId,
        token
      );

      setSuccess(
        "Document deleted successfully."
      );

      await loadDocuments();
    } catch (err) {
      console.error(
        "Document delete error:",
        err
      );

      const detail =
        err.response?.data?.detail;

      setError(
        typeof detail === "string"
          ? detail
          : "Failed to delete document."
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "40px 30px",
      }}
    >
      {/* Header */}

      <div style={{ marginBottom: "30px" }}>
        <h1
          style={{
            marginBottom: "8px",
            fontSize: "32px",
          }}
        >
          Technical Documents
        </h1>

        <p
          style={{
            margin: 0,
            color: "#6b7280",
          }}
        >
          Upload engineering documents and use them
          as supporting knowledge for EngiSense AI.
        </p>
      </div>

      {/* Upload Card */}

      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: "12px",
          padding: "28px",
          marginBottom: "30px",
          boxShadow:
            "0 2px 8px rgba(0, 0, 0, 0.04)",
        }}
      >
        <h2
          style={{
            marginTop: 0,
            marginBottom: "8px",
          }}
        >
          Upload Technical Document
        </h2>

        <p
          style={{
            color: "#6b7280",
            marginBottom: "20px",
          }}
        >
          Supported formats: PDF and DOCX
        </p>

        <input
          id="document-file"
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileChange}
          disabled={uploading}
          style={{
            display: "block",
            marginBottom: "18px",
          }}
        />

        {selectedFile && (
          <div
            style={{
              padding: "12px 14px",
              background: "#f3f6ff",
              borderRadius: "8px",
              marginBottom: "18px",
              color: "#374151",
            }}
          >
            Selected:{" "}
            <strong>
              {selectedFile.name}
            </strong>
          </div>
        )}

        <button
          type="button"
          onClick={handleUpload}
          disabled={!selectedFile || uploading}
          style={{
            padding: "11px 20px",
            border: "none",
            borderRadius: "7px",
            background:
              !selectedFile || uploading
                ? "#9ca3af"
                : "#2563eb",
            color: "#ffffff",
            fontWeight: "600",
            cursor:
              !selectedFile || uploading
                ? "not-allowed"
                : "pointer",
          }}
        >
          {uploading
            ? "Uploading..."
            : "Upload Document"}
        </button>

        {success && (
          <div
            style={{
              marginTop: "16px",
              color: "#166534",
              background: "#dcfce7",
              padding: "10px 14px",
              borderRadius: "7px",
            }}
          >
            {success}
          </div>
        )}

        {error && (
          <div
            style={{
              marginTop: "16px",
              color: "#991b1b",
              background: "#fee2e2",
              padding: "10px 14px",
              borderRadius: "7px",
            }}
          >
            {error}
          </div>
        )}
      </div>

      {/* Document List */}

      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: "12px",
          padding: "28px",
          boxShadow:
            "0 2px 8px rgba(0, 0, 0, 0.04)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                marginBottom: "6px",
              }}
            >
              Uploaded Documents
            </h2>

            <p
              style={{
                margin: 0,
                color: "#6b7280",
              }}
            >
              Technical documents available to
              your account.
            </p>
          </div>

          <div
            style={{
              background: "#eff6ff",
              color: "#1d4ed8",
              padding: "8px 14px",
              borderRadius: "20px",
              fontWeight: "600",
            }}
          >
            {documents.length} documents
          </div>
        </div>

        {loading ? (
          <p style={{ color: "#6b7280" }}>
            Loading documents...
          </p>
        ) : documents.length === 0 ? (
          <div
            style={{
              padding: "35px 20px",
              textAlign: "center",
              border: "1px dashed #d1d5db",
              borderRadius: "10px",
              color: "#6b7280",
            }}
          >
            No technical documents uploaded yet.
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {documents.map((document) => (
              <div
                key={document.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "20px",
                  padding: "16px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "9px",
                }}
              >
                {/* Document Information */}

                <div
                  style={{
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      fontWeight: "600",
                      marginBottom: "5px",
                      wordBreak: "break-word",
                    }}
                  >
                    {document.name}
                  </div>

                  <div
                    style={{
                      fontSize: "13px",
                      color: "#6b7280",
                    }}
                  >
                    {document.file_type?.toUpperCase()}{" "}
                    • Document ID: {document.id}
                  </div>

                  <div
                    style={{
                      fontSize: "13px",
                      color: "#9ca3af",
                      marginTop: "4px",
                    }}
                  >
                    {document.created_at
                      ? new Date(
                          document.created_at
                        ).toLocaleDateString()
                      : "—"}
                  </div>
                </div>

                {/* Delete Button */}

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(document.id)
                  }
                  disabled={
                    deletingId === document.id
                  }
                  style={{
                    flexShrink: 0,
                    padding: "9px 16px",
                    border: "none",
                    borderRadius: "7px",
                    background:
                      deletingId === document.id
                        ? "#9ca3af"
                        : "#dc2626",
                    color: "#ffffff",
                    fontWeight: "600",
                    cursor:
                      deletingId === document.id
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  {deletingId === document.id
                    ? "Deleting..."
                    : "Delete"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Documents;