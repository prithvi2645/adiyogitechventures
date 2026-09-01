"""
Generate the scroll-zoom backdrop: a Kailash-like peak under an aurora sky,
rendered procedurally in the Adiyogi brand palette.

Everything here is generated from noise and maths, so the result is original
work the client owns outright - no stock licence, no attribution, no risk of the
same photo turning up on a competitor's site.

    python scripts/generate-backdrop.py

Output: public/brand/backdrop.jpg (2560x1440)

Tweak SEED for a different mountain range; everything else is deterministic.
"""

from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "brand" / "backdrop.jpg"

W, H = 2560, 1440
SEED = 20260831

# Brand palette (linear-ish RGB 0..1)
VOID = np.array([0x04, 0x07, 0x0E]) / 255
DEEP = np.array([0x08, 0x1A, 0x2E]) / 255
HORIZON = np.array([0x11, 0x3A, 0x57]) / 255
TEAL = np.array([0x34, 0xBB, 0xB6]) / 255
CYAN = np.array([0x59, 0xD7, 0xCD]) / 255
PALE = np.array([0x93, 0xE7, 0xE0]) / 255

rng = np.random.default_rng(SEED)


def ridgeline(width: int, octaves: int = 9, roughness: float = 0.52) -> np.ndarray:
    """1D fractal ridge via midpoint displacement, normalised to 0..1."""
    n = 2
    pts = rng.random(2)
    amp = 1.0
    for _ in range(octaves):
        mids = (pts[:-1] + pts[1:]) / 2 + (rng.random(n - 1) - 0.5) * amp
        out = np.empty(2 * n - 1)
        out[0::2] = pts
        out[1::2] = mids
        pts = out
        n = len(pts)
        amp *= roughness
    x = np.linspace(0, 1, len(pts))
    xi = np.linspace(0, 1, width)
    h = np.interp(xi, x, pts)
    return (h - h.min()) / (h.max() - h.min() + 1e-9)


def soft_noise(shape, sigma, seed_offset=0):
    r = np.random.default_rng(SEED + seed_offset).random(shape)
    n = ndimage.gaussian_filter(r, sigma=sigma)
    return (n - n.min()) / (n.max() - n.min() + 1e-9)


def main() -> None:
    yy = np.linspace(0, 1, H)[:, None]

    # ---- Sky: void at the top, warming into a teal-lit horizon ----
    t = yy ** 1.35
    sky = VOID[None, None, :] * (1 - t)[..., None] + DEEP[None, None, :] * t[..., None]
    sky = np.repeat(sky, W, axis=1)

    horizon_band = np.exp(-((yy - 0.62) ** 2) / (2 * 0.16 ** 2))
    sky += HORIZON[None, None, :] * (horizon_band * 0.55)[..., None]

    # ---- Aurora curtains: low-frequency noise, confined to the upper sky ----
    # sigma is (y, x): smoothing hard vertically and lightly horizontally turns
    # blobs into the vertical curtains an aurora actually has.
    for i, (sigma, tint, strength, centre) in enumerate(
        [((150, 26), TEAL, 0.26, 0.30), ((105, 17), CYAN, 0.18, 0.42), ((200, 44), PALE, 0.10, 0.20)]
    ):
        band = soft_noise((H, W), sigma, seed_offset=i * 17)
        band = np.clip((band - 0.50) * 3.8, 0, 1) ** 1.6
        mask = np.exp(-((yy - centre) ** 2) / (2 * 0.17 ** 2))
        sky += tint[None, None, :] * (band * mask * strength)[..., None]

    # ---- Stars, denser toward the top ----
    star_mask = (rng.random((H, W)) > 0.99965) & (yy < 0.7)
    stars = ndimage.gaussian_filter(star_mask.astype(np.float32), sigma=0.7)
    stars = stars / (stars.max() + 1e-9)
    sky += np.dstack([stars * 0.75, stars * 0.92, stars * 0.95])

    # ---- Glow behind where the main peak will rise ----
    xx = np.linspace(0, 1, W)[None, :]
    glow = np.exp(-(((xx - 0.52) ** 2) / (2 * 0.13 ** 2) + ((yy - 0.66) ** 2) / (2 * 0.10 ** 2)))
    sky += TEAL[None, None, :] * (glow * 0.34)[..., None]

    img = sky

    # ---- Mountain ranges, back to front, with atmospheric perspective ----
    ranges = [
        # (base, amplitude, colour, haze toward sky, blur, peak weight)
        (0.58, 0.14, np.array([0x14, 0x33, 0x4E]) / 255, 0.55, 2.5, 0.25),
        (0.64, 0.19, np.array([0x0D, 0x24, 0x3B]) / 255, 0.34, 1.5, 0.35),
        (0.78, 0.40, np.array([0x07, 0x16, 0x28]) / 255, 0.14, 0.6, 0.62),
        (0.88, 0.18, np.array([0x03, 0x09, 0x13]) / 255, 0.04, 0.0, 0.20),
    ]

    grid_y = np.repeat(np.linspace(0, 1, H)[:, None], W, axis=1)

    for idx, (base, amp, colour, haze, blur, peak) in enumerate(ranges):
        h = ridgeline(W, octaves=9, roughness=0.5 + idx * 0.02)

        # One dominant summit, pushed right of centre so it frames the hero
        # copy rather than sitting directly behind it.
        xs = np.linspace(0, 1, W) - 0.63
        # Asymmetric flanks - a broad approach on the left, a steeper drop on the
        # right. A symmetric gaussian reads as a bell curve, not a mountain.
        sig = np.where(xs < 0, 0.135, 0.092)
        summit = np.exp(-(xs ** 2) / (2 * sig ** 2)) ** 1.4
        h = h * (1 - peak) + summit * peak

        skyline = base - h * amp
        mask = (grid_y >= skyline[None, :]).astype(np.float32)
        if blur:
            mask = ndimage.gaussian_filter(mask, sigma=blur)

        # Fade the rock toward the sky colour with distance (aerial perspective)
        tinted = colour[None, None, :] * (1 - haze) + HORIZON[None, None, :] * haze

        # A rim of light along the ridge, brightest on the nearest ranges
        edge = np.clip(ndimage.gaussian_filter(mask, sigma=3) - mask, 0, 1)
        rim = TEAL[None, None, :] * (edge * (0.55 - haze * 0.5))[..., None]

        img = img * (1 - mask[..., None]) + tinted * mask[..., None] + rim

        # Mist pooling at the foot of each range
        mist = np.exp(-((grid_y - (skyline[None, :] + 0.045)) ** 2) / (2 * 0.028 ** 2))
        img += HORIZON[None, None, :] * (mist * 0.16 * (1 - idx * 0.2))[..., None]

    # ---- Vignette ----
    vx = (np.linspace(-1, 1, W) ** 2)[None, :]
    vy = (np.linspace(-1, 1, H) ** 2)[:, None]
    vign = np.clip(1 - (vx * 0.42 + vy * 0.50), 0, 1) ** 0.65
    img *= vign[..., None]

    # ---- Fine grain, so it never reads as a flat CSS gradient ----
    grain = (np.random.default_rng(SEED + 99).random((H, W)) - 0.5) * 0.016
    img += grain[..., None]

    out = np.clip(img, 0, 1)
    out = np.power(out, 0.96)  # gentle lift in the shadows
    Image.fromarray((out * 255).astype(np.uint8), "RGB").save(
        OUT, quality=90, optimize=True, progressive=True
    )
    print(f"wrote {OUT.relative_to(ROOT)}  {W}x{H}  {OUT.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
