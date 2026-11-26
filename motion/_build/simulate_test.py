import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from compliance_page import make

CSS = r"""
.st3 { display: inline-flex; gap: 6px; align-items: center; font-size: 12px; color: var(--ink); border: 1px solid var(--ink); border-radius: 999px; padding: 2px 10px; margin-left: 10px; }
.st3 i { width: 6px; height: 6px; border-radius: 50%; border: 2px solid var(--ink); }
.st3.en { background: var(--ink); color: #fff; } .st3.en i { background: #fff; border-color: #fff; }
.subh { margin-top: 4px; font-size: 12.5px; color: var(--soft); }
#pS { opacity: 0; }
.runbar { margin-top: 12px; display: flex; align-items: center; gap: 12px; border: 1px solid var(--rule-strong); border-radius: 12px; padding: 10px 14px; font-size: 12.5px; color: var(--soft); }
.runbar .sp { flex: 1; } .runbar .btn { height: 32px; font-size: 12.5px; }
.runbar b { color: var(--ink); font-weight: 600; }
.pbar { width: 160px; height: 6px; border-radius: 999px; background: var(--hover); overflow: hidden; }
.pbar i { display: block; height: 100%; width: 100%; background: var(--ink); transform-origin: left; }
#rs { display: none; }
.hl2 { margin-top: 12px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.hl2 > div { border: 1px solid var(--rule); border-radius: 12px; padding: 10px 14px; font-size: 12.5px; color: var(--soft); }
.hl2 b.n { display: block; font-size: 22px; color: var(--ink); font-weight: 600; letter-spacing: -.02em; }
.hl2 .wn { border-color: #b45309; background: #fffbeb; color: #78350f; }
.hl2 .wn b.n { color: #78350f; }
.hl2 .wn svg { width: 13px; height: 13px; vertical-align: -2px; margin-right: 4px; color: #b45309; }
table.st.sm td { height: 36px; }
.safe { margin-top: 8px; font-size: 12px; color: var(--ink); display: flex; gap: 6px; align-items: center; }
.safe svg { width: 12px; height: 12px; }
.btn.dgrf { background: #171717; border-color: #171717; color: #fff; }
"""
OK = '<svg aria-hidden="true"><use href="#ok"/></svg>'
WN = '<svg aria-hidden="true"><use href="#warn"/></svg>'
SAMPLES = [("Hangar 3 maintenance schedule.pdf", "Ved Foslo", "41 days", "Link expires"), ("Fleet roster Q3.xlsx", "Cal Alder", "94 days", "Link expires"),
           ("Partner briefing.pptx", "Wes Janson", "120 days", "2 links expire"), ("X-wing preflight checklist.pdf", "Hobbie Klivian", "33 days", "Link expires")]
MAIN = f'''      <div class="view">
        <div class="hd"><h1>External links expire</h1><span class="st3" id="st"><i></i><span id="stT">Simulating</span></span><span class="sp"></span><span class="btn sm">Edit</span></div>
        <div class="subh">Sharing · links to files expire after 30 days · Toryn Farr · 86 people, 29,800 files in scope</div>
        <div class="sub2"><span class="sg">Rule</span><span class="sg">Scope</span><span class="sg" id="tSim">Simulation</span><span class="sg">History</span><span class="sp"></span></div>
        <div id="pR" style="margin-top:12px;font-size:12.5px;color:var(--soft)">The rule: a link to a file stops working 30 days after it’s made, unless its owner renews it.</div>
        <div id="pS">
          <div class="runbar" aria-live="polite"><span id="rb">Runs against real data. <b>Nothing changes and no one is notified.</b></span><span class="sp"></span><span id="rbR"><span class="btn pri" id="bRun">Run simulation</span></span></div>
          <div id="rs">
            <div class="hl2"><div><b class="n">1,980 links</b>would expire, on 1,240 files of 64 people</div>
              <div class="wn"><b class="n">About 4×</b>{WN}what you expected (about 500). Most are Hangar 3’s maintenance links.</div></div>
            <div class="safe">{OK}Nothing was changed, and no one was notified. <span style="flex:1"></span><span class="btn sm">Edit scope</span><span id="enW"><span class="btn sm pri" id="bEnf">Enforce with these results</span></span></div>
            <table class="st sm"><thead><tr><th>Sample file</th><th>Owner</th><th>Link made</th><th>Would happen</th></tr></thead><tbody>
              {"".join(f'<tr><td class="nm"><b>{a}</b></td><td>{b}</td><td>{c} ago</td><td style="color:var(--ink)">{d}</td></tr>' for a, b, c, d in SAMPLES)}</tbody></table>
          </div>
        </div>
      </div>'''
EXTRA = '''    <div class="scr" id="scr"></div>
    <section class="dlg" id="dlg" role="alertdialog" aria-labelledby="cT" style="left:320px; top:170px; width:520px">
      <h3 id="cT">Enforce External links expire?</h3>
      <div style="margin-top:6px; line-height:1.45">1,980 links will stop working over the next day, and their 64 owners are told. Today’s simulation is attached to this change for review.</div>
      <div class="ft"><span class="sp"></span><span class="btn">Cancel</span><span class="btn dgrf" id="bCf">Enforce</span></div>
    </section>'''
TOAST = '      <div class="toast" id="toast"><i><svg width="11" height="11"><use href="#ok"/></svg></i>Enforced, with today’s simulation attached · logged</div>'
SCRIPT = r"""const { $, at, span, easeOut } = Motion;

/* ---------- timeline (scene seconds) ---------- */
const T = {
  sClick: 0.95, toS: 1.00, rClick: 2.00, job: [2.05, 3.15], eClick: 5.20, dlg: [5.25, 5.50], cfClick: 6.30, close: [6.35, 6.60],
  toast: [6.65, 7.45], endCard: [7.45, 7.90], end: 8.4
};

function build() {
  const s = at("tSim");
  $("pS").style.opacity = 1; const r = at("bRun"); $("rs").style.display = "block"; const e = at("bEnf"); $("rs").style.display = ""; $("pS").style.opacity = 0;
  $("dlg").style.opacity = 1; const c = at("bCf"); $("dlg").style.opacity = 0;
  const cur = [
    [0.00, 960, 640], [0.25, 960, 640], [0.70, s[0], s[1] + 3], [1.00, s[0], s[1] + 3], [1.75, r[0], r[1] + 3], [2.05, r[0], r[1] + 3],
    [3.40, r[0] - 260, r[1] + 120], [4.95, e[0], e[1] + 3], [5.25, e[0], e[1] + 3], [6.05, c[0], c[1] + 3], [6.35, c[0], c[1] + 3], [7.45, c[0] - 260, c[1] + 80]
  ];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 330, 1.06], [7.20, 650, 330, 1.06], [7.45, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  $("crumb").innerHTML = "/ Compliance / Policies / <b>External links expire</b>";
  const s = t >= T.toS;
  $("tSim").classList.toggle("on", s); $("pR").style.display = s ? "none" : ""; $("pS").style.opacity = s ? 1 : 0;
  // a job against real data, that changes nothing
  const run = t >= T.job[0], done = t >= T.job[1], p = span(t, ...T.job, x => x);
  $("rbR").innerHTML = done ? '<span style="color:var(--ink)">Finished just now · 2 min</span>' : run ? `<span class="pbar"><i style="transform:scaleX(${.04 + .96 * p})"></i></span>` : `<span class="btn pri${t >= T.rClick - .05 ? " dn" : ""}" id="bRun">Run simulation</span>`;
  $("rb").innerHTML = done ? "<b>Simulation finished.</b> 1,980 links would expire." : run ? `Checking ${Math.round(29800 * p).toLocaleString("en-US")} of 29,800 files…` : "Runs against real data. <b>Nothing changes and no one is notified.</b>";
  $("rs").style.display = done ? "block" : "none";
  // enforce in one step, with the results attached
  const d = span(t, T.dlg[0] + .1, T.dlg[1], easeOut) * (1 - span(t, ...T.close));
  $("dlg").style.opacity = d; $("scr").style.opacity = d; $("dlg").style.visibility = d > 0 ? "visible" : "hidden";
  $("bCf").classList.toggle("dn", t >= T.cfClick - .05 && t < T.close[0]);
  const en = t >= T.close[0];
  $("enW").innerHTML = en ? '<span style="color:var(--ink)">Enforced just now, with these results</span>' : `<span class="btn sm pri${t >= T.eClick - .05 && t < T.dlg[0] + .1 ? " dn" : ""}" id="bEnf">Enforce with these results</span>`;
  $("st").className = "st3" + (en ? " en" : ""); $("stT").textContent = en ? "Enforced" : "Simulating";
  $("toast").style.opacity = span(t, T.toast[0], T.toast[0] + .2) * (1 - span(t, T.toast[1] - .2, T.toast[1]));
}

function events() { return [["click", T.sClick], ["click", T.rClick], ["chime", T.job[1]], ["click", T.eClick], ["click", T.cfClick], ["pop", T.toast[0]]]; }

Motion.scene({
  // under 5 steps: natural length, within the 10 s cap
  T, clicks: [T.sClick, T.rClick, T.eClick, T.cfClick], build, render, events,
  slow: [[3.2, 4.4, 1.15]]
});"""
COMMENT = """  Source for media/policies/simulate-test.mp4. Built by motion/_build/simulate_test.py on _build/compliance_page.py,
  with the top bar's alerts bell.
  Follows the Simulate / test card (data/guidance-governance.js):
  - runs against real data as a job; nothing changes and no one is notified
  - the headline result compared with what she expected, and sample matches in a table
  - enforced in one step, with the simulation attached to the change"""
make("simulate-test", "Simulate / test", COMMENT, CSS, "Compliance / Policies", MAIN, SCRIPT, extra=EXTRA, toast=TOAST)
