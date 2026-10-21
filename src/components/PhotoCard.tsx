import type { Photo } from "../types/photo";

type PhotoCardProps = {
  photo: Photo;
  isFavorite: boolean;
  onToggleFav: (photoId: string) => void;
};

export default function PhotoCard({
  photo,
  isFavorite,
  onToggleFav,
}: PhotoCardProps) {
  return (
    <article className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="relative aspect-4/3">
        <img
          src={photo.download_url}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          className="h-full w-full object-cover"
        />

        <button
          type="button"
          onClick={() => onToggleFav(photo.id)}
          aria-label={
            isFavorite
              ? `Remove ${photo.author} from favourites`
              : `Add ${photo.author} to favourites`
          }
          aria-pressed={isFavorite}
          className={`absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow ${isFavorite ? "text-rose-600" : "text-gray-500 hover:text-rose-600"}`}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill={isFavorite ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z"
            />
          </svg>
        </button>
      </div>

      <div className="p-4">
        <p className="font-medium text-gray-800">{photo.author}</p>
      </div>
    </article>
  );
}
