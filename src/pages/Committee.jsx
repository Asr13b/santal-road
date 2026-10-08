import CommitteeCard from "../components/CommitteeCard";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";
import { useFetch } from "../hooks/useFetch";
import { getCommittee } from "../services/googleSheets";

const LEADER_ROLES = ["ሰብሳቢ", "ምክትል ሰብሳቢ"];

export default function Committee() {
  const { data, loading, error, refetch } = useFetch(() => getCommittee(), []);

  const leaders = data ? data.filter((m) => LEADER_ROLES.includes(m.role)) : [];
  const others = data ? data.filter((m) => !LEADER_ROLES.includes(m.role)) : [];

  return (
    <div className="container-app py-6">
      <h1 className="section-title mb-2">ኮሚቴ</h1>
      <p className="text-center text-sm text-gray-600 mb-6">
        የፕሮጀክቱ አስተባባሪ ኮሚቴ አባላት
      </p>

      {loading && <LoadingState />}
      {error && <ErrorState message={error} onRetry={refetch} />}
      {data && data.length === 0 && (
        <EmptyState message="እስካሁን የተመዘገበ የኮሚቴ አባል የለም።" />
      )}

      {leaders.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-emerald-800 mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-amber-400 rounded-full" />
            መሪዎች
          </h2>
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
            {leaders.map((m) => (
              <CommitteeCard key={m.id} member={m} isLeader />
            ))}
          </div>
        </div>
      )}

      {others.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-emerald-800 mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-emerald-400 rounded-full" />
            አባላት
          </h2>
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
            {others.map((m) => (
              <CommitteeCard key={m.id} member={m} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
