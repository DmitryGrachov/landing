import { useEffect, useState } from "react";
import type { GalleryData } from "../types";

// Fetched from a static JSON file for now. Once a real backend endpoint
// exists, swap the URL below (and add headers/auth if needed) — every
// consumer of this hook already works against the same GalleryData shape.
const GALLERY_DATA_URL = "/gallery-data.json";

type GalleryDataState =
  | { status: "loading" }
  | { status: "error"; error: string }
  | { status: "success"; data: GalleryData };

export function useGalleryData(): GalleryDataState {
  const [state, setState] = useState<GalleryDataState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    fetch(GALLERY_DATA_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load gallery data (${res.status})`);
        return res.json() as Promise<GalleryData>;
      })
      .then((data) => {
        if (!cancelled) setState({ status: "success", data });
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
