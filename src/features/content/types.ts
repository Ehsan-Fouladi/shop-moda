export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
}

export interface FaqCategory {
  id: string;
  name: string;
}

export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface LegalSection {
  id: string;
  title: string;
  paragraphs: string[];
  list?: string[];
}

export interface LegalDocument {
  slug: string;
  title: string;
  description: string;
  updatedAt: string;
  sections: LegalSection[];
}
