"""People › Users for the Tables & data grids clips (Column management, Sorting & pagination, Row actions, Density,
Expandable rows): the users_page.py table with a table toolbar (Columns, Density), sortable headers, a pager, an expand
button and a ⋯ on each row, an optional MFA column, and the alerts bell. The Edit & bulk actions clips get the toolbar in
the final pass. No eyebrow headers. Usage: from tables_page import make, PEOPLE2."""
import sys, pathlib; sys.path.insert(0, __file__.rsplit("/", 1)[0])
import users_page
from users_page import ROOT
import bell

MORE = [("tycho", "Tycho Celchu", "TC", "Pilot", "Fleet", "Console", "Today"), ("dak", "Dak Ralter", "DR", "Gunner", "Fleet, Snowspeeders", "Console", "Yesterday"),
        ("tamsin", "Tamsin Rho", "TR", "Navigator", "Fleet", "Console", "4 days ago"), ("orrin", "Orrin Vale", "OV", "Mechanic", "Fleet, Hangar 3", "Console", "9 days ago"),
        ("mira", "Mira Talon", "MT", "Pilot", "Fleet", "Console + AI", "Today")]
PEOPLE2 = users_page.PEOPLE + MORE
MFA = {"hobbie": "Enrolled", "cal": "Enrolled", "zev": "Not enrolled", "wes": "Enrolled", "bren": "—", "jes": "Enrolled", "ved": "Not enrolled",
       "tycho": "Enrolled", "dak": "Enrolled", "tamsin": "Enrolled", "orrin": "Not enrolled", "mira": "Enrolled"}
DET = {"zev": "Last signed in 61 days ago, from Hoth · MFA not enrolled · 1 device · in Fleet since Mar 2025",
       "bren": "Deactivated Nov 18 by Cal Alder · files moved to Cal Alder · license freed"}
CSS = r"""
.toast { position: absolute; left: 600px; top: 4px; transform: translateX(-50%); background: var(--ink); color: #fff; border-radius: 10px; height: 44px; display: flex; align-items: center; gap: 10px; padding: 0 16px 0 12px; font-size: 13px; opacity: 0; box-shadow: 0 10px 30px rgba(0,0,0,.18); white-space: nowrap; z-index: 40; }
.toast i { width: 18px; height: 18px; border-radius: 50%; background: #fff; color: var(--ink); display: grid; place-items: center; }
.main { overflow: hidden; }
.fr .gap { width: 6px; }
.fb .ic { width: 14px; height: 14px; }
.slot .pg { position: absolute; right: 0; top: 4px; display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: var(--soft); white-space: nowrap; }
.slot .pg b { color: var(--ink); font-weight: 500; }
.slot .pg .ps { height: 30px; display: inline-flex; align-items: center; gap: 6px; padding: 0 10px; border: 1px solid var(--rule-strong); border-radius: 8px; color: var(--ink); }
.slot .pg .nv { width: 30px; height: 30px; display: inline-grid; place-items: center; border: 1px solid var(--rule-strong); border-radius: 8px; color: var(--ink); font-size: 14px; }
.slot .pg .nv.off { color: var(--faint); border-color: var(--rule); }
.u th .sh { display: inline-flex; gap: 4px; align-items: center; color: var(--soft); }
.u th .sh i { font-style: normal; color: var(--ink); font-weight: 600; }
.u th .sh.on { color: var(--ink); font-weight: 600; }
.u th.ex, .u td.ex { width: 30px; padding: 0 0 0 4px; }
.xb { width: 24px; height: 24px; border-radius: 6px; display: inline-grid; place-items: center; color: var(--soft); font-size: 12px; }
.xb.on { color: var(--ink); background: var(--hover); }
.u th.ra, .u td.ra { width: 40px; text-align: right; padding-right: 8px; }
.kb { width: 28px; height: 28px; border-radius: 7px; display: inline-grid; place-items: center; color: var(--ink); font-size: 15px; letter-spacing: 1px; border: 1px solid transparent; }
.kb.fo { outline: 2px solid var(--ink); outline-offset: 1px; }
.kb.on { background: var(--hover); }
.c-mfa { display: none; }
.mfa-n { color: #92400e; }
tr.det { display: none; }
tr.det td { height: auto; padding: 8px 10px 12px 84px; background: var(--subtle); color: var(--ink); font-size: 12.5px; line-height: 1.5; }
tr.det td a { margin-left: 10px; text-decoration: underline; text-underline-offset: 3px; }
"""
def make(name, title, comment, css, extra, toast, script, edit=None, jobs=""):
    s = users_page.make(name, title, comment, CSS + css, extra, toast, script, jobs)
    # toolbar: Columns and Density beside the filters
    s = s.replace('<span class="fb">Status<i class="cv"></i></span></div>',
                  '<span class="fb">Status<i class="cv"></i></span><span class="gap"></span><span class="fb" id="bCol">Columns<i class="cv"></i></span><span class="fb" id="bDen"><span id="denT">Comfortable</span><i class="cv"></i></span></div>', 1)
    # pager on the same line as the count
    s = s.replace('<div class="mt" id="mt"><b>82 people</b> match Team: Fleet · sorted by name</div>',
                  '<div class="mt" id="mt" role="status"><b>82 people</b> match Team: Fleet · <span id="srtT">sorted by name, A to Z</span></div>'
                  '<div class="pg" id="pg"><span>Rows</span><span class="ps" id="pS"><span id="pST">25</span><i class="cv"></i></span><span><b id="pR">1–25</b> of 82</span>'
                  '<span class="nv off" id="pPrev" aria-label="Previous page">‹</span><span id="pP">Page 1 of 4</span><span class="nv" id="pNext" aria-label="Next page">›</span>'
                  '<span class="fb" id="bLink" style="height:30px">Copy link</span></div>', 1)
    s = s.replace('<div class="cnt" id="cnt">Showing 1–25 of 82</div>', '', 1)
    # headers: expand, sortable Person and Last active, MFA, actions
    s = s.replace('<th class="ck"><span class="cb" id="cAll"></span></th><th>Person</th><th>Team</th><th>Groups</th><th>License</th><th>Last active</th>',
                  '<th class="ck"><span class="cb" id="cAll"></span></th><th class="ex"><span class="xb" id="xAll" aria-label="Expand all">▸</span></th>'
                  '<th aria-sort="ascending" id="thP"><span class="sh on" id="hP">Person <i id="hPa">↑</i></span></th><th class="c-mfa">MFA</th><th>Team</th><th class="c-grp">Groups</th><th>License</th>'
                  '<th id="thL"><span class="sh" id="hL">Last active <i id="hLa"></i></span></th><th class="ra"><span style="position:absolute;left:-9999px">Actions</span></th>', 1)
    rows = ""
    for i, n, ini, t, g, lic, last in PEOPLE2:
        rows += (f'          <tr id="r-{i}"><td class="ck"><span class="cb" id="c-{i}"></span></td><td class="ex"><span class="xb" id="x-{i}" aria-expanded="false" aria-label="Details for {n}">▸</span></td>'
                 f'<td><div class="pp"><span class="av">{ini}</span><div>{n}<span class="s">{t}</span></div></div></td><td class="c-mfa{" mfa-n" if MFA[i] == "Not enrolled" else ""}">{MFA[i]}</td>'
                 f'<td>Fleet</td><td class="c-grp" id="g-{i}">{g}</td><td>{lic}</td><td{" class=\"dea\"" if last == "Deactivated" else ""}>{last}</td>'
                 f'<td class="ra"><span class="kb" id="k-{i}" aria-label="Actions for {n}">⋯</span></td></tr>\n')
        if i in DET:
            rows += f'          <tr class="det" id="d-{i}"><td colspan="9">{DET[i]}<a>Open profile</a></td></tr>\n'
    a = s.index('<tbody>', s.index('id="tU"')) + len('<tbody>'); b = s.index('</tbody>', a)
    s = s[:a] + "\n" + rows + "        " + s[b:]
    if edit: s = edit(s)
    (ROOT / name / "scene.html").write_text(s)
    bell.add(name, 3)
    return s
