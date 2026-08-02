"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/* ─────────────────────────────────────────────
   SplitText — word-by-word mask reveal.
   Each word sits in an overflow-hidden box and
   slides up from below. Reads as typeset motion
   rather than a fade.
   ───────────────────────────────────────────── */
interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  style?: CSSProperties;
  as?: "span" | "div";
}

export function SplitText({
  text,
  className = "",
  delay = 0,
  stagger = 0.055,
  style,
  as = "span",
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });
  const Tag = motion[as];

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={className}
      style={{ display: "inline-block", ...style }}
      aria-label={text}
    >
      {text.split(" ").map((word, i) => (
        <span
          key={`${word}-${i}`}
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "bottom",
            paddingBottom: "0.08em",
          }}
          aria-hidden="true"
        >
          <motion.span
            style={{ display: "inline-block", willChange: "transform" }}
            initial={{ y: "115%" }}
            animate={inView ? { y: 0 } : { y: "115%" }}
            transition={{
              duration: 0.9,
              delay: delay + i * stagger,
              ease: EASE_OUT_EXPO,
            }}
          >
            {word}
            {i < text.split(" ").length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/* ─────────────────────────────────────────────
   Reveal — single mask slide for any block.
   ───────────────────────────────────────────── */
interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  style?: CSSProperties;
  once?: boolean;
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 28,
  style,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-8%" });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.95, delay, ease: EASE_OUT_EXPO }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Stagger helpers
   ───────────────────────────────────────────── */
export function Stagger({
  children,
  className = "",
  gap = 0.09,
  style,
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-6%" });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial="hide"
      animate={inView ? "show" : "hide"}
      variants={{ hide: {}, show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      variants={{
        hide: { opacity: 0, y: 34 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.9, ease: EASE_OUT_EXPO },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Magnetic — element leans toward the cursor and
   springs back on exit.
   ───────────────────────────────────────────── */
export function Magnetic({
  children,
  className = "",
  strength = 0.35,
  style,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.6 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy, display: "inline-block", ...style }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Parallax — drifts with scroll.
   ───────────────────────────────────────────── */
export function Parallax({
  children,
  className = "",
  speed = 0.3,
  style,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [120 * speed, -120 * speed]);
  const y = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.5 });

  return (
    <motion.div ref={ref} className={className} style={{ y, ...style }}>
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Counter — counts up once in view.
   ───────────────────────────────────────────── */
export function Counter({
  to,
  suffix = "",
  duration = 1.8,
  className = "",
}: {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const t0 = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const p = Math.min((now - t0) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {n}
      {suffix}
    </span>
  );
}

/* ─────────────────────────────────────────────
   Marquee — seamless infinite ticker. Duplicates
   its children and translates by exactly 50%.
   ───────────────────────────────────────────── */
export function Marquee({
  children,
  speed = 38,
  reverse = false,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{ overflow: "hidden", width: "100%" }}
      aria-hidden="true"
    >
      <motion.div
        className="marquee"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        <div style={{ display: "flex", flexShrink: 0 }}>{children}</div>
        <div style={{ display: "flex", flexShrink: 0 }}>{children}</div>
      </motion.div>
    </div>
  );
}
