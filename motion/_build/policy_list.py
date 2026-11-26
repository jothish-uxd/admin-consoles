import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from compliance_page import make, policies, list_head, POL, row

CSS = r"""
.rmenu { position: absolute; right: 4px; width: 200px; z-index: 12; opacity: 0; }
.tmenu { position: absolute; left: 0; top: 38px; width: 200px; z-index: 12; opacity: 0; }
.tmenu .n2 { margin-left: auto; color: var(--soft); font-size: 11.5px; }
.tmenu div { display: flex; }
.live2 { position: absolute; right: 0; top: -2px; font-size: 12px; color: var(--ink); background: var(--bg); height: 32px; display: flex; align-items: center; gap: 6px; opacity: 0; }
.live2 svg { width: 12px; height: 12px; }
"""
A = policies()
B = policies(["p1", "p2", "p4", "p3", "p5", "p6"])
def body_rows(s):
    i = s.index('<tbody id="tb">') + len('<tbody id="tb">'); j = s.index("</tbody>"); return s[i:j]
RMENU = '<div class="menu rmenu" id="rMenu"><div>Edit</div><div id="mUp">Move up</div><div>Move down</div><div>Simulate</div><div>Turn off</div></div>'
TMENU = '<div class="menu tmenu" id="tMenu"><div>All<span class="n2">6</span></div><div id="mSh">Sharing<span class="n2">3</span></div><div>Access<span class="n2">1</span></div><div>Content<span class="n2">1</span></div><div>AI<span class="n2">1</span></div></div>'
LIST = A.replace('<span class="nt">', TMENU + '<span class="live2" id="live" role="status" aria-live="polite"></span><span class="nt">', 1)
MAIN = f'      <div class="view" id="v" style="position:absolute">\n{list_head()}{LIST}      </div>\n'
EXTRA = f'    <div id="rmw" style="position:absolute;left:0;top:0">{RMENU}</div>'
SCRIPT = r"""const { $, at, span, easeOut } = Motion;
const A = `""" + body_rows(A).replace("`", "\\`") + r"""`, B = `""" + body_rows(B).replace("`", "\\`") + r"""`;

/* ---------- timeline (scene seconds) ---------- */
const T = {
  mClick: 1.30, menu: [1.35, 2.25], upClick: 2.15, mv: 2.25, tClick: 3.90, tmenu: [3.95, 4.85], shClick: 4.75, endCard: [6.10, 6.55], end: 7.1
};

function build() {
  const m = at("p4-m"), mr = $("p4-m").getBoundingClientRect(), wr = document.querySelector(".win").getBoundingClientRect();
  $("rMenu").style.left = (mr.right - wr.left - 206) + "px"; $("rMenu").style.top = (mr.bottom - wr.top + 2) + "px";
  $("rMenu").style.opacity = 1; const u = at("mUp", -50, 0); $("rMenu").style.opacity = 0;
  const tf = at("fT");
  $("tMenu").style.opacity = 1; const sh = at("mSh", -50, 0); $("tMenu").style.opacity = 0;
  const cur = [
    [0.00, 960, 640], [0.25, 960, 640], [1.05, m[0], m[1] + 3], [1.35, m[0], m[1] + 3], [1.90, u[0], u[1] + 3], [2.20, u[0], u[1] + 3],
    [3.00, u[0] - 160, u[1] - 40], [3.65, tf[0], tf[1] + 3], [3.95, tf[0], tf[1] + 3], [4.50, sh[0], sh[1] + 3], [4.80, sh[0], sh[1] + 3], [6.10, sh[0] + 200, sh[1] + 140]
  ];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 330, 1.06], [5.85, 650, 330, 1.06], [6.10, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  $("crumb").innerHTML = "/ Compliance / <b>Policies</b>";
  // move up, by a menu as well as by dragging; the new priority is announced
  const mv = t >= T.mv, f = t >= T.shClick + .05;
  let rows = mv ? B : A;
  $("tb").innerHTML = rows;
  if (f) ["p4", "p5", "p6"].forEach(id => { const r = $(id); if (r) r.style.display = "none"; });
  if (mv && t < T.mv + 1.2) { const r = $("p4"); if (r) r.className = "mv"; }
  $("rMenu").style.opacity = span(t, T.menu[0], T.menu[0] + .12) * (1 - span(t, T.menu[1] - .08, T.menu[1]));
  $("mUp").classList.toggle("hov", t >= T.upClick - .25);
  if (!mv && t >= T.mClick - .1) $("p4").className = "sel";
  $("live").style.opacity = mv && t < T.tClick ? 1 : 0;
  $("live").innerHTML = '<svg aria-hidden="true"><use href="#ok"/></svg>Contractor access is now priority 3, above External links expire';
  // filter by type: a filter, not a separate place, so drafts and off policies stay findable
  $("tMenu").style.opacity = span(t, T.tmenu[0], T.tmenu[0] + .12) * (1 - span(t, T.tmenu[1] - .08, T.tmenu[1]));
  $("mSh").classList.toggle("hov", t >= T.shClick - .25);
  $("fT").className = "fb" + (f ? " on" : "");
  $("fT").firstChild.textContent = f ? "Type: Sharing" : "Type: All";
}

function events() { return [["click", T.mClick], ["click", T.upClick], ["pop", T.mv], ["click", T.tClick], ["click", T.shClick]]; }

Motion.scene({
  // 5 steps: natural length, within the 15 s cap
  T, clicks: [T.mClick, T.upClick, T.tClick, T.shClick], build, render, events,
  slow: [[2.3, 3.3, 1.4]]
});"""
COMMENT = """  Source for media/policies/policy-list.mp4. Built by motion/_build/policy_list.py on _build/compliance_page.py,
  with the top bar's alerts bell.
  Follows the Policy list card (data/guidance-governance.js):
  - each policy's type, status in words, scope, last change and what it did in the last 7 days
  - in priority order, with Move up and Move down, not only drag and drop; the new priority announced
  - a policy that never matches is flagged; drafts and off policies stay in the same list
  - filter by type, status, scope and owner; export for audit"""
make("policy-list", "Policy list", COMMENT, CSS, "Compliance / Policies", MAIN, SCRIPT, extra=EXTRA)
