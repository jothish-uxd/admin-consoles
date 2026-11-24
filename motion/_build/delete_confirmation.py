import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from content_page import make
CSS = r"""
/* delete confirmation */
.bulk { position: absolute; left: 0; right: 0; top: -7px; height: 32px; background: var(--ink); color: #fff; border-radius: 8px; display: flex; align-items: center; gap: 12px; padding: 0 6px 0 14px; font-size: 13px; opacity: 0; z-index: 3; }
.bulk .n { font-weight: 600; position: relative; width: 84px; height: 18px; }
.bulk .n span { position: absolute; left: 0; top: 0; white-space: nowrap; }
.bulk .sp { margin-left: auto; }
.bulk .btn { height: 26px; font-size: 12px; background: transparent; color: #fff; border-color: #737373; }
.bulk .btn.clr { color: #d4d4d4; border-color: transparent; }
.scrim2 { position: absolute; inset: 52px 0 0 0; background: rgba(0,0,0,.18); opacity: 0; z-index: 30; }
.dlg { position: absolute; left: 470px; top: 150px; width: 500px; background: var(--bg); border: 1px solid var(--rule-strong); border-radius: 14px; box-shadow: 0 20px 60px rgba(0,0,0,.2); padding: 20px 22px; z-index: 31; opacity: 0; font-size: 13px; color: var(--soft); }
.dlg h3 { margin: 0; font-size: 17px; color: var(--ink); }
.dlg .fl { margin-top: 12px; display: grid; gap: 6px; }
.dlg .fl div { display: flex; gap: 8px; align-items: center; color: var(--ink); }
.dlg .fl .ty { width: 18px; height: 22px; font-size: 6px; padding-bottom: 2px; }
.dlg .imp { margin-top: 14px; border: 1px solid var(--rule-strong); border-radius: 10px; padding: 10px 12px; display: grid; gap: 4px; }
.dlg .imp b { color: var(--ink); font-weight: 600; }
.dlg .tr { margin-top: 12px; line-height: 1.45; }
.dlg .r { margin-top: 18px; display: flex; gap: 8px; justify-content: flex-end; }
.dlg .btn { height: 36px; }
.dlg .btn.fr { box-shadow: 0 0 0 2px var(--bg), 0 0 0 4px var(--ink); }
.btn.dgr { color: #b91c1c; border-color: #b91c1c; font-weight: 500; }
.btn.dgr.dn { background: #b91c1c; color: #fff; }
tr.sel td { background: var(--subtle); }
.cnt { position: relative; height: 16px; }
.cnt span { position: absolute; left: 0; top: 0; white-space: nowrap; }
"""
EXTRA = r"""    <div class="scrim2" id="scrim"></div>
    <div class="dlg" id="dlg" role="alertdialog" aria-labelledby="dT">
      <h3 id="dT">Delete 3 files?</h3>
      <div class="fl"><div><span class="ty">XLS</span>Hoth patrol routes.xlsx</div><div><span class="ty">PDF</span>Red Squadron roster.pdf</div><div><span class="ty">MP4</span>X-wing maintenance.mp4</div></div>
      <div class="imp"><div><b>3 public links stop working</b></div><div><b>14 people</b> lose access they were given</div></div>
      <div class="tr">They stay in Trash for 30 days, then they’re gone for good.</div>
      <div class="r"><span class="btn fr" id="cancel">Cancel</span><span class="btn dgr" id="confirm">Delete 3 files</span></div>
    </div>"""
TOAST = r"""    <div class="toast" id="toast"><i><svg width="11" height="11"><use href="#tick"/></svg></i>3 files moved to Trash · restore within 30 days</div>"""
SCRIPT = r"""const { $, at, span, easeOut } = Motion;

/* ---------- timeline (scene seconds) ---------- */
const T = {
  viewClick: 2.40, toB: 2.50, c1: 3.90, c2: 4.45, c3: 5.00, delClick: 6.10, dlg: [6.20, 6.45],
  confirm: 8.70, dlgOut: [8.75, 8.95], gone: [9.00, 9.40], toast: 9.05, toastOut: [10.9, 11.2],
  endCard: [11.6, 12.05], end: 13.1
};

function build() {
  const MX = 740;
  const vw = at("vwDeact"), a = at("bC1"), b = at("bC2"), c = at("bC4"), d = at("bDel"), cf = at("confirm"), ca = at("cancel"), dl = at("dlg"), ar = at("area");
  const cur = [
    [0.00, 860, 650], [0.40, 860, 650], [2.25, vw[0], vw[1] + 3], [2.60, vw[0], vw[1] + 3],
    [3.75, a[0], a[1] + 2], [4.00, a[0], a[1] + 2], [4.35, b[0], b[1] + 2], [4.55, b[0], b[1] + 2],
    [4.90, c[0], c[1] + 2], [5.10, c[0], c[1] + 2], [5.95, d[0], d[1] + 3], [6.30, d[0], d[1] + 3],
    [7.30, ca[0] + 30, ca[1] + 40], [8.55, cf[0], cf[1] + 3], [8.85, cf[0], cf[1] + 3],
    [10.0, cf[0] - 40, cf[1] + 80], [11.6, cf[0] - 36, cf[1] + 84]
  ];
  const cam = [
    [0.00, 640, 360, 1.00], [0.40, 640, 360, 1.00],
    [1.50, MX, ar[1] - 40, 1.26], [2.30, MX, ar[1] - 40, 1.26],            // the saved views and the table
    [3.10, MX, ar[1] - 10, 1.30], [6.05, MX, ar[1] - 10, 1.30],            // pick the three public-link files
    [6.60, dl[0], dl[1], 1.34], [8.80, dl[0], dl[1], 1.34],                // what deleting them breaks
    [9.30, MX, 330, 1.22], [11.0, MX, 330, 1.22],            // rows gone, toast in the top bar
    [11.5, 660, 360, 1.05], [11.6, 656, 360, 1.04]
  ];
  return { cam, cur };
}

function seq(ids, t, at) {
  const [a, b] = ids;
  $(a).style.opacity = 1 - span(t, at, at + .12);
  $(b).style.opacity = span(t, at + .14, at + .3);
}

function render(t) {
  $("vwDeact").classList.toggle("on", t >= T.viewClick);
  ["tC", "gC"].forEach(x => $(x).style.opacity = 0);
  if (t < T.toB) { $("tA").style.opacity = 1; $("tB").style.opacity = 0; } else seq(["tA", "tB"], t, T.toB);
  $("m2").style.opacity = 0;
  if (t < T.toB) { $("m0").style.opacity = 1; $("m1").style.opacity = 0; } else seq(["m0", "m1"], t, T.toB);
  $("m1").innerHTML = t >= T.gone[0] ? "<b>109 items</b> owned by deactivated people · index updated just now" : "<b>112 items</b> owned by deactivated people · index updated 2 min ago";

  // selection
  const picks = [["bC1", "bR1", T.c1], ["bC2", "bR2", T.c2], ["bC4", "bR4", T.c3]];
  let n = 0;
  for (const [cb, row, tc] of picks) { const on = t >= tc; n += on; $(cb).classList.toggle("on", on); $(row).classList.toggle("sel", on); }
  const bo = span(t, T.c1, T.c1 + .15) * (1 - span(t, T.dlgOut[1], T.dlgOut[1] + .15));
  $("bulk").style.opacity = bo;
  $("bN").textContent = `${Math.max(n, 1)} selected`;
  $("bDel").style.background = t >= T.delClick - .05 && t < T.dlg[1] ? "#404040" : "";

  // dialog
  const dov = span(t, ...T.dlg, easeOut) * (1 - span(t, ...T.dlgOut));
  $("scrim").style.opacity = dov; $("dlg").style.opacity = dov;
  $("dlg").style.transform = `translateY(${(1 - dov) * 8}px)`;
  const press = t >= T.confirm - .25 && t < T.dlgOut[1];
  $("confirm").classList.toggle("dn", press);
  $("cancel").classList.toggle("fr", !press);

  // rows go: fade the three, close the gaps
  const g = span(t, ...T.gone);
  ["bR1", "bR2", "bR4"].forEach(r => $(r).querySelectorAll("td").forEach(td => td.style.opacity = 1 - g));
  // collapsed borders stay put when a row moves, so draw them on the cells while rows slide
  const moving = t >= T.gone[0];
  $("tB").querySelectorAll("td").forEach(td => { td.style.borderBottomColor = moving ? "transparent" : ""; td.style.boxShadow = moving ? "inset 0 -1px 0 var(--rule)" : ""; });
  $("vwDeact").querySelector(".n").textContent = t >= T.gone[0] ? "109" : "112";
  const rh = 50;
  $("bR3").style.transform = `translateY(${-2 * rh * g}px)`;
  $("bR5").style.transform = `translateY(${-3 * rh * g}px)`;
  $("tB").querySelector(".cnt").style.transform = `translateY(${-3 * rh * g}px)`;
  $("tB").querySelector(".cnt").textContent = t >= T.gone[0] ? "Showing 1–50 of 109 · sorted by last activity" : "Showing 1–50 of 112 · sorted by last activity";

  const to = span(t, T.toast, T.toast + .25, easeOut) * (1 - span(t, ...T.toastOut));
  $("toast").style.opacity = to;
  $("toast").style.transform = `translateX(-50%) translateY(${(1 - to) * -8}px)`;
}

function events() {
  return [["click", T.viewClick], ["whoosh", T.toB], ["click", T.c1], ["click", T.c2], ["click", T.c3],
          ["click", T.delClick], ["whoosh", T.dlg[0]], ["click", T.confirm], ["pop", T.toast]];
}

Motion.scene({
  T, duration: 15, clicks: [T.viewClick, T.c1, T.c2, T.c3, T.delClick, T.confirm], build, render, events,
  // linger on: the selection bar, the dialog (what breaks, Trash for 30 days, focus on Cancel), the toast
  slow: [[5.2, 5.9, 1.3], [6.5, 8.4, 1.8], [9.1, 10.8, 1.5]]
});"""
COMMENT = """  Source for media/destructive-actions/delete-confirmation.mp4. Built by motion/_build/delete_confirmation.py
  from asset-library/scene.html, so Content › All content is the same page.
  Follows the Delete confirmation card (data/guidance-actions.js):
  - she opens Owner deactivated and selects three files shared by public link
  - the selection bar says how many are picked; Delete opens a dialog that names the files
  - the dialog says what breaks (3 public links stop working, 14 people lose access) and that Trash keeps them 30 days
  - focus starts on Cancel; the destructive button is outlined in red, not the default
  - the rows leave the list and a toast confirms where they went"""
s = make("delete-confirmation", "Delete confirmation", COMMENT, CSS, EXTRA, TOAST, SCRIPT)
import pathlib
p = pathlib.Path(__file__).resolve().parent.parent / "delete-confirmation/scene.html"
p.write_text(s.replace('<div class="area" id="area">', '<div class="area" id="area">\n        <div class="bulk" id="bulk"><span class="n"><span id="bN">1 selected</span></span><span class="btn clr">Clear</span><span class="sp"></span><span class="btn">Move to…</span><span class="btn" id="bDel">Delete</span></div>', 1))
