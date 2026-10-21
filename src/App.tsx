import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ChangeEvent,
} from "react";
import useFetchPhotos from "./hooks/useFetchPhotos";
import PhotoCard from "./components/PhotoCard";

const FAVORITES_STORAGE_KEY = "celebrare-favs";

type FavortiesAction = {
  type: "toggle";
  photoId: string;
};

function favortiesReducer(
  favorites: string[],
  action: FavortiesAction,
): string[] {
  switch (action.type) {
    case "toggle":
      return favorites.includes(action.photoId)
        ? favorites.filter((id) => id !== action.photoId)
        : [...favorites, action.photoId];
    default:
      return favorites;
  }
}

function getInitFavs(): string[] {
  try {
    const savedFavs = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return savedFavs ? (JSON.parse(savedFavs) as string[]) : [];
  } catch {
    return [];
  }
}

export default function App() {
  const { photos, loading, error } = useFetchPhotos();
  const [searchQuery, setSearchQuery] = useState("");
  const [favs, dispatch] = useReducer(favortiesReducer, [], () =>
    getInitFavs(),
  );

  const handleSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.currentTarget.value);
  }, []);

  const filteredPhotos = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(normalizedQuery),
    );
  }, [photos, searchQuery]);

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favs));
  }, [favs]);

  function handleToggleFav(photoId: string) {
    dispatch({ type: "toggle", photoId });
  }

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50">
        <span
          aria-hidden="true"
          className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"
        />
        <p role="status" className="text-gray-600">
          Loading photos...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
        <p role="alert" className="rounded-lg bg-red-100 p-4 text-red-700">
          Could not load photos: {error}
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">Photo Gallery</h1>

      <label htmlFor="author-search" className="mb-6 block">
        <span className="sr-only">Search by author name</span>
        <input
          id="author-search"
          type="search"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by author..."
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>

      {filteredPhotos.length === 0 ? (
        <p className="text-center text-gray-600">
          No photos match "{searchQuery}"
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavorite={favs.includes(photo.id)}
              onToggleFav={handleToggleFav}
            />
          ))}
        </div>
      )}
    </main>
  );
}
