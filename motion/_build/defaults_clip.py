import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from defaults_page import make, head, defaults, scope_row, SAVEBAR

CSS = ""
MENU = ('<div class="menu" id="mSh"><div>Only the owner<span class="s2">Product default</span></div><div id="oPa">Only people added<span class="s2">The owner chooses who</span></div>'
        '<div>Team<span class="s2">Current</span></div><div>Anyone at Echo Base</div></div>')
MAIN = f'      <div class="view">\n{head("Defaults")}{scope_row()}{SAVEBAR}{defaults("org", {"dSh": MENU})}      </div>\n'
TOAST = '      <div class="toast" id="toast"><i><svg width="11" height="11"><use href="#ok"/></svg></i>Saved · new files are shared with only the people added · logged</div>'
SCRIPT = r"""const { $, at, span, easeOut } = Motion;

/* ---------- timeline (scene seconds) ---------- */
const T = {
  oClick: 1.00, menu: [1.05, 2.15], pick: 2.05, svClick: 4.20, saving: [4.25, 4.75], toast: [4.80, 6.00], endCard: [6.10, 6.55], end: 7.05
};

function build() {
  const v = at("dSh-v", -60, 0);
  $("mSh").style.opacity = 1; const p = at("oPa", -60, 0); $("mSh").style.opacity = 0;
  $("svb").style.opacity = 1; const sv = at("bSave"); $("svb").style.opacity = 0;
  const cur = [
    [0.00, 960, 640], [0.25, 960, 640], [0.75, v[0], v[1] + 3], [1.05, v[0], v[1] + 3], [1.80, p[0], p[1] + 3], [2.10, p[0], p[1] + 3],
    [2.80, p[0] + 80, p[1] + 60], [3.95, sv[0], sv[1] + 3], [4.25, sv[0], sv[1] + 3], [6.10, sv[0] - 240, sv[1] + 200]
  ];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 330, 1.06], [5.85, 650, 330, 1.06], [6.10, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  $("crumb").innerHTML = "/ Settings / <b>Defaults</b>";
  $("mSh").style.opacity = span(t, T.menu[0], T.menu[0] + .12) * (1 - span(t, T.menu[1] - .08, T.menu[1]));
  $("oPa").classList.toggle("hov", t >= T.pick - .25);
  $("dSh-v").className = "in" + (t >= T.oClick && t < T.menu[1] ? " f" : "");
  const ch = t >= T.pick + .05, saved = t >= T.saving[1];
  $("dSh-t").textContent = ch ? "Only people added" : "Team";
  // the effect is said before saving: new files only, existing ones keep their sharing, and Hangar 3 still overrides it
  $("dSh-m").innerHTML = ch ? "Product default: Only the owner · <b>applies to files created from now on.</b> The 48,200 existing files keep their sharing · Hangar 3 overrides this"
                            : "Product default: Only the owner · <b>applies to files created from now on</b> · Hangar 3 overrides this";
  $("dSh").classList.toggle("hl", ch && !saved);
  // one save model on this page: the save bar, then Saving…, then Saved once confirmed
  $("svb").style.opacity = ch && t < T.toast[0] ? 1 : 0;
  $("svT").textContent = t >= T.saving[0] ? "Saving…" : "1 unsaved change";
  $("bSave").classList.toggle("dn", t >= T.svClick - .05 && t < T.saving[1]);
  $("toast").style.opacity = span(t, T.toast[0], T.toast[0] + .2) * (1 - span(t, T.toast[1] - .2, T.toast[1]));
}

function events() { return [["click", T.oClick], ["click", T.pick], ["click", T.svClick], ["pop", T.toast[0]]]; }

Motion.scene({
  // under 5 steps: natural length, within the 10 s cap
  T, clicks: [T.oClick, T.pick, T.svClick], build, render, events,
  slow: [[2.3, 3.7, 1.3]]
});"""
COMMENT = """  Source for media/org-settings/defaults.mp4. Built by motion/_build/defaults_clip.py on _build/defaults_page.py,
  with Search settings beside the title and the top bar's alerts bell.
  Follows the Defaults card (data/guidance-platform.js):
  - each default with its value, what it does, the product default and who it applies to
  - where groups override it; a reset to the product default
  - changing it says the effect first: new files only, existing files keep their sharing
  - nothing applies until it's saved; saved and logged"""
make("defaults", "Defaults", COMMENT, CSS, "Settings / Defaults", MAIN, SCRIPT, toast=TOAST)
