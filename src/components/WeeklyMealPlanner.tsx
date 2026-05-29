import { useState, useEffect } from "react";
import { MENU_ITEMS, SAFFA_STANDS, imgQrisPayment } from "../data";
import { MealSlot } from "../types";
import { Calendar, Heart, Copy, Share2, Smartphone, Trash2, MapPin, Clock, Sparkles, Package, BadgePercent, QrCode } from "lucide-react";

interface WeeklyMealPlannerProps {
  lastSelectedMenuId: string | null;
  clearLastSelectedMenuId: () => void;
}

const DAYS = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"] as const;
const TIMES = ["Pagi"] as const;

// Mathematically correct CRC16-CCITT algorithm for EMVCo/QRIS compliance
function calculateCRC16(str: string): string {
  let crc = 0xFFFF;
  for (let c = 0; c < str.length; c++) {
    const code = str.charCodeAt(c);
    crc ^= (code << 8);
    for (let i = 0; i < 8; i++) {
      if ((crc & 0x8000) !== 0) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc = crc << 1;
      }
    }
  }
  crc = crc & 0xFFFF;
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

// Generate valid, scanable QRIS payload with optional amount
function generateQrisPayload(amount?: number): string {
  let tag54 = "";
  if (amount && amount > 0) {
    const amountStr = Math.round(amount).toString();
    tag54 = "54" + amountStr.length.toString().padStart(2, "0") + amountStr;
  }

  const base = "000201010211" +
               "26640015ID.CO.QRIS.WWW01159360000900000010215ID10222195033670303UMI" +
               "51450015ID.CO.QRIS.WWW0215ID10222195033670303UMI" +
               "52045812" +
               "5303360" +
               tag54 +
               "5802ID" +
               "5916SAFFA BUBUR BAYI" +
               "6013TANJUNGPINANG" +
               "610529124" +
               "6304";

  return base + calculateCRC16(base);
}

export default function WeeklyMealPlanner({ lastSelectedMenuId, clearLastSelectedMenuId }: WeeklyMealPlannerProps) {
  // Navigation tab for planner mode: Custom Setup vs Subscription Package
  const [activeTab, setActiveTab] = useState<"custom" | "package">("custom");

  // Subscription configuration states
  const [pkgDuration, setPkgDuration] = useState<"weekly" | "monthly">("weekly");
  const [pkgType, setPkgType] = useState<"halus" | "tim">("halus");

  // Pre-initialize empty schedule slots
  const [schedule, setSchedule] = useState<MealSlot[]>(() => {
    const initial: MealSlot[] = [];
    DAYS.forEach(day => {
      TIMES.forEach(time => {
        initial.push({ day, time, menuItemId: "", cups: 1 });
      });
    });
    return initial;
  });

  const [motherName, setMotherName] = useState("");
  const [babyName, setBabyName] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryPref, setDeliveryPref] = useState("Pagi Saja (06.00 - 10.00)");
  const [selectedStandId, setSelectedStandId] = useState("s1");
  const [copySuccess, setCopySuccess] = useState(false);
  const [showQris, setShowQris] = useState(false);
  const [qrisView, setQrisView] = useState<"dynamic" | "static" | "banner">("dynamic");

  // States for delivery fee estimation (Maxim/Gojek-based)
  const [deliveryDistance, setDeliveryDistance] = useState<number>(3); // default to 3 KM
  const [deliveryService, setDeliveryService] = useState<"motor" | "mobil">("motor");
  const [includeOngkirInWA, setIncludeOngkirInWA] = useState<boolean>(true);

  // If a menu item is added from the catalog via hook
  useEffect(() => {
    if (lastSelectedMenuId) {
      // Find first empty slot and fill it
      const emptySlotIndex = schedule.findIndex(slot => slot.menuItemId === "");
      if (emptySlotIndex !== -1) {
        const updated = [...schedule];
        updated[emptySlotIndex] = { ...updated[emptySlotIndex], menuItemId: lastSelectedMenuId, cups: 1 };
        setSchedule(updated);
      } else {
        // Overwrite first morning slot if all filled
        const updated = [...schedule];
        updated[0] = { ...updated[0], menuItemId: lastSelectedMenuId, cups: 1 };
        setSchedule(updated);
      }
      clearLastSelectedMenuId();
    }
  }, [lastSelectedMenuId, schedule, clearLastSelectedMenuId]);

  // Handle dropdown value changes
  const handleSlotChange = (day: string, time: string, menuItemId: string) => {
    const updated = schedule.map(slot => {
      if (slot.day === day && slot.time === time) {
        return { ...slot, menuItemId, cups: menuItemId ? (slot.cups || 1) : 1 };
      }
      return slot;
    });
    setSchedule(updated);
  };

  // Handle cup quantity changes
  const handleCupsChange = (day: string, time: string, cups: number) => {
    const updated = schedule.map(slot => {
      if (slot.day === day && slot.time === time) {
        return { ...slot, cups: Math.max(1, cups) };
      }
      return slot;
    });
    setSchedule(updated);
  };

  // Clear slot
  const handleClearSlot = (day: string, time: string) => {
    const updated = schedule.map(slot => {
      if (slot.day === day && slot.time === time) {
        return { ...slot, menuItemId: "", cups: 1 };
      }
      return slot;
    });
    setSchedule(updated);
  };

  // Reset entire weekly schedule
  const handleClearAll = () => {
    const cleared = schedule.map(slot => ({ ...slot, menuItemId: "", cups: 1 }));
    setSchedule(cleared);
  };

  // Fill typical schedule for busy moms!
  const handleAutoFill = () => {
    // Fill rotation of popular items
    const fillerIds = ["m1", "m2", "m3"];
    const filled = schedule.map((slot, index) => ({
      ...slot,
      menuItemId: fillerIds[index % fillerIds.length],
      cups: 1
    }));
    setSchedule(filled);
  };

  // Sum up prices & meal count for custom planner
  const scheduledMeals = schedule.filter(slot => slot.menuItemId !== "");

  const totalCupsCustom = scheduledMeals.reduce((sum, slot) => sum + (slot.cups || 1), 0);

  const totalCost = scheduledMeals.reduce((sum, slot) => {
    const item = MENU_ITEMS.find(m => m.id === slot.menuItemId);
    const itemPrice = item ? item.price : 0;
    return sum + itemPrice * (slot.cups || 1);
  }, 0);

  // Subscription calculation helper based on selected parameters
  const getPackageDetails = () => {
    const isWeekly = pkgDuration === "weekly";
    const days = isWeekly ? 7 : 30;
    const cupsPerDay = 1;
    const totalCups = days * cupsPerDay;
    
    // Custom friendly package rates
    let rawPrice = 0;
    let promoPrice = 0;
    
    if (pkgType === "halus") {
      rawPrice = totalCups * 7000;
      if (isWeekly) {
        promoPrice = 45000;
      } else {
        promoPrice = 185000;
      }
    } else {
      rawPrice = totalCups * 9000;
      if (isWeekly) {
        promoPrice = 58000;
      } else {
        promoPrice = 240000;
      }
    }

    return {
      days,
      cupsPerDay,
      totalCups,
      rawPrice,
      promoPrice,
      savings: rawPrice - promoPrice
    };
  };

  const pkg = getPackageDetails();

  // Dynamic values that update depending on the selected tab
  const displayCupsCount = activeTab === "package" ? pkg.totalCups : totalCupsCustom;
  const displayTotalCost = activeTab === "package" ? pkg.promoPrice : totalCost;

  // Approximate fares for Maxim and Gojek in Tanjungpinang
  // Maxim Motor: base fare 0-2km: Rp 8.000, subsequent KM: Rp 2.500
  // Gojek Motor: base fare 0-2km: Rp 12.000, subsequent KM: Rp 3.500
  // Maxim Car: base fare 0-2km: Rp 14.000, subsequent KM: Rp 4.500
  // Gojek Car: base fare 0-2km: Rp 18.000, subsequent KM: Rp 5.500
  const estMaximMotor = Math.max(8000, 8000 + Math.round(Math.max(0, deliveryDistance - 2) * 2500 / 1000) * 1000);
  const estGojekGoRide = Math.max(12000, 12000 + Math.round(Math.max(0, deliveryDistance - 2) * 3500 / 1000) * 1000);
  const estMaximMobil = Math.max(14000, 14000 + Math.round(Math.max(0, deliveryDistance - 2) * 4500 / 1000) * 1000);
  const estGojekGoCar = Math.max(18000, 18000 + Math.round(Math.max(0, deliveryDistance - 2) * 5500 / 1000) * 1000);

  // Formulate WhatsApp order template string
  const generateOrderText = () => {
    if (activeTab === "package") {
      const durationLabel = pkgDuration === "weekly" ? "MINGGUAN (7 Hari)" : "BULANAN (30 Hari)";
      const typeLabel = pkgType === "halus" ? "Bubur Halus Saring (6+ Bln)" : "Nasi Tim Kasar (8+ Bln)";
      const scheduleLabel = "Pagi Saja (1 cup / hari)";
      
      let text = `*FORM PENDAFTARAN BERLANGGANAN SAPFA*\n`;
      text += `_MPASI Premium Sehat & Bergizi - Resmi BPJPH sejak 2022_\n\n`;
      text += `Nama Bunda: ${motherName || "-"}\n`;
      text += `Nama Si Kecil: ${babyName || "-"}\n`;
      text += `Alamat Pengantaran: ${address || "-"}\n`;
      text += `Tujuan Cabang Stand: ${SAFFA_STANDS.find(s => s.id === selectedStandId)?.name || "-"}\n\n`;
      text += `*DETAIL PAKET BERLANGGANAN:*\n`;
      text += `• Durasi Berlangganan: *${durationLabel}*\n`;
      text += `• Pilihan Jenis MPASI: *${typeLabel}*\n`;
      text += `• Pola Jam Pengantaran: *${scheduleLabel}*\n`;
      text += `• Total Porsi MPASI: *${pkg.totalCups} Cup*\n\n`;
      text += `*ESTIMASI HARGA PROMO:* *Rp ${pkg.promoPrice.toLocaleString("id-ID")}*\n`;
      text += `_(Normal: Rp ${pkg.rawPrice.toLocaleString("id-ID")}, Hemat Rp ${pkg.savings.toLocaleString("id-ID")}!)_\n\n`;

      if (includeOngkirInWA) {
        text += `*ESTIMASI ONGKOS KIRIM (${deliveryDistance} KM):*\n`;
        if (deliveryService === "motor") {
          text += `• Maxim Motor: ~Rp ${estMaximMotor.toLocaleString("id-ID")}\n`;
          text += `• Gojek GoRide: ~Rp ${estGojekGoRide.toLocaleString("id-ID")}\n\n`;
        } else {
          text += `• Maxim Mobil: ~Rp ${estMaximMobil.toLocaleString("id-ID")}\n`;
          text += `• Gojek GoCar: ~Rp ${estGojekGoCar.toLocaleString("id-ID")}\n\n`;
        }
      }

      text += `_Mohon bantuannya dikonfirmasi rute kurir Saffa untuk daerah saya ya Admin, terima kasih!_ 👶💕🥣`;
      return text;
    } else {
      let text = `*FORM PEMESANAN SAFFA BUBUR BAYI*\n`;
      text += `Nama Bunda: ${motherName || "-"}\n`;
      text += `Nama Si Kecil: ${babyName || "-"}\n`;
      text += `Alamat Pengiriman: ${address || "-"}\n`;
      text += `Metode Antar: ${deliveryPref}\n\n`;
      text += `Pola Jam Antar Pesanan Harian: *Hanya Pagi Saja (06.00 - 10.00 WIB)*\n\n`;
      text += `*JADWAL MAKAN MINGGUAN:*\n`;

      DAYS.forEach(day => {
        const morningSlot = schedule.find(s => s.day === day && s.time === "Pagi");
        const morningMenu = morningSlot?.menuItemId ? MENU_ITEMS.find(m => m.id === morningSlot.menuItemId)?.name : null;

        if (morningMenu) {
          text += `• *${day}*:\n`;
          text += `  - ☀️ Pagi: ${morningMenu} (${morningSlot?.cups || 1} Cup)\n`;
        }
      });

      text += `\n*TOTAL TIPE PORSI:* ${totalCupsCustom} Cup\n`;
      text += `*ESTIMASI HARGA:* Rp ${totalCost.toLocaleString("id-ID")}\n\n`;

      if (includeOngkirInWA) {
        text += `*ESTIMASI ONGKOS KIRIM (${deliveryDistance} KM):*\n`;
        if (deliveryService === "motor") {
          text += `• Maxim Motor: ~Rp ${estMaximMotor.toLocaleString("id-ID")}\n`;
          text += `• Gojek GoRide: ~Rp ${estGojekGoRide.toLocaleString("id-ID")}\n\n`;
        } else {
          text += `• Maxim Mobil: ~Rp ${estMaximMobil.toLocaleString("id-ID")}\n`;
          text += `• Gojek GoCar: ~Rp ${estGojekGoCar.toLocaleString("id-ID")}\n\n`;
        }
      }

      text += `_Mohon kesediaannya dikonfirmasi ketersediaan rute kurir Saffa untuk daerah saya ya Admin, terima kasih!_ 👶🥣`;
      return text;
    }
  };

  const handleCopyToClipboard = () => {
    const text = generateOrderText();
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  const handleSendToWhatsApp = () => {
    const text = generateOrderText();
    const encoded = encodeURIComponent(text);
    const stand = SAFFA_STANDS.find(s => s.id === selectedStandId) || SAFFA_STANDS[0];
    const rawPhone = stand.phone;
    const formattedPhone = rawPhone.startsWith("0") ? `62${rawPhone.substring(1)}` : rawPhone;
    window.open(`https://wa.me/${formattedPhone}?text=${encoded}`, "_blank");
  };

  return (
    <section className="py-12 bg-slate-50 border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full border border-orange-200">
            <Calendar size={11} className="text-orange-500" />
            <span>Pilihan Pemesanan Praktis</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight font-sans">
            Rencana MPASI & Paket Berlangganan
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm">
            Tersedia pilihan <strong>Atur Menu Harian</strong> pagi, serta <strong>Paket Berlangganan Hemat</strong> Mingguan dan Bulanan untuk asupan nutrisi si kecil secara kontinu.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Area: Dynamic component switcher (Grid selection list OR subscription config) */}
          <div className="lg:col-span-8 bg-white p-5 sm:p-6 rounded-3xl border border-slate-150/60 shadow-xs space-y-5">
            
            {/* Interactive Tab Switcher */}
            <div className="flex border-b border-slate-100 p-1 bg-slate-100/70 rounded-2xl">
              <button
                type="button"
                onClick={() => setActiveTab("custom")}
                className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === "custom"
                    ? "bg-white text-orange-600 shadow-xs border border-orange-150/10"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/50"
                }`}
              >
                <Calendar size={14} />
                <span>Atur Menu Harian (Beli Satuan)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("package")}
                className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === "package"
                    ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-md"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/50"
                }`}
              >
                <Package size={14} />
                <span className="flex items-center gap-1.5">
                  Paket Langganan Hemat
                  <span className="bg-white/20 text-[9px] px-1.5 py-0.5 rounded-full text-white font-mono animate-pulse">Hemat 13%</span>
                </span>
              </button>
            </div>

            {activeTab === "package" ? (
              <div className="space-y-6 pt-2">
                
                {/* 1. Subscription Duration */}
                <div className="space-y-2.5 text-left">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <Clock size={13} className="text-orange-500" />
                    1. Pilih Durasi Langganan
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPkgDuration("weekly")}
                      className={`p-4 rounded-2xl border text-left cursor-pointer transition flex flex-col justify-between h-24 ${
                        pkgDuration === "weekly"
                          ? "border-orange-550 border-orange-400 bg-orange-50/15 ring-1 ring-orange-500/20"
                          : "border-slate-150 hover:border-slate-200"
                      }`}
                    >
                      <span className="font-bold text-slate-800 text-sm">Paket Mingguan (7 Hari)</span>
                      <span className="text-[10px] text-slate-400 leading-tight">Sempurna untuk uji coba rute kurir dan kecocokan rasa si kecil.</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPkgDuration("monthly")}
                      className={`p-4 rounded-2xl border text-left cursor-pointer transition flex flex-col justify-between h-24 ${
                        pkgDuration === "monthly"
                          ? "border-orange-550 border-orange-400 bg-orange-50/15 ring-1 ring-orange-500/20"
                          : "border-slate-150 hover:border-slate-200"
                      }`}
                    >
                      <span className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                        Paket Bulanan (30 Hari)
                        <span className="bg-rose-100 text-[#e5007d] text-[9px] px-1.5 py-0.5 rounded-full font-bold">Terhemat</span>
                      </span>
                      <span className="text-[10px] text-slate-400 leading-tight">Ketenangan tanpa repot belanja/masak subuh sebulan penuh.</span>
                    </button>
                  </div>
                </div>

                {/* 2. MPASI Category Choice */}
                <div className="space-y-2.5 text-left">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <Sparkles size={13} className="text-orange-500" fill="currentColor" />
                    2. Pilihan Jenis Tekstur MPASI Saffa
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPkgType("halus")}
                      className={`p-4 rounded-2xl border text-left cursor-pointer transition flex flex-col justify-between h-24 ${
                        pkgType === "halus"
                          ? "border-orange-550 border-orange-400 bg-orange-50/15 ring-1 ring-orange-500/20"
                          : "border-slate-150 hover:border-slate-200"
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-800 text-sm">Bubur Halus Saring</span>
                        <span className="text-[10px] font-semibold text-[#e5007d] font-mono">Rp 7k / cup</span>
                      </div>
                      <span className="text-[10px] text-slate-400 leading-tight">Untuk usia awal MPASI 6-8 bulan dengan saringan lembut murni.</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPkgType("tim")}
                      className={`p-4 rounded-2xl border text-left cursor-pointer transition flex flex-col justify-between h-24 ${
                        pkgType === "tim"
                          ? "border-orange-550 border-orange-400 bg-orange-50/15 ring-1 ring-orange-500/20"
                          : "border-slate-150 hover:border-slate-200"
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-800 text-sm">Nasi Tim Kasar / Bubur Tim</span>
                        <span className="text-[10px] font-semibold text-[#e5007d] font-mono">Rp 9k / cup</span>
                      </div>
                      <span className="text-[10px] text-slate-400 leading-tight">Melatih kemampuan kunyah gusi balita usia mulai 8-11 bulan ke atas.</span>
                    </button>
                  </div>
                </div>
                {/* 3. Delivery Schedule Policy */}
                <div className="space-y-2.5 text-left">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <MapPin size={13} className="text-orange-500" />
                    3. Waktu Pengantaran (Khusus Pagi Saja)
                  </span>
                  <div className="p-4 bg-orange-50/20 rounded-2xl border border-orange-100 flex items-start gap-3">
                    <Clock size={16} className="text-orange-550 text-orange-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-bold text-slate-800 text-sm">Pengantaran Pagi Selalu Hangat (06.00 - 10.00 WIB)</p>
                      <p className="text-xs text-slate-500 mt-0.5">Saffa mengantarkan MPASI segar & berkualitas setiap pagi agar si kecil dapat sarapan tepat waktu.</p>
                    </div>
                  </div>
                </div>

                {/* Package Voucher Detail Display */}
                <div className="p-5 bg-gradient-to-br from-orange-50 to-rose-50/30 border border-orange-100/80 rounded-2xl text-left space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BadgePercent className="text-[#e5007d]" size={18} />
                      <span className="font-bold text-xs uppercase tracking-wider text-[#e5007d] font-mono">Keuntungan Berlangganan Saffa</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 bg-white/80 border border-slate-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono">
                      ✓ Garansi Higienis
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 divide-y md:divide-y-0 md:divide-x divide-orange-100">
                    <div className="space-y-1.5 pt-3 md:pt-0">
                      <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono">Rincian Paket & Hemat:</div>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans">
                        • Durasi Paket: <strong>{pkgDuration === "weekly" ? "7 Hari" : "30 Hari"} Kontinu</strong><br />
                        • Jumlah MPASI: <strong>{pkg.totalCups} Cup Segar</strong><br />
                        • Hemat Promo: <strong className="text-emerald-600 underline">Rp {pkg.savings.toLocaleString("id-ID")}</strong> dibanding eceran.
                      </p>
                    </div>

                    <div className="space-y-1.5 pt-3 md:pt-0 md:pl-4">
                      <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono">Aturan Pengiriman Saffa Kurir:</div>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans">
                        • MPASI ditaruh rantang khusus higienis.<br />
                        • Pengantaran pagi (pkl 06.00 - 10.00 WIB).<br />
                        • Variasi rasa dikoordinasi bergilir otomatis agar seimbang.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-50 pb-4">
                  <div className="text-left">
                    <span className="font-bold text-sm text-slate-700 font-sans block">Format Susunan Piring</span>
                    <p className="text-[10px] text-slate-400">Pilih menu dari kotak opsi langsung di bawah tiap hari.</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleAutoFill}
                      className="px-3.5 py-2 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-xl text-xs font-semibold transition cursor-pointer"
                    >
                      ✨ Isi Otomatis Nutrisi
                    </button>
                    <button
                      type="button"
                      onClick={handleClearAll}
                      className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-semibold transition cursor-pointer"
                    >
                      Bersihkan Semua
                    </button>
                  </div>
                </div>

                {/* Jam Operasional Infobox */}
                <div className="p-4 bg-orange-50/45 border border-orange-100/70 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 text-left">
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-850 text-xs font-sans block">Jam Operasional Saffa</span>
                    <p className="text-[10px] text-slate-500">Pengantaran hangat / ambil sendiri terjadwal: <strong>06.00 s/d 10.00 WIB</strong>.</p>
                  </div>
                  <span className="bg-orange-100 text-orange-850 font-bold text-[10px] px-2.5 py-1 rounded-lg">Pagi Saja</span>
                </div>

                {/* Weekly Days Block Stack */}
                <div className="space-y-4">
                  {DAYS.map(day => {
                    const pSlot = schedule.find(s => s.day === day && s.time === "Pagi");

                    return (
                      <div 
                        key={day} 
                        className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center p-3.5 bg-slate-50/50 hover:bg-orange-50/10 border border-slate-100 rounded-2xl transition"
                      >
                        {/* Day Title */}
                        <div className="md:col-span-2 text-left">
                          <span className="font-bold text-slate-800 text-sm md:text-base">{day}</span>
                        </div>

                        {/* Breakfast (Pagi) Slot Selector */}
                        <div className="md:col-span-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 bg-white border border-slate-150 p-2 rounded-xl">
                          <div className="flex items-center gap-1.5 flex-1 min-w-0">
                            <span className="text-[10px] font-bold text-amber-600 font-mono shrink-0 px-1 bg-amber-55/65 rounded border border-amber-100">
                              ☀️ Pagi
                            </span>
                            <select
                              value={pSlot?.menuItemId || ""}
                              onChange={(e) => handleSlotChange(day, "Pagi", e.target.value)}
                              className="w-full bg-transparent text-xs text-slate-700 font-semibold border-none focus:ring-0 outline-hidden cursor-pointer py-1 truncate"
                            >
                              <option value="">-- Beri Bubur Saffa --</option>
                              {MENU_ITEMS.map(it => (
                                <option key={it.id} value={it.id}>
                                  {it.name} (Rp {it.price.toLocaleString("id-ID")})
                                </option>
                              ))}
                            </select>
                          </div>
                          
                          <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0 animate-fade-in">
                            {pSlot?.menuItemId && (
                              <div className="flex items-center gap-1 border border-orange-150/80 bg-orange-50/20 rounded-lg px-2 py-0.5 shrink-0" title="Jumlah cup">
                                <button
                                  type="button"
                                  onClick={() => handleCupsChange(day, "Pagi", (pSlot?.cups || 1) - 1)}
                                  className="w-5 h-5 text-xs font-extrabold text-orange-650 bg-white border border-slate-200 rounded-md hover:bg-orange-50 select-none flex items-center justify-center cursor-pointer transition active:scale-95"
                                >
                                  -
                                </button>
                                <span className="text-xs font-bold font-mono text-slate-750 min-w-[16px] text-center">
                                  {pSlot?.cups || 1}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleCupsChange(day, "Pagi", (pSlot?.cups || 1) + 1)}
                                  className="w-5 h-5 text-xs font-extrabold text-orange-650 bg-white border border-slate-200 rounded-md hover:bg-orange-50 select-none flex items-center justify-center cursor-pointer transition active:scale-95"
                                >
                                  +
                                </button>
                                <span className="text-[9px] text-[#e5007d] font-bold uppercase ml-0.5">Cup</span>
                              </div>
                            )}

                            <button
                              type="button"
                              onClick={() => handleClearSlot(day, "Pagi")}
                              disabled={!pSlot?.menuItemId}
                              className="text-slate-350 hover:text-red-500 font-semibold text-xs py-1 px-1.5 opacity-85 hover:opacity-100 disabled:opacity-20 cursor-pointer transition"
                              title="Kosongkan"
                            >
                              ✕
                            </button>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </>
            )}

          </div>

          {/* Right Area: Form Order & WA Sender */}
          <div className="lg:col-span-4 bg-[#faf9f6]/90 text-slate-800 p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-5">
            
            <div className="space-y-4 text-left">
              <div className="flex items-center gap-1.5 border-b border-slate-200 pb-2.5">
                <Smartphone className="text-slate-900" size={15} />
                <span className="font-bold text-[10px] uppercase tracking-widest font-mono text-slate-600">Konfirmasi Pemesanan</span>
              </div>

              {/* Scheduled counts info */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Total Cup</span>
                  <span className="text-base font-bold text-slate-800">{displayCupsCount} Cup</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Total Biaya</span>
                  <span className="text-base font-bold text-[#e5007d]">Rp {displayTotalCost.toLocaleString("id-ID")}</span>
                </div>
              </div>

              {/* Delivery info form inputs */}
              <div className="space-y-3">
                
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">Nama Ibu</label>
                  <input
                    type="text"
                    value={motherName}
                    onChange={(e) => setMotherName(e.target.value)}
                    placeholder="Bunda Clarissa"
                    className="w-full px-3 py-2 bg-white border border-slate-200 focus:border-slate-400 rounded-lg text-xs text-slate-800 outline-hidden font-semibold shadow-inner"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">Nama Anak & Usia</label>
                  <input
                    type="text"
                    value={babyName}
                    onChange={(e) => setBabyName(e.target.value)}
                    placeholder="Kenzo (8 bulan)"
                    className="w-full px-3 py-2 bg-white border border-slate-200 focus:border-slate-400 rounded-lg text-xs text-slate-800 outline-hidden font-semibold shadow-inner"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">Alamat Pengantaran</label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Perum Samping Masjid, Blok C, No. 3..."
                    rows={2}
                    className="w-full px-3 py-2 bg-white border border-slate-200 focus:border-slate-400 rounded-lg text-xs text-slate-800 outline-hidden font-semibold shadow-inner"
                  />
                </div>

                {/* ESTIMASI ONGKIR (MAXIM & GOJEK) WIDGET */}
                <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider font-mono flex items-center gap-1">
                      <MapPin size={11} className="text-[#e5007d]" />
                      Estimasi Jarak & Ongkos Kirim
                    </span>
                    <span className="text-[8px] text-[#e5007d] font-mono font-bold bg-[#e5007d]/5 px-2 py-0.5 rounded border border-[#e5007d]/10">
                      Tanjungpinang
                    </span>
                  </div>

                  {/* Slider Jarak */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-semibold text-slate-600">
                      <span>Jarak Antar:</span>
                      <span className="text-[#e5007d] font-bold font-mono">{deliveryDistance} KM</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="12"
                      step="0.5"
                      value={deliveryDistance}
                      onChange={(e) => setDeliveryDistance(parseFloat(e.target.value))}
                      className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#e5007d]"
                    />
                    <div className="flex justify-between text-[8px] text-slate-400 font-mono">
                      <span>0.5 KM (Dekat)</span>
                      <span>6 KM</span>
                      <span>12 KM (Jauh)</span>
                    </div>
                  </div>

                  {/* Toggle Kendaraan */}
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      type="button"
                      onClick={() => setDeliveryService("motor")}
                      className={`py-1 rounded-lg text-[9px] font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
                        deliveryService === "motor"
                          ? "bg-slate-900 text-white"
                          : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                      }`}
                    >
                      🛵 Motor (Cepat)
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryService("mobil")}
                      className={`py-1 rounded-lg text-[9px] font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
                        deliveryService === "mobil"
                          ? "bg-slate-900 text-white"
                          : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                      }`}
                    >
                      🚗 Mobil (Teduh)
                    </button>
                  </div>

                  {/* Komparasi Tarif Ongkir */}
                  <div className="grid grid-cols-2 gap-2 text-left">
                    <div className="bg-amber-500/[0.04] border border-amber-500/10 p-2 rounded-lg text-center">
                      <span className="text-[8px] font-bold text-amber-600 uppercase tracking-wider block">Maxim</span>
                      <span className="text-xs font-bold text-slate-800 font-mono">
                        Rp {(deliveryService === "motor" ? estMaximMotor : estMaximMobil).toLocaleString("id-ID")}
                      </span>
                    </div>
                    <div className="bg-emerald-500/[0.04] border border-emerald-500/10 p-2 rounded-lg text-center">
                      <span className="text-[8px] font-bold text-emerald-600 uppercase tracking-wider block">Gojek</span>
                      <span className="text-xs font-bold text-slate-800 font-mono">
                        Rp {(deliveryService === "motor" ? estGojekGoRide : estGojekGoCar).toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>

                  {/* Opsi masukkan ke WA */}
                  <label className="flex items-start gap-1.5 text-[9px] text-slate-400 select-none cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeOngkirInWA}
                      onChange={(e) => setIncludeOngkirInWA(e.target.checked)}
                      className="mt-0.5 rounded bg-slate-100 border-slate-300 text-[#e5007d] focus:ring-0 cursor-pointer"
                    />
                    <span>Kirim rincian ongkir di format chat WA</span>
                  </label>
                </div>

                {activeTab === "package" ? (
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono block">Jadwal Kirim Paket</label>
                    <div className="p-2.5 bg-white text-[10px] text-slate-550 border border-slate-200 rounded-lg leading-relaxed">
                      📱 Pengiriman terjadwal: <strong>Pagi Saja (06.00 - 10.00 WIB)</strong>. Sesuai kesepakatan berlangganan rutin.
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono block mb-1">Pola Jam Antar</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        "Pagi Saja (06.00 - 10.00)",
                        "Ambil Sendiri di Stand"
                      ].map(pref => (
                        <button
                          key={pref}
                          type="button"
                          onClick={() => setDeliveryPref(pref)}
                          className={`px-1.5 py-2 border rounded-lg text-[9px] font-bold text-center leading-tight transition cursor-pointer ${
                            deliveryPref === pref
                              ? "bg-[#e5007d] text-white border-transparent"
                              : "bg-white hover:bg-slate-50 text-slate-600 border-slate-200"
                          }`}
                        >
                          {pref}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">Pilih Stand Saffa Terdekat</label>
                  <select
                    value={selectedStandId}
                    onChange={(e) => setSelectedStandId(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 focus:border-slate-400 rounded-lg text-xs text-slate-800 outline-hidden font-semibold cursor-pointer"
                  >
                    {SAFFA_STANDS.map((st) => (
                      <option key={st.id} value={st.id}>
                        {st.name} ({st.phone})
                      </option>
                    ))}
                  </select>
                </div>

                {/* QRIS PAYMENT SECTION */}
                <div className="pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowQris(!showQris)}
                    className="w-full py-2.5 px-3 bg-gradient-to-r from-red-500/10 to-teal-500/10 hover:from-red-500/15 hover:to-teal-500/15 border border-red-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <QrCode size={15} className="text-red-600" />
                      <div className="text-left">
                        <span className="block font-bold text-slate-800">Pembayaran QRIS Saffa</span>
                        <span className="block text-[8px] font-mono font-normal text-slate-500">NMID ID1022219503367</span>
                      </div>
                    </div>
                    <span className="text-[9px] text-red-600 font-bold bg-white px-2 py-0.5 rounded-lg shadow-xs border border-red-100 shrink-0">
                      {showQris ? "Sembunyikan" : "Bayar Sekarang"}
                    </span>
                  </button>

                  {showQris && (
                    <div className="mt-2.5 bg-slate-50 border border-slate-150 rounded-2xl p-3 space-y-3 animate-fade-in text-center">
                      <div className="flex items-center justify-center p-0.5 bg-slate-200 rounded-lg text-[9px] font-bold">
                        <button
                          type="button"
                          onClick={() => setQrisView("dynamic")}
                          className={`flex-1 py-1 px-1 rounded-md transition ${qrisView === "dynamic" ? "bg-white text-[#e5007d] shadow-xs" : "text-slate-600"}`}
                        >
                          Auto Nominal
                        </button>
                        <button
                          type="button"
                          onClick={() => setQrisView("static")}
                          className={`flex-1 py-1 px-1 rounded-md transition ${qrisView === "static" ? "bg-white text-[#e5007d] shadow-xs" : "text-slate-600"}`}
                        >
                          Bebas Nominal
                        </button>
                        <button
                          type="button"
                          onClick={() => setQrisView("banner")}
                          className={`flex-1 py-1 px-1 rounded-md transition ${qrisView === "banner" ? "bg-white text-[#e5007d] shadow-xs" : "text-slate-600"}`}
                        >
                          Banner BNI
                        </button>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-slate-200 flex flex-col items-center justify-center">
                        {qrisView === "banner" ? (
                          <div className="relative w-48 rounded-lg overflow-hidden border border-slate-100 shadow-xs bg-white p-1">
                            <img
                              src={imgQrisPayment}
                              alt="QRIS Banner Official"
                              className="w-full h-auto object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <p className="text-[8px] text-slate-400 mt-1">Official Banner Merchant</p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="relative w-44 h-44 mx-auto border border-slate-150 p-1.5 rounded-lg bg-white shadow-xs">
                              <img
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
                                  generateQrisPayload(qrisView === "dynamic" ? displayTotalCost : 0)
                                )}`}
                                alt="Standard Scanable QRIS Saffa"
                                className="w-full h-full object-contain"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div>
                              <p className="font-bold text-xs uppercase text-slate-800">SAFFA BUBUR BAYI</p>
                              <p className="text-[9px] font-mono text-slate-400">NMID ID1022219503367</p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="text-left bg-white p-2.5 rounded-xl border border-slate-150 space-y-1">
                        <p className="font-bold text-[10px] text-slate-700 font-sans tracking-wide">
                          {qrisView === "dynamic" 
                            ? "✅ QRIS Otomatis Terisi Nominal:" 
                            : qrisView === "static" 
                            ? "✍️ QRIS Bebas Ketik Nominal:" 
                            : "🏷️ Banner Resmi QRIS Saffa:"}
                        </p>
                        <ol className="list-decimal list-inside text-[9px] text-slate-500 space-y-1 leading-relaxed font-sans">
                          {qrisView === "dynamic" && (
                            <>
                              <li>Scan QR Code di atas menggunakan m-Banking atau e-Wallet Bunda.</li>
                              <li>Nominal <strong className="text-[#e5007d]">Rp {displayTotalCost.toLocaleString("id-ID")}</strong> akan otomatis terisi secara instan tanpa perlu diketik manual!</li>
                              <li>Lakukan pembayaran, lalu kirim bukti transfer ke WhatsApp Saffa.</li>
                            </>
                          )}
                          {qrisView === "static" && (
                            <>
                              <li>Scan QR Code di atas lewat e-Wallet atau m-Banking Anda.</li>
                              <li>Ketik nominal bayar manual sebesar: <strong className="text-slate-800">Rp {displayTotalCost.toLocaleString("id-ID")}</strong>.</li>
                              <li>Kirim bukti pembayaran ke WhatsApp setelah konfirmasi.</li>
                            </>
                          )}
                          {qrisView === "banner" && (
                            <>
                              <li>Ini stiker banner resmi Saffa Bubur Bayi dari BNI Merchant.</li>
                              <li>Jika scanner HP Bunda kesulitan membaca stiker gambar di atas, beralihlah ke tab **Auto Nominal** atau **Bebas Nominal** untuk mendapatkan kode QR beresolusi super tajam dan presisi!</li>
                            </>
                          )}
                        </ol>
                      </div>

                      <div className="flex items-center justify-center gap-3">
                        <a
                          href={qrisView === "banner" 
                            ? imgQrisPayment 
                            : `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(
                                generateQrisPayload(qrisView === "dynamic" ? displayTotalCost : 0)
                              )}`
                          }
                          download="QRIS_Saffa_Bubur_Bayi.png"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[9px] font-bold text-red-600 hover:text-red-700 hover:underline transition cursor-pointer"
                        >
                          📥 Unduh Gambar QRIS
                        </a>
                      </div>
                    </div>
                  )}
                </div>

              </div>

            </div>

            {/* Sticky Order Action Drawer */}
            <div className="space-y-2 pt-3.5 border-t border-slate-200 shrink-0">
              
              <button
                type="button"
                onClick={handleCopyToClipboard}
                disabled={activeTab === "custom" ? scheduledMeals.length === 0 : (!motherName || !babyName || !address)}
                className="w-full py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 disabled:opacity-30 rounded-lg text-xs font-semibold cursor-pointer transition flex items-center justify-center gap-1.5"
              >
                <Copy size={12} />
                <span>{copySuccess ? "Tersalin ke Papan Klip!" : "Salin Format Chat"}</span>
              </button>

              <button
                type="button"
                onClick={handleSendToWhatsApp}
                disabled={activeTab === "custom" ? scheduledMeals.length === 0 : (!motherName || !babyName || !address)}
                className="w-full py-3 bg-[#e5007d] disabled:opacity-40 text-white text-xs font-bold rounded-lg hover:bg-[#c20067] transition duration-200 cursor-pointer flex items-center justify-center gap-1.5 text-center"
              >
                <Share2 size={12} fill="white" />
                <span>Kirim Ke WhatsApp Saffa</span>
              </button>

              <div className="text-center font-mono text-[8px] text-slate-400 uppercase tracking-wider">
                Langsung terhubung ke Chat WA Admin Saffa
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
