import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from settings_org import make
CSS = r"""
.scrim2 { position: absolute; inset: 52px 0 0 0; background: rgba(0,0,0,.18); opacity: 0; z-index: 30; }
.dlg { position: absolute; left: 470px; top: 150px; width: 480px; background: var(--bg); border: 1px solid var(--rule-strong); border-radius: 14px; box-shadow: 0 20px 60px rgba(0,0,0,.2); padding: 20px 22px; z-index: 31; opacity: 0; font-size: 13px; color: var(--soft); line-height: 1.45; }
.dlg h3 { margin: 0; font-size: 17px; color: var(--ink); }
.dlg .imp { margin-top: 12px; border: 1px solid var(--rule-strong); border-radius: 10px; padding: 10px 12px; }
.dlg .imp b { color: var(--ink); font-weight: 600; }
.dlg .p { margin-top: 10px; }
.dlg .r { margin-top: 16px; display: flex; gap: 8px; justify-content: flex-end; }
.dlg .btn { height: 36px; }
.dlg .btn.fr { box-shadow: 0 0 0 2px var(--bg), 0 0 0 4px var(--ink); }
.btn.dgr.dn { background: #b91c1c; color: #fff; }
.dz .row.hl { background: #fef2f2; }
.tip { position: absolute; background: var(--ink); color: #fff; font-size: 11.5px; border-radius: 6px; padding: 5px 9px; white-space: nowrap; opacity: 0; z-index: 25; }
.toast { position: absolute; left: 600px; top: 4px; transform: translateX(-50%); background: var(--ink); color: #fff; border-radius: 10px; height: 44px; display: flex; align-items: center; gap: 10px; padding: 0 16px 0 12px; font-size: 13px; opacity: 0; box-shadow: 0 10px 30px rgba(0,0,0,.18); white-space: nowrap; z-index: 40; }
.toast i { width: 18px; height: 18px; border-radius: 50%; background: #fff; color: var(--ink); display: grid; place-items: center; }
"""
TOAST = """      <div class="toast" id="toast"><i><svg width="11" height="11"><use href="#ok"/></svg></i>38 public links reset · owners are told by email</div>"""
EXTRA = r"""    <div class="tip" id="tip">Asks you to type Echo Base first</div>
    <div class="scrim2" id="scrim"></div>
    <div class="dlg" id="dlg" role="alertdialog" aria-labelledby="dT">
      <h3 id="dT">Reset all public links?</h3>
      <div class="imp"><b>38 public links</b> stop working right away. Their file owners are told by email.</div>
      <div class="p">Files and people’s access aren’t touched, and owners can share a new link. No name to type for this one.</div>
      <div class="r"><span class="btn fr" id="cancel">Cancel</span><span class="btn dgr" id="go">Reset 38 links</span></div>
    </div>"""
SCRIPT = r"""const { $, at, span, easeOut } = Motion;

/* ---------- timeline (scene seconds) ---------- */
const T = {
  rows: [3.30, 5.10], resetClick: 5.60, dlg: [5.70, 5.95], goClick: 8.00, dlgOut: [8.05, 8.25], toast: 8.30, toastOut: [9.9, 10.2],
  tip: [10.4, 11.6], endCard: [12.2, 12.65], end: 13.7
};
const ROWS = ["rReset", "rTransfer", "rSandbox", "rOrg"];

function build() {
  // the tooltip sits above the Delete organization button
  const b = $("bOrg"); let el = b, x = 0, y = 0;
  while (el && !el.classList.contains("win")) { x += el.offsetLeft; y += el.offsetTop; el = el.offsetParent; }
  Object.assign($("tip").style, { left: (x + b.offsetWidth / 2 - $("tip").offsetWidth / 2) + "px", top: (y - 34) + "px" });
  const pf = at("prof"), dz = at("dz"), r = at("bReset"), g = at("go"), dl = at("dlg"), o = at("bOrg"), ca = at("cancel");
  const cur = [
    [0.00, 860, 650], [0.40, 860, 650], [2.40, pf[0] + 200, pf[1] + 40], [5.30, r[0], r[1] + 3], [5.75, r[0], r[1] + 3],
    [6.80, ca[0] + 20, ca[1] + 46], [7.80, g[0], g[1] + 3], [8.15, g[0], g[1] + 3],
    [9.60, o[0] - 40, o[1] + 40], [10.3, o[0] - 6, o[1] + 4], [11.8, o[0] - 4, o[1] + 5], [12.2, o[0] - 4, o[1] + 5]
  ];
  const cam = [
    [0.00, 640, 360, 1.00], [0.40, 640, 360, 1.00],
    [1.30, 700, pf[1], 1.34], [2.40, 700, pf[1], 1.34],               // routine settings first: name, domain, time zone
    [3.10, 700, dz[1] - 6, 1.30], [5.50, 700, dz[1] - 6, 1.30],       // the irreversible actions, bordered and apart
    [6.20, dl[0], dl[1], 1.40], [8.10, dl[0], dl[1], 1.40],           // a plain confirm: what stops, who is told
    [8.60, 700, 250, 1.24], [9.60, 700, 250, 1.24],                   // the toast
    [10.2, 700, dz[1] - 6, 1.30], [12.0, 700, dz[1] - 6, 1.30],       // the delete rows ask for the name
    [12.1, 660, 360, 1.05], [12.2, 656, 360, 1.04]
  ];
  return { cam, cur };
}

function render(t) {
  // read down the rows, one at a time
  const k = (t - T.rows[0]) / ((T.rows[1] - T.rows[0]) / ROWS.length);
  ROWS.forEach((id, i) => $(id).classList.toggle("hl", t >= T.rows[0] && t < T.rows[1] && Math.floor(k) === i));
  $("bReset").style.background = t >= T.resetClick - .05 && t < T.dlg[1] ? "#fef2f2" : "";

  const dov = span(t, ...T.dlg, easeOut) * (1 - span(t, ...T.dlgOut));
  $("scrim").style.opacity = dov; $("dlg").style.opacity = dov;
  $("dlg").style.transform = `translateY(${(1 - dov) * 8}px)`;
  const press = t >= T.goClick - .25 && t < T.dlgOut[1];
  $("go").classList.toggle("dn", press); $("cancel").classList.toggle("fr", !press);

  $("rReset").querySelector(".tx").innerHTML = t >= T.dlgOut[0]
    ? "<b>Reset all public links</b>Reset just now by Lavanya Sienna · 38 links stopped working, owners told."
    : "<b>Reset all public links</b>Every public link stops working right away. File owners are told by email.";

  const to = span(t, T.toast, T.toast + .25, easeOut) * (1 - span(t, ...T.toastOut));
  $("toast").style.opacity = to;
  $("toast").style.transform = `translateX(-50%) translateY(${(1 - to) * -8}px)`;
  const tp = span(t, T.tip[0], T.tip[0] + .15) * (1 - span(t, T.tip[1], T.tip[1] + .15));
  $("tip").style.opacity = tp;
  $("bOrg").style.background = tp > 0 ? "#fef2f2" : "";
}

function events() {
  return [["click", T.resetClick], ["whoosh", T.dlg[0]], ["click", T.goClick], ["pop", T.toast]];
}

Motion.scene({
  T, duration: 15, clicks: [T.resetClick, T.goClick], build, render, events,
  // linger on: the routine settings, each irreversible row, the confirm, the delete rows' tooltip
  slow: [[1.3, 2.4, 1.3], [3.2, 5.1, 1.6], [6.1, 7.6, 1.7], [10.4, 11.6, 1.5]]
});"""
COMMENT = """  Source for media/destructive-actions/danger-zone.mp4. Built by motion/_build/danger_zone.py
  on motion/_build/settings_org.py, so Settings › Organization is the same page as the Type-to-confirm clip.
  Follows the Danger zone card (data/guidance-actions.js):
  - routine settings (name, domain, time zone) come first, nothing irreversible among them
  - irreversible actions sit apart, in a bordered section at the end, one row each with what happens
  - "Only owners see this section"; every button is spelled out, none is the default
  - Reset all public links asks for a plain confirmation (38 links stop working, owners told), no typing
  - the delete rows say they ask for the name first"""
make("danger-zone", "Danger zone", COMMENT, CSS, EXTRA, TOAST, SCRIPT)
