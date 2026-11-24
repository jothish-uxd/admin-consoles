/* Echo Base Console prototype: the core.
   Hash routes, state kept in this browser, and the shared pieces every page uses:
   page header and tabs, dialogs that hold focus, menus, toasts that are also announced.
   Pages live in views-*.js and register themselves with route(). */
(() => {
  const KEY = "ebc-prototype-v1";
  const clone = o => JSON.parse(JSON.stringify(o));
  let S;
  function load() {
    let saved = null;
    try { saved = JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) { saved = null; }
    S = saved && saved.v === 1 ? saved : Object.assign(clone(window.SEED), { v: 1 });
    S.plan.assigned = S.plan.assigned ?? 246;
    // newer seed data for state saved before it existed
    if (!S.groups.some(g => g.id === "hoth")) S.groups.splice(1, 0, clone(window.SEED.groups.find(g => g.id === "hoth")));
    S.org = S.org || clone(window.SEED.org);
    S.roleDeps = S.roleDeps || clone(window.SEED.roleDeps);
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* storage off: changes last until reload */ } }
  load();

  /* ---------- tiny helpers ---------- */
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];
  const money = (v, dp = 2) => (v < 0 ? "−$" : "$") + Math.abs(v).toLocaleString("en-US", { minimumFractionDigits: dp, maximumFractionDigits: dp });
  const num = v => v.toLocaleString("en-US");
  const ICON = {
    home: '<path d="M2.5 7.5 8 3l5.5 4.5V13H2.5z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>',
    archives: '<rect x="2.5" y="3" width="11" height="3" rx="1" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M3.5 6v7h9V6M6.5 8.5h3" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
    myaccess: '<circle cx="6" cy="8" r="2.6" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8.6 8h5M11.5 8v2M13.5 8v1.6" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
    people: '<circle cx="6" cy="5.5" r="2.2" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M2 13c.4-2.4 2-3.6 4-3.6s3.6 1.2 4 3.6M10.5 3.6a2 2 0 0 1 0 3.8M12 9.6c1 .5 1.7 1.6 2 3.4" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
    access: '<rect x="3" y="7" width="10" height="6.5" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M5.3 7V5.2a2.7 2.7 0 0 1 5.4 0V7" fill="none" stroke="currentColor" stroke-width="1.4"/>',
    content: '<path d="M2.5 4.5h4l1.2 1.5h5.8v7h-11z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>',
    ai: '<path d="M8 2.5l1.3 3.2L12.5 7 9.3 8.3 8 11.5 6.7 8.3 3.5 7l3.2-1.3zM12.5 11l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>',
    policies: '<path d="M4 2.5h6l2.5 2.5v8.5H4z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M6 7.5h4.5M6 10h4.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
    compliance: '<path d="M8 2.2 13 4v4c0 3-2.2 5-5 5.8C5.2 13 3 11 3 8V4z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>',
    insights: '<path d="M2.5 13.5h11M4.5 11V8M8 11V4.5M11.5 11V6.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    billing: '<rect x="2" y="4" width="12" height="8.5" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M2 7h12M4.5 10h2.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
    settings: '<circle cx="8" cy="8" r="2" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 2v2M8 12v2M2 8h2M12 8h2M3.8 3.8l1.4 1.4M10.8 10.8l1.4 1.4M3.8 12.2l1.4-1.4M10.8 5.2l1.4-1.4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
    ok: '<path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
    no: '<circle cx="8" cy="8" r="6.3" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M5.6 5.6l4.8 4.8M10.4 5.6l-4.8 4.8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    warn: '<path d="M8 2l6.5 11.5h-13z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M8 6.5v3.2M8 11.6v.1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    info: '<circle cx="8" cy="8" r="6.3" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8 7.2v4M8 4.8v.1" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
    back: '<path d="M6 4L2.5 7.5 6 11M3 7.5h7a3.5 3.5 0 0 1 0 7H8" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>'
  };
  const icon = (n, cls = "") => `<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false" class="${cls}">${ICON[n]}</svg>`;
  const okSt = t => `<span class="st">${icon("ok")}${esc(t)}</span>`;
  const badSt = t => `<span class="st bad">${icon("no")}${esc(t)}</span>`;

  /* ---------- rail ---------- */
  const RAIL = [
    ["Workspace", [["home", "Home", "/home"], ["archives", "Archives", "/archives"], ["myaccess", "My access", "/my-access"]]],
    ["Admin", [["people", "People", "/people/users"], ["access", "Access", "/access/approvals"], ["content", "Content", "/content/all"], ["ai", "AI", "/ai/features"],
      ["compliance", "Audit log", "/compliance/audit"], ["policies", "Policies", "/compliance/policies"], ["insights", "Insights", "/insights"], ["billing", "Billing", "/billing/plan"], ["settings", "Settings", "/settings/organization"]], "admin"]
  ];
  function drawRail(at) {
    $("#rail").innerHTML = RAIL.filter(g => !g[2] || S.role === "admin").map(([label, items]) =>
      `<h2 id="rail-${label}">${label}</h2><ul aria-labelledby="rail-${label}">` + items.map(([id, name, href]) =>
        `<li><a href="#${href}"${id === at ? ' aria-current="page"' : ""}>${icon(id)}${name}</a></li>`).join("") + "</ul>").join("") +
      `<div class="reset">Prototype data stays in this browser. <button type="button" data-act="reset">Reset demo data</button></div>`;
  }
  function drawTop(crumbs) {
    const t = S.me.titles[S.role];
    $("#crumb").innerHTML = `<ol>${crumbs.map((c, i) => i === crumbs.length - 1 ? `<li><span aria-current="page">${esc(c[0])}</span></li>` : `<li><a href="#${c[1]}">${esc(c[0])}</a></li>`).join("")}</ol>`;
    $("#me").innerHTML = `<button type="button" aria-haspopup="menu" aria-expanded="false" data-act="menu" data-menu="me-menu">${esc(S.me.name)} · ${esc(t)} <span class="av">${S.me.initials}</span></button>
      <div class="menu" id="me-menu" role="menu" hidden>
        <button role="menuitemradio" aria-checked="${S.role === "admin"}" data-act="role" data-role="admin">View as admin · Jedi Master</button>
        <button role="menuitemradio" aria-checked="${S.role === "member"}" data-act="role" data-role="member">View as member · Jedi in training</button>
      </div>`;
  }

  /* ---------- routing ---------- */
  const ROUTES = [];
  const route = (pattern, view) => ROUTES.push({ re: new RegExp("^" + pattern.replace(/:(\w+)/g, "(?<$1>[^/]+)") + "$"), view });
  let current = null, lastPath = null;
  function parse() {
    const h = decodeURIComponent(location.hash.slice(1) || "/home");
    const [path, qs] = h.split("?");
    return { path, q: Object.fromEntries(new URLSearchParams(qs || "")) };
  }
  function render(opts = {}) {
    const { path, q } = parse();
    let m = null, r = ROUTES.find(r => (m = path.match(r.re)));
    if (!r) { location.hash = "#/home"; return; }
    const params = Object.assign({}, m.groups, q);
    if (!opts.keepFocus && path !== lastPath) dlgStack.slice().reverse().forEach(x => x.close());  // leaving the page closes its dialogs
    const focusId = document.activeElement && document.activeElement.id;
    const v = r.view(params);
    current = { v, params, path };
    drawRail(v.nav); drawTop(v.crumbs || [["Home", "/home"]]);
    document.title = (v.title || "Echo Base Console") + " · Echo Base Console prototype";
    $("#main").innerHTML = v.html;
    window.DD && window.DD.scan($("#main"));  // dropdowns are enhanced now, so focus can return to them by id
    v.mount && v.mount($("#main"), params);
    const moved = path !== lastPath; lastPath = path;
    if (moved && !opts.keepFocus) { const h1 = $("#main h1"); if (h1) { h1.setAttribute("tabindex", "-1"); h1.focus({ preventScroll: true }); } window.scrollTo(0, 0); }
    else if (focusId && document.getElementById(focusId)) document.getElementById(focusId).focus({ preventScroll: true });
  }
  const rerender = () => render({ keepFocus: true });
  const go = p => { if (location.hash === "#" + p) rerender(); else location.hash = "#" + p; };
  window.addEventListener("hashchange", () => render());

  /* ---------- announcements and toasts ---------- */
  function announce(msg) { const l = $("#live"); l.textContent = ""; setTimeout(() => { l.textContent = msg; }, 40); }
  function toast(msg, undo) {
    // a toast with Undo waits 10 s, and the wait pauses while the pointer or focus is on it
    const t = document.createElement("div"); t.className = "toast";
    t.innerHTML = `${icon("ok")}<span>${esc(msg)}</span>${undo ? '<span class="tm" aria-hidden="true"></span><button type="button" data-undo>Undo</button><i class="bar" aria-hidden="true"></i>' : ""}<button type="button" class="close" aria-label="Dismiss">✕</button>`;
    $("#toasts").appendChild(t); announce(msg + (undo ? ". Undo is available for 10 seconds." : ""));
    let left = undo ? 10000 : 6000, last = Date.now(), paused = false, timer;
    const kill = () => { clearInterval(timer); t.remove(); };
    const tick = () => {
      if (!paused) { left -= Date.now() - last; }
      last = Date.now();
      if (undo) { t.querySelector(".tm").textContent = paused ? "Paused" : Math.max(1, Math.ceil(left / 1000)) + "s"; t.querySelector(".bar").style.transform = `scaleX(${Math.max(0, left / 10000)})`; }
      if (left <= 0) kill();
    };
    const pause = on => { tick(); paused = on && !!undo; tick(); };
    t.addEventListener("mouseenter", () => pause(true)); t.addEventListener("mouseleave", () => pause(t.contains(document.activeElement)));
    t.addEventListener("focusin", () => pause(true)); t.addEventListener("focusout", () => setTimeout(() => pause(t.matches(":hover")), 0));
    timer = setInterval(tick, 200); tick();
    t.querySelector(".close").onclick = kill;
    if (undo) t.querySelector("[data-undo]").onclick = () => { undo(); kill(); };
  }

  /* ---------- dialogs: labelled, focus held inside, Esc closes, focus goes back ---------- */
  let dlgStack = [];
  function dialog({ title, body, foot, wide, onOpen, label }) {
    const opener = document.activeElement;
    const id = "dlg" + Date.now();
    const scrim = document.createElement("div"); scrim.className = "scrim";
    const d = document.createElement("div");
    d.className = "dialog" + (wide ? " wide" : ""); d.setAttribute("role", "dialog"); d.setAttribute("aria-modal", "true"); d.setAttribute("aria-labelledby", id + "-t");
    d.innerHTML = `<button type="button" class="icon-btn x" aria-label="Close ${esc(label || title)}" data-close>✕</button><h2 id="${id}-t">${esc(title)}</h2><div class="dbody">${body}</div>${foot ? `<div class="foot">${foot}</div>` : ""}`;
    document.body.append(scrim, d);
    $$("#app, .top, .rail").forEach(e => e.setAttribute("aria-hidden", "true"));
    const close = () => {
      scrim.remove(); d.remove(); dlgStack = dlgStack.filter(x => x.d !== d);
      if (!dlgStack.length) $$("#app, .top, .rail").forEach(e => e.removeAttribute("aria-hidden"));
      if (opener && document.contains(opener)) opener.focus(); else { const h1 = $("#main h1"); h1 && h1.focus(); }
    };
    const api = { el: d, close };
    dlgStack.push({ d, close });
    d.addEventListener("keydown", e => {
      if (e.key === "Escape") { e.preventDefault(); close(); }
      if (e.key === "Tab") {
        const f = $$('button:not([disabled]), [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])', d).filter(x => x.offsetParent !== null);
        if (!f.length) return;
        const a = f[0], z = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
        else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
      }
    });
    d.addEventListener("click", e => { if (e.target.closest("[data-close]")) close(); });
    scrim.addEventListener("click", close);
    onOpen && onOpen(d, api);
    window.DD && window.DD.scan(d);   // selects in dialogs get the same custom dropdown
    const first = $("[autofocus]", d) || $("input, select, textarea, button:not(.x)", d);
    first && first.focus();
    return api;
  }

  /* ---------- menus: a button opens a list; arrows move, Esc closes ---------- */
  function closeMenus(except) {
    $$(".menu").forEach(m => { if (m !== except && !m.hidden) { m.hidden = true; const b = $(`[data-menu="${m.id}"]`); b && b.setAttribute("aria-expanded", "false"); } });
  }
  document.addEventListener("click", e => {
    const b = e.target.closest('[data-act="menu"]');
    if (b) {
      const m = document.getElementById(b.dataset.menu); const open = m.hidden;
      closeMenus(m); m.hidden = !open; b.setAttribute("aria-expanded", String(open));
      if (open) { const f = $('[role^="menuitem"]', m); f && f.focus(); }
      return;
    }
    if (!e.target.closest(".menu")) closeMenus();
  });
  document.addEventListener("keydown", e => {
    const m = e.target.closest && e.target.closest(".menu");
    if (!m) return;
    const items = $$('[role^="menuitem"]', m), i = items.indexOf(document.activeElement);
    if (e.key === "ArrowDown") { e.preventDefault(); items[(i + 1) % items.length].focus(); }
    if (e.key === "ArrowUp") { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); }
    if (e.key === "Escape") { e.preventDefault(); m.hidden = true; const b = $(`[data-menu="${m.id}"]`); b && (b.setAttribute("aria-expanded", "false"), b.focus()); }
  });

  /* ---------- actions: [data-act] buttons call ACT[name] ---------- */
  const ACT = {
    reset() {
      dialog({ title: "Reset demo data?", body: `<p class="muted">Everything you changed in this prototype goes back to how it started: the same people, numbers and story as the pattern clips.</p>`,
        foot: `<button type="button" class="btn ghost" data-close>Cancel</button><button type="button" class="btn pri" id="doReset">Reset demo data</button>`,
        onOpen: (d, api) => $("#doReset", d).onclick = () => { try { localStorage.removeItem(KEY); } catch (e) {} load(); api.close(); go("/home"); toast("Demo data reset"); } });
    },
    role(b) { S.role = b.dataset.role; save(); closeMenus(); if (S.role === "member" && !/^\/(home|archives|my-access)/.test(parse().path)) go("/home"); else rerender(); announce("Viewing as " + (S.role === "admin" ? "admin" : "member")); }
  };
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-act]");
    if (!b || b.dataset.act === "menu") return;
    const f = ACT[b.dataset.act] || (current && current.v.act && current.v.act[b.dataset.act]);
    if (f) { e.preventDefault(); f(b, e); }
  });
  document.addEventListener("change", e => {
    const el = e.target.closest("[data-change]");
    if (!el) return;
    const f = current && current.v.act && current.v.act[el.dataset.change];
    f && f(el, e);
  });
  document.addEventListener("input", e => {
    const el = e.target.closest("[data-input]");
    if (!el) return;
    const f = current && current.v.act && current.v.act[el.dataset.input];
    f && f(el, e);
  });

  /* ---------- page pieces ---------- */
  // header row: title + actions
  const head = (title, actions = "", lede = "") => `<div class="hd"><h1>${esc(title)}</h1>${actions}</div>${lede ? `<p class="lede">${lede}</p>` : ""}`;
  // page tabs are links: each tab is its own address, so back and forward work
  const tabs = (label, items, at) => `<nav class="tabs" aria-label="${esc(label)}">${items.map(([id, name, href]) =>
    `<a href="#${href}"${id === at ? ' aria-current="page"' : ""}>${name}</a>`).join("")}</nav>`;
  const kv = (pairs, cls = "") => `<dl class="kv ${cls}">${pairs.map(([k, v, w]) => `<div${w ? ' class="w"' : ""}><dt>${esc(k)}</dt><dd>${v}</dd></div>`).join("")}</dl>`;
  const empty = (title, text) => `<div class="empty"><b>${esc(title)}</b>${text}</div>`;

  window.App = { get S() { return S; }, save, route, render, rerender, go, esc, $, $$, money, num, icon, okSt, badSt, toast, announce, dialog, closeMenus, head, tabs, kv, empty, parse };
  window.addEventListener("DOMContentLoaded", () => render());
})();
