import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from security_page import make, head, OK, WN, ER

CSS = r"""
.dsum { margin-top: 14px; display: flex; align-items: center; gap: 10px; font-size: 12.5px; color: var(--soft); }
.dsum b { color: var(--ink); font-weight: 600; }
.dsum .sp { flex: 1; }
.chips { display: inline-flex; gap: 6px; }
.chips span { height: 30px; display: inline-flex; align-items: center; gap: 6px; padding: 0 12px; border-radius: 999px; border: 1px solid var(--rule-strong); color: var(--ink); font-size: 12.5px; }
.chips span.on { background: var(--ink); color: #fff; border-color: var(--ink); }
.chips span i { font-style: normal; font-family: "Geist Mono", monospace; font-size: 11px; opacity: .75; }
.req { margin-top: 10px; font-size: 12.5px; color: var(--soft); }
.req b { color: var(--ink); font-weight: 500; }
#tN { display: none; }
.drw .two2 { margin-top: 12px; }
.drw .acard { border: 1px solid var(--rule); border-radius: 10px; padding: 10px 12px; margin-top: 10px; }
.drw .acard b { color: var(--ink); font-size: 13px; font-weight: 600; display: block; }
.drw .acard .btn { margin-top: 8px; height: 32px; }
.drw .acard.dan .btn { color: #b91c1c; border-color: #b91c1c; }
.drw .acard.dan .btn.pri2 { background: #b91c1c; color: #fff; }
.drw .kv2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 12px; margin-top: 12px; }
.drw .kv2 span { display: block; color: var(--soft); font-size: 11.5px; }
.drw .kv2 div { color: var(--ink); }
.drw .cf { display: none; margin-top: 8px; color: var(--ink); line-height: 1.45; }
.drw .vis { margin-top: 12px; font-size: 12px; background: var(--subtle); border-radius: 8px; padding: 8px 10px; color: var(--ink); line-height: 1.45; }
.drw .vis span { color: var(--soft); }
.drw .sent { display: none; margin-top: 8px; align-items: center; gap: 6px; color: var(--ink); }
.drw .sent svg { width: 14px; height: 14px; }
"""
ROWS_ALL = [("MacBook Pro", "macOS 15.1", "Cal Alder", OK, "Compliant", "Now"), ("iPhone 15", "iOS 18.1", "Wedge Antilles", OK, "Compliant", "10 min ago"),
            ("MacBook Pro", "macOS 13.6", "Hobbie Klivian", WN, "Needs OS update", "2 hours ago"), ("ThinkPad X1", "Windows 11", "Dak Ralter", OK, "Compliant", "1 hour ago"),
            ("iPhone 15", "iOS 18.1", "Hobbie Klivian", ER, "Reported lost", "3 hours ago")]
ROWS_N = [("MacBook Pro", "macOS 13.6", "Hobbie Klivian", WN, "Needs OS update: macOS 15 or later", "2 hours ago", ""),
          ("iPhone 13", "iOS 16.7", "Wes Janson", WN, "No screen lock", "Yesterday", ""),
          ("iPhone 15", "iOS 18.1", "Hobbie Klivian", ER, "Reported lost by Hobbie today", "3 hours ago", "rL")]
def tr(r, i=""):
    return (f'<tr{f" id=\"{i}\"" if i else ""}><td><b>{r[0]}</b>{r[1]}</td><td>{r[2]}</td><td><span class="st2">{r[3]}{r[4]}</span></td><td>{r[5]}</td></tr>')
HEAD = '<thead><tr><th style="width:24%">Device</th><th style="width:20%">Person</th><th>Status</th><th style="width:14%">Last seen</th></tr></thead>'
MAIN = f'''      <div class="view">
{head("Devices", None)}        <div class="dsum"><span><b>312 devices</b> · 296 compliant · 16 need attention</span><span class="sp"></span>
          <span class="chips"><span class="on" id="cA">All <i>312</i></span><span id="cN">Needs attention <i>16</i></span></span></div>
        <div class="req">Requirements: <b>screen lock, OS no more than 1 version behind, disk encryption</b> · managed in Holonet MDM</div>
        <table class="sx" id="tA">{HEAD}<tbody>{"".join(tr(r) for r in ROWS_ALL)}</tbody></table>
        <table class="sx" id="tN">{HEAD}<tbody>{"".join(tr(r, r[6]) for r in ROWS_N)}</tbody></table>
      </div>
'''
EXTRA = f'''    <aside class="drw" id="drw" role="dialog" aria-labelledby="dT">
      <div class="tt"><div><b id="dT">Hobbie’s iPhone 15</b>Reported lost by Hobbie today, 9:12</div><span class="x" aria-label="Close">✕</span></div>
      <div class="kv2"><div><span>Person</span>Hobbie Klivian</div><div><span>OS</span>iOS 18.1</div><div><span>Last seen</span>3 hours ago, Hoth</div><div><span>Managed</span>Echo app only</div></div>
      <div class="acard"><b>Remove from Echo Base</b>Signs it out and stops it signing in again. Leaves everything on the phone as it is.<br><span class="btn">Remove</span></div>
      <div class="acard dan" id="aW"><b>Wipe Echo Base data</b>Erases Echo Base files, mail and accounts from the phone. Doesn’t touch personal photos, messages or apps.<br>
        <span class="btn" id="bW">Wipe Echo Base data</span>
        <div class="cf" id="cf">This can’t be undone. Hobbie keeps the phone and his personal data.<br><span class="btn pri2" id="bWc">Wipe Echo Base data from this iPhone</span></div>
        <div class="sent" id="sent" role="status">{OK}Wipe sent. It runs when the phone next connects.</div></div>
      <div class="vis">What admins see: device type, OS, compliance and last seen. <span>Not photos, messages, browsing or personal apps.</span></div>
    </aside>'''
SCRIPT = r"""const { $, at, span, easeOut } = Motion;

/* ---------- timeline (scene seconds) ---------- */
const T = { nClick: 1.00, rClick: 2.30, open: [2.35, 2.65], wClick: 3.90, cfClick: 5.10, sent: 5.20, endCard: [6.80, 7.25], end: 7.75 };

function build() {
  const n = at("cN");
  $("tA").style.display = "none"; $("tN").style.display = "table"; const r = at("rL", -200, 0);
  $("tA").style.display = ""; $("tN").style.display = "";
  $("drw").style.transform = "none"; $("drw").style.visibility = "visible";
  const w = at("bW"); $("cf").style.display = "block"; const c = at("bWc"); $("cf").style.display = "";
  $("drw").style.transform = ""; $("drw").style.visibility = "";
  const cur = [
    [0.00, 960, 640], [0.25, 960, 640], [0.70, n[0], n[1] + 3], [1.05, n[0], n[1] + 3], [2.00, r[0], r[1] + 3], [2.35, r[0], r[1] + 3],
    [3.60, w[0], w[1] + 3], [3.95, w[0], w[1] + 3], [4.80, c[0], c[1] + 3], [5.15, c[0], c[1] + 3], [6.80, c[0] - 40, c[1] + 70]
  ];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 345, 1.04], [6.55, 650, 345, 1.04], [6.80, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  $("crumb").innerHTML = "/ People / <b>Devices</b>";
  // status in words and an icon; filter to the ones that need attention
  const n = t >= T.nClick;
  $("cA").classList.toggle("on", !n); $("cN").classList.toggle("on", n);
  $("tA").style.display = n ? "none" : "table"; $("tN").style.display = n ? "table" : "none";
  $("rL").classList.toggle("sel", t >= T.rClick - .25);
  const o = span(t, ...T.open, easeOut);
  $("drw").style.transform = `translateX(${440 * (1 - o)}px)`; $("drw").style.visibility = o > 0 ? "visible" : "hidden";
  // remove and wipe are separate; wiping says what it erases and what it leaves, then asks again
  const w = t >= T.wClick, s = t >= T.sent;
  $("bW").style.display = w ? "none" : ""; $("cf").style.display = w && !s ? "block" : "none"; $("sent").style.display = s ? "flex" : "none";
  $("bWc").style.filter = t >= T.cfClick - .05 && t < T.sent ? "brightness(.85)" : "";
}

function events() { return [["click", T.nClick], ["click", T.rClick], ["whoosh", T.open[0]], ["click", T.wClick], ["click", T.cfClick]]; }

Motion.scene({
  // under 5 steps: natural length, within the 10 s cap
  T, clicks: [T.nClick, T.rClick, T.wClick, T.cfClick], build, render, events, duration: 9.8
});"""
COMMENT = """  Source for media/security-identity/device-management.mp4. Built by motion/_build/device_management.py on _build/security_page.py
  (People › Devices), with the top bar's alerts bell.
  Follows the Device management card (data/guidance-people.js):
  - devices with person, OS, status in words and an icon (never colour alone), and last seen; requirements in plain terms
  - filter to what needs attention; each says what to fix
  - remove and wipe as separate actions, each saying what it does and leaves; wiping asks again
  - what admins can and can't see on a device"""
make("device-management", "Device management", COMMENT, CSS, "People / Devices", MAIN, SCRIPT, extra=EXTRA)
