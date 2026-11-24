import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from fleet_page import make
comment = """  Source for media/mcp-connectors/sign-in-credentials.mp4.
  Built on motion/shared (console.css, connectors.css, motion.js) by motion/_build/sign_in.py, which reuses the
  Fleet Tracker page from choosing-tools so the header, tabs and Overview are the same pixels in every clip.

  Follows the Sign-in & credentials card (data/guidance-governance.js):
  - way in: the published connector's Sign-in tab; whose account it uses decides what the AI can reach (think 1)
  - three choices, each explained in a sentence before it's chosen; per-person recommended (do 1, do 2, WCAG 3.3.2, UD 1)
  - One org connection warns that actions show the shared account, not who asked, and needs a least-privilege
    account, never an admin's (avoid 1, avoid 3)
  - org-managed sign-in through the identity provider, tested (do 3, WCAG 3.3.8)
  - what each person sees when they connect, and which account they used (do 4)
  - the client secret masked, shown once (do 5); save confirmed in words (WCAG 4.1.3)"""
css = """/* Sign-in tab */
.sg { margin-top: 12px; display: grid; grid-template-columns: minmax(0, 1fr) 380px; gap: 18px; align-items: start; }
.opt { border: 1px solid var(--rule); border-radius: 10px; padding: 12px 14px; margin-bottom: 8px; display: grid; grid-template-columns: 18px 1fr; gap: 10px; font-size: 13px; }
.opt.sel { border-color: var(--ink); box-shadow: 0 0 0 1px var(--ink) inset; }
.opt .r { width: 16px; height: 16px; border-radius: 50%; border: 1.5px solid var(--rule-strong); position: relative; margin-top: 1px; }
.opt.sel .r { border-color: var(--ink); }
.opt.sel .r::after { content: ""; position: absolute; inset: 3px; border-radius: 50%; background: var(--ink); }
.opt b { font-weight: 600; }
.opt .tag { margin-left: 8px; }
.opt .d { color: var(--soft); margin-top: 3px; line-height: 1.45; }
.opt .more { margin-top: 10px; display: none; }
.opt .more .kv { margin-top: 0; }
.opt .note { margin-top: 10px; }
.opt .tr { margin-top: 10px; display: flex; gap: 10px; align-items: center; }
.pv { font-size: 13px; }
.pv .gr { margin-top: 10px; border: 1px solid var(--rule); border-radius: 10px; padding: 12px 14px; background: var(--subtle); }
.pv .gr .h { font-weight: 600; color: var(--ink); }
.pv ul { margin: 6px 0 0; padding: 0 0 0 16px; color: var(--ink); line-height: 1.55; }
.pv ul span { color: var(--soft); }
.pv .as { margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--rule); }
.pv .as .k { font-size: 12px; color: var(--faint); }
.pv .as .v { color: var(--ink); margin-top: 2px; position: relative; height: 18px; }
.pv .as .v > span { position: absolute; left: 0; top: 0; white-space: nowrap; }
.sec { margin-top: 12px; }
.sec .kv { margin-top: 8px; }
.sec .mask { letter-spacing: .08em; }
.sec .hint { font-size: 12px; color: var(--faint); margin-top: 2px; }"""
section = """        <div id="sgn" style="display:none">
          <div class="info" id="info"><span>Whose account Fleet Tracker uses decides what the AI can reach. <b>Choose it before people connect.</b></span>
            <span class="sp" id="bar" style="opacity:0"><span class="chg">1 change</span><span class="btn sm ghost">Cancel</span><span class="btn sm pri" id="saveB">Save</span></span></div>
          <div class="sg">
            <div id="opts">
              <div class="opt" id="o1"><span class="r"></span><div><div><b>Each person signs in</b><span class="tag dk">Recommended</span></div>
                <div class="d">Each person connects their own Fleet Tracker account. The AI sees only what they can see, and their name is on every action.</div></div></div>
              <div class="opt" id="o2"><span class="r"></span><div><div><b>Org-managed sign-in</b></div>
                <div class="d">People get access on first login through Holonet ID, your identity provider. Access follows their groups, with no separate prompt.</div>
                <div class="more" id="m2"><dl class="kv"><div><dt>Identity provider</dt><dd>Holonet ID</dd></div><div><dt>Groups</dt><dd>Synced · Logistics</dd></div></dl>
                  <div class="tr"><span class="btn sm" id="testB">Run test</span><span class="ok" id="tok" style="opacity:0"><i><svg width="9" height="9"><use href="#tick"/></svg></i>Signed in as a test user through Holonet ID</span></div></div></div></div>
              <div class="opt" id="o3"><span class="r"></span><div><div><b>One org connection</b></div>
                <div class="d">Everyone uses one shared account. The AI can reach everything that account can.</div>
                <div class="note" id="w3" style="display:none"><span class="ic">!</span><span><b>Actions will show fleet-svc, not the person who asked.</b> Use a least-privilege service account, never an admin’s.</span></div></div></div>
            </div>
            <div>
              <div class="card pv" id="pv"><h2>What people see when they connect</h2>
                <div class="gr"><div class="h">Fleet Tracker will be able to</div>
                  <ul><li>Find ships and read manifests</li><li>Change manifests and reroute ships <span>· asks you first</span></li></ul>
                  <div class="as"><div class="k">Connected as</div><div class="v"><span id="as1">w.antilles@echobase · signs in once</span><span id="as2" style="opacity:0">w.antilles@echobase · through Holonet ID</span></div></div></div></div>
              <div class="card sec" id="sec"><h2>Client credentials</h2>
                <dl class="kv"><div><dt>Client ID</dt><dd class="mono">fleet-echobase-7c1</dd></div>
                  <div><dt>Client secret</dt><dd><span class="mono mask">••••••••3f9a</span><div class="hint">Shown once, when it was added</div></dd></div></dl></div>
            </div>
          </div>
        </div>"""
toast = """    <div class="toast" id="toast"><i><svg width="11" height="11"><use href="#tick"/></svg></i>Sign-in saved · Logistics connects through Holonet ID at next login · logged</div>"""
script = r"""const { $, at, span, easeOut } = Motion;

const T = {
  tabClick: 1.90, toS: [2.0, 2.3],
  o3Click: 5.00, o2Click: 7.40, testClick: 9.00, tested: 9.55, saveClick: 11.40, saved: 11.60, toastOut: [13.2, 13.5],
  endCard: [14.2, 14.65], end: 15.7
};

function build() {
  const tb = at("tbS");
  $("ovw").style.display = "none"; $("sgn").style.display = "";
  const o3 = at("o3"), o1 = at("o1"), pv = at("pv"), sc = at("sec"), inf = at("info");
  $("m2").style.display = "block";
  const o2 = at("o2"), ts = at("testB"), sv = at("saveB");
  $("m2").style.display = "";
  $("ovw").style.display = ""; $("sgn").style.display = "none";
  const cur = [
    [0, 900, 600], [0.5, 900, 600], [1.75, tb[0], tb[1] + 3], [2.05, tb[0], tb[1] + 3],
    [4.0, o3[0] - 120, o3[1] - 60], [4.85, o3[0] - 200, o3[1] - 20], [5.15, o3[0] - 200, o3[1] - 20],
    [7.25, o2[0] - 200, o2[1] - 60], [7.55, o2[0] - 200, o2[1] - 60],
    [8.85, ts[0], ts[1] + 3], [9.15, ts[0], ts[1] + 3],
    [11.25, sv[0], sv[1] + 3], [11.55, sv[0], sv[1] + 3], [13.0, 1010, 560], [14.2, 1014, 566]
  ];
  const cam = [
    [0, 700, 372, 1.04], [0.6, 700, 372, 1.04],                                // the published page, as the other clips end
    [1.5, 640, 220, 1.4], [2.1, 640, 220, 1.4],                                 // the Sign-in tab
    [2.9, 740, o1[1] + 90, 1.22], [4.3, 740, o1[1] + 90, 1.22],             // three choices, each explained; per-person recommended
    [5.0, 740, Math.min(o2[1] + 40, 405), 1.22], [6.6, 740, Math.min(o2[1] + 40, 405), 1.22],             // one org connection: the warning
    [7.4, 740, Math.min(o2[1] + 10, 405), 1.22], [9.8, 740, Math.min(o2[1] + 10, 405), 1.22],             // org-managed sign-in, tested
    [10.4, pv[0], pv[1] + 110, 1.4], [11.0, pv[0], pv[1] + 110, 1.4],         // what people see; the masked secret
    [11.3, 960, inf[1] + 40, 1.4], [11.7, 960, inf[1] + 40, 1.4],             // Save
    [12.3, 700, 360, 1.04], [13.6, 700, 360, 1.04], [14.2, 660, 360, 1.02]
  ];
  return { cam, cur };
}

function render(t) {
  const s = t >= T.toS[0];
  $("ovw").style.display = s ? "none" : ""; $("sgn").style.display = s ? "" : "none";
  $("sgn").style.opacity = span(t, ...T.toS);
  $("tbO").classList.toggle("on", !s); $("tbS").classList.toggle("on", s);

  const pick = t >= T.o2Click ? 2 : t >= T.o3Click ? 3 : 1;
  [1, 2, 3].forEach(i => $("o" + i).classList.toggle("sel", pick === i));
  $("w3").style.display = pick === 3 ? "" : "none";
  $("m2").style.display = pick === 2 ? "block" : "none";
  $("testB").style.background = t >= T.testClick - .05 && t < T.tested ? "#f2f2f2" : "";
  $("testB").textContent = t >= T.testClick && t < T.tested ? "Testing…" : "Run test";
  $("tok").style.opacity = span(t, T.tested, T.tested + .2);
  const viaIdp = span(t, T.o2Click + .1, T.o2Click + .4);
  $("as1").style.opacity = 1 - viaIdp; $("as2").style.opacity = viaIdp;
  const saved = t >= T.saved;
  $("bar").style.opacity = pick !== 1 && !saved ? 1 : 0;
  $("saveB").style.background = t >= T.saveClick - .05 && t < T.saved + .1 ? "#333" : "";
  const to = span(t, T.saved, T.saved + .25, easeOut) * (1 - span(t, ...T.toastOut));
  $("toast").style.opacity = to; $("toast").style.transform = `translateX(-50%) translateY(${(1 - to) * -8}px)`;
}

function events() {
  return [["click", T.tabClick], ["click", T.o3Click], ["click", T.o2Click], ["click", T.testClick], ["chime", T.tested], ["click", T.saveClick], ["chime", T.saved]];
}

Motion.scene({
  T, duration: 15, clicks: [T.tabClick, T.o3Click, T.o2Click, T.testClick, T.saveClick], clamp: 140, build, render, events,
  slow: [[2.6, 4.3, 1.8], [5.1, 6.6, 1.7], [9.6, 10.9, 1.6], [11.7, 13.0, 1.3]]
});"""
make("sign-in-credentials", "Sign-in & credentials", comment, css, section, toast, script)
print("ok")
