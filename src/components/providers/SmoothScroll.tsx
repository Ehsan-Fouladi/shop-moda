"use client";

import { PropsWithChildren, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export default function SmoothScroll({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.2,
      lerp: 0.09,
      smoothWheel: true,
      prevent: (node) => {
        let el: HTMLElement | null = node;
        while (el && el !== document.body) {
          if (el.hasAttribute("data-lenis-prevent")) return true;

          const isScrollableTag = el.tagName === "ASIDE";
          const hasScrollClass =
            el.classList.contains("overflow-y-auto") ||
            el.classList.contains("overflow-y-scroll") ||
            el.classList.contains("overflow-auto");

          if (isScrollableTag || hasScrollClass) return true;
          el = el.parentElement;
        }
        return false;
      },
    });

    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current) {
      requestAnimationFrame(() => {
        lenisRef.current?.scrollTo(0, { immediate: true });
      });
    }
  }, [pathname]);

  return <>{children}</>;
}
