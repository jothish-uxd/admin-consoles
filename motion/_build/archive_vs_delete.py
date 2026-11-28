import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from cut_page import make
CSS = r"""
/* archive vs delete */
.tabs.page { position: relative; }
.mo .menu { position: absolute; right: 0; top: 34px; width: 190px; z-index: 10; opacity: 0; letter-spacing: 0; font-weight: 400; }
.mo .menu .sep { border-top: 1px solid var(--rule); margin: 4px 6px; }
.mo .menu .dg { color: #b91c1c; }
.mo.on { background: var(--hover); }
.arc { position: absolute; right: 0; bottom: 8px; height: 30px; display: inline-flex; align-items: center; gap: 6px; padding: 0 12px; border: 1px solid var(--rule-strong); border-radius: 999px; font-size: 12.5px; color: var(--ink); opacity: 0; }
.arc .n { font-family: "Geist Mono", monospace; font-size: 11px; color: var(--faint); }
.arc.on { background: var(--ink); border-color: var(--ink); color: #fff; }
.arc.on .n { color: #bdbdbd; }
#tArc { position: absolute; left: 0; right: 0; opacity: 0; }
.lab { display: inline-block; font-size: 12px; border: 1px solid var(--rule-strong); border-radius: 999px; padding: 2px 9px; color: var(--ink); }
.dlg2 { position: absolute; left: 350px; top: 202px; width: 500px; background: var(--bg); border: 1px solid var(--rule-strong); border-radius: 14px; box-shadow: 0 20px 60px rgba(0,0,0,.2); padding: 20px 22px; z-index: 31; opacity: 0; font-size: 13px; color: var(--soft); line-height: 1.45; }
.dlg2 h3 { margin: 0; font-size: 17px; color: var(--ink); }
.dlg2 .opt { margin-top: 12px; border: 1px solid var(--rule-strong); border-radius: 10px; padding: 10px 12px; }
.dlg2 .opt b { display: block; color: var(--ink); font-weight: 600; margin-bottom: 2px; }
.dlg2 .del { margin-top: 10px; font-size: 12.5px; }
.dlg2 .del a { color: #b91c1c; text-decoration: underline; text-underline-offset: 3px; }
.dlg2 .r { margin-top: 16px; display: flex; gap: 8px; justify-content: flex-end; }
.dlg2 .btn { height: 36px; }
.btn.dn { background: #404040; border-color: #404040; }
"""
EDITS = [
  ('<div class="toast" id="toast"><i><svg width="11" height="11"><use href="#ok"/></svg></i>Rogue One pilot created · add the 38 members next</div>',
   '<div class="toast" id="toast"><i><svg width="11" height="11"><use href="#ok"/></svg></i><span id="tt"></span></div>'),
  ('<div class="tabs page"><div>Users</div><div class="on">Groups</div><div>Roles</div></div>',
   '<div class="tabs page" id="tabs"><div>Users</div><div class="on">Groups</div><div>Roles</div><span class="arc" id="arc">Archived <span class="n" id="arcN">1</span></span></div>'),
  ('<tr><td>Hoth Evacuation<span class="s">Evacuation crews, Nov 2026</span></td><td>64</td><td>Gen. Rieekan</td><td>Console</td><td><span class="mo">···</span></td></tr>',
   '<tr id="rH"><td>Hoth Evacuation<span class="s">Evacuation crews, Nov 2026</span></td><td>64</td><td>Gen. Rieekan</td><td>Console</td><td><span class="mo" id="moH">···<div class="menu" id="menu"><div id="miArc">Archive group</div><div class="sep"></div><div class="dg">Delete group…</div></div></span></td></tr>'),
  ('<table class="g">', '<table class="g" id="tMain">'),
]
TARC = r"""        <table class="g" id="tArc"><thead><tr><th>Group</th><th>Members</th><th>Status</th><th>Archived</th><th style="width:96px"></th></tr></thead><tbody>
          <tr id="rA"><td>Hoth Evacuation<span class="s">Evacuation crews, Nov 2026</span></td><td>64</td><td><span class="lab">Archived</span></td><td>Just now · Lavanya Sienna</td><td><span class="btn sm" id="rest">Restore</span></td></tr>
        </tbody></table>"""
EXTRA = r"""    <div class="scrim2" id="scrim"></div>
    <div class="dlg2" id="dlg" role="dialog" aria-labelledby="dT">
      <h3 id="dT">Archive Hoth Evacuation?</h3>
      <div class="opt"><b>Archive keeps everything</b>The group is hidden from lists and its 64 members lose the access it gives. Members, shared files and history are kept, so you can restore it any time.</div>
      <div class="del">Deleting removes the group and its history for good. <a>Delete permanently instead</a></div>
      <div class="r"><span class="btn">Cancel</span><span class="btn pri" id="go">Archive group</span></div>
    </div>"""
SCRIPT = r"""const { $, at, span, easeOut } = Motion;

/* ---------- timeline (scene seconds) ---------- */
const T = {
  moClick: 2.20, menu: [2.25, 3.45], arcClick: 3.35, dlg: [3.45, 3.70], goClick: 5.90, dlgOut: [5.95, 6.15],
  gone: [6.20, 6.55], t1: 6.25, t1Out: [7.55, 7.75], chip: 6.40, chipClick: 8.10, toArc: 8.20,
  restClick: 9.70, back: 9.85, t2: 9.95, t2Out: [11.5, 11.8], endCard: [12.2, 12.65], end: 13.7
};

function build() {
  // the archived list sits where the main table is
  $("tArc").style.top = $("tMain").offsetTop + "px";
  const tb = at("tMain"), mo = at("moH"), mi = at("miArc", -40, 0), g = at("go"), dl = at("dlg"), ch = at("arc"), rs = at("rest");
  const cur = [
    [0.00, 860, 650], [0.40, 860, 650], [2.00, mo[0], mo[1] + 3], [2.35, mo[0], mo[1] + 3],
    [3.15, mi[0], mi[1] + 3], [3.50, mi[0], mi[1] + 3], [4.60, g[0] - 80, g[1] + 50], [5.70, g[0], g[1] + 3], [6.05, g[0], g[1] + 3],
    [7.90, ch[0], ch[1] + 3], [8.25, ch[0], ch[1] + 3], [9.50, rs[0], rs[1] + 3], [9.85, rs[0], rs[1] + 3],
    [10.9, rs[0] - 80, rs[1] + 110], [12.2, rs[0] - 76, rs[1] + 114]
  ];
  const cam = [
    [0.00, 640, 360, 1.00], [0.40, 640, 360, 1.00],
    [1.40, 740, tb[1] - 20, 1.26], [3.40, 740, tb[1] - 20, 1.26],        // the groups, the row menu: Archive first
    [4.00, dl[0], dl[1], 1.38], [6.00, dl[0], dl[1], 1.38],              // what archiving keeps, delete as the small link
    [6.50, 740, 300, 1.26], [12.0, 740, 300, 1.26],                      // row gone, Archived filter, restore
    [12.1, 660, 360, 1.05], [12.2, 656, 360, 1.04]
  ];
  return { cam, cur };
}

function render(t) {
  // menu
  const mo = span(t, T.menu[0], T.menu[0] + .15, easeOut) * (1 - span(t, T.menu[1] - .08, T.menu[1]));
  $("menu").style.opacity = mo; $("menu").style.transform = `translateY(${(1 - mo) * -4}px)`;
  $("moH").classList.toggle("on", t >= T.moClick && t < T.menu[1]);
  $("miArc").classList.toggle("hov", t > T.arcClick - .3 && t < T.menu[1]);

  // dialog
  const dov = span(t, ...T.dlg, easeOut) * (1 - span(t, ...T.dlgOut));
  $("scrim").style.opacity = dov; $("dlg").style.opacity = dov;
  $("dlg").style.transform = `translateY(${(1 - dov) * 8}px)`;
  $("go").classList.toggle("dn", t >= T.goClick - .25 && t < T.dlgOut[1]);

  // Hoth Evacuation leaves the active list, and comes back on restore
  const g = t < T.back ? span(t, ...T.gone) : 0;
  $("rH").querySelectorAll("td").forEach(td => td.style.opacity = 1 - g);
  const rows = [...$("tMain").querySelectorAll("tbody tr")].filter(r => r.style.display !== "none");
  const i = rows.indexOf($("rH"));
  rows.slice(i + 1).forEach(r => r.style.transform = `translateY(${-48 * g}px)`);
  const moving = g > 0;
  $("tMain").querySelectorAll("td").forEach(td => { td.style.borderBottomColor = moving ? "transparent" : ""; td.style.boxShadow = moving ? "inset 0 -1px 0 var(--rule)" : ""; });

  // the Archived filter shows once something is archived
  const arcOn = t >= T.chipClick && t < T.back;
  $("arc").style.opacity = span(t, T.chip, T.chip + .25) * (1 - span(t, T.back + .2, T.back + .45));
  $("arc").classList.toggle("on", arcOn);
  // list: active -> archived -> active, one after the other
  if (t < T.toArc) { $("tMain").style.opacity = 1; $("tArc").style.opacity = 0; }
  else if (t < T.back) { $("tMain").style.opacity = 1 - span(t, T.toArc, T.toArc + .12); $("tArc").style.opacity = span(t, T.toArc + .14, T.toArc + .3); }
  else { $("tArc").style.opacity = 1 - span(t, T.back, T.back + .12); $("tMain").style.opacity = span(t, T.back + .14, T.back + .3); }
  $("rest").style.background = t >= T.restClick - .05 && t < T.back ? "#f2f2f2" : "";
  $("rH").classList.toggle("hl", t >= T.back + .14 && t < T.t2Out[1]);

  // toasts, one after the other
  const a = span(t, T.t1, T.t1 + .25, easeOut) * (1 - span(t, ...T.t1Out));
  const b = span(t, T.t2, T.t2 + .25, easeOut) * (1 - span(t, ...T.t2Out));
  const o = t < T.t2 ? a : b;
  $("tt").textContent = t < T.t2 ? "Hoth Evacuation archived · find it under Archived" : "Hoth Evacuation restored · 64 members have their access back";
  $("toast").style.opacity = o;
  $("toast").style.transform = `translateX(-50%) translateY(${(1 - o) * -8}px)`;
}

function events() {
  return [["click", T.moClick], ["click", T.arcClick], ["whoosh", T.dlg[0]], ["click", T.goClick], ["pop", T.t1],
          ["click", T.chipClick], ["click", T.restClick], ["pop", T.t2]];
}

Motion.scene({
  T, duration: 15, clicks: [T.moClick, T.arcClick, T.goClick, T.chipClick, T.restClick], build, render, events,
  // linger on: the menu order, the dialog, the archived row and its label, the restored row
  slow: [[2.4, 3.2, 1.4], [3.8, 5.6, 1.7], [8.3, 9.4, 1.5], [10.0, 11.4, 1.4]]
});"""
COMMENT = """  Source for media/destructive-actions/archive-vs-delete.mp4. Built by motion/_build/archive_vs_delete.py
  from create-modal/scene.html, so People › Groups is the same page.
  Follows the Archive vs. delete card (data/guidance-actions.js):
  - the row menu puts Archive group first; Delete group… sits below a divider
  - the dialog says what archiving keeps (members, files, history) and that it can be restored
  - deleting for good is a small, separate link, not the main button
  - an Archived filter appears once something is archived; the row carries a text label, not just a colour
  - Restore brings the group back with its access, and the toast says so"""
EDITS.append(("</tbody></table>", "</tbody></table>\n" + TARC))
make("create-modal", "archive-vs-delete", "Archive vs. delete", COMMENT, CSS, '    <div class="scrim2" id="scrim"></div>', "", EXTRA, SCRIPT, EDITS)
