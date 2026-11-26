import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from insights_page import make, ins_head

CSS = r"""
.st3 { display: grid; grid-template-columns: repeat(3, 1fr) 1.2fr; gap: 12px; margin-top: 10px; align-items: end; }
.st3 .v { font-size: 22px; color: var(--ink); font-weight: 650; }
.st3 .v span { font-size: 12.5px; font-weight: 400; color: var(--soft); }
.st3 .l { font-size: 12px; color: var(--soft); }
.st3 a { color: var(--ink); text-decoration: underline; text-underline-offset: 3px; font-size: 13px; justify-self: end; }
.def { margin-top: 10px; padding-top: 8px; border-top: 1px solid var(--rule); }
.seg { display: inline-flex; border: 1px solid var(--rule-strong); border-radius: 8px; padding: 2px; gap: 2px; }
.seg span { height: 28px; display: inline-flex; align-items: center; padding: 0 12px; border-radius: 6px; font-size: 12.5px; color: var(--soft); }
.seg span.on { background: var(--hover); color: var(--ink); font-weight: 500; }
.tg { height: 32px; display: inline-flex; align-items: center; gap: 8px; padding: 0 10px; border: 1px solid var(--rule-strong); border-radius: 8px; color: var(--ink); font-size: 12.5px; }
.tg .sw { width: 28px; height: 16px; border-radius: 999px; background: var(--rule-strong); position: relative; }
.tg .sw::after { content: ""; position: absolute; left: 2px; top: 2px; width: 12px; height: 12px; border-radius: 50%; background: #fff; transition: none; }
.tg.on .sw { background: var(--ink); } .tg.on .sw::after { left: 14px; }
.ch svg { width: 100%; height: 200px; display: block; margin-top: 8px; }
.ch text { font-size: 11px; fill: #525252; font-family: inherit; }
.ch text.lb { fill: #171717; font-weight: 600; font-size: 11.5px; }
#vT, #pv, #vN { display: none; }
.priv { margin-top: 8px; font-size: 12px; }
.bk { margin-top: 14px; font-size: 12.5px; color: var(--soft); }
.lh { margin-top: 6px; display: flex; align-items: baseline; gap: 10px; }
.lh h2 { margin: 0; font-size: 17px; color: var(--ink); font-weight: 600; } .lh span { color: var(--soft); font-size: 13px; } .lh .sp { flex: 1; }
"""
W, H, L, R, T0, B0 = 900, 200, 30, 150, 8, 178
def X(i): return L + (W - L - R) * i / 12
def Y(v): return B0 - (B0 - T0) * (v - 70) / 30
SER = [("Fleet", [88, 89, 90, 90, 91, 92, 92, 93, 94, 95, 95, 96, 96], "", 2.2),
       ("Command", [86, 87, 87, 88, 89, 89, 90, 91, 92, 92, 93, 93, 94], "6 4", 2.2),
       ("Base Engineering", [90, 91, 92, 92, 92, 91, 92, 92, 91, 92, 91, 91, 91], "2 3", 2.2),
       ("Intelligence", [70, 71, 72, 72, 73, 74, 75, 75, 76, 77, 78, 78, 79], "10 3 2 3", 2.2)]
PREV = [80, 80, 81, 81, 82, 82, 83, 83, 84, 84, 85, 85, 86]
def pl(vals): return " ".join(f"{X(i):.1f},{Y(v):.1f}" for i, v in enumerate(vals))
LAB = sorted([(n, v[-1]) for n, v, d, w in SER] + [("__prev", PREV[-1])], key=lambda x: -x[1])
LY = {}
last = -99
for n, v in LAB:
    y = max(Y(v) + 4, last + 14); LY[n] = y; last = y
lbl_y = {"Fleet": 0, "Command": 12, "Base Engineering": -2, "Intelligence": 0}
SVG = (f'<svg viewBox="0 0 {W} {H}" preserveAspectRatio="none" aria-hidden="true">'
       + "".join(f'<line x1="{L}" x2="{W - R}" y1="{Y(v):.1f}" y2="{Y(v):.1f}" stroke="#ececec"/><text x="0" y="{Y(v) + 4:.1f}">{v}%</text>' for v in (70, 85, 100))
       + "".join(f'<polyline points="{pl(v)}" fill="none" stroke="#171717" stroke-width="{w}" stroke-dasharray="{d}"/>'
                 f'<text class="lb" x="{X(12) + 8:.1f}" y="{LY[n]:.1f}">{n} {v[-1]}%</text>' for n, v, d, w in SER)
       + f'<g id="pv"><polyline points="{pl(PREV)}" fill="none" stroke="#8a8a8a" stroke-width="1.6"/><text x="{X(12) + 8:.1f}" y="{LY["__prev"]:.1f}">All, previous 90 days 86%</text></g>'
       + f'<text x="{L}" y="{H - 2}">13 weeks ago</text><text x="{X(12) - 30:.1f}" y="{H - 2}">This week</text></svg>')
ROWS = [("Fleet", "79 of 82", "96%", "▲ 4"), ("Command", "210 of 224", "94%", "▲ 2"), ("Base Engineering", "58 of 64", "91%", "▼ 1"), ("Intelligence", "41 of 52", "79%", "▲ 6")]
TABLE = ('<table class="sx"><thead><tr><th style="width:34%">Group</th><th class="n">Active this week</th><th class="n">Share active</th><th class="n">vs previous 90 days</th></tr></thead><tbody>'
         + "".join(f'<tr><td><b>{g}</b></td><td class="n">{a}</td><td class="n">{p}</td><td class="n"><span class="{"up" if "▲" in c else "dn2"}">{c} pts</span></td></tr>' for g, a, p, c in ROWS) + '</tbody></table>')
OV = f'''      <div class="view" id="vO">
{ins_head("ad")}        <div class="sec"><h3>Are people using Echo Base?</h3>
          <div class="st3"><div><div class="l">Today</div><div class="v">640</div></div><div><div class="l">This week</div><div class="v">1,092</div></div><div><div class="l">This month</div><div class="v">1,168 <span>of 1,214</span></div></div><a id="aN">46 not active in 30 days</a></div>
          <div class="def">Active means signed in and opened, edited or shared something. Counted once per person.</div></div>
        <div class="sec"><div class="rw"><h3>Which teams, and is it growing?</h3><span class="sp"></span><span class="tg" id="tgC"><span class="sw"></span>Compare to previous 90 days</span>
          <span class="seg"><span class="on" id="sC">Chart</span><span id="sT">Table</span></span></div>
          <div class="ch" id="vC" role="img" aria-label="Weekly share active by group over 13 weeks: Fleet 96%, Command 94%, Base Engineering 91%, Intelligence 79%">{SVG}</div>
          <div id="vT">{TABLE}</div>
          <div class="priv">Groups under 5 people aren’t shown, so no one can be picked out.</div></div>
      </div>
'''
NA = f'''      <div class="view" id="vN">
{ins_head("ad")}        <div class="bk">← Adoption</div>
        <div class="lh"><h2>Not active in 30 days</h2><span>46 people</span><span class="sp"></span><span class="btn sm">Send a reminder</span></div>
        <table class="sx"><thead><tr><th style="width:30%">Person</th><th>Group</th><th>Last active</th><th>Manager</th></tr></thead><tbody>
          <tr><td><b>Zev Senesca</b>Pilot</td><td>Fleet</td><td>61 days ago</td><td>Cal Alder</td></tr>
          <tr><td><b>Rell Sarno</b>Mechanic</td><td>Base Engineering</td><td>44 days ago</td><td>Dak Ralter</td></tr>
          <tr><td><b>Ania Vos</b>Navigator</td><td>Intelligence</td><td>38 days ago</td><td>Toryn Farr</td></tr>
          <tr><td><b>Odo Harl</b>Mechanic</td><td>Base Engineering</td><td>33 days ago</td><td>Dak Ralter</td></tr></tbody></table>
      </div>
'''
SCRIPT = r"""const { $, at, span, easeOut } = Motion;

/* ---------- timeline (scene seconds) ---------- */
const T = { cClick: 1.60, tClick: 3.00, nClick: 4.40, toN: 4.45, endCard: [6.40, 6.85], end: 7.35 };

function build() {
  const c = at("tgC", -60, 0), tb = at("sT");
  $("vC").style.display = "none"; $("vT").style.display = "block"; const n = at("aN"); $("vC").style.display = ""; $("vT").style.display = "";
  const cur = [[0.00, 960, 640], [0.25, 960, 640], [1.25, c[0], c[1] + 3], [1.65, c[0], c[1] + 3], [2.65, tb[0], tb[1] + 3], [3.05, tb[0], tb[1] + 3],
    [4.05, n[0], n[1] + 3], [4.45, n[0], n[1] + 3], [6.40, n[0] - 200, n[1] + 220]];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 345, 1.04], [6.15, 650, 345, 1.04], [6.40, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  const n = t >= T.toN;
  $("crumb").innerHTML = n ? "/ Insights / Adoption / <b>Not active</b>" : "/ Insights / <b>Adoption</b>";
  $("vO").style.display = n ? "none" : "block"; $("vN").style.display = n ? "block" : "none";
  // compare to the previous period; the same numbers as a chart or a table
  const c = t >= T.cClick, tb = t >= T.tClick;
  $("tgC").classList.toggle("on", c); $("pv").style.display = c ? "inline" : "none";
  $("sC").classList.toggle("on", !tb); $("sT").classList.toggle("on", tb);
  $("vC").style.display = tb ? "none" : "block"; $("vT").style.display = tb ? "block" : "none";
}

function events() { return [["click", T.cClick], ["click", T.tClick], ["click", T.nClick]]; }

Motion.scene({
  // under 5 steps: natural length, within the 10 s cap
  T, clicks: [T.cClick, T.tClick, T.nClick], build, render, events,
  duration: 9.8
});"""
COMMENT = """  Source for media/usage-analytics/adoption-metrics.mp4. Built by motion/_build/adoption_metrics.py on _build/insights_page.py
  (Insights › Adoption), with the top bar's alerts bell.
  Follows the Adoption metrics card (data/guidance-platform.js):
  - each section asks its question; active by day, week and month, with what active means
  - a trend by group, lines told apart by pattern and direct labels, not colour; compare to the previous period
  - the same numbers as a table; small groups hidden for privacy; when it was updated
  - who isn't active, to follow up"""
make("adoption-metrics", "Adoption metrics", COMMENT, CSS, "Insights / Adoption", "insights", OV + NA, SCRIPT)
