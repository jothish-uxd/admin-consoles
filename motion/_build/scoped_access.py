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
.rad { display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: var(--ink); height: 26px; }
.rb { width: 14px; height: 14px; border-radius: 50%; border: 1.5px solid var(--rule-strong); box-sizing: border-box; display: inline-block; flex: none; }
.rb.on { border: 4.5px solid var(--ink); }
.tree { display: none; margin: 4px 0 0 22px; border: 1px solid var(--rule); border-radius: 10px; padding: 4px 0; }
.tn { height: 26px; display: flex; align-items: center; gap: 8px; padding: 0 10px; font-size: 12.5px; color: var(--ink); }
.tn.l1 { padding-left: 24px; } .tn.l2 { padding-left: 26px; }
.tn .d { color: var(--soft); font-size: 12px; margin-left: 4px; }
.tn.on { background: var(--hover); }
.sc { display: inline-block; font-size: 11.5px; border: 1px solid var(--rule-strong); border-radius: 999px; padding: 0 8px; color: var(--ink); margin-right: 4px; }
#gn { display: none; }
"""
OK = '<svg aria-hidden="true"><use href="#ok"/></svg>'
DETAIL = '''        <div class="bk">← Roles</div>
        <div class="rdh"><h2>Admin</h2><span class="ty bi">Built-in</span></div>
        <div class="rdd">Manage people, content and settings. Can’t change billing. Given for the whole organization, or for only part of it.</div>
        <div class="wh">Who has it <span class="c2" id="wC">12 people</span><span class="sp"></span><span class="btn sm pri" id="bAdd">Add people or groups</span></div>
        <table class="mb"><thead><tr><th style="width:32%">Name</th><th>Role</th><th>How</th><th>Added</th><th style="width:70px"></th></tr></thead><tbody>
          <tr class="gh2"><td colspan="5">Groups · 1</td></tr>
          <tr><td><span class="av">EA</span><b>Echo Base admins</b>10 people</td><td><span class="sc">Admin</span></td><td>Through the group</td><td>Nov 2, 2025</td><td class="r"><a>Remove</a></td></tr>
          <tr class="gh2"><td colspan="5" id="pC">People added directly · 2</td></tr>
          <tr id="rWes" class="nw"><td><span class="av">CA</span><b>Cal Alder</b>Fleet operations lead</td><td><span class="sc">Admin · Fleet</span></td><td>Directly</td><td>Just now</td><td class="r"><a>Remove</a></td></tr>
          <tr><td><span class="av">TF</span><b>Toryn Farr</b>Comms lead · Echo Base</td><td><span class="sc">Admin</span></td><td>Directly</td><td>Jan 12, 2026</td><td class="r"><a>Remove</a></td></tr>
          <tr><td><span class="av">DR</span><b>Dak Ralter</b>Ground forces lead</td><td><span class="sc">Admin · Ground forces</span></td><td>Directly</td><td>Aug 9, 2026</td><td class="r"><a>Remove</a></td></tr>
        </tbody></table>
'''
PH = head().split('        <div class="rbar">')[0]
MAIN = (f'      <div class="view" id="vR">\n{head()}{catalog(checks=True)}      </div>\n'
        f'      <div class="view" id="vD">\n{PH}{DETAIL}      </div>\n')
EXTRA = f'''    <div class="scr" id="scr"></div>
    <section class="dlg" id="dlg" role="dialog" aria-labelledby="aT" style="left:340px; top:46px; width:520px">
      <h3 id="aT">Add to Admin</h3>
      <div class="f1"><label class="lbl">People or groups</label><span class="chip2"><span class="av">CA</span>Cal Alder ✕</span></div>
      <div class="f1"><span class="lbl">Where it applies</span>
        <div class="rad" id="oW"><span class="rb on" id="rbW"></span>Whole organization</div>
        <div class="rad" id="oP"><span class="rb" id="rbP"></span>Only part of it</div>
        <div class="tree" id="tr"><div class="tn">▾ Echo Base<span class="d">in Rebel Alliance</span></div><div class="tn l2" id="tF"><span class="rb" id="rbF"></span>Fleet<span class="d">214 people · 6 groups</span></div>
          <div class="tn l2"><span class="rb"></span>Ground forces<span class="d">388 people</span></div><div class="tn l2"><span class="rb"></span>Intelligence<span class="d">52 people</span></div></div></div>
      <div class="gain" id="gn"><b>Admin · Fleet covers</b><div class="kp" style="margin-top:0;color:var(--ink)">Fleet’s 214 people, its 6 groups and the content they own. Not Echo Base settings, other teams or billing.</div></div>
      <div class="f1"><label class="lbl" for="fR">Reason <span>· required for admin-level roles, kept in the audit log</span></label><div class="in" id="fR"><span id="fRv"></span><span class="c" id="fRc"></span></div></div>
      <div class="ft"><span class="sp"></span><span class="btn">Cancel</span><span class="btn pri dis" id="bAs">Assign</span></div>
    </section>'''
TOAST = '      <div class="toast" id="toast"><i><svg width="11" height="11"><use href="#ok"/></svg></i>Cal Alder is now <b style="font-weight:600;margin:0 4px">Admin · Fleet</b><span style="margin-left:10px;text-decoration:underline;text-underline-offset:3px">Undo</span></div>'
SCRIPT = r"""const { $, at, span, easeOut } = Motion;
const WHY = "Runs Fleet operations";

/* ---------- timeline (scene seconds) ---------- */
const T = {
  rowClick: 0.95, toD: 1.00, addClick: 2.00, open: [2.05, 2.35], pClick: 3.05, fClick: 3.95,
  rsClick: 5.05, type2: [5.15, 5.85], asClick: 6.50, close: [6.55, 6.80], toast: [6.85, 8.20], endCard: [8.30, 8.75], end: 9.25
};

function build() {
  const r = at("rAd", -250, 0);
  $("vR").style.display = "none"; $("vD").style.display = "block"; const a = at("bAdd");
  $("dlg").style.opacity = 1; const p = at("rbP");
  $("tr").style.display = "block"; $("gn").style.display = "block"; const f = at("rbF"), rs = at("fR", -120, 0), as = at("bAs");
  $("tr").style.display = ""; $("gn").style.display = ""; $("dlg").style.opacity = 0;
  const cal = at("rWes", -250, 0);
  $("vR").style.display = ""; $("vD").style.display = "";
  const cur = [
    [0.00, 960, 640], [0.25, 960, 640], [0.70, r[0], r[1] + 3], [1.00, r[0], r[1] + 3], [1.75, a[0], a[1] + 3], [2.05, a[0], a[1] + 3],
    [2.80, p[0], p[1] + 3], [3.10, p[0], p[1] + 3], [3.70, f[0], f[1] + 3], [4.00, f[0], f[1] + 3], [4.80, rs[0], rs[1] + 3], [5.10, rs[0], rs[1] + 3],
    [6.25, as[0], as[1] + 3], [6.55, as[0], as[1] + 3], [7.60, cal[0] + 260, cal[1] + 40], [8.30, cal[0] + 262, cal[1] + 42]
  ];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 345, 1.04], [8.05, 650, 345, 1.04], [8.30, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  const d = t >= T.toD;
  $("crumb").innerHTML = d ? "/ People / Roles / <b>Admin</b>" : "/ People / <b>Roles</b>";
  $("vR").style.display = d ? "none" : "block"; $("vD").style.display = d ? "block" : "none";
  $("rAd").classList.toggle("sel", t >= T.rowClick - .25 && t < T.toD);
  $("bAdd").classList.toggle("dn", t >= T.addClick - .05 && t < T.open[0] + .1);
  const o = span(t, ...T.open, easeOut) * (1 - span(t, ...T.close, easeOut));
  $("dlg").style.opacity = o; $("scr").style.opacity = o; $("dlg").style.transform = `translateY(${8 * (1 - o)}px)`;
  $("dlg").style.visibility = o > 0 ? "visible" : "hidden";
  // where it applies: the whole organization, or one part of the org tree
  const p = t >= T.pClick, f = t >= T.fClick;
  $("rbW").classList.toggle("on", !p); $("rbP").classList.toggle("on", p);
  $("tr").style.display = p ? "block" : "none";
  $("rbF").classList.toggle("on", f); $("tF").classList.toggle("on", f);
  // what the scoped role covers, and what it doesn't, before she assigns it
  $("gn").style.display = f ? "block" : "none";
  const m = Math.round(WHY.length * span(t, ...T.type2, x => x));
  $("fRv").textContent = WHY.slice(0, m);
  const blink = Math.floor(t * 2.4) % 2 === 0;
  $("fR").className = "in" + (t >= T.rsClick && t < T.asClick ? " f" : ""); $("fRc").style.display = t >= T.rsClick && t < T.asClick && blink ? "" : "none";
  $("bAs").className = "btn pri" + (m < 4 || !f ? " dis" : "") + (t >= T.asClick - .05 && t < T.close[0] ? " dn" : "");
  const done = t >= T.close[0];
  $("rWes").style.display = done ? "table-row" : "none";
  $("wC").textContent = done ? "13 people" : "12 people"; $("pC").textContent = `People added directly · ${done ? 3 : 2}`;
  $("toast").style.opacity = span(t, T.toast[0], T.toast[0] + .2) * (1 - span(t, T.toast[1] - .2, T.toast[1]));
}

function events() { return [["click", T.rowClick], ["click", T.addClick], ["whoosh", T.open[0]], ["click", T.pClick], ["click", T.fClick], ["click", T.rsClick], ["key", T.type2[0]], ["click", T.asClick], ["pop", T.toast[0]]]; }

Motion.scene({
  // 5+ steps: natural length, within the 15 s cap
  T, clicks: [T.rowClick, T.addClick, T.pClick, T.fClick, T.rsClick, T.asClick], build, render, events, duration: 14.0
});"""
COMMENT = """  Source for media/roles-permissions/scoped-access.mp4. Built by motion/_build/scoped_access.py on _build/roles_page.py,
  with the top bar's alerts bell.
  Follows the Scoped access card (data/guidance-people.js):
  - a role given to the whole organization or only part of it, picked from the org tree with sizes
  - what the scoped role covers, and what it doesn't, before assigning
  - the scope is in the label everywhere: Admin · Fleet
  - a reason, as for any admin-level role; listed straight away
"""
make("scoped-access", "Scoped access", COMMENT, CSS, "People / Roles", MAIN, SCRIPT, extra=EXTRA, toast=TOAST)
