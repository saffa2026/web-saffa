import { Sparkles, Heart, Menu, X } from "lucide-react";
import { useState } from "react";
import SaffaLogo from "./SaffaLogo";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { id: "hero", label: "Beranda" },
    { id: "menu", label: "Menu Sehat" },
    { id: "portion", label: "Porsi Ideal" },
    { id: "planner", label: "Jadwal Belanja" },
    { id: "bot", label: "Tanya Ahli AI" }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-orange-100 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo Brand */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab("hero")}
          >
            <SaffaLogo variant="header" />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 bg-slate-50/60 p-1 rounded-xl border border-slate-100">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                  activeTab === link.id
                    ? "bg-[#e5007d] text-white shadow-xs"
                    : "text-slate-600 hover:text-[#e5007d] hover:bg-white"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Special Action Button: WA Order */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://wa.me/628137222190?text=Halo%20Saffa%20Bubur%20Bayi,%20saya%20ingin%20tanya%20menu%20hari%20ini"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-850 transition-all shadow-xs hover:scale-102 cursor-pointer border border-transparent"
            >
              <Heart size={14} className="fill-[#e5007d] text-[#e5007d] animate-pulse" />
              <span>Hubungi Admin</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-orange-50 px-4 py-4 space-y-2 shadow-inner">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setActiveTab(link.id);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold tracking-wide transition-all ${
                activeTab === link.id
                  ? "bg-stone-50 text-[#e5007d] border-l-4 border-[#e5007d] font-bold"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-4 border-t border-slate-100">
            <a
              href="https://wa.me/628137222190?text=Halo%20Saffa%20Bubur%20Bayi"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-bold"
            >
              <Heart size={14} className="fill-[#e5007d] text-[#e5007d]" />
              <span>Hubungi Admin</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
