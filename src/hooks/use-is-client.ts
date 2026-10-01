import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * `false` during SSR and hydration, `true` afterwards: for UI that depends on client-only
 * state (e.g. the resolved theme) without a mount effect + extra render.
 */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
