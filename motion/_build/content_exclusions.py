import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from sources_page import make, head, LIST

CSS = r"""
#vX { opacity: 0; }
.chips { display: flex; gap: 6px; flex-wrap: wrap; }
.chip { height: 30px; display: inline-flex; align-items: center; padding: 0 11px; border-radius: 999px; border: 1px solid var(--rule-strong); font-size: 12.5px; color: var(--ink); }
.chip.on { background: var(--ink); color: #fff; border-color: var(--ink); }
.f1 { margin-top: 12px; }
.tree { border: 1px solid var(--rule); border-radius: 10px; }
.tree > div { display: flex; gap: 8px; align-items: center; height: 30px; padding: 0 11px; border-top: 1px solid var(--rule); font-size: 12.5px; color: var(--ink); }
.tree > div:first-child { border-top: 0; }
.tree .i1 { padding-left: 34px; }
.tree .c { margin-left: auto; color: var(--soft); font-size: 12px; }
.tree .on { background: var(--subtle); }
.rdo { width: 14px; height: 14px; border-radius: 50%; border: 1.5px solid var(--rule-strong); position: relative; box-sizing: border-box; flex: none; }
.on .rdo { border-color: var(--ink); } .on .rdo::after { content: ""; position: absolute; inset: 2px; border-radius: 50%; background: var(--ink); }
.prv { margin-top: 8px; font-size: 12.5px; color: var(--soft); height: 18px; }
.prv b { color: var(--ink); font-weight: 600; }
.rm { display: inline-flex; gap: 6px; align-items: center; color: var(--ink); white-space: nowrap; }
.rm .s { color: var(--soft); }
.pbar { width: 60px; height: 5px; border-radius: 999px; background: var(--hover); overflow: hidden; }
.pbar i { display: block; height: 100%; width: 100%; background: var(--ink); transform-origin: left; }
#r-x0 { display: none; }
table.st.ex td { height: 46px; }
"""
RULES = [
  ("Sensitivity label · Highly confidential", "All sources", "Mon Mothma · Mar 2", "Legal and merger matters"),
  ("File type · .key, .pem", "All sources", "Toryn Farr · Apr 18", "Secrets and certificates"),
  ("Location · Coruscant Wiki › Board", "Coruscant Wiki", "Lavanya Sienna · Jun 9", "Board minutes"),
]
NEWROW = ('<tr id="r-x0" class="nw"><td class="nm"><b>Location · Holonet Drive › Crew evaluations</b><span>Open HR reviews</span></td><td>Holonet Drive</td><td>Lavanya Sienna · Just now</td>'
          '<td><span class="rm"><span class="pbar"><i id="xB"></i></span><span id="xP">Removing 214 items</span> <span class="s">· about 10 minutes</span></span></td></tr>')
MAIN = f'''      <div class="view" id="vL">
{head("sources", '<span class="btn sm pri">Add source</span>')}{LIST()}      </div>
      <div class="view" id="vX">
{head("excl", '<span class="btn sm pri" id="bRule">Add rule</span>').replace('id="sg-', 'id="sx-')}        <div class="syn" style="margin-top:12px;font-size:12.5px;color:var(--soft)">Excluded content never reaches search or AI, even for people who could open it. Use this alongside permissions, not instead of them.</div>
        <table class="st ex"><thead><tr><th>Rule</th><th>Applies to</th><th>Added</th><th>Why</th></tr></thead><tbody>{NEWROW}
          {"".join(f'<tr><td class="nm"><b>{a}</b></td><td>{b}</td><td>{c}</td><td>{d}</td></tr>' for a, b, c, d in RULES)}</tbody></table>
      </div>'''
EXTRA = '''    <div class="scr" id="scr"></div>
    <section class="dlg" id="dlg" role="dialog" aria-labelledby="xT" style="left:310px; top:102px; width:580px">
      <h3 id="xT">Add an exclusion</h3>
      <div class="f1"><span class="lbl">Exclude by</span><div class="chips"><span class="chip on">Location</span><span class="chip">File type</span><span class="chip">Sensitivity label</span><span class="chip">Keyword</span><span class="chip">Owner</span></div></div>
      <div class="f1"><span class="lbl">Folder <span>· in Holonet Drive</span></span>
        <div class="tree"><div><span class="rdo"></span>Fleet manuals<span class="c">9,800 items</span></div><div><span class="rdo"></span>Hangar procedures<span class="c">8,600 items</span></div>
          <div class="i1" id="fCE"><span class="rdo"></span>Crew evaluations<span class="c">214 items</span></div><div class="i1"><span class="rdo"></span>Maintenance logs<span class="c">5,120 items</span></div><div class="i1"><span class="rdo"></span>Safety drills<span class="c">3,266 items</span></div></div>
        <div class="prv" id="prv" aria-live="polite">Choose a folder to see what it matches</div></div>
      <div class="f1"><label class="lbl">Why <span>· required, shown to other admins</span></label><div class="in ph" id="wIn"><span id="wTx">For example, open legal matters</span><span class="c" id="wC"></span></div></div>
      <div class="msg"><span>Excluded items are removed from search, caches and AI answers.</span></div>
      <div class="ft"><span class="sp"></span><span class="btn">Cancel</span><span class="btn pri" id="bAdd">Add rule</span></div>
    </section>'''
TOAST = '      <div class="toast" id="toast"><i><svg width="11" height="11"><use href="#ok"/></svg></i>Rule added · removing 214 items from search and AI · logged</div>'
SCRIPT = r"""const { $, at, span, easeOut } = Motion;
const W = "Open HR reviews";

/* ---------- timeline (scene seconds) ---------- */
const T = {
  xClick: 0.95, toX: [1.00, 1.25], ruClick: 2.20, open: [2.25, 2.55], fClick: 3.40, wClick: 4.60, type: [4.70, 5.40],
  addClick: 6.10, close: [6.20, 6.45], toast: [6.50, 7.90], run: [6.45, 8.20], endCard: [8.20, 8.65], end: 9.2
};

function build() {
  const xs = at("sg-excl");
  $("vX").style.opacity = 1; const ru = at("bRule"); $("vX").style.opacity = 0;
  $("dlg").style.opacity = 1; const f = at("fCE", -120, 0), w = at("wIn", -120, 0), ad = at("bAdd"); $("dlg").style.opacity = 0;
  const cur = [
    [0.00, 960, 640], [0.25, 960, 640], [0.75, xs[0], xs[1] + 3], [1.00, xs[0], xs[1] + 3],
    [1.95, ru[0], ru[1] + 3], [2.25, ru[0], ru[1] + 3], [3.15, f[0], f[1] + 3], [3.45, f[0], f[1] + 3],
    [4.35, w[0], w[1] + 3], [4.65, w[0], w[1] + 3], [5.85, ad[0], ad[1] + 3], [6.15, ad[0], ad[1] + 3], [8.20, ad[0] - 200, ad[1] + 40]
  ];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 360, 1.06], [7.95, 650, 360, 1.06], [8.20, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  const x = t >= T.toX[0];
  $("crumb").innerHTML = x ? "/ Content / Sources / <b>Exclusions</b>" : "/ Content / <b>Sources</b>";
  $("sg-excl").classList.toggle("prs", t >= T.xClick - .05 && t < T.toX[0]);
  $("vL").style.opacity = t >= T.toX[0] ? 0 : 1; $("vX").style.opacity = t >= T.toX[0] ? 1 : 0;
  $("bRule").classList.toggle("dn", t >= T.ruClick - .05 && t < T.open[0] + .15);
  const o = span(t, ...T.open, easeOut) * (1 - span(t, ...T.close, easeOut));
  $("dlg").style.opacity = o; $("scr").style.opacity = o; $("dlg").style.transform = `translateY(${8 * (1 - o)}px)`;
  $("dlg").style.visibility = o > 0 ? "visible" : "hidden";
  // preview before applying
  const f = t >= T.fClick;
  $("fCE").classList.toggle("on", f);
  $("prv").innerHTML = f ? "Matches <b>214 items</b> · all 214 are already indexed and will be removed" : "Choose a folder to see what it matches";
  // a reason is required
  const wf = t >= T.wClick && t < T.addClick, n = Math.round(W.length * span(t, ...T.type, x => x));
  $("wTx").textContent = t >= T.wClick ? W.slice(0, n) : "For example, open legal matters";
  $("wIn").className = "in" + (wf ? " f" : "") + (t < T.wClick ? " ph" : "");
  $("wC").style.display = wf && Math.floor(t * 2.4) % 2 === 0 ? "" : "none";
  $("bAdd").classList.toggle("dn", t >= T.addClick - .05 && t < T.close[0]);
  // listed first, removing what was already indexed
  $("r-x0").style.display = t >= T.close[0] ? "table-row" : "none";
  $("sx-excl").querySelector(".n").textContent = t >= T.close[0] ? "4" : "3";
  const p = span(t, ...T.run, x => x);
  $("xB").style.transform = `scaleX(${.03 + .12 * p})`;
  $("xP").textContent = `Removing ${214 - Math.round(30 * p)} items`;
  $("toast").style.opacity = span(t, T.toast[0], T.toast[0] + .2) * (1 - span(t, T.toast[1] - .2, T.toast[1]));
}

function events() { return [["click", T.xClick], ["click", T.ruClick], ["whoosh", T.open[0]], ["click", T.fClick], ["click", T.wClick], ["key", T.type[0]], ["click", T.addClick], ["pop", T.toast[0]]]; }

Motion.scene({
  // 5+ steps: natural length, within the 15 s cap
  T, clicks: [T.xClick, T.ruClick, T.fClick, T.wClick, T.addClick], build, render, events,
  slow: [[3.5, 4.2, 1.4]]
});"""
COMMENT = """  Source for media/knowledge-content/content-exclusions.mp4. Built by motion/_build/content_exclusions.py on _build/sources_page.py,
  so Content › Sources is the same page as in the other clips.
  Follows the Content exclusions card (data/guidance-content.js):
  - active exclusions with who added them and why; alongside permissions, not instead of them
  - exclude by location, file type, sensitivity label, keyword or owner
  - a preview of what the rule matches before applying it; a reason is required
  - already-indexed items are removed from search, caches and AI answers, with how long it takes"""
make("content-exclusions", "Content exclusions", COMMENT, CSS, "Content / Sources", MAIN, SCRIPT, extra=EXTRA, toast=TOAST)
