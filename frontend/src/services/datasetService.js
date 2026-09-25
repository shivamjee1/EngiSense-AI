import apiClient from "../api/client";

export const uploadDataset = async (file, token) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await apiClient.post(
    "/datasets/upload",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getDatasets = async (token) => {
  const response = await apiClient.get(
    "/datasets/",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getDataset = async (datasetId, token) => {
  const response = await apiClient.get(
    `/datasets/${datasetId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const deleteDataset = async (
  datasetId,
  token
) => {
  const response = await apiClient.delete(
    `/datasets/${datasetId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};