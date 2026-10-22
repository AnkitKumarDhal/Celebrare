import type { Photo } from "../types/photo";

type PhotoCardProps = {
  photo: Photo;
  isFavorite: boolean;
  onToggleFav: (photoId: string) => void;
  animationDelayClass: string;
};

export default function PhotoCard({
  photo,
  isFavorite,
  onToggleFav,
  animationDelayClass,
}: PhotoCardProps) {
  return (
    <article
      className={`group animate-gallery-enter overflow-hidden rounded-xl border border-sage/20 bg-surface shadow-card transition duration-300 ease-out hover:-translate-y-1 hover:shadow-card-hover motion-reduce:animate-none motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${animationDelayClass}`}
    >
      <div className="relative aspect-4/3 overflow-hidden">
        <img
          src={photo.download_url}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
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
          className={`absolute right-3 top-3 rounded-full bg-surface/90 p-2 shadow transition duration-200 ease-out hover:scale-110 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:active:scale-100 ${isFavorite ? "text-rose-500" : "text-sage/70 hover:text-sage"}`}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill={isFavorite ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            className={`h-5 w-5 ${isFavorite ? "animate-heart-pop motion-reduce:animate-none" : ""}`}
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
        <p className="font-medium leading-snug text-text">{photo.author}</p>
      </div>
    </article>
  );
}
