import VillageCard from "../components/VillageCard";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";
import { useFetch } from "../hooks/useFetch";
import { getVillages } from "../services/googleSheets";

export default function Villages() {
  const { data, loading, error, refetch } = useFetch(() => getVillages(), []);

  return (
    <div className="container-app py-6">
      <h1 className="section-title mb-2">መንደሮች</h1>
      <p className="text-center text-sm text-gray-600 mb-6">
        በፕሮጀክቱ ውስጥ የተሳተፉ መንደሮች ዝርዝር
      </p>

      {loading && <LoadingState />}
      {error && <ErrorState message={error} onRetry={refetch} />}
      {data && data.length === 0 && (
        <EmptyState message="እስካሁን የተመዘገበ መንደር የለም።" />
      )}
      {data && data.length > 0 && (
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3">
          {data.map((village) => (
            <VillageCard key={village.id} village={village} />
          ))}
        </div>
      )}
    </div>
  );
}
