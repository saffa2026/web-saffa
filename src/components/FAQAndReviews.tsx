import { useState } from "react";
import { FAQS, TESTIMONIALS } from "../data";
import { Heart, Star, HelpCircle, ChevronDown, ChevronUp, Sparkles } from "lucide-react";

export default function FAQAndReviews() {
  const [openFaq, setOpenFaq] = useState<string | null>("f1");

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <section className="py-16 bg-white border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Block: FAQ Accordions */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-orange-700 text-xs font-semibold rounded-full border border-orange-100">
                <HelpCircle size={12} className="text-orange-500" />
                <span>Tanya Jawab Ibu Pintar</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 tracking-tight font-sans">
                Pertanyaan yang Sering Diajukan
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm">
                Berikut jawaban untuk kepedulian Bunda seputar kebersihan, kandungan anti-alergen, dan rute pengiriman bubur hangat Saffa.
              </p>
            </div>

            {/* Accordion List */}
            <div className="space-y-3 pt-3">
              {FAQS.map((faq) => {
                const isOpen = openFaq === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="border border-slate-100 rounded-2xl bg-slate-50/50 overflow-hidden transition"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full px-5 py-4 flex items-center justify-between text-slate-800 text-sm font-semibold hover:bg-orange-50/20 text-left cursor-pointer transition focus:outline-hidden"
                    >
                      <span>{faq.question}</span>
                      {isOpen ? (
                        <ChevronUp size={16} className="text-orange-500 shrink-0" />
                      ) : (
                        <ChevronDown size={16} className="text-slate-400 shrink-0" />
                      )}
                    </button>
                    
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100/50 bg-white">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Block: Testimonials & Reviews Grid */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full border border-amber-100">
                <Sparkles size={11} className="text-amber-500" />
                <span>Kisah Ibu lahap Saffa</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 tracking-tight font-sans">
                Kata Bunda yang Setia Bersama Saffa
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm">
                Lihat ulasan jujur penuh cinta dari para Bunda cerdas seputar nafsu makan anak dan kepuasan pelayanan pengantaran kami.
              </p>
            </div>

            {/* Testimonial Grids in compliant image designs */}
            <div className="space-y-4 pt-3">
              {TESTIMONIALS.map((test) => (
                <div
                  key={test.id}
                  className="p-5 bg-white border border-slate-100 rounded-3xl shadow-xs hover:shadow-md transition space-y-3.5 flex flex-col justify-between"
                >
                  <p className="text-slate-600 italic text-xs leading-relaxed font-sans">
                    "{test.comment}"
                  </p>

                  <div className="flex items-center gap-3">
                    <img
                      src={test.avatar}
                      alt={test.name}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(test.name)}&backgroundColor=e5007d,74b71b,f43f5e`;
                      }}
                      className="w-10 h-10 rounded-full object-cover border border-rose-100 bg-rose-50 shrink-0 shadow-2xs"
                    />
                    <div>
                      <h5 className="font-bold text-xs text-slate-800 leading-tight">
                        {test.name}
                      </h5>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {test.role}
                      </span>
                    </div>

                    <div className="ml-auto flex gap-0.5 text-amber-400">
                      {"★".repeat(test.rating)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
