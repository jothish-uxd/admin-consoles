"""People › Users › Zev Senesca: the person's page, shared by the User detail, Edit profile and Suspend / deactivate clips.
Headed by "← Users" (no People tabs); labels above values; the alerts bell; no eyebrow headers.
Usage: from user_page import CSS, PAGE, make."""
import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from shell import make as _make
from settings_page import CSS as SCSS, ICONS
import bell

CSS = SCSS + r"""
.bk { margin-top: 2px; font-size: 12.5px; color: var(--soft); }
.ph { margin-top: 8px; display: flex; align-items: center; gap: 14px; }
.ph .av3 { width: 48px; height: 48px; border-radius: 50%; background: var(--hover); color: var(--ink); display: grid; place-items: center; font-weight: 650; font-size: 16px; flex: none; }
.ph h1 { margin: 0; font-size: 22px; }
.ph .sub { margin-top: 2px; font-size: 12.5px; color: var(--soft); }
.ph .sp { flex: 1; }
.ph .btn { height: 34px; }
.ph .gap2 { width: 14px; }
.btn.red { color: #b91c1c; border-color: #fca5a5; }
.pill2 { display: inline-flex; align-items: center; gap: 5px; font-size: 12px; font-weight: 500; border: 1px solid var(--rule-strong); border-radius: 999px; padding: 1px 9px; color: var(--ink); margin-left: 8px; vertical-align: 3px; }
.pill2 i { width: 7px; height: 7px; border-radius: 50%; background: #15803d; }
.pill2.sus i { background: none; border: 1.5px solid #92400e; width: 5px; height: 5px; }
.pill2.sus { color: #92400e; border-color: #b45309; }
.ban2 { display: none; margin-top: 12px; align-items: center; gap: 10px; border: 1px solid #b45309; background: #fffbeb; border-radius: 10px; padding: 9px 12px; color: var(--ink); font-size: 12.5px; }
.ban2 .sp { flex: 1; } .ban2 .btn { height: 30px; } .ban2 svg { width: 15px; height: 15px; flex: none; }
.snav { margin-top: 14px; display: flex; gap: 18px; border-bottom: 1px solid var(--rule); font-size: 13px; color: var(--soft); }
.snav span { padding: 0 0 8px; } .snav span.on { color: var(--ink); font-weight: 500; border-bottom: 2px solid var(--ink); margin-bottom: -1px; }
.g2 { display: grid; grid-template-columns: 1.15fr 1fr; gap: 14px; align-items: start; }
.sec { margin-top: 14px; border: 1px solid var(--rule); border-radius: 12px; padding: 12px 16px; font-size: 12.5px; color: var(--soft); position: relative; }
.sec h3 { margin: 0 0 6px; font-size: 14px; color: var(--ink); font-weight: 600; display: flex; align-items: center; }
.sec h3 a { margin-left: auto; font-size: 12.5px; font-weight: 400; color: var(--ink); text-decoration: underline; text-underline-offset: 3px; }
.kvg { display: grid; grid-template-columns: 1fr 1fr; gap: 10px 16px; }
.kvg .k { font-size: 12px; color: var(--soft); }
.kvg .v { color: var(--ink); font-size: 13px; margin-top: 1px; display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.kvg .v svg { width: 14px; height: 14px; flex: none; }
.src { font-size: 11.5px; color: var(--soft); }
.srcl { font-size: 11.5px; color: var(--ink); text-decoration: underline; text-underline-offset: 3px; }
.acc .ar { display: grid; grid-template-columns: 1fr auto; gap: 8px; align-items: center; padding: 7px 0; border-top: 1px solid var(--rule); }
.acc .ar:first-of-type { border-top: 0; }
.acc .ar .k { font-size: 12px; display: block; } .acc .ar b { color: var(--ink); font-weight: 500; font-size: 13px; display: block; margin-top: 1px; }
.ev div { padding: 5px 0; border-top: 1px solid var(--rule); color: var(--ink); }
.ev div:first-of-type { border-top: 0; } .ev div span { color: var(--soft); margin-left: 6px; }
.edl { margin-top: 8px; font-size: 12px; }
.edl a { color: var(--ink); text-decoration: underline; text-underline-offset: 3px; margin-left: 6px; }
"""
OK = '<svg aria-hidden="true" viewBox="0 0 16 16" style="color:#15803d"><circle cx="8" cy="8" r="6.6" fill="currentColor"/><path d="M5 8.3l2 2 4-4.3" fill="none" stroke="#fff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>'
WN = '<svg aria-hidden="true" style="color:#b45309"><use href="#warn"/></svg>'
LOCK = '<svg aria-hidden="true" viewBox="0 0 16 16" style="color:var(--soft)"><rect x="3.5" y="7" width="9" height="6.5" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5.5 7V5.2a2.5 2.5 0 0 1 5 0V7" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'

def page(extra_access="", title_id="pT", edited='Last edited by Cal Alder, Mar 2025'):
    return f'''      <div class="view">
        <div class="bk">← Users</div>
        <div class="ph"><span class="av3">ZS</span><div><h1>Zev Senesca<span class="pill2" id="stP"><i></i><span id="stT">Active</span></span></h1>
          <div class="sub">Pilot · Fleet · zev@echobase.org · <span class="src">from Holonet ID</span></div></div><span class="sp"></span>
          <span class="btn" id="bRs">Reset sign-in</span><span class="btn" id="bEd">Edit</span><span class="btn pri" id="bRa" style="display:none">Reactivate</span><span class="gap2"></span><span class="btn red" id="bSu">Suspend…</span></div>
        <div class="ban2" id="ban2" role="status">{WN}<span><b>Suspended by you, today</b> · Extended leave. He can’t sign in; his files and links still work.</span><span class="sp"></span><span class="btn" id="bRa2">Reactivate</span></div>
        <div class="snav"><span class="on">Overview</span><span>Access</span><span>Security</span><span>Activity</span></div>
        <div class="g2"><div>
          <div class="sec acc"><h3>Access<a>Check access</a></h3>
            <div class="ar"><div><span class="k">Role</span><b>Member</b></div><span class="src">Directly</span></div>
            <div class="ar"><div><span class="k">Role</span><b>Editor</b></div><span class="srcl" id="sFc">Through Fleet content</span></div>
            <div class="ar"><div><span class="k">Groups</span><b>Fleet, Fleet content</b></div><span class="src">2 of 2</span></div>
            <div class="ar"><div><span class="k">License</span><b>Console</b></div><span class="src">Since Mar 2025</span></div>{extra_access}</div>
          <div class="sec"><h3>Profile</h3><div class="kvg">
            <div><div class="k">Name</div><div class="v">Zev Senesca {LOCK}</div></div><div><div class="k">Email</div><div class="v">zev@echobase.org {LOCK}</div></div>
            <div><div class="k">Title</div><div class="v" id="{title_id}">Pilot</div></div><div><div class="k">Manager</div><div class="v">Cal Alder</div></div></div>
            <div class="edl" id="edl">{edited}</div></div>
        </div><div>
          <div class="sec" id="secS"><h3>Security</h3><div class="kvg">
            <div><div class="k">MFA</div><div class="v" id="vMfa">{WN}Not enrolled</div></div><div><div class="k">Last sign-in</div><div class="v">61 days ago, from Hoth</div></div>
            <div><div class="k">Devices</div><div class="v">1 · iPhone 15</div></div><div><div class="k">Sessions and tokens</div><div class="v" id="vSes">1 session · 2 API tokens</div></div></div></div>
          <div class="sec ev"><h3>Activity<a>Open his audit log</a></h3><div>Signed in from Hoth<span>61 days ago</span></div><div>Shared Patrol rota.xlsx<span>62 days ago</span></div><div>Added to Fleet content by Cal Alder<span>Mar 2025</span></div></div>
        </div></div>
      </div>
'''

def make(name, title, comment, css, main, script, extra="", defs="", toast=""):
    _make(name, title, comment, CSS + css, "People / Users / Zev Senesca", "people", main, script, extra=extra, defs=ICONS + defs, toast=toast)
    bell.add(name, 3)
