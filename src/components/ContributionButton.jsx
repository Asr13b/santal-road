import { useState } from "react";
import ContributionAccount from "./ContributionAccount";

export default function ContributionButton({
  size = "large",
  label = "አስተዋጽኦ ማድረግ",
}) {
  const [open, setOpen] = useState(false);

  const sizeClasses =
    size === "large"
      ? "text-lg xs:text-xl py-5 px-6 min-h-[64px]"
      : "text-base py-4 px-5 min-h-[52px]";

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`btn-primary ${sizeClasses} max-w-md mx-auto`}
      >
        <svg
          className="w-6 h-6 flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
          <path
            fillRule="evenodd"
            d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
            clipRule="evenodd"
          />
        </svg>
        <span>{label}</span>
      </button>

      {open && <ContributionAccount onClose={() => setOpen(false)} />}
    </>
  );
}
