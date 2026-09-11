#!/usr/bin/env python3
"""Sit the real field app in the photographed iPhone glass.

Laptop stills stay on the CSS warp: that glass is a rectangle. Phone glass
is a rounded rect with a notch, so this keys the photographed screen and
warps a PhoneIms screenshot into it. Work happens at 2x so the UI stays
legible when the homepage crops in, matching the desk still pipeline.

Each plate gets its own screenshot. The cab plate is the original
photograph. Warp the generic Capture tab into that glass. Do not replace
the plate with a generated photo.

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

PLATES = {
    "hand": {
        "plate": IMAGES / "plates" / "hand.webp",
        "output": IMAGES / "field-hand.webp",
        "kind": "hand",
        "close": 11,
        "dilate": 2,
        "feather": 0.7,
    },
    "cab": {
        "plate": IMAGES / "plates" / "cab.webp",
        "output": IMAGES / "hero-cab.webp",
        "kind": "cab",
        # Screen corners, not the chassis. TL, TR, BL, BR.
        "quad": [(486.4, 209.9), (742.7, 197.1), (522.5, 787.1), (780.1, 772.3)],
        # Round the trapezoid to the photographed glass. Do not hull, dilate,
        # or intersect a smaller iPhone rect: that last step mapped the UI
        # too small inside the glass. Never grow onto the bezel.
        "round": 21,
        "erode": 0,
        "feather": 0.5,
        # Chassis pixels that must stay photograph, not UI.
        "bezel_samples": [(475, 480), (798, 470), (478, 230), (800, 785)],
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


def fill_quad(shape: tuple[int, int], quad: list) -> np.ndarray:
    cover = np.zeros(shape[:2], np.uint8)
    pts = np.array([quad[0], quad[1], quad[3], quad[2]], np.int32)
    cv2.fillConvexPoly(cover, pts, 255)
    return cover


def mask_cab(
    plate: np.ndarray,
    quad: list,
    round_px: int,
    erode: int,
) -> tuple[np.ndarray, np.ndarray, np.ndarray]:
    """Keep the UI on the photographed glass, inside the bezel.

    The measured quad is the screen, not the chassis. Opening it rounds the
    trapezoid to the iPhone glass. The original gold UI already fills that
    glass; do not also clip to a smaller rounded rect or the app sits in a
    gutter. Never hull or dilate onto the bezel.
    """
    cover = fill_quad(plate.shape, quad)
    glass = cover
    if round_px > 0:
        kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (round_px, round_px))
        glass = cv2.morphologyEx(cover, cv2.MORPH_OPEN, kernel)
    if erode > 0:
        glass = cv2.erode(
            glass,
            cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (erode * 2 + 1, erode * 2 + 1)),
        )
    camera = photographed_camera(plate, cover)
    glass[camera > 0] = 0
    return glass, cover, camera


def photographed_camera(plate: np.ndarray, glass: np.ndarray) -> np.ndarray:
    """The real camera island in the plate, not a guessed iPhone notch."""
    ys, xs = np.where(glass > 127)
    if len(xs) == 0:
        return np.zeros_like(glass)
    x0, x1 = int(xs.min()), int(xs.max())
    y0, y1 = int(ys.min()), int(ys.max())
    top_h = max(10, int((y1 - y0 + 1) * 0.14))
    xa = x0 + int((x1 - x0) * 0.22)
    xb = x0 + int((x1 - x0) * 0.78)
    crop = plate[y0 : y0 + top_h, xa:xb]
    dark = np.max(crop, axis=2) < 12
    local = np.zeros(crop.shape[:2], np.uint8)
    local[dark] = 255
    local = keep_largest(local)
    if int(local.sum() / 255) < 40:
        return np.zeros_like(glass)
    local = cv2.dilate(local, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5)))
    out = np.zeros_like(glass)
    out[y0 : y0 + local.shape[0], xa : xa + local.shape[1]] = local
    return out


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
    still_gold = (hsv_r[:, :, 0] > 10) & (hsv_r[:, :, 0] < 30) & (hsv_r[:, :, 1] > 80) & (hsv_r[:, :, 2] > 70)
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


def process(
    slug: str,
    ui: np.ndarray,
    debug_dir: Path | None,
    skip_checks: bool = False,
    no_write: bool = False,
) -> None:
    cfg = PLATES[slug]
    plate = load_rgb(cfg["plate"])
    cover = None
    camera = None

    if cfg["kind"] == "hand":
        mask = mask_hand(plate, close=cfg["close"], dilate=cfg["dilate"])
        quad = quad_from_mask(mask)
    else:
        mask, cover, camera = mask_cab(
            plate,
            cfg["quad"],
            round_px=cfg["round"],
            erode=cfg["erode"],
        )
        quad = np.array(cfg["quad"], np.float32)
        dusk = np.array([20, 22, 26], np.uint8)
        painted = plate.copy()
        hide = cover.copy()
        if camera is not None:
            hide[camera > 0] = 0
        painted[hide > 127] = dusk
        plate = painted
        spilled = 0
        for x, y in cfg["bezel_samples"]:
            if mask[y, x] > 127:
                spilled += 1
        if spilled:
            raise RuntimeError(
                f"{slug}: UI mask landed on the photographed bezel ({spilled} sample points)."
            )

    if int(mask.sum() / 255) < 20_000:
        raise RuntimeError(f"{slug}: glass mask is too small ({int(mask.sum() / 255)} px).")

    plate_hi = upscale(plate, cv2.INTER_LANCZOS4)
    mask_hi = cv2.resize(
        mask,
        (plate_hi.shape[1], plate_hi.shape[0]),
        interpolation=cv2.INTER_LINEAR,
    )
    quad_hi = quad * SCALE
    feather = float(cfg["feather"]) * SCALE
    result = composite(plate_hi, ui, mask_hi, quad_hi, feather)

    if debug_dir:
        debug_dir.mkdir(parents=True, exist_ok=True)
        Image.fromarray(mask).save(debug_dir / f"{slug}-mask.png")
        overlay_mask(load_rgb(cfg["plate"]), mask, debug_dir / f"{slug}-mask-over.png")
        preview = cv2.resize(
            result,
            (1536, 1024),
            interpolation=cv2.INTER_AREA,
        )
        Image.fromarray(preview).save(debug_dir / f"{slug}-result.png")
        crop_phone(preview, mask, debug_dir / f"{slug}-phone.png")

    if not no_write:
        write_webp(result, cfg["output"])
        kb = cfg["output"].stat().st_size // 1024
        dest = cfg["output"].relative_to(ROOT)
    else:
        kb = 0
        dest = "(not written)"

    preview = cv2.resize(result, (1536, 1024), interpolation=cv2.INTER_AREA)
    if slug == "hand":
        blue = leftover_blue(preview, mask)
        cream = overlay_on_cream(preview, load_rgb(cfg["plate"]))
        print(f"{slug} -> {dest} ({kb} kB) leftover-blue={blue} cream-hit={cream} size={result.shape[1]}x{result.shape[0]}")
        if not skip_checks and blue > 80:
            raise SystemExit(f"{slug}: original blue UI is still showing ({blue} px).")
        if not skip_checks and cream > 40:
            raise SystemExit(f"{slug}: UI landed on the cream sand ({cream} px).")
    else:
        gold = leftover_gold(load_rgb(cfg["plate"]), preview, mask)
        print(f"{slug} -> {dest} ({kb} kB) leftover-gold={gold} size={result.shape[1]}x{result.shape[0]}")
        # Capture shutter is stamp yellow in the same lower-glass band as the
        # original gold chrome. leftover-gold is a report, not a fail.


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
    parser = argparse.ArgumentParser(description="Composite PhoneIms into the photographed glass.")
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
