import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from tables_page import make

CSS = r"""
td.ra { position: relative; }
.ram { position: absolute; right: 8px; top: 40px; width: 230px; z-index: 20; display: none; text-align: left; letter-spacing: 0; }
.ram .hh { font-size: 11.5px; color: var(--soft); padding: 4px 10px 6px; font-weight: 500; }
.ram .it { color: var(--ink); font-size: 13px; }
.ram .it.dis { color: #737373; }
.ram .it.dis span { display: block; font-size: 11.5px; }
.ram .it.red { color: #b91c1c; }
.ram .sepx { height: 1px; background: var(--rule); margin: 6px 4px; padding: 0; }
.ram .it.foc { background: var(--hover); outline: 2px solid var(--ink); outline-offset: -2px; }
.keys { position: absolute; left: 50%; top: 600px; background: var(--bg); border: 1px solid var(--rule-strong); border-radius: 10px; padding: 7px 12px; box-shadow: 0 10px 28px rgba(0,0,0,.14); transform: translateX(-50%); display: flex; gap: 8px; align-items: center; z-index: 50; font-size: 12.5px; color: var(--soft); opacity: 0; }
.keys kbd { min-width: 34px; height: 30px; padding: 0 9px; box-sizing: border-box; display: inline-grid; place-items: center; border: 1px solid var(--rule-strong); border-bottom-width: 3px; border-radius: 7px; background: var(--bg); color: var(--ink); font-family: "Geist Mono", monospace; font-size: 12px; }
"""
MENU = ('<div class="menu ram" id="ram" role="menu" aria-label="Actions for Zev Senesca"><div class="hh">Actions for Zev Senesca</div>'
        '<div class="it" id="aO" role="menuitem">Open profile</div><div class="it" id="aR" role="menuitem">Reset sign-in</div><div class="it" role="menuitem">Add to group</div>'
        '<div class="it dis" role="menuitem" aria-disabled="true">Change license<span>Billing admins only</span></div><div class="sepx" role="separator"></div><div class="it red" role="menuitem">Suspend…</div></div>')
def edit(s):
    return s.replace('<td class="ra"><span class="kb" id="k-zev" aria-label="Actions for Zev Senesca">⋯</span></td>',
                     f'<td class="ra"><span class="kb" id="k-zev" aria-label="Actions for Zev Senesca" aria-haspopup="menu">⋯</span>{MENU}</td>', 1)
EXTRA = '    <div class="keys" id="keys" aria-hidden="true"><kbd id="kk">Tab</kbd><span id="kl">moves between row actions</span></div>'
TOAST = '      <div class="toast" id="toast"><i><svg width="11" height="11"><use href="#ok"/></svg></i>Sign-in reset for Zev Senesca · he’s been emailed a link</div>'
SCRIPT = r"""const { $, at, span, easeOut } = Motion;

/* ---------- timeline (scene seconds) ---------- */
const T = { t1: 1.00, t2: 1.60, t3: 2.20, enter: 3.20, down: 4.30, enter2: 5.40, toast: [5.50, 6.90], endCard: [7.40, 7.85], end: 8.35 };

function build() {
  const k = at("k-zev");
  // keyboard only: the pointer rests off the table
  const cur = [[0.00, 1180, 650], [7.40, 1182, 652]];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 345, 1.04], [7.15, 650, 345, 1.04], [7.40, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  // every row's ⋯ is always there, and Tab reaches it
  const f = t >= T.t3 ? "zev" : t >= T.t2 ? "cal" : t >= T.t1 ? "hobbie" : "";
  ["hobbie", "cal", "zev"].forEach(i => $("k-" + i).classList.toggle("fo", f === i && t < T.enter));
  const open = t >= T.enter && t < T.enter2;
  $("ram").style.display = open ? "block" : "none"; $("k-zev").classList.toggle("on", open);
  // the most common first, Suspend last and apart, a disabled one says why
  const r = t >= T.down;
  $("aO").classList.toggle("foc", open && !r); $("aR").classList.toggle("foc", open && r);
  const k = t >= T.enter2 ? ["Enter", "runs Reset sign-in"] : t >= T.down ? ["↓", "moves through the menu"] : t >= T.enter ? ["Enter", "opens Actions for Zev Senesca"] : ["Tab", "moves between row actions"];
  $("kk").textContent = k[0]; $("kl").textContent = k[1];
  $("keys").style.opacity = t >= T.t1 - .1 && t < T.toast[1] ? 1 : 0;
  $("toast").style.opacity = span(t, T.toast[0], T.toast[0] + .2) * (1 - span(t, T.toast[1] - .2, T.toast[1]));
}

function events() { return [["key", T.t1], ["key", T.t2], ["key", T.t3], ["key", T.enter], ["key", T.down], ["key", T.enter2], ["pop", T.toast[0]]]; }

Motion.scene({
  // 5+ steps, by keyboard: natural length, within the 15 s cap
  T, clicks: [], build, render, events
});"""
COMMENT = """  Source for media/tables-grids/row-actions.mp4. Built by motion/_build/row_actions.py on _build/tables_page.py
  (People › Users), with the top bar's alerts bell. Done by keyboard: the keys are shown under the window.
  Follows the Row actions card (data/guidance-foundations.js):
  - a ⋯ on every row, always visible, reached with Tab, named with the row ("Actions for Zev Senesca")
  - the most common action first; Suspend last and set apart; a disabled action says why
  - arrow keys and Enter, as a menu"""
make("row-actions", "Row actions", COMMENT, CSS, EXTRA, TOAST, SCRIPT, edit=edit)
