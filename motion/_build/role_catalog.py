import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from roles_page import make, head, catalog

CSS = r"""
.btn.dis { color: var(--faint); border-color: var(--rule); background: var(--subtle); }
.cmp h4 { margin: 14px 0 6px; font-size: 12.5px; color: var(--ink); font-weight: 600; }
.cmp .two { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 10px; }
.cmp .two > div { border: 1px solid var(--rule); border-radius: 10px; padding: 8px 10px; font-size: 12px; }
.cmp .two b { display: block; color: var(--ink); font-size: 13px; }
.cmp .can { padding: 2px 0; }
.drw .ft { margin-top: 16px; display: flex; gap: 8px; } .drw .ft .btn { height: 34px; }
"""
OK = '<svg aria-hidden="true"><use href="#ok"/></svg>'
NO = '<svg aria-hidden="true"><use href="#nope"/></svg>'
MAIN = f'      <div class="view">\n{head()}{catalog(checks=True)}      </div>\n'
EXTRA = f'''    <aside class="drw cmp" id="drw" role="dialog" aria-labelledby="dT">
      <div class="tt"><div><b id="dT">Admin and Security admin</b>Only what’s different, then what they share</div><span class="x" aria-label="Close">✕</span></div>
      <div class="two"><div><b>Admin</b>Built-in · 12 people</div><div><b>Security admin</b>Custom, based on Admin · 4 people</div></div>
      <h4>Only Admin can</h4>
      <div class="can">{OK}Add, change and remove people</div><div class="can">{OK}Manage groups</div><div class="can">{OK}Manage content, sources and sharing</div><div class="can">{OK}Change organization settings</div>
      <h4>Only Security admin can</h4>
      <div class="can no">{NO}Nothing. It’s a narrower Admin.</div>
      <h4>Both can</h4>
      <div class="can">{OK}Manage sign-in and security</div><div class="can">{OK}Manage devices</div><div class="can">{OK}Read the audit log</div>
      <div class="ft"><span class="btn">Duplicate Admin as a custom role</span></div>
    </aside>'''
SCRIPT = r"""const { $, at, span, easeOut } = Motion;

/* ---------- timeline (scene seconds) ---------- */
const T = { aClick: 1.10, sClick: 1.90, cClick: 2.90, open: [2.95, 3.25], endCard: [5.40, 5.85], end: 6.35 };

function build() {
  const a = at("rAd-c"), s = at("rSe-c"), c = at("bCmp");
  const cur = [
    [0.00, 960, 640], [0.25, 960, 640], [0.85, a[0], a[1] + 3], [1.15, a[0], a[1] + 3], [1.65, s[0], s[1] + 3], [1.95, s[0], s[1] + 3],
    [2.65, c[0], c[1] + 3], [2.95, c[0], c[1] + 3], [4.20, c[0] - 220, c[1] + 220], [5.40, c[0] - 218, c[1] + 222]
  ];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 345, 1.04], [5.15, 650, 345, 1.04], [5.40, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  $("crumb").innerHTML = "/ People / <b>Roles</b>";
  const a = t >= T.aClick, s = t >= T.sClick;
  $("rAd-c").classList.toggle("on", a); $("rSe-c").classList.toggle("on", s);
  $("rAd").classList.toggle("sel", a); $("rSe").classList.toggle("sel", s);
  // Compare comes alive at two
  const n = (a ? 1 : 0) + (s ? 1 : 0);
  $("bCmp").className = "btn sm" + (n < 2 ? " dis" : "") + (t >= T.cClick - .05 && t < T.open[0] + .1 ? " dn" : "");
  $("bCmp").textContent = n ? `Compare ${n}` : "Compare";
  const o = span(t, ...T.open, easeOut);
  $("drw").style.transform = `translateX(${440 * (1 - o)}px)`; $("drw").style.visibility = o > 0 ? "visible" : "hidden";
}

function events() { return [["click", T.aClick], ["click", T.sClick], ["click", T.cClick], ["whoosh", T.open[0]]]; }

Motion.scene({
  // under 5 steps: natural length, within the 10 s cap
  T, clicks: [T.aClick, T.sClick, T.cClick], build, render, events,
  slow: [[3.4, 4.9, 1.2]]
});"""
COMMENT = """  Source for media/roles-permissions/role-catalog.mp4. Built by motion/_build/role_catalog.py on _build/roles_page.py,
  with the top bar's alerts bell.
  Follows the Role catalog card (data/guidance-people.js):
  - roles from most to least powerful, each in everyday words, built-in or custom, with how many people hold it
  - custom roles say what they're based on
  - compare two roles side by side: only what differs, then what they share
  - Duplicate a built-in role as the start of a custom one"""
make("role-catalog", "Role catalog", COMMENT, CSS, "People / Roles", MAIN, SCRIPT, extra=EXTRA)
