"""Settings › Defaults (and Settings › Organization, as in the Danger zone clips), with Search settings beside the title,
shared by the Org settings clips: Settings navigation, Org profile, Defaults, Save patterns, Inherited settings.
Usage: from defaults_page import CSS, head, defaults, org, make."""
import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from settings_page import make as _make, head as _head
import settings_org
import bell

CSS = settings_org.PAGE_CSS + r"""
.scope { margin-top: 14px; display: flex; align-items: center; gap: 10px; font-size: 12.5px; color: var(--soft); height: 32px; position: relative; }
.scope .in { height: 32px; width: 250px; justify-content: space-between; }
.scope .sp { flex: 1; }
.svb { margin-top: 12px; height: 44px; border-radius: 10px; background: var(--ink); color: #fff; display: flex; align-items: center; gap: 10px; padding: 0 8px 0 16px; font-size: 13px; opacity: 0; }
.svb .sp { flex: 1; }
.svb .btn { height: 30px; font-size: 12.5px; background: transparent; color: #fff; border-color: rgba(255,255,255,.35); }
.svb .btn.pri { background: #fff; color: var(--ink); border-color: #fff; }
.svb .btn.pri.dn { background: #d4d4d4; border-color: #d4d4d4; }
.dgrid { margin-top: 12px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.set { border: 1px solid var(--rule); border-radius: 12px; padding: 12px 14px; font-size: 12.5px; color: var(--soft); position: relative; }
.set.hl { border-color: var(--ink); box-shadow: 0 0 0 3px rgba(23,23,23,.08); }
.set .grp { font: 500 11px "Geist Mono", monospace; letter-spacing: .04em; text-transform: uppercase; color: var(--soft); }
.set b.n { display: block; margin-top: 4px; color: var(--ink); font-size: 13.5px; font-weight: 600; }
.set .ds { margin-top: 2px; line-height: 1.4; }
.set .ctl { margin-top: 8px; display: flex; gap: 8px; align-items: center; position: relative; }
.set .ctl .in { width: 200px; height: 34px; justify-content: space-between; }
.set .ctl .in.lk { background: var(--subtle); color: var(--soft); border-style: dashed; }
.set .ctl .lnk { color: var(--ink); text-decoration: underline; text-underline-offset: 3px; font-size: 12px; white-space: nowrap; }
.set .mt { margin-top: 7px; font-size: 12px; line-height: 1.45; }
.set .mt b { color: var(--ink); font-weight: 500; }
.src { display: inline-flex; gap: 5px; align-items: center; font-size: 11.5px; border: 1px solid var(--rule-strong); border-radius: 999px; padding: 1px 8px; color: var(--ink); white-space: nowrap; }
.src svg { width: 11px; height: 11px; }
.src.set2 { background: var(--ink); color: #fff; border-color: var(--ink); }
.set .menu { position: absolute; left: 0; top: 38px; width: 200px; z-index: 8; opacity: 0; }
.set .menu .s2 { display: block; font-size: 11.5px; color: var(--soft); }
"""
LOCK = '<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="3.5" y="7" width="9" height="6.5" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5.5 7V5.2a2.5 2.5 0 0 1 5 0V7" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'

def head(tab):
    return _head(tab, search=True)

def card(i, grp, name, desc, val, meta, src="", ctl_extra="", locked=False, menu=""):
    return (f'<div class="set" id="{i}"><b class="n">{name}</b><div class="ds">{desc}</div>'
            f'<div class="ctl"><span class="in{" lk" if locked else ""}" id="{i}-v"><span id="{i}-t">{val}</span>{"" if locked else "<i class=\"cv\"></i>"}</span>{src}{ctl_extra}{menu}</div>'
            f'<div class="mt" id="{i}-m">{meta}</div></div>')

def defaults(scope="org", menus=None):
    """The four defaults. scope="org": Echo Base's own values. scope="group": what Hangar 3 sees (sources shown)."""
    m = menus or {}
    if scope == "org":
        cards = [
          card("dSh", "Sharing", "Sharing for new files", "Who can open a file when someone creates it.", "Team", "Product default: Only the owner · <b>applies to files created from now on</b> · Hangar 3 overrides this", ctl_extra='<span class="lnk" id="dSh-r">Reset to product default</span>', menu=m.get("dSh", "")),
          card("dEx", "Sharing", "External sharing", "Whether files can be shared outside Echo Base.", "Off", "Set by Rebel Alliance, the parent org · Mon Mothma can change it", src=f'<span class="src">{LOCK}Locked</span>', locked=True),
          card("dSt", "Sign-in & sessions", "Session timeout", "How long people stay signed in without activity.", "12 hours", "Product default: 24 hours · <b>applies to everyone</b> at their next sign-in", menu=m.get("dSt", "")),
          card("dAi", "AI", "AI features for new people", "Whether people added from now on start with AI features.", "Off", "Product default: Off · applies to people added from now on", menu=m.get("dAi", "")),
        ]
    else:
        cards = [
          card("dSh", "Sharing", "Sharing for new files", "Who can open a file when someone creates it.", "Anyone at Echo Base", "Echo Base default: Team", src='<span class="src set2">Set here</span>', ctl_extra='<span class="lnk">Reset to inherited</span>'),
          card("dEx", "Sharing", "External sharing", "Whether files can be shared outside Echo Base.", "Off", "Only Rebel Alliance admins can change this · Mon Mothma", src=f'<span class="src">{LOCK}Locked by Rebel Alliance</span>', locked=True),
          card("dSt", "Sign-in & sessions", "Session timeout", "How long people stay signed in without activity.", "12 hours", "Same as Echo Base", src='<span class="src" id="dSt-s">Inherited from Echo Base</span>', ctl_extra='<span class="lnk" id="dSt-o">Override</span>', menu=m.get("dSt", "")),
          card("dAi", "AI", "AI features for new people", "Whether people added from now on start with AI features.", "Off", "Same as Echo Base", src='<span class="src">Inherited from Echo Base</span>', ctl_extra='<span class="lnk">Override</span>'),
        ]
    return '        <div class="dgrid">' + "".join(cards) + '</div>\n'

def scope_row(label="Echo Base · whole org", menu=""):
    return (f'        <div class="scope">Showing defaults for<span class="in sel2" id="scp"><span id="scpT">{label}</span><i class="cv"></i></span>{menu}'
            '<span class="sp"></span>Values come from: product default, Echo Base, or a group</div>\n')

SAVEBAR = '        <div class="svb" id="svb" role="status" aria-live="polite"><span id="svT">2 unsaved changes</span><span class="sp"></span><span class="btn" id="bDis">Discard</span><span class="btn pri" id="bSave">Save changes</span></div>\n'

def org():
    """Settings › Organization body, as in settings_org (profile + irreversible actions)."""
    p = settings_org.PAGE
    a = p.index('        <div class="sec" id="prof">'); b = p.index('      </div>\n    </div>\n__EXTRA__')
    return p[a:b]

def make(name, title, comment, css, crumb, main, script, extra="", toast=""):
    _make(name, title, comment, CSS + css, crumb, main, script, extra=extra, toast=toast)
    bell.add(name, 3)
