#!/usr/bin/env python3
"""Fail if the shipped phone stills are a sticker (cab) or an unreadably small hero (hand).

Cab: Capture must replace the photographed glass to the bezel. A rim that still
matches the original plate is the pasted-screenshot look.

Hand: the hero crop must put the glass on screen at a size you can read. The
2x composite is already sharp; a 90px phone on the page is not.
"""

from __future__ import annotations

import sys
from pathlib import Path

import cv2
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
IMAGES = ROOT / "public" / "images"

CAB_QUAD = np.array(
    [[486.4, 209.9], [742.7, 197.1], [522.5, 787.1], [780.1, 772.3]],
    np.float32,
)
# Mid-height glass rim that still matches the original plate. Above this, the
# new UI is sitting inside the photographed screen instead of replacing it.
CAB_RIM_ORIGINAL_MAX = 0.28

# Desktop hero figure is half of 1440, min-height 34rem. The glass has to
# fill that frame the way the sharp walkthrough crop did, not sit at ~300px
# inside a sand plate.
HERO_DESKTOP = (720, 608)
HAND_HERO_PHONE_MIN = 480
HAND_HERO_POS = (0.50, 0.32)


def load_rgb(path: Path) -> np.ndarray:
    return np.array(Image.open(path).convert("RGB"))


def cab_mask(h: int, w: int) -> np.ndarray:
    cover = np.zeros((h, w), np.uint8)
    pts = CAB_QUAD[[0, 1, 3, 2]].astype(np.int32)
    cv2.fillConvexPoly(cover, pts, 255)
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (21, 21))
    glass = cv2.morphologyEx(cover, cv2.MORPH_OPEN, kernel)
    grow = 6
    return cv2.dilate(
        glass,
        cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (grow * 2 + 1, grow * 2 + 1)),
    )


def cab_rim_original_fraction(result: np.ndarray, plate: np.ndarray, mask: np.ndarray) -> float:
    preview = cv2.resize(result, (plate.shape[1], plate.shape[0]), interpolation=cv2.INTER_AREA)
    inner = cv2.erode(mask, np.ones((7, 7), np.uint8))
    band = (mask > 127) & (inner == 0)
    ys, _ = np.where(mask > 127)
    y0, y1 = int(ys.min()), int(ys.max())
    h = y1 - y0
    band[: int(y0 + 0.12 * h)] = False
    band[int(y0 + 0.88 * h) :] = False
    if not band.any():
        return 1.0
    diff = np.abs(preview[band].astype(np.int16) - plate[band].astype(np.int16)).mean(axis=1)
    return float((diff < 8).mean())


def cover_window(image: np.ndarray, viewport: tuple[int, int], pos: tuple[float, float]):
    ih, iw = image.shape[:2]
    vw, vh = viewport
    scale = max(vw / iw, vh / ih)
    left = (iw * scale - vw) * pos[0] / scale
    top = (ih * scale - vh) * pos[1] / scale
    return scale, int(left), int(top), int(left + vw / scale), int(top + vh / scale)


def glass_width_in_hero(image: np.ndarray, viewport: tuple[int, int], pos: tuple[float, float]) -> float:
    """Width of the composited glass after the homepage object-cover crop."""
    dark = (np.mean(image, axis=2) < 70).astype(np.uint8) * 255
    count, labels, stats, _ = cv2.connectedComponentsWithStats(dark, 8)
    if count <= 1:
        return 0.0
    index = 1 + int(np.argmax(stats[1:, cv2.CC_STAT_AREA]))
    glass_w = float(stats[index, cv2.CC_STAT_WIDTH])
    scale, *_ = cover_window(image, viewport, pos)
    return glass_w * scale


def main() -> int:
    failed = 0

    cab_path = IMAGES / "hero-cab.webp"
    plate_path = IMAGES / "plates" / "cab.webp"
    hand_path = IMAGES / "field-hand.webp"
    for path in (cab_path, plate_path, hand_path):
        if not path.exists():
            print(f"FAIL missing {path.relative_to(ROOT)}")
            return 1

    cab = load_rgb(cab_path)
    plate = load_rgb(plate_path)
    mask = cab_mask(plate.shape[0], plate.shape[1])
    rim = cab_rim_original_fraction(cab, plate, mask)
    print(f"cab rim original={rim:.3f} max={CAB_RIM_ORIGINAL_MAX}")
    if rim > CAB_RIM_ORIGINAL_MAX:
        print(
            "FAIL cab: photographed glass still showing at the rim. "
            "Capture is sitting inside the screen, not replacing it."
        )
        failed += 1

    hand = load_rgb(hand_path)
    width = glass_width_in_hero(hand, HERO_DESKTOP, HAND_HERO_POS)
    print(f"hand hero phone width={width:.1f}px min={HAND_HERO_PHONE_MIN} at {HERO_DESKTOP}")
    if width < HAND_HERO_PHONE_MIN:
        print(
            "FAIL hand: hero crop leaves the field app too small to read. "
            "The sharp composite is in the file; the page is not showing it."
        )
        failed += 1

    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
