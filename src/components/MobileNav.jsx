import { NavLink } from "react-router-dom";

const items = [
  { to: "/", label: "መነሻ", icon: "M3 12l9-9 9 9M5 10v10h14V10" },
  {
    to: "/news",
    label: "ዜና",
    icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v8a2 2 0 01-2 2zM7 8h6M7 12h10M7 16h10",
  },
  {
    to: "/villages",
    label: "መንደሮች",
    icon: "M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6",
  },
  {
    to: "/finance",
    label: "ፋይናንስ",
    icon: "M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6",
  },
  {
    to: "/committee",
    label: "ኮሚቴ",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2a3 3 0 00-3-3H10a3 3 0 00-3 3v2m10 0H7m2-10a3 3 0 106 0 3 3 0 00-6 0z",
  },
];

export default function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-[0_-2px_8px_rgba(0,0,0,0.06)]">
      <ul className="flex items-stretch justify-around">
        {items.map((item) => (
          <li key={item.to} className="flex-1">
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-2 px-1 min-h-[60px] text-[11px] font-medium transition-colors ${
                  isActive ? "text-emerald-700" : "text-gray-500"
                }`
              }
            >
              <svg
                className="w-6 h-6 mb-1"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={item.icon}
                />
              </svg>
              <span className="truncate max-w-full">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
