"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

/*
  The 3D backdrops pull in Three.js (~870 KB). Nothing on the first screen
  needs them, so they load once the browser is idle and the headline,
  buttons and navigation have already painted.
*/
const ShaderFieldLazy = dynamic(() => import("./ShaderField"), { ssr: false });
export const HeroFieldLazy = dynamic(() => import("./HeroField"), { ssr: false });

export function useWhenIdle(timeout = 1200) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const go = () => setReady(true);
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(go, { timeout });
      return () => w.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(go, 300);
    return () => window.clearTimeout(id);
  }, [timeout]);
  return ready;
}

export function IdleHeroField() {
  const ready = useWhenIdle();
  return ready ? <HeroFieldLazy /> : null;
}

export function IdleShaderField() {
  const ready = useWhenIdle(2000);
  return ready ? <ShaderFieldLazy /> : null;
}
