export interface BabyAgeGroup {
  id: string; // "6-8" | "8-11" | "12+"
  name: string; // e.g., "Mulai MPASI (6-8 Bulan)"
  description: string; // "Tekstur halus saring lembut untuk bayi pemula"
  texture: string; // "Bubur Halus Saring"
}

export interface MenuItem {
  id: string;
  name: string;
  category: "manis" | "gurih" | "spesial";
  ageGroups: string[]; // e.g. ["6-8", "8-11"]
  price: number; // e.g. 10000 -> 10k IDR
  ingredients: string[];
  nutrients: {
    calories: number; // kcal
    protein: number; // g
    fat: number; // g
    carbs: number; // g
    vitamins: string[];
  };
  benefits: string;
  rating: number;
  imageUrl?: string;
  isPopular?: boolean;
}

export interface MealSlot {
  day: "Senin" | "Selasa" | "Rabu" | "Kamis" | "Jumat" | "Sabtu" | "Minggu";
  time: "Pagi";
  menuItemId: string; // Can be empty or actual menu ID
  cups?: number; // Optional number of cups
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string; // e.g., "Ibunda dari Kenzo (7 bulan)"
  avatar: string;
  comment: string;
  rating: number;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

export interface SaffaStand {
  id: string;
  name: string;
  phone: string;
  location: string;
}

export interface ConsultPayload {
  babyName: string;
  babyAgeMonths: number;
  babyWeightKg: number;
  healthConcerns: string; // picky eater, constipation, starting first solid, allergy
  allergyNotes: string;
}
