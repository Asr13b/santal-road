import { formatDate } from "../utils/format";

export default function NewsCard({ news, onClick }) {
  const { title, date, category, summary, image } = news;

  return (
    <article
      onClick={onClick}
      className={`card p-4 ${onClick ? "cursor-pointer hover:shadow-lg transition-shadow" : ""}`}
    >
      {image && (
        <div className="w-full h-40 -m-4 mb-3 overflow-hidden rounded-t-2xl bg-gray-100">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.parentElement.style.display = "none";
            }}
          />
        </div>
      )}
      <div className="flex flex-wrap items-center gap-2 mb-2">
        {category && (
          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
            {category}
          </span>
        )}
        {date && (
          <span className="text-xs text-gray-500">{formatDate(date)}</span>
        )}
      </div>
      <h3 className="text-base xs:text-lg font-bold text-gray-900 mb-2 leading-snug break-words">
        {title}
      </h3>
      {summary && (
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 break-words">
          {summary}
        </p>
      )}
    </article>
  );
}
