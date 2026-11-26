import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from security_page import make, head, OK, WN, ER

CSS = r"""
.me2 { margin-top: 14px; display: flex; align-items: center; gap: 8px; background: var(--subtle); border-radius: 10px; padding: 9px 12px; font-size: 12.5px; color: var(--ink); }
.me2 svg { width: 15px; height: 15px; flex: none; }
.me2 .sp { flex: 1; } .me2 span.s { color: var(--soft); }
.g2 { display: grid; grid-template-columns: 1.6fr 1fr; gap: 14px; align-items: start; }
.seg2 { margin-top: 8px; display: inline-flex; border: 1px solid var(--rule-strong); border-radius: 8px; padding: 2px; gap: 2px; }
.seg2 span { height: 28px; display: inline-flex; align-items: center; padding: 0 12px; border-radius: 6px; font-size: 12.5px; color: var(--soft); }
.seg2 span.on { background: var(--ink); color: #fff; font-weight: 500; }
.mon { margin-top: 10px; color: var(--ink); line-height: 1.45; }
.mon b { font-weight: 600; } .mon a { color: var(--ink); text-decoration: underline; text-underline-offset: 3px; }
.ap { margin-top: 12px; display: flex; gap: 14px; color: var(--ink); }
.ap span { display: inline-flex; gap: 6px; align-items: center; }
table.sx td.ed { padding: 4px 6px; }
table.sx td .in { height: 32px; }
.ce { display: flex; gap: 5px; align-items: center; font-size: 12px; white-space: nowrap; }
.ce svg { width: 13px; height: 13px; flex: none; }
.ce.e { color: #b91c1c; } .ce.k { color: var(--ink); }
#rN { display: none; }
.addr { margin-top: 8px; color: var(--ink); text-decoration: underline; text-underline-offset: 3px; display: inline-block; }
.sv2 { margin-top: 12px; display: flex; gap: 8px; } .sv2 .sp { flex: 1; } .sv2 .btn { height: 34px; }
"""
MAIN = f'''      <div class="view">
{head("Sign-in &amp; security", "net")}        <div class="me2">{OK}<span>Your IP is <b>203.0.113.24</b>, covered by <b>Echo Base HQ</b>. Saving won’t block you.</span><span class="sp"></span><span class="s">Checked as you edit</span></div>
        <div class="g2"><div class="sec"><h3>Allowed networks</h3><div class="d">Sign-ins from anywhere else are blocked when this is enforced.</div>
          <table class="sx"><thead><tr><th style="width:30%">Label</th><th style="width:36%">Range</th><th>Covers</th></tr></thead><tbody>
            <tr><td><b>Echo Base HQ</b></td><td class="mono">203.0.113.0/24</td><td>256 addresses</td></tr>
            <tr><td><b>Rebel fleet VPN</b></td><td class="mono">192.0.2.0/26</td><td>64 addresses</td></tr>
            <tr id="rN"><td class="ed"><span class="in" id="fL"><span id="fLv"></span><span class="c" id="fLc"></span></span></td><td class="ed"><span class="in mono" id="fR"><span id="fRv"></span><span class="c" id="fRc"></span></span></td>
              <td><span class="ce e" id="eR" style="display:none" role="alert">{ER}/33 isn’t valid. Use /0 to /32.</span><span class="ce k" id="kR" style="display:none" role="status">{OK}256 addresses</span></td></tr></tbody></table>
          <span class="addr" id="bAdd">+ Add range</span>
          <div class="ap"><span style="color:var(--soft)">Applies to</span><span><span class="cb on"></span>Web</span><span><span class="cb on"></span>API</span><span><span class="cb on"></span>Mobile apps</span></div></div>
        <div class="sec" style="margin-top:14px"><h3>Mode</h3><div class="seg2"><span>Off</span><span class="on">Monitor only</span><span>Enforce</span></div>
          <div class="mon">Nothing is blocked. Sign-ins from outside the list are logged. <b>Last 7 days: 14 sign-ins would have been blocked.</b> <a>View them</a></div></div></div>
        <div class="sv2"><span class="sp"></span><span class="btn">Cancel</span><span class="btn pri dis" id="bSv">Save</span></div>
      </div>
'''
TOAST = '      <div class="toast" id="toast"><i><svg width="11" height="11"><use href="#ok"/></svg></i>Saved in Monitor only · nothing is blocked yet</div>'
SCRIPT = r"""const { $, at, span, easeOut } = Motion;
const LBL = "Hoth outpost", R1 = "198.51.100.0/33";

/* ---------- timeline (scene seconds) ---------- */
const T = { addClick: 1.00, type: [1.20, 1.90], rClick: 2.50, type2: [2.65, 3.65], err: 3.70, fix: [4.80, 5.30], svClick: 6.20, toast: [6.30, 7.70], endCard: [8.00, 8.45], end: 8.95 };

function build() {
  const a = at("bAdd");
  $("rN").style.display = "table-row"; const r = at("fR", -60, 0); $("rN").style.display = "";
  const s = at("bSv");
  const cur = [
    [0.00, 960, 640], [0.25, 960, 640], [0.70, a[0], a[1] + 3], [1.05, a[0], a[1] + 3], [2.20, r[0], r[1] + 3], [2.55, r[0], r[1] + 3],
    [5.90, s[0], s[1] + 3], [6.25, s[0], s[1] + 3], [8.00, s[0] - 160, s[1] + 50]
  ];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 345, 1.04], [7.75, 650, 345, 1.04], [8.00, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  $("crumb").innerHTML = "/ People / <b>Sign-in &amp; security</b>";
  $("rN").style.display = t >= T.addClick ? "table-row" : "none";
  const a = Math.round(LBL.length * span(t, ...T.type, x => x));
  $("fLv").textContent = LBL.slice(0, a);
  const onL = t >= T.addClick && t < T.rClick, onR = t >= T.rClick && t < T.svClick;
  const blink = Math.floor(t * 2.4) % 2 === 0;
  $("fLc").style.opacity = onL && (t < T.type[1] + .05 || blink) ? 1 : 0;
  // the range is checked as she types: an invalid one says why, a valid one says how many addresses
  let r = R1.slice(0, Math.round(R1.length * span(t, ...T.type2, x => x)));
  if (t >= T.fix[0]) { const k = span(t, ...T.fix, x => x); r = k < .5 ? "198.51.100.0/" : "198.51.100.0/2" + (k > .8 ? "4" : ""); if (k < .5) r = "198.51.100.0/" + (k < .25 ? "3" : ""); }
  $("fRv").textContent = r;
  $("fRc").style.opacity = onR && (t < T.fix[1] + .05 || blink) ? 1 : 0;
  const bad = t >= T.err && t < T.fix[0], good = t >= T.fix[1];
  $("eR").style.display = bad ? "" : "none"; $("kR").style.display = good ? "" : "none";
  $("fL").className = "in" + (onL ? " f" : ""); $("fR").className = "in mono" + (bad ? " err" : onR ? " f" : "");
  $("bSv").className = "btn pri" + (good ? "" : " dis") + (t >= T.svClick - .05 && t < T.svClick + .1 ? " dn" : "");
  $("toast").style.opacity = span(t, T.toast[0], T.toast[0] + .2) * (1 - span(t, T.toast[1] - .2, T.toast[1]));
}

function events() { return [["click", T.addClick], ["key", T.type[0]], ["click", T.rClick], ["key", T.type2[0]], ["key", T.fix[0]], ["click", T.svClick], ["pop", T.toast[0]]]; }

Motion.scene({
  // 5 steps: natural length, within the 15 s cap
  T, clicks: [T.addClick, T.rClick, T.svClick], build, render, events,
  slow: [[3.7, 4.7, 1.3]]
});"""
COMMENT = """  Source for media/security-identity/ip-allowlists.mp4. Built by motion/_build/ip_allowlists.py on _build/security_page.py
  (People › Sign-in & security › Network), with the top bar's alerts bell.
  Follows the IP allowlists card (data/guidance-people.js):
  - her own IP, and whether saving would block her, checked as she edits
  - each range with a label; validated as it's typed, in text beside the row, with how many addresses it covers
  - which services it applies to: web, API, mobile
  - monitor only first: nothing blocked, and what would have been"""
make("ip-allowlists", "IP allowlists", COMMENT, CSS, "People / Sign-in & security", MAIN, SCRIPT, toast=TOAST)
