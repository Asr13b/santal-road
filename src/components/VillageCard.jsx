import { Link } from "react-router-dom";
import { formatNumber } from "../utils/format";

export default function VillageCard({ village }) {
  const { id, name, peopleCount, coordinator, description } = village;

  return (
    <Link
      to={`/villages/${id}`}
      className="card p-4 hover:shadow-lg transition-shadow block active:scale-[0.99]"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-6 h-6 text-emerald-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"
              />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-base xs:text-lg font-bold text-gray-900 truncate">
              {name}
            </h3>
            {coordinator && (
              <p className="text-xs text-gray-500 truncate">
                አስተባባሪ: {coordinator}
              </p>
            )}
          </div>
        </div>
        <svg
          className="w-5 h-5 text-gray-400 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <span className="px-3 py-1.5 bg-amber-50 text-amber-700 text-sm font-semibold rounded-lg">
          {formatNumber(peopleCount)} ሰዎች
        </span>
      </div>

      {description && (
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 break-words">
          {description}
        </p>
      )}
    </Link>
  );
}
