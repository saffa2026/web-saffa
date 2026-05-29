import { useState } from "react";
import { SAFFA_STANDS } from "../data";
import { MapPin, Phone, HelpCircle, Sparkles, ShieldCheck, Heart, ExternalLink } from "lucide-react";

export default function SaffaStands() {
  const [selectedStand, setSelectedStand] = useState<string | null>(null);

  const getStandDescription = (id: string) => {
    switch(id) {
      case "s1": return "Stand Saffa Batu 8 berlantai bersih di depan Percetakan 86, melayani perumahan di sekitar Jl. Hanjoyo Putro. Hangat siap dijemput setiap pagi subuh.";
      case "s2": return "Stand Saffa Bincen menemani pagi seru Bunda di sekitar area rekreasi Bincen & Kedai Kopi Taman Batu. Pilihan cepat menu bergizi.";
      case "s3": return "Stand Saffa Poltekes sangat digemari warga sekitar kampus Poltekes Tanjungpinang, Jl. Arif Rahman Hakim. Bersih, higienis, dan ramah anak.";
      case "s4": return "Stand Saffa Simpang Kios Djalal melayani warga KM 11 dengan ramah. Jam operasional mulai pukul 06.00 hingga habis.";
      case "s5": return "Stand Saffa Jl. Cinta Damai berlokasi strategis di dekat Simpang 4 Areca Waterpark. Sedia menu hangat bervariasi gizi.";
      case "s6": return "Stand Saffa Kijang Lama bertempat persis di depan Posyandu Bunga Tanjung, memudahkan Bunda mengambil MPASI seusai timbang badan si kecil.";
      case "s7": return "Stand Saffa Ganet melayani pemesanan di sekitar ruko perumahan Ganet dan ruko Market Agung. Pilihan sehat andalan Bunda.";
      default: return "";
    }
  };

  const handleCallWhatsApp = (phone: string, standName: string) => {
    const text = `Halo Admin ${standName}, saya ingin memesan menu MPASI Saffa hari ini. Apakah menu bubur halus / nasi tim hari ini masih lengkap?`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/62${phone.substring(1)}?text=${encoded}`, "_blank");
  };

  const handleCallPartnership = () => {
    const text = `Halo Admin Kemitraan SAFFA, saya tertarik untuk bekerja sama membuka stand kemitraan SAFFA Bubur Bayi (MPASI Premium Sehat & Bergizi) di wilayah saya. Mohon informasi syarat dan ketentuannya, terima kasih!`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/628137222190?text=${encoded}`, "_blank");
  };

  return (
    <section className="py-16 bg-orange-50/10 border-t border-orange-100/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section title */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-[#e5007d] text-xs font-semibold rounded-full border border-rose-100">
            <MapPin size={11} className="text-[#e5007d]" />
            <span>Kunjungi Stand Saffa Terdekat</span>
          </div>
          <h3 className="text-3xl font-bold text-slate-800 tracking-tight font-sans">
            Lokasi Stand Outlet Resmi & Kontak Order
          </h3>
          <p className="text-slate-500 text-xs sm:text-sm">
            Telah dipercaya sejak 2022 sebagai MPASI homemade terbaik pilihan banyak Ayah Bunda di Tanjungpinang & sekitarnya. Kunjungi stand kami untuk menyapa asisten gizi langsung.
          </p>
        </div>

        {/* Master Details layout split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left panel: list of 7 stands */}
          <div className="lg:col-span-7 space-y-3.5">
            <div className="text-left mb-2">
              <span className="font-bold text-xs uppercase tracking-wider font-mono text-slate-400">Dua Langkah Praktis:</span>
              <h4 className="font-bold text-base text-slate-700">Pilih Cabang di Bawah Ini</h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SAFFA_STANDS.map((stand) => {
                const isSelected = selectedStand === stand.id;
                return (
                  <div
                    key={stand.id}
                    onClick={() => setSelectedStand(stand.id)}
                    className={`p-4 bg-white border rounded-2xl cursor-pointer text-left transition duration-200 hover:shadow-xs flex flex-col justify-between space-y-3 ${
                      isSelected
                        ? "border-[#e5007d] ring-1 ring-[#e5007d]/25 bg-rose-50/10"
                        : "border-slate-150 hover:border-orange-200"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-start justify-between gap-1">
                        <span className="font-bold text-slate-800 text-sm leading-tight">
                          {stand.name}
                        </span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" title="Buka" />
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2">
                        📍 {stand.location}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-50">
                      <span className="text-[10px] font-mono text-slate-400">
                        WA: {stand.phone}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCallWhatsApp(stand.phone, stand.name);
                        }}
                        className="px-2.5 py-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition flex items-center gap-1 cursor-pointer"
                      >
                        <Phone size={10} className="fill-emerald-700" />
                        <span>Hubungi</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right panel: Active Info Box / Map simulation */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 p-6 sm:p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden shadow-xs">
            <div className="absolute top-0 right-0 w-36 h-36 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-5 text-left z-1">
              {(() => {
                const active = SAFFA_STANDS.find(s => s.id === (selectedStand || "s1"));
                if (!active) return null;

                return (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 border-b border-slate-700/80 pb-3">
                      <MapPin className="text-[#e5007d]" size={18} />
                      <span className="font-bold text-xs uppercase tracking-wider font-mono text-slate-300">Detail Layanan Cabang</span>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-bold text-lg text-white leading-tight">
                        {active.name}
                      </h4>
                      <p className="text-xs text-slate-300 bg-slate-800 rounded-xl p-3 border border-slate-750/50 leading-relaxed">
                        <strong>📍 Alamat Stand:</strong> {active.location}
                      </p>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {getStandDescription(active.id)}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block font-mono">Status & Menu Ready</span>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-md text-[10px] font-semibold">
                          ✓ Halal BPJPH
                        </span>
                        <span className="px-2 py-0.5 bg-orange-500/10 text-orange-400 border border-orange-500/30 rounded-md text-[10px] font-semibold">
                          ✓ Tanpa Pengawet
                        </span>
                        <span className="px-2 py-0.5 bg-pink-500/10 text-pink-400 border border-pink-500/30 rounded-md text-[10px] font-semibold">
                          ✓ Bebas MSG
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-2.5">
                      <button
                        onClick={() => handleCallWhatsApp(active.phone, active.name)}
                        className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-emerald-950/20"
                      >
                        <Phone size={13} fill="white" />
                        <span>Pesan via WA Stand Terdekat</span>
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Franchise Partnership Promotion Banner */}
            <div className="mt-8 pt-5 border-t border-slate-800/80 text-left space-y-3 z-1">
              <div className="flex items-center gap-1 text-xs font-bold text-pink-400 uppercase tracking-wider font-mono">
                <Sparkles size={12} fill="currentColor" />
                <span>Kemitraan SAFFA (Franchise)</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Tertarik ikut berkontribusi mencerdaskan gizi balita di kota Anda? Gabung menjadi mitra Saffa semenjak 2022 membina UMKM sukses mandiri.
              </p>
              <button
                type="button"
                onClick={handleCallPartnership}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-755 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold cursor-pointer transition flex items-center justify-center gap-1.5"
              >
                <span>Hubungi Admin Kemitraan (08137222190)</span>
                <ExternalLink size={12} className="text-slate-400" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
