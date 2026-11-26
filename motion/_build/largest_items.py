import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from storage_page import make, head, WN, LOCK

CSS = r"""
.fr { margin-top: 12px; display: flex; align-items: center; gap: 8px; }
.fr .sp { flex: 1; } .fr .nt { color: var(--soft); font-size: 12px; }
.chp { height: 30px; display: inline-flex; align-items: center; gap: 6px; padding: 0 12px; border-radius: 999px; border: 1px solid var(--rule-strong); color: var(--ink); font-size: 12.5px; }
.chp.on { background: var(--ink); color: #fff; border-color: var(--ink); }
.chp i { font-style: normal; font-size: 11px; opacity: .75; font-family: "Geist Mono", monospace; }
th .so { color: var(--ink); font-weight: 600; }
.hold { display: inline-flex; gap: 5px; align-items: center; font-size: 11.5px; color: var(--ink); border: 1px solid var(--rule-strong); border-radius: 999px; padding: 0 8px; margin-left: 6px; }
.hold svg { width: 12px; height: 12px; }
tr.lk td { color: var(--faint); }
tr.lk .cb { opacity: .4; }
.off { color: #92400e; }
.sbar2 { display: none; margin-top: 10px; height: 44px; border-radius: 10px; background: var(--ink); color: #fff; align-items: center; gap: 10px; padding: 0 8px 0 14px; font-size: 13px; }
.sbar2 .sp { flex: 1; } .sbar2 span.s { color: #d4d4d4; }
.sbar2 .btn { height: 30px; background: #fff; color: var(--ink); border-color: #fff; }
#tF { display: none; }
"""
def row(i, nm, sub, ty, own, os, act, size, hold=False):
    return (f'<tr id="{i}"{" class=\"lk\"" if hold else ""}><td class="ck"><span class="cb" id="{i}-c"></span></td>'
            f'<td><b><span class="ty">{ty}</span>{nm}{f"<span class={chr(34)}hold{chr(34)}>{LOCK}Legal hold</span>" if hold else ""}</b></td>'
            f'<td><b style="font-weight:400">{own}</b><span class="{"off" if os == "Deactivated" else ""}">{os}</span></td><td>{act}</td><td class="n">{size}</td></tr>')
HEAD = '<thead><tr><th class="ck"><span class="cb" id="cAll"></span></th><th style="width:40%">Name</th><th style="width:20%">Owner</th><th>Last activity</th><th class="n" aria-sort="descending"><span class="so">Size ↓</span></th></tr></thead>'
ALL = "".join([row("a1", "Hangar scans 2026", "", "DIR", "Base Engineering", "Team", "3 days ago", "310 GB"),
               row("a2", "X-wing telemetry", "", "DIR", "Dak Ralter", "Snowspeeders", "Yesterday", "220 GB"),
               row("a3", "Shield generator tests", "", "DIR", "Base Engineering", "Team", "5 months ago", "96 GB"),
               row("a4", "Trench run briefing.mp4", "", "MP4", "Gen. Dodonna", "Command", "4 days ago", "2.1 GB"),
               row("a5", "Hoth patrol footage.mp4", "", "MP4", "Biggs Darklighter", "Deactivated", "41 days ago", "12 GB")])
FLT = "".join([row("f1", "Hoth patrol footage.mp4", "", "MP4", "Biggs Darklighter", "Deactivated", "41 days ago", "12 GB"),
               row("f2", "Biggs’s flight logs", "", "DIR", "Biggs Darklighter", "Deactivated", "45 days ago", "8.4 GB"),
               row("f3", "Porkins supply ledgers", "", "DIR", "Jek Porkins", "Deactivated", "2 years ago", "3.1 GB", hold=True),
               row("f4", "Old briefings archive.zip", "", "ZIP", "Biggs Darklighter", "Deactivated", "1 year ago", "2.2 GB")])
MAIN = f'''      <div class="view">
{head("Storage", "lg", note="Report from 1 hour ago · shared files counted once, for their owner")}        <div class="fr"><span class="chp" id="cDe">Owner deactivated <i>112</i></span><span class="chp">No activity in a year <i>3.4K</i></span><span class="chp">Type<i class="cv" style="opacity:1"></i></span><span class="sp"></span></div>
        <div class="sbar2" id="sb" role="status"><span id="sbT">3 selected</span><span class="s">· frees 22.6 GB once deleted forever</span><span class="sp"></span><span class="btn">Ask their manager</span><span class="btn">Move to archive</span><span class="btn" id="bTr">Move to trash</span></div>
        <table class="sx" id="tA">{HEAD.replace('id="cAll"', 'id="cAll0"')}<tbody>{ALL}</tbody></table>
        <table class="sx" id="tF">{HEAD}<tbody>{FLT}</tbody></table>
      </div>
'''
EXTRA = f'''    <div class="scr" id="scr"></div>
    <section class="dlg" id="dlg" role="dialog" aria-labelledby="dT" style="left:420px; top:150px; width:480px">
      <h3 id="dT">Move 3 items to trash?</h3>
      <div style="margin-top:8px;line-height:1.5;color:var(--ink)">They’re deleted forever on <b>Dec 26, 2026</b>, in 30 days, unless someone restores them. The 22.6 GB is freed then.</div>
      <div style="margin-top:8px;display:flex;gap:8px;color:var(--ink)">{WN}<span><b>Porkins supply ledgers</b> is under legal hold, so it was left out.</span></div>
      <div class="ft"><span class="sp"></span><span class="btn">Cancel</span><span class="btn pri" id="bOk">Move to trash</span></div>
    </section>'''
TOAST = '      <div class="toast" id="toast"><i><svg width="11" height="11"><use href="#ok"/></svg></i>3 items moved to trash · deleted forever on Dec 26</div>'
SCRIPT = r"""const { $, at, span, easeOut } = Motion;

/* ---------- timeline (scene seconds) ---------- */
const T = { fClick: 1.10, allClick: 2.20, trClick: 3.40, open: [3.45, 3.70], okClick: 4.70, close: [4.75, 4.95], toast: [5.00, 6.40], endCard: [6.70, 7.15], end: 7.65 };

function build() {
  const f = at("cDe");
  $("tA").style.display = "none"; $("tF").style.display = "table"; const a = at("cAll");
  $("sb").style.display = "flex"; const tr = at("bTr"); $("sb").style.display = "";
  $("tA").style.display = ""; $("tF").style.display = "";
  $("dlg").style.opacity = 1; const ok = at("bOk"); $("dlg").style.opacity = 0;
  const cur = [[0.00, 960, 640], [0.25, 960, 640], [0.80, f[0], f[1] + 3], [1.15, f[0], f[1] + 3], [1.90, a[0], a[1] + 3], [2.25, a[0], a[1] + 3],
    [3.10, tr[0], tr[1] + 3], [3.45, tr[0], tr[1] + 3], [4.40, ok[0], ok[1] + 3], [4.75, ok[0], ok[1] + 3], [6.70, ok[0] - 200, ok[1] + 120]];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 345, 1.04], [6.45, 650, 345, 1.04], [6.70, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  $("crumb").innerHTML = "/ Content / Storage / <b>Largest items</b>";
  // sorted by size; filtered to owners who have left
  const f = t >= T.fClick, done = t >= T.close[0];
  $("cDe").classList.toggle("on", f);
  $("tA").style.display = f ? "none" : "table"; $("tF").style.display = f ? "table" : "none";
  // select all skips the item under legal hold, and says what it frees
  const s = t >= T.allClick && !done;
  $("cAll").classList.toggle("on", s);
  ["f1", "f2", "f4"].forEach(i => { $(i + "-c").classList.toggle("on", s); $(i).classList.toggle("sel", s); $(i).style.display = done ? "none" : ""; });
  $("sb").style.display = s ? "flex" : "none";
  $("bTr").classList.toggle("dn", t >= T.trClick - .05 && t < T.open[0] + .1);
  const o = span(t, ...T.open, easeOut) * (1 - span(t, ...T.close, easeOut));
  $("dlg").style.opacity = o; $("scr").style.opacity = o; $("dlg").style.visibility = o > 0 ? "visible" : "hidden";
  $("bOk").classList.toggle("dn", t >= T.okClick - .05 && t < T.close[0]);
  $("toast").style.opacity = span(t, T.toast[0], T.toast[0] + .2) * (1 - span(t, T.toast[1] - .2, T.toast[1]));
}

function events() { return [["click", T.fClick], ["click", T.allClick], ["click", T.trClick], ["whoosh", T.open[0]], ["click", T.okClick], ["pop", T.toast[0]]]; }

Motion.scene({
  // under 5 steps: natural length, within the 10 s cap
  T, clicks: [T.fClick, T.allClick, T.trClick, T.okClick], build, render, events, duration: 9.8
});"""
COMMENT = """  Source for media/storage-quotas/largest-items.mp4. Built by motion/_build/largest_items.py on _build/storage_page.py
  (Content › Storage › Largest items), with the top bar's alerts bell.
  Follows the Largest items card (data/guidance-content.js):
  - a table sorted by size, with the sort shown; owner, owner status and last activity for context
  - a report from the background, shared files counted once
  - filter by owner status; an item under legal hold can't be selected
  - safe actions with the space they free; trash, not permanent deletion, with the date it's deleted forever"""
make("largest-items", "Largest items", COMMENT, CSS, "Content / Storage", MAIN, SCRIPT, extra=EXTRA, toast=TOAST)
