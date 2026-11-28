"""Settings › Organization, shared by the Type-to-confirm and Danger zone clips so the page is the same pixels.
Usage: from settings_org import make; make(name, title, comment, css, extra, script)."""
import pathlib
ROOT = pathlib.Path(__file__).resolve().parent.parent
PAGE_CSS = r"""
.btn.sm { height: 32px; font-size: 12.5px; }
.sec { margin-top: 16px; width: 860px; border: 1px solid var(--rule); border-radius: 12px; padding: 14px 18px 16px; }
.sec h2 { margin: 0; font-size: 14px; color: var(--ink); font-weight: 600; display: flex; align-items: center; gap: 8px; }
.sec h2 .sp { flex: 1; }
.sec .kv { grid-template-columns: repeat(3, minmax(0, 1fr)); margin-top: 12px; }
.dz { margin-top: 18px; width: 860px; border: 1.5px solid #b91c1c; border-radius: 12px; overflow: hidden; }
.dz .h { padding: 12px 18px; display: flex; align-items: baseline; gap: 10px; border-bottom: 1px solid var(--rule); }
.dz .h b { font-size: 14px; color: #b91c1c; font-weight: 600; }
.dz .h span { font-size: 12px; color: var(--soft); }
.dz .row { display: flex; align-items: center; gap: 24px; padding: 12px 18px; border-bottom: 1px solid var(--rule); }
.dz .row:last-child { border-bottom: 0; }
.dz .row .tx { flex: 1; font-size: 12.5px; color: var(--soft); line-height: 1.45; }
.dz .row .tx b { display: block; font-size: 13.5px; color: var(--ink); font-weight: 600; margin-bottom: 2px; }
.dz .row .btn { width: 168px; flex: none; }
.ss { margin-left: auto; width: 300px; height: 34px; border: 1.5px solid var(--rule-strong); border-radius: 8px; display: flex; align-items: center; gap: 8px; padding: 0 10px; font-size: 13px; color: var(--faint); box-sizing: border-box; }
.ss svg { width: 14px; height: 14px; color: var(--soft); flex: none; }
.ss .kb { margin-left: auto; font: 11px "Geist Mono", monospace; color: var(--soft); border: 1px solid var(--rule-strong); border-radius: 5px; padding: 1px 5px; }
.ss .c { width: 1.5px; height: 16px; background: var(--ink); margin-left: -7px; display: none; }
.ss.f { border-color: var(--ink); color: var(--ink); box-shadow: 0 0 0 3px rgba(23,23,23,.08); }
.btn.dgr { color: #b91c1c; border-color: #b91c1c; font-weight: 500; }
"""
PAGE = r"""<div id="stage">
  <div class="win">
    <div class="top">
      <div class="brand"><svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="10" cy="10" r="3" fill="currentColor"/></svg>Echo Base Console</div>
      <span class="crumb" data-path="Settings / Organization"></span>
      <div class="me">Lavanya Sienna · Jedi Master <span class="av">LS</span></div>
__TOAST__
    </div>
    <div class="nav" data-at="settings" data-role="admin"></div>
    <div class="main">
      <div class="view">
        <div class="hd"><h1>Settings</h1><span class="ss" id="ss"><svg aria-hidden="true" viewBox="0 0 16 16"><circle cx="7" cy="7" r="4.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M10.5 10.5L14 14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg><span id="ssT">Search settings</span><span class="c" id="ssC"></span><span class="kb">⌘K</span></span></div>
        <div class="tabs page"><div class="on">Organization</div><div>Defaults</div><div>Integrations</div><div>API keys</div><div>Webhooks</div><div>Notifications</div><div>Announcements</div></div>
        <div class="sec" id="prof"><h2>Organization profile<span class="sp"></span><span class="btn sm">Edit</span></h2>
          <dl class="kv"><div><dt>Name</dt><dd>Echo Base</dd></div><div><dt>Domain</dt><dd>echobase.rebellion</dd></div><div><dt>Time zone</dt><dd>Hoth Standard (UTC−5)</dd></div>
            <div><dt>Owner</dt><dd>Lavanya Sienna</dd></div><div><dt>Plan</dt><dd>Enterprise · 412 seats</dd></div><div><dt>Data region</dt><dd>Outer Rim · Hoth</dd></div></dl></div>
        <div class="dz" id="dz">
          <div class="h"><b>Irreversible actions</b><span>Only owners see this section</span></div>
          <div class="row" id="rReset"><div class="tx"><b>Reset all public links</b>Every public link stops working right away. File owners are told by email.</div><span class="btn dgr" id="bReset">Reset public links</span></div>
          <div class="row" id="rTransfer"><div class="tx"><b>Transfer ownership</b>Someone else becomes the owner. You stay an admin.</div><span class="btn dgr" id="bTransfer">Transfer ownership</span></div>
          <div class="row" id="rSandbox"><div class="tx"><b>Delete sandbox</b>Echo Base Sandbox and everything in it is deleted. Asks you to type its name.</div><span class="btn dgr" id="bSandbox">Delete sandbox</span></div>
          <div class="row" id="rOrg"><div class="tx"><b>Delete organization</b>Every person, file and setting is deleted after 30 days. Asks you to type its name.</div><span class="btn dgr" id="bOrg">Delete organization</span></div>
        </div>
      </div>
    </div>
__EXTRA__
  </div>
</div>"""
HEAD = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>__TITLE__ · motion scene</title>
<!--
__COMMENT__
  Built on motion/shared (console.css, motion.js): see motion.js for how a scene is put together.
  Open this file in a browser and add ?play to watch it live.
-->
<link rel="stylesheet" href="../shared/console.css">
<style>"""
DEFS = """<svg width="0" height="0" style="position:absolute"><defs>
  <symbol id="ok" viewBox="0 0 16 16"><path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></symbol>
  <symbol id="copy" viewBox="0 0 16 16"><rect x="5.5" y="5.5" width="8" height="8" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M10.5 3.5v-.5A1 1 0 0 0 9.5 2h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h.5" fill="none" stroke="currentColor" stroke-width="1.4"/></symbol>
</defs></svg>"""
def make(name, title, comment, css, extra, toast, script):
    s = (HEAD.replace("__TITLE__", title).replace("__COMMENT__", comment) + PAGE_CSS + css + "\n</style>\n</head>\n<body>\n" + DEFS + "\n"
         + PAGE.replace("__TOAST__", toast).replace("__EXTRA__", extra)
         + '\n<script src="../shared/motion.js"></script>\n<script>\n' + script + "\n</script>\n</body>\n</html>\n")
    d = ROOT / name; d.mkdir(exist_ok=True); (d / "scene.html").write_text(s)
    return s
