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
     * Grow the mapped quad past the bezel. Desk only. The hero hand is
     * composited by scripts/composite-phone.py. Cab is a baked photograph.
     */
    expand: number;
  };
  alt: string;
  note: string;
  /**
   * When true, `output` is a finished photograph. `npm run stills` must not
   * composite over it. Cab is baked: the field app is native in the glass.
   */
  baked?: boolean;
  /**
   * Unused on the homepage. Lab stills can still shoot a PhoneIms chassis.
   * Omit for the hand, which keys photographed glass.
   */
  frame?: "device";
};

/**
 * Only the phones carry a field build. The hero hand is `pour` (Tuesday).
 * The cab still is atmosphere in that same field-app language. The board
 * is the generic system and has no fieldBuild.
 */
export type StillPlate =
  | (StillPlateBase & { device: "phone"; fieldBuild: ImsBuildId })
  | (StillPlateBase & { device: "desk" });

export const stillPlates: Record<StillSlug, StillPlate> = {
  cab: {
    slug: "cab",
    /* Baked photograph of the ute. The field app is native in the glass, in
       the hero's language. npm run stills must not composite over it. The
       original overhead stays in plates/cab.webp as the composition lock. */
    plate: "/images/plates/cab.webp",
    output: "hero-cab.webp",
    stage: { width: 3072, height: 2304 },
    device: "phone",
    fieldBuild: "pour",
    paint: "dusk",
    baked: true,
    /* Unused. Cab is baked; the compositor does not write this file. */
    screen: { width: 390, height: 844 },
    /* Composition lock from the original plate. Glass is not composited. */
    quad: [
      [460.5, 181.2],
      [764.8, 165.9],
      [499.9, 810.3],
      [805.5, 793.0],
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
    alt: "Overhead in a dusty ute: a work-worn hand holding a phone open to a dusk field app, with a paper docket on the other thigh.",
    note: "Demo field app in the ute, in the hero's language. Not a live customer job.",
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
    note: "Concrete yard's demo build, in the glass. Not a live customer job. Homepage file is cropped to the phone so the glass stays readable.",
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
