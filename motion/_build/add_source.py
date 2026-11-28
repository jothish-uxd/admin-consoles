import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from sources_page import make, head, LIST

CSS = r"""
.stp { display: flex; gap: 8px; align-items: center; margin-top: 10px; font-size: 12px; color: var(--soft); }
.stp .s { display: inline-flex; gap: 6px; align-items: center; white-space: nowrap; }
.stp .s .n { width: 18px; height: 18px; border-radius: 50%; border: 1.5px solid var(--rule-strong); display: grid; place-items: center; font-size: 10.5px; font-weight: 600; box-sizing: border-box; }
.stp .s.on { color: var(--ink); font-weight: 600; } .stp .s.on .n { border-color: var(--ink); }
.stp .s.dn { color: var(--ink); } .stp .s.dn .n { background: var(--ink); border-color: var(--ink); color: #fff; }
.stp .s.dn .n svg { width: 9px; height: 9px; }
.stp .ln { flex: 1; height: 1.5px; background: var(--rule); }
.pane { display: none; margin-top: 12px; }
.pick { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.pk { border: 1px solid var(--rule); border-radius: 10px; padding: 9px 11px; display: flex; gap: 10px; align-items: center; font-size: 12px; }
.pk b { display: block; color: var(--ink); font-size: 13px; font-weight: 500; }
.pk.hov { border-color: var(--ink); background: var(--subtle); }
.opts { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 4px; }
.opt { border: 1px solid var(--rule); border-radius: 9px; padding: 8px 11px; display: flex; gap: 9px; font-size: 12px; }
.opt b { display: block; color: var(--ink); font-weight: 500; font-size: 12.5px; }
.opt .rd { width: 14px; height: 14px; border-radius: 50%; border: 1.5px solid var(--rule-strong); flex: none; margin-top: 2px; position: relative; box-sizing: border-box; }
.opt.on { border-color: var(--ink); } .opt.on .rd { border-color: var(--ink); }
.opt.on .rd::after { content: ""; position: absolute; inset: 2px; border-radius: 50%; background: var(--ink); }
.fl { margin-top: 6px; border: 1px solid var(--rule); border-radius: 10px; }
.fl > div { display: flex; gap: 10px; align-items: center; height: 32px; padding: 0 11px; border-top: 1px solid var(--rule); font-size: 12.5px; color: var(--ink); }
.fl > div:first-child { border-top: 0; }
.fl .c { margin-left: auto; color: var(--soft); font-size: 12px; }
.est { margin-top: 8px; font-size: 12.5px; color: var(--soft); }
.est b { color: var(--ink); font-weight: 600; }
.lb2 { margin-top: 12px; font-size: 12.5px; color: var(--ink); font-weight: 600; }
.lb2:first-child { margin-top: 0; }
.dlg .kv { grid-template-columns: 1fr 1fr; margin-top: 4px; }
.idx { display: inline-flex; gap: 6px; align-items: center; color: var(--ink); white-space: nowrap; }
.idx .s { color: var(--soft); }
.pbar { width: 60px; height: 5px; border-radius: 999px; background: var(--hover); overflow: hidden; }
.pbar i { display: block; height: 100%; width: 100%; background: var(--ink); transform-origin: left; }
#r-new { display: none; }
"""
OK = '<svg aria-hidden="true"><use href="#ok"/></svg>'
NO = '<svg aria-hidden="true"><use href="#nope"/></svg>'
NEW = ('<tr id="r-new" class="nw"><td class="nm"><b>Holonet Drive</b><span>Drive · 2 folders</span></td><td id="nI">740</td><td>0</td><td>Not yet</td>'
       '<td><span class="idx"><span class="pbar"><i id="nB"></i></span><span id="nP">Indexing · 4%</span> <span class="s">· not searchable yet</span></span></td></tr>')
MAIN = f'''      <div class="view">
{head("sources", '<span class="btn sm pri" id="bAdd">Add source</span>')}{LIST(("arch", "wiki", "comm"), NEW)}      </div>'''
def step(i, n, cls):
    return f'<span class="s {cls}" id="st{i}"><span class="n">{i}</span>{n}</span>'
EXTRA = f'''    <div class="scr" id="scr"></div>
    <section class="dlg" id="dlg" role="dialog" aria-labelledby="aT" style="left:300px; top:50px; width:600px">
      <h3 id="aT">Add a content source</h3>
      <div class="stp">{step(1, "Source", "on")}<span class="ln"></span>{step(2, "What to include", "")}<span class="ln"></span>{step(3, "Review", "")}</div>
      <div class="pane" id="p1" style="display:block"><div class="pick">
        <div class="pk" id="pkD"><span class="lg">HD</span><div><b>Holonet Drive</b>Files and folders</div></div>
        <div class="pk"><span class="lg">TD</span><div><b>Ticket Desk</b>Support tickets</div></div>
        <div class="pk"><span class="lg">CW</span><div><b>Coruscant Wiki</b>Connected · 4 spaces</div></div>
        <div class="pk"><span class="lg">HC</span><div><b>HoloComms</b>Connected · 12 channels</div></div></div></div>
      <div class="pane" id="p2">
        <div class="lb2">What Holonet Drive needs</div>
        <div class="can">{OK}Read files and folders you choose</div>
        <div class="can">{OK}Read who each file is shared with, so results respect it</div>
        <div class="can no">{NO}Can’t change, move or delete anything</div>
        <div class="lb2">What to include</div>
        <div class="opts"><div class="opt on"><span class="rd"></span><div><b>Selected folders</b>Recommended: start narrow</div></div><div class="opt"><span class="rd"></span><div><b>Everything</b>All 1.2M items in the drive</div></div></div>
        <div class="fl"><div><span class="cb" id="fA"></span>Fleet manuals<span class="c">9,800 items</span></div><div><span class="cb" id="fB"></span>Hangar procedures<span class="c">8,600 items</span></div>
          <div><span class="cb"></span>HR cases<span class="c">1,240 items</span></div><div><span class="cb"></span>Finance<span class="c">22,100 items</span></div></div>
        <div class="est" id="est" aria-live="polite">Choose at least one folder</div>
        <div class="ft"><span class="btn">Back</span><span class="sp"></span><span class="btn pri" id="bCo">Continue</span></div></div>
      <div class="pane" id="p3">
        <dl class="kv"><div><dt>Source</dt><dd>Holonet Drive</dd></div><div><dt>Includes</dt><dd>Fleet manuals, Hangar procedures</dd></div>
          <div><dt>About</dt><dd>18,400 items · first index about 3 hours</dd></div><div><dt>Who can find it</dt><dd>Only people who can open it in Holonet Drive</dd></div>
          <div class="w"><dt>Searchable</dt><dd>After the first permission sync. Until then, nothing from it shows in search or AI answers.</dd></div></dl>
        <div class="ft"><span class="btn">Back</span><span class="sp"></span><span class="btn pri" id="bGo">Start indexing</span></div></div>
    </section>'''
TOAST = '      <div class="toast" id="toast"><i><svg width="11" height="11"><use href="#ok"/></svg></i>Indexing Holonet Drive · searchable after the first permission sync</div>'
SCRIPT = r"""const { $, at, span, easeOut } = Motion;

/* ---------- timeline (scene seconds) ---------- */
const T = {
  addClick: 0.95, open: [1.00, 1.30], dClick: 2.00, s2: 2.10, aClick: 3.40, bClick: 4.00, coClick: 4.80, s3: 4.90,
  goClick: 6.10, close: [6.20, 6.45], toast: [6.50, 7.90], run: [6.45, 8.10], endCard: [8.10, 8.55], end: 9.1
};
const OKI = '<svg width="9" height="9"><use href="#ok"/></svg>';

function ctr() { const d = $("dlg"); d.style.top = Math.round(340 - d.offsetHeight / 2) + "px"; }  // centred in the window, whatever step it shows
function build() {
  const ad = at("bAdd");
  $("dlg").style.opacity = 1; ctr(); const dv = at("pkD", -60, 0);
  $("p1").style.display = "none"; $("p2").style.display = "block"; ctr(); const a = at("fA"), b = at("fB"), co = at("bCo");
  $("p2").style.display = "none"; $("p3").style.display = "block"; ctr(); const go = at("bGo");
  $("p3").style.display = ""; $("p1").style.display = "block"; ctr(); $("dlg").style.opacity = 0;
  const cur = [
    [0.00, 960, 640], [0.25, 960, 640], [0.75, ad[0], ad[1] + 3], [1.00, ad[0], ad[1] + 3],
    [1.75, dv[0], dv[1] + 3], [2.05, dv[0], dv[1] + 3], [3.15, a[0], a[1] + 3], [3.45, a[0], a[1] + 3], [3.75, b[0], b[1] + 3], [4.05, b[0], b[1] + 3],
    [4.55, co[0], co[1] + 3], [4.85, co[0], co[1] + 3], [5.85, go[0], go[1] + 3], [6.15, go[0], go[1] + 3], [8.10, go[0] - 160, go[1] + 80]
  ];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 360, 1.06], [7.85, 650, 360, 1.06], [8.10, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  $("crumb").innerHTML = "/ Content / <b>Sources</b>";
  $("bAdd").classList.toggle("dn", t >= T.addClick - .05 && t < T.open[0] + .15);
  const o = span(t, ...T.open, easeOut) * (1 - span(t, ...T.close, easeOut));
  $("dlg").style.opacity = o; $("scr").style.opacity = o; $("dlg").style.transform = `translateY(${8 * (1 - o)}px)`;
  $("dlg").style.visibility = o > 0 ? "visible" : "hidden";
  // one step at a time
  const step = t >= T.s3 ? 3 : t >= T.s2 ? 2 : 1;
  [1, 2, 3].forEach(i => { $("p" + i).style.display = i === step ? "block" : "none";
    const s = $("st" + i); s.className = "s " + (i < step ? "dn" : i === step ? "on" : ""); s.querySelector(".n").innerHTML = i < step ? OKI : i; });
  ctr();
  $("pkD").classList.toggle("hov", t >= T.dClick - .3 && t < T.s2);
  const A = t >= T.aClick, B = t >= T.bClick;
  $("fA").classList.toggle("on", A); $("fB").classList.toggle("on", B);
  $("est").innerHTML = B ? "<b>About 18,400 items</b> · first index about 3 hours" : A ? "<b>About 9,800 items</b> · first index about 2 hours" : "Choose at least one folder";
  $("bCo").classList.toggle("dn", t >= T.coClick - .05 && t < T.s3);
  $("bGo").classList.toggle("dn", t >= T.goClick - .05 && t < T.close[0]);
  // listed, indexing, and not searchable until permissions have synced
  $("r-new").style.display = t >= T.close[0] ? "table-row" : "none";
  $("sg-sources").querySelector(".n").textContent = t >= T.close[0] ? "4" : "3";
  const p = span(t, ...T.run, x => x), pc = Math.round(4 + 8 * p);
  $("nB").style.transform = `scaleX(${pc / 100})`; $("nP").textContent = `Indexing · ${pc}%`;
  $("nI").textContent = (740 + Math.round(1500 * p)).toLocaleString("en-US");
  $("toast").style.opacity = span(t, T.toast[0], T.toast[0] + .2) * (1 - span(t, T.toast[1] - .2, T.toast[1]));
}

function events() { return [["click", T.addClick], ["whoosh", T.open[0]], ["click", T.dClick], ["click", T.aClick], ["click", T.bClick], ["click", T.coClick], ["click", T.goClick], ["pop", T.toast[0]]]; }

Motion.scene({
  // 5+ steps: natural length, within the 15 s cap
  T, clicks: [T.addClick, T.dClick, T.aClick, T.bClick, T.coClick, T.goClick], build, render, events,
  slow: [[2.2, 3.0, 1.4]]
});"""
COMMENT = """  Source for media/knowledge-content/add-content-source.mp4. Built by motion/_build/add_source.py on _build/sources_page.py,
  so Content › Sources is the same page as in the other clips.
  Follows the Add content source card (data/guidance-content.js):
  - clear steps: source, what to include, review
  - what the connector needs and why, including what it can't do
  - selected folders by default, not everything; an estimate of items and time
  - not searchable until the first permission sync; listed as indexing"""
make("add-content-source", "Add content source", COMMENT, CSS, "Content / Sources", MAIN, SCRIPT, extra=EXTRA, toast=TOAST)
