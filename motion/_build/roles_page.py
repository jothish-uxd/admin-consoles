"""People › Roles, shared by the Roles & permissions clips (Role catalog, Permission matrix, Create custom role, Assign role,
Scoped access, Effective permissions). Same People header and tabs as People › Users; the alerts bell; no eyebrow headers.
Usage: from roles_page import CSS, head, catalog, make."""
import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from shell import make as _make
from settings_page import CSS as SCSS, ICONS
import bell

CSS = SCSS + r"""
.hd .sp { flex: 1; }
.hd .btn { margin-left: 8px; }
.rbar { margin-top: 14px; display: flex; align-items: center; gap: 8px; height: 34px; position: relative; }
.rbar .sp { flex: 1; }
.seg { display: inline-flex; border: 1px solid var(--rule-strong); border-radius: 8px; padding: 2px; gap: 2px; }
.seg span { height: 28px; display: inline-flex; align-items: center; padding: 0 12px; border-radius: 6px; font-size: 12.5px; color: var(--soft); }
.seg span.on { background: var(--hover); color: var(--ink); font-weight: 500; }
.srch2 { width: 240px; height: 34px; border: 1px solid var(--rule-strong); border-radius: 8px; display: flex; gap: 8px; align-items: center; padding: 0 10px; font-size: 13px; color: var(--faint); box-sizing: border-box; }
.srch2 svg { width: 14px; height: 14px; color: var(--soft); }
table.rl { width: 100%; table-layout: fixed; border-collapse: collapse; font-size: 12.5px; margin-top: 10px; }
table.rl th { text-align: left; font-size: 12px; color: var(--soft); font-weight: 500; padding: 0 8px 8px; border-bottom: 1px solid var(--rule); white-space: nowrap; }
table.rl td { height: 50px; padding: 0 8px; border-bottom: 1px solid var(--rule); color: var(--soft); white-space: nowrap; }
table.rl td.ck { width: 24px; }
table.rl td.nm b { display: block; color: var(--ink); font-weight: 500; font-size: 13px; }
table.rl td.nm span { font-size: 11.5px; }
table.rl td.ds { white-space: normal; color: var(--ink); line-height: 1.4; max-width: 380px; }
table.rl td.n { color: var(--ink); text-align: right; font-variant-numeric: tabular-nums; }
table.rl th.n { text-align: right; }
table.rl tr.sel td { background: var(--subtle); }
.ty { font-size: 11.5px; border: 1px solid var(--rule-strong); border-radius: 999px; padding: 1px 8px; color: var(--ink); white-space: nowrap; }
.ty.bi { background: var(--hover); }
.btn.dis { color: var(--faint); border-color: var(--rule); background: var(--subtle); }
.rm2 { color: var(--soft); font-size: 15px; letter-spacing: 1px; text-align: right; width: 24px; }
"""
ROLES = [
  ("rOw", "Owner", "Everything, including billing and deleting the organization", "Built-in", "2"),
  ("rAd", "Admin", "Manage people, content and settings. Can’t change billing", "Built-in", "12"),
  ("rSe", "Security admin", "Sign-in, devices and the audit log. Can’t see content", "Custom", "4"),
  ("rCo", "Content admin", "Sources, exclusions and sharing. Can’t manage people", "Custom", "3"),
  ("rBi", "Billing admin", "Plan, seats and invoices. Nothing else", "Built-in", "2"),
  ("rMe", "Member", "Use the console, and open what’s shared with them", "Built-in", "1,181"),
]
def catalog(extra_rows="", checks=False):
    rows = "".join(
        f'<tr id="{i}">' + (f'<td class="ck"><span class="cb" id="{i}-c"></span></td>' if checks else "")
        + f'<td class="nm"><b>{n}</b><span>{"based on Admin" if i == "rSe" else "based on Admin" if i == "rCo" else ""}</span></td><td class="ds">{d}</td>'
        f'<td><span class="ty{" bi" if t == "Built-in" else ""}">{t}</span></td><td class="n">{p}</td><td class="rm2" id="{i}-m">⋯</td></tr>'
        for i, n, d, t, p in ROLES)
    head = ('<th class="ck" style="width:24px"></th>' if checks else "") + '<th style="width:170px">Role</th><th>What they can do</th><th style="width:90px">Type</th><th class="n" style="width:70px">People</th><th style="width:28px"></th>'
    return f'        <table class="rl"><thead><tr>{head}</tr></thead><tbody id="tb">{rows}{extra_rows}</tbody></table>\n'

RIGHT = '<span class="btn sm">Export for audit</span><span class="btn sm dis" id="bCmp">Compare</span><span class="btn sm" id="bChk">Check access</span><span class="btn sm pri">New role</span>'
def head(right=RIGHT):
    return ('        <div class="hd"><h1>People</h1><span class="sp"></span><span class="btn sm pri">Invite people</span></div>\n'
            '        <div class="tabs page"><div>Users</div><div>Groups</div><div class="on">Roles</div></div>\n'
            f'        <div class="rbar"><span class="seg"><span class="on" id="sgR">Roles</span><span id="sgP">Permissions</span></span>'
            f'<span class="srch2"><svg><use href="#srch"/></svg>Search roles</span><span class="sp"></span>{right}</div>\n')

def make(name, title, comment, css, crumb, main, script, extra="", defs="", toast=""):
    _make(name, title, comment, CSS + css, crumb, "people", main, script, extra=extra, defs=ICONS + defs, toast=toast)
    bell.add(name, 3)
