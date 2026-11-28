import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from defaults_page import make, head, defaults, org, scope_row

CSS = r"""
#vD { opacity: 0; }
.ss { position: relative; }
.res { position: absolute; right: 0; top: 40px; width: 420px; background: var(--bg); border: 1px solid var(--rule-strong); border-radius: 12px; box-shadow: 0 18px 44px rgba(0,0,0,.14); z-index: 20; opacity: 0; color: var(--soft); font-size: 12px; }
.res .rh { padding: 8px 12px 6px; font-size: 11.5px; }
.res .r { display: flex; gap: 10px; align-items: center; padding: 8px 12px; border-top: 1px solid var(--rule); }
.res .r b { display: block; color: var(--ink); font-weight: 500; font-size: 13px; }
.res .r .v { margin-left: auto; color: var(--ink); white-space: nowrap; }
.res .r.hov { background: var(--hover); }
.res .r .ro { margin-left: auto; font-size: 11.5px; border: 1px solid var(--rule-strong); border-radius: 999px; padding: 0 7px; white-space: nowrap; }
.cl { position: absolute; right: 12px; top: 10px; display: none; gap: 5px; align-items: center; font-size: 12px; color: var(--ink); }
.cl svg { width: 12px; height: 12px; }
.set.hl .cl { display: inline-flex; }
"""
RES = ('<div class="res" id="res" role="listbox" aria-label="Settings that match"><div class="rh" id="rh">3 settings match “session”</div>'
       '<div class="r" id="r1"><div><b>Session timeout</b>Defaults › Sign-in &amp; sessions</div><span class="v">12 hours</span></div>'
       '<div class="r"><div><b>Idle session warning</b>Defaults › Sign-in &amp; sessions</div><span class="ro">View only</span></div>'
       '<div class="r"><div><b>Sessions per person</b>People › Sign-in &amp; security</div><span class="v">3</span></div></div>')
MAIN = (f'      <div class="view" id="vO">\n{head("Organization").replace("<span class=\"kb\">⌘K</span></span>", "<span class=\"kb\">⌘K</span>" + RES + "</span>")}{org()}      </div>\n'
        f'      <div class="view" id="vD">\n{head("Defaults").replace("id=\"ss", "id=\"xs")}{scope_row()}{defaults("org")}      </div>\n')
SCRIPT = r"""const { $, at, span, easeOut } = Motion;
const Q = "session";

/* ---------- timeline (scene seconds) ---------- */
const T = {
  sClick: 0.95, type: [1.10, 1.60], res: [1.40, 3.05], pick: 2.90, toD: 3.05, cpClick: 4.50, endCard: [5.70, 6.15], end: 6.7
};

function build() {
  const s = at("ss", -80, 0);
  $("res").style.opacity = 1; const r = at("r1", -120, 0); $("res").style.opacity = 0;
  $("vD").style.opacity = 1; $("dSt").classList.add("hl"); const c = at("dSt", 150, -78); $("dSt").classList.remove("hl"); $("vD").style.opacity = 0;
  const cur = [
    [0.00, 960, 640], [0.25, 960, 640], [0.70, s[0], s[1] + 3], [1.00, s[0], s[1] + 3],
    [2.65, r[0], r[1] + 3], [2.95, r[0], r[1] + 3], [4.25, c[0], c[1] + 3], [4.55, c[0], c[1] + 3], [5.70, c[0] - 120, c[1] + 80]
  ];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 330, 1.06], [5.45, 650, 330, 1.06], [5.70, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  const d = t >= T.toD;
  $("crumb").innerHTML = d ? "/ Settings / <b>Defaults</b>" : "/ Settings / <b>Organization</b>";
  $("vO").style.opacity = d ? 0 : 1; $("vD").style.opacity = d ? 1 : 0;
  // search finds settings, not pages
  const f = t >= T.sClick && !d, n = Math.round(Q.length * span(t, ...T.type, x => x));
  $("ss").classList.toggle("f", f);
  $("ssT").textContent = t >= T.sClick ? (n ? Q.slice(0, n) : "") : "Search settings";
  $("ssC").style.display = f && Math.floor(t * 2.4) % 2 === 0 ? "block" : "none";
  $("res").style.opacity = span(t, T.res[0], T.res[0] + .12) * (t < T.res[1] ? 1 : 0);
  $("r1").classList.toggle("hov", t >= T.pick - .25);
  // it lands on the setting itself, highlighted, with its own link
  $("dSt").classList.toggle("hl", d && t < T.endCard[0] + 1);
  const cp = t >= T.cpClick;
  $("cl").innerHTML = cp ? '<svg aria-hidden="true"><use href="#ok"/></svg>Link copied' : '<svg aria-hidden="true"><use href="#copy"/></svg>Copy link';
}

function events() { return [["click", T.sClick], ["key", T.type[0]], ["click", T.pick], ["whoosh", T.toD], ["click", T.cpClick]]; }

Motion.scene({
  // under 5 steps: natural length, within the 10 s cap
  T, clicks: [T.sClick, T.pick, T.cpClick], build, render, events,
  slow: [[3.2, 4.0, 1.3]]
});"""
COMMENT = """  Source for media/org-settings/settings-navigation.mp4. Built by motion/_build/settings_navigation.py on _build/defaults_page.py,
  with Search settings beside the title and the top bar's alerts bell.
  Follows the Settings navigation card (data/guidance-platform.js):
  - tabs in the same order on every Settings page, and search across all settings
  - search finds individual settings, with where each lives and its value; ones she can't change say View only
  - picking one jumps to the setting itself, highlighted
  - every setting has a stable link to share"""
s = MAIN.replace('<b class="n">Session timeout</b>', '<span class="cl" id="cl" aria-live="polite"></span><b class="n">Session timeout</b>', 1)
make("settings-navigation", "Settings navigation", COMMENT, CSS, "Settings / Organization", s, SCRIPT)
