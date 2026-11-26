import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from storage_page import make, head, WN

CSS = r"""
.g2 { display: grid; grid-template-columns: 1.25fr 1fr; gap: 14px; align-items: start; }
.dq { margin-top: 10px; display: flex; gap: 12px; align-items: flex-end; }
.dq .in { width: 140px; justify-content: space-between; }
.dq .h2 { color: var(--soft); line-height: 1.4; flex: 1; }
.rq2 { margin-top: 10px; border: 1px solid var(--rule); border-radius: 10px; padding: 10px 12px; }
.rq2 b { color: var(--ink); font-weight: 600; }
.rq2 .q { margin-top: 4px; color: var(--ink); font-style: italic; }
.rq2 .now { margin-top: 4px; }
.rq2 .ac { margin-top: 10px; display: flex; gap: 8px; align-items: center; position: relative; }
.rq2 .ac .in { height: 32px; width: 150px; justify-content: space-between; }
.rq2 .ac .sp { flex: 1; } .rq2 .ac .btn { height: 32px; }
.mnu { position: absolute; left: 0; top: 36px; width: 170px; z-index: 6; display: none; }
.mnu .it { color: var(--ink); }
.done2 { display: none; margin-top: 10px; color: var(--ink); align-items: center; gap: 6px; }
.done2 svg { width: 14px; height: 14px; }
.us { display: flex; align-items: center; gap: 8px; }
.ub { width: 70px; height: 6px; border-radius: 999px; background: var(--hover); overflow: hidden; flex: none; }
.ub i { display: block; height: 100%; background: var(--ink); }
.ov { font-size: 11px; color: #b91c1c; border: 1px solid #b91c1c; border-radius: 999px; padding: 0 7px; font-weight: 500; }
.rv { font-size: 11px; color: #92400e; border: 1px solid #b45309; border-radius: 999px; padding: 0 7px; font-weight: 500; margin-left: 6px; }
#rW { display: none; }
"""
OKI = '<svg aria-hidden="true" viewBox="0 0 16 16" style="color:#15803d"><circle cx="8" cy="8" r="6.6" fill="currentColor"/><path d="M5 8.3l2 2 4-4.3" fill="none" stroke="#fff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>'
def ub(p): return f'<span class="ub"><i style="width:{min(p,100)}%"></i></span>'
MAIN = f'''      <div class="view">
{head("Storage", "qu")}        <div class="g2"><div>
          <div class="sec"><h3>Default quota</h3><div class="dq"><div><span class="lbl">Per person</span><span class="in">50 GB<i class="cv"></i></span></div>
            <span class="h2">Over quota, uploads stop with a message saying why. Files stay, and can still be opened and shared.</span></div></div>
          <div class="sec"><h3>Overrides</h3>
            <table class="sx"><thead><tr><th style="width:30%">For</th><th style="width:15%">Quota</th><th style="width:20%">Set by</th><th>Ends</th></tr></thead><tbody>
              <tr id="rW"><td><b>Wes Janson</b>Person</td><td>100 GB</td><td>You, just now</td><td>Feb 24, 2027</td></tr>
              <tr><td><b>Base Engineering</b>Group · 64 people</td><td>200 GB</td><td>Cal Alder</td><td>Mar 1, 2027</td></tr>
              <tr><td><b>Media team</b>Group · 9 people</td><td>500 GB</td><td>Mon Mothma</td><td>No end date<span class="rv">Review</span></td></tr></tbody></table></div>
        </div><div>
          <div class="sec"><h3>Requests · 1</h3>
            <div class="rq2" id="rq"><b>Wes Janson</b> asks for 100 GB<div class="q">“Flight sim recordings for pilot training.”</div><div class="now">Now 47 of 50 GB · asked today</div>
              <div class="ac" id="ac"><span class="in" id="sF"><span id="sFt">Until I remove it</span><i class="cv"></i>
                <div class="menu mnu" id="mF"><div class="it">30 days</div><div class="it" id="o90">90 days</div><div class="it">Until I remove it</div></div></span>
                <span class="sp"></span><span class="btn">Decline</span><span class="btn pri" id="bAp">Approve</span></div>
              <div class="done2" id="dn" role="status">{OKI}Approved until Feb 24, 2027. Wes has been told.</div></div></div>
          <div class="sec"><h3>Near or over · 6</h3>
            <table class="sx"><tbody>
              <tr><td style="width:42%"><b>Biggs Darklighter</b>Deactivated</td><td><span class="us">{ub(100)}52 of 50 GB <span class="ov">Over</span></span></td></tr>
              <tr><td><b>Wedge Antilles</b>Rogue Squadron</td><td><span class="us">{ub(96)}48 of 50 GB</span></td></tr>
              <tr><td><b>Hobbie Klivian</b>Rogue Squadron</td><td><span class="us">{ub(92)}46 of 50 GB</span></td></tr></tbody></table></div>
        </div></div>
      </div>
'''
TOAST = '      <div class="toast" id="toast"><i><svg width="11" height="11"><use href="#ok"/></svg></i>Wes Janson has 100 GB until Feb 24, 2027</div>'
SCRIPT = r"""const { $, at, span, easeOut } = Motion;

/* ---------- timeline (scene seconds) ---------- */
const T = { fClick: 1.30, oClick: 2.20, aClick: 3.40, done: 3.50, toast: [3.55, 5.00], endCard: [5.80, 6.25], end: 6.75 };

function build() {
  const f = at("sF");
  $("mF").style.display = "block"; const o = at("o90", -40, 0); $("mF").style.display = "";
  const a = at("bAp");
  const cur = [[0.00, 960, 640], [0.25, 960, 640], [1.00, f[0], f[1] + 3], [1.35, f[0], f[1] + 3], [1.90, o[0], o[1] + 3], [2.25, o[0], o[1] + 3],
    [3.10, a[0], a[1] + 3], [3.45, a[0], a[1] + 3], [5.80, a[0] - 300, a[1] + 60]];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 345, 1.04], [5.55, 650, 345, 1.04], [5.80, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  $("crumb").innerHTML = "/ Content / Storage / <b>Quotas</b>";
  // an approved request gets an end date, so it doesn't become permanent by accident
  $("mF").style.display = t >= T.fClick && t < T.oClick ? "block" : "none";
  $("o90").classList.toggle("hov", t >= T.oClick - .3);
  $("sF").classList.toggle("f", t >= T.fClick && t < T.oClick);
  $("sFt").textContent = t >= T.oClick ? "90 days" : "Until I remove it";
  const d = t >= T.done;
  $("ac").style.display = d ? "none" : "flex"; $("dn").style.display = d ? "flex" : "none";
  $("rW").style.display = d ? "table-row" : "none";
  $("bAp").classList.toggle("dn", t >= T.aClick - .05 && t < T.done);
  $("toast").style.opacity = span(t, T.toast[0], T.toast[0] + .2) * (1 - span(t, T.toast[1] - .2, T.toast[1]));
}

function events() { return [["click", T.fClick], ["click", T.oClick], ["click", T.aClick], ["pop", T.toast[0]]]; }

Motion.scene({
  // under 5 steps: natural length, within the 10 s cap
  T, clicks: [T.fClick, T.oClick, T.aClick], build, render, events, duration: 9.8,
  slow: [[0.4, 1.0, 1.4], [3.6, 5.0, 1.15]]
});"""
COMMENT = """  Source for media/storage-quotas/per-user-quotas.mp4. Built by motion/_build/per_user_quotas.py on _build/storage_page.py
  (Content › Storage › Quotas), with the top bar's alerts bell.
  Follows the Per-user quotas card (data/guidance-content.js):
  - a default quota, with what happens over it: uploads stop with a message, files stay
  - overrides by group and person, with who set them and when they end; one with no end date is flagged for review
  - who is near or over, in numbers
  - a request with a reason, approved with an end date"""
make("per-user-quotas", "Per-user quotas", COMMENT, CSS, "Content / Storage", MAIN, SCRIPT, toast=TOAST)
