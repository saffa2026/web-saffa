import { useState } from "react";
import { SAFFA_STANDS } from "../data";
import { MapPin, Phone, HelpCircle, Sparkles, ShieldCheck, Heart, ExternalLink } from "lucide-react";
// @ts-ignore
import imgHalalIndonesia from "./Halal_Indonesia.png";

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
              {/* Halal Certified Badge and Logo Header */}
              <div className="flex items-center gap-2 border-b border-slate-700/80 pb-3">
                <ShieldCheck className="text-emerald-400" size={18} />
                <span className="font-bold text-xs uppercase tracking-wider font-mono text-slate-300">Sertifikasi Halal Resmi</span>
              </div>

              {/* Verified Halal Logo Visual Block (Identical to User's Uploaded Image) */}
              <div className="bg-white text-slate-800 border-2 border-[#5f1b6f] rounded-[24px] p-5 shadow-sm relative overflow-hidden select-none">
                {/* Official Card Double Layout */}
                <div className="flex flex-col sm:flex-row items-center gap-5">
                  {/* Left Column: Official Logo Icon */}
                  <div className="flex flex-col items-center shrink-0">
                    <img 
                      src={imgHalalIndonesia} 
                      alt="Halal Indonesia Logo" 
                      className="w-14 sm:w-16 h-auto object-contain max-h-[88px]"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Vertical Divider line */}
                  <div className="hidden sm:block h-24 w-[1.5px] bg-[#5f1b6f]" />

                  {/* Right Column: Code and Producer Info */}
                  <div className="flex-1 text-left w-full space-y-3 font-sans">
                    <div>
                      <span className="block text-xs font-bold text-[#5f1b6f] font-sans tracking-wide">
                        KODE HALAL
                      </span>
                      <span className="block text-lg sm:text-xl font-extrabold text-[#5f1b6f] font-mono tracking-wider select-all leading-none mt-1">
                        ID21110016119481123
                      </span>
                    </div>

                    {/* Horizontal Divider Line */}
                    <div className="h-[1.5px] bg-[#5f1b6f] w-full" />

                    <div>
                      <span className="block text-[8px] font-bold text-[#5f1b6f] font-sans tracking-widest uppercase opacity-80 mb-0.5">
                        DIPRODUKSI OLEH :
                      </span>
                      <span className="block text-base sm:text-lg font-black text-[#5f1b6f] tracking-tight uppercase leading-none">
                        SAFFA INDO GROUP
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Halal Guarantee Points */}
              <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-700/50 space-y-3">
                <p className="text-xs text-emerald-200/90 font-extrabold flex items-center gap-1.5 uppercase font-mono tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Jaminan Kebersihan & Gizi Saffa:
                </p>
                <ul className="text-[11px] text-slate-300 space-y-2 leading-relaxed font-sans">
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-400 text-xs mt-0.5">✓</span>
                    <span><strong>100% Produk Halal:</strong> Seluruh daging ayam, sapi, dan ikan salmon dari supplier bersertifikat halal resmi MUI.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-400 text-xs mt-0.5">✓</span>
                    <span><strong>Proses Masak Islami:</strong> Diproses secara bersih, suci, dan higienis mengikuti syariat Islam demi keberkahan tiap suap.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-400 text-xs mt-0.5">✓</span>
                    <span><strong>Bahan Segar Berkualitas:</strong> Tanpa tambahan MSG, minyak non-halal, atau bahan pengawet sintetis kimia apa pun.</span>
                  </li>
                </ul>
              </div>

              {/* Quick Stand Consultation WhatsApp button as fallback */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleCallPartnership}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-emerald-950/20"
                >
                  <ShieldCheck size={14} className="text-white" />
                  <span>Cek Keaslian Sertifikat via Kemitraan</span>
                </button>
              </div>
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
