import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

const navItems = [
  { to: "/", label: "መነሻ" },
  { to: "/news", label: "ዜና" },
  { to: "/villages", label: "መንደሮች" },
  { to: "/committee", label: "ኮሚቴ" },
  { to: "/finance", label: "ፋይናንስ" },
  { to: "/gallery", label: "ፎቶዎች" },
  { to: "/reports", label: "ሪፖርቶች" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-emerald-700 shadow-md">
      <nav className="container-app flex items-center justify-between h-14">
        <Link
          to="/"
          className="text-white font-bold text-lg sm:text-xl truncate"
          onClick={() => setOpen(false)}
        >
          ሳንታል ልማት
        </Link>

        {/* የዴስክቶፕ አሰሳ */}
        <ul className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-emerald-800 text-amber-300"
                      : "text-white hover:bg-emerald-600"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* የሞባይል ምናሌ ቁልፍ */}
        <button
          className="md:hidden p-2 text-white rounded-lg hover:bg-emerald-600 min-w-[44px] min-h-[44px] flex items-center justify-center"
          onClick={() => setOpen((v) => !v)}
          aria-label="ምናሌ"
          aria-expanded={open}
        >
          {open ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </nav>

      {/* የሞባይል ምናሌ */}
      {open && (
        <div className="md:hidden bg-emerald-800 border-t border-emerald-600">
          <ul className="container-app py-2 space-y-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg text-base font-medium min-h-[48px] flex items-center ${
                      isActive
                        ? "bg-emerald-900 text-amber-300"
                        : "text-white hover:bg-emerald-700"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
