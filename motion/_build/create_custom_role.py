import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from roles_page import make, head, catalog

CSS = r"""
#vN { display: none; }
td.rm2 { position: relative; }
.rmenu { position: absolute; right: 0; bottom: 34px; width: 190px; z-index: 20; display: none; }
.rmenu .it { color: var(--ink); letter-spacing: 0; font-size: 13px; text-align: left; }
.rmenu .it span { display: block; font-size: 11.5px; color: var(--soft); }
.nrh { margin-top: 12px; display: flex; align-items: baseline; gap: 10px; }
.nrh h2 { margin: 0; font-size: 16px; font-weight: 600; color: var(--ink); }
.nrh span { font-size: 12.5px; color: var(--soft); }
.nr { margin-top: 10px; display: grid; grid-template-columns: 1fr 260px; gap: 22px; align-items: start; }
.row2 { display: grid; grid-template-columns: 1fr 1.4fr; gap: 14px; }
.caps { margin-top: 14px; border: 1px solid var(--rule); border-radius: 10px; }
.caps .gh { font-size: 12px; font-weight: 600; color: var(--ink); background: var(--subtle); padding: 5px 12px; border-top: 1px solid var(--rule); }
.caps .gh:first-child { border-top: 0; border-radius: 10px 10px 0 0; }
.caps .cp { display: flex; gap: 10px; align-items: center; height: 27px; padding: 0 12px; font-size: 12.5px; color: var(--ink); border-top: 1px solid var(--rule); }
.caps .cp .d { color: var(--soft); font-size: 12px; }
.caps .cp .lk { margin-left: auto; font-size: 11.5px; color: var(--soft); }
.caps .cp .cb.lock { opacity: .55; }
.rk { font-size: 11px; color: #92400e; border: 1px solid #b45309; border-radius: 999px; padding: 0 7px; font-weight: 500; }
.caps .cp .lk.ad { display: none; color: var(--ink); font-weight: 500; }
.auto { display: none; margin-top: 8px; font-size: 12px; color: var(--ink); border: 1px solid var(--rule-strong); background: var(--subtle); border-radius: 8px; padding: 6px 10px; }
.auto b { font-weight: 600; }
.sum { border: 1px solid var(--rule); border-radius: 10px; padding: 12px 14px; font-size: 12.5px; }
.sum h4 { margin: 0 0 2px; font-size: 13px; color: var(--ink); }
.sum .sm2 { color: var(--soft); font-size: 12px; margin-bottom: 8px; }
.sum .can { padding: 3px 0; color: var(--ink); display: flex; gap: 6px; align-items: center; }
.sum .can svg { width: 13px; height: 13px; }
.sum .ct2 { margin-top: 8px; padding-top: 8px; border-top: 1px solid var(--rule); color: var(--soft); font-size: 12px; }
.nft { margin-top: 12px; display: flex; gap: 8px; } .nft .sp { flex: 1; }
tr.nw td { background: var(--subtle); }
"""
OK = '<svg aria-hidden="true"><use href="#ok"/></svg>'
NEWROW = ('<tr id="rNw" class="nw"><td class="ck"><span class="cb"></span></td><td class="nm"><b>Help desk</b><span>based on Member</span></td>'
          '<td class="ds">Reset sign-in and unlock devices for people</td><td><span class="ty">Custom</span></td><td class="n">0</td><td class="rm2">⋯</td></tr>')
CAT = catalog(checks=True).replace('<tr id="rMe">', NEWROW + '<tr id="rMe">')
CAT = CAT.replace('<td class="rm2" id="rMe-m">⋯</td>', '<td class="rm2" id="rMe-m">⋯<div class="menu rmenu" id="mn"><div class="it" id="mDup">Duplicate<span>Start a custom role from Member</span></div><div class="it">See who has it</div></div></td>')
def cp(i, name, desc, extra="", on=False, lock=False):
    return f'<div class="cp"><span class="cb{" on" if on else ""}{" lock" if lock else ""}" id="{i}"></span>{name}<span class="d">{desc}</span>{extra}</div>'
FORM = f'''        <div class="nrh"><h2>New role</h2><span>Based on Member. Start with the least it needs.</span></div>
        <div class="nr"><div>
          <div class="row2"><div><label class="lbl" for="fN">Name</label><div class="in f" id="fN"><span id="fNv"></span><span class="c" id="fNc"></span></div></div>
            <div><label class="lbl" for="fW">Who it’s for</label><div class="in" id="fW"><span id="fWv"></span><span class="c" id="fWc"></span></div></div></div>
          <div class="caps">
            <div class="gh">Basics</div>{cp("c0", "Use the console", "", '<span class="lk">From Member</span>', on=True, lock=True)}
            <div class="gh">People</div>{cp("cVp", "View people", "Names, teams and titles", '<span class="lk ad" id="nAuto" role="status">Added. Reset sign-in needs it</span>')}{cp("cRs", "Reset sign-in and MFA", "So someone can get back in")}
            <div class="gh">Devices</div>{cp("cUd", "Unlock devices", "After too many tries")}
            <div class="gh">Data &amp; export</div>{cp("cEx", "Export people", "", '<span class="rk" style="margin-left:6px">Risky</span>')}
          </div>
          <div class="nft"><span class="sp"></span><span class="btn">Cancel</span><span class="btn pri" id="bCr">Create role</span></div>
        </div>
        <aside class="sum" aria-live="polite"><h4 id="sT">Untitled role</h4><div class="sm2">Custom, based on Member</div>
          <div class="can">{OK}Use the console</div><div class="can" id="sVp">{OK}View people</div><div class="can" id="sRs">{OK}Reset sign-in and MFA</div><div class="can" id="sUd">{OK}Unlock devices</div>
          <div class="ct2" id="sC">1 capability · nobody has it yet</div></aside></div>
'''
PH = head().split('        <div class="rbar">')[0]
MAIN = (f'      <div class="view" id="vR">\n{head()}{CAT}      </div>\n'
        f'      <div class="view" id="vN">\n{PH}{FORM}      </div>\n')
TOAST = '      <div class="toast" id="toast"><i><svg width="11" height="11"><use href="#ok"/></svg></i>Help desk created · 3 capabilities</div>'
SCRIPT = r"""const { $, at, span, easeOut } = Motion;
const NAME = "Help desk", WHO = "People who help others sign in";

/* ---------- timeline (scene seconds) ---------- */
const T = {
  mClick: 0.95, dClick: 1.75, toN: 1.80, type: [2.05, 2.55], wClick: 3.05, type2: [3.15, 4.05],
  rClick: 4.85, uClick: 5.85, cClick: 6.75, toR: 6.80, toast: [6.85, 7.95], endCard: [8.10, 8.55], end: 9.05
};

function build() {
  $("rNw").style.display = "none"; const m = at("rMe-m"); $("mn").style.display = "block"; const d = at("mDup", -40, 0); $("mn").style.display = "";
  $("vR").style.display = "none"; $("vN").style.display = "block";
  const w = at("fW", -80, 0), r = at("cRs"), u = at("cUd"), c = at("bCr");
  $("vR").style.display = ""; $("vN").style.display = "";
  const cur = [
    [0.00, 960, 640], [0.25, 960, 640], [0.70, m[0], m[1] + 3], [1.00, m[0], m[1] + 3], [1.50, d[0], d[1] + 3], [1.80, d[0], d[1] + 3],
    [2.80, w[0], w[1] + 3], [3.10, w[0], w[1] + 3], [4.60, r[0], r[1] + 3], [4.90, r[0], r[1] + 3], [5.60, u[0], u[1] + 3], [5.90, u[0], u[1] + 3],
    [6.50, c[0], c[1] + 3], [6.80, c[0], c[1] + 3], [7.60, c[0] - 160, c[1] - 200], [8.10, c[0] - 158, c[1] - 198]
  ];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 345, 1.04], [7.85, 650, 345, 1.04], [8.10, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  $("crumb").innerHTML = t >= T.toN && t < T.toR ? "/ People / Roles / <b>New role</b>" : "/ People / <b>Roles</b>";
  // one view at a time, hard cuts
  const n = t >= T.toN && t < T.toR;
  $("vR").style.display = n ? "none" : "block"; $("vN").style.display = n ? "block" : "none";
  $("mn").style.display = t >= T.mClick && t < T.toN ? "block" : "none";
  $("mDup").classList.toggle("hov", t >= T.dClick - .3);
  $("rNw").style.display = t >= T.toR ? "table-row" : "none";
  // name, then who it's for
  const a = Math.round(NAME.length * span(t, ...T.type, x => x)), b = Math.round(WHO.length * span(t, ...T.type2, x => x));
  $("fNv").textContent = NAME.slice(0, a); $("fWv").textContent = WHO.slice(0, b);
  const blink = Math.floor(t * 2.4) % 2 === 0;
  $("fN").className = "in" + (t < T.wClick ? " f" : ""); $("fNc").style.display = t < T.wClick && blink ? "" : "none";
  $("fW").className = "in" + (t >= T.wClick && t < T.rClick ? " f" : ""); $("fWc").style.display = t >= T.wClick && t < T.rClick && blink ? "" : "none";
  $("sT").textContent = a ? NAME.slice(0, a) : "Untitled role";
  // a capability brings what it needs, and says so
  const r = t >= T.rClick, u = t >= T.uClick;
  $("cRs").classList.toggle("on", r); $("cVp").classList.toggle("on", r); $("cUd").classList.toggle("on", u);
  $("nAuto").style.display = r ? "inline" : "none";
  $("sVp").style.display = r ? "" : "none"; $("sRs").style.display = r ? "" : "none"; $("sUd").style.display = u ? "" : "none";
  const k = 1 + (r ? 2 : 0) + (u ? 1 : 0);
  $("sC").textContent = `${k} ${k === 1 ? "capability" : "capabilities"} · nobody has it yet`;
  $("bCr").classList.toggle("dn", t >= T.cClick - .05 && t < T.toR);
  $("toast").style.opacity = span(t, T.toast[0], T.toast[0] + .2) * (1 - span(t, T.toast[1] - .2, T.toast[1]));
}

function events() { return [["click", T.mClick], ["click", T.dClick], ["key", T.type[0]], ["click", T.wClick], ["key", T.type2[0]], ["click", T.rClick], ["click", T.uClick], ["click", T.cClick], ["pop", T.toast[0]]]; }

Motion.scene({
  // 5+ steps: natural length, within the 15 s cap
  T, clicks: [T.mClick, T.dClick, T.wClick, T.rClick, T.uClick, T.cClick], build, render, events, duration: 14.4
});"""
COMMENT = """  Source for media/roles-permissions/create-custom-role.mp4. Built by motion/_build/create_custom_role.py on _build/roles_page.py,
  with the top bar's alerts bell.
  Follows the Create custom role card (data/guidance-people.js):
  - start from a built-in role (Duplicate), not a blank list; start with the least it needs
  - a name and who it's for
  - capabilities grouped by area in plain words; one that needs another adds it and says so; risky ones are marked
  - a running summary of what the role can do; then it's listed with the others"""
make("create-custom-role", "Create custom role", COMMENT, CSS, "People / Roles", MAIN, SCRIPT, toast=TOAST)
