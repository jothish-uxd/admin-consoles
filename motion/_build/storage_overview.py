import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from storage_page import make, head, WN

CSS = r"""
.big { font-size: 26px; color: var(--ink); font-weight: 650; }
.big span { font-size: 14px; font-weight: 400; color: var(--soft); }
.sum3 { margin-top: 2px; color: var(--ink); font-size: 13px; }
.sum3 span { color: var(--soft); }
.seg { display: inline-flex; border: 1px solid var(--rule-strong); border-radius: 8px; padding: 2px; gap: 2px; }
.seg span { height: 28px; display: inline-flex; align-items: center; padding: 0 12px; border-radius: 6px; font-size: 12.5px; color: var(--soft); }
.seg span.on { background: var(--hover); color: var(--ink); font-weight: 500; }
.sbar { margin-top: 14px; display: flex; height: 26px; border-radius: 6px; overflow: hidden; border: 1px solid var(--rule-strong); }
.sbar i { display: block; height: 100%; border-right: 2px solid #fff; box-sizing: border-box; }
.sbar i:last-child { border-right: 0; }
.slb { display: flex; flex-wrap: wrap; gap: 6px 22px; margin-top: 8px; }
.slb div { box-sizing: border-box; font-size: 12px; color: var(--soft); white-space: nowrap; }
.slb div b { display: flex; align-items: center; gap: 6px; color: var(--ink); font-weight: 500; font-size: 12.5px; }
.slb div b i { width: 10px; height: 10px; border-radius: 2px; display: inline-block; border: 1px solid var(--ink); box-sizing: border-box; }
.slb div.hov b { text-decoration: underline; text-underline-offset: 3px; }
.vB { display: none; }
.trend { margin-top: 8px; }
.trend svg { width: 100%; height: 130px; display: block; }
.trend text { font-size: 11px; fill: #737373; font-family: inherit; }
.al { display: flex; gap: 8px; align-items: center; margin-top: 10px; color: var(--ink); }
.al svg { width: 14px; height: 14px; }
#vL { display: none; }
.bk { margin-top: 14px; font-size: 12.5px; color: var(--soft); }
.lh { margin-top: 6px; display: flex; align-items: baseline; gap: 10px; }
.lh h2 { margin: 0; font-size: 17px; color: var(--ink); font-weight: 600; }
.lh span { color: var(--soft); font-size: 13px; }
.lh .sp { flex: 1; } .lh a { color: var(--ink); text-decoration: underline; text-underline-offset: 3px; font-size: 12.5px; }
"""
C = ["#171717", "#525252", "#8a8a8a", "#bdbdbd", "#f5f5f5"]
TYPE = [("Files", "2.1 TB", 42), ("Old versions", "620 GB", 12.4), ("Trash", "310 GB", 6.2), ("Backups", "170 GB", 3.4), ("Free", "1.8 TB", 36)]
GRP = [("Base Engineering", "1.1 TB", 22), ("Intelligence", "760 GB", 15.2), ("Command", "540 GB", 10.8), ("Fleet", "420 GB", 8.4), ("Free", "1.8 TB", 36)]
GRP_ALL = [("Base Engineering", "1.1 TB", 22, "gBe"), ("Intelligence", "760 GB", 15.2, ""), ("Command", "540 GB", 10.8, ""), ("Fleet", "420 GB", 8.4, ""), ("Other teams", "380 GB", 7.6, ""), ("Free", "1.8 TB", 36, "")]
def bar(rows, vid):
    b = "".join(f'<i style="width:{w}%;background:{C[min(i, 4)] if r[0] not in ("Free",) else C[4]}"></i>' for i, r in enumerate(rows) for w in [r[2]])
    l = "".join(f'<div{f" id={chr(34)}{r[3]}{chr(34)}" if len(r) > 3 and r[3] else ""}><b><i style="background:{C[min(i, 4)] if r[0] != "Free" else C[4]}"></i>{r[0]}</b>{r[1]}</div>' for i, r in enumerate(rows))
    return f'<div class="{vid}"><div class="sbar" role="img" aria-label="{", ".join(r[0] + " " + r[1] for r in rows)}">{b}</div><div class="slb">{l}</div></div>'
GA = [(n, s, w, i) for n, s, w, i in GRP_ALL]
GA[4] = ("Other teams", "380 GB", 7.6, "")
def gcol(i, n): return "#dcdcdc" if n == "Other teams" else (C[4] if n == "Free" else C[min(i, 3)])
BG = ('<div class="vB" id="bG"><div class="sbar" role="img" aria-label="By group: Base Engineering 1.1 TB, Intelligence 760 GB, Command 540 GB, Fleet 420 GB, other teams 380 GB, free 1.8 TB">'
      + "".join(f'<i style="width:{w}%;background:{gcol(i, n)}"></i>' for i, (n, s, w, _) in enumerate(GA)) + '</div><div class="slb">'
      + "".join(f'<div{f" id={chr(34)}{x}{chr(34)}" if x else ""}><b><i style="background:{gcol(i, n)}"></i>{n}</b>{s}</div>' for i, (n, s, w, x) in enumerate(GA)) + '</div></div>')
BT = bar(TYPE, "vT").replace('<div class="vT">', '<div class="vT" id="bT">')
# trend: 12 months, 1.95 TB → 3.2 TB, then a dashed forecast to 5 TB around Oct 2027
pts = [1.95, 2.05, 2.14, 2.25, 2.33, 2.45, 2.55, 2.66, 2.78, 2.9, 3.05, 3.2]
W, H, L, R, T0, B0 = 900, 130, 34, 10, 10, 112
def X(i): return L + (W - L - R) * i / 23
def Y(v): return B0 - (B0 - T0) * v / 5.4
line = " ".join(f"{X(i):.1f},{Y(v):.1f}" for i, v in enumerate(pts))
fc = " ".join(f"{X(11 + k):.1f},{Y(min(5, 3.2 * 1.04 ** k)):.1f}" for k in [0,1,2,3,4,5,6,7,8,9,10,11,11.4])
SVG = (f'<svg viewBox="0 0 {W} {H}" preserveAspectRatio="none" aria-hidden="true">'
       f'<line x1="{L}" x2="{W - R}" y1="{Y(5):.1f}" y2="{Y(5):.1f}" stroke="#171717" stroke-width="1"/><text x="0" y="{Y(5) + 4:.1f}">5 TB</text>'
       f'<line x1="{L}" x2="{W - R}" y1="{B0}" y2="{B0}" stroke="#e5e5e5"/><text x="0" y="{B0 + 4}">0</text>'
       f'<polyline points="{line}" fill="none" stroke="#171717" stroke-width="2"/>'
       f'<polyline points="{fc}" fill="none" stroke="#525252" stroke-width="2" stroke-dasharray="5 4"/>'
       f'<circle cx="{X(11):.1f}" cy="{Y(3.2):.1f}" r="3.5" fill="#171717"/>'
       f'<text x="{X(0):.1f}" y="{H - 2}">Dec 2025</text><text x="{X(11) - 20:.1f}" y="{H - 2}">Now</text><circle cx="{X(22.4):.1f}" cy="{Y(5):.1f}" r="3.5" fill="#fff" stroke="#171717" stroke-width="1.5"/><text x="{X(22.4) - 44:.1f}" y="{H - 2}">Oct 2027</text></svg>')
OV = f'''      <div class="view" id="vO">
{head("Storage", "ov")}        <div class="sec"><div class="rw"><div><div class="big">3.2 TB <span>of 5 TB used</span></div>
          <div class="sum3">Growing 4% a month <span>· full around Oct 2027 at this rate</span></div></div><span class="sp"></span>
          <span class="seg"><span class="on" id="sT">By type</span><span id="sG">By group</span></span></div>
          {BT}{BG}
          <div class="al">{WN}<span>Alerts at 80%, 90% and 95%, by email and here. Trash and old versions count toward the 5 TB.</span></div></div>
        <div class="sec"><h3>Last 12 months, and the forecast</h3><div class="trend">{SVG}</div></div>
      </div>
'''
LIST = f'''      <div class="view" id="vL">
{head("Storage", "ov")}        <div class="bk">← Overview</div>
        <div class="lh"><h2>Base Engineering</h2><span>1.1 TB · 38,420 items · 22% of the 5 TB</span><span class="sp"></span><a>Open in Largest items</a></div>
        <table class="sx"><thead><tr><th style="width:44%">Biggest in it</th><th>Owner</th><th>Last activity</th><th class="n">Size</th></tr></thead><tbody>
          <tr><td><b>Hangar scans 2026</b>Folder · 1,204 files</td><td>Base Engineering</td><td>3 days ago</td><td class="n">310 GB</td></tr>
          <tr><td><b>X-wing telemetry</b>Folder · 18,300 files</td><td>Dak Ralter</td><td>Yesterday</td><td class="n">220 GB</td></tr>
          <tr><td><b>Shield generator tests</b>Folder · 640 files</td><td>Base Engineering</td><td>5 months ago</td><td class="n">96 GB</td></tr>
          <tr><td><b>Old versions in this group</b>14,210 versions</td><td>Many owners</td><td>—</td><td class="n">180 GB</td></tr>
          <tr><td><b>Trash in this group</b>2,904 items · deleted forever within 30 days</td><td>Many owners</td><td>—</td><td class="n">74 GB</td></tr></tbody></table>
      </div>
'''
MAIN = OV + LIST
SCRIPT = r"""const { $, at, span, easeOut } = Motion;

/* ---------- timeline (scene seconds) ---------- */
const T = { gClick: 1.90, bClick: 3.60, toL: 3.65, endCard: [6.20, 6.65], end: 7.15 };

function build() {
  const g = at("sG");
  $("bT").style.display = "none"; $("bG").style.display = "block"; const b = at("gBe", -30, -7); $("bT").style.display = ""; $("bG").style.display = "";
  const cur = [[0.00, 960, 640], [0.25, 960, 640], [1.55, g[0], g[1] + 3], [1.95, g[0], g[1] + 3], [3.25, b[0], b[1] + 3], [3.65, b[0], b[1] + 3], [6.20, b[0] + 240, b[1] + 160]];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 345, 1.04], [5.95, 650, 345, 1.04], [6.20, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  const l = t >= T.toL;
  $("crumb").innerHTML = l ? "/ Content / Storage / <b>Base Engineering</b>" : "/ Content / <b>Storage</b>";
  $("vO").style.display = l ? "none" : "block"; $("vL").style.display = l ? "block" : "none";
  // the same 5 TB, by type or by group, labelled directly
  const g = t >= T.gClick;
  $("sT").classList.toggle("on", !g); $("sG").classList.toggle("on", g);
  $("bT").style.display = g ? "none" : "block"; $("bG").style.display = g ? "block" : "none";
  $("gBe").classList.toggle("hov", t >= T.bClick - .35);
}

function events() { return [["click", T.gClick], ["click", T.bClick]]; }

Motion.scene({
  // under 5 steps: natural length, within the 10 s cap
  T, clicks: [T.gClick, T.bClick], build, render, events,
  slow: [[0.4, 1.4, 1.3]]
});"""
COMMENT = """  Source for media/storage-quotas/storage-overview.mp4. Built by motion/_build/storage_overview.py on _build/storage_page.py
  (Content › Storage), with the top bar's alerts bell.
  Follows the Storage overview card (data/guidance-content.js):
  - used, limit and trend together, in text first: 3.2 TB of 5 TB, growing 4% a month, full around Oct 2027
  - a breakdown by type (files, old versions, trash, backups, counted openly) or by group, segments labelled directly
  - a trend with the forecast; alerts at 80, 90 and 95%
  - each breakdown links to a list of what's in it"""
make("storage-overview", "Storage overview", COMMENT, CSS, "Content / Storage", MAIN, SCRIPT)
