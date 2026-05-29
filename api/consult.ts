import { GoogleGenAI } from "@google/genai";

// Lazy-loaded Gemini instance helper
let aiInstance: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiInstance) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required in Saffa Bubur Bayi application features.");
    }
    aiInstance = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiInstance;
}

// Saffa menu context as a formatted string to inject into Gemini prompt
const SAFFA_MENU_CONTEXT = `
Daftar Menu Saffa Bubur Bayi (MPASI Premium Sehat & Bergizi, HALAL Resmi - BPJPH Indonesia, Sejak 2022 di Tanjungpinang):
1. "Bubur Halus Beras Putih" [ID: m1] (Kategori: gurih, Untuk Usia: 6-8 Bulan, Harga: Rp 7.000). Bahan umum: Beras Putih Organik Saffa, ditambah protein harian silih berganti (Ayam/Sapi/Ikan/Telur) & sayuran segar. Manfaat: Aman dan pas sebagai menu perkenalan awal MPASI lembut.
2. "Bubur Halus Beras Merah Putih" [ID: m2] (Kategori: gurih, Untuk Usia: 6-8 Bulan, Harga: Rp 7.000). Bahan umum: Beras Merah & Beras Putih Organik Saffa, protein harian bervariasi harian (Ayam/Sapi/Ikan/Telur) & sayuran mikro harian. Manfaat: Memberikan serat optimal untuk melancarkan pencernaan anak.
3. "Nasi Tim" [ID: m3] (Kategori: spesial, Untuk Usia: 8-11 & 12+ Bulan, Harga: Rp 9.000). Bahan umum: Beras Tim Organik Saffa, kombinasi protein cincang (Sapi/Ayam Kampung/Salmon) & sayuran cincang berganti-ganti setiap harinya. Manfaat: Tekstur ideal untuk melatih keterampilan mengunyah bagi bayi 8 bulan ke atas.
4. "Silky Pudding" [ID: m4] (Kategori: manis, Untuk Semua Usia: 6-8, 8-11, 12+ Bulan, Harga: Rp 2.000). Bahan umum: Susu formula bayi, sari buah asli bervariasi harian (mangga, kurma, alpukat, pisang), kembang tahu sutra lembut, tanpa tambahan gula pasir. Manfaat: Selingan manis alami, dingin menyamankan gusi bengkak tumbuh gigi gatal.

Catatan penting: Detail lauk pauk gizi & topping sayur di atas disajikan bervariasi setiap hari menyesuaikan stok pasar segar terupdate agar bayi tidak bosan dan mendapat gizi makro-mikro seimbang.
`;

export default async function handler(req: any, res: any) {
  // Saffa QRIS API Consultation Endpoint - Vercel Serverless Function
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Metode tidak diizinkan. Gunakan POST." });
  }

  try {
    const { babyName, babyAgeMonths = 6, babyWeightKg = 7.5, healthConcerns = "", allergyNotes = "" } = req.body;

    if (!babyName) {
      return res.status(400).json({ error: "Nama bayi harus diisi." });
    }

    // Lazy load the Gemini client safely
    const ai = getGeminiClient();

    const systemInstruction = `
Kamu adalah "Dokter Cilik/Ahli Gizi Anak Saffa", konsultan nutrisi MPASI profesional yang ramah, hangat, penuh perhatian, dan edukatif untuk Saffa Bubur Bayi.
Gunakan bahasa Indonesia yang santun, bernada keibuan (empathy), menyapa dengan sapaan sayang untuk bayi seperti "Adek ${babyName}" atau "Bunda".
Tugasmu:
1. Berikan penjelasan nutrisi berdasar informasi bayi: Nama: ${babyName}, Usia: ${babyAgeMonths} bulan, Berat: ${babyWeightKg} kg, Kekhawatiran: ${healthConcerns}, Alergi: ${allergyNotes}.
2. Hitung kasar kebutuhan kalori usianya dan tekankan pentingnya tekstur MPASI yang tepat untuk usianya (${babyAgeMonths} bulan).
3. Rekomendasikan varian spesifik dari Saffa Bubur Bayi (mengacu pada daftar menu yang disediakan: m1, m2, m3, atau m4). Jelaskan secara detail mengapa menu tersebut cocok dengan kondisi atau keluhan kesehatannya!
- Jika berumur 6-8 bulan, rekomendasikan m1 (Bubur Halus Beras Putih) or m2 (Bubur Halus Beras Merah Putih) karena bertekstur halus saring.
- Jika berumur 8-11 bulan atau 12+ bulan, rekomendasikan m3 (Nasi Tim) yang bertekstur kasar/lembut untuk melatih kunyah.
- Sarankan m4 (Silky Pudding) sebagai snack sehat selingan tanpa tambahan gula pasir, terutama jika bayi sedang tumbuh gusi/gatal/teething.
- Jelaskan pada Bunda bahwa menu lauk/sayur pendamping dikreasikan bervariasi setiap hari menyesuaikan bahan segar terlengkap hari itu agar anak terhindar dari GTM (Gerakan Tutup Mulut) dan variasi gizinya melimpah.
4. Berikan tips MPASI rumahan yang praktis & suportif (misal: pemberian ASI diteruskan, suasana makan menyenangkan tanpa gadget/screen-time).
Format jawabanmu dengan struktur Markdown yang indah, menggunakan emoji ramah anak (seperti 🍼, 🥣, 🥑, 🌸, 👶), subheadings bold, dan bullets agar mudah dibaca oleh Bunda yang sibuk.
`;

    const userPrompt = `
Halo Dokter Gizi Saffa, saya ingin berkonsultasi mengenai anak saya:
- Nama: ${babyName}
- Usia: ${babyAgeMonths} bulan
- Berat Badan: ${babyWeightKg} kg
- Keluhan/Fokus Kesehatan: ${healthConcerns || "Kesehatan umum & tumbuh kembang optimal"}
- Alergi makanan: ${allergyNotes || "Tidak ada alergi yang diketahui"}

Tolong berikan rekomendasi menu Saffa Bubur Bayi yang paling cocok beserta tips pemberian makanannya yang tepat ya Dok. Terima kasih!
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        { text: SAFFA_MENU_CONTEXT },
        { text: userPrompt }
      ],
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || "Mohon maaf Bunda, asisten AI sedang beristirahat sebentar. Silakan coba sesaat lagi.";
    return res.status(200).json({ response: reply });

  } catch (error: any) {
    console.error("Consultation API Error: ", error);
    return res.status(500).json({
      error: "Gagal memproses konsultasi gizi.",
      details: error.message || error
    });
  }
}
