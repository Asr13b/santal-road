import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import StatCard from "../components/StatCard";
import ProgressCard from "../components/ProgressCard";
import ContributionButton from "../components/ContributionButton";
import NewsCard from "../components/NewsCard";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";
import { useFetch } from "../hooks/useFetch";
import {
  getProjectStats,
  getNews,
  getVillages,
} from "../services/googleSheets";
import { formatNumber } from "../utils/format";

export default function Home() {
  const stats = useFetch(() => getProjectStats(), []);
  const news = useFetch(() => getNews(), []);
  const villages = useFetch(() => getVillages(), []);

  return (
    <div className="w-full pb-4">
      <Hero />

      {/* ስታቲስቲክስ */}
      <section className="container-app py-6">
        <h2 className="section-title mb-5">የፕሮጀክቱ ሁኔታ</h2>

        {stats.loading && <LoadingState />}
        {stats.error && (
          <ErrorState message={stats.error} onRetry={stats.refetch} />
        )}
        {stats.data && (
          <>
            <div className="grid grid-cols-2 xs:grid-cols-2 gap-3 mb-4">
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
            <ProgressCard paid={stats.data.paid} target={stats.data.target} />
          </>
        )}
      </section>

      {/* የአስተዋጽኦ ጥሪ */}
      <section className="container-app py-6">
        <div className="bg-gradient-to-br from-emerald-700 to-emerald-800 rounded-3xl p-5 xs:p-6 text-center shadow-xl">
          <h2 className="text-lg xs:text-xl font-bold text-white mb-2">
            ለፕሮጀክቱ አስተዋጽኦ ያድርጉ
          </h2>
          <p className="text-sm xs:text-base text-emerald-100 mb-5 leading-relaxed">
            የእርስዎ አስተዋጽኦ ለመንገዱ ስኬት ወሳኝ ነው። ዛሬውኑ ያስተዋጽኡ እና የማህበረሰባችንን የወደፊት ሕይወት
            ይለውጡ።
          </p>
          <ContributionButton />
        </div>
      </section>

      {/* መንደሮች */}
      <section className="container-app py-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl xs:text-2xl font-bold text-emerald-800">
            መንደሮች
          </h2>
          <Link
            to="/villages"
            className="text-sm font-semibold text-emerald-700 hover:text-emerald-900"
          >
            ሁሉንም ይመልከቱ →
          </Link>
        </div>

        {villages.loading && <LoadingState />}
        {villages.error && (
          <ErrorState message={villages.error} onRetry={villages.refetch} />
        )}
        {villages.data && villages.data.length === 0 && (
          <EmptyState message="እስካሁን የተመዘገበ መንደር የለም።" />
        )}
        {villages.data && villages.data.length > 0 && (
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
            {villages.data.slice(0, 4).map((v) => (
              <Link
                key={v.id}
                to={`/villages/${v.id}`}
                className="card p-3 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-sm font-bold text-gray-900 truncate mb-1">
                  {v.name}
                </h3>
                <p className="text-xs text-emerald-700 font-semibold">
                  {formatNumber(v.peopleCount)} ሰዎች
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ዜናዎች */}
      <section className="container-app py-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl xs:text-2xl font-bold text-emerald-800">
            የቅርብ ጊዜ ዜናዎች
          </h2>
          <Link
            to="/news"
            className="text-sm font-semibold text-emerald-700 hover:text-emerald-900"
          >
            ሁሉንም ይመልከቱ →
          </Link>
        </div>

        {news.loading && <LoadingState />}
        {news.error && (
          <ErrorState message={news.error} onRetry={news.refetch} />
        )}
        {news.data && news.data.length === 0 && (
          <EmptyState message="እስካሁን የተለቀቀ ዜና የለም።" />
        )}
        {news.data && news.data.length > 0 && (
          <div className="space-y-3">
            {news.data.slice(0, 3).map((item) => (
              <Link key={item.id} to={`/news/${item.id}`} className="block">
                <NewsCard news={item} />
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
