import { apiClient } from "@/lib/api/client";

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

export interface LoginResponse extends AuthUser {
  accessToken: string;
  refreshToken: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export function login(payload: LoginPayload) {
  return apiClient.post<LoginResponse>("/auth/login", payload);
}
