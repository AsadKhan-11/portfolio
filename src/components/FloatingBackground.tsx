"use client";

import { motion } from "framer-motion";

/*
  Floating gradient blobs + small geometric shapes.
  Pure CSS animations — no canvas, ultra-smooth, zero jank.
  Fixed position so they persist across all sections.
*/

const BLOBS = [
  // Large ambient blobs
  { size: 600, x: "10%", y: "5%", color: "99,102,241", opacity: 0.06, duration: 28, delay: 0 },
  { size: 500, x: "75%", y: "15%", color: "34,211,238", opacity: 0.04, duration: 32, delay: 2 },
  { size: 450, x: "20%", y: "45%", color: "129,140,248", opacity: 0.05, duration: 25, delay: 4 },
  { size: 550, x: "80%", y: "55%", color: "99,102,241", opacity: 0.04, duration: 30, delay: 1 },
  { size: 400, x: "50%", y: "80%", color: "34,211,238", opacity: 0.035, duration: 35, delay: 3 },
  { size: 350, x: "5%", y: "75%", color: "251,113,133", opacity: 0.025, duration: 27, delay: 5 },
];

const SHAPES = [
  // Small floating geometric shapes
  { type: "diamond", size: 12, x: "15%", y: "20%", color: "129,140,248", opacity: 0.2, duration: 18, delay: 0 },
  { type: "circle", size: 8, x: "85%", y: "12%", color: "34,211,238", opacity: 0.25, duration: 22, delay: 1 },
  { type: "diamond", size: 10, x: "70%", y: "35%", color: "99,102,241", opacity: 0.15, duration: 20, delay: 3 },
  { type: "circle", size: 6, x: "25%", y: "60%", color: "129,140,248", opacity: 0.2, duration: 24, delay: 2 },
  { type: "triangle", size: 14, x: "90%", y: "50%", color: "34,211,238", opacity: 0.12, duration: 19, delay: 4 },
  { type: "circle", size: 10, x: "45%", y: "25%", color: "251,113,133", opacity: 0.12, duration: 26, delay: 1.5 },
  { type: "diamond", size: 8, x: "60%", y: "70%", color: "99,102,241", opacity: 0.18, duration: 21, delay: 0.5 },
  { type: "circle", size: 5, x: "10%", y: "40%", color: "34,211,238", opacity: 0.22, duration: 17, delay: 3.5 },
  { type: "triangle", size: 11, x: "35%", y: "85%", color: "129,140,248", opacity: 0.1, duration: 23, delay: 2.5 },
  { type: "circle", size: 7, x: "78%", y: "80%", color: "251,113,133", opacity: 0.15, duration: 20, delay: 1 },
  { type: "diamond", size: 6, x: "55%", y: "10%", color: "99,102,241", opacity: 0.2, duration: 25, delay: 4.5 },
  { type: "circle", size: 9, x: "40%", y: "50%", color: "34,211,238", opacity: 0.12, duration: 28, delay: 0 },
];

function ShapeElement({
  type,
  size,
  color,
}: {
  type: string;
  size: number;
  color: string;
}) {
  if (type === "diamond") {
    return (
      <div
        style={{
          width: size,
          height: size,
          transform: "rotate(45deg)",
          border: `1px solid rgba(${color}, 0.6)`,
          borderRadius: 2,
        }}
      />
    );
  }
  if (type === "triangle") {
    return (
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: `${size / 2}px solid transparent`,
          borderRight: `${size / 2}px solid transparent`,
          borderBottom: `${size}px solid rgba(${color}, 0.4)`,
        }}
      />
    );
  }
  // circle
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `rgba(${color}, 0.5)`,
        boxShadow: `0 0 ${size * 2}px rgba(${color}, 0.3)`,
      }}
    />
  );
}

export default function FloatingBackground() {
  return (
    <div className="floating-bg" aria-hidden="true">
      {/* Large gradient blobs */}
      {BLOBS.map((blob, i) => (
        <div
          key={`blob-${i}`}
          className="floating-blob"
          style={{
            width: blob.size,
            height: blob.size,
            left: blob.x,
            top: blob.y,
            background: `radial-gradient(circle, rgba(${blob.color}, ${blob.opacity}) 0%, transparent 70%)`,
            animationDuration: `${blob.duration}s`,
            animationDelay: `${blob.delay}s`,
          }}
        />
      ))}

      {/* Small floating geometric shapes */}
      {SHAPES.map((shape, i) => (
        <motion.div
          key={`shape-${i}`}
          className="floating-shape"
          style={{
            position: "absolute",
            left: shape.x,
            top: shape.y,
            opacity: shape.opacity,
          }}
          animate={{
            y: [0, -20, 5, -15, 0],
            x: [0, 10, -5, 8, 0],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: shape.delay,
          }}
        >
          <ShapeElement
            type={shape.type}
            size={shape.size}
            color={shape.color}
          />
        </motion.div>
      ))}

      {/* Vignette overlay */}
      <div className="floating-bg-vignette" />
    </div>
  );
}
