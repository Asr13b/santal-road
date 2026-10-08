import { formatNumber } from "../utils/format";

export default function ProgressCard({ paid, target, label = "የአስተዋጽኦ እድገት" }) {
  const paidNum = Number(String(paid || "0").replace(/,/g, "")) || 0;
  const targetNum = Number(String(target || "0").replace(/,/g, "")) || 0;
  const percentage =
    targetNum > 0 ? Math.min((paidNum / targetNum) * 100, 100) : 0;
  const displayPercentage = percentage.toFixed(1);

  return (
    <div className="card p-4 xs:p-5">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm xs:text-base font-semibold text-gray-700">
          {label}
        </span>
        <span className="text-base xs:text-lg font-bold text-amber-600">
          {displayPercentage}%
        </span>
      </div>
      <div className="w-full h-3 xs:h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      <div className="flex flex-col xs:flex-row justify-between gap-1 xs:gap-2 mt-3 text-xs xs:text-sm text-gray-600">
        <span className="break-all">
          የተሰበሰበ:{" "}
          <strong className="text-emerald-700">{formatNumber(paidNum)}</strong>{" "}
          ብር
        </span>
        <span className="break-all">
          ዒላማ:{" "}
          <strong className="text-gray-800">{formatNumber(targetNum)}</strong>{" "}
          ብር
        </span>
      </div>
    </div>
  );
}
