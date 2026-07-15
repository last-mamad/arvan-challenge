// Base URL: overridable via env, falls back to the public dummy API.
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://dummyjson.com";

// Custom error carrying the HTTP status so callers can react to it (404 vs 500).
export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

// Single low-level helper all verbs share: builds the request, handles errors, returns JSON as T.
async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers, // caller headers win over the defaults above
    },
  });

  // On non-2xx, read `message` from the error body; `.catch` guards non-JSON bodies.
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const message = body && typeof body.message === "string" ? body.message : undefined;
    throw new ApiError(message ?? `Request failed: ${res.status} ${res.statusText}`, res.status);
  }

  // Trust the caller-provided generic for the response shape (no runtime check).
  return res.json() as Promise<T>;
}

// Stateless verb wrapper — a plain object, not a class, since there's no state to hold.
export const apiClient = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "POST", body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "PUT", body: JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};
