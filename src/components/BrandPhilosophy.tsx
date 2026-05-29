import SaffaLogo from "./SaffaLogo";
import { Sparkles, ShieldCheck, Heart, Award, CheckCircle } from "lucide-react";
// @ts-ignore
import imgHalalIndonesia from "./Halal_Indonesia.png";

export default function BrandPhilosophy() {
  return (
    <section id="brand-philosophy" className="py-16 bg-gradient-to-b from-[#faf9f6]/30 to-white border-t border-b border-rose-50/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 text-[#e5007d] text-xs font-bold tracking-wide uppercase">
            <Sparkles size={12} className="animate-pulse" />
            <span>Identitas Resmi & Filosofi Brand</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight font-sans">
            Lebih dari Sekedar Bubur: Cerita Di Balik Logo Saffa
          </h3>
          <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Setiap garis lengkung, pilihan warna, dan detail logo Saffa dirancang penuh makna untuk mencerminkan ketulusan cinta Bunda dan kualitas terbaik MPASI premium kami.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-6">
          
          {/* Left Side: Interative Logo Viewer & Detail */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-6">
            <div className="group relative p-6 bg-white rounded-[2.5rem] border border-rose-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center w-full max-w-[340px]">
              {/* Outer Decorative Rings */}
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/5 to-emerald-500/5 rounded-[2.5rem] -z-10 group-hover:scale-102 transition duration-500" />
              
              <SaffaLogo variant="brand" className="scale-95 group-hover:scale-100 transition-transform duration-300" />
              
              {/* Halal Badge Overlay */}
              <div className="absolute -bottom-3 -right-3 bg-white border-2 border-[#5f1b6f] rounded-2xl px-3 py-2 flex items-center gap-1.5 shadow-md">
                <img 
                  src={imgHalalIndonesia} 
                  alt="Halal Indonesia Seal" 
                  className="w-5 h-6 object-contain"
                  referrerPolicy="no-referrer"
                />
                <div className="text-left leading-none">
                  <span className="block text-[7px] font-mono uppercase text-[#5f1b6f] font-bold">HALAL INDONESIA</span>
                  <span className="text-[9px] font-black text-slate-700">ID21110016119481123</span>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-slate-400 font-mono tracking-wide text-center">
              NMID Standard: ID1022219503367 • SAFFA INDO GROUP
            </p>
          </div>

          {/* Right Side: Philosophy & Branding Highlights */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Visual Philosophy Elements */}
            <div className="bg-[#faf9f6]/40 rounded-3xl p-6 border border-slate-100 space-y-5">
              <h4 className="text-sm font-bold text-slate-800 uppercase tracking-widest font-mono flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#e5007d]" />
                Filosofi Warna & Desain Logo
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Pink Soft */}
                <div className="bg-white p-4 rounded-2xl border border-slate-100 space-y-2">
                  <div className="h-2 w-full rounded-full bg-[#e5007d]" />
                  <h5 className="font-extrabold text-xs text-slate-800">Pink Kasih Sayang</h5>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-sans">
                    Melambangkan kehangatan, kelembutan resep MPASI, dan ketulusan cinta seorang Ibu yang selalu ingin menyuapi anaknya rasa terbaik.
                  </p>
                </div>

                {/* Leaf Green */}
                <div className="bg-white p-4 rounded-2xl border border-slate-100 space-y-2">
                  <div className="h-2 w-full rounded-full bg-[#74b71b]" />
                  <h5 className="font-extrabold text-xs text-slate-800">Daun Hijau Alami</h5>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-sans">
                    Representasi komitmen Saffa menyajikan bahan beras premium pilhan, sayur segar harian, dan jaminan nutrisi murni tanpa tambahan pengawet buatan.
                  </p>
                </div>

                {/* Rounded Typography */}
                <div className="bg-white p-4 rounded-2xl border border-slate-100 space-y-2">
                  <div className="h-2 w-full rounded-full bg-slate-800" />
                  <h5 className="font-extrabold text-xs text-slate-800">Karakter Bulat Ceria</h5>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-sans">
                    Tipografi lembut mencerminkan dunia anak yang ceria, aktif, lincah, dan gembira saat menyambut jam makan yang menyenangkan.
                  </p>
                </div>
              </div>
            </div>

            {/* Core Branded Trust Strengths */}
            <div className="space-y-3">
              {/* Trust 1 */}
              <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-rose-50/50 hover:bg-rose-50/10 transition">
                <div className="p-1.5 rounded-xl bg-rose-50 text-[#e5007d]">
                  <Award size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-800">Pertama & Terpercaya di Tanjungpinang (Sejak 2022)</h4>
                  <p className="text-[10px] sm:text-xs text-slate-500 leading-relaxed font-sans">
                    Saffa hadir merajut standar baru MPASI premium di Kepulauan Riau, menghidangkan asupan nutrisi tepercaya bagi ribuan bayi di wilayah Kepri.
                  </p>
                </div>
              </div>

              {/* Trust 2 */}
              <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-rose-50/50 hover:bg-rose-50/10 transition">
                <div className="p-1.5 rounded-xl bg-emerald-50 text-emerald-600">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-800">Standardisasi Gizi & Halal Resmi</h4>
                  <p className="text-[10px] sm:text-xs text-slate-500 leading-relaxed font-sans">
                    Seluruh proses pengerjaan, dari pemilihan bahan baku hingga pengemasan berlisensi food-grade, menjunjung tinggi kebersihan paripurna serta bersertifikat Halal Resmi Kemenag RI.
                  </p>
                </div>
              </div>

              {/* Trust 3 */}
              <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-rose-50/50 hover:bg-rose-50/10 transition">
                <div className="p-1.5 rounded-xl bg-amber-50 text-amber-600">
                  <Heart size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-800">Branding Peduli Tumbuh Kembang</h4>
                  <p className="text-[10px] sm:text-xs text-slate-500 leading-relaxed font-sans">
                    Visi kami melampaui bubur bayi; kami mendidik kemandirian makan si kecil dengan rujukan jadwal mingguan seimbang serta porsi tumbuh kembang yang mendalam.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
