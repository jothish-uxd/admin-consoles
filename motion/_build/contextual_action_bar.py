import sys, pathlib; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from tables_page import make
CSS = r"""
.tip { position: absolute; right: 0; top: 34px; width: 250px; background: var(--bg); color: var(--soft); border: 1px solid var(--rule-strong); border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,.14); padding: 8px 10px; font-size: 12px; line-height: 1.45; white-space: normal; opacity: 0; z-index: 6; text-align: left; font-weight: 400; }
.tip b { color: var(--ink); font-weight: 600; }
"""
SCRIPT = r"""const { $, at, span, easeOut } = Motion;

/* ---------- timeline (scene seconds) ---------- */
const T = {
  c1: 1.10, c2: 1.75, c3: 2.50, tip: [3.05, 4.10],
  endCard: [4.50, 4.95], end: 5.6
};

function build() {
  const a = at("c-cal"), z = at("c-zev"), b = at("c-bren"), s = at("bSus");
  const cur = [
    [0.00, 860, 650], [0.25, 860, 650], [0.95, a[0], a[1] + 2], [1.20, a[0], a[1] + 2],
    [1.60, z[0], z[1] + 2], [1.85, z[0], z[1] + 2], [2.35, b[0], b[1] + 2], [2.60, b[0], b[1] + 2],
    [3.00, s[0], s[1] + 4], [4.20, s[0] + 2, s[1] + 5], [4.50, s[0] - 40, s[1] + 90]
  ];
  const cam = [
    [0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00],
    [0.85, 724, 340, 1.15], [4.25, 724, 340, 1.15],     // one steady view: the bar above the rows
    [4.50, 656, 360, 1.04]
  ];
  return { cam, cur };
}

function render(t) {
  const picked = { cal: t >= T.c1, zev: t >= T.c2, bren: t >= T.c3 };
  ["hobbie", "cal", "zev", "wes", "bren", "jes", "ved"].forEach(id => { const on = !!picked[id]; $("c-" + id).classList.toggle("on", on); $("r-" + id).classList.toggle("sel", on); });
  const n = Object.values(picked).filter(Boolean).length;
  $("cAll").className = "cb" + (n ? " part" : "");
  const bo = span(t, T.c1, T.c1 + .15);
  $("bar").style.opacity = bo; $("mt").style.opacity = 1 - bo;
  $("bN").textContent = `${Math.max(n, 1)} selected`;
  $("bAll").style.display = "none";
  // Suspend can't apply to a deactivated person: it turns off, in the same place, and says why
  const dis = picked.bren;
  $("bSus").classList.toggle("off", dis);
  $("bSus").setAttribute("aria-disabled", dis ? "true" : "false");
  $("tip").style.opacity = span(t, T.tip[0], T.tip[0] + .15) * (1 - span(t, T.tip[1], T.tip[1] + .15));
}

function events() { return [["click", T.c1], ["pop", T.c1 + .05], ["click", T.c2], ["click", T.c3]]; }

Motion.scene({
  // 3 clicks and a hover: natural length, within the 10 s cap
  T, clicks: [T.c1, T.c2, T.c3], build, render, events,
  slow: [[3.1, 4.0, 1.6]]
});"""
COMMENT = """  Source for media/edit-bulk-actions/contextual-action-bar.mp4. Built by motion/_build/contextual_action_bar.py
  on motion/_build/users_page.py, so People › Users is the same page in every Edit & bulk actions clip.
  Follows the Contextual action bar card (data/guidance-actions.js):
  - selecting a row brings up a bar above the table, in the results line's place, so it covers no row
  - the count and Clear first; common actions next (Edit, Add to group, Change license, Export)
  - Suspend last, set apart by a divider, never next to the most common action
  - selecting a deactivated person turns Suspend off in the same place, and says why
  - the actions never change order, whatever is selected"""
s = make("contextual-action-bar", "Contextual action bar", COMMENT, CSS, "", "", SCRIPT)
p = pathlib.Path(__file__).resolve().parent.parent / "contextual-action-bar/scene.html"
p.write_text(s.replace('<span class="btn" id="bSus">Suspend</span>', '<span class="btn" id="bSus">Suspend<span class="tip" id="tip" role="tooltip"><b>Bren Derlin is already deactivated.</b> Unselect them to suspend the other 2.</span></span>', 1))
