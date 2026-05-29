import { useState } from "react";
import { Scale, Sparkles, AlertCircle, RefreshCw, Layers, Check } from "lucide-react";

export default function PortionPlanner() {
  const [babyAge, setBabyAge] = useState<number>(7); // in months
  const [babyWeight, setBabyWeight] = useState<number>(7.5); // in kg

  // Dynamic calculations based on pediatric standards
  const getPortionSpecs = () => {
    if (babyAge >= 6 && babyAge <= 7) {
      return {
        portionSize: "2 - 3 sendok makan (sdm) penuh atau sekitar 30 - 50 ml",
        frequency: "2 kali makanan utama + 1 kali ASI/snack puree buah",
        calories: "~150 - 200 kkal dari MPASI",
        consistency: "Puree kental halus disaring dingin, jatuh perlahan dari sendok",
        tips: "Fokus awal adalah pengenalan rasa dan pembiasaan menelan tanpa kaget."
      };
    } else if (babyAge >= 8 && babyAge <= 9) {
      return {
        portionSize: "setengah mangkuk ukuran 250 ml (atau sekitar 125 ml)",
        frequency: "3 kali makanan utama + 1-2 porsi ASI/camilan selingan",
        calories: "~200 - 300 kkal dari MPASI",
        consistency: "Bubur tim saring kasar, dicincang halus (tidak terlalu berair)",
        tips: "Mulai latih si kecil memegang sendoknya sendiri dan mendudukkannya tegak."
      };
    } else if (babyAge >= 10 && babyAge <= 11) {
      return {
        portionSize: "setengah hingga tiga perempat mangkuk ukuran 250 ml (125-180 ml)",
        frequency: "3 kali makanan utama + 2 kali camilan sehat",
        calories: "~300 kkal dari MPASI",
        consistency: "Nasi tim cincang kasar, sayur lembut kecil seukuran gigitan jari (finger-food)",
        tips: "Berikan potongan buah lunak seperti pepaya atau alpukat sebagai sanksi kunyah."
      };
    } else {
      // 12 months and above
      return {
        portionSize: "tiga perempat hingga satu mangkuk penuh ukuran 250 ml (180-250 ml)",
        frequency: "3-4 kali makanan berat + 2 kali camilan pendukung",
        calories: "~500 - 700 kkal dari MPASI",
        consistency: "Makanan keluarga yang dihaluskan kasar atau nasi lembek berkuah kaldu",
        tips: "Si kecil siap mengikuti jam makan yang sama dengan seluruh anggota keluarga."
      };
    }
  };

  const specs = getPortionSpecs();

  // Reference weights based on age
  const getReferenceWeight = () => {
    if (babyAge <= 7) return "Ideal: 6.0 - 8.5 kg";
    if (babyAge <= 9) return "Ideal: 7.0 - 9.8 kg";
    if (babyAge <= 11) return "Ideal: 7.8 - 10.5 kg";
    return "Ideal: 8.9 - 13.0 kg";
  };

  const resetCalculator = () => {
    setBabyAge(7);
    setBabyWeight(7.5);
  };

  return (
    <section className="py-12 bg-white border-y border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#e5007d]/5 text-[#e5007d] text-[10px] font-bold tracking-widest uppercase rounded-full border border-[#e5007d]/10">
            <Scale size={11} className="text-[#e5007d]" />
            <span>Kalkulator Takaran Gizi</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight font-sans">
            Ukuran Porsi Ideal Si Kecil
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm">
            Tentukan usia dan kembangkan berat badan si kecil untuk mengukur takaran kalori, komposisi nutrisi, serta tekstur MPASI harian terbaiknya.
          </p>
        </div>

        {/* Calculator layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left panel: sliders */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-6">
            
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="font-bold text-xs uppercase tracking-wide text-slate-800 font-sans">Karakteristik Tumbuh Kembang</span>
                <button 
                  onClick={resetCalculator}
                  className="text-xs text-[#e5007d] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw size={12} />
                  <span>Reset</span>
                </button>
              </div>

              {/* Age Slider Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-650 font-semibold uppercase tracking-wider font-mono">Usia Bayi Sekarang:</span>
                  <span className="font-bold text-[#e5007d] text-base">{babyAge} Bulan</span>
                </div>
                
                <input
                  type="range"
                  min="6"
                  max="24"
                  step="1"
                  value={babyAge}
                  onChange={(e) => setBabyAge(Number(e.target.value))}
                  className="w-full accent-[#e5007d] h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                />
                
                <div className="flex justify-between text-[9px] text-slate-400 font-mono">
                  <span>6 bulan (Awal)</span>
                  <span>12 bulan (Balita)</span>
                  <span>24 bulan</span>
                </div>
              </div>

              {/* Weight Slider Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-650 font-semibold uppercase tracking-wider font-mono">Berat Badan Bayi:</span>
                  <div className="flex items-baseline gap-0.5">
                    <span className="font-bold text-[#e5007d] text-base">{babyWeight.toFixed(1)}</span>
                    <span className="text-[10px] text-slate-400 font-mono">Kg</span>
                  </div>
                </div>

                <input
                  type="range"
                  min="4"
                  max="18"
                  step="0.1"
                  value={babyWeight}
                  onChange={(e) => setBabyWeight(Number(e.target.value))}
                  className="w-full accent-[#e5007d] h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                />

                <div className="flex justify-between text-[9px] text-slate-400 font-mono">
                  <span>4 kg</span>
                  <span className="text-slate-500 bg-slate-50 px-2.5 py-0.5 rounded-md border border-slate-200">
                    {getReferenceWeight()}
                  </span>
                  <span>18 kg</span>
                </div>
              </div>
            </div>

            {/* Safety advise flag */}
            <div className="bg-amber-500/[0.03] p-4 rounded-xl border border-amber-500/10 text-xs text-slate-600 flex items-start gap-2 leading-relaxed">
              <AlertCircle size={15} className="text-amber-500 shrink-0 mt-0.5" />
              <span>
                <strong>Saran Gizi:</strong> Selalu periksa tanda lapar bayi seperti mulut terbuka saat didekatkan sendok dan aktif meraih makanan. Jangan paksa bayi menghabiskan jika ia menolak.
              </span>
            </div>

          </div>

          {/* Right panel: dynamic pediatric specs output */}
          <div className="lg:col-span-7 bg-[#faf9f6]/90 text-slate-800 p-6 rounded-2xl border border-slate-200 relative overflow-hidden flex flex-col justify-between shadow-xs">
            
            <div className="space-y-5">
              
              <div className="flex items-center gap-2 border-b border-slate-200/60 pb-3">
                <Layers className="text-[#e5007d]" size={15} />
                <span className="font-bold text-[10px] text-slate-600 font-mono uppercase tracking-widest">Takaran Saji & Pola Makan Ideal</span>
              </div>

              {/* Specs Item Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
                
                <div className="space-y-1">
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider font-mono">1. Ukuran Porsi Sekali Makan</p>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-normal">
                    {specs.portionSize}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider font-mono">2. Frekuensi Per Hari</p>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-normal">
                    {specs.frequency}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider font-mono">3. Konsistensi / Tekstur MPASI</p>
                  <div className="inline-block mt-1 px-2.5 py-1 bg-[#e5007d]/5 text-[#e5007d] border border-[#e5007d]/10 rounded-lg text-xs font-bold">
                    {specs.consistency}
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider font-mono">4. Estimasi Energi MPASI</p>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-normal">
                    {specs.calories}
                  </p>
                </div>

              </div>

              {/* Medical advices */}
              <div className="border-t border-slate-250/60 pt-4 space-y-1 text-left">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#e5007d]">
                  <Sparkles size={11} />
                  <span>Tips Pendukung Refleks Makan Usia Ini:</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  {specs.tips}
                </p>
              </div>

            </div>

            {/* Small reassurance tag matching corporate colors */}
            <div className="border-t border-slate-200 pt-3.5 mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between text-[10px] text-slate-400 gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e5007d] shrink-0" />
                <span>Rekomendasi takaran medis BPOM & WHO</span>
              </div>
              <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest">Saffa Tanjungpinang</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
