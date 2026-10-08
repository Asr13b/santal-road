import { Link } from "react-router-dom";
import NewsCard from "../components/NewsCard";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";
import { useFetch } from "../hooks/useFetch";
import { getNews } from "../services/googleSheets";

export default function News() {
  const { data, loading, error, refetch } = useFetch(() => getNews(), []);

  return (
    <div className="container-app py-6">
      <h1 className="section-title mb-6">ዜናዎች</h1>

      {loading && <LoadingState />}
      {error && <ErrorState message={error} onRetry={refetch} />}
      {data && data.length === 0 && (
        <EmptyState message="እስካሁን የተለቀቀ ዜና የለም።" />
      )}
      {data && data.length > 0 && (
        <div className="space-y-3">
          {data.map((item) => (
            <Link key={item.id} to={`/news/${item.id}`} className="block">
              <NewsCard news={item} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
