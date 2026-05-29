import { useState } from "react";
import { MENU_ITEMS, AGE_GROUPS } from "../data";
import { MenuItem } from "../types";
import { Search, Sparkles, Flame, Apple, Heart, Check, Star, ShieldCheck, ShoppingCart } from "lucide-react";

interface MenuCatalogProps {
  onAddToPlanner: (menuItemId: string) => void;
}

export default function MenuCatalog({ onAddToPlanner }: MenuCatalogProps) {
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter items based on selected parameters
  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesAge = selectedAgeGroup === "all" || item.ageGroups.includes(selectedAgeGroup);
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.ingredients.some(i => i.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesAge && matchesCategory && matchesSearch;
  });

  const getAgeBadgeLabel = (ageGroupIds: string[]) => {
    return ageGroupIds.map((id) => {
      if (id === "6-8") return "6-8 Bln";
      if (id === "8-11") return "8-11 Bln";
      if (id === "12+") return "12+ Bln";
      return id;
    }).join(" & ");
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleOrderSingleWA = (product: MenuItem) => {
    const text = `Halo Saffa Bubur Bayi, saya tertarik membeli menu sehat: *${product.name}* (Harga: Rp ${product.price.toLocaleString("id-ID")}). Apakah hari ini ready?`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/628137222190?text=${encoded}`, "_blank");
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header section */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full border border-amber-100">
            <Sparkles size={11} className="text-amber-500" />
            <span>Katalog Gizi Saffa</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight font-sans">
            Ragam Pilihan Menu Sang Buah Hati
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Setiap porsi bubur dimasak steril higienis dari bahan alami terbaik dengan resep bernutrisi seimbang sesuai kurva kebutuhan bayi.
          </p>
        </div>

        {/* Temporary Toast */}
        {toastMessage && (
          <div className="fixed bottom-5 right-5 z-50 bg-slate-900 border border-slate-800 text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-2.5 max-w-sm text-sm animate-fade-in animate-duration-300">
            <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shrink-0">✓</div>
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Filters and Search panel combined */}
        <div className="bg-white p-5 rounded-2xl border border-slate-150 mb-8 space-y-4 shadow-xs">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <Search size={15} />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari menu beras merah, salmon, daging sapi..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 focus:border-slate-400 focus:ring-0 rounded-xl text-xs text-slate-700 outline-hidden transition shadow-inner font-medium"
              />
            </div>

            {/* Category Filter Buttons */}
            <div className="md:col-span-7 flex flex-wrap items-center gap-1.5 md:justify-end">
              <span className="text-[10px] font-bold text-slate-400 mr-1 font-mono uppercase">Varian:</span>
              {[
                { id: "all", label: "Semua" },
                { id: "gurih", label: "🍲 Gurih" },
                { id: "manis", label: "🍎 Manis" },
                { id: "spesial", label: "⭐ Spesial" }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-xs px-3.5 py-2 rounded-xl font-semibold transition cursor-pointer ${
                    selectedCategory === cat.id
                      ? "bg-[#e5007d] text-white"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-600"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

          </div>

          {/* Age-Group Slider filters */}
          <div className="border-t border-slate-100 pt-3.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-bold text-slate-400 mr-1 font-mono uppercase">Usia Bayi:</span>
              <button
                onClick={() => setSelectedAgeGroup("all")}
                className={`text-xs px-3.5 py-2 rounded-xl font-semibold transition cursor-pointer ${
                  selectedAgeGroup === "all"
                    ? "bg-slate-900 text-white"
                    : "bg-slate-550 bg-slate-50 hover:bg-slate-100 text-slate-600"
                }`}
              >
                Semua Usia
              </button>
              {AGE_GROUPS.map((gp) => (
                <button
                  key={gp.id}
                  onClick={() => setSelectedAgeGroup(gp.id)}
                  className={`text-xs px-3.5 py-2 rounded-xl font-semibold transition text-left cursor-pointer ${
                    selectedAgeGroup === gp.id
                      ? "bg-stone-100 text-[#e5007d] border border-[#e5007d]/30 font-bold"
                      : "bg-slate-50 text-slate-600 hover:text-slate-800"
                  }`}
                >
                  {gp.id === "6-8" && "👶 "}
                  {gp.id === "8-11" && "🥣 "}
                  {gp.id === "12+" && "🍛 "}
                  {gp.name}
                </button>
              ))}
            </div>

            <p className="text-[11px] text-slate-400 font-mono">
              Menampilkan <span className="font-bold text-slate-700">{filteredItems.length}</span> resep MPASI Saffa
            </p>
          </div>

        </div>

        {/* Products Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((product) => (
              <div
                key={product.id}
                className="group relative bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xs transition-all duration-200 flex flex-col"
              >
                
                {/* Product Badge Indicators */}
                <div className="absolute top-3.5 left-3.5 z-10 flex flex-col gap-1 items-start">
                  <span className="px-2 py-0.5 bg-slate-900/90 backdrop-blur-xs text-white text-[9px] font-bold uppercase rounded-md tracking-wider">
                    {getAgeBadgeLabel(product.ageGroups)}
                  </span>
                  
                  {product.isPopular && (
                    <span className="px-2 py-0.5 bg-amber-400 text-slate-900 text-[9px] font-bold uppercase rounded-md flex items-center gap-1">
                      <Star size={9} className="fill-slate-950" />
                      <span>Best</span>
                    </span>
                  )}
                </div>

                {/* Product image with organic backup layout */}
                <div className="relative h-44 w-full bg-slate-50/50 flex flex-col items-center justify-center border-b border-slate-100 overflow-hidden shrink-0">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <>
                      <div className="absolute bottom-[-10px] right-[-10px] opacity-5 text-[#e5007d] rotate-12 scale-150 group-hover:scale-160 transition-transform duration-300">
                        {product.category === 'manis' ? <Apple size={130} /> : <Flame size={130} />}
                      </div>
                      
                      {/* Cute symbolic bowl display */}
                      <div className="w-18 h-18 rounded-full bg-white border border-slate-150 flex items-center justify-center group-hover:scale-103 duration-250 relative">
                        <span className="text-3xl">
                          {product.id === 'm1' && '🍚'}
                          {product.id === 'm2' && '🍧'}
                          {product.id === 'm3' && '🍲'}
                          {product.id === 'm4' && '🍮'}
                        </span>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#e5007d] text-white flex items-center justify-center text-[9px] font-bold">
                          🥣
                        </div>
                      </div>
                    </>
                  )}

                  <span className="absolute bottom-2.5 left-2.5 z-10 px-2 py-0.5 bg-black/60 backdrop-blur-xs text-white text-[9px] font-bold uppercase rounded-md tracking-wider">
                    {product.category === 'manis' ? '🍼 Manis Alami' : product.category === 'gurih' ? '🍲 Pilihan Gurih' : '⭐ Menu Spesial'}
                  </span>
                </div>

                {/* Product Info Description */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3.5">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-0.5 text-[10px] text-amber-500 font-bold bg-amber-50 px-1.5 py-0.5 rounded">
                        <span>★</span>
                        <span>{product.rating.toFixed(1)}</span>
                      </div>
                      <span className="text-base font-bold text-slate-900 font-mono">
                        Rp {product.price.toLocaleString("id-ID")}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-slate-900 leading-snug group-hover:text-[#e5007d] transition-colors">
                      {product.name}
                    </h3>
                    
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {product.benefits}
                    </p>
                  </div>

                  {/* Micro list of ingredients */}
                  <div className="pt-2 border-t border-slate-50 flex flex-wrap gap-1">
                    {product.ingredients.slice(0, 3).map((ing, k) => (
                      <span key={k} className="text-[9px] font-medium bg-slate-50 text-slate-500 px-2 py-0.5 rounded-md border border-slate-100">
                        {ing}
                      </span>
                    ))}
                    {product.ingredients.length > 3 && (
                      <span className="text-[9px] bg-slate-50 text-slate-400 px-1 py-0.5 rounded-md font-mono">
                        +{product.ingredients.length - 3} lagi
                      </span>
                    )}
                  </div>

                  {/* Product card actions */}
                  <div className="grid grid-cols-2 gap-2 pt-1 shrink-0">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="py-2 bg-slate-50 text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-100 border border-slate-200 transition duration-200 cursor-pointer"
                    >
                      Nutrisi Detail
                    </button>
                    
                    <button
                      onClick={() => {
                        onAddToPlanner(product.id);
                        showToast(`"${product.name}" ditambahkan ke jadwal makan!`);
                      }}
                      className="py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 shadow-xs flex items-center justify-center gap-1 transition duration-200 cursor-pointer"
                    >
                      <ShoppingCart size={11} />
                      <span>Atur Jadwal</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-50 select-none rounded-3xl border border-dashed border-slate-200">
            <p className="text-slate-400 text-sm">Tidak ada menu yang sesuai dengan pencarian Anda.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedAgeGroup("all");
                setSelectedCategory("all");
              }}
              className="mt-3 text-xs text-orange-500 font-semibold underline hover:text-orange-700"
            >
              Reset Filter Pencarian &rarr;
            </button>
          </div>
        )}

        {/* Detailed Info Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white max-w-lg w-full rounded-3xl overflow-hidden shadow-2xl border border-orange-100">
              
              {/* Modal header with product color status */}
              <div className="p-6 bg-gradient-to-r from-orange-400 to-amber-400 text-white relative">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 text-white/9w hover:text-white bg-black/15 p-2 rounded-full cursor-pointer transition text-xs font-mono"
                >
                  Tutup ✕
                </button>
                
                <span className="text-[10px] font-bold uppercase bg-white/20 px-2.5 py-1 rounded-md tracking-wider">
                  Saran Usia {getAgeBadgeLabel(selectedProduct.ageGroups)}
                </span>
                
                <h3 className="text-xl font-bold mt-2 pr-10 leading-snug">
                  {selectedProduct.name}
                </h3>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
                
                {/* Product real photo */}
                {selectedProduct.imageUrl && (
                  <div className="relative h-48 w-full bg-slate-50 border border-slate-150 rounded-2xl overflow-hidden shadow-inner shrink-0">
                    <img
                      src={selectedProduct.imageUrl}
                      alt={selectedProduct.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white px-2 py-0.5 rounded-md text-[9px] font-bold tracking-wider uppercase">
                      Foto Asli Masakan Saffa
                    </div>
                  </div>
                )}

                {/* Benefits intro */}
                <div className="bg-orange-50/40 p-4 rounded-2xl border border-orange-100 space-y-2">
                  <div className="flex items-center gap-1.5 text-orange-700 font-bold text-xs font-mono uppercase">
                    <Heart size={14} className="fill-orange-400 text-orange-500" />
                    <span>Manfaat Medis & Tumbuh Kembang</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {selectedProduct.benefits}
                  </p>
                </div>

                {/* Nutrition Grid */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">Nutrisi Per 1 Porsi (Tekaran Standar):</h4>
                  
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <p className="text-[10px] font-medium text-slate-400 font-mono">Energi</p>
                      <p className="text-sm font-bold text-slate-700 mt-1">{selectedProduct.nutrients.calories} kkal</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <p className="text-[10px] font-medium text-slate-400 font-mono">Protein</p>
                      <p className="text-sm font-bold text-emerald-600 mt-1">{selectedProduct.nutrients.protein} g</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <p className="text-[10px] font-medium text-slate-400 font-mono">Lemak</p>
                      <p className="text-sm font-bold text-amber-600 mt-1">{selectedProduct.nutrients.fat} g</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <p className="text-[10px] font-medium text-slate-400 font-mono">Karbo</p>
                      <p className="text-sm font-bold text-blue-600 mt-1">{selectedProduct.nutrients.carbs} g</p>
                    </div>
                  </div>

                  {/* Micro Vitamins checklist */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {selectedProduct.nutrients.vitamins.map((vit, i) => (
                      <span key={i} className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 flex items-center gap-1 font-mono">
                        <Check size={10} />
                        {vit}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Ingredients details */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">Komparasi Bahan Alami (100% Organik):</h4>
                  <ul className="grid grid-cols-2 gap-2 text-xs text-slate-700 font-sans">
                    {selectedProduct.ingredients.map((ing, i) => (
                      <li key={i} className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Safety Guarantee Info */}
                <div className="flex items-center gap-2.5 p-3.5 bg-emerald-50/50 border border-emerald-100 text-emerald-800 text-[11px] rounded-2xl">
                  <ShieldCheck size={20} className="text-emerald-500 shrink-0" />
                  <span>Dibuat tanpa gula tambahan, garam minimalis, bebas pengawet atau gluten saring, dan ramah lambung sensitif.</span>
                </div>

              </div>

              {/* Action feet */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
                <span className="font-bold text-lg text-slate-800 font-mono ml-2">
                  Rp {selectedProduct.price.toLocaleString("id-ID")}
                </span>
                <div className="flex items-center gap-2 font-sans">
                  <button
                    onClick={() => {
                      onAddToPlanner(selectedProduct.id);
                      setSelectedProduct(null);
                      showToast(`"${selectedProduct.name}" ditambahkan ke jadwal makan!`);
                    }}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-950 text-white rounded-xl text-xs font-semibold shrink-0 transition cursor-pointer"
                  >
                    Tambah Ke Jadwal
                  </button>
                  <button
                    onClick={() => handleOrderSingleWA(selectedProduct)}
                    className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-semibold shrink-0 transition cursor-pointer"
                  >
                    Pesan via WA
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
