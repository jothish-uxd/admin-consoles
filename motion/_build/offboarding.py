import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from user_page import make, OK, WN, LOCK

CSS = r"""
.oh { margin-top: 8px; display: flex; align-items: center; gap: 14px; }
.oh .av3 { width: 44px; height: 44px; border-radius: 50%; background: var(--hover); color: var(--ink); display: grid; place-items: center; font-weight: 650; font-size: 15px; }
.oh h1 { margin: 0; font-size: 21px; } .oh .sub { font-size: 12.5px; color: var(--soft); margin-top: 2px; }
.oh .sp { flex: 1; }
.lh2 { display: inline-flex; gap: 6px; align-items: center; color: var(--ink); font-size: 12.5px; border: 1px solid var(--rule-strong); border-radius: 999px; padding: 3px 10px; }
.lh2 svg { width: 13px; height: 13px; }
.stp2 { margin-top: 12px; border: 1px solid var(--rule); border-radius: 12px; }
.st4 { display: grid; grid-template-columns: 28px 1fr auto; gap: 10px; align-items: start; padding: 12px 16px; border-top: 1px solid var(--rule); font-size: 12.5px; color: var(--soft); }
.st4:first-child { border-top: 0; }
.st4 .nb { width: 22px; height: 22px; border-radius: 50%; border: 1.5px solid var(--rule-strong); display: grid; place-items: center; font-size: 11px; color: var(--ink); box-sizing: border-box; }
.st4 .nb.dn { background: var(--ink); border-color: var(--ink); color: #fff; }
.st4 b { color: var(--ink); font-size: 13.5px; font-weight: 600; display: block; }
.st4 .cts { margin-top: 6px; display: flex; gap: 6px; flex-wrap: wrap; }
.st4 .cts span { border: 1px solid var(--rule-strong); border-radius: 999px; padding: 1px 9px; color: var(--ink); font-size: 12px; }
.st4 .to { margin-top: 8px; display: flex; align-items: center; gap: 8px; color: var(--ink); }
.st4 .to .in { height: 32px; width: 210px; justify-content: space-between; }
.st4 .btn { height: 32px; }
.st4 .pr { display: none; margin-top: 8px; align-items: center; gap: 10px; color: var(--ink); }
.pbar { width: 180px; height: 6px; border-radius: 999px; background: var(--rule); overflow: hidden; } .pbar i { display: block; height: 100%; background: var(--ink); }
.st4.off { opacity: 1; }
.st4 .cf3 { display: none; margin-top: 8px; color: var(--ink); }
.st4 .cf3 .rw3 { margin-top: 6px; display: flex; gap: 8px; align-items: center; }
.st4 .cf3 .in { width: 210px; height: 32px; }
.btn.redp { background: #b91c1c; border-color: #b91c1c; color: #fff; }
.btn.pri.dis, .btn.dis { background: var(--subtle); color: var(--faint); border-color: var(--rule); }
.st4 .sched { display: none; margin-top: 8px; color: var(--ink); align-items: center; gap: 6px; }
.st4 .sched svg, .st4 .pr svg { width: 14px; height: 14px; }
"""
MAIN = f'''      <div class="view">
        <div class="bk">← Users</div>
        <div class="oh"><span class="av3">BD</span><div><h1>Offboard Bren Derlin</h1><div class="sub">Security officer · Fleet · deactivated Nov 18 by Cal Alder</div></div><span class="sp"></span>
          <span class="lh2">{OK}No legal hold · checked just now</span></div>
        <div class="stp2">
          <div class="st4"><span class="nb dn">✓</span><div><b>Access removed</b>He can’t sign in. Sessions ended and API tokens revoked on Nov 18.</div><span></span></div>
          <div class="st4"><span class="nb" id="n2">2</span><div><b>Transfer what he owned</b>Nothing is deleted until this finishes.
            <div class="cts"><span>1,284 files</span><span>12 shared links</span><span>2 API keys</span><span>Admin of Hoth Evacuation</span></div>
            <div class="to" id="to">To <span class="in">Cal Alder · his manager<i class="cv"></i></span><span class="btn pri" id="bTr">Transfer all</span></div>
            <div class="pr" id="pr" role="status"><span id="prT">Transferring to Cal Alder</span><span class="pbar"><i id="pI" style="width:0%"></i></span><span id="pN">0 of 1,284 files</span></div></div><span></span></div>
          <div class="st4"><span class="nb" id="n3">3</span><div><b>License and device</b>Console license freed when the transfer is done. 1 laptop to return: ThinkPad X1.</div><span></span></div>
          <div class="st4"><span class="nb">4</span><div><b>Delete the account</b>Last, and only after a 30-day restore window.
            <div class="to" id="d0"><span class="btn" id="bDl">Schedule deletion…</span></div>
            <div class="cf3" id="cf3">Type <span style="font-weight:600">Bren Derlin</span> to delete his account on Dec 26. Until then it can be restored.
              <div class="rw3"><span class="in" id="fN"><span id="fNv"></span><span class="c" id="fNc"></span></span><span class="btn">Cancel</span><span class="btn pri dis" id="bOk">Schedule for Dec 26</span></div></div>
            <div class="sched" id="sch" role="status">{OK}Deletion scheduled for Dec 26. Restore any time before then.</div></div><span></span></div>
        </div>
        <div style="margin-top:10px;font-size:12.5px;color:var(--soft)" id="ofs">Offboarding isn’t done until every step is: 1 of 4</div>
      </div>
'''
SCRIPT = r"""const { $, at, span, easeOut } = Motion;
const NAME = "Bren Derlin";

/* ---------- timeline (scene seconds) ---------- */
const T = { tClick: 1.40, prog: [1.50, 4.20], dClick: 4.90, nClick: 5.80, type: [5.95, 6.75], okClick: 7.50, sch: 7.60, endCard: [9.40, 9.85], end: 10.35 };

function build() {
  const tr = at("bTr"), d = at("bDl");
  $("cf3").style.display = "block"; $("d0").style.display = "none"; const n = at("fN", -60, 0), ok = at("bOk"); $("cf3").style.display = ""; $("d0").style.display = "";
  const cur = [[0.00, 960, 640], [0.25, 960, 640], [1.05, tr[0], tr[1] + 3], [1.45, tr[0], tr[1] + 3], [4.55, d[0], d[1] + 3], [4.95, d[0], d[1] + 3],
    [5.45, n[0], n[1] + 3], [5.85, n[0], n[1] + 3], [7.15, ok[0], ok[1] + 3], [7.55, ok[0], ok[1] + 3], [9.40, ok[0] + 160, ok[1] + 40]];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 345, 1.04], [9.15, 650, 345, 1.04], [9.40, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  $("crumb").innerHTML = "/ People / Users / <b>Offboard Bren Derlin</b>";
  // transfer first, as a job with progress; nothing is deleted until it's done
  const tr = t >= T.tClick, k = span(t, ...T.prog, x => x), done = t >= T.prog[1];
  $("to").style.display = tr ? "none" : "flex"; $("pr").style.display = tr ? "flex" : "none";
  $("pI").style.width = Math.round(k * 100) + "%";
  $("pN").textContent = done ? "1,284 of 1,284 files · links, keys and role moved" : `${Math.round(1284 * k).toLocaleString("en-US")} of 1,284 files`;
  $("prT").textContent = done ? "Transferred to Cal Alder" : "Transferring to Cal Alder";
  $("n2").className = "nb" + (done ? " dn" : ""); $("n2").textContent = done ? "✓" : "2";
  $("n3").className = "nb" + (done ? " dn" : ""); $("n3").textContent = done ? "✓" : "3";
  // deletion is last, after a restore window, and asks for his name
  const c = t >= T.dClick && t < T.sch, s = t >= T.sch;
  $("d0").style.display = c || s ? "none" : "flex"; $("cf3").style.display = c ? "block" : "none"; $("sch").style.display = s ? "flex" : "none";
  const n = Math.round(NAME.length * span(t, ...T.type, x => x));
  $("fNv").textContent = NAME.slice(0, n);
  const on = t >= T.nClick && t < T.okClick;
  $("fN").className = "in" + (on ? " f" : ""); $("fNc").style.opacity = on && (t < T.type[1] + .05 || Math.floor(t * 2.4) % 2 === 0) ? 1 : 0;
  $("bOk").className = "btn " + (n === NAME.length ? "redp" : "pri dis") + (t >= T.okClick - .05 && t < T.sch ? " dn" : "");
  $("ofs").textContent = s ? "Offboarding finishes when the account is deleted on Dec 26: 3 of 4" : done ? "Offboarding isn’t done until every step is: 3 of 4" : "Offboarding isn’t done until every step is: 1 of 4";
}

function events() { return [["click", T.tClick], ["click", T.dClick], ["click", T.nClick], ["key", T.type[0]], ["click", T.okClick]]; }

Motion.scene({
  // 5 steps: natural length, within the 15 s cap
  T, clicks: [T.tClick, T.dClick, T.nClick, T.okClick], build, render, events
});"""
COMMENT = """  Source for media/user-management/offboarding.mp4. Built by motion/_build/offboarding.py on _build/user_page.py
  (People › Users › Offboard Bren Derlin), with the top bar's alerts bell.
  Follows the Offboarding card (data/guidance.js):
  - a checklist, safe steps first and deletion last; a legal hold check
  - what he owned, with counts, transferred to his manager by default, as a job with progress
  - deletion after a 30-day restore window, confirmed by typing his name; not done until every step is"""
make("offboarding", "Offboarding", COMMENT, CSS, MAIN, SCRIPT, crumb="People / Users / Offboard Bren Derlin")
