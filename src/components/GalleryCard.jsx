import { formatDate } from "../utils/format";

export default function GalleryCard({ item, onClick }) {
  const { title, image, date, description } = item;

  return (
    <div
      onClick={onClick}
      className={`card overflow-hidden ${onClick ? "cursor-pointer hover:shadow-lg transition-shadow" : ""}`}
    >
      <div className="w-full aspect-square bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        ) : (
          <svg
            className="w-12 h-12 text-emerald-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        )}
      </div>
      <div className="p-3">
        <h3 className="text-sm font-bold text-gray-900 mb-1 break-words line-clamp-2">
          {title}
        </h3>
        {date && <p className="text-xs text-gray-500">{formatDate(date)}</p>}
      </div>
    </div>
  );
}
