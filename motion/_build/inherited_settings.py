import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from defaults_page import make, head, defaults, scope_row, SAVEBAR

CSS = r"""
#vG { opacity: 0; }
.scope .menu { position: absolute; left: 126px; top: 38px; width: 250px; z-index: 9; opacity: 0; }
.scope .menu .s2 { display: block; font-size: 11.5px; color: var(--soft); }
#mSt { top: auto; bottom: 40px; }
"""
SMENU = ('<div class="menu" id="mSc"><div>Echo Base · whole org<span class="s2">1,204 people</span></div><div id="oH3">Hangar 3<span class="s2">14 people · a group</span></div>'
         '<div>Fleet<span class="s2">82 people · a group</span></div></div>')
MENU = ('<div class="menu" id="mSt"><div>4 hours</div><div id="o8">8 hours</div><div>12 hours<span class="s2">Echo Base</span></div><div>24 hours<span class="s2">Product default</span></div></div>')
MAIN = (f'      <div class="view" id="vO">\n{head("Defaults")}{scope_row("Echo Base · whole org", SMENU)}{SAVEBAR.replace("id=\"svb\"", "id=\"svbO\"").replace("id=\"svT\"", "id=\"svTO\"").replace("id=\"bDis\"", "id=\"bDisO\"").replace("id=\"bSave\"", "id=\"bSaveO\"")}{defaults("org").replace("id=\"d", "id=\"o-d")}      </div>\n'
        f'      <div class="view" id="vG">\n{head("Defaults").replace("id=\"ss", "id=\"gs")}{scope_row("Hangar 3 · 14 people").replace("id=\"scp", "id=\"gscp")}{SAVEBAR}{defaults("group", {"dSt": MENU})}      </div>\n')
TOAST = '      <div class="toast" id="toast"><i><svg width="11" height="11"><use href="#ok"/></svg></i>Saved · Hangar 3 signs out after 8 hours · logged</div>'
SCRIPT = r"""const { $, at, span, easeOut } = Motion;

/* ---------- timeline (scene seconds) ---------- */
const T = {
  sClick: 0.95, smenu: [1.00, 1.85], hPick: 1.75, toG: 1.85, ovClick: 3.40, menu: [3.45, 4.35], pick: 4.25, svClick: 5.30, saving: [5.35, 5.85],
  toast: [5.90, 7.10], endCard: [7.20, 7.65], end: 8.15
};

function build() {
  const sc = at("scp", -60, 0);
  $("mSc").style.opacity = 1; const h = at("oH3", -60, 0); $("mSc").style.opacity = 0;
  $("vG").style.opacity = 1; const ov = at("dSt-o");
  $("mSt").style.opacity = 1; const p = at("o8", -60, 0); $("mSt").style.opacity = 0;
  $("svb").style.opacity = 1; const sv = at("bSave"); $("svb").style.opacity = 0; $("vG").style.opacity = 0;
  const cur = [
    [0.00, 960, 640], [0.25, 960, 640], [0.70, sc[0], sc[1] + 3], [1.00, sc[0], sc[1] + 3], [1.50, h[0], h[1] + 3], [1.80, h[0], h[1] + 3],
    [3.15, ov[0], ov[1] + 3], [3.45, ov[0], ov[1] + 3], [4.00, p[0], p[1] + 3], [4.30, p[0], p[1] + 3],
    [5.05, sv[0], sv[1] + 3], [5.35, sv[0], sv[1] + 3], [7.20, sv[0] - 240, sv[1] + 200]
  ];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 375, 1.06], [6.95, 650, 375, 1.06], [7.20, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  $("crumb").innerHTML = "/ Settings / <b>Defaults</b>";
  // choose the scope: one view at a time
  $("mSc").style.opacity = span(t, T.smenu[0], T.smenu[0] + .12) * (1 - span(t, T.smenu[1] - .08, T.smenu[1]));
  $("oH3").classList.toggle("hov", t >= T.hPick - .25);
  $("scp").className = "in sel2" + (t >= T.sClick && t < T.smenu[1] ? " f" : "");
  const g = t >= T.toG;
  $("vO").style.opacity = g ? 0 : 1; $("vG").style.opacity = g ? 1 : 0;
  // override where it's allowed: the inherited value stays in view, and reset brings it back
  const ov = t >= T.ovClick, ch = t >= T.pick + .05;
  $("mSt").style.opacity = span(t, T.menu[0], T.menu[0] + .12) * (1 - span(t, T.menu[1] - .08, T.menu[1]));
  $("o8").classList.toggle("hov", t >= T.pick - .25);
  $("dSt-v").className = "in" + (t >= T.ovClick && t < T.menu[1] ? " f" : "");
  $("dSt-t").textContent = ch ? "8 hours" : "12 hours";
  $("dSt-s").className = "src" + (ch ? " set2" : ""); $("dSt-s").textContent = ch ? "Set here" : "Inherited from Echo Base";
  $("dSt-o").textContent = ov ? "Reset to inherited" : "Override";
  $("dSt-m").innerHTML = ch ? "Echo Base: 12 hours · <b>Hangar 3 stops following Echo Base</b> for this until it’s reset" : "Same as Echo Base";
  $("dSt").classList.toggle("hl", ch && t < T.saving[1]);
  const saving = t >= T.saving[0];
  $("svb").style.opacity = ch && t < T.toast[0] ? 1 : 0;
  $("svT").textContent = saving ? "Saving…" : "1 unsaved change for Hangar 3";
  $("bSave").classList.toggle("dn", t >= T.svClick - .05 && t < T.saving[1]);
  $("toast").style.opacity = span(t, T.toast[0], T.toast[0] + .2) * (1 - span(t, T.toast[1] - .2, T.toast[1]));
}

function events() { return [["click", T.sClick], ["click", T.hPick], ["click", T.ovClick], ["click", T.pick], ["click", T.svClick], ["pop", T.toast[0]]]; }

Motion.scene({
  // 5+ steps: natural length, within the 15 s cap
  T, clicks: [T.sClick, T.hPick, T.ovClick, T.pick, T.svClick], build, render, events,
  slow: [[1.95, 3.0, 1.5]]
});"""
COMMENT = """  Source for media/org-settings/inherited-settings.mp4. Built by motion/_build/inherited_settings.py on _build/defaults_page.py,
  with Search settings beside the title and the top bar's alerts bell.
  Follows the Inherited settings card (data/guidance-platform.js):
  - each value says where it comes from, in words: Inherited from Echo Base, Set here, Locked by Rebel Alliance
  - a locked value is disabled, and names who can change it
  - override where allowed, with the inherited value shown next to it, and Reset to inherited
  - an override says it stops following the parent until it's reset"""
make("inherited-settings", "Inherited settings", COMMENT, CSS, "Settings / Defaults", MAIN, SCRIPT, toast=TOAST)
