import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from tables_page import make

CSS = r"""
.scr { position: absolute; left: 0; right: 0; top: 52px; bottom: 0; background: rgba(23,23,23,.32); opacity: 0; z-index: 30; }
.dl { position: absolute; left: 320px; top: 154px; width: 560px; z-index: 31; background: var(--bg); border-radius: 14px; box-shadow: 0 24px 60px rgba(0,0,0,.22); padding: 18px 22px; font-size: 12.5px; color: var(--soft); opacity: 0; visibility: hidden; box-sizing: border-box; }
.dl h3 { margin: 0; font-size: 16px; color: var(--ink); font-weight: 600; }
.dl .f1 { margin-top: 14px; }
.dl .lbl { display: block; font-size: 12.5px; color: var(--ink); font-weight: 500; margin-bottom: 5px; }
.dl .lbl span { color: var(--soft); font-weight: 400; }
.dl .em { min-height: 40px; border: 1.5px solid var(--ink); border-radius: 8px; padding: 5px 8px; display: flex; flex-wrap: wrap; gap: 6px; align-items: center; box-sizing: border-box; color: var(--faint); font-size: 13px; }
.dl .em .c { width: 1.5px; height: 17px; background: var(--ink); }
.dl .chp { display: inline-flex; gap: 6px; align-items: center; border: 1px solid var(--rule-strong); border-radius: 999px; padding: 2px 9px; font-size: 12.5px; color: var(--ink); }
.dl .chp svg { width: 13px; height: 13px; }
.dl .chp.w { border-color: #b45309; } .dl .chp.e { border-color: #b91c1c; }
.dl .chk { margin-top: 8px; display: none; }
.dl .chk div { display: flex; gap: 8px; align-items: center; padding: 3px 0; color: var(--ink); }
.dl .chk div svg { width: 14px; height: 14px; flex: none; }
.dl .chk a { text-decoration: underline; text-underline-offset: 3px; }
.dl .two { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.dl .sel { height: 36px; border: 1.5px solid var(--rule-strong); border-radius: 8px; display: flex; align-items: center; justify-content: space-between; padding: 0 11px; color: var(--ink); font-size: 13px; }
.dl .nx3 { margin-top: 12px; background: var(--subtle); border-radius: 8px; padding: 8px 10px; color: var(--ink); line-height: 1.45; }
.dl .ft { margin-top: 16px; display: flex; gap: 8px; } .dl .ft .sp { flex: 1; } .dl .ft .btn { height: 34px; }
.dl .btn.dis { color: var(--faint); border-color: var(--rule); background: var(--subtle); }
.dl .dn4 { display: none; }
.dl .dn4 .ok3 { display: flex; gap: 8px; align-items: center; color: var(--ink); font-size: 14px; font-weight: 600; }
.dl .dn4 .ok3 svg { width: 18px; height: 18px; }
.dl .dn4 .nxt { margin-top: 12px; display: flex; gap: 8px; }
"""
OK = '<svg aria-hidden="true" viewBox="0 0 16 16" style="color:#15803d"><circle cx="8" cy="8" r="6.6" fill="currentColor"/><path d="M5 8.3l2 2 4-4.3" fill="none" stroke="#fff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>'
WN = '<svg aria-hidden="true" viewBox="0 0 16 16" style="color:#b45309"><path d="M8 1.8L15 14H1z" fill="currentColor"/><path d="M8 6.2v3.6" stroke="#fff" stroke-width="1.7" stroke-linecap="round"/><circle cx="8" cy="11.9" r="1" fill="#fff"/></svg>'
ER = '<svg aria-hidden="true" viewBox="0 0 16 16" style="color:#b91c1c"><circle cx="8" cy="8" r="6.6" fill="currentColor"/><path d="M8 4.6v4.1" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/><circle cx="8" cy="11.2" r="1.05" fill="#fff"/></svg>'
EXTRA = f'''    <div class="scr" id="scr"></div>
    <section class="dl" id="dl" role="dialog" aria-labelledby="iT">
      <div id="s1"><h3 id="iT">Invite people</h3>
        <div class="f1"><label class="lbl" for="em">Email addresses <span>· paste several, separated by commas</span></label>
          <div class="em" id="em"><span id="emPh">name@echobase.org</span><span class="chp" id="c1" style="display:none">{OK}wedge@echobase.org</span><span class="chp e" id="c2" style="display:none">{ER}biggs@echobase.org ✕</span><span class="chp w" id="c3" style="display:none">{WN}han@smuggler.io</span><span class="c" id="emC"></span></div>
          <div class="chk" id="chk" aria-live="polite"><div>{ER}<span><b>biggs@echobase.org</b> is already in Echo Base. <a>Open Biggs Darklighter</a> or remove it.</span></div><div>{WN}<span><b>han@smuggler.io</b> isn’t on a verified domain. He’ll join as a guest.</span></div></div></div>
        <div class="f1 two"><div><span class="lbl">Role</span><span class="sel">Member<i class="cv"></i></span></div><div><span class="lbl">Group</span><span class="sel">Fleet<i class="cv"></i></span></div></div>
        <div class="nx3" id="nx3">Each person uses a seat when they accept: 36 left. They get an email, and the invite expires in 7 days.</div>
        <div class="ft"><span class="sp"></span><span class="btn">Cancel</span><span class="btn pri dis" id="bSd">Send invites</span></div></div>
      <div class="dn4" id="s2" role="status"><div class="ok3">{OK}Invitations sent to 2 people</div><div style="margin-top:6px">wedge@echobase.org and han@smuggler.io, as a guest. Biggs was left out: he’s already here.</div>
        <div class="nxt"><span class="btn">Invite more</span><span class="btn">Add them to a group</span><span class="btn">View pending invites</span><span style="flex:1"></span><span class="btn pri">Done</span></div></div>
    </section>'''
def edit(s):
    return s.replace('<div class="hd"><h1>People</h1><span class="btn sm pri">Invite people</span></div>', '<div class="hd"><h1>People</h1><span class="btn sm pri" id="bInv">Invite people</span></div>', 1)
SCRIPT = r"""const { $, at, span, easeOut } = Motion;

/* ---------- timeline (scene seconds) ---------- */
const T = { iClick: 1.10, open: [1.15, 1.40], paste: 2.30, chk: 2.60, xClick: 4.30, sClick: 5.40, s2: 5.50, endCard: [8.00, 8.45], end: 8.95 };

function build() {
  const i = at("bInv");
  $("dl").style.opacity = 1; $("dl").style.visibility = "visible";
  ["c1", "c2", "c3"].forEach(c => $(c).style.display = "inline-flex"); $("chk").style.display = "block";
  const x = at("c2", 66, 0), s = at("bSd");
  ["c1", "c2", "c3"].forEach(c => $(c).style.display = ""); $("chk").style.display = "";
  $("dl").style.opacity = 0; $("dl").style.visibility = "";
  const cur = [[0.00, 960, 640], [0.25, 960, 640], [0.80, i[0], i[1] + 3], [1.15, i[0], i[1] + 3], [1.90, x[0] - 40, x[1] - 40],
    [4.00, x[0], x[1] + 3], [4.35, x[0], x[1] + 3], [5.10, s[0], s[1] + 3], [5.45, s[0], s[1] + 3], [8.00, s[0] - 200, s[1] + 40]];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 345, 1.04], [7.75, 650, 345, 1.04], [8.00, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  const o = span(t, ...T.open, easeOut);
  $("dl").style.opacity = o; $("scr").style.opacity = o; $("dl").style.visibility = o > 0 ? "visible" : "hidden";
  $("dl").style.transform = `translateY(${8 * (1 - o)}px)`;
  // pasted emails become chips, each checked on its own
  const p = t >= T.paste, x = t >= T.xClick;
  $("emPh").style.display = p ? "none" : ""; $("emC").style.opacity = t >= T.open[1] && t < T.sClick && Math.floor(t * 2.4) % 2 === 0 ? 1 : 0;
  $("c1").style.display = p ? "inline-flex" : "none"; $("c3").style.display = p ? "inline-flex" : "none"; $("c2").style.display = p && !x ? "inline-flex" : "none";
  $("chk").style.display = t >= T.chk ? "block" : "none";
  $("chk").firstElementChild.style.display = x ? "none" : "flex";
  $("bSd").className = "btn pri" + (t < T.chk ? " dis" : "") + (t >= T.sClick - .05 && t < T.s2 ? " dn" : "");
  $("bSd").textContent = x ? "Send 2 invites" : t >= T.chk ? "Send 3 invites" : "Send invites";
  // sent: announced, with the next likely steps
  const d = t >= T.s2;
  $("s1").style.display = d ? "none" : "block"; $("s2").style.display = d ? "block" : "none";
  $("dl").style.top = (d ? Math.round(340 - $("dl").offsetHeight / 2) : 154) + "px";  // centred: on the full form, then on the shorter confirmation
}

function events() { return [["click", T.iClick], ["whoosh", T.open[0]], ["key", T.paste], ["click", T.xClick], ["click", T.sClick]]; }

Motion.scene({
  // under 5 steps: natural length, within the 10 s cap
  T, clicks: [T.iClick, T.xClick, T.sClick], build, render, events, duration: 9.8
});"""
COMMENT = """  Source for media/user-management/invite-user.mp4. Built by motion/_build/invite_user.py on _build/tables_page.py
  (People › Users), with the top bar's alerts bell.
  Follows the Invite / add user card (data/guidance.js):
  - several emails at once, each checked: an existing account links to it; another domain joins as a guest
  - a role and group with visible defaults; the seat and the invite's expiry said before sending
  - sent is announced, with the next likely steps"""
make("invite-user", "Invite / add user", COMMENT, CSS, EXTRA, "", SCRIPT, edit=edit)
