import apiClient from "../api/client";

export const analyzeUnifiedAI = async (
  datasetId,
  documentId,
  question,
  token
) => {
  const response = await apiClient.post(
    "/ai/unified-analyze",
    {
      dataset_id: Number(datasetId),
      document_id: Number(documentId),
      question,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};