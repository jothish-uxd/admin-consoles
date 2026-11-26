import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from settings_page import make, head

CSS = r"""
.bar2 { margin-top: 14px; display: flex; align-items: center; gap: 10px; height: 32px; font-size: 12.5px; color: var(--soft); }
.bar2 .sp { flex: 1; }
.fa { display: inline-block; font-size: 11px; font-weight: 600; color: #b91c1c; border: 1px solid #b91c1c; border-radius: 999px; padding: 0 7px; }
table.st td.nm b .pill { font-size: 11px; }
table.st td a { color: var(--ink); text-decoration: underline; text-underline-offset: 3px; }
.row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 12px; }
.f1 { margin-top: 12px; }
.sel2 { justify-content: space-between; }
.scp { margin-top: 4px; border: 1px solid var(--rule); border-radius: 10px; }
.scp > div { display: flex; gap: 10px; align-items: center; padding: 7px 11px; border-top: 1px solid var(--rule); font-size: 12px; }
.scp > div:first-child { border-top: 0; }
.scp b { color: var(--ink); font-weight: 500; font-size: 12.5px; width: 120px; flex: none; }
.wbox { margin-top: 12px; border: 1px solid #b45309; background: #fffbeb; border-radius: 10px; padding: 9px 12px; color: #78350f; display: flex; gap: 8px; align-items: flex-start; line-height: 1.45; }
.wbox svg { width: 14px; height: 14px; flex: none; margin-top: 2px; color: #b45309; }
.key { margin-top: 12px; display: flex; gap: 8px; }
.key .in { flex: 1; background: var(--subtle); }
.key .btn { height: 36px; }
.cpd { display: inline-flex; gap: 5px; align-items: center; }
.cpd svg { width: 12px; height: 12px; }
#s2 { display: none; }
"""
WN = '<svg aria-hidden="true"><use href="#warn"/></svg>'
ROWS = [
  ("Splunk audit export", "Toryn Farr", "Audit log · read", "In 41 days", "2 minutes ago"),
  ("Holonet Ledger sync", "Lavanya Sienna", "Billing · read", "In 6 months", "1 hour ago"),
  ("Old deploy script", "Wes Janson", '<span class="fa">Full access</span>', f'<span class="flag">{WN}Never expires</span>', "210 days ago"),
]
def row(n, o, c, e, l, i=""):
    return f'<tr{i}><td class="nm"><b style="display:flex;align-items:center">{n}</b></td><td>{o}</td><td>{c}</td><td>{e}</td><td>{l}</td><td style="text-align:right"><a>Rotate</a></td></tr>'
NEW = row('Holonet HR sync <span class="pill" style="margin-left:6px;font-weight:400">New</span>', "Cal Alder", "People · read, write", "In 90 days", "Never", ' id="rNew" class="nw"')
MAIN = f'''      <div class="view">
{head("API keys")}        <div class="bar2">Keys let other software use the console’s API. Each one has an owner, a scope and an expiry.<span class="sp"></span><span class="btn sm pri" id="bNew">Create key</span></div>
        <table class="st"><thead><tr><th>Name</th><th>Owner</th><th>What it can do</th><th>Expires</th><th>Last used</th><th></th></tr></thead>
          <tbody id="tb">{NEW}{"".join(row(*r) for r in ROWS)}</tbody></table>
      </div>'''
EXTRA = f'''    <div class="scr" id="scr"></div>
    <section class="dlg" id="dlg" role="dialog" aria-labelledby="kT" style="left:320px; top:62px; width:560px">
      <div id="s1"><h3 id="kT">Create API key</h3>
        <div class="f1"><label class="lbl" for="kN">Name</label><div class="in f" id="kN"><span id="kNv"></span><span class="c" id="kC"></span></div></div>
        <div class="row2"><div><label class="lbl">Owner</label><div class="in sel2">Cal Alder<i class="cv"></i></div></div>
          <div><label class="lbl">Expires</label><div class="in sel2">In 90 days · Feb 23, 2027<i class="cv"></i></div><div class="msg"><span>Your org allows up to 1 year</span></div></div></div>
        <div class="f1"><span class="lbl">What it can do <span>· start with the least it needs</span></span>
          <div class="scp"><div><span class="cb on"></span><b>People · read</b>See names, emails, teams and titles</div>
            <div><span class="cb" id="cbW"></span><b>People · write</b>Add, change and deactivate people</div>
            <div><span class="cb"></span><b>Groups · read</b>See groups and who’s in them</div>
            <div><span class="cb"></span><b>Audit log · read</b>See every logged event</div></div>
          <div class="msg"><span>Full access needs an owner’s approval.</span></div></div>
        <div class="ft"><span class="sp"></span><span class="btn">Cancel</span><span class="btn pri" id="bCr">Create key</span></div></div>
      <div id="s2"><h3>Copy your key now</h3>
        <div style="margin-top:4px">Holonet HR sync · People · read, write · expires Feb 23, 2027</div>
        <div class="wbox">{WN}<span>This is the only time it’s shown. Store it somewhere safe, such as your secrets manager. If it’s lost, rotate it.</span></div>
        <div class="key"><span class="in mono">ebk_live_7QxR2mVd9KpLs4TnB8wYc3Fh</span><span class="btn" id="bCp"><span id="cpT" aria-live="polite"><span class="cpd"><svg><use href="#copy"/></svg>Copy</span></span></span></div>
        <div class="ft"><span>You’ll be asked to confirm if you close this before copying.</span><span class="sp"></span><span class="btn pri" id="bDn">Done</span></div></div>
    </section>'''
SCRIPT = r"""const { $, at, span, easeOut } = Motion;
const NAME = "Holonet HR sync";

/* ---------- timeline (scene seconds) ---------- */
const T = {
  newClick: 0.95, open: [1.00, 1.30], type: [1.55, 2.35], wClick: 3.20, crClick: 4.10, swap: 4.20,
  cpClick: 5.30, dnClick: 6.40, close: [6.45, 6.70], endCard: [8.00, 8.45], end: 9.0
};

function build() {
  const nw = at("bNew");
  $("dlg").style.opacity = 1; const w = at("cbW"), cr = at("bCr");
  $("s1").style.display = "none"; $("s2").style.display = "block"; const cp = at("bCp"), dn = at("bDn");
  $("s1").style.display = ""; $("s2").style.display = ""; $("dlg").style.opacity = 0;
  const r = at("rNew", -200, 0);
  const cur = [
    [0.00, 960, 640], [0.25, 960, 640], [0.75, nw[0], nw[1] + 3], [1.00, nw[0], nw[1] + 3],
    [1.50, nw[0] - 200, nw[1] + 140], [2.90, w[0], w[1] + 3], [3.25, w[0], w[1] + 3], [3.85, cr[0], cr[1] + 3], [4.15, cr[0], cr[1] + 3],
    [5.05, cp[0], cp[1] + 3], [5.35, cp[0], cp[1] + 3], [6.15, dn[0], dn[1] + 3], [6.45, dn[0], dn[1] + 3], [7.50, r[0], r[1] + 30], [8.00, r[0] + 2, r[1] + 32]
  ];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 345, 1.06], [7.75, 650, 345, 1.06], [8.00, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  $("crumb").innerHTML = "/ Settings / <b>API keys</b>";
  $("bNew").classList.toggle("dn", t >= T.newClick - .05 && t < T.open[0] + .15);
  const o = span(t, ...T.open, easeOut) * (1 - span(t, ...T.close, easeOut));
  $("dlg").style.opacity = o; $("scr").style.opacity = o; $("dlg").style.transform = `translateY(${8 * (1 - o)}px)`;
  $("dlg").style.visibility = o > 0 ? "visible" : "hidden";
  // name: the field has focus when the dialog opens
  const n = Math.round(NAME.length * span(t, ...T.type, x => x));
  $("kNv").textContent = NAME.slice(0, n);
  $("kN").className = "in" + (t < T.wClick ? " f" : "");
  $("kC").style.display = t < T.wClick && Math.floor(t * 2.4) % 2 === 0 ? "" : "none";
  $("cbW").classList.toggle("on", t >= T.wClick);
  $("bCr").classList.toggle("dn", t >= T.crClick - .05 && t < T.swap);
  // the secret, shown once: one state at a time in the same dialog
  const s2 = t >= T.swap;
  $("s1").style.display = s2 ? "none" : ""; $("s2").style.display = s2 ? "block" : "none";
  $("bCp").classList.toggle("prs", t >= T.cpClick - .05 && t < T.cpClick + .3);
  $("cpT").innerHTML = t >= T.cpClick + .05 ? '<span class="cpd"><svg><use href="#ok"/></svg>Copied</span>' : '<span class="cpd"><svg><use href="#copy"/></svg>Copy</span>';
  $("bDn").classList.toggle("dn", t >= T.dnClick - .05 && t < T.close[0]);
  // listed with its owner, scope, expiry and Last used: Never
  $("rNew").style.display = t >= T.close[0] ? "" : "none";
}

function events() { return [["click", T.newClick], ["whoosh", T.open[0]], ["key", T.type[0]], ["click", T.wClick], ["click", T.crClick], ["click", T.cpClick], ["click", T.dnClick], ["pop", T.close[1]]]; }

Motion.scene({
  // 5+ steps: natural length, within the 15 s cap
  T, clicks: [T.newClick, T.wClick, T.crClick, T.cpClick, T.dnClick], build, render, events,
  slow: [[4.3, 5.0, 1.5]]
});"""
COMMENT = """  Source for media/integrations-api/create-api-key.mp4. Built by motion/_build/create_api_key.py on _build/settings_page.py,
  so Settings › API keys has the same Settings header and tabs as the other clips.
  Follows the Create API key card (data/guidance-platform.js):
  - a name, an owner, scopes and an expiry; the narrowest scope on by default, each scope in plain words
  - expiry set by default within the org's maximum; full access isn't offered without approval
  - the secret is shown once with Copy, Copied announced, and a clear warning
  - listed with its owner, scope, expiry and Last used, with Rotate; a key that never expires is flagged"""
make("create-api-key", "Create API key", COMMENT, CSS, "Settings / API keys", MAIN, SCRIPT, extra=EXTRA)
