import sys, pathlib; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from content_page import make
CSS = r"""
/* inline edit */
tr.hov td { background: var(--subtle); }
td.nmc { position: relative; }
.pen { position: absolute; top: 12px; width: 26px; height: 26px; border-radius: 6px; display: grid; place-items: center; color: var(--ink); opacity: 0; }
.pen svg { width: 14px; height: 14px; }
.pen.on { background: var(--hover); }
.ed { position: absolute; left: 46px; top: 0; height: 100%; width: 640px; display: flex; gap: 6px; align-items: center; opacity: 0; z-index: 4; background: var(--subtle); }
.ed .in { width: 260px; height: 34px; border: 1.5px solid var(--ink); border-radius: 7px; display: flex; align-items: center; padding: 0 10px; font-size: 13px; color: var(--ink); white-space: pre; background: var(--bg); box-shadow: 0 0 0 3px rgba(23,23,23,.08); }
.ed .in.bad { border-color: #b91c1c; box-shadow: 0 0 0 3px rgba(185,28,28,.12); }
.ed .in .sl { background: #cfe0ff; }
.ed .in .c { width: 1.5px; height: 17px; background: var(--ink); margin-left: 1px; }
.ed .btn { height: 30px; font-size: 12.5px; }
.ed .btn.dn { background: #404040; border-color: #404040; }
.ed .hint { color: var(--soft); }
.ed .msg { position: relative; height: 18px; flex: 1; margin-left: 6px; font-size: 12px; }
.ed .msg > span { position: absolute; left: 0; top: 0; white-space: nowrap; display: flex; gap: 5px; align-items: center; }
.err { color: #b91c1c; opacity: 0; }
.err svg { width: 13px; height: 13px; }
.svd { position: absolute; left: 46px; bottom: 4px; display: inline-flex; gap: 5px; align-items: center; font-size: 11.5px; color: var(--soft); opacity: 0; font-weight: 400; white-space: nowrap; }
.svd svg { width: 12px; height: 12px; }
"""
EXTRA = r"""    <svg width="0" height="0" style="position:absolute"><defs><symbol id="pencil" viewBox="0 0 16 16"><path d="M10.5 3l2.5 2.5L6 12.5H3.5V10z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></symbol>
      <symbol id="no2" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6.3" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8 4.6v4.2M8 11v.1" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></symbol></defs></svg>"""
TOAST = ""
SCRIPT = r"""const { $, at, span, easeOut } = Motion;
const OLD = "Supply run notes.md", BAD = "Hoth supply/notes", GOOD = "Hoth supply notes";

/* ---------- timeline (scene seconds) ---------- */
const T = {
  hover: 1.20, penClick: 2.10, open: 2.15, type1: [2.70, 3.60], err: 3.70, fix: [4.80, 5.10], ok: 5.15,
  enter: 6.00, saving: [6.05, 6.55], endCard: [8.10, 8.55], end: 9.2
};

function build() {
  // the pencil sits just after the name without widening the column
  let el = $("nmT"), x = 0; while (el && el.tagName !== "TD") { x += el.offsetLeft; el = el.offsetParent; }
  $("pen").style.left = (x + $("nmT").offsetWidth + 4) + "px";
  const p = at("pen"), r = at("aR5"), sv = at("edSave");
  const cur = [
    [0.00, 860, 650], [0.25, 860, 650], [1.10, p[0] - 120, p[1] + 4], [1.90, p[0], p[1] + 3], [2.25, p[0], p[1] + 3],
    [2.90, p[0] + 140, p[1] + 70], [7.40, p[0] + 150, p[1] + 74], [8.10, p[0] + 152, p[1] + 76]
  ];
  const cam = [
    [0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00],
    [0.95, 740, r[1] - 110, 1.30], [7.80, 740, r[1] - 110, 1.30],   // one steady view: the row and its neighbours
    [8.10, 656, 360, 1.04]
  ];
  return { cam, cur };
}

function render(t) {
  ["tB", "tC", "gC", "m1", "m2"].forEach(x => $(x).style.opacity = 0);
  $("tA").style.opacity = 1; $("m0").style.opacity = 1;
  const editing = t >= T.open && t < T.saving[0];
  // pencil on hover (and on focus); Owner and Sharing have none
  $("aR5").classList.toggle("hov", t >= T.hover && t < T.saving[1]);
  $("pen").style.opacity = t >= T.hover && t < T.open ? 1 : 0;
  $("pen").classList.toggle("on", t >= T.penClick - .2 && t < T.open);
  $("ed").style.opacity = editing ? 1 : 0;
  // typing: the name part is selected, then replaced; a slash is refused and the field stays open
  let v, sel = false;
  if (t < T.type1[0]) { v = OLD; sel = true; }
  else if (t < T.fix[0]) { const n = Math.round(BAD.length * span(t, ...T.type1, x => x)); v = BAD.slice(0, n) + ".md"; }
  else { const k = span(t, ...T.fix, x => x); const cut = BAD.indexOf("/"); v = k < .5 ? BAD.slice(0, cut) + ".md" : GOOD + ".md"; }
  const nameOnly = OLD.replace(/\.md$/, "");
  $("inV").innerHTML = sel ? `<span class="sl">${nameOnly}</span>.md` : v;
  const bad = t >= T.err && t < T.fix[0] + .15;
  $("inB").classList.toggle("bad", bad);
  $("err").style.opacity = bad && editing ? 1 : 0;
  $("cr").style.opacity = editing && (t < T.type1[0] || (t > T.type1[1] && t < T.fix[0]) || t > T.fix[1] ? Math.floor(t * 2.4) % 2 === 0 : true) ? 1 : 0;
  $("edSave").classList.toggle("dn", t >= T.enter - .1 && t < T.saving[0]);
  $("hint").style.opacity = bad ? 0 : 1;
  $("kE").style.background = t >= T.enter - .15 && t < T.saving[0] ? "#e5e5e5" : "";
  // saving, then saved, on the row
  const name = t >= T.saving[0] ? GOOD + ".md" : OLD;
  $("nmT").textContent = name;
  $("svd").style.opacity = t >= T.saving[0] ? 1 : 0;
  $("svd").innerHTML = t < T.saving[1] ? "Saving…" : '<svg><use href="#tick"/></svg>Saved · renamed by you just now';
  $("last5").textContent = t >= T.saving[1] ? "Just now" : "Yesterday";
}

function events() { return [["click", T.penClick], ["key", T.type1[0]], ["key", T.fix[0]], ["key", T.enter], ["pop", T.saving[1]]]; }

Motion.scene({
  // 5 steps: natural length, within the 15 s cap
  T, clicks: [T.penClick], build, render, events,
  slow: [[3.7, 4.7, 1.8], [6.6, 7.7, 1.5]]
});"""
COMMENT = """  Source for media/edit-bulk-actions/inline-edit.mp4. Built by motion/_build/inline_edit.py
  from asset-library/scene.html, so Content › All content is the same page.
  Follows the Inline edit card (data/guidance-actions.js):
  - a pencil shows on hover (and focus) beside the name; Owner and Sharing have none, because changing them has side effects
  - editing opens in place with visible Save and Cancel, plus Enter and Esc
  - the name part is selected, so the extension stays
  - a slash is refused before saving and the field stays open with the reason
  - Enter saves: Saving…, then Saved on the row, and Last activity says who changed it"""
s = make("inline-edit", "Inline edit", COMMENT, CSS, EXTRA, TOAST, SCRIPT)
old = '<span class="ty">MD</span>Supply run notes.md</div></td>'
i = s.index('<tr id="aR5">'); j = s.index(old, i)
new = ('<span class="ty">MD</span><span id="nmT">Supply run notes.md</span></div><span class="pen" id="pen" aria-label="Rename Supply run notes.md"><svg><use href="#pencil"/></svg></span><span class="svd" id="svd"></span>'
       '<div class="ed" id="ed"><div class="in" id="inB"><span id="inV"></span><span class="c" id="cr"></span></div><span class="btn pri" id="edSave">Save</span><span class="btn">Cancel</span>'
       '<span class="msg"><span class="hint" id="hint"><span id="kE" class="key2">Enter</span> saves · <span class="key2">Esc</span> cancels</span><span class="err" id="err" role="alert"><svg><use href="#no2"/></svg>Names can’t include /</span></span></div></td>')
s = s[:j] + new + s[j + len(old):]
s = s.replace('<tr id="aR5"><td class="ck"><span class="cb" id="aC5"></span></td><td>', '<tr id="aR5"><td class="ck"><span class="cb" id="aC5"></span></td><td class="nmc">', 1)
k = s.index("<td>Yesterday</td>", i); s = s[:k] + '<td id="last5">Yesterday</td>' + s[k + len("<td>Yesterday</td>"):]
s = s.replace("</style>", ".key2 { display: inline-block; border: 1px solid var(--rule-strong); border-bottom-width: 2px; border-radius: 5px; padding: 0 5px; color: var(--ink); background: var(--bg); }\n</style>", 1)
(pathlib.Path(__file__).resolve().parent.parent / "inline-edit/scene.html").write_text(s)
