import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from tables_page import make

CSS = r"""
#pS { position: relative; }
.psm { position: absolute; right: 0; top: 34px; width: 110px; z-index: 20; display: none; }
.psm .it { color: var(--ink); }
#tb2 { display: none; }
"""
P2 = [("NB", "Nien Nunb", "Co-pilot", "Fleet", "Console", "8 days ago"), ("KT", "Kasan Teel", "Pilot", "Fleet", "Console", "9 days ago"),
      ("RS", "Rell Sarno", "Mechanic", "Fleet, Hangar 3", "Console", "11 days ago"), ("AV", "Ania Vos", "Navigator", "Fleet", "Console + AI", "12 days ago"),
      ("DQ", "Dov Quell", "Gunner", "Fleet", "Console", "14 days ago"), ("LM", "Lira Marr", "Pilot", "Fleet", "Console", "16 days ago"),
      ("TB", "Tal Brecken", "Pilot", "Fleet", "Console", "19 days ago"), ("OH", "Odo Harl", "Mechanic", "Fleet", "Console", "20 days ago")]
def edit(s):
    s = s.replace('<span class="ps" id="pS"><span id="pST">25</span><i class="cv"></i></span>',
                  '<span class="ps" id="pS"><span id="pST">25</span><i class="cv"></i><div class="menu psm" id="psm"><div class="it">25</div><div class="it" id="o50">50</div><div class="it">100</div></div></span>', 1)
    rows = "".join(f'<tr><td class="ck"><span class="cb"></span></td><td class="ex"><span class="xb">▸</span></td><td><div class="pp"><span class="av">{a}</span><div>{n}<span class="s">{t}</span></div></div></td>'
                   f'<td class="c-mfa">Enrolled</td><td>Fleet</td><td class="c-grp">{g}</td><td>{l}</td><td>{last}</td><td class="ra"><span class="kb">⋯</span></td></tr>' for a, n, t, g, l, last in P2)
    i = s.index('</tbody>', s.index('id="tU"')) + len('</tbody>')
    return s[:i] + f'<tbody id="tb2">{rows}</tbody>' + s[i:]
TOAST = '      <div class="toast" id="toast"><i><svg width="11" height="11"><use href="#ok"/></svg></i>Link copied · opens sorted by last active, 50 rows</div>'
SCRIPT = r"""const { $, at, span, easeOut } = Motion;
const NAME = ["hobbie", "cal", "zev", "wes", "bren", "jes", "ved", "tycho", "dak", "tamsin", "orrin", "mira"];
const LAST = ["wes", "ved", "tycho", "mira", "hobbie", "dak", "jes", "cal", "tamsin", "orrin", "zev", "bren"];

/* ---------- timeline (scene seconds) ---------- */
const T = { sClick: 1.20, nClick: 2.70, pClick: 4.00, oClick: 4.80, lClick: 6.00, toast: [6.10, 7.50], endCard: [7.80, 8.25], end: 8.75 };

function build() {
  const s = at("hL"), n = at("pNext"), p = at("pS");
  $("psm").style.display = "block"; const o = at("o50", -20, 0); $("psm").style.display = "";
  const l = at("bLink");
  const cur = [[0.00, 960, 640], [0.25, 960, 640], [0.85, s[0], s[1] + 3], [1.25, s[0], s[1] + 3], [2.35, n[0], n[1] + 3], [2.75, n[0], n[1] + 3],
    [3.65, p[0], p[1] + 3], [4.05, p[0], p[1] + 3], [4.50, o[0], o[1] + 3], [4.85, o[0], o[1] + 3], [5.65, l[0], l[1] + 3], [6.05, l[0], l[1] + 3], [7.80, l[0] - 300, l[1] + 240]];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 345, 1.04], [7.55, 650, 345, 1.04], [7.80, 656, 360, 1.04]];
  return { cam, cur };
}

let last = null;
function render(t) {
  // sorting by a header sorts all 82 on the server, not just this page; the change is announced
  const s = t >= T.sClick, p2 = t >= T.nClick && t < T.oClick, big = t >= T.oClick;
  $("hP").classList.toggle("on", !s); $("hPa").textContent = s ? "" : "↑"; $("thP").setAttribute("aria-sort", s ? "none" : "ascending");
  $("hL").classList.toggle("on", s); $("hLa").textContent = s ? "↓" : ""; s ? $("thL").setAttribute("aria-sort", "descending") : $("thL").removeAttribute("aria-sort");
  $("srtT").textContent = s ? "sorted by last active, newest first" : "sorted by name, A to Z";
  const order = s ? LAST : NAME;
  if (last !== order) { const tb = $("r-hobbie").parentNode; order.forEach(i => { tb.appendChild($("r-" + i)); const d = $("d-" + i); if (d) tb.appendChild(d); }); last = order; }
  $("r-hobbie").parentNode.style.display = p2 ? "none" : ""; $("tb2").style.display = p2 ? "table-row-group" : "none";
  // the range, the page and the page size
  $("pR").textContent = big ? "1–50" : p2 ? "26–50" : "1–25";
  $("pP").textContent = big ? "Page 1 of 2" : p2 ? "Page 2 of 4" : "Page 1 of 4";
  $("pPrev").classList.toggle("off", !p2);
  $("pST").textContent = big ? "50" : "25";
  $("psm").style.display = t >= T.pClick && t < T.oClick ? "block" : "none"; $("o50").classList.toggle("hov", t >= T.oClick - .3);
  $("toast").style.opacity = span(t, T.toast[0], T.toast[0] + .2) * (1 - span(t, T.toast[1] - .2, T.toast[1]));
}

function events() { return [["click", T.sClick], ["click", T.nClick], ["click", T.pClick], ["click", T.oClick], ["click", T.lClick], ["pop", T.toast[0]]]; }

Motion.scene({
  // 5 steps: natural length, within the 15 s cap
  T, clicks: [T.sClick, T.nClick, T.pClick, T.oClick, T.lClick], build, render, events
});"""
COMMENT = """  Source for media/tables-grids/sorting-pagination.mp4. Built by motion/_build/sorting_pagination.py on _build/tables_page.py
  (People › Users), with the top bar's alerts bell.
  Follows the Sorting & pagination card (data/guidance-foundations.js):
  - sort by a header, with the direction shown and the change announced; the whole set is sorted, not one page
  - the range and total, the page, and a page size that's kept
  - a link that keeps the sort and page"""
make("sorting-pagination", "Sorting & pagination", COMMENT, CSS, "", TOAST, SCRIPT, edit=edit)
