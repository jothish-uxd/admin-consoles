import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from shell import make
CSS = r"""
.view { position: absolute; inset: 0; padding: 28px 36px; }
.view h1 { margin: 0; }
.lede { margin: 6px 0 0; font-size: 14px; color: var(--soft); max-width: 640px; }
.cl { margin-top: 18px; border: 1px solid var(--rule-strong); border-radius: 14px; padding: 16px 18px 6px; width: 880px; }
.cl .h { display: flex; align-items: baseline; gap: 12px; }
.cl .h h2 { margin: 0; font-size: 16px; color: var(--ink); }
.cl .h .pr { font-size: 13px; color: var(--soft); position: relative; width: 200px; height: 18px; }
.cl .h .pr span { position: absolute; left: 0; top: 0; white-space: nowrap; }
.cl .h .pr b { color: var(--ink); font-weight: 600; }
.cl .h .sp { flex: 1; }
.cl .h a { font-size: 12.5px; color: var(--soft); text-decoration: underline; text-underline-offset: 3px; }
.cl .bar { margin-top: 10px; height: 6px; border-radius: 999px; background: var(--hover); overflow: hidden; }
.cl .bar i { display: block; height: 100%; width: 100%; background: var(--ink); transform-origin: left center; }
.cl ol { list-style: none; margin: 10px 0 0; padding: 0; }
.cl li { display: flex; align-items: center; gap: 14px; padding: 11px 6px; border-top: 1px solid var(--rule); border-radius: 8px; }
.cl li.hl { background: var(--subtle); }
.cl .st { width: 22px; height: 22px; border-radius: 50%; border: 1.5px solid var(--rule-strong); display: grid; place-items: center; flex: none; color: #fff; }
.cl .st svg { width: 12px; height: 12px; }
.cl .st.done { background: var(--ink); border-color: var(--ink); }
.cl .st.skip { border-style: dashed; }
.cl .tx { flex: 1; font-size: 12.5px; color: var(--soft); }
.cl .tx b { display: block; font-size: 14px; color: var(--ink); font-weight: 600; margin-bottom: 1px; }
.cl .tx b .opt { font-weight: 400; color: var(--soft); font-size: 12.5px; }
.cl li.skipped .tx b { color: var(--soft); text-decoration: line-through; text-decoration-color: var(--rule-strong); }
.cl .act { display: flex; gap: 6px; align-items: center; position: relative; }
.cl .act .btn { height: 30px; font-size: 12.5px; }
.cl .act .btn.dn { background: #404040; border-color: #404040; color: #fff; }
.cl .act .btn.prs { background: var(--hover); }
.cl .who { display: inline-flex; gap: 6px; align-items: center; font-size: 12.5px; color: var(--ink); border: 1px solid var(--rule-strong); border-radius: 999px; padding: 3px 10px 3px 3px; }
.cl .who .av { width: 22px; height: 22px; font-size: 9px; }
.cl .act .menu { position: absolute; right: 0; top: 36px; width: 210px; z-index: 6; opacity: 0; }
.cl .act .menu .s { display: block; font-size: 11.5px; color: var(--soft); }
.undo { font-size: 12.5px; color: var(--ink); text-decoration: underline; text-underline-offset: 3px; }
"""
ROWS = [
  ("dom", True, "Verify your domain", "Done automatically · echobase.rebellion is verified", ""),
  ("ppl", True, "Add people", "412 people synced from Holonet HR", ""),
  ("sso", False, "Connect single sign-on", "People sign in with Holonet ID instead of passwords", '<span class="who"><span class="av">TF</span>Toryn Farr · in progress</span>'),
  ("grp", False, "Create groups", "Give access and licences to teams at once", '<span class="btn pri" id="bStart">Start</span>'),
  ("shr", False, "Set sharing limits", "Decide what can be shared outside Echo Base", '<span id="shrAct"><span class="btn" id="bAssign">Assign<i class="cv"></i></span></span><span class="btn" id="bShr">Start</span>'
     '<div class="menu" id="menu"><div id="miT">Toryn Farr<span class="s">Security admin</span></div><div>Gen. Rieekan<span class="s">Admin</span></div><div>Cassian Andor<span class="s">Admin</span></div></div>'),
  ("inv", False, 'Invite another admin <span class="opt">· optional</span>', "Two admins means setup doesn’t stop when one is away", '<span class="btn" id="bSkip">Skip</span>'),
]
rows = "\n".join(f'''            <li id="r-{i}"><span class="st{' done' if d else ''}" id="s-{i}">{'<svg><use href="#ok"/></svg>' if d else ''}</span><div class="tx"><b>{t}</b><span id="d-{i}">{x}</span></div><div class="act" id="a-{i}">{a}</div></li>''' for i, d, t, x, a in ROWS)
MAIN = f'''      <div class="view" id="vH">
        <h1>Welcome to Echo Base Console</h1>
        <p class="lede">Finish setting up Echo Base. It can take a few days, and other admins can take tasks on.</p>
        <section class="cl" id="cl" aria-labelledby="clH">
          <div class="h"><h2 id="clH">Set up Echo Base</h2><span class="pr" aria-live="polite"><span id="pr"><b>2 of 6</b> done</span></span><span class="sp"></span><a>Hide checklist</a></div>
          <div class="bar"><i id="barI"></i></div>
          <ol>
{rows}
          </ol>
        </section>
      </div>'''
SCRIPT = r"""const { $, at, span, easeOut } = Motion;

/* ---------- timeline (scene seconds) ---------- */
const T = {
  skipClick: 1.90, assignClick: 3.00, menu: [3.05, 3.95], pick: 3.85, ssoDone: 5.00, startClick: 6.30,
  endCard: [7.20, 7.65], end: 8.3
};

function build() {
  $("menu").style.opacity = 1; const mt = at("miT", -40, 0); $("menu").style.opacity = 0;
  const sk = at("bSkip"), as = at("bAssign"), st = at("bStart"), cl = at("cl");
  const cur = [
    [0.00, 980, 640], [0.30, 980, 640], [1.70, sk[0], sk[1] + 3], [2.00, sk[0], sk[1] + 3],
    [2.80, as[0], as[1] + 3], [3.10, as[0], as[1] + 3], [3.65, mt[0], mt[1] + 3], [3.95, mt[0], mt[1] + 3],
    [4.80, as[0] - 180, as[1] - 60], [6.10, st[0], st[1] + 3], [6.45, st[0], st[1] + 3], [7.20, st[0] - 30, st[1] + 60]
  ];
  const cam = [
    [0.00, 640, 360, 1.00], [0.35, 640, 360, 1.00],
    [1.10, cl[0], cl[1] + 20, 1.14], [6.95, cl[0], cl[1] + 20, 1.14],    // one steady view: the whole checklist
    [7.20, 656, 360, 1.04]
  ];
  return { cam, cur };
}

function render(t) {
  // skip the optional task: it stays in the list, crossed out, with Undo
  const skipped = t >= T.skipClick;
  $("r-inv").classList.toggle("skipped", skipped);
  $("s-inv").className = "st" + (skipped ? " skip" : "");
  $("a-inv").innerHTML = skipped ? '<span class="undo">Undo skip</span>' : '<span class="btn" id="bSkip">Skip</span>';
  $("d-inv").textContent = skipped ? "Skipped · you can come back to it any time" : "Two admins means setup doesn’t stop when one is away";
  // assign a task to a colleague
  const mo = span(t, T.menu[0], T.menu[0] + .15, easeOut) * (1 - span(t, T.menu[1] - .08, T.menu[1]));
  $("menu").style.opacity = mo;
  $("miT").classList.toggle("hov", t > T.pick - .25 && t < T.menu[1]);
  const assigned = t >= T.pick + .05;
  $("shrAct").innerHTML = assigned ? '<span class="who"><span class="av">TF</span>Toryn Farr</span>' : `<span class="btn${t >= T.assignClick - .05 ? " prs" : ""}" id="bAssign">Assign<i class="cv"></i></span>`;
  $("bShr").style.display = assigned ? "none" : "";
  $("d-shr").textContent = assigned ? "Assigned to Toryn Farr · she’s been sent a link" : "Decide what can be shared outside Echo Base";
  // a task finished by someone else is detected and ticked off
  const sso = t >= T.ssoDone;
  $("s-sso").className = "st" + (sso ? " done" : ""); $("s-sso").innerHTML = sso ? '<svg><use href="#ok"/></svg>' : "";
  $("a-sso").innerHTML = sso ? "" : '<span class="who"><span class="av">TF</span>Toryn Farr · in progress</span>';
  $("d-sso").textContent = sso ? "Done by Toryn Farr just now · people sign in with Holonet ID" : "People sign in with Holonet ID instead of passwords";
  $("r-sso").classList.toggle("hl", sso && t < T.ssoDone + 1.2);
  const done = 2 + (sso ? 1 : 0);
  $("pr").innerHTML = `<b>${done} of 6</b> done${skipped ? " · 1 skipped" : ""}`;
  $("barI").style.transform = `scaleX(${(2 + span(t, T.ssoDone, T.ssoDone + .4)) / 6})`;
  $("bStart").classList.toggle("dn", t >= T.startClick - .05 && t < T.startClick + .3);
  $("r-grp").classList.toggle("hl", t >= T.startClick - .5);
}

function events() { return [["click", T.skipClick], ["click", T.assignClick], ["click", T.pick], ["chime", T.ssoDone], ["click", T.startClick]]; }

Motion.scene({
  // 5 steps: natural length, within the 15 s cap
  T, clicks: [T.skipClick, T.assignClick, T.pick, T.startClick], build, render, events,
  slow: [[5.0, 6.0, 1.6]]
});"""
COMMENT = """  Source for media/empty-onboarding/setup-checklist.mp4. Built by motion/_build/setup_checklist.py on motion/_build/shell.py.
  Follows the Setup checklist card (data/guidance-foundations.js):
  - Home's first run: setup tasks in order, with progress in words and a bar; the product isn't blocked
  - tasks already done are detected (domain verified, people synced)
  - an optional task can be skipped, and stays in the list with Undo
  - a task can be assigned to a colleague; when she finishes it, it ticks off and progress is announced
  - each task links to where it's done; Hide checklist lets it go"""
make("setup-checklist", "Setup checklist", COMMENT, CSS, "Home", "home", MAIN, SCRIPT)
