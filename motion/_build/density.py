import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from tables_page import make

CSS = r"""
#bDen { position: relative; }
.dm { position: absolute; right: 0; top: 40px; width: 250px; z-index: 20; display: none; font-weight: 400; }
.dm .it { color: var(--ink); font-size: 13px; display: flex; gap: 10px; align-items: flex-start; }
.dm .it span.d { display: block; font-size: 11.5px; color: var(--soft); }
.dm .rb { width: 14px; height: 14px; border-radius: 50%; border: 1.5px solid var(--rule-strong); box-sizing: border-box; flex: none; margin-top: 2px; }
.dm .rb.on { border: 4.5px solid var(--ink); }
.dm .nt2 { border-top: 1px solid var(--rule); margin-top: 4px; padding: 8px 10px 4px; font-size: 12px; color: var(--soft); }
.cmp .u td { height: 36px; }
.cmp .pp .av { width: 22px; height: 22px; font-size: 9px; }
.cmp .pp .s { display: inline; margin-left: 8px; }
.cmp .pp > div { white-space: nowrap; }
#denT { display: inline-block; min-width: 84px; }
"""
MENU = ('<div class="menu dm" id="dm" role="menu" aria-label="Density"><div class="it" id="oC"><span class="rb on" id="rC"></span><div>Comfortable<span class="d">Room to read and click</span></div></div>'
        '<div class="it" id="oK"><span class="rb" id="rK"></span><div>Compact<span class="d">More rows. Same text size and targets</span></div></div><div class="nt2">Saved for you, on every table</div></div>')
def edit(s):
    return s.replace('<span class="fb" id="bDen"><span id="denT">Comfortable</span><i class="cv"></i></span>',
                     f'<span class="fb" id="bDen"><span id="denT">Comfortable</span><i class="cv"></i>{MENU}</span>', 1)
SCRIPT = r"""const { $, at, span, easeOut } = Motion;

/* ---------- timeline (scene seconds) ---------- */
const T = { dClick: 1.30, kClick: 2.40, endCard: [5.80, 6.25], end: 6.75 };

function build() {
  const d = at("bDen");
  $("dm").style.display = "block"; const k = at("oK", -40, 0); $("dm").style.display = "";
  const cur = [[0.00, 960, 640], [0.25, 960, 640], [1.00, d[0] - 20, d[1] + 3], [1.35, d[0] - 20, d[1] + 3], [2.05, k[0], k[1] + 3], [2.45, k[0], k[1] + 3], [5.80, k[0] - 260, k[1] + 300]];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 345, 1.04], [5.55, 650, 345, 1.04], [5.80, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  $("dm").style.display = t >= T.dClick && t < T.kClick ? "block" : "none";
  $("oK").classList.toggle("hov", t >= T.kClick - .3);
  // compact: more rows on screen; text size and targets stay the same
  const k = t >= T.kClick;
  $("rC").classList.toggle("on", !k); $("rK").classList.toggle("on", k);
  $("denT").textContent = k ? "Compact" : "Comfortable";
  document.querySelector(".main").classList.toggle("cmp", k);
}

function events() { return [["click", T.dClick], ["click", T.kClick]]; }

Motion.scene({
  // under 5 steps: natural length, within the 10 s cap
  T, clicks: [T.dClick, T.kClick], build, render, events,
  slow: [[2.6, 4.6, 1.3]]
});"""
COMMENT = """  Source for media/tables-grids/density.mp4. Built by motion/_build/density.py on _build/tables_page.py
  (People › Users), with the top bar's alerts bell.
  Follows the Density card (data/guidance-foundations.js):
  - comfortable and compact, each described
  - compact fits more rows; text stays 13 px and the ⋯ stays a 28 px target
  - remembered for her, on every table"""
make("density", "Density", COMMENT, CSS, "", "", SCRIPT, edit=edit)
