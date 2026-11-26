import sys, pathlib; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from settings_page import make, head, int_sub, CONNECTED

CSS = r"""
.vw { position: absolute; left: 32px; right: 32px; top: 20px; }
#vB { opacity: 0; }
.tb { margin-top: 14px; display: flex; gap: 8px; align-items: center; }
.sb { width: 280px; height: 34px; border: 1.5px solid var(--rule-strong); border-radius: 8px; display: flex; align-items: center; gap: 8px; padding: 0 10px; font-size: 13px; color: var(--faint); box-sizing: border-box; }
.sb.f { border-color: var(--ink); color: var(--ink); box-shadow: 0 0 0 3px rgba(23,23,23,.08); }
.sb svg { width: 14px; height: 14px; color: var(--soft); flex: none; }
.sb .c { width: 1.5px; height: 16px; background: var(--ink); margin-left: -7px; }
.chip { height: 30px; display: inline-flex; align-items: center; padding: 0 11px; border-radius: 999px; border: 1px solid var(--rule-strong); font-size: 12.5px; color: var(--ink); }
.chip.on { background: var(--ink); color: #fff; border-color: var(--ink); }
.grid { margin-top: 14px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.tile { border: 1px solid var(--rule); border-radius: 12px; padding: 12px 14px; font-size: 12.5px; color: var(--soft); height: 112px; box-sizing: border-box; }
.tile.sel { border-color: var(--ink); background: var(--subtle); }
.tile .t { display: flex; gap: 10px; align-items: center; }
.tile .t b { color: var(--ink); font-size: 13.5px; font-weight: 600; display: block; }
.tile .t .by { font-size: 11.5px; color: var(--soft); }
.tile .d { margin-top: 8px; line-height: 1.4; height: 18px; }
.tile .s { margin-top: 6px; }
.res { margin-top: 12px; font-size: 12.5px; color: var(--soft); height: 16px; }
.res b { color: var(--ink); font-weight: 500; }
.opt { margin-top: 6px; border: 1px solid var(--rule); border-radius: 9px; padding: 8px 11px; display: flex; gap: 9px; font-size: 12px; color: var(--soft); }
.opt b { display: block; color: var(--ink); font-weight: 500; font-size: 12.5px; }
.opt .rd { width: 14px; height: 14px; border-radius: 50%; border: 1.5px solid var(--rule-strong); flex: none; margin-top: 2px; position: relative; box-sizing: border-box; }
.opt.on { border-color: var(--ink); }
.opt.on .rd { border-color: var(--ink); }
.opt.on .rd::after { content: ""; position: absolute; inset: 2px; border-radius: 50%; background: var(--ink); }
.drw .ft { margin-top: 16px; display: flex; gap: 8px; align-items: center; }
.drw .ft .sp { flex: 1; }
.drw .ft .btn { height: 34px; }
"""
OK = '<svg aria-hidden="true"><use href="#ok"/></svg>'
NO = '<svg aria-hidden="true"><use href="#nope"/></svg>'
TILES = [
  ("tCal", "HN", "Holonet Calendar", "Holonet Systems · Verified", "Shows meetings and books rooms.", '<span class="pill warn" id="calP">Needs approval · 14 asking</span>'),
  ("tCor", "CS", "Coruscant Scheduler", "Coruscant Labs", "Finds meeting times across teams.", '<span class="pill bad">Blocked</span>'),
  ("tAst", "AD", "Astromech Diagrams", "R2 Works · Verified", "Draws diagrams inside documents.", '<span class="pill">Anyone can connect</span>'),
  ("tKes", "KT", "Kessel Translate", "Kessel Run Co.", "Translates documents and messages.", '<span class="pill">Anyone can connect</span>'),
  ("tSta", "SN", "Starmap Notes", "Starmap Inc.", "Notes that link to files and people.", '<span class="pill warn">Needs approval</span>'),
  ("tHol", "HC", "HoloComms", "HoloComms · Verified", "Sends alerts and messages to chat.", '<span class="pill dk">Connected</span>'),
]
def tile(i, lg, n, by, d, s):
    return f'<div class="tile" id="{i}"><div class="t"><span class="lg">{lg}</span><div><b>{n}</b><span class="by">{by}</span></div></div><div class="d">{d}</div><div class="s">{s}</div></div>'
MAIN = f'''      <div class="view" id="vC">
{head("Integrations")}{int_sub("connected")}{CONNECTED()}      </div>
      <div class="view" id="vB">
{head("Integrations")}{int_sub("browse").replace('id="sg-', 'id="sb-')}        <div class="tb"><span class="sb" id="sBox"><svg><use href="#srch"/></svg><span id="sTx">Search integrations</span><span class="c" id="sC"></span></span>
          <span class="chip on">All</span><span class="chip">Calendar &amp; chat</span><span class="chip">Files</span><span class="chip">Security</span><span class="chip">HR &amp; finance</span></div>
        <div class="res" id="res"><b>48 integrations</b> · 9 connected or allowed · 3 need approval</div>
        <div class="grid" id="grid">{"".join(tile(*x) for x in TILES)}</div>
      </div>'''
EXTRA = f'''    <aside class="drw" id="drw" role="dialog" aria-labelledby="dT">
      <div class="tt"><span class="lg">HN</span><div><b id="dT">Holonet Calendar</b>by Holonet Systems · Verified publisher</div><span class="x" aria-label="Close">✕</span></div>
      <h4>What it can do for each person who connects it</h4>
      <div class="can">{OK}See that person’s calendar</div>
      <div class="can">{OK}Create and change their events, and book rooms</div>
      <div class="can no">{NO}Can’t read files, messages or anyone else’s calendar</div>
      <h4>Who’s asking</h4><div>14 people asked to connect it this month. None have it yet.</div>
      <h4>Who can connect it</h4>
      <div class="opt" id="oAdm"><span class="rd"></span><div><b>Admins approve each request</b>People ask, and an admin decides</div></div>
      <div class="opt" id="oAny"><span class="rd"></span><div><b>Anyone in the org</b>People connect it themselves, with the access above</div></div>
      <div class="opt"><span class="rd"></span><div><b>Blocked</b>No one can connect it, and requests are turned down</div></div>
      <div class="ft"><span>Changes are logged.</span><span class="sp"></span><span class="btn">Cancel</span><span class="btn pri" id="bSave">Save</span></div>
    </aside>'''
TOAST = '      <div class="toast" id="toast"><i><svg width="11" height="11"><use href="#ok"/></svg></i>Anyone can connect Holonet Calendar · the 14 waiting requests are approved</div>'
SCRIPT = r"""const { $, at, span, easeOut } = Motion;
const Q = "cal";

/* ---------- timeline (scene seconds) ---------- */
const T = {
  brClick: 0.95, toB: [1.00, 1.25], sClick: 1.95, type: [2.10, 2.50], filt: 2.60, tClick: 3.40, open: [3.45, 3.75],
  anyClick: 4.80, saveClick: 5.60, close: [5.70, 5.95], toast: [5.95, 7.40], endCard: [7.70, 8.15], end: 8.8
};

function build() {
  const br = at("sg-browse");
  $("vB").style.opacity = 1; const sb = at("sBox", -60, 0), tc = at("tCal", -40, -10); $("vB").style.opacity = 0;
  $("drw").style.transform = "none"; const an = at("oAny", -80, 0), sv = at("bSave"); $("drw").style.transform = "";
  const cur = [
    [0.00, 960, 640], [0.25, 960, 640], [0.75, br[0], br[1] + 3], [1.00, br[0], br[1] + 3],
    [1.75, sb[0], sb[1] + 3], [2.00, sb[0], sb[1] + 3], [2.70, sb[0] + 40, sb[1] + 50],
    [3.20, tc[0], tc[1] + 3], [3.45, tc[0], tc[1] + 3],
    [4.55, an[0], an[1] + 3], [4.85, an[0], an[1] + 3], [5.35, sv[0], sv[1] + 3], [5.65, sv[0], sv[1] + 3], [7.70, sv[0] - 120, sv[1] - 40]
  ];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 350, 1.04], [7.45, 650, 350, 1.04], [7.70, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  // Connected, then Browse: one view at a time
  const b = t >= T.toB[0];
  $("vC").style.opacity = 1 - span(t, T.toB[0], T.toB[0] + .1); $("vB").style.opacity = span(t, T.toB[0] + .12, T.toB[1]);
  $("sg-browse").classList.toggle("prs", t >= T.brClick - .05 && t < T.toB[0]);
  $("crumb").innerHTML = "/ Settings / <b>Integrations</b>";
  // search
  const f = t >= T.sClick && t < T.tClick;
  $("sBox").classList.toggle("f", f);
  const n = Math.round(Q.length * span(t, ...T.type, x => x));
  $("sTx").textContent = n ? Q.slice(0, n) : "Search integrations";
  $("sBox").classList.toggle("f", t >= T.sClick && t < T.tClick);
  $("sC").style.display = f && Math.floor(t * 2.4) % 2 === 0 ? "" : "none";
  const fl = t >= T.filt;
  ["tAst", "tKes", "tSta", "tHol"].forEach(id => $(id).style.display = fl ? "none" : "");
  $("res").innerHTML = fl ? '<b>2 results</b> for “cal”' : "<b>48 integrations</b> · 9 connected or allowed · 3 need approval";
  $("tCal").classList.toggle("sel", t >= T.tClick && t < T.close[1]);
  // the drawer: what it can reach, and who may connect it
  const o = span(t, ...T.open, easeOut) * (1 - span(t, ...T.close, easeOut));
  $("drw").style.transform = `translateX(${440 * (1 - o)}px)`; $("drw").style.visibility = o > 0 ? "visible" : "hidden";
  const any = t >= T.anyClick;
  $("oAdm").classList.toggle("on", !any); $("oAny").classList.toggle("on", any);
  $("bSave").classList.toggle("dn", t >= T.saveClick - .05 && t < T.close[0]);
  $("calP").className = "pill" + (t >= T.close[0] ? "" : " warn");
  $("calP").textContent = t >= T.close[0] ? "Anyone can connect" : "Needs approval · 14 asking";
  $("toast").style.opacity = span(t, T.toast[0], T.toast[0] + .2) * (1 - span(t, T.toast[1] - .2, T.toast[1]));
}

function events() { return [["click", T.brClick], ["click", T.sClick], ["key", T.type[0]], ["click", T.tClick], ["whoosh", T.open[0]], ["click", T.anyClick], ["click", T.saveClick], ["pop", T.toast[0]]]; }

Motion.scene({
  // 5+ steps: natural length, within the 15 s cap
  T, clicks: [T.brClick, T.sClick, T.tClick, T.anyClick, T.saveClick], build, render, events,
  slow: [[3.8, 4.5, 1.6]]
});"""
COMMENT = """  Source for media/integrations-api/integration-catalog.mp4. Built by motion/_build/integration_catalog.py on _build/settings_page.py,
  so Settings › Integrations is the same page as in the other clips.
  Follows the Integration catalog card (data/guidance-platform.js):
  - each integration with what it does, who makes it, and its status (connected, allowed, needs approval, blocked)
  - search; the detail says what it can reach in plain words, including what it can't
  - who's asking for it; admins choose who may connect it: approve each request, anyone, or blocked
  - saving approves the waiting requests, and is logged"""
make("integration-catalog", "Integration catalog", COMMENT, CSS, "Settings / Integrations", MAIN, SCRIPT, extra=EXTRA, toast=TOAST)
