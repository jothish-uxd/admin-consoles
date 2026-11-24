/* Content: All content (search, filters, saved views, list or grid, export), an item (details, access,
   activity, versions with compare and restore), Sharing, Tags (merge, inline create), Storage, Trash. */
(() => {
  const { route, esc, $, $$, icon, okSt, toast, announce, dialog, head, tabs, kv, empty, go, rerender, save } = App;
  const S = () => App.S;
  const ct = at => tabs("Content", [["all", "All content", "/content/all"], ["sharing", "Sharing", "/content/sharing"], ["tags", "Tags", "/content/tags"], ["storage", "Storage", "/content/storage"], ["trash", "Trash", "/content/trash"]], at);
  const cc = (t, h) => [["Content", "/content/all"], [t, h]];
  const guard = (crumbs) => S().role === "admin" ? null : { nav: "content", crumbs, title: "Admins only", html: `${head("This page is for admins")}<p class="lede">Switch to the admin view from your name at the top right.</p>` };

  /* selection for bulk delete (Delete confirmation); a row's own Move to Trash goes straight to an Undo toast */
  const sel = new Set();
  const BIN = '<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M3 4.5h10M6.5 4.5V3h3v1.5M4.5 4.5l.6 8.5h5.8l.6-8.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  function trash(ids, on) { S().files.forEach(f => { if (ids.includes(f.id)) f.trashed = on ? "Today" : undefined; }); save(); rerender(); }
  function openBulkDelete() {
    const files = S().files.filter(f => sel.has(f.id)), n = files.length, pub = files.filter(f => f.sharing === "Public link").length;
    const shared = files.filter(f => f.sharing === "Specific people").length;
    dialog({ title: `Delete ${n} file${n === 1 ? "" : "s"}?`, label: "Delete files",
      body: `<ul class="files-l">${files.map(f => `<li><span class="mono muted" style="margin-right:8px">${f.type}</span>${esc(f.name)}</li>`).join("")}</ul>
        <div class="impact">${pub ? `<div><b>${pub} public link${pub === 1 ? "" : "s"} stop${pub === 1 ? "s" : ""} working</b>, so anyone using ${pub === 1 ? "it" : "them"} loses access.</div>` : ""}${shared ? `<div><b>People it was shared with</b> lose access.</div>` : ""}${!pub && !shared ? "<div>Nobody else has access to these files.</div>" : ""}</div>
        <p style="margin:12px 0 0">They stay in Trash for 30 days, then they’re gone for good.</p>`,
      foot: `<button type="button" class="btn" data-close autofocus>Cancel</button><button type="button" class="btn dgr" id="delGo">Delete ${n} file${n === 1 ? "" : "s"}</button>`,
      onOpen(d, api) { $("#delGo", d).onclick = () => { const ids = [...sel]; sel.clear(); api.close(); trash(ids, true); toast(`${n} file${n === 1 ? "" : "s"} moved to Trash · restore within 30 days`); }; } });
  }

  /* ================= All content ================= */
  route("/content/all", p => {
    const g = guard(cc("All content", "/content/all")); if (g) return g;
    const s = S(), q = (p.q || "").toLowerCase(), view = p.view || "", sharing = p.sharing || "", grid = p.layout === "grid";
    let rows = s.files.filter(f => !f.trashed);
    if (view === "public") rows = rows.filter(f => f.sharing === "Public link");
    if (view === "deact") rows = rows.filter(f => f.deact);
    if (sharing) rows = rows.filter(f => f.sharing === sharing);
    if (q) rows = rows.filter(f => [f.name, f.owner, f.type, ...(f.tags || [])].join(" ").toLowerCase().includes(q));
    const total = !q && !view && !sharing ? "About 2.4M items" : `${rows.length} item${rows.length === 1 ? "" : "s"}`;
    const qs = o => { const x = Object.assign({ q: p.q, view, sharing, layout: p.layout }, o); return "/content/all?" + Object.entries(x).filter(([, v]) => v).map(([k, v]) => k + "=" + encodeURIComponent(v)).join("&"); };
    const views = [["public", "Shared publicly", 38], ["deact", "Owner deactivated", 112], ["large", "Large files", "2.1K"]];
    return { nav: "content", crumbs: cc("All content", "/content/all"), title: "All content",
      html: `${head("Content", `<div class="seg" role="radiogroup" aria-label="Layout"><label><input type="radio" name="lay" value="list" ${grid ? "" : "checked"} data-change="layout">List</label><label><input type="radio" name="lay" value="grid" ${grid ? "checked" : ""} data-change="layout">Grid</label></div><button type="button" class="btn" data-act="export">Export results</button>`)}${ct("all")}
      <div class="body"><p class="small muted" style="margin:0" aria-live="polite"><b style="color:var(--ink)">${total}</b> · index updated 2 min ago</p>
      <form class="row" role="search" style="margin-top:10px" onsubmit="return false"><label for="cq" class="vh">Search content</label><input type="search" id="cq" placeholder="Search name, owner, type or tag" value="${esc(p.q || "")}" style="flex:1;min-width:220px" data-change="search">
        <label for="csh" class="vh">Sharing</label><select id="csh" style="width:auto" data-change="sharing"><option value="">Sharing: any</option>${["Internal", "Specific people", "Public link", "Restricted"].map(v => `<option ${sharing === v ? "selected" : ""}>${v}</option>`).join("")}</select></form>
      <div class="row" style="margin-top:10px" role="group" aria-label="Saved views"><span class="small muted">Saved views</span>${views.map(([id, n, c]) => `<a class="chip ${view === id ? "dk" : ""}" href="#${qs({ view: view === id ? "" : id })}" ${view === id ? 'aria-current="true"' : ""}>${n} <span class="mono">${c}</span></a>`).join("")}</div>
      ${grid ? `<ul style="list-style:none;padding:0;margin:14px 0 0;display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px">${rows.map(f => `<li class="card" style="margin:0"><div class="mono muted">${f.type}</div><a href="#/content/item/${f.id}"><b style="font-weight:500">${esc(f.name)}</b></a><div class="small muted">${esc(f.owner)}${f.deact ? " · deactivated" : ""}</div><div style="margin-top:6px"><span class="cls ${f.sharing === "Public link" ? "r" : ""}">${esc(f.sharing)}</span></div></li>`).join("")}</ul>
        <p class="small muted">Previews off · names and owners shown</p>` :
      `${[...sel].length ? `<div class="bulkbar" role="region" aria-label="Selection"><b>${sel.size} selected</b><button type="button" class="btn ghost" data-act="clearSel">Clear</button><span class="spacer"></span><button type="button" class="btn" data-act="bulkDel">Delete</button></div>` : ""}<table style="margin-top:12px"><caption class="vh">Content, sorted by last activity</caption><thead><tr><th scope="col" class="ck"><input type="checkbox" aria-label="Select all shown" data-change="pickAll" ${rows.length && rows.every(f => sel.has(f.id)) ? "checked" : ""}></th><th scope="col">Name</th><th scope="col">Owner</th><th scope="col">Sharing</th><th scope="col">Last activity</th><th scope="col">Size</th><th scope="col"><span class="vh">Actions</span></th></tr></thead><tbody>
        ${rows.map(f => `<tr${sel.has(f.id) ? ' class="hl"' : ""}><td class="ck"><input type="checkbox" aria-label="Select ${esc(f.name)}" data-change="pick" data-id="${f.id}" ${sel.has(f.id) ? "checked" : ""}></td><td><span class="mono muted" style="margin-right:8px">${f.type}</span><a href="#/content/item/${f.id}">${esc(f.name)}</a></td><td>${esc(f.owner)}<span class="sub">${esc(f.ownerSub)}</span></td><td><span class="cls ${f.sharing === "Public link" ? "r" : ""}">${esc(f.sharing)}</span></td><td>${esc(f.last)}</td><td>${esc(f.size)}</td><td class="act"><button type="button" class="icon-btn rowact" aria-label="Move ${esc(f.name)} to Trash" title="Move to Trash" data-act="trashOne" data-id="${f.id}">${BIN}</button></td></tr>`).join("") || `<tr><td colspan="7">${empty("Nothing matches", "Try a different search or clear the filters.")}</td></tr>`}
      </tbody></table><p class="small muted">Showing ${rows.length} · sorted by last activity</p>`}</div>`,
      act: {
        search(el) { go(qs({ q: el.value })); }, sharing(el) { go(qs({ sharing: el.value })); }, layout(el) { go(qs({ layout: el.value === "grid" ? "grid" : "" })); },
        pick(el) { el.checked ? sel.add(el.dataset.id) : sel.delete(el.dataset.id); rerender(); },
        pickAll(el) { rows.forEach(f => el.checked ? sel.add(f.id) : sel.delete(f.id)); rerender(); },
        clearSel() { sel.clear(); rerender(); announce("Selection cleared"); },
        bulkDel() { openBulkDelete(); },
        trashOne(b) { const f = S().files.find(x => x.id === b.dataset.id); sel.delete(f.id); trash([f.id], true); toast(`${f.name} moved to Trash · kept 30 days`, () => { trash([f.id], false); announce(`${f.name} is back where it was`); }); },
        export() { toast(`Exporting ${rows.length > 8 ? "the results" : rows.length + " items"}. We'll send the file when it's ready.`); }
      } };
  });

  /* ================= An item ================= */
  route("/content/item/:id", p => {
    const g = guard(cc("All content", "/content/all")); if (g) return g;
    const s = S(), f = s.files.find(x => x.id === p.id);
    if (!f) return { nav: "content", crumbs: cc("All content", "/content/all"), html: head("Item not found") };
    const tab = p.tab || "details";
    const itabs = `<nav class="tabs" aria-label="${esc(f.name)}">${[["details", "Details"], ["access", "Access"], ["activity", "Activity"], ["versions", "Versions"]].map(([id, n]) => `<a href="#/content/item/${f.id}?tab=${id}"${id === tab ? ' aria-current="page"' : ""}>${n}</a>`).join("")}</nav>`;
    const access = [["Anyone with the link can view", "Public · created by Biggs, 12 Oct", "Outside Echo Base", f.sharing === "Public link"], ["Rogue One group", "8 people · can edit", "Via group", true], ["Red Squadron folder", "12 people · can view", "Inherited", true], ["Wedge Antilles", "can edit", "Shared directly", true]].filter(x => x[3]);
    let body;
    if (tab === "details") body = `<div class="cols"><section class="card" aria-labelledby="dt-h"><h2 id="dt-h">Details</h2>${kv([["Owner", `${esc(f.owner)}${f.deact ? ' <span class="chip">deactivated</span>' : ""}`], ["Location", f.id === "patrol" ? "Red Squadron / Patrols" : "Echo Base / Operations"], ["Size", esc(f.size)], ["Modified", esc(f.last)], ["Label", esc(f.label || "Internal")], ["Versions", f.versions ? `${s.versions.length} · latest ${esc(s.versions[0].when)}` : "7 · latest 12 Oct"]])}</section>
      <section class="card" aria-labelledby="ac-h"><h2 id="ac-h">Access <span class="n">${f.sharing === "Public link" ? "21 people · 4 ways in" : "20 people · 3 ways in"}</span></h2>
        <ul style="list-style:none;padding:0;margin:0">${access.map(([a, b, c, , ]) => `<li class="row" style="padding:8px 0;border-top:1px solid var(--rule)"><span class="spacer"><b style="font-weight:500">${a}</b><span class="sub small muted" style="display:block">${b}</span></span><span class="small muted">${c}</span></li>`).join("")}</ul>
        <p class="small muted" style="margin:8px 0 0">Grouped by how people got access · <a class="link" href="#/content/item/${f.id}?tab=access">See everyone</a></p></section></div>`;
    else if (tab === "access") body = `<table><caption class="vh">Everyone with access</caption><thead><tr><th scope="col">Who</th><th scope="col">Can</th><th scope="col">How</th></tr></thead><tbody>${access.map(([a, b, c]) => `<tr><td>${a}</td><td>${b}</td><td>${c}</td></tr>`).join("")}</tbody></table>`;
    else if (tab === "activity") body = `<ul style="list-style:none;padding:0;margin:0">${(f.removedLink ? [["Public link removed", "by Lavanya Sienna, admin", "just now"]] : []).concat([["Downloaded", "by someone with the link, outside Echo Base", "2 h ago"], ["Viewed 14 times by link", "this week", "this week"], ["Public link created", "by Biggs Darklighter", "12 Oct"]]).map(([a, b, c]) => `<li class="row" style="padding:10px 0;border-bottom:1px solid var(--rule)"><span class="spacer"><b style="font-weight:500">${a}</b> <span class="muted">${b}</span></span><span class="small muted">${c}</span></li>`).join("")}</ul><p class="small"><a class="link" href="#/compliance/audit">Open in audit log, filtered to this file</a></p>`;
    else body = versionsTab(f, p);
    return { nav: "content", crumbs: [["Content", "/content/all"], ["All content", "/content/all"], [f.name, ""]], title: f.name,
      html: `<div class="hd"><span class="mono" style="border:1.5px solid var(--rule-strong);border-radius:5px;padding:8px 5px 2px;font-size:9px;color:var(--soft)">${f.type}</span><h1>${esc(f.name)}</h1>${f.label ? `<span class="chip ${f.label === "Confidential" ? "dk" : ""}">${esc(f.label)}</span>` : ""}<span class="small muted">Admin view · contents not opened · your visit is logged</span></div>
        ${itabs}<div class="body">
        ${f.deact && f.sharing === "Public link" ? `<div class="banner" style="margin-bottom:12px"><span style="width:18px">${icon("info")}</span><div class="tx"><b>Why you're here:</b> shared by public link, and the owner is deactivated.</div></div>` : ""}
        ${f.id === "patrol" ? `<div class="row" style="margin-bottom:14px"><span class="small muted">Admin actions</span><button type="button" class="btn sm" data-act="owner">Change owner</button>${f.sharing === "Public link" ? '<button type="button" class="btn sm" data-act="unlink" id="unlink">Remove external access</button>' : ""}<button type="button" class="btn sm" data-act="label">Apply label</button></div>` : ""}
        ${body}</div>`,
      act: {
        unlink() { dialog({ title: "Remove the public link?", body: `<p class="muted">The link stops working for everyone outside Echo Base. People in Echo Base keep their access. The owner is told.</p>`,
          foot: `<button type="button" class="btn ghost" data-close>Cancel</button><button type="button" class="btn pri" id="rl">Remove link</button>`,
          onOpen: (d, api) => $("#rl", d).onclick = () => { f.sharing = "Internal"; f.removedLink = true; save(); api.close(); rerender(); toast("Public link removed · logged"); } }); },
        owner() { go("/people/users/biggs"); }, label() { toast("Labels aren't part of this prototype yet"); },
        pick(b) { go(`/content/item/${f.id}?tab=versions&v=${b.dataset.v}`); },
        restore(b) { const n = +b.dataset.v, cur = s.versions[0].n;
          dialog({ title: `Restore v${n} as a new version?`, body: `<p class="muted">It becomes v${cur + 1}. The current version, v${cur}, stays in history, so you can undo this too.</p>`,
            foot: `<button type="button" class="btn ghost" data-close>Cancel</button><button type="button" class="btn pri" id="rs">Restore</button>`,
            onOpen: (d, api) => $("#rs", d).onclick = () => { const src = s.versions.find(v => v.n === n); s.versions.unshift({ n: cur + 1, note: `Restored from v${n}`, who: "Lavanya Sienna, admin", initials: "LS", when: "just now", pages: src.pages, restored: true }); f.size = "2.1 MB"; save(); api.close(); go(`/content/item/${f.id}?tab=versions`); toast(`Restored from v${n} · logged`); } }); },
        folder() { toast("Point-in-time folder restore runs as a job. Not part of this prototype yet."); }
      } };
  });
  function versionsTab(f, p) {
    const s = S();
    if (!f.versions) return `<p class="muted">7 versions, kept for 1 year.</p>`;
    const cur = s.versions[0], sel = p.v ? s.versions.find(v => v.n === +p.v) : null;
    return `<div class="row" style="margin-bottom:10px"><span class="small muted">Versions are kept for <b style="color:var(--ink)">1 year</b> · ${s.versions.length} of 100 used · <a class="link" href="#/compliance/policies">Set by policy</a></span><span class="spacer"></span><button type="button" class="btn sm" data-act="folder">Restore a folder to a point in time</button></div>
      <div class="cols" style="grid-template-columns:minmax(0,470px) 1fr"><table><caption class="vh">Versions, newest first</caption><thead><tr><th scope="col">Version</th><th scope="col">Change</th><th scope="col"><span class="vh">Action</span></th></tr></thead><tbody>
      ${s.versions.map((v, i) => `<tr${sel && sel.n === v.n ? ' class="sel"' : ""}><td class="mono">v${v.n}${i === 0 ? ' <span class="chip dk">current</span>' : ""}</td><td><span style="color:var(--ink)">${esc(v.note)}</span><span class="sub"><span class="av sm" aria-hidden="true">${v.initials}</span> ${esc(v.who)} · ${esc(v.when)}</span></td>
        <td class="act">${i === 0 ? "" : `<button type="button" class="btn sm" data-act="pick" data-v="${v.n}" aria-pressed="${!!(sel && sel.n === v.n)}">Compare</button>`}</td></tr>`).join("")}</tbody></table>
      <section class="card" aria-labelledby="cmp-h" ${sel ? "" : 'style="color:var(--soft)"'}>${sel ? `<h2 id="cmp-h">Compare v${sel.n} with current</h2>
        <div class="cols even" style="gap:10px;grid-template-columns:1fr 1fr"><div class="note"><b>Current</b> · v${cur.n}<br>${cur.pages} page${cur.pages === 1 ? "" : "s"}${cur.pages === 1 ? " · empty template" : ""}</div><div class="note"><b>v${sel.n}</b> · ${esc(sel.when)}<br>${sel.pages} pages</div></div>
        <p class="row" style="margin:10px 0 0">${sel.pages > cur.pages ? okSt(`${sel.pages - cur.pages} pages come back if you restore v${sel.n}`) : `<span class="muted">${cur.pages - sel.pages} fewer pages than current</span>`}</p>
        <div class="row" style="margin-top:12px"><button type="button" class="btn pri" data-act="restore" data-v="${sel.n}">Restore v${sel.n}</button><button type="button" class="btn" data-act="dl">Download v${sel.n}</button></div>` :
        `<h2 id="cmp-h">Compare</h2><p style="margin:0">Choose Compare on a version to see it next to the current one before restoring.</p>`}</section></div>`;
  }

  /* ================= Sharing ================= */
  route("/content/sharing", () => {
    const g = guard(cc("Sharing", "/content/sharing")); if (g) return g;
    const sh = S().sharing, draft = S().shDraft || (S().shDraft = Object.assign({}, sh)), changed = draft.mode !== sh.mode;
    return { nav: "content", crumbs: cc("Sharing", "/content/sharing"), title: "Sharing",
      html: `${head("Content", `<button type="button" class="btn ghost" data-act="cancel">Cancel</button><button type="button" class="btn pri" data-act="save">Save</button>`)}${ct("sharing")}
      <div class="body"><h2 style="margin:0">Sharing outside Echo Base <span class="muted" style="font-weight:400;font-size:13px">You set the limits. People share within them.</span></h2>
      <div class="cols" style="margin-top:12px"><div>
        <fieldset class="card" style="margin:0"><legend style="font-weight:600">Who can receive shares <span class="small muted" style="font-weight:400">· most to least restrictive</span></legend>
          <label class="choice"><input type="radio" name="mode" value="off" ${draft.mode === "off" ? "checked" : ""} data-change="mode"><span class="spacer"><b>Off</b><span class="d">No one outside Echo Base can open shared items.</span></span></label>
          <label class="choice"><input type="radio" name="mode" value="domains" ${draft.mode === "domains" ? "checked" : ""} data-change="mode"><span class="spacer"><b>Allowed domains only <span class="chip">recommended</span></b><span class="d">Only people at partner domains you list.</span>
            <span class="row" style="margin-top:6px">${sh.domains.map(d => `<span class="cls">${d}</span>`).join("")}<span class="small muted">+${sh.moreDomains} more</span></span></span></label>
          ${draft.mode !== "anyone" && sh.mode === "anyone" ? `<div class="note" style="margin-top:8px" role="status"><b>${sh.publicLinks} existing public links</b> will stop working for people outside${draft.mode === "off" ? " Echo Base" : " partner domains"}. ${draft.mode === "off" ? "" : `${sh.partnerShares} partner shares aren't affected. `}Owners of the ${sh.publicLinks} are asked to confirm or remove them.
            <div class="seg" role="radiogroup" aria-label="When to apply" style="margin-top:8px"><label><input type="radio" name="when" value="now" data-change="when" ${draft.when === "now" ? "checked" : ""}>Apply now</label><label><input type="radio" name="when" value="14" data-change="when" ${draft.when !== "now" ? "checked" : ""}>Over 14 days, owners get notice · recommended</label></div></div>` : ""}
          <label class="choice"><input type="radio" name="mode" value="anyone" ${draft.mode === "anyone" ? "checked" : ""} data-change="mode"><span><b>Anyone with the link <span class="chip">not recommended</span></b><span class="d">Anyone who has the link can open it, with no sign-in.</span></span></label></fieldset>
        <section class="card" aria-labelledby="xl-h"><h2 id="xl-h">External links</h2><label class="check"><input type="checkbox" ${sh.expire ? "checked" : ""}><span>Expire after 30 days</span></label><label class="check"><input type="checkbox" ${sh.password ? "checked" : ""}><span>Require a password</span></label>
          <div class="field" style="max-width:320px"><label for="nl">New links</label><select id="nl"><option>People in Echo Base</option><option>Partner domains</option></select><span class="hint">Narrowest useful setting. People can widen it within your limits.</span></div></section></div>
      <aside><section class="card" aria-labelledby="so-h"><h2 id="so-h">Shared outside now</h2><div><span class="stat">${sh.mode === "domains" && sh.applied ? 0 : sh.publicLinks}</span> <span class="muted">public links</span></div><div><span class="stat">${sh.partnerShares}</span> <span class="muted">shared with partner domains</span></div><a class="btn sm" style="margin-top:8px" href="#/content/all?sharing=Public%20link">View report</a></section>
        <section class="card" aria-labelledby="ex-h"><h2 id="ex-h">Exceptions</h2>${kv([["Label", "Confidential → no external sharing<br><span class='small muted'>Wins over the org setting</span>", 1], ["Group", "Senate liaison → anyone with the link<br><span class='small muted'>Confidential label still wins on its files</span>", 1]])}
          <p class="small muted" style="margin:10px 0 0">${icon("ok")} When settings disagree, the most restrictive one wins.</p></section></aside></div></div>`,
      act: {
        mode(el) { draft.mode = el.value; rerender(); }, when(el) { draft.when = el.value; },
        cancel() { delete S().shDraft; rerender(); announce("Changes discarded"); },
        save() { const s = S(), was = s.sharing.mode; s.sharing.mode = draft.mode; if (was !== "domains" && draft.mode === "domains") s.sharing.applied = draft.when === "now"; delete s.shDraft; save(); rerender();
          toast(draft.mode === was ? "Saved. Nothing changed." : draft.when === "now" ? "Saved and applied. Owners of 38 links notified." : "Saved. Rolling out over 14 days; owners of 38 links notified."); }
      } };
  });

  /* ================= Tags ================= */
  route("/content/tags", p => {
    const g = guard(cc("Tags", "/content/tags")); if (g) return g;
    const s = S(), dup = s.tags.filter(t => /^hoth\s*$/i.test(t.name)), merged = dup.length < 2, adding = s.tagDraft;
    const sel = new Set(s.tagSel || []);
    const rows = s.tags.filter(t => !t.merged).sort((a, b) => (b.fresh ? 1 : 0) - (a.fresh ? 1 : 0));
    return { nav: "content", crumbs: cc("Tags", "/content/tags"), title: "Tags",
      html: `${head("Content", `<button type="button" class="btn" data-act="import">Import taxonomy</button><button type="button" class="btn" data-act="field">New managed field</button>`)}${ct("tags")}
      <div class="body cols"><div>
        <div class="row" style="min-height:46px;margin-bottom:10px;flex-wrap:nowrap"><button type="button" class="btn pri" data-act="addTag" id="addTag" ${adding ? "disabled" : ""}>+ Add tag</button>
        ${!merged && !sel.size ? `<div class="banner spacer" style="padding:6px 8px 6px 14px"><div class="tx">3 tags look alike: <b>Hoth, hoth, "Hoth "</b> · 1,338 items</div><button type="button" class="btn sm" data-act="selDup">Select them</button></div>` :
          sel.size ? `<div class="banner spacer" style="padding:6px 8px 6px 14px;background:var(--ink);color:#fff"><div class="tx" style="color:#fff"><b style="color:#fff">${sel.size} tags selected</b> · ${s.tags.filter(t => sel.has(t.id)).reduce((a, t) => a + t.uses, 0).toLocaleString()} items</div><button type="button" class="btn sm" data-act="merge" ${sel.size < 2 ? "disabled" : ""}>Merge</button><button type="button" class="btn sm" data-act="rename" style="background:transparent;color:#fff;border-color:rgba(255,255,255,.5)">Rename</button><button type="button" class="btn sm" data-act="clearSel" style="background:transparent;color:#fff;border-color:transparent">Clear</button></div>` :
          `<span class="spacer"></span><span class="small muted">Need a controlled list? <button type="button" class="link" data-act="field">New managed field</button></span>`}</div>
        <table style="table-layout:fixed"><caption class="vh">Free tags</caption><colgroup><col style="width:36px"><col style="width:36%"><col style="width:18%"><col style="width:16%"><col></colgroup>
        <thead><tr><th scope="col"><span class="vh">Select</span></th><th scope="col">Tag</th><th scope="col">Used on</th><th scope="col">Last used</th><th scope="col"><span class="vh">Status and actions</span></th></tr></thead><tbody>
        ${adding ? `<tr class="hl"><td></td><td><label for="newTag" class="vh">New tag name</label><input type="text" id="newTag" value="${esc(adding.value || "")}" aria-describedby="nt-hint nt-msg" ${adding.error ? 'aria-invalid="true"' : ""} autocomplete="off" style="min-height:32px"></td>
          <td colspan="3"><span class="row" style="gap:6px"><button type="button" class="btn sm pri" data-act="saveTag" ${adding.saving ? "disabled" : ""}>${adding.saving ? "Saving…" : "Save tag"}</button><button type="button" class="btn sm" data-act="cancelTag">Cancel</button>
            <span id="nt-hint" class="small muted">or Enter · Esc</span><span id="nt-msg">${adding.error ? `<span class="err" style="margin:0">${icon("no")}${esc(adding.error)} · <button type="button" class="link" data-act="useTag">Use it</button></span>` : ""}</span></span></td></tr>` : ""}
        ${rows.map(t => `<tr${t.fresh ? ' class="hl"' : ""}><td><input type="checkbox" aria-label="Select ${esc(t.name.trim() || t.name)}${t.trailing ? " with a trailing space" : ""}" data-change="sel" data-id="${t.id}" ${sel.has(t.id) ? "checked" : ""}></td>
          <td><span class="row" style="gap:7px;flex-wrap:nowrap"><span class="dot" style="background:${t.color}" aria-hidden="true"></span><span>${esc(t.name.trim())}${t.trailing ? ' <span class="mono muted" style="border:1px dashed var(--rule-strong);border-radius:4px;padding:0 4px">trailing space</span>' : ""}${t.fresh ? ' <span class="chip">New</span>' : ""}${t.synonyms ? `<span class="sub">Synonyms: ${esc(t.synonyms)}</span>` : ""}</span></span></td>
          <td>${t.uses.toLocaleString()} item${t.uses === 1 ? "" : "s"}</td><td>${esc(t.last)}</td><td class="act">${t.justSaved ? okSt("Saved") : t.uses === 0 && !t.fresh ? `<button type="button" class="btn sm ghost" data-act="retire" data-id="${t.id}">Retire</button>` : ""}</td></tr>`).join("")}
        </tbody></table></div>
      <aside><section class="card" aria-labelledby="mf-h"><h2 id="mf-h">Managed fields <span class="n">for policies</span></h2>
          <div style="padding:6px 0"><div class="row"><b style="font-weight:500">Classification</b><span class="spacer"></span><span class="small muted">required · 3 values</span></div><div class="row" style="margin-top:6px"><span class="cls">Public</span><span class="cls">Internal</span><span class="cls r">Restricted</span></div></div>
          <div style="padding:8px 0;border-top:1px solid var(--rule)"><div class="row"><b style="font-weight:500">Mission</b><span class="spacer"></span><span class="small muted">14 terms · hierarchy</span></div><div class="row" style="margin-top:6px"><span class="cls">Hoth › Echo Base</span><span class="cls">Endor</span><span class="cls">Yavin IV</span><span class="cls">+11</span></div></div></section>
        <section class="card" aria-labelledby="ar-h"><h2 id="ar-h">Auto-tag rules <span class="n">2 rules</span></h2><p class="muted" style="margin:0">Files in <b style="color:var(--ink);font-weight:500">Echo Base / Operations</b> get <b style="color:var(--ink);font-weight:500">Mission: Hoth</b></p>
          <div class="row" style="margin-top:8px"><span class="small muted">Applied to 1,180 items · 2 exceptions</span><span class="spacer"></span><button type="button" class="btn sm" data-act="exceptions">Review</button></div></section></aside></div>`,
      mount() {
        const n = $("#newTag"); if (!n) return;
        if (!S().tagDraft.saving) { n.focus(); n.setSelectionRange(n.value.length, n.value.length); }
        n.addEventListener("input", () => { S().tagDraft.value = n.value; if (S().tagDraft.error) { S().tagDraft.error = null; n.removeAttribute("aria-invalid"); $("#nt-msg").innerHTML = ""; } });
        n.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); act.saveTag(); } if (e.key === "Escape") { e.preventDefault(); act.cancelTag(); } });
      },
      act: (act = {
        selDup() { s.tagSel = dup.map(t => t.id); save(); rerender(); announce("3 tags selected"); },
        clearSel() { s.tagSel = []; save(); rerender(); },
        sel(el) { const set = new Set(s.tagSel || []); el.checked ? set.add(el.dataset.id) : set.delete(el.dataset.id); s.tagSel = [...set]; save(); rerender(); },
        rename() { toast("Rename isn't part of this prototype yet"); },
        merge() {
          const chosen = s.tags.filter(t => sel.has(t.id)), keep = chosen.slice().sort((a, b) => b.uses - a.uses)[0], others = chosen.filter(t => t !== keep), moved = others.reduce((a, t) => a + t.uses, 0);
          dialog({ title: `Merge ${chosen.length} tags`, body: `<div class="field" style="margin-top:8px"><label for="keep">Keep</label><select id="keep">${chosen.map(t => `<option value="${t.id}" ${t === keep ? "selected" : ""}>${esc(t.name.trim())}${t.trailing ? " (trailing space)" : ""}${t === keep ? " · most used, " + t.uses.toLocaleString() : ""}</option>`).join("")}</select></div>
            <p class="muted">${moved.toLocaleString()} items move to ${esc(keep.name.trim())}. ${others.map(t => `<b style="color:var(--ink);font-weight:500">"${esc(t.name)}"</b>`).join(" and ")} become synonyms, so searches still find them. Runs as a job across all items.</p>`,
            foot: `<button type="button" class="btn ghost" data-close>Cancel</button><button type="button" class="btn pri" id="mg">Merge ${chosen.length} tags</button>`,
            onOpen: (d, api) => $("#mg", d).onclick = () => {
              const k = s.tags.find(t => t.id === $("#keep", d).value), rest = chosen.filter(t => t !== k);
              k.uses = chosen.reduce((a, t) => a + t.uses, 0); k.synonyms = rest.map(t => `"${t.name}"`).join(", "); k.trailing = false; k.name = k.name.trim() || k.name;
              rest.forEach(t => t.merged = true); s.tagSel = []; save(); api.close(); rerender();
              toast(`Merging ${chosen.length} tags across ${k.uses.toLocaleString()} items · running as a job · logged`);
            } });
        },
        retire(b) { const t = s.tags.find(x => x.id === b.dataset.id); t.merged = true; save(); rerender(); toast(`${t.name} retired. It wasn't used on any items.`, () => { t.merged = false; save(); rerender(); }); },
        addTag() { s.tags.forEach(t => { t.justSaved = false; }); s.tagDraft = { value: "" }; save(); rerender(); },
        cancelTag() { s.tagDraft = null; save(); rerender(); $("#addTag") && $("#addTag").focus(); announce("New tag cancelled"); },
        useTag() { s.tagDraft = null; save(); rerender(); $("#addTag") && $("#addTag").focus(); announce("Kept the existing tag Hoth"); },
        saveTag() {
          const d = s.tagDraft, v = (d.value || "").trim();
          if (!v) { d.error = "Enter a tag name"; rerender(); return; }
          d.saving = true; rerender(); announce("Saving");
          setTimeout(() => {
            const exists = s.tags.find(t => !t.merged && t.name.trim().toLowerCase() === v.toLowerCase());
            if (exists) { d.saving = false; d.error = `${exists.name.trim()} already exists`; save(); rerender(); announce(`${exists.name.trim()} already exists. Use the existing tag?`); return; }
            s.tags.forEach(t => { t.fresh = false; t.justSaved = false; });
            s.tags.unshift({ id: "t" + Date.now(), name: v, color: "#a3a3a3", uses: 0, last: "Today", fresh: true, justSaved: true });
            s.tagDraft = null; save(); rerender(); $("#addTag") && $("#addTag").focus(); announce(`Tag ${v} saved`);
          }, 600);
        },
        import() { toast("Importing a taxonomy isn't part of this prototype yet"); }, field() { toast("Managed fields aren't part of this prototype yet"); },
        exceptions() { toast("2 files are outside Operations but tagged Hoth. Review isn't part of this prototype yet."); }
      }) };
    var act;
  });

  route("/content/storage", () => ({ nav: "content", crumbs: cc("Storage", "/content/storage"), title: "Storage", html: `${head("Content")}${ct("storage")}<div class="body">${empty("Storage comes with a later pattern", "This prototype grows as each pattern gets its clip.")}</div>` }));
  route("/content/trash", () => {
    const g = guard(cc("Trash", "/content/trash")); if (g) return g;
    const rows = S().files.filter(f => f.trashed);
    return { nav: "content", crumbs: cc("Trash", "/content/trash"), title: "Trash", html: `${head("Content")}${ct("trash")}<div class="body"><p class="small muted" style="margin:0">Items stay here for 30 days, then they’re deleted for good.</p>
      ${rows.length ? `<table style="margin-top:12px"><caption class="vh">Trash</caption><thead><tr><th scope="col">Name</th><th scope="col">Owner</th><th scope="col">Deleted</th><th scope="col"><span class="vh">Actions</span></th></tr></thead><tbody>
      ${rows.map(f => `<tr><td><span class="mono muted" style="margin-right:8px">${f.type}</span>${esc(f.name)}</td><td>${esc(f.owner)}</td><td>${esc(f.trashed)} · gone for good in 30 days</td><td class="act"><button type="button" class="btn sm" data-act="restore" data-id="${f.id}">Restore</button></td></tr>`).join("")}</tbody></table>` : empty("Trash is empty", "Deleted items are kept here for 30 days.")}</div>`,
      act: { restore(b) { const f = S().files.find(x => x.id === b.dataset.id); trash([f.id], false); toast(`${f.name} restored`); } } };
  });
})();
