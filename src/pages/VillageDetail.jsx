import { Link, useParams } from "react-router-dom";
import VillageMembers from "../components/VillageMembers";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";
import { useFetch } from "../hooks/useFetch";
import { getVillages, getVillageMembers } from "../services/googleSheets";
import { formatNumber } from "../utils/format";

export default function VillageDetail() {
  const { id } = useParams();
  const villages = useFetch(() => getVillages(), [id]);
  const members = useFetch(() => getVillageMembers(id), [id]);

  const village = villages.data
    ? villages.data.find((v) => String(v.id) === String(id))
    : null;

  return (
    <div className="container-app py-6">
      <Link
        to="/villages"
        className="inline-flex items-center gap-1 text-sm text-emerald-700 font-semibold mb-4"
      >
        ← ወደ መንደሮች
      </Link>

      {villages.loading && <LoadingState />}
      {villages.error && (
        <ErrorState message={villages.error} onRetry={villages.refetch} />
      )}

      {!villages.loading && !village && <EmptyState message="መንደሩ አልተገኘም።" />}

      {village && (
        <>
          {/* የመንደር መረጃ */}
          <div className="card p-4 xs:p-5 mb-5">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-7 h-7 text-emerald-700"
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
                <h1 className="text-xl xs:text-2xl font-bold text-gray-900 break-words">
                  {village.name}
                </h1>
                {village.coordinator && (
                  <p className="text-sm text-gray-600 mt-1 break-words">
                    አስተባባሪ: {village.coordinator}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-emerald-50 rounded-xl p-3 text-center">
                <p className="text-xs text-emerald-600 mb-1">የህዝብ ብዛት</p>
                <p className="text-lg font-bold text-emerald-800 break-all">
                  {formatNumber(village.peopleCount)}
                </p>
              </div>
              <div className="bg-amber-50 rounded-xl p-3 text-center">
                <p className="text-xs text-amber-600 mb-1">የተመዘገቡ አባላት</p>
                <p className="text-lg font-bold text-amber-800 break-all">
                  {formatNumber(members.data ? members.data.length : 0)}
                </p>
              </div>
            </div>

            {village.description && (
              <p className="text-sm text-gray-700 leading-relaxed break-words">
                {village.description}
              </p>
            )}
          </div>

          {/* የመንደር አባላት */}
          <h2 className="text-lg xs:text-xl font-bold text-emerald-800 mb-4">
            የመንደሩ አባላት
          </h2>

          {members.loading && <LoadingState />}
          {members.error && (
            <ErrorState message={members.error} onRetry={members.refetch} />
          )}
          {members.data && <VillageMembers members={members.data} />}
        </>
      )}
    </div>
  );
}
