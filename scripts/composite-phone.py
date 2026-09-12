#!/usr/bin/env python3
"""Sit the real field app in the photographed phones.

Laptop stills stay on the CSS warp: that glass is a rectangle. The hero hand
keys photographed glass (bright blue on white) and warps PhoneIms into it.
The cab plate is the original photograph. Cut the photographed iPhone out
and drop a whole PhoneIms dusk Capture device into the hand. Do not warp HTML
into that chassis, and do not replace the plate with a generated photo.

Work happens at 2x so the UI stays legible when the homepage crops in.

Usage:
  python3 scripts/composite-phone.py --ui hand=/tmp/phone-hand.png
  python3 scripts/composite-phone.py --ui hand=/tmp/phone-hand.png --ui cab=/tmp/phone-cab.png hand cab --og
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
SCALE = 2
# Keep in step with IMS_DEVICE in src/content/ims.ts
DEVICE_WIDTH = 418
DEVICE_RADIUS = 54

PLATES = {
    "hand": {
        "plate": IMAGES / "plates" / "hand.webp",
        "output": IMAGES / "field-hand.webp",
        "kind": "hand",
        "close": 11,
        "dilate": 2,
        "feather": 0.7,
        # Homepage crop: the 2x plate leaves the glass at ~300px. Cut to the
        # phone so the sharp composite is what the hero actually shows.
        "hero_pad": 52,
    },
    "cab": {
        "plate": IMAGES / "plates" / "cab.webp",
        "output": IMAGES / "hero-cab.webp",
        "kind": "device",
        # Outer chassis, not the glass. TL, TR, BL, BR.
        "quad": [(460.5, 181.2), (764.8, 165.9), (499.9, 810.3), (805.5, 793.0)],
        "round": 41,
        "feather": 0.55,
    },
}


def load_rgb(path: Path) -> np.ndarray:
    return np.array(Image.open(path).convert("RGB"))


def write_webp(rgb: np.ndarray, dest: Path, quality: int = 94) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    png = dest.with_suffix(".png")
    Image.fromarray(rgb).save(png)
    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-i",
            str(png),
            "-vf",
            "unsharp=5:5:0.45:5:5:0.0",
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

    is_blue = (hue > 95) & (hue < 135) & (sat > 80) & (blue > 80)
    is_white = (sat < 35) & (val > 190) & (warm < 30)
    is_light = (val > 160) & (sat < 50) & (warm < 35)
    mask = keep_largest(((is_blue | is_white | is_light).astype(np.uint8) * 255))
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (close, close))
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)
    mask = keep_largest(mask)
    mask = fill_small_holes(mask, 600)
    if dilate > 0:
        mask = cv2.dilate(
            mask,
            cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (dilate * 2 + 1, dilate * 2 + 1)),
        )
    return mask


def fill_quad(shape: tuple[int, ...], quad: list | np.ndarray) -> np.ndarray:
    cover = np.zeros(shape[:2], np.uint8)
    pts = np.array([quad[0], quad[1], quad[3], quad[2]], np.int32)
    cv2.fillConvexPoly(cover, pts, 255)
    return cover


def rounded_rect_mask(height: int, width: int, radius: int) -> np.ndarray:
    mask = np.full((height, width), 255, np.uint8)
    r = max(1, int(radius))
    mask[:r, :r] = 0
    mask[:r, width - r :] = 0
    mask[height - r :, :r] = 0
    mask[height - r :, width - r :] = 0
    cv2.circle(mask, (r, r), r, 255, -1)
    cv2.circle(mask, (width - 1 - r, r), r, 255, -1)
    cv2.circle(mask, (r, height - 1 - r), r, 255, -1)
    cv2.circle(mask, (width - 1 - r, height - 1 - r), r, 255, -1)
    return mask


def mask_cab_device(plate: np.ndarray, quad: list, round_px: int) -> np.ndarray:
    cover = fill_quad(plate.shape, quad)
    if round_px > 0:
        kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (round_px, round_px))
        cover = cv2.morphologyEx(cover, cv2.MORPH_OPEN, kernel)
    return cover


def mask_cab_fingers(plate: np.ndarray, device: np.ndarray) -> np.ndarray:
    """Keep the wrapping hand. Only skin on the chassis rim, grown from outside."""
    hsv = cv2.cvtColor(plate, cv2.COLOR_RGB2HSV)
    hue, sat, val = hsv[:, :, 0], hsv[:, :, 1], hsv[:, :, 2]
    red = plate[:, :, 0].astype(np.int16)
    green = plate[:, :, 1].astype(np.int16)
    blue = plate[:, :, 2].astype(np.int16)
    skin = (hue < 25) & (sat > 25) & (val > 30) & (val < 190) & (red > green + 5) & (red > blue + 8)
    inner = cv2.erode(device, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (21, 21)))
    rim = (device > 127) & (inner == 0)
    near = cv2.dilate(device, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (21, 21)))
    finger = np.where((device == 0) & skin, 255, 0).astype(np.uint8)
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7))
    for _ in range(14):
        grown = cv2.dilate(finger, kernel)
        add = (grown > 0) & skin & (near > 127)
        finger = np.where(add, 255, finger).astype(np.uint8)
    finger = np.where((finger > 0) | (skin & rim), 255, 0).astype(np.uint8)
    finger = cv2.dilate(finger, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5)))
    return cv2.bitwise_and(finger, near)


def order_quad(points: np.ndarray) -> np.ndarray:
    pts = points.reshape(4, 2).astype(np.float32)
    by_y = pts[np.argsort(pts[:, 1])]
    top = by_y[:2][np.argsort(by_y[:2, 0])]
    bottom = by_y[2:][np.argsort(by_y[2:, 0])]
    return np.array([top[0], top[1], bottom[0], bottom[1]], np.float32)


def quad_from_mask(mask: np.ndarray) -> np.ndarray:
    ys, xs = np.where(mask > 127)
    if len(xs) == 0:
        raise RuntimeError("Glass mask was empty.")
    points = np.column_stack([xs, ys]).astype(np.float32)
    return order_quad(cv2.boxPoints(cv2.minAreaRect(points)))


def warp_ui(ui: np.ndarray, plate_shape: tuple[int, ...], quad: np.ndarray) -> np.ndarray:
    height, width = ui.shape[:2]
    src = np.array(
        [[0, 0], [width - 1, 0], [0, height - 1], [width - 1, height - 1]],
        np.float32,
    )
    matrix = cv2.getPerspectiveTransform(src, quad)
    flags = cv2.INTER_LINEAR if ui.ndim == 2 else cv2.INTER_LANCZOS4
    return cv2.warpPerspective(
        ui,
        matrix,
        (plate_shape[1], plate_shape[0]),
        flags=flags,
        borderMode=cv2.BORDER_CONSTANT,
        borderValue=0,
    )


def composite(
    plate: np.ndarray,
    ui: np.ndarray,
    mask: np.ndarray,
    quad: np.ndarray,
    feather: float,
) -> np.ndarray:
    warped = warp_ui(ui, plate.shape, quad).astype(np.float32)
    alpha = cv2.GaussianBlur(mask.astype(np.float32) / 255.0, (0, 0), max(0.4, feather))
    alpha = np.clip(alpha, 0, 1)[..., None]
    out = plate.astype(np.float32) * (1.0 - alpha) + warped * alpha
    return np.clip(out, 0, 255).astype(np.uint8)


def grade_cab_phone(ui: np.ndarray) -> np.ndarray:
    """Warm the studio screenshot so it sits in the tungsten cab."""
    out = ui.astype(np.float32)
    out[..., 0] *= 1.04
    out[..., 1] *= 0.97
    out[..., 2] *= 0.88
    out = (out - 128.0) * 0.94 + 128.0
    return np.clip(out, 0, 255).astype(np.uint8)


def composite_device(
    plate: np.ndarray,
    ui: np.ndarray,
    device_quad: np.ndarray,
    finger: np.ndarray,
    feather: float,
) -> np.ndarray:
    radius = int(round(DEVICE_RADIUS * (ui.shape[1] / DEVICE_WIDTH)))
    ui_alpha = rounded_rect_mask(ui.shape[0], ui.shape[1], radius)
    graded = grade_cab_phone(ui)
    warped = warp_ui(graded, plate.shape, device_quad).astype(np.float32)
    alpha = warp_ui(ui_alpha, plate.shape, device_quad).astype(np.float32) / 255.0
    alpha_u8 = np.clip(alpha * 255.0, 0, 255).astype(np.uint8)
    alpha_u8 = cv2.dilate(alpha_u8, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5)))
    alpha = alpha_u8.astype(np.float32) / 255.0
    alpha[finger > 127] = 0
    alpha = cv2.GaussianBlur(alpha, (0, 0), max(0.4, feather))
    alpha[finger > 127] = 0
    alpha = np.clip(alpha, 0, 1)[..., None]
    out = plate.astype(np.float32) * (1.0 - alpha) + warped * alpha
    return np.clip(out, 0, 255).astype(np.uint8)


def leftover_blue(result: np.ndarray, mask: np.ndarray) -> int:
    hsv = cv2.cvtColor(result, cv2.COLOR_RGB2HSV)
    hue, sat, val = hsv[:, :, 0], hsv[:, :, 1], hsv[:, :, 2]
    original = (hue > 105) & (hue < 125) & (sat > 200) & (val > 80) & (mask > 127)
    return int(original.sum())


def overlay_on_cream(result: np.ndarray, plate: np.ndarray) -> int:
    hsv = cv2.cvtColor(plate, cv2.COLOR_RGB2HSV)
    cream = (
        (hsv[:, :, 0] > 12)
        & (hsv[:, :, 0] < 30)
        & (hsv[:, :, 1] > 20)
        & (hsv[:, :, 1] < 70)
        & (hsv[:, :, 2] > 180)
    )
    dark_ui = np.mean(result, axis=2) < 80
    return int((cream & dark_ui).sum())


def leftover_gold(plate: np.ndarray, result: np.ndarray, mask: np.ndarray) -> int:
    hsv_p = cv2.cvtColor(plate, cv2.COLOR_RGB2HSV)
    hsv_r = cv2.cvtColor(result, cv2.COLOR_RGB2HSV)
    was_gold = (hsv_p[:, :, 0] > 10) & (hsv_p[:, :, 0] < 30) & (hsv_p[:, :, 1] > 80) & (hsv_p[:, :, 2] > 70)
    still_gold = (hsv_r[:, :, 0] > 10) & (hsv_r[:, :, 0] < 30) & (hsv_r[:, :, 1] > 80) & (hsv_r[:, :, 2] > 70) & (hsv_r[:, :, 2] < 160)
    return int((was_gold & still_gold & (mask > 127)).sum())


def leftover_camera_highlights(result: np.ndarray, plate: np.ndarray, device: np.ndarray) -> int:
    ys, xs = np.where(device > 127)
    if len(xs) == 0:
        return 0
    y0, y1 = int(ys.min()), int(ys.max())
    top = np.zeros_like(device)
    top[y0 : int(y0 + 0.12 * (y1 - y0)), :] = 255
    zone = (device > 127) & (top > 0)
    plate_bright = plate.max(axis=2) > 170
    still_bright = result.max(axis=2) > 170
    return int((zone & plate_bright & still_bright).sum())


def overlay_mask(plate: np.ndarray, mask: np.ndarray, path: Path) -> None:
    vis = plate.copy()
    m = mask > 127
    vis[m] = (vis[m] * 0.42 + np.array([255, 0, 80]) * 0.58).astype(np.uint8)
    Image.fromarray(vis).save(path)


def crop_phone(result: np.ndarray, mask: np.ndarray, path: Path) -> None:
    ys, xs = np.where(mask > 127)
    pad = 36
    x0, x1 = max(0, int(xs.min()) - pad), min(result.shape[1], int(xs.max()) + pad)
    y0, y1 = max(0, int(ys.min()) - pad), min(result.shape[0], int(ys.max()) + pad)
    Image.fromarray(result[y0:y1, x0:x1]).save(path)


def write_og(cab_rgb: np.ndarray, dest: Path) -> None:
    scale = cab_rgb.shape[1] / 1536
    x, y, w, h = int(180 * scale), int(200 * scale), int(1200 * scale), int(630 * scale)
    crop = cab_rgb[y : y + h, x : x + w]
    resized = cv2.resize(crop, (1200, 630), interpolation=cv2.INTER_LANCZOS4)
    dest.parent.mkdir(parents=True, exist_ok=True)
    Image.fromarray(resized).save(dest, quality=90, optimize=True)
    print(f"og -> {dest.relative_to(ROOT)} ({dest.stat().st_size // 1024} kB)")


def upscale(image: np.ndarray, interpolation: int) -> np.ndarray:
    height, width = image.shape[:2]
    return cv2.resize(image, (width * SCALE, height * SCALE), interpolation=interpolation)


def crop_to_glass(result: np.ndarray, mask: np.ndarray, pad: int) -> np.ndarray:
    """Keep the composited glass the size of the homepage figure.

    The 2x plate is sharp. object-cover on the full 3072x2048 still still
    draws that glass at ~300px, which is the illegible-photo look.
    """
    mask_hi = cv2.resize(
        mask,
        (result.shape[1], result.shape[0]),
        interpolation=cv2.INTER_NEAREST,
    )
    ys, xs = np.where(mask_hi > 127)
    if len(xs) == 0:
        raise RuntimeError("Glass mask was empty while cropping.")
    scale = result.shape[0] / 1024
    pad_px = int(pad * scale)
    x0 = max(0, int(xs.min()) - pad_px)
    y0 = max(0, int(ys.min()) - pad_px)
    x1 = min(result.shape[1], int(xs.max()) + pad_px)
    y1 = min(result.shape[0], int(ys.max()) + pad_px)
    return result[y0:y1, x0:x1]


def process(
    slug: str,
    ui: np.ndarray,
    debug_dir: Path | None,
    skip_checks: bool = False,
    no_write: bool = False,
) -> None:
    cfg = PLATES[slug]
    plate = load_rgb(cfg["plate"])
    finger = None

    if cfg["kind"] == "hand":
        mask = mask_hand(plate, close=cfg["close"], dilate=cfg["dilate"])
        quad = quad_from_mask(mask)
    else:
        mask = mask_cab_device(plate, cfg["quad"], round_px=cfg["round"])
        finger = mask_cab_fingers(plate, mask)
        quad = np.array(cfg["quad"], np.float32)

    if int(mask.sum() / 255) < 20_000:
        raise RuntimeError(f"{slug}: device mask is too small ({int(mask.sum() / 255)} px).")

    plate_hi = upscale(plate, cv2.INTER_LANCZOS4)
    mask_hi = cv2.resize(
        mask,
        (plate_hi.shape[1], plate_hi.shape[0]),
        interpolation=cv2.INTER_LINEAR,
    )
    quad_hi = quad * SCALE
    feather = float(cfg["feather"]) * SCALE

    if cfg["kind"] == "device":
        finger_hi = cv2.resize(
            finger,
            (plate_hi.shape[1], plate_hi.shape[0]),
            interpolation=cv2.INTER_LINEAR,
        )
        result = composite_device(plate_hi, ui, quad_hi, finger_hi, feather)
    else:
        result = composite(plate_hi, ui, mask_hi, quad_hi, feather)

    preview = cv2.resize(result, (1536, 1024), interpolation=cv2.INTER_AREA)

    if debug_dir:
        debug_dir.mkdir(parents=True, exist_ok=True)
        Image.fromarray(mask).save(debug_dir / f"{slug}-mask.png")
        overlay_mask(load_rgb(cfg["plate"]), mask, debug_dir / f"{slug}-mask-over.png")
        if finger is not None:
            overlay_mask(load_rgb(cfg["plate"]), finger, debug_dir / f"{slug}-fingers.png")
        Image.fromarray(preview).save(debug_dir / f"{slug}-result.png")
        crop_phone(preview, mask, debug_dir / f"{slug}-phone.png")

    if slug == "hand":
        blue = leftover_blue(preview, mask)
        cream = overlay_on_cream(preview, load_rgb(cfg["plate"]))
        if not skip_checks and blue > 80:
            raise SystemExit(f"{slug}: original blue UI is still showing ({blue} px).")
        if not skip_checks and cream > 40:
            raise SystemExit(f"{slug}: UI landed on the cream sand ({cream} px).")
        extra = f"leftover-blue={blue} cream-hit={cream}"
    else:
        inner = cv2.erode(mask, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (31, 31)))
        gold = leftover_gold(load_rgb(cfg["plate"]), preview, inner)
        cameras = leftover_camera_highlights(preview, load_rgb(cfg["plate"]), mask)
        extra = f"leftover-gold={gold} camera-highlights={cameras}"
        if not skip_checks and cameras > 40:
            raise SystemExit(
                f"{slug}: photographed camera island still showing ({cameras} px)."
            )
        if not skip_checks and gold > 80:
            raise SystemExit(f"{slug}: original gold UI is still in the glass ({gold} px).")

    if cfg["kind"] == "hand" and cfg.get("hero_pad"):
        result = crop_to_glass(result, mask, int(cfg["hero_pad"]))

    if not no_write:
        write_webp(result, cfg["output"])
        kb = cfg["output"].stat().st_size // 1024
        dest = cfg["output"].relative_to(ROOT)
    else:
        kb = 0
        dest = "(not written)"

    print(f"{slug} -> {dest} ({kb} kB) {extra} size={result.shape[1]}x{result.shape[0]}")


def load_uis(specs: list[str], slugs: list[str]) -> dict[str, np.ndarray]:
    """Resolve --ui values to one screenshot per plate.

    A bare path is the fallback for every plate. `slug=path` overrides a single
    plate, which is how the two phone stills carry two different yards' builds.
    """
    fallback: Path | None = None
    per_slug: dict[str, Path] = {}
    for spec in specs:
        slug, sep, path = spec.partition("=")
        if sep:
            if slug not in PLATES:
                raise SystemExit(f"Unknown plate {slug} in --ui. Choose from: {', '.join(PLATES)}")
            per_slug[slug] = Path(path)
        else:
            fallback = Path(spec)

    loaded: dict[Path, np.ndarray] = {}
    uis: dict[str, np.ndarray] = {}
    for slug in slugs:
        path = per_slug.get(slug, fallback)
        if path is None:
            raise SystemExit(f"No --ui screenshot given for {slug}.")
        if not path.exists():
            raise SystemExit(f"UI screenshot not found: {path}")
        if path not in loaded:
            loaded[path] = load_rgb(path)
        uis[slug] = loaded[path]
    return uis


def main() -> None:
    parser = argparse.ArgumentParser(description="Composite PhoneIms into the photographed phones.")
    parser.add_argument(
        "--ui",
        required=True,
        action="append",
        metavar="[SLUG=]PATH",
        help="PNG screenshot of PhoneIms. Prefix with a plate slug to give that plate its own screen.",
    )
    parser.add_argument("slugs", nargs="*", default=["hand"])
    parser.add_argument("--debug-dir", default="")
    parser.add_argument("--og", action="store_true", help="Also write public/images/og.jpg from the cab still.")
    parser.add_argument("--skip-checks", action="store_true")
    parser.add_argument("--no-write", action="store_true")
    args = parser.parse_args()

    if shutil.which("ffmpeg") is None:
        raise SystemExit("ffmpeg is required to encode webp.")

    slugs = args.slugs or ["hand"]
    uis = load_uis(args.ui, slugs)

    for slug in slugs:
        if slug not in PLATES:
            raise SystemExit(f"Unknown plate {slug}. Choose from: {', '.join(PLATES)}")
        process(
            slug,
            uis[slug],
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
