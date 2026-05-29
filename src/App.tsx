import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import MenuCatalog from "./components/MenuCatalog";
import PortionPlanner from "./components/PortionPlanner";
import AiConsultant from "./components/AiConsultant";
import WeeklyMealPlanner from "./components/WeeklyMealPlanner";
import FAQAndReviews from "./components/FAQAndReviews";
import SaffaStands from "./components/SaffaStands";
import { Sparkles, Heart } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("hero");
  const [lastSelectedMenuId, setLastSelectedMenuId] = useState<string | null>(null);

  // Bridging: when mother taps "Atur Jadwal" in the catalog
  const handleAddToPlanner = (menuItemId: string) => {
    setLastSelectedMenuId(menuItemId);
    setActiveTab("planner"); // Redirect tab to the weekly meal scheduler
  };

  const handleClearLastSelectedMenu = () => {
    setLastSelectedMenuId(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/20 text-slate-700 antialiased font-sans">
      
      {/* Promotion Announcement Ticker */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center py-2 px-4 shadow-sm z-50">
        <p className="text-xs font-semibold tracking-wide flex items-center justify-center gap-1.5 font-sans">
          <Sparkles size={12} className="animate-pulse" />
          <span>Setiap pembelian Paket Mingguan (14 Porsi) hemat hingga Rp 15.000 + Gratis Ongkir wilayah Tanjungpinang Kota! 🛵</span>
        </p>
      </div>

      {/* Main Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Dynamic Main Body Content Router */}
      <main className="flex-1">
        
        {activeTab === "hero" && (
          <div className="animate-fade-in animate-duration-300">
            {/* Landing Banner */}
            <HeroSection
              onExploreMenu={() => setActiveTab("menu")}
              onConsultAi={() => setActiveTab("bot")}
              onPlanMeal={() => setActiveTab("planner")}
            />
            
            {/* Highlight Section: Why Saffa? */}
            <div className="py-16 bg-white border-t border-slate-100 text-center select-none">
              <div className="max-w-6xl mx-auto px-4 sm:px-6">
                
                <div className="max-w-2xl mx-auto text-center space-y-2 mb-12">
                  <h3 className="text-xl font-bold uppercase tracking-wider text-slate-900 font-sans">Mengapa Saffa Bubur Bayi?</h3>
                  <p className="text-slate-400 text-xs">Jaminan kemurnian subuh demi asupan gizi emas buah hati tercinta.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  
                  <div className="p-6 bg-[#faf9f6]/40 rounded-xl border border-slate-150 space-y-3 text-left">
                    <span className="text-3xl block">🌾</span>
                    <h5 className="font-bold text-slate-800 text-sm uppercase tracking-wide">100% Organik</h5>
                    <p className="text-xs text-slate-500 leading-relaxed">Memakai beras merah, putih, kacang, dan sayur segar langsung dari perkebunan organik bersertifikat.</p>
                  </div>

                  <div className="p-6 bg-[#faf9f6]/40 rounded-xl border border-slate-150 space-y-3 text-left">
                    <span className="text-3xl block">🥩</span>
                    <h5 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Protein Murni</h5>
                    <p className="text-xs text-slate-500 leading-relaxed">Hanya ayam kampung asli, daging tenderloin dan salmon segar tanpa campuran sisa kaldu.</p>
                  </div>

                  <div className="p-6 bg-[#faf9f6]/40 rounded-xl border border-slate-150 space-y-3 text-left">
                    <span className="text-3xl block">🙅‍♀️</span>
                    <h5 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Tanpa Pengawet</h5>
                    <p className="text-xs text-slate-500 leading-relaxed">Bebas MSG dan kimia pengawet. Saffa selalu dimasak subuh segar untuk diantar hangat pagi hari.</p>
                  </div>

                  <div className="p-6 bg-[#faf9f6]/40 rounded-xl border border-slate-150 space-y-3 text-left">
                    <span className="text-3xl block">🧪</span>
                    <h5 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Gizi Seimbang</h5>
                    <p className="text-xs text-slate-500 leading-relaxed">Rasio seimbang Karbohidrat, Protein, Lemak Tambahan & Mikronutrisi standardisasi WHO.</p>
                  </div>

                </div>

              </div>
            </div>

            {/* Real Outlet Stands and WhatsApp contacts */}
            <SaffaStands />

            {/* Testimonials and Accordion FAQs */}
            <FAQAndReviews />
          </div>
        )}

        {/* Tab Routers */}
        {activeTab === "menu" && (
          <div className="animate-fade-in animate-duration-300">
            <MenuCatalog onAddToPlanner={handleAddToPlanner} />
          </div>
        )}

        {activeTab === "portion" && (
          <div className="animate-fade-in animate-duration-300">
            <PortionPlanner />
          </div>
        )}

        {activeTab === "planner" && (
          <div className="animate-fade-in animate-duration-300">
            <WeeklyMealPlanner
              lastSelectedMenuId={lastSelectedMenuId}
              clearLastSelectedMenuId={handleClearLastSelectedMenu}
            />
          </div>
        )}

        {activeTab === "bot" && (
          <div className="animate-fade-in animate-duration-300">
            <AiConsultant />
          </div>
        )}

      </main>

      {/* Main Footer */}
      <Footer />

    </div>
  );
}
