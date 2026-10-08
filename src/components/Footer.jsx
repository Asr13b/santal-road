import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-emerald-900 text-white mt-10 pb-20 md:pb-8">
      <div className="container-app py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <h3 className="text-lg font-bold text-amber-300 mb-3">
            ሳንታል የመንገድ ልማት
          </h3>
          <p className="text-sm text-emerald-100 leading-relaxed">
            የሳንታል ማህበረሰብ የመንገድ ልማት ፕሮጀክት በሁሉም የማህበረሰቡ አባላት ተሳትፎ የሚከናወን የህብረት ስራ
            ነው።
          </p>
        </div>
        <div>
          <h4 className="text-base font-bold text-amber-300 mb-3">ገጾች</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/news" className="hover:text-amber-300">
                ዜና
              </Link>
            </li>
            <li>
              <Link to="/villages" className="hover:text-amber-300">
                መንደሮች
              </Link>
            </li>
            <li>
              <Link to="/committee" className="hover:text-amber-300">
                ኮሚቴ
              </Link>
            </li>
            <li>
              <Link to="/finance" className="hover:text-amber-300">
                ፋይናንስ
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="hover:text-amber-300">
                ፎቶዎች
              </Link>
            </li>
            <li>
              <Link to="/reports" className="hover:text-amber-300">
                ሪፖርቶች
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-base font-bold text-amber-300 mb-3">
            የአስተዋጽኦ መረጃ
          </h4>
          <div className="bg-emerald-800 rounded-xl p-4">
            <p className="text-xs text-emerald-200 mb-1">የሂሳብ ቁጥር</p>
            <p className="text-lg font-bold font-mono tracking-wider">
              1000696007725
            </p>
            <p className="text-xs text-emerald-200 mt-2">አዲስ አበባ የንግድ ባንክ</p>
          </div>
        </div>
      </div>
      <div className="border-t border-emerald-800">
        <div className="container-app py-4 text-center text-xs text-emerald-200">
          © {new Date().getFullYear()} ሳንታል የመንገድ ልማት ኮሚቴ — መብቱ በህግ የተጠበቀ ነው
        </div>
      </div>
    </footer>
  );
}
