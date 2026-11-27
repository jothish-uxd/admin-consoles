#!/usr/bin/env python3
"""Stamp the site before a commit or publish. Run from the repo root:  python3 tools/stamp.py

1. Version: reads the newest "## vX.Y.Z ..." heading in CHANGELOG.md and writes it into the header badge
   of index.html, category.html and changelog.html. The changelog is the single source of the version.
2. Cache keys: every ?v= on the pages' scripts and styles, and on each clip and poster in data/videos.js,
   becomes the first 8 characters of that file's SHA-1. A key changes only when its file does, so there's
   nothing to bump by hand.

Re-running it is safe: unchanged files keep their keys. Use --check to report what would change and exit 1
if anything is out of date (handy before tagging a release)."""
import hashlib, pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
PAGES = ["index.html", "category.html", "changelog.html"]
CHECK = "--check" in sys.argv
changed = []

def h(path):
    p = ROOT / path
    return hashlib.sha1(p.read_bytes()).hexdigest()[:8] if p.exists() else None

def write(path, old, new):
    if old != new:
        changed.append(path)
        if not CHECK: (ROOT / path).write_text(new)

# 1. clips and posters in videos.js: media/…/x.mp4?r=2 or ?v=abcd1234 → ?v=<hash>
vp = "data/videos.js"; v = (ROOT / vp).read_text()
def media(m):
    key = h(m.group(1))
    return m.group(1) + (f"?v={key}" if key else "")
nv = re.sub(r'(media/[\w./-]+\.(?:mp4|jpg|png|webm))(?:\?[rv]=[\w]+)?', media, v)
write(vp, v, nv)

# 2. version from the changelog
log = (ROOT / "CHANGELOG.md").read_text()
m = re.search(r"^## (v\d+\.\d+\.\d+(?: preview)?)", log, re.M)
version = m.group(1) if m else None

# 3. pages: badge text and ?v= keys on local assets (after videos.js is final, so its hash is current)
for page in PAGES:
    p = ROOT / page
    if not p.exists(): continue
    s = p.read_text()
    ns = re.sub(r'<meta name="changelog" content="CHANGELOG\.md(?:\?v=\w+)?">', f'<meta name="changelog" content="CHANGELOG.md?v={h("CHANGELOG.md")}">', s)
    ns = re.sub(r'((?:href|src|data-src)="((?:assets|data)/[\w./-]+|CHANGELOG\.md))(?:\?v=[\w]+)?"',
                lambda m: f'{m.group(1)}?v={h(m.group(2))}"' if h(m.group(2)) else m.group(0), ns)
    if version:
        ns = re.sub(r'(<a class="header-badge"[^>]*>)[^<]*(</a>)', lambda m: m.group(1) + version + m.group(2), ns)
    write(page, s, ns)

print(f"version {version}")
if changed:
    print(("out of date: " if CHECK else "stamped: ") + ", ".join(changed))
    sys.exit(1 if CHECK else 0)
print("everything up to date")
