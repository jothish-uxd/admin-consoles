import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from compliance_page import make

CSS = r"""
#vM { opacity: 0; }
.st3 { display: inline-flex; gap: 6px; align-items: center; font-size: 12px; color: var(--ink); border: 1px solid var(--ink); border-radius: 999px; padding: 2px 10px; margin-left: 10px; }
.st3 i { width: 8px; height: 8px; border-radius: 50%; background: var(--ink); }
.subh { margin-top: 4px; font-size: 12.5px; color: var(--soft); }
.kv4 { margin: 14px 0 0; display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.kv4 > div { border: 1px solid var(--rule); border-radius: 10px; padding: 9px 12px; }
.kv4 dt { font-size: 12px; color: var(--soft); margin-bottom: 3px; }
.kv4 dd { margin: 0; font-size: 13px; color: var(--ink); font-weight: 500; line-height: 1.4; }
.h3r { margin-top: 18px; display: flex; align-items: center; gap: 10px; }
.h3r h2 { margin: 0; font-size: 14px; color: var(--ink); font-weight: 600; }
.h3r .sp { flex: 1; }
.h3r .nt { font-size: 12px; color: var(--soft); }
.ack { display: inline-flex; gap: 6px; align-items: center; font-size: 12px; color: var(--ink); white-space: nowrap; }
.ack svg { width: 12px; height: 12px; }
.ack.no { color: #92400e; }
.pbar { width: 70px; height: 5px; border-radius: 999px; background: var(--hover); overflow: hidden; display: inline-block; vertical-align: middle; margin-right: 6px; }
.pbar i { display: block; height: 100%; width: 100%; background: var(--ink); transform-origin: left; }
#rB { display: none; }
.dlg .f1 { margin-top: 12px; position: relative; }
.dlg .menu { position: absolute; left: 0; top: 64px; width: 100%; z-index: 9; opacity: 0; }
.dlg .menu .s2 { display: block; font-size: 11.5px; color: var(--soft); }
.chk { display: flex; gap: 9px; align-items: center; height: 28px; color: var(--ink); font-size: 12.5px; }
.chk .s { color: var(--soft); }
"""
OK = '<svg aria-hidden="true"><use href="#ok"/></svg>'
WN = '<svg aria-hidden="true"><use href="#warn"/></svg>'
CUST = [("Jyn Erso", "Mailbox, Drive, Chat", "6,120", f'<span class="ack">{OK}Acknowledged Oct 3</span>'),
        ("Cassian Andor", "Mailbox, Drive", "5,980", f'<span class="ack">{OK}Acknowledged Oct 3</span>'),
        ("Saw Gerrera", "Mailbox", "3,140", f'<span class="ack no">{WN}Not yet · reminded Oct 10</span>')]
NEWROW = '<tr id="rB" class="nw"><td class="nm"><b>Bodhi Rook</b><span>Cargo pilot</span></td><td>Mailbox, Drive</td><td id="rBi"></td><td id="rBa"></td></tr>'
LIST = '''      <div class="view" id="vL">
        <div class="hd"><h1>Legal holds</h1><span class="sp"></span><span class="btn sm pri">New hold</span></div>
        <table class="st"><thead><tr><th>Matter</th><th>Custodians</th><th>Preserved</th><th>Status</th></tr></thead><tbody>
          <tr id="mS"><td class="nm"><b>Scarif inquiry</b><span>SC-0412 · Gen. Madine</span></td><td>3</td><td>15,240 items</td><td>Active since Oct 2</td></tr>
          <tr><td class="nm"><b>Hoth supply audit</b><span>HA-0198 · Gen. Madine</span></td><td>11</td><td>48,900 items</td><td>Active since Jun 14</td></tr>
          <tr><td class="nm"><b>Yavin facilities claim</b><span>YV-0077 · Mon Mothma</span></td><td>2</td><td>—</td><td>Released Mar 30, by Mon Mothma</td></tr>
        </tbody></table>
      </div>'''
MATTER = f'''      <div class="view" id="vM">
        <div class="hd"><h1>Scarif inquiry</h1><span class="st3"><i></i>Active</span><span class="sp"></span><span class="btn sm">Edit</span><span class="btn sm">Release hold…</span></div>
        <div class="subh">Matter SC-0412 · Gen. Madine, legal · since Oct 2. Held content can’t be deleted by anyone, by retention, or when someone leaves.</div>
        <dl class="kv4"><div><dt>Sources</dt><dd>Mailboxes, Holonet Drive, HoloComms</dd></div><div><dt>Dates</dt><dd>Jan 1 – Oct 2, 2026</dd></div>
          <div><dt>Keywords</dt><dd>Scarif, shield gate, Rogue One</dd></div><div><dt>Preserved</dt><dd id="kP">15,240 items</dd></div></dl>
        <div class="h3r"><h2 id="cH">Custodians · 3</h2><span class="nt">Each gets a hold notice and must acknowledge it</span><span class="sp"></span><span class="btn sm" id="bAdd">Add custodian</span></div>
        <table class="st"><thead><tr><th>Custodian</th><th>What’s held</th><th>Items</th><th>Notice</th></tr></thead><tbody>{NEWROW}
          {"".join(f'<tr><td class="nm"><b>{n}</b></td><td>{w}</td><td>{i}</td><td>{a}</td></tr>' for n, w, i, a in CUST)}</tbody></table>
      </div>'''
MAIN = LIST + "\n" + MATTER + "\n"
EXTRA = '''    <div class="scr" id="scr"></div>
    <section class="dlg" id="dlg" role="dialog" aria-labelledby="aT" style="left:320px; top:110px; width:520px">
      <h3 id="aT">Add a custodian to Scarif inquiry</h3>
      <div class="f1"><label class="lbl">Person</label><span class="in f" id="pIn"><span id="pTx"></span><span class="c" id="pC"></span></span>
        <div class="menu" id="pMenu"><div id="oB">Bodhi Rook<span class="s2">Cargo pilot · bodhi.rook@echobase.rebellion</span></div><div>Bodkin Vane<span class="s2">Mechanic · Hangar 3</span></div></div></div>
      <div class="f1"><span class="lbl">Hold</span><div class="chk"><span class="cb on"></span>Mailbox</div><div class="chk"><span class="cb on"></span>Holonet Drive</div><div class="chk"><span class="cb"></span>HoloComms <span class="s">· no matches for the keywords</span></div></div>
      <div class="f1"><div class="chk"><span class="cb on"></span>Send the hold notice <span class="s">· required for this matter</span></div></div>
      <div class="ft"><span class="sp"></span><span class="btn">Cancel</span><span class="btn pri" id="bGo">Add and preserve</span></div>
    </section>'''
SCRIPT = r"""const { $, at, span, easeOut } = Motion;
const P = "Bod";

/* ---------- timeline (scene seconds) ---------- */
const T = {
  mClick: 0.95, toM: 1.00, aClick: 2.40, open: [2.45, 2.75], type: [2.95, 3.25], pmenu: [3.30, 4.00], bPick: 3.90, goClick: 4.90,
  close: [4.95, 5.20], job: [5.20, 6.60], endCard: [7.70, 8.15], end: 8.65
};

function build() {
  const m = at("mS", -300, 0);
  $("vM").style.opacity = 1; const a = at("bAdd"); $("vM").style.opacity = 0;
  $("dlg").style.opacity = 1; $("pMenu").style.opacity = 1; const b = at("oB", -100, 0); $("pMenu").style.opacity = 0; const g = at("bGo"); $("dlg").style.opacity = 0;
  const cur = [
    [0.00, 960, 640], [0.25, 960, 640], [0.70, m[0], m[1] + 3], [1.00, m[0], m[1] + 3],
    [2.15, a[0], a[1] + 3], [2.45, a[0], a[1] + 3], [3.00, a[0] - 300, a[1] + 40],
    [3.65, b[0], b[1] + 3], [3.95, b[0], b[1] + 3], [4.65, g[0], g[1] + 3], [4.95, g[0], g[1] + 3], [6.40, g[0] - 100, g[1] + 150], [7.70, g[0] - 98, g[1] + 152]
  ];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 345, 1.04], [7.45, 650, 345, 1.04], [7.70, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  const m = t >= T.toM;
  $("crumb").innerHTML = m ? "/ Compliance / Legal holds / <b>Scarif inquiry</b>" : "/ Compliance / <b>Legal holds</b>";
  $("vL").style.opacity = m ? 0 : 1; $("vM").style.opacity = m ? 1 : 0;
  $("mS").classList.toggle("sel", t >= T.mClick - .1 && !m);
  $("bAdd").classList.toggle("dn", t >= T.aClick - .05 && t < T.open[0] + .15);
  const o = span(t, ...T.open, easeOut) * (1 - span(t, ...T.close, easeOut));
  $("dlg").style.opacity = o; $("scr").style.opacity = o; $("dlg").style.transform = `translateY(${8 * (1 - o)}px)`;
  $("dlg").style.visibility = o > 0 ? "visible" : "hidden";
  const n = Math.round(P.length * span(t, ...T.type, x => x)), pk = t >= T.bPick + .05;
  $("pTx").textContent = pk ? "Bodhi Rook" : P.slice(0, n);
  $("pC").style.display = !pk && Math.floor(t * 2.4) % 2 === 0 ? "" : "none";
  $("pMenu").style.opacity = span(t, T.pmenu[0], T.pmenu[0] + .12) * (1 - span(t, T.pmenu[1] - .08, T.pmenu[1]));
  $("oB").classList.toggle("hov", t >= T.bPick - .25);
  $("bGo").classList.toggle("dn", t >= T.goClick - .05 && t < T.close[0]);
  // preserving runs as a job, then the hold is confirmed, with counts
  const added = t >= T.close[1], p = span(t, ...T.job, x => x), done = t >= T.job[1];
  $("rB").style.display = added ? "table-row" : "none";
  $("cH").textContent = added ? "Custodians · 4" : "Custodians · 3";
  $("rBi").innerHTML = done ? "2,310" : `<span class="pbar"><i style="transform:scaleX(${.05 + .95 * p})"></i></span>Preserving ${Math.round(2310 * p).toLocaleString("en-US")} of 2,310`;
  $("rBa").innerHTML = '<span class="ack no"><svg aria-hidden="true"><use href="#warn"/></svg>Not yet · sent just now</span>';
  $("kP").textContent = (15240 + Math.round(2310 * p)).toLocaleString("en-US") + " items";
}

function events() { return [["click", T.mClick], ["click", T.aClick], ["whoosh", T.open[0]], ["key", T.type[0]], ["click", T.bPick], ["click", T.goClick], ["chime", T.job[1]]]; }

Motion.scene({
  // 5+ steps: natural length, within the 15 s cap
  T, clicks: [T.mClick, T.aClick, T.bPick, T.goClick], build, render, events,
  slow: [[1.2, 2.0, 1.5], [6.6, 7.4, 1.3]]
});"""
COMMENT = """  Source for media/policies/legal-hold.mp4. Built by motion/_build/legal_hold.py on _build/compliance_page.py,
  with the top bar's alerts bell.
  Follows the Legal hold card (data/guidance-governance.js):
  - holds by matter, with custodians, sources, dates and keywords; a released hold says who released it
  - custodians in a table, with the notice's acknowledgement in its own column
  - adding a custodian preserves their content as a job, then confirms the count
  - held content can't be deleted by anyone, by retention or at offboarding; release is a separate, deliberate step"""
make("legal-hold", "Legal hold", COMMENT, CSS, "Compliance / Legal holds", MAIN, SCRIPT, extra=EXTRA)
