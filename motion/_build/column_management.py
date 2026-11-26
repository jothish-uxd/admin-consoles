import sys, re; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from tables_page import make, MFA

CSS = r"""
#bCol { position: relative; }
.cm { position: absolute; right: 0; top: 40px; width: 270px; z-index: 20; background: var(--bg); border: 1px solid var(--rule-strong); border-radius: 10px; box-shadow: 0 14px 34px rgba(0,0,0,.14); padding: 8px; font-size: 12.5px; color: var(--ink); display: none; font-weight: 400; }
.cm .hh { font-size: 12px; color: var(--soft); padding: 2px 6px 6px; }
.cm .ci { display: flex; align-items: center; gap: 8px; height: 32px; padding: 0 6px; border-radius: 6px; }
.cm .ci .nm2 { flex: 1; }
.cm .ci .lk2 { font-size: 11.5px; color: var(--soft); }
.cm .ci .mv { width: 24px; height: 24px; border: 1px solid var(--rule-strong); border-radius: 6px; display: inline-grid; place-items: center; font-size: 11px; color: var(--ink); }
.cm .ci.hl { background: var(--hover); }
.cm .ft3 { display: flex; align-items: center; border-top: 1px solid var(--rule); margin-top: 6px; padding: 8px 6px 2px; font-size: 12px; color: var(--soft); }
.cm .ft3 .sp { flex: 1; } .cm .ft3 a { color: var(--ink); text-decoration: underline; text-underline-offset: 3px; }
.c-mfa2 { display: none; }
"""
def ci(i, nm, on=False, lock=False):
    mv = '' if lock else f'<span class="mv" id="{i}-u" aria-label="Move {nm} up">↑</span><span class="mv" aria-label="Move {nm} down">↓</span>'
    return f'<div class="ci" id="{i}"><span class="cb{" on" if on else ""}" id="{i}-c"{" style=\"opacity:.5\"" if lock else ""}></span><span class="nm2">{nm}</span>{"<span class=lk2>Always shown</span>" if lock else mv}</div>'
MENU = ('<div class="cm" id="cm" role="dialog" aria-label="Columns"><div class="hh">Show and order columns</div>'
        + '<div id="cl">' + ci("iP", "Person", True, True) + ci("iT", "Team", True) + ci("iM", "MFA") + ci("iG", "Groups", True) + ci("iL", "License", True) + ci("iA", "Last active", True) + ci("iE", "Email") + '</div>'
        + '<div class="ft3"><span>Saved for you</span><span class="sp"></span><a>Reset to default</a></div></div>')
def edit(s):
    s = s.replace('<span class="fb" id="bCol">Columns<i class="cv"></i></span>', f'<span class="fb" id="bCol">Columns<i class="cv"></i>{MENU}</span>', 1)
    # a second MFA column after Team, for before she moves it up
    s = s.replace('<th>Team</th><th class="c-grp">', '<th>Team</th><th class="c-mfa2">MFA</th><th class="c-grp">', 1)
    s = re.sub(r'<td>Fleet</td><td class="c-grp" id="g-(\w+)">', lambda m: f'<td>Fleet</td><td class="c-mfa2{" mfa-n" if MFA[m.group(1)] == "Not enrolled" else ""}">{MFA[m.group(1)]}</td><td class="c-grp" id="g-{m.group(1)}">', s)
    return s

SCRIPT = r"""const { $, at, span, easeOut } = Motion;

/* ---------- timeline (scene seconds) ---------- */
const T = { cClick: 1.10, mClick: 2.10, uClick: 3.20, gClick: 4.30, close: 5.40, endCard: [7.20, 7.65], end: 8.15 };

function build() {
  const c = at("bCol");
  $("cm").style.display = "block"; const m = at("iM-c"), u = at("iM-u"), g = at("iG-c"); $("cm").style.display = "";
  // after the move, the MFA row sits above Team: its checkbox moves up a row
  const cur = [[0.00, 960, 640], [0.25, 960, 640], [0.80, c[0] - 20, c[1] + 3], [1.15, c[0] - 20, c[1] + 3], [1.80, m[0], m[1] + 3], [2.15, m[0], m[1] + 3],
    [2.90, u[0], u[1] + 3], [3.25, u[0], u[1] + 3], [4.00, g[0], g[1] + 3], [4.35, g[0], g[1] + 3], [5.10, c[0] - 20, c[1] + 3], [5.45, c[0] - 20, c[1] + 3], [7.20, c[0] - 300, c[1] + 220]];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 345, 1.04], [6.95, 650, 345, 1.04], [7.20, 656, 360, 1.04]];
  return { cam, cur };
}

function show(cls, on) { document.querySelectorAll("." + cls).forEach(e => e.style.display = on ? "table-cell" : "none"); }

function render(t) {
  $("cm").style.display = t >= T.cClick && t < T.close ? "block" : "none";
  $("bCol").classList.toggle("on", t >= T.cClick && t < T.close);
  // the table follows each choice straight away
  const m = t >= T.mClick, up = t >= T.uClick, g = t >= T.gClick;
  $("iM-c").classList.toggle("on", m); $("iG-c").classList.toggle("on", !g);
  show("c-mfa2", m && !up); show("c-mfa", m && up); show("c-grp", !g);
  // ↑ moves MFA above Team, in the list and in the table
  const cl = $("cl"); if (up) cl.insertBefore($("iM"), $("iT")); else cl.insertBefore($("iM"), $("iG"));
  $("iM").classList.toggle("hl", t >= T.mClick - .3 && t < T.uClick + .5);
  $("iG").classList.toggle("hl", t >= T.gClick - .3 && t < T.gClick + .5);
}

function events() { return [["click", T.cClick], ["click", T.mClick], ["click", T.uClick], ["click", T.gClick], ["click", T.close]]; }

Motion.scene({
  // 5 steps: natural length, within the 15 s cap
  T, clicks: [T.cClick, T.mClick, T.uClick, T.gClick, T.close], build, render, events
});"""
COMMENT = """  Source for media/tables-grids/column-management.mp4. Built by motion/_build/column_management.py on _build/tables_page.py
  (People › Users), with the top bar's alerts bell.
  Follows the Column management card (data/guidance-foundations.js):
  - a Columns menu: show and hide with checkboxes, reorder with ↑ and ↓ buttons, not only by drag
  - the identifying column, Person, can't be hidden
  - the table follows each choice; saved per admin, with Reset to default"""
make("column-management", "Column management", COMMENT, CSS, "", "", SCRIPT, edit=edit)
