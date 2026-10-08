import { useState, useMemo } from "react";
import StatCard from "../components/StatCard";
import ProgressCard from "../components/ProgressCard";
import ContributorCard from "../components/ContributorCard";
import ContributionButton from "../components/ContributionButton";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";
import { useFetch } from "../hooks/useFetch";
import {
  getProjectStats,
  getContributors,
  getVillages,
} from "../services/googleSheets";
import { formatNumber } from "../utils/format";

export default function Finance() {
  const stats = useFetch(() => getProjectStats(), []);
  const contributors = useFetch(() => getContributors(), []);
  const villages = useFetch(() => getVillages(), []);

  const [search, setSearch] = useState("");
  const [villageFilter, setVillageFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const filtered = useMemo(() => {
    if (!contributors.data) return [];
    let list = [...contributors.data];

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((c) => String(c.name).toLowerCase().includes(q));
    }

    if (villageFilter !== "all") {
      list = list.filter((c) => String(c.village) === String(villageFilter));
    }

    if (sortBy === "name") {
      list.sort((a, b) => String(a.name).localeCompare(String(b.name), "am"));
    } else if (sortBy === "paid") {
      list.sort(
        (a, b) =>
          (Number(String(b.paid).replace(/,/g, "")) || 0) -
          (Number(String(a.paid).replace(/,/g, "")) || 0),
      );
    } else if (sortBy === "remaining") {
      list.sort(
        (a, b) =>
          (Number(String(b.remaining).replace(/,/g, "")) || 0) -
          (Number(String(a.remaining).replace(/,/g, "")) || 0),
      );
    }

    return list;
  }, [contributors.data, search, villageFilter, sortBy]);

  return (
    <div className="container-app py-6">
      <h1 className="section-title mb-2">ፋይናንስ</h1>
      <p className="text-center text-sm text-gray-600 mb-6">
        የፕሮጀክቱ የገንዘብ ግልጽነት መረጃ
      </p>

      {/* ስታቲስቲክስ */}
      {stats.loading && <LoadingState />}
      {stats.error && (
        <ErrorState message={stats.error} onRetry={stats.refetch} />
      )}
      {stats.data && (
        <>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <StatCard
              label="ጠቅላላ ዒላማ"
              value={stats.data.target}
              unit="ብር"
              color="blue"
              icon="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"
            />
            <StatCard
              label="የተሰበሰበ"
              value={stats.data.paid}
              unit="ብር"
              color="emerald"
              icon="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
            <StatCard
              label="ቀሪ"
              value={stats.data.remaining}
              unit="ብር"
              color="amber"
              icon="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
            <StatCard
              label="ተሳታፊዎች"
              value={stats.data.participantCount}
              unit="ሰዎች"
              color="purple"
              icon="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2a3 3 0 00-3-3H10a3 3 0 00-3 3v2m10 0H7m2-10a3 3 0 106 0 3 3 0 00-6 0z"
            />
          </div>
          <div className="mb-6">
            <ProgressCard paid={stats.data.paid} target={stats.data.target} />
          </div>
        </>
      )}

      {/* የአስተዋጽኦ ጥሪ */}
      <div className="mb-6">
        <ContributionButton />
      </div>

      {/* የአስተዋጽኦ ዝርዝር */}
      <section>
        <h2 className="text-lg xs:text-xl font-bold text-emerald-800 mb-4">
          የአስተዋጽኦ ዝርዝር
        </h2>

        {contributors.loading && <LoadingState />}
        {contributors.error && (
          <ErrorState
            message={contributors.error}
            onRetry={contributors.refetch}
          />
        )}

        {contributors.data && contributors.data.length === 0 && (
          <EmptyState message="እስካሁን የተመዘገበ አስተዋጽኦ የለም።" />
        )}

        {contributors.data && contributors.data.length > 0 && (
          <>
            {/* ፍለጋ እና ማጣሪያ */}
            <div className="space-y-3 mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="በስም ፈልግ..."
                  className="w-full px-4 py-3 pr-10 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[48px]"
                />
                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <select
                  value={villageFilter}
                  onChange={(e) => setVillageFilter(e.target.value)}
                  className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[48px]"
                >
                  <option value="all">ሁሉም መንደሮች</option>
                  {villages.data &&
                    villages.data.map((v) => (
                      <option key={v.id} value={v.name}>
                        {v.name}
                      </option>
                    ))}
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[48px]"
                >
                  <option value="name">በስም ደርድር</option>
                  <option value="paid">በተከፈለ ደርድር</option>
                  <option value="remaining">በቀሪ ደርድር</option>
                </select>
              </div>

              <p className="text-xs text-gray-500 text-center">
                {formatNumber(filtered.length)} ውጤቶች
              </p>
            </div>

            {/* ዝርዝር */}
            {filtered.length === 0 ? (
              <EmptyState message="ከፍለጋው ጋር የሚዛመድ ውጤት አልተገኘም።" />
            ) : (
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
                {filtered.map((c, i) => (
                  <ContributorCard key={c.id || i} contributor={c} />
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
