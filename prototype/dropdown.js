/* Dropdowns that open the same drawn menu as the clips, instead of the browser's own list.
   Every <select> on the page is enhanced into a select-only combobox (the ARIA pattern):
   - a button-like combobox shows the value, with the chevron 12px in from the right
   - Down, Up, Enter, Space or Alt+Down opens it; typing letters jumps to a match
   - when open: Up and Down move, Home and End jump, Enter or Space picks, Esc closes, Tab picks and moves on
   The real <select> stays in the page, hidden, so its value, label and change events keep working:
   picking an option sets select.value and fires "change", exactly as before. */
(() => {
  let n = 0;
  const CHECK = '<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function enhance(sel) {
    if (sel.dataset.dd || window.matchMedia("(forced-colors: active)").matches) return;
    sel.dataset.dd = "1";
    const uid = "dd" + (++n), id = sel.id || uid;
    const wrap = document.createElement("span"); wrap.className = "dd";
    if (sel.getAttribute("style")) wrap.setAttribute("style", sel.getAttribute("style"));
    const cb = document.createElement("div");
    cb.className = "dd-cb"; cb.id = id + "-cb"; cb.tabIndex = sel.disabled ? -1 : 0;
    cb.setAttribute("role", "combobox"); cb.setAttribute("aria-haspopup", "listbox"); cb.setAttribute("aria-expanded", "false"); cb.setAttribute("aria-controls", uid + "-lb");
    if (sel.disabled) cb.setAttribute("aria-disabled", "true");
    ["aria-describedby", "aria-invalid"].forEach(a => sel.hasAttribute(a) && cb.setAttribute(a, sel.getAttribute(a)));
    // name it from its <label>, or from the select's own aria-label
    const lab = sel.id && document.querySelector(`label[for="${CSS.escape(sel.id)}"]`);
    if (lab) { lab.id = lab.id || uid + "-lbl"; cb.setAttribute("aria-labelledby", lab.id + " " + cb.id); lab.addEventListener("click", e => { e.preventDefault(); cb.focus(); }); }
    else if (sel.getAttribute("aria-label")) cb.setAttribute("aria-label", sel.getAttribute("aria-label"));
    const val = document.createElement("span"); val.className = "dd-v"; cb.appendChild(val);
    const lb = document.createElement("div"); lb.className = "dd-lb"; lb.id = uid + "-lb"; lb.setAttribute("role", "listbox"); lb.hidden = true;
    if (lab) lb.setAttribute("aria-labelledby", lab.id);
    const opts = [...sel.options].map((o, i) => {
      const el = document.createElement("div"); el.id = `${uid}-o${i}`; el.setAttribute("role", "option"); el.className = "dd-o";
      el.innerHTML = `<span>${o.textContent.replace(/[&<]/g, c => c === "&" ? "&amp;" : "&lt;")}</span>${CHECK}`;
      if (o.disabled) el.setAttribute("aria-disabled", "true");
      el.addEventListener("mousedown", e => e.preventDefault()); // keep focus on the combobox
      el.addEventListener("click", () => { if (!o.disabled) { pick(i); close(); } });
      el.addEventListener("mousemove", () => setActive(i));
      lb.appendChild(el); return el;
    });
    sel.parentNode.insertBefore(wrap, sel); wrap.append(cb, lb, sel);
    sel.tabIndex = -1; sel.setAttribute("aria-hidden", "true"); sel.classList.add("dd-native");

    let active = sel.selectedIndex, typed = "", typedAt = 0;
    const isOpen = () => !lb.hidden;
    function sync() { val.textContent = sel.options[sel.selectedIndex] ? sel.options[sel.selectedIndex].textContent : "";
      opts.forEach((el, i) => el.setAttribute("aria-selected", String(i === sel.selectedIndex))); }
    function setActive(i) { if (i < 0 || i >= opts.length) return; active = i; opts.forEach((el, j) => el.classList.toggle("on", j === i));
      cb.setAttribute("aria-activedescendant", opts[i].id); const el = opts[i]; if (el.offsetTop < lb.scrollTop) lb.scrollTop = el.offsetTop; else if (el.offsetTop + el.offsetHeight > lb.scrollTop + lb.clientHeight) lb.scrollTop = el.offsetTop + el.offsetHeight - lb.clientHeight; }
    function open() { if (sel.disabled || isOpen()) return; document.querySelectorAll(".dd-lb:not([hidden])").forEach(x => x !== lb && x.ddClose && x.ddClose());
      lb.hidden = false; cb.setAttribute("aria-expanded", "true"); wrap.classList.add("open");
      place();
      setActive(sel.selectedIndex < 0 ? 0 : sel.selectedIndex); }
    function close() { if (!isOpen()) return; lb.hidden = true; cb.setAttribute("aria-expanded", "false"); cb.removeAttribute("aria-activedescendant"); wrap.classList.remove("open"); }
    lb.ddClose = close;
    // the list floats above everything (dialogs included), under the box, or above it when there's no room below
    function place() { const r = cb.getBoundingClientRect(), h = Math.min(lb.scrollHeight, 280), below = window.innerHeight - r.bottom;
      lb.style.left = r.left + "px"; lb.style.minWidth = r.width + "px";
      if (below < h + 12 && r.top > below) { lb.style.top = ""; lb.style.bottom = (window.innerHeight - r.top + 4) + "px"; } else { lb.style.bottom = ""; lb.style.top = (r.bottom + 4) + "px"; } }
    function pick(i) { if (opts[i].getAttribute("aria-disabled") === "true") return; if (sel.selectedIndex !== i) { sel.selectedIndex = i; sync(); sel.dispatchEvent(new Event("change", { bubbles: true })); sel.dispatchEvent(new Event("input", { bubbles: true })); } }
    function step(d) { let i = active; do { i += d; } while (i >= 0 && i < opts.length && opts[i].getAttribute("aria-disabled") === "true"); if (i >= 0 && i < opts.length) setActive(i); }
    function typeahead(ch) { const now = Date.now(); typed = now - typedAt > 600 ? ch : typed + ch; typedAt = now;
      const start = typed.length > 1 ? active : active + 1, L = opts.length;
      for (let k = 0; k < L; k++) { const i = (start + k) % L; if (sel.options[i].textContent.trim().toLowerCase().startsWith(typed.toLowerCase())) { if (isOpen()) setActive(i); else { active = i; pick(i); } return; } } }

    cb.addEventListener("click", () => isOpen() ? close() : open());
    cb.addEventListener("blur", () => setTimeout(close, 0));
    cb.addEventListener("keydown", e => {
      if (sel.disabled) return;
      const k = e.key;
      if (!isOpen()) {
        if (["ArrowDown", "ArrowUp", "Enter", " "].includes(k)) { e.preventDefault(); open(); if (k === "ArrowUp" && !e.altKey) setActive(active); return; }
        if (k === "Home" || k === "End") { e.preventDefault(); open(); setActive(k === "Home" ? 0 : opts.length - 1); return; }
      } else {
        if (k === "ArrowDown") { e.preventDefault(); if (e.altKey) return; step(1); return; }
        if (k === "ArrowUp") { e.preventDefault(); if (e.altKey) { pick(active); close(); return; } step(-1); return; }
        if (k === "Home" || k === "End") { e.preventDefault(); setActive(k === "Home" ? 0 : opts.length - 1); return; }
        if (k === "PageDown" || k === "PageUp") { e.preventDefault(); setActive(Math.max(0, Math.min(opts.length - 1, active + (k === "PageDown" ? 10 : -10)))); return; }
        if (k === "Enter" || k === " ") { e.preventDefault(); pick(active); close(); return; }
        if (k === "Escape") { e.preventDefault(); e.stopPropagation(); close(); return; }  // don't also close the dialog
        if (k === "Tab") { pick(active); close(); return; }
      }
      if (k.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey && k !== " ") { e.preventDefault(); typeahead(k); }
    });
    sel.addEventListener("change", sync);  // code that sets the select keeps the combobox in step
    sync();
  }

  function scan(root) { (root.querySelectorAll ? root : document).querySelectorAll("select:not([data-dd])").forEach(enhance); }
  new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(nd => { if (nd.nodeType !== 1) return; if (nd.tagName === "SELECT") enhance(nd); else scan(nd); })))
    .observe(document.documentElement, { childList: true, subtree: true });
  document.addEventListener("DOMContentLoaded", () => scan(document));
  window.DD = { scan };
  const closeAll = () => document.querySelectorAll(".dd-lb:not([hidden])").forEach(x => x.ddClose());
  window.addEventListener("resize", closeAll);
  document.addEventListener("scroll", e => { if (!(e.target.closest && e.target.closest(".dd-lb"))) closeAll(); }, true);
  document.addEventListener("mousedown", e => { if (!e.target.closest(".dd")) document.querySelectorAll(".dd-lb:not([hidden])").forEach(x => x.ddClose()); });
})();
