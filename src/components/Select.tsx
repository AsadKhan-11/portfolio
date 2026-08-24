"use client";

import { useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

/*
  Native <select> dropdowns render their open popup in the OS's own
  layer — page CSS can't style it, and it paints over the custom
  cursor entirely (the cursor "disappears" the moment the menu
  opens). This is a fully custom listbox instead, so it inherits the
  site's cursor and dark styling like everything else.
*/
export default function Select({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!open) return;
    listRef.current?.focus();

    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const openList = () => {
    setActiveIndex(Math.max(0, options.indexOf(value)));
    setOpen(true);
  };

  const selectOption = (opt: string) => {
    onChange(opt);
    setOpen(false);
  };

  return (
    <div className="field select-field" data-filled={!!value} ref={rootRef}>
      <label htmlFor={id}>{label}</label>

      <button
        type="button"
        id={id}
        className="select-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openList();
          }
        }}
      >
        <span className="select-value">{value || " "}</span>
      </button>

      <FiChevronDown
        className={`field-caret select-caret${open ? " is-open" : ""}`}
        size={16}
        aria-hidden="true"
      />

      {open && (
        <ul
          ref={listRef}
          className="select-list"
          role="listbox"
          aria-labelledby={id}
          tabIndex={-1}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActiveIndex((i) => Math.min(options.length - 1, i + 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActiveIndex((i) => Math.max(0, i - 1));
            } else if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              if (activeIndex >= 0) selectOption(options[activeIndex]);
            } else if (e.key === "Escape" || e.key === "Tab") {
              setOpen(false);
            }
          }}
        >
          {options.map((opt, i) => (
            <li
              key={opt}
              role="option"
              aria-selected={opt === value}
              className={`select-option${i === activeIndex ? " is-active" : ""}`}
              onMouseEnter={() => setActiveIndex(i)}
              onClick={() => selectOption(opt)}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
