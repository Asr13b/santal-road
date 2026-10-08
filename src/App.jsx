import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import MobileNav from "./components/MobileNav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Villages from "./pages/Villages";
import VillageDetail from "./pages/VillageDetail";
import Committee from "./pages/Committee";
import Finance from "./pages/Finance";
import Gallery from "./pages/Gallery";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 pb-16 md:pb-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/villages" element={<Villages />} />
          <Route path="/villages/:id" element={<VillageDetail />} />
          <Route path="/committee" element={<Committee />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
}
