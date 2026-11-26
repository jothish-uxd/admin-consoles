"""A bare console shell (top bar, rail, main) for pages no earlier clip shows, such as Home's first run or a member's view.
Usage: from shell import make; make(name, title, comment, css, crumb, nav_at, main, script, role="admin", me=..., extra="", defs="")."""
import pathlib
ROOT = pathlib.Path(__file__).resolve().parent.parent
ADMIN = 'Lavanya Sienna · Jedi Master <span class="av">LS</span>'
def make(name, title, comment, css, crumb, nav_at, main, script, role="admin", me=ADMIN, extra="", defs="", toast=""):
    s = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>{title} · motion scene</title>
<!--
{comment}
  Built on motion/shared (console.css, motion.js): see motion.js for how a scene is put together.
  Open this file in a browser and add ?play to watch it live.
-->
<link rel="stylesheet" href="../shared/console.css">
<style>
.btn.sm {{ height: 32px; font-size: 12.5px; }}
.toast {{ position: absolute; left: 700px; top: 4px; transform: translateX(-50%); background: var(--ink); color: #fff; border-radius: 10px; height: 44px; display: flex; align-items: center; gap: 10px; padding: 0 16px 0 12px; font-size: 13px; opacity: 0; box-shadow: 0 10px 30px rgba(0,0,0,.18); white-space: nowrap; z-index: 40; }}
.toast i {{ width: 18px; height: 18px; border-radius: 50%; background: #fff; color: var(--ink); display: grid; place-items: center; }}
{css}
</style>
</head>
<body>
<svg width="0" height="0" style="position:absolute"><defs>
  <symbol id="ok" viewBox="0 0 16 16"><path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></symbol>
{defs}
</defs></svg>
<div id="stage">
  <div class="win">
    <div class="top">
      <div class="brand"><svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="10" cy="10" r="3" fill="currentColor"/></svg>Echo Base Console</div>
      <span class="crumb" id="crumb" data-path="{crumb}"></span>
      <div class="me">{me}</div>
{toast}
    </div>
    <div class="nav" data-at="{nav_at}" data-role="{role}"></div>
    <div class="main">
{main}
    </div>
{extra}
  </div>
</div>
<script src="../shared/motion.js"></script>
<script>
{script}
</script>
</body>
</html>
"""
    d = ROOT / name; d.mkdir(exist_ok=True); (d / "scene.html").write_text(s)
    return s
