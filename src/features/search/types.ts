/** Minimal, client-safe index used for instant suggestions in the search dialog. */
export interface SearchIndex {
  products: {
    id: string;
    slug: string;
    title: string;
    brand: string;
    price: number;
    image: string;
  }[];
  categories: { id: string; slug: string; name: string }[];
}
