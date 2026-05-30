import api from "./api";
import type { RegisterRequest, RegisterResponse, LoginRequest, LoginResponse } from "../types";

export const registerUser = async (data: RegisterRequest): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>("/api/auth/register", data);
  return response.data;
};

export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/api/auth/login", data);
  return response.data;
};
