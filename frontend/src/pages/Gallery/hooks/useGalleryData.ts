import { useEffect, useState } from "react";
import type { GalleryData } from "../types";

// Header/tabs/menu/quote copy still comes from the static JSON. The actual
// gallery media comes from the backend so it can be managed (uploaded,
// deleted, reordered) without a redeploy — see backend/README.md.
const PAGE_DATA_URL = "/gallery-data.json";
const GALLERY_API_URL = "/api/gallery";

type PageData = Omit<GalleryData, "gallery">;
type GalleryMedia = GalleryData["gallery"];

type GalleryDataState =
  | { status: "loading" }
  | { status: "error"; error: string }
  | { status: "success"; data: GalleryData };

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load ${url} (${res.status})`);
  return res.json() as Promise<T>;
}

export function useGalleryData(): GalleryDataState {
  const [state, setState] = useState<GalleryDataState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    Promise.all([fetchJson<PageData>(PAGE_DATA_URL), fetchJson<GalleryMedia>(GALLERY_API_URL)])
      .then(([page, gallery]) => {
        if (!cancelled) setState({ status: "success", data: { ...page, gallery } });
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setState({ status: "error", error: err instanceof Error ? err.message : String(err) });
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
