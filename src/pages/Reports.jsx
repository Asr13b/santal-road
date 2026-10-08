import ReportCard from "../components/ReportCard";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";
import { useFetch } from "../hooks/useFetch";
import { getReports } from "../services/googleSheets";

export default function Reports() {
  const { data, loading, error, refetch } = useFetch(() => getReports(), []);

  return (
    <div className="container-app py-6">
      <h1 className="section-title mb-2">ሪፖርቶች</h1>
      <p className="text-center text-sm text-gray-600 mb-6">
        የፕሮጀክቱ ሪፖርቶች እና ሰነዶች
      </p>

      {loading && <LoadingState />}
      {error && <ErrorState message={error} onRetry={refetch} />}
      {data && data.length === 0 && (
        <EmptyState message="እስካሁን የተለቀቀ ሪፖርት የለም።" />
      )}
      {data && data.length > 0 && (
        <div className="space-y-3">
          {data.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      )}
    </div>
  );
}
