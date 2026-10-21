import { useEffect, useState } from "react";
import { type Photo } from "../types/photo";

// this waas provided in that pdf
const PHOTOS_URL = "https://picsum.photos/v2/list?limit=30";

export default function useFetchPhotos() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchPhotos() {
      try {
        const response = await fetch(PHOTOS_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Unable to load photos (HTTP ${response.status})`);
        }

        const data: Photo[] = await response.json();
        setPhotos(data);
      } catch (caught) {
        if (!controller.signal.aborted) {
          setError(
            caught instanceof Error
              ? caught.message
              : "Could not load photos. Please try again.",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void fetchPhotos();

    return () => {
      controller.abort();
    };
  }, []);

  return { photos, loading, error };
}
