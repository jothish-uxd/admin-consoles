import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from allcontent_page import make

CSS = r"""
.aq { position: absolute; right: 0; top: 44px; width: 640px; z-index: 6; background: var(--bg); border: 1px solid var(--rule-strong); border-radius: 12px; box-shadow: 0 16px 40px rgba(0,0,0,.14); padding: 14px 16px; display: none; font-size: 12.5px; color: var(--soft); }
.aq .h { display: flex; align-items: center; gap: 10px; }
.aq .h b { color: var(--ink); font-size: 14px; font-weight: 600; }
.aq .h .sp { flex: 1; }
.aq .sg { display: inline-flex; border: 1px solid var(--rule-strong); border-radius: 8px; padding: 2px; gap: 2px; }
.aq .sg span { height: 26px; display: inline-flex; align-items: center; padding: 0 12px; border-radius: 6px; font-size: 12.5px; color: var(--soft); }
.aq .sg span.on { background: var(--hover); color: var(--ink); font-weight: 500; }
.cond { display: grid; grid-template-columns: 44px 130px 120px 1fr; gap: 8px; align-items: center; margin-top: 8px; }
.cond .j { font-size: 11.5px; font-weight: 600; color: var(--ink); text-align: right; }
.cond .f { height: 32px; border: 1px solid var(--rule-strong); border-radius: 8px; display: flex; align-items: center; gap: 6px; padding: 0 10px; color: var(--ink); font-size: 12.5px; }
.cond .f .tg { border: 1px solid var(--rule-strong); border-radius: 999px; padding: 0 7px; font-size: 11.5px; }
.cond.nw .f { border-color: var(--ink); }
.adds { margin: 10px 0 0 52px; display: flex; gap: 14px; color: var(--ink); font-size: 12.5px; }
.qt { margin-top: 12px; border: 1px solid var(--ink); border-radius: 8px; padding: 10px 12px; font-family: "Geist Mono", monospace; font-size: 12px; color: var(--ink); line-height: 1.6; min-height: 44px; box-sizing: border-box; white-space: pre-wrap; }
.qt .k { color: #6d28d9; } .qt .bad { text-decoration: underline wavy #b91c1c; text-underline-offset: 3px; }
.qt .c { display: inline-block; width: 1.5px; height: 14px; background: var(--ink); vertical-align: -2px; }
.qe { margin-top: 8px; display: none; align-items: center; gap: 8px; color: #b91c1c; font-size: 12.5px; }
.qe svg { width: 14px; height: 14px; flex: none; }
.qe .btn { height: 26px; font-size: 12px; margin-left: 4px; color: var(--ink); }
.qhelp { margin-top: 8px; font-size: 11.5px; color: var(--faint); }
.qs { margin-top: 12px; padding: 8px 10px; background: var(--subtle); border-radius: 8px; color: var(--ink); line-height: 1.4; }
.qs span { color: var(--soft); }
.aq .ft { margin-top: 12px; display: flex; gap: 8px; align-items: center; } .aq .ft .sp { flex: 1; }
.aq .ft .btn { height: 32px; }
#bVw, #qVw { display: none; }
"""
ERR = '<svg aria-hidden="true" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 4.8v3.8M8 10.8v.4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>'
PANEL = f'''<div class="aq" id="aq" role="dialog" aria-labelledby="aqT">
          <div class="h"><b id="aqT">Advanced filter</b><span class="sp"></span><span class="sg"><span class="on" id="tBu">Builder</span><span id="tQu">Query</span></span></div>
          <div id="bVw">
            <div class="cond"><span class="j">Where</span><span class="f">Type</span><span class="f">is any of</span><span class="f"><span class="tg">PDF ✕</span><span class="tg">DOC ✕</span></span></div>
            <div class="cond"><span class="j">AND</span><span class="f">Last activity</span><span class="f">more than</span><span class="f">90 days ago</span></div>
            <div class="cond"><span class="j">AND</span><span class="f">Tag</span><span class="f">is not</span><span class="f">Legal hold</span></div>
            <div class="cond nw" id="c4"><span class="j">AND</span><span class="f">Size</span><span class="f">more than</span><span class="f">10 MB</span></div>
            <div class="adds"><span>+ Add condition</span><span>+ Add group</span></div>
          </div>
          <div id="qVw">
            <div class="qt" id="qt"><span class="k">type</span>:(pdf OR doc) AND <span class="k">activity</span>:&gt;90d AND -<span class="k">tag</span>:"legal hold"<span id="qAdd"></span><span class="c" id="qC"></span></div>
            <div class="qe" id="qe" role="alert">{ERR}<span>Unknown field <b>sise</b> at character 62. Did you mean <b>size</b>?</span><span class="btn" id="bFix">Use size</span></div>
            <div class="qhelp" id="qh">Fields: type, owner, sharing, tag, activity, size · AND, OR, - to exclude · Ctrl Space for suggestions</div>
          </div>
          <div class="qs" aria-live="polite"><span>Finds</span> <span id="qs1" style="color:var(--ink)">PDFs and Word documents not touched in 90 days, unless tagged Legal hold</span><span id="qs2" style="color:var(--ink)">, larger than 10 MB</span>.</div>
          <div class="ft"><span>Same query in both views</span><span class="sp"></span><span class="btn">Cancel</span><span class="btn pri" id="bAp">Apply</span></div>
        </div>'''
TE = '''        <div id="tE" style="opacity:0">
          <table><thead><tr><th class="ck"><span class="cb"></span></th><th>Name</th><th>Owner</th><th>Sharing</th><th>Last activity</th><th>Size</th></tr></thead><tbody>
            <tr><td class="ck"><span class="cb"></span></td><td><div class="nm"><span class="ty">DOC</span>Evacuation drill report.docx</div></td><td class="own"><div class="a">Gen. Rieekan</div><div class="b">Command</div></td><td><span class="sh">Internal</span></td><td>180 days ago</td><td class="num">12 MB</td></tr>
            <tr><td class="ck"><span class="cb"></span></td><td><div class="nm"><span class="ty">PDF</span>Old base schematics.pdf</div></td><td class="own"><div class="a">Base Engineering</div><div class="b">Team</div></td><td><span class="sh">Internal</span></td><td>140 days ago</td><td class="num">88 MB</td></tr>
            <tr><td class="ck"><span class="cb"></span></td><td><div class="nm"><span class="ty">DOC</span>Supply contracts 2025.docx</div></td><td class="own"><div class="a">Logistics</div><div class="b">Team</div></td><td><span class="sh">Specific people</span></td><td>212 days ago</td><td class="num">14 MB</td></tr>
            <tr><td class="ck"><span class="cb"></span></td><td><div class="nm"><span class="ty">PDF</span>Shield generator manual.pdf</div></td><td class="own"><div class="a">Base Engineering</div><div class="b">Team</div></td><td><span class="sh">Internal</span></td><td>96 days ago</td><td class="num">31 MB</td></tr>
          </tbody></table><div class="cnt">Showing 1–50 of 214 · sorted by last activity</div>
        </div>
'''
def edit(s):
    s = s.replace('<div class="sr" id="sr">', '<div class="sr" id="sr" style="position:relative">', 1)
    s = s.replace('<span class="clr" id="clr">Clear all</span>', '<span class="clr" id="clr">Clear all</span>' + PANEL, 1)
    s = s.replace('<span id="m3" style="opacity:0">', '<span id="m4" style="opacity:0"><b>214 items</b> match the advanced filter</span><span id="m3" style="opacity:0">', 1)
    s = s.replace('        <div id="gC"', TE + '        <div id="gC"', 1)
    return s

SCRIPT = r"""const { $, at, span, easeOut } = Motion;
const ADD = " AND sise:>10MB";

/* ---------- timeline (scene seconds) ---------- */
const T = {
  advClick: 1.10, qClick: 2.60, type: [2.90, 3.80], err: 3.85, fixClick: 4.90, bClick: 5.90, apClick: 7.00,
  endCard: [8.40, 8.85], end: 9.35
};

function build() {
  const a = at("fAdv"), ar = at("area");
  $("aq").style.display = "block"; $("bVw").style.display = "block";
  const ap = at("bAp"), qb = at("tQu"), bb = at("tBu");
  $("bVw").style.display = ""; $("qVw").style.display = "block"; $("qe").style.display = "flex"; const fx = at("bFix");
  $("qVw").style.display = ""; $("qe").style.display = ""; $("aq").style.display = "";
  const cur = [
    [0.00, 860, 650], [0.25, 860, 650], [0.85, a[0], a[1] + 3], [1.15, a[0], a[1] + 3], [2.35, qb[0], qb[1] + 3], [2.65, qb[0], qb[1] + 3],
    [3.40, qb[0] - 60, qb[1] + 120], [4.65, fx[0], fx[1] + 3], [4.95, fx[0], fx[1] + 3], [5.65, bb[0], bb[1] + 3], [5.95, bb[0], bb[1] + 3],
    [6.75, ap[0], ap[1] + 3], [7.05, ap[0], ap[1] + 3], [8.40, ap[0] - 120, ap[1] + 80]
  ];
  const cam = [
    [0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00],
    [0.95, 700, ar[1] + 40, 1.12], [8.15, 700, ar[1] + 40, 1.12],     // one steady view: the filter row, the panel and the results
    [8.40, 656, 360, 1.04]
  ];
  return { cam, cur };
}

function render(t) {
  ["tA", "tB", "tC", "tD", "gC"].forEach(x => $(x).style.opacity = 0);
  ["m0", "m1", "m2", "m3"].forEach(x => $(x).style.opacity = 0);
  const open = t >= T.advClick && t < T.apClick, done = t >= T.apClick;
  $("aq").style.display = open ? "block" : "none";
  // builder and query are two views of one query
  const q = t >= T.qClick && t < T.bClick;
  $("tBu").classList.toggle("on", !q); $("tQu").classList.toggle("on", q);
  $("bVw").style.display = q ? "none" : "block"; $("qVw").style.display = q ? "block" : "none";
  // typing an unknown field: the error says where, and offers the fix
  const fixed = t >= T.fixClick;
  const n = Math.round(ADD.length * span(t, ...T.type, x => x));
  const txt = fixed ? " AND size:>10MB" : ADD.slice(0, n);
  $("qAdd").innerHTML = txt.replace(/(sise|size)/, m => fixed ? '<span class="k">size</span>' : (t >= T.err ? '<span class="bad">sise</span>' : m));
  $("qC").style.opacity = q && (t < T.type[1] + .05 || Math.floor(t * 2.4) % 2 === 0) ? 1 : 0;
  $("qe").style.display = t >= T.err && !fixed ? "flex" : "none"; $("qh").style.display = t >= T.err && !fixed ? "none" : "";
  $("c4").style.display = fixed ? "" : "none";
  $("qs2").style.display = fixed ? "" : "none";
  // applied: the filter says what it is, the count is announced
  $("fAdv").classList.toggle("on", done); $("faL").innerHTML = done ? "Advanced: <b>4 conditions</b>" : "Advanced";
  $("clr").style.visibility = done ? "visible" : "hidden";
  $("tA").style.opacity = done ? 0 : 1; $("tE").style.opacity = done ? 1 : 0;
  $("m0").style.opacity = done ? 0 : 1; $("m4").style.opacity = done ? 1 : 0;
  $("bAp").classList.toggle("dn", t >= T.apClick - .05 && t < T.apClick);
}

function events() { return [["click", T.advClick], ["click", T.qClick], ["key", T.type[0]], ["click", T.fixClick], ["click", T.bClick], ["click", T.apClick]]; }

Motion.scene({
  // 5+ steps: natural length, within the 15 s cap
  T, clicks: [T.advClick, T.qClick, T.fixClick, T.bClick, T.apClick], build, render, events
});"""
COMMENT = """  Source for media/search-filtering/advanced-query.mp4. Built by motion/_build/advanced_query.py on _build/allcontent_page.py
  (Content › All content), with the top bar's alerts bell.
  Follows the Advanced query card (data/guidance-foundations.js):
  - a visual builder with conditions joined by AND, beside the simple filters, not instead of them
  - the same query as text; switching keeps it
  - errors as she types, in text with the position, and a suggested fix
  - a plain-language summary of what it finds; applied, it shows as a filter with ✕"""
make("advanced-query", "Advanced query", COMMENT, CSS, "", "", SCRIPT, edit=edit)
