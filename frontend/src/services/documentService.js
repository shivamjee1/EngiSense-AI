import apiClient from "../api/client";

export const getDocuments = async (token) => {
  const response = await apiClient.get("/documents/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const uploadDocument = async (file, token) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await apiClient.post(
    "/documents/upload",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const deleteDocument = async (
  documentId,
  token
) => {
  const response = await apiClient.delete(
    `/documents/${documentId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};