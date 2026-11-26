import sys, re; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from cut_page import make
CSS = r"""
/* empty table */
.view { position: absolute; inset: 0; }
.empty { margin-top: 26px; border: 1px dashed var(--rule-strong); border-radius: 14px; padding: 34px 32px; display: grid; justify-items: center; text-align: center; color: var(--soft); font-size: 13.5px; line-height: 1.5; }
.empty .ic { width: 44px; height: 44px; border-radius: 12px; background: var(--subtle); display: grid; place-items: center; color: var(--ink); margin-bottom: 12px; }
.empty .ic svg { width: 22px; height: 22px; }
.empty h2 { margin: 0; font-size: 17px; color: var(--ink); }
.empty p { margin: 6px 0 0; max-width: 470px; }
.empty .r { margin-top: 16px; display: flex; gap: 8px; }
.empty .r .btn { height: 36px; }
.empty .r .btn.prs { background: var(--hover); }
.empty .alt { margin-top: 12px; font-size: 12.5px; }
.empty .alt a { color: var(--ink); text-decoration: underline; text-underline-offset: 3px; }
.sync { margin-top: 26px; border: 1px solid var(--rule-strong); border-radius: 12px; padding: 14px 16px; font-size: 13px; color: var(--soft); opacity: 0; display: none; }
.sync b { color: var(--ink); font-weight: 600; }
.sync .pb { margin-top: 8px; height: 6px; border-radius: 999px; background: var(--hover); overflow: hidden; }
.sync .pb i { display: block; height: 100%; width: 100%; background: var(--ink); transform-origin: left center; }
.syn { margin-top: 14px; font-size: 12.5px; color: var(--soft); opacity: 0; }
.syn b { color: var(--ink); font-weight: 600; }
table.g { opacity: 0; }
table.g td .s2 { display: block; font-size: 11.5px; color: var(--faint); }
"""
GROUPS_ICON = '<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="6" cy="5.5" r="2.2" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M2 13c.4-2.4 2-3.6 4-3.6s3.6 1.2 4 3.6M10.5 3.6a2 2 0 0 1 0 3.8M12 9.6c1 .5 1.7 1.6 2 3.4" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>'
EMPTY = f'''        <section class="empty" id="empty" aria-labelledby="eH"><span class="ic">{GROUPS_ICON}</span>
          <h2 id="eH">No groups yet</h2>
          <p>Groups give access, licences and settings to many people at once, such as a whole team or everyone on a project.</p>
          <div class="r"><span class="btn pri" id="bCreate">Create group</span><span class="btn" id="bSync">Sync from Holonet HR</span></div>
          <div class="alt">Or <a>import a CSV</a> · <a>How groups work</a></div>
        </section>
        <div class="sync" id="sync" role="status"><b id="syT">Syncing groups from Holonet HR…</b><div class="pb"><i id="syI"></i></div></div>
        <div class="syn" id="syn"><b>6 groups</b> synced from Holonet HR · they stay in step every hour</div>
'''
EDITS = [
  ('<div class="toast" id="toast"><i><svg width="11" height="11"><use href="#ok"/></svg></i>Rogue One pilot created · add the 38 members next</div>',
   '<div class="toast" id="toast"><i><svg width="11" height="11"><use href="#ok"/></svg></i>6 groups synced from Holonet HR</div>'),
  ('<div class="tabs page"><div>Users</div><div class="on">Groups</div><div>Roles</div></div>\n',
   '<div class="tabs page"><div>Users</div><div class="on">Groups</div><div>Roles</div></div>\n' + EMPTY),
  ('<table class="g">', '<table class="g" id="tG">'),
]
SCRIPT = r"""const { $, at, span, easeOut } = Motion;

/* ---------- timeline (scene seconds) ---------- */
const T = {
  syncClick: 2.70, sync: [2.80, 4.10], rows: [4.15, 4.45], toast: 4.25, toastOut: [6.0, 6.3],
  endCard: [6.60, 7.05], end: 7.7
};

function build() {
  const e = at("empty"), c = at("bCreate"), s = at("bSync");
  const cur = [
    [0.00, 960, 640], [0.30, 960, 640], [1.30, c[0], c[1] + 3], [1.90, c[0] + 20, c[1] + 6],
    [2.50, s[0], s[1] + 3], [2.85, s[0], s[1] + 3], [3.90, s[0] + 120, s[1] + 90], [6.60, s[0] + 124, s[1] + 94]
  ];
  const cam = [
    [0.00, 640, 360, 1.00], [0.35, 640, 360, 1.00],
    [1.10, e[0], e[1] - 10, 1.22], [6.35, e[0], e[1] - 10, 1.22],     // one steady view: the empty state, then the synced list
    [6.60, 656, 360, 1.04]
  ];
  return { cam, cur };
}

function render(t) {
  $("bSync").classList.toggle("prs", t >= T.syncClick - .05 && t < T.sync[0] + .2);
  // one state at a time, in the same place: empty state, then progress, then the list
  const st = t < T.sync[0] + .12 ? 0 : t < T.rows[0] + .12 ? 1 : 2;
  $("empty").style.display = st === 0 ? "" : "none";
  $("empty").style.opacity = 1 - span(t, T.sync[0], T.sync[0] + .12);
  $("sync").style.display = st === 1 ? "block" : "none";
  $("sync").style.opacity = span(t, T.sync[0] + .14, T.sync[0] + .28) * (1 - span(t, T.rows[0], T.rows[0] + .12));
  $("tG").style.display = st === 2 ? "" : "none"; $("syn").style.display = st === 2 ? "" : "none";
  const p = span(t, T.sync[0] + .2, T.sync[1], x => x);
  $("syI").style.transform = `scaleX(${.08 + .92 * p})`;
  $("syT").textContent = `Syncing groups from Holonet HR… ${Math.round(6 * p)} of 6`;
  const ro = span(t, T.rows[0] + .14, T.rows[1]);
  $("tG").style.opacity = ro; $("syn").style.opacity = ro;
  const to = span(t, T.toast, T.toast + .25, easeOut) * (1 - span(t, ...T.toastOut));
  $("toast").style.opacity = to;
  $("toast").style.transform = `translateX(-50%) translateY(${(1 - to) * -8}px)`;
}

function events() { return [["click", T.syncClick], ["chime", T.rows[0]], ["pop", T.toast]]; }

Motion.scene({
  // 3 steps: natural length, within the 10 s cap
  T, clicks: [T.syncClick], build, render, events,
  slow: [[1.1, 2.4, 1.5], [4.5, 6.0, 1.3]]
});"""
COMMENT = """  Source for media/empty-onboarding/empty-table.mp4. Built by motion/_build/empty_table.py
  from create-modal/scene.html, so People › Groups is the same page.
  Follows the Empty table card (data/guidance-foundations.js):
  - before any group exists: a heading, what groups are for, and no empty grid
  - one primary action (Create group) and the alternative a large org wants: sync from HR, or import a CSV
  - a link to help
  - syncing shows progress, then the list appears with where the groups came from"""
s = make("create-modal", "empty-table", "Empty table", COMMENT, CSS, '    <div class="scrim2" id="scrim"></div>', "", "", SCRIPT, EDITS)
# synced groups carry their source; the list is the Groups page's own rows
import pathlib
p = pathlib.Path(__file__).resolve().parent.parent / "empty-table/scene.html"
s = s.replace('<tr id="rN" style="display:none">', '<tr style="display:none">')
p.write_text(s)
