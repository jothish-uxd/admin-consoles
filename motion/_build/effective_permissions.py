import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from roles_page import make, head, catalog

CSS = r"""
.drw .f1 { margin-top: 14px; }
.drw .in { width: 100%; box-sizing: border-box; }
.sel3 { justify-content: space-between; }
.res { position: absolute; left: 0; right: 0; top: 62px; z-index: 30; background: var(--bg); box-shadow: 0 12px 32px rgba(0,0,0,.12); border: 1px solid var(--rule-strong); border-radius: 10px; display: none; }
.res > div { display: flex; align-items: center; padding: 7px 10px; font-size: 12.5px; color: var(--ink); }
.res > div span { color: var(--soft); font-size: 12px; margin-left: 8px; }
.res > div.hov { background: var(--hover); }
.av { width: 22px; height: 22px; border-radius: 50%; background: var(--hover); color: var(--ink); font-size: 10px; font-weight: 600; display: inline-grid; place-items: center; margin-right: 8px; flex: none; }
.mnu { position: absolute; left: 24px; right: 24px; z-index: 30; display: none; }
.mnu .it { color: var(--ink); }
.drw .ft2 { margin-top: 14px; display: flex; } .drw .ft2 .sp { flex: 1; }
.ans { display: none; margin-top: 18px; border-top: 1px solid var(--rule); padding-top: 14px; }
.ans .v { display: flex; align-items: center; gap: 10px; }
.ans .v b { font-size: 22px; color: var(--ink); font-weight: 650; }
.ans .v span { color: var(--ink); font-size: 13px; line-height: 1.4; }
.ans .v svg { width: 22px; height: 22px; color: #b91c1c; flex: none; }
.path { margin-top: 12px; }
.step { display: grid; grid-template-columns: 18px 1fr; gap: 8px; padding: 8px 0; border-top: 1px solid var(--rule); }
.step:first-child { border-top: 0; }
.step .n { width: 18px; height: 18px; border-radius: 50%; border: 1px solid var(--rule-strong); font-size: 10.5px; color: var(--ink); display: grid; place-items: center; }
.step .lb { font-size: 11.5px; color: var(--soft); }
.step .tx2 { color: var(--ink); font-size: 12.5px; line-height: 1.4; margin-top: 1px; }
.step .ef { display: inline-block; margin-top: 4px; font-size: 11.5px; border: 1px solid var(--rule-strong); border-radius: 999px; padding: 0 8px; color: var(--ink); }
.step .ef.bl { border-color: #b91c1c; color: #b91c1c; font-weight: 500; }
.step a { display: block; margin-top: 4px; color: var(--ink); text-decoration: underline; text-underline-offset: 3px; font-size: 12px; }
.lock { font-size: 11.5px; color: var(--soft); }
"""
NO = '<svg aria-hidden="true"><use href="#nope"/></svg>'
MAIN = f'      <div class="view">\n{head()}{catalog(checks=True)}      </div>\n'
EXTRA = f'''    <aside class="drw" id="drw" role="dialog" aria-labelledby="dT">
      <div class="tt"><div><b id="dT">Check access</b>Who can do what, and why</div><span class="x" aria-label="Close">✕</span></div>
      <div class="f1" style="position:relative"><label class="lbl" for="fP">Person</label><div class="in f" id="fP"><span id="fPv"></span><span class="c" id="fPc"></span></div>
        <div class="res" id="res"><div id="rH"><span class="av">HK</span>Hobbie Klivian<span>Pilot · Fleet</span></div><div><span class="av">HO</span>Hobbie Ott<span>Ground crew</span></div></div></div>
      <div class="f1" style="position:relative"><label class="lbl">Can they</label><div class="in sel3" id="fA"><span id="fAv" style="color:var(--faint)">Pick a capability</span><i class="cv"></i></div>
        <div class="menu mnu" id="mn" style="top:62px"><div class="it">View people</div><div class="it">Export people</div><div class="it" id="mSh">Share files outside Echo Base</div><div class="it">Read the audit log</div></div></div>
      <div class="ft2"><span class="sp"></span><span class="btn pri" id="bGo">Check</span></div>
      <div class="ans" id="ans" role="status">
        <div class="v">{NO}<b>No</b><span>Hobbie can’t share files outside Echo Base. A locked setting wins over his role.</span></div>
        <div class="path">
          <div class="step"><span class="n">1</span><div><div class="lb">Role</div><div class="tx2">Content admin, through the Fleet content group</div><span class="ef">Allows sharing outside</span><a>Open Fleet content group</a></div></div>
          <div class="step"><span class="n">2</span><div><div class="lb">Setting <span class="lock">· locked by Rebel Alliance</span></div><div class="tx2">External sharing: Off</div><span class="ef bl">Blocks it. Locked settings win</span><a>Open Settings › Defaults</a></div></div>
        </div>
      </div>
    </aside>'''
SCRIPT = r"""const { $, at, span, easeOut } = Motion;
const Q = "Hob";

/* ---------- timeline (scene seconds) ---------- */
const T = {
  chkClick: 0.95, open: [1.00, 1.30], type: [1.50, 1.85], pick: 2.50, aClick: 3.40, shClick: 4.20, goClick: 5.00, ans: 5.10,
  endCard: [7.90, 8.35], end: 8.85
};

function build() {
  const c = at("bChk");
  $("drw").style.transform = "none"; $("drw").style.visibility = "visible";
  $("res").style.display = "block"; const h = at("rH", -100, 0); $("res").style.display = "";
  const a = at("fA", -100, 0);
  $("mn").style.display = "block"; const sh = at("mSh", -60, 0); $("mn").style.display = "";
  const g = at("bGo");
  $("ans").style.display = "block"; const s2 = at("ans", -40, 200); $("ans").style.display = "";
  $("drw").style.transform = ""; $("drw").style.visibility = "";
  const cur = [
    [0.00, 960, 640], [0.25, 960, 640], [0.70, c[0], c[1] + 3], [1.00, c[0], c[1] + 3],
    [2.25, h[0], h[1] + 3], [2.55, h[0], h[1] + 3], [3.15, a[0], a[1] + 3], [3.45, a[0], a[1] + 3], [3.95, sh[0], sh[1] + 3], [4.25, sh[0], sh[1] + 3],
    [4.75, g[0], g[1] + 3], [5.05, g[0], g[1] + 3], [6.60, g[0] + 20, g[1] + 260], [7.90, g[0] + 22, g[1] + 262]
  ];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 345, 1.04], [7.65, 650, 345, 1.04], [7.90, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  $("crumb").innerHTML = "/ People / <b>Roles</b>";
  $("bChk").classList.toggle("dn", t >= T.chkClick - .05 && t < T.open[0] + .1);
  const o = span(t, ...T.open, easeOut);
  $("drw").style.transform = `translateX(${440 * (1 - o)}px)`; $("drw").style.visibility = o > 0 ? "visible" : "hidden";
  // who: a person, picked from search
  const n = Math.round(Q.length * span(t, ...T.type, x => x)), p = t >= T.pick;
  $("fPv").textContent = p ? "Hobbie Klivian · Pilot · Fleet" : Q.slice(0, n);
  const blink = Math.floor(t * 2.4) % 2 === 0;
  $("fP").className = "in" + (t >= T.open[1] && !p ? " f" : ""); $("fPc").style.display = t >= T.open[1] && !p && blink ? "" : "none";
  $("res").style.display = n > 0 && !p ? "block" : "none";
  $("rH").classList.toggle("hov", t >= T.pick - .3);
  // what: one capability, in plain words
  $("mn").style.display = t >= T.aClick && t < T.shClick ? "block" : "none";
  $("mSh").classList.toggle("hov", t >= T.shClick - .3);
  const s = t >= T.shClick;
  $("fAv").textContent = s ? "Share files outside Echo Base" : "Pick a capability"; $("fAv").style.color = s ? "var(--ink)" : "var(--faint)";
  $("fA").className = "in sel3" + (t >= T.aClick && t < T.shClick ? " f" : "");
  $("bGo").classList.toggle("dn", t >= T.goClick - .05 && t < T.ans);
  // the answer first, then each step that decided it, each linked to where it can be changed
  $("ans").style.display = t >= T.ans ? "block" : "none";
}

function events() { return [["click", T.chkClick], ["whoosh", T.open[0]], ["key", T.type[0]], ["click", T.pick], ["click", T.aClick], ["click", T.shClick], ["click", T.goClick]]; }

Motion.scene({
  // 5+ steps: natural length, within the 15 s cap
  T, clicks: [T.chkClick, T.pick, T.aClick, T.shClick, T.goClick], build, render, events,
  slow: [[5.4, 7.4, 1.3]]
});"""
COMMENT = """  Source for media/roles-permissions/effective-permissions.mp4. Built by motion/_build/effective_permissions.py on _build/roles_page.py,
  with the top bar's alerts bell.
  Follows the Effective permissions card (data/guidance-people.js):
  - ask one question: can this person do this one thing
  - the answer first, in words, then why: each role and setting that decided it, in order
  - a locked setting from the parent organization wins over a role, and says so
  - each step links to where it can be changed"""
make("effective-permissions", "Effective permissions", COMMENT, CSS, "People / Roles", MAIN, SCRIPT, extra=EXTRA)
