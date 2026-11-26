import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from content_page import make
CSS = r"""
/* undo toast */
tr.hov td { background: var(--subtle); }
.ra { position: absolute; width: 32px; height: 32px; border-radius: 7px; display: grid; place-items: center; color: var(--ink); background: var(--bg); border: 1px solid var(--rule-strong); opacity: 0; z-index: 3; }
.ra svg { width: 15px; height: 15px; }
.tip { position: absolute; background: var(--ink); color: #fff; font-size: 11.5px; border-radius: 6px; padding: 4px 8px; white-space: nowrap; opacity: 0; z-index: 4; }
.ut { position: absolute; left: 600px; top: 4px; transform: translateX(-50%); background: var(--ink); color: #fff; border-radius: 10px; height: 44px; display: flex; align-items: center; gap: 12px; padding: 0 8px 0 14px; font-size: 13px; opacity: 0; box-shadow: 0 10px 30px rgba(0,0,0,.18); white-space: nowrap; z-index: 20; overflow: hidden; }
.ut .msg { position: relative; width: 330px; height: 18px; }
.ut .msg span { position: absolute; left: 0; top: 0; }
.ut .sec { color: #bdbdbd; font-size: 12px; width: 52px; text-align: right; font-family: "Geist Mono", monospace; }
.ut .btn { height: 30px; font-size: 12.5px; background: #fff; color: var(--ink); border-color: #fff; font-weight: 600; }
.ut .btn.dn { background: #d4d4d4; border-color: #d4d4d4; }
.ut .bar { position: absolute; left: 0; bottom: 0; height: 3px; background: #fff; transform-origin: left center; }
.ut i { width: 18px; height: 18px; border-radius: 50%; background: #fff; color: var(--ink); display: grid; place-items: center; flex: none; }
"""
EXTRA = r"""    <svg width="0" height="0" style="position:absolute"><defs><symbol id="bin" viewBox="0 0 16 16"><path d="M3 4.5h10M6.5 4.5V3h3v1.5M4.5 4.5l.6 8.5h5.8l.6-8.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></symbol></defs></svg>"""
TOAST = r"""    <div class="ut" id="ut" role="status"><i><svg width="11" height="11"><use href="#tick"/></svg></i><div class="msg"><span id="u0"><b>Supply run notes.md</b> moved to Trash · kept 30 days</span><span id="u1" style="opacity:0"><b>Supply run notes.md</b> is back where it was</span></div><span class="sec" id="sec">10s</span><span class="btn" id="undo">Undo</span><div class="bar" id="bar"></div></div>"""
SCRIPT = r"""const { $, at, span, easeOut } = Motion;

/* ---------- timeline (scene seconds) ---------- */
const T = {
  hover: 2.30, binClick: 3.50, gone: [3.60, 3.95], toast: 3.65, life: 10,
  pause: 5.40, undoClick: 7.60, back: [8.45, 8.85], swap: 7.70, toastOut: [9.9, 10.2],
  endCard: [10.6, 11.05], end: 12.1
};

function build() {
  // the row action sits at the end of the hovered row
  let el = $("aR5"), y = 0;
  while (el && el.id !== "area") { y += el.offsetTop; el = el.offsetParent; }
  const top = y + ($("aR5").offsetHeight - 32) / 2, left = $("area").offsetWidth - 40;
  Object.assign($("ra").style, { top: top + "px", left: left + "px" });
  Object.assign($("tip").style, { top: (top - 30) + "px", left: (left - 34) + "px" });
  const MX = 740, r = at("ra"), rw = at("aR5"), hw = $("ut").offsetWidth / 2, u = at("undo", -hw), ut = at("ut", -hw);   // the toast is centred with translateX(-50%)
  const cur = [
    [0.00, 860, 650], [0.40, 860, 650], [2.10, rw[0] + 120, rw[1] + 4], [2.50, rw[0] + 120, rw[1] + 4],
    [3.30, r[0], r[1] + 2], [3.70, r[0], r[1] + 2],
    [5.20, ut[0] - 40, ut[1] + 6], [6.10, ut[0] - 20, ut[1] + 6], [7.40, u[0], u[1] + 3], [7.80, u[0], u[1] + 3],
    [8.80, rw[0] + 160, rw[1] + 60], [10.6, rw[0] + 164, rw[1] + 64]
  ];
  const cam = [
    [0.00, 640, 360, 1.00], [0.40, 640, 360, 1.00],
    [1.50, MX, 420, 1.30], [3.70, MX, 420, 1.30],          // the row and its action
    [4.20, MX, 250, 1.30], [7.85, MX, 250, 1.30],          // the toast in the top bar: timer, pause, Undo
    [8.35, MX, 420, 1.30], [10.0, MX, 420, 1.30],          // the row back in place
    [10.5, 660, 360, 1.05], [10.6, 656, 360, 1.04]
  ];
  return { cam, cur };
}

function render(t) {
  ["tB", "tC", "gC", "m1", "m2"].forEach(x => $(x).style.opacity = 0);
  $("tA").style.opacity = 1; $("m0").style.opacity = 1;

  // hover the row: the action shows
  const hov = t >= T.hover && t < T.gone[0];
  $("aR5").classList.toggle("hov", hov);
  const ro = span(t, T.hover, T.hover + .15) * (1 - span(t, T.gone[0], T.gone[0] + .1));
  $("ra").style.opacity = ro;
  $("ra").style.background = t >= T.binClick - .05 && t < T.gone[0] + .1 ? "#f2f2f2" : "";
  $("tip").style.opacity = span(t, T.hover + .5, T.hover + .65) * (1 - span(t, T.binClick - .1, T.binClick));
  $("tip").textContent = "Move to Trash";

  // row leaves, then comes back in place
  const g = span(t, ...T.gone) * (1 - span(t, ...T.back));
  $("aR5").querySelectorAll("td").forEach(td => td.style.opacity = 1 - g);
  $("aR6").style.transform = `translateY(${-50 * g}px)`;
  $("tA").querySelector(".cnt").style.transform = `translateY(${-50 * g}px)`;
  const moving = g > 0;
  $("tA").querySelectorAll("td").forEach(td => { td.style.borderBottomColor = moving ? "transparent" : ""; td.style.boxShadow = moving ? "inset 0 -1px 0 var(--rule)" : ""; });

  // the toast: a timer that pauses under the pointer
  const to = span(t, T.toast, T.toast + .25, easeOut) * (1 - span(t, ...T.toastOut));
  $("ut").style.opacity = to;
  $("ut").style.transform = `translateX(-50%) translateY(${(1 - to) * -8}px)`;
  const run = Math.max(0, Math.min(t, T.pause) - T.toast);   // scene seconds the timer ran before the pause
  const left = 1 - run / T.life * 2.2;                       // drawn quicker than real time so the drain reads
  const undone = t >= T.swap;
  $("bar").style.width = "100%";
  $("bar").style.transform = `scaleX(${undone ? 0 : Math.max(left, 0)})`;
  $("sec").textContent = undone ? "" : t >= T.pause ? "Paused" : `${Math.max(1, Math.ceil(T.life * left))}s`;
  $("sec").style.width = undone ? "0px" : "52px";
  $("undo").style.display = undone ? "none" : "";
  $("undo").classList.toggle("dn", t >= T.undoClick - .05 && t < T.swap);
  $("u0").style.opacity = undone ? 0 : 1; $("u1").style.opacity = undone ? 1 : 0;
}

function events() {
  return [["click", T.binClick], ["pop", T.toast], ["click", T.undoClick], ["whoosh", T.back[0]]];
}

Motion.scene({
  T, duration: 15, clicks: [T.binClick, T.undoClick], build, render, events,
  // linger on: the row action, the timer draining, the pause under the pointer, the row back in place
  slow: [[2.4, 3.3, 1.5], [4.2, 5.2, 1.6], [5.4, 7.2, 1.8], [8.5, 9.8, 1.5]]
});"""
COMMENT = """  Source for media/destructive-actions/undo-toast.mp4. Built by motion/_build/undo_toast.py
  from asset-library/scene.html, so Content › All content is the same page.
  Follows the Undo toast card (data/guidance-actions.js):
  - a routine, reversible delete: she moves Supply run notes.md to Trash from its row, no dialog
  - the toast names the file, says Trash keeps it 30 days, and offers Undo with a visible timer
  - the timer pauses while the pointer is on the toast ("Paused"), so there is time to act
  - Undo puts the row back where it was, and the toast says so"""
s = make("undo-toast", "Undo toast", COMMENT, CSS, EXTRA, TOAST, SCRIPT)
import pathlib
p = pathlib.Path(__file__).resolve().parent.parent / "undo-toast/scene.html"
p.write_text(s.replace('<div class="area" id="area">', '<div class="area" id="area">\n        <span class="ra" id="ra" aria-label="Move to Trash"><svg><use href="#bin"/></svg></span><span class="tip" id="tip">Move to Trash</span>', 1))
