import { useState } from "react";
import { Heart, Sparkles, Phone, MapPin, Clock, Star } from "lucide-react";
// @ts-ignore
import saffaLogoImg from "../assets/images/saffa_logo.png";

export default function Footer() {
  const [imgError, setImgError] = useState(false);

  return (
    <footer className="bg-slate-900 text-slate-300 border-t-8 border-orange-200 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 shrink-0 rounded-2xl bg-white flex items-center justify-center p-1.5 shadow-sm">
                {!imgError ? (
                  <img 
                    src={saffaLogoImg} 
                    alt="Saffa Logo Icon" 
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  /* Custom decorative fallback icon badge with S monogram */
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="45" fill="#fdf2f8" />
                    <path 
                      d="M35 65 C32 60, 32 45, 42 38 C52 32, 65 42, 58 55 C52 65, 40 70, 52 75 C60 78, 70 70, 68 60" 
                      stroke="#e5007d" 
                      strokeWidth="10" 
                      strokeLinecap="round" 
                      fill="none" 
                    />
                    <path 
                      d="M58 35 C68 28, 75 35, 70 42 C62 48, 56 42, 58 35" 
                      fill="#74b71b" 
                    />
                  </svg>
                )}
              </div>
              <div className="leading-none">
                <span className="font-bold text-xl text-white tracking-tight font-sans">Saffa</span>
                <span className="text-[#e5007d] font-bold text-[10px] ml-1.5 bg-pink-950/30 px-2.5 py-0.5 rounded-full border border-pink-900/50">MPASI Masa Kini</span>
                <p className="text-[9px] text-slate-400 mt-1">Saffa Bubur Bayi Tanjungpinang</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Kami menyajikan kebaikan MPASI Masa Kini dengan nutrisi seimbang, selalu segar setiap hari tanpa tambahan pengawet atau MSG. Penuh kasih sayang demi tumbuh kembang sehat optimal.
            </p>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-mono bg-slate-850 p-2.5 rounded-xl border border-slate-800">
              <Star size={14} className="fill-amber-400" />
              <span>Telah Dipercaya oleh 1,200+ Ibu Cerdas di Tanjungpinang</span>
            </div>
          </div>

          {/* Hubungi & Outlet */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white text-base font-sans tracking-wide">Hubungi Kami</h4>
            <ul className="space-y-3.5 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin size={18} className="text-orange-400 shrink-0 mt-0.5" />
                <span>Kota Tanjungpinang, Kepulauan Riau (7 Cabang Stand Aktif).</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={18} className="text-orange-400 shrink-0" />
                <span>Kemitraan: 0813-7222-190</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock size={18} className="text-orange-400 shrink-0" />
                <span>Operasional: 06.00 - 10.00 WIB</span>
              </li>
            </ul>
          </div>

          {/* Jam Pelayanan Kesehatan & Disclaimer */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white text-base font-sans tracking-wide">Pemberitahuan Sehat</h4>
            <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 text-xs text-slate-400 leading-relaxed space-y-2">
              <div className="flex items-center gap-1 font-semibold text-orange-400">
                <Sparkles size={12} />
                <span>Edukasi Gizi</span>
              </div>
              <p>
                Rekomendasi takaran saji dan analisis gizi dari AI Consultant di website Saffa bersifat edukatif berdasarkan standar tumbuh kembang anak secara umum.
              </p>
              <p className="border-t border-slate-700/60 pt-2 text-[11px] italic">
                Selalu konsultasikan kebutuhan medis khusus anak Anda dengan dokter spesialis anak (Sp.A).
              </p>
            </div>
          </div>
        </div>

        {/* copyright */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <p>© 2026 Saffa Bubur Bayi (PT SAFFA INDO GROUP). Hak Cipta Dilindungi.</p>
          <p className="flex items-center gap-1">
            Dibuat penuh kasih sayang untuk tumbuh kembang anak sehat 
            <Heart size={10} className="fill-red-500 text-red-500 animate-pulse" />
          </p>
        </div>
      </div>
    </footer>
  );
}
