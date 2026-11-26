import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from insights_page import make, home_head, OK

CSS = r"""
.rc { margin-top: 12px; border: 1px solid var(--rule); border-radius: 12px; padding: 12px 16px; font-size: 12.5px; color: var(--soft); position: relative; }
.rc h3 { margin: 0; font-size: 14px; color: var(--ink); font-weight: 600; }
.rc .im { color: var(--ink); font-weight: 500; }
.rc .ac2 { margin-top: 10px; display: flex; gap: 8px; align-items: center; }
.rc .ac2 .sp { flex: 1; } .rc .ac2 .btn { height: 30px; }
.rc a { color: var(--ink); text-decoration: underline; text-underline-offset: 3px; }
.rc .wl { display: inline-block; margin-top: 6px; font-size: 12.5px; }
.rc .why { display: none; margin-top: 6px; background: var(--subtle); border-radius: 8px; padding: 8px 10px; color: var(--ink); line-height: 1.45; }
.rc .cf2 { display: none; margin-top: 10px; border-top: 1px solid var(--rule); padding-top: 10px; color: var(--ink); }
.rc .cf2 .ac2 { margin-top: 8px; }
.rc .dn3 { display: none; align-items: center; gap: 8px; color: var(--ink); font-size: 13px; }
.rc .dn3 a { margin-left: 6px; }
.dmn { position: absolute; left: 96px; bottom: 50px; width: 230px; z-index: 20; display: none; }
.dmn .hh { font-size: 11.5px; color: var(--soft); padding: 4px 10px; }
.dmn .it { color: var(--ink); }
.top2 { margin-top: 14px; display: flex; align-items: center; color: var(--soft); font-size: 12.5px; }
.top2 .sp { flex: 1; }
"""
MAIN = f'''      <div class="view">
{home_head("rec", 3)}        <div class="top2"><span>From Echo Base’s own data, sorted by impact. Nothing happens until you confirm.</span><span class="sp"></span><span id="act">Acted on this quarter: 7</span></div>
        <div class="rc" id="c1"><div id="c1b"><h3>Reclaim 42 unused licenses</h3><div class="d">42 people haven’t signed in for 90 days. <span class="im">Saves $5,040 a year.</span></div>
          <a class="wl" id="aWhy" aria-expanded="false" aria-controls="why">Why am I seeing this?</a>
          <div class="why" id="why">Based on sign-ins from Aug 28 to today. 3 people on leave are left out. Licenses go back to the pool; their files and access to them stay.</div>
          <div class="ac2" id="c1a"><span class="btn pri" id="bRv">Review 42 people</span><span class="btn">Dismiss</span></div>
          <div class="cf2" id="cf"><b>Remove licenses from 42 people?</b> They keep their files and can ask for a license again.<div class="ac2"><span class="btn">Cancel</span><span class="btn pri" id="bOk">Remove 42 licenses</span></div></div></div>
          <div class="dn3" id="d1" role="status">{OK}<span>42 licenses are back in the pool. $5,040 a year saved.</span><a>Undo</a></div></div>
        <div class="rc"><h3>Require MFA for admins now</h3><div class="d">2 of 14 admins haven’t enrolled. Admin accounts are the most targeted. <span class="im">Closes 2 risky accounts.</span></div>
          <a class="wl">Why am I seeing this?</a><div class="ac2"><span class="btn pri">Review 2 admins</span><span class="btn">Dismiss</span></div></div>
        <div class="rc" id="c3"><div id="c3b"><h3>Turn off public links older than a year</h3><div class="d">38 files still have a public link made more than a year ago. <span class="im">Closes 38 links.</span></div>
          <a class="wl">Why am I seeing this?</a><div class="ac2"><span class="btn pri">Review 38 links</span><span class="btn" id="bDm">Dismiss</span></div>
          <div class="menu dmn" id="dmn"><div class="hh">Why dismiss it?</div><div class="it">Not relevant to us</div><div class="it" id="oEl">We handle it elsewhere</div><div class="it">Remind me in a month</div></div></div>
          <div class="dn3" id="d3" role="status"><span>Dismissed: you handle it elsewhere. It won’t show again.</span><a>Undo</a></div></div>
      </div>
'''
SCRIPT = r"""const { $, at, span, easeOut } = Motion;

/* ---------- timeline (scene seconds) ---------- */
const T = { wClick: 1.20, rClick: 2.60, okClick: 3.90, d1: 4.00, dClick: 5.30, eClick: 6.20, d3: 6.30, endCard: [8.20, 8.65], end: 9.15 };

function build() {
  const w = at("aWhy");
  $("why").style.display = "block"; const r = at("bRv"); $("cf").style.display = "block"; $("c1a").style.display = "none"; const ok = at("bOk");
  $("c1b").style.display = "none"; $("d1").style.display = "flex"; const dm = at("bDm"); $("dmn").style.display = "block"; const e = at("oEl", -40, 0);
  ["why", "cf", "c1a", "c1b", "d1", "dmn"].forEach(i => $(i).style.display = "");
  const cur = [[0.00, 960, 640], [0.25, 960, 640], [0.85, w[0], w[1] + 3], [1.25, w[0], w[1] + 3], [2.25, r[0], r[1] + 3], [2.65, r[0], r[1] + 3],
    [3.55, ok[0], ok[1] + 3], [3.95, ok[0], ok[1] + 3], [4.95, dm[0], dm[1] + 3], [5.35, dm[0], dm[1] + 3], [5.85, e[0], e[1] + 3], [6.25, e[0], e[1] + 3], [8.20, e[0] + 300, e[1] + 120]];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 345, 1.04], [7.95, 650, 345, 1.04], [8.20, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  $("crumb").innerHTML = "/ Home / <b>Recommendations</b>";
  // why it's showing, then a confirm that says what changes
  $("why").style.display = t >= T.wClick ? "block" : "none"; $("aWhy").setAttribute("aria-expanded", t >= T.wClick);
  const cf = t >= T.rClick && t < T.d1, d1 = t >= T.d1;
  $("c1a").style.display = cf ? "none" : "flex"; $("cf").style.display = cf ? "block" : "none";
  $("c1b").style.display = d1 ? "none" : ""; $("d1").style.display = d1 ? "flex" : "none";
  $("bOk").classList.toggle("dn", t >= T.okClick - .05 && t < T.d1);
  // dismissed with a reason; it won't come back
  $("dmn").style.display = t >= T.dClick && t < T.eClick ? "block" : "none"; $("oEl").classList.toggle("hov", t >= T.eClick - .3);
  const d3 = t >= T.d3;
  $("c3b").style.display = d3 ? "none" : ""; $("d3").style.display = d3 ? "flex" : "none";
  $("tRecN").textContent = d3 ? "1" : d1 ? "2" : "3";
  $("act").textContent = `Acted on this quarter: ${d1 ? 8 : 7}`;
}

function events() { return [["click", T.wClick], ["click", T.rClick], ["click", T.okClick], ["click", T.dClick], ["click", T.eClick]]; }

Motion.scene({
  // 5 steps: natural length, within the 15 s cap
  T, clicks: [T.wClick, T.rClick, T.okClick, T.dClick, T.eClick], build, render, events
});"""
COMMENT = """  Source for media/usage-analytics/recommendations.mp4. Built by motion/_build/recommendations.py on _build/insights_page.py
  (Home › Recommendations), with the top bar's alerts bell.
  Follows the Recommendations card (data/guidance-platform.js):
  - from the org's own data, sorted by impact; no upsells
  - why each one is showing, and what it would change, such as "Saves $5,040 a year"
  - nothing happens until she confirms; the result is announced, with Undo
  - dismissed with a reason, and it won't show again; how many were acted on"""
make("recommendations", "Recommendations", COMMENT, CSS, "Home / Recommendations", "home", MAIN, SCRIPT)
