"""Check that every click in every scene lands above the site's player bar.

    python3 motion/audit.py                 # all scenes
    python3 motion/audit.py versions-restore
See SAFE_Y in shared/motion.js. render.py runs the same check and warns.
"""
import os, pathlib, sys
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
        bad_any |= bool(bad)
        print(f"{n:26} " + ("ok" if not bad else "UNDER BAR: " + "  ".join(f"{c['t']}s y={c['y']}" for c in bad)) + f"   (lowest click y={max(c['y'] for c in clicks)})")
    b.close()
sys.exit(1 if bad_any else 0)
