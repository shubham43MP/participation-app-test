const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

type RequestOptions = {
  method?: "GET" | "POST";
  body?: any;
  headers?: Record<string, string>;
};

export async function apiClient<T>(
  url: string,
  options: RequestOptions = {}
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${url}`, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "API Error");
  }

  return res.json();
}
