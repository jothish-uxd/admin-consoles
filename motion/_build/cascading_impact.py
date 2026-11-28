import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from cut_page import make
CSS = r"""
/* cascading impact */
.mo .menu .hov { background: var(--hover); }
.dlg.ci { top: 164px; width: 580px; left: 310px; }
.ci .p { margin-top: 6px; }
.grp { margin-top: 10px; border: 1px solid var(--rule-strong); border-radius: 10px; padding: 10px 12px; display: grid; grid-template-columns: 84px 1fr auto; gap: 4px 12px; align-items: start; }
.grp .tg { font-size: 11.5px; font-weight: 600; color: var(--ink); border: 1px solid var(--rule-strong); border-radius: 999px; padding: 1px 8px; justify-self: start; margin-top: 1px; }
.grp .tg.br { color: #b91c1c; border-color: #b91c1c; }
.grp .tg.fx { color: var(--ink); border-color: var(--ink); }
.grp b { display: block; color: var(--ink); font-weight: 600; }
.grp a { color: var(--ink); text-decoration: underline; text-underline-offset: 3px; }
.grp .btn { height: 30px; font-size: 12.5px; white-space: nowrap; }
.grp .dn2 { display: inline-flex; gap: 5px; align-items: center; height: 30px; font-size: 12.5px; color: var(--ink); white-space: nowrap; }
.grp .dn2 svg { width: 12px; height: 12px; }
.ci .ft { margin-top: 16px; display: flex; gap: 8px; align-items: center; }
.ci .ft .why { flex: 1; font-size: 12.5px; position: relative; height: 18px; }
.ci .ft .why span { position: absolute; left: 0; top: 0; white-space: nowrap; }
.ci .ft .why b { color: var(--ink); font-weight: 600; }
.btn.off { background: #f5f5f5; color: #737373; border-color: var(--rule); }
.btn.dgr { color: #b91c1c; border-color: #b91c1c; font-weight: 500; }
.btn.dgr.dn { background: #b91c1c; color: #fff; }
.btn.prs { background: #f2f2f2; }
"""
EDITS = [
  ('<div class="toast" id="toast"><i><svg width="11" height="11"><use href="#ok"/></svg></i>Role duplicated · no members yet · logged</div>',
   '<div class="toast" id="toast"><i><svg width="11" height="11"><use href="#ok"/></svg></i>Content admin deleted · 8 people now have Viewer · logged</div>'),
  ('<div class="dg">Delete</div>', '<div class="dg" id="delI">Delete</div>'),
  ('<table class="r">', '<table class="r" id="tR">'),
  ('<td>140</td>', '<td id="vN">140</td>'),
]
EXTRA = r"""    <div class="scrim2" id="scrim"></div>
    <div class="dlg ci" id="dlg" role="alertdialog" aria-labelledby="dT">
      <h3 id="dT">Delete Content admin?</h3>
      <div class="p">Three things depend on this role.</div>
      <div class="grp"><span class="tg">Detached</span><div><b>8 people lose this role</b>They keep their other roles.</div>
        <div id="g1"><span class="btn" id="bMove">Give them Viewer</span><span class="dn2" id="d1" style="display:none"><svg><use href="#ok"/></svg>Viewer from now on</span></div></div>
      <div class="grp"><span class="tg">Deleted</span><div><b>2 saved permission sets</b>Ops review and Content audit are built on it and go with it.</div><div></div></div>
      <div class="grp"><span class="tg br" id="tg3">Breaks</span><div><b>Holonet sync integration</b>It signs in with this role. <a>Open Holonet sync ↗</a></div>
        <div><span class="btn" id="bSwitch">Switch to Viewer</span><span class="dn2" id="d3" style="display:none"><svg><use href="#ok"/></svg>Switched to Viewer</span></div></div>
      <div class="ft"><span class="why"><span id="w0"><b>Holonet sync uses this role.</b> Switch it first.</span><span id="w1" style="opacity:0">Nothing breaks now.</span></span>
        <span class="btn">Cancel</span><span class="btn off" id="go" aria-disabled="true">Delete role</span></div>
    </div>"""
SCRIPT = r"""const { $, at, span, easeOut } = Motion;

/* ---------- timeline (scene seconds) ---------- */
const T = {
  moClick: 1.80, menu: [1.85, 2.95], delClick: 2.85, dlg: [2.95, 3.20], moveClick: 5.20, switchClick: 6.90,
  goClick: 8.60, dlgOut: [8.65, 8.85], gone: [8.90, 9.25], toast: 8.95, toastOut: [10.9, 11.2],
  endCard: [11.6, 12.05], end: 13.1
};

function build() {
  const mo = at("moB"); $("menu").style.opacity = 1; const di = at("delI"); $("menu").style.opacity = 0;
  const dl = at("dlg"), mv = at("bMove"), sw = at("bSwitch"), g = at("go"), rc = at("rC");
  const cur = [
    [0.00, 820, 620], [0.40, 820, 620], [1.60, mo[0], mo[1] + 3], [1.95, mo[0], mo[1] + 3],
    [2.65, di[0], di[1] + 3], [3.00, di[0], di[1] + 3], [4.10, mv[0] - 200, mv[1] + 20],
    [5.00, mv[0], mv[1] + 3], [5.35, mv[0], mv[1] + 3], [6.70, sw[0], sw[1] + 3], [7.05, sw[0], sw[1] + 3],
    [8.40, g[0], g[1] + 3], [8.75, g[0], g[1] + 3], [10.0, g[0] - 120, g[1] + 40], [11.6, g[0] - 116, g[1] + 44]
  ];
  const cam = [
    [0.00, 640, 360, 1.00], [0.40, 640, 360, 1.00],
    [1.20, 900, rc[1] + 30, 1.40], [2.90, 900, rc[1] + 30, 1.40],     // ⋯ → Delete
    [3.50, dl[0], dl[1] + 6, 1.30], [8.70, dl[0], dl[1] + 6, 1.30],   // what depends on it: detached, deleted, breaks
    [9.30, 740, rc[1] + 20, 1.30], [11.2, 740, rc[1] + 20, 1.30],     // the role is gone, Viewer has 148
    [11.5, 660, 360, 1.05], [11.6, 656, 360, 1.04]
  ];
  return { cam, cur };
}

function render(t) {
  $("moB").style.background = t >= T.moClick - .05 && t < T.dlg[0] ? "var(--hover)" : "";
  const m = span(t, T.menu[0], T.menu[0] + .15, easeOut) * (1 - span(t, T.menu[1] - .08, T.menu[1]));
  $("menu").style.opacity = m; $("menu").style.transform = `translateY(${(1 - m) * -4}px)`;
  $("delI").classList.toggle("hov", t > T.delClick - .3 && t < T.menu[1]);

  const dov = span(t, ...T.dlg, easeOut) * (1 - span(t, ...T.dlgOut));
  $("scrim").style.opacity = dov; $("dlg").style.opacity = dov;
  $("dlg").style.transform = `translateY(${(1 - dov) * 8}px)`;

  const moved = t >= T.moveClick + .1, switched = t >= T.switchClick + .1;
  $("bMove").style.display = moved ? "none" : ""; $("d1").style.display = moved ? "" : "none";
  $("bMove").classList.toggle("prs", t >= T.moveClick - .05);
  $("bSwitch").style.display = switched ? "none" : ""; $("d3").style.display = switched ? "" : "none";
  $("bSwitch").classList.toggle("prs", t >= T.switchClick - .05);
  $("tg3").textContent = switched ? "Fixed" : "Breaks";
  $("tg3").className = switched ? "tg fx" : "tg br";
  $("w0").style.opacity = switched ? 0 : 1; $("w1").style.opacity = switched ? 1 : 0;
  $("go").className = switched ? "btn dgr" + (t >= T.goClick - .25 && t < T.dlgOut[1] ? " dn" : "") : "btn off";
  $("go").setAttribute("aria-disabled", switched ? "false" : "true");

  // the row leaves; Viewer picks up the 8 people
  const g = span(t, ...T.gone);
  $("rC").querySelectorAll("td").forEach(td => td.style.opacity = 1 - g);
  const rows = [...$("tR").querySelectorAll("tbody tr")];
  rows.slice(1).forEach(r => r.style.transform = `translateY(${-48 * g}px)`);
  $("tR").querySelectorAll("td").forEach(td => { td.style.borderBottomColor = g > 0 ? "transparent" : ""; td.style.boxShadow = g > 0 ? "inset 0 -1px 0 var(--rule)" : ""; });
  $("vN").textContent = t >= T.gone[0] ? "148" : "140";

  const to = span(t, T.toast, T.toast + .25, easeOut) * (1 - span(t, ...T.toastOut));
  $("toast").style.opacity = to;
  $("toast").style.transform = `translateX(-50%) translateY(${(1 - to) * -8}px)`;
}

function events() {
  return [["click", T.moClick], ["click", T.delClick], ["whoosh", T.dlg[0]], ["click", T.moveClick], ["click", T.switchClick],
          ["click", T.goClick], ["pop", T.toast]];
}

Motion.scene({
  T, duration: 15, clicks: [T.moClick, T.delClick, T.moveClick, T.switchClick, T.goClick], build, render, events,
  // linger on: the three groups, the blocked Delete and its reason, the fix, the result
  slow: [[3.4, 4.9, 1.8], [7.0, 8.3, 1.6], [9.3, 10.8, 1.4]]
});"""
COMMENT = """  Source for media/destructive-actions/cascading-impact.mp4. Built by motion/_build/cascading_impact.py
  from duplicate-clone/scene.html, so People › Roles is the same page.
  Follows the Cascading impact card (data/guidance-actions.js):
  - before deleting Content admin, the dialog lists what depends on it, grouped by what happens:
    Detached (8 people lose this role, keep their others), Deleted (2 saved permission sets), Breaks (Holonet sync)
  - each group carries a text label; the integration links out so she can check it
  - Delete stays off while something would break, with the reason beside it
  - she gives the 8 people Viewer and switches Holonet sync, then deletes; Viewer now has 148"""
make("duplicate-clone", "cascading-impact", "Cascading impact", COMMENT, CSS, '      <div class="view" id="vRole"', "    </div>\n", EXTRA, SCRIPT, EDITS)
