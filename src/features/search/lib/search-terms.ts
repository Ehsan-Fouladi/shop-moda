export const trendingSearches = [
  "پالتو زنانه",
  "کفش رانینگ",
  "کیف چرم",
  "ساعت مچی",
  "عطر",
  "هودی مردانه",
];

/** Shown until the visitor has searched for something themselves. */
export const DEFAULT_RECENT_SEARCHES = [
  "مانتو پاییزه",
  "اسنیکر سفید",
  "کرم آبرسان",
];

export const MAX_RECENT_SEARCHES = 8;

export function searchHref(term: string): string {
  return `/search?q=${encodeURIComponent(term)}`;
}
