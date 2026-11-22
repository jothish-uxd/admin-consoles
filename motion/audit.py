"""Check every scene: clicks land above the site's player bar, and each frame looks the
same whether reached fresh or after playing to the end (the poster is taken that way,
so render() must set every element it ever changes, on every branch).

    python3 motion/audit.py                 # all scenes
    python3 motion/audit.py versions-restore
See SAFE_Y in shared/motion.js. render.py runs the same check and warns.
"""
import io, os, pathlib, sys
from PIL import Image, ImageChops
from playwright.sync_api import sync_playwright

CHROME = "/usr/bin/google-chrome"
root = pathlib.Path(__file__).parent
names = sys.argv[1:] or sorted(d.name for d in root.iterdir() if (d / "scene.html").exists())
bad_any = False
with sync_playwright() as p:
    b = p.chromium.launch(executable_path=CHROME if os.path.exists(CHROME) else None)
    pg = b.new_page(viewport={"width": 1280, "height": 720})
    for n in names:
        pg.goto((root / n / "scene.html").resolve().as_uri()); pg.wait_for_function("window.READY === true")
        clicks = pg.evaluate("window.AUDIT()")
        bad = [c for c in clicks if not c["ok"]]
        stale = []
        for t in (0, 1.0, 3.0, 6.0):
            pg.evaluate(f"renderAt({t})"); x = Image.open(io.BytesIO(pg.screenshot())).convert("L")
            pg.evaluate("renderAt(window.DURATION - 2.5)"); pg.evaluate(f"renderAt({t})"); y = Image.open(io.BytesIO(pg.screenshot())).convert("L")
            d = ImageChops.difference(x, y).point(lambda v: 1 if v > 40 else 0)
            if sum(d.histogram()[1:]) > 300: stale.append(t)  # a few pixels at the cursor are anti-aliasing, not state
        if stale: print(f"{n:26} STALE STATE at {stale}s: render() leaves something from later frames")
        bad_any |= bool(bad) or bool(stale)
        print(f"{n:26} " + ("ok" if not bad else "UNDER BAR: " + "  ".join(f"{c['t']}s y={c['y']}" for c in bad)) + f"   (lowest click y={max(c['y'] for c in clicks)})")
    b.close()
sys.exit(1 if bad_any else 0)
