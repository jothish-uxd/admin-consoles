import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from fleet_page import make
comment = """  Source for media/mcp-connectors/data-leaving-the-org.mp4.
  Built on motion/shared (console.css, connectors.css, motion.js) by motion/_build/data_tab.py, which reuses the
  Fleet Tracker page from choosing-tools so the header, tabs and Overview are the same pixels in every clip.

  Follows the Data leaving the org card (data/guidance-governance.js):
  - way in: the published connector's Data tab; what goes out, where, and whose rules (think 1, WCAG 3.3.2, UD 3)
  - where it runs, what it sends, how long the provider keeps it (do 1)
  - where data residency stops, and that Echo Base's AI policy doesn't cover the provider (do 4, do 5, avoid 1)
  - only what the tool asks for (avoid 3)
  - sensitivity labels never sent; adding Restricted from the shared menu, saved (do 2, WCAG 4.1.3)
  - the other direction: outside AI tools that can reach Echo Base, by name, domain and access; API tokens off
    because they'd skip the list (think 2, do 3, avoid 2, WCAG 1.3.1)"""
css = """/* Data tab */
.dg { margin-top: 12px; display: grid; grid-template-columns: minmax(0, 1fr) 400px; gap: 18px; align-items: start; }
.dg .kv { margin-top: 8px; }
.dg .note { margin-top: 10px; }
.lb { margin-top: 12px; position: relative; }
.lb .row { display: flex; align-items: center; gap: 10px; padding: 9px 0; border-top: 1px solid var(--rule); font-size: 13px; }
.lb .row:first-of-type { margin-top: 6px; }
.lb .row .l { flex: 1; }
.lb .row .l .s { display: block; font-size: 12px; color: var(--soft); margin-top: 1px; }
.lb .chips { display: flex; gap: 6px; align-items: center; flex-wrap: wrap; }
.lb .chips .c { display: inline-flex; align-items: center; height: 26px; padding: 0 10px; border-radius: 999px; background: var(--ink); color: #fff; font-size: 12px; }
.lb .sw { width: 34px; height: 20px; border-radius: 999px; background: var(--ink); position: relative; flex: none; }
.lb .sw::after { content: ""; position: absolute; right: 3px; top: 3px; width: 14px; height: 14px; border-radius: 50%; background: #fff; }
.menu { position: absolute; z-index: 6; opacity: 0; }
.ot table { margin-top: 6px; font-size: 13px; }
.ot td { height: 38px; }
.ot td .s { display: block; font-size: 11.5px; color: var(--faint); font-family: "Geist Mono", monospace; }
.ot .tk { margin-top: 10px; font-size: 12.5px; color: var(--soft); line-height: 1.45; }
.ot .tk b { color: var(--ink); font-weight: 600; }"""
section = """        <div id="dat" style="display:none">
          <div class="info" id="info"><span>What Fleet Tracker sends out, where it goes, and <b>whose rules apply once it’s there.</b></span>
            <span class="sp" id="bar" style="opacity:0"><span class="chg">1 change</span><span class="btn sm ghost">Cancel</span><span class="btn sm pri" id="saveB">Save</span></span></div>
          <div class="dg">
            <div>
              <div class="card" id="wd"><h2>Where data goes</h2>
                <dl class="kv">
                  <div><dt>Runs on</dt><dd>Kessel Logistics servers · Outer Rim</dd></div>
                  <div><dt>Kept by Kessel Logistics</dt><dd>30 days, under their terms</dd></div>
                  <div class="w"><dt>Sends</dt><dd>The AI’s question, and the ships, routes or manifests it asks about</dd></div>
                </dl>
                <div class="note" id="res"><span class="ic">i</span><span><b>Your AI region, Core Worlds, doesn’t move Fleet Tracker.</b> Echo Base’s AI data policy stops here: once data reaches Kessel Logistics, their retention and privacy rules apply.</span></div></div>
              <div class="card lb" id="lb"><h2>What can be sent</h2>
                <div class="row"><span class="l">Only what the tool asks for<span class="s">Fields the tool needs, not whole documents</span></span><span class="sw"></span></div>
                <div class="row"><span class="l">Never sent to Fleet Tracker<span class="s">Content with these labels</span></span>
                  <span class="chips"><span class="c">Confidential</span><span class="c" id="cR" style="display:none">Restricted</span><span class="btn sm" id="addL">+ Add label</span></span></div>
                <div class="menu" id="mL" style="right:18px;bottom:52px;width:200px"><div id="liR">Restricted</div><div>Mission plans</div><div>Personnel</div></div>
              </div>
            </div>
            <div class="card ot" id="ot"><h2>Outside AI tools that can reach Echo Base</h2><div class="sub">Through Echo Base’s own MCP server</div>
              <table><thead><tr><th>Tool</th><th>Can</th></tr></thead><tbody>
                <tr><td>Holonet Assistant<span class="s">assistant.holonet.ai</span></td><td>Read and write</td></tr>
                <tr><td>Droid Code<span class="s">droidcode.dev</span></td><td>Read</td></tr>
                <tr><td>Astromech CLI<span class="s">r2.astromech.io</span></td><td>Read</td></tr>
              </tbody></table>
              <div class="tk"><b>API tokens: off.</b> Token connections would skip this list, so they stay off.</div></div>
          </div>
        </div>"""
toast = """    <div class="toast" id="toast"><i><svg width="11" height="11"><use href="#tick"/></svg></i>Restricted content won’t be sent to Fleet Tracker · logged</div>"""
script = r"""const { $, at, span, easeOut } = Motion;

const T = {
  tabClick: 1.90, toD: [2.0, 2.3],
  addClick: 7.20, mIn: [7.25, 7.45], rClick: 8.30, saveClick: 9.70, saved: 9.90, toastOut: [11.6, 11.9],
  endCard: [13.6, 14.05], end: 15.1
};

function build() {
  const tb = at("tbD");
  $("ovw").style.display = "none"; $("dat").style.display = "";
  const wd = at("wd"), rs = at("res"), lb = at("lb"), al = at("addL"), sv = at("saveB"), ot = at("ot"), inf = at("info");
  $("mL").style.opacity = 1; const lr = at("liR"); $("mL").style.opacity = 0;
  $("ovw").style.display = ""; $("dat").style.display = "none";
  const cur = [
    [0, 900, 600], [0.5, 900, 600], [1.75, tb[0], tb[1] + 3], [2.05, tb[0], tb[1] + 3],
    [5.8, al[0] - 160, al[1] + 60], [7.05, al[0], al[1] + 3], [7.35, al[0], al[1] + 3],
    [8.15, lr[0] - 40, lr[1] + 3], [8.45, lr[0] - 40, lr[1] + 3],
    [9.55, sv[0], sv[1] + 3], [9.85, sv[0], sv[1] + 3], [11.2, 1010, 600], [13.6, 1014, 606]
  ];
  const cam = [
    [0, 700, 372, 1.04], [0.6, 700, 372, 1.04],                                // the published page, as the other clips end
    [1.5, 640, 220, 1.4], [2.1, 640, 220, 1.4],                                 // the Data tab
    [2.9, wd[0] + 40, wd[1], 1.45], [4.3, wd[0] + 40, wd[1], 1.45],          // where it runs, what it sends, how long it's kept
    [4.9, wd[0] + 40, rs[1] - 10, 1.45], [5.9, wd[0] + 40, rs[1] - 10, 1.45], // where residency and the AI policy stop
    [6.6, lb[0] + 40, Math.min(lb[1] - 10, 472), 1.35], [9.0, lb[0] + 40, Math.min(lb[1] - 10, 472), 1.35],  // only what it needs; never send Restricted
    [9.5, 940, inf[1] + 50, 1.4], [10.0, 940, inf[1] + 50, 1.4],              // Save
    [10.8, ot[0], ot[1] + 10, 1.45], [12.6, ot[0], ot[1] + 10, 1.45],         // outside AI tools reaching in; API tokens off
    [13.2, 700, 360, 1.04], [13.6, 660, 360, 1.02]
  ];
  return { cam, cur };
}

function render(t) {
  const d = t >= T.toD[0];
  $("ovw").style.display = d ? "none" : ""; $("dat").style.display = d ? "" : "none";
  $("dat").style.opacity = span(t, ...T.toD);
  $("tbO").classList.toggle("on", !d); $("tbD").classList.toggle("on", d);
  $("addL").style.background = t >= T.addClick - .05 && t < T.rClick ? "#f2f2f2" : "";
  $("mL").style.opacity = span(t, ...T.mIn, easeOut) * (t < T.rClick + .05 ? 1 : 0);
  $("liR").classList.toggle("hov", t > T.rClick - .35 && t < T.rClick + .05);
  const picked = t >= T.rClick, saved = t >= T.saved;
  $("cR").style.display = picked ? "" : "none";
  $("bar").style.opacity = picked && !saved ? 1 : 0;
  $("saveB").style.background = t >= T.saveClick - .05 && t < T.saved + .1 ? "#333" : "";
  const to = span(t, T.saved, T.saved + .25, easeOut) * (1 - span(t, ...T.toastOut));
  $("toast").style.opacity = to; $("toast").style.transform = `translateX(-50%) translateY(${(1 - to) * -8}px)`;
}

function events() {
  return [["click", T.tabClick], ["click", T.addClick], ["click", T.rClick], ["click", T.saveClick], ["chime", T.saved]];
}

Motion.scene({
  T, duration: 15, clicks: [T.tabClick, T.addClick, T.rClick, T.saveClick], clamp: 140, build, render, events,
  slow: [[2.8, 4.3, 1.8], [4.9, 5.9, 1.8], [6.6, 7.0, 1.4], [10.8, 12.6, 1.8]]
});"""
make("data-leaving-the-org", "Data leaving the org", comment, css, section, toast, script)
print("ok")
