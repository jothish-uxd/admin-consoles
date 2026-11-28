import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from tables_page import make
CSS = r"""
.key { margin-left: 8px; background: var(--bg); border: 1px solid var(--rule-strong); border-bottom-width: 2px; border-radius: 6px; padding: 2px 7px; font-size: 11.5px; color: var(--ink); opacity: 0; white-space: nowrap; }
"""
EXTRA = ''
SCRIPT = r"""const { $, at, span, easeOut } = Motion;
const IDS = ["hobbie", "cal", "zev", "wes", "bren", "jes", "ved"];

/* ---------- timeline (scene seconds) ---------- */
const T = {
  c1: 1.25, c2: 2.00, cAll: 2.75, allClick: 3.60,
  endCard: [4.60, 5.05], end: 5.7
};

function build() {
  const a = at("c-hobbie"), w = at("c-wes"), h = at("cAll"), b = at("bAll");
  const cur = [
    [0.00, 860, 650], [0.25, 860, 650], [1.10, a[0], a[1] + 2], [1.35, a[0], a[1] + 2],
    [1.85, w[0], w[1] + 2], [2.10, w[0], w[1] + 2], [2.60, h[0], h[1] + 2], [2.85, h[0], h[1] + 2],
    [3.45, b[0], b[1] + 3], [3.70, b[0], b[1] + 3], [4.30, b[0] + 60, b[1] + 160], [4.60, b[0] + 62, b[1] + 162]
  ];
  const cam = [
    [0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00],
    [0.95, 724, 340, 1.15], [4.35, 724, 340, 1.15],     // one steady view: the bar and the rows
    [4.60, 656, 360, 1.04]
  ];
  return { cam, cur };
  function _() {}
}

function render(t) {
  // which rows are checked
  const n = t >= T.allClick ? 82 : t >= T.cAll ? 25 : t >= T.c2 ? 4 : t >= T.c1 ? 1 : 0;
  IDS.forEach((id, i) => {
    const on = n >= 25 || (n === 4 && i < 4) || (n === 1 && i === 0);
    $("c-" + id).classList.toggle("on", on); $("r-" + id).classList.toggle("sel", on);
  });
  $("cAll").className = "cb" + (n >= 25 ? " on" : n > 0 ? " part" : "");
  const bo = span(t, T.c1, T.c1 + .15);
  $("bar").style.opacity = bo; $("mt").style.opacity = 1 - bo;
  $("bN").textContent = n === 82 ? "All 82 matching Team: Fleet selected" : n === 25 ? "25 on this page selected" : `${Math.max(n, 1)} selected`;
  $("bAll").style.display = n === 25 ? "" : "none";
  $("bAll").style.opacity = t >= T.allClick - .25 && n === 25 ? .7 : 1;
  // the shift key, held for the range
  $("key").style.opacity = span(t, T.c2 - .45, T.c2 - .35) * (1 - span(t, T.c2 + .45, T.c2 + .55));
}

function events() { return [["click", T.c1], ["click", T.c2], ["click", T.cAll], ["click", T.allClick]]; }

Motion.scene({
  // 4 steps: natural length, within the 10 s cap
  T, clicks: [T.c1, T.c2, T.cAll, T.allClick], build, render, events
});"""
COMMENT = """  Source for media/edit-bulk-actions/selection-model.mp4. Built by motion/_build/selection_model.py
  on motion/_build/users_page.py, so People › Users is the same page in every Edit & bulk actions clip.
  Follows the Selection model card (data/guidance-actions.js):
  - row checkboxes, each named for its person; the header checkbox shows part, then all of the page
  - shift-click selects a range
  - the header checkbox means this page only, and says so: "25 on this page selected"
  - then "Select all 82 matching" with the count, for the people who aren't on screen
  - the count sits in the bar above the table, where it replaces the results line"""
s = make("selection-model", "Selection model", COMMENT, CSS, EXTRA, "", SCRIPT)
import pathlib
# the held key shows in the bar, like a keystroke overlay, so it doesn't cover a row
(pathlib.Path(__file__).resolve().parent.parent / "selection-model/scene.html").write_text(s.replace('<span class="btn clr" id="bClr">Clear</span>', '<span class="btn clr" id="bClr">Clear</span><span class="key" id="key">Shift-click selects a range</span>', 1))
