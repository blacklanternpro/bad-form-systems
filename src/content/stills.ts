import type { ImsPaintId } from "@/content/ims";
import type { Quad } from "@/lib/homography";

export const stillSlugs = ["cab", "hand", "desk"] as const;

export type StillSlug = (typeof stillSlugs)[number];

export type StillPlate = {
  slug: StillSlug;
  /** Photograph the screen is composited into. */
  plate: string;
  /** File written to public/images by scripts/shoot-stills.mjs. */
  output: string;
  stage: { width: number; height: number };
  device: "phone" | "desk";
  paint: ImsPaintId;
  screen: { width: number; height: number };
  /** Screen corners in stage pixels: top-left, top-right, bottom-left, bottom-right. */
  quad: Quad;
  glass: {
    /** Screen brightness against the photograph, 1 is untouched. */
    brightness: number;
    /** Warmth of the emitted light, matched to the plate's colour temperature. */
    tint: string;
    tintOpacity: number;
    /** Softness in stage pixels, matched to the plate's focus. */
    blur: number;
    sheenOpacity: number;
    /** Light spill from the screen onto the surrounding photograph. */
    spillOpacity: number;
    spillBlur: number;
    /**
     * Grow the mapped quad past the bezel. Phones must stay at 0: the glass is
     * rounded and notched, so expanding a rectangle puts UI on the chassis.
     */
    expand: number;
  };
  alt: string;
  note: string;
};

export const stillPlates: Record<StillSlug, StillPlate> = {
  cab: {
    slug: "cab",
    plate: "/images/plates/cab.webp",
    output: "hero-cab.webp",
    stage: { width: 1536, height: 1024 },
    device: "phone",
    paint: "dusk",
    screen: { width: 390, height: 844 },
    quad: [
      [486.4, 209.9],
      [742.7, 197.1],
      [522.5, 787.1],
      [780.1, 772.3],
    ],
    glass: {
      brightness: 1.02,
      tint: "#f0d9a8",
      tintOpacity: 0.06,
      blur: 0.2,
      sheenOpacity: 0.1,
      spillOpacity: 0.16,
      spillBlur: 26,
      expand: 3,
    },
    alt: "Overhead in a dusty ute: a work-worn hand holding a phone open to the demo field app, with a paper docket on the other thigh.",
    note: "Demo field app in the glass. Not a live customer job.",
  },
  hand: {
    slug: "hand",
    plate: "/images/plates/hand.webp",
    output: "field-hand.webp",
    stage: { width: 1536, height: 1024 },
    device: "phone",
    paint: "dusk",
    screen: { width: 390, height: 844 },
    quad: [
      [652.7, 99.8],
      [983.5, 49.5],
      [803.4, 849.2],
      [1145.4, 791.1],
    ],
    glass: {
      brightness: 1.04,
      tint: "#ffe9c2",
      tintOpacity: 0.05,
      blur: 0.15,
      sheenOpacity: 0.13,
      spillOpacity: 0.1,
      spillBlur: 30,
      expand: 4,
    },
    alt: "A work-worn hand holding a phone open to the demo field app: one job, one capture button, and the day's captures underneath.",
    note: "Demo field app in the glass. Not a live customer job.",
  },
  desk: {
    slug: "desk",
    plate: "/images/plates/desk.webp",
    output: "office-ims.webp",
    stage: { width: 1536, height: 1024 },
    device: "desk",
    paint: "day",
    screen: { width: 1440, height: 810 },
    quad: [
      [724.9, 213.8],
      [1555.1, 198.2],
      [701.1, 666.7],
      [1517.3, 758.4],
    ],
    glass: {
      brightness: 1.0,
      tint: "#dbe6f5",
      tintOpacity: 0.05,
      blur: 0.4,
      sheenOpacity: 0.07,
      spillOpacity: 0.08,
      spillBlur: 34,
      expand: 1,
    },
    alt: "Site-office laptop open on the demo jobs board, with hi-vis, a two-way radio, and paper dockets in a South West yard office.",
    note: "Demo jobs board in the glass. Not a live customer system.",
  },
};
