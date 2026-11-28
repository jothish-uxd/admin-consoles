"""The top bar's alerts bell, for the Notifications & alerts clips (Alert center, Banners, Notification rules, Announcements).
Other clips don't have it yet (a known gap). Usage: from bell import CSS, add; add(name, count=3) after building a scene."""
import pathlib
ROOT = pathlib.Path(__file__).resolve().parent.parent
CSS = r"""
.bell { position: relative; width: 34px; height: 34px; border-radius: 8px; display: grid; place-items: center; color: var(--ink); margin-right: 4px; }
.bell.on { background: var(--hover); }
.bell svg { width: 18px; height: 18px; }
.bell .bdg { position: absolute; right: 1px; top: 1px; min-width: 17px; height: 17px; border-radius: 999px; background: #b91c1c; color: #fff; font-size: 10.5px; font-weight: 600; display: grid; place-items: center; padding: 0 4px; box-sizing: border-box; border: 2px solid var(--bg); }
"""
SVG = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 2.6a5 5 0 0 0-5 5v3.1L3.6 13.4h12.8L15 10.7V7.6a5 5 0 0 0-5-5z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M8 15.6a2 2 0 0 0 4 0" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>'

def add(name, count=3):
    p = ROOT / name / "scene.html"; s = p.read_text()
    if 'class="bell"' in s: return  # already has one (a shared page builder added it)
    tag = '<div class="me">'
    assert s.count(tag) == 1, name
    s = s.replace(tag, tag + f'<span class="bell" id="bell" aria-label="Alerts, {count} need action">{SVG}<span class="bdg" id="bdg">{count}</span></span>')
    s = s.replace("</style>", CSS + "</style>", 1)
    p.write_text(s)
