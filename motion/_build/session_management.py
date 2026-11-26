import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from security_page import make, head, OK, WN

CSS = r"""
.rl2 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 10px; }
.rl2 .in { height: 34px; justify-content: space-between; }
.rl2 .h2 { font-size: 12px; color: var(--soft); margin-top: 4px; }
.ps { display: flex; align-items: center; gap: 10px; margin-top: 10px; position: relative; }
.ps .in { width: 280px; gap: 8px; justify-content: flex-start; }
.ps .in svg { width: 14px; height: 14px; color: var(--soft); }
.ps .sp { flex: 1; }
.pk { position: absolute; left: 0; top: 40px; width: 280px; z-index: 6; display: none; }
.pk .it { color: var(--ink); } .pk .it span { color: var(--soft); font-size: 12px; margin-left: 6px; }
.who { display: none; margin-top: 10px; color: var(--ink); font-size: 13px; }
.who span { color: var(--soft); font-size: 12.5px; }
.flag2 { margin-left: 6px; font-size: 11px; color: #92400e; border: 1px solid #b45309; border-radius: 999px; padding: 0 7px; font-weight: 500; }
#tS { display: none; }
.none2 { display: none; margin-top: 10px; padding: 14px; text-align: center; border: 1px dashed var(--rule-strong); border-radius: 10px; color: var(--ink); }
.none2 span { color: var(--soft); }
.dlg .bl { margin-top: 10px; line-height: 1.5; }
.dlg .bl div { display: flex; gap: 8px; align-items: flex-start; color: var(--ink); padding: 2px 0; }
.dlg .bl svg { width: 14px; height: 14px; flex: none; margin-top: 2px; }
"""
SRCH = '<svg aria-hidden="true"><use href="#srch"/></svg>'
MAIN = f'''      <div class="view">
{head("Sign-in &amp; security", "ses")}        <div class="sec"><h3>Session rules</h3><div class="d">For everyone. Admins can be stricter in Roles.</div>
          <div class="rl2"><div><span class="lbl">Session length</span><span class="in">12 hours<i class="cv"></i></span></div>
            <div><span class="lbl">Sign out after no activity</span><span class="in">30 minutes<i class="cv"></i></span></div>
            <div><span class="lbl">Before signing out</span><span class="in">Warn 2 minutes ahead<i class="cv"></i></span><div class="h2">Drafts are kept either way.</div></div></div></div>
        <div class="sec"><h3>Active sessions</h3><div class="d">Look up a person to see where they’re signed in.</div>
          <div class="ps"><span class="in" id="fP">{SRCH}<span id="fPv" style="color:var(--faint)">Search people</span><span class="c" id="fPc"></span></span>
            <div class="menu pk" id="pk"><div class="it" id="pH">Hobbie Klivian<span>Pilot · Fleet</span></div><div class="it">Hobbie Ott<span>Ground crew</span></div></div>
            <span class="sp"></span><span class="btn dis" id="bSo">Sign out everywhere</span></div>
          <div class="who" id="who" role="status"><b>Hobbie Klivian</b> <span>· signed in on 3 devices</span></div>
          <table class="sx" id="tS"><thead><tr><th style="width:28%">Device</th><th style="width:30%">Where</th><th>Signed in</th><th>Last active</th></tr></thead><tbody>
            <tr><td><b>MacBook Pro</b>Chrome</td><td><b>Echo Base, Hoth</b>10.4.2.17</td><td>Nov 24</td><td>Now</td></tr>
            <tr><td><b>iPhone 15</b>Echo app</td><td><b>Hoth</b>198.51.100.8</td><td>Nov 20</td><td>2 hours ago</td></tr>
            <tr><td><b>Windows PC</b>Edge</td><td><b>Yavin 4 <span class="flag2">New place</span></b>203.0.113.40</td><td>Nov 3</td><td>22 days ago</td></tr></tbody></table>
          <div class="none2" id="none2">No active sessions <span>· signed out everywhere just now by you</span></div></div>
      </div>
'''
EXTRA = f'''    <div class="scr" id="scr"></div>
    <section class="dlg" id="dlg" role="dialog" aria-labelledby="dT" style="left:420px; top:150px; width:480px">
      <h3 id="dT">Sign Hobbie out everywhere?</h3>
      <div class="bl"><div>{OK}<span>Ends his 3 sessions now. He signs in again on each device.</span></div><div>{OK}<span>Unsaved drafts are kept and come back when he signs in.</span></div><div>{WN}<span>His 2 API tokens are revoked too. Scripts using them stop.</span></div></div>
      <div class="ft"><span class="sp"></span><span class="btn">Cancel</span><span class="btn pri" id="bOk">Sign out everywhere</span></div>
    </section>'''
TOAST = '      <div class="toast" id="toast"><i><svg width="11" height="11"><use href="#ok"/></svg></i>Hobbie Klivian is signed out of 3 sessions</div>'
SCRIPT = r"""const { $, at, span, easeOut } = Motion;
const Q = "Hob";

/* ---------- timeline (scene seconds) ---------- */
const T = { fClick: 1.00, type: [1.20, 1.50], pick: 2.10, soClick: 3.80, open: [3.85, 4.10], okClick: 5.10, close: [5.15, 5.35], toast: [5.40, 6.80], endCard: [7.00, 7.45], end: 7.95 };

function build() {
  const f = at("fP", -80, 0);
  $("pk").style.display = "block"; const h = at("pH", -60, 0); $("pk").style.display = "";
  const so = at("bSo");
  $("dlg").style.opacity = 1; const ok = at("bOk"); $("dlg").style.opacity = 0;
  const cur = [
    [0.00, 960, 640], [0.25, 960, 640], [0.70, f[0], f[1] + 3], [1.05, f[0], f[1] + 3], [1.80, h[0], h[1] + 3], [2.15, h[0], h[1] + 3],
    [3.50, so[0], so[1] + 3], [3.85, so[0], so[1] + 3], [4.80, ok[0], ok[1] + 3], [5.15, ok[0], ok[1] + 3], [7.00, ok[0] - 160, ok[1] + 120]
  ];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 345, 1.04], [6.75, 650, 345, 1.04], [7.00, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  $("crumb").innerHTML = "/ People / <b>Sign-in &amp; security</b>";
  const n = Math.round(Q.length * span(t, ...T.type, x => x)), p = t >= T.pick;
  $("fPv").textContent = p ? "Hobbie Klivian" : (n ? Q.slice(0, n) : "Search people");
  $("fPv").style.color = n || p ? "var(--ink)" : "var(--faint)";
  $("fP").classList.toggle("f", t >= T.fClick && !p);
  $("fPc").style.opacity = t >= T.fClick && !p && Math.floor(t * 2.4) % 2 === 0 ? 1 : 0;
  $("pk").style.display = n > 0 && !p ? "block" : "none"; $("pH").classList.toggle("hov", t >= T.pick - .3);
  // his sessions: device, a place she can read, and last activity
  const done = t >= T.close[0];
  $("who").style.display = p && !done ? "block" : "none";
  $("tS").style.display = p && !done ? "table" : "none";
  $("none2").style.display = done ? "block" : "none";
  $("bSo").className = "btn" + (p && !done ? "" : " dis") + (t >= T.soClick - .05 && t < T.open[0] + .1 ? " dn" : "");
  // what signing out everywhere does, before it does it
  const o = span(t, ...T.open, easeOut) * (1 - span(t, ...T.close, easeOut));
  $("dlg").style.opacity = o; $("scr").style.opacity = o; $("dlg").style.visibility = o > 0 ? "visible" : "hidden";
  $("bOk").classList.toggle("dn", t >= T.okClick - .05 && t < T.close[0]);
  $("toast").style.opacity = span(t, T.toast[0], T.toast[0] + .2) * (1 - span(t, T.toast[1] - .2, T.toast[1]));
}

function events() { return [["click", T.fClick], ["key", T.type[0]], ["click", T.pick], ["click", T.soClick], ["whoosh", T.open[0]], ["click", T.okClick], ["pop", T.toast[0]]]; }

Motion.scene({
  // under 5 steps: natural length, within the 10 s cap
  T, clicks: [T.fClick, T.pick, T.soClick, T.okClick], build, render, events, duration: 9.8
});"""
COMMENT = """  Source for media/security-identity/session-management.mp4. Built by motion/_build/session_management.py on _build/security_page.py
  (People › Sign-in & security › Sessions), with the top bar's alerts bell.
  Follows the Session management card (data/guidance-people.js):
  - session length and idle timeout with sensible defaults; a warning before signing out; drafts kept
  - a person's sessions in a table: device, a readable place with the IP, signed in, last active; a new place flagged in words
  - Sign out everywhere says what it does first, including revoking API tokens"""
make("session-management", "Session management", COMMENT, CSS, "People / Sign-in & security", MAIN, SCRIPT, extra=EXTRA, toast=TOAST)
