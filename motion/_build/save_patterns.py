import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from defaults_page import make, head, defaults, scope_row, SAVEBAR

CSS = r"""
.tabs.page > div.prs { color: var(--ink); }
#mSt { top: auto; bottom: 40px; }
"""
MENU = ('<div class="menu" id="mSt"><div>4 hours</div><div id="o8">8 hours</div><div>12 hours<span class="s2">Current</span></div><div>24 hours<span class="s2">Product default</span></div></div>')
MAIN = f'      <div class="view">\n{head("Defaults")}{scope_row()}{SAVEBAR}{defaults("org", {"dSt": MENU})}      </div>\n'
EXTRA = '''    <div class="scr" id="scr"></div>
    <section class="dlg" id="dlg" role="alertdialog" aria-labelledby="lT" style="left:340px; top:170px; width:500px">
      <h3 id="lT">Leave without saving?</h3>
      <div style="margin-top:6px; line-height:1.45">You have 2 unsaved changes on Defaults: session timeout and sharing for new files. They’ll be lost if you leave.</div>
      <div class="ft"><span class="sp"></span><span class="btn">Discard and leave</span><span class="btn pri" id="bKeep">Keep editing</span></div>
    </section>'''
SCRIPT = r"""const { $, at, span, easeOut } = Motion;

/* ---------- timeline (scene seconds) ---------- */
const T = {
  oClick: 0.95, menu: [1.00, 1.95], pick: 1.85, rClick: 2.80, tabClick: 3.80, dlg: [3.85, 4.10], keep: 4.90, close: [4.95, 5.15],
  svClick: 5.80, saving: [5.85, 6.40], saved: [6.40, 7.30], endCard: [7.40, 7.85], end: 8.35
};

function build() {
  const v = at("dSt-v", -60, 0);
  $("mSt").style.opacity = 1; const p = at("o8", -60, 0); $("mSt").style.opacity = 0;
  const r = at("dSh-r"), tb = at("ss", -520, 46);
  $("dlg").style.opacity = 1; const k = at("bKeep"); $("dlg").style.opacity = 0;
  $("svb").style.opacity = 1; const sv = at("bSave"); $("svb").style.opacity = 0;
  const cur = [
    [0.00, 960, 640], [0.25, 960, 640], [0.70, v[0], v[1] + 3], [1.00, v[0], v[1] + 3], [1.60, p[0], p[1] + 3], [1.90, p[0], p[1] + 3],
    [2.55, r[0], r[1] + 3], [2.85, r[0], r[1] + 3], [3.55, tb[0], tb[1] + 3], [3.85, tb[0], tb[1] + 3],
    [4.65, k[0], k[1] + 3], [4.95, k[0], k[1] + 3], [5.55, sv[0], sv[1] + 3], [5.85, sv[0], sv[1] + 3], [7.40, sv[0] - 240, sv[1] + 200]
  ];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 375, 1.06], [7.15, 650, 375, 1.06], [7.40, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  $("crumb").innerHTML = "/ Settings / <b>Defaults</b>";
  // two changes, nothing applied yet
  $("mSt").style.opacity = span(t, T.menu[0], T.menu[0] + .12) * (1 - span(t, T.menu[1] - .08, T.menu[1]));
  $("o8").classList.toggle("hov", t >= T.pick - .25);
  $("dSt-v").className = "in" + (t >= T.oClick && t < T.menu[1] ? " f" : "");
  const c1 = t >= T.pick + .05, c2 = t >= T.rClick, n = (c1 ? 1 : 0) + (c2 ? 1 : 0);
  $("dSt-t").textContent = c1 ? "8 hours" : "12 hours";
  $("dSh-t").textContent = c2 ? "Only the owner" : "Team";
  $("dSt").classList.toggle("hl", c1 && t < T.saving[1]); $("dSh").classList.toggle("hl", c2 && t < T.saving[1]);
  // the save bar says how many, and stays until saved or discarded
  const saving = t >= T.saving[0], saved = t >= T.saved[0];
  $("svb").style.opacity = n && t < T.saved[1] ? 1 : 0;
  $("svT").innerHTML = saved ? '<span style="display:inline-flex;gap:6px;align-items:center"><svg width="12" height="12"><use href="#ok"/></svg>Saved · 2 changes</span>' : saving ? "Saving…" : `${n} unsaved change${n === 1 ? "" : "s"}`;
  $("bSave").style.visibility = saved ? "hidden" : ""; $("bDis").style.visibility = saved ? "hidden" : "";
  $("bSave").classList.toggle("dn", t >= T.svClick - .05 && t < T.saving[1]);
  // leaving with unsaved changes warns first
  const d = span(t, T.dlg[0], T.dlg[1], easeOut) * (1 - span(t, ...T.close));
  $("dlg").style.opacity = d; $("scr").style.opacity = d; $("dlg").style.visibility = d > 0 ? "visible" : "hidden";
  $("bKeep").classList.toggle("dn", t >= T.keep - .05 && t < T.close[0]);
}

function events() { return [["click", T.oClick], ["click", T.pick], ["click", T.rClick], ["click", T.tabClick], ["pop", T.dlg[0]], ["click", T.keep], ["click", T.svClick], ["chime", T.saved[0]]]; }

Motion.scene({
  // 5+ steps: natural length, within the 15 s cap
  T, clicks: [T.oClick, T.pick, T.rClick, T.tabClick, T.keep, T.svClick], build, render, events,
  slow: [[4.1, 4.6, 1.3]]
});"""
COMMENT = """  Source for media/org-settings/save-patterns.mp4. Built by motion/_build/save_patterns.py on _build/defaults_page.py,
  with Search settings beside the title and the top bar's alerts bell.
  Follows the Save patterns card (data/guidance-platform.js):
  - one save model on the page: changes wait for the save bar, which says how many
  - the save bar sits under the tabs, so it never covers the control in focus
  - leaving with unsaved changes warns first, with Keep editing and Discard
  - Saving…, then Saved once the server confirms, announced"""
make("save-patterns", "Save patterns", COMMENT, CSS, "Settings / Defaults", MAIN, SCRIPT, extra=EXTRA)
