import { Link, useParams } from "react-router-dom";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import { useFetch } from "../hooks/useFetch";
import { getNews } from "../services/googleSheets";
import { formatDate } from "../utils/format";

export default function NewsDetail() {
  const { id } = useParams();
  const { data, loading, error, refetch } = useFetch(() => getNews(), [id]);

  const item = data ? data.find((n) => String(n.id) === String(id)) : null;

  if (loading)
    return (
      <div className="container-app py-6">
        <LoadingState />
      </div>
    );
  if (error)
    return (
      <div className="container-app py-6">
        <ErrorState message={error} onRetry={refetch} />
      </div>
    );

  if (!item) {
    return (
      <div className="container-app py-10 text-center">
        <p className="text-gray-500 mb-4">ዜናው አልተገኘም።</p>
        <Link
          to="/news"
          className="inline-block px-5 py-3 bg-emerald-600 text-white rounded-xl font-semibold"
        >
          ወደ ዜናዎች ተመለስ
        </Link>
      </div>
    );
  }

  return (
    <div className="container-app py-6">
      <Link
        to="/news"
        className="inline-flex items-center gap-1 text-sm text-emerald-700 font-semibold mb-4"
      >
        ← ወደ ዜናዎች
      </Link>

      <article className="card p-4 xs:p-6">
        {item.image && (
          <div className="w-full h-48 xs:h-64 -m-4 xs:-m-6 mb-4 xs:mb-5 overflow-hidden rounded-t-2xl bg-gray-100">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.target.parentElement.style.display = "none";
              }}
            />
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2 mb-3">
          {item.category && (
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
              {item.category}
            </span>
          )}
          {item.date && (
            <span className="text-xs text-gray-500">
              {formatDate(item.date)}
            </span>
          )}
        </div>

        <h1 className="text-xl xs:text-2xl font-bold text-gray-900 mb-4 leading-snug break-words">
          {item.title}
        </h1>

        {item.summary && (
          <p className="text-base text-gray-700 font-medium mb-4 leading-relaxed border-l-4 border-emerald-400 pl-3">
            {item.summary}
          </p>
        )}

        {item.content && (
          <div className="text-base text-gray-700 leading-relaxed whitespace-pre-line break-words">
            {item.content}
          </div>
        )}
      </article>
    </div>
  );
}
