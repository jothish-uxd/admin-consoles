import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from settings_page import make, head, int_sub, CONNECTED

CSS = r"""
#vP { opacity: 0; }
.btn.dgr { color: #b91c1c; border-color: #b91c1c; font-weight: 500; }
.btn.dgrf { background: #b91c1c; border-color: #b91c1c; color: #fff; }
.btn.dgrf.dn { background: #7f1d1d; border-color: #7f1d1d; }
.btn.dgr.dn { background: #fef2f2; }
.intro { margin-top: 12px; font-size: 12.5px; color: var(--soft); }
.fa { display: inline-block; font-size: 11px; font-weight: 600; color: #b91c1c; border: 1px solid #b91c1c; border-radius: 999px; padding: 0 7px; margin-right: 6px; }
table.st td.who { color: var(--ink); }
.ppl { display: flex; margin-top: 2px; }
.ppl .av { width: 26px; height: 26px; font-size: 10px; margin-right: -6px; border: 2px solid var(--bg); }
.ppl .more { margin-left: 12px; align-self: center; font-size: 12px; color: var(--soft); }
.drw .acts { margin-top: 18px; display: flex; gap: 8px; }
.drw .acts .btn { height: 34px; }
.note { margin-top: 6px; line-height: 1.45; }
.note b { color: var(--ink); font-weight: 500; }
.ckr { margin-top: 14px; display: flex; gap: 9px; align-items: flex-start; color: var(--ink); font-size: 12.5px; }
.ckr span.s { display: block; color: var(--soft); font-size: 12px; }
"""
OK = '<svg aria-hidden="true"><use href="#ok"/></svg>'
WN = '<svg aria-hidden="true"><use href="#warn"/></svg>'
ROWS = [
  ("rCal", "Holonet Calendar", "Holonet Systems", "See and change their calendar", "31", "Toryn Farr and 30 others", "Today"),
  ("rSta", "Starmap Notes", "Starmap Inc.", '<span class="fa">Full access</span>Read, change and delete their files', "12", "Bren Derlin (left) and 11 others", f'94 days ago <span class="flag">{WN}Unused</span>'),
  ("rAst", "Astromech Diagrams", "R2 Works", "Read the files they open with it", "8", "Wes Janson and 7 others", "Today"),
  ("rKes", "Kessel Translate", "Kessel Run Co.", "Read the documents they translate", "5", "Jes Gistang and 4 others", "3 days ago"),
]
def row(i, n, by, acc, ppl, who, last):
    return f'<tr id="{i}"><td class="nm"><b>{n}</b><span>{by}</span></td><td>{acc}</td><td id="{i}-n">{ppl}</td><td class="who">{who}</td><td id="{i}-l">{last}</td></tr>'
MAIN = f'''      <div class="view" id="vC">
{head("Integrations")}{int_sub("connected")}{CONNECTED()}      </div>
      <div class="view" id="vP">
{head("Integrations")}{int_sub("people").replace('id="sg-', 'id="sp-')}        <div class="intro">Apps people connected with their own accounts, grouped by app. Each one can reach what it lists, for every person shown.</div>
        <table class="st"><thead><tr><th>App</th><th>What it can do</th><th>People</th><th>Authorised by</th><th>Last used</th></tr></thead>
          <tbody>{"".join(row(*r) for r in ROWS)}</tbody></table>
      </div>'''
AV = "".join(f'<span class="av">{x}</span>' for x in ["BD", "HK", "CA", "ZS", "VF"])
EXTRA = f'''    <aside class="drw" id="drw" role="dialog" aria-labelledby="dT">
      <div class="tt"><span class="lg">SN</span><div><b id="dT">Starmap Notes</b>by Starmap Inc. · not a verified publisher</div><span class="x" aria-label="Close">✕</span></div>
      <h4>What it can do for each of the 12 people</h4>
      <div class="can">{WN}<span><span class="fa">Full access</span>Read, change and delete all of their files</span></div>
      <div class="can">{OK}See their name and email</div>
      <h4>History</h4>
      <div class="note"><b>First authorised by Bren Derlin</b>, 1 year ago. Bren left on Aug 22, and the app kept working.<br>Last used 94 days ago.</div>
      <h4>People who connected it</h4>
      <div class="ppl">{AV}<span class="more">and 7 more</span></div>
      <div class="acts"><span class="btn">Revoke for one person…</span><span class="btn dgr" id="bAll">Revoke for all 12 people</span></div>
    </aside>
    <div class="scr" id="scr"></div>
    <section class="dlg" id="dlg" role="alertdialog" aria-labelledby="cT" style="left:330px; top:241px; width:540px">
      <h3 id="cT">Revoke Starmap Notes for 12 people?</h3>
      <div style="margin-top:6px; line-height:1.45">It stops working for them right away, and its access tokens are deleted. Their notes stay in Starmap.</div>
      <div class="ckr"><span class="cb" id="cbB"></span><div>Also block Starmap Notes<span class="s">No one can connect it again until an admin allows it.</span></div></div>
      <div class="ft"><span class="sp"></span><span class="btn">Cancel</span><span class="btn dgrf" id="bRev">Revoke for 12 people</span></div>
    </section>'''
TOAST = '      <div class="toast" id="toast"><i><svg width="11" height="11"><use href="#ok"/></svg></i>Starmap Notes revoked for 12 people and blocked · logged</div>'
SCRIPT = r"""const { $, at, span, easeOut } = Motion;

/* ---------- timeline (scene seconds) ---------- */
const T = {
  tabClick: 0.95, toP: [1.00, 1.25], rowClick: 2.50, open: [2.55, 2.85], allClick: 4.30, dlg: [4.35, 4.60],
  cbClick: 5.30, revClick: 6.00, done: [6.05, 6.30], toast: [6.35, 7.80], endCard: [8.00, 8.45], end: 9.0
};

function build() {
  const tb = at("sg-people");
  $("vP").style.opacity = 1; const r = at("rSta", -260, 0); $("vP").style.opacity = 0;
  $("drw").style.transform = "none"; const al = at("bAll"); $("drw").style.transform = "";
  $("dlg").style.opacity = 1; const cb = at("cbB"), rv = at("bRev"); $("dlg").style.opacity = 0;
  const cur = [
    [0.00, 960, 640], [0.25, 960, 640], [0.75, tb[0], tb[1] + 3], [1.00, tb[0], tb[1] + 3],
    [2.25, r[0], r[1] + 3], [2.55, r[0], r[1] + 3],
    [4.05, al[0], al[1] + 3], [4.35, al[0], al[1] + 3],
    [5.05, cb[0], cb[1] + 3], [5.35, cb[0], cb[1] + 3], [5.75, rv[0], rv[1] + 3], [6.05, rv[0], rv[1] + 3], [8.00, rv[0] - 120, rv[1] + 60]
  ];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 350, 1.04], [7.75, 650, 350, 1.04], [8.00, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  $("vC").style.opacity = 1 - span(t, T.toP[0], T.toP[0] + .1); $("vP").style.opacity = span(t, T.toP[0] + .12, T.toP[1]);
  $("sg-people").classList.toggle("prs", t >= T.tabClick - .05 && t < T.toP[0]);
  $("crumb").innerHTML = "/ Settings / <b>Integrations</b>";
  $("rSta").classList.toggle("sel", t >= T.rowClick && t < T.done[1]);
  // the drawer, then the confirmation: one at a time
  const o = span(t, ...T.open, easeOut) * (1 - span(t, T.dlg[0], T.dlg[0] + .15));
  $("drw").style.transform = `translateX(${440 * (1 - o)}px)`; $("drw").style.visibility = o > 0 ? "visible" : "hidden";
  $("bAll").classList.toggle("dn", t >= T.allClick - .05 && t < T.dlg[0] + .1);
  const d = span(t, T.dlg[0] + .1, T.dlg[1], easeOut) * (1 - span(t, ...T.done));
  $("dlg").style.opacity = d; $("scr").style.opacity = d;
  $("dlg").style.transform = `translateY(${8 * (1 - d)}px)`;
  $("cbB").classList.toggle("on", t >= T.cbClick);
  $("bRev").classList.toggle("dn", t >= T.revClick - .05 && t < T.done[0]);
  // the row now says what happened
  const gone = t >= T.done[0];
  $("rSta-n").textContent = gone ? "0" : "12";
  $("rSta-l").innerHTML = gone ? '<span class="pill bad">Revoked and blocked · just now</span>' : '94 days ago <span class="flag"><svg aria-hidden="true"><use href="#warn"/></svg>Unused</span>';
  $("toast").style.opacity = span(t, T.toast[0], T.toast[0] + .2) * (1 - span(t, T.toast[1] - .2, T.toast[1]));
}

function events() { return [["click", T.tabClick], ["click", T.rowClick], ["whoosh", T.open[0]], ["click", T.allClick], ["click", T.cbClick], ["click", T.revClick], ["pop", T.toast[0]]]; }

Motion.scene({
  // 5+ steps: natural length, within the 15 s cap
  T, clicks: [T.tabClick, T.rowClick, T.allClick, T.cbClick, T.revClick], build, render, events,
  slow: [[2.9, 3.9, 1.5]]
});"""
COMMENT = """  Source for media/integrations-api/app-permissions.mp4. Built by motion/_build/app_permissions.py on _build/settings_page.py,
  so Settings › Integrations is the same page as in the other clips.
  Follows the App permissions card (data/guidance-platform.js):
  - apps people authorised themselves, grouped by app with counts; what each can do in plain words; who authorised it; last used
  - broad access marked in words (Full access); an unused app flagged
  - the authoriser has left and the app kept working; revoke for one person or everyone
  - revoking many is confirmed; it can also be blocked; logged"""
make("app-permissions", "App permissions", COMMENT, CSS, "Settings / Integrations", MAIN, SCRIPT, extra=EXTRA, toast=TOAST)
