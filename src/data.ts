import { BabyAgeGroup, MenuItem, FAQItem, Testimonial, SaffaStand } from "./types";
// @ts-ignore
import imgBerasPutih from "./assets/images/bubur_putih_saffa_1780027754917.png";
// @ts-ignore
import imgBerasMerah from "./assets/images/bubur_merah_saffa_1780027773530.png";
// @ts-ignore
import imgNasiTim from "./assets/images/nasi_tim_saffa_real_1780027809900.png";
// @ts-ignore
import imgSilkyPudding from "./assets/images/silky_pudding_solid_1780029099585.png";
// @ts-ignore
import imgBundaRania from "./assets/images/bunda_rania_avatar_1780029338281.png";
// @ts-ignore
import imgBundaAmalia from "./assets/images/bunda_amalia_avatar_1780029357249.png";
// @ts-ignore
import imgBundaAyu from "./assets/images/bunda_ayu_avatar_1780029379436.png";
// @ts-ignore
import imgQrisPayment from "./assets/images/qris_payment_saffa_1780029806535.png";

export { imgQrisPayment };

export const AGE_GROUPS: BabyAgeGroup[] = [
  {
    id: "6-8",
    name: "Bubur Halus Saring (6 - 8 Bulan)",
    description: "Tekstur halus lembut saring, sangat aman untuk sistem pencernaan bayi yang baru mulai mengenal makanan padat.",
    texture: "Bubur Halus Saring"
  },
  {
    id: "8-11",
    name: "Bubur Kasar / Nasi Tim (8 - 11 Bulan)",
    description: "Tekstur semi-kasar blender kasar/tim cincang halus untuk membantu melatih refleks mengunyah dan menelan bayi.",
    texture: "Bubur Tim Kasar"
  },
  {
    id: "12+",
    name: "Nasi Tim Padat & Sup (12+ Bulan)",
    description: "Tekstur nasi tim lembut utuh dengan lauk cincang dan kuah kaldu gurih segar, mendukung pertumbuhan giginya.",
    texture: "Nasi Tim Lembut & Sup"
  }
];

export const SAFFA_STANDS: SaffaStand[] = [
  {
    id: "s1",
    name: "Stand Saffa Batu 8",
    phone: "08176600777",
    location: "Jl. Hanjoyo Putro KM. 8 Atas – Depan Percetakan 86"
  },
  {
    id: "s2",
    name: "Stand Saffa Bincen",
    phone: "081536781944",
    location: "Depan Kedai Kopi Taman Batu"
  },
  {
    id: "s3",
    name: "Stand Saffa Poltekes",
    phone: "085835665574",
    location: "Jl. Arif Rahman Hakim – Depan Poltekes Tanjungpinang"
  },
  {
    id: "s4",
    name: "Stand Saffa Simpang Kios Djalal",
    phone: "085668084302",
    location: "Jl. Adi Sucipto KM 11 – Simpang Kios Djalal"
  },
  {
    id: "s5",
    name: "Stand Saffa Jl. Cinta Damai",
    phone: "08988745404",
    location: "Jl. Cinta Damai – Simpang 4 Radar Areca Waterpark"
  },
  {
    id: "s6",
    name: "Stand Saffa Kijang Lama",
    phone: "08557166222",
    location: "Jl. Re Martadinata – Depan Posyandu Bunga Tanjung Kijang Lama"
  },
  {
    id: "s7",
    name: "Stand Saffa Ganet",
    phone: "08557199222",
    location: "Jl. Ganet – Depan Ruko Samping Market Agung"
  }
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "m1",
    name: "Bubur Halus Beras Putih",
    category: "gurih",
    ageGroups: ["6-8"],
    price: 7000,
    ingredients: ["Beras Putih Premium Saffa", "Protein Pilihan Hari Ini (Sapi/Ayam/Ikan/Telur)", "Sayur Segar Harian Musiman", "Kaldu Murni Home-made Bebas MSG"],
    nutrients: {
      calories: 125,
      protein: 5.8,
      fat: 3.5,
      carbs: 17.2,
      vitamins: ["Zat Besi", "Kalsium", "Vitamin A", "Fosfor"]
    },
    benefits: "Bubur saring bertekstur sangat halus dari beras putih premium dengan pilihan lauk pauk segar yang berganti setiap hari sesuai ketersediaan stok terbaik.",
    rating: 4.9,
    imageUrl: imgBerasPutih,
    isPopular: true
  },
  {
    id: "m2",
    name: "Bubur Halus Beras Merah Putih",
    category: "gurih",
    ageGroups: ["6-8"],
    price: 7000,
    ingredients: ["Beras Merah & Beras Putih Premium Saffa", "Protein Pilihan Hari Ini (Sapi/Ayam/Ikan/Telur)", "Sayur Segar Harian Musiman", "Kaldu Murni Home-made Bebas MSG"],
    nutrients: {
      calories: 130,
      protein: 6.0,
      fat: 3.6,
      carbs: 18.5,
      vitamins: ["Tinggi Serat Alami", "Zat Besi Heme", "Zinc", "Vitamin B1"]
    },
    benefits: "Kombinasi kaya serat dari beras merah premium dan beras putih premium, berpasangan dengan lauk-pauk bergizi seimbang yang bervariasi setiap harinya.",
    rating: 4.8,
    imageUrl: imgBerasMerah,
    isPopular: true
  },
  {
    id: "m3",
    name: "Nasi Tim",
    category: "spesial",
    ageGroups: ["8-11", "12+"],
    price: 9000,
    ingredients: ["Beras Premium Khusus Tim", "Protein Cincang Harian (Salmon/Daging/Ayam Kampung)", "Variasi Sayur Cincang Segar Harian", "Sari Bone Broth Saffa"],
    nutrients: {
      calories: 160,
      protein: 8.5,
      fat: 4.8,
      carbs: 20.0,
      vitamins: ["Tinggi Protein Hewani", "Kalsium", "Zinc", "Magnesium"]
    },
    benefits: "Nasi tim lembut bertekstur pas untuk merangsang pertumbuhan gigi dan refleks mengunyah anak, disajikan bervariasi lauknya setiap hari.",
    rating: 4.9,
    imageUrl: imgNasiTim,
    isPopular: true
  },
  {
    id: "m4",
    name: "Silky Pudding",
    category: "manis",
    ageGroups: ["6-8", "8-11", "12+"],
    price: 2000,
    ingredients: ["Pudding Sutra Lembut Saffa", "Sari Buah Manis Alami (Mangga/Kurma/Alpukat)", "ASI / Susu Formula Khusus Bayi", "Tanpa Tambahan Gula Pasir"],
    nutrients: {
      calories: 90,
      protein: 1.5,
      fat: 1.2,
      carbs: 19.0,
      vitamins: ["Serat Pencernaan", "Vitamin C", "Fruktosa Alami"]
    },
    benefits: "Selingan manis alami yang dingin dan super lembut untuk memanjakan gusi bayi saat tumbuh gigi, rasa buah berganti setiap harinya.",
    rating: 4.9,
    imageUrl: imgSilkyPudding,
    isPopular: true
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "f1",
    question: "Apakah Saffa Bubur Bayi sudah teruji HALAL Resmi?",
    answer: "Ya, Saffa Bubur Bayi secara resmi telah bersertifikat HALAL Resmi dari BPJPH Indonesia (Badan Penyelenggara Jaminan Produk Halal), memastikan setiap komparasi bahan pangan murni, bersih, dan higienis sejak pengolahan setiap pagi subuh."
  },
  {
    id: "f2",
    question: "Dari usia berapa si kecil bisa mulai mengonsumsi Saffa?",
    answer: "Produk Saffa disesuaikan struktur menunya agar cocok untuk bayi mulai dari usia 6 bulan ke atas (6+ Months), di mana pencernaan bayi mulai beralih sehat dari ASI eksklusif ke MPASI (Makanan Pendamping ASI) padat."
  },
  {
    id: "f3",
    question: "Apakah bumbu masakannya dicampur penyedap MSG atau pengawet?",
    answer: "Sama sekali TANPA pengawet & TANPA penyedap kimia (No MSG, No Artificial Colors). Cita rasa gurih kami peroleh murni dari ekstrak kaldu buatan sendiri (kaldu salmon, kaldu ayam kampung, bone broth sapi) serta keju cheddar bayi berkualitas tinggi."
  },
  {
    id: "f4",
    question: "Pukul berapa jam masak dan cara terbaik menyajikannya di rumah?",
    answer: "Bubur Saffa diproduksi segar setiap subuh (freshly cooked daily) agar terjaga utuh kandungan multivitaminnya. Untuk menghidangkannya hangat di rumah, cukup rendam cup wadah food-grade Saffa ke dalam mangkuk berisi air panas selama 3-5 menit sebelum diberikan ke si kecil."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Bunda Rania (Tanjungpinang)",
    role: "Ibunda dari Fatih (7 bulan)",
    avatar: imgBundaRania,
    comment: "Fatih suka banget Bubur Halus Salmon Saffa! Makannya lahap langsung habis dalam 10 menit tanpa drama lepeh. Kebantu banget buat Ibu bekerja seperti saya.",
    rating: 5
  },
  {
    id: "t2",
    name: "Bunda Amalia (KM 8)",
    role: "Ibunda dari Clarissa (10 bulan)",
    avatar: imgBundaAmalia,
    comment: "Sejak umur 8 bulan Clarissa langganan Nasi Tim Sump Daging Sapi Saffa. Berat badannya naik stabil di kurva hijau KMS, porsi takarannya sangat pas andalan MPASI homemade terbaik!",
    rating: 5
  },
  {
    id: "t3",
    name: "Bunda Ayu (Bincen)",
    role: "Ibunda dari Sakha (14 bulan)",
    avatar: imgBundaAyu,
    comment: "Website menu mingguan Saffa mempermudah planning makan Sakha. Silky Pudding Mangga-nya favorit Sakha kalau lagi teething gusi gatal. Sukses terus Saffa sejak 2022 membimbing gizi bayi Kepri!",
    rating: 5
  }
];
