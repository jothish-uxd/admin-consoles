import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from roles_page import make, head, catalog

CSS = r"""
#vP { opacity: 0; }
.lgd { display: flex; gap: 14px; align-items: center; font-size: 12px; color: var(--soft); }
.lgd span { display: inline-flex; gap: 5px; align-items: center; color: var(--ink); }
table.mx { width: 100%; border-collapse: collapse; font-size: 12px; margin-top: 10px; table-layout: fixed; }
table.mx th { font-size: 11.5px; color: var(--ink); font-weight: 600; padding: 6px 6px; border-bottom: 1px solid var(--rule-strong); text-align: left; background: var(--bg); position: sticky; top: 0; }
table.mx th:first-child { width: 250px; }
table.mx td { height: 30px; padding: 0 6px; border-bottom: 1px solid var(--rule); color: var(--ink); white-space: nowrap; }
table.mx td.cap { color: var(--ink); }
table.mx tr.sec td { background: var(--subtle); font-weight: 600; color: var(--ink); height: 30px; }
table.mx tr.sec td .cn { font-weight: 400; color: var(--soft); margin-left: 6px; }
table.mx tr.sec td .ar { display: inline-block; width: 12px; color: var(--soft); }
table.mx tr.exp td { height: auto; padding: 8px 10px 10px 24px; white-space: normal; color: var(--soft); line-height: 1.45; background: var(--bg); }
table.mx tr.exp td b { color: var(--ink); font-weight: 500; }
.mk { display: inline-flex; gap: 5px; align-items: center; }
.mk i { width: 9px; height: 9px; border-radius: 50%; display: inline-block; box-sizing: border-box; }
.mk.y i { background: var(--ink); }
.mk.n { color: var(--soft); } .mk.n i { border: 1.5px solid var(--rule-strong); }
.mk.p i { background: linear-gradient(90deg, var(--ink) 50%, transparent 50%); border: 1.5px solid var(--ink); }
.rk { font-size: 11px; color: #92400e; border: 1px solid #b45309; border-radius: 999px; padding: 0 7px; margin-left: 6px; font-weight: 500; }
td.cap .qi { margin-left: 6px; color: var(--soft); font-size: 11px; border: 1px solid var(--rule-strong); border-radius: 50%; width: 15px; height: 15px; display: inline-grid; place-items: center; }
"""
Y = '<span class="mk y"><i></i>Yes</span>'; N = '<span class="mk n"><i></i>No</span>'; P = '<span class="mk p"><i></i>Own groups</span>'
RM = {"Y": Y, "N": N, "P": P}
ROLES = ["Owner", "Admin", "Security admin", "Content admin", "Billing admin", "Member"]
def r(cap, vals, i="", extra=""):
    return f'<tr{f" id={chr(34)}{i}{chr(34)}" if i else ""}><td class="cap">{cap}{extra}</td>' + "".join(f"<td>{RM[v]}</td>" for v in vals) + "</tr>"
def sec(name, count, open_, i=""):
    return f'<tr class="sec"{f" id={chr(34)}{i}{chr(34)}" if i else ""}><td colspan="7"><span class="ar" id="{i}-a">{"▾" if open_ else "▸"}</span>{name}<span class="cn">{count}</span></td></tr>'
ROWS = (sec("People", "4 capabilities", True)
        + r("View people", "YYYYYY") + r("Invite people", "YYNNNN") + r("Change someone’s role", "YYNNNN") + r("Manage groups", "YYNNNP")
        + sec("Content", "2 capabilities", False)
        + sec("Settings", "4 capabilities", False)
        + sec("Data &amp; export", "3 capabilities", False, "sD")
        + r("Export people", "YYNNNN", "xE", '<span class="rk">Risky</span><span class="qi" id="iE">i</span>').replace("<tr ", '<tr data-d="1" ', 1)
        + '<tr class="exp" id="xEx" data-d="1"><td colspan="7"><b>Export people</b> downloads the full people list, with names, emails, teams and managers. Risky: the file leaves the console, and its use isn’t logged after download.</td></tr>'
        + r("Export the audit log", "YYYNNN").replace("<tr>", '<tr data-d="1">', 1)
        + r("Download reports", "YYYYYN").replace("<tr>", '<tr data-d="1">', 1))
MATRIX = (f'        <table class="mx" id="mx"><thead><tr><th><span class="lgd"><span><span class="mk y"><i></i></span>Yes</span><span><span class="mk n"><i></i></span>No</span><span><span class="mk p"><i></i></span>Own groups only</span></span></th>'
          + "".join(f"<th>{x}</th>" for x in ROLES) + f'</tr></thead><tbody>{ROWS}</tbody></table>\n')
H = head()
MAIN = (f'      <div class="view" id="vR">\n{H}{catalog(checks=True)}      </div>\n'
        f'      <div class="view" id="vP">\n{H.replace("id=\"bCmp\"", "").replace("id=\"bChk\"", "").replace("id=\"sgR\"", "id=\"sgR2\"").replace("id=\"sgP\"", "id=\"sgP2\"").replace("<span class=\"on\" id=\"sgR2\">", "<span id=\"sgR2\">").replace("<span id=\"sgP2\">", "<span class=\"on\" id=\"sgP2\">")}'
        f'{MATRIX}      </div>\n')
CSS2 = CSS + ".btn.dis { color: var(--faint); border-color: var(--rule); background: var(--subtle); }"
SCRIPT = r"""const { $, at, span, easeOut } = Motion;

/* ---------- timeline (scene seconds) ---------- */
const T = { pClick: 1.00, toP: 1.05, dClick: 2.60, iClick: 3.90, endCard: [5.50, 5.95], end: 6.40 };

function build() {
  const p = at("sgP");
  $("vP").style.opacity = 1; const d = at("sD", -340, 0);
  document.querySelectorAll('[data-d]').forEach(e => e.style.display = "table-row"); const i = at("iE");
  document.querySelectorAll('[data-d]').forEach(e => e.style.display = ""); $("vP").style.opacity = 0;
  const cur = [
    [0.00, 960, 640], [0.25, 960, 640], [0.75, p[0], p[1] + 3], [1.05, p[0], p[1] + 3], [2.35, d[0], d[1] + 3], [2.65, d[0], d[1] + 3],
    [3.65, i[0], i[1] + 3], [3.95, i[0], i[1] + 3], [4.90, i[0] + 160, i[1] + 60], [5.50, i[0] + 162, i[1] + 62]
  ];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 345, 1.04], [5.25, 650, 345, 1.04], [5.50, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  $("crumb").innerHTML = "/ People / <b>Roles</b>";
  const p = t >= T.toP;
  $("vR").style.opacity = p ? 0 : 1; $("vP").style.opacity = p ? 1 : 0;
  // an area opens; a capability explains itself, risky ones say so in words
  const d = t >= T.dClick, x = t >= T.iClick;
  document.querySelectorAll('[data-d]').forEach(e => e.style.display = d ? "table-row" : "none");
  $("xEx").style.display = x ? "table-row" : "none";
  $("sD-a").textContent = d ? "▾" : "▸";
  $("sD").querySelector("td").style.background = t >= T.dClick - .25 && t < T.dClick + .2 ? "var(--hover)" : "";
}

function events() { return [["click", T.pClick], ["click", T.dClick], ["click", T.iClick]]; }

Motion.scene({
  // under 5 steps: natural length, within the 10 s cap
  T, clicks: [T.pClick, T.dClick, T.iClick], build, render, events,
  slow: [[4.1, 5.0, 1.2]]
});"""
COMMENT = """  Source for media/roles-permissions/permission-matrix.mp4. Built by motion/_build/permission_matrix.py on _build/roles_page.py,
  with the top bar's alerts bell.
  Follows the Permission matrix card (data/guidance-people.js):
  - capabilities grouped by area, with counts, collapsible; roles across the top; the header stays in view
  - each cell in shape and words: Yes, No, Own groups only, with a legend; never colour alone
  - a capability explains what it allows; risky ones are marked in words
  - export for audit"""
make("permission-matrix", "Permission matrix", COMMENT, CSS2, "People / Roles", MAIN, SCRIPT)
