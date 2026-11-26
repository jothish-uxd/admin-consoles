import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from user_page import make, OK, WN

CSS = r"""
.ih { margin-top: 6px; display: flex; align-items: baseline; gap: 10px; }
.ih h1 { margin: 0; font-size: 22px; } .ih span { color: var(--soft); font-size: 13px; } .ih .sp { flex: 1; }
.chs2 { margin-top: 12px; display: flex; gap: 6px; align-items: center; }
.chs2 .c2 { height: 30px; display: inline-flex; align-items: center; gap: 6px; padding: 0 12px; border-radius: 999px; border: 1px solid var(--rule-strong); color: var(--ink); font-size: 12.5px; }
.chs2 .c2.on { background: var(--ink); color: #fff; border-color: var(--ink); }
.chs2 .c2 i { font-style: normal; font-size: 11px; opacity: .75; font-family: "Geist Mono", monospace; }
.chs2 .nt { margin-left: auto; color: var(--soft); font-size: 12px; }
table.sx { width: 100%; table-layout: fixed; border-collapse: collapse; font-size: 12.5px; margin-top: 10px; }
table.sx th { text-align: left; font-size: 12px; color: var(--soft); font-weight: 500; padding: 0 8px 8px; border-bottom: 1px solid var(--rule); white-space: nowrap; }
table.sx td { height: 44px; padding: 0 8px; border-bottom: 1px solid var(--rule); color: var(--soft); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
table.sx td b { display: block; color: var(--ink); font-weight: 500; font-size: 13px; }
table.sx td.ck { width: 26px; } table.sx tr.sel td { background: var(--subtle); }
table.sx td.ra { text-align: right; position: relative; overflow: visible; }
.kb { width: 28px; height: 28px; border-radius: 7px; display: inline-grid; place-items: center; color: var(--ink); font-size: 15px; letter-spacing: 1px; }
.kb.on { background: var(--hover); }
.stx { display: inline-flex; gap: 5px; align-items: center; color: var(--ink); font-weight: 500; }
.stx svg { width: 13px; height: 13px; flex: none; }
.sbar3 { display: none; margin-top: 10px; height: 42px; border-radius: 10px; background: var(--ink); color: #fff; align-items: center; gap: 10px; padding: 0 8px 0 14px; font-size: 13px; }
.sbar3 .sp { flex: 1; } .sbar3 .btn { height: 30px; background: #fff; color: var(--ink); border-color: #fff; }
.rmn { position: absolute; right: 8px; top: 38px; width: 200px; z-index: 20; display: none; text-align: left; }
.rmn .it { color: var(--ink); } .rmn .it.red { color: #b91c1c; }
.rmn .sepx { height: 1px !important; min-height: 0 !important; padding: 0 !important; background: var(--rule) !important; margin: 6px 4px; }
.vx { display: none; }
"""
PEND = '<svg aria-hidden="true" viewBox="0 0 16 16" style="color:var(--soft)"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 4.8V8l2.2 1.4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>'
ER = '<svg aria-hidden="true" viewBox="0 0 16 16" style="color:#b91c1c"><circle cx="8" cy="8" r="6.6" fill="currentColor"/><path d="M8 4.6v4.1" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/><circle cx="8" cy="11.2" r="1.05" fill="#fff"/></svg>'
WNI = '<svg aria-hidden="true" viewBox="0 0 16 16" style="color:#b45309"><path d="M8 1.8L15 14H1z" fill="currentColor"/><path d="M8 6.2v3.6" stroke="#fff" stroke-width="1.7" stroke-linecap="round"/><circle cx="8" cy="11.9" r="1" fill="#fff"/></svg>'
HEAD = '<thead><tr><th class="ck" style="width:34px"><span class="cb" id="cAll{}"></span></th><th style="width:25%">Invited</th><th style="width:13%">Sent by</th><th style="width:19%">Status</th><th>Expires</th><th style="width:11%">Seat</th><th style="width:40px"></th></tr></thead>'
def row(i, em, who, by, st, exp, seat, extra=""):
    return f'<tr id="{i}"><td class="ck"><span class="cb" id="{i}-c"></span></td><td><b>{em}</b>{who}</td><td>{by}</td><td id="{i}-s">{st}</td><td id="{i}-e">{exp}</td><td>{seat}</td><td class="ra"><span class="kb" id="{i}-k" aria-label="Actions for {em}">⋯</span>{extra}</td></tr>'
P = lambda: f'<span class="stx">{PEND}Pending</span>'
X = lambda d: f'<span class="stx">{WNI}Expired</span><span style="display:block;font-size:11.5px">{d}</span>'
ALL = (row("a1", "wedge@echobase.org", "Member · Fleet", "You", P(), "Dec 3 · in 7 days", "On accept")
       + row("a2", "han@smuggler.io", "Guest · Fleet", "You", P(), "Dec 3 · in 7 days", "No, guest")
       + row("a3", "jyn@echobase.org", "Member · Intelligence", "Toryn Farr", X("Nov 20 · 6 days ago"), "—", "On accept")
       + row("a4", "chirrut@echobase.org", "Member · Fleet", "Cal Alder", f'<span class="stx">{ER}Bounced</span><span style="display:block;font-size:11.5px">Mailbox doesn’t exist</span>', "—", "No"))
EXP = "".join(row(f"e{k}", em, w, by, X(d), "—", "On accept") for k, (em, w, by, d) in enumerate([
    ("jyn@echobase.org", "Member · Intelligence", "Toryn Farr", "Nov 20 · 6 days ago"), ("bodhi@echobase.org", "Member · Fleet", "Cal Alder", "Nov 19 · 7 days ago"),
    ("kes@echobase.org", "Member · Fleet", "Cal Alder", "Nov 15 · 11 days ago"), ("luthen@echobase.org", "Member · Command", "Mon Mothma", "Nov 9 · 17 days ago")], 1))
MENU = '<div class="menu rmn" id="rmn"><div class="it">Fix email and resend</div><div class="it">Copy invite link</div><div class="sepx"></div><div class="it red" id="oRv">Revoke invite</div></div>'
BNC = row("b1", "chirrut@echobase.org", "Member · Fleet", "Cal Alder", f'<span class="stx">{ER}Bounced</span><span style="display:block;font-size:11.5px">Mailbox doesn’t exist</span>', "—", "No", MENU)
MAIN = f'''      <div class="view">
        <div class="bk">← Users</div>
        <div class="ih"><h1>Pending invites</h1><span id="tot">14 people haven’t joined yet</span><span class="sp"></span><span class="btn sm pri">Invite people</span></div>
        <div class="chs2"><span class="c2 on" id="fA">All <i id="nA">14</i></span><span class="c2">Pending <i id="nP">9</i></span><span class="c2" id="fE">Expired <i id="nE">4</i></span><span class="c2" id="fB">Bounced <i id="nB">1</i></span>
          <span class="nt">Not counted as active people · a seat is used when someone accepts</span></div>
        <div class="sbar3" id="sb"><span>4 selected</span><span class="sp"></span><span class="btn">Revoke</span><span class="btn" id="bRs">Resend 4</span></div>
        <table class="sx" id="tA">{HEAD.format("A")}<tbody>{ALL}</tbody></table>
        <table class="sx vx" id="tE">{HEAD.format("")}<tbody>{EXP}</tbody></table>
        <table class="sx vx" id="tB">{HEAD.format("B")}<tbody>{BNC}</tbody></table>
        <div class="vx" id="none" style="margin-top:12px;padding:14px;border:1px dashed var(--rule-strong);border-radius:10px;text-align:center;color:var(--ink)">No bounced invites <span style="color:var(--soft)">· chirrut@echobase.org was revoked just now</span></div>
      </div>
'''
TOAST = '      <div class="toast" id="toast"><i><svg width="11" height="11"><use href="#ok"/></svg></i><span id="tT">4 invites resent · they now expire Dec 3</span></div>'
SCRIPT = r"""const { $, at, span, easeOut } = Motion;

/* ---------- timeline (scene seconds) ---------- */
const T = { eClick: 1.00, aClick: 1.90, rClick: 2.80, rs: 2.90, toast: [2.95, 4.20], bClick: 4.80, kClick: 5.70, vClick: 6.50, toast2: [6.60, 8.00], endCard: [8.30, 8.75], end: 9.25 };

function build() {
  const e = at("fE"), b = at("fB");
  ["tA"].forEach(i => $(i).style.display = "none"); $("tE").style.display = "table"; const a = at("cAll"); $("sb").style.display = "flex"; const r = at("bRs"); $("sb").style.display = ""; $("tE").style.display = "";
  $("tB").style.display = "table"; const k = at("b1-k"); $("rmn").style.display = "block"; const v = at("oRv", -30, 0); $("rmn").style.display = ""; $("tB").style.display = ""; $("tA").style.display = "";
  const cur = [[0.00, 960, 640], [0.25, 960, 640], [0.70, e[0], e[1] + 3], [1.05, e[0], e[1] + 3], [1.60, a[0], a[1] + 3], [1.95, a[0], a[1] + 3],
    [2.50, r[0], r[1] + 3], [2.85, r[0], r[1] + 3], [4.50, b[0], b[1] + 3], [4.85, b[0], b[1] + 3], [5.40, k[0], k[1] + 3], [5.75, k[0], k[1] + 3],
    [6.20, v[0], v[1] + 3], [6.55, v[0], v[1] + 3], [8.30, v[0] - 400, v[1] + 120]];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 345, 1.04], [8.05, 650, 345, 1.04], [8.30, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  $("crumb").innerHTML = "/ People / Users / <b>Pending invites</b>";
  const f = t >= T.bClick ? "B" : t >= T.eClick ? "E" : "A", rs = t >= T.rs, rv = t >= T.vClick;
  $("fA").classList.toggle("on", f === "A"); $("fE").classList.toggle("on", f === "E"); $("fB").classList.toggle("on", f === "B");
  $("tA").style.display = f === "A" ? "table" : "none"; $("tE").style.display = f === "E" ? "table" : "none";
  $("tB").style.display = f === "B" && !rv ? "table" : "none"; $("none").style.display = f === "B" && rv ? "block" : "none";
  // select the expired ones and resend them together
  const s = t >= T.aClick && !rs;
  $("cAll").classList.toggle("on", s && f === "E");
  [1, 2, 3, 4].forEach(k => { $(`e${k}-c`).classList.toggle("on", s); $(`e${k}`).classList.toggle("sel", s);
    $(`e${k}-s`).innerHTML = rs ? '<span class="stx">Pending</span><span style="display:block;font-size:11.5px">Resent just now</span>' : $(`e${k}-s`).dataset.o || ($(`e${k}-s`).dataset.o = $(`e${k}-s`).innerHTML);
    $(`e${k}-e`).textContent = rs ? "Dec 3 · in 7 days" : "—"; });
  $("sb").style.display = s && f === "E" ? "flex" : "none";
  $("nE").textContent = rs ? "0" : "4"; $("nP").textContent = rs ? "13" : "9"; $("nB").textContent = rv ? "0" : "1"; $("nA").textContent = rv ? "13" : "14"; $("tot").textContent = rv ? "13 people haven’t joined yet" : "14 people haven’t joined yet";
  // a bounced invite says why; revoking it is in its menu, set apart
  $("rmn").style.display = t >= T.kClick && t < T.vClick ? "block" : "none"; $("b1-k").classList.toggle("on", t >= T.kClick && t < T.vClick);
  $("oRv").classList.toggle("hov", t >= T.vClick - .3);
  $("tT").textContent = t >= T.toast2[0] ? "Invite to chirrut@echobase.org revoked" : "4 invites resent · they now expire Dec 3";
  $("toast").style.opacity = Math.max(span(t, T.toast[0], T.toast[0] + .2) * (1 - span(t, T.toast[1] - .2, T.toast[1])), span(t, T.toast2[0], T.toast2[0] + .2) * (1 - span(t, T.toast2[1] - .2, T.toast2[1])));
}

function events() { return [["click", T.eClick], ["click", T.aClick], ["click", T.rClick], ["pop", T.toast[0]], ["click", T.bClick], ["click", T.kClick], ["click", T.vClick], ["pop", T.toast2[0]]]; }

Motion.scene({
  // 5+ steps: natural length, within the 15 s cap
  T, clicks: [T.eClick, T.aClick, T.rClick, T.bClick, T.kClick, T.vClick], build, render, events, duration: 14.5
});"""
COMMENT = """  Source for media/user-management/pending-invites.mp4. Built by motion/_build/pending_invites.py on _build/user_page.py
  (People › Users › Pending invites), with the top bar's alerts bell.
  Follows the Pending invites card (data/guidance.js):
  - invites as rows: who sent them, status (pending, expired, bounced), expiry as a date and days left, and whether a seat is held
  - not counted as active people
  - filter and resend expired ones together; a bounced invite says why, with fix, copy link and revoke in its menu"""
make("pending-invites", "Pending invites", COMMENT, CSS, MAIN, SCRIPT, toast=TOAST, crumb="People / Users / Pending invites")
