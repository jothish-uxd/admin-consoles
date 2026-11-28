import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from tables_page import make
import bell

CSS = r"""
.btn.dn, .btn.pri.dn { background: #404040; border-color: #404040; color: #fff; }
.ap { position: absolute; right: 14px; top: 46px; width: 470px; background: var(--bg); border: 1px solid var(--rule-strong); border-radius: 14px; box-shadow: 0 24px 60px rgba(0,0,0,.18); z-index: 30; opacity: 0; font-size: 12.5px; color: var(--soft); }
.ap .h { display: flex; align-items: center; gap: 10px; padding: 12px 16px; border-bottom: 1px solid var(--rule); }
.ap .h b { color: var(--ink); font-size: 14px; flex: 1; }
.ap .h .lk { color: var(--ink); text-decoration: underline; text-underline-offset: 3px; }
.ap .live { padding: 0 16px; height: 0; overflow: hidden; color: var(--ink); font-size: 12px; }
.al { display: flex; gap: 11px; padding: 11px 16px; border-top: 1px solid var(--rule); }
.al:first-of-type { border-top: 0; }
.al .sv { flex: none; width: 62px; font-size: 11px; font-weight: 600; border-radius: 999px; border: 1px solid currentColor; height: 20px; display: inline-flex; align-items: center; justify-content: center; margin-top: 1px; }
.sv.cr { color: #fff; background: #b91c1c; border-color: #b91c1c; }
.sv.hi { color: #92400e; }
.sv.in { color: var(--soft); }
.al .w { flex: 1; line-height: 1.45; } .al .w b { display: block; color: var(--ink); font-weight: 600; font-size: 13px; }
.al .st { margin-top: 6px; display: flex; gap: 8px; align-items: center; }
.al .st .btn { height: 30px; font-size: 12px; }
.al .who { display: inline-flex; gap: 6px; align-items: center; color: var(--ink); }
.al .who svg { width: 12px; height: 12px; }
.al .x3 { font-size: 11px; color: var(--ink); border: 1px solid var(--rule-strong); border-radius: 999px; padding: 0 7px; margin-left: 4px; font-weight: 500; }
.sub3 { margin-top: 6px; display: none; }
.sub3 div { display: flex; gap: 8px; font-size: 12px; padding: 2px 0; }
.sub3 .mono { font-family: "Geist Mono", monospace; font-size: 11.5px; color: var(--ink); }
.al.new { background: var(--subtle); }
"""
OK = '<svg aria-hidden="true"><use href="#ok"/></svg>'
EXTRA = f'''    <section class="ap" id="ap" role="dialog" aria-labelledby="apT">
      <div class="h"><b id="apT">Alerts</b><span id="apN">3 need action</span><span class="lk">View all</span></div>
      <div class="live" id="live" role="status" aria-live="polite"></div>
      <div class="al"><span class="sv cr">Critical</span><div class="w"><b>Sign-in certificate expires in 2 days</b>Holonet ID signs everyone in with it. Renew it before Sat 09:00, or no one can sign in.
        <div class="st"><span class="btn pri">Renew certificate</span><span id="asg"><span class="btn" id="bAsg">Assign to me</span></span></div></div></div>
      <div class="al" id="aG"><span class="sv hi">High</span><div class="w"><b>Failed admin sign-ins from a new country<span class="x3">×3</span></b><span id="gT">Toryn Farr’s account · 40 minutes ago · grouped</span>
        <div class="sub3" id="g3"><div><span class="mono">14:02</span>Kessel · wrong password</div><div><span class="mono">14:05</span>Kessel · wrong password</div><div><span class="mono">14:09</span>Kessel · blocked after 3 tries</div></div></div></div>
      <div class="al"><span class="sv hi">High</span><div class="w"><b>Coruscant Wiki is partly failing</b>6,180 items failed to sync · Content admins</div></div>
      <div class="al new" id="aN" style="display:none"><span class="sv in">Info</span><div class="w"><b>96% of seats are in use</b>4 left · Billing admins · just now</div></div>
    </section>'''
SCRIPT = r"""const { $, at, span, easeOut } = Motion;

/* ---------- timeline (scene seconds) ---------- */
const T = {
  bClick: 0.95, open: [1.00, 1.25], asgClick: 2.60, gClick: 3.80, nw: 4.60, endCard: [5.80, 6.25], end: 6.8
};

function build() {
  const b = at("bell");
  $("ap").style.opacity = 1; const as = at("bAsg"), g = at("aG", -120, -12); $("ap").style.opacity = 0;
  const cur = [
    [0.00, 960, 640], [0.25, 960, 640], [0.70, b[0], b[1] + 3], [1.00, b[0], b[1] + 3],
    [2.35, as[0], as[1] + 3], [2.65, as[0], as[1] + 3], [3.55, g[0], g[1] + 3], [3.85, g[0], g[1] + 3], [5.00, g[0] - 60, g[1] + 120], [5.80, g[0] - 58, g[1] + 122]
  ];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.85, 905, 280, 1.24], [5.55, 905, 280, 1.24], [5.80, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  const o = span(t, ...T.open, easeOut);
  $("ap").style.opacity = o; $("ap").style.transform = `translateY(${-6 * (1 - o)}px)`;
  $("bell").classList.toggle("on", t >= T.bClick - .05);
  // assign: the alert stays, with who has it
  const a = t >= T.asgClick;
  $("asg").innerHTML = a ? '<span class="who"><svg aria-hidden="true"><use href="#ok"/></svg>Acknowledged · assigned to you</span>' : `<span class="btn${t >= T.asgClick - .05 ? " dn" : ""}" id="bAsg">Assign to me</span>`;
  // a grouped alert opens to show each event
  const g = t >= T.gClick;
  $("g3").style.display = g ? "block" : "none";
  $("aG").style.background = t >= T.gClick - .25 && t < T.gClick + .2 ? "var(--hover)" : "";
  // a new alert arrives, announced politely
  const n = t >= T.nw;
  $("aN").style.display = n ? "flex" : "none";
  $("live").textContent = n ? "1 new alert" : "";
  $("live").style.height = n ? "22px" : "0px";
  $("bdg").textContent = n ? "4" : "3";
  $("apN").textContent = (n ? "4 alerts" : "3 alerts") + (a ? " · 1 assigned" : " · 3 need action");
}

function events() { return [["click", T.bClick], ["pop", T.open[0]], ["click", T.asgClick], ["click", T.gClick], ["pop", T.nw]]; }

Motion.scene({
  // under 5 steps: natural length, within the 10 s cap
  T, clicks: [T.bClick, T.asgClick, T.gClick], build, render, events,
  slow: [[1.3, 2.2, 1.25]]
});"""
COMMENT = """  Source for media/notifications/alert-center.mp4. Built by motion/_build/alert_center.py on _build/users_page.py,
  with the top bar's alerts bell from _build/bell.py.
  Follows the Alert center card (data/guidance-platform.js):
  - alerts with severity in words, time, summary and status; critical ones first
  - each says what happened and what to do, with the fix one click away
  - acknowledge and assign; an assigned alert stays until it's resolved
  - repeated events grouped; a new alert announced politely, without moving focus"""
make("alert-center", "Alert center", COMMENT, CSS, EXTRA, "", SCRIPT)
bell.add("alert-center", 3)
