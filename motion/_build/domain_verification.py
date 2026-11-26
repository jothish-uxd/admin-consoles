import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from security_page import make, head, OK, WN, ER, PEND, COPY

CSS = r"""
.dh { margin-top: 14px; display: flex; align-items: center; gap: 10px; }
.dh h3 { margin: 0; font-size: 14px; color: var(--ink); font-weight: 600; }
.dh .sp { flex: 1; } .dh span.c3 { color: var(--soft); font-size: 12.5px; }
.ad { display: none; margin-top: 10px; }
.ad .rw2 { display: flex; gap: 10px; align-items: flex-start; }
.ad .rw2 > div { flex: 1; }
.ad .btn { height: 36px; margin-top: 22px; }
.ad .msg { height: auto; min-height: 16px; }
.ad .msg > span { position: static; }
.rec { display: none; }
.rec .g3 { margin-top: 10px; display: grid; grid-template-columns: 60px 1fr 1.6fr; gap: 10px; }
.rec .g3 .in { height: 34px; justify-content: space-between; gap: 6px; overflow: hidden; }
.rec .g3 .in { padding-right: 4px; }
.rec .g3 .in .cpy { height: 26px; flex: none; margin: 0; align-self: center; }
.rec .cpd2 { color: #15803d; font-weight: 500; margin-left: 6px; display: none; }
.rec .nt { margin-top: 8px; }
.rec .act { margin-top: 10px; display: flex; gap: 8px; align-items: center; }
.rec .act .btn { height: 32px; }
.rec .chk { display: none; align-items: center; gap: 6px; color: var(--ink); }
.rec .chk svg { width: 14px; height: 14px; }
#rY { display: none; }
"""
def st(kind):
    return {"v": f'<span class="st2">{OK}Verified</span>', "p": f'<span class="st2">{PEND}Pending</span>'}[kind]
MAIN = f'''      <div class="view">
{head("Sign-in &amp; security", "dom")}        <div class="dh"><h3>Domains</h3><span class="c3">Verified domains can use SSO, and new accounts on them join Echo Base.</span><span class="sp"></span><span class="btn sm pri" id="bAd">Add domain</span></div>
        <div class="sec ad" id="ad">
          <div id="s1"><div class="rw2"><div><label class="lbl" for="fD">Domain</label><div class="in f" id="fD"><span id="fDv"></span><span class="c" id="fDc"></span></div>
            <div class="msg"><span class="e" id="eD" style="display:none">{ER}gmail.com is a public email domain. Only domains Echo Base owns can be verified.</span></div></div>
            <span class="btn pri dis" id="bNx">Next</span></div></div>
          <div class="rec" id="s2"><h3>Add this record to yavin4.org’s DNS</h3><div class="d">Wherever its DNS is managed. You can send this to whoever does that.</div>
            <div class="g3"><div><span class="lbl">Type</span><span class="in">TXT</span></div><div><span class="lbl">Name</span><span class="in mono">_echobase<span class="btn sm cpy">{COPY}Copy</span></span></div>
              <div><span class="lbl">Value<span class="cpd2" id="cpd" role="status">· Copied</span></span><span class="in mono">echobase-verify=7f3a9c21e8<span class="btn sm cpy" id="bCv">{COPY}Copy</span></span></div></div>
            <div class="act"><span class="btn" id="bCk">Check now</span><span class="btn">Send instructions</span><span class="chk" id="chk" role="status">{PEND}Not found yet · checked just now. DNS can take up to 48 hours; we check every hour and tell you.</span></div></div>
        </div>
        <table class="sx"><thead><tr><th style="width:24%">Domain</th><th style="width:18%">Status</th><th style="width:18%">Last checked</th><th>Used for</th></tr></thead><tbody>
          <tr id="rY"><td><b>yavin4.org</b></td><td>{st("p")}</td><td>Just now</td><td>Checking every hour</td></tr>
          <tr><td><b>echobase.org</b></td><td>{st("v")}</td><td>6 hours ago</td><td>SSO · new accounts join Echo Base</td></tr>
          <tr><td><b>rebellion.net</b></td><td>{st("v")}</td><td>6 hours ago</td><td>SSO</td></tr>
          <tr><td><b>hoth-ops.com</b></td><td>{st("p")}</td><td>2 min ago</td><td>Added by Cal Alder yesterday</td></tr></tbody></table>
      </div>
'''
SCRIPT = r"""const { $, at, span, easeOut } = Motion;
const BAD = "gmail.com", GOOD = "yavin4.org";

/* ---------- timeline (scene seconds) ---------- */
const T = { adClick: 1.00, type: [1.30, 1.90], err: 1.95, type2: [3.20, 3.80], nxClick: 4.50, s2: 4.55, cvClick: 5.60, ckClick: 6.60, chk: 6.80, endCard: [8.80, 9.25], end: 9.75 };

function build() {
  const a = at("bAd");
  $("ad").style.display = "block"; const nx = at("bNx");
  $("s1").style.display = "none"; $("s2").style.display = "block"; const cv = at("bCv"), ck = at("bCk");
  $("ad").style.display = ""; $("s1").style.display = ""; $("s2").style.display = "";
  const cur = [
    [0.00, 960, 640], [0.25, 960, 640], [0.70, a[0], a[1] + 3], [1.05, a[0], a[1] + 3], [2.40, nx[0] - 200, nx[1] + 50],
    [4.20, nx[0], nx[1] + 3], [4.55, nx[0], nx[1] + 3], [5.30, cv[0], cv[1] + 3], [5.65, cv[0], cv[1] + 3], [6.30, ck[0], ck[1] + 3], [6.65, ck[0], ck[1] + 3],
    [8.80, ck[0] + 60, ck[1] + 120]
  ];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 345, 1.04], [8.55, 650, 345, 1.04], [8.80, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  $("crumb").innerHTML = "/ People / <b>Sign-in &amp; security</b>";
  $("ad").style.display = t >= T.adClick ? "block" : "none";
  $("bAd").classList.toggle("dn", t >= T.adClick - .05 && t < T.adClick + .1);
  // a public email domain is refused as she types; she types hers instead
  const s2 = t >= T.s2;
  $("s1").style.display = s2 ? "none" : ""; $("s2").style.display = s2 ? "block" : "none";
  let v = "";
  if (t < T.type2[0]) v = BAD.slice(0, Math.round(BAD.length * span(t, ...T.type, x => x)));
  else v = GOOD.slice(0, Math.round(GOOD.length * span(t, ...T.type2, x => x)));
  $("fDv").textContent = v;
  const bad = t >= T.err && t < T.type2[0];
  $("eD").style.display = bad ? "" : "none"; $("fD").className = "in" + (bad ? " err" : " f");
  $("fDc").style.opacity = Math.floor(t * 2.4) % 2 === 0 || (t > T.type[0] && t < T.type2[1]) ? 1 : 0;
  $("bNx").className = "btn pri" + (t < T.type2[1] ? " dis" : "") + (t >= T.nxClick - .05 && t < T.s2 ? " dn" : "");
  // the record, each value with Copy; then a check that says what happens next
  $("cpd").style.display = t >= T.cvClick && t < T.cvClick + 1.4 ? "inline" : "none";
  $("bCv").classList.toggle("dn", t >= T.cvClick - .05 && t < T.cvClick + .1);
  $("bCk").classList.toggle("dn", t >= T.ckClick - .05 && t < T.ckClick + .1);
  $("chk").style.display = t >= T.chk ? "inline-flex" : "none";
  $("rY").style.display = s2 ? "table-row" : "none";
}

function events() { return [["click", T.adClick], ["key", T.type[0]], ["key", T.type2[0]], ["click", T.nxClick], ["click", T.cvClick], ["click", T.ckClick]]; }

Motion.scene({
  // 5 steps: natural length, within the 15 s cap
  T, clicks: [T.adClick, T.nxClick, T.cvClick, T.ckClick], build, render, events,
  slow: [[1.95, 3.0, 1.3], [6.8, 8.4, 1.3]]
});"""
COMMENT = """  Source for media/security-identity/domain-verification.mp4. Built by motion/_build/domain_verification.py on _build/security_page.py
  (People › Sign-in & security › Domains), with the top bar's alerts bell.
  Follows the Domain verification card (data/guidance-people.js):
  - status per domain in words, with the last check and what it's used for
  - public email domains are refused, with why
  - the exact TXT record, each value with Copy; send it to whoever manages DNS
  - Check now; DNS can take time, so it keeps checking and says so"""
make("domain-verification", "Domain verification", COMMENT, CSS, "People / Sign-in & security", MAIN, SCRIPT)
