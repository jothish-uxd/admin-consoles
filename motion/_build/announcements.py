import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from announce_page import make, view, ann_table

CSS = r"""
#rN { display: none; }
.menu.aud { position: absolute; left: 0; top: 40px; width: 100%; z-index: 6; opacity: 0; }
.menu.aud .s2 { display: block; font-size: 11.5px; color: var(--soft); }
.audw { position: relative; }
.pv { display: none; margin-top: 12px; border: 1px solid var(--rule); border-radius: 12px; background: var(--subtle); padding: 14px; }
.pv .card { background: var(--bg); border: 1px solid var(--rule-strong); border-radius: 12px; padding: 14px 16px; font-size: 13px; color: var(--soft); line-height: 1.5; }
.pv .card .fr { font-size: 12px; color: var(--soft); display: flex; gap: 8px; align-items: center; }
.pv .card .fr .av { width: 22px; height: 22px; font-size: 9px; }
.pv .card b.t { display: block; margin: 8px 0 4px; color: var(--ink); font-size: 15px; font-weight: 600; }
.pv .card .ft2 { margin-top: 10px; display: flex; gap: 8px; } .pv .card .ft2 .btn { height: 30px; font-size: 12px; }
.pv .cap2 { font-size: 12px; color: var(--soft); margin-bottom: 8px; }
"""
NEW = '<tr id="rN" class="nw"><td class="nm"><b>Holonet Drive is now in search</b></td><td class="ch">Fleet · 82</td><td>Scheduled · Mon, Dec 1, 09:00</td><td>Not sent yet</td></tr>'
MAIN = view("ann", '<span class="btn sm pri" id="bNew">New announcement</span>', '        <div class="bar2">Messages from admins to the people they manage. Org-wide announcements need a second admin’s approval.</div>\n' + ann_table(NEW))
EXTRA = '''    <div class="scr" id="scr"></div>
    <section class="dlg" id="dlg" role="dialog" aria-labelledby="aT" style="left:310px; top:68px; width:580px">
      <div style="display:flex;align-items:center;gap:10px"><h3 id="aT" style="flex:1">New announcement</h3><span class="seg"><span id="tW" class="on">Write</span><span id="tP">Preview</span></span></div>
      <div id="pW">
        <div class="f1"><label class="lbl">Title</label><div class="in f" id="tIn"><span id="tTx"></span><span class="c" id="tC"></span></div></div>
        <div class="f1"><label class="lbl">Who gets it</label><div class="audw"><div class="in sel2 ph" id="aud"><span id="audT">Choose groups, roles or regions</span><i class="cv"></i></div>
          <div class="menu aud" id="aMenu"><div>Everyone<span class="s2">1,204 people · needs a second admin’s approval</span></div><div id="mF">Fleet<span class="s2">82 people</span></div><div>Hangar 3<span class="s2">14 people</span></div></div></div></div>
        <div class="f1"><label class="lbl">Message</label><div class="ta">Search and AI answers now include Fleet manuals and Hangar procedures from Holonet Drive. You’ll only see files you can already open there.</div></div>
      </div>
      <div class="pv" id="pP"><div class="cap2">As the 82 people in Fleet will see it, at the top of Home</div>
        <div class="card"><div class="fr"><span class="av">LS</span>Lavanya Sienna, admin · Mon, Dec 1</div><b class="t">Holonet Drive is now in search</b>Search and AI answers now include Fleet manuals and Hangar procedures from Holonet Drive. You’ll only see files you can already open there.
          <div class="ft2"><span class="btn">Got it</span></div></div></div>
      <div class="f1 row2"><div><label class="lbl">Send</label><div class="in sel2">Mon, Dec 1 · 09:00 their time<i class="cv"></i></div></div><div><label class="lbl">Ask people to acknowledge it</label><div class="in sel2">No<i class="cv"></i></div></div></div>
      <div class="ft"><span class="sp"></span><span class="btn">Save draft</span><span class="btn pri" id="bSch">Schedule</span></div>
    </section>'''
TOAST = '      <div class="toast" id="toast"><i><svg width="11" height="11"><use href="#ok"/></svg></i>Scheduled for 82 people in Fleet · Mon, Dec 1, 09:00</div>'
SCRIPT = r"""const { $, at, span, easeOut } = Motion;
const TITLE = "Holonet Drive is now in search";

/* ---------- timeline (scene seconds) ---------- */
const T = {
  nClick: 0.95, open: [1.00, 1.30], type: [1.50, 2.40], aClick: 3.00, menu: [3.05, 3.75], fClick: 3.65, pClick: 4.50, sClick: 6.10,
  close: [6.20, 6.45], toast: [6.50, 7.80], endCard: [7.90, 8.35], end: 8.9
};

function build() {
  const nw = at("bNew");
  $("dlg").style.opacity = 1; const a = at("aud", -120, 0), tp = at("tP"), sc = at("bSch");
  $("aMenu").style.opacity = 1; const f = at("mF", -120, 0); $("aMenu").style.opacity = 0; $("dlg").style.opacity = 0;
  const cur = [
    [0.00, 960, 640], [0.25, 960, 640], [0.70, nw[0], nw[1] + 3], [1.00, nw[0], nw[1] + 3], [1.50, nw[0] - 260, nw[1] + 160],
    [2.75, a[0], a[1] + 3], [3.05, a[0], a[1] + 3], [3.40, f[0], f[1] + 3], [3.70, f[0], f[1] + 3],
    [4.25, tp[0], tp[1] + 3], [4.55, tp[0], tp[1] + 3], [5.85, sc[0], sc[1] + 3], [6.15, sc[0], sc[1] + 3], [7.90, sc[0] - 260, sc[1] - 60]
  ];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 345, 1.06], [7.65, 650, 345, 1.06], [7.90, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  $("crumb").innerHTML = "/ Settings / <b>Announcements</b>";
  $("bNew").classList.toggle("dn", t >= T.nClick - .05 && t < T.open[0] + .15);
  const o = span(t, ...T.open, easeOut) * (1 - span(t, ...T.close, easeOut));
  $("dlg").style.opacity = o; $("scr").style.opacity = o; $("dlg").style.transform = `translateY(${8 * (1 - o)}px)`;
  $("dlg").style.visibility = o > 0 ? "visible" : "hidden";
  const n = Math.round(TITLE.length * span(t, ...T.type, x => x)), tf = t < T.aClick;
  $("tTx").textContent = TITLE.slice(0, n); $("tIn").className = "in" + (tf ? " f" : "");
  $("tC").style.display = tf && Math.floor(t * 2.4) % 2 === 0 ? "" : "none";
  // nobody by default: she picks Fleet, not everyone
  const m = span(t, T.menu[0], T.menu[0] + .12) * (1 - span(t, T.menu[1] - .08, T.menu[1]));
  $("aMenu").style.opacity = m; $("mF").classList.toggle("hov", t >= T.fClick - .25);
  const fl = t >= T.fClick + .05;
  $("aud").className = "in sel2" + (fl ? "" : " ph") + (t >= T.aClick && t < T.menu[1] ? " f" : "");
  $("audT").textContent = fl ? "Fleet · 82 people" : "Choose groups, roles or regions";
  // preview as recipients will see it: one view at a time
  const pv = t >= T.pClick;
  $("pW").style.display = pv ? "none" : ""; $("pP").style.display = pv ? "block" : "none";
  $("tW").classList.toggle("on", !pv); $("tP").classList.toggle("on", pv);
  $("bSch").classList.toggle("dn", t >= T.sClick - .05 && t < T.close[0]);
  $("rN").style.display = t >= T.close[0] ? "table-row" : "none";
  $("n-ann").textContent = t >= T.close[0] ? "3" : "2";
  $("toast").style.opacity = span(t, T.toast[0], T.toast[0] + .2) * (1 - span(t, T.toast[1] - .2, T.toast[1]));
}

function events() { return [["click", T.nClick], ["whoosh", T.open[0]], ["key", T.type[0]], ["click", T.aClick], ["click", T.fClick], ["click", T.pClick], ["click", T.sClick], ["pop", T.toast[0]]]; }

Motion.scene({
  // 5+ steps: natural length, within the 15 s cap
  T, clicks: [T.nClick, T.aClick, T.fClick, T.pClick, T.sClick], build, render, events,
  slow: [[4.7, 5.6, 1.4]]
});"""
COMMENT = """  Source for media/notifications/announcements.mp4. Built by motion/_build/announcements.py on _build/announce_page.py,
  with the top bar's alerts bell from _build/bell.py.
  Follows the Announcements card (data/guidance-platform.js):
  - nobody by default; targeted by group (Fleet), not everyone; org-wide needs a second admin's approval
  - a clear title, plain language
  - a preview as recipients will see it
  - scheduled in their time zone; listed with reach and acknowledgements"""
make("announcements", "Announcements", COMMENT, CSS, MAIN, SCRIPT, extra=EXTRA, toast=TOAST)
