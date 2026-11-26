import sys, pathlib; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from content_page import make
CSS = r"""
/* no results */
.search.focus { border-color: var(--ink); box-shadow: 0 0 0 3px rgba(23,23,23,.08); color: var(--ink); }
.search .q { color: var(--ink); white-space: pre; }
.search .c { width: 1.5px; height: 17px; background: var(--ink); }
.search .ph { white-space: nowrap; }
.nr { display: grid; justify-items: center; text-align: center; padding: 40px 20px 0; font-size: 13.5px; color: var(--soft); line-height: 1.5; }
.nr h2 { margin: 0; font-size: 17px; color: var(--ink); }
.nr .ap { margin-top: 10px; display: flex; gap: 8px; align-items: center; flex-wrap: wrap; justify-content: center; font-size: 12.5px; }
.nr .chip2 { display: inline-flex; gap: 6px; align-items: center; border: 1px solid var(--rule-strong); border-radius: 999px; padding: 3px 10px; color: var(--ink); font-size: 12.5px; }
.nr .chip2 .x { color: var(--faint); }
.nr .hint { margin-top: 12px; }
.nr .hint b { color: var(--ink); font-weight: 600; }
.nr .r { margin-top: 14px; display: flex; gap: 8px; }
.nr .r .btn { height: 34px; }
.nr .r .btn.dn { background: #404040; border-color: #404040; }
"""
SCRIPT = r"""const { $, at, span, easeOut } = Motion;
const Q = "trench plans";

/* ---------- timeline (scene seconds) ---------- */
const T = {
  srchClick: 1.20, type: [1.40, 2.20], res: 2.35, shareClick: 3.40, menu: [3.45, 4.15], pubClick: 4.05, none: 4.20,
  removeClick: 6.10, back: 6.20, endCard: [7.50, 7.95], end: 8.6
};

function seq(a, b, t, at) { $(a).style.opacity = 1 - span(t, at, at + .12); $(b).style.opacity = span(t, at + .14, at + .3); }

function build() {
  const s = at("sBox", -160, 0), fs = at("fShare"), ar = at("area");
  $("menu").style.opacity = 1; const op = at("optPub", -40, 0); $("menu").style.opacity = 0;
  $("nr").style.opacity = 1; const rm = at("bRemove"); $("nr").style.opacity = 0;
  const cur = [
    [0.00, 860, 650], [0.25, 860, 650], [1.05, s[0], s[1] + 3], [1.30, s[0], s[1] + 3], [2.40, s[0] + 120, s[1] + 60],
    [3.20, fs[0], fs[1] + 3], [3.50, fs[0], fs[1] + 3], [3.85, op[0], op[1] + 3], [4.15, op[0], op[1] + 3],
    [5.00, op[0] - 80, op[1] + 90], [5.90, rm[0], rm[1] + 3], [6.25, rm[0], rm[1] + 3], [7.50, rm[0] + 40, rm[1] + 80]
  ];
  const cam = [
    [0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00],
    [0.95, 740, ar[1] - 105, 1.24], [7.25, 740, ar[1] - 105, 1.24],     // one steady view: search, filters, and the results area
    [7.50, 656, 360, 1.04]
  ];
  return { cam, cur };
}

function render(t) {
  ["tB", "tC", "gC", "m1", "m2"].forEach(x => $(x).style.opacity = 0);
  // search
  $("sBox").classList.toggle("focus", t >= T.srchClick && t < T.shareClick);
  const n = Math.round(Q.length * span(t, ...T.type, x => x));
  const typed = t >= T.type[0];
  $("ph").style.display = typed ? "none" : ""; $("q").textContent = Q.slice(0, n);
  $("cr").style.opacity = t >= T.srchClick && t < T.shareClick && (t < T.type[0] || t > T.type[1] ? Math.floor(t * 2.4) % 2 === 0 : true) ? 1 : 0;
  // Sharing filter
  const mo = span(t, T.menu[0], T.menu[0] + .15, easeOut) * (1 - span(t, T.menu[1] - .08, T.menu[1]));
  $("menu").style.opacity = mo; $("menu").style.transform = `translateY(${(1 - mo) * -4}px)`;
  $("optPub").classList.toggle("hov", t > T.pubClick - .25 && t < T.menu[1]);
  const pub = t >= T.pubClick && t < T.back;
  $("fShare").classList.toggle("on", pub);
  $("fsL").innerHTML = pub ? "Sharing: <b>Public link</b>" : "Sharing";
  // results area: all content → 2 results → no results → 2 results, one at a time
  if (t < T.res) { $("tA").style.opacity = 1; $("tR").style.opacity = 0; $("nr").style.opacity = 0; }
  else if (t < T.none) { $("nr").style.opacity = 0; seq("tA", "tR", t, T.res); }
  else if (t < T.back) { $("tA").style.opacity = 0; seq("tR", "nr", t, T.none); }
  else { $("tA").style.opacity = 0; seq("nr", "tR", t, T.back); }
  // the count line says the same thing
  const line = t < T.res + .14 ? 0 : t < T.none + .14 ? 1 : t < T.back + .14 ? 2 : 1;
  ["m0", "mR", "mN"].forEach((id, i) => $(id).style.opacity = line === i ? 1 : 0);
  $("bRemove").classList.toggle("dn", t >= T.removeClick - .05 && t < T.back);
}

function events() { return [["click", T.srchClick], ["key", T.type[0]], ["click", T.shareClick], ["click", T.pubClick], ["click", T.removeClick]]; }

Motion.scene({
  // 5 steps: natural length, within the 15 s cap
  T, clicks: [T.srchClick, T.shareClick, T.pubClick, T.removeClick], build, render, events,
  slow: [[4.4, 5.8, 1.8]]
});"""
COMMENT = """  Source for media/empty-onboarding/no-results.mp4. Built by motion/_build/no_results.py
  from asset-library/scene.html, so Content › All content is the same page.
  Follows the No results card (data/guidance-foundations.js):
  - a search finds 2 items; adding Sharing: Public link finds none
  - the message says nothing matched, and shows the search and the filter that caused it
  - it says how many match without that filter, and offers to remove it in one click
  - the filter controls stay visible and nothing is cleared automatically
  - it looks nothing like a first-run empty table"""
TR = '''        <div id="tR" style="opacity:0"><table><thead><tr><th class="ck"><span class="cb"></span></th><th>Name</th><th>Owner</th><th>Sharing</th><th>Last activity</th><th class="num">Size</th></tr></thead><tbody>
            <tr><td class="ck"><span class="cb"></span></td><td><div class="nm"><span class="ty">PDF</span>Death Star trench plans.pdf</div></td><td class="own"><div class="a">Gen. Dodonna</div><div class="b">Command</div></td><td><span class="sh">Internal</span></td><td>2 days ago</td><td class="num">8.4 MB</td></tr>
            <tr><td class="ck"><span class="cb"></span></td><td><div class="nm"><span class="ty">MP4</span>Trench run briefing.mp4</div></td><td class="own"><div class="a">Gen. Dodonna</div><div class="b">Command</div></td><td><span class="sh">Internal</span></td><td>4 days ago</td><td class="num">1.2 GB</td></tr>
          </tbody></table></div>
        <div id="nr" class="nr" style="opacity:0" role="status"><h2>No items match “trench plans” with this filter</h2>
          <div class="ap">Searched for <span class="chip2">“trench plans” <span class="x">✕</span></span> with <span class="chip2">Sharing: Public link <span class="x">✕</span></span></div>
          <div class="hint"><b>2 items</b> match without the Sharing filter. Neither is shared by public link.</div>
          <div class="r"><span class="btn pri" id="bRemove">Remove Sharing filter</span><span class="btn">Clear search and filters</span></div></div>
'''
s = make("no-results", "No results", COMMENT, CSS, "", "", SCRIPT)
s = s.replace('<div class="search"><svg><use href="#srch"/></svg>Search name, owner, type or tag</div>',
              '<div class="search" id="sBox"><svg><use href="#srch"/></svg><span class="ph" id="ph">Search name, owner, type or tag</span><span class="q" id="q"></span><span class="c" id="cr"></span></div>', 1)
s = s.replace('<span id="m2" style="opacity:0"><b>3 items</b> owned by deactivated people, shared by public link</span>',
              '<span id="m2" style="opacity:0"><b>3 items</b> owned by deactivated people, shared by public link</span><span id="mR" style="opacity:0"><b>2 items</b> match “trench plans”</span><span id="mN" style="opacity:0"><b>No items</b> match “trench plans” with Sharing: Public link</span>', 1)
i = s.index('        <div id="tC"'); s = s[:i] + TR + s[i:]
(pathlib.Path(__file__).resolve().parent.parent / "no-results/scene.html").write_text(s)
