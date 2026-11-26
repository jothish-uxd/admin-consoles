import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from cut_page import make
CSS = r"""
/* create group */
.gd { position: absolute; left: 400px; top: 70px; width: 600px; background: var(--bg); border: 1px solid var(--rule-strong); border-radius: 14px; box-shadow: 0 20px 60px rgba(0,0,0,.2); padding: 18px 22px; z-index: 31; opacity: 0; font-size: 13px; color: var(--soft); }
.gd h3 { margin: 0; font-size: 17px; color: var(--ink); }
.gd .f { margin-top: 12px; }
.gd label.l { display: block; font-size: 12.5px; color: var(--ink); font-weight: 500; margin-bottom: 5px; }
.gd .in { height: 36px; font-size: 13px; white-space: pre; }
.gd .in.f { border-color: var(--ink); box-shadow: 0 0 0 3px rgba(23,23,23,.08); }
.gd .in.warn { border-color: #b45309; }
.gd .in .c { width: 1.5px; height: 17px; background: var(--ink); margin-left: 1px; }
.gd .msg { margin-top: 5px; font-size: 12px; height: 16px; position: relative; }
.gd .msg span { position: absolute; left: 0; top: 0; white-space: nowrap; }
.gd .msg .w { color: #92400e; }
.gd .msg .w a { color: var(--ink); text-decoration: underline; text-underline-offset: 3px; }
.own { display: flex; gap: 6px; align-items: center; flex-wrap: wrap; position: relative; }
.own .ch { display: inline-flex; gap: 6px; align-items: center; border: 1px solid var(--rule-strong); border-radius: 999px; padding: 3px 10px 3px 3px; color: var(--ink); font-size: 12.5px; }
.own .ch .av { width: 22px; height: 22px; font-size: 9px; }
.own .add { height: 30px; font-size: 12.5px; }
.own .add.prs { background: var(--hover); }
.own .menu { position: absolute; left: 180px; top: 34px; width: 220px; z-index: 6; opacity: 0; }
.own .menu .s { display: block; font-size: 11.5px; color: var(--soft); }
.gd .note { margin-top: 5px; font-size: 12px; }
.types { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.ty2 { border: 1px solid var(--rule); border-radius: 10px; padding: 9px 10px; font-size: 12px; line-height: 1.4; }
.ty2 b { display: flex; gap: 7px; align-items: center; color: var(--ink); font-size: 13px; font-weight: 600; margin-bottom: 3px; }
.ty2 .rd { width: 14px; height: 14px; border-radius: 50%; border: 1.5px solid var(--rule-strong); position: relative; flex: none; }
.ty2.on { border-color: var(--ink); }
.ty2.on .rd { border-color: var(--ink); }
.ty2.on .rd::after { content: ""; position: absolute; inset: 2.5px; border-radius: 50%; background: var(--ink); }
.gd .r { margin-top: 16px; display: flex; gap: 8px; justify-content: flex-end; }
.gd .btn { height: 36px; }
.btn.dn { background: #404040; border-color: #404040; }
tr.hl td { background: var(--subtle); }
.nw { font-size: 11px; font-weight: 600; border: 1px solid var(--ink); border-radius: 999px; padding: 0 7px; margin-left: 6px; color: var(--ink); }
.toast .lk { text-decoration: underline; text-underline-offset: 3px; margin-left: 4px; }
"""
EDITS = [
  ('<div class="toast" id="toast"><i><svg width="11" height="11"><use href="#ok"/></svg></i>Rogue One pilot created · add the 38 members next</div>',
   '<div class="toast" id="toast"><i><svg width="11" height="11"><use href="#ok"/></svg></i>Shield maintenance created · <span class="lk">Add members</span> <span class="lk">Give access</span></div>'),
  ('<tr id="rN" style="display:none"><td>Rogue One pilot<span class="s">Pilot members, Dec 2026</span></td><td>0</td><td>Lavanya Sienna</td>',
   '<tr id="rN" style="display:none"><td>Shield maintenance<span class="nw">New</span><span class="s">Generator upkeep crews</span></td><td>0</td><td>Toryn Farr +1</td>'),
]
EXTRA = r"""    <div class="scrim2" id="scrim"></div>
    <div class="gd" id="gd" role="dialog" aria-labelledby="gT">
      <h3 id="gT">New group</h3>
      <div class="f"><label class="l">Name</label><div class="in" id="nm"><span id="nmV"></span><span class="c" id="cr"></span></div>
        <div class="msg" aria-live="polite"><span class="w" id="dup">A group named <b>Shield Ops</b> already exists · <a>Open it</a></span></div></div>
      <div class="f"><label class="l">Description</label><div class="in" id="ds"><span id="dsV"></span></div></div>
      <div class="f"><label class="l">Owners</label>
        <div class="own"><span class="ch"><span class="av">LS</span>Lavanya Sienna (you)</span><span class="ch" id="chT" style="display:none"><span class="av">TF</span>Toryn Farr</span><span class="btn add" id="bOwn">Add owner</span>
          <div class="menu" id="menu"><div id="miT">Toryn Farr<span class="s">Shield Ops · Shield operations lead</span></div><div>Gen. Rieekan<span class="s">Command</span></div></div></div>
        <div class="note" id="oNote">Add at least one owner who isn’t an org admin, so someone on the team is responsible.</div></div>
      <div class="f"><label class="l">Type</label>
        <div class="types"><div class="ty2 on"><b><span class="rd"></span>Static</b>You add and remove members.</div><div class="ty2"><b><span class="rd"></span>Dynamic</b>Members come from a rule, such as team or title.</div><div class="ty2"><b><span class="rd"></span>Synced</b>Mirrors a group in Holonet ID, read-only here.</div></div></div>
      <div class="r"><span class="btn">Cancel</span><span class="btn pri" id="go">Create group</span></div>
    </div>"""
SCRIPT = r"""const { $, at, span, easeOut } = Motion;
const N1 = "shield ops", N2 = "Shield maintenance", D = "Generator upkeep crews";

/* ---------- timeline (scene seconds) ---------- */
const T = {
  newClick: 1.00, dlg: [1.10, 1.35], nmClick: 1.70, type1: [1.85, 2.40], dup: 2.45, retype: [3.40, 4.05], desc: [4.20, 4.60],
  ownClick: 5.10, menu: [5.15, 5.85], pick: 5.75, goClick: 6.80, dlgOut: [6.85, 7.05], row: 7.10, toast: 7.15, toastOut: [8.6, 8.9],
  endCard: [8.70, 9.15], end: 9.8
};

function build() {
  const nb = at("newB"), g = at("gd"), n = at("nm", -150, 0), o = at("bOwn"), go = at("go");
  $("menu").style.opacity = 1; const mi = at("miT", -40, 0); $("menu").style.opacity = 0;
  const cur = [
    [0.00, 860, 640], [0.25, 860, 640], [0.85, nb[0], nb[1] + 3], [1.10, nb[0], nb[1] + 3],
    [1.55, n[0], n[1] + 3], [1.80, n[0], n[1] + 3], [2.60, n[0] + 200, n[1] + 30], [4.90, o[0], o[1] + 3], [5.20, o[0], o[1] + 3],
    [5.55, mi[0], mi[1] + 3], [5.85, mi[0], mi[1] + 3], [6.60, go[0], go[1] + 3], [6.90, go[0], go[1] + 3], [8.0, go[0] - 200, go[1] + 30], [8.7, go[0] - 198, go[1] + 32]
  ];
  const cam = [
    [0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00],
    [0.80, 1000, 140, 1.25], [1.15, 1000, 140, 1.25],                 // New group
    [1.60, g[0], g[1] + 22, 1.16], [6.95, g[0], g[1] + 22, 1.16],        // the whole dialog
    [7.30, 740, 260, 1.22], [8.45, 740, 260, 1.22],                    // the new row and the toast
    [8.70, 656, 360, 1.04]
  ];
  return { cam, cur };
}

function render(t) {
  $("newB").style.background = t >= T.newClick - .05 && t < T.dlg[1] ? "#404040" : "";
  const dov = span(t, ...T.dlg, easeOut) * (1 - span(t, ...T.dlgOut));
  $("scrim").style.opacity = dov; $("gd").style.opacity = dov;
  $("gd").style.transform = `translateY(${(1 - dov) * 8}px)`;
  // name: a near-duplicate is flagged, so she picks another
  let v = "";
  if (t >= T.retype[0]) v = N2.slice(0, Math.round(N2.length * span(t, ...T.retype, x => x)));
  else if (t >= T.type1[0]) v = N1.slice(0, Math.round(N1.length * span(t, ...T.type1, x => x)));
  $("nmV").textContent = v;
  const dupOn = t >= T.dup && t < T.retype[0];
  $("dup").style.opacity = dupOn ? 1 : 0;
  $("nm").className = "in" + (t >= T.nmClick && t < T.desc[0] ? (dupOn ? " f warn" : " f") : "");
  $("cr").style.opacity = t >= T.nmClick && t < T.desc[0] && (t < T.type1[0] || (t > T.type1[1] && t < T.retype[0]) || t > T.retype[1] ? Math.floor(t * 2.4) % 2 === 0 : true) ? 1 : 0;
  $("dsV").textContent = D.slice(0, Math.round(D.length * span(t, ...T.desc, x => x)));
  $("ds").className = "in" + (t >= T.desc[0] && t < T.ownClick ? " f" : "");
  // an owner on the team
  const mo = span(t, T.menu[0], T.menu[0] + .15, easeOut) * (1 - span(t, T.menu[1] - .08, T.menu[1]));
  $("menu").style.opacity = mo;
  $("miT").classList.toggle("hov", t > T.pick - .25 && t < T.menu[1]);
  $("bOwn").classList.toggle("prs", t >= T.ownClick - .05 && t < T.menu[1]);
  const owned = t >= T.pick + .05;
  $("chT").style.display = owned ? "" : "none";
  $("oNote").textContent = owned ? "Toryn Farr will be told she’s an owner." : "Add at least one owner who isn’t an org admin, so someone on the team is responsible.";
  $("go").classList.toggle("dn", t >= T.goClick - .25 && t < T.dlgOut[1]);
  // created: the row, and the next steps
  $("rN").style.display = t >= T.row ? "" : "none";
  $("rN").classList.toggle("hl", t >= T.row);
  const to = span(t, T.toast, T.toast + .25, easeOut) * (1 - span(t, ...T.toastOut));
  $("toast").style.opacity = to;
  $("toast").style.transform = `translateX(-50%) translateY(${(1 - to) * -8}px)`;
}

function events() {
  return [["click", T.newClick], ["whoosh", T.dlg[0]], ["click", T.nmClick], ["key", T.type1[0]], ["key", T.retype[0]], ["key", T.desc[0]],
          ["click", T.ownClick], ["click", T.pick], ["click", T.goClick], ["pop", T.toast]];
}

Motion.scene({
  // 5+ steps: natural length, within the 15 s cap
  T, clicks: [T.newClick, T.nmClick, T.ownClick, T.pick, T.goClick], build, render, events,
  slow: [[2.5, 3.3, 1.5]]
});"""
COMMENT = """  Source for media/groups-teams/create-group.mp4. Built by motion/_build/create_group.py
  from create-modal/scene.html, so People › Groups is the same page.
  Follows the Create group card (data/guidance-people.js):
  - name first: "shield ops" is flagged as the existing Shield Ops, with a link to it, so she picks another name
  - a description, and an owner outside the org admins, so someone on the team is responsible
  - the type is chosen up front: Static by default, Dynamic and Synced explained in place
  - after creating, the row is marked New and the toast offers Add members and Give access"""
make("create-modal", "create-group", "Create group", COMMENT, CSS, '    <div class="scrim2" id="scrim"></div>', "", EXTRA, SCRIPT, EDITS)
