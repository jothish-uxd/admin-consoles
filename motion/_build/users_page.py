"""People › Users, shared by the Edit & bulk actions clips (Selection model, Contextual action bar, Bulk edit,
Progress & results) so the page is the same pixels. Usage: from users_page import make."""
import pathlib
ROOT = pathlib.Path(__file__).resolve().parent.parent
PEOPLE = [  # id, name, initials, title, groups, license, last
  ("hobbie", "Hobbie Klivian", "HK", "Pilot", "Fleet, Rogue Squadron", "Console", "Yesterday"),
  ("cal", "Cal Alder", "CA", "Patrol lead", "Fleet", "Console", "3 days ago"),
  ("zev", "Zev Senesca", "ZS", "Pilot", "Fleet", "Console", "61 days ago"),
  ("wes", "Wes Janson", "WJ", "Gunner", "Fleet, Shield Ops", "Console + AI", "Today"),
  ("bren", "Bren Derlin", "BD", "Security officer", "Fleet", "Console", "Deactivated"),
  ("jes", "Jes Gistang", "JG", "Pilot", "Fleet", "Console", "2 days ago"),
  ("ved", "Ved Foslo", "VF", "Mechanic", "Fleet, Hangar 3", "Console", "Today"),
]
PAGE_CSS = r"""
.btn.sm { height: 32px; font-size: 12.5px; }
.fr { margin-top: 14px; display: flex; gap: 8px; align-items: center; }
.srch { flex: 1; height: 34px; border: 1px solid var(--rule-strong); border-radius: 8px; display: flex; gap: 8px; align-items: center; padding: 0 12px; font-size: 13px; color: var(--faint); }
.srch svg { width: 14px; height: 14px; }
.fb { height: 34px; display: inline-flex; align-items: center; gap: 6px; padding: 0 12px; border: 1px solid var(--rule-strong); border-radius: 8px; font-size: 12.5px; color: var(--ink); white-space: nowrap; }
.fb.on { border-color: var(--ink); background: var(--subtle); font-weight: 500; }
.fb .x { color: var(--faint); }
.slot { position: relative; height: 46px; margin-top: 10px; }
.slot .mt { position: absolute; left: 0; top: 11px; font-size: 12.5px; color: var(--soft); white-space: nowrap; }
.slot .mt b { color: var(--ink); font-weight: 600; }
.bar { position: absolute; left: 0; right: 0; top: 0; height: 38px; background: var(--ink); color: #fff; border-radius: 8px; display: flex; align-items: center; gap: 4px; padding: 0 5px 0 12px; font-size: 12.5px; opacity: 0; z-index: 3; }
.bar > * { flex: none; }
.bar .n { font-weight: 600; white-space: nowrap; margin-right: 6px; }
.bar .sp { flex: 1 1 auto; }
.bar a { color: #fff; text-decoration: underline; text-underline-offset: 3px; white-space: nowrap; margin: 0 4px; }
.bar .sp { flex: 1; }
.bar .btn { height: 28px; font-size: 12px; padding: 0 8px; white-space: nowrap; background: transparent; color: #fff; border-color: #737373; position: relative; }
.bar .btn.clr { border-color: transparent; color: #d4d4d4; }
.bar .btn.off { color: #a3a3a3; border-color: #525252; }
.bar .div { width: 1px; height: 18px; background: #525252; margin: 0 4px; }
table.u { font-size: 13px; }
.u th { padding: 0 10px 8px; }
.u td { height: 50px; padding: 0 10px; }
.u th.ck, .u td.ck { width: 34px; padding: 0 0 0 10px; }
.cb { display: inline-block; width: 16px; height: 16px; border: 1.5px solid var(--rule-strong); border-radius: 4px; background: var(--bg); vertical-align: middle; position: relative; }
.cb.on { background: var(--ink); border-color: var(--ink); }
.cb.on::after { content: ""; position: absolute; left: 4.5px; top: 1.5px; width: 4px; height: 8px; border: solid #fff; border-width: 0 2px 2px 0; transform: rotate(45deg); }
.cb.part { background: var(--ink); border-color: var(--ink); }
.cb.part::after { content: ""; position: absolute; left: 3px; top: 6px; width: 7px; height: 2px; background: #fff; }
.pp { display: flex; gap: 10px; align-items: center; color: var(--ink); font-weight: 500; }
.pp .av { width: 28px; height: 28px; font-size: 10.5px; }
.pp .s { display: block; font-size: 11.5px; color: var(--faint); font-weight: 400; }
.u td.dea { color: var(--ink); font-weight: 600; }
tr.sel td { background: var(--subtle); }
.cnt { margin-top: 8px; font-size: 12px; color: var(--faint); }
"""
def page(jobs=""):
    rows = "\n".join(
        f'          <tr id="r-{i}"><td class="ck"><span class="cb" id="c-{i}"></span></td><td><div class="pp"><span class="av">{ini}</span><div>{n}<span class="s">{t}</span></div></div></td>'
        f'<td>Fleet</td><td id="g-{i}">{g}</td><td>{lic}</td><td{" class=\"dea\"" if last == "Deactivated" else ""}>{last}</td></tr>'
        for i, n, ini, t, g, lic, last in PEOPLE)
    return f"""<div id="stage">
  <div class="win">
    <div class="top">
      <div class="brand"><svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="10" cy="10" r="3" fill="currentColor"/></svg>Echo Base Console</div>
      <span class="crumb" data-path="People / Users"></span>
      <div class="me">Lavanya Sienna · Jedi Master <span class="av">LS</span></div>
__TOAST__
    </div>
    <div class="nav" data-at="people" data-role="admin"></div>
    <div class="main">
      <div class="view">
        <div class="hd"><h1>People</h1><span class="btn sm pri">Invite people</span></div>
        <div class="tabs page"><div class="on">Users</div><div>Groups</div><div>Roles</div></div>
{jobs}        <div class="fr"><div class="srch"><svg><use href="#srch"/></svg>Search people</div><span class="fb on">Team: Fleet <span class="x">✕</span></span><span class="fb">License<i class="cv"></i></span><span class="fb">Status<i class="cv"></i></span></div>
        <div class="slot" id="slot"><div class="mt" id="mt"><b>82 people</b> match Team: Fleet · sorted by name</div>
          <div class="bar" id="bar" role="region" aria-label="Selected people"><span class="n" id="bN">1 selected</span><a id="bAll">Select all 82 matching</a><span class="btn clr" id="bClr">Clear</span><span class="sp"></span>
            <span class="btn" id="bEdit">Edit…</span><span class="btn" id="bGrp">Add to group</span><span class="btn" id="bLic">Change license</span><span class="btn" id="bExp">Export</span><span class="div"></span><span class="btn" id="bSus">Suspend</span></div></div>
        <table class="u" id="tU"><thead><tr><th class="ck"><span class="cb" id="cAll"></span></th><th>Person</th><th>Team</th><th>Groups</th><th>License</th><th>Last active</th></tr></thead><tbody>
{rows}
        </tbody></table><div class="cnt" id="cnt">Showing 1–25 of 82</div>
      </div>
    </div>
__EXTRA__
  </div>
</div>"""
HEAD = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>__TITLE__ · motion scene</title>
<!--
__COMMENT__
  Built on motion/shared (console.css, motion.js): see motion.js for how a scene is put together.
  Open this file in a browser and add ?play to watch it live.
-->
<link rel="stylesheet" href="../shared/console.css">
<style>"""
DEFS = """<svg width="0" height="0" style="position:absolute"><defs>
  <symbol id="ok" viewBox="0 0 16 16"><path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></symbol>
  <symbol id="srch" viewBox="0 0 16 16"><circle cx="7" cy="7" r="4.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M10.5 10.5L14 14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></symbol>
  <symbol id="no" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6.3" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8 4.6v4.2M8 11v.1" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></symbol>
</defs></svg>"""
def make(name, title, comment, css, extra, toast, script, jobs=""):
    s = (HEAD.replace("__TITLE__", title).replace("__COMMENT__", comment) + PAGE_CSS + css + "\n</style>\n</head>\n<body>\n" + DEFS + "\n"
         + page(jobs).replace("__TOAST__", toast).replace("__EXTRA__", extra)
         + '\n<script src="../shared/motion.js"></script>\n<script>\n' + script + "\n</script>\n</body>\n</html>\n")
    d = ROOT / name; d.mkdir(exist_ok=True); (d / "scene.html").write_text(s)
    return s
