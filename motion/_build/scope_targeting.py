import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from compliance_page import make

CSS = r"""
.st3 { display: inline-flex; gap: 6px; align-items: center; font-size: 12px; color: var(--ink); border: 1px solid var(--ink); border-radius: 999px; padding: 2px 10px; margin-left: 10px; }
.st3 i { width: 6px; height: 6px; border-radius: 50%; border: 2px solid var(--ink); }
.subh { margin-top: 4px; font-size: 12.5px; color: var(--soft); }
.sc2 { margin-top: 12px; display: grid; grid-template-columns: 1fr 300px; gap: 18px; }
.box { border: 1px solid var(--rule-strong); border-radius: 12px; padding: 12px 14px; position: relative; }
.box + .box { margin-top: 12px; }
.box h3 { margin: 0 0 8px; font-size: 13.5px; color: var(--ink); font-weight: 600; }
.box h3 span { font-weight: 400; color: var(--soft); font-size: 12px; }
.pick { min-height: 38px; border: 1.5px solid var(--rule-strong); border-radius: 8px; display: flex; flex-wrap: wrap; gap: 6px; align-items: center; padding: 4px 8px; box-sizing: border-box; font-size: 12.5px; color: var(--faint); }
.pick.f { border-color: var(--ink); box-shadow: 0 0 0 3px rgba(23,23,23,.08); }
.tag { height: 26px; display: inline-flex; align-items: center; gap: 6px; padding: 0 9px; border-radius: 999px; background: var(--hover); border: 1px solid var(--rule-strong); color: var(--ink); font-size: 12px; }
.tag .x { color: var(--soft); }
.empt { margin-top: 6px; font-size: 12px; color: var(--soft); }
.box .menu { position: absolute; left: 14px; top: 86px; width: 300px; z-index: 9; opacity: 0; }
.box .menu > div { display: flex; gap: 8px; align-items: center; }
.box .menu .s2 { margin-left: auto; font-size: 11.5px; color: var(--soft); }
.cnt { border: 1px solid var(--rule); background: var(--subtle); border-radius: 12px; padding: 12px 14px; }
.cnt .lb { font-size: 12px; color: var(--soft); }
.cnt .n { font-size: 26px; font-weight: 600; color: var(--ink); letter-spacing: -.02em; margin-top: 2px; }
.cnt .n span { font-size: 13px; font-weight: 400; color: var(--soft); }
.cnt .ev { margin-top: 4px; font-size: 11.5px; color: var(--soft); }
.chkp { margin-top: 12px; border: 1px solid var(--rule-strong); border-radius: 12px; padding: 12px 14px; }
.chkp h3 { margin: 0 0 8px; font-size: 13px; color: var(--ink); font-weight: 600; }
.chkp .res { margin-top: 8px; font-size: 12.5px; color: var(--ink); line-height: 1.45; min-height: 36px; }
.chkp .res b { font-weight: 600; }
.chkp .res svg { width: 12px; height: 12px; }
"""
OK = '<svg aria-hidden="true"><use href="#ok"/></svg>'
IMENU = ('<div class="menu" id="iMenu"><div id="iF"><span class="cb" id="iFc"></span>Fleet<span class="s2">82 people</span></div><div id="iH"><span class="cb" id="iHc"></span>Hangar 3<span class="s2">14 people</span></div>'
         '<div><span class="cb"></span>Everyone<span class="s2">1,204 · too broad for this</span></div></div>')
XMENU = ('<div class="menu" id="xMenu"><div id="xC"><span class="cb" id="xCc"></span>Contractors<span class="s2">9 people</span></div><div><span class="cb"></span>Shield Ops<span class="s2">16 people</span></div></div>')
MAIN = f'''      <div class="view">
        <div class="hd"><h1>External links expire</h1><span class="st3"><i></i>Simulating</span><span class="sp"></span><span class="btn sm">Simulate</span></div>
        <div class="subh">Sharing · links to files expire after 30 days · Toryn Farr</div>
        <div class="sub2"><span class="sg">Rule</span><span class="sg on">Scope</span><span class="sg">Simulation</span><span class="sg">History</span><span class="sp"></span></div>
        <div class="sc2"><div>
          <div class="box"><h3>Applies to <span>· groups, people or locations</span></h3><div class="pick" id="iIn"><span id="iPh">No one yet. Add who this applies to.</span></div>{IMENU}</div>
          <div class="box"><h3>Except <span>· never applies to these, even if they’re included above</span></h3><div class="pick" id="xIn"><span id="xPh">No exceptions</span></div>{XMENU}</div>
        </div><div>
          <div class="cnt" aria-live="polite"><div class="lb">In scope</div><div class="n" id="cN">0 <span>people</span></div><div class="ev" id="cF">0 files · checked just now</div></div>
          <div class="chkp"><h3>Check a person or file</h3><span class="in" id="pIn"><span id="pTx" style="color:var(--faint)">Name or file</span><span class="c" id="pC"></span></span>
            <div class="res" id="res" role="status"></div></div>
        </div></div>
      </div>'''
TOAST = ""
SCRIPT = r"""const { $, at, span, easeOut } = Motion;
const W = "Wes Janson";

/* ---------- timeline (scene seconds) ---------- */
const T = {
  iClick: 0.95, imenu: [1.00, 2.75], fPick: 1.80, hPick: 2.55, xClick: 3.70, xmenu: [3.75, 4.55], cPick: 4.45,
  pClick: 5.50, type: [5.65, 6.30], endCard: [7.60, 8.05], end: 8.55
};
const tag = n => `<span class="tag">${n}<span class="x">✕</span></span>`;

function build() {
  const i = at("iIn", -120, 0);
  $("iMenu").style.opacity = 1; const f = at("iF", -100, 0), h = at("iH", -100, 0); $("iMenu").style.opacity = 0;
  const x = at("xIn", -120, 0); $("xMenu").style.opacity = 1; const c = at("xC", -100, 0); $("xMenu").style.opacity = 0;
  const p = at("pIn", -60, 0);
  const cur = [
    [0.00, 960, 640], [0.25, 960, 640], [0.70, i[0], i[1] + 3], [1.00, i[0], i[1] + 3], [1.55, f[0], f[1] + 3], [1.85, f[0], f[1] + 3],
    [2.30, h[0], h[1] + 3], [2.60, h[0], h[1] + 3], [3.45, x[0], x[1] + 3], [3.75, x[0], x[1] + 3], [4.20, c[0], c[1] + 3], [4.50, c[0], c[1] + 3],
    [5.25, p[0], p[1] + 3], [5.55, p[0], p[1] + 3], [6.60, p[0] - 40, p[1] + 90], [7.60, p[0] - 38, p[1] + 92]
  ];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 330, 1.06], [7.35, 650, 330, 1.06], [7.60, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  $("crumb").innerHTML = "/ Compliance / Policies / <b>External links expire</b>";
  // include: no one by default; she adds two groups from one list
  const F = t >= T.fPick, Hh = t >= T.hPick, X = t >= T.cPick;
  $("iMenu").style.opacity = span(t, T.imenu[0], T.imenu[0] + .12) * (1 - span(t, T.imenu[1] - .08, T.imenu[1]));
  $("iFc").classList.toggle("on", F); $("iHc").classList.toggle("on", Hh);
  $("iF").classList.toggle("hov", t >= T.fPick - .25 && t < T.hPick - .25); $("iH").classList.toggle("hov", t >= T.hPick - .25);
  $("iIn").className = "pick" + (t >= T.iClick && t < T.imenu[1] ? " f" : "");
  $("iIn").innerHTML = (F ? tag("Fleet · 82") : "") + (Hh ? tag("Hangar 3 · 14") : "") + (F ? "" : '<span>No one yet. Add who this applies to.</span>');
  $("xMenu").style.opacity = span(t, T.xmenu[0], T.xmenu[0] + .12) * (1 - span(t, T.xmenu[1] - .08, T.xmenu[1]));
  $("xCc").classList.toggle("on", X); $("xC").classList.toggle("hov", t >= T.cPick - .25);
  $("xIn").className = "pick" + (t >= T.xClick && t < T.xmenu[1] ? " f" : "");
  $("xIn").innerHTML = X ? tag("Contractors · 6 of them in Fleet or Hangar 3") : '<span>No exceptions</span>';
  // the result, not just the inputs: counts update as the scope changes
  const n = X ? 86 : Hh ? 92 : F ? 82 : 0, fl = X ? "29,800" : Hh ? "31,400" : F ? "24,100" : "0";
  $("cN").innerHTML = `${n} <span>people</span>`; $("cF").textContent = `${fl} files · checked just now`;
  // check one person, and why
  const pf = t >= T.pClick, k = Math.round(W.length * span(t, ...T.type, x => x));
  $("pTx").textContent = pf ? W.slice(0, k) : "Name or file"; $("pTx").style.color = pf ? "var(--ink)" : "var(--faint)";
  $("pIn").className = "in" + (pf && t < T.endCard[0] ? " f" : "");
  $("pC").style.display = pf && t < T.type[1] + .3 && Math.floor(t * 2.4) % 2 === 0 ? "" : "none";
  $("res").innerHTML = t >= T.type[1] + .15 ? '<svg aria-hidden="true"><use href="#ok"/></svg> <b>Wes Janson is in scope</b> through Fleet. He isn’t a contractor, so no exception applies. 412 of his files are covered.' : "";
}

function events() { return [["click", T.iClick], ["click", T.fPick], ["click", T.hPick], ["click", T.xClick], ["click", T.cPick], ["click", T.pClick], ["key", T.type[0]], ["pop", T.type[1] + .15]]; }

Motion.scene({
  // 5+ steps: natural length, within the 15 s cap
  T, clicks: [T.iClick, T.fPick, T.hPick, T.xClick, T.cPick, T.pClick], build, render, events,
  slow: [[6.4, 7.3, 1.4]]
});"""
COMMENT = """  Source for media/policies/scope-targeting.mp4. Built by motion/_build/scope_targeting.py on _build/compliance_page.py,
  with the top bar's alerts bell.
  Follows the Scope & targeting card (data/guidance-governance.js):
  - no one in scope by default; include and except in the same view, clearly labelled
  - groups that follow membership; everyone flagged as too broad for this policy
  - the result, not just the inputs: people and files in scope, updated and announced
  - check one person or file, and why they are or aren't in scope"""
make("scope-targeting", "Scope & targeting", COMMENT, CSS, "Compliance / Policies", MAIN, SCRIPT)
