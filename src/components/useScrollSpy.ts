"use client";

import { useEffect, useState } from "react";

/*
  Which of a page's sections is being read. A section counts as reached once
  its top has passed a line about a third of the way down the screen, and the
  one being read is the last section reached. A sticky list of links (the FAQ
  categories, the table of contents of a legal page) uses it to highlight
  where the reader is. Pass the section ids in page order.
*/
export function useScrollSpy(ids: string[]) {
  const key = ids.join("|");
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const list = key.split("|").filter(Boolean);
    const update = () => {
      const line = window.innerHeight * 0.33;
      let current = list[0];
      for (const id of list) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };

    /* Cheap enough to run on every scroll event: it reads a handful of positions,
       and setting the same id again does not re-render. */
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [key]);

  return [active, setActive] as const;
}
