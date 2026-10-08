import { formatDate } from "../utils/format";

export default function ReportCard({ report }) {
  const { title, date, description, fileurl } = report;

  return (
    <div className="card p-4">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
          <svg
            className="w-5 h-5 text-blue-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm xs:text-base font-bold text-gray-900 break-words">
            {title}
          </h3>
          {date && (
            <p className="text-xs text-gray-500 mt-0.5">{formatDate(date)}</p>
          )}
        </div>
      </div>
      {description && (
        <p className="text-sm text-gray-600 leading-relaxed mb-3 break-words">
          {description}
        </p>
      )}
      {fileurl && fileurl !== "#" && (
        <a
          href={fileurl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-colors min-h-[44px]"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          አውርድ
        </a>
      )}
    </div>
  );
}
