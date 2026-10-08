import { formatNumber, getStatusColor } from "../utils/format";

export default function ContributorCard({ contributor }) {
  const { name, village, pledged, paid, remaining, status } = contributor;

  return (
    <div className="card p-3 xs:p-4">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="min-w-0 flex-1">
          <h4 className="text-sm xs:text-base font-bold text-gray-900 break-words">
            {name}
          </h4>
          {village && (
            <p className="text-xs text-gray-500 break-words">{village}</p>
          )}
        </div>
        {status && (
          <span
            className={`px-2 py-1 text-[10px] xs:text-xs font-semibold rounded-full flex-shrink-0 ${getStatusColor(status)}`}
          >
            {status}
          </span>
        )}
      </div>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-gray-50 rounded-lg p-2">
          <p className="text-[10px] text-gray-500 mb-0.5">ቃል</p>
          <p className="text-xs xs:text-sm font-bold text-gray-800 break-all">
            {formatNumber(pledged)}
          </p>
        </div>
        <div className="bg-emerald-50 rounded-lg p-2">
          <p className="text-[10px] text-emerald-600 mb-0.5">የተከፈለ</p>
          <p className="text-xs xs:text-sm font-bold text-emerald-700 break-all">
            {formatNumber(paid)}
          </p>
        </div>
        <div className="bg-amber-50 rounded-lg p-2">
          <p className="text-[10px] text-amber-600 mb-0.5">ቀሪ</p>
          <p className="text-xs xs:text-sm font-bold text-amber-700 break-all">
            {formatNumber(remaining)}
          </p>
        </div>
      </div>
    </div>
  );
}
