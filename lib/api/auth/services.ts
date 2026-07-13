import { apiClient } from "@/lib/api/client";
import { LoginPayload, LoginResponse, RefreshPayload, RefreshResponse } from "./interfaces";

export function login(payload: LoginPayload) {
  return apiClient.post<LoginResponse>("/auth/login", payload);
}

export function refreshSession(payload: RefreshPayload) {
  return apiClient.post<RefreshResponse>("/auth/refresh", payload);
}
