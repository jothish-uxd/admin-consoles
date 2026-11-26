import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from shell import make
from group_page import CSS as GCSS, head
CSS = GCSS + r"""
.seg { margin-top: 14px; display: inline-flex; border: 1px solid var(--rule-strong); border-radius: 10px; padding: 3px; gap: 3px; }
.seg span { font-size: 13px; padding: 6px 12px; border-radius: 7px; color: var(--ink); }
.seg span.on { background: var(--ink); color: #fff; font-weight: 500; }
.seg span i { font-style: normal; font-family: "Geist Mono", monospace; font-size: 11.5px; margin-left: 4px; opacity: .75; }
.cols { margin-top: 12px; display: grid; grid-template-columns: 1fr 300px; gap: 20px; }
.sum { font-size: 13.5px; color: var(--ink); }
.tree { margin-top: 10px; border: 1px solid var(--rule); border-radius: 12px; overflow: hidden; }
.tree .nd { display: flex; align-items: center; gap: 10px; height: 44px; padding: 0 14px; border-bottom: 1px solid var(--rule); font-size: 13px; color: var(--ink); }
.tree .nd:last-child { border-bottom: 0; }
.tree .nd .tw { width: 18px; height: 18px; display: grid; place-items: center; color: var(--soft); transition: none; }
.tree .nd .tw svg { width: 10px; height: 10px; }
.tree .nd b { font-weight: 500; flex: 1; }
.tree .nd .n { font-size: 12.5px; color: var(--soft); }
.tree .nd.l2 { padding-left: 46px; background: var(--subtle); }
.tree .nd.hv { background: var(--hover); }
.side { font-size: 12.5px; color: var(--soft); }
.side .bx { border: 1px solid var(--rule); border-radius: 12px; padding: 12px 14px; margin-bottom: 10px; }
.side .bx h4 { margin: 0 0 6px; font-size: 13px; color: var(--ink); }
.side .ch { display: inline-block; border: 1px solid var(--rule-strong); border-radius: 999px; padding: 2px 9px; color: var(--ink); font-size: 12px; margin: 0 4px 4px 0; }
.addg { margin-top: 10px; z-index: 7; display: flex; gap: 8px; align-items: center; position: relative; }
.addg .btn { height: 32px; font-size: 12.5px; }
.addg .btn.prs { background: var(--hover); }
.addg .in2 { width: 260px; height: 32px; border: 1.5px solid var(--ink); border-radius: 8px; display: none; align-items: center; padding: 0 10px; font-size: 13px; color: var(--ink); white-space: pre; box-shadow: 0 0 0 3px rgba(23,23,23,.08); }
.addg .in2 .c { width: 1.5px; height: 16px; background: var(--ink); }
.addg .menu { position: absolute; left: 0; top: 38px; width: 420px; z-index: 6; opacity: 0; }
.addg .menu .blk { color: #737373; display: block; }
.addg .menu .blk b { color: var(--soft); font-weight: 500; }
.addg .menu .why { display: block; font-size: 12px; color: #92400e; margin-top: 2px; white-space: normal; }
"""
TW = '<svg viewBox="0 0 10 10"><path d="M3 1.5L7 5 3 8.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>'
MAIN = f'''      <div class="view">
{head("Rebel Fleet", "Static", "Everyone who serves with the fleet · owned by Gen. Rieekan", ["Members", "Access", "Settings", "History"], "Members")}        <div class="seg" role="group" aria-label="Show"><span>Direct members<i>12</i></span><span class="on">Nested groups<i>4</i></span><span>Everyone<i>180</i></span></div>
        <div class="cols">
          <div>
            <div class="sum" id="sum">Includes 4 nested groups, <b>180 people</b> in total.</div>
            <div class="addg"><span class="btn" id="bAddG">Add a group</span><span class="in2" id="in2"><span id="q"></span><span class="c" id="cr"></span></span>
              <div class="menu" id="menu"><div class="blk" id="miA"><b>All Echo Base</b> · 412 people<span class="why">Can’t add: All Echo Base already includes Rebel Fleet, so this would make a loop.</span></div><div>All Echo Base contractors<span class="s"></span></div></div></div>
            <div class="tree" role="tree" aria-label="Nested groups">
              <div class="nd" role="treeitem" aria-level="1"><span class="tw">{TW}</span><b>Fleet</b><span class="n">82 people</span></div>
              <div class="nd" role="treeitem" aria-level="1" aria-expanded="false" id="ndR"><span class="tw" id="twR">{TW}</span><b>Rogue Squadron</b><span class="n">12 people · 2 nested groups</span></div>
              <div class="nd l2" role="treeitem" aria-level="2" id="ndR1" style="display:none"><span class="tw"></span><b>Red Squadron</b><span class="n">7 people</span></div>
              <div class="nd l2" role="treeitem" aria-level="2" id="ndR2" style="display:none"><span class="tw"></span><b>Gold Squadron</b><span class="n">5 people</span></div>
              <div class="nd" role="treeitem" aria-level="1"><span class="tw">{TW}</span><b>Shield Ops</b><span class="n">19 people</span></div>
              <div class="nd" role="treeitem" aria-level="1"><span class="tw">{TW}</span><b>Hangar crews</b><span class="n">55 people</span></div>
            </div>
          </div>
          <div class="side">
            <div class="bx"><h4>Access that flows down</h4>Everyone here, including nested groups, gets:<div style="margin-top:6px"><span class="ch">Console licence</span><span class="ch">View · Fleet briefings</span></div></div>
            <div class="bx"><h4>Rebel Fleet is part of</h4><span class="ch">All Echo Base · 412 people</span><div style="margin-top:4px">So it also gets what All Echo Base gives.</div></div>
          </div>
        </div>
      </div>'''
SCRIPT = r"""const { $, at, span, easeOut } = Motion;
const Q = "All Echo";

/* ---------- timeline (scene seconds) ---------- */
const T = {
  expClick: 1.50, addClick: 3.30, type: [3.55, 4.05], menu: [4.15, 6.40],
  endCard: [6.80, 7.25], end: 7.9
};

function build() {
  const r = at("twR"), cols = at("sum");
  $("ndR1").style.display = ""; $("ndR2").style.display = ""; const a = at("bAddG"); $("ndR1").style.display = "none"; $("ndR2").style.display = "none";
  const cur = [
    [0.00, 960, 640], [0.30, 960, 640], [1.30, r[0], r[1] + 2], [1.60, r[0], r[1] + 2], [2.60, r[0] + 220, r[1] + 40],
    [3.10, a[0], a[1] + 3], [3.40, a[0], a[1] + 3], [4.30, a[0] + 150, a[1] + 40], [6.80, a[0] + 152, a[1] + 42]
  ];
  const cam = [
    [0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00],
    [0.90, 740, 330, 1.18], [6.55, 740, 330, 1.18],     // one steady view: the tree, what flows down, and the add
    [6.80, 656, 360, 1.04]
  ];
  return { cam, cur };
}

function render(t) {
  const open = t >= T.expClick;
  $("ndR1").style.display = open ? "" : "none"; $("ndR2").style.display = open ? "" : "none";
  $("twR").style.transform = open ? "rotate(90deg)" : "";
  $("ndR").setAttribute("aria-expanded", String(open));
  $("ndR").classList.toggle("hv", t >= T.expClick - .3 && t < T.expClick + .5);
  const adding = t >= T.addClick;
  $("bAddG").style.display = adding ? "none" : "";
  $("in2").style.display = adding ? "flex" : "none";
  $("q").textContent = Q.slice(0, Math.round(Q.length * span(t, ...T.type, x => x)));
  $("cr").style.opacity = adding && Math.floor(t * 2.4) % 2 === 0 ? 1 : 0;
  const mo = span(t, T.menu[0], T.menu[0] + .15, easeOut) * (1 - span(t, T.menu[1] - .08, T.menu[1]));
  $("menu").style.opacity = mo;
}

function events() { return [["click", T.expClick], ["click", T.addClick], ["key", T.type[0]]]; }

Motion.scene({
  // natural length, within the 15 s cap
  T, clicks: [T.expClick, T.addClick], build, render, events,
  slow: [[1.7, 3.0, 1.6], [4.3, 6.3, 1.8]]
});"""
COMMENT = """  Source for media/groups-teams/nested-groups.mp4. Built by motion/_build/nested_groups.py on _build/shell.py and _build/group_page.py.
  Follows the Nested groups card (data/guidance-people.js):
  - direct members, nested groups and everyone are separate views, with "Includes 4 nested groups, 180 people in total" in words
  - a nested group expands in place, as a tree
  - what access flows down, and which group this one is part of
  - adding All Echo Base is blocked as a loop, with the reason"""
make("nested-groups", "Nested groups", COMMENT, CSS, "People / Groups / Rebel Fleet", "people", MAIN, SCRIPT)
