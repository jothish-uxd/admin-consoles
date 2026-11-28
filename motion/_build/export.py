import sys, pathlib; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from tables_page import make
CSS = r"""
.btn.dn, .btn.pri.dn { background: #404040; border-color: #404040; color: #fff; }
.hd .btn.sm + .btn.sm { margin-left: 8px; }
.hd .btn.sec { background: var(--bg); color: var(--ink); border-color: var(--rule-strong); }
.hd .btn.sec.dn { background: var(--hover); color: var(--ink); border-color: var(--rule-strong); }
.scrim { position: absolute; inset: 0; background: rgba(23,23,23,.32); opacity: 0; z-index: 20; border-radius: inherit; }
.dlg { position: absolute; left: 330px; top: 132px; width: 540px; background: var(--bg); border-radius: 14px; box-shadow: 0 24px 60px rgba(0,0,0,.22); padding: 16px 20px; z-index: 21; opacity: 0; font-size: 12.5px; color: var(--soft); box-sizing: border-box; }
.dlg h2 { margin: 0; font-size: 16px; color: var(--ink); font-weight: 600; }
.dlg .lb { margin-top: 12px; font-size: 12px; font-weight: 600; color: var(--ink); }
.dlg .lb span { font-weight: 400; color: var(--soft); }
.dlg .ops { margin-top: 5px; display: flex; gap: 8px; }
.op { display: flex; gap: 8px; align-items: flex-start; border: 1px solid var(--rule); border-radius: 8px; padding: 6px 10px; font-size: 12px; color: var(--soft); flex: 1; }
.op b { display: block; color: var(--ink); font-weight: 500; font-size: 12.5px; }
.op .rd { width: 14px; height: 14px; border-radius: 50%; border: 1.5px solid var(--rule-strong); flex: none; margin-top: 2px; position: relative; box-sizing: border-box; }
.op.on { border-color: var(--ink); }
.op.on .rd { border-color: var(--ink); }
.op.on .rd::after { content: ""; position: absolute; inset: 2px; border-radius: 50%; background: var(--ink); }
.flds { margin-top: 5px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 5px 10px; }
.flds div { display: flex; gap: 7px; align-items: center; color: var(--ink); height: 22px; }
.flds.sen div { color: var(--soft); }
.dlg .ft { margin-top: 14px; display: flex; gap: 8px; align-items: center; }
.dlg .ft .nt { flex: 1; font-size: 12px; }
.dlg .ft .btn { height: 32px; font-size: 12.5px; white-space: nowrap; flex: none; }
.job { display: none; margin-top: 12px; }
.job .pb { margin-top: 8px; height: 6px; border-radius: 999px; background: var(--hover); overflow: hidden; }
.job .pb i { display: block; height: 100%; width: 100%; background: var(--ink); transform-origin: left center; }
.file { margin-top: 10px; display: flex; gap: 10px; align-items: center; border: 1px solid var(--rule-strong); border-radius: 10px; padding: 10px 12px; }
.file .ty { display: inline-grid; place-items: end center; width: 22px; height: 28px; border: 1.2px solid var(--rule-strong); border-radius: 3px; font-family: "Geist Mono", monospace; font-size: 6.5px; padding-bottom: 2px; box-sizing: border-box; flex: none; }
.file .w { flex: 1; } .file .w b { display: block; color: var(--ink); font-weight: 500; font-size: 13px; }
.file .btn { height: 32px; font-size: 12.5px; }
.kv { margin-top: 10px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.kv div { font-size: 12px; } .kv b { display: block; font-size: 11.5px; color: var(--soft); font-weight: 500; }
.kv span { color: var(--ink); }
"""
CB = lambda i, n, on: f'<div><span class="cb{" on" if on else ""}"{f" id={chr(34)}{i}{chr(34)}" if i else ""}></span>{n}</div>'
DLG = ('    <div class="scrim" id="scrim"></div>\n'
  '    <section class="dlg" id="dlg" role="dialog" aria-labelledby="dH"><h2 id="dH">Export people</h2>'
  '<div id="form"><div style="margin-top:3px">From People › Users, as it’s filtered now.</div>'
  '<div class="lb">Who</div><div class="ops"><div class="op on"><span class="rd"></span><div><b>82 selected</b>everyone matching Team: Fleet</div></div><div class="op"><span class="rd"></span><div><b>Everyone</b>all 1,204 people</div></div></div>'
  '<div class="lb">Fields</div><div class="flds">' + "".join(CB(i, n, True) for i, n in [("", "Name"), ("", "Email"), ("", "Team"), ("", "Title"), ("", "Groups"), ("", "License"), ("fLast", "Last active")]) + '</div>'
  '<div class="lb">Sensitive fields <span>· off unless you need them</span></div><div class="flds sen">' + "".join(CB("", n, False) for n in ["Phone", "Home address", "Employee ID"]) + '</div>'
  '<div class="lb">Format</div><div class="ops"><div class="op on"><span class="rd"></span><div><b>CSV</b>Opens in a spreadsheet</div></div><div class="op"><span class="rd"></span><div><b>JSON</b>For scripts and other tools</div></div></div>'
  '<div class="ft"><span class="nt"></span><span class="btn">Cancel</span><span class="btn pri" id="bStart">Export 82 people</span></div></div>'
  '<div class="job" id="job" role="status"><b id="jT" style="color:var(--ink)">Exporting 82 people…</b><div id="jS">You can close this. We’ll let you know when it’s ready.</div><div class="pb" id="pb"><i id="pbI"></i></div>'
  '<div id="rdy" style="display:none"><div class="file"><span class="ty">CSV</span><div class="w"><b>fleet-people.csv</b>82 rows · 6 fields · no sensitive fields</div><span class="btn pri" id="bDl">Download</span></div>'
  '<div class="kv"><div><b>Link expires</b><span>in 7 days · Dec 3</span></div><div><b>Who can open it</b><span>Only you</span></div><div><b>Logged</b><span>In the audit log</span></div></div>'
  '<div class="ft"><span class="nt"></span><span class="btn">Done</span></div></div></div></section>\n')
SCRIPT = r"""const { $, at, span, easeOut } = Motion;
const IDS = ["hobbie", "cal", "zev", "wes", "bren", "jes", "ved"];

/* ---------- timeline (scene seconds) ---------- */
const T = {
  cAll: 0.95, allClick: 1.65, expClick: 2.35, open: [2.40, 2.70], lastClick: 3.55, startClick: 4.30, run: [4.40, 5.10], dlClick: 5.80,
  endCard: [6.40, 6.85], end: 7.2
};

function ctr() { const d = $("dlg"); d.style.top = Math.round(340 - d.offsetHeight / 2) + "px"; }  // centred in the window, whatever state it is in
function build() {
  const h = at("cAll");
  $("bar").style.opacity = 1; $("bAll").style.display = ""; const b = at("bAll", 0, 0); const ex = at("bExp"); $("bar").style.opacity = 0;
  $("dlg").style.opacity = 1; ctr(); const l = at("fLast", -38, 0), st = at("bStart"), dg = at("dlg");
  $("form").style.display = "none"; $("job").style.display = "block"; $("rdy").style.display = "block"; ctr(); const dl = at("bDl");
  $("form").style.display = ""; $("job").style.display = ""; $("rdy").style.display = "none"; ctr(); $("dlg").style.opacity = 0;
  const cur = [
    [0.00, 960, 640], [0.25, 960, 640], [0.70, h[0], h[1] + 3], [1.00, h[0], h[1] + 3], [1.40, b[0], b[1] + 3], [1.70, b[0], b[1] + 3],
    [2.10, ex[0], ex[1] + 3], [2.40, ex[0], ex[1] + 3],
    [3.30, l[0], l[1] + 3], [3.60, l[0], l[1] + 3], [4.05, st[0], st[1] + 3], [4.35, st[0], st[1] + 3],
    [5.55, dl[0], dl[1] + 3], [5.85, dl[0], dl[1] + 3], [6.40, dl[0] - 60, dl[1] + 50]
  ];
  const cam = [
    [0.00, 640, 360, 1.00], [0.25, 640, 360, 1.00],
    [0.60, 724, 340, 1.15], [2.45, 724, 340, 1.15],       // the bar and the rows, as in Selection model
    [2.85, dg[0], 330, 1.08], [6.15, dg[0], 330, 1.08],   // the dialog, whole, start to finish
    [6.40, 656, 360, 1.04]
  ];
  return { cam, cur };
}

function render(t) {
  // select everyone the filter matches: the export's scope
  const n = t >= T.allClick ? 82 : t >= T.cAll ? 25 : 0;
  IDS.forEach(id => { $("c-" + id).classList.toggle("on", n > 0); $("r-" + id).classList.toggle("sel", n > 0); });
  $("cAll").className = "cb" + (n > 0 ? " on" : "");
  const bo = span(t, T.cAll, T.cAll + .15);
  $("bar").style.opacity = bo; $("mt").style.opacity = 1 - bo;
  $("bN").textContent = n === 82 ? "All 82 matching Team: Fleet selected" : "25 on this page selected";
  $("bAll").style.display = n === 25 ? "" : "none";
  $("bAll").style.opacity = t >= T.allClick - .25 && n === 25 ? .7 : 1;
  $("bExp").classList.toggle("dn", t >= T.expClick - .05 && t < T.open[0] + .2);
  const o = span(t, ...T.open, easeOut);
  $("scrim").style.opacity = o; $("dlg").style.opacity = o;
  $("dlg").style.transform = `translateY(${8 * (1 - o)}px)`;
  $("fLast").className = "cb" + (t >= T.lastClick ? "" : " on");
  $("bStart").textContent = "Export 82 people";
  $("bStart").classList.toggle("dn", t >= T.startClick - .05 && t < T.run[0]);
  // one state at a time: the form, then the job
  const run = t >= T.run[0], done = t >= T.run[1];
  $("form").style.display = run ? "none" : ""; $("job").style.display = run ? "block" : "none";
  $("pb").style.display = done ? "none" : "block"; $("rdy").style.display = done ? "block" : "none"; ctr();
  $("pbI").style.transform = `scaleX(${.05 + .95 * span(t, ...T.run, x => x)})`;
  $("jT").textContent = done ? "Your export is ready" : "Exporting 82 people…";
  $("jS").textContent = done ? "We also sent you a notification with this link." : "You can close this. We’ll let you know when it’s ready.";
  $("bDl").classList.toggle("dn", t >= T.dlClick - .05 && t < T.dlClick + .3);
  $("bDl").textContent = t >= T.dlClick + .05 ? "Downloaded" : "Download";
}

function events() { return [["click", T.cAll], ["click", T.allClick], ["click", T.expClick], ["whoosh", T.open[0]], ["click", T.lastClick], ["click", T.startClick], ["chime", T.run[1]], ["click", T.dlClick]]; }

Motion.scene({
  // 5+ steps: natural length, within the 15 s cap
  T, clicks: [T.cAll, T.allClick, T.expClick, T.lastClick, T.startClick, T.dlClick], build, render, events,
  slow: [[2.9, 3.3, 1.3]]
});"""
COMMENT = """  Source for media/import-export/export.mp4. Built by motion/_build/export.py on motion/_build/users_page.py,
  so People › Users is the same page as in the other clips.
  Follows the Export card (data/guidance-actions.js):
  - scope comes from the current filter: select all 82 matching Team: Fleet, then Export in the bar
  - fields to include; sensitive ones (phone, home address, employee ID) off by default
  - CSV or JSON, each described
  - runs as a job; a link that expires in 7 days, not an attachment; only you can open it; logged"""
s = make("export", "Export", COMMENT, CSS, DLG, "", SCRIPT)
(pathlib.Path(__file__).resolve().parent.parent / "export/scene.html").write_text(s)
