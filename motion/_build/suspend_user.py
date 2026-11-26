import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from user_page import make, page, OK, WN

CSS = r"""
.dlg .ef { margin-top: 10px; }
.dlg .ef div { display: flex; gap: 8px; align-items: flex-start; padding: 3px 0; color: var(--ink); line-height: 1.4; }
.dlg .ef svg { width: 14px; height: 14px; flex: none; margin-top: 2px; }
.dlg .f1 { margin-top: 14px; }
.btn.pri.dis { background: var(--subtle); color: var(--faint); border-color: var(--rule); }
.btn.redp { background: #b91c1c; border-color: #b91c1c; color: #fff; }
"""
X = '<svg aria-hidden="true" viewBox="0 0 16 16" style="color:var(--ink)"><circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5.6 5.6l4.8 4.8M10.4 5.6l-4.8 4.8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>'
EXTRA = f'''    <div class="scr" id="scr"></div>
    <section class="dlg" id="dlg" role="dialog" aria-labelledby="dT" style="left:400px; top:90px; width:520px">
      <h3 id="dT">Suspend Zev Senesca?</h3>
      <div class="ef"><div>{X}<span>He can’t sign in. His 1 session ends now and his 2 API tokens are revoked.</span></div>
        <div>{OK}<span>His files, shared links and group memberships keep working.</span></div>
        <div>{WN}<span>His license stays assigned until you free it.</span></div>
        <div>{OK}<span>You can reactivate him any time, in one step.</span></div></div>
      <div class="f1"><label class="lbl" for="fR">Reason <span>· required, shown on his page and in the audit log</span></label><div class="in" id="fR"><span id="fRv"></span><span class="c" id="fRc"></span></div></div>
      <div class="ft"><span class="sp"></span><span class="btn">Cancel</span><span class="btn pri dis" id="bOk">Suspend Zev</span></div>
    </section>'''
TOAST = '      <div class="toast" id="toast"><i><svg width="11" height="11"><use href="#ok"/></svg></i>Zev Senesca is suspended · signed out everywhere</div>'
SCRIPT = r"""const { $, at, span, easeOut } = Motion;
const WHY = "Extended leave";

/* ---------- timeline (scene seconds) ---------- */
const T = { sClick: 1.10, open: [1.15, 1.40], rClick: 3.30, type: [3.45, 4.15], okClick: 5.00, close: [5.05, 5.25], toast: [5.30, 6.70], endCard: [7.10, 7.55], end: 8.05 };

function build() {
  const s = at("bSu");
  $("dlg").style.opacity = 1; const r = at("fR", -80, 0), ok = at("bOk"); $("dlg").style.opacity = 0;
  const cur = [[0.00, 960, 640], [0.25, 960, 640], [0.75, s[0], s[1] + 3], [1.15, s[0], s[1] + 3], [2.95, r[0], r[1] + 3], [3.35, r[0], r[1] + 3],
    [4.65, ok[0], ok[1] + 3], [5.05, ok[0], ok[1] + 3], [7.10, 560, 300]];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 345, 1.04], [6.85, 650, 345, 1.04], [7.10, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  $("bSu").classList.toggle("dn", t >= T.sClick - .05 && t < T.open[0] + .1);
  const o = span(t, ...T.open, easeOut) * (1 - span(t, ...T.close, easeOut));
  $("dlg").style.opacity = o; $("scr").style.opacity = o; $("dlg").style.visibility = o > 0 ? "visible" : "hidden";
  $("dlg").style.transform = `translateY(${8 * (1 - o)}px)`;
  // what suspending does, said first; a reason is required
  const n = Math.round(WHY.length * span(t, ...T.type, x => x));
  $("fRv").textContent = WHY.slice(0, n);
  const on = t >= T.rClick && t < T.okClick;
  $("fR").className = "in" + (on ? " f" : ""); $("fRc").style.opacity = on && (t < T.type[1] + .05 || Math.floor(t * 2.4) % 2 === 0) ? 1 : 0;
  $("bOk").className = "btn " + (n < 3 ? "pri dis" : "redp") + (t >= T.okClick - .05 && t < T.close[0] ? " dn" : "");
  // suspended: who, when and why on his page, and one step back
  const d = t >= T.close[0];
  $("stP").classList.toggle("sus", d); $("stT").textContent = d ? "Suspended" : "Active";
  $("ban2").style.display = d ? "flex" : "none";
  ["bRs", "bEd", "bSu"].forEach(i => $(i).style.display = d ? "none" : "");
  $("vSes").textContent = d ? "Signed out · 2 tokens revoked" : "1 session · 2 API tokens";
  $("toast").style.opacity = span(t, T.toast[0], T.toast[0] + .2) * (1 - span(t, T.toast[1] - .2, T.toast[1]));
}

function events() { return [["click", T.sClick], ["whoosh", T.open[0]], ["click", T.rClick], ["key", T.type[0]], ["click", T.okClick], ["pop", T.toast[0]]]; }

Motion.scene({
  // under 5 steps: natural length, within the 10 s cap
  T, clicks: [T.sClick, T.rClick, T.okClick], build, render, events, duration: 9.8
});"""
COMMENT = """  Source for media/user-management/suspend-user.mp4. Built by motion/_build/suspend_user.py on _build/user_page.py
  (People › Users › Zev Senesca), with the top bar's alerts bell.
  Follows the Suspend / deactivate card (data/guidance.js):
  - what suspending does, in plain words, before she commits: sign-in blocked, sessions ended and tokens revoked;
    files and links kept; the license kept until freed
  - a reason, required, shown on his page and in the audit log
  - who suspended him, when and why, on his page; reactivating is one step"""
make("suspend-user", "Suspend / deactivate", COMMENT, CSS, page(), SCRIPT, extra=EXTRA, toast=TOAST)
