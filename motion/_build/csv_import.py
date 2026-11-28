import sys, pathlib; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from tables_page import make
from import_page import CSS as ICSS, head
CSS = ICSS + r"""
.ty { display: inline-grid; place-items: end center; width: 20px; height: 26px; border: 1.2px solid var(--rule-strong); border-radius: 3px; font-family: "Geist Mono", monospace; font-size: 6.5px; padding-bottom: 2px; color: var(--soft); box-sizing: border-box; flex: none; }
.imp .card { margin-top: 10px; padding: 12px 16px; }
.imp .foot { margin-top: 10px; }
.hd .btn.dn { background: #404040; border-color: #404040; }
.hd { position: relative; }
.hd .menu { position: absolute; right: 0; top: 40px; width: 230px; z-index: 6; opacity: 0; }
.hd .menu .s2 { display: block; font-size: 11.5px; color: var(--soft); }
.imp { opacity: 0; }
.tpl { margin-top: 10px; display: flex; gap: 14px; align-items: flex-start; }
.tpl table { font-size: 12px; flex: 1; }
.tpl th { padding: 0 8px 6px; color: var(--ink); font-weight: 600; }
.tpl th .rq { color: var(--soft); font-weight: 400; }
.tpl td { height: 26px; padding: 0 8px; color: var(--soft); font-family: "Geist Mono", monospace; font-size: 11.5px; }
.tpl .btn { height: 32px; font-size: 12.5px; flex: none; }
.drop { margin-top: 10px; border: 1.5px dashed var(--rule-strong); border-radius: 12px; height: 50px; display: flex; align-items: center; justify-content: center; gap: 10px; font-size: 13px; color: var(--soft); position: relative; }
.drop.over { border-color: var(--ink); background: var(--subtle); }
.drop .fl { display: none; gap: 10px; align-items: center; color: var(--ink); }

.drop .fl span { color: var(--soft); font-size: 12.5px; }
.drop .fl .ty { font-size: 6.5px; color: var(--soft); }
.fly { position: absolute; white-space: nowrap; height: 34px; border: 1px solid var(--rule-strong); border-radius: 8px; background: var(--bg); box-shadow: 0 10px 30px rgba(0,0,0,.15); display: flex; align-items: center; gap: 8px; padding: 0 10px; font-size: 12px; color: var(--ink); opacity: 0; z-index: 30; }
.sumr { margin-top: 10px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; opacity: 0; }
.sumr div { border: 1px solid var(--rule); border-radius: 10px; padding: 8px 10px; font-size: 12px; color: var(--soft); }
.sumr b { display: block; font-size: 17px; color: var(--ink); font-weight: 600; }
.ex { margin-top: 10px; opacity: 0; }
.ex .q { font-size: 13px; color: var(--ink); font-weight: 500; margin-bottom: 6px; }
.ex .ops { display: flex; gap: 8px; }
.op { display: flex; gap: 8px; align-items: flex-start; border: 1px solid var(--rule); border-radius: 8px; padding: 7px 10px; font-size: 12px; color: var(--soft); flex: 1; }
.op b { display: block; color: var(--ink); font-weight: 500; font-size: 13px; }
.op .rd { width: 15px; height: 15px; border-radius: 50%; border: 1.5px solid var(--rule-strong); flex: none; margin-top: 2px; position: relative; }
.op.on { border-color: var(--ink); }
.op.on .rd { border-color: var(--ink); }
.op.on .rd::after { content: ""; position: absolute; inset: 2.5px; border-radius: 50%; background: var(--ink); }
"""
IMP = f'''      <div class="view imp" id="vImp">
{head(1)}          <div class="card"><h3>Start from the template</h3>Columns can be in any order. <b style="color:var(--ink)">*</b> marks the required ones.
            <div class="tpl"><table><thead><tr><th>Name <span class="rq">*</span></th><th>Email <span class="rq">*</span></th><th>Team</th><th>Title</th><th>Manager</th></tr></thead>
              <tbody><tr><td>Hobbie Klivian</td><td>hobbie@echobase.rebellion</td><td>Fleet</td><td>Pilot</td><td>Wedge Antilles</td></tr></tbody></table><span class="btn">Download template</span></div></div>
          <div class="drop" id="drop"><span id="dTxt">Drop a CSV here, or <u>choose a file</u></span><span class="fl" id="fl"><span class="ty">CSV</span>fleet-new-hires.csv <span>48 rows · UTF-8 · comma-separated</span></span></div>
          <div class="sumr" id="sumr" aria-live="polite"><div><b>48</b>rows found</div><div><b>41</b>ready to import</div><div><b>4</b>with problems, shown next</div><div><b>3</b>already exist</div></div>
          <div class="ex" id="ex"><div class="q">For the 3 people who already exist</div>
            <div class="ops"><div class="op" id="oSkip"><span class="rd"></span><div><b>Skip them</b>Leave them as they are.</div></div><div class="op" id="oUpd"><span class="rd"></span><div><b>Update them</b>Use the file’s values for team, title and manager.</div></div><div class="op" id="oStop"><span class="rd"></span><div><b>Stop the import</b>So I can check them first.</div></div></div></div>
          <div class="foot"><span class="note">Nothing changes until the last step.</span><span class="btn">Cancel</span><span class="btn pri" id="bCont">Continue to map fields</span></div>
      </div>
'''
SCRIPT = r"""const { $, at, span, easeOut } = Motion;

/* ---------- timeline (scene seconds) ---------- */
const T = {
  invClick: 1.10, menu: [1.15, 1.85], impClick: 1.75, toImp: [1.85, 2.15], drag: [3.10, 3.90], drop: 3.95, sum: 4.10,
  updClick: 5.60, contClick: 6.60, endCard: [7.50, 7.95], end: 8.6
};

function build() {
  const iv = at("bInv");
  $("menu").style.opacity = 1; const im = at("miImp", -50, 0); $("menu").style.opacity = 0;
  $("vImp").style.opacity = 1; ["sumr", "ex"].forEach(x => $(x).style.opacity = 1);
  const d = at("drop"), u = at("oUpd", -60, 0), c = at("bCont"), v = at("vImp");
  $("vImp").style.opacity = 0; ["sumr", "ex"].forEach(x => $(x).style.opacity = 0);
  const cur = [
    [0.00, 960, 640], [0.25, 960, 640], [0.90, iv[0], iv[1] + 3], [1.15, iv[0], iv[1] + 3], [1.55, im[0], im[1] + 3], [1.85, im[0], im[1] + 3],
    [2.80, d[0] + 260, d[1] - 120], [3.10, d[0] + 250, d[1] - 110], [3.90, d[0] + 10, d[1] + 4], [4.40, d[0] + 60, d[1] + 40],
    [5.40, u[0], u[1] + 3], [5.70, u[0], u[1] + 3], [6.40, c[0], c[1] + 3], [6.70, c[0], c[1] + 3], [7.50, c[0] - 80, c[1] + 60]
  ];
  const cam = [
    [0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00],
    [0.80, 1000, 170, 1.30], [1.90, 1000, 170, 1.30],     // Invite people ▾ → Import a CSV
    [2.40, v[0], v[1] + 70, 1.12], [7.25, v[0], v[1] + 70, 1.12],   // the import page, whole
    [7.50, 656, 360, 1.04]
  ];
  return { cam, cur };
}

function render(t) {
  $("bInv").classList.toggle("dn", t >= T.invClick - .05 && t < T.menu[1]);
  const mo = span(t, T.menu[0], T.menu[0] + .15, easeOut) * (1 - span(t, T.menu[1] - .08, T.menu[1]));
  $("menu").style.opacity = mo;
  $("miImp").classList.toggle("hov", t > T.impClick - .25 && t < T.menu[1]);
  // Users, then the import page, one after the other
  $("vU").style.opacity = 1 - span(t, T.toImp[0], T.toImp[0] + .12);
  $("vImp").style.opacity = span(t, T.toImp[0] + .14, T.toImp[1]);
  $("crumb").innerHTML = t >= T.toImp[0] ? "/ People / Users / <b>Import</b>" : "/ People / <b>Users</b>";
  // a file dragged in from outside
  // the file chip sits under the cursor while it's dragged (cursor is in stage space, the chip in the window's)
  const m = /translate\(([-\d.]+)px, ([-\d.]+)px\)/.exec($("cursor").style.transform) || [0, 0, 0];
  Object.assign($("fly").style, { left: (+m[1] + 3 - 40 - 24) + "px", top: (+m[2] + 2 - 20 - 14) + "px" });
  $("fly").style.opacity = t >= T.drag[0] && t < T.drop ? 1 : 0;
  $("drop").classList.toggle("over", t >= T.drag[0] + .5 && t < T.drop + .2);
  const got = t >= T.drop;
  $("dTxt").style.display = got ? "none" : ""; $("fl").style.display = got ? "flex" : "none";
  $("sumr").style.opacity = span(t, T.sum, T.sum + .25); $("ex").style.opacity = span(t, T.sum + .2, T.sum + .45);
  $("oUpd").classList.toggle("on", t >= T.updClick);
  $("bCont").classList.toggle("dn2", t >= T.contClick - .05);
}

function events() { return [["click", T.invClick], ["click", T.impClick], ["whoosh", T.toImp[0]], ["pop", T.drop], ["click", T.updClick], ["click", T.contClick]]; }

Motion.scene({
  // 5+ steps: natural length, within the 15 s cap
  T, clicks: [T.invClick, T.impClick, T.updClick, T.contClick], build, render, events,
  slow: [[2.3, 3.0, 1.5], [4.2, 5.3, 1.8]]
});"""
COMMENT = """  Source for media/import-export/csv-import.mp4. Built by motion/_build/csv_import.py
  on motion/_build/users_page.py and motion/_build/import_page.py, so People › Users is the same page.
  Follows the CSV import card (data/guidance-actions.js):
  - Invite people ▾ → Import a CSV; the import page has its steps in view
  - a template with an example row, required columns marked, any column order
  - the file is dropped in; encoding and delimiter are detected
  - a summary before anything changes: 48 found, 41 ready, 4 with problems, 3 already exist
  - for existing people: skip, update or stop; nothing changes until the last step"""
s = make("csv-import", "CSV import", COMMENT, CSS, '    <div class="fly" id="fly"><span class="ty" style="width:18px;height:22px;font-size:6px">CSV</span>fleet-new-hires.csv</div>', "", SCRIPT)
s = s.replace('<div class="view">', '<div class="view" id="vU">', 1)
s = s.replace('<span class="crumb" data-path="People / Users"></span>', '<span class="crumb" id="crumb" data-path="People / Users"></span>', 1)
s = s.replace('<div class="hd"><h1>People</h1><span class="btn sm pri">Invite people</span></div>',
  '<div class="hd"><h1>People</h1><span class="btn sm pri" id="bInv">Invite people</span><div class="menu" id="menu"><div>Invite by email<span class="s2">Send invitations to a few people</span></div><div id="miImp">Import a CSV<span class="s2">Add or update many people from a file</span></div></div></div>', 1)
A = '        </tbody></table>\n      </div>\n'  # the table, as tables_page.py draws it (no count line under it)
i = s.index(A) + len(A)
s = s[:i] + IMP + s[i:]
(pathlib.Path(__file__).resolve().parent.parent / "csv-import/scene.html").write_text(s)
