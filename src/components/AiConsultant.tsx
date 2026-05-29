import { useState, useRef, useEffect, FormEvent } from "react";
import { ChatMessage, ConsultPayload } from "../types";
import { MessageSquare, Sparkles, Send, RefreshCw, User, HelpCircle, Heart, ShieldCheck } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function AiConsultant() {
  const [babyName, setBabyName] = useState<string>("");
  const [babyAge, setBabyAge] = useState<number>(7);
  const [babyWeight, setBabyWeight] = useState<number>(7.5);
  const [healthConcern, setHealthConcern] = useState<string>("Pertumbuhan optimal");
  const [allergyNotes, setAllergyNotes] = useState<string>("");

  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory, isLoading]);

  const handleStartConsultation = async (e: FormEvent) => {
    e.preventDefault();
    if (!babyName.trim()) {
      setErrorMessage("Tolong masukkan nama si kecil ya Bunda.");
      return;
    }
    setErrorMessage(null);
    setIsLoading(true);
    setHasStarted(true);

    const initialGreet: ChatMessage = {
      id: "g1",
      sender: "user",
      text: `Saya ingin konsultasi gizi untuk Anak saya *${babyName}*, usia *${babyAge} bulan* dengan berat badan *${babyWeight} kg*. Keluhannya: *${healthConcern}* dan alergi: *${allergyNotes || "Tidak ada"}*.`,
      timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
    };

    setChatHistory([initialGreet]);

    try {
      const response = await fetch("/api/consult", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          babyName,
          babyAgeMonths: babyAge,
          babyWeightKg: babyWeight,
          healthConcerns: healthConcern,
          allergyNotes: allergyNotes
        })
      });

      if (!response.ok) {
        throw new Error("Gagal terhubung dengan server medis Saffa.");
      }

      const data = await response.json();
      
      const botResponse: ChatMessage = {
        id: "r1",
        sender: "bot",
        text: data.response,
        timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
      };

      setChatHistory(prev => [...prev, botResponse]);
    } catch (err: any) {
      setErrorMessage(err.message || "Terjadi kesalahan gizi.");
      setChatHistory(prev => [
        ...prev,
        {
          id: "error-node",
          sender: "bot",
          text: "Maaf Bunda, asisten kecerdasan AI kami sedang kelebihan kueri pelayanan. Tolong ketuk tombol di bawah untuk mencoba memproses kembali.",
          timestamp: ""
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue;
    setInputValue("");
    setErrorMessage(null);

    const newUserMessage: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: userText,
      timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
    };

    setChatHistory(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      // Send message with context
      const response = await fetch("/api/consult", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          babyName,
          babyAgeMonths: babyAge,
          babyWeightKg: babyWeight,
          healthConcerns: `${healthConcern} (Pertanyaan Tambahan: ${userText})`,
          allergyNotes: allergyNotes
        })
      });

      if (!response.ok) {
        throw new Error("Gagal memproses tanya jawab.");
      }

      const data = await response.json();

      const botMessage: ChatMessage = {
        id: `b-${Date.now()}`,
        sender: "bot",
        text: data.response,
        timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
      };

      setChatHistory(prev => [...prev, botMessage]);
    } catch (err: any) {
      setErrorMessage("Maaf Bunda, sambungan terputus sementara.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (question: string) => {
    setInputValue(question);
    setTimeout(() => {
      handleSendMessage();
    }, 50);
  };

  const handleRestartChat = () => {
    setHasStarted(false);
    setChatHistory([]);
    setErrorMessage(null);
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Intro */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#e5007d]/5 text-[#e5007d] text-[10px] font-bold tracking-widest uppercase rounded-full border border-[#e5007d]/10">
            <Sparkles size={11} className="text-[#e5007d]" />
            <span>AI Pediatric Advisor</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Konsultasi Gizi Saffa AI
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm">
            Dapatkan rekomendasi variasi MPASI terpersonalisasi untuk si kecil secara instan, ramah, dan mendetail langsung dari asisten kecerdasan medis kami.
          </p>
        </div>

        {/* Outer Chat Board */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-xs min-h-[500px] flex flex-col">
          
          {/* Header Bar */}
          <div className="bg-slate-900 p-5 text-white flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 relative">
                <span className="text-lg">👶</span>
                <span className="absolute bottom-[-1px] right-[-1px] w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-900 rounded-full" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-xs tracking-wider uppercase font-mono">Dr. Saffa AI (Nutrisionis)</h4>
                <p className="text-[9px] text-[#e5007d] font-mono font-bold tracking-wide">Konsultasi Resep Gizi Seimbang & Aman</p>
              </div>
            </div>

            {hasStarted && (
              <button
                onClick={handleRestartChat}
                className="text-[10px] font-bold tracking-wider uppercase text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-2 rounded-lg cursor-pointer flex items-center gap-1 transition"
              >
                <RefreshCw size={11} />
                <span>Ulangi Chat</span>
              </button>
            )}
          </div>

          {/* Body Content router */}
          {!hasStarted ? (
            /* STATE A: GATHER BABY METRIC INFO */
            <form onSubmit={handleStartConsultation} className="p-6 sm:p-8 space-y-6 flex-1 bg-white text-left">
              
              {errorMessage && (
                <div className="p-4 bg-rose-50 text-rose-800 border border-rose-100 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle size={15} className="text-rose-500 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Baby Name input */}
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">Nama Si Kecil *</label>
                  <div className="relative">
                    <User size={13} className="absolute inset-y-0 left-0 pl-3.5 text-slate-400 h-full flex items-center" />
                    <input
                      type="text"
                      required
                      value={babyName}
                      onChange={(e) => setBabyName(e.target.value)}
                      placeholder="Contoh: Kenzo, Alisa"
                      className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 focus:border-slate-400 rounded-lg text-xs text-slate-800 outline-hidden transition shadow-inner font-semibold"
                    />
                  </div>
                </div>

                {/* Health concern select box */}
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">Fokus / Keluhan Utama</label>
                  <select
                    value={healthConcern}
                    onChange={(e) => setHealthConcern(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-slate-200 focus:border-slate-400 rounded-lg text-xs text-slate-800 outline-hidden transition shadow-inner font-semibold cursor-pointer"
                  >
                    <option value="Pertumbuhan optimal">Sehat & Pertumbuhan Optimal</option>
                    <option value="Sembelit / Konstipasi">Sembelit / Sulit BAB / Konstipasi</option>
                    <option value="Gerakan Tutup Mulut (GTM)">GTM (Gerakan Tutup Mulut / Susah Makan)</option>
                    <option value="Menambah Berat Badan (Booster)">Mengejar Berat Badan (Kurang Optimal)</option>
                    <option value="Pertama kali mulai MPASI (6 Bulan)">Pertama Kali MPASI (Bayi 6 Bulan)</option>
                  </select>
                </div>

                {/* Age monthly slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">Usia (Bulan)</label>
                    <span className="text-sm font-bold text-[#e5007d] font-mono">{babyAge} Bulan</span>
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
                  <p className="text-[9px] text-slate-400 leading-none">Pola MPASI berubah drastis sesuai perkembangan usia!</p>
                </div>

                {/* Weight kg slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">Berat Badan (Kg)</label>
                    <span className="text-sm font-bold text-[#e5007d] font-mono">{babyWeight.toFixed(1)} Kg</span>
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
                  <p className="text-[9px] text-slate-400 leading-none">Membantu asisten AI menghitung estimasi kalori harian.</p>
                </div>

              </div>

              {/* Allergy notes input */}
              <div className="space-y-1.5 font-sans">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">Riwayat Alergis Makanan (Bila Ada)</label>
                <textarea
                  value={allergyNotes}
                  onChange={(e) => setAllergyNotes(e.target.value)}
                  placeholder="Contoh: Alergi susu sapi, alergi telur puyuh, sensitif seafood..."
                  rows={2}
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 focus:border-slate-400 rounded-lg text-xs text-slate-800 outline-hidden transition shadow-inner font-semibold"
                />
              </div>

              <div className="p-3 bg-emerald-500/[0.03] border border-emerald-500/10 text-slate-600 text-[10px] rounded-lg flex items-center gap-2.5 leading-relaxed font-sans">
                <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
                <span>Dokter Cilik Gizi AI diprogram terkalibrasi dengan kurva berat badan & rujukan nutrisi Kemenkes RI.</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#e5007d] hover:bg-[#c20067] text-white font-bold text-xs rounded-lg transition-all duration-200 cursor-pointer text-center flex items-center justify-center gap-2"
              >
                <MessageSquare size={13} />
                <span>Mulai Konsultasi Gizi Sekarang</span>
              </button>

            </form>
          ) : (
            /* STATE B: CHAT DIALOGUE BOARD */
            <div className="flex-1 flex flex-col justify-between bg-white overflow-hidden min-h-[450px]">
              
              {/* Message scroll container */}
              <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 max-h-[440px] text-left">
                {chatHistory.map((msg) => (
                  <div
                     key={msg.id}
                     className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                  >
                    {/* Speaker indicator label */}
                    <span className="text-[9px] font-mono text-slate-400 mb-1 px-1">
                      {msg.sender === "user" ? babyName : "Dr. Saffa"} • {msg.timestamp}
                    </span>

                    {/* Chat Bubble with gorgeous markdown parsing */}
                    <div
                      className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed font-sans ${
                        msg.sender === "user"
                          ? "bg-slate-100 text-slate-800 rounded-tr-none border border-slate-200"
                          : "bg-[#faf9f6]/95 text-slate-800 rounded-tl-none border border-slate-200"
                      }`}
                    >
                      <div className="markdown-body">
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Thinking loader */}
                {isLoading && (
                  <div className="flex flex-col items-start">
                    <span className="text-[9px] font-mono text-slate-400 mb-1">Dr. Saffa sedang menganalisis gizi...</span>
                    <div className="bg-[#faf9f6] border border-slate-250/60 p-4 rounded-2xl rounded-tl-none flex items-center gap-3 max-w-[200px]">
                      <div className="flex gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#e5007d] animate-bounce delay-0" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#e5007d] animate-bounce delay-150" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#e5007d] animate-bounce delay-300" />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* Suggestions shortcuts bar */}
              <div className="px-4 py-2 bg-slate-50 border-t border-b border-slate-200 flex gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none shrink-0 text-left">
                {[
                  "Menu apa yang terbaik untuk GTM?",
                  "Urutan tekstur tim untuk umur 9 bulan?",
                  "Menu booster zat besi yang mana?",
                  "Makanan selingan buah yang bagus?"
                ].map((sug, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestionClick(sug)}
                    className="px-3 py-1.5 bg-white hover:bg-[#faf9f6] border border-slate-200 rounded-lg text-[9px] text-slate-600 hover:text-[#e5007d] font-bold cursor-pointer shrink-0 transition"
                  >
                    💡 {sug}
                  </button>
                ))}
              </div>

              {/* Send Form input bar */}
              <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-250/60 flex items-center gap-2 shrink-0">
                <input
                  type="text"
                  value={inputValue}
                  disabled={isLoading}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={`Tanya kelanjutan gizi Adek ${babyName} di sini...`}
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 focus:border-slate-400 focus:bg-white rounded-lg text-xs text-slate-800 outline-hidden transition shadow-inner font-semibold"
                />
                
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="p-2 bg-[#e5007d] hover:bg-[#c20067] disabled:opacity-40 text-white rounded-lg transition cursor-pointer shrink-0"
                >
                  <Send size={15} />
                </button>
              </form>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}

// Simple placeholder error icon
function AlertCircle(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-alert-circle"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  );
}
