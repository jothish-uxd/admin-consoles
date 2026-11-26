import sys; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from allcontent_page import make

SCRIPT = r"""const { $, at, span, easeOut } = Motion;
const Q = "deac";

/* ---------- timeline (scene seconds) ---------- */
const T = {
  oClick: 1.20, type: [1.55, 1.95], deClick: 2.70, sClick: 3.70, pubClick: 4.50, xClick: 5.60, clrClick: 6.70,
  endCard: [8.00, 8.45], end: 8.95
};

function build() {
  const o = at("fOwn"), ar = at("area");
  $("mOwn").style.opacity = 1; const de = at("oDe", -50, 0); $("mOwn").style.opacity = 0;
  const fs = at("fShare");
  $("menu").style.opacity = 1; const op = at("optPub", -40, 0); $("menu").style.opacity = 0;
  $("fOwn").classList.add("on"); $("foL").innerHTML = "Owner: <b>Deactivated</b>"; const x = at("foX");
  $("fOwn").classList.remove("on"); $("foL").innerHTML = "Owner";
  $("clr").style.visibility = "visible"; const c = at("clr"); $("clr").style.visibility = "";
  const cur = [
    [0.00, 860, 650], [0.25, 860, 650], [0.95, o[0], o[1] + 3], [1.25, o[0], o[1] + 3], [2.45, de[0], de[1] + 3], [2.75, de[0], de[1] + 3],
    [3.45, fs[0], fs[1] + 3], [3.75, fs[0], fs[1] + 3], [4.20, op[0], op[1] + 3], [4.55, op[0], op[1] + 3],
    [5.35, x[0], x[1] + 3], [5.65, x[0], x[1] + 3], [6.45, c[0], c[1] + 3], [6.75, c[0], c[1] + 3], [8.00, c[0] + 30, c[1] + 90]
  ];
  const cam = [
    [0.00, 640, 360, 1.00], [0.30, 640, 360, 1.00],
    [0.95, 740, ar[1] - 105, 1.24], [7.75, 740, ar[1] - 105, 1.24],     // one steady view: filters, the count and the results
    [8.00, 656, 360, 1.04]
  ];
  return { cam, cur };
}

function show(id) { ["tA", "tB", "tC", "tD", "gC"].forEach(x => $(x).style.opacity = x === id ? 1 : 0); }
function meta(id) { ["m0", "m1", "m2", "m3"].forEach(x => $(x).style.opacity = x === id ? 1 : 0); }

function render(t) {
  // Owner: search inside a long value list, with counts
  const om = t >= T.oClick && t < T.deClick;
  $("mOwn").style.opacity = om ? 1 : 0;
  const n = Math.round(Q.length * span(t, ...T.type, x => x));
  $("omQ").textContent = Q.slice(0, n); $("omPh").style.display = n ? "none" : "";
  $("omC").style.opacity = om && Math.floor(t * 2.4) % 2 === 0 ? 1 : 0;
  document.querySelectorAll("#mOwn .o1").forEach(e => e.style.display = n >= 2 ? "none" : "");
  $("oDe").classList.toggle("hov", t >= T.deClick - .3);
  // active filters say what they are, in text, with ✕
  const own = t >= T.deClick && t < T.xClick, pub = t >= T.pubClick && t < T.clrClick;
  $("fOwn").classList.toggle("on", own); $("foL").innerHTML = own ? "Owner: <b>Deactivated</b>" : "Owner";
  $("fShare").classList.toggle("on", pub); $("fsL").innerHTML = pub ? "Sharing: <b>Public link</b>" : "Sharing";
  // Sharing counts follow the Owner filter
  $("menu").style.opacity = t >= T.sClick && t < T.pubClick ? 1 : 0;
  $("msI").textContent = own ? "81" : "1.9M"; $("msS").textContent = own ? "28" : "410K"; $("msP").textContent = own ? "3" : "38";
  $("optPub").classList.toggle("hov", t >= T.pubClick - .3);
  $("clr").style.visibility = (own || pub) ? "visible" : "hidden";
  // results and the announced count change together
  if (own && pub) { show("tC"); meta("m2"); } else if (own) { show("tB"); meta("m1"); } else if (pub) { show("tD"); meta("m3"); } else { show("tA"); meta("m0"); }
}

function events() { return [["click", T.oClick], ["key", T.type[0]], ["click", T.deClick], ["click", T.sClick], ["click", T.pubClick], ["click", T.xClick], ["click", T.clrClick]]; }

Motion.scene({
  // 5+ steps: natural length, within the 15 s cap
  T, clicks: [T.oClick, T.deClick, T.sClick, T.pubClick, T.xClick, T.clrClick], build, render, events, duration: 14.2
});"""
COMMENT = """  Source for media/search-filtering/filter-bar.mp4. Built by motion/_build/filter_bar.py on _build/allcontent_page.py
  (Content › All content, the same page as Asset library and No results), with the top bar's alerts bell.
  Follows the Filter bar card (data/guidance-foundations.js):
  - common filters up front; a long value list has its own search; counts on every value, following the other filters
  - active filters say what they are in text, each with ✕, and Clear all
  - the count is announced when filters change; results update straight away"""
make("filter-bar", "Filter bar", COMMENT, "", "", "", SCRIPT)
