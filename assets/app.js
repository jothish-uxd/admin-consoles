/* Admin Consoles — shared shell, home grid and category page. */

(function () {
  const GROUPS = window.GROUPS || [];
  const CATS = window.CATEGORIES || [];
  const $ = (s, el = document) => el.querySelector(s);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const plural = (n, w) => `${n} ${n === 1 ? w : w.replace(/y$/, "ie") + "s"}`;
  // Links stay on the current page path (index.html or its alias category.html)
  // and change only the query, so views swap in place without a page load.
  const HOME = "?";
  const catUrl = c => `?c=${encodeURIComponent(c.slug)}`;
  const slugFromUrl = url => new URL(url, location.href).searchParams.get("c");

  /* ---------- Theme ---------- */
  const root = document.documentElement;
  const storedTheme = (() => { try { return localStorage.getItem("ac-theme"); } catch (e) { return null; } })();
  if (storedTheme) root.dataset.theme = storedTheme;

  function effectiveTheme() {
    if (root.dataset.theme) return root.dataset.theme;
    return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function paintToggle(btn) {
    btn.setAttribute("aria-pressed", String(effectiveTheme() === "dark"));
  }

  /* Section icons for the sidebar (24px, stroke, monochrome) */
  const GROUP_ICONS = {
    people: '<circle cx="9" cy="8" r="3.2"/><path d="M3 19.5c.8-3.3 3.2-5.3 6-5.3s5.2 2 6 5.3"/><circle cx="17" cy="9" r="2.4"/><path d="M16.2 14.3c2.4.3 4.1 2.1 4.8 5"/>',
    content: '<path d="M3 7.5a2 2 0 0 1 2-2h4.2l2 2.5H19a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    actions: '<path d="M13 3L5 13.5h6L10 21l8-10.5h-6z"/>',
    governance: '<path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6z"/><path d="M8.8 12.2l2.3 2.3 4.2-4.6"/>',
    platform: '<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/>',
    foundations: '<path d="M12 3.5l8.5 4.5-8.5 4.5L3.5 8z"/><path d="M3.5 12.5l8.5 4.5 8.5-4.5"/><path d="M3.5 16.5l8.5 4.5 8.5-4.5"/>'
  };
  const navIcon = id => `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${GROUP_ICONS[id] || ""}</svg>`;
  const NAV_CHEVRON = '<svg class="nav-chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 10l4-4 4 4"/></svg>';
  const NAV_COLLAPSE_KEY = "ac-nav-collapsed";
  const NAV_VIEW_KEY = "ac-nav-view";

  /* ---------- Sidebar ---------- */
  function renderSidebar() {
    const side = $("#sidebar");
    if (!side) return;
    const groupsHtml = GROUPS.map(g => {
      const items = CATS.filter(c => c.group === g.id).map(c => `
        <li><a class="nav-link" href="${catUrl(c)}" data-slug="${esc(c.slug)}"><span>${esc(c.name)}</span>${c.screens.length ? `<small>${c.screens.length}</small>` : ""}</a></li>`).join("");
      return `<div class="nav-group">
          <h2 class="nav-heading" id="nav-${g.id}"><button class="nav-toggle" type="button" aria-expanded="true" aria-controls="nav-${g.id}-list">${navIcon(g.id)}<span>${esc(g.name)}</span>${NAV_CHEVRON}</button></h2>
          <ul class="nav-list" id="nav-${g.id}-list" aria-labelledby="nav-${g.id}">${items}</ul>
        </div>`;
    }).join("");

    const navItem = c => `
        <li><a class="nav-link" href="${catUrl(c)}" data-slug="${esc(c.slug)}"><span>${esc(c.name)}</span>${c.screens.length ? `<small>${c.screens.length}</small>` : ""}</a></li>`;
    const azHtml = [...CATS].sort((a, b) => a.name.localeCompare(b.name)).map(navItem).join("");

    side.innerHTML = `
      <div class="nav-group">
        <ul class="nav-list">
          <li><a class="nav-link" href="${HOME}" data-slug=""><span>Overview</span></a></li>
        </ul>
      </div>
      <div class="nav-sort" role="group" aria-label="Show categories">
        <button type="button" class="nav-sort__btn" data-view="group" aria-pressed="true">By group</button>
        <button type="button" class="nav-sort__btn" data-view="az" aria-pressed="false"><span aria-hidden="true">A–Z</span><span class="visually-hidden">A to Z</span></button>
      </div>
      <div class="nav-view" id="nav-view-group">${groupsHtml}</div>
      <div class="nav-view" id="nav-view-az" hidden>
        <ul class="nav-list nav-az" aria-label="Categories, A to Z">${azHtml}</ul>
      </div>
      <p class="sidebar-credit">Patterns for enterprise admin consoles, by Jothish John, © 2026</p>`;

    /* Collapsible sections. Open or closed is a per-viewer convenience, so it lives in this browser only. */
    let collapsed = [];
    try { collapsed = JSON.parse(localStorage.getItem(NAV_COLLAPSE_KEY) || "[]"); } catch (e) {}
    const toggles = [...side.querySelectorAll(".nav-toggle")];
    toggles.forEach(btn => {
      setNavGroup(btn, !collapsed.includes(btn.getAttribute("aria-controls")));
      btn.addEventListener("click", () => {
        setNavGroup(btn, btn.getAttribute("aria-expanded") !== "true");
        const ids = toggles.filter(b => b.getAttribute("aria-expanded") === "false").map(b => b.getAttribute("aria-controls"));
        try { localStorage.setItem(NAV_COLLAPSE_KEY, JSON.stringify(ids)); } catch (e) {}
      });
    });

    /* By group or A–Z. Also a per-viewer convenience, remembered in this browser only. */
    const sortBtns = [...side.querySelectorAll(".nav-sort__btn")];
    const setView = (view, save) => {
      sortBtns.forEach(b => b.setAttribute("aria-pressed", String(b.dataset.view === view)));
      $("#nav-view-group").hidden = view !== "group";
      $("#nav-view-az").hidden = view !== "az";
      if (save) try { localStorage.setItem(NAV_VIEW_KEY, view); } catch (e) {}
    };
    let view = "group";
    try { if (localStorage.getItem(NAV_VIEW_KEY) === "az") view = "az"; } catch (e) {}
    setView(view, false);
    sortBtns.forEach(b => b.addEventListener("click", () => setView(b.dataset.view, true)));

    /* The sidebar is rendered once and never re-rendered: category links
       swap only the content area (see router below). This also restores
       the nav's scroll offset after a full reload. */
    markCurrent(slugFromUrl(location.href));
    const NAV_KEY = "ac-nav-scroll";
    let saved = null;
    try { saved = sessionStorage.getItem(NAV_KEY); } catch (e) {}
    if (saved !== null) {
      side.scrollTop = Number(saved) || 0;
    }
    // If the current item still isn't visible (deep link, first visit), bring it into view once.
    const current = [...side.querySelectorAll('[aria-current="page"]')].find(a => a.offsetParent);
    if (current) {
      const s = side.getBoundingClientRect(), r = current.getBoundingClientRect();
      if (r.top < s.top || r.bottom > s.bottom) {
        side.scrollTop += r.top - s.top - (s.height - r.height) / 2;
      }
    }
    const saveNav = () => { try { sessionStorage.setItem(NAV_KEY, String(side.scrollTop)); } catch (e) {} };
    side.addEventListener("click", e => { if (e.target.closest("a")) saveNav(); });
    addEventListener("pagehide", saveNav);

    const toggle = $("#theme-toggle");
    paintToggle(toggle);
    toggle.addEventListener("click", () => {
      const next = effectiveTheme() === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      try { localStorage.setItem("ac-theme", next); } catch (e) {}
      paintToggle(toggle);
    });

    const menuBtn = $("#menu-button");
    menuBtn.addEventListener("click", () => side.classList.contains("is-open") ? closeMenu(false) : openMenu());
    document.addEventListener("keydown", e => { if (e.key === "Escape") closeMenu(true); });
  }

  function setNavGroup(btn, open) {
    btn.setAttribute("aria-expanded", String(open));
    document.getElementById(btn.getAttribute("aria-controls")).hidden = !open;
  }
  function openMenu() {
    const side = $("#sidebar");
    side.classList.add("is-open");
    $("#menu-button").setAttribute("aria-expanded", "true");
    const target = side.querySelector('[aria-current="page"]') || side.querySelector("a");
    if (target) target.focus();
  }
  function closeMenu(returnFocus) {
    const side = $("#sidebar");
    if (!side.classList.contains("is-open")) return;
    side.classList.remove("is-open");
    $("#menu-button").setAttribute("aria-expanded", "false");
    if (returnFocus) $("#menu-button").focus();
  }

  /* ---------- Home ---------- */
  function renderHome() {
    $("#content").classList.remove("is-refined");
    document.title = "Admin Consoles — Pattern Library";
    $("#content").innerHTML = `
      <header class="hero is-home">
        <h1 class="page-title" tabindex="-1">Patterns for enterprise admin consoles.</h1>
        <p class="page-lede">Real screens grouped by the job the admin is doing, not by product, with guidance on usability, accessibility and scale for each pattern.</p>
        <ul class="stats" id="stats"></ul>
      </header>
      <div class="toolbar">
        <div class="chips" id="chips" role="group" aria-label="Filter by group"></div>
      </div>
      <p class="visually-hidden" id="results-status" role="status" aria-live="polite"></p>
      <div id="categories"></div>`;
    const totalPatterns = CATS.reduce((n, c) => n + c.patterns.length, 0);
    const totalScreens = CATS.reduce((n, c) => n + c.screens.length, 0);
    $("#stats").innerHTML = `
      <li><strong>${CATS.length}</strong><span>categories</span></li>
      <li><strong>${totalPatterns}</strong><span>patterns</span></li>
      <li><strong>${totalScreens}</strong><span>screenshots collected</span></li>`;

    const chips = $("#chips");
    chips.innerHTML = [{ id: "all", name: "All" }, ...GROUPS].map((g, i) =>
      `<button type="button" class="chip" data-group="${g.id}" aria-pressed="${i === 0}">${esc(g.name)}</button>`).join("");

    let activeGroup = "all";
    const out = $("#categories");
    const status = $("#results-status");

    function card(c) {
      const count = c.screens.length ? plural(c.screens.length, "screen") : plural(c.patterns.length, "pattern");
      return `<li><a class="gallery-item" href="${catUrl(c)}">
        <span class="gallery-thumb" aria-hidden="true">${window.drawWireframe(c.thumb)}</span>
        <span class="gallery-head"><strong>${esc(c.name)}</strong><span class="status-tag${c.screens.length ? " is-live" : ""}">${count}</span></span>
        <p>${esc(c.summary)}</p>
      </a></li>`;
    }

    function render() {
      const groups = activeGroup === "all" ? GROUPS : GROUPS.filter(g => g.id === activeGroup);
      let shown = 0;
      const html = groups.map(g => {
        const list = CATS.filter(c => c.group === g.id);
        shown += list.length;
        if (!list.length) return "";
        return `<section class="group-section" aria-labelledby="g-${g.id}">
          <div class="group-head"><h2 id="g-${g.id}">${esc(g.name)}</h2><p>${esc(g.blurb)}</p></div>
          <ul class="gallery">${list.map(card).join("")}</ul>
        </section>`;
      }).join("");
      out.innerHTML = html;
      status.textContent = activeGroup !== "all" ? `${plural(shown, "category")} shown` : "";
    }

    chips.addEventListener("click", e => {
      const b = e.target.closest(".chip");
      if (!b) return;
      activeGroup = b.dataset.group;
      chips.querySelectorAll(".chip").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
      render();
    });
    render();
  }

  /* ---------- Category ---------- */
  function renderCategory(slug) {
    const idx = CATS.findIndex(c => c.slug === slug);
    const main = $("#content");
    if (idx < 0) {
      document.title = "Not found — Admin Consoles";
      main.innerHTML = `<div class="hero"><h1 class="page-title" tabindex="-1">Category not found.</h1><p class="page-lede"><a href="${HOME}">Back to all categories</a></p></div>`;
      return;
    }
    const c = CATS[idx];
    const g = GROUPS.find(x => x.id === c.group);
    document.title = `${c.name} — Admin Consoles`;

    const G = (window.GUIDANCE || {})[c.slug] || {};
    // Refined Scale + pattern browser layout, used by every category with guidance.
    const refined = !!G.patterns;
    const GP = G.patterns || {};
    const pid = name => "p-" + name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const kebab = t => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const ICON = {
      do: '<svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      dont: '<svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
      chev: '<svg class="chev" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    };

    function tagHtml(tag) {
      if (tag.startsWith("WCAG")) {
        const sc = tag.replace("WCAG ", "");
        const name = (window.WCAG || {})[sc] || "";
        const href = name ? `https://www.w3.org/WAI/WCAG22/Understanding/${kebab(name)}.html` : "https://www.w3.org/TR/WCAG22/";
        return `<a class="ref" href="${href}" target="_blank" rel="noopener noreferrer" title="${esc(name)}">WCAG ${esc(sc)}<span class="visually-hidden"> ${esc(name)}, opens in new tab</span></a>`;
      }
      const name = (window.UD || {})[tag] || "";
      return `<span class="ref ref-ud" title="Universal Design: ${esc(name)}">${esc(name || tag)}</span>`;
    }
    // Refined card: a short lead, then a 2×2 grid. Top row is what to do (Recommended | Avoid);
    // bottom row is the lenses (At enterprise scale | Accessibility); Universal design spans the foot.
    function refinedBody(g) {
      const wcag = g.access.filter(([t]) => t.startsWith("WCAG"));
      const ud = g.access.filter(([t]) => !t.startsWith("WCAG"));
      const sec = (cls, label, content) => `<section class="g-blk ${cls}"><h4>${label}</h4>${content}</section>`;
      return `
        ${sec("g-lead", "How to think about it", list(g.think))}
        <div class="g-quad">
          ${sec("g-do", "Recommended", list(g.do, "is-do"))}
          ${sec("g-dont", "Avoid", list(g.dont, "is-dont"))}
          ${sec("g-scale", "At enterprise scale", list(g.scale))}
          ${sec("g-a11y", "Accessibility", wcag.length ? `<ul class="g-inline">${wcag.map(([t, x]) => `<li>${tagHtml(t)} ${esc(x)}</li>`).join("")}</ul>` : `<p class="g-none">No specific criteria for this pattern.</p>`)}
        </div>
        ${ud.length ? sec("g-foot", "Universal design", `<ul class="g-inline g-ud-cols">${ud.map(([t, x]) => `<li><strong>${esc((window.UD || {})[t] || t)}.</strong> ${esc(x)}</li>`).join("")}</ul>`) : ""}`;
    }
    const list = (items, cls = "") => `<ul class="g-list ${cls}">${items.map(t => `<li>${esc(t)}</li>`).join("")}</ul>`;

    const accordion = c.patterns.map(([name, desc]) => {
      const g = GP[name];
      const shots = c.screens.filter(s => s.pattern === name);
      const thumbs = shots.length ? `
        <div class="g-shots">
          <div class="g-shots-head"><h4>Examples</h4>
            <button type="button" class="text-button" data-goto-screens="${esc(name)}">See ${plural(shots.length, "screen")} in Screens</button></div>
          <ul class="mini-shots">${shots.slice(0, 4).map(s => `<li><a href="${esc(s.src)}" target="_blank" rel="noopener noreferrer" class="mini-shot">
            <img src="${esc(s.src)}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.parentNode.classList.add('broken')">
            <span>${esc(s.product)}<span class="visually-hidden">: ${esc(s.title)}, opens in new tab</span></span></a></li>`).join("")}</ul>
        </div>` : "";
      if (refined && g) return `<details class="acc" id="${pid(name)}">
        <summary>
          <span class="acc-title"><h3>${esc(name)}</h3><span class="acc-desc">${esc(desc)}</span></span>
          <span class="acc-meta">${shots.length ? `<span class="tag">${plural(shots.length, "screen")}</span>` : ""}${ICON.chev}</span>
        </summary>
        <div class="acc-body g-compact">${refinedBody(g)}</div>
      </details>`;
      const body = g ? `
        <section class="g-sec g-think"><h4>How to think about it</h4>${list(g.think)}</section>
        <div class="g-cols">
          <section class="g-sec g-do"><h4>${ICON.do} Do</h4>${list(g.do, "is-do")}</section>
          <section class="g-sec g-dont"><h4>${ICON.dont} Don’t</h4>${list(g.dont, "is-dont")}</section>
        </div>
        <div class="g-cols">
          <section class="g-sec"><h4>Accessibility &amp; universal design</h4>
            <ul class="g-list g-access">${g.access.map(([t, x]) => `<li>${tagHtml(t)}<span>${esc(x)}</span></li>`).join("")}</ul></section>
          <section class="g-sec g-scale"><h4>At enterprise scale</h4>${list(g.scale)}</section>
        </div>` : `<p class="g-empty">Guidance for this pattern hasn’t been written yet.</p>`;
      return `<details class="acc" id="${pid(name)}">
        <summary>
          <span class="acc-title"><h3>${esc(name)}</h3><span class="acc-desc">${esc(desc)}</span></span>
          <span class="acc-meta">${shots.length ? `<span class="tag">${plural(shots.length, "screen")}</span>` : ""}${g ? "" : `<span class="tag is-muted">No guidance yet</span>`}${ICON.chev}</span>
        </summary>
        <div class="acc-body">${body}${thumbs}</div>
      </details>`;
    }).join("");

    // Scale tab, grey-to-black tier ramp and nested pattern cards (any category with a scale overview).
    const nested = !!G.scale;
    const scaleCard = G.scale ? `
      <section class="doc-section" aria-labelledby="scale-h">
        <h2 id="scale-h">Designing for scale</h2>
        <p>${esc(G.scale.intro)}</p>
        <ol class="tiers${nested ? " is-ramp" : ""}">${G.scale.tiers.map(([t, x], i, all) => `<li${!nested && i === all.length - 1 ? ' class="is-focus"' : ""}><span class="tier-tag">${String(i + 1).padStart(2, "0")}</span><strong>${esc(t)}</strong><span>${esc(x)}</span></li>`).join("")}</ol>
        ${refined ? `<h2 class="sub-h2" id="principles-h">Principles that hold at every size</h2>` : `<h3 class="sub">Principles that hold at every size</h3>`}
        <ul class="check-list">${G.scale.principles.map(t => `<li>${esc(t)}</li>`).join("")}</ul>
      </section>` : "";

    const usedPatterns = c.patterns.map(p => p[0]).filter(p => c.screens.some(s => s.pattern === p));
    const screenCard = (s, i) => `<li data-pattern="${esc(s.pattern || "")}"><figure class="screen">
          <a class="screen-img" href="${esc(s.src)}" target="_blank" rel="noopener noreferrer" data-sheet="${i}" aria-label="View ${esc(s.product)} · ${esc(s.title)} larger">
            <img src="${esc(s.src)}" alt="${esc(s.alt || `${s.product}: ${s.title}`)}" loading="lazy" referrerpolicy="no-referrer"
              onerror="this.closest('.screen-img').classList.add('broken')">
            <span class="broken-note">Image unavailable at source</span>
          </a>
          <figcaption>
            <span class="screen-pattern">${esc(s.pattern || "")}</span>
            <strong>${esc(s.product)} · ${esc(s.title)}</strong>
            ${s.notes ? `<span>${esc(s.notes)}</span>` : ""}
            <span class="credit">Screenshot © ${esc(s.credit || s.product)}${s.source ? ` · <a href="${esc(s.source)}" rel="noopener noreferrer" target="_blank">${esc(s.sourceTitle || "Source")}<span class="visually-hidden"> (opens in new tab)</span></a>` : ""}</span>
          </figcaption></figure></li>`;

    const screens = c.screens.length
      ? `${usedPatterns.length > 1 ? `<div class="chips screen-filter" role="group" aria-label="Filter screens by pattern">
            <button type="button" class="chip" data-p="" aria-pressed="true">All <span class="count">${c.screens.length}</span></button>
            ${usedPatterns.map(p => `<button type="button" class="chip" data-p="${esc(p)}" aria-pressed="false">${esc(p)} <span class="count">${c.screens.filter(s => s.pattern === p).length}</span></button>`).join("")}
          </div>` : ""}
          <ul class="screens" id="screen-list">${c.screens.map(screenCard).join("")}</ul>
          <p class="fineprint">Images are linked from each vendor’s public documentation and remain the property of their owners. Collected here for personal design reference.</p>`
      : `<div class="empty-state">
          <h3>No screens saved yet</h3>
          <p>Drop images into <code>screens/${esc(c.slug)}/</code> and add an entry to this category’s <code>screens</code> list in <code>data/categories.js</code>. Tag each with one of the patterns so it gets counted.</p>
        </div>`;

    // Refined: pattern chips above the card (a native select when the space is very narrow,
    // including at high zoom); the chosen pattern's card shows below.
    const pcount = name => c.screens.filter(s => s.pattern === name).length;
    const patternBrowser = refined ? `<section class="doc-section" aria-labelledby="patterns-h">
          <div class="section-head"><div><h2 id="patterns-h">Patterns</h2><p>Pick a pattern to see how to think about it, what to do and avoid, how it holds up at scale, and accessibility.</p></div></div>
          <div class="pat-layout">
            <div class="pat-nav" role="group" aria-label="Choose a pattern">
              ${c.patterns.map(([name], i) => `<button type="button" class="chip pat-item" data-i="${i}" aria-pressed="false" aria-controls="pat-detail">${esc(name)}</button>`).join("")}
            </div>
            <div class="pat-select">
              <label for="pat-select">Pattern</label>
              <select id="pat-select" aria-controls="pat-detail">${c.patterns.map(([name], i) => `<option value="${i}">${i + 1}. ${esc(name)}</option>`).join("")}</select>
            </div>
            <div class="pat-detail" id="pat-detail" tabindex="-1"></div>
          </div>
          <p class="visually-hidden" role="status" id="pat-status"></p>
        </section>` : "";
    main.classList.toggle("is-refined", refined);
    main.innerHTML = `
      <header class="hero">
        <h1 class="page-title" tabindex="-1">${esc(c.name)}</h1>
        <p class="page-lede">${esc(c.summary)}</p>
      </header>
      <div class="tabbar">
        <div class="tablist" role="tablist" aria-label="${esc(c.name)} sections">
          <button type="button" class="tab" role="tab" id="tab-patterns" aria-controls="panel-patterns" aria-selected="true">Patterns <span class="count">${c.patterns.length}</span></button>
          <button type="button" class="tab" role="tab" id="tab-screens" aria-controls="panel-screens" aria-selected="false" tabindex="-1">Screens <span class="count">${c.screens.length}</span></button>
          ${nested ? `<button type="button" class="tab" role="tab" id="tab-scale" aria-controls="panel-scale" aria-selected="false" tabindex="-1">Scale</button>` : ""}
        </div>
      </div>
      <div class="tab-panel" role="tabpanel" id="panel-patterns" aria-labelledby="tab-patterns" tabindex="0">
        ${nested ? "" : scaleCard}
        ${refined ? patternBrowser : `<section class="doc-section" aria-labelledby="patterns-h">
          <div class="section-head">
            <div><h2 id="patterns-h">Patterns</h2><p>Open a pattern for how to think about it, what to do and avoid, accessibility, and how it holds up at scale.</p></div>
            <button type="button" class="text-button" id="toggle-all" aria-expanded="false">Expand all</button>
          </div>
          <div class="accordion${nested ? " is-nested" : ""}">${accordion}</div>
        </section>`}
      </div>
      <div class="tab-panel" role="tabpanel" id="panel-screens" aria-labelledby="tab-screens" tabindex="0" hidden>
        <section class="doc-section" aria-labelledby="screens-h">
          <h2 id="screens-h">Screens</h2>
          <p>Saved references from real products, linked from each vendor’s public documentation.</p>
          ${screens}
        </section>
      </div>
      ${nested ? `<div class="tab-panel" role="tabpanel" id="panel-scale" aria-labelledby="tab-scale" tabindex="0" hidden>${scaleCard}</div>` : ""}`;

    /* tabs */
    const tabs = [...main.querySelectorAll('[role="tab"]')];
    function selectTab(tab, focus) {
      tabs.forEach(t => {
        const on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        $("#" + t.getAttribute("aria-controls")).hidden = !on;
      });
      if (focus) tab.focus();
      const h = tab.id.replace("tab-", "");
      if (location.hash.slice(1) !== h) history.replaceState(null, "", "#" + h);
    }
    tabs.forEach((t, i) => {
      t.addEventListener("click", () => selectTab(t));
      t.addEventListener("keydown", e => {
        const k = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
        if (k) { e.preventDefault(); selectTab(tabs[(i + k + tabs.length) % tabs.length], true); }
        if (e.key === "Home") { e.preventDefault(); selectTab(tabs[0], true); }
        if (e.key === "End") { e.preventDefault(); selectTab(tabs[tabs.length - 1], true); }
      });
    });

    /* screen filter */
    const filter = $(".screen-filter");
    function filterScreens(p) {
      if (!filter) return;
      const b = filter.querySelector(`.chip[data-p="${CSS.escape(p)}"]`) || filter.querySelector(".chip");
      filter.querySelectorAll(".chip").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
      document.querySelectorAll("#screen-list > li").forEach(li => {
        li.hidden = !!b.dataset.p && li.dataset.pattern !== b.dataset.p;
      });
    }
    if (filter) filter.addEventListener("click", e => {
      const b = e.target.closest(".chip");
      if (b) filterScreens(b.dataset.p);
    });
    main.onclick = e => {
      const shot = e.target.closest("a[data-sheet]");
      if (shot && !(e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button)) {
        e.preventDefault();
        openSheet(c, +shot.dataset.sheet, shot);
        return;
      }
      const b = e.target.closest("[data-goto-screens]");
      if (!b) return;
      filterScreens(b.dataset.gotoScreens);
      selectTab($("#tab-screens"), true);
    };

    /* accordions */
    const accs = [...main.querySelectorAll("details.acc")];
    const toggleAll = $("#toggle-all");
    const syncToggle = () => {
      if (!toggleAll) return;
      const allOpen = accs.every(d => d.open);
      toggleAll.textContent = allOpen ? "Collapse all" : "Expand all";
      toggleAll.setAttribute("aria-expanded", String(allOpen));
    };
    if (toggleAll) toggleAll.addEventListener("click", () => {
      const open = !accs.every(d => d.open);
      accs.forEach(d => { d.open = open; });
      syncToggle();
    });
    accs.forEach(d => d.addEventListener("toggle", syncToggle));

    /* pattern browser (refined categories) */
    const patItems = [...main.querySelectorAll(".pat-item")];
    const patSelect = $("#pat-select");
    function showPattern(i, { announce = false, updateHash = true } = {}) {
      const [name, desc] = c.patterns[i];
      const g = GP[name];
      const n = pcount(name);
      const prev = c.patterns[i - 1], next = c.patterns[i + 1];
      $("#pat-detail").innerHTML = `
        <header class="pat-head">
          <p class="pat-pos">Pattern ${i + 1} of ${c.patterns.length}</p>
          <h3 class="pat-title" id="${pid(name)}" tabindex="-1">${esc(name)}</h3>
          <p class="pat-desc">${esc(desc)}</p>
          ${n ? `<button type="button" class="text-button pat-shots" data-goto-screens="${esc(name)}">See ${plural(n, "screen")} in Screens</button>` : ""}
        </header>
        ${clipHtml(c.slug, name)}
        <div class="pat-card g-compact">${g ? refinedBody(g) : `<p class="g-empty">Guidance for this pattern hasn’t been written yet.</p>`}</div>
        <nav class="pat-pager" aria-label="Previous and next pattern">
          ${prev ? `<button type="button" class="pat-step" data-i="${i - 1}"><span>Previous</span>${esc(prev[0])}</button>` : "<span></span>"}
          ${next ? `<button type="button" class="pat-step is-next" data-i="${i + 1}"><span>Next</span>${esc(next[0])}</button>` : ""}
        </nav>`;
      initClip($("#pat-detail"));
      patItems.forEach(b => b.setAttribute("aria-pressed", String(+b.dataset.i === i)));
      if (patSelect) patSelect.value = String(i);
      if (updateHash) history.replaceState(null, "", "#" + pid(name));
      if (announce) $("#pat-status").textContent = `Showing ${name}, pattern ${i + 1} of ${c.patterns.length}`;
    }
    if (patItems.length) {
      main.querySelector(".pat-nav").addEventListener("click", e => {
        const b = e.target.closest(".pat-item");
        if (b) showPattern(+b.dataset.i, { announce: true });
      });
      main.querySelector(".pat-nav").addEventListener("keydown", e => {
        const k = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
        const at = patItems.indexOf(document.activeElement);
        if (!k || at < 0) return;
        e.preventDefault();
        const to = patItems[Math.min(Math.max(at + k, 0), patItems.length - 1)];
        to.focus(); showPattern(+to.dataset.i, { announce: true });
      });
      patSelect.addEventListener("change", () => showPattern(+patSelect.value, { announce: true }));
      $("#pat-detail").addEventListener("click", e => {
        const st = e.target.closest(".pat-step");
        if (!st) return;
        const i = +st.dataset.i;
        showPattern(i, { announce: true });
        const nav = main.querySelector(".pat-nav");
        const target = nav && nav.offsetParent ? patItems[i] : patSelect;
        target.focus({ preventScroll: true });
        $("#pat-detail").scrollIntoView({ block: "start", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      });
      showPattern(0, { updateHash: false });
    }

    /* deep links: #scale, #patterns, #screens, or #p-pattern-name */
    const h = location.hash.slice(1);
    const tabFor = $("#tab-" + CSS.escape(h));
    if (tabFor && tabFor.getAttribute("role") === "tab") selectTab(tabFor);
    else if (h.startsWith("p-") && patItems.length && c.patterns.some(([n]) => pid(n) === h)) {
      selectTab($("#tab-patterns"));
      showPattern(c.patterns.findIndex(([n]) => pid(n) === h));
    }
    else if (h.startsWith("p-") && $("#" + CSS.escape(h))) {
      selectTab($("#tab-patterns"));
      const d = $("#" + CSS.escape(h));
      d.open = true; syncToggle();
      requestAnimationFrame(() => d.scrollIntoView({ block: "start" }));
    }
  }

  /* ---------- Pattern clips ----------
     A short clip above the pattern card (data/videos.js). It waits on its
     poster until the visitor presses play; the controls are plain buttons,
     and the steps accordion is the text alternative. Sound on/off is
     remembered per browser. */
  const SOUND_KEY = "ac-clip-sound";
  const CLIP_ICON = {
    play: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3.5v9l7.5-4.5z" fill="currentColor"/></svg>',
    pause: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4.5 3h2.5v10H4.5zM9 3h2.5v10H9z" fill="currentColor"/></svg>',
    replay: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.2 8a4.8 4.8 0 1 0 1.5-3.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M3 2.5v3h3" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    on: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2.5 6h2.5l3.5-3v10L5 10H2.5z" fill="currentColor"/><path d="M11 5.5a3.5 3.5 0 0 1 0 5M12.8 3.8a6 6 0 0 1 0 8.4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    chev: '<svg class="chev" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    off: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2.5 6h2.5l3.5-3v10L5 10H2.5z" fill="currentColor"/><path d="M11 6l3.5 4M14.5 6L11 10" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>'
  };
  function clipHtml(slug, name) {
    const v = ((window.VIDEOS || {})[slug] || {})[name];
    if (!v) return "";
    return `<figure class="pat-clip">
        <div class="clip-frame">
          <video class="clip-video" src="${esc(v.src)}" poster="${esc(v.poster || "")}" muted playsinline preload="metadata"
            aria-label="${esc(v.label || name)}" aria-describedby="clip-steps"></video>
          <button type="button" class="clip-big" data-clip="big">${CLIP_ICON.play}<span class="visually-hidden">Play clip</span></button>
          <div class="clip-bar">
            <button type="button" class="clip-btn" data-clip="play"></button>
            <button type="button" class="clip-btn" data-clip="sound" aria-pressed="false"></button>
          </div>
        </div>
        ${v.steps ? `<details class="clip-steps"><summary><span>What happens in this clip</span><span class="clip-count">${v.steps.length} steps</span>${CLIP_ICON.chev}</summary>
          <ol id="clip-steps">${v.steps.map(s => `<li>${esc(s)}</li>`).join("")}</ol></details>` : ""}
      </figure>`;
  }
  function initClip(scope) {
    const vid = $(".clip-video", scope);
    if (!vid) return;
    const playBtn = $('[data-clip="play"]', scope), soundBtn = $('[data-clip="sound"]', scope);
    const bigBtn = $('[data-clip="big"]', scope), frame = $(".clip-frame", scope);
    bigBtn.addEventListener("click", () => { vid.play().catch(() => {}); playBtn.focus(); });
    let sound = false;
    try { sound = localStorage.getItem(SOUND_KEY) === "on"; } catch (e) {}
    const paint = () => {
      const state = vid.ended ? "replay" : vid.paused ? "play" : "pause";
      playBtn.innerHTML = `${CLIP_ICON[state]}<span>${{ replay: "Replay", play: "Play", pause: "Pause" }[state]}</span>`;
      soundBtn.innerHTML = `${CLIP_ICON[vid.muted ? "off" : "on"]}<span>${vid.muted ? "Sound off" : "Sound on"}</span>`;
      soundBtn.setAttribute("aria-pressed", String(!vid.muted));
      frame.classList.toggle("is-playing", !vid.paused && !vid.ended);
      bigBtn.lastElementChild.textContent = vid.ended ? "Replay clip" : "Play clip";
    };
    ["play", "pause", "ended", "volumechange"].forEach(e => vid.addEventListener(e, paint));
    playBtn.addEventListener("click", () => { if (vid.paused || vid.ended) vid.play().catch(() => {}); else vid.pause(); });
    soundBtn.addEventListener("click", () => {
      vid.muted = !vid.muted;
      try { localStorage.setItem(SOUND_KEY, vid.muted ? "off" : "on"); } catch (e) {}
    });
    vid.addEventListener("click", () => playBtn.click());
    vid.muted = !sound;
    paint();
  }

  /* ---------- Screen sheet ----------
     A wide drawer from the right: the screenshot on the left, its notes and
     source on the right, and previous / next through every screen in the
     category. */
  const SHEET_W = "90vw";
  let sheet = null;

  function openSheet(c, index, opener) {
    closeSheet(true);
    const list = c.screens;
    const layer = document.createElement("div");
    layer.className = "sheet-layer";
    layer.style.setProperty("--sheet-w", SHEET_W);
    layer.innerHTML = `
      <div class="sheet__scrim" data-close></div>
      <div class="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-crumb sheet-title">
        <header class="sheet__head">
          <h2 class="sheet__crumb" id="sheet-crumb"></h2>
          <div class="sheet__top">
            <div class="sheet__pager" role="group" aria-label="Move between screens">
              <button type="button" class="sheet__step" data-step="-1"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="m10 3.5-4.5 4.5 4.5 4.5"/></svg></button>
              <span class="sheet__count" id="sheet-count"></span>
              <button type="button" class="sheet__step" data-step="1"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="m6 3.5 4.5 4.5L6 12.5"/></svg></button>
            </div>
            <button type="button" class="icon-button sheet__close" data-close aria-label="Close screen"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8"/></svg></button>
          </div>
        </header>
        <div class="sheet__main">
          <aside class="sheet__aside">
            <div id="sheet-detail"></div>
          </aside>
          <div class="sheet__media" id="sheet-media"></div>
        </div>
        <p class="visually-hidden" role="status" id="sheet-status"></p>
      </div>`;
    document.body.appendChild(layer);

    const behind = [document.querySelector(".site-header"), document.querySelector(".app-shell"), document.querySelector(".skip-link")].filter(Boolean);
    behind.forEach(el => el.setAttribute("inert", ""));
    document.documentElement.classList.add("has-sheet");

    const state = { c, list, index: -1, layer, behind, opener };
    sheet = state;

    layer.addEventListener("click", e => {
      if (e.target.closest("[data-close]")) return closeSheet();
      const st = e.target.closest("[data-step]");
      if (st) return stepSheet(+st.dataset.step, true);
    });
    layer.addEventListener("keydown", e => {
      if (e.key === "Escape") { e.preventDefault(); closeSheet(); }
      else if ((e.key === "ArrowRight" || e.key === "ArrowLeft") && !e.target.closest("input, textarea, select")) {
        e.preventDefault(); stepSheet(e.key === "ArrowRight" ? 1 : -1, true);
      } else if (e.key === "Tab") trapSheetFocus(e);
    });

    showSheet(index, false);
    layer.querySelector("#sheet-title").focus();
  }

  function showSheet(i, announce) {
    const st = sheet;
    if (!st || i < 0 || i >= st.list.length) return;
    st.index = i;
    const s = st.list[i], n = st.list.length, L = st.layer;
    L.querySelector("#sheet-media").innerHTML = `
      <figure class="sheet__figure">
        <a class="sheet__img" href="${esc(s.src)}" target="_blank" rel="noopener noreferrer">
          <img src="${esc(s.src)}" alt="${esc(s.alt || `${s.product}: ${s.title}`)}" referrerpolicy="no-referrer"
            onerror="this.closest('.sheet__img').classList.add('broken')">
          <span class="broken-note">Image unavailable at source</span>
          <span class="visually-hidden"> (open full-size image in a new tab)</span>
        </a>
      </figure>`;
    L.querySelector("#sheet-detail").innerHTML = `
      <h3 class="sheet__title" id="sheet-title" tabindex="-1">${esc(s.product)} · ${esc(s.title)}</h3>
      ${s.notes ? `<p class="sheet__notes">${esc(s.notes)}</p>` : ""}
      <p class="sheet__credit">Screenshot © ${esc(s.credit || s.product)}${s.sourceTitle ? ` · ${esc(s.sourceTitle)}` : ""}</p>
      ${s.source ? `<p class="sheet__links"><a class="sheet__link" href="${esc(s.source)}" target="_blank" rel="noopener noreferrer">Open source page<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3.5h6.5V10M12.5 3.5 4 12"/></svg><span class="visually-hidden"> (opens in new tab)</span></a></p>` : ""}`;
    const chev = `<svg class="sheet__crumb-chev" viewBox="0 0 16 16" aria-hidden="true"><path d="m6 3.5 4.5 4.5L6 12.5"/></svg><span class="visually-hidden">, </span>`;
    const grp = GROUPS.find(x => x.id === st.c.group);
    L.querySelector("#sheet-crumb").innerHTML = [
      grp ? `<span class="sheet__crumb-section">${esc(grp.name)}</span>` : "",
      `<span class="sheet__crumb-section">${esc(st.c.name)}</span>`,
      s.pattern ? `<span class="sheet__crumb-sub">${esc(s.pattern)}</span>` : ""
    ].filter(Boolean).join(chev);
    L.querySelector("#sheet-count").innerHTML = `<span class="visually-hidden">Screen </span>${i + 1} of ${n}`;
    const prev = L.querySelector('[data-step="-1"]'), next = L.querySelector('[data-step="1"]');
    prev.setAttribute("aria-label", i > 0 ? `Previous screen: ${st.list[i - 1].product} · ${st.list[i - 1].title}` : "Previous screen");
    next.setAttribute("aria-label", i < n - 1 ? `Next screen: ${st.list[i + 1].product} · ${st.list[i + 1].title}` : "Next screen");
    prev.toggleAttribute("aria-disabled", i === 0);
    next.toggleAttribute("aria-disabled", i === n - 1);
    L.querySelector(".sheet__media").scrollTop = 0;
    if (announce) L.querySelector("#sheet-status").textContent = `Now showing ${s.product} · ${s.title}, ${i + 1} of ${n}`;
  }

  function stepSheet(d, keepFocus) {
    if (!sheet) return;
    const to = sheet.index + d;
    if (to < 0 || to >= sheet.list.length) return;
    const active = document.activeElement;
    showSheet(to, true);
    if (keepFocus && active && !sheet.layer.contains(active)) sheet.layer.querySelector("#sheet-title").focus();
  }

  function trapSheetFocus(e) {
    const f = [...sheet.layer.querySelectorAll('a[href], button:not([disabled]), [tabindex="0"]')].filter(el => el.offsetParent !== null);
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && (document.activeElement === first || !sheet.layer.contains(document.activeElement))) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  function closeSheet(silent) {
    if (!sheet) return;
    const st = sheet;
    sheet = null;
    st.behind.forEach(el => el.removeAttribute("inert"));
    document.documentElement.classList.remove("has-sheet");
    st.layer.remove();
    if (silent) return;
    const card = document.querySelector(`#screen-list a[data-sheet="${st.index}"]`);
    const back = card && !card.closest("li").hidden ? card : st.opener;
    if (back && document.contains(back)) back.focus();
  }

  /* ---------- Router ----------
     Home and category views share one shell. Internal links swap the
     content area in place, so the sidebar never reloads or moves. */
  function markCurrent(slug) {
    document.querySelectorAll("#sidebar .nav-link").forEach(a => {
      if ((a.dataset.slug || "") === (slug || "")) {
        a.setAttribute("aria-current", "page");
        // The current page is never hidden inside a collapsed section.
        const list = a.closest(".nav-list[id]");
        const btn = list && document.querySelector(`.nav-toggle[aria-controls="${list.id}"]`);
        if (btn && btn.getAttribute("aria-expanded") === "false") setNavGroup(btn, true);
      } else a.removeAttribute("aria-current");
    });
  }

  function route() {
    closeSheet(true);
    const slug = slugFromUrl(location.href);
    document.body.dataset.page = slug ? "category" : "home";
    markCurrent(slug);
    if (slug) renderCategory(slug); else renderHome();
  }

  function isInternal(a) {
    if (!a || a.target === "_blank" || a.hasAttribute("download")) return false;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return false;
    return /(^|\/)(index\.html|category\.html)?$/.test(url.pathname);
  }

  document.addEventListener("click", e => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest("a[href]");
    if (!isInternal(a)) return;
    const url = new URL(a.href, location.href);
    // Same view, different hash: let the browser handle it.
    if (url.pathname === location.pathname && url.search === location.search && url.hash) return;
    e.preventDefault();
    if (url.href !== location.href) {
      try { history.pushState(null, "", url.href); }
      catch (err) { location.href = url.href; return; }   // e.g. a browser refusing the URL change
    }
    route();
    // Content starts at the top; the sidebar stays exactly where it is.
    window.scrollTo({ top: 0, behavior: "instant" });
    closeMenu(false);
    const h1 = $("#content h1");
    if (h1) h1.focus({ preventScroll: true });
  });

  addEventListener("popstate", route);

  /* ---------- Header search: the 23 category names and the 116 pattern names; every typed word must start a word in the name ---------- */
  const patId = name => "p-" + name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const words = s => s.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
  const groupName = id => (GROUPS.find(g => g.id === id) || {}).name || "";
  const CAT_ITEMS = CATS.map(c => ({
    kind: "category", name: c.name, sub: groupName(c.group), href: catUrl(c), nameWords: words(c.name)
  }));
  const PATTERNS = CATS.flatMap(c => c.patterns.map(([name]) => ({
    kind: "pattern", name, sub: c.name, href: `${catUrl(c)}#${patId(name)}`, target: patId(name),
    nameWords: words(name)
  })));

  function findIn(items, q) {
    const terms = words(q);
    if (!terms.length) return [];
    return items.map((p, order) => {
      if (!terms.every(t => p.nameWords.some(w => w.startsWith(t)))) return null;
      const lead = p.name.toLowerCase().startsWith(q.trim().toLowerCase()) ? 1 : 0;
      return { p, score: lead, order };
    }).filter(Boolean).sort((a, b) => b.score - a.score || a.order - b.order).map(r => r.p);
  }
  // Bold the start of each word that a typed term matched.
  function markName(name, q) {
    const terms = words(q);
    return name.split(/(\s+|[^A-Za-z0-9\s]+)/).map(part => {
      const lower = part.toLowerCase();
      const t = terms.filter(t => lower.startsWith(t)).sort((a, b) => b.length - a.length)[0];
      return t ? `<mark>${esc(part.slice(0, t.length))}</mark>${esc(part.slice(t.length))}` : esc(part);
    }).join("");
  }

  function initSearch() {
    const box = $("#hsearch"), input = $("#hs-input"), list = $("#hs-list"), status = $("#hs-status");
    const opener = $("#hs-open"), cancel = $("#hs-cancel"), header = $(".site-header");
    if (!box) return;
    let results = [], active = -1, timer = 0;

    function setOpen(open) {
      list.hidden = !open;
      input.setAttribute("aria-expanded", String(open));
      if (!open) setActive(-1);
    }
    function setActive(i) {
      active = i;
      const opts = [...list.querySelectorAll("[data-i]")];
      opts.forEach((o, j) => o.setAttribute("aria-selected", String(j === i)));
      if (i < 0) input.removeAttribute("aria-activedescendant");
      else {
        input.setAttribute("aria-activedescendant", `hs-opt-${i}`);
        opts[i].scrollIntoView({ block: "nearest" });
      }
    }
    function render() {
      const q = input.value;
      const cats = findIn(CAT_ITEMS, q), pats = findIn(PATTERNS, q);
      results = [...cats, ...pats];
      if (!words(q).length) { list.innerHTML = ""; setOpen(false); status.textContent = ""; return; }
      const opt = (p, i) => `<div role="option" id="hs-opt-${i}" aria-selected="false" data-i="${i}">
            <span class="hs-name">${markName(p.name, q)}</span><span class="hs-cat">${esc(p.sub)}</span></div>`;
      const group = (id, label, items, start) => items.length ? `<div class="hs-group" role="group" aria-labelledby="hs-gl-${id}">
            <div class="hs-glabel" id="hs-gl-${id}" role="presentation">${label}</div>${items.map((p, k) => opt(p, start + k)).join("")}</div>` : "";
      list.innerHTML = results.length
        ? group("c", "Categories", cats, 0) + group("p", "Patterns", pats, cats.length)
        : `<div class="hs-empty" role="option" aria-disabled="true" aria-selected="false">No categories or patterns match “${esc(q.trim())}”</div>`;
      setOpen(true);
      setActive(-1);
      clearTimeout(timer);
      timer = setTimeout(() => {
        status.textContent = results.length
          ? `${[cats.length && plural(cats.length, "category"), pats.length && plural(pats.length, "pattern")].filter(Boolean).join(" and ")} found. Use up and down arrows to choose.`
          : "No categories or patterns found.";
      }, 400);
    }
    function go(i) {
      const p = results[i];
      if (!p) return;
      input.value = "";
      render();
      closeCompact(false);
      input.blur();
      try { history.pushState(null, "", p.href); } catch (err) { location.href = p.href; return; }
      route();
      closeMenu(false);
      const t = p.target ? document.getElementById(p.target) : $("#content h1");
      if (t) { t.scrollIntoView({ block: "start" }); t.focus({ preventScroll: true }); }
    }
    function openCompact() {
      header.classList.add("is-searching");
      opener.setAttribute("aria-expanded", "true");
      input.focus();
    }
    function closeCompact(returnFocus) {
      if (!header.classList.contains("is-searching")) return;
      header.classList.remove("is-searching");
      opener.setAttribute("aria-expanded", "false");
      if (returnFocus) opener.focus();
    }

    input.addEventListener("input", render);
    input.addEventListener("focus", () => { if (words(input.value).length) render(); });
    input.addEventListener("keydown", e => {
      const n = results.length;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (list.hidden) render();
        if (n) setActive(active < n - 1 ? active + 1 : 0);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (n) setActive(active > 0 ? active - 1 : n - 1);
      } else if (e.key === "Enter") {
        if (!list.hidden && n) { e.preventDefault(); go(active < 0 ? 0 : active); }
      } else if (e.key === "Escape") {
        e.stopPropagation();
        if (!list.hidden) setOpen(false);
        else if (input.value) { input.value = ""; render(); }
        else closeCompact(true);
      }
    });
    // Keep focus in the field while choosing with a pointer.
    list.addEventListener("mousedown", e => e.preventDefault());
    list.addEventListener("click", e => {
      const li = e.target.closest("[data-i]");
      if (li) go(+li.dataset.i);
    });
    box.addEventListener("focusout", e => {
      if (box.contains(e.relatedTarget)) return;
      setOpen(false);
      if (e.relatedTarget !== opener) closeCompact(false);
    });
    opener.addEventListener("click", openCompact);
    cancel.addEventListener("click", () => { input.value = ""; render(); closeCompact(true); });

    document.addEventListener("keydown", e => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        if ($(".sheet-layer")) return;
        e.preventDefault();
        if (getComputedStyle(opener).display !== "none") openCompact(); else input.focus();
        input.select();
      }
    });
  }

  renderSidebar();
  initSearch();
  route();
})();
