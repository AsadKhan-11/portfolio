"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/*
  Framer Motion does not follow the OS reduced-motion setting on its own.
  "user" makes it honour the preference: transform and layout animations
  snap straight to their end value while opacity fades still run, so the
  page reads as calm rather than broken — nothing stays stuck off-screen
  behind a mask.
*/
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
