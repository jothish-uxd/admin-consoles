import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from allcontent_page import make

CSS = r"""
.scr2 { position: absolute; inset: 52px 0 0 0; background: rgba(23,23,23,.28); z-index: 30; opacity: 0; border-radius: 0 0 14px 14px; }
.dl { position: absolute; left: 350px; top: 142px; width: 500px; z-index: 31; background: var(--bg); border-radius: 14px; box-shadow: 0 24px 60px rgba(0,0,0,.22); padding: 18px 20px; font-size: 12.5px; color: var(--soft); opacity: 0; visibility: hidden; }
.dl h3 { margin: 0; font-size: 15px; color: var(--ink); font-weight: 600; }
.dl .f1 { margin-top: 14px; }
.dl .lbl { display: block; font-size: 12px; color: var(--ink); font-weight: 500; margin-bottom: 5px; }
.dl .in { height: 34px; border: 1px solid var(--rule-strong); border-radius: 8px; display: flex; align-items: center; padding: 0 10px; font-size: 13px; color: var(--ink); }
.dl .in.f { border-color: var(--ink); box-shadow: 0 0 0 3px rgba(23,23,23,.08); }
.dl .in .c { width: 1.5px; height: 16px; background: var(--ink); margin-left: 1px; }
.dl .keeps { display: flex; flex-wrap: wrap; gap: 6px; }
.dl .keeps span { border: 1px solid var(--rule-strong); border-radius: 999px; padding: 1px 9px; color: var(--ink); font-size: 12px; }
.dl .rad { display: flex; align-items: center; gap: 8px; height: 26px; color: var(--ink); }
.dl .rad span.d { color: var(--soft); }
.dl .rb { width: 14px; height: 14px; border-radius: 50%; border: 1.5px solid var(--rule-strong); box-sizing: border-box; flex: none; }
.dl .rb.on { border: 4.5px solid var(--ink); }
.dl .ck2 { display: flex; align-items: center; gap: 8px; color: var(--ink); margin-top: 12px; }
.dl .ft { margin-top: 16px; display: flex; gap: 8px; } .dl .ft .sp { flex: 1; } .dl .ft .btn { height: 34px; }
.view .sh2 { font-size: 11px; opacity: .8; }
#vNew { display: none; }
.tip { position: absolute; z-index: 8; background: var(--ink); color: #fff; font-size: 12px; border-radius: 8px; padding: 7px 10px; line-height: 1.4; white-space: nowrap; opacity: 0; }
.tip span { color: #d4d4d4; }
"""
DLG = '''    <div class="scr2" id="scr2"></div>
    <section class="dl" id="svd" role="dialog" aria-labelledby="dlT">
      <h3 id="dlT">Save view</h3>
      <div class="f1"><label class="lbl" for="vN">Name</label><div class="in f" id="vN"><span id="vNv"></span><span class="c" id="vNc"></span></div></div>
      <div class="f1"><span class="lbl">Saves together</span><div class="keeps"><span>Owner: Deactivated</span><span>Sharing: Public link</span><span>Sort: last activity</span><span>6 columns</span><span>List</span></div></div>
      <div class="f1"><span class="lbl">Who can use it</span>
        <div class="rad" id="rMe"><span class="rb on" id="rbMe"></span>Only me</div>
        <div class="rad" id="rCa"><span class="rb" id="rbCa"></span>Content admins<span class="d">· 3 people. Only you can change it</span></div>
        <div class="rad"><span class="rb"></span>Everyone who can see Content</div></div>
      <div class="ck2" id="dfl"><span class="cb" id="cbD"></span>Open Content with this view</div>
      <div class="ft"><span class="sp"></span><span class="btn">Cancel</span><span class="btn pri" id="bSv">Save view</span></div>
    </section>
    <div class="tip" id="tip">Shared by <b>Toryn Farr</b> with Content admins<br><span>Changed by Toryn 2 days ago: added Size over 1 GB</span></div>'''
TOAST = '    <div class="toast" id="toast"><i><svg width="11" height="11"><use href="#tick"/></svg></i>Saved and applied: Stale public links</div>'
def edit(s):
    s = s.replace('<span class="sv" id="bSave">', '<span class="view on" id="vNew">Stale public links <span class="n">3</span><span class="sh2">· Shared</span></span><span class="sv" id="bSave">', 1)
    s = s.replace('<span class="view" id="vwDeact">Owner deactivated <span class="n">112</span></span>', '<span class="view" id="vwDeact">Owner deactivated <span class="n">112</span><span class="sh2">· Shared</span></span>', 1)
    return s

SCRIPT = r"""const { $, at, span, easeOut } = Motion;
const NAME = "Stale public links";

/* ---------- timeline (scene seconds) ---------- */
const T = {
  sClick: 1.20, open: [1.25, 1.50], type: [1.75, 2.75], caClick: 3.55, dClick: 4.35, svClick: 5.15, close: [5.20, 5.40], toast: [5.45, 6.90],
  tip: 7.70, endCard: [9.40, 9.85], end: 10.35
};

function build() {
  const ar = at("area"), sv = at("bSave");
  $("svd").style.opacity = 1; $("svd").style.visibility = "visible";
  const ca = at("rbCa"), d = at("cbD"), b = at("bSv");
  $("svd").style.opacity = 0; $("svd").style.visibility = "";
  $("vNew").style.display = "inline-flex"; const v = at("vwDeact", 0, 0); $("vNew").style.display = "";
  const cur = [
    [0.00, 860, 650], [0.25, 860, 650], [0.95, sv[0], sv[1] + 3], [1.25, sv[0], sv[1] + 3], [3.30, ca[0], ca[1] + 3], [3.60, ca[0], ca[1] + 3],
    [4.10, d[0], d[1] + 3], [4.40, d[0], d[1] + 3], [4.90, b[0], b[1] + 3], [5.20, b[0], b[1] + 3], [7.40, v[0], v[1] + 3], [9.40, v[0] + 2, v[1] + 4]
  ];
  const cam = [
    [0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00],
    [0.95, 700, ar[1] + 40, 1.12], [9.15, 700, ar[1] + 40, 1.12],     // one steady view: the filters, the views and the dialog
    [9.40, 656, 360, 1.04]
  ];
  return { cam, cur };
}

function render(t) {
  ["tA", "tB", "tC", "tD", "gC"].forEach(x => $(x).style.opacity = x === "tC" ? 1 : 0);
  ["m0", "m1", "m2", "m3"].forEach(x => $(x).style.opacity = x === "m2" ? 1 : 0);
  // the filters she has set, ready to save
  $("fOwn").classList.add("on"); $("foL").innerHTML = "Owner: <b>Deactivated</b>";
  $("fShare").classList.add("on"); $("fsL").innerHTML = "Sharing: <b>Public link</b>";
  $("clr").style.visibility = "visible";
  const o = span(t, ...T.open, easeOut) * (1 - span(t, ...T.close, easeOut));
  $("svd").style.opacity = o; $("scr2").style.opacity = o; $("svd").style.visibility = o > 0 ? "visible" : "hidden";
  $("svd").style.transform = `translateY(${8 * (1 - o)}px)`;
  const n = Math.round(NAME.length * span(t, ...T.type, x => x));
  $("vNv").textContent = NAME.slice(0, n);
  $("vNc").style.opacity = t < T.caClick && (t < T.type[1] + .05 || Math.floor(t * 2.4) % 2 === 0) ? 1 : 0;
  $("vN").className = "in" + (t < T.caClick ? " f" : "");
  const ca = t >= T.caClick;
  $("rbMe").classList.toggle("on", !ca); $("rbCa").classList.toggle("on", ca);
  $("cbD").classList.toggle("on", t >= T.dClick);
  $("bSv").classList.toggle("dn", t >= T.svClick - .05 && t < T.close[0]);
  // saved: it's the active view, shared, and its name is announced
  $("vNew").style.display = t >= T.close[0] ? "inline-flex" : "none";
  $("toast").style.opacity = span(t, T.toast[0], T.toast[0] + .2) * (1 - span(t, T.toast[1] - .2, T.toast[1]));
  // another shared view says who made it and what changed
  const tp = span(t, T.tip, T.tip + .2);
  $("tip").style.opacity = tp; const v = at("vwDeact"); $("tip").style.left = (v[0] - 40 - 110) + "px"; $("tip").style.top = (v[1] - 20 + 20) + "px";
}

function events() { return [["click", T.sClick], ["whoosh", T.open[0]], ["key", T.type[0]], ["click", T.caClick], ["click", T.dClick], ["click", T.svClick], ["pop", T.toast[0]]]; }

Motion.scene({
  // 5+ steps: natural length, within the 15 s cap
  T, clicks: [T.sClick, T.caClick, T.dClick, T.svClick], build, render, events
});"""
COMMENT = """  Source for media/search-filtering/saved-views.mp4. Built by motion/_build/saved_views.py on _build/allcontent_page.py
  (Content › All content), with the top bar's alerts bell.
  Follows the Saved views card (data/guidance-foundations.js):
  - filters, sort, columns and layout saved together, and the dialog says so
  - named; only me, or shared with a group, and only its owner can change it; set as her default
  - the active view is shown, and applying it is announced
  - a shared view says who made it and who changed it, when"""
make("saved-views", "Saved views", COMMENT, CSS, DLG, TOAST, SCRIPT, edit=edit)
