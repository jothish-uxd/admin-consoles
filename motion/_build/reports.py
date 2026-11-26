import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from insights_page import make, ins_head, OK

CSS = r"""
.rh2 { margin-top: 14px; display: flex; align-items: center; gap: 10px; }
.rh2 .sp { flex: 1; } .rh2 a { color: var(--ink); text-decoration: underline; text-underline-offset: 3px; font-size: 12.5px; }
table.sx td.ds { white-space: normal; line-height: 1.35; }
table.sx td .btn { height: 28px; font-size: 12px; }
.nx2 { display: none; color: var(--ink); }
.drw .f1 { margin-top: 14px; }
.drw .in { justify-content: space-between; }
.drw .chs { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; min-height: 36px; border: 1.5px solid var(--rule-strong); border-radius: 8px; padding: 4px 8px; box-sizing: border-box; position: relative; }
.drw .chs.f { border-color: var(--ink); }
.drw .chs .ch2 { border: 1px solid var(--rule-strong); border-radius: 999px; padding: 1px 9px; font-size: 12px; color: var(--ink); }
.drw .chs .q { color: var(--ink); font-size: 13px; } .drw .chs .c { width: 1.5px; height: 16px; background: var(--ink); }
.drw .pk2 { position: absolute; left: 0; right: 0; top: 40px; z-index: 6; display: none; }
.drw .pk2 .it { color: var(--ink); } .drw .pk2 .it span { color: var(--soft); font-size: 12px; margin-left: 6px; }
.drw .fmt { display: flex; gap: 16px; color: var(--ink); }
.drw .fmt span { display: inline-flex; gap: 6px; align-items: center; }
.drw .nt3 { margin-top: 12px; background: var(--subtle); border-radius: 8px; padding: 8px 10px; color: var(--ink); line-height: 1.45; font-size: 12px; }
.drw .ft4 { margin-top: 16px; display: flex; gap: 8px; } .drw .ft4 .sp { flex: 1; } .drw .ft4 .btn { height: 34px; }
"""
R = [("rA", "Monthly adoption", "Active people by group and feature, with the trend", "Last month", "Nov 1"),
     ("rL", "License usage", "Seats used, unused for 90 days, and cost by group", "Last month", "Nov 1"),
     ("rS", "Security posture", "SSO, MFA enrolment, risky sharing and admin changes", "Last 90 days", "Oct 15"),
     ("rG", "Storage by group", "Used, growth and forecast by group and cost centre", "Last month", "Nov 1")]
ROWS = "".join(f'<tr id="{i}"><td><b>{n}</b></td><td class="ds">{d}</td><td>{p}</td><td><span id="{i}-l">{l}</span>{"<span class=nx2 id=rA-n><b style=font-weight:500>Next Dec 1, 9:00</b>to 2 people</span>" if i == "rA" else ""}</td>'
               f'<td class="n"><span class="btn">Download</span> <span class="btn" id="{i}-s">Schedule</span></td></tr>' for i, n, d, p, l in R)
MAIN = f'''      <div class="view">
{ins_head("rp", "Every report uses the same numbers as Insights")}        <div class="rh2"><span style="color:var(--soft);font-size:12.5px">Standard reports, made in the background. PDF and CSV.</span><span class="sp"></span><a>History · 38 reports</a><span class="btn sm">New report</span></div>
        <table class="sx"><thead><tr><th style="width:19%">Report</th><th style="width:34%">What it shows</th><th style="width:12%">Period</th><th style="width:13%">Last made</th><th class="n"></th></tr></thead><tbody>{ROWS}</tbody></table>
      </div>
'''
EXTRA = f'''    <aside class="drw" id="drw" role="dialog" aria-labelledby="dT">
      <div class="tt"><div><b id="dT">Schedule Monthly adoption</b>Made on the server and sent when it’s ready</div><span class="x" aria-label="Close">✕</span></div>
      <div class="f1"><span class="lbl">How often</span><span class="in">Monthly, on the 1st at 9:00<i class="cv"></i></span></div>
      <div class="f1"><label class="lbl" for="fR">Send to</label><div class="chs" id="fR"><span class="ch2">Finance ✕</span><span class="ch2" id="cMon" style="display:none">Mon Mothma ✕</span><span class="q" id="fRv"></span><span class="c" id="fRc"></span>
        <div class="menu pk2" id="pk"><div class="it" id="pM">Mon Mothma<span>Chancellor · Command</span></div><div class="it">Mon Calamari liaisons<span>Group · 6</span></div></div></div></div>
      <div class="f1"><span class="lbl">Format</span><div class="fmt"><span><span class="cb on"></span>PDF</span><span><span class="cb on"></span>CSV</span></div></div>
      <div class="nt3">Recipients get a link and sign in to open it. No attachments, so the data stays in Echo Base.<br>Uses Adoption’s definition of active. If a definition changes, the next report says so.</div>
      <div class="ft4"><span class="sp"></span><span class="btn">Cancel</span><span class="btn pri" id="bSv">Save schedule</span></div>
    </aside>'''
TOAST = '      <div class="toast" id="toast"><i><svg width="11" height="11"><use href="#ok"/></svg></i>Scheduled · next on Dec 1 at 9:00</div>'
SCRIPT = r"""const { $, at, span, easeOut } = Motion;
const Q = "Mon";

/* ---------- timeline (scene seconds) ---------- */
const T = { sClick: 1.10, open: [1.15, 1.45], rClick: 2.30, type: [2.45, 2.75], pick: 3.40, svClick: 4.50, close: [4.55, 4.80], toast: [4.85, 6.25], endCard: [6.50, 6.95], end: 7.45 };

function build() {
  const s = at("rA-s");
  $("drw").style.transform = "none"; $("drw").style.visibility = "visible";
  const r = at("fR", -60, 0); $("pk").style.display = "block"; const m = at("pM", -60, 0); $("pk").style.display = ""; const v = at("bSv");
  $("drw").style.transform = ""; $("drw").style.visibility = "";
  const cur = [[0.00, 960, 640], [0.25, 960, 640], [0.75, s[0], s[1] + 3], [1.15, s[0], s[1] + 3], [2.00, r[0], r[1] + 3], [2.35, r[0], r[1] + 3],
    [3.05, m[0], m[1] + 3], [3.45, m[0], m[1] + 3], [4.15, v[0], v[1] + 3], [4.55, v[0], v[1] + 3], [6.50, s[0] - 300, s[1] + 160]];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 345, 1.04], [6.25, 650, 345, 1.04], [6.50, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  $("crumb").innerHTML = "/ Insights / <b>Reports</b>";
  $("rA-s").classList.toggle("dn", t >= T.sClick - .05 && t < T.open[0] + .1);
  const o = span(t, ...T.open, easeOut) * (1 - span(t, ...T.close, easeOut));
  $("drw").style.transform = `translateX(${440 * (1 - o)}px)`; $("drw").style.visibility = o > 0 ? "visible" : "hidden";
  const n = Math.round(Q.length * span(t, ...T.type, x => x)), p = t >= T.pick;
  $("fRv").textContent = p ? "" : Q.slice(0, n);
  $("fR").classList.toggle("f", t >= T.rClick && t < T.svClick);
  $("fRc").style.opacity = t >= T.rClick && t < T.svClick && Math.floor(t * 2.4) % 2 === 0 ? 1 : 0;
  $("pk").style.display = n > 0 && !p ? "block" : "none"; $("pM").classList.toggle("hov", t >= T.pick - .3);
  $("cMon").style.display = p ? "" : "none";
  $("bSv").classList.toggle("dn", t >= T.svClick - .05 && t < T.close[0]);
  // the row shows the next run and who gets it
  const d = t >= T.close[0];
  $("rA-n").style.display = d ? "block" : "none"; $("rA-l").style.display = d ? "none" : "";
  $("rA-s").textContent = d ? "Edit schedule" : "Schedule";
  $("toast").style.opacity = span(t, T.toast[0], T.toast[0] + .2) * (1 - span(t, T.toast[1] - .2, T.toast[1]));
}

function events() { return [["click", T.sClick], ["whoosh", T.open[0]], ["click", T.rClick], ["key", T.type[0]], ["click", T.pick], ["click", T.svClick], ["pop", T.toast[0]]]; }

Motion.scene({
  // under 5 steps: natural length, within the 10 s cap
  T, clicks: [T.sClick, T.rClick, T.pick, T.svClick], build, render, events, duration: 9.8
});"""
COMMENT = """  Source for media/usage-analytics/reports.mp4. Built by motion/_build/reports.py on _build/insights_page.py
  (Insights › Reports), with the top bar's alerts bell.
  Follows the Reports card (data/guidance-platform.js):
  - standard reports, each with what it shows, its period and when it was last made; made in the background
  - scheduled to recipients, as PDF and CSV; sent as a link that needs sign-in, not an attachment
  - definitions shared with Insights, and changes announced; a history of past reports"""
make("reports", "Reports", COMMENT, CSS, "Insights / Reports", "insights", MAIN, SCRIPT, extra=EXTRA, toast=TOAST)
