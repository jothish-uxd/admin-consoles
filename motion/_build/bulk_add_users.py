import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from shell import make
from import_page import CSS as ICSS, head
import bell

CSS = ICSS + r"""
.view { position: absolute; inset: 0; padding: 20px 32px; }
.card2 { margin-top: 12px; border: 1px solid var(--rule-strong); border-radius: 12px; padding: 12px 16px; font-size: 12.5px; color: var(--soft); }
.card2 h3 { margin: 0; font-size: 14px; color: var(--ink); font-weight: 600; display: flex; align-items: center; gap: 8px; }
.card2 h3 svg { width: 15px; height: 15px; }
.pr2 { margin-top: 8px; display: flex; align-items: center; gap: 10px; color: var(--ink); }
.pb2 { flex: 1; height: 6px; border-radius: 999px; background: var(--hover); overflow: hidden; } .pb2 i { display: block; height: 100%; background: var(--ink); }
.fl { display: none; }
.fr2 { display: grid; grid-template-columns: 70px 1fr auto; gap: 10px; align-items: center; padding: 8px 0; border-top: 1px solid var(--rule); color: var(--ink); }
.fr2:first-of-type { border-top: 0; }
.fr2 .rn { color: var(--soft); font-family: "Geist Mono", monospace; font-size: 12px; }
.fr2 .why { display: block; color: #b91c1c; font-size: 12px; margin-top: 2px; }
.fr2 .why.ok { color: #15803d; }
.fr2 .btn { height: 30px; }
.fr2 .in { height: 30px; width: 170px; justify-content: space-between; display: inline-flex; align-items: center; border: 1.5px solid var(--rule-strong); border-radius: 8px; padding: 0 10px; box-sizing: border-box; color: var(--ink); font-size: 12.5px; position: relative; }
.fr2 .in.f { border-color: var(--ink); }
.mm { position: absolute; left: 0; top: 34px; width: 210px; z-index: 6; display: none; }
.mm .it { color: var(--ink); } .mm .it span { color: var(--soft); font-size: 12px; margin-left: 6px; }
.ft5 { margin-top: 10px; display: flex; gap: 8px; align-items: center; } .ft5 .sp { flex: 1; } .ft5 .btn { height: 32px; }
.ft5 .nt { color: var(--soft); font-size: 12px; }
.hist table { width: 100%; border-collapse: collapse; font-size: 12.5px; margin-top: 6px; }
.hist th { text-align: left; font-size: 12px; color: var(--soft); font-weight: 500; padding: 0 8px 6px; border-bottom: 1px solid var(--rule); }
.hist td { height: 36px; padding: 0 8px; border-bottom: 1px solid var(--rule); color: var(--soft); }
.hist td b { color: var(--ink); font-weight: 500; }
.hist td a { color: var(--ink); text-decoration: underline; text-underline-offset: 3px; }
.btn.pri.dis { background: var(--subtle); color: var(--faint); border-color: var(--rule); }
"""
OKI = '<svg aria-hidden="true" viewBox="0 0 16 16" style="color:#15803d"><circle cx="8" cy="8" r="6.6" fill="currentColor"/><path d="M5 8.3l2 2 4-4.3" fill="none" stroke="#fff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>'
ERI = '<svg aria-hidden="true" viewBox="0 0 16 16" style="color:#b91c1c"><circle cx="8" cy="8" r="6.6" fill="currentColor"/><path d="M8 4.6v4.1" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/><circle cx="8" cy="11.2" r="1.05" fill="#fff"/></svg>'
MAIN = f'''      <div class="view imp">
{head(4)}        <div class="card2"><h3 id="rH">Adding 46 people</h3>
          <div class="pr2" role="status"><span class="pb2"><i id="pI" style="width:0%"></i></span><span id="pN">0 of 46</span></div>
          <div style="margin-top:6px" id="rS">Running in the background. You can leave this page; you’ll be told when it’s done.</div></div>
        <div class="card2 fl" id="fl"><h3>{ERI}<span id="flH">2 rows couldn’t be added</span></h3><div style="margin-top:2px">Fix them here. The 44 already added stay; you don’t need the file again.</div>
          <div style="margin-top:6px">
            <div class="fr2"><span class="rn">Row 22</span><div>jes.gistang@echobase.org<span class="why" id="w22">Already has a pending invite from Nov 20</span></div><span id="a22"><span class="btn" id="b22">Resend that invite instead</span></span></div>
            <div class="fr2"><span class="rn">Row 41</span><div>orrin.vale@echobase.org<span class="why" id="w41">Manager “C. Alder” isn’t a person here</span></div><span id="a41"><span class="in" id="s41"><span id="s41t">Pick a manager</span><i class="cv"></i><div class="menu mm" id="mm"><div class="it" id="oCa">Cal Alder<span>Patrol lead · Fleet</span></div><div class="it">Cal Kestis<span>Command</span></div></div></span></span></div></div>
          <div class="ft5"><span class="nt">Running the same file again is safe: people already added are skipped.</span><span class="sp"></span><span class="btn">Download the 2 rows</span><span class="btn pri dis" id="bRt">Add 2 people</span></div></div>
        <div class="card2 hist"><h3>Import history</h3><table><thead><tr><th>When</th><th>By</th><th>File</th><th>Result</th></tr></thead><tbody>
          <tr><td><b id="hW">Running now</b></td><td>You</td><td><a>fleet-recruits-nov.csv</a></td><td id="hR">—</td></tr>
          <tr><td>Oct 2</td><td>Cal Alder</td><td><a>hangar-3-crew.csv</a></td><td>18 added · <a>report</a></td></tr></tbody></table></div>
      </div>
'''
SCRIPT = r"""const { $, at, span, easeOut } = Motion;

/* ---------- timeline (scene seconds) ---------- */
const T = { prog: [0.40, 2.60], fl: 2.70, c22: 3.80, s41: 4.80, p41: 5.60, rt: 6.60, done: 6.70, endCard: [8.60, 9.05], end: 9.55 };

function build() {
  $("fl").style.display = "block"; const b = at("b22"), s = at("s41"), r = at("bRt"); $("mm").style.display = "block"; const o = at("oCa", -40, 0); $("mm").style.display = ""; $("fl").style.display = "";
  const cur = [[0.00, 960, 640], [0.25, 960, 640], [3.45, b[0], b[1] + 3], [3.85, b[0], b[1] + 3], [4.45, s[0], s[1] + 3], [4.85, s[0], s[1] + 3],
    [5.25, o[0], o[1] + 3], [5.65, o[0], o[1] + 3], [6.25, r[0], r[1] + 3], [6.65, r[0], r[1] + 3], [8.60, r[0] - 260, r[1] + 100]];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 345, 1.04], [8.35, 650, 345, 1.04], [8.60, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  $("crumb").innerHTML = "/ People / Users / <b>Import</b>";
  // a background job with progress, then a result that names what failed and why
  const k = span(t, ...T.prog, x => x), f = t >= T.fl, d = t >= T.done;
  const n = d ? 46 : f ? 44 : Math.round(44 * k);
  $("pI").style.width = (d ? 100 : f ? 95.6 : 95.6 * k) + "%"; $("pN").textContent = `${n} of 46`;
  $("rH").innerHTML = d ? "46 people added" : f ? "44 added · 2 need a fix" : "Adding 46 people";
  $("rS").textContent = d ? "All 46 are in Fleet, as Members. They’ve been invited to sign in." : "Running in the background. You can leave this page; you’ll be told when it’s done.";
  $("fl").style.display = f && !d ? "block" : "none";
  // fix the two rows here, not in the file
  const a = t >= T.c22, b = t >= T.p41;
  $("a22").style.display = a ? "none" : ""; $("w22").className = "why" + (a ? " ok" : ""); $("w22").textContent = a ? "Their invite will be resent" : "Already has a pending invite from Nov 20";
  $("s41").classList.toggle("f", t >= T.s41 && !b); $("mm").style.display = t >= T.s41 && !b ? "block" : "none"; $("oCa").classList.toggle("hov", t >= T.p41 - .3); $("s41t").textContent = b ? "Cal Alder" : "Pick a manager";
  $("w41").className = "why" + (b ? " ok" : ""); $("w41").textContent = b ? "Manager set to Cal Alder" : "Manager “C. Alder” isn’t a person here";
  $("bRt").className = "btn pri" + (a && b ? "" : " dis") + (t >= T.rt - .05 && t < T.done ? " dn" : "");
  $("hW").textContent = d ? "Today, 10:42" : "Running now"; $("hR").innerHTML = d ? '46 added · <a>report</a>' : f ? "44 added · 2 to fix" : "—";
}

function events() { return [["click", T.c22], ["click", T.s41], ["click", T.p41], ["click", T.rt]]; }

Motion.scene({
  // under 5 steps: natural length, within the 10 s cap
  T, clicks: [T.c22, T.s41, T.p41, T.rt], build, render, events, duration: 9.8
});"""
COMMENT = """  Source for media/user-management/bulk-add-users.mp4. Built by motion/_build/bulk_add_users.py on _build/import_page.py
  (People › Users › Import, step 4, after the CSV import, Field mapping and Validation & errors clips), with the top bar's alerts bell.
  Follows the Bulk add users card (data/guidance.js):
  - the import runs as a background job with progress
  - what failed is named by row, with why and a fix, fixed here without the file; the rest stays added
  - re-running the same file is safe; a history of imports with who ran them, the file and the result"""
make("bulk-add-users", "Bulk add users", COMMENT, CSS, "People / Users / Import", "people", MAIN, SCRIPT)
bell.add("bulk-add-users", 3)
