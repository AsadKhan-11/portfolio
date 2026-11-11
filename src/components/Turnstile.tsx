"use client";

import { useEffect, useRef } from "react";
import { TURNSTILE_SITE_KEY } from "@/lib/contactFields";

declare global {
  interface Window {
    turnstile?: {
      render(el: HTMLElement, options: Record<string, unknown>): string;
      remove(id: string): void;
    };
  }
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

/*
  The Cloudflare Turnstile bot check. In "interaction-only" mode it runs
  invisibly and shows itself only if Cloudflare wants the visitor to prove
  something, so most people never see it. It reports a one-use token through
  onToken (an empty string when the token expires or the check errors); the
  form sends the token and the Worker verifies it. Remount it (change its
  key) to get a fresh token after a submit.
*/
export default function Turnstile({ onToken }: { onToken: (token: string) => void }) {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let widget: string | undefined;
    let gone = false;

    const mount = () => {
      if (gone || widget || !box.current || !window.turnstile) return;
      widget = window.turnstile.render(box.current, {
        sitekey: TURNSTILE_SITE_KEY,
        theme: "dark",
        appearance: "interaction-only",
        callback: (t: string) => onToken(t),
        "expired-callback": () => onToken(""),
        "error-callback": () => onToken(""),
      });
    };

    if (window.turnstile) {
      mount();
    } else {
      let script = document.querySelector<HTMLScriptElement>("script[data-turnstile]");
      if (!script) {
        script = document.createElement("script");
        script.src = SCRIPT_SRC;
        script.async = true;
        script.dataset.turnstile = "1";
        document.head.appendChild(script);
      }
      script.addEventListener("load", mount);
    }

    return () => {
      gone = true;
      if (widget && window.turnstile) window.turnstile.remove(widget);
    };
  }, [onToken]);

  return <div ref={box} className="turnstile" />;
}
