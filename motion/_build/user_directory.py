import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from tables_page import make

CSS = r"""
.srch .q { color: var(--ink); white-space: pre; } .srch .c { width: 1.5px; height: 16px; background: var(--ink); margin-left: -7px; }
.srch .hint { color: var(--faint); }
.srch .xx { margin-left: auto; color: var(--soft); display: none; width: 22px; height: 22px; border-radius: 6px; place-items: center; }
.srch.f { border-color: var(--ink); }
#fSt { position: relative; }
.stm { position: absolute; left: 0; top: 40px; width: 200px; z-index: 20; display: none; font-weight: 400; }
.stm .it { color: var(--ink); display: flex; justify-content: space-between; }
.stm .it span { color: var(--soft); }
mark { background: #fde68a; color: var(--ink); border-radius: 2px; padding: 0 1px; }
.stx { display: inline-flex; gap: 5px; align-items: center; color: var(--ink); font-weight: 500; }
.stx svg { width: 13px; height: 13px; }
#tbS { display: none; }
"""
PAUSE = '<svg aria-hidden="true" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6.4 5.4v5.2M9.6 5.4v5.2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>'
SUS = [("KT", "Kasan Teel", "Pilot", "Fleet", "Console", "Suspended Nov 20 · on leave"), ("RS", "Rell Sarno", "Mechanic", "Fleet, Hangar 3", "Console", "Suspended Nov 12 · investigation"),
       ("DQ", "Dov Quell", "Gunner", "Fleet", "Console", "Suspended Oct 30 · contract paused")]
def edit(s):
    s = s.replace('<div class="srch"><svg><use href="#srch"/></svg>Search people</div>',
                  '<div class="srch" id="sr"><svg><use href="#srch"/></svg><span class="hint" id="sH">Search name, email or employee ID</span><span class="q" id="sQ"></span><span class="c" id="sC"></span><span class="xx" id="sX" aria-label="Clear search">✕</span></div>', 1)
    s = s.replace('<span class="fb">Status<i class="cv"></i></span>',
                  '<span class="fb" id="fSt"><span id="fStT">Status</span><i class="cv"></i><div class="menu stm" id="stm"><div class="it">Active<span>74</span></div><div class="it">Invited<span>2</span></div><div class="it" id="oSu">Suspended<span>3</span></div><div class="it">Deactivated<span>1</span></div><div class="it">Locked<span>2</span></div></div></span>', 1)
    s = s.replace('<div><span class="pp-x"></span>', '')
    s = s.replace('Ved Foslo<span class="s">Mechanic</span>', 'Ved Foslo<span class="s" id="vS">Mechanic</span>', 1)
    rows = "".join(f'<tr><td class="ck"><span class="cb"></span></td><td class="ex"><span class="xb">▸</span></td><td><div class="pp"><span class="av">{a}</span><div>{n}<span class="s">{t}</span></div></div></td>'
                   f'<td class="c-mfa">Enrolled</td><td>Fleet</td><td class="c-grp">{g}</td><td>{l}</td><td><span class="stx">{PAUSE}{st.split(" · ")[0]}</span><span class="s" style="display:block;font-size:11.5px;color:var(--faint)">{st.split(" · ")[1]}</span></td><td class="ra"><span class="kb">⋯</span></td></tr>' for a, n, t, g, l, st in SUS)
    i = s.index('</tbody>', s.index('id="tU"')) + len('</tbody>')
    return s[:i] + f'<tbody id="tbS">{rows}</tbody>' + s[i:]
SCRIPT = r"""const { $, at, span, easeOut } = Motion;
const Q = "EB-22";

/* ---------- timeline (scene seconds) ---------- */
const T = { qClick: 1.00, type: [1.25, 1.75], xClick: 3.30, sClick: 4.20, oClick: 5.00, endCard: [7.20, 7.65], end: 8.15 };

function build() {
  const q = at("sr", -90, 0);
  $("sX").style.display = "grid"; const x = at("sX"); $("sX").style.display = "";
  const st = at("fSt"); $("stm").style.display = "block"; const o = at("oSu", -40, 0); $("stm").style.display = "";
  const cur = [[0.00, 960, 640], [0.25, 960, 640], [0.70, q[0], q[1] + 3], [1.05, q[0], q[1] + 3], [3.00, x[0], x[1] + 3], [3.35, x[0], x[1] + 3],
    [3.90, st[0] - 10, st[1] + 3], [4.25, st[0] - 10, st[1] + 3], [4.70, o[0], o[1] + 3], [5.05, o[0], o[1] + 3], [7.20, o[0] - 200, o[1] + 220]];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 345, 1.04], [6.95, 650, 345, 1.04], [7.20, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  // search first: name, email or employee ID, as she types; the count is announced
  const n = t < T.xClick ? Math.round(Q.length * span(t, ...T.type, x => x)) : 0;
  $("sQ").textContent = Q.slice(0, n); $("sH").style.display = n ? "none" : "";
  $("sr").classList.toggle("f", t >= T.qClick && t < T.sClick);
  $("sC").style.opacity = t >= T.qClick && t < T.sClick && Math.floor(t * 2.4) % 2 === 0 ? 1 : 0;
  $("sX").style.display = n ? "grid" : "none";
  const hit = n >= 4, sus = t >= T.oClick;
  const tb = $("r-hobbie").parentNode;
  [...tb.children].forEach(r => r.style.display = hit ? (r.id === "r-ved" ? "" : "none") : (r.classList.contains("det") ? "none" : ""));
  tb.style.display = sus ? "none" : ""; $("tbS").style.display = sus ? "table-row-group" : "none";
  $("vS").innerHTML = hit ? "Mechanic · employee ID <mark>EB-22</mark>07" : "Mechanic";
  $("mt").innerHTML = sus ? "<b>3 of 82 people</b> · Team: Fleet · Status: Suspended" : hit ? "<b>1 of 82 people</b> match “EB-22” · in employee ID" : "<b>82 people</b> match Team: Fleet · sorted by name, A to Z";
  $("pR").textContent = sus ? "1–3" : hit ? "1–1" : "1–25"; $("pP").textContent = sus || hit ? "Page 1 of 1" : "Page 1 of 4";
  // status: a filter with counts, and each status in words with an icon
  $("stm").style.display = t >= T.sClick && t < T.oClick ? "block" : "none"; $("oSu").classList.toggle("hov", t >= T.oClick - .3);
  $("fSt").classList.toggle("on", sus); $("fStT").textContent = sus ? "Status: Suspended" : "Status";
}

function events() { return [["click", T.qClick], ["key", T.type[0]], ["click", T.xClick], ["click", T.sClick], ["click", T.oClick]]; }

Motion.scene({
  // 5 steps: natural length, within the 15 s cap
  T, clicks: [T.qClick, T.xClick, T.sClick, T.oClick], build, render, events,
  slow: [[1.8, 3.0, 1.3], [5.1, 6.8, 1.2]]
});"""
COMMENT = """  Source for media/user-management/user-directory.mp4. Built by motion/_build/user_directory.py on _build/tables_page.py
  (People › Users), with the top bar's alerts bell.
  Follows the User directory card (data/guidance.js):
  - search first: name, email and employee ID, as she types, showing which field matched
  - the count out of the whole directory, announced as it changes
  - a Status filter with counts; each status in words with an icon, and why"""
make("user-directory", "User directory", COMMENT, CSS, "", "", SCRIPT, edit=edit)
