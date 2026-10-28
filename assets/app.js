/* Admin Consoles — shared shell, home grid and category page. */

(function () {
  const GROUPS = window.GROUPS || [];
  const CATS = window.CATEGORIES || [];
  const $ = (s, el = document) => el.querySelector(s);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const plural = (n, w) => `${n} ${n === 1 ? w : w.replace(/y$/, "ie") + "s"}`;
  const catUrl = c => `category.html?c=${encodeURIComponent(c.slug)}`;
  const page = document.body.dataset.page;
  const currentSlug = new URLSearchParams(location.search).get("c");

  /* ---------- Theme ---------- */
  const root = document.documentElement;
  const storedTheme = (() => { try { return localStorage.getItem("ac-theme"); } catch (e) { return null; } })();
  if (storedTheme) root.dataset.theme = storedTheme;

  function effectiveTheme() {
    if (root.dataset.theme) return root.dataset.theme;
    return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function paintToggle(btn) {
    const dark = effectiveTheme() === "dark";
    btn.setAttribute("aria-pressed", String(dark));
    btn.querySelector("span").textContent = dark ? "Dark" : "Light";
  }

  /* ---------- Sidebar ---------- */
  function renderSidebar() {
    const side = $("#sidebar");
    if (!side) return;
    const groupsHtml = GROUPS.map(g => {
      const items = CATS.filter(c => c.group === g.id).map(c => `
        <li><a class="nav-link" href="${catUrl(c)}"${c.slug === currentSlug ? ' aria-current="page"' : ""}>
          ${esc(c.name)}<span>${c.screens.length || ""}</span>
        </a></li>`).join("");
      return `<h2 class="nav-group" id="nav-${g.id}">${esc(g.name)}</h2>
        <ul class="nav-list" aria-labelledby="nav-${g.id}">${items}</ul>`;
    }).join("");

    side.innerHTML = `
      <div class="brand">
        <a class="brand-link" href="index.html">
          <span class="brand-mark" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 16 16"><rect x="1" y="1" width="5" height="14" rx="1.5" fill="#17202a"/><rect x="8" y="1" width="7" height="6" rx="1.5" fill="#17202a"/><rect x="8" y="9" width="7" height="6" rx="1.5" fill="#17202a" opacity=".45"/></svg>
          </span>
          <span class="brand-title">Admin Consoles</span>
        </a>
        <p>A personal library of admin UI patterns, sorted by what the admin is trying to do.</p>
      </div>
      <nav aria-label="Categories">
        <ul class="nav-list">
          <li><a class="nav-link" href="index.html"${page === "home" ? ' aria-current="page"' : ""}>All categories<span>${CATS.length}</span></a></li>
        </ul>
        ${groupsHtml}
      </nav>
      <div class="sidebar-foot">
        <button type="button" class="theme-toggle" id="theme-toggle" aria-label="Dark theme" aria-pressed="false">
          <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 1.5a6.5 6.5 0 0 1 0 13z" fill="currentColor"/></svg>
          <span>Light</span>
        </button>
        <div>Personal inspiration · Sleepy · © 2026</div>
      </div>`;

    const toggle = $("#theme-toggle");
    paintToggle(toggle);
    toggle.addEventListener("click", () => {
      const next = effectiveTheme() === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      try { localStorage.setItem("ac-theme", next); } catch (e) {}
      paintToggle(toggle);
    });

    const menuBtn = $("#menu-button");
    if (menuBtn) {
      menuBtn.addEventListener("click", () => {
        const open = side.classList.toggle("open");
        menuBtn.setAttribute("aria-expanded", String(open));
        menuBtn.textContent = open ? "Close" : "Menu";
      });
      document.addEventListener("keydown", e => {
        if (e.key === "Escape" && side.classList.contains("open")) { menuBtn.click(); menuBtn.focus(); }
      });
    }
  }

  /* ---------- Home ---------- */
  function renderHome() {
    const totalPatterns = CATS.reduce((n, c) => n + c.patterns.length, 0);
    const totalScreens = CATS.reduce((n, c) => n + c.screens.length, 0);
    $("#stats").innerHTML = `
      <li><strong>${CATS.length}</strong><span>categories</span></li>
      <li><strong>${totalPatterns}</strong><span>patterns to collect</span></li>
      <li><strong>${totalScreens}</strong><span>screens saved</span></li>`;

    const chips = $("#chips");
    chips.innerHTML = [{ id: "all", name: "All" }, ...GROUPS].map((g, i) =>
      `<button type="button" class="chip" data-group="${g.id}" aria-pressed="${i === 0}">${esc(g.name)}</button>`).join("");

    let activeGroup = "all";
    const search = $("#search");
    const out = $("#categories");
    const status = $("#results-status");

    function card(c) {
      const shown = c.patterns.slice(0, 3).map(p => `<li>${esc(p[0])}</li>`).join("");
      const more = c.patterns.length > 3 ? `<li>+${c.patterns.length - 3}</li>` : "";
      const count = c.screens.length ? plural(c.screens.length, "screen") : plural(c.patterns.length, "pattern");
      return `<li class="cat-card">
        <div class="thumb">${window.drawWireframe(c.thumb)}</div>
        <div class="cat-body">
          <div class="cat-title-row">
            <h3><a href="${catUrl(c)}">${esc(c.name)}</a></h3>
            <span class="count">${count}</span>
          </div>
          <p>${esc(c.summary)}</p>
          <ul class="tags" aria-label="Patterns">${shown}${more}</ul>
        </div>
      </li>`;
    }

    function matches(c, q) {
      if (!q) return true;
      const hay = [c.name, c.summary, ...c.patterns.flat(), ...c.screens.map(s => `${s.product} ${s.title} ${s.pattern}`)].join(" ").toLowerCase();
      return q.split(/\s+/).every(t => hay.includes(t));
    }

    function render() {
      const q = search.value.trim().toLowerCase();
      const groups = activeGroup === "all" ? GROUPS : GROUPS.filter(g => g.id === activeGroup);
      let shown = 0;
      const html = groups.map(g => {
        const list = CATS.filter(c => c.group === g.id && matches(c, q));
        shown += list.length;
        if (!list.length) return "";
        return `<section class="group-section" aria-labelledby="g-${g.id}">
          <div class="group-head"><h2 id="g-${g.id}">${esc(g.name)}</h2><p>${esc(g.blurb)}</p></div>
          <ul class="grid">${list.map(card).join("")}</ul>
        </section>`;
      }).join("");
      out.innerHTML = html || `<div class="empty-results"><strong>Nothing matches “${esc(search.value)}”.</strong><br>Try a pattern name like “delete”, “invite” or “SSO”.</div>`;
      status.textContent = q || activeGroup !== "all" ? `${plural(shown, "category")} shown` : "";
    }

    chips.addEventListener("click", e => {
      const b = e.target.closest(".chip");
      if (!b) return;
      activeGroup = b.dataset.group;
      chips.querySelectorAll(".chip").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
      render();
    });
    search.addEventListener("input", render);
    document.addEventListener("keydown", e => {
      if (e.key === "/" && document.activeElement !== search && !/input|textarea/i.test(document.activeElement.tagName)) {
        e.preventDefault(); search.focus();
      }
    });
    render();
  }

  /* ---------- Category ---------- */
  function renderCategory() {
    const idx = CATS.findIndex(c => c.slug === currentSlug);
    const main = $("#content");
    if (idx < 0) {
      document.title = "Not found — Admin Consoles";
      main.innerHTML = `<div class="hero"><h1>Category not found.</h1><p class="hero-copy"><a href="index.html">Back to all categories</a></p></div>`;
      return;
    }
    const c = CATS[idx];
    const g = GROUPS.find(x => x.id === c.group);
    const prev = CATS[idx - 1], next = CATS[idx + 1];
    document.title = `${c.name} — Admin Consoles`;

    const G = (window.GUIDANCE || {})[c.slug] || {};
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
    const list = (items, cls = "") => `<ul class="g-list ${cls}">${items.map(t => `<li>${esc(t)}</li>`).join("")}</ul>`;

    const accordion = c.patterns.map(([name, desc]) => {
      const g = GP[name];
      const shots = c.screens.filter(s => s.pattern === name);
      const thumbs = shots.length ? `
        <div class="g-shots">
          <div class="g-shots-head"><h4>Examples</h4>
            <button type="button" class="link-btn" data-goto-screens="${esc(name)}">See ${plural(shots.length, "screen")} in Screens</button></div>
          <ul class="mini-shots">${shots.slice(0, 4).map(s => `<li><a href="${esc(s.src)}" target="_blank" rel="noopener noreferrer" class="mini-shot">
            <img src="${esc(s.src)}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.parentNode.classList.add('broken')">
            <span>${esc(s.product)}<span class="visually-hidden">: ${esc(s.title)}, opens in new tab</span></span></a></li>`).join("")}</ul>
        </div>` : "";
      const body = g ? `
        <section class="g-sec g-think"><h4>How to think about it</h4>${list(g.think)}</section>
        <div class="g-dd">
          <section class="g-sec g-do"><h4>${ICON.do} Do</h4>${list(g.do, "is-do")}</section>
          <section class="g-sec g-dont"><h4>${ICON.dont} Don’t</h4>${list(g.dont, "is-dont")}</section>
        </div>
        <div class="g-dd">
          <section class="g-sec"><h4>Accessibility &amp; universal design</h4>
            <ul class="g-list g-access">${g.access.map(([t, x]) => `<li>${tagHtml(t)}<span>${esc(x)}</span></li>`).join("")}</ul></section>
          <section class="g-sec g-scale"><h4>At enterprise scale</h4>${list(g.scale)}</section>
        </div>` : `<p class="g-empty">Guidance for this pattern hasn’t been written yet.</p>`;
      return `<details class="acc" id="${pid(name)}">
        <summary>
          <span class="acc-title"><h3>${esc(name)}</h3><span class="acc-desc">${esc(desc)}</span></span>
          <span class="acc-meta">${shots.length ? `<span class="badge">${plural(shots.length, "screen")}</span>` : ""}${g ? "" : `<span class="badge badge-muted">No guidance yet</span>`}${ICON.chev}</span>
        </summary>
        <div class="acc-body">${body}${thumbs}</div>
      </details>`;
    }).join("");

    const scaleCard = G.scale ? `
      <section class="card scale-card" aria-labelledby="scale-h">
        <p class="eyebrow">Designing for scale</p>
        <h2 id="scale-h">From tens to hundreds of thousands</h2>
        <p class="scale-intro">${esc(G.scale.intro)}</p>
        <ol class="tiers">${G.scale.tiers.map(([t, x], i) => `<li><span class="tier-step" aria-hidden="true">${i + 1}</span><strong>${esc(t)}</strong><span>${esc(x)}</span></li>`).join("")}</ol>
        <h3 class="principles-h">Principles that hold at every size</h3>
        ${list(G.scale.principles, "principles")}
      </section>` : "";

    const usedPatterns = c.patterns.map(p => p[0]).filter(p => c.screens.some(s => s.pattern === p));
    const screenCard = s => `<li data-pattern="${esc(s.pattern || "")}"><figure class="screen">
          <a class="screen-img" href="${esc(s.src)}" target="_blank" rel="noopener noreferrer">
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

    main.innerHTML = `
      <header class="hero">
        <p class="crumbs"><a href="index.html">All categories</a> / ${esc(g ? g.name : "")}</p>
        <h1>${esc(c.name)}</h1>
        <p class="hero-copy">${esc(c.summary)}</p>
      </header>
      <div class="tabs" role="tablist" aria-label="${esc(c.name)} sections">
        <button type="button" role="tab" id="tab-patterns" aria-controls="panel-patterns" aria-selected="true">Patterns <span class="count">${c.patterns.length}</span></button>
        <button type="button" role="tab" id="tab-screens" aria-controls="panel-screens" aria-selected="false" tabindex="-1">Screens <span class="count">${c.screens.length}</span></button>
      </div>
      <div class="tab-panel" role="tabpanel" id="panel-patterns" aria-labelledby="tab-patterns" tabindex="0">
        ${scaleCard}
        <section class="card" aria-labelledby="patterns-h">
          <div class="acc-head">
            <div><h2 id="patterns-h">Patterns</h2><p>Open a pattern for how to think about it, what to do and avoid, accessibility, and how it holds up at scale.</p></div>
            <button type="button" class="ghost-btn" id="toggle-all" aria-expanded="false">Expand all</button>
          </div>
          <div class="accordion">${accordion}</div>
        </section>
      </div>
      <div class="tab-panel" role="tabpanel" id="panel-screens" aria-labelledby="tab-screens" tabindex="0" hidden>
        <section class="card" aria-labelledby="screens-h">
          <h2 id="screens-h">Screens</h2>
          <p>Saved references from real products.</p>
          ${screens}
        </section>
      </div>
      <nav class="pager" aria-label="Other categories">
        ${prev ? `<a href="${catUrl(prev)}"><span>Previous</span><strong>${esc(prev.name)}</strong></a>` : ""}
        ${next ? `<a class="next" href="${catUrl(next)}"><span>Next</span><strong>${esc(next.name)}</strong></a>` : ""}
      </nav>`;

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
    main.addEventListener("click", e => {
      const b = e.target.closest("[data-goto-screens]");
      if (!b) return;
      filterScreens(b.dataset.gotoScreens);
      selectTab($("#tab-screens"), true);
    });

    /* accordions */
    const accs = [...main.querySelectorAll("details.acc")];
    const toggleAll = $("#toggle-all");
    const syncToggle = () => {
      const allOpen = accs.every(d => d.open);
      toggleAll.textContent = allOpen ? "Collapse all" : "Expand all";
      toggleAll.setAttribute("aria-expanded", String(allOpen));
    };
    toggleAll.addEventListener("click", () => {
      const open = !accs.every(d => d.open);
      accs.forEach(d => { d.open = open; });
      syncToggle();
    });
    accs.forEach(d => d.addEventListener("toggle", syncToggle));

    /* deep links: #screens, or #p-pattern-name */
    const h = location.hash.slice(1);
    if (h === "screens") selectTab($("#tab-screens"));
    else if (h.startsWith("p-") && $("#" + CSS.escape(h))) {
      const d = $("#" + CSS.escape(h));
      d.open = true; syncToggle();
      requestAnimationFrame(() => d.scrollIntoView({ block: "start" }));
    }
  }

  renderSidebar();
  if (page === "home") renderHome();
  if (page === "category") renderCategory();
})();
