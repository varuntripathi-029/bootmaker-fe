export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface RegisterResponse {
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  role: string;
  name: string;
}

export interface AuthContextType {
  token: string | null;
  role: string | null;
  name: string | null;
  login: (token: string, role: string, name: string) => void;
  logout: () => void;
}
