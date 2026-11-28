import sys, pathlib; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from roles_page import make, head, catalog
from group_page import head as ghead

ROOT = pathlib.Path(__file__).resolve().parent.parent
CSS = r"""
.gsr { margin-left: auto; margin-right: 14px; width: 280px; height: 32px; border: 1px solid var(--rule-strong); border-radius: 8px; display: flex; align-items: center; gap: 8px; padding: 0 10px; font-size: 12.5px; color: var(--faint); box-sizing: border-box; background: var(--bg); }
.gsr svg { width: 13px; height: 13px; color: var(--soft); }
.gsr kbd, .pal kbd { margin-left: auto; font-family: "Geist Mono", monospace; font-size: 11px; color: var(--soft); border: 1px solid var(--rule-strong); border-radius: 5px; padding: 0 5px; }
.top .me { margin-left: 0; }
#vG { display: none; }
.scr3 { position: absolute; inset: 52px 0 0 0; background: rgba(23,23,23,.28); z-index: 30; opacity: 0; border-radius: 0 0 14px 14px; }
.pal { position: absolute; left: 300px; top: 64px; width: 600px; z-index: 31; background: var(--bg); border-radius: 14px; box-shadow: 0 24px 60px rgba(0,0,0,.22); font-size: 12.5px; color: var(--soft); visibility: hidden; overflow: hidden; }
.pal .pin { height: 48px; display: flex; align-items: center; gap: 10px; padding: 0 16px; border-bottom: 1px solid var(--rule); font-size: 14px; color: var(--faint); }
.pal .pin svg { width: 15px; height: 15px; color: var(--soft); }
.pal .pin .q { color: var(--ink); white-space: pre; }
.pal .pin .c { width: 1.5px; height: 18px; background: var(--ink); margin-left: -8px; }
.pal .gp { padding: 6px 8px 2px; }
.pal .gl { font-size: 11.5px; color: var(--soft); font-weight: 600; padding: 4px 8px; }
.pal .ri { display: flex; align-items: center; gap: 10px; height: 36px; padding: 0 8px; border-radius: 8px; color: var(--ink); font-size: 13px; }
.pal .ri .cx { color: var(--soft); font-size: 12px; }
.pal .ri .ty2 { margin-left: auto; font-size: 11.5px; color: var(--soft); }
.pal .ri.hi { background: var(--hover); }
.pal .ri .gi { width: 24px; height: 24px; border-radius: 6px; background: var(--subtle); border: 1px solid var(--rule); display: grid; place-items: center; font-size: 10px; font-weight: 600; color: var(--ink); flex: none; }
.pal .ri .gi.p { border-radius: 50%; }
.pal .pf { display: flex; gap: 14px; align-items: center; padding: 9px 16px; border-top: 1px solid var(--rule); font-size: 11.5px; color: var(--soft); margin-top: 6px; }
.pal .pf .sp { flex: 1; }
.gv .back { font-size: 12.5px; color: var(--soft); margin-top: 14px; }
.gv .gh { margin-top: 6px; display: flex; align-items: center; gap: 10px; }
.gv .gh h1 { margin: 0; }
.gv .bdg { font-size: 11.5px; font-weight: 600; border: 1px solid var(--rule-strong); border-radius: 999px; padding: 1px 9px; color: var(--ink); }
.gv .gsub { margin-top: 3px; font-size: 13px; color: var(--soft); }
.gv .tabs.page { margin-top: 14px; }
.gv table { margin-top: 10px; font-size: 13px; width: 100%; border-collapse: collapse; }
.gv th { padding: 0 10px 8px; text-align: left; font-size: 12px; color: var(--soft); font-weight: 500; border-bottom: 1px solid var(--rule); }
.gv td { height: 46px; padding: 0 10px; border-bottom: 1px solid var(--rule); color: var(--soft); }
.gv .pp { display: flex; gap: 10px; align-items: center; color: var(--ink); font-weight: 500; }
.gv .av2 { width: 26px; height: 26px; border-radius: 50%; background: var(--hover); color: var(--ink); font-size: 10px; font-weight: 600; display: grid; place-items: center; }
"""
SRCH = '<svg aria-hidden="true"><use href="#srch"/></svg>'
TOPSEARCH = f'<div class="gsr" id="gsr" role="button" aria-label="Search Echo Base">{SRCH}Search Echo Base<kbd>⌘K</kbd></div>\n      <div class="me">'
def ri(i, ic, name, ctx, ty, p=False):
    return f'<div class="ri" id="{i}"><span class="gi{" p" if p else ""}">{ic}</span>{name}<span class="cx">{ctx}</span><span class="ty2">{ty}</span></div>'
PAL = f'''    <div class="scr3" id="scr3"></div>
    <section class="pal" id="pal" role="dialog" aria-label="Search Echo Base">
      <div class="pin" role="combobox" aria-expanded="true">{SRCH}<span class="q" id="pQ"></span><span id="pPh">Search people, groups, roles, settings and pages</span><span class="c" id="pC"></span></div>
      <div id="rec"><div class="gp"><div class="gl">Recent</div>{ri("r1", "SA", "Security admin", "Role", "")}{ri("r2", "HE", "Hoth Evacuation", "Group · 42 people", "")}{ri("r3", "⚙", "Defaults", "Settings", "")}</div></div>
      <div id="hits" role="listbox" style="display:none">
        <div class="gp"><div class="gl">People</div>{ri("hP", "CA", "Cal Alder", "Fleet operations lead · Admin · Fleet", "Person", True)}</div>
        <div class="gp"><div class="gl">Groups</div>{ri("hG", "FL", "Fleet", "214 people · 6 groups", "Group")}{ri("hG2", "FC", "Fleet content", "18 people · Content admin", "Group")}</div>
        <div class="gp"><div class="gl">Roles</div>{ri("hR", "AD", "Admin · Fleet", "1 person", "Role")}</div>
        <div class="gp"><div class="gl">Settings</div>{ri("hS", "⚙", "Defaults", "Fleet overrides 2 settings", "Setting")}</div>
      </div>
      <div class="pf"><span><kbd>↑</kbd> <kbd>↓</kbd> to move</span><span><kbd>Enter</kbd> to open</span><span class="sp"></span><span>Shortcut: change or turn off in Preferences</span></div>
    </section>'''
FLEET = (ghead("Fleet", "Static", "214 people · 6 nested groups · owned by Cal Alder", ["Members", "Nested groups", "Access", "Settings"], "Members")
         .replace('<div class="back">', '<div class="back">', 1)
         + '        <table><thead><tr><th>Name</th><th>Team</th><th>How they’re in it</th></tr></thead><tbody>'
         + "".join(f'<tr><td><div class="pp"><span class="av2">{a}</span>{n}</div></td><td>{tm}</td><td>{h}</td></tr>' for a, n, tm, h in [
             ("CA", "Cal Alder", "Fleet operations", "Owner · directly"), ("WA", "Wedge Antilles", "Rogue Squadron", "Through Rogue Squadron"),
             ("WJ", "Wes Janson", "Rogue Squadron", "Through Rogue Squadron"), ("HK", "Hobbie Klivian", "Rogue Squadron", "Through Rogue Squadron"), ("DR", "Dak Ralter", "Snowspeeders", "Directly")])
         + '</tbody></table><div style="margin-top:8px;font-size:12px;color:var(--faint)">Showing 5 of 214</div>\n')
PH = head().split('        <div class="rbar">')[0]
MAIN = (f'      <div class="view" id="vR">\n{head()}{catalog(checks=True)}      </div>\n'
        f'      <div class="view gv" id="vG">\n{FLEET}      </div>\n')
SCRIPT = r"""const { $, at, span, easeOut } = Motion;
const Q = "fleet";

/* ---------- timeline (scene seconds) ---------- */
const T = { gClick: 1.00, open: [1.05, 1.30], type: [1.90, 2.40], down: 3.40, enter: 4.30, endCard: [6.10, 6.55], end: 7.05 };

function build() {
  const g = at("gsr");
  const cur = [[0.00, 960, 640], [0.25, 960, 640], [0.75, g[0] - 40, g[1] + 3], [1.05, g[0] - 40, g[1] + 3], [2.60, g[0] - 60, g[1] + 260], [6.10, g[0] - 58, g[1] + 262]];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 345, 1.04], [5.85, 650, 345, 1.04], [6.10, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  const g = t >= T.enter;
  $("crumb").innerHTML = g ? "/ People / Groups / <b>Fleet</b>" : "/ People / <b>Roles</b>";
  $("vR").style.display = g ? "none" : "block"; $("vG").style.display = g ? "block" : "none";
  document.querySelector(".tabs.page").parentElement && document.querySelectorAll("#vG .tabs.page div");
  // opens on recent items; results grouped by type as she types
  const o = t >= T.gClick && t < T.enter ? span(t, ...T.open, easeOut) : 0;
  $("pal").style.visibility = o > 0 ? "visible" : "hidden"; $("pal").style.opacity = o; $("scr3").style.opacity = o;
  $("pal").style.transform = `translateY(${6 * (1 - o)}px)`;
  const n = Math.round(Q.length * span(t, ...T.type, x => x));
  $("pQ").textContent = Q.slice(0, n); $("pPh").style.display = n ? "none" : "";
  $("pC").style.opacity = t < T.type[1] + .05 || Math.floor(t * 2.4) % 2 === 0 ? 1 : 0;
  $("rec").style.display = n >= 2 ? "none" : ""; $("hits").style.display = n >= 2 ? "" : "none";
  $("r1").classList.toggle("hi", n < 2);
  // arrow keys move the highlight; Enter opens it
  const d = t >= T.down;
  $("hP").classList.toggle("hi", n >= 2 && !d); $("hG").classList.toggle("hi", d);
  $("gsr").style.borderColor = t >= T.gClick - .2 && t < T.gClick + .1 ? "var(--ink)" : "";
}

function events() { return [["click", T.gClick], ["whoosh", T.open[0]], ["key", T.type[0]], ["key", T.down], ["key", T.enter]]; }

Motion.scene({
  // under 5 steps: natural length, within the 10 s cap
  T, clicks: [T.gClick], build, render, events,
  slow: [[2.5, 3.3, 1.3]]
});"""
COMMENT = """  Source for media/search-filtering/global-admin-search.mp4. Built by motion/_build/global_search.py on _build/roles_page.py,
  with the top bar's alerts bell, and a search in the top bar (only in this clip for now: see FINAL_PASS.md).
  Follows the Global admin search card (data/guidance-foundations.js):
  - from anywhere: the top bar, or ⌘K, a shortcut that can be changed or turned off
  - opens on recent items; results grouped by type, with enough context to choose; only what she can access
  - arrow keys and Enter, as a listbox; it jumps straight to the Fleet group"""
make("global-admin-search", "Global admin search", COMMENT, CSS, "People / Roles", MAIN, SCRIPT, extra=PAL)
f = ROOT / "global-admin-search" / "scene.html"; s = f.read_text()
s = s.replace('      <div class="me">', '      ' + TOPSEARCH, 1); f.write_text(s)
