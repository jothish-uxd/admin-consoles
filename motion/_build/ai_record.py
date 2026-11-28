import pathlib, re
ROOT = pathlib.Path(__file__).resolve().parent.parent
src = (ROOT / "audit-log-table/scene.html").read_text()
css = src[src.index("/* audit log */"):src.index("</style>")]
defs = src[src.index('<svg width="0"'):src.index("</defs></svg>") + len("</defs></svg>")]
log = src[src.index('      <div class="view alog" id="vLog"'):src.index('        <div class="pager" id="pager">')]
log = log.replace('<div class="view alog" id="vLog" style="opacity:0">', '<div class="view alog" id="vLog">')
# the Action filter gets an id and a menu; the actor chip becomes a source chip; query and meta for AI tool calls
log = log.replace('<span class="fb">Action</span>', '<span class="fb" id="actB" style="position:relative">Action<div class="menu" id="mA" style="left:0;top:38px;width:220px"><div>All actions</div><div id="miAI">AI tool calls</div><div>Admin changes</div><div>Sign-ins</div></div></span>')
log = log.replace('Actor: archive-sync <span class="x">✕</span>', 'Action: AI tool calls <span class="x">✕</span>')
log = log.replace('actor:"archive-sync" time:last_24h', 'action:ai.tool_call time:last_24h')
log = log.replace('<span class="alt" id="m1">Times in <b>Pacific Time (PT)</b> · <b>4 events</b> by archive-sync · 3 failed</span>',
                  '<span class="alt" id="m1">Times in <b>Pacific Time (PT)</b> · <b>38 AI tool calls</b> · 12 people · top tool <b>Find ships</b> · 1 failed · 1 by a shared account</span>')
# the AI rows, shown once filtered
ai_rows = """          <tbody id="tbAI" style="display:none">
            <tr><td>09:42:10</td><td><span class="ac">Wedge Antilles</span><span class="ty">via Holonet Assistant</span></td><td><span class="ev">The AI rerouted Bright Hope to the Ord Mantell route</span><span class="code">fleet_tracker.reroute_ship · write · approved by Wedge</span></td><td class="tgt">Bright Hope · Fleet Tracker</td><td><span class="res"><svg><use href="#ok"/></svg>Success</span></td></tr>
            <tr><td>09:41:52</td><td><span class="ac">Wedge Antilles</span><span class="ty">via Holonet Assistant</span></td><td><span class="ev">The AI found 3 ships on the Hoth route</span><span class="code">fleet_tracker.search_ships · read</span></td><td class="tgt">Fleet Tracker</td><td><span class="res"><svg><use href="#ok"/></svg>Success</span></td></tr>
            <tr id="rSh"><td>09:38:04</td><td><span class="ac">fleet-svc</span><span class="ty">shared · no person</span></td><td><span class="ev">The Ops agent updated Liberty’s manifest</span><span class="code">fleet_tracker.update_manifest · write</span></td><td class="tgt">Liberty · Fleet Tracker</td><td><span class="res"><svg><use href="#ok"/></svg>Success</span></td></tr>
            <tr id="rBl"><td>09:35:40</td><td><span class="ac">Biggs Darklighter</span><span class="ty">via Holonet Assistant</span></td><td><span class="ev">The AI tried to cancel shipment 4471</span><span class="code">fleet_tracker.cancel_shipment · delete</span></td><td class="tgt">Shipment 4471</td><td><span class="res bad"><svg><use href="#no"/></svg>Failed · blocked</span></td></tr>
            <tr id="rAd"><td>09:20:13</td><td><span class="ac">Lavanya Sienna</span><span class="ty">Admin</span></td><td><span class="ev">Lavanya Sienna set Hold shipment to Needs approval</span><span class="code">connector.tool.update</span></td><td class="tgt">Fleet Tracker · connector</td><td><span class="res"><svg><use href="#ok"/></svg>Success</span></td></tr>
            <tr><td>09:02:47</td><td><span class="ac">Lavanya Sienna</span><span class="ty">Admin</span></td><td><span class="ev">Lavanya Sienna gave Rogue One read-only access to Fleet Tracker</span><span class="code">connector.access.add</span></td><td class="tgt">Rogue One · group</td><td><span class="res"><svg><use href="#ok"/></svg>Success</span></td></tr>
            <tr><td>08:57:31</td><td><span class="ac">Toryn Farr</span><span class="ty">via Droid Code</span></td><td><span class="ev">The AI read 4 pages in Supply Depot</span><span class="code">supply_depot.read_page · read</span></td><td class="tgt">Supply Depot</td><td><span class="res"><svg><use href="#ok"/></svg>Success</span></td></tr>
          </tbody>
"""
log = log.replace("          </tbody>\n        </table>", "          </tbody>\n" + ai_rows + "        </table>")
log = log.replace("<tbody>\n            <tr class=\"row\"", "<tbody id=\"tb0\">\n            <tr class=\"row\"", 1)
log = log.replace('<span class="btn sm">Export</span>', '<span class="btn sm" id="expB" style="position:relative">Export<div class="menu" id="mE" style="right:0;top:38px;width:230px"><div>CSV</div><div id="miJ">JSON</div><div>Stream to SIEM <span style="color:var(--faint)">· on</span></div></div></span>')
assert 'id="actB"' in log and 'id="tbAI"' in log and 'id="tb0"' in log and 'id="expB"' in log and 'AI tool calls</b>' in log
html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>AI activity record · motion scene</title>
<!--
  Source for media/mcp-connectors/ai-activity-record.mp4.
  Built on motion/shared (console.css, motion.js) by motion/_build/ai_record.py, which takes the Audit log page from
  audit-log-table/scene.html, so the page is the same pixels as in the audit log clips.

  Follows the AI activity record card (data/guidance-governance.js):
  - way in: the Audit log, where tool calls live with everything else (avoid 2)
  - the Action filter → AI tool calls; chip and query update (do 4)
  - each row names the person and the AI client, says what the AI did as a sentence, with the tool, read / write /
    delete, target and result (think 1, do 1, avoid 1, UD 4, WCAG 1.3.1)
  - a call by a shared account says so (do 2); a failure in words (WCAG 1.4.1); admin changes in the same list (do 3)
  - a summary line: calls, people, top tool, failures (do 5)
  - Export → JSON for the security team's tools (do 4); no secrets or document contents in the rows (avoid 3)
-->
<link rel="stylesheet" href="../shared/console.css">
<style>
{css}.menu {{ position: absolute; z-index: 8; opacity: 0; font-weight: 400; }}
.toast {{ position: absolute; left: 600px; top: 66px; transform: translateX(-50%); background: var(--ink); color: #fff; border-radius: 10px; height: 44px; display: flex; align-items: center; gap: 10px; padding: 0 16px 0 12px; font-size: 13px; opacity: 0; box-shadow: 0 10px 30px rgba(0,0,0,.18); white-space: nowrap; z-index: 20; }}
.toast i {{ width: 18px; height: 18px; border-radius: 50%; background: #fff; color: var(--ink); display: grid; place-items: center; }}
#tbAI tr td {{ height: 50px; }}
#tbAI tr.hl td {{ background: #f6f6f6; }}
</style>
</head>
<body>
{defs}
<div id="stage">
  <div class="win">
    <div class="top">
      <div class="brand"><svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="10" cy="10" r="3" fill="currentColor"/></svg>Echo Base Console</div>
      <span class="crumb" data-path="Compliance / Audit log"></span>
      <div class="me">Lavanya Sienna · Jedi Master <span class="av">LS</span></div>
    </div>
    <div class="nav" data-at="compliance" data-role="admin"></div>
    <div class="main">
{log}        <div class="pager" id="pager"><span>Newest first</span><span class="btn">Next 50 →</span></div>
      </div>
    </div>
    <div class="toast" id="toast"><i><svg width="11" height="11"><use href="#ok"/></svg></i>Exported 38 AI tool calls · audit-log.json · logged</div>
  </div>
</div>

<script src="../shared/motion.js"></script>
<script>
const {{ $, at, span, easeOut }} = Motion;

const T = {{
  actClick: 1.60, mIn: [1.65, 1.85], aiClick: 2.70, filt: [2.75, 3.20],
  expClick: 10.20, eIn: [10.25, 10.45], jClick: 11.20, done: 11.35, toastOut: [13.1, 13.4],
  endCard: [14.0, 14.45], end: 15.5
}};

function build() {{
  const ab = at("actB"), fl = at("flt"), eb = at("expB"), mt = at("meta");
  $("mA").style.opacity = 1; const ai = at("miAI"); $("mA").style.opacity = 0;
  $("mE").style.opacity = 1; const jj = at("miJ"); $("mE").style.opacity = 0;
  $("tb0").style.display = "none"; $("tbAI").style.display = "";
  const sh = at("rSh"), bl = at("rBl"), ad = at("rAd"), tb = at("tbl");
  $("tb0").style.display = ""; $("tbAI").style.display = "none";
  const cur = [
    [0, 900, 620], [0.5, 900, 620], [1.45, ab[0], ab[1] + 3], [1.75, ab[0], ab[1] + 3],
    [2.55, ai[0] - 40, ai[1] + 3], [2.85, ai[0] - 40, ai[1] + 3],
    [4.0, 1000, 600], [9.0, 1004, 604],
    [10.05, eb[0], eb[1] + 3], [10.35, eb[0], eb[1] + 3],
    [11.05, jj[0] - 30, jj[1] + 3], [11.35, jj[0] - 30, jj[1] + 3], [12.8, 1010, 600], [14.0, 1014, 604]
  ];
  const cam = [
    [0, 640, 360, 1], [0.5, 640, 360, 1],
    [1.1, ab[0] + 60, fl[1] + 40, 1.45], [2.9, ab[0] + 60, fl[1] + 40, 1.45],     // Action → AI tool calls
    [3.6, 740, mt[1] + 60, 1.25], [4.9, 740, mt[1] + 60, 1.25],                  // summary, the person and the AI client, what it did
    [5.6, 740, sh[1] - 10, 1.4], [6.9, 740, sh[1] - 10, 1.4],                    // a shared account; a failure in words
    [7.5, 740, Math.min(ad[1] - 10, 430), 1.4], [8.7, 740, Math.min(ad[1] - 10, 430), 1.4],  // admin changes in the same log
    [9.6, eb[0] - 40, eb[1] + 70, 1.45], [11.4, eb[0] - 40, eb[1] + 70, 1.45],  // Export → JSON
    [12.2, 640, 360, 1], [14.0, 640, 360, 1]
  ];
  return {{ cam, cur }};
}}

function render(t) {{
  $("actB").style.background = t >= T.actClick - .05 && t < T.aiClick + .05 ? "var(--hover)" : "";
  $("mA").style.opacity = span(t, ...T.mIn, easeOut) * (t < T.aiClick + .05 ? 1 : 0);
  $("miAI").classList.toggle("hov", t > T.aiClick - .35 && t < T.aiClick + .05);
  const f = span(t, ...T.filt), on = t >= T.aiClick;
  const ch = $("chip");
  ch.style.opacity = f; ch.style.width = on ? "auto" : "0"; ch.style.padding = on ? "0 10px" : "0"; ch.style.borderWidth = on ? "1px" : "0";
  $("q0").textContent = on ? "action:ai.tool_call time:last_24h" : "time:last_24h"; $("q0").style.opacity = on ? f : 1; $("q1").style.display = "none";
  $("m0").style.opacity = 1 - f; $("m1").style.opacity = f;
  $("tb0").style.display = on ? "none" : ""; $("tbAI").style.display = on ? "" : "none";
  $("tbAI").style.opacity = on ? f : 1;
  $("rSh").classList.toggle("hl", t > 5.6 && t < 6.3);
  $("rBl").classList.toggle("hl", t > 6.3 && t < 7.0);
  $("rAd").classList.toggle("hl", t > 7.5 && t < 8.7);
  $("expB").style.background = t >= T.expClick - .05 && t < T.jClick + .05 ? "var(--hover)" : "";
  $("mE").style.opacity = span(t, ...T.eIn, easeOut) * (t < T.jClick + .05 ? 1 : 0);
  $("miJ").classList.toggle("hov", t > T.jClick - .35 && t < T.jClick + .05);
  const to = span(t, T.done, T.done + .25, easeOut) * (1 - span(t, ...T.toastOut));
  $("toast").style.opacity = to; $("toast").style.transform = `translateX(-50%) translateY(${{(1 - to) * -8}}px)`;
}}

function events() {{
  return [["click", T.actClick], ["click", T.aiClick], ["whoosh", T.filt[0] + .1], ["click", T.expClick], ["click", T.jClick], ["chime", T.done]];
}}

Motion.scene({{
  T, duration: 15, clicks: [T.actClick, T.aiClick, T.expClick, T.jClick], clamp: 140, build, render, events,
  slow: [[3.4, 4.9, 1.8], [5.6, 7.0, 1.9], [7.5, 8.7, 1.8]]
}});
</script>
</body>
</html>
"""
d = ROOT / "ai-activity-record"; d.mkdir(exist_ok=True); (d / "scene.html").write_text(html)
print("ok")
