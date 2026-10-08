import { getInitials } from "../utils/format";

export default function CommitteeCard({ member, isLeader = false }) {
  const { name, role, village, photo } = member;

  return (
    <div
      className={`card p-4 ${isLeader ? "border-2 border-amber-300 bg-amber-50/30" : ""}`}
    >
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-emerald-100 flex items-center justify-center">
          {photo ? (
            <img
              src={photo}
              alt={name}
              loading="lazy"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentElement.innerHTML = `<span class="text-emerald-700 font-bold text-lg">${getInitials(name)}</span>`;
              }}
            />
          ) : (
            <span className="text-emerald-700 font-bold text-lg">
              {getInitials(name)}
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm xs:text-base font-bold text-gray-900 break-words">
            {name}
          </h3>
          <p
            className={`text-xs xs:text-sm font-medium ${isLeader ? "text-amber-700" : "text-emerald-700"} break-words`}
          >
            {role}
          </p>
          {village && (
            <p className="text-xs text-gray-500 mt-0.5 break-words">
              መንደር: {village}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
