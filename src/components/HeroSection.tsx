import { useState } from "react";
import { Sparkles, Calendar, ChevronRight, CheckCircle2 } from "lucide-react";
import SaffaLogo from "./SaffaLogo";

interface HeroSectionProps {
  onExploreMenu: () => void;
  onConsultAi: () => void;
  onPlanMeal: () => void;
}

export default function HeroSection({ onExploreMenu, onConsultAi, onPlanMeal }: HeroSectionProps) {
  const [imgError, setImgError] = useState(false);
  const heroImgUrl = "/src/assets/images/saffa_hero.png";

  return (
    <div className="relative overflow-hidden bg-[#faf9f6] pb-16 pt-8 sm:pt-12 border-b border-[#f3eee7]">
      
      {/* Delicate organic background blur */}
      <div className="absolute top-[-10%] left-[-5%] w-[450px] h-[450px] rounded-full bg-rose-100/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-[-5%] w-[350px] h-[350px] rounded-full bg-orange-100/20 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Copy Area */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Small badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white text-slate-800 text-[10px] uppercase tracking-wider font-semibold rounded-full border border-slate-200 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e5007d] animate-ping" />
              <span>MPASI Premium • Terakreditasi Halal</span>
            </div>

            {/* Giant Title */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-slate-900 leading-[1.1]">
                Nutrisi Murni untuk <br />
                <span className="text-[#e5007d]">
                  Senyuman Sehat
                </span> <br />
                Buah Hati Anda 🥣
              </h1>
              
              <p className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-xl font-sans font-light">
                Bubur bayi organik segar dari Saffa Tanjungpinang. Dimasak steril setiap subuh dengan standar nutrisi seimbang untuk tumbuh kembang optimal si kecil.
              </p>
            </div>

            {/* Micro Commitments checklist */}
            <div className="grid grid-cols-2 gap-y-3 gap-x-4 max-w-md pt-1">
              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <CheckCircle2 size={15} className="text-slate-800 shrink-0" />
                <span>100% Bahan Organik</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <CheckCircle2 size={15} className="text-slate-800 shrink-0" />
                <span>Tanpa Pengawet & Pewarna</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <CheckCircle2 size={15} className="text-slate-800 shrink-0" />
                <span>Bebas Tambahan MSG</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <CheckCircle2 size={15} className="text-slate-800 shrink-0" />
                <span>Formula Nutrisi Seimbang</span>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
              <button
                onClick={onExploreMenu}
                className="group flex items-center justify-center gap-1.5 px-7 py-3.5 bg-slate-900 text-white rounded-xl text-xs font-bold transition-all hover:scale-102 hover:bg-slate-850 duration-200 cursor-pointer"
              >
                <span>Lihat Menu Sehat</span>
                <ChevronRight size={14} className="group-hover:translate-x-0.5 duration-200" />
              </button>

              <button
                onClick={onConsultAi}
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-slate-200 hover:border-slate-350 text-slate-700 rounded-xl text-xs font-semibold transition-all shadow-xs duration-200 cursor-pointer"
              >
                <span>Tanya Asisten AI Saffa</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              </button>
            </div>

            {/* Fast Features Shortcut Card */}
            <div className="bg-white p-4.5 rounded-2xl border border-slate-150 flex flex-col sm:flex-row items-start sm:items-center gap-4.5 max-w-xl">
              <div className="w-11 h-11 rounded-lg bg-[#e5007d]/5 border border-[#e5007d]/10 flex items-center justify-center shrink-0">
                <Calendar className="text-[#e5007d]" size={18} />
              </div>
              <div className="text-left font-sans">
                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Atur Rencana Makan Mingguan?</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Susun jadwal sarapan sehat si kecil, hitung tarif ongkir otomatis, lalu kirim ke WhatsApp admin kami.</p>
                <button 
                  onClick={onPlanMeal}
                  className="text-[11px] font-bold text-[#e5007d] hover:underline mt-1.5 inline-flex items-center gap-0.5 cursor-pointer"
                >
                  Mulai Rencana Hari Ini &rarr;
                </button>
              </div>
            </div>

          </div>

          {/* Right Area: Generated Illustrative Art */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[400px]">
              
              {/* Cute Badge with brand logo */}
              <div className="absolute -top-6 -right-6 z-10 scale-85 sm:scale-90 shadow-lg">
                <SaffaLogo variant="brand" />
              </div>

              {/* Main Mascot / Illustration Display in compliant img styling */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-150 shadow-sm bg-white z-1 leading-none w-full">
                {!imgError ? (
                  <img
                    src={heroImgUrl}
                    alt="Healthy Baby Porridge Saffa"
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="w-full h-auto aspect-4/3 sm:aspect-1/1 object-cover"
                  />
                ) : (
                  /* Steaming Bowl SVG Fallback when hero image is missing */
                  <div className="relative w-full aspect-1/1 bg-gradient-to-br from-[#faf9f6] via-[#f7f5f0] to-[#f4f2eb] flex flex-col items-center justify-center p-8 text-center min-h-[300px]">
                    {/* Steaming Bowl Graphic */}
                    <svg viewBox="0 0 200 200" className="w-32 h-32 animate-bounce duration-1000">
                      <path d="M75,50 C75,40 85,35 85,25" stroke="#e5007d" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6" />
                      <path d="M100,45 C100,35 110,30 110,20" stroke="#e5007d" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.8" />
                      <path d="M125,50 C125,40 135,35 135,25" stroke="#e5007d" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6" />
                      <path d="M40,110 C40,150 160,150 160,110 Z" fill="#e5007d" />
                      <path d="M42,108 C60,105 140,105 158,108" stroke="#fef08a" strokeWidth="8" strokeLinecap="round" />
                      <path d="M140,80 L165,45 C168,40 178,42 175,48 L148,85" stroke="#fb923c" strokeWidth="6" strokeLinecap="round" fill="none" />
                      <circle cx="85" cy="125" r="4" fill="white" />
                      <circle cx="115" cy="125" r="4" fill="white" />
                    </svg>
                    
                    <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wider mt-4">Higiene Maksimal Bergizi Tinggi 🥣</h5>
                    <p className="text-[11px] text-slate-500 max-w-xs mt-1 font-sans">
                      Diolah murni dari bahan pangan pilihan tanpa kimia saring untuk dukung tumbuh kembang emas buah hati.
                    </p>
                  </div>
                )}
              </div>

              {/* Floating review card */}
              <div className="absolute -bottom-4 -left-4 bg-white px-4 py-3 rounded-xl border border-slate-150 shadow-xs max-w-[190px] z-10 text-xs hidden sm:block font-sans">
                <div className="flex gap-0.5 text-amber-400 mb-1">
                  {"★".repeat(5)}
                </div>
                <p className="text-slate-600 text-[11px] italic">"Kinara makan salmon Saffa lahap sekali!"</p>
                <span className="text-[10px] text-slate-400 block text-right mt-1">— Bunda Kinara</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
