import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from shell import make
from import_page import CSS as ICSS, head
CSS = ICSS + r"""
.view { position: absolute; inset: 0; padding: 20px 32px; }
.sm { margin-top: 12px; display: flex; gap: 8px; font-size: 13px; color: var(--soft); position: relative; height: 20px; }
.sm span { position: absolute; left: 0; top: 0; white-space: nowrap; }
.sm b { color: var(--ink); font-weight: 600; }
.grp { margin-top: 8px; border: 1px solid var(--rule-strong); border-radius: 12px; padding: 10px 14px; font-size: 12.5px; color: var(--soft); }
.grp.er { border-color: #b91c1c; }
.grp.wn { border-color: #b45309; }
.grp h3 { margin: 0; font-size: 13.5px; color: var(--ink); display: flex; gap: 8px; align-items: center; }
.grp h3 .k { font-size: 11px; font-weight: 600; border-radius: 999px; padding: 0 7px; border: 1px solid currentColor; }
.grp.er h3 .k { color: #b91c1c; } .grp.wn h3 .k { color: #92400e; }
.it { display: flex; gap: 12px; align-items: center; padding: 4px 0; min-height: 38px; box-sizing: border-box; border-top: 1px solid var(--rule); }
.it:first-of-type { border-top: 0; }
.it .w { flex: 1; }
.it .w b { color: var(--ink); font-weight: 600; }
.it .btn { height: 30px; font-size: 12.5px; }
.btn.pri.dn2 { background: #404040; border-color: #404040; }
.it .btn.dn { background: #404040; border-color: #404040; color: #fff; }
.it .ok { color: var(--ink); display: inline-flex; gap: 5px; align-items: center; font-weight: 500; }
.it .ok svg { width: 11px; height: 11px; }
.rw { display: flex; gap: 8px; align-items: center; padding: 3px 0; }
.rw .rn { font-family: "Geist Mono", monospace; font-size: 11.5px; color: var(--soft); width: 48px; }
.ed { width: 260px; height: 30px; border: 1.5px solid #b91c1c; border-radius: 7px; display: flex; align-items: center; padding: 0 9px; font-size: 12.5px; color: var(--ink); white-space: pre; background: var(--bg); }
.ed.f { border-color: var(--ink); box-shadow: 0 0 0 3px rgba(23,23,23,.08); }
.ed.good { border-color: var(--rule-strong); }
.ed .c { width: 1.5px; height: 15px; background: var(--ink); }
.rw .why { font-size: 12px; color: #b91c1c; display: inline-flex; gap: 5px; align-items: center; }
.rw .why svg { width: 13px; height: 13px; flex: none; }
.rw .why.okk { color: var(--ink); }
.done { margin-top: 12px; border: 1px solid var(--rule-strong); border-radius: 12px; padding: 14px 16px; display: none; font-size: 13px; color: var(--soft); }
.done .res { margin-top: 10px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.done .res div { border: 1px solid var(--rule); border-radius: 10px; padding: 8px 10px; font-size: 12px; }
.done .res b { display: block; font-size: 17px; color: var(--ink); font-weight: 600; }
.done .pb { margin-top: 8px; height: 6px; border-radius: 999px; background: var(--hover); overflow: hidden; }
.done .pb i { display: block; height: 100%; width: 100%; background: var(--ink); transform-origin: left center; }
"""
MAIN = f'''      <div class="view imp" id="vImp">
{head(3, ids=True)}          <div id="rev">
          <div class="sm" aria-live="polite"><span id="smT"><b>41 of 48 rows</b> are ready · 4 have errors · 2 warnings</span></div>
          <section class="grp er" aria-labelledby="eH"><h3 id="eH"><span class="k">Errors</span>These rows can’t be imported until they’re fixed</h3>
            <div class="it" style="display:block"><div class="w"><b>Email isn’t a valid address</b> · 2 rows</div>
              <div class="rw"><span class="rn">Row 12</span><span class="ed" id="e12"><span id="e12v">jes@echobase</span><span class="c" id="cr"></span></span><span class="why" id="w12"><svg aria-hidden="true"><use href="#err"/></svg>Invalid email domain</span></div>
              <div class="rw"><span class="rn">Row 30</span><span class="ed">ved foslo@echobase.rebellion</span><span class="why"><svg aria-hidden="true"><use href="#err"/></svg>Email addresses cannot contain spaces</span></div></div>
            <div class="it"><div class="w"><b>Team doesn’t exist: “Hoth evac”</b> · rows 7 and 19 · Did you mean <b>Hoth Evacuation</b>?</div><span id="tA"><span class="btn" id="bTeam">Use Hoth Evacuation for 2 rows</span></span></div>
          </section>
          <section class="grp wn" aria-labelledby="wH"><h3 id="wH"><span class="k">Warnings</span>These rows will be imported</h3>
            <div class="it"><div class="w"><b>Manager not found: “Gen. Rieeken”</b> · row 22 · imported without a manager</div></div>
            <div class="it"><div class="w"><b>3 people already exist</b> · updated with the file’s values, as you chose</div></div>
          </section>
          <div class="foot"><span class="note"><span class="btn" id="bDl" style="height:32px;font-size:12.5px">Download 1 row that still has an error</span></span><span class="btn">Back</span><span class="btn pri" id="bGo">Import 41 rows</span></div>
          </div>
          <section class="done" id="done" role="status"><b id="dT" style="color:var(--ink)">Importing 47 rows…</b><div class="pb"><i id="pbI"></i></div>
            <div class="res" id="res" style="opacity:0"><div><b>44</b>people added</div><div><b>3</b>people updated</div><div><b>1</b>row not imported · in the file you downloaded</div></div></section>
      </div>'''
SCRIPT = r"""const { $, at, span, easeOut } = Motion;
const BAD = "jes@echobase", GOOD = "jes@echobase.rebellion";

/* ---------- timeline (scene seconds) ---------- */
const T = {
  eClick: 1.80, type: [1.95, 2.45], teamClick: 3.40, dlClick: 4.60, goClick: 5.60, run: [5.70, 6.70],
  endCard: [8.10, 8.55], end: 9.2
};

function build() {
  const e = at("e12", 60, 0), tm = at("bTeam"), dl = at("bDl"), g = at("bGo"), v = at("vImp");
  const cur = [
    [0.00, 960, 640], [0.30, 960, 640], [1.60, e[0], e[1] + 3], [1.90, e[0], e[1] + 3], [2.70, e[0] + 120, e[1] + 30],
    [3.20, tm[0], tm[1] + 3], [3.50, tm[0], tm[1] + 3], [4.40, dl[0], dl[1] + 3], [4.70, dl[0], dl[1] + 3],
    [5.40, g[0], g[1] + 3], [5.70, g[0], g[1] + 3], [6.60, g[0] - 160, g[1] - 110], [8.10, g[0] - 158, g[1] - 108]
  ];
  const cam = [
    [0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00],
    [0.90, v[0], v[1] + 60, 1.12], [7.85, v[0], v[1] + 60, 1.12],     // one steady view: errors, warnings, then the result
    [8.10, 656, 360, 1.04]
  ];
  return { cam, cur };
}

function render(t) {
  // fix one email inline
  const ed = t >= T.eClick && t < T.teamClick;
  $("e12").className = "ed" + (ed ? " f" : t >= T.type[1] ? " good" : "");
  const add = ".rebellion", n = Math.round(add.length * span(t, ...T.type, x => x));
  $("e12v").textContent = BAD + add.slice(0, n);
  $("cr").style.opacity = ed && Math.floor(t * 2.4) % 2 === 0 ? 1 : 0;
  const e12 = t >= T.type[1];
  $("w12").className = "why" + (e12 ? " okk" : ""); $("w12").innerHTML = e12 ? '<svg aria-hidden="true"><use href="#ok"/></svg>Fixed' : '<svg aria-hidden="true"><use href="#err"/></svg>Invalid email domain';
  // fix a whole group at once
  const team = t >= T.teamClick + .05;
  $("tA").innerHTML = team ? '<span class="ok"><svg><use href="#ok"/></svg>Fixed for 2 rows</span>' : `<span class="btn${t >= T.teamClick - .05 ? " dn" : ""}" id="bTeam">Use Hoth Evacuation for 2 rows</span>`;
  const ready = 41 + (e12 ? 1 : 0) + (team ? 2 : 0) + 3, errs = 4 - (e12 ? 1 : 0) - (team ? 2 : 0);
  $("smT").innerHTML = `<b>${ready} of 48 rows</b> are ready · ${errs} ${errs === 1 ? "has an error" : "have errors"} · 2 warnings`;
  $("bGo").textContent = `Import ${ready} rows`;
  $("bDl").style.background = t >= T.dlClick - .05 && t < T.dlClick + .35 ? "var(--hover)" : "";
  $("bDl").textContent = t >= T.dlClick + .05 ? "Downloaded · 1 row to fix later" : `Download ${errs} ${errs === 1 ? "row that still has an error" : "rows that still have errors"}`;
  $("bGo").classList.toggle("dn2", t >= T.goClick - .05 && t < T.run[0]);
  // import: the last step
  const run = t >= T.run[0];
  $("rev").style.display = run ? "none" : ""; $("done").style.display = run ? "block" : "none";
  ["st3", "st4"].forEach((id, i) => {});
  $("st3").className = "s " + (run ? "dn" : "on"); $("st3").querySelector(".n").innerHTML = run ? '<svg><use href="#ok"/></svg>' : "3";
  $("st4").className = "s " + (run ? "on" : "");
  const p = span(t, ...T.run, x => x);
  $("pbI").style.transform = `scaleX(${.05 + .95 * p})`;
  $("dT").textContent = t >= T.run[1] ? "Import finished · 47 of 48 rows" : `Importing… ${Math.round(47 * p)} of 47 rows`;
  $("res").style.opacity = span(t, T.run[1], T.run[1] + .25);
}

function events() { return [["click", T.eClick], ["key", T.type[0]], ["click", T.teamClick], ["click", T.dlClick], ["click", T.goClick], ["chime", T.run[1]]]; }

Motion.scene({
  // 5+ steps: natural length, within the 15 s cap
  T, clicks: [T.eClick, T.teamClick, T.dlClick, T.goClick], build, render, events,
  slow: [[0.9, 1.6, 1.5], [6.8, 7.8, 1.4]]
});"""
COMMENT = """  Source for media/import-export/validation-errors.mp4. Built by motion/_build/validation_errors.py on _build/shell.py and _build/import_page.py.
  Follows the Validation & errors card (data/guidance-actions.js):
  - problems grouped by type with counts; errors (blocking) apart from warnings (imported)
  - each says what's wrong and how to fix it, by row; one email is fixed inline
  - a whole group is fixed at once: Use Hoth Evacuation for 2 rows
  - the row that still fails is downloaded to fix later; the good rows import without re-uploading
  - the last step runs, and reports added, updated and not imported"""
make("validation-errors", "Validation & errors", COMMENT, CSS, "People / Users / Import", "people", MAIN, SCRIPT, defs='<symbol id="err" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6.6" fill="currentColor"/><path d="M8 4.6v4.1" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/><circle cx="8" cy="11.2" r="1.05" fill="#fff"/></symbol><symbol id="warn" viewBox="0 0 16 16"><path d="M8 1.8L15 14H1z" fill="currentColor" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M8 6.2v3.6" stroke="#fff" stroke-width="1.7" stroke-linecap="round"/><circle cx="8" cy="11.9" r="1" fill="#fff"/></symbol>')
