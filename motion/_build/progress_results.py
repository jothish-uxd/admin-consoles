import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from tables_page import make
CSS = r"""
.job { margin-top: 14px; border: 1px solid var(--rule-strong); border-radius: 12px; padding: 12px 16px; font-size: 13px; color: var(--soft); position: relative; }
.job .h { display: flex; align-items: center; gap: 10px; }
.job .h b { color: var(--ink); font-size: 14px; font-weight: 600; }
.job .h .sp { flex: 1; }
.job .st { position: relative; height: 22px; flex: 1; }
.job .st > div { position: absolute; left: 0; top: 0; white-space: nowrap; display: flex; gap: 8px; align-items: center; }
.job .pb { margin-top: 8px; height: 8px; border-radius: 999px; background: var(--hover); overflow: hidden; }
.job .pb i { display: block; height: 100%; background: var(--ink); transform-origin: left center; }
.job .ln { margin-top: 6px; font-size: 12.5px; position: relative; height: 18px; }
.job .ln span { position: absolute; left: 0; top: 0; white-space: nowrap; }
.job .ln b { color: var(--ink); font-weight: 600; }
.res { margin-top: 10px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.res div { border: 1px solid var(--rule); border-radius: 8px; padding: 8px 10px; font-size: 12px; }
.res b { display: block; font-size: 16px; color: var(--ink); font-weight: 600; }
.res .bad { border-color: #b91c1c; }
.res .bad b { color: #b91c1c; }
.job .acts { margin-top: 10px; display: flex; gap: 8px; }
.job .btn { height: 30px; font-size: 12.5px; }
.btn.dn { background: #404040; border-color: #404040; }
.tag { font-size: 11.5px; font-weight: 600; border: 1px solid var(--ink); color: var(--ink); border-radius: 999px; padding: 1px 8px; }
.tag.warn { border-color: #b91c1c; color: #b91c1c; }
.x2 { color: var(--faint); font-size: 14px; }
"""
JOBS = r"""        <div class="job" id="job" role="status" aria-live="polite">
          <div class="h"><b>Add Hoth Evacuation to 82 people</b><span class="sp"></span><span class="tag" id="tg">Running</span><span class="x2" id="xx">✕</span></div>
          <div id="run"><div class="pb" role="progressbar" aria-label="Adding Hoth Evacuation" aria-valuemin="0" aria-valuemax="82"><i id="pbI"></i></div>
            <div class="ln"><span id="pT"><b>12 of 82</b> done · about 40 seconds left · you can leave this page, we’ll notify you</span></div></div>
          <div id="done" style="display:none">
            <div class="ln"><span id="dT">Started by Lavanya Sienna at 10:42 · finished at 10:43</span></div>
            <div class="res"><div><b id="nA">79</b>added</div><div><b>2</b>skipped · already in the group</div><div class="bad" id="fBox"><b id="nF">1</b><span id="fT">failed · Zev Senesca’s account is locked</span></div></div>
            <div class="acts"><span class="btn pri" id="retry">Retry failed (1)</span><span class="btn">Download list</span><span class="btn ghost">View in audit log</span></div>
          </div>
        </div>
"""
SCRIPT = r"""const { $, at, span, easeOut } = Motion;
const ROWS = [["hobbie", "Fleet, Rogue Squadron"], ["cal", "Fleet"], ["zev", "Fleet"], ["wes", "Fleet, Shield Ops"], ["bren", "Fleet"], ["jes", "Fleet"], ["ved", "Fleet, Hangar 3"]];

/* ---------- timeline (scene seconds) ---------- */
const T = {
  run: [0.20, 3.40], done: 3.50, retryClick: 5.30, retrying: [5.40, 6.10],
  endCard: [7.70, 8.15], end: 8.8
};

function build() {
  $("run").style.display = "none"; $("done").style.display = ""; const r = at("retry"); $("done").style.display = "none"; $("run").style.display = "";
  const cur = [
    [0.00, 980, 620], [1.80, 900, 560], [3.40, 860, 520], [5.10, r[0], r[1] + 3], [5.40, r[0], r[1] + 3],
    [6.60, r[0] + 120, r[1] + 140], [7.70, r[0] + 122, r[1] + 142]
  ];
  const cam = [
    [0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00],
    [0.90, 724, 330, 1.15], [7.40, 724, 330, 1.15],     // one steady view: the job and the list under it
    [7.70, 656, 360, 1.04]
  ];
  return { cam, cur };
}

function render(t) {
  const p = span(t, ...T.run, x => x), done = Math.round(12 + 70 * p);
  const fin = t >= T.done, retried = t >= T.retrying[1];
  $("run").style.display = fin ? "none" : ""; $("done").style.display = fin ? "" : "none";
  $("pbI").style.width = "100%"; $("pbI").style.transform = `scaleX(${(12 + 70 * p) / 82})`;
  const left = Math.max(5, Math.round(40 * (1 - p) / 5) * 5);
  $("pT").innerHTML = `<b>${done} of 82</b> done · about ${left} seconds left · you can leave this page, we’ll notify you`;
  // the list keeps working, and picks up the change as people are done
  ROWS.forEach(([id, g], i) => {
    const ok = id === "zev" ? retried : t >= T.run[0] + (i + 1) * .42;   // Zev's account is locked until the retry
    $("g-" + id).textContent = ok ? g + ", Hoth Evacuation" : g;
  });
  // results: in numbers and words; they stay until dismissed
  $("tg").textContent = !fin ? "Running" : t >= T.retrying[0] && !retried ? "Retrying 1" : retried ? "Done" : "Done with issues";
  $("tg").className = fin && !retried && !(t >= T.retrying[0]) ? "tag warn" : "tag";
  $("xx").style.display = fin ? "" : "none";
  $("nA").textContent = retried ? "80" : "79";
  $("nF").textContent = retried ? "0" : "1";
  $("fT").textContent = retried ? "failed · Zev Senesca added on retry" : "failed · Zev Senesca’s account is locked";
  $("fBox").className = retried ? "" : "bad";
  $("retry").style.display = retried ? "none" : "";
  $("retry").classList.toggle("dn", t >= T.retryClick - .05 && t < T.retrying[1]);
  $("retry").textContent = t >= T.retrying[0] && !retried ? "Retrying…" : "Retry failed (1)";
  $("dT").textContent = retried ? "Started by Lavanya Sienna at 10:42 · retried 1 at 10:44 · 80 added, 2 skipped" : "Started by Lavanya Sienna at 10:42 · finished at 10:43";
  $("mt").innerHTML = "<b>82 people</b> match Team: Fleet · sorted by name";
}

function events() { return [["chime", T.done], ["click", T.retryClick], ["chime", T.retrying[1]]]; }

Motion.scene({
  // natural length, within the 15 s cap
  T, clicks: [T.retryClick], build, render, events,
  slow: [[3.6, 5.0, 1.7], [6.2, 7.3, 1.5]]
});"""
COMMENT = """  Source for media/edit-bulk-actions/progress-results.mp4. Built by motion/_build/progress_results.py
  on motion/_build/users_page.py, so People › Users is the same page in every Edit & bulk actions clip.
  Follows the Progress & results card (data/guidance-actions.js):
  - the job from Bulk edit runs above the list: counts and an estimate, a labelled progress bar
  - the page stays usable, the list picks up the change, and she can leave and be notified
  - it finishes as Done with issues, not Done: 79 added, 2 skipped (already in the group), 1 failed with the reason
  - Retry failed acts on just the 1 that failed; Download list and the audit log are there
  - results stay until dismissed"""
make("progress-results", "Progress & results", COMMENT, CSS, "", "", SCRIPT, jobs=JOBS)
