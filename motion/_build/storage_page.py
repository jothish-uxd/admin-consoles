"""Content › Storage and Content › Trash for the Storage & quotas clips (Storage overview, Per-user quotas, Largest items,
Trash & recovery). The Content header and tabs as on All content and Sources, with Storage or Trash on; the alerts bell;
no eyebrow headers. Usage: from storage_page import CSS, head, make."""
import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from shell import make as _make
from settings_page import CSS as SCSS, ICONS
import bell

TABS = ["All content", "Sharing", "Tags", "Storage", "Sources", "Trash"]
CSS = SCSS + r"""
.btn.dis { color: var(--faint); border-color: var(--rule); background: var(--subtle); }
.btn.pri.dis { background: var(--subtle); color: var(--faint); border-color: var(--rule); }
.cnt2 { font-size: 12.5px; color: var(--soft); }
.sec { margin-top: 14px; border: 1px solid var(--rule); border-radius: 12px; padding: 14px 16px; font-size: 12.5px; color: var(--soft); }
.sec h3 { margin: 0; font-size: 14px; color: var(--ink); font-weight: 600; }
.rw { display: flex; align-items: center; gap: 10px; } .rw .sp { flex: 1; }
table.sx { width: 100%; table-layout: fixed; border-collapse: collapse; font-size: 12.5px; margin-top: 10px; }
table.sx th { text-align: left; font-size: 12px; color: var(--soft); font-weight: 500; padding: 0 8px 8px; border-bottom: 1px solid var(--rule); white-space: nowrap; }
table.sx th.n, table.sx td.n { text-align: right; font-variant-numeric: tabular-nums; }
table.sx td { height: 42px; padding: 0 8px; border-bottom: 1px solid var(--rule); color: var(--soft); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
table.sx td b { display: block; color: var(--ink); font-weight: 500; font-size: 13px; overflow: hidden; text-overflow: ellipsis; }
table.sx td.ck { width: 24px; }
table.sx tr.sel td { background: var(--subtle); }
.st2 { display: inline-flex; gap: 5px; align-items: center; color: var(--ink); }
.st2 svg { width: 13px; height: 13px; flex: none; }
.ty { display: inline-grid; place-items: center; width: 30px; height: 20px; border: 1px solid var(--rule-strong); border-radius: 5px; font-size: 9px; font-weight: 600; color: var(--ink); margin-right: 8px; vertical-align: middle; }
"""
OK = '<svg aria-hidden="true" viewBox="0 0 16 16" style="color:#15803d"><circle cx="8" cy="8" r="6.6" fill="currentColor"/><path d="M5 8.3l2 2 4-4.3" fill="none" stroke="#fff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>'
WN = '<svg aria-hidden="true" width="15" height="15" style="color:#b45309;flex:none;margin-top:2px"><use href="#warn"/></svg>'
LOCK = '<svg aria-hidden="true" viewBox="0 0 16 16"><rect x="3.5" y="7" width="9" height="6.5" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5.5 7V5.2a2.5 2.5 0 0 1 5 0V7" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'

def head(tab="Storage", sub="ov", right="", note=""):
    tabs = "".join(f'<div{" class=\"on\"" if t == tab else ""}>{t}</div>' for t in TABS)
    h = (f'        <div class="hd"><h1>Content</h1>{right}</div>\n'
         f'        <div class="tabs page">{tabs}</div>\n')
    if tab == "Storage":
        subs = [("ov", "Overview"), ("qu", "Quotas"), ("lg", "Largest items")]
        s2 = "".join(f'<span class="sg{" on" if k == sub else ""}" id="sg-{k}">{n}</span>' for k, n in subs)
        h += f'        <div class="sub2">{s2}<span class="sp"></span><span class="cnt2">{note or "3.2 TB of 5 TB used · updated hourly"}</span></div>\n'
    return h

def make(name, title, comment, css, crumb, main, script, extra="", defs="", toast=""):
    _make(name, title, comment, CSS + css, crumb, "content", main, script, extra=extra, defs=ICONS + defs, toast=toast)
    bell.add(name, 3)
