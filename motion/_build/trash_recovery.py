import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from storage_page import make, head, WN

CSS = r"""
.tb { margin-top: 14px; display: flex; align-items: center; gap: 8px; }
.tb .sp { flex: 1; }
.tb .srch { width: 250px; height: 34px; border: 1px solid var(--rule-strong); border-radius: 8px; display: flex; align-items: center; gap: 8px; padding: 0 10px; color: var(--faint); font-size: 13px; box-sizing: border-box; }
.tb .srch svg { width: 14px; height: 14px; color: var(--soft); }
.tb .flt2 { white-space: nowrap; height: 34px; display: inline-flex; align-items: center; gap: 6px; padding: 0 12px; border: 1px solid var(--rule-strong); border-radius: 8px; color: var(--ink); font-size: 12.5px; }
.tb .flt2.on { background: var(--ink); color: #fff; border-color: var(--ink); }
.tb .nt { color: var(--soft); font-size: 12px; white-space: nowrap; }
.ban { margin-top: 12px; display: flex; align-items: center; gap: 10px; border: 1px solid #b45309; background: #fffbeb; border-radius: 10px; padding: 9px 12px; color: var(--ink); font-size: 12.5px; }
.ban .sp { flex: 1; } .ban .btn { height: 30px; }
.ban.pr { border-color: var(--rule-strong); background: var(--subtle); display: none; }
.pbar { width: 160px; height: 6px; border-radius: 999px; background: var(--rule); overflow: hidden; }
.pbar i { display: block; height: 100%; background: var(--ink); }
.sbar2 { display: none; margin-top: 10px; height: 44px; border-radius: 10px; background: var(--ink); color: #fff; align-items: center; gap: 10px; padding: 0 8px 0 14px; font-size: 13px; }
.sbar2 .sp { flex: 1; } .sbar2 .btn { height: 30px; background: #fff; color: var(--ink); border-color: #fff; }
.emp { color: #b91c1c; border-color: #fca5a5; }
td .ex2 { display: block; color: var(--soft); font-size: 12px; }
#tB { display: none; }
.dlg .lc { margin-top: 10px; }
.dlg .lc .in { justify-content: space-between; }
"""
SRCH = '<svg aria-hidden="true"><use href="#srch"/></svg>'
def r(i, ty, nm, loc, who, when, gone):
    return f'<tr id="{i}"><td class="ck"><span class="cb" id="{i}-c"></span></td><td><b><span class="ty">{ty}</span>{nm}</b></td><td>{loc}</td><td><b style="font-weight:400">{who}</b><span class="ex2">{when}</span></td><td><b style="font-weight:400">{gone[0]}</b><span class="ex2">{gone[1]}</span></td></tr>'
HEAD = '<thead><tr><th class="ck"><span class="cb" id="cAll{}"></span></th><th style="width:30%">Name</th><th style="width:22%">Was in</th><th>Deleted by</th><th>Deleted forever</th></tr></thead>'
A = "".join([r("a1", "PDF", "Draft evacuation plan.pdf", "Command / Plans", "Gen. Rieekan", "Nov 20, 4:12 pm", ("Dec 20", "in 24 days")),
             r("a2", "DOC", "Ration counts.docx", "Logistics", "Toryn Farr", "Nov 12, 9:40 am", ("Dec 12", "in 16 days")),
             r("a3", "MP4", "Sim run 41.mp4", "Rogue Squadron / Sims", "Biggs Darklighter", "Today, 2:48 pm", ("Dec 26", "in 30 days")),
             r("a4", "XLS", "Patrol rota.xlsx", "Rogue Squadron", "Biggs Darklighter", "Today, 2:31 pm", ("Dec 26", "in 30 days"))])
B = "".join([r("b1", "MP4", "Sim run 41.mp4", "Rogue Squadron / Sims", "Biggs Darklighter", "Today, 2:48 pm", ("Dec 26", "in 30 days")),
             r("b2", "XLS", "Patrol rota.xlsx", "Rogue Squadron", "Biggs Darklighter", "Today, 2:31 pm", ("Dec 26", "in 30 days")),
             r("b3", "PDF", "Pilot handbook.pdf", "Rogue Squadron / Training", "Biggs Darklighter", "Today, 2:24 pm", ("Dec 26", "in 30 days")),
             r("b4", "DIR", "Sims", "Rogue Squadron", "Biggs Darklighter", "Today, 2:10 pm", ("Dec 26", "in 30 days"))])
RIGHT = '<span class="sp" style="flex:1"></span><span class="btn sm emp">Empty trash…</span>'
MAIN = f'''      <div class="view">
{head("Trash", right=RIGHT).replace('<div class="hd"><h1>Content</h1>', '<div class="hd" style="display:flex;align-items:center"><h1>Content</h1>')}        <div class="tb"><span class="srch">{SRCH}Search trash across Echo Base</span><span class="flt2" id="fBy"><span id="fByT">Deleted by</span><i class="cv"></i></span><span class="flt2" id="fWh"><span id="fWhT">When</span><i class="cv"></i></span><span class="sp"></span><span class="nt">30 days in trash · 310 GB, counted in storage</span></div>
        <div class="ban" id="ban">{WN}<span><b>1,204 items deleted from Biggs Darklighter’s account in 40 minutes</b>, today 2:10–2:50 pm. That’s unusual.</span><span class="sp"></span><span class="btn" id="bRv">Review them</span></div>
        <div class="ban pr" id="prg" role="status"><span>Restoring 1,204 items in the background</span><span class="pbar"><i id="pI" style="width:0%"></i></span><span id="pN">0%</span><span class="sp"></span><span>We’ll tell you when it’s done</span></div>
        <div class="sbar2" id="sb"><span>All 1,204 selected</span><span class="sp"></span><span class="btn" id="bRs">Restore</span></div>
        <table class="sx" id="tA">{HEAD.format("A")}<tbody>{A}</tbody></table>
        <table class="sx" id="tB">{HEAD.format("")}<tbody>{B}</tbody></table>
      </div>
'''
EXTRA = f'''    <div class="scr" id="scr"></div>
    <section class="dlg" id="dlg" role="dialog" aria-labelledby="dT" style="left:350px; top:229px; width:500px">
      <h3 id="dT">Restore 1,204 items?</h3>
      <div style="margin-top:8px;line-height:1.5;color:var(--ink)">1,180 go back where they were. <b>24 were in Rogue Squadron / Sims</b>, which is in trash too, so it’s restored first and they go back in it.</div>
      <div class="lc"><span class="lbl">If a folder can’t be restored, put its items in</span><span class="in">Archives / Restored from trash<i class="cv"></i></span></div>
      <div class="ft"><span class="sp"></span><span class="btn">Cancel</span><span class="btn pri" id="bOk">Restore 1,204 items</span></div>
    </section>'''
SCRIPT = r"""const { $, at, span, easeOut } = Motion;

/* ---------- timeline (scene seconds) ---------- */
const T = { rvClick: 1.30, allClick: 2.50, rsClick: 3.50, open: [3.55, 3.80], okClick: 5.20, close: [5.25, 5.45], prog: [5.50, 7.20], endCard: [7.60, 8.05], end: 8.55 };

function build() {
  const rv = at("bRv");
  $("tA").style.display = "none"; $("tB").style.display = "table"; $("ban").style.display = "none"; const a = at("cAll");
  $("sb").style.display = "flex"; const rs = at("bRs"); $("sb").style.display = "";
  $("tA").style.display = ""; $("tB").style.display = ""; $("ban").style.display = "";
  $("dlg").style.opacity = 1; const ok = at("bOk"); $("dlg").style.opacity = 0;
  const cur = [[0.00, 960, 640], [0.25, 960, 640], [1.00, rv[0], rv[1] + 3], [1.35, rv[0], rv[1] + 3], [2.20, a[0], a[1] + 3], [2.55, a[0], a[1] + 3],
    [3.20, rs[0], rs[1] + 3], [3.55, rs[0], rs[1] + 3], [4.90, ok[0], ok[1] + 3], [5.25, ok[0], ok[1] + 3], [7.60, ok[0] - 260, ok[1] + 140]];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 345, 1.04], [7.35, 650, 345, 1.04], [7.60, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  $("crumb").innerHTML = "/ Content / <b>Trash</b>";
  // an unusual mass deletion is flagged; Review filters to that person and time window
  const v = t >= T.rvClick, done = t >= T.close[0];
  $("ban").style.display = v ? "none" : "flex";
  $("fBy").classList.toggle("on", v); $("fByT").textContent = v ? "Deleted by: Biggs Darklighter" : "Deleted by";
  $("fWh").classList.toggle("on", v); $("fWhT").textContent = v ? "Today, 2:10–2:50 pm" : "When";
  $("tA").style.display = v ? "none" : "table"; $("tB").style.display = v ? "table" : "none";
  const s = t >= T.allClick && !done;
  $("cAll").classList.toggle("on", s); ["b1", "b2", "b3", "b4"].forEach(i => { $(i + "-c").classList.toggle("on", s); $(i).classList.toggle("sel", s); });
  $("sb").style.display = s ? "flex" : "none";
  $("bRs").classList.toggle("dn", t >= T.rsClick - .05 && t < T.open[0] + .1);
  const o = span(t, ...T.open, easeOut) * (1 - span(t, ...T.close, easeOut));
  $("dlg").style.opacity = o; $("scr").style.opacity = o; $("dlg").style.visibility = o > 0 ? "visible" : "hidden";
  $("bOk").classList.toggle("dn", t >= T.okClick - .05 && t < T.close[0]);
  // the restore runs in the background, with progress
  $("prg").style.display = done ? "flex" : "none";
  const p = Math.round(100 * span(t, ...T.prog, x => x) * .62);
  $("pI").style.width = p + "%"; $("pN").textContent = p + "%";
}

function events() { return [["click", T.rvClick], ["click", T.allClick], ["click", T.rsClick], ["whoosh", T.open[0]], ["click", T.okClick]]; }

Motion.scene({
  // under 5 steps: natural length, within the 10 s cap
  T, clicks: [T.rvClick, T.allClick, T.rsClick, T.okClick], build, render, events, duration: 9.8
});"""
COMMENT = """  Source for media/storage-quotas/trash-recovery.mp4. Built by motion/_build/trash_recovery.py on _build/storage_page.py
  (Content › Trash), with the top bar's alerts bell.
  Follows the Trash & recovery card (data/guidance-content.js):
  - trash searchable across the org; each item with where it was, who deleted it and when it's deleted forever (date and time left)
  - an unusual mass deletion is flagged; review it by person and time window
  - bulk restore to where items were, with a place for anything whose folder can't come back
  - restore runs in the background with progress; Empty trash is kept well away from Restore"""
make("trash-recovery", "Trash & recovery", COMMENT, CSS, "Content / Trash", MAIN, SCRIPT, extra=EXTRA)
