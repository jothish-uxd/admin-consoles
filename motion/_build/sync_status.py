import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from sources_page import make, head, LIST

CSS = r"""
#vD { opacity: 0; }
.dh { display: flex; align-items: center; gap: 10px; }
.dh .w { flex: 1; } .dh .w b { display: block; color: var(--ink); font-size: 18px; font-weight: 600; }
.dh .w span { font-size: 12.5px; color: var(--soft); }
.back { font-size: 12.5px; color: var(--soft); margin-bottom: 10px; }
.kv4 { margin-top: 16px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.kv4 > div { border: 1px solid var(--rule); border-radius: 10px; padding: 9px 12px; font-size: 12px; color: var(--soft); }
.kv4 dt { font-size: 12px; color: var(--soft); margin-bottom: 3px; }
.kv4 dd { margin: 0; font-size: 14px; color: var(--ink); font-weight: 600; }
.kv4 dd span { font-weight: 400; font-size: 12px; color: var(--soft); }
.cov { margin-top: 6px; height: 5px; border-radius: 999px; background: var(--hover); overflow: hidden; }
.cov i { display: block; height: 100%; width: 100%; background: var(--ink); transform-origin: left; }
.h3 { margin-top: 18px; font-size: 13.5px; color: var(--ink); font-weight: 600; }
.err { margin-top: 8px; border: 1px solid var(--rule-strong); border-radius: 10px; }
.err > div { display: flex; gap: 14px; align-items: center; padding: 10px 14px; border-top: 1px solid var(--rule); font-size: 12.5px; color: var(--soft); min-height: 58px; box-sizing: border-box; }
.err > div:first-child { border-top: 0; }
.err .tx { flex: 1; line-height: 1.45; } .err .tx b { color: var(--ink); font-weight: 600; }
.err .btn { height: 32px; font-size: 12.5px; white-space: nowrap; }
.alr { margin-top: 14px; display: flex; gap: 9px; align-items: center; font-size: 12.5px; color: var(--ink); }
.alr .s { color: var(--soft); }
"""
OK = '<svg aria-hidden="true"><use href="#ok"/></svg>'
WN = '<svg aria-hidden="true"><use href="#warn"/></svg>'
MAIN = f'''      <div class="view" id="vL">
{head("sources", '<span class="btn sm pri">Add source</span>')}{LIST()}      </div>
      <div class="view" id="vD">
        <div class="back">← Sources</div>
        <div class="dh"><span class="lg">CW</span><div class="w"><b>Coruscant Wiki</b><span id="dS">Wiki · 4 spaces · Partly failing</span></div><span class="btn sm">Re-sync source</span><span class="btn sm">Settings</span></div>
        <div class="sub2"><span class="sg on">Overview</span><span class="sg">Permissions</span><span class="sp"></span></div>
        <dl class="kv4" style="margin:16px 0 0">
          <div><dt>Last synced</dt><dd id="kL">2 days ago <span>· Tue 09:14</span></dd></div>
          <div><dt>Coverage</dt><dd id="kC">85% <span>· 41,220 of 47,400</span></dd><div class="cov"><i id="cvI"></i></div></div>
          <div><dt>Failed</dt><dd id="kF">6,180</dd></div>
          <div><dt>Sign-in</dt><dd>Service account <span>· renews itself</span></dd></div></dl>
        <div class="h3">Why items failed</div>
        <div class="err" aria-live="polite">
          <div id="e1"><span class="st2 e"><svg aria-hidden="true"><use href="#err"/></svg></span><div class="tx"><b>Permission denied · <span id="e1n">5,900 items</span></b><br><span id="e1t">The connector lost access to 3 spaces on Monday. Mon Mothma gave it back 10 minutes ago.</span></div><span id="e1a"><span class="btn pri" id="bRt">Retry 5,900 items</span></span></div>
          <div><span class="st2 w">{WN}</span><div class="tx"><b>File type not supported · 280 items</b><br>Visio diagrams (.vsdx). They’re still found by name, but not by what’s in them.</div><span class="btn">See the 280</span></div>
        </div>
        <div class="alr"><span class="cb" id="cbA"></span>Email me when this source stops syncing or falls a day behind<span class="s">· you and 1 other</span></div>
      </div>'''
SCRIPT = r"""const { $, at, span, easeOut } = Motion;

/* ---------- timeline (scene seconds) ---------- */
const T = {
  rowClick: 1.10, toD: [1.15, 1.40], rtClick: 2.90, run: [3.00, 3.90], alClick: 4.70, endCard: [5.60, 6.05], end: 6.6
};

function build() {
  const r = at("r-wiki", -300, 0);
  $("vD").style.opacity = 1; const rt = at("bRt"), al = at("cbA"); $("vD").style.opacity = 0;
  const cur = [
    [0.00, 960, 640], [0.25, 960, 640], [0.85, r[0], r[1] + 3], [1.15, r[0], r[1] + 3],
    [2.65, rt[0], rt[1] + 3], [2.95, rt[0], rt[1] + 3], [3.90, rt[0] - 80, rt[1] + 40],
    [4.45, al[0], al[1] + 3], [4.75, al[0], al[1] + 3], [5.60, al[0] + 120, al[1] + 40]
  ];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 345, 1.06], [5.35, 650, 345, 1.06], [5.60, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  const d = t >= T.toD[0];
  $("crumb").innerHTML = d ? "/ Content / Sources / <b>Coruscant Wiki</b>" : "/ Content / <b>Sources</b>";
  $("r-wiki").classList.toggle("sel", t >= T.rowClick - .1 && t < T.toD[0]);
  $("vL").style.opacity = t >= T.toD[0] ? 0 : 1; $("vD").style.opacity = t >= T.toD[0] ? 1 : 0;
  // retry the items whose cause is fixed: progress in place, then the numbers move
  const p = span(t, ...T.run, x => x), done = t >= T.run[1], run = t >= T.run[0];
  const left = Math.round(5900 * (1 - p));
  $("bRt") && $("bRt").classList.toggle("dn", t >= T.rtClick - .05 && t < T.run[0]);
  $("e1a").innerHTML = done ? '<span class="st2"><svg aria-hidden="true"><use href="#ok"/></svg>Fixed</span>' : run ? `<span class="st2 s">Retrying · ${left.toLocaleString("en-US")} left</span>` : `<span class="btn pri${t >= T.rtClick - .05 ? " dn" : ""}" id="bRt">Retry 5,900 items</span>`;
  $("e1").querySelector(".st2").className = "st2 " + (done ? "" : "e");
  $("e1").querySelector(".st2").innerHTML = done ? '<svg aria-hidden="true"><use href="#ok"/></svg>' : '<svg aria-hidden="true"><use href="#err"/></svg>';
  $("e1n").textContent = done ? "5,900 items indexed" : "5,900 items";
  const idx = 41220 + Math.round(5900 * p), cov = Math.round(100 * idx / 47400);
  $("kC").innerHTML = `${cov}% <span>· ${idx.toLocaleString("en-US")} of 47,400</span>`;
  $("cvI").style.transform = `scaleX(${idx / 47400})`;
  $("kF").textContent = (6180 - Math.round(5900 * p)).toLocaleString("en-US");
  $("kL").innerHTML = done ? "Just now <span>· 280 skipped</span>" : "2 days ago <span>· Tue 09:14</span>";
  $("dS").textContent = done ? "Wiki · 4 spaces · Up to date" : "Wiki · 4 spaces · Partly failing";
  $("cbA").classList.toggle("on", t >= T.alClick);
}

function events() { return [["click", T.rowClick], ["whoosh", T.toD[0]], ["click", T.rtClick], ["chime", T.run[1]], ["click", T.alClick]]; }

Motion.scene({
  // under 5 steps: natural length, within the 10 s cap
  T, clicks: [T.rowClick, T.rtClick, T.alClick], build, render, events,
  slow: [[1.5, 2.4, 1.2]]
});"""
COMMENT = """  Source for media/knowledge-content/sync-status.mp4. Built by motion/_build/sync_status.py on _build/sources_page.py,
  so Content › Sources is the same page as in the other clips.
  Follows the Sync status card (data/guidance-content.js):
  - per source: items indexed, failed, last synced in words, state in text and icon; Partly failing, not green
  - a sign-in that's about to expire is shown before sync breaks
  - errors grouped by cause, each with what happened and the fix; retry one group
  - an alert when a source stops syncing or falls behind"""
make("sync-status", "Sync status", COMMENT, CSS, "Content / Sources", MAIN, SCRIPT)
