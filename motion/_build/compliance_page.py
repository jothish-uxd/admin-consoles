"""Compliance › Policies (and the policy pages under it), shared by the Policies & rules clips: Policy list, Policy builder,
Scope & targeting and Simulate / test, so the list is the same pixels. Has the top bar's alerts bell, and no eyebrow headers.
Usage: from compliance_page import CSS, policies, make."""
import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from shell import make as _make
from settings_page import CSS as SCSS, ICONS
import bell

CSS = SCSS + r"""
.hd .btn { margin-left: 8px; }
.hd .sp { flex: 1; }
.fr2 { margin-top: 14px; display: flex; gap: 8px; align-items: center; position: relative; }
.fb { height: 32px; display: inline-flex; align-items: center; gap: 6px; padding: 0 12px; border: 1px solid var(--rule-strong); border-radius: 8px; font-size: 12.5px; color: var(--ink); white-space: nowrap; }
.fb.on { border-color: var(--ink); background: var(--subtle); font-weight: 500; }
.fr2 .nt { margin-left: auto; font-size: 12px; color: var(--soft); }
table.pl { width: 100%; border-collapse: collapse; font-size: 12.5px; margin-top: 10px; }
table.pl th { text-align: left; font-size: 12px; color: var(--soft); font-weight: 500; padding: 0 8px 8px; border-bottom: 1px solid var(--rule); white-space: nowrap; }
table.pl td { height: 48px; padding: 0 8px; border-bottom: 1px solid var(--rule); color: var(--soft); white-space: nowrap; }
table.pl td.pr { font-family: "Geist Mono", monospace; color: var(--ink); width: 26px; }
table.pl td.nm b { display: block; color: var(--ink); font-weight: 500; font-size: 13px; }
table.pl td.nm span { font-size: 11.5px; }
table.pl tr.sel td { background: var(--subtle); }
table.pl tr.mv td { background: #f4f4f5; }
.stt { display: inline-flex; gap: 6px; align-items: center; font-size: 12px; color: var(--ink); }
.stt i { width: 8px; height: 8px; border-radius: 50%; flex: none; }
.stt.en i { background: var(--ink); }
.stt.si i { border: 2px solid var(--ink); width: 6px; height: 6px; }
.stt.dr i { border: 1.5px dashed var(--soft); width: 7px; height: 7px; }
.stt.off { color: var(--soft); } .stt.off i { background: var(--rule-strong); }
.mm { color: var(--ink); }
.rm2 { color: var(--soft); font-size: 15px; letter-spacing: 1px; text-align: right; }
"""
WN = '<svg aria-hidden="true"><use href="#warn"/></svg>'
POL = [
  ("p1", "Death Star plans · restricted", "Lavanya Sienna", "Sharing", "en", "Enforced", "Restricted folders · 3", "214 blocked", "Today"),
  ("p2", "Hoth operations · restricted", "Mon Mothma", "Sharing", "en", "Enforced", "Echo Base / Operations", "38 blocked", "3 days ago"),
  ("p3", "External links expire", "Toryn Farr", "Sharing", "si", "Simulating", "Fleet, Hangar 3", "Would affect 1,980", "Yesterday"),
  ("p4", "Contractor access", "Toryn Farr", "Access", "en", "Enforced", "Contractors · 9", "12 limited", "2 weeks ago"),
  ("p5", "Block .exe uploads", "Wes Janson", "Content", "off", "Off", "Everyone", f'<span class="flag">{WN}Never matched in 120 days</span>', "4 months ago"),
  ("p6", "AI summaries of HR files", "Lavanya Sienna", "AI", "dr", "Draft", "HR", "—", "Today"),
]
def row(i, n, o, ty, sc, st, ap, m, lc, pr):
    return (f'<tr id="{i}"><td class="pr" id="{i}-pr">{pr}</td><td class="nm"><b>{n}</b><span>{o}</span></td><td>{ty}</td>'
            f'<td><span class="stt {sc}"><i></i>{st}</span></td><td>{ap}</td><td class="mm">{m}</td><td>{lc}</td><td class="rm2" id="{i}-m">⋯</td></tr>')
def policies(order=None, new=""):
    rows = POL if order is None else [next(p for p in POL if p[0] == k) for k in order]
    body = "".join(row(*p, n + 1) for n, p in enumerate(rows))
    return ('        <div class="fr2" id="fr2"><span class="fb" id="fT">Type: All<i class="cv"></i></span><span class="fb">Status: All<i class="cv"></i></span><span class="fb">Applies to<i class="cv"></i></span><span class="fb">Owner<i class="cv"></i></span>'
            '<span class="nt">Priority decides which policy wins when two apply</span></div>\n'
            '        <table class="pl"><thead><tr><th>#</th><th>Policy</th><th>Type</th><th>Status</th><th>Applies to</th><th>Last 7 days</th><th>Changed</th><th></th></tr></thead>'
            f'<tbody id="tb">{new}{body}</tbody></table>\n')
def list_head():
    return '        <div class="hd"><h1>Policies</h1><span class="sp"></span><span class="btn sm">Export for audit</span><span class="btn sm pri" id="bNew">New policy</span></div>\n'

def make(name, title, comment, css, crumb, main, script, extra="", defs="", toast=""):
    _make(name, title, comment, CSS + css, crumb, "compliance", main, script, extra=extra, defs=ICONS + defs, toast=toast)
    bell.add(name, 3)
