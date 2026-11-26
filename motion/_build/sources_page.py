"""Content › Sources: the Content header and tabs (as on All content, with Sources on) and the sources list,
shared by the Add content source, Sync status, Source permissions and Content exclusions clips.
Usage: from sources_page import CSS, head, LIST, make
       make(name, title, comment, css, crumb, main, script, extra="", defs="", toast="")."""
import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from shell import make as _make
from settings_page import CSS as SCSS, ICONS

TABS = ["All content", "Sharing", "Tags", "Storage", "Sources", "Trash"]
CSS = SCSS + r"""
.cnt2 { font-size: 12.5px; color: var(--soft); }
.st2 { display: inline-flex; gap: 6px; align-items: center; color: var(--ink); white-space: nowrap; }
.st2 svg { width: 12px; height: 12px; flex: none; }
.st2.w { color: #92400e; }
.st2.e { color: #b91c1c; }
.st2 .s { color: var(--soft); }
.srcs td .sub { display: block; font-size: 12px; color: var(--soft); }
"""
OK = '<svg aria-hidden="true"><use href="#ok"/></svg>'
WN = '<svg aria-hidden="true"><use href="#warn"/></svg>'

def head(sub="sources", right=""):
    tabs = "".join(f'<div{" class=\"on\"" if t == "Sources" else ""}>{t}</div>' for t in TABS)
    subs = [("sources", "Sources", "4"), ("excl", "Exclusions", "3")]
    s2 = "".join(f'<span class="sg{" on" if k == sub else ""}" id="sg-{k}">{n} <span class="n">{c}</span></span>' for k, n, c in subs)
    return (f'        <div class="hd"><h1>Content</h1>{right}</div>\n'
            f'        <div class="tabs page">{tabs}</div>\n'
            f'        <div class="sub2">{s2}<span class="sp"></span><span class="cnt2">Search and AI only see what’s connected here</span></div>\n')

ROWS = {
  "arch": ("Archives", "Built in", "2.4M", "0", "Just now", f'<span class="st2">{OK}Up to date</span>'),
  "wiki": ("Coruscant Wiki", "Wiki · 4 spaces", "41,220", "6,180", "2 days ago", f'<span class="st2 w">{WN}Partly failing <span class="s">· 13% failed</span></span>'),
  "comm": ("HoloComms channels", "Chat · 12 channels", "9,804", "0", "3 hours ago", f'<span class="st2 w">{WN}Sign-in expires in 4 days</span>'),
  "drive": ("Holonet Drive", "Drive · 2 folders", "18,402", "0", "12 minutes ago", f'<span class="st2">{OK}Up to date</span>'),
}
def LIST(keys=("arch", "drive", "wiki", "comm"), extra_rows=""):
    rows = "".join(f'<tr id="r-{k}"><td class="nm"><b>{ROWS[k][0]}</b><span>{ROWS[k][1]}</span></td><td id="r-{k}-i">{ROWS[k][2]}</td><td id="r-{k}-f">{ROWS[k][3]}</td><td id="r-{k}-l">{ROWS[k][4]}</td><td id="r-{k}-s">{ROWS[k][5]}</td></tr>' for k in keys)
    return (f'        <table class="st srcs"><thead><tr><th>Source</th><th>Items indexed</th><th>Failed</th><th>Last synced</th><th>State</th></tr></thead>'
            f'<tbody>{extra_rows}{rows}</tbody></table>\n')

def make(name, title, comment, css, crumb, main, script, extra="", defs="", toast=""):
    return _make(name, title, comment, CSS + css, crumb, "content", main, script, extra=extra, defs=ICONS + defs, toast=toast)
