import GalleryCard from "../components/GalleryCard";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";
import { useFetch } from "../hooks/useFetch";
import { getGallery } from "../services/googleSheets";

export default function Gallery() {
  const { data, loading, error, refetch } = useFetch(() => getGallery(), []);

  return (
    <div className="container-app py-6">
      <h1 className="section-title mb-2">ፎቶዎች</h1>
      <p className="text-center text-sm text-gray-600 mb-6">የፕሮጀክቱ የፎቶ ማህደር</p>

      {loading && <LoadingState />}
      {error && <ErrorState message={error} onRetry={refetch} />}
      {data && data.length === 0 && <EmptyState message="እስካሁን የተጫነ ፎቶ የለም።" />}
      {data && data.length > 0 && (
        <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {data.map((item) => (
            <GalleryCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
