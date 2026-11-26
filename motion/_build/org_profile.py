import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from defaults_page import make, head, org

CSS = r"""
#ed { display: none; }
.ef { margin-top: 12px; display: grid; grid-template-columns: 1fr 330px; gap: 18px; }
.ef .f1 { margin-top: 10px; } .ef .f1:first-child { margin-top: 0; }
.lgr { display: flex; gap: 10px; align-items: center; }
.lgo { width: 46px; height: 46px; border-radius: 10px; border: 1px solid var(--rule-strong); display: grid; place-items: center; background: var(--bg); flex: none; }
.lgo svg { width: 26px; height: 26px; }
.drop { flex: 1; height: 46px; border: 1.5px dashed var(--rule-strong); border-radius: 10px; display: flex; align-items: center; padding: 0 12px; font-size: 12px; color: var(--soft); line-height: 1.35; box-sizing: border-box; }
.drop.ov { border-color: var(--ink); background: var(--subtle); }
.drop b { color: var(--ink); font-weight: 500; }
.idr { display: flex; gap: 8px; }
.idr .in { flex: 1; background: var(--subtle); }
.idr .btn { height: 36px; }
.cpd { display: inline-flex; gap: 5px; align-items: center; } .cpd svg { width: 12px; height: 12px; }
.pvw .lb3 { font-size: 12.5px; color: var(--ink); font-weight: 500; margin-bottom: 6px; }
.pvw .two { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.mk { border-radius: 10px; border: 1px solid var(--rule-strong); padding: 12px 10px; text-align: center; font-size: 11px; height: 112px; box-sizing: border-box; }
.mk.lt { background: #fff; color: #171717; } .mk.dk { background: #171717; color: #fafafa; border-color: #171717; }
.mk .ml { width: 26px; height: 26px; margin: 2px auto 6px; display: grid; place-items: center; }
.mk .ml svg { width: 24px; height: 24px; }
.mk b { display: block; font-size: 12px; margin-bottom: 6px; }
.mk .fk { height: 16px; border-radius: 5px; margin: 0 8px; }
.mk.lt .fk { background: #f2f2f2; border: 1px solid #e5e5e5; } .mk.dk .fk { background: #262626; border: 1px solid #404040; }
.pvw .cap3 { margin-top: 6px; font-size: 11.5px; color: var(--soft); }
.fly { position: absolute; white-space: nowrap; height: 34px; border: 1px solid var(--rule-strong); border-radius: 8px; background: var(--bg); box-shadow: 0 10px 30px rgba(0,0,0,.15); display: flex; align-items: center; gap: 8px; padding: 0 10px; font-size: 12px; color: var(--ink); opacity: 0; z-index: 30; }
.fly svg { width: 18px; height: 18px; }
.sec h2 .btn { margin-left: 6px; }
"""
OLD = '<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="10" cy="10" r="2.6" fill="currentColor"/></svg>'
NEW = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l8.5 4.9v9.2L12 21.5l-8.5-4.9V7.4z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M12 7.5l4.3 2.5v5L12 17.5 7.7 15v-5z" fill="currentColor"/></svg>'
def mock(cls, logo, i):
    return f'<div class="mk {cls}"><div class="ml" id="{i}">{logo}</div><b>Sign in to Echo Base</b><div class="fk"></div></div>'
EDIT = f'''<div id="ed"><div class="ef"><div>
            <div class="f1"><label class="lbl">Name</label><div class="in">Echo Base</div></div>
            <div class="f1"><span class="lbl">Logo</span><div class="lgr"><span class="lgo" id="lgo">{OLD}</span><div class="drop" id="drop"><span id="dTx"><b>Drop an SVG or PNG</b>, at least 256 × 256 px. Pick one that reads on light and dark.</span></div></div></div>
            <div class="f1"><label class="lbl">Org ID <span>· for support and the API</span></label><div class="idr"><span class="in mono">org_7HQ2-ECHO-BASE</span><span class="btn" id="bCp"><span class="cpd" id="cpT"><svg><use href="#copy"/></svg>Copy</span></span></div></div>
          </div>
          <div class="pvw"><div class="lb3">How people see it</div><div class="two">{mock("lt", OLD, "m1")}{mock("dk", OLD, "m2")}</div>
            <div class="cap3">On the sign-in page and at the top of every email, in light and dark.</div></div></div></div>'''
body = org()
a = '<h2>Organization profile<span class="sp"></span><span class="btn sm">Edit</span></h2>'
assert a in body
body = body.replace(a, '<h2>Organization profile<span class="sp"></span><span id="eBtns"><span class="btn sm" id="bEd">Edit</span></span></h2>')
body = body.replace('<dl class="kv">', '<dl class="kv" id="kv">', 1)
i = body.index('</dl></div>') + len('</dl>')
body = body[:i] + EDIT + body[i:]
MAIN = f'      <div class="view">\n{head("Organization")}{body}      </div>\n'
EXTRA = f'    <div class="fly" id="fly">{NEW}echo-base-mark.svg</div>'
TOAST = '      <div class="toast" id="toast"><i><svg width="11" height="11"><use href="#ok"/></svg></i>Saved · the new logo shows on sign-in pages and emails from now on</div>'
SCRIPT = r"""const { $, at, span, easeOut } = Motion;
const NEWL = '""" + NEW.replace("'", "\\'") + r"""', OLDL = '""" + OLD.replace("'", "\\'") + r"""';

/* ---------- timeline (scene seconds) ---------- */
const T = {
  eClick: 0.95, toE: 1.00, grab: 1.90, drag: [2.00, 2.90], drop: 2.95, cpClick: 4.10, svClick: 5.20, toast: [5.30, 6.20],
  endCard: [6.20, 6.65], end: 7.15
};

function build() {
  const e = at("bEd");
  $("ed").style.display = "block"; $("kv").style.display = "none"; $("eBtns").innerHTML = '<span class="btn sm">Cancel</span><span class="btn sm pri" id="bSv">Save</span>';
  const d = at("drop", -40, 0), cp = at("bCp"), sv = at("bSv");
  $("ed").style.display = ""; $("kv").style.display = ""; $("eBtns").innerHTML = '<span class="btn sm" id="bEd">Edit</span>';
  const cur = [
    [0.00, 960, 640], [0.25, 960, 640], [0.70, e[0], e[1] + 3], [1.00, e[0], e[1] + 3],
    [1.90, d[0] + 330, d[1] - 150], [2.00, d[0] + 330, d[1] - 150], [2.90, d[0], d[1] + 3], [3.05, d[0], d[1] + 3],
    [3.85, cp[0], cp[1] + 3], [4.15, cp[0], cp[1] + 3], [4.95, sv[0], sv[1] + 3], [5.25, sv[0], sv[1] + 3], [6.20, sv[0] - 220, sv[1] + 160]
  ];
  const cam = [[0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00], [0.80, 650, 320, 1.06], [5.95, 650, 320, 1.06], [6.20, 656, 360, 1.04]];
  return { cam, cur };
}

function render(t) {
  $("crumb").innerHTML = "/ Settings / <b>Organization</b>";
  // explicit save: edit, then Save or Cancel
  const ed = t >= T.toE && t < T.svClick + .1;
  $("ed").style.display = ed ? "block" : "none"; $("kv").style.display = ed ? "none" : "";
  $("eBtns").innerHTML = ed ? `<span class="btn sm">Cancel</span><span class="btn sm pri${t >= T.svClick - .05 ? " dn" : ""}" id="bSv">Save</span>` : `<span class="btn sm${t >= T.eClick - .05 && t < T.toE + .1 ? " dn" : ""}" id="bEd">Edit</span>`;
  // the new logo, dragged in; the file sits under the cursor
  const m = /translate\(([-\d.]+)px, ([-\d.]+)px\)/.exec($("cursor").style.transform) || [0, 0, 0];
  Object.assign($("fly").style, { left: (+m[1] + 3 - 40 - 20) + "px", top: (+m[2] + 2 - 20 - 14) + "px" });
  $("fly").style.opacity = t >= T.grab && t < T.drop ? 1 : 0;
  $("drop").classList.toggle("ov", t >= T.drag[1] - .3 && t < T.drop + .05);
  const nl = t >= T.drop;
  $("lgo").innerHTML = nl ? NEWL : OLDL; $("m1").innerHTML = nl ? NEWL : OLDL; $("m2").innerHTML = nl ? NEWL : OLDL;
  $("dTx").innerHTML = nl ? "<b>echo-base-mark.svg</b> · 512 × 512 · reads on light and dark" : "<b>Drop an SVG or PNG</b>, at least 256 × 256 px. Pick one that reads on light and dark.";
  $("cpT").innerHTML = t >= T.cpClick + .05 ? '<svg><use href="#ok"/></svg>Copied' : '<svg><use href="#copy"/></svg>Copy';
  $("bCp").classList.toggle("prs", t >= T.cpClick - .05 && t < T.cpClick + .3);
  $("toast").style.opacity = span(t, T.toast[0], T.toast[0] + .2) * (1 - span(t, T.toast[1] - .2, T.toast[1]));
}

function events() { return [["click", T.eClick], ["click", T.grab], ["pop", T.drop], ["click", T.cpClick], ["click", T.svClick], ["pop", T.toast[0]]]; }

Motion.scene({
  // under 5 steps: natural length, within the 10 s cap
  T, clicks: [T.eClick, T.cpClick, T.svClick], build, render, events,
  slow: [[3.1, 3.6, 1.2]]
});"""
COMMENT = """  Source for media/org-settings/org-profile.mp4. Built by motion/_build/org_profile.py on _build/defaults_page.py,
  with Search settings beside the title and the top bar's alerts bell.
  Follows the Org profile card (data/guidance-platform.js):
  - name, logo, domain, owner, region; changed in place, with Save and Cancel, no support ticket
  - logo requirements said before upload: format, size, light and dark
  - a preview of how people see it, on the sign-in page and in email, in light and dark
  - the org ID copies in one click; saving says what changes"""
make("org-profile", "Org profile", COMMENT, CSS, "Settings / Organization", MAIN, SCRIPT, extra=EXTRA, toast=TOAST)
