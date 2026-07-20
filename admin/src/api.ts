import type { Category, Media } from "./types";

const API_BASE = "/api/gallery";

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error((body && body.error) || `Request failed: ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export function fetchCategories(): Promise<Category[]> {
  return request(`${API_BASE}/categories`);
}

export function fetchMedia(): Promise<Media[]> {
  return request(`${API_BASE}/media`);
}

export function uploadMedia(input: {
  file: File;
  category: string;
  group?: string;
  sortOrder?: number;
}): Promise<Media> {
  const formData = new FormData();
  formData.append("file", input.file);
  formData.append("category", input.category);
  if (input.group) formData.append("group", input.group);
  if (input.sortOrder !== undefined) formData.append("sortOrder", String(input.sortOrder));

  return request(`${API_BASE}/media`, { method: "POST", body: formData });
}

export function deleteMedia(id: string): Promise<void> {
  return request(`${API_BASE}/media/${id}`, { method: "DELETE" });
}
