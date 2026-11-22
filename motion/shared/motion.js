/* Shared engine for motion scenes.
   A scene calls Motion.scene({ ... }) with:
     T        timeline in seconds; needs T.endCard [start, end] and T.end
     clicks   times the cursor clicks (press + ring)
     build()  measures the layout once and returns { cam, cur } keyframes:
              cam: [[t, focusX, focusY, scale], ...]  cur: [[t, x, y], ...]
     render(t) sets the scene's own state for time t
     events() returns sound cues [[name, t], ...]; the end-card sonar is added here
     duration (optional) total length in seconds. The action before the end card
              is slowed evenly to fit; the end card keeps its own length.
              House rule: clips whose steps list has 5 or more steps run 15 s.
   Everything is a pure function of time, so render.py can step through it
   frame by frame. Open a scene with ?play to watch it live. */
(function () {
  const $ = id => document.getElementById(id);
  const clamp01 = x => Math.max(0, Math.min(1, x));
  const ease = x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;   // easeInOutCubic
  const easeOut = x => 1 - Math.pow(1 - x, 3);
  const span = (t, a, b, f = ease) => f(clamp01((t - a) / (b - a)));
  const lerp = (a, b, k) => a + (b - a) * k;
  // Piecewise keyframes [[time, value...], ...] eased between neighbours.
  function track(keys, t) {
    if (t <= keys[0][0]) return keys[0].slice(1);
    for (let i = 1; i < keys.length; i++) {
      const [t1] = keys[i], [t0] = keys[i - 1];
      if (t <= t1) { const k = ease((t - t0) / (t1 - t0)); return keys[i].slice(1).map((v, j) => lerp(keys[i - 1][j + 1], v, k)); }
    }
    return keys[keys.length - 1].slice(1);
  }
  // Element centre in stage coordinates (layout position, ignores transforms).
  function at(id, dx = 0, dy = 0) {
    let el = $(id), x = el.offsetWidth / 2, y = el.offsetHeight / 2;
    while (el && el.id !== "stage") { x += el.offsetLeft; y += el.offsetTop; el = el.offsetParent; }
    return [x + dx, y + dy];
  }

  const CREDIT = ["Patterns for Enterprise Admin Consoles", "Jothish John · © 2026"];
  let S, CAM, CUR, PACE = 1;
  // Real seconds -> scene seconds: the action is slowed by PACE, the end card isn't.
  const storyTime = t => { const e = S.T.endCard[0] * PACE; return t < e ? t / PACE : S.T.endCard[0] + (t - e); };
  const realTime = t => t < S.T.endCard[0] ? t * PACE : S.T.endCard[0] * PACE + (t - S.T.endCard[0]);

  function renderAt(real) {
    const T = S.T, t = storyTime(real);
    // camera, clamped so the view never leaves the stage
    let [fx, fy, s] = track(CAM, t);
    const hw = 640 / s, hh = 360 / s;
    fx = Math.min(Math.max(fx, hw), 1280 - hw); fy = Math.min(Math.max(fy, hh), 720 - hh);
    $("stage").style.transform = `translate(${640 - fx * s}px, ${360 - fy * s}px) scale(${s})`;

    // cursor, press and click ring
    const [cx, cy] = track(CUR, t);
    let press = 0, ring = null;
    for (const c of S.clicks) {
      if (t >= c - .07 && t <= c + .1) press = Math.max(press, 1 - Math.abs(t - c) / .1);
      if (t >= c && t <= c + .45) ring = (t - c) / .45;
    }
    const cur = $("cursor");
    cur.style.transform = `translate(${cx - 3}px, ${cy - 2}px) scale(${1 - .14 * press})`;
    cur.style.opacity = 1 - span(t, T.endCard[0] - .4, T.endCard[0], x => x);
    const r = $("ring");
    if (ring !== null) {
      r.style.left = cx + "px"; r.style.top = cy + "px";
      r.style.opacity = .35 * (1 - ring); r.style.transform = `scale(${.4 + .9 * easeOut(ring)})`;
    } else r.style.opacity = 0;

    S.render(t);

    // end card: fade to grey with the credit, held to the end
    $("endcard").style.opacity = span(t, ...T.endCard);
  }

  function scene(def) {
    S = def;
    const stage = $("stage");
    stage.insertAdjacentHTML("beforeend",
      '<div id="ring"></div><svg id="cursor" viewBox="0 0 22 22"><path d="M3 2l14.5 8.2-6.3 1.4-2.9 5.9z" fill="#171717" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/></svg>');
    document.body.insertAdjacentHTML("beforeend", `<div id="endcard"><p><b>${CREDIT[0]}</b><span>${CREDIT[1]}</span></p></div>`);
    const tail = def.T.end - def.T.endCard[0];
    PACE = def.duration ? (def.duration - tail) / def.T.endCard[0] : 1;
    window.EVENTS = [...def.events(), ["sonar", def.T.endCard[0] + 0.25]].map(([n, t]) => [n, +realTime(t).toFixed(3)]);
    window.DURATION = def.duration || def.T.end;
    window.renderAt = renderAt;
    document.fonts.ready.then(() => {
      ({ cam: CAM, cur: CUR } = def.build());
      renderAt(0); window.READY = true;
      if (location.search.includes("play")) {
        const t0 = performance.now();
        const loop = () => { renderAt(((performance.now() - t0) / 1000) % window.DURATION); requestAnimationFrame(loop); };
        loop();
      }
    });
  }

  window.Motion = { scene, $, at, track, span, ease, easeOut, clamp01, lerp };
})();
