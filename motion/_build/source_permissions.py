import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from sources_page import make, head, LIST

CSS = r"""
#vD { opacity: 0; }
.back { font-size: 12.5px; color: var(--soft); margin-bottom: 10px; }
.dh { display: flex; align-items: center; gap: 10px; }
.dh .w { flex: 1; } .dh .w b { display: block; color: var(--ink); font-size: 18px; font-weight: 600; }
.dh .w span { font-size: 12.5px; color: var(--soft); }
.pv { position: relative; }
.pv > div { position: absolute; left: 0; right: 0; top: 0; }
#pP { opacity: 0; }
.kv4 { margin: 16px 0 0; display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.kv4 > div { border: 1px solid var(--rule); border-radius: 10px; padding: 9px 12px; font-size: 12px; color: var(--soft); }
.kv4 dt { font-size: 12px; color: var(--soft); margin-bottom: 3px; }
.kv4 dd { margin: 0; font-size: 14px; color: var(--ink); font-weight: 600; }
.kv4 dd span { font-weight: 400; font-size: 12px; color: var(--soft); }
.syn { margin-top: 10px; font-size: 12.5px; color: var(--soft); }
.syn b { color: var(--ink); font-weight: 500; }
table.st.mp td { height: 34px; }
table.st.mp { margin-top: 8px; }
table.st.mp td.g { font-family: "Geist Mono", monospace; font-size: 12px; color: var(--ink); }
.test { margin-top: 10px; border: 1px solid var(--rule-strong); border-radius: 12px; padding: 12px 14px; }
.test h4 { margin: 0 0 8px; font-size: 13px; color: var(--ink); font-weight: 600; }
.test .row { display: flex; gap: 8px; position: relative; }
.test .in { width: 240px; }
.test .in.q { flex: 1; width: auto; }
.sug { position: absolute; left: 0; top: 40px; width: 240px; z-index: 6; opacity: 0; }
.sug .s2 { display: block; font-size: 11.5px; color: var(--soft); }
.rs { margin-top: 10px; display: none; font-size: 12.5px; color: var(--soft); }
.rs .hd2 { color: var(--ink); } .rs .hd2 b { font-weight: 600; }
.rs .it { display: flex; gap: 10px; align-items: center; padding: 5px 0; border-top: 1px solid var(--rule); }
.rs .it:first-of-type { border-top: 0; }
.rs .it b { color: var(--ink); font-weight: 500; }
.rs .it .via { margin-left: auto; font-size: 12px; }
.rs .it.hid { color: var(--soft); }
.rs .it svg { width: 13px; height: 13px; flex: none; }
"""
WN = '<svg aria-hidden="true"><use href="#warn"/></svg>'
NO = '<svg aria-hidden="true"><use href="#nope"/></svg>'
OK = '<svg aria-hidden="true"><use href="#ok"/></svg>'
MAP = [("fleet-all@holonet", "Fleet", "82", ""), ("hangar-crew@holonet", "Hangar 3", "14", ""), ("fleet-command@holonet", "Fleet command", "6", ""),
       ("ext-contractors@holonet", f'<span class="flag">{WN}Not mapped</span>', "9", "Its 1,120 files are left out until it’s mapped")]
MAIN = f'''      <div class="view" id="vL">
{head("sources", '<span class="btn sm pri">Add source</span>')}{LIST()}      </div>
      <div class="view" id="vD">
        <div class="back">← Sources</div>
        <div class="dh"><span class="lg">HD</span><div class="w"><b>Holonet Drive</b><span>Drive · 2 folders · Up to date</span></div><span class="btn sm">Re-sync source</span><span class="btn sm">Settings</span></div>
        <div class="sub2"><span class="sg on" id="tO">Overview</span><span class="sg" id="tP">Permissions</span><span class="sp"></span></div>
        <div class="pv">
          <div id="pO"><dl class="kv4"><div><dt>Last synced</dt><dd>12 minutes ago</dd></div><div><dt>Coverage</dt><dd>100% <span>· 18,402 items</span></dd></div>
            <div><dt>Failed</dt><dd>0</dd></div><div><dt>Sign-in</dt><dd>Service account <span>· renews itself</span></dd></div></dl></div>
          <div id="pP">
            <div class="syn"><b>Permissions synced 4 minutes ago.</b> Changes in Holonet Drive arrive within 5 minutes, removals first.</div>
            <table class="st mp"><thead><tr><th>Holonet Drive group</th><th>Console group</th><th>People</th><th></th></tr></thead><tbody>
              {"".join(f'<tr><td class="g">{g}</td><td style="color:var(--ink)">{c}</td><td>{n}</td><td>{x}</td></tr>' for g, c, n, x in MAP)}</tbody></table>
            <div class="test"><h4>Test as a person</h4>
              <div class="row"><span class="in" id="pIn"><span id="pTx"></span><span class="c" id="pC"></span></span><span class="in q" id="qIn"><span id="qTx"></span><span class="c" id="qC"></span></span>
                <div class="menu sug" id="sug"><div id="sHob">Hobbie Klivian<span class="s2">Pilot · Fleet</span></div><div>Hobbie Tarn<span class="s2">Mechanic · Hangar 3</span></div></div></div>
              <div class="rs" id="rs" aria-live="polite"><div class="hd2">As <b>Hobbie Klivian</b>, “hyperdrive” finds <b>2 items</b></div>
                <div class="it">{OK}<b>Hyperdrive maintenance guide</b>Fleet manuals<span class="via">Through Fleet</span></div>
                <div class="it">{OK}<b>X-wing hyperdrive checklist</b>Hangar procedures<span class="via">Through Fleet</span></div>
                <div class="it hid">{NO}1 more item matches, but Hobbie can’t open it in Holonet Drive, so it isn’t shown<span class="via">Fleet command only</span></div></div>
            </div>
          </div>
        </div>
      </div>'''
SCRIPT = r"""const { $, at, span, easeOut } = Motion;
const P = "Hob", Q = "hyperdrive";

/* ---------- timeline (scene seconds) ---------- */
const T = {
  rowClick: 1.10, toD: [1.15, 1.40], pClick: 2.20, toP: [2.25, 2.45], inClick: 3.60, pType: [3.70, 4.00], sug: [4.05, 4.70],
  hClick: 4.60, qClick: 5.20, qType: [5.30, 5.90], enter: 6.10, endCard: [7.60, 8.05], end: 8.6
};

function build() {
  const r = at("r-drive", -300, 0);
  $("vD").style.opacity = 1; const tp = at("tP"); $("pP").style.opacity = 1;
  const pi = at("pIn", -60, 0), qi = at("qIn", -150, 0);
  $("sug").style.opacity = 1; const h = at("sHob", -40, 0); $("sug").style.opacity = 0;
  $("pP").style.opacity = 0; $("vD").style.opacity = 0;
  const cur = [
    [0.00, 960, 640], [0.25, 960, 640], [0.85, r[0], r[1] + 3], [1.15, r[0], r[1] + 3],
    [1.95, tp[0], tp[1] + 3], [2.25, tp[0], tp[1] + 3], [3.35, pi[0], pi[1] + 3], [3.65, pi[0], pi[1] + 3],
    [4.35, h[0], h[1] + 3], [4.65, h[0], h[1] + 3], [4.95, qi[0], qi[1] + 3], [5.25, qi[0], qi[1] + 3], [6.50, qi[0] + 60, qi[1] + 60], [7.60, qi[0] + 62, qi[1] + 62]
  ];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 345, 1.06], [7.35, 650, 345, 1.06], [7.60, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  const d = t >= T.toD[0];
  $("crumb").innerHTML = d ? "/ Content / Sources / <b>Holonet Drive</b>" : "/ Content / <b>Sources</b>";
  $("r-drive").classList.toggle("sel", t >= T.rowClick - .1 && t < T.toD[0]);
  $("vL").style.opacity = t >= T.toD[0] ? 0 : 1; $("vD").style.opacity = t >= T.toD[0] ? 1 : 0;
  // Overview, then Permissions: one at a time
  const pp = t >= T.toP[0];
  $("tO").classList.toggle("on", !pp); $("tP").classList.toggle("on", pp);
  $("pO").style.opacity = pp ? 0 : 1; $("pP").style.opacity = pp ? 1 : 0;
  // test as a person
  const pf = t >= T.inClick && t < T.hClick, qf = t >= T.qClick && t < T.endCard[0];
  const blink = Math.floor(t * 2.4) % 2 === 0;
  const pn = Math.round(P.length * span(t, ...T.pType, x => x));
  $("pTx").textContent = t >= T.hClick ? "Hobbie Klivian" : t >= T.inClick ? P.slice(0, pn) : "Person";
  $("pIn").className = "in" + (pf ? " f" : "") + (t < T.inClick ? " ph" : "");
  $("pC").style.display = pf && blink ? "" : "none";
  $("sug").style.opacity = span(t, T.sug[0], T.sug[0] + .12) * (1 - span(t, T.sug[1] - .08, T.sug[1]));
  $("sHob").classList.toggle("hov", t >= T.hClick - .25);
  const qn = Math.round(Q.length * span(t, ...T.qType, x => x));
  $("qTx").textContent = t >= T.qClick ? Q.slice(0, qn) : "What they’d search for";
  $("qIn").className = "in q" + (qf ? " f" : "") + (t < T.qClick ? " ph" : "");
  $("qC").style.display = qf && blink && t < T.enter ? "" : "none";
  $("rs").style.display = t >= T.enter ? "block" : "none";
}

function events() { return [["click", T.rowClick], ["whoosh", T.toD[0]], ["click", T.pClick], ["click", T.inClick], ["key", T.pType[0]], ["click", T.hClick], ["click", T.qClick], ["key", T.qType[0]], ["key", T.enter]]; }

Motion.scene({
  // 5+ steps: natural length, within the 15 s cap
  T, clicks: [T.rowClick, T.pClick, T.inClick, T.hClick, T.qClick], build, render, events,
  slow: [[2.5, 3.3, 1.5], [6.2, 7.3, 1.4]]
});"""
COMMENT = """  Source for media/knowledge-content/source-permissions.mp4. Built by motion/_build/source_permissions.py on _build/sources_page.py,
  so Content › Sources is the same page as in the other clips.
  Follows the Source permissions card (data/guidance-content.js):
  - how source groups map to console groups, in a table with headers; when permissions last synced, removals first
  - an unmapped group's files are left out until it's mapped, not shown to everyone
  - test as a person: what Hobbie would find, and what's hidden because he can't open it at the source"""
make("source-permissions", "Source permissions", COMMENT, CSS, "Content / Sources", MAIN, SCRIPT)
