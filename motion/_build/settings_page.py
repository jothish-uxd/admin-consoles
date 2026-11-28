"""Settings › Integrations, API keys and Webhooks: the same Settings header and tabs as Settings › Organization,
so these pages are the same pixels in every clip that shows them (Integration catalog, App permissions,
Create API key, Webhooks, Multi-step wizard).
Usage: from settings_page import CSS, head, int_sub, CONNECTED, make
       make(name, title, comment, css, crumb, main, script, extra="", defs="", toast="")."""
import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from shell import make as _make

TABS = ["Organization", "Defaults", "Integrations", "API keys", "Webhooks", "Notifications", "Announcements"]

CSS = r"""
.btn.dn, .btn.pri.dn { background: #404040; border-color: #404040; color: #fff; }
.btn.prs { background: var(--hover); }
.sub2 { margin-top: 14px; display: flex; align-items: center; gap: 6px; height: 32px; }
.sub2 .sg { height: 30px; display: inline-flex; align-items: center; gap: 6px; padding: 0 12px; border-radius: 7px; font-size: 13px; color: var(--soft); border: 1px solid transparent; white-space: nowrap; }
.sub2 .sg.on { background: var(--hover); color: var(--ink); font-weight: 500; }
.sub2 .sg .n { font-size: 11.5px; color: var(--soft); }
.sub2 .sp { flex: 1; }
.lg { width: 30px; height: 30px; border-radius: 8px; background: var(--hover); display: grid; place-items: center; font: 600 11px "Geist Mono", monospace; color: var(--ink); flex: none; }
.pill { font-size: 11.5px; border: 1px solid var(--rule-strong); border-radius: 999px; padding: 2px 9px; color: var(--ink); white-space: nowrap; background: var(--bg); }
.pill.dk { background: var(--ink); color: #fff; border-color: var(--ink); }
.pill.warn { border-color: #b45309; color: #92400e; }
.pill.bad { border-color: #b91c1c; color: #b91c1c; }
.cards { margin-top: 16px; display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.ic { border: 1px solid var(--rule); border-radius: 12px; padding: 14px 16px; font-size: 13px; color: var(--soft); }
.ic.dr { border-color: var(--ink); }
.ic .t { display: flex; align-items: center; gap: 10px; }
.ic .t b { color: var(--ink); font-size: 14px; flex: 1; }
.ic .d { margin-top: 8px; line-height: 1.45; }
.ic .d b { color: var(--ink); font-weight: 500; }
.ic .f { margin-top: 10px; display: flex; gap: 8px; align-items: center; }
.cb { display: inline-block; width: 16px; height: 16px; border: 1.5px solid var(--rule-strong); border-radius: 4px; background: var(--bg); position: relative; flex: none; box-sizing: border-box; }
.cb.on { background: var(--ink); border-color: var(--ink); }
.cb.on::after { content: ""; position: absolute; left: 4.5px; top: 1.5px; width: 4px; height: 8px; border: solid #fff; border-width: 0 2px 2px 0; transform: rotate(45deg); }
.in { height: 36px; border: 1.5px solid var(--rule-strong); border-radius: 8px; display: flex; align-items: center; padding: 0 11px; color: var(--ink); font-size: 13px; white-space: pre; box-sizing: border-box; background: var(--bg); }
.in.f { border-color: var(--ink); box-shadow: 0 0 0 3px rgba(23,23,23,.08); }
.in.err { border-color: #b91c1c; }
.in.ph { color: var(--faint); }
.in .c { width: 1.5px; height: 17px; background: var(--ink); margin-left: 1px; }
.in.mono { font-family: "Geist Mono", monospace; font-size: 12.5px; }
.lbl { display: block; font-size: 12.5px; color: var(--ink); font-weight: 500; margin-bottom: 5px; }
.lbl span { color: var(--soft); font-weight: 400; }
.msg { margin-top: 5px; font-size: 12px; height: 16px; position: relative; color: var(--soft); }
.msg > span { position: absolute; left: 0; top: 0; display: inline-flex; gap: 5px; align-items: center; white-space: nowrap; }
.msg .e { color: #b91c1c; }
.msg svg { width: 13px; height: 13px; flex: none; }
.dlg { position: absolute; background: var(--bg); border: 1px solid var(--rule-strong); border-radius: 14px; box-shadow: 0 24px 60px rgba(0,0,0,.22); padding: 18px 22px; z-index: 31; opacity: 0; font-size: 12.5px; color: var(--soft); box-sizing: border-box; }
.dlg h3 { margin: 0; font-size: 16px; color: var(--ink); font-weight: 600; }
.dlg .ft { margin-top: 16px; display: flex; gap: 8px; align-items: center; }
.dlg .ft .sp { flex: 1; }
.dlg .ft .btn { height: 34px; white-space: nowrap; }
.scr { position: absolute; left: 0; right: 0; top: 52px; bottom: 0; background: rgba(23,23,23,.32); opacity: 0; z-index: 30; }
.drw { position: absolute; right: 0; top: 52px; bottom: 0; width: 430px; background: var(--bg); border-left: 1px solid var(--rule-strong); box-shadow: -18px 0 40px rgba(0,0,0,.08); z-index: 25; padding: 20px 24px; box-sizing: border-box; font-size: 12.5px; color: var(--soft); transform: translateX(440px); }
.drw .tt { display: flex; gap: 10px; align-items: center; }
.drw .tt b { color: var(--ink); font-size: 16px; font-weight: 600; display: block; }
.drw .tt .x { margin-left: auto; color: var(--soft); font-size: 15px; }
.drw h4 { margin: 16px 0 6px; font-size: 12.5px; color: var(--ink); font-weight: 600; }
.can { display: flex; gap: 8px; align-items: flex-start; padding: 3px 0; color: var(--ink); line-height: 1.4; }
.can svg { width: 13px; height: 13px; flex: none; margin-top: 2.5px; }
.can.no { color: var(--soft); }
table.st { width: 100%; border-collapse: collapse; font-size: 13px; margin-top: 12px; }
table.st th { text-align: left; font-size: 12px; color: var(--soft); font-weight: 500; padding: 0 10px 8px; border-bottom: 1px solid var(--rule); white-space: nowrap; }
table.st td { height: 50px; padding: 0 10px; border-bottom: 1px solid var(--rule); color: var(--soft); white-space: nowrap; }
table.st td.nm { color: var(--ink); }
table.st td.nm b { font-weight: 500; display: block; }
table.st td.nm span { font-size: 12px; color: var(--soft); }
table.st tr.sel td { background: var(--subtle); }
table.st tr.nw td { background: var(--subtle); }
.flag { display: inline-flex; gap: 5px; align-items: center; color: #92400e; font-size: 12px; }
.flag svg { width: 12px; height: 12px; flex: none; }
.mono { font-family: "Geist Mono", monospace; font-size: 12px; }
.ss { margin-left: auto; width: 300px; height: 34px; border: 1.5px solid var(--rule-strong); border-radius: 8px; display: flex; align-items: center; gap: 8px; padding: 0 10px; font-size: 13px; color: var(--faint); box-sizing: border-box; }
.ss svg { width: 14px; height: 14px; color: var(--soft); flex: none; }
.ss .kb { margin-left: auto; font: 11px "Geist Mono", monospace; color: var(--soft); border: 1px solid var(--rule-strong); border-radius: 5px; padding: 1px 5px; }
.ss .c { width: 1.5px; height: 16px; background: var(--ink); margin-left: -7px; display: none; }
.ss.f { border-color: var(--ink); color: var(--ink); box-shadow: 0 0 0 3px rgba(23,23,23,.08); }
"""

ICONS = ('<symbol id="warn" viewBox="0 0 16 16"><path d="M8 1.8L15 14H1z" fill="currentColor" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M8 6.2v3.6" stroke="#fff" stroke-width="1.7" stroke-linecap="round"/><circle cx="8" cy="11.9" r="1" fill="#fff"/></symbol>'
         '<symbol id="err" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6.6" fill="currentColor"/><path d="M8 4.6v4.1" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/><circle cx="8" cy="11.2" r="1.05" fill="#fff"/></symbol>'
         '<symbol id="nope" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4 12L12 4" stroke="currentColor" stroke-width="1.5"/></symbol>'
         '<symbol id="srch" viewBox="0 0 16 16"><circle cx="7" cy="7" r="4.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M10.5 10.5L14 14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></symbol>'
         '<symbol id="copy" viewBox="0 0 16 16"><rect x="5.5" y="5.5" width="8" height="8" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M10.5 3.5v-.5A1 1 0 0 0 9.5 2h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h.5" fill="none" stroke="currentColor" stroke-width="1.4"/></symbol>')

SEARCH = '<span class="ss" id="ss"><svg aria-hidden="true"><use href="#srch"/></svg><span id="ssT">Search settings</span><span class="c" id="ssC"></span><span class="kb">⌘K</span></span>'

def head(on, search=True):
    """search=True adds Search settings beside the title: new Settings clips have it; earlier ones get it in the final pass (FINAL_PASS.md)."""
    tabs = "".join(f'<div{" class=\"on\"" if t == on else ""}>{t}</div>' for t in TABS)
    return f'        <div class="hd"><h1>Settings</h1>{SEARCH if search else ""}</div>\n        <div class="tabs page">{tabs}</div>\n'

def int_sub(on, right=""):
    subs = [("connected", "Connected", "4"), ("browse", "Browse", ""), ("people", "Connected by people", "23")]
    s = "".join(f'<span class="sg{" on" if k == on else ""}" id="sg-{k}">{n}{f" <span class=\"n\">{c}</span>" if c else ""}</span>' for k, n, c in subs)
    return f'        <div class="sub2">{s}<span class="sp"></span>{right}</div>\n'

def CONNECTED(ledger="connected"):
    if ledger == "draft":
        hl = ('<span class="pill" id="lp0">Setup in progress</span><span class="pill dk" id="lp1" style="display:none">Connected · syncing</span></div>\n'
              '            <div class="d" id="ld0"><b>Draft by Toryn Farr</b>, shared with you · 1 of 4 steps done · saved yesterday</div>\n'
              '            <div class="d" id="ld1" style="display:none">Invoices and seat counts sync every hour · last sync just now</div>\n'
              '            <div class="f" id="lf"><span class="btn sm pri" id="contB">Continue setup</span><span class="btn sm ghost">Discard draft</span></div></div>')
        cls = "ic dr"
    else:
        hl = '<span class="pill">Connected</span></div><div class="d">Invoices and seat counts sync every hour.</div></div>'
        cls = "ic"
    return ('        <div class="cards">\n'
            '          <div class="ic"><div class="t"><span class="lg">SP</span><b>Splunk</b><span class="pill">Connected</span></div><div class="d">Streams audit events to the Security SIEM.</div></div>\n'
            f'          <div class="{cls}" id="cL"><div class="t"><span class="lg">HL</span><b>Holonet Ledger</b>{hl}\n'
            '          <div class="ic"><div class="t"><span class="lg">HC</span><b>HoloComms</b><span class="pill">Connected</span></div><div class="d">Sends alerts to #sec-alerts.</div></div>\n'
            '          <div class="ic"><div class="t"><span class="lg">PD</span><b>PagerDuty</b><span class="pill">Connected</span></div><div class="d">Pages Security on-call.</div></div>\n'
            '        </div>\n')

def make(name, title, comment, css, crumb, main, script, extra="", defs="", toast=""):
    return _make(name, title, comment, CSS + css, crumb, "settings", main, script, extra=extra, defs=ICONS + defs, toast=toast)
