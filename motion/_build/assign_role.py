import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from roles_page import make, head, catalog

CSS = r"""
#vD { display: none; }
.bk { margin-top: 14px; font-size: 12.5px; color: var(--soft); }
.rdh { margin-top: 6px; display: flex; align-items: center; gap: 10px; }
.rdh h2 { margin: 0; font-size: 17px; font-weight: 600; color: var(--ink); }
.rdd { margin-top: 4px; font-size: 12.5px; color: var(--soft); }
.wh { margin-top: 18px; display: flex; align-items: center; gap: 10px; font-size: 13px; color: var(--ink); font-weight: 600; }
.wh span.c2 { font-weight: 400; color: var(--soft); }
.wh .sp { flex: 1; }
table.mb { width: 100%; table-layout: fixed; border-collapse: collapse; font-size: 12.5px; margin-top: 8px; }
table.mb th { text-align: left; font-size: 12px; color: var(--soft); font-weight: 500; padding: 0 8px 8px; border-bottom: 1px solid var(--rule); }
table.mb td { height: 46px; padding: 0 8px; border-bottom: 1px solid var(--rule); color: var(--soft); }
table.mb tr.gh2 td { height: 28px; background: var(--subtle); color: var(--ink); font-weight: 600; font-size: 12px; }
table.mb td b { display: block; color: var(--ink); font-weight: 500; font-size: 13px; }
table.mb td.r { text-align: right; } table.mb td.r a { color: var(--ink); text-decoration: underline; text-underline-offset: 3px; }
table.mb tr.nw td { background: var(--subtle); }
.av { width: 26px; height: 26px; border-radius: 50%; background: var(--hover); color: var(--ink); font-size: 11px; font-weight: 600; display: inline-grid; place-items: center; margin-right: 10px; vertical-align: middle; float: left; margin-top: 2px; }
.res { margin-top: 6px; border: 1px solid var(--rule); border-radius: 10px; }
.res > div { display: flex; align-items: center; padding: 7px 10px; font-size: 12.5px; color: var(--ink); }
.res > div span { color: var(--soft); font-size: 12px; margin-left: 8px; }
.res > div.hov { background: var(--hover); }
.chip2 { display: inline-flex; align-items: center; gap: 6px; height: 26px; border: 1px solid var(--rule-strong); border-radius: 999px; padding: 0 10px 0 4px; font-size: 12.5px; color: var(--ink); margin-top: 6px; }
.chip2 .av { width: 20px; height: 20px; font-size: 9.5px; margin: 0; float: none; }
.gain { margin-top: 12px; border: 1px solid var(--rule); border-radius: 10px; padding: 9px 12px; font-size: 12.5px; }
.gain b { color: var(--ink); font-weight: 600; display: block; margin-bottom: 3px; }
.gain .can { padding: 2px 0; color: var(--ink); display: flex; gap: 6px; align-items: center; }
.gain .can svg { width: 13px; height: 13px; }
.gain .kp { margin-top: 5px; color: var(--soft); font-size: 12px; }
.f1 { margin-top: 12px; }
.btn.pri.dis { background: var(--subtle); color: var(--faint); border-color: var(--rule); }
#pk { display: none; }
.sc { display: inline-block; font-size: 11.5px; border: 1px solid var(--rule-strong); border-radius: 999px; padding: 0 8px; color: var(--ink); margin-right: 4px; }
"""
OK = '<svg aria-hidden="true"><use href="#ok"/></svg>'
DETAIL = '''        <div class="bk">← Roles</div>
        <div class="rdh"><h2>Security admin</h2><span class="ty">Custom</span></div>
        <div class="rdd">Based on Admin. Sign-in, devices and the audit log. Can’t see content.</div>
        <div class="wh">Who has it <span class="c2" id="wC">4 people</span><span class="sp"></span><span class="btn sm pri" id="bAdd">Add people or groups</span></div>
        <table class="mb"><thead><tr><th style="width:32%">Name</th><th>Role</th><th>How</th><th>Added</th><th style="width:70px"></th></tr></thead><tbody>
          <tr class="gh2"><td colspan="5">Groups · 1</td></tr>
          <tr><td><span class="av">ST</span><b>Security team</b>3 people</td><td><span class="sc">Security admin</span></td><td>Through the group</td><td>Mar 4, 2026</td><td class="r"><a>Remove</a></td></tr>
          <tr class="gh2"><td colspan="5" id="pC">People added directly · 1</td></tr>
          <tr id="rWes" class="nw"><td><span class="av">WJ</span><b>Wes Janson</b>Pilot · Rogue Squadron</td><td><span class="sc">Security admin</span></td><td>Directly · Covering on-call</td><td>Just now</td><td class="r"><a>Remove</a></td></tr>
          <tr><td><span class="av">TF</span><b>Toryn Farr</b>Comms lead · Echo Base</td><td><span class="sc">Security admin</span></td><td>Directly</td><td>Jan 12, 2026</td><td class="r"><a>Remove</a></td></tr>
        </tbody></table>
'''
PH = head().split('        <div class="rbar">')[0]
MAIN = (f'      <div class="view" id="vR">\n{head()}{catalog(checks=True)}      </div>\n'
        f'      <div class="view" id="vD">\n{PH}{DETAIL}      </div>\n')
EXTRA = f'''    <div class="scr" id="scr"></div>
    <section class="dlg" id="dlg" role="dialog" aria-labelledby="aT" style="left:330px; top:70px; width:520px">
      <h3 id="aT">Add to Security admin</h3>
      <div class="f1"><label class="lbl" for="fS">People or groups</label><div class="in f" id="fS"><span id="fSv"></span><span class="c" id="fSc"></span></div>
        <div class="res" id="res"><div id="rW"><span class="av">WJ</span>Wes Janson<span>Pilot · Rogue Squadron · Member</span></div><div><span class="av">WA</span>Wedge Antilles<span>Pilot · Rogue Squadron · Member</span></div></div>
        <div id="pk"><span class="chip2"><span class="av">WJ</span>Wes Janson ✕</span></div></div>
      <div class="gain" id="gn"><b>What Wes gains</b><div class="can">{OK}Manage sign-in and security</div><div class="can">{OK}Manage devices</div><div class="can">{OK}Read the audit log</div>
        <div class="kp">He keeps Member. Nothing he has now is taken away.</div></div>
      <div class="f1"><label class="lbl" for="fR">Reason <span>· required for admin-level roles, kept in the audit log</span></label><div class="in" id="fR"><span id="fRv"></span><span class="c" id="fRc"></span></div></div>
      <div class="ft"><span class="sp"></span><span class="btn">Cancel</span><span class="btn pri dis" id="bAs">Assign</span></div>
    </section>'''
TOAST = '      <div class="toast" id="toast"><i><svg width="11" height="11"><use href="#ok"/></svg></i>Wes Janson is now a Security admin<span style="margin-left:10px;text-decoration:underline;text-underline-offset:3px">Undo</span></div>'
SCRIPT = r"""const { $, at, span, easeOut } = Motion;
const Q = "Wes", WHY = "Covering on-call this month";

/* ---------- timeline (scene seconds) ---------- */
const T = {
  rowClick: 0.95, toD: 1.00, addClick: 2.10, open: [2.15, 2.45], type: [2.65, 3.00], pick: 3.65,
  rsClick: 4.75, type2: [4.85, 5.85], asClick: 6.55, close: [6.60, 6.85], toast: [6.90, 8.30], endCard: [8.40, 8.85], end: 9.35
};

function build() {
  const r = at("rSe", -250, 0);
  $("vR").style.display = "none"; $("vD").style.display = "block"; const a = at("bAdd");
  $("dlg").style.opacity = 1; const w = at("rW", -120, 0);
  $("res").style.display = "none"; $("pk").style.display = "block"; const rs = at("fR", -120, 0), as = at("bAs");
  $("res").style.display = ""; $("pk").style.display = ""; $("dlg").style.opacity = 0;
  const wes = at("rWes", -250, 0);
  $("vR").style.display = ""; $("vD").style.display = "";
  const cur = [
    [0.00, 960, 640], [0.25, 960, 640], [0.70, r[0], r[1] + 3], [1.00, r[0], r[1] + 3], [1.85, a[0], a[1] + 3], [2.15, a[0], a[1] + 3],
    [3.40, w[0], w[1] + 3], [3.70, w[0], w[1] + 3], [4.50, rs[0], rs[1] + 3], [4.80, rs[0], rs[1] + 3], [6.30, as[0], as[1] + 3], [6.60, as[0], as[1] + 3],
    [7.70, wes[0] + 260, wes[1] + 40], [8.40, wes[0] + 262, wes[1] + 42]
  ];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 345, 1.04], [8.15, 650, 345, 1.04], [8.40, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  const d = t >= T.toD;
  $("crumb").innerHTML = d ? "/ People / Roles / <b>Security admin</b>" : "/ People / <b>Roles</b>";
  $("vR").style.display = d ? "none" : "block"; $("vD").style.display = d ? "block" : "none";
  $("rSe").classList.toggle("sel", t >= T.rowClick - .25 && t < T.toD);
  $("bAdd").classList.toggle("dn", t >= T.addClick - .05 && t < T.open[0] + .1);
  const o = span(t, ...T.open, easeOut) * (1 - span(t, ...T.close, easeOut));
  $("dlg").style.opacity = o; $("scr").style.opacity = o; $("dlg").style.transform = `translateY(${8 * (1 - o)}px)`;
  $("dlg").style.visibility = o > 0 ? "visible" : "hidden";
  // search: people and groups; picked, she sees what he gains and what he keeps
  const n = Math.round(Q.length * span(t, ...T.type, x => x)), m = Math.round(WHY.length * span(t, ...T.type2, x => x));
  $("fSv").textContent = t >= T.pick ? "" : Q.slice(0, n); $("fRv").textContent = WHY.slice(0, m);
  const blink = Math.floor(t * 2.4) % 2 === 0;
  $("fS").className = "in" + (t < T.pick ? " f" : ""); $("fSc").style.display = t < T.pick && blink ? "" : "none";
  $("fR").className = "in" + (t >= T.rsClick && t < T.asClick ? " f" : ""); $("fRc").style.display = t >= T.rsClick && t < T.asClick && blink ? "" : "none";
  const p = t >= T.pick;
  $("res").style.display = n > 0 && !p ? "" : "none"; $("pk").style.display = p ? "block" : "none";
  $("rW").classList.toggle("hov", t >= T.pick - .3);
  $("gn").style.display = p ? "" : "none";
  // a reason is required for an admin-level role: Assign waits for it
  $("bAs").className = "btn pri" + (m < 4 ? " dis" : "") + (t >= T.asClick - .05 && t < T.close[0] ? " dn" : "");
  const done = t >= T.close[0];
  $("rWes").style.display = done ? "table-row" : "none";
  $("wC").textContent = done ? "5 people" : "4 people"; $("pC").textContent = `People added directly · ${done ? 2 : 1}`;
  $("toast").style.opacity = span(t, T.toast[0], T.toast[0] + .2) * (1 - span(t, T.toast[1] - .2, T.toast[1]));
}

function events() { return [["click", T.rowClick], ["click", T.addClick], ["whoosh", T.open[0]], ["key", T.type[0]], ["click", T.pick], ["click", T.rsClick], ["key", T.type2[0]], ["click", T.asClick], ["pop", T.toast[0]]]; }

Motion.scene({
  // 5+ steps: natural length, within the 15 s cap
  T, clicks: [T.rowClick, T.addClick, T.pick, T.rsClick, T.asClick], build, render, events, duration: 14.0
});"""
COMMENT = """  Source for media/roles-permissions/assign-role.mp4. Built by motion/_build/assign_role.py on _build/roles_page.py,
  with the top bar's alerts bell.
  Follows the Assign role card (data/guidance-people.js):
  - from the role: who has it, groups first, then people added directly, each with how and when
  - search people and groups; before assigning, what they gain and that nothing is taken away
  - a reason is required for admin-level roles, and kept in the audit log
  - assigned with Undo; listed straight away with the reason"""
make("assign-role", "Assign role", COMMENT, CSS, "People / Roles", MAIN, SCRIPT, extra=EXTRA, toast=TOAST)
