import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from settings_page import make, head
import bell

CSS = r"""
.bar2 { margin-top: 14px; display: flex; align-items: center; gap: 10px; height: 32px; font-size: 12.5px; color: var(--soft); }
.bar2 .sp { flex: 1; }
.req { display: inline-flex; gap: 5px; align-items: center; font-size: 11.5px; color: var(--ink); border: 1px solid var(--rule-strong); border-radius: 999px; padding: 1px 8px; white-space: nowrap; }
.req svg { width: 11px; height: 11px; }
table.st td.nm span { white-space: normal; }
table.st td .ch { color: var(--ink); }
.drw h4 { margin: 14px 0 6px; }
.opt { margin-top: 6px; border: 1px solid var(--rule); border-radius: 9px; padding: 7px 11px; display: flex; gap: 9px; font-size: 12px; color: var(--soft); }
.opt b { display: block; color: var(--ink); font-weight: 500; font-size: 12.5px; }
.opt .rd { width: 14px; height: 14px; border-radius: 50%; border: 1.5px solid var(--rule-strong); flex: none; margin-top: 2px; position: relative; box-sizing: border-box; }
.opt.on { border-color: var(--ink); } .opt.on .rd { border-color: var(--ink); }
.opt.on .rd::after { content: ""; position: absolute; inset: 2px; border-radius: 50%; background: var(--ink); }
.chk { display: flex; gap: 9px; align-items: center; height: 28px; color: var(--ink); font-size: 12.5px; }
.chk .s { color: var(--soft); }
.drw .ft { margin-top: 16px; display: flex; gap: 8px; align-items: center; }
.drw .ft .sp { flex: 1; } .drw .ft .btn { height: 34px; }
.tst { margin-top: 10px; height: 18px; font-size: 12px; color: var(--ink); display: flex; gap: 6px; align-items: center; }
.tst svg { width: 12px; height: 12px; }
"""
LOCK = '<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="3.5" y="7" width="9" height="6.5" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5.5 7V5.2a2.5 2.5 0 0 1 5 0V7" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'
ROWS = [
  ("", "Sign-in certificate expiring", "Everyone loses sign-in if it’s missed", "Security admins · 4", "Email, in console, chat", f'<span class="req">{LOCK}Required</span>'),
  (' id="rS"', "Source sync failing", "A source stops syncing or falls a day behind", '<span id="rSw">All admins · 12</span>', '<span id="rSh">Email</span>', ""),
  ("", "New access request", "Someone asks for access to a resource", "Its approvers", "Email, in console", ""),
  ("", "Seats almost full", "90% of seats are in use", "Billing admins · 2", "Email", ""),
  ("", "Weekly usage summary", "Adoption and AI use, every Monday", "Lavanya Sienna", "Email digest", ""),
]
MAIN = f'''      <div class="view">
{head("Notifications")}        <div class="bar2">Who gets each notification, and how. Required ones can’t be turned off, by admins or anyone else.<span class="sp"></span><span class="btn sm">Send a test</span></div>
        <table class="st"><thead><tr><th>Event</th><th>Who gets it</th><th>How</th><th></th></tr></thead><tbody>
          {"".join(f'<tr{i}><td class="nm"><b>{e}</b><span>{d}</span></td><td class="ch">{w}</td><td>{h}</td><td style="text-align:right">{r}</td></tr>' for i, e, d, w, h, r in ROWS)}</tbody></table>
      </div>'''
EXTRA = '''    <aside class="drw" id="drw" role="dialog" aria-labelledby="dT">
      <div class="tt"><div><b id="dT">Source sync failing</b>A content source stops syncing or falls a day behind</div><span class="x" aria-label="Close">✕</span></div>
      <h4>Who gets it</h4>
      <div class="opt" id="oAll"><span class="rd"></span><div><b>All admins</b>12 people</div></div>
      <div class="opt" id="oCon"><span class="rd"></span><div><b>Content admins</b>3 people · the ones who can fix it</div></div>
      <h4>How</h4>
      <div class="chk"><span class="cb on"></span>Email</div>
      <div class="chk"><span class="cb" id="cbC"></span>Chat <span class="s">· #content-ops</span></div>
      <div class="chk"><span class="cb"></span>In console</div>
      <h4>Repeats</h4>
      <div class="chk"><span class="cb" id="cbD"></span>Group repeats into one message an hour</div>
      <div class="tst" id="tst" role="status" aria-live="polite"></div>
      <div class="ft"><span class="btn" id="bT">Send a test</span><span class="sp"></span><span class="btn">Cancel</span><span class="btn pri" id="bSv">Save</span></div>
    </aside>'''
TOAST = '      <div class="toast" id="toast"><i><svg width="11" height="11"><use href="#ok"/></svg></i>Source sync failing now goes to Content admins, by email and chat</div>'
SCRIPT = r"""const { $, at, span, easeOut } = Motion;

/* ---------- timeline (scene seconds) ---------- */
const T = {
  rClick: 0.95, open: [1.00, 1.30], conClick: 2.40, cClick: 3.10, dClick: 3.70, tClick: 4.40, tRes: 4.70, svClick: 5.40,
  close: [5.50, 5.75], toast: [5.80, 7.10], endCard: [7.20, 7.65], end: 8.2
};

function build() {
  const r = at("rS", -300, 0);
  $("drw").style.transform = "none"; $("drw").style.visibility = "visible";
  const cn = at("oCon", -120, 0), c = at("cbC"), d = at("cbD"), tb = at("bT"), sv = at("bSv");
  $("drw").style.transform = ""; $("drw").style.visibility = "";
  const cur = [
    [0.00, 960, 640], [0.25, 960, 640], [0.70, r[0], r[1] + 3], [1.00, r[0], r[1] + 3],
    [2.15, cn[0], cn[1] + 3], [2.45, cn[0], cn[1] + 3], [2.85, c[0], c[1] + 3], [3.15, c[0], c[1] + 3], [3.45, d[0], d[1] + 3], [3.75, d[0], d[1] + 3],
    [4.15, tb[0], tb[1] + 3], [4.45, tb[0], tb[1] + 3], [5.15, sv[0], sv[1] + 3], [5.45, sv[0], sv[1] + 3], [7.20, sv[0] - 300, sv[1] - 80]
  ];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 350, 1.04], [6.95, 650, 350, 1.04], [7.20, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  $("crumb").innerHTML = "/ Settings / <b>Notifications</b>";
  $("rS").classList.toggle("sel", t >= T.rClick - .05 && t < T.close[1]);
  const o = span(t, ...T.open, easeOut) * (1 - span(t, ...T.close, easeOut));
  $("drw").style.transform = `translateX(${440 * (1 - o)}px)`; $("drw").style.visibility = o > 0 ? "visible" : "hidden";
  const con = t >= T.conClick;
  $("oAll").classList.toggle("on", !con); $("oCon").classList.toggle("on", con);
  $("cbC").classList.toggle("on", t >= T.cClick); $("cbD").classList.toggle("on", t >= T.dClick);
  $("bT").classList.toggle("prs", t >= T.tClick - .05 && t < T.tRes);
  $("tst").innerHTML = t >= T.tRes ? '<svg aria-hidden="true"><use href="#ok"/></svg>Test sent to 3 people and #content-ops' : "";
  $("bSv").classList.toggle("dn", t >= T.svClick - .05 && t < T.close[0]);
  const saved = t >= T.close[0];
  $("rSw").textContent = saved ? "Content admins · 3" : "All admins · 12";
  $("rSh").textContent = saved ? "Email, chat · hourly digest" : "Email";
  $("toast").style.opacity = span(t, T.toast[0], T.toast[0] + .2) * (1 - span(t, T.toast[1] - .2, T.toast[1]));
}

function events() { return [["click", T.rClick], ["whoosh", T.open[0]], ["click", T.conClick], ["click", T.cClick], ["click", T.dClick], ["click", T.tClick], ["pop", T.tRes], ["click", T.svClick], ["pop", T.toast[0]]]; }

Motion.scene({
  // 5+ steps: natural length, within the 15 s cap
  T, clicks: [T.rClick, T.conClick, T.cClick, T.dClick, T.tClick, T.svClick], build, render, events,
  slow: [[1.35, 2.1, 1.3]]
});"""
COMMENT = """  Source for media/notifications/notification-rules.mp4. Built by motion/_build/notification_rules.py on _build/settings_page.py,
  with the top bar's alerts bell from _build/bell.py.
  Follows the Notification rules card (data/guidance-platform.js):
  - a table of events with who gets each one and how; each event explained
  - a critical security notice marked Required, with why; it can't be turned off
  - routed to the people who can act, not every admin; email, chat and in console
  - repeats grouped into a digest; a test sent before saving"""
make("notification-rules", "Notification rules", COMMENT, CSS, "Settings / Notifications", MAIN, SCRIPT, extra=EXTRA, toast=TOAST)
bell.add("notification-rules", 3)
