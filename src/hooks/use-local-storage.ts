"use client";

import { useCallback, useRef, useSyncExternalStore } from "react";

/*
 * localStorage-backed state shared by every component using the same key (and synced across
 * tabs). Values are checked with `validate` on read, so corrupted or tampered storage falls
 * back to the provided default instead of crashing the UI. `validate` is a plain function rather
 * than a Zod type so callers in the global bundle can use a tiny type guard instead of a library.
 */

const EVENT = "moda:local-storage";

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(EVENT, onChange);
  };
}

function readRaw(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

/** Returns the value when valid, otherwise `null`. */
type StorageValidator<T> = (value: unknown) => T | null;

export function useLocalStorage<T>(
  key: string,
  validate: StorageValidator<T>,
  fallback: T,
) {
  // Cache the parsed value per raw string so getSnapshot stays referentially stable.
  const cache = useRef<{ raw: string | null; value: T }>({
    raw: null,
    value: fallback,
  });

  const getSnapshot = useCallback((): T => {
    const raw = readRaw(key);
    if (raw === null) return fallback;
    if (raw !== cache.current.raw) {
      let value = fallback;
      try {
        value = validate(JSON.parse(raw)) ?? fallback;
      } catch {
        // invalid JSON → fallback
      }
      cache.current = { raw, value };
    }
    return cache.current.value;
  }, [key, validate, fallback]);

  const value = useSyncExternalStore(subscribe, getSnapshot, () => fallback);

  const setValue = useCallback(
    (update: (prev: T) => T) => {
      const next = update(getSnapshot());
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch {
        // storage full / disabled → state simply isn't persisted
      }
      window.dispatchEvent(new Event(EVENT));
    },
    [key, getSnapshot],
  );

  return [value, setValue] as const;
}
