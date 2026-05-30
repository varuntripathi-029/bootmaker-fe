import api from "./api";

export const getPublicContent = async (): Promise<string> => {
  const response = await api.get<string>("/api/public");
  return response.data;
};

export const getUserContent = async (): Promise<string> => {
  const response = await api.get<string>("/api/user");
  return response.data;
};

export const getAdminContent = async (): Promise<string> => {
  const response = await api.get<string>("/api/admin");
  return response.data;
};
