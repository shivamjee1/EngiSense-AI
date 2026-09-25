import apiClient from "../api/client";

export const analyzeDataset = async (datasetId, token) => {
  const response = await apiClient.post(
    `/analysis/${datasetId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getAnalysisResults = async (
  datasetId,
  token
) => {
  const response = await apiClient.get(
    `/analysis/${datasetId}/results`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getAnalysisResult = async (
  datasetId,
  analysisId,
  token
) => {
  const response = await apiClient.get(
    `/analysis/${datasetId}/results/${analysisId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};