import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from shell import make
from group_page import CSS as GCSS, head
CSS = GCSS + r"""
.tb { margin-top: 12px; display: flex; gap: 8px; align-items: center; }
.tb .srch2 { flex: 1; height: 34px; border: 1px solid var(--rule-strong); border-radius: 8px; display: flex; align-items: center; padding: 0 12px; font-size: 13px; color: var(--faint); }
.tb .btn { height: 34px; }
.tb .btn.dn { background: #404040; border-color: #404040; }
.addp { margin-top: 10px; border: 1px solid var(--ink); border-radius: 12px; padding: 12px 14px; font-size: 12.5px; color: var(--soft); display: none; }
.addp label { display: block; font-size: 12.5px; color: var(--ink); font-weight: 500; margin-bottom: 5px; }
.addp .ta { min-height: 36px; border: 1.5px solid var(--rule-strong); border-radius: 8px; padding: 8px 10px; display: flex; gap: 6px; flex-wrap: wrap; align-items: center; color: var(--ink); font-size: 13px; white-space: pre; }
.addp .ta.f { border-color: var(--ink); }
.addp .ta .c { width: 1.5px; height: 17px; background: var(--ink); }
.addp .ta .ch { display: inline-flex; gap: 5px; align-items: center; border: 1px solid var(--rule-strong); border-radius: 999px; padding: 2px 9px 2px 3px; font-size: 12.5px; }
.addp .ta .ch .av { width: 20px; height: 20px; font-size: 8.5px; }
.addp .pv { margin-top: 8px; }
.addp .pv b { color: var(--ink); font-weight: 600; }
.addp .r { margin-top: 10px; display: flex; gap: 8px; }
.addp .btn { height: 32px; font-size: 12.5px; }
.addp .btn.dn { background: #404040; border-color: #404040; }
.rm { width: 30px; height: 30px; border-radius: 7px; display: grid; place-items: center; color: var(--ink); border: 1px solid transparent; position: relative; }
.rm svg { width: 13px; height: 13px; }
.rm.off { color: #a3a3a3; }
.rm.hv { border-color: var(--rule-strong); }
.tip { position: absolute; right: 0; top: 34px; width: 220px; background: var(--ink); color: #fff; font-size: 11.5px; line-height: 1.4; border-radius: 6px; padding: 6px 9px; opacity: 0; z-index: 6; text-align: left; white-space: normal; }
tr.new td { background: var(--subtle); }
.st2 { font-size: 12.5px; color: var(--ink); }
"""
X = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>'
MEM = [
  ("rk", "Gen. Rieekan", "GR", "Owner", "Directly", "Nov 2 · Lavanya Sienna"),
  ("tf", "Toryn Farr", "TF", "Member", '<b>Through Shield Ops</b>', "Nov 2 · group added"),
  ("hk", "Hobbie Klivian", "HK", "Member", '<b>Through Fleet</b>', "Nov 2 · group added"),
  ("wj", "Wes Janson", "WJ", "Member", "Directly", "Nov 3 · Gen. Rieekan"),
  ("zs", "Zev Senesca", "ZS", "Member", "Directly", "Nov 3 · Gen. Rieekan"),
]
NEW = [("ca", "Cal Alder", "CA"), ("jg", "Jes Gistang", "JG"), ("vf", "Ved Foslo", "VF")]
rows_new = "\n".join(f'            <tr class="new" id="n-{i}" style="display:none"><td><div class="pp"><span class="av">{a}</span>{n}</div></td><td>Member</td><td class="how">Directly</td><td>Just now · Lavanya Sienna</td><td><span class="rm">{X}</span></td></tr>' for i, n, a in NEW)
rows = "\n".join(f'            <tr id="m-{i}"><td><div class="pp"><span class="av">{a}</span>{n}</div></td><td>{r}</td><td class="how">{h}</td><td>{w}</td><td><span class="rm{" off" if i == "rk" else ""}" id="x-{i}" aria-disabled="{"true" if i == "rk" else "false"}">{X}{"<span class=\"tip\" id=\"tip\">Can’t remove the only owner. Add another owner first.</span>" if i == "rk" else ""}</span></td></tr>' for i, n, a, r, h, w in MEM)
MAIN = f'''      <div class="view">
{head("Hoth Evacuation", "Static", "Evacuation crews, Nov 2026 · owned by Gen. Rieekan", ["Members", "Access", "Settings", "History"], "Members")}        <div class="acc"><b>Members get</b><span class="ch">Console licence</span><span class="ch">Edit · Evacuation plans</span><span class="ch">Shield Ops channel</span></div>
        <div class="tb"><div class="srch2">Search 64 members</div><span class="btn pri" id="bAdd">Add people</span></div>
        <div class="addp" id="addp"><label>Paste names or emails</label><div class="ta" id="ta"><span id="taV"></span><span class="c" id="cr"></span></div>
          <div class="pv" id="pv" style="opacity:0"><b>3 people</b> will get a Console licence, Edit · Evacuation plans and the Shield Ops channel. Cal Alder already has a Console licence.</div>
          <div class="r"><span class="btn pri" id="bGo">Add 3 people</span><span class="btn">Cancel</span></div></div>
        <table class="m" id="tM"><thead><tr><th>Name</th><th>Role in group</th><th>How added</th><th>Added</th><th style="width:40px"></th></tr></thead><tbody>
{rows_new}
{rows}
          </tbody></table>
        <div class="cnt" id="cnt"><span class="st2" id="st2" role="status"></span><span id="cntT">64 members · 12 added directly, 52 through 2 groups</span></div>
      </div>'''
SCRIPT = r"""const { $, at, span, easeOut } = Motion;
const PASTE = "Cal Alder, Jes Gistang, Ved Foslo";

/* ---------- timeline (scene seconds) ---------- */
const T = {
  addClick: 1.20, open: 1.30, taClick: 1.90, paste: 2.10, chips: 2.45, goClick: 4.30, added: 4.40, tip: [5.60, 6.70],
  endCard: [7.10, 7.55], end: 8.2
};

function build() {
  const a = at("bAdd");
  ["ca", "jg", "vf"].forEach(i => $("n-" + i).style.display = ""); const x = at("x-rk"); ["ca", "jg", "vf"].forEach(i => $("n-" + i).style.display = "none");
  $("addp").style.display = "block"; const ta = at("ta", -200, 0), g = at("bGo"); $("addp").style.display = "none";
  const cur = [
    [0.00, 960, 640], [0.30, 960, 640], [1.00, a[0], a[1] + 3], [1.30, a[0], a[1] + 3], [1.75, ta[0], ta[1] + 3], [2.00, ta[0], ta[1] + 3],
    [3.00, ta[0] + 200, ta[1] + 70], [4.10, g[0], g[1] + 3], [4.45, g[0], g[1] + 3], [5.40, x[0], x[1] + 3], [6.80, x[0] + 2, x[1] + 4], [7.10, x[0] - 60, x[1] + 60]
  ];
  const cam = [
    [0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00],
    [0.90, 740, 300, 1.20], [4.55, 740, 300, 1.20],     // access, and adding three people
    [5.00, 740, 390, 1.20], [6.85, 740, 390, 1.20],     // the members, with the three on top
    [7.10, 656, 360, 1.04]
  ];
  return { cam, cur };
}

function render(t) {
  const open = t >= T.open && t < T.added;
  $("addp").style.display = open ? "block" : "none";
  $("bAdd").classList.toggle("dn", t >= T.addClick - .05 && t < T.open + .2);
  $("ta").classList.toggle("f", t >= T.taClick);
  const chips = t >= T.chips;
  $("taV").innerHTML = chips ? '<span class="ch"><span class="av">CA</span>Cal Alder</span><span class="ch"><span class="av">JG</span>Jes Gistang</span><span class="ch"><span class="av">VF</span>Ved Foslo</span>' : t >= T.paste ? PASTE : "";
  $("cr").style.opacity = t >= T.taClick && Math.floor(t * 2.4) % 2 === 0 ? 1 : 0;
  $("pv").style.opacity = span(t, T.chips + .1, T.chips + .3);
  $("bGo").classList.toggle("dn", t >= T.goClick - .25);
  // added: the three appear at the top, and the count and status change
  const added = t >= T.added;
  ["ca", "jg", "vf"].forEach(i => $("n-" + i).style.display = added ? "" : "none");
  $("st2").textContent = added ? "3 members added · " : "";
  document.querySelector(".srch2").textContent = added ? "Search 67 members" : "Search 64 members";
  $("cntT").textContent = added ? "67 members · 15 added directly, 52 through 2 groups" : "64 members · 12 added directly, 52 through 2 groups";
  // the only owner can't be removed, and it says why
  const tp = span(t, T.tip[0], T.tip[0] + .15) * (1 - span(t, T.tip[1], T.tip[1] + .15));
  $("tip").style.opacity = tp; $("x-rk").classList.toggle("hv", tp > 0);
}

function events() { return [["click", T.addClick], ["click", T.taClick], ["key", T.paste], ["click", T.goClick], ["pop", T.added]]; }

Motion.scene({
  // 5 steps: natural length, within the 15 s cap
  T, clicks: [T.addClick, T.taClick, T.goClick], build, render, events,
  slow: [[2.5, 4.0, 1.7], [4.5, 5.3, 1.3], [5.6, 6.6, 1.5]]
});"""
COMMENT = """  Source for media/groups-teams/manage-members.mp4. Built by motion/_build/manage_members.py on _build/shell.py and _build/group_page.py.
  Follows the Manage members card (data/guidance-people.js):
  - what the group grants sits above the members, so the impact of adding someone is clear
  - members show their role in the group, how they were added (directly or through Shield Ops and Fleet) and by whom
  - she pastes 3 names; the preview says what they'll get, then "3 members added" is announced
  - Remove is off for the only owner, with the reason"""
s = make("manage-members", "Manage members", COMMENT, CSS, "People / Groups / Hoth Evacuation", "people", MAIN, SCRIPT)
import pathlib
(pathlib.Path(__file__).resolve().parent.parent / "manage-members/scene.html").write_text(s.replace('<div class="acc">', '<div class="acc" id="acc0">', 1))
