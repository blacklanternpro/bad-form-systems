#!/usr/bin/env python3
"""Sit the real field app in the photographed iPhone glass.

A CSS 4-point warp maps a rectangle onto four corners. Photographed iPhone
glass is a rounded rect with a notch, already filled with a different UI.
Guessing that silhouette in SVG stays a few pixels off, which is obvious.

This does what Photoshop does in fifteen minutes: take the pixels that
already make up the screen in the plate, use them as the mask, and warp a
screenshot of PhoneIms into that exact region. The image model never draws
the product UI.

Usage:
  python3 scripts/composite-phone.py --ui /tmp/phone-dusk.png
  python3 scripts/composite-phone.py --ui /tmp/phone-dusk.png hand cab
  python3 scripts/composite-phone.py --ui /tmp/phone-dusk.png --debug-dir /tmp/glass
"""

from __future__ import annotations

import argparse
import shutil
import subprocess
from pathlib import Path

import cv2
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
IMAGES = ROOT / "public" / "images"

PLATES = {
    "hand": {
        "plate": IMAGES / "plates" / "hand.webp",
        "output": IMAGES / "field-hand.webp",
        "kind": "hand",
        "brightness": 1.05,
        "feather": 0.9,
        "close": 11,
        "dilate": 2,
    },
    "cab": {
        "plate": IMAGES / "plates" / "cab.webp",
        "output": IMAGES / "hero-cab.webp",
        "kind": "cab",
        "quad": [(486.4, 209.9), (742.7, 197.1), (780.1, 772.3), (522.5, 787.1)],
        "brightness": 1.02,
        "feather": 1.0,
        "close": 15,
        "dilate": 4,
    },
}


def load_rgb(path: Path) -> np.ndarray:
    image = Image.open(path).convert("RGB")
    return np.array(image)


def write_webp(rgb: np.ndarray, dest: Path, quality: int = 88) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    png = dest.with_suffix(".png")
    Image.fromarray(rgb).save(png)
    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-i",
            str(png),
            "-quality",
            str(quality),
            "-frames:v",
            "1",
            str(dest),
        ],
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    png.unlink()


def keep_largest(mask: np.ndarray) -> np.ndarray:
    count, labels, stats, _ = cv2.connectedComponentsWithStats(mask.astype(np.uint8), 8)
    if count <= 1:
        return mask.astype(np.uint8)
    index = 1 + int(np.argmax(stats[1:, cv2.CC_STAT_AREA]))
    return np.where(labels == index, 255, 0).astype(np.uint8)


def fill_small_holes(mask: np.ndarray, max_area: int) -> np.ndarray:
    inverse = np.where(mask == 0, 255, 0).astype(np.uint8)
    count, labels, stats, _ = cv2.connectedComponentsWithStats(inverse, 8)
    out = mask.copy()
    for i in range(1, count):
        component = labels == i
        touches = (
            component[0].any()
            or component[-1].any()
            or component[:, 0].any()
            or component[:, -1].any()
        )
        if not touches and stats[i, cv2.CC_STAT_AREA] <= max_area:
            out[component] = 255
    return out


def mask_hand(plate: np.ndarray, close: int, dilate: int) -> np.ndarray:
    hsv = cv2.cvtColor(plate, cv2.COLOR_RGB2HSV)
    hue, sat, val = hsv[:, :, 0], hsv[:, :, 1], hsv[:, :, 2]
    red, _, blue = plate[:, :, 0], plate[:, :, 1], plate[:, :, 2]
    warm = red.astype(np.int16) - blue.astype(np.int16)

    # The original generated UI is saturated blue chrome on near-white cards.
    # Cream sand and skin are warm; the black bezel is too dark to pass these gates.
    is_blue = (hue > 95) & (hue < 135) & (sat > 80) & (blue > 80)
    is_white = (sat < 35) & (val > 190) & (warm < 30)
    is_light = (val > 160) & (sat < 50) & (warm < 35)
    mask = keep_largest(((is_blue | is_white | is_light).astype(np.uint8) * 255))
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (close, close))
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)
    mask = keep_largest(mask)
    mask = fill_small_holes(mask, 600)
    if dilate > 0:
        mask = cv2.dilate(mask, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (dilate * 2 + 1, dilate * 2 + 1)))
    return mask


def notch_in_ui_space(ui_w: int, ui_h: int) -> np.ndarray:
    """iPhone-style notch in the same pixel space as the UI screenshot."""
    sx = ui_w / 390.0
    sy = ui_h / 844.0
    mask = np.zeros((ui_h, ui_w), np.uint8)
    x = int(91 * sx)
    width = int(208 * sx)
    height = int(34 * sy)
    radius = max(2, int(16 * sx))
    cv2.rectangle(mask, (x, 0), (x + width, height - radius), 255, -1)
    cv2.circle(mask, (x + radius, height - radius), radius, 255, -1)
    cv2.circle(mask, (x + width - radius, height - radius), radius, 255, -1)
    cv2.rectangle(mask, (x + radius, height - radius), (x + width - radius, height), 255, -1)
    return mask


def warp_gray(gray: np.ndarray, plate_shape: tuple[int, int], quad: np.ndarray) -> np.ndarray:
    height, width = gray.shape[:2]
    src = np.array(
        [[0, 0], [width - 1, 0], [0, height - 1], [width - 1, height - 1]],
        np.float32,
    )
    matrix = cv2.getPerspectiveTransform(src, quad)
    return cv2.warpPerspective(
        gray,
        matrix,
        (plate_shape[1], plate_shape[0]),
        flags=cv2.INTER_LINEAR,
        borderMode=cv2.BORDER_CONSTANT,
        borderValue=0,
    )


def punch_cab_notch(mask: np.ndarray, ui_shape: tuple[int, ...], quad: np.ndarray) -> np.ndarray:
    notch = warp_gray(notch_in_ui_space(ui_shape[1], ui_shape[0]), mask.shape, quad)
    notch = cv2.dilate(notch, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5)))
    out = mask.copy()
    out[notch > 80] = 0
    return out


def mask_cab(plate: np.ndarray, quad: list, close: int, dilate: int) -> np.ndarray:
    # Dark navy against a black bezel will not chroma-key. GrabCut, started
    # from the measured screen quad, finds the glass; a convex hull then fills
    # the ragged tab-bar bite. Overshoot onto the black bezel is invisible.
    # Under-coverage would leave the original gold tab bar showing, which is not.
    hint = np.array(quad, np.int32)
    grab = np.full(plate.shape[:2], cv2.GC_BGD, np.uint8)
    centre = hint.astype(np.float32).mean(axis=0)
    expand = (centre + 1.14 * (hint.astype(np.float32) - centre)).astype(np.int32)
    inset = (centre + 0.68 * (hint.astype(np.float32) - centre)).astype(np.int32)
    cv2.fillConvexPoly(grab, expand, cv2.GC_PR_BGD)
    cv2.fillConvexPoly(grab, hint, cv2.GC_PR_FGD)
    cv2.fillConvexPoly(grab, inset, cv2.GC_FGD)

    bgd = np.zeros((1, 65), np.float64)
    fgd = np.zeros((1, 65), np.float64)
    cv2.grabCut(plate, grab, None, bgd, fgd, 7, cv2.GC_INIT_WITH_MASK)
    mask = np.where((grab == cv2.GC_FGD) | (grab == cv2.GC_PR_FGD), 255, 0).astype(np.uint8)
    mask = keep_largest(mask)
    if dilate > 0:
        mask = cv2.dilate(mask, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (dilate * 2 + 1, dilate * 2 + 1)))
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (close, close))
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)
    mask = keep_largest(mask)

    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    if not contours:
        raise RuntimeError("Cab glass mask was empty.")
    hull = cv2.convexHull(max(contours, key=cv2.contourArea))
    filled = np.zeros_like(mask)
    cv2.drawContours(filled, [hull], -1, 255, -1)
    # Grow onto the black bezel so rounded corners and the tab bar are not clipped.
    filled = cv2.dilate(filled, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (9, 9)))
    return filled


def order_quad(points: np.ndarray) -> np.ndarray:
    """Order four corners top-left, top-right, bottom-left, bottom-right."""
    pts = points.reshape(4, 2).astype(np.float32)
    by_y = pts[np.argsort(pts[:, 1])]
    top = by_y[:2][np.argsort(by_y[:2, 0])]
    bottom = by_y[2:][np.argsort(by_y[2:, 0])]
    return np.array([top[0], top[1], bottom[0], bottom[1]], np.float32)


def quad_from_mask(mask: np.ndarray) -> np.ndarray:
    """Virtual sharp corners of the glass. The mask clips the rounded corners and notch."""
    ys, xs = np.where(mask > 127)
    if len(xs) == 0:
        raise RuntimeError("Glass mask was empty.")
    points = np.column_stack([xs, ys]).astype(np.float32)
    rect = cv2.minAreaRect(points)
    return order_quad(cv2.boxPoints(rect))


def warp_ui(ui: np.ndarray, plate_shape: tuple[int, int], quad: np.ndarray) -> np.ndarray:
    height, width = ui.shape[:2]
    src = np.array(
        [[0, 0], [width - 1, 0], [0, height - 1], [width - 1, height - 1]],
        np.float32,
    )
    matrix = cv2.getPerspectiveTransform(src, quad)
    return cv2.warpPerspective(
        ui,
        matrix,
        (plate_shape[1], plate_shape[0]),
        flags=cv2.INTER_LANCZOS4,
        borderMode=cv2.BORDER_CONSTANT,
        borderValue=(0, 0, 0),
    )


def composite(plate: np.ndarray, ui: np.ndarray, mask: np.ndarray, quad: np.ndarray, cfg: dict) -> np.ndarray:
    warped = warp_ui(ui, plate.shape, quad).astype(np.float32)
    plate_f = plate.astype(np.float32)

    sigma = max(0.4, float(cfg["feather"]))
    alpha = cv2.GaussianBlur(mask.astype(np.float32) / 255.0, (0, 0), sigma)
    alpha = np.clip(alpha, 0, 1)[..., None]

    brightness = float(cfg["brightness"])
    warped *= brightness

    # A short-range blur matches the plate's focus. Applied only on the
    # screen so it cannot halo onto the bezel. Do not mix the original
    # screen back in: its high-frequency is the old generated UI.
    warped = cv2.GaussianBlur(warped, (0, 0), 0.35)

    out = plate_f * (1.0 - alpha) + np.clip(warped, 0, 255) * alpha
    return np.clip(out, 0, 255).astype(np.uint8)


def leftover_blue(plate: np.ndarray, result: np.ndarray, mask: np.ndarray) -> int:
    """Original header blue still showing through (hand plate)."""
    hsv = cv2.cvtColor(result, cv2.COLOR_RGB2HSV)
    hue, sat, val = hsv[:, :, 0], hsv[:, :, 1], hsv[:, :, 2]
    original = (hue > 105) & (hue < 125) & (sat > 200) & (val > 80) & (mask > 127)
    return int(original.sum())


def overlay_on_cream(result: np.ndarray, plate: np.ndarray) -> int:
    """UI pixels that landed on the cream sand (hand plate)."""
    hsv = cv2.cvtColor(plate, cv2.COLOR_RGB2HSV)
    cream = (hsv[:, :, 0] > 12) & (hsv[:, :, 0] < 30) & (hsv[:, :, 1] > 20) & (hsv[:, :, 1] < 70) & (hsv[:, :, 2] > 180)
    dark_ui = np.mean(result, axis=2) < 80
    return int((cream & dark_ui).sum())


def leftover_gold(plate: np.ndarray, result: np.ndarray, mask: np.ndarray) -> int:
    """Original gold tab-bar / title still showing (cab plate)."""
    hsv_p = cv2.cvtColor(plate, cv2.COLOR_RGB2HSV)
    hsv_r = cv2.cvtColor(result, cv2.COLOR_RGB2HSV)
    was_gold = (hsv_p[:, :, 0] > 10) & (hsv_p[:, :, 0] < 30) & (hsv_p[:, :, 1] > 80) & (hsv_p[:, :, 2] > 70)
    still_gold = (hsv_r[:, :, 0] > 10) & (hsv_r[:, :, 0] < 30) & (hsv_r[:, :, 1] > 80) & (hsv_r[:, :, 2] > 70)
    # Our action yellow is also gold. Only count leftover gold that was gold
    # on the plate AND sits in a region that should now be dark UI (the tab
    # bar), approximated as the bottom fifth of the mask.
    ys, _ = np.where(mask > 127)
    if len(ys) == 0:
        return 0
    y_cut = int(ys.min() + 0.78 * (ys.max() - ys.min()))
    band = np.zeros(mask.shape, bool)
    band[y_cut:] = True
    return int((was_gold & still_gold & (mask > 127) & band).sum())


def overlay_mask(plate: np.ndarray, mask: np.ndarray, path: Path) -> None:
    vis = plate.copy()
    m = mask > 127
    vis[m] = (vis[m] * 0.42 + np.array([255, 0, 80]) * 0.58).astype(np.uint8)
    Image.fromarray(vis).save(path)


def process(
    slug: str,
    ui: np.ndarray,
    debug_dir: Path | None,
    skip_checks: bool = False,
    no_write: bool = False,
) -> None:
    cfg = PLATES[slug]
    plate = load_rgb(cfg["plate"])
    if cfg["kind"] == "hand":
        mask = mask_hand(plate, close=cfg["close"], dilate=cfg["dilate"])
    else:
        mask = mask_cab(plate, cfg["quad"], close=cfg["close"], dilate=cfg["dilate"])
    if mask.sum() < 20_000 * 255:
        raise RuntimeError(f"{slug}: glass mask is too small ({int(mask.sum() / 255)} px).")

    quad = quad_from_mask(mask)
    if cfg["kind"] == "cab":
        mask = punch_cab_notch(mask, ui.shape, quad)
    result = composite(plate, ui, mask, quad, cfg)

    if debug_dir:
        debug_dir.mkdir(parents=True, exist_ok=True)
        Image.fromarray(mask).save(debug_dir / f"{slug}-mask.png")
        overlay_mask(plate, mask, debug_dir / f"{slug}-mask-over.png")
        Image.fromarray(result).save(debug_dir / f"{slug}-result.png")
        crop_phone(result, mask, debug_dir / f"{slug}-phone.png")

    if not no_write:
        write_webp(result, cfg["output"])
        kb = cfg["output"].stat().st_size // 1024
        dest = cfg["output"].relative_to(ROOT)
    else:
        kb = 0
        dest = "(not written)"

    if slug == "hand":
        blue = leftover_blue(plate, result, mask)
        cream = overlay_on_cream(result, plate)
        print(f"{slug} -> {dest} ({kb} kB) leftover-blue={blue} cream-hit={cream}")
        if not skip_checks and blue > 80:
            raise SystemExit(f"{slug}: original blue UI is still showing ({blue} px).")
        if not skip_checks and cream > 40:
            raise SystemExit(f"{slug}: UI landed on the cream sand ({cream} px).")
    else:
        gold = leftover_gold(plate, result, mask)
        print(f"{slug} -> {dest} ({kb} kB) leftover-gold={gold}")
        if not skip_checks and gold > 120:
            raise SystemExit(f"{slug}: original gold chrome is still showing ({gold} px).")


def crop_phone(result: np.ndarray, mask: np.ndarray, path: Path) -> None:
    ys, xs = np.where(mask > 127)
    pad = 36
    x0, x1 = max(0, int(xs.min()) - pad), min(result.shape[1], int(xs.max()) + pad)
    y0, y1 = max(0, int(ys.min()) - pad), min(result.shape[0], int(ys.max()) + pad)
    Image.fromarray(result[y0:y1, x0:x1]).save(path)


def write_og(cab_rgb: np.ndarray, dest: Path) -> None:
    """Share image is a 1200x630 crop of the cab still, phone and docket in frame."""
    # Matched to the previous og.jpg framing.
    x, y, w, h = 180, 200, 1200, 630
    crop = cab_rgb[y : y + h, x : x + w]
    dest.parent.mkdir(parents=True, exist_ok=True)
    Image.fromarray(crop).save(dest, quality=86, optimize=True)
    print(f"og -> {dest.relative_to(ROOT)} ({dest.stat().st_size // 1024} kB)")


def main() -> None:
    parser = argparse.ArgumentParser(description="Composite PhoneIms into the photographed glass.")
    parser.add_argument("--ui", required=True, help="PNG screenshot of PhoneIms, dusk paint.")
    parser.add_argument("slugs", nargs="*", default=["hand", "cab"])
    parser.add_argument("--debug-dir", default="")
    parser.add_argument("--og", action="store_true", help="Also write public/images/og.jpg from the cab still.")
    parser.add_argument("--skip-checks", action="store_true", help="Do not fail on leftover original UI.")
    parser.add_argument("--no-write", action="store_true", help="Write debug images only, leave public/images stills alone.")
    args = parser.parse_args()

    if shutil.which("ffmpeg") is None:
        raise SystemExit("ffmpeg is required to encode webp.")

    ui_path = Path(args.ui)
    if not ui_path.exists():
        raise SystemExit(f"UI screenshot not found: {ui_path}")
    ui = load_rgb(ui_path)

    slugs = args.slugs or ["hand", "cab"]
    for slug in slugs:
        if slug not in PLATES:
            raise SystemExit(f"Unknown plate {slug}. Choose from: {', '.join(PLATES)}")
        process(
            slug,
            ui,
            Path(args.debug_dir) if args.debug_dir else None,
            skip_checks=args.skip_checks,
            no_write=args.no_write,
        )

    if args.og and "cab" in slugs:
        cab = load_rgb(PLATES["cab"]["output"])
        write_og(cab, IMAGES / "og.jpg")


if __name__ == "__main__":
    try:
        main()
    except subprocess.CalledProcessError as error:
        raise SystemExit(f"ffmpeg failed: {error}") from error
