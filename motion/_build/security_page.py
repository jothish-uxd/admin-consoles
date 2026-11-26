"""People › Sign-in & security and People › Devices, shared by the Security & identity clips (SSO setup, MFA enforcement,
Session management, Domain verification, IP allowlists, Device management). Same People header as Users, Groups and Roles,
with two more tabs (the earlier People clips get them in the final pass); the alerts bell; no eyebrow headers.
Usage: from security_page import CSS, head, make."""
import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from shell import make as _make
from settings_page import CSS as SCSS, ICONS
import bell

CSS = SCSS + r"""
.hd .sp { flex: 1; }
.sub2 { margin-top: 14px; }
.sec { margin-top: 14px; border: 1px solid var(--rule); border-radius: 12px; padding: 14px 16px; font-size: 12.5px; color: var(--soft); }
.sec h3 { margin: 0; font-size: 14px; color: var(--ink); font-weight: 600; }
.sec .d { margin-top: 2px; }
.rw { display: flex; align-items: center; gap: 10px; }
.rw .sp { flex: 1; }
.stat { display: flex; gap: 10px; align-items: center; font-size: 13px; color: var(--ink); }
.stat svg { width: 15px; height: 15px; flex: none; }
.ok2 { color: #15803d; } .wn2 { color: #b45309; } .bd2 { color: #b91c1c; }
.btn.dis { color: var(--faint); border-color: var(--rule); background: var(--subtle); }
.btn.pri.dis { background: var(--subtle); color: var(--faint); border-color: var(--rule); }
.cpy { height: 30px; font-size: 12px; display: inline-flex; gap: 6px; align-items: center; }
.cpy svg { width: 13px; height: 13px; }
table.sx { width: 100%; table-layout: fixed; border-collapse: collapse; font-size: 12.5px; margin-top: 10px; }
table.sx th { text-align: left; font-size: 12px; color: var(--soft); font-weight: 500; padding: 0 8px 8px; border-bottom: 1px solid var(--rule); white-space: nowrap; }
table.sx td { height: 44px; padding: 0 8px; border-bottom: 1px solid var(--rule); color: var(--soft); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
table.sx td b { display: block; color: var(--ink); font-weight: 500; font-size: 13px; }
table.sx tr.sel td { background: var(--subtle); }
.st2 { display: inline-flex; gap: 5px; align-items: center; color: var(--ink); }
.st2 svg { width: 13px; height: 13px; flex: none; }
.mono { font-family: "Geist Mono", monospace; font-size: 12px; }
"""
OK = '<svg aria-hidden="true" class="ok2" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6.6" fill="currentColor"/><path d="M5 8.3l2 2 4-4.3" fill="none" stroke="#fff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>'
WN = '<svg aria-hidden="true" class="wn2"><use href="#warn"/></svg>'
ER = '<svg aria-hidden="true" class="bd2"><use href="#err"/></svg>'
PEND = '<svg aria-hidden="true" viewBox="0 0 16 16" style="color:var(--soft)"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 4.8V8l2.2 1.4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>'
COPY = '<svg aria-hidden="true"><use href="#copy"/></svg>'
SUBS = [("sso", "Single sign-on"), ("mfa", "MFA"), ("ses", "Sessions"), ("dom", "Domains"), ("net", "Network")]
TABS = ["Users", "Groups", "Roles", "Sign-in &amp; security", "Devices"]

def head(tab="Sign-in &amp; security", sub="sso", right=""):
    t = "".join(f'<div{" class=\"on\"" if x == tab else ""}>{x}</div>' for x in TABS)
    h = ('        <div class="hd"><h1>People</h1><span class="sp"></span><span class="btn sm pri">Invite people</span></div>\n'
         f'        <div class="tabs page">{t}</div>\n')
    if sub:
        s = "".join(f'<span class="sg{" on" if k == sub else ""}" id="sg-{k}">{n}</span>' for k, n in SUBS)
        h += f'        <div class="sub2">{s}<span class="sp"></span>{right}</div>\n'
    return h

def make(name, title, comment, css, crumb, main, script, extra="", defs="", toast=""):
    _make(name, title, comment, CSS + css, crumb, "people", main, script, extra=extra, defs=ICONS + defs, toast=toast)
    bell.add(name, 3)
