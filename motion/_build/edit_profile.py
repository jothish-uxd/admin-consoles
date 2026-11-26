import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from user_page import make, page, LOCK

CSS = r"""
.drw .f1 { margin-top: 14px; }
.drw .in.lk { background: var(--subtle); color: var(--soft); justify-content: space-between; }
.drw .in.lk svg { width: 14px; height: 14px; }
.drw .mng { margin-top: 5px; font-size: 12px; color: var(--soft); }
.drw .mng a { color: var(--ink); text-decoration: underline; text-underline-offset: 3px; }
.drw .sel { justify-content: space-between; }
.drw .ft4 { margin-top: 18px; display: flex; gap: 8px; } .drw .ft4 .sp { flex: 1; } .drw .ft4 .btn { height: 34px; }
.drw .unsaved { display: none; font-size: 12px; color: var(--ink); align-self: center; }
"""
def main():
    p = page()
    p = p.replace('<div class="sub">Pilot · Fleet', '<div class="sub"><span id="hT">Pilot</span> · Fleet', 1)
    return p
EXTRA = f'''    <aside class="drw" id="drw" role="dialog" aria-labelledby="dT">
      <div class="tt"><div><b id="dT">Edit Zev’s profile</b>Changes apply when you save</div><span class="x" aria-label="Close">✕</span></div>
      <div class="f1"><span class="lbl">Name</span><span class="in lk">Zev Senesca{LOCK}</span><div class="mng">Managed by Holonet ID. <a>Change it there ↗</a></div></div>
      <div class="f1"><span class="lbl">Email</span><span class="in lk">zev@echobase.org{LOCK}</span><div class="mng">Managed by Holonet ID. It’s also his sign-in name.</div></div>
      <div class="f1"><label class="lbl" for="fT">Title</label><div class="in" id="fT"><span id="fTv">Pilot</span><span class="c" id="fTc"></span></div></div>
      <div class="f1"><span class="lbl">Manager</span><span class="in sel">Cal Alder<i class="cv"></i></span></div>
      <div class="ft4"><span class="unsaved" id="uns">1 unsaved change</span><span class="sp"></span><span class="btn">Cancel</span><span class="btn pri" id="bSv">Save</span></div>
    </aside>'''
TOAST = '      <div class="toast" id="toast"><i><svg width="11" height="11"><use href="#ok"/></svg></i>Zev’s title is now Flight lead</div>'
SCRIPT = r"""const { $, at, span, easeOut } = Motion;
const NEW = "Flight lead";

/* ---------- timeline (scene seconds) ---------- */
const T = { eClick: 1.10, open: [1.15, 1.45], tClick: 2.80, sel: 2.95, type: [3.20, 3.80], svClick: 4.70, close: [4.75, 5.00], toast: [5.05, 6.45], endCard: [6.80, 7.25], end: 7.75 };

function build() {
  const e = at("bEd");
  $("drw").style.transform = "none"; $("drw").style.visibility = "visible"; const f = at("fT", -40, 0), s = at("bSv"); $("drw").style.transform = ""; $("drw").style.visibility = "";
  const cur = [[0.00, 960, 640], [0.25, 960, 640], [0.75, e[0], e[1] + 3], [1.15, e[0], e[1] + 3], [2.45, f[0], f[1] + 3], [2.85, f[0], f[1] + 3],
    [4.35, s[0], s[1] + 3], [4.75, s[0], s[1] + 3], [6.80, 520, 610]];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 345, 1.04], [6.55, 650, 345, 1.04], [6.80, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  $("bEd").classList.toggle("dn", t >= T.eClick - .05 && t < T.open[0] + .1);
  const o = span(t, ...T.open, easeOut) * (1 - span(t, ...T.close, easeOut));
  $("drw").style.transform = `translateX(${440 * (1 - o)}px)`; $("drw").style.visibility = o > 0 ? "visible" : "hidden";
  // name and email are locked: they belong to Holonet ID; the title is hers to change
  const n = Math.round(NEW.length * span(t, ...T.type, x => x));
  const v = t < T.sel ? "Pilot" : NEW.slice(0, n);
  $("fTv").textContent = v; $("fTv").style.background = t >= T.tClick && t < T.sel ? "#bfdbfe" : "";
  const on = t >= T.tClick && t < T.svClick;
  $("fT").className = "in" + (on ? " f" : ""); $("fTc").style.opacity = on && (t < T.type[1] + .05 || Math.floor(t * 2.4) % 2 === 0) ? 1 : 0;
  $("uns").style.display = t >= T.type[0] && t < T.close[0] ? "block" : "none";
  $("bSv").classList.toggle("dn", t >= T.svClick - .05 && t < T.close[0]);
  // saved: the page shows the new value, who changed it, and what it was
  const d = t >= T.close[0];
  $("pT").textContent = d ? NEW : "Pilot"; $("hT").textContent = d ? NEW : "Pilot";
  $("edl").innerHTML = d ? 'Edited by you just now · was Pilot<a>Undo</a>' : 'Last edited by Cal Alder, Mar 2025';
  $("toast").style.opacity = span(t, T.toast[0], T.toast[0] + .2) * (1 - span(t, T.toast[1] - .2, T.toast[1]));
}

function events() { return [["click", T.eClick], ["whoosh", T.open[0]], ["click", T.tClick], ["key", T.type[0]], ["click", T.svClick], ["pop", T.toast[0]]]; }

Motion.scene({
  // under 5 steps: natural length, within the 10 s cap
  T, clicks: [T.eClick, T.tClick, T.svClick], build, render, events, duration: 9.8
});"""
COMMENT = """  Source for media/user-management/edit-profile.mp4. Built by motion/_build/edit_profile.py on _build/user_page.py
  (People › Users › Zev Senesca), with the top bar's alerts bell.
  Follows the Edit profile card (data/guidance.js):
  - edit in a side panel, keeping his page in view
  - synced fields locked, with the source named and a link to change them there; a side effect said (email is his sign-in name)
  - an explicit Save; afterwards, who edited it and the previous value, with Undo"""
make("edit-profile", "Edit profile", COMMENT, CSS, main(), SCRIPT, extra=EXTRA, toast=TOAST)
