import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from fleet_page import make
comment = """  Source for media/mcp-connectors/who-gets-each-connector.mp4.
  Built on motion/shared (console.css, connectors.css, motion.js) by motion/_build/access.py, which reuses the
  Fleet Tracker page from choosing-tools so the header, tabs and Overview are the same pixels in every clip.

  Follows the Who gets each connector card (data/guidance-governance.js):
  - way in: the published connector's Access tab; a pilot with one team (think 2, avoid 1)
  - groups, roles and a person exception, each with how they got it (do 1, do 3, WCAG 1.3.1, UD 3)
  - add a group and narrow its tools to read only, with visible Add and Cancel (do 2)
  - the person exception says it overrides the group, so it's clear which wins (avoid 3)
  - the change announced in words (WCAG 4.1.3)
  - what people without it see, and who to ask (do 4, avoid 2)"""
css = """/* Access tab */
.pilot { margin-top: 10px; }
.tbar { margin-top: 14px; display: flex; align-items: center; gap: 10px; position: relative; }
.tbar .t { font-size: 14px; font-weight: 600; }
.tbar .sp { margin-left: auto; position: relative; }
#at { margin-top: 8px; font-size: 13px; table-layout: fixed; }
#at td { height: 50px; }
#at td .s { display: block; font-size: 12px; color: var(--faint); margin-top: 2px; }
#at td .ov { display: block; font-size: 12px; color: var(--ink); margin-top: 2px; font-weight: 500; }
#at tr.new td { background: #f6f6f6; }
.dd { display: inline-flex; align-items: center; justify-content: space-between; gap: 8px; height: 30px; min-width: 190px; padding: 0 12px 0 10px; border: 1.5px solid var(--rule-strong); border-radius: 7px; background: var(--bg); font-size: 12.5px; color: var(--ink); }
.dd.on { border-color: var(--ink); }
.menu { position: absolute; z-index: 6; opacity: 0; }
.menu > div { display: flex; justify-content: space-between; gap: 16px; }
.menu .n { font-family: "Geist Mono", monospace; font-size: 11px; color: var(--faint); }
.menu .d { display: block; font-size: 11.5px; color: var(--soft); }
.seen { margin-top: 12px; }"""
section = """        <div id="acc" style="display:none">
          <div class="info" id="info"><span>Who can connect Fleet Tracker. <b>People outside these don’t see it in their AI.</b></span></div>
          <div class="note pilot"><span class="ic">i</span><span><b>Pilot · Logistics only since Nov 23.</b> 18 of 24 people have connected. Widen it when the pilot is done.</span></div>
          <div class="tbar"><span class="t">Who has it</span><span class="sp"><span class="btn sm" id="addG">+ Add group</span>
            <div class="menu" id="mG" style="right:0;top:36px;width:240px"><div id="giR">Rogue One <span class="n">8</span></div><div>Base Engineering <span class="n">31</span></div><div>Intelligence <span class="n">12</span></div><div>Command Staff <span class="n">9</span></div></div></span></div>
          <table id="at"><colgroup><col style="width:250px"><col style="width:200px"><col><col style="width:150px"></colgroup>
            <thead><tr><th>Who</th><th>How</th><th>Tools</th><th></th></tr></thead>
            <tbody>
              <tr><td>Logistics<span class="s">24 people</span></td><td>Group</td><td>Same as connector<span class="s">Read allowed · write needs approval</span></td><td class="act"><span class="btn sm ghost">Remove</span></td></tr>
              <tr><td>Base Ops leads<span class="s">6 people</span></td><td>Role</td><td>Same as connector<span class="s">Read allowed · write needs approval</span></td><td class="act"><span class="btn sm ghost">Remove</span></td></tr>
              <tr><td>Biggs Darklighter<span class="s">Rogue One</span></td><td>Person<span class="ov" id="ovB" style="opacity:0">Overrides Rogue One</span></td><td>Same as connector<span class="s">Read allowed · write needs approval</span></td><td class="act"><span class="btn sm ghost">Remove</span></td></tr>
              <tr id="rowR" style="display:none"><td>Rogue One<span class="s">8 people</span></td><td>Group</td>
                <td><span id="rEd" style="position:relative;display:inline-block"><span class="dd" id="ddT"><span id="ddV">Same as connector</span><i class="cv"></i></span>
                  <div class="menu" id="mT" style="left:0;bottom:36px;width:240px"><div>Same as connector</div><div id="tiRO"><span>Read only<span class="d">Find ships, Get manifest, List routes</span></span></div><div>Choose tools…</div></div></span>
                  <span id="rDone" style="display:none">Read only<span class="s">Find ships, Get manifest, List routes</span></span></td>
                <td class="act"><span id="rBtns" style="display:inline-flex;gap:6px"><span class="btn sm ghost">Cancel</span><span class="btn sm pri" id="addR">Add</span></span><span id="rRem" style="display:none" class="btn sm ghost">Remove</span></td></tr>
            </tbody>
          </table>
          <div class="note seen"><span class="ic">i</span><span>Everyone else sees: <b>“Fleet Tracker isn’t on for you. Ask Lavanya Sienna.”</b></span></div>
        </div>"""
toast = """    <div class="toast" id="toast"><i><svg width="11" height="11"><use href="#tick"/></svg></i>Fleet Tracker now available to Rogue One · read only · logged</div>"""
script = r"""const { $, at, span, easeOut } = Motion;

const T = {
  tabClick: 1.90, toA: [2.0, 2.3],
  addClick: 4.70, mGIn: [4.75, 4.95], rClick: 5.80, rowIn: [5.85, 6.10],
  ddClick: 7.20, mTIn: [7.25, 7.45], roClick: 8.30, okClick: 9.60, added: 9.75, toastOut: [11.6, 11.9],
  endCard: [12.7, 13.15], end: 14.2
};

function build() {
  const tb = at("tbA");
  $("ovw").style.display = "none"; $("acc").style.display = "";
  const ag = at("addG"), tbl = at("at"), inf = at("info");
  $("mG").style.opacity = 1; const gr = at("giR"); $("mG").style.opacity = 0;
  $("rowR").style.display = "";
  const dd = at("ddT"), ad = at("addR"), rr = at("rowR");
  $("mT").style.opacity = 1; const ro = at("tiRO"); $("mT").style.opacity = 0;
  $("rowR").style.display = "none";
  $("ovw").style.display = ""; $("acc").style.display = "none";
  const cur = [
    [0, 900, 600], [0.5, 900, 600], [1.75, tb[0], tb[1] + 3], [2.05, tb[0], tb[1] + 3],
    [3.6, ag[0] - 160, ag[1] + 70], [4.55, ag[0], ag[1] + 3], [4.85, ag[0], ag[1] + 3],
    [5.65, gr[0] - 40, gr[1] + 3], [5.95, gr[0] - 40, gr[1] + 3],
    [7.05, dd[0], dd[1] + 3], [7.35, dd[0], dd[1] + 3],
    [8.15, ro[0] - 30, ro[1] - 4], [8.45, ro[0] - 30, ro[1] - 4],
    [9.45, ad[0], ad[1] + 3], [9.75, ad[0], ad[1] + 3], [11.3, 1010, 560], [12.7, 1014, 566]
  ];
  const cam = [
    [0, 700, 372, 1.04], [0.6, 700, 372, 1.04],                                // the published page, as the other clips end
    [1.5, 640, 220, 1.4], [2.1, 640, 220, 1.4],                                 // the Access tab
    [2.9, 740, Math.min(tbl[1] - 20, 405), 1.22], [4.3, 740, Math.min(tbl[1] - 20, 405), 1.22],  // pilot, groups, a role, a person
    [4.6, 860, ag[1] + 90, 1.32], [6.0, 860, ag[1] + 90, 1.32],              // + Add group → Rogue One
    [6.6, 740, Math.min(rr[1] - 60, 405), 1.22], [9.8, 740, Math.min(rr[1] - 60, 405), 1.22],  // narrow its tools to read only; Add
    [10.4, 700, 360, 1.04], [11.9, 700, 360, 1.04], [12.7, 660, 360, 1.02]    // the override, the toast, what others see
  ];
  return { cam, cur };
}

function render(t) {
  const a = t >= T.toA[0];
  $("ovw").style.display = a ? "none" : ""; $("acc").style.display = a ? "" : "none";
  $("acc").style.opacity = span(t, ...T.toA);
  $("tbO").classList.toggle("on", !a); $("tbA").classList.toggle("on", a);

  $("addG").style.background = t >= T.addClick - .05 && t < T.rClick ? "#f2f2f2" : "";
  $("mG").style.opacity = span(t, ...T.mGIn, easeOut) * (t < T.rClick + .05 ? 1 : 0);
  $("giR").classList.toggle("hov", t > T.rClick - .35 && t < T.rClick + .05);
  const row = t >= T.rClick;
  $("rowR").style.display = row ? "" : "none";
  $("rowR").classList.toggle("new", row && t < T.added + .9);
  $("rowR").style.opacity = span(t, ...T.rowIn);
  $("ddT").classList.toggle("on", t >= T.ddClick && t < T.roClick + .05);
  $("mT").style.opacity = span(t, ...T.mTIn, easeOut) * (t < T.roClick + .05 ? 1 : 0);
  $("tiRO").classList.toggle("hov", t > T.roClick - .35 && t < T.roClick + .05);
  $("ddV").textContent = t >= T.roClick ? "Read only" : "Same as connector";
  $("addR").style.background = t >= T.okClick - .05 && t < T.added + .1 ? "#333" : "";
  const added = t >= T.added;
  $("rEd").style.display = added ? "none" : "inline-block"; $("rDone").style.display = added ? "" : "none";
  $("rBtns").style.display = added ? "none" : "inline-flex"; $("rRem").style.display = added ? "" : "none";
  $("ovB").style.opacity = span(t, T.added, T.added + .3);
  const to = span(t, T.added, T.added + .25, easeOut) * (1 - span(t, ...T.toastOut));
  $("toast").style.opacity = to; $("toast").style.transform = `translateX(-50%) translateY(${(1 - to) * -8}px)`;
}

function events() {
  return [["click", T.tabClick], ["click", T.addClick], ["click", T.rClick], ["click", T.ddClick], ["click", T.roClick], ["click", T.okClick], ["chime", T.added]];
}

Motion.scene({
  T, duration: 15, clicks: [T.tabClick, T.addClick, T.rClick, T.ddClick, T.roClick, T.okClick], clamp: 140, build, render, events,
  slow: [[2.6, 4.3, 1.7], [10.0, 11.4, 1.7]]
});"""
make("who-gets-each-connector", "Who gets each connector", comment, css, section, toast, script)
print("ok")
