"use client";

import { useCallback, useSyncExternalStore } from "react";

/*
  Client-environment probes.

  These read things that only exist in the browser (media queries, the
  fact that we've hydrated at all). Doing that with useState + useEffect
  means a synchronous setState in an effect, which triggers a cascading
  re-render. useSyncExternalStore is the supported way to read an
  external value during render with an explicit server snapshot.
*/

const noopSubscribe = () => () => {};

/** True only once hydrated in the browser; false during SSR. */
export function useHasMounted(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
}

/** Live media-query result. Returns `serverFallback` during SSR. */
export function useMediaQuery(query: string, serverFallback = false): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    [query]
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => serverFallback
  );
}
