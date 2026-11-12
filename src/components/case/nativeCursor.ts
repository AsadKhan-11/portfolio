import { useEffect, type RefObject } from "react";

/*
  The site draws its own cursor (a dot and a ring) and hides the real one. A
  frame holding another page swallows the pointer events, so inside it the
  ring would sit frozen where the pointer entered, over a page that has its own
  cursor. While the pointer is over the element this is given, the custom
  cursor steps aside and the real one is used: the frame's page then shows its
  arrow or hand as usual (see body[data-native-cursor] in globals.css).

  Plain DOM listeners rather than React's onMouseEnter, which works out
  "entered" from a pair of events and can miss an entry that goes straight
  into a frame.
*/
export function useNativeCursor(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const on = () => {
      document.body.dataset.nativeCursor = "true";
    };
    const off = () => {
      delete document.body.dataset.nativeCursor;
    };

    el.addEventListener("pointerenter", on);
    el.addEventListener("mouseenter", on);
    el.addEventListener("pointerleave", off);
    el.addEventListener("mouseleave", off);
    return () => {
      el.removeEventListener("pointerenter", on);
      el.removeEventListener("mouseenter", on);
      el.removeEventListener("pointerleave", off);
      el.removeEventListener("mouseleave", off);
      off();
    };
  }, [ref]);
}
