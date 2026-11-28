import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from announce_page import make, view, ann_table, ban_table

CSS = r"""
#vB { opacity: 0; }
#rN { display: none; }
.bnr { display: flex; gap: 10px; align-items: flex-start; border: 1px solid var(--rule-strong); background: #f4f4f5; border-radius: 10px; padding: 10px 12px; font-size: 12.5px; color: var(--ink); line-height: 1.45; }
.bnr svg.i { width: 15px; height: 15px; flex: none; margin-top: 2px; }
.bnr .w { flex: 1; } .bnr .w b { font-weight: 600; }
.bnr .x { color: var(--soft); font-size: 13px; }
.lbl2 { font-size: 12px; color: var(--soft); margin: 14px 0 6px; }
.flds { display: grid; gap: 8px; }
.flds .in { height: auto; min-height: 36px; padding: 7px 11px; white-space: normal; line-height: 1.4; }
.note2 { margin-top: 10px; font-size: 12px; color: var(--soft); display: flex; gap: 6px; align-items: center; }
"""
INFO = '<svg class="i" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 7.2v4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="8" cy="4.9" r="1" fill="currentColor"/></svg>'
NEW = '<tr id="rN" class="nw"><td class="nm"><b>Console maintenance</b><span>Maintenance · can be dismissed</span></td><td class="ch">Everyone</td><td>Sat, Nov 29, 02:00–04:00 UTC</td><td>Scheduled</td></tr>'
MAIN = (view("ann", '<span class="btn sm pri">New announcement</span>', '        <div class="bar2">Messages from admins to the people they manage. Org-wide announcements need a second admin’s approval.</div>\n' + ann_table(), "vA")
        + view("ban", '<span class="btn sm pri" id="bNew">New banner</span>', '        <div class="bar2">A banner shows at the top of every page. Only one shows at a time: if two overlap, the later one waits.</div>\n' + ban_table(NEW), "vB").replace('id="sg-', 'id="sb-').replace('id="n-', 'id="nb-'))
EXTRA = f'''    <div class="scr" id="scr"></div>
    <section class="dlg" id="dlg" role="dialog" aria-labelledby="bT" style="left:310px; top:91px; width:580px">
      <h3 id="bT">New banner</h3>
      <div class="f1"><span class="lbl">Type</span><div class="chips"><span class="chip" id="cM">Maintenance</span><span class="chip">Incident</span><span class="chip">Required action</span></div></div>
      <div class="f1 flds" id="fl"><div class="in ph" id="f1">What’s happening</div><div class="in ph" id="f2">What it means for people</div><div class="in ph" id="f3">What they should do</div></div>
      <div class="f1 row2"><div><label class="lbl">When</label><div class="in sel2" id="wh">Choose a start and end<i class="cv"></i></div></div><div><label class="lbl">Who sees it</label><div class="in sel2">Everyone · 1,204<i class="cv"></i></div></div></div>
      <div class="lbl2">How it will look, at the top of every page</div>
      <div class="bnr" id="bnr">{INFO}<div class="w" id="bnT"><b>Banner preview</b> appears as you write</div><span class="x" id="bnX" aria-label="Dismiss">✕</span></div>
      <div class="note2" id="nt">Maintenance banners can be dismissed. Incident banners stay until they end.</div>
      <div class="ft"><span class="sp"></span><span class="btn">Cancel</span><span class="btn pri" id="bSch">Schedule</span></div>
    </section>'''
TOAST = '      <div class="toast" id="toast"><i><svg width="11" height="11"><use href="#ok"/></svg></i>Banner scheduled for Sat, Nov 29, 02:00–04:00 UTC</div>'
SCRIPT = r"""const { $, at, span, easeOut } = Motion;

/* ---------- timeline (scene seconds) ---------- */
const T = {
  tabClick: 0.90, toB: 0.95, nClick: 1.75, open: [1.80, 2.10], mClick: 2.75, fill: 2.85, sClick: 4.40,
  close: [4.50, 4.75], toast: [4.80, 5.55], endCard: [5.55, 6.00], end: 6.5
};

function build() {
  const tb = at("sg-ban");
  $("vB").style.opacity = 1; const nw = at("bNew"); $("vB").style.opacity = 0;
  $("dlg").style.opacity = 1; const m = at("cM"), sc = at("bSch"); $("dlg").style.opacity = 0;
  const cur = [
    [0.00, 960, 640], [0.25, 960, 640], [0.65, tb[0], tb[1] + 3], [0.95, tb[0], tb[1] + 3],
    [1.50, nw[0], nw[1] + 3], [1.80, nw[0], nw[1] + 3], [2.50, m[0], m[1] + 3], [2.80, m[0], m[1] + 3],
    [3.50, m[0] + 120, m[1] + 260], [4.15, sc[0], sc[1] + 3], [4.45, sc[0], sc[1] + 3], [5.55, sc[0] - 260, sc[1] - 60]
  ];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 345, 1.06], [5.30, 650, 345, 1.06], [5.55, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  $("crumb").innerHTML = "/ Settings / <b>Announcements</b>";
  const b = t >= T.toB;
  $("vA").style.opacity = b ? 0 : 1; $("vB").style.opacity = b ? 1 : 0;
  $("sg-ban").classList.toggle("prs", t >= T.tabClick - .05 && t < T.toB);
  $("bNew").classList.toggle("dn", t >= T.nClick - .05 && t < T.open[0] + .15);
  const o = span(t, ...T.open, easeOut) * (1 - span(t, ...T.close, easeOut));
  $("dlg").style.opacity = o; $("scr").style.opacity = o; $("dlg").style.transform = `translateY(${8 * (1 - o)}px)`;
  $("dlg").style.visibility = o > 0 ? "visible" : "hidden";
  // a template says what, what it means, what to do, and when it ends
  const m = t >= T.mClick, f = span(t, T.fill, T.fill + .6, x => x);
  $("cM").classList.toggle("on", m);
  const F = [["f1", "Echo Base Console maintenance"], ["f2", "Sign-in and search are unavailable for up to 2 hours"], ["f3", "Save your work before 02:00 UTC"]];
  F.forEach(([id, v], i) => { const on = f > i / 3; $(id).textContent = on ? v : ["What’s happening", "What it means for people", "What they should do"][i]; $(id).className = "in" + (on ? "" : " ph"); });
  $("wh").firstChild.textContent = f >= 1 ? "Sat, Nov 29 · 02:00–04:00 UTC" : "Choose a start and end";
  $("bnT").innerHTML = f >= 1 ? "<b>Maintenance Sat, Nov 29, 02:00–04:00 UTC.</b> Sign-in and search are unavailable for up to 2 hours. Save your work before 02:00 UTC." : f > 0 ? "<b>Echo Base Console maintenance.</b>" : "<b>Banner preview</b> appears as you write";
  $("bSch").classList.toggle("dn", t >= T.sClick - .05 && t < T.close[0]);
  $("rN").style.display = t >= T.close[0] ? "table-row" : "none";
  $("nb-ban").textContent = t >= T.close[0] ? "2" : "1";
  $("toast").style.opacity = span(t, T.toast[0], T.toast[0] + .2) * (1 - span(t, T.toast[1] - .2, T.toast[1]));
}

function events() { return [["click", T.tabClick], ["click", T.nClick], ["whoosh", T.open[0]], ["click", T.mClick], ["click", T.sClick], ["pop", T.toast[0]]]; }

Motion.scene({
  // under 5 steps: natural length, within the 10 s cap
  T, clicks: [T.tabClick, T.nClick, T.mClick, T.sClick], build, render, events,
  slow: []
});"""
COMMENT = """  Source for media/notifications/banners.mp4. Built by motion/_build/banners.py on _build/announce_page.py,
  with the top bar's alerts bell from _build/bell.py.
  Follows the Banners card (data/guidance-platform.js):
  - for things that affect many people: maintenance, incidents, required actions
  - what's happening, what it means and what to do, with an end time
  - a preview of how it will look; text and an icon, not colour alone; it doesn't move
  - maintenance banners can be dismissed; only one shows at a time, so banners never stack"""
make("banners", "Banners", COMMENT, CSS, MAIN, SCRIPT, extra=EXTRA, toast=TOAST)
