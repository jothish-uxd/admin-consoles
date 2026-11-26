"""Home (admin view) and Insights, shared by the Usage & insights clips (Admin home, Adoption metrics, Reports,
Recommendations). Home has Overview and Recommendations tabs; Insights has Adoption and Reports. The alerts bell;
no eyebrow headers. Usage: from insights_page import CSS, home_head, ins_head, make."""
import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from shell import make as _make
from settings_page import CSS as SCSS, ICONS
import bell

CSS = SCSS + r"""
.hd .sp { flex: 1; } .hd .upd { font-size: 12.5px; color: var(--soft); }
.btn.dis { color: var(--faint); border-color: var(--rule); background: var(--subtle); }
.sec { margin-top: 14px; border: 1px solid var(--rule); border-radius: 12px; padding: 14px 16px; font-size: 12.5px; color: var(--soft); }
.sec h3 { margin: 0; font-size: 14px; color: var(--ink); font-weight: 600; }
.sec .d { margin-top: 2px; }
.rw { display: flex; align-items: center; gap: 10px; } .rw .sp { flex: 1; }
table.sx { width: 100%; table-layout: fixed; border-collapse: collapse; font-size: 12.5px; margin-top: 10px; }
table.sx th { text-align: left; font-size: 12px; color: var(--soft); font-weight: 500; padding: 0 8px 8px; border-bottom: 1px solid var(--rule); white-space: nowrap; }
table.sx th.n, table.sx td.n { text-align: right; font-variant-numeric: tabular-nums; }
table.sx td { height: 42px; padding: 0 8px; border-bottom: 1px solid var(--rule); color: var(--soft); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
table.sx td b { display: block; color: var(--ink); font-weight: 500; font-size: 13px; }
.st2 { display: inline-flex; gap: 5px; align-items: center; color: var(--ink); }
.st2 svg { width: 13px; height: 13px; flex: none; }
.up { color: #15803d; font-weight: 500; } .dn2 { color: #b91c1c; font-weight: 500; }
"""
OK = '<svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14" style="color:#15803d;flex:none"><circle cx="8" cy="8" r="6.6" fill="currentColor"/><path d="M5 8.3l2 2 4-4.3" fill="none" stroke="#fff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>'
WN = '<svg aria-hidden="true" width="15" height="15" style="color:#b45309;flex:none"><use href="#warn"/></svg>'
ER = '<svg aria-hidden="true" width="15" height="15" style="color:#b91c1c;flex:none"><use href="#err"/></svg>'

def home_head(tab="ov", n=3):
    t = f'<div{" class=\"on\"" if tab == "ov" else ""}>Overview</div><div{" class=\"on\"" if tab == "rec" else ""} id="tRec">Recommendations <span style="color:var(--soft)" id="tRecN">{n}</span></div>'
    return ('        <div class="hd"><h1>Home</h1><span class="sp"></span><span class="upd">Echo Base · 1,214 people</span></div>\n'
            f'        <div class="tabs page">{t}</div>\n')

def ins_head(tab="ad", note="Updated 2 hours ago"):
    t = f'<div{" class=\"on\"" if tab == "ad" else ""}>Adoption</div><div{" class=\"on\"" if tab == "rp" else ""}>Reports</div>'
    return (f'        <div class="hd"><h1>Insights</h1><span class="sp"></span><span class="upd">{note}</span></div>\n'
            f'        <div class="tabs page">{t}</div>\n')

def make(name, title, comment, css, crumb, nav, main, script, extra="", defs="", toast=""):
    _make(name, title, comment, CSS + css, crumb, nav, main, script, extra=extra, defs=ICONS + defs, toast=toast)
    bell.add(name, 3)
