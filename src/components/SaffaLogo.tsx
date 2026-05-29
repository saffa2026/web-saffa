import { useState } from "react";
import { Sparkles } from "lucide-react";
// @ts-ignore
import saffaLogoImg from "../assets/images/saffa_logo.png";

interface SaffaLogoProps {
  variant?: "brand" | "header" | "footer";
  className?: string;
}

export default function SaffaLogo({ variant = "brand", className = "" }: SaffaLogoProps) {
  const [imgError, setImgError] = useState(false);
  const logoPath = saffaLogoImg;

  // Pure SVG High-Fidelity Vector Representation of Saffa's real logo as a fallback
  const SaffaVectorSVG = (
    <svg 
      viewBox="0 0 450 360" 
      className="w-full h-full select-none" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Playful, custom hand-curved "S" of Saffa */}
      <path
        d="M93 250 C80 252, 63 241, 57 228 C50 213, 56 195, 68 178 C80 162, 98 141, 99 126 C100 110, 87 99, 78 108 C71 115, 78 128, 85 135 C88 138, 86 144, 81 144 C72 144, 61 128, 62 110 C63 92, 80 81, 98 83 C117 85, 126 102, 124 121 C122 144, 102 168, 89 186 C76 204, 71 216, 76 226 C81 236, 94 238, 104 233 C109 230, 114 234, 112 239 C110 245, 102 248, 93 250 Z"
        fill="#e5007d"
      />

      {/* Playful custom "a" letter */}
      <path
        d="M165 200 C145 200, 131 182, 131 160 C131 138, 145 120, 165 120 C185 120, 199 138, 199 160 C199 182, 185 200, 165 200 Z"
        fill="#e5007d"
      />
      <path
        d="M185 120 C190 120, 195 125, 195 132 L195 192 C195 197, 191 200, 185 200 C179 200, 175 197, 175 192 L175 132 C175 125, 179 120, 185 120 Z"
        fill="#e5007d"
      />
      {/* Inner bowl cutout for 'a' */}
      <path
        d="M165 182 C175 182, 181 172, 181 160 C181 148, 175 138, 165 138 C155 138, 149 148, 149 160 C149 172, 155 182, 165 182 Z"
        fill="white"
      />

      {/* Playful custom first tall "f" letter */}
      <path
        d="M211 200 C205 200, 201 195, 201 189 L201 100 L191 100 C185 100, 181 96, 181 90 C181 84, 185 80, 191 80 L201 80 L201 70 C201 45, 218 30, 240 30 C247 30, 253 33, 253 39 C253 45, 247 48, 240 48 C228 48, 221 56, 221 70 L221 80 L239 80 C245 80, 249 84, 249 90 C249 96, 245 100, 239 100 L221 100 L221 189 C221 195, 217 200, 211 200 Z"
        fill="#e5007d"
      />

      {/* Playful custom second tall "f" letter */}
      <path
        d="M266 200 C260 200, 256 195, 256 189 L256 100 L246 100 C240 100, 236 96, 236 90 C236 84, 240 80, 246 80 L256 80 L256 70 C256 45, 273 30, 295 30 C302 30, 308 33, 308 39 C308 45, 302 48, 295 48 C283 48, 276 56, 276 70 L276 80 L294 80 C300 80, 304 84, 304 90 C304 96, 300 100, 294 100 L276 100 L276 189 C276 195, 272 200, 266 200 Z"
        fill="#e5007d"
      />

      {/* Playful custom last "a" letter */}
      <path
        d="M341 200 C321 200, 307 182, 307 160 C307 138, 321 120, 341 120 C361 120, 375 138, 375 160 C375 182, 361 200, 341 200 Z"
        fill="#e5007d"
      />
      <path
        d="M361 120 C366 120, 371 125, 371 132 L371 192 C371 197, 367 200, 361 200 C355 200, 351 197, 351 192 L351 132 C351 125, 355 120, 361 120 Z"
        fill="#e5007d"
      />
      <path
        d="M341 182 C351 182, 357 172, 357 160 C357 148, 351 138, 341 138 C331 138, 325 148, 325 160 C325 172, 331 182, 341 182 Z"
        fill="white"
      />

      {/* Signature leaf */}
      <path
        d="M331 176 C331 155, 349 143, 361 143 C361 164, 343 176, 331 176 Z"
        fill="#74b71b"
      />
      <path
        d="M331 176 C341 165, 351 154, 361 143"
        stroke="#9cd060"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Text label "bubur bayi premium" */}
      <text
        x="225"
        y="235"
        textAnchor="middle"
        fill="#1e293b"
        style={{
          fontFamily: "'Fredoka', 'Quicksand', 'Comfortaa', sans-serif",
          fontSize: "27px",
          fontWeight: "bold",
          letterSpacing: "0.02em"
        }}
      >
        bubur bayi premium
      </text>

      {/* Text label "tanjungpinang" */}
      <text
        x="225"
        y="278"
        textAnchor="middle"
        fill="#0f172a"
        style={{
          fontFamily: "'Comfortaa', 'Quicksand', 'Inter', sans-serif",
          fontSize: "36px",
          fontWeight: "500",
          letterSpacing: "0.14em"
        }}
      >
        tanjungpinang
      </text>
    </svg>
  );

  if (variant === "header") {
    return (
      <div className={`flex items-center gap-2.5 ${className}`}>
        {/* Visual Badge holding either the real uploaded image or our SVG fallback */}
        <div className="relative w-12 h-12 shrink-0 rounded-2xl bg-white border border-rose-100 flex items-center justify-center p-1 shadow-xs group-hover:scale-105 transition-transform duration-300">
          {!imgError ? (
            <img 
              src={logoPath} 
              alt="Saffa Logo asli" 
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-contain"
            />
          ) : (
            SaffaVectorSVG
          )}
          <div className="absolute -top-1 -right-1 bg-amber-400 p-0.5 rounded-full text-white">
            <Sparkles size={8} />
          </div>
        </div>

        {/* Text branding paired cleanly with web fonts */}
        <div className="text-left leading-none">
          <div className="flex items-baseline gap-1">
            <span 
              className="text-2xl font-bold tracking-tight text-[#e5007d]" 
              style={{ fontFamily: "'Comfortaa', 'Quicksand', sans-serif" }}
            >
              Saffa
            </span>
            <span className="text-[9px] font-bold text-slate-800 uppercase tracking-widest font-mono">
              Premium
            </span>
          </div>
          <div className="text-[9px] text-slate-500 font-medium tracking-wide flex items-center gap-1 mt-0.5 whitespace-nowrap">
            <span>MPASI Masa Kini</span>
            <span className="w-1 h-1 rounded-full bg-[#74b71b]" />
            <span className="text-slate-400">Tanjungpinang</span>
          </div>
        </div>
      </div>
    );
  }

  // Full representation for Hero panel and Footers
  return (
    <div className={`inline-flex flex-col items-center justify-center p-5 bg-white rounded-[2rem] border border-rose-100 shadow-md ${className}`}>
      <div className="relative flex flex-col items-center w-[230px] sm:w-[270px]">
        
        {/* Render the image if available; otherwise, the SVG fallback */}
        <div className="w-full h-auto select-none hover:scale-102 transition duration-300">
          {!imgError ? (
            <img 
              src={logoPath} 
              alt="Saffa Logo Asli" 
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-auto object-contain"
            />
          ) : (
            SaffaVectorSVG
          )}
        </div>

        {/* Custom branded Tagline badge representing "MPASI Masa Kini" */}
        <div className="mt-4 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#e5007d] to-pink-500 px-4 py-2 rounded-full shadow-xs hover:shadow-md flex items-center gap-1.5 transition">
          <Sparkles size={13} className="text-amber-300 animate-pulse fill-amber-300" />
          <span className="tracking-wide uppercase">MPASI Masa Kini</span>
        </div>
      </div>
    </div>
  );
}
