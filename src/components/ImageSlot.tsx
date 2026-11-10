"use client";

import Image from "next/image";
import type { ReactNode } from "react";

/*
  A reserved space for artwork.

  Pass `src` and it renders the real image. Leave it off and it renders
  the `fallback` (a designed graphic, never a broken-image box) so the
  site looks finished before any assets exist. In development only, it
  also stamps the expected file path over the fallback so it's obvious
  what to drop where — that badge never ships to production.
*/

interface ImageSlotProps {
  /** Public path, e.g. "/work/01-estate-agency.jpg". Omit until the asset exists. */
  src?: string;
  alt: string;
  /** Where the file belongs — shown as a dev-only hint. */
  slot: string;
  /** CSS aspect-ratio, e.g. "4 / 3". */
  ratio?: string;
  /** Rendered when `src` is absent. */
  fallback?: ReactNode;
  sizes?: string;
  /**
   * The image is on the first screen: load it eagerly and ahead of the rest of
   * the page. Next 16 deprecates next/image's own `priority` for `preload`,
   * which only adds a <link> to the head; an image that is already in the HTML
   * wants the hints on the <img> itself, and that is what Lighthouse checks.
   */
  priority?: boolean;
  className?: string;
  /** Applies the site's duotone treatment over photography. */
  duotone?: boolean;
}

export default function ImageSlot({
  src,
  alt,
  slot,
  ratio = "4 / 3",
  fallback,
  sizes = "(max-width: 900px) 90vw, 45vw",
  priority = false,
  className = "",
  duotone = false,
}: ImageSlotProps) {
  const showHint = process.env.NODE_ENV !== "production" && !src;

  return (
    <div
      className={`image-slot ${duotone ? "image-slot-duotone" : ""} ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          loading={priority ? "eager" : undefined}
          fetchPriority={priority ? "high" : undefined}
          style={{ objectFit: "cover" }}
        />
      ) : (
        <>
          {fallback}
          {showHint && (
            <span className="image-slot-hint">
              <span style={{ color: "var(--flame)" }}>IMAGE →</span> {slot}
            </span>
          )}
        </>
      )}
    </div>
  );
}
