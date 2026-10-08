import { useState, useEffect } from "react";

const ACCOUNT_NUMBER = "1000696007725";
const ACCOUNT_NAME = "ሳንታል የመንገድ ልማት ኮሚቴ";
const BANK_NAME = "አዲስ አበባ የንግድ ባንክ";
const ACCOUNT_OWNERS = "አበበ ከበደ፣ ተስፋዬ አለሙ እና ፍቅሬ ተስፋ";

export default function ContributionAccount({ onClose }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(ACCOUNT_NUMBER);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = ACCOUNT_NUMBER;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // ውድቀት ካለ በእጅ ይመልከቱ
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="የአስተዋጽኦ መረጃ"
        className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl max-h-[92vh] overflow-y-auto shadow-2xl animate-slide-up"
      >
        <div className="sticky top-0 z-10 bg-emerald-700 text-white p-4 rounded-t-3xl flex items-center justify-between">
          <h2 className="text-lg xs:text-xl font-bold">የአስተዋጽኦ መረጃ</h2>
          <button
            onClick={onClose}
            aria-label="ዝጋ"
            className="p-2 hover:bg-emerald-600 rounded-full min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
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
          </button>
        </div>

        <div className="p-4 xs:p-5 space-y-4">
          {/* የባንክ ስም */}
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">የባንክ ስም</p>
            <p className="text-base xs:text-xl font-bold text-emerald-800">
              {BANK_NAME}
            </p>
          </div>

          {/* የሂሳብ ቁጥር */}
          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 xs:p-5 text-center">
            <p className="text-xs xs:text-sm text-amber-700 mb-2 font-medium">
              የሂሳብ ቁጥር
            </p>
            <p className="text-2xl xs:text-3xl sm:text-4xl font-bold text-gray-900 tracking-wider font-mono select-all break-all leading-tight">
              {ACCOUNT_NUMBER}
            </p>
          </div>

          {/* የሂሳብ ባለቤት */}
          <div className="bg-gray-50 rounded-xl p-3 xs:p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">የሂሳብ ባለቤት</p>
            <p className="text-sm xs:text-base font-semibold text-gray-800 leading-relaxed">
              {ACCOUNT_NAME}
            </p>
          </div>

          {/* የባለቤቶች መረጃ */}
          <div className="bg-emerald-50 rounded-xl p-3 xs:p-4">
            <p className="text-xs text-emerald-700 mb-1 font-medium">
              የሂሳብ ባለቤቶች
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              {ACCOUNT_OWNERS}
            </p>
          </div>

          {/* የቅዳ ቁልፍ */}
          <button
            onClick={handleCopy}
            className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-base xs:text-lg py-4 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 min-h-[56px]"
          >
            {copied ? (
              <>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                ተቀድቷል!
              </>
            ) : (
              <>
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
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                የሂሳብ ቁጥር ቅዳ
              </>
            )}
          </button>

          {copied && (
            <p
              className="text-center text-emerald-600 font-semibold text-sm"
              role="status"
            >
              ✓ የሂሳብ ቁጥሩ በተሳካ ሁኔታ ተቀድቷል
            </p>
          )}

          {/* ማስታወሻ */}
          <p className="text-xs text-gray-500 text-center leading-relaxed">
            አስተዋጽኦዎን ከላይ በተጠቀሰው የባንክ ሂሳብ ቁጥር ማድረግ ይችላሉ። ስለ አስተዋጽኦዎ ተጨማሪ መረጃ
            ለማግኘት ኮሚቴውን ያግኙ።
          </p>
        </div>
      </div>
    </div>
  );
}
