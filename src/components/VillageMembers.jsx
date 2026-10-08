import { formatNumber, getStatusColor } from "../utils/format";

export default function VillageMembers({ members }) {
  if (!members || members.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 text-sm">
        በዚህ መንደር ውስጥ እስካሁን የተመዘገበ አባል የለም።
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {members.map((member, index) => (
        <li key={member.id || index} className="card p-3 xs:p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 text-emerald-700 font-bold text-sm">
              {index + 1}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h4 className="text-sm xs:text-base font-bold text-gray-900 break-words">
                  {member.name}
                </h4>
                {member.status && (
                  <span
                    className={`px-2 py-0.5 text-[11px] font-semibold rounded-full ${getStatusColor(member.status)}`}
                  >
                    {member.status}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-gray-50 rounded-lg p-2">
                  <p className="text-[10px] text-gray-500 mb-0.5">ቃል</p>
                  <p className="text-xs xs:text-sm font-bold text-gray-800 break-all">
                    {formatNumber(member.pledged)}
                  </p>
                </div>
                <div className="bg-emerald-50 rounded-lg p-2">
                  <p className="text-[10px] text-emerald-600 mb-0.5">የተከፈለ</p>
                  <p className="text-xs xs:text-sm font-bold text-emerald-700 break-all">
                    {formatNumber(member.paid)}
                  </p>
                </div>
                <div className="bg-amber-50 rounded-lg p-2">
                  <p className="text-[10px] text-amber-600 mb-0.5">ቀሪ</p>
                  <p className="text-xs xs:text-sm font-bold text-amber-700 break-all">
                    {formatNumber(member.remaining)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
