import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from settings_page import make, head

CSS = r"""
.bar2 { margin-top: 14px; display: flex; align-items: center; gap: 10px; height: 32px; font-size: 12.5px; color: var(--soft); }
.bar2 .sp { flex: 1; }
.ok2 { display: inline-flex; gap: 5px; align-items: center; color: var(--ink); }
.ok2 svg { width: 12px; height: 12px; }
#vD { opacity: 0; }
.dh { margin-top: 14px; display: flex; align-items: center; gap: 10px; }
.dh .w { flex: 1; } .dh .w b { display: block; color: var(--ink); font-size: 15px; font-weight: 600; }
.dh .w span { font-size: 12.5px; color: var(--soft); }
.dh .btn { height: 32px; font-size: 12.5px; }
.tres { margin-top: 12px; border: 1px solid var(--rule-strong); border-radius: 10px; padding: 10px 14px; display: flex; gap: 10px; align-items: center; font-size: 12.5px; color: var(--soft); }
.tres b { color: var(--ink); font-weight: 600; }
.tres .ic2 { width: 20px; height: 20px; border-radius: 50%; background: var(--ink); color: #fff; display: grid; place-items: center; flex: none; }
.tres .ic2 svg { width: 11px; height: 11px; }
.pol { margin-top: 10px; font-size: 12.5px; color: var(--soft); }
.pol b { color: var(--ink); font-weight: 500; }
.evs { margin-top: 4px; border: 1px solid var(--rule); border-radius: 10px; }
.evs > div { display: flex; gap: 10px; align-items: center; height: 30px; padding: 0 11px; border-top: 1px solid var(--rule); color: var(--soft); font-size: 12px; }
.evs > div:first-child { border-top: 0; }
.evs b { color: var(--ink); font: 500 12px "Geist Mono", monospace; width: 150px; flex: none; }
.evs .mono { color: var(--soft); }
.f1 { margin-top: 12px; }
.key { display: flex; gap: 8px; }
.key .in { flex: 1; background: var(--subtle); }
.key .btn { height: 36px; }
.cpd { display: inline-flex; gap: 5px; align-items: center; } .cpd svg { width: 12px; height: 12px; }
.in .u { white-space: pre; }
"""
OK = '<svg aria-hidden="true"><use href="#ok"/></svg>'
WN = '<svg aria-hidden="true"><use href="#warn"/></svg>'
ER = '<svg aria-hidden="true"><use href="#err"/></svg>'
MAIN = f'''      <div class="view" id="vL">
{head("Webhooks")}        <div class="bar2">Webhooks send events to another system as they happen, signed so it can check they came from here.<span class="sp"></span><span class="btn sm pri" id="bAdd">Add endpoint</span></div>
        <table class="st"><thead><tr><th>Endpoint</th><th>Events</th><th>Status</th><th>Last delivery</th></tr></thead><tbody>
          <tr><td class="nm"><b>Splunk HEC</b><span>https://splunk.echobase.rebellion/hec</span></td><td>6 events</td><td><span class="ok2">{OK}Delivering</span></td><td>1 minute ago · 200</td></tr>
          <tr><td class="nm"><b>HoloComms security alerts</b><span>https://hooks.holocomms.io/t/sec-alerts</span></td><td>3 events</td><td><span class="flag">{WN}Retrying · 2 failed</span></td><td>4 minutes ago · 503</td></tr>
        </tbody></table>
      </div>
      <div class="view" id="vD">
{head("Webhooks")}        <div class="dh"><span class="lg">HN</span><div class="w"><b>Holonet HR</b><span>https://hooks.holonet.io/echobase · 2 of 42 events · signed</span></div><span class="btn">Pause</span><span class="btn">Send test</span><span class="btn">Edit</span></div>
        <div class="tres" role="status"><span class="ic2">{OK}</span><span><b>Test event delivered</b> · 200 OK in 142 ms · just now</span></div>
        <div class="pol"><b>If a delivery fails</b>, it’s retried 5 times over an hour, then listed here and you’re emailed. The endpoint is never turned off without telling you.</div>
        <table class="st"><thead><tr><th>Event</th><th>Response</th><th>Attempts</th><th>Sent</th><th></th></tr></thead><tbody>
          <tr><td class="nm mono" style="color:var(--ink)">test.ping</td><td><span class="ok2">{OK}200 OK · 142 ms</span></td><td>1</td><td>Just now</td><td style="text-align:right"><span class="btn sm">View payload</span></td></tr>
        </tbody></table>
      </div>'''
EV = [("eC", "person.created", "Someone is added"), ("eD", "person.deactivated", "Someone is deactivated"), ("", "person.updated", "Someone’s details change"), ("", "group.changed", "A group’s members change")]
EXTRA = f'''    <div class="scr" id="scr"></div>
    <section class="dlg" id="dlg" role="dialog" aria-labelledby="wT" style="left:320px; top:116px; width:560px">
      <h3 id="wT">Add endpoint</h3>
      <div class="f1"><label class="lbl">Endpoint URL</label><div class="in" id="uIn"><span class="u" id="u1"></span><span class="u" id="uS"></span><span class="c" id="uC"></span><span class="u" id="u2"></span></div>
        <div class="msg"><span id="uM">Must start with https://</span></div></div>
      <div class="f1"><span class="lbl">Events <span>· send only what this system needs</span></span>
        <div class="evs">{"".join(f'<div><span class="cb"{f" id={chr(34)}{i}{chr(34)}" if i else ""}></span><b>{c}</b>{d}</div>' for i, c, d in EV)}</div>
        <div class="msg"><span>38 more events · all events isn’t an option, so nothing is sent by accident</span></div></div>
      <div class="f1"><label class="lbl">Signing secret <span>· check it on every request</span></label><div class="key"><span class="in mono">whsec_4Hn8QzT2vLx7RkP1</span><span class="btn"><span class="cpd"><svg><use href="#copy"/></svg>Copy</span></span></div></div>
      <div class="ft"><span class="sp"></span><span class="btn">Cancel</span><span class="btn pri" id="bSv">Save and send a test</span></div>
    </section>'''
SCRIPT = r"""const { $, at, span, easeOut } = Motion;
const A = "http", B = "://hooks.holonet.io/echobase", ALL = A + B;

/* ---------- timeline (scene seconds) ---------- */
const T = {
  addClick: 0.95, open: [1.00, 1.30], type: [1.50, 2.60], err: 2.70, fixClick: 3.50, s: 3.70,
  e1: 4.60, e2: 5.20, svClick: 6.00, close: [6.10, 6.35], toD: [6.35, 6.60], endCard: [8.20, 8.65], end: 9.2
};

function build() {
  const ad = at("bAdd");
  $("dlg").style.opacity = 1;
  $("u1").textContent = A; $("u2").textContent = B;
  const u = at("u1"), fx = [u[0] + $("u1").offsetWidth / 2, u[1]];
  const e1 = at("eC"), e2 = at("eD"), sv = at("bSv");
  $("u1").textContent = ""; $("u2").textContent = ""; $("dlg").style.opacity = 0;
  const cur = [
    [0.00, 960, 640], [0.25, 960, 640], [0.75, ad[0], ad[1] + 3], [1.00, ad[0], ad[1] + 3],
    [1.50, ad[0] - 260, ad[1] + 150], [3.20, fx[0], fx[1] + 3], [3.55, fx[0], fx[1] + 3],
    [4.30, e1[0], e1[1] + 3], [4.65, e1[0], e1[1] + 3], [4.95, e2[0], e2[1] + 3], [5.25, e2[0], e2[1] + 3],
    [5.75, sv[0], sv[1] + 3], [6.05, sv[0], sv[1] + 3], [7.20, sv[0] - 140, sv[1] - 120], [8.20, sv[0] - 138, sv[1] - 118]
  ];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 345, 1.06], [7.95, 650, 345, 1.06], [8.20, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  $("crumb").innerHTML = t >= T.toD[0] ? "/ Settings / Webhooks / <b>Holonet HR</b>" : "/ Settings / <b>Webhooks</b>";
  $("bAdd").classList.toggle("dn", t >= T.addClick - .05 && t < T.open[0] + .15);
  const o = span(t, ...T.open, easeOut) * (1 - span(t, ...T.close, easeOut));
  $("dlg").style.opacity = o; $("scr").style.opacity = o; $("dlg").style.transform = `translateY(${8 * (1 - o)}px)`;
  $("dlg").style.visibility = o > 0 ? "visible" : "hidden";
  // the URL: http:// is refused, and fixed in place
  const n = Math.round(ALL.length * span(t, ...T.type, x => x));
  const typed = ALL.slice(0, n), fixing = t >= T.fixClick;
  $("u1").textContent = fixing ? A : typed.slice(0, Math.min(n, A.length));
  $("uS").textContent = t >= T.s ? "s" : "";
  $("u2").textContent = fixing ? B : typed.slice(A.length);
  // caret: at the end while typing, after "http" once she clicks there
  $("uC").style.order = "";
  const caretOn = t < T.e1 && Math.floor(t * 2.4) % 2 === 0;
  $("uC").style.display = caretOn ? "" : "none";
  const ins = $("uIn");
  if (fixing) ins.insertBefore($("uC"), $("u2")); else ins.appendChild($("uC"));
  const bad = t >= T.err && t < T.s;
  ins.className = "in" + (bad ? " err" : t < T.e1 ? " f" : "");
  $("uM").className = bad ? "e" : "";
  $("uM").innerHTML = bad ? '<svg aria-hidden="true"><use href="#err"/></svg>Use an https:// address, so events are encrypted on the way'
    : t >= T.s ? '<svg aria-hidden="true"><use href="#ok"/></svg>Encrypted with https' : "Must start with https://";
  $("eC").classList.toggle("on", t >= T.e1); $("eD").classList.toggle("on", t >= T.e2);
  $("bSv").classList.toggle("dn", t >= T.svClick - .05 && t < T.close[0]);
  // the endpoint, with the test it was sent: one view at a time
  $("vL").style.opacity = 1 - span(t, T.toD[0], T.toD[0] + .1); $("vD").style.opacity = span(t, T.toD[0] + .12, T.toD[1]);
}

function events() { return [["click", T.addClick], ["whoosh", T.open[0]], ["key", T.type[0]], ["click", T.fixClick], ["key", T.s], ["click", T.e1], ["click", T.e2], ["click", T.svClick], ["chime", T.toD[1]]]; }

Motion.scene({
  // 5+ steps: natural length, within the 15 s cap
  T, clicks: [T.addClick, T.fixClick, T.e1, T.e2, T.svClick], build, render, events,
  slow: [[6.7, 7.6, 1.5]]
});"""
COMMENT = """  Source for media/integrations-api/webhooks.mp4. Built by motion/_build/webhooks.py on _build/settings_page.py,
  so Settings › Webhooks has the same Settings header and tabs as the other clips.
  Follows the Webhooks card (data/guidance-platform.js):
  - endpoint, events and signing secret; an http:// address is refused and fixed in place
  - only the events chosen are sent; there's no all-events option
  - saving sends a test and shows the response
  - delivery history with status, attempts and the retry policy; a failing endpoint shows Retrying, never silently off; Pause"""
make("webhooks", "Webhooks", COMMENT, CSS, "Settings / Webhooks", MAIN, SCRIPT, extra=EXTRA)
