"""
Extract transparent-background brand assets from the supplied logo mockup.

The source we were given is a JPEG presentation render: the logo sits on a
textured concrete wall with a 3D bevel and a drop shadow. This script isolates
the artwork by chroma - the wall is a near-neutral grey, the logo is strongly
saturated teal/blue - then fills interior holes so dark outlines and specular
bevel highlights inside the silhouette are preserved.

    python scripts/extract-logo.py "path/to/source.jpeg"

Outputs into public/brand/:
    logo-mark.png   Shiva + arrow + A monogram only (used in the site chrome)
    logo-full.png   Full vertical lockup including the wordmark

NOTE: this is a best-effort recovery from a lossy mockup. For final production
quality, ask the designer for the original vector (SVG/AI/EPS) or a transparent
PNG export and drop it in over these files - no code changes needed.
"""

import sys
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "public" / "brand"

DEFAULT_SRC = r"C:\Users\Admin\Downloads\WhatsApp Image 2026-08-31 at 8.30.03 PM.jpeg"

# Bands of the source, in pixels, found by profiling rows of saturated pixels.
MARK_BAND = (130, 462)   # monogram
FULL_BAND = (130, 580)   # monogram + ADIYOGI wordmark
# The thin teal "TECH-VENTURES" sub-line (y 590-630) is not recoverable cleanly
# from this lossy mockup - its strokes fragment. Get it from the vector source.


def build_alpha(rgb: np.ndarray) -> np.ndarray:
    """Return a 0..1 alpha matte isolating the saturated logo artwork."""
    mx = rgb.max(axis=2)
    mn = rgb.min(axis=2)
    sat = np.where(mx > 0, (mx - mn) / np.maximum(mx, 1e-6), 0.0)
    val = mx

    # 1. Seed on chroma. Thresholds sit above the wall (sat ~0.10-0.31 at
    #    val ~0.11-0.37) and below the artwork (sat 0.4-1.0 at val 0.5-0.9).
    #    Kept deliberately loose so the thin teal TECH-VENTURES glyphs survive.
    seed = (sat > 0.34) & (val > 0.24)

    # 2. Drop JPEG speckle in the wall texture, but keep small glyph strokes.
    lbl, n = ndimage.label(seed, structure=np.ones((3, 3)))
    if n:
        sizes = ndimage.sum(seed, lbl, range(1, n + 1))
        big = [i + 1 for i, s in enumerate(sizes) if s > 40]
        seed = np.isin(lbl, big)

    # 3. Close hairline gaps, then fill interiors so dark outlines and white
    #    bevel highlights inside the artwork stay opaque.
    closed = ndimage.binary_closing(seed, structure=np.ones((5, 5)))
    solid = ndimage.binary_fill_holes(closed)

    # 4. Feather the edge, then tighten the ramp so it reads crisp rather than
    #    soft. No opening step - it ate the thin letter strokes.
    alpha = ndimage.gaussian_filter(solid.astype(np.float32), sigma=1.0)
    return np.clip((alpha - 0.34) / 0.40, 0.0, 1.0)


def cut(name: str, rgb: np.ndarray, alpha: np.ndarray, band: tuple[int, int], pad: int = 12) -> None:
    y0, y1 = band
    ys, xs = np.where(alpha[y0:y1] > 0.5)
    if len(xs) == 0:
        raise SystemExit(f"nothing found in band {band} for {name}")

    x_lo = max(0, int(xs.min()) - pad)
    x_hi = min(alpha.shape[1], int(xs.max()) + 1 + pad)
    y_lo = max(0, y0 + int(ys.min()) - pad)
    y_hi = min(alpha.shape[0], y0 + int(ys.max()) + 1 + pad)

    out = np.dstack([
        (rgb[y_lo:y_hi, x_lo:x_hi] * 255).astype(np.uint8),
        (alpha[y_lo:y_hi, x_lo:x_hi] * 255).astype(np.uint8),
    ])
    img = Image.fromarray(out, "RGBA")
    path = OUT_DIR / f"{name}.png"
    img.save(path, optimize=True)
    print(f"  {name:10s} {img.size[0]:>4}x{img.size[1]:<4} -> {path.relative_to(ROOT)}")


def main() -> None:
    src = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(DEFAULT_SRC)
    if not src.exists():
        raise SystemExit(f"source not found: {src}")

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    rgb = np.asarray(Image.open(src).convert("RGB")).astype(np.float32) / 255.0
    alpha = build_alpha(rgb)

    print(f"source {src.name}  coverage {100 * (alpha > 0.5).mean():.2f}%")
    cut("logo-mark", rgb, alpha, MARK_BAND)
    cut("logo-full", rgb, alpha, FULL_BAND)


if __name__ == "__main__":
    main()
