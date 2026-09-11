import type { ImsBuildId, ImsPaintId } from "@/content/ims";
import type { Quad } from "@/lib/homography";

export const stillSlugs = ["cab", "hand", "desk"] as const;

export type StillSlug = (typeof stillSlugs)[number];

type StillPlateBase = {
  slug: StillSlug;
  /** Photograph the screen is composited into. */
  plate: string;
  /** File written to public/images by scripts/shoot-stills.mjs. */
  output: string;
  stage: { width: number; height: number };
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
     * Grow the mapped quad past the bezel. Desk only. Phone stills are
     * composited by scripts/composite-phone.py from the photographed glass,
     * not from this expand.
     */
    expand: number;
  };
  alt: string;
  note: string;
  /**
   * When true, `output` is the photograph (capture UI already in the glass).
   * `npm run stills` must not composite over it.
   */
  baked?: boolean;
};

/**
 * Only the phones carry a field build. The hero hand is `pour` (Tuesday).
 * The cab is a capture still and is not that job. The board is the generic
 * system and has no fieldBuild.
 */
export type StillPlate =
  | (StillPlateBase & { device: "phone"; fieldBuild: ImsBuildId })
  | (StillPlateBase & { device: "desk" });

export const stillPlates: Record<StillSlug, StillPlate> = {
  cab: {
    slug: "cab",
    plate: "/images/plates/cab.webp",
    output: "hero-cab.webp",
    stage: { width: 1536, height: 1024 },
    device: "phone",
    fieldBuild: "generic",
    paint: "dusk",
    baked: true,
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
      expand: 0,
    },
    alt: "Overhead in a dusty ute: a work-worn hand holding a phone open to a capture screen, with a paper docket on the other thigh.",
    note: "Demo capture screen in the glass. Not a live customer job, and not the hero's Kemerton day.",
  },
  hand: {
    slug: "hand",
    plate: "/images/plates/hand.webp",
    output: "field-hand.webp",
    stage: { width: 1536, height: 1024 },
    device: "phone",
    fieldBuild: "pour",
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
      expand: 0,
    },
    alt: "A work-worn hand holding a phone open to the demo field app built for a concrete yard: one job, one capture button, and the day's captures underneath.",
    note: "Concrete yard's demo build, in the glass. Not a live customer job.",
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
    alt: "Site-office laptop open on a demo jobs board, with hi-vis, a two-way radio, and paper dockets in a South West office.",
    note: "Demo jobs board. Not a live customer system, and not a named yard.",
  },
};
