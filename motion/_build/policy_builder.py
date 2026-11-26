import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from compliance_page import make, policies, list_head

CSS = r"""
#vB { opacity: 0; }
.tpl { margin-top: 12px; display: flex; gap: 8px; align-items: center; font-size: 12.5px; color: var(--soft); }
.chip { height: 30px; display: inline-flex; align-items: center; padding: 0 11px; border-radius: 999px; border: 1px solid var(--rule-strong); font-size: 12.5px; color: var(--ink); }
.chip.on { background: var(--ink); color: #fff; border-color: var(--ink); }
.bl { margin-top: 12px; display: grid; grid-template-columns: 560px 1fr; gap: 20px; }
.rule { border: 1px solid var(--rule-strong); border-radius: 12px; padding: 4px 14px; }
.rule .ln { display: flex; gap: 10px; align-items: center; padding: 9px 0; border-top: 1px solid var(--rule); position: relative; }
.rule .ln:first-child { border-top: 0; }
.rule .k { width: 44px; font-size: 13px; font-weight: 600; color: var(--ink); }
.rule .in { height: 34px; width: 210px; justify-content: space-between; }
.rule .in.ph { color: var(--faint); }
.rule .chk2 { display: flex; gap: 8px; align-items: center; font-size: 12.5px; color: var(--ink); }
.rule .menu { position: absolute; left: 274px; top: 46px; width: 210px; z-index: 9; opacity: 0; }
.nm2 { margin-top: 12px; }
.sum { border: 1px solid var(--rule); background: var(--subtle); border-radius: 12px; padding: 12px 14px; font-size: 14px; color: var(--ink); line-height: 1.5; }
.sum .h2 { font-size: 12px; color: var(--soft); margin-bottom: 4px; }
.cnf { margin-top: 10px; border: 1px solid #b45309; background: #fffbeb; border-radius: 10px; padding: 9px 12px; color: #78350f; display: flex; gap: 8px; font-size: 12.5px; line-height: 1.45; opacity: 0; }
.cnf svg { width: 14px; height: 14px; flex: none; margin-top: 2px; color: #b45309; }
.cnf b { color: #78350f; }
.ft3 { margin-top: 14px; display: flex; gap: 8px; align-items: center; }
.ft3 .sp { flex: 1; } .ft3 .btn { height: 34px; }
.btn.dis { color: var(--faint); border-color: var(--rule); background: var(--subtle); }
.ft3 .nt { font-size: 12px; color: var(--soft); }
"""
WN = '<svg aria-hidden="true"><use href="#warn"/></svg>'
LMENU = '<div class="menu" id="lMenu"><div>Public</div><div>Internal</div><div>Confidential</div><div id="oR">Restricted</div></div>'
BUILDER = f'''      <div class="view" id="vB">
        <div class="hd"><h1>New policy</h1><span class="sp"></span><span class="btn sm">Cancel</span></div>
        <div class="tpl">Start from<span class="chip on" id="cBl">Blank</span><span class="chip" id="cTp">Block external sharing of labelled content</span><span class="chip">Expire external links</span><span class="chip">Keep for 7 years</span></div>
        <div class="bl"><div>
          <div class="nm2"><label class="lbl">Name</label><div class="in" id="nmI" style="width:100%"><span id="nmT" style="color:var(--faint)">Name this policy</span></div></div>
          <div class="rule" style="margin-top:12px">
            <div class="ln"><span class="k">When</span><span class="in ph" id="w1"><span>Choose an event</span><i class="cv"></i></span><span class="in ph" id="w2"><span>—</span><i class="cv"></i></span></div>
            <div class="ln"><span class="k">To</span><span class="in ph" id="t1"><span>Choose what it covers</span><i class="cv"></i></span><span class="in ph" id="t2"><span>—</span><i class="cv"></i></span>{LMENU}</div>
            <div class="ln"><span class="k">Do</span><span class="in ph" id="d1"><span>Choose an action</span><i class="cv"></i></span><span class="chk2"><span class="cb" id="cbO"></span>Tell the file’s owner</span></div>
          </div>
          <div class="ft3"><span class="btn" id="bSim">Simulate</span><span class="btn dis" aria-disabled="true">Enforce</span><span class="nt">Simulate it before enforcing</span><span class="sp"></span><span class="btn pri" id="bDr">Save as draft</span></div>
        </div>
        <div><div class="sum" aria-live="polite"><div class="h2">In plain words</div><span id="sum">Choose an event, what it covers and an action.</span></div>
          <div class="cnf" id="cnf" role="status">{WN}<span><b>Overlaps Death Star plans · restricted</b>, priority 1, which already blocks sharing these files outside Echo Base. That policy wins; this one adds telling the owner.</span></div></div></div>
      </div>'''
MAIN = f'      <div class="view" id="vL">\n{list_head()}{policies()}      </div>\n' + BUILDER + "\n"
TOAST = '      <div class="toast" id="toast"><i><svg width="11" height="11"><use href="#ok"/></svg></i>Saved as a draft · nothing is enforced yet</div>'
SCRIPT = r"""const { $, at, span, easeOut } = Motion;

/* ---------- timeline (scene seconds) ---------- */
const T = {
  nClick: 0.95, toB: 1.00, tClick: 2.10, fill: 2.20, lClick: 3.30, lmenu: [3.35, 4.15], rPick: 4.05, oClick: 5.00, dClick: 6.10,
  toast: [6.20, 7.40], endCard: [7.50, 7.95], end: 8.5
};

function setIn(id, txt, on) { const e = $(id); e.className = "in" + (on ? "" : " ph"); e.firstChild.textContent = txt; }

function build() {
  const nw = at("bNew");
  $("vB").style.opacity = 1; const tp = at("cTp", -120, 0), l = at("t2", -60, 0);
  $("lMenu").style.opacity = 1; const r = at("oR", -60, 0); $("lMenu").style.opacity = 0;
  const o = at("cbO"), d = at("bDr"); $("vB").style.opacity = 0;
  const cur = [
    [0.00, 960, 640], [0.25, 960, 640], [0.70, nw[0], nw[1] + 3], [1.00, nw[0], nw[1] + 3],
    [1.85, tp[0], tp[1] + 3], [2.15, tp[0], tp[1] + 3], [3.05, l[0], l[1] + 3], [3.35, l[0], l[1] + 3], [3.80, r[0], r[1] + 3], [4.10, r[0], r[1] + 3],
    [4.75, o[0], o[1] + 3], [5.05, o[0], o[1] + 3], [5.85, d[0], d[1] + 3], [6.15, d[0], d[1] + 3], [7.50, d[0] + 80, d[1] - 180]
  ];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 330, 1.06], [7.25, 650, 330, 1.06], [7.50, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  const b = t >= T.toB;
  $("crumb").innerHTML = b ? "/ Compliance / Policies / <b>New policy</b>" : "/ Compliance / <b>Policies</b>";
  $("vL").style.opacity = b ? 0 : 1; $("vB").style.opacity = b ? 1 : 0;
  $("bNew").classList.toggle("dn", t >= T.nClick - .05 && t < T.toB + .1);
  // a template fills the sentence; she sets what's left
  const tp = t >= T.tClick, f = span(t, T.fill, T.fill + .5, x => x), lab = t >= T.rPick + .05, own = t >= T.oClick;
  $("cBl").className = "chip" + (tp ? "" : " on"); $("cTp").className = "chip" + (tp ? " on" : "");
  $("nmT").textContent = lab ? "Block external sharing · Restricted" : tp ? "Block external sharing of labelled content" : "Name this policy";
  $("nmT").style.color = tp ? "var(--ink)" : "var(--faint)";
  setIn("w1", f > .2 ? "Someone shares a file" : "Choose an event", f > .2);
  setIn("w2", f > .35 ? "Outside Echo Base" : "—", f > .35);
  setIn("t1", f > .5 ? "Files labelled" : "Choose what it covers", f > .5);
  setIn("t2", lab ? "Restricted" : f > .65 ? "Choose a label" : "—", lab);
  setIn("d1", f > .85 ? "Block the share" : "Choose an action", f > .85);
  $("t2").classList.toggle("f", t >= T.lClick && t < T.lmenu[1]);
  $("lMenu").style.opacity = span(t, T.lmenu[0], T.lmenu[0] + .12) * (1 - span(t, T.lmenu[1] - .08, T.lmenu[1]));
  $("oR").classList.toggle("hov", t >= T.rPick - .25);
  $("cbO").classList.toggle("on", own);
  // the sentence updates as it's built, and conflicts show while editing
  $("sum").innerHTML = !tp ? "Choose an event, what it covers and an action."
    : `When someone shares a file labelled <b>${lab ? "Restricted" : "…"}</b> outside Echo Base, block it${own ? " and tell the file’s owner" : ""}.`;
  $("cnf").style.opacity = span(t, T.rPick + .15, T.rPick + .45);
  $("bDr").classList.toggle("dn", t >= T.dClick - .05 && t < T.toast[0]);
  $("toast").style.opacity = span(t, T.toast[0], T.toast[0] + .2) * (1 - span(t, T.toast[1] - .2, T.toast[1]));
}

function events() { return [["click", T.nClick], ["click", T.tClick], ["click", T.lClick], ["click", T.rPick], ["pop", T.rPick + .2], ["click", T.oClick], ["click", T.dClick], ["pop", T.toast[0]]]; }

Motion.scene({
  // 5+ steps: natural length, within the 15 s cap
  T, clicks: [T.nClick, T.tClick, T.lClick, T.rPick, T.oClick, T.dClick], build, render, events,
  slow: [[4.3, 4.8, 1.4]]
});"""
COMMENT = """  Source for media/policies/policy-builder.mp4. Built by motion/_build/policy_builder.py on _build/compliance_page.py,
  with the top bar's alerts bell.
  Follows the Policy builder card (data/guidance-governance.js):
  - When, To and Do, with labelled fields, and a template for a common policy; no rule syntax needed
  - a plain-language sentence that updates as it's built
  - a conflict shown while editing, with which policy wins
  - saved as a draft; Enforce stays off until it's been simulated"""
make("policy-builder", "Policy builder", COMMENT, CSS, "Compliance / Policies", MAIN, SCRIPT, toast=TOAST)
