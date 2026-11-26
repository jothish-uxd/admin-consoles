import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from tables_page import make

CSS = r"""
.tipx { position: absolute; z-index: 30; background: var(--ink); color: #fff; font-size: 12px; border-radius: 7px; padding: 5px 9px; white-space: nowrap; opacity: 0; }
"""
EXTRA = '    <div class="tipx" id="tip">Collapse all</div>'
SCRIPT = r"""const { $, at, span, easeOut } = Motion;

/* ---------- timeline (scene seconds) ---------- */
const T = { zClick: 1.20, bClick: 2.60, aHover: 4.20, aClick: 4.90, endCard: [6.40, 6.85], end: 7.35 };

function build() {
  const z = at("x-zev");
  $("d-zev").style.display = "table-row"; const b = at("x-bren"); const a = at("xAll"); $("d-zev").style.display = "";
  const cur = [[0.00, 960, 640], [0.25, 960, 640], [0.85, z[0], z[1] + 3], [1.25, z[0], z[1] + 3], [2.25, b[0], b[1] + 3], [2.65, b[0], b[1] + 3],
    [3.90, a[0], a[1] + 3], [4.95, a[0], a[1] + 3], [6.40, a[0] + 300, a[1] + 200]];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 345, 1.04], [6.15, 650, 345, 1.04], [6.40, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  // a button at the start of the row; the detail sits under it; several can be open
  const z = t >= T.zClick && t < T.aClick, b = t >= T.bClick && t < T.aClick, any = z || b;
  $("d-zev").style.display = z ? "table-row" : "none"; $("d-bren").style.display = b ? "table-row" : "none";
  [["zev", z], ["bren", b]].forEach(([i, o]) => { $("x-" + i).textContent = o ? "▾" : "▸"; $("x-" + i).classList.toggle("on", o); $("x-" + i).setAttribute("aria-expanded", o); });
  $("xAll").textContent = any ? "▾" : "▸"; $("xAll").setAttribute("aria-label", any ? "Collapse all" : "Expand all");
  const a = at("xAll"), tp = $("tip");
  tp.style.left = (a[0] - 40 - 20) + "px"; tp.style.top = (a[1] - 20 - 38) + "px";
  tp.style.opacity = t >= T.aHover && t < T.aClick + .3 ? 1 : 0;
}

function events() { return [["click", T.zClick], ["click", T.bClick], ["click", T.aClick]]; }

Motion.scene({
  // under 5 steps: natural length, within the 10 s cap
  T, clicks: [T.zClick, T.bClick, T.aClick], build, render, events,
  duration: 9.8
});"""
COMMENT = """  Source for media/tables-grids/expandable-rows.mp4. Built by motion/_build/expandable_rows.py on _build/tables_page.py
  (People › Users), with the top bar's alerts bell.
  Follows the Expandable rows card (data/guidance-foundations.js):
  - an expand button at the start of the row, separate from opening the person
  - the detail under its row, indented, with a link to the full profile
  - several open at once; Collapse all"""
make("expandable-rows", "Expandable rows", COMMENT, CSS, EXTRA, "", SCRIPT)
