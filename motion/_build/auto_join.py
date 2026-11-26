import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from user_page import make, OK

CSS = r"""
.ih { margin-top: 6px; display: flex; align-items: baseline; gap: 10px; }
.ih h1 { margin: 0; font-size: 22px; } .ih span { color: var(--soft); font-size: 13px; }
.g3 { display: grid; grid-template-columns: 1.3fr 1fr; gap: 14px; align-items: start; }
.dm2 { display: grid; grid-template-columns: 1fr auto auto; gap: 10px; align-items: center; padding: 8px 0; border-top: 1px solid var(--rule); color: var(--ink); }
.dm2:first-of-type { border-top: 0; }
.dm2 b { font-weight: 500; } .dm2 .st5 { display: inline-flex; gap: 5px; align-items: center; font-size: 12px; color: var(--ink); }
.dm2 .st5 svg { width: 13px; height: 13px; } .dm2 .bh { color: var(--soft); font-size: 12px; }
.dm2.on { background: var(--subtle); margin: 0 -8px; padding: 8px; border-radius: 8px; }
.opt2 { display: flex; gap: 10px; align-items: flex-start; padding: 8px 0; color: var(--ink); }
.opt2 b { font-weight: 500; display: block; font-size: 13px; } .opt2 span.d { color: var(--soft); font-size: 12px; }
.rb { width: 14px; height: 14px; border-radius: 50%; border: 1.5px solid var(--rule-strong); box-sizing: border-box; flex: none; margin-top: 2px; }
.rb.on { border: 4.5px solid var(--ink); }
.kv3 { margin-top: 8px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px 14px; }
.kv3 .k { font-size: 12px; color: var(--soft); } .kv3 .v { color: var(--ink); font-size: 13px; margin-top: 1px; }
.pv { border: 1px solid var(--rule-strong); border-radius: 12px; padding: 16px; text-align: center; color: var(--ink); background: var(--bg); }
.pv .lg { width: 36px; height: 36px; border-radius: 9px; background: var(--ink); color: #fff; display: grid; place-items: center; margin: 0 auto 8px; font-weight: 700; }
.pv h4 { margin: 0; font-size: 15px; } .pv p { margin: 6px 0 12px; color: var(--soft); font-size: 12.5px; line-height: 1.45; }
.pv .btn { height: 34px; }
.sv3 { margin-top: 12px; display: flex; gap: 8px; } .sv3 .sp { flex: 1; } .sv3 .btn { height: 34px; }
.btn.pri.dis { background: var(--subtle); color: var(--faint); border-color: var(--rule); }
"""
MAIN = f'''      <div class="view">
        <div class="bk">← Users</div>
        <div class="ih"><h1>Auto-join by domain</h1><span>People who sign up with a verified domain</span></div>
        <div class="g3"><div>
          <div class="sec"><h3>Verified domains</h3>
            <div class="dm2 on"><b>echobase.org</b><span class="st5">{OK}Verified</span><span class="bh" id="bh1">Join automatically</span></div>
            <div class="dm2"><b>rebellion.net</b><span class="st5">{OK}Verified</span><span class="bh">Don’t allow</span></div>
            <div style="margin-top:6px;font-size:12px">Only verified domains can be used, and never public ones like gmail.com. Verify more in Sign-in &amp; security › Domains.</div></div>
          <div class="sec"><h3>For echobase.org</h3>
            <div class="opt2"><span class="rb on" id="r1"></span><div><b>Join automatically</b><span class="d">Anyone with an echobase.org email gets in straight away</span></div></div>
            <div class="opt2" id="o2"><span class="rb" id="r2"></span><div><b>Ask to join, an admin approves</b><span class="d">They wait until a People admin says yes</span></div></div>
            <div class="opt2"><span class="rb"></span><div><b>Don’t allow</b><span class="d">Only invited people get in</span></div></div>
</div>
        </div><div>
          <div class="sec"><h3>What they see</h3>
            <div class="pv"><div class="lg">EB</div><h4>Join Echo Base?</h4><p id="pvT">Echo Base is run by Lavanya Sienna and 13 other admins. You’ll join as a Member right away.</p><span class="btn pri" id="pvB">Join Echo Base</span></div>
            <div class="kv3" style="margin-top:12px"><div><div class="k">Joins as</div><div class="v">Member · no admin rights</div></div><div><div class="k">Seat</div><div class="v" id="seat">Used when they join</div></div></div></div>
          <div class="sv3"><span class="sp"></span><span class="btn">Cancel</span><span class="btn pri dis" id="bSv">Save</span></div>
        </div></div>
      </div>
'''
TOAST = '      <div class="toast" id="toast"><i><svg width="11" height="11"><use href="#ok"/></svg></i>Saved · people on echobase.org now ask to join</div>'
SCRIPT = r"""const { $, at, span, easeOut } = Motion;

/* ---------- timeline (scene seconds) ---------- */
const T = { oClick: 1.40, sClick: 3.60, toast: [3.70, 5.10], endCard: [5.80, 6.25], end: 6.75 };

function build() {
  const o = at("r2"), s = at("bSv");
  const cur = [[0.00, 960, 640], [0.25, 960, 640], [1.05, o[0], o[1] + 3], [1.45, o[0], o[1] + 3], [3.25, s[0], s[1] + 3], [3.65, s[0], s[1] + 3], [5.80, s[0] + 200, s[1] - 120]];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 345, 1.04], [5.55, 650, 345, 1.04], [5.80, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  $("crumb").innerHTML = "/ People / Users / <b>Auto-join</b>";
  // the choice, the seat and the joiner's view change together
  const a = t >= T.oClick, s = t >= T.sClick;
  $("r1").classList.toggle("on", !a); $("r2").classList.toggle("on", a);
  $("seat").textContent = a ? "Used only when approved" : "Used when they join";
  $("pvT").textContent = a ? "Echo Base is run by Lavanya Sienna and 13 other admins. An admin will approve you, and you’ll join as a Member." : "Echo Base is run by Lavanya Sienna and 13 other admins. You’ll join as a Member right away.";
  $("pvB").textContent = a ? "Ask to join" : "Join Echo Base";
  $("bSv").className = "btn pri" + (a && !s ? "" : " dis") + (t >= T.sClick - .05 && t < T.sClick + .1 ? " dn" : "");
  $("bh1").textContent = s ? "Ask to join" : "Join automatically";
  $("toast").style.opacity = span(t, T.toast[0], T.toast[0] + .2) * (1 - span(t, T.toast[1] - .2, T.toast[1]));
}

function events() { return [["click", T.oClick], ["click", T.sClick], ["pop", T.toast[0]]]; }

Motion.scene({
  // under 5 steps: natural length, within the 10 s cap
  T, clicks: [T.oClick, T.sClick], build, render, events,
  slow: [[0.4, 1.0, 1.3], [1.6, 3.0, 1.2]]
});"""
COMMENT = """  Source for media/user-management/auto-join.mp4. Built by motion/_build/auto_join.py on _build/user_page.py
  (People › Users › Auto-join), with the top bar's alerts bell.
  Follows the Auto-join by domain card (data/guidance.js):
  - only verified domains; never public email domains
  - join automatically, ask to join with approval, or don't allow
  - a conservative, visible default role; when a seat is used
  - what the joining person sees: which org, and who runs it"""
make("auto-join", "Auto-join by domain", COMMENT, CSS, MAIN, SCRIPT, toast=TOAST, crumb="People / Users / Auto-join")
