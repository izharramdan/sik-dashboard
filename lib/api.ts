// const API_BASE_URL =
//   process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

// export function getToken() {
//   if (typeof window === "undefined") return null;
//   return localStorage.getItem("token");
// }

// async function request(path: string, options: RequestInit = {}) {
//   const token = getToken();

//   const res = await fetch(`${API_BASE_URL}${path}`, {
//     ...options,
//     headers: {
//       "Content-Type": "application/json",
//       ...(token ? { Authorization: `Bearer ${token}` } : {}),
//       ...(options.headers || {}),
//     },
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     const text = await res.text();
//     throw new Error(`API Error (${res.status}): ${text}`);
//   }

//   return res.json();
// }

// export function apiGet(path: string) {
//   return request(path, { method: "GET" });
// }

// export function apiPost(path: string, body: any) {
//   return request(path, { method: "POST", body: JSON.stringify(body) });
// }

// export function apiPatch(path: string, body: any) {
//   return request(path, { method: "PATCH", body: JSON.stringify(body) });
// }

// export function apiDelete(path: string) {
//   return request(path, { method: "DELETE" });
// }

// lib/api.ts
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ;

export function getAuthToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

async function request(path: string, options: RequestInit = {}) {
  const token = getAuthToken();

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API Error (${res.status}): ${text}`);
  }

  return res.json();
}

export function apiGet(path: string) {
  return request(path, { method: "GET" });
}

export function apiPost(path: string, body: any) {
  return request(path, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function apiPatch(path: string, body: any) {
  return request(path, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

export function apiDelete(path: string) {
  return request(path, { method: "DELETE" });
}
