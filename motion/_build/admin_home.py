import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from insights_page import make, home_head, OK, WN, ER

CSS = r"""
.nd .it2 { display: flex; align-items: center; gap: 10px; padding: 10px 0; border-top: 1px solid var(--rule); color: var(--ink); font-size: 13px; position: relative; }
.nd .it2:first-of-type { border-top: 0; margin-top: 6px; }
.nd .it2 .tx { flex: 1; } .nd .it2 .tx span { display: block; color: var(--soft); font-size: 12px; }
.nd .it2 .btn { height: 30px; }
.nd .it2 .km { width: 28px; height: 28px; border-radius: 7px; display: inline-grid; place-items: center; color: var(--ink); letter-spacing: 1px; font-size: 15px; }
.nd .it2 .km.on { background: var(--hover); }
.snz { position: absolute; right: 0; top: 44px; width: 200px; z-index: 20; display: none; }
.snz .it { color: var(--ink); }
.snz .hh { font-size: 11.5px; color: var(--soft); padding: 4px 10px; }
.snzd { display: none; color: var(--soft); font-size: 12.5px; }
.snzd a { color: var(--ink); text-decoration: underline; text-underline-offset: 3px; margin-left: 6px; }
.mt3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.mt3 .sec { margin-top: 14px; }
.mt3 .v { margin-top: 6px; font-size: 24px; font-weight: 650; color: var(--ink); }
.mt3 .v span { font-size: 13px; font-weight: 400; color: var(--soft); }
.mt3 .c { margin-top: 2px; }
.sc { margin-top: 14px; display: flex; gap: 8px; align-items: center; }
.sc span.l { color: var(--soft); font-size: 12.5px; margin-right: 4px; }
"""
MAIN = f'''      <div class="view">
{home_head("ov")}        <div class="sec nd"><div class="rw"><h3 id="ndH">Needs you · 4</h3><span class="sp"></span><span>Snooze or dismiss anything that can wait</span></div>
          <div class="it2">{ER}<div class="tx">Holonet ID certificate expires in 12 days<span>Single sign-on stops for everyone when it does</span></div><span class="btn">Renew</span><span class="km">⋯</span></div>
          <div class="it2">{WN}<div class="tx">3 access requests are waiting<span>The oldest is 2 days old</span></div><span class="btn">Review</span><span class="km">⋯</span></div>
          <div class="it2">{WN}<div class="tx">Coruscant Wiki sync is failing for 13% of items<span>Search and AI can’t see 6,180 pages</span></div><span class="btn">Fix</span><span class="km">⋯</span></div>
          <div class="it2" id="iM">{WN}<div class="tx" id="iMt">130 people haven’t enrolled in MFA<span>Required from Dec 10</span></div><span class="snzd" id="snzd" role="status">Snoozed until Dec 3<a>Undo</a></span><span class="btn" id="iMb">Remind them</span><span class="km" id="kM" aria-label="More for MFA enrolment">⋯</span>
            <div class="menu snz" id="snz"><div class="it">Snooze until tomorrow</div><div class="it" id="o1w">Snooze for a week</div><div style="height:1px;background:var(--rule);margin:6px 4px"></div><div class="it">Dismiss</div></div></div></div>
        <div class="mt3">
          <div class="sec"><h3>Active this week</h3><div class="v">1,092 <span>of 1,214 people</span></div><div class="c"><span class="up">▲ 3%</span> vs last week</div></div>
          <div class="sec"><h3>Storage</h3><div class="v">3.2 TB <span>of 5 TB</span></div><div class="c">Growing 4% a month</div></div>
          <div class="sec"><h3>Seats</h3><div class="v">1,214 <span>of 1,250</span></div><div class="c">42 unused for 90 days</div></div></div>
        <div class="sc"><span class="l">Shortcuts</span><span class="btn sm">Invite people</span><span class="btn sm">Create group</span><span class="btn sm">Export audit log</span></div>
      </div>
'''
SCRIPT = r"""const { $, at, span, easeOut } = Motion;

/* ---------- timeline (scene seconds) ---------- */
const T = { kClick: 2.40, oClick: 3.40, endCard: [6.20, 6.65], end: 7.15 };

function build() {
  const k = at("kM");
  $("snz").style.display = "block"; const o = at("o1w", -40, 0); $("snz").style.display = "";
  const cur = [[0.00, 960, 640], [0.25, 960, 640], [2.05, k[0], k[1] + 3], [2.45, k[0], k[1] + 3], [3.05, o[0], o[1] + 3], [3.45, o[0], o[1] + 3], [6.20, o[0] - 360, o[1] + 140]];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 345, 1.04], [5.95, 650, 345, 1.04], [6.20, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  $("crumb").innerHTML = "/ <b>Home</b>";
  const m = t >= T.kClick && t < T.oClick, s = t >= T.oClick;
  $("snz").style.display = m ? "block" : "none"; $("kM").classList.toggle("on", m);
  $("o1w").classList.toggle("hov", t >= T.oClick - .3);
  // snoozed: it says until when, with Undo, and the count updates
  $("snzd").style.display = s ? "inline" : "none"; $("iMb").style.display = s ? "none" : "";
  $("iMt").style.color = s ? "var(--soft)" : "";
  $("ndH").textContent = s ? "Needs you · 3" : "Needs you · 4";
}

function events() { return [["click", T.kClick], ["click", T.oClick]]; }

Motion.scene({
  // under 5 steps: natural length, within the 10 s cap
  T, clicks: [T.kClick, T.oClick], build, render, events,
  slow: [[0.4, 2.0, 1.2]]
});"""
COMMENT = """  Source for media/usage-analytics/admin-home.mp4. Built by motion/_build/admin_home.py on _build/insights_page.py
  (Home, admin view), with the top bar's alerts bell.
  Follows the Admin home card (data/guidance-platform.js):
  - what needs action first, each with what it affects and a button to the fix
  - a few key metrics, each with a comparison; shortcuts to frequent tasks
  - snooze or dismiss; snoozed says until when, with Undo"""
make("admin-home", "Admin home", COMMENT, CSS, "Home", "home", MAIN, SCRIPT)
