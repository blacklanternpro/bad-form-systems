#!/usr/bin/env python3
"""Fail if the cab still is a CSS phone drop, or the hand hero is unreadable.

Cab is a baked photograph. The field app is native in the glass. Fail if
the file is missing, too small for the product-band crop, or still the
original ute with a hard rectangular HTML phone sitting in the hand.

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

CAB_MIN_WIDTH = 2000
CAB_MIN_HEIGHT = 1500

# Outer chassis on the original plate. A CSS PhoneIms drop keeps those
# ute pixels. A native photograph does not.
CAB_DEVICE_QUAD = np.array(
    [[460.5, 181.2], [764.8, 165.9], [499.9, 810.3], [805.5, 793.0]],
    np.float32,
)
# CSS drop onto the plate is ~0.4. A native photograph of the same ute is ~18.
CAB_PLATE_MAD_MIN = 4.0

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


def html_drop_mad(cab: np.ndarray, plate: np.ndarray) -> float:
    """Mean absolute difference outside the original device quad.

    A rectangular HTML drop keeps the original ute. A native photograph
    re-renders the jeans, docket, and boots.
    """
    preview = cv2.resize(cab, (plate.shape[1], plate.shape[0]), interpolation=cv2.INTER_AREA)
    device = fill_quad(plate.shape, CAB_DEVICE_QUAD, 41)
    device = cv2.dilate(device, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (31, 31)))
    outside = device == 0
    diff = np.abs(preview.astype(np.int16) - plate.astype(np.int16)).mean(axis=2)
    return float(diff[outside].mean())


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
    ch, cw = cab.shape[0], cab.shape[1]
    print(f"cab baked photograph {cw}x{ch} min={CAB_MIN_WIDTH}x{CAB_MIN_HEIGHT}")
    if cw < CAB_MIN_WIDTH or ch < CAB_MIN_HEIGHT:
        print("FAIL cab: baked still is too small for the product-band crop.")
        failed += 1

    mad = html_drop_mad(cab, plate)
    print(f"cab plate-mad-outside-phone={mad:.2f} min={CAB_PLATE_MAD_MIN}")
    if mad < CAB_PLATE_MAD_MIN:
        print(
            "FAIL cab: still is the original photograph with a rectangular HTML "
            "phone dropped in. The cab still has to be a native photograph."
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
