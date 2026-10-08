import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container-app py-16 text-center">
      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
        <span className="text-3xl font-bold text-amber-600">404</span>
      </div>
      <h1 className="text-xl font-bold text-gray-900 mb-2">ገጹ አልተገኘም</h1>
      <p className="text-gray-500 mb-6">የፈለጉት ገጽ አልተገኘም።</p>
      <Link
        to="/"
        className="inline-block px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl min-h-[48px]"
      >
        ወደ መነሻ ተመለስ
      </Link>
    </div>
  );
}
