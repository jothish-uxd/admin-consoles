import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from security_page import make, head, OK, WN, COPY

CSS = r"""
.stp { margin-top: 14px; display: flex; gap: 6px; align-items: center; font-size: 12.5px; }
.stp span { display: inline-flex; gap: 6px; align-items: center; color: var(--soft); }
.stp span i { width: 20px; height: 20px; border-radius: 50%; border: 1.5px solid var(--rule-strong); display: grid; place-items: center; font-style: normal; font-size: 11px; color: var(--ink); box-sizing: border-box; }
.stp span.on { color: var(--ink); font-weight: 600; } .stp span.on i { border-color: var(--ink); background: var(--ink); color: #fff; }
.stp span.dn2 i { border-color: var(--ink); color: var(--ink); }
.stp .ln { flex: 0 0 22px; height: 1px; background: var(--rule-strong); }
.vw { display: none; }
.two { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 12px; }
.two .sec { margin-top: 0; }
.kvx { margin-top: 10px; }
.kvx .in { flex: 1; min-width: 0; overflow: hidden; }
.kvx .rw { gap: 8px; }
.cp2 { font-size: 11.5px; color: var(--ink); margin-left: 6px; }
.rd { margin-top: 10px; border-top: 1px solid var(--rule); padding-top: 8px; display: none; }
.rd div { padding: 2px 0; } .rd b { color: var(--ink); font-weight: 500; }
.nx { margin-top: 12px; display: flex; gap: 8px; } .nx .sp { flex: 1; } .nx .btn { height: 34px; }
.res2 { display: none; margin-top: 12px; }
.res2 table { margin-top: 6px; }
.opt { display: flex; align-items: flex-start; gap: 10px; padding: 9px 0; border-top: 1px solid var(--rule); }
.opt:first-of-type { border-top: 0; }
.opt b { color: var(--ink); font-weight: 500; display: block; font-size: 13px; }
.rb { width: 14px; height: 14px; border-radius: 50%; border: 1.5px solid var(--rule-strong); box-sizing: border-box; flex: none; margin-top: 2px; }
.rb.on { border: 4.5px solid var(--ink); }
.bg { margin-top: 10px; display: flex; gap: 8px; align-items: flex-start; background: var(--subtle); border-radius: 8px; padding: 8px 10px; color: var(--ink); }
.bg svg { width: 15px; height: 15px; flex: none; margin-top: 1px; }
"""
def stp(on):
    n = ["Provider", "Connect", "Map attributes", "Test", "Enforce"]
    out = []
    for i, x in enumerate(n):
        c = "on" if i == on else ("dn2" if i < on else "")
        out.append(f'<span class="{c}"><i>{"✓" if i < on else i + 1}</i>{x}{" · Holonet ID" if i == 0 else ""}</span>')
    return '        <div class="stp">' + '<span class="ln"></span>'.join(out) + '</div>\n'
V2 = f'''      <div class="vw" id="v2">
{stp(1)}        <div class="two">
          <div class="sec"><h3>Give these to Holonet ID</h3><div class="d">Paste them into the app’s SAML settings there.</div>
            <div class="kvx"><span class="lbl">ACS URL <span>· Holonet calls it Single sign-on URL</span></span><div class="rw"><span class="in mono">https://echobase.console/saml/acs</span><span class="btn sm cpy" id="bCp">{COPY}Copy</span></div><div class="msg"><span id="cpd" style="display:none" role="status">{OK}Copied</span></div></div>
            <div class="kvx" style="margin-top:2px"><span class="lbl">Entity ID <span>· Audience URI</span></span><div class="rw"><span class="in mono">echobase.console</span><span class="btn sm cpy">{COPY}Copy</span></div></div></div>
          <div class="sec"><h3>From Holonet ID</h3><div class="d">Its metadata URL, or upload the file.</div>
            <div class="kvx"><label class="lbl" for="mU">Metadata URL</label><div class="in mono" id="mU"><span id="mUv"></span><span class="c" id="mUc"></span></div></div>
            <div class="rd" id="rd" role="status"><div><b>Read from the metadata</b></div><div>Sign-in URL: id.holonet.org/sso/saml</div><div>Certificate: valid until <b>Mar 14, 2027</b>. We’ll warn you 30 days before.</div></div></div>
        </div>
        <div class="nx"><span class="btn">Back</span><span class="sp"></span><span class="btn pri dis" id="bN2">Next</span></div>
      </div>
'''
V4 = f'''      <div class="vw" id="v4">
{stp(3)}        <div class="sec"><div class="rw"><div><h3>Test sign-in</h3><div class="d">Sign in through Holonet ID as yourself. Nobody else is affected.</div></div><span class="sp"></span><span class="btn pri" id="bTs">Test sign-in</span></div>
          <div class="res2" id="res2" role="status"><div class="stat">{OK}<span>Signed in as <b>Lavanya Sienna</b>. Attributes received and matched:</span></div>
            <table class="sx"><thead><tr><th>Echo Base</th><th>From Holonet ID</th><th>Value</th></tr></thead><tbody>
            <tr><td>Email</td><td class="mono">user.email</td><td>lavanya@echobase.org</td></tr><tr><td>Name</td><td class="mono">user.displayName</td><td>Lavanya Sienna</td></tr><tr><td>Groups</td><td class="mono">user.groups</td><td>Echo Base admins</td></tr></tbody></table></div></div>
        <div class="nx"><span class="btn">Back</span><span class="sp"></span><span class="btn pri dis" id="bN4">Next</span></div>
      </div>
'''
V5 = f'''      <div class="vw" id="v5">
{stp(4)}        <div class="sec"><h3>Who must use SSO</h3>
          <div class="opt" id="oF" style="margin-top:8px"><span class="rb on"></span><div><b>Fleet first</b>214 people. Everyone else keeps signing in as now.</div></div>
          <div class="opt"><span class="rb"></span><div><b>Everyone in Echo Base</b>1,214 people. Try a group first.</div></div>
          <div class="bg">{WN}<span><b>Break-glass:</b> Mon Mothma and you, the 2 owners, keep password sign-in, so a broken connection can’t lock every admin out.</span></div></div>
        <div class="nx"><span class="btn">Back</span><span class="sp"></span><span class="btn pri" id="bEn">Enforce for Fleet</span></div>
      </div>
'''
MAIN = f'      <div class="view">\n{head("Sign-in &amp; security", "sso")}{V2}{V4}{V5}      </div>\n'
TOAST = '      <div class="toast" id="toast"><i><svg width="11" height="11"><use href="#ok"/></svg></i>SSO is required for Fleet · 214 people at their next sign-in</div>'
SCRIPT = r"""const { $, at, span, easeOut } = Motion;
const URL = "https://id.holonet.org/metadata/echo";

/* ---------- timeline (scene seconds) ---------- */
const T = {
  cpClick: 1.20, mClick: 2.30, paste: 2.75, n2Click: 3.80, to4: 3.85, tsClick: 4.85, res: 5.25, n4Click: 6.55, to5: 6.60,
  enClick: 7.90, toast: [8.00, 9.40], endCard: [9.60, 10.05], end: 10.55
};

function build() {
  const one = v => ["v2", "v4", "v5"].forEach(x => $(x).style.display = x === v ? "block" : "none");
  $("rd").style.display = "block"; $("res2").style.display = "block";
  one("v2"); const cp = at("bCp"), m = at("mU", -60, 0), n2 = at("bN2");
  one("v4"); const ts = at("bTs"), n4 = at("bN4");
  one("v5"); const en = at("bEn");
  ["v2", "v4", "v5", "rd", "res2"].forEach(v => $(v).style.display = "");
  const cur = [
    [0.00, 960, 640], [0.25, 960, 640], [0.90, cp[0], cp[1] + 3], [1.25, cp[0], cp[1] + 3], [2.00, m[0], m[1] + 3], [2.35, m[0], m[1] + 3],
    [3.50, n2[0], n2[1] + 3], [3.85, n2[0], n2[1] + 3], [4.55, ts[0], ts[1] + 3], [4.90, ts[0], ts[1] + 3],
    [6.25, n4[0], n4[1] + 3], [6.60, n4[0], n4[1] + 3], [7.60, en[0], en[1] + 3], [7.95, en[0], en[1] + 3], [9.60, en[0] - 120, en[1] + 60]
  ];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 345, 1.04], [9.35, 650, 345, 1.04], [9.60, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  $("crumb").innerHTML = "/ People / <b>Sign-in &amp; security</b>";
  // one step at a time, hard cuts
  const v = t < T.to4 ? "v2" : t < T.to5 ? "v4" : "v5";
  ["v2", "v4", "v5"].forEach(x => $(x).style.display = x === v ? "block" : "none");
  // copy, announced; paste the metadata URL, and what was read from it
  $("cpd").style.display = t >= T.cpClick && t < T.cpClick + 1.6 ? "" : "none";
  $("bCp").classList.toggle("dn", t >= T.cpClick - .05 && t < T.cpClick + .1);
  const p = t >= T.paste;
  $("mUv").textContent = p ? URL : ""; $("mU").className = "in mono" + (t >= T.mClick && t < T.n2Click ? " f" : "");
  $("mUc").style.opacity = t >= T.mClick && t < T.n2Click && Math.floor(t * 2.4) % 2 === 0 ? 1 : 0;
  $("rd").style.display = t >= T.paste + .25 ? "block" : "none";
  $("bN2").className = "btn pri" + (t < T.paste + .25 ? " dis" : "") + (t >= T.n2Click - .05 && t < T.to4 ? " dn" : "");
  // the test comes first; Enforce waits for it
  $("res2").style.display = t >= T.res ? "block" : "none";
  $("bTs").classList.toggle("dn", t >= T.tsClick - .05 && t < T.tsClick + .1);
  $("bN4").className = "btn pri" + (t < T.res ? " dis" : "") + (t >= T.n4Click - .05 && t < T.to5 ? " dn" : "");
  $("bEn").classList.toggle("dn", t >= T.enClick - .05 && t < T.enClick + .1);
  $("toast").style.opacity = span(t, T.toast[0], T.toast[0] + .2) * (1 - span(t, T.toast[1] - .2, T.toast[1]));
}

function events() { return [["click", T.cpClick], ["click", T.mClick], ["key", T.paste], ["click", T.n2Click], ["click", T.tsClick], ["click", T.n4Click], ["click", T.enClick], ["pop", T.toast[0]]]; }

Motion.scene({
  // 5+ steps: natural length, within the 15 s cap
  T, clicks: [T.cpClick, T.mClick, T.n2Click, T.tsClick, T.n4Click, T.enClick], build, render, events, duration: 14.5
});"""
COMMENT = """  Source for media/security-identity/sso-setup.mp4. Built by motion/_build/sso_setup.py on _build/security_page.py
  (People › Sign-in & security), with the top bar's alerts bell.
  Follows the SSO setup card (data/guidance-people.js):
  - steps: provider, connect, map attributes, test, enforce
  - every value to copy has Copy, announced, with what the identity provider calls it; metadata by URL or file
  - the certificate's expiry is shown, with a warning before it
  - a test sign-in before Enforce; enforce for a group first; a break-glass path for owners"""
make("sso-setup", "SSO setup", COMMENT, CSS, "People / Sign-in & security", MAIN, SCRIPT, toast=TOAST)
