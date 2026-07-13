import { apiClient } from "@/lib/api/client";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  image: string;
}

interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export function getUsers() {
  return apiClient.get<UsersResponse>("/users");
}
