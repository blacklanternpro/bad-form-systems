#!/usr/bin/env python3
"""Fail if the cab still is still a glass sticker, or the hand hero is unreadable.

Cab: the photographed iPhone is replaced by a whole PhoneIms dusk device.
A bezel that still matches the original plate is the old glass-warp method.

Hand: the hero crop must put the glass on screen at a size you can read.
"""

from __future__ import annotations

import sys
from pathlib import Path

import cv2
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
IMAGES = ROOT / "public" / "images"

# Outer chassis, not the glass. TL, TR, BL, BR in plate pixels.
CAB_DEVICE_QUAD = np.array(
    [[469.3, 192.8], [757.5, 178.3], [507.7, 805.9], [797.2, 789.4]],
    np.float32,
)
CAB_GLASS_QUAD = np.array(
    [[486.4, 209.9], [742.7, 197.1], [522.5, 787.1], [780.1, 772.3]],
    np.float32,
)
# Photographed chassis still showing. Above this, Capture is sitting in the
# original iPhone instead of replacing it.
CAB_BEZEL_ORIGINAL_MAX = 0.38
CAB_GOLD_MAX = 80
CAB_YELLOW_MIN = 400

# Desktop hero figure is half of 1440, min-height 34rem. The glass has to
# fill that frame the way the sharp walkthrough crop did, not sit at ~300px
# inside a sand plate.
HERO_DESKTOP = (720, 608)
HAND_HERO_PHONE_MIN = 480
HAND_HERO_POS = (0.50, 0.32)


def load_rgb(path: Path) -> np.ndarray:
    return np.array(Image.open(path).convert("RGB"))


def fill_quad(shape: tuple[int, int], quad: np.ndarray, round_px: int) -> np.ndarray:
    cover = np.zeros(shape[:2], np.uint8)
    pts = quad[[0, 1, 3, 2]].astype(np.int32)
    cv2.fillConvexPoly(cover, pts, 255)
    if round_px > 0:
        kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (round_px, round_px))
        cover = cv2.morphologyEx(cover, cv2.MORPH_OPEN, kernel)
    return cover


def cab_bezel_original_fraction(result: np.ndarray, plate: np.ndarray) -> float:
    """How much of the photographed chassis (not the fingers) is still the plate."""
    preview = cv2.resize(result, (plate.shape[1], plate.shape[0]), interpolation=cv2.INTER_AREA)
    device = fill_quad(plate.shape, CAB_DEVICE_QUAD, 37)
    glass = fill_quad(plate.shape, CAB_GLASS_QUAD, 21)
    inner_glass = cv2.erode(glass, np.ones((9, 7), np.uint8))
    bezel = (device > 127) & (inner_glass == 0)
    ys, xs = np.where(device > 127)
    x0, x1 = int(xs.min()), int(xs.max())
    y0, y1 = int(ys.min()), int(ys.max())
    # Thumb on the left and bottom stays photograph. Score the free bezel.
    bezel[:, : int(x0 + 0.22 * (x1 - x0))] = False
    bezel[int(y0 + 0.88 * (y1 - y0)) :, :] = False
    if not bezel.any():
        return 1.0
    diff = np.abs(preview[bezel].astype(np.int16) - plate[bezel].astype(np.int16)).mean(axis=1)
    return float((diff < 10).mean())


def leftover_gold(plate: np.ndarray, result: np.ndarray) -> int:
    preview = cv2.resize(result, (plate.shape[1], plate.shape[0]), interpolation=cv2.INTER_AREA)
    glass = fill_quad(plate.shape, CAB_GLASS_QUAD, 21)
    hsv_p = cv2.cvtColor(plate, cv2.COLOR_RGB2HSV)
    hsv_r = cv2.cvtColor(preview, cv2.COLOR_RGB2HSV)
    was_gold = (
        (hsv_p[:, :, 0] > 10)
        & (hsv_p[:, :, 0] < 30)
        & (hsv_p[:, :, 1] > 80)
        & (hsv_p[:, :, 2] > 70)
    )
    still_gold = (
        (hsv_r[:, :, 0] > 10)
        & (hsv_r[:, :, 0] < 30)
        & (hsv_r[:, :, 1] > 80)
        & (hsv_r[:, :, 2] > 70)
    )
    return int((was_gold & still_gold & (glass > 127)).sum())


def dusk_yellow_count(result: np.ndarray, plate_shape: tuple[int, int]) -> int:
    preview = cv2.resize(result, (plate_shape[1], plate_shape[0]), interpolation=cv2.INTER_AREA)
    device = fill_quad(plate_shape, CAB_DEVICE_QUAD, 37)
    hsv = cv2.cvtColor(preview, cv2.COLOR_RGB2HSV)
    yellow = (
        (hsv[:, :, 0] > 20)
        & (hsv[:, :, 0] < 40)
        & (hsv[:, :, 1] > 120)
        & (hsv[:, :, 2] > 140)
        & (device > 127)
    )
    return int(yellow.sum())


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
    bezel = cab_bezel_original_fraction(cab, plate)
    gold = leftover_gold(plate, cab)
    yellow = dusk_yellow_count(cab, plate.shape)
    print(
        f"cab bezel original={bezel:.3f} max={CAB_BEZEL_ORIGINAL_MAX} "
        f"leftover-gold={gold} yellow={yellow}"
    )
    if bezel > CAB_BEZEL_ORIGINAL_MAX:
        print(
            "FAIL cab: photographed chassis still showing. "
            "Capture is sitting in the original iPhone, not replacing it."
        )
        failed += 1
    if gold > CAB_GOLD_MAX:
        print("FAIL cab: original gold UI is still in the glass.")
        failed += 1
    if yellow < CAB_YELLOW_MIN:
        print("FAIL cab: dusk Capture chrome is missing from the dropped phone.")
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
