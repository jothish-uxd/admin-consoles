import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from compliance_page import make

CSS = r"""
.note3 { margin-top: 12px; font-size: 12.5px; color: var(--soft); display: flex; gap: 8px; align-items: center; }
.note3 b { color: var(--ink); font-weight: 500; }
.note3 svg { width: 14px; height: 14px; }
.drw .f1 { margin-top: 12px; position: relative; }
.drw .in { height: 36px; justify-content: space-between; }
.drw .menu { position: absolute; left: 0; top: 64px; width: 100%; z-index: 9; opacity: 0; }
.opt { margin-top: 6px; border: 1px solid var(--rule); border-radius: 9px; padding: 7px 11px; display: flex; gap: 9px; font-size: 12px; color: var(--soft); }
.opt b { display: block; color: var(--ink); font-weight: 500; font-size: 12.5px; }
.opt .rd { width: 14px; height: 14px; border-radius: 50%; border: 1.5px solid var(--rule-strong); flex: none; margin-top: 2px; position: relative; box-sizing: border-box; }
.opt.on { border-color: var(--ink); } .opt.on .rd { border-color: var(--ink); }
.opt.on .rd::after { content: ""; position: absolute; inset: 2px; border-radius: 50%; background: var(--ink); }
.wb { margin-top: 10px; border: 1px solid #b45309; background: #fffbeb; border-radius: 10px; padding: 9px 12px; color: #78350f; display: flex; gap: 8px; font-size: 12.5px; line-height: 1.45; opacity: 0; }
.wb svg { width: 14px; height: 14px; flex: none; margin-top: 2px; color: #b45309; }
.drw .ft { margin-top: 14px; display: flex; gap: 8px; } .drw .ft .sp { flex: 1; } .drw .ft .btn { height: 34px; }
.btn.dgrf { background: #b91c1c; border-color: #b91c1c; color: #fff; }
.btn.dgrf.dn { background: #7f1d1d; border-color: #7f1d1d; }
"""
WN = '<svg aria-hidden="true"><use href="#warn"/></svg>'
HOLD = '<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="3.5" y="7" width="9" height="6.5" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5.5 7V5.2a2.5 2.5 0 0 1 5 0V7" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'
ROWS = [("rM", "Mission logs", "Holonet Drive › Fleet manuals", "7 years after last change", "Delete", "412,000", "1,180"),
        ("rC", "Chat messages", "HoloComms channels", '<span id="rCk">2 years after they’re sent</span>', '<span id="rCt">Delete</span>', "1.9M", '<span id="rCd">4,200</span>'),
        ("rH", "HR records", "HR folders", "7 years after someone leaves", "Review first", "8,400", "12")]
MAIN = f'''      <div class="view">
        <div class="hd"><h1>Retention</h1><span class="sp"></span><span class="btn sm pri">New retention policy</span></div>
        <div class="note3">{HOLD}<span><b>Legal holds win.</b> Content on hold is kept until the hold is released, whatever these policies say, and people can’t delete it either.</span></div>
        <table class="st"><thead><tr><th>Policy</th><th>Keep for</th><th>Then</th><th>Covers</th><th>Due in 30 days</th></tr></thead><tbody>
          {"".join(f'<tr id="{i}"><td class="nm"><b>{n}</b><span>{w}</span></td><td style="color:var(--ink)">{k}</td><td>{e}</td><td>{c} items</td><td>{d}</td></tr>' for i, n, w, k, e, c, d in ROWS)}</tbody></table>
      </div>'''
EXTRA = f'''    <aside class="drw" id="drw" role="dialog" aria-labelledby="dT">
      <div class="tt"><div><b id="dT">Chat messages</b>HoloComms channels · 1.9M items</div><span class="x" aria-label="Close">✕</span></div>
      <div class="f1"><label class="lbl">Keep for</label><span class="in" id="kp"><span id="kpT">2 years after they’re sent</span><i class="cv"></i></span>
        <div class="menu" id="kMenu"><div id="o1">1 year after they’re sent</div><div>2 years after they’re sent<span style="display:block;font-size:11.5px;color:var(--soft)">Current</span></div><div>7 years after they’re sent</div></div></div>
      <div class="wb" id="wb" role="status">{WN}<span><b>84,300 messages become eligible for deletion right away.</b> 2,140 of them are on legal hold and will be kept.</span></div>
      <div class="f1"><span class="lbl">Then</span>
        <div class="opt" id="oD"><span class="rd"></span><div><b>Delete</b>Deleted automatically, and recorded</div></div>
        <div class="opt" id="oR"><span class="rd"></span><div><b>Review first</b>Owners confirm before anything is deleted</div></div></div>
      <div class="ft"><span class="sp"></span><span class="btn">Cancel</span><span class="btn pri" id="bSv">Save</span></div>
    </aside>
    <div class="scr" id="scr"></div>
    <section class="dlg" id="dlg" role="alertdialog" aria-labelledby="cT" style="left:340px; top:265px; width:520px">
      <h3 id="cT">Shorten Chat messages to 1 year?</h3>
      <div style="margin-top:6px; line-height:1.45">84,300 messages become eligible for deletion. With Review first, their owners confirm before any of them is deleted, and the 2,140 on legal hold are kept.</div>
      <div class="ft"><span class="sp"></span><span class="btn">Cancel</span><span class="btn dgrf" id="bCf">Shorten to 1 year</span></div>
    </section>'''
TOAST = '      <div class="toast" id="toast"><i><svg width="11" height="11"><use href="#ok"/></svg></i>Chat messages: kept for 1 year, then reviewed by owners · logged</div>'
SCRIPT = r"""const { $, at, span, easeOut } = Motion;

/* ---------- timeline (scene seconds) ---------- */
const T = {
  rClick: 0.95, open: [1.00, 1.30], kClick: 2.20, kmenu: [2.25, 3.05], pick: 2.95, warn: 3.10, rvClick: 4.30, svClick: 5.20,
  dlg: [5.25, 5.50], cfClick: 6.40, close: [6.45, 6.70], toast: [6.75, 7.60], endCard: [7.60, 8.05], end: 8.55
};

function build() {
  const r = at("rC", -300, 0);
  $("drw").style.transform = "none"; $("drw").style.visibility = "visible";
  const k = at("kp", -100, 0); $("kMenu").style.opacity = 1; const o1 = at("o1", -100, 0); $("kMenu").style.opacity = 0;
  $("wb").style.opacity = 1; const rv = at("oR", -120, 0), sv = at("bSv"); $("wb").style.opacity = 0;
  $("drw").style.transform = ""; $("drw").style.visibility = "";
  $("dlg").style.opacity = 1; const cf = at("bCf"); $("dlg").style.opacity = 0;
  const cur = [
    [0.00, 960, 640], [0.25, 960, 640], [0.70, r[0], r[1] + 3], [1.00, r[0], r[1] + 3],
    [1.95, k[0], k[1] + 3], [2.25, k[0], k[1] + 3], [2.70, o1[0], o1[1] + 3], [3.00, o1[0], o1[1] + 3],
    [4.05, rv[0], rv[1] + 3], [4.35, rv[0], rv[1] + 3], [4.95, sv[0], sv[1] + 3], [5.25, sv[0], sv[1] + 3],
    [6.15, cf[0], cf[1] + 3], [6.45, cf[0], cf[1] + 3], [7.60, cf[0] - 260, cf[1] + 80]
  ];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 345, 1.04], [7.35, 650, 345, 1.04], [7.60, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  $("crumb").innerHTML = "/ Compliance / <b>Retention</b>";
  $("rC").classList.toggle("sel", t >= T.rClick - .05 && t < T.close[1]);
  const o = span(t, ...T.open, easeOut) * (1 - span(t, T.dlg[0], T.dlg[0] + .15));
  $("drw").style.transform = `translateX(${440 * (1 - o)}px)`; $("drw").style.visibility = o > 0 ? "visible" : "hidden";
  $("kMenu").style.opacity = span(t, T.kmenu[0], T.kmenu[0] + .12) * (1 - span(t, T.kmenu[1] - .08, T.kmenu[1]));
  $("o1").classList.toggle("hov", t >= T.pick - .25);
  $("kp").className = "in" + (t >= T.kClick && t < T.kmenu[1] ? " f" : "");
  const one = t >= T.pick + .05, rv = t >= T.rvClick;
  $("kpT").textContent = one ? "1 year after they’re sent" : "2 years after they’re sent";
  // shortening says how much becomes deletable at once, before saving
  $("wb").style.opacity = span(t, T.warn, T.warn + .25);
  $("oD").classList.toggle("on", !rv); $("oR").classList.toggle("on", rv);
  $("bSv").classList.toggle("dn", t >= T.svClick - .05 && t < T.dlg[0]);
  // a review before anything that will delete content
  const d = span(t, T.dlg[0] + .1, T.dlg[1], easeOut) * (1 - span(t, ...T.close));
  $("dlg").style.opacity = d; $("scr").style.opacity = d; $("dlg").style.visibility = d > 0 ? "visible" : "hidden";
  $("bCf").classList.toggle("dn", t >= T.cfClick - .05 && t < T.close[0]);
  const done = t >= T.close[0];
  $("rCk").textContent = done ? "1 year after it’s sent" : "2 years after they’re sent";
  $("rCt").textContent = done ? "Review first" : "Delete";
  $("rCd").textContent = done ? "84,300 to review" : "4,200";
  $("toast").style.opacity = span(t, T.toast[0], T.toast[0] + .2) * (1 - span(t, T.toast[1] - .2, T.toast[1]));
}

function events() { return [["click", T.rClick], ["whoosh", T.open[0]], ["click", T.kClick], ["click", T.pick], ["pop", T.warn], ["click", T.rvClick], ["click", T.svClick], ["click", T.cfClick], ["pop", T.toast[0]]]; }

Motion.scene({
  // 5+ steps: natural length, within the 15 s cap
  T, clicks: [T.rClick, T.kClick, T.pick, T.rvClick, T.svClick, T.cfClick], build, render, events,
  slow: [[3.2, 3.9, 1.25]]
});"""
COMMENT = """  Source for media/policies/retention-policies.mp4. Built by motion/_build/retention_policies.py on _build/compliance_page.py,
  with the top bar's alerts bell.
  Follows the Retention policies card (data/guidance-governance.js):
  - each policy by what it covers, with a period in plain words, an end action, how much it covers and what's due soon
  - holds win over retention, said on the page
  - shortening a period says how much becomes deletable at once, and what stays on hold
  - Review first lets owners confirm before deletion; a review before saving anything that deletes"""
make("retention-policies", "Retention policies", COMMENT, CSS, "Compliance / Retention", MAIN, SCRIPT, extra=EXTRA, toast=TOAST)
