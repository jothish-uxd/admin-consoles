/* Shared engine for motion scenes.
   A scene calls Motion.scene({ ... }) with:
     T        timeline in seconds; needs T.endCard [start, end] and T.end
     clicks   times the cursor clicks (press + ring)
     build()  measures the layout once and returns { cam, cur } keyframes:
              cam: [[t, focusX, focusY, scale], ...]  cur: [[t, x, y], ...]
     render(t) sets the scene's own state for time t
     events() returns sound cues [[name, t], ...] (the end card is silent)
     duration (optional) total length in seconds. The action before the end card
              is stretched to fit; the end card keeps its own length.
              House rules: a clip runs as long as its action needs, up to 10 s for fewer
              than 5 steps and 15 s for 5 or more. Don't stretch a short one to fill the
              cap: leave duration out and it runs at its natural length (T.end).
              Keep what the viewer should look at centred and whole in frame;
              one steady framing per view beats panning across it.
     clamp    (optional, default true) keep the camera inside the stage. Set false when
              something to centre sits near the window's edge; the backdrop beyond is the same grey.
     slow     (optional) extra moments to linger on, [[from, to, weight], ...] in
              scene seconds; weight 2 plays that stretch at half speed.
   Every click is slowed automatically (CLICK_SLOW), so the viewer sees the cursor
   arrive, the press and what changed. Ordinary moves get whatever time is left.
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

  const CREDIT = ["Patterns for Enterprise Workflows", "Jothish John · © 2026"];

  /* The console's one rail, shared by every clip so they read as one product.
     Workspace is for everyone; Admin only shows for admins. motion/CONSOLE.md maps
     every pattern to its section and page. In a scene:
       <div class="nav" data-at="ai" data-role="admin"></div>    (role defaults to admin)
       <span class="crumb" data-path="AI / Data use"></span>      (last part is the page) */
  const ICON = {
    home: '<path d="M2.5 7.5 8 3l5.5 4.5V13H2.5z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>',
    archives: '<rect x="2.5" y="3" width="11" height="3" rx="1" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M3.5 6v7h9V6M6.5 8.5h3" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
    myaccess: '<circle cx="6" cy="8" r="2.6" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8.6 8h5M11.5 8v2M13.5 8v1.6" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
    people: '<circle cx="6" cy="5.5" r="2.2" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M2 13c.4-2.4 2-3.6 4-3.6s3.6 1.2 4 3.6M10.5 3.6a2 2 0 0 1 0 3.8M12 9.6c1 .5 1.7 1.6 2 3.4" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
    access: '<rect x="3" y="7" width="10" height="6.5" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M5.3 7V5.2a2.7 2.7 0 0 1 5.4 0V7" fill="none" stroke="currentColor" stroke-width="1.4"/>',
    content: '<path d="M2.5 4.5h4l1.2 1.5h5.8v7h-11z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>',
    ai: '<path d="M8 2.5l1.3 3.2L12.5 7 9.3 8.3 8 11.5 6.7 8.3 3.5 7l3.2-1.3zM12.5 11l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>',
    compliance: '<path d="M8 2.2 13 4v4c0 3-2.2 5-5 5.8C5.2 13 3 11 3 8V4z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>',
    insights: '<path d="M2.5 13.5h11M4.5 11V8M8 11V4.5M11.5 11V6.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    billing: '<rect x="2" y="4" width="12" height="8.5" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M2 7h12M4.5 10h2.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
    settings: '<circle cx="8" cy="8" r="2" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 2v2M8 12v2M2 8h2M12 8h2M3.8 3.8l1.4 1.4M10.8 10.8l1.4 1.4M3.8 12.2l1.4-1.4M10.8 5.2l1.4-1.4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>'
  };
  const RAIL = [
    ["Workspace", [["home", "Home"], ["archives", "Archives"], ["myaccess", "My access"]]],
    ["Admin", [["people", "People"], ["access", "Access"], ["content", "Content"], ["ai", "AI"], ["compliance", "Compliance"],
               ["insights", "Insights"], ["billing", "Billing"], ["settings", "Settings"]], "admin"]
  ];
  function fillConsole() {
    document.querySelectorAll(".nav[data-at]").forEach(nav => {
      const at = nav.dataset.at, role = nav.dataset.role || "admin";
      nav.innerHTML = RAIL.filter(g => !g[2] || g[2] === role).map(([label, items]) =>
        `<div class="lbl">${label}</div>` + items.map(([id, name]) =>
          `<div class="${id === at ? "on" : ""}"><svg viewBox="0 0 16 16" aria-hidden="true">${ICON[id]}</svg>${name}</div>`).join("")).join("");
    });
    document.querySelectorAll(".crumb[data-path]").forEach(c => {
      const parts = c.dataset.path.split(" / ");
      c.innerHTML = "/ " + parts.map((p, i) => i === parts.length - 1 ? `<b>${p}</b>` : p).join(" / ");
    });
  }
  let S, CAM, CUR;
  /* Time warp. Scene seconds before the end card are weighted: 1 normally, more
     around clicks and `slow` moments. Real time = PACE × the running sum of weights,
     with PACE chosen so the clip lands on `duration`. Weights ramp in and out so
     motion never jerks. */
  const CLICK_SLOW = [0.40, 0.55, 2.0];   // seconds before, seconds after, weight
  const RAMP = 0.18, STEP = 0.002;
  let CUM = null, PACE = 1;
  const smooth = x => x * x * (3 - 2 * x);
  function weight(t) {
    let w = 1;
    for (const [a, b, k] of S.slowAll) {
      const up = smooth(clamp01((t - (a - RAMP)) / RAMP)), down = smooth(clamp01(((b + RAMP) - t) / RAMP));
      w = Math.max(w, 1 + (k - 1) * Math.min(up, down));
    }
    return w;
  }
  function buildWarp(def) {
    const E = def.T.endCard[0];
    S.slowAll = [...def.clicks.map(c => [c - CLICK_SLOW[0], c + CLICK_SLOW[1], CLICK_SLOW[2]]), ...(def.slow || [])];
    const n = Math.ceil(E / STEP);
    CUM = new Float64Array(n + 1);
    for (let i = 1; i <= n; i++) CUM[i] = CUM[i - 1] + weight((i - .5) * STEP) * STEP;
    PACE = def.duration ? (def.duration - (def.T.end - E)) / CUM[n] : 1;
  }
  const contentReal = () => PACE * CUM[CUM.length - 1];
  function realTime(t) {
    const E = S.T.endCard[0];
    if (t >= E) return contentReal() + (t - E);
    const i = Math.min(CUM.length - 2, Math.floor(t / STEP)), f = t / STEP - i;
    return PACE * (CUM[i] + (CUM[i + 1] - CUM[i]) * f);
  }
  function storyTime(real) {
    if (real >= contentReal()) return S.T.endCard[0] + (real - contentReal());
    const target = real / PACE;
    let lo = 0, hi = CUM.length - 1;
    while (hi - lo > 1) { const m = (lo + hi) >> 1; if (CUM[m] <= target) lo = m; else hi = m; }
    return (lo + (target - CUM[lo]) / (CUM[hi] - CUM[lo])) * STEP;
  }

  function renderAt(real) {
    const T = S.T, t = storyTime(real);
    // camera, clamped so the view never leaves the stage; clamp: <px> lets it go that far past the bottom,
    // so a low button can be lifted above the player bar
    let [fx, fy, s] = track(CAM, t);
    const hw = 640 / s, hh = 360 / s;
    if (S.clamp !== false) { fx = Math.min(Math.max(fx, hw), 1280 - hw); fy = Math.min(Math.max(fy, hh), 720 - hh + (+S.clamp || 0)); }
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

  // Player-bar check: where each click lands on screen. The site's player bar covers
  // the bottom of the frame (about 84 of 720 px at typical widths, more on small screens),
  // so every click and the thing it lands on must sit above SAFE_Y.
  const SAFE_Y = 590;
  function audit() {
    return S.clicks.map(c => {
      let [fx, fy, s] = track(CAM, c);
      const hw = 640 / s, hh = 360 / s;
      if (S.clamp !== false) { fx = Math.min(Math.max(fx, hw), 1280 - hw); fy = Math.min(Math.max(fy, hh), 720 - hh + (+S.clamp || 0)); }
      const [cx, cy] = track(CUR, c);
      const x = 640 + (cx - fx) * s, y = 360 + (cy - fy) * s;
      return { t: c, x: Math.round(x), y: Math.round(y), ok: y <= SAFE_Y && x > 30 && x < 1250 && y > 30 };
    });
  }

  function scene(def) {
    S = def;
    fillConsole();
    const stage = $("stage");
    stage.insertAdjacentHTML("beforeend",
      '<div id="ring"></div><svg id="cursor" viewBox="0 0 22 22"><path d="M3 2l14.5 8.2-6.3 1.4-2.9 5.9z" fill="#171717" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/></svg>');
    document.body.insertAdjacentHTML("beforeend", `<div id="endcard"><p><b>${CREDIT[0]}</b><span>${CREDIT[1]}</span></p></div>`);
    buildWarp(def);
    window.EVENTS = def.events().map(([n, t]) => [n, +realTime(t).toFixed(3)]);
    // no duration: the clip runs at its natural length (the clicks' pauses included), not cut at T.end
    window.DURATION = def.duration || +(contentReal() + (def.T.end - def.T.endCard[0])).toFixed(3);
    window.renderAt = renderAt; window.AUDIT = audit;
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
