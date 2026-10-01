"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

/** Header search — submits to the search results page (UI only). */

export function SearchBar({
  className,
  autoFocusId,
  defaultValue = "",
}: {
  className?: string;
  autoFocusId?: string;
  defaultValue?: string;
}) {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const q = (formData.get("q") as string)?.trim();

    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className={cn("relative w-full", className)}
    >
      <label htmlFor={autoFocusId ?? "site-search"} className="sr-only">
        جستجو در محصولات
      </label>
      <Search
        className="pointer-events-none absolute top-1/2 start-3.5 h-4.5 w-4.5 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <Input
        key={defaultValue}
        id={autoFocusId ?? "site-search"}
        type="search"
        name="q"
        defaultValue={defaultValue}
        placeholder="جستجو در مُدا… مثلاً پالتو زنانه"
        className="h-11 rounded-lg border-input bg-muted/50 ps-11 pe-24 text-sm placeholder:text-muted-foreground focus-visible:bg-card"
      />
      <Button
        type="submit"
        size="sm"
        className="absolute top-1/2 end-1.5 h-8 -translate-y-1/2 rounded-md px-3"
      >
        جستجو
      </Button>
    </form>
  );
}

// export function SearchBar({
//   className,
//   autoFocusId,
//   defaultValue = "",
// }: {
//   className?: string;
//   autoFocusId?: string;
//   defaultValue?: string;
// }) {
//   const router = useRouter();
//   const [query, setQuery] = React.useState(defaultValue);
//   // Follow URL-driven changes of `defaultValue` without remounting (keeps focus).
//   const [prevDefault, setPrevDefault] = React.useState(defaultValue);
//   if (defaultValue !== prevDefault) {
//     setPrevDefault(defaultValue);
//     setQuery(defaultValue);
//   }

//   const onSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const q = query.trim();
//     router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
//   };

//   return (
//     <form onSubmit={onSubmit} role="search" className={cn("relative w-full", className)}>
//       <label htmlFor={autoFocusId ?? "site-search"} className="sr-only">
//         جستجو در محصولات
//       </label>
//       <Search
//         className="pointer-events-none absolute top-1/2 start-3.5 h-4.5 w-4.5 -translate-y-1/2 text-muted-foreground"
//         aria-hidden="true"
//       />
//       <Input
//         id={autoFocusId ?? "site-search"}
//         type="search"
//         name="q"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         placeholder="جستجو در مُدا… مثلاً پالتو زنانه"
//         className="h-11 rounded-lg border-input bg-muted/50 ps-11 pe-24 text-sm placeholder:text-muted-foreground focus-visible:bg-card"
//       />
//       <Button
//         type="submit"
//         size="sm"
//         className="absolute top-1/2 end-1.5 h-8 -translate-y-1/2 rounded-md px-3"
//       >
//         جستجو
//       </Button>
//     </form>
//   );
// }
