import sys, pathlib; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from users_page import make
CSS = r"""
.scrim2 { position: absolute; inset: 52px 0 0 0; background: rgba(0,0,0,.18); opacity: 0; z-index: 30; }
.dlg { position: absolute; left: 200px; top: 110px; width: 800px; background: var(--bg); border: 1px solid var(--rule-strong); border-radius: 14px; box-shadow: 0 20px 60px rgba(0,0,0,.2); padding: 20px 22px; z-index: 31; opacity: 0; font-size: 13px; color: var(--soft); line-height: 1.45; }
.dlg h3 { margin: 0; font-size: 17px; color: var(--ink); }
.dlg .sub { margin-top: 2px; font-size: 12.5px; }
.dlg .cols { margin-top: 14px; display: grid; grid-template-columns: 330px 1fr; gap: 24px; }
.dlg label.l { display: block; font-size: 12.5px; color: var(--ink); font-weight: 500; margin: 0 0 5px; }
.sel2 { position: relative; height: 36px; border: 1px solid var(--rule-strong); border-radius: 8px; display: flex; align-items: center; justify-content: space-between; padding: 0 12px; color: var(--ink); }
.sel2.focus { border-color: var(--ink); box-shadow: 0 0 0 3px rgba(23,23,23,.08); }
.sel2 .menu { position: absolute; left: -1px; right: -1px; top: 40px; z-index: 5; opacity: 0; }
.sel2 .menu .off { color: #737373; display: flex; justify-content: space-between; }
.ops { margin-top: 14px; display: grid; gap: 6px; }
.op { display: flex; gap: 10px; align-items: flex-start; border: 1px solid var(--rule); border-radius: 8px; padding: 7px 10px; }
.op b { display: block; color: var(--ink); font-weight: 500; }
.op .rd { width: 16px; height: 16px; border-radius: 50%; border: 1.5px solid var(--rule-strong); flex: none; margin-top: 2px; position: relative; }
.op.on { border-color: var(--ink); }
.op.on .rd { border-color: var(--ink); }
.op.on .rd::after { content: ""; position: absolute; inset: 3px; border-radius: 50%; background: var(--ink); }
.val { height: 36px; border: 1px solid var(--rule-strong); border-radius: 8px; display: flex; align-items: center; gap: 6px; padding: 0 10px; color: var(--ink); white-space: pre; }
.val.focus { border-color: var(--ink); box-shadow: 0 0 0 3px rgba(23,23,23,.08); }
.val .c { width: 1.5px; height: 18px; background: var(--ink); }
.val .chip { display: inline-flex; gap: 6px; align-items: center; font-size: 12.5px; border: 1px solid var(--ink); border-radius: 999px; padding: 2px 9px; }
.now { margin-top: 8px; font-size: 12px; }
.now b { color: var(--ink); font-weight: 600; }
.pv { margin-top: 14px; }
.pv table { font-size: 12.5px; }
.pv th { padding: 0 8px 6px; font-size: 11.5px; }
.pv td { height: 34px; padding: 0 8px; }
.pv td.nw { color: var(--ink); }
.pv .add { font-weight: 600; text-decoration: underline; text-underline-offset: 3px; text-decoration-thickness: 1.5px; }
.dlg .r { margin-top: 16px; display: flex; gap: 8px; justify-content: flex-end; align-items: center; }
.dlg .r .note { flex: 1; font-size: 12px; }
.dlg .btn { height: 36px; }
.btn.dn { background: #404040; border-color: #404040; }
.btn.off2 { background: #f5f5f5; color: #737373; border-color: var(--rule); }
.toast { position: absolute; left: 600px; top: 4px; transform: translateX(-50%); background: var(--ink); color: #fff; border-radius: 10px; height: 44px; display: flex; align-items: center; gap: 10px; padding: 0 16px 0 12px; font-size: 13px; opacity: 0; box-shadow: 0 10px 30px rgba(0,0,0,.18); white-space: nowrap; z-index: 40; }
.toast i { width: 18px; height: 18px; border-radius: 50%; background: #fff; color: var(--ink); display: grid; place-items: center; }
"""
TOAST = """      <div class="toast" id="toast"><i><svg width="11" height="11"><use href="#ok"/></svg></i>Adding Hoth Evacuation to 82 people · progress is above the list</div>"""
EXTRA = r"""    <div class="scrim2" id="scrim"></div>
    <div class="dlg" id="dlg" role="dialog" aria-labelledby="dT">
      <h3 id="dT">Edit 82 people</h3><div class="sub">Everyone matching Team: Fleet, including the 57 not on this page.</div>
      <div class="cols">
        <div>
          <label class="l">Field</label>
          <div class="sel2" id="fld"><span id="fV">Choose a field</span><i class="cv"></i>
            <div class="menu" id="fM"><div id="miG">Groups</div><div>License</div><div>Manager</div><div class="off">Team <span>synced from Holonet HR</span></div></div></div>
          <div class="ops" id="ops">
            <div class="op" id="o1"><span class="rd"></span><div><b>Add to existing</b>Keeps each person’s groups and adds this one.</div></div>
            <div class="op" id="o2"><span class="rd"></span><div><b>Remove</b>Takes this group away and leaves the rest.</div></div>
            <div class="op" id="o3"><span class="rd"></span><div><b>Replace all</b>Their groups become only this one.</div></div>
            <div class="op" id="o4"><span class="rd"></span><div><b>Clear</b>Removes every group.</div></div>
          </div>
        </div>
        <div>
          <label class="l">Group</label>
          <div class="val" id="val"><span id="vT"></span><span class="chip" id="vC" style="display:none">Hoth Evacuation · 64 members</span><span class="c" id="cr"></span></div>
          <div class="now" id="now">Now: <b>Various</b> · these 82 people are in 14 different groups</div>
          <div class="pv"><label class="l">Preview · 3 of 82</label>
            <table><thead><tr><th>Person</th><th>Groups now</th><th>After</th></tr></thead><tbody>
              <tr><td>Hobbie Klivian</td><td>Fleet, Rogue Squadron</td><td class="nw" id="a1">—</td></tr>
              <tr><td>Cal Alder</td><td>Fleet</td><td class="nw" id="a2">—</td></tr>
              <tr><td>Ved Foslo</td><td>Fleet, Hangar 3</td><td class="nw" id="a3">—</td></tr>
            </tbody></table></div>
        </div>
      </div>
      <div class="r"><span class="note">Runs as a job · logged as one change with all 82 names</span><span class="btn">Cancel</span><span class="btn off2" id="go">Choose a field</span></div>
    </div>"""
SCRIPT = r"""const { $, at, span, easeOut } = Motion;
const TYPED = "Hoth";

/* ---------- timeline (scene seconds) ---------- */
const T = {
  editClick: 1.10, dlg: [1.20, 1.45], fldClick: 2.10, menu: [2.15, 2.90], gClick: 2.80, opClick: 3.60,
  valClick: 4.30, type: [4.45, 4.90], pick: 5.05, goClick: 6.30, dlgOut: [6.35, 6.55], toast: 6.60, toastOut: [7.7, 8.0],
  endCard: [7.30, 7.75], end: 8.4
};

function build() {
  const e = at("bEdit"), f = at("fld"); $("fM").style.opacity = 1; const g = at("miG", -30, 0); $("fM").style.opacity = 0;
  const o = at("o1", -100, 0), v = at("val", -120, 0), go = at("go"), dl = at("dlg");
  const cur = [
    [0.00, 860, 650], [0.25, 860, 650], [0.95, e[0], e[1] + 3], [1.20, e[0], e[1] + 3],
    [1.95, f[0], f[1] + 3], [2.20, f[0], f[1] + 3], [2.65, g[0], g[1] + 3], [2.90, g[0], g[1] + 3],
    [3.45, o[0], o[1] + 3], [3.70, o[0], o[1] + 3], [4.15, v[0], v[1] + 3], [4.40, v[0], v[1] + 3], [5.20, v[0] + 80, v[1] + 60],
    [6.15, go[0], go[1] + 3], [6.40, go[0], go[1] + 3], [7.00, go[0] - 60, go[1] + 90], [7.30, go[0] - 58, go[1] + 92]
  ];
  const cam = [
    [0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00],
    [0.80, 724, 300, 1.15], [1.25, 724, 300, 1.15],      // the bar: all 82 matching
    [1.75, dl[0], dl[1] + 4, 1.14], [6.45, dl[0], dl[1] + 4, 1.14],  // the edit dialog, whole
    [6.80, 724, 300, 1.15], [7.10, 724, 300, 1.15],
    [7.30, 656, 360, 1.04]
  ];
  return { cam, cur };
}

function render(t) {
  // the 82 are selected when the clip starts
  ["hobbie", "cal", "zev", "wes", "bren", "jes", "ved"].forEach(id => { $("c-" + id).classList.add("on"); $("r-" + id).classList.add("sel"); });
  $("cAll").className = "cb on";
  $("bar").style.opacity = 1; $("mt").style.opacity = 0;
  $("bN").textContent = "All 82 matching Team: Fleet selected"; $("bAll").style.display = "none";
  $("bEdit").style.background = t >= T.editClick - .05 && t < T.dlg[1] ? "#404040" : "";

  const dov = span(t, ...T.dlg, easeOut) * (1 - span(t, ...T.dlgOut));
  $("scrim").style.opacity = dov; $("dlg").style.opacity = dov;
  $("dlg").style.transform = `translateY(${(1 - dov) * 8}px)`;

  // field, then operation, then value
  const mo = span(t, T.menu[0], T.menu[0] + .15, easeOut) * (1 - span(t, T.menu[1] - .08, T.menu[1]));
  $("fM").style.opacity = mo;
  $("fld").classList.toggle("focus", t >= T.fldClick && t < T.opClick);
  $("miG").classList.toggle("hov", t > T.gClick - .25 && t < T.menu[1]);
  const field = t >= T.gClick;
  $("fV").textContent = field ? "Groups" : "Choose a field";
  $("ops").style.opacity = field ? 1 : .45;
  const op = t >= T.opClick;
  $("o1").classList.toggle("on", op);
  const vf = t >= T.valClick && t < T.pick + .4;
  $("val").classList.toggle("focus", vf);
  const n = Math.round(TYPED.length * span(t, ...T.type, x => x));
  const picked = t >= T.pick;
  $("vT").textContent = picked ? "" : TYPED.slice(0, n);
  $("vC").style.display = picked ? "" : "none";
  $("cr").style.opacity = vf && !picked ? 1 : 0;
  const ready = field && op && picked;
  $("a1").innerHTML = ready ? 'Fleet, Rogue Squadron, <span class="add">Hoth Evacuation</span>' : "—";
  $("a2").innerHTML = ready ? 'Fleet, <span class="add">Hoth Evacuation</span>' : "—";
  $("a3").innerHTML = ready ? 'Fleet, Hangar 3, <span class="add">Hoth Evacuation</span>' : "—";
  $("go").className = ready ? "btn pri" + (t >= T.goClick - .25 && t < T.dlgOut[1] ? " dn" : "") : "btn off2";
  $("go").textContent = ready ? "Add Hoth Evacuation to 82 people" : !field ? "Choose a field" : !op ? "Choose what to do" : "Choose a group";

  const to = span(t, T.toast, T.toast + .25, easeOut) * (1 - span(t, ...T.toastOut));
  $("toast").style.opacity = to;
  $("toast").style.transform = `translateX(-50%) translateY(${(1 - to) * -8}px)`;
}

function events() {
  return [["click", T.editClick], ["whoosh", T.dlg[0]], ["click", T.fldClick], ["click", T.gClick], ["click", T.opClick],
          ["click", T.valClick], ["key", T.type[0]], ["click", T.goClick], ["pop", T.toast]];
}

Motion.scene({
  // 6 steps: natural length, within the 15 s cap
  T, clicks: [T.editClick, T.fldClick, T.gClick, T.opClick, T.valClick, T.goClick], build, render, events,
  slow: [[5.1, 6.0, 1.6]]
});"""
COMMENT = """  Source for media/edit-bulk-actions/bulk-edit.mp4. Built by motion/_build/bulk_edit.py
  on motion/_build/users_page.py, so People › Users is the same page in every Edit & bulk actions clip.
  Follows the Bulk edit card (data/guidance-actions.js):
  - all 82 matching people are selected; Edit… says who that is, including the 57 not on screen
  - pick the field first; Team is off because it's synced from Holonet HR
  - then the operation, each in plain words: Add to existing · Remove · Replace all · Clear
  - current values shown honestly: "Various", 14 different groups
  - a before and after preview on 3 people, with the added group marked
  - the button says what it does and to how many; it runs as a job, logged as one change"""
make("bulk-edit", "Bulk edit", COMMENT, CSS, EXTRA, TOAST, SCRIPT)
