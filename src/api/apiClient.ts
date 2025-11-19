const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

type ApiClientOptions = RequestInit & { skipJson?: boolean };

export async function apiClient<T>(
  path: string,
  { skipJson, headers, ...options }: ApiClientOptions = {}
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || response.statusText);
  }

  if (skipJson || response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}