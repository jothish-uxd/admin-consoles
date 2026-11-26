import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from user_page import make, page, OK

CSS = r"""
.pop { position: absolute; z-index: 20; width: 280px; background: var(--bg); border: 1px solid var(--rule-strong); border-radius: 10px; box-shadow: 0 14px 34px rgba(0,0,0,.14); padding: 10px 12px; color: var(--ink); font-size: 12.5px; line-height: 1.45; display: none; right: 16px; top: 74px; }
.pop a { display: inline-block; margin-top: 6px; text-decoration: underline; text-underline-offset: 3px; }
.mfa2 { display: none; margin-top: 10px; align-items: center; gap: 8px; color: var(--ink); }
.mfa2 svg { width: 14px; height: 14px; }
#bMr { margin-top: 10px; height: 30px; }
"""
def main():
    p = page()
    p = p.replace('<span class="srcl" id="sFc">Through Fleet content</span></div>',
                  '<span class="srcl" id="sFc">Through Fleet content</span></div><div class="pop" id="pop" role="dialog">Fleet content gives <b>Editor</b> to its 18 members. Zev was added by Cal Alder in Mar 2025.<br><a>Open Fleet content</a> · <a>Remove him from it</a></div>', 1)
    p = p.replace('<div><div class="k">Sessions and tokens</div><div class="v" id="vSes">1 session · 2 API tokens</div></div></div></div>',
                  f'<div><div class="k">Sessions and tokens</div><div class="v" id="vSes">1 session · 2 API tokens</div></div></div><span class="btn" id="bMr">Remind him to enrol</span><div class="mfa2" id="mfa2" role="status">{OK}Reminder sent. MFA is required from Dec 10.</div></div>', 1)
    return p
SCRIPT = r"""const { $, at, span, easeOut } = Motion;

/* ---------- timeline (scene seconds) ---------- */
const T = { fClick: 1.60, mClick: 3.50, endCard: [6.20, 6.65], end: 7.15 };

function build() {
  const f = at("sFc"), m = at("bMr");
  const cur = [[0.00, 960, 640], [0.25, 960, 640], [1.25, f[0], f[1] + 3], [1.65, f[0], f[1] + 3], [3.15, m[0], m[1] + 3], [3.55, m[0], m[1] + 3], [6.20, m[0] - 200, m[1] + 140]];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 345, 1.04], [5.95, 650, 345, 1.04], [6.20, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  // every piece of access says where it comes from
  $("pop").style.display = t >= T.fClick && t < T.mClick ? "block" : "none";
  // security in words, with the next step
  const m = t >= T.mClick;
  $("bMr").style.display = m ? "none" : ""; $("mfa2").style.display = m ? "flex" : "none";
}

function events() { return [["click", T.fClick], ["click", T.mClick]]; }

Motion.scene({
  // under 5 steps: natural length, within the 10 s cap
  T, clicks: [T.fClick, T.mClick], build, render, events,
  slow: [[0.4, 1.2, 1.3], [1.7, 3.0, 1.2]]
});"""
COMMENT = """  Source for media/user-management/user-detail.mp4. Built by motion/_build/user_detail.py on _build/user_page.py
  (People › Users › Zev Senesca), with the top bar's alerts bell.
  Follows the User detail card (data/guidance.js):
  - identity and status at the top, with common actions first and Suspend set apart; synced fields name their source
  - access says where each piece comes from, linked to it
  - security and recent activity, in words, with a link to his audit log"""
make("user-detail", "User detail", COMMENT, CSS, main(), SCRIPT)
