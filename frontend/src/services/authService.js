import apiClient from "../api/client";

export const registerUser = async (email, password) => {
  const response = await apiClient.post("/auth/register", {
    email,
    password,
  });

  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await apiClient.post("/auth/login", {
    email,
    password,
  });

  return response.data;
};

export const getCurrentUser = async (token) => {
  const response = await apiClient.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};