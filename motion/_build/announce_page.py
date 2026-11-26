"""Settings › Announcements, with its Announcements and Banners lists, shared by the Announcements and Banners clips.
Usage: from announce_page import CSS, view, make."""
import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from settings_page import make as _make, head
import bell

CSS = r"""
.bar2 { margin-top: 14px; display: flex; align-items: center; gap: 10px; height: 32px; font-size: 12.5px; color: var(--soft); }
.bar2 .sp { flex: 1; }
.f1 { margin-top: 12px; }
.chips { display: flex; gap: 6px; flex-wrap: wrap; }
.chip { height: 30px; display: inline-flex; align-items: center; gap: 6px; padding: 0 11px; border-radius: 999px; border: 1px solid var(--rule-strong); font-size: 12.5px; color: var(--ink); }
.chip.on { background: var(--ink); color: #fff; border-color: var(--ink); }
.ta { border: 1.5px solid var(--rule-strong); border-radius: 8px; padding: 9px 11px; font-size: 13px; color: var(--ink); line-height: 1.5; min-height: 60px; box-sizing: border-box; }
.row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.sel2 { justify-content: space-between; }
.seg { display: inline-flex; border: 1px solid var(--rule-strong); border-radius: 8px; padding: 2px; gap: 2px; }
.seg span { height: 28px; display: inline-flex; align-items: center; padding: 0 12px; border-radius: 6px; font-size: 12.5px; color: var(--soft); }
.seg span.on { background: var(--hover); color: var(--ink); font-weight: 500; }
table.st td .ch { color: var(--ink); }
"""
SUBS = [("ann", "Announcements", "2"), ("ban", "Banners", "1")]

def view(sub, right, body, vid="v"):
    s2 = "".join(f'<span class="sg{" on" if k == sub else ""}" id="sg-{k}">{n} <span class="n" id="n-{k}">{c}</span></span>' for k, n, c in SUBS)
    return (f'      <div class="view" id="{vid}">\n{head("Announcements")}'
            f'        <div class="sub2">{s2}<span class="sp"></span>{right}</div>\n{body}      </div>\n')

ANN = [("Expense policy changes on Dec 1", "Everyone · 1,204", "Sent Nov 3", "96% acknowledged · required"),
       ("Hangar 3 maintenance schedule", "Hangar 3 · 14", "Sent Nov 18", "14 of 14 seen")]
def ann_table(new=""):
    rows = "".join(f'<tr><td class="nm"><b>{a}</b></td><td class="ch">{b}</td><td>{c}</td><td>{d}</td></tr>' for a, b, c, d in ANN)
    return f'        <table class="st"><thead><tr><th>Announcement</th><th>Who gets it</th><th>Status</th><th>Reach</th></tr></thead><tbody>{new}{rows}</tbody></table>\n'

BAN = [("Sign-in was slow for 40 minutes", "Incident", "Everyone", "Nov 12, 14:10–14:50", "Ended")]
def ban_table(new=""):
    rows = "".join(f'<tr><td class="nm"><b>{a}</b><span>{b}</span></td><td class="ch">{c}</td><td>{d}</td><td>{e}</td></tr>' for a, b, c, d, e in BAN)
    return f'        <table class="st"><thead><tr><th>Banner</th><th>Who sees it</th><th>When</th><th>Status</th></tr></thead><tbody>{new}{rows}</tbody></table>\n'

def make(name, title, comment, css, main, script, extra="", toast=""):
    _make(name, title, comment, CSS + css, "Settings / Announcements", main, script, extra=extra, toast=toast)
    bell.add(name, 3)
