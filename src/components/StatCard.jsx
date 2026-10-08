import { formatNumber } from "../utils/format";

export default function StatCard({
  label,
  value,
  unit,
  icon,
  color = "emerald",
}) {
  const colorMap = {
    emerald: "text-emerald-700 bg-emerald-50 border-emerald-100",
    amber: "text-amber-700 bg-amber-50 border-amber-100",
    blue: "text-blue-700 bg-blue-50 border-blue-100",
    purple: "text-purple-700 bg-purple-50 border-purple-100",
  };
  const colorClass = colorMap[color] || colorMap.emerald;

  return (
    <div className="card p-3 xs:p-4 flex flex-col items-center text-center">
      {icon && (
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 border ${colorClass}`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={icon}
            />
          </svg>
        </div>
      )}
      <p className="text-[11px] xs:text-xs text-gray-500 mb-1 leading-tight">
        {label}
      </p>
      <p className="text-base xs:text-lg sm:text-xl font-bold text-gray-900 break-all leading-tight">
        {formatNumber(value)}
      </p>
      {unit && (
        <p className="text-[10px] xs:text-xs text-gray-400 mt-1">{unit}</p>
      )}
    </div>
  );
}
