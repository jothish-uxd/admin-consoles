import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from security_page import make, head, OK, WN

CSS = r"""
.g2 { display: grid; grid-template-columns: 1.35fr 1fr; gap: 14px; align-items: start; }
.big { margin-top: 6px; font-size: 22px; color: var(--ink); font-weight: 650; }
.big span { font-size: 13px; color: var(--soft); font-weight: 400; }
.bar { margin-top: 8px; height: 8px; border-radius: 999px; background: var(--hover); overflow: hidden; }
.bar i { display: block; height: 100%; width: 89.3%; background: var(--ink); }
.lnk2 { margin-top: 8px; display: inline-block; color: var(--ink); text-decoration: underline; text-underline-offset: 3px; }
.rq { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: auto auto; grid-auto-flow: column; gap: 6px 16px; align-items: start; margin-top: 10px; }  /* each label above its control */
.rq b { color: var(--ink); font-weight: 500; display: block; font-size: 13px; }
.rq .in { height: 34px; justify-content: space-between; position: relative; }
.mnu { position: absolute; left: 0; width: 240px; top: 38px; z-index: 6; display: none; }
.mnu .it { color: var(--ink); font-size: 12.5px; }
.mnu .it span { display: block; font-size: 11.5px; color: var(--soft); }
.fx { margin-top: 8px; display: grid; grid-template-columns: 1fr 1fr; gap: 6px 14px; }
.fx div { display: flex; gap: 8px; align-items: center; color: var(--ink); }
.fx div span { color: var(--soft); font-size: 12px; }
.ex div { padding: 6px 0; border-top: 1px solid var(--rule); }
.ex div:first-of-type { border-top: 0; }
.ex b { color: var(--ink); font-weight: 500; }
.eff { margin-top: 12px; display: flex; gap: 10px; align-items: center; }
.eff .tx { flex: 1; color: var(--ink); font-size: 12.5px; line-height: 1.4; }
.eff .btn { height: 34px; }
"""
MAIN = f'''      <div class="view">
{head("Sign-in &amp; security", "mfa")}        <div class="g2"><div>
          <div class="sec"><h3>Require MFA</h3><div class="d">People not enrolled are asked to at their next sign-in.</div>
            <div class="rq"><div><b>Admins</b>14 people · all enrolled</div><span class="in">Now<i class="cv"></i></span>
              <div><b>Everyone else</b>1,200 people · 130 not enrolled</div><span class="in" id="sEv"><span id="sEvT">Optional</span><i class="cv"></i>
                <div class="menu mnu" id="mEv"><div class="it">Optional</div><div class="it" id="o14">After 14 days<span>Reminders on days 1, 7 and 13</span></div><div class="it">Now</div></div></span></div></div>
          <div class="sec"><h3>Factors people can use</h3><div class="d">People can register more than one.</div>
            <div class="fx"><div><span class="cb on"></span>Authenticator app</div><div><span class="cb on"></span>Security key</div><div><span class="cb" id="cPk"></span>Passkey</div><div><span class="cb on"></span>Text message <span>· fallback only</span></div></div></div>
          <div class="eff"><span class="tx" id="eff" aria-live="polite">No change yet.</span><span class="btn">Cancel</span><span class="btn pri dis" id="bSv">Save</span></div>
        </div><div>
          <div class="sec" style="margin-top:14px"><h3>Enrolled</h3><div class="big">1,084 <span>of 1,214 people · 130 not yet</span></div><div class="bar"><i></i></div><span class="lnk2">See who isn’t enrolled</span></div>
          <div class="sec ex"><h3>Exempt · 2</h3><div class="d" style="margin-bottom:4px">Listed and reviewed every 90 days.</div>
            <div><b>break-glass-1</b> · owner account for emergencies<br>Exempt by Mon Mothma · reviewed Nov 1</div>
            <div><b>holonet-sync</b> · service account, no person signs in<br>Exempt by Cal Alder · reviewed Nov 1</div></div>
        </div></div>
      </div>
'''
TOAST = '      <div class="toast" id="toast"><i><svg width="11" height="11"><use href="#ok"/></svg></i>Saved · reminders start today</div>'
SCRIPT = r"""const { $, at, span, easeOut } = Motion;

/* ---------- timeline (scene seconds) ---------- */
const T = { sClick: 1.20, oClick: 2.10, pClick: 3.20, svClick: 4.60, toast: [4.70, 6.10], endCard: [6.40, 6.85], end: 7.35 };

function build() {
  const s = at("sEv");
  $("mEv").style.display = "block"; const o = at("o14", -30, 0); $("mEv").style.display = "";
  const p = at("cPk"), v = at("bSv");
  const cur = [
    [0.00, 960, 640], [0.25, 960, 640], [0.90, s[0], s[1] + 3], [1.25, s[0], s[1] + 3], [1.80, o[0], o[1] + 3], [2.15, o[0], o[1] + 3],
    [2.90, p[0], p[1] + 3], [3.25, p[0], p[1] + 3], [4.30, v[0], v[1] + 3], [4.65, v[0], v[1] + 3], [6.40, v[0] - 140, v[1] + 70]
  ];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 345, 1.04], [6.15, 650, 345, 1.04], [6.40, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  $("crumb").innerHTML = "/ People / <b>Sign-in &amp; security</b>";
  $("mEv").style.display = t >= T.sClick && t < T.oClick ? "block" : "none";
  $("o14").classList.toggle("hov", t >= T.oClick - .3);
  $("sEv").classList.toggle("f", t >= T.sClick && t < T.oClick);
  const g = t >= T.oClick, k = t >= T.pClick;
  $("sEvT").textContent = g ? "After 14 days" : "Optional";
  $("cPk").classList.toggle("on", k);
  // the effect, in words, before saving
  $("eff").innerHTML = g ? "<b>From Dec 10</b>, the 130 people not enrolled must enrol at their next sign-in. Reminders until then." + (k ? " Passkeys allowed." : "") : "No change yet.";
  $("bSv").className = "btn pri" + (g ? "" : " dis") + (t >= T.svClick - .05 && t < T.svClick + .1 ? " dn" : "");
  $("toast").style.opacity = span(t, T.toast[0], T.toast[0] + .2) * (1 - span(t, T.toast[1] - .2, T.toast[1]));
}

function events() { return [["click", T.sClick], ["click", T.oClick], ["click", T.pClick], ["click", T.svClick], ["pop", T.toast[0]]]; }

Motion.scene({
  // under 5 steps: natural length, within the 10 s cap
  T, clicks: [T.sClick, T.oClick, T.pClick, T.svClick], build, render, events,
  duration: 9.8
});"""
COMMENT = """  Source for media/security-identity/mfa-enforcement.mp4. Built by motion/_build/mfa_enforcement.py on _build/security_page.py
  (People › Sign-in & security › MFA), with the top bar's alerts bell.
  Follows the MFA enforcement card (data/guidance-people.js):
  - enrolment status first: how many are enrolled, and who isn't
  - admins now; everyone else after a grace period with reminders
  - a range of factors, text message only as a fallback; exemptions listed with reasons and reviews
  - the effect in words before saving"""
make("mfa-enforcement", "MFA enforcement", COMMENT, CSS, "People / Sign-in & security", MAIN, SCRIPT, toast=TOAST)
