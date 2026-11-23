/* AI › Connectors (MCP): the list and the catalog (search, add), a connector page with the review checklist
   (connect a test account, review the tools, run a test call, publish) and its Tools tab
   (Allowed · Needs approval · Blocked per tool, new tools held off until reviewed). */
(() => {
  const { route, esc, $, $$, icon, okSt, toast, announce, dialog, head, tabs, kv, empty, go, rerender, save } = App;
  const S = () => App.S;
  const aiTabs = a => tabs("AI", [["features", "Features", "/ai/features"], ["data", "Data", "/ai/data"], ["models", "Models", "/ai/models"], ["usage", "Usage", "/ai/usage"], ["safety", "Safety", "/ai/safety"], ["connectors", "Connectors", "/ai/connectors"]], a);
  const guard = crumbs => S().role === "admin" ? null : { nav: "ai", crumbs, title: "Admins only", html: `${head("This page is for admins")}<p class="lede">Switch to the admin view from your name at the top right.</p>` };
  // older saved demo state predates connectors
  const data = () => { const s = S(); if (!s.connectors || s.connectors.some(c => c.request)) { s.connectors = JSON.parse(JSON.stringify(window.SEED.connectors)); s.connectorPolicy = window.SEED.connectorPolicy; save(); } return s.connectors; };
  const catalog = () => window.SEED.connectorCatalog;
  const SET = [["allowed", "Allowed"], ["approval", "Needs approval"], ["blocked", "Blocked"]];
  const KIND = { read: "Read", write: "Write", delete: "Delete" };
  const kinds = c => { const k = { read: 0, write: 0, delete: 0 }; c.tools.forEach(t => k[t.kind]++); return k; };

  /* ================= List ================= */
  route("/ai/connectors", () => {
    const g = guard([["AI", "/ai/features"], ["Connectors", ""]]); if (g) return g;
    const list = data();
    return { nav: "ai", crumbs: [["AI", "/ai/features"], ["Connectors", ""]], title: "Connectors",
      html: `${head("AI", `<button type="button" class="btn" data-act="add">Add connector</button>`)}${aiTabs("connectors")}<div class="body">
        <p class="lede" style="margin-top:0">Connectors let the AI reach other systems. Nothing connects until it’s published here.</p>
        <p class="small muted">Policy: <b style="color:var(--ink)">${S().connectorPolicy === "approved" ? "approved connectors only" : "any server"}</b> · Requests: <b style="color:var(--ink)">on</b></p>
        <table style="margin-top:14px"><caption class="vh">Connectors</caption><thead><tr><th scope="col">Connector</th><th scope="col">Type</th><th scope="col">Can</th><th scope="col">Status</th><th scope="col"><span class="vh">Open</span></th></tr></thead><tbody>
        ${list.map(c => `<tr><td><a href="#/ai/connectors/${c.id}">${esc(c.name)}</a><span class="sub">${esc(c.publisher)}</span></td><td>${esc(c.type)}</td>
          <td>${c.tools ? (c.connected ? "Read, write and delete" : "Not connected yet") : esc(c.can)}</td><td>${c.tools ? (c.published ? `Published · ${esc(c.audience || "Logistics")}` : c.tested ? "Draft · tested" : "Draft") : esc(c.status)}</td>
          <td class="act"><a class="btn sm" href="#/ai/connectors/${c.id}" aria-label="Open ${esc(c.name)}">${c.tools && !c.published ? "Review" : "Open"}</a></td></tr>`).join("")}</tbody></table></div>`,
      act: {
        add() {
          const have = new Set(list.map(c => c.id));
          const results = q => catalog().filter(c => !q || (c.name + " " + c.publisher).toLowerCase().includes(q.toLowerCase()));
          const draw = (d, q) => { const r = results(q);
            $("#cres", d).innerHTML = r.map(c => `<li class="row" style="padding:9px 0;border-bottom:1px solid var(--rule);flex-wrap:nowrap"><span class="av" aria-hidden="true" style="border-radius:8px">${c.name.split(" ").map(w => w[0]).join("").slice(0, 2)}</span>
              <span class="spacer"><b style="font-weight:600">${esc(c.name)}</b><span class="small muted" style="display:block">${esc(c.publisher)} · ${esc(c.can)}</span></span><span class="chip ${c.label.startsWith("Verified") ? "dk" : "out"}">${esc(c.label)}</span>
              ${have.has(c.id) ? `<button type="button" class="btn sm" aria-disabled="true">Added</button>` : `<button type="button" class="btn sm" data-add="${c.id}" aria-label="Add ${esc(c.name)}">Add</button>`}</li>`).join("") || `<li class="muted" style="padding:12px 0">No connectors match. Try Add by URL.</li>`;
            $("#ccount", d).textContent = q ? `${r.length} result${r.length === 1 ? "" : "s"} for “${q}”` : ""; };
          dialog({ title: "Add connector", wide: true, body: `<p class="muted" style="margin-top:4px">From the catalog, or add a server by URL. Nothing is available to people until you publish it.</p>
            <div class="field"><label for="cq">Search the catalog</label><input type="search" id="cq" placeholder="Search connectors" autocomplete="off" aria-describedby="ccount"></div>
            <p class="small muted" id="ccount" role="status" style="margin:6px 0 0"></p><ul id="cres" style="list-style:none;padding:0;margin:4px 0 0"></ul>`,
            foot: `<span class="small muted" style="margin-right:auto">Not listed? <button type="button" class="link" id="byurl">Add by URL</button></span><button type="button" class="btn ghost" data-close>Cancel</button>`,
            onOpen(d, api) { draw(d, ""); const q = $("#cq", d); q.focus(); q.addEventListener("input", () => draw(d, q.value.trim()));
              $("#byurl", d).onclick = () => toast("Adding a server by URL isn't part of this prototype yet. Fleet Tracker shows the same review.");
              d.addEventListener("click", e => { const b = e.target.closest("[data-add]"); if (!b) return;
                const src = catalog().find(c => c.id === b.dataset.add);
                if (!src.tools) { api.close(); toast(`${src.name} isn't part of this prototype yet. Try Fleet Tracker.`); return; }
                const c = JSON.parse(JSON.stringify(src)); c.type = "Community"; c.addedBy = "Lavanya Sienna · today"; delete c.label;
                list.push(c); save(); api.close(); go("/ai/connectors/" + c.id); toast(`${c.name} added as a draft`); });
            } });
        }
      } };
  });

  /* ================= A connector ================= */
  route("/ai/connectors/:id", p => {
    const g = guard([["AI", "/ai/features"], ["Connectors", "/ai/connectors"]]); if (g) return g;
    const c = data().find(x => x.id === p.id);
    if (!c) return { nav: "ai", crumbs: [["AI", "/ai/features"], ["Connectors", "/ai/connectors"]], html: head("Connector not found") };
    if (!c.tools) return { nav: "ai", crumbs: [["AI", "/ai/features"], ["Connectors", "/ai/connectors"], [c.name, ""]], title: c.name,
      html: `<a class="back" href="#/ai/connectors">← Connectors</a>${head(c.name, `<span class="chip">${esc(c.status)}</span>`)}<p class="lede">${esc(c.type)} · ${esc(c.publisher)}. Open Fleet Tracker to see the review and tool settings.</p>` };
    const tab = p.tab === "tools" && c.connected ? "tools" : "overview", k = kinds(c);
    const ctabs = `<nav class="tabs" aria-label="${esc(c.name)}"><a href="#/ai/connectors/${c.id}"${tab === "overview" ? ' aria-current="page"' : ""}>Overview</a>${c.connected ? `<a href="#/ai/connectors/${c.id}?tab=tools"${tab === "tools" ? ' aria-current="page"' : ""}>Tools <span class="mono muted">${c.tools.length}</span></a>` : `<span class="muted" style="padding:10px 0" aria-disabled="true">Tools</span>`}<span class="muted" style="padding:10px 0">Sign-in</span><span class="muted" style="padding:10px 0">Access</span><span class="muted" style="padding:10px 0">Data</span></nav>`;
    const status = c.published ? `<span class="chip dk">Published · ${esc(c.audience || "Logistics")}</span>` : `<span class="chip out">Draft · not published</span>`;
    const actions = c.published ? `<button type="button" class="btn ghost" data-act="off">Turn off for everyone</button>` : `<button type="button" class="btn ghost" data-act="deleteDraft">Delete draft</button><button type="button" class="btn pri" data-act="publish" id="pubB" ${c.tested ? "" : 'aria-disabled="true" aria-describedby="pub-h"'}>Publish…</button>`;
    const n = (i, done) => `<span class="av sm" aria-hidden="true" style="${done ? "background:var(--ink);color:#fff" : "background:var(--bg);border:1.5px solid var(--rule-strong);color:var(--soft)"}">${done ? "✓" : i}</span>`;
    let body;
    if (tab === "overview") body = `<div class="cols" style="grid-template-columns:minmax(0,1fr) 400px">
      <div><section class="card" aria-labelledby="ab-h"><h2 id="ab-h">About this connector</h2>${kv([["Publisher", esc(c.publisher)], ["Type", `<span class="chip out">Community · not reviewed</span>`], ["Server URL", `<span class="mono">${esc(c.url)}</span>`, 1], ["Runs on", esc(c.runs)], ["Can", c.connected ? "Read, write and delete" : "Unknown until connected"], ["Added by", esc(c.addedBy || "Lavanya Sienna")], ["Found in", "Connector catalog"]])}</section>
        <div class="note" style="margin-top:12px"><b>Echo Base hasn’t reviewed this server.</b> It sees what the AI sends it, its tools can change after you publish, and its tool descriptions may try to steer the AI. Test it with a test account before anyone uses it.</div></div>
      <section class="card" aria-labelledby="bp-h" style="margin:0"><h2 id="bp-h">Before you publish</h2><ol style="list-style:none;padding:0;margin:0">
        <li class="row" style="align-items:flex-start;padding:10px 0;flex-wrap:nowrap">${n(1, c.connected)}<div class="spacer"><b style="font-weight:600">Connect with a test account</b>
          <div id="st1" aria-live="polite" style="margin-top:6px">${c.connected ? `${okSt("Connected · 6 tools found")}<div class="small muted">As test-logistics@echobase</div>` : c.connecting ? `<span class="muted">Connecting…</span>` : `<button type="button" class="btn sm" data-act="connect">Connect test account</button>`}</div></div></li>
        <li class="row" style="align-items:flex-start;padding:10px 0;border-top:1px solid var(--rule);flex-wrap:nowrap">${n(2, c.connected)}<div class="spacer"><b style="font-weight:600">Review the tools</b>
          ${c.connected ? `<dl class="kv" style="grid-template-columns:1fr;gap:6px;margin-top:6px">${["read", "write", "delete"].map(x => `<div><dt>${KIND[x]} · ${k[x]}</dt><dd>${c.tools.filter(t => t.kind === x).map(t => esc(t.name)).join(", ")}</dd></div>`).join("")}</dl>
            <a class="link small" href="#/ai/connectors/${c.id}?tab=tools">Set each tool</a>` : `<div class="small muted">Appears once connected.</div>`}</div></li>
        <li class="row" style="align-items:flex-start;padding:10px 0;border-top:1px solid var(--rule);flex-wrap:nowrap">${n(3, c.tested)}<div class="spacer"><b style="font-weight:600">Run a test call</b>
          <div aria-live="polite" style="margin-top:6px">${c.tested ? `<div class="card" style="margin:0;padding:8px 10px"><div class="small muted">Find ships · query <b style="color:var(--ink)">“Hoth”</b></div><div class="small">${okSt("3 ships")} · Bright Hope, Liberty, Quantum Storm <span class="muted">· 240 ms</span></div></div>`
            : c.testing ? `<span class="muted">Running…</span>` : `<button type="button" class="btn sm" data-act="test" ${c.connected ? "" : 'aria-disabled="true"'}>Run test call</button>${c.connected ? "" : `<span class="small muted" style="margin-left:8px">Connect first</span>`}`}</div></div></li>
        <li class="row" style="align-items:flex-start;padding:10px 0;border-top:1px solid var(--rule);flex-wrap:nowrap">${n(4, c.published)}<div class="spacer"><b style="font-weight:600">Publish</b>
          <div class="small muted" id="pub-h">${c.published ? `Published for ${esc(c.audience || "Logistics")}.` : c.tested ? "Choose who gets it and which tools are on. Until then it stays a draft." : "Available after a successful test call. Until then it stays a draft."}</div></div></li>
      </ol></section></div>`;
    else body = toolsTab(c);
    return { nav: "ai", crumbs: [["AI", "/ai/features"], ["Connectors", "/ai/connectors"], [c.name, ""]], title: c.name,
      html: `<a class="back" href="#/ai/connectors">← Connectors</a><div class="hd"><h1>${esc(c.name)}</h1>${status}<span class="spacer"></span>${actions}</div>${ctabs}<div class="body">${body}</div>`,
      act: Object.assign({
        connect() { c.connecting = true; rerender(); announce("Connecting");
          setTimeout(() => { c.connecting = false; c.connected = true; save(); rerender(); announce("Connected, 6 tools found"); }, 700); },
        test(b) { if (b.getAttribute("aria-disabled")) { announce("Connect a test account first"); return; }
          c.testing = true; rerender(); setTimeout(() => { c.testing = false; c.tested = true; save(); rerender(); announce("Test call succeeded: 3 ships"); }, 600); },
        publish(b) { if (b.getAttribute("aria-disabled")) { announce("Run a test call before publishing"); return; }
          const kk = kinds(c), cnt = s => c.tools.filter(t => t.set === s).length;
          dialog({ title: `Publish ${c.name}?`, body: `<p class="muted" style="margin-top:4px">People you choose can connect it with their own account.</p>
            <fieldset style="border:0;padding:0;margin:14px 0 0"><legend style="font-size:12.5px;font-weight:500">Who gets it</legend>
              <label class="choice"><input type="radio" name="who" value="all"><span><b>Everyone in Echo Base</b><span class="d">250 people</span></span></label>
              <label class="choice"><input type="radio" name="who" value="groups" checked><span><b>Selected groups</b><span class="d" id="gsum">Choose one or more groups</span></span></label>
              <div id="gps" style="padding:4px 0 0 28px">${[["Logistics", 24], ["Rogue One", 8], ["Base Engineering", 31]].map(([gname, gn]) => `<label class="check" style="margin:2px 0"><input type="checkbox" value="${gname}" data-n="${gn}"><span>${gname} <span class="muted">· ${gn}</span></span></label>`).join("")}</div></fieldset>
            <fieldset style="border:0;padding:0;margin:14px 0 0"><legend style="font-size:12.5px;font-weight:500">Sign-in</legend><label class="choice"><input type="radio" name="si" checked><span><b>Each person signs in</b><span class="d">The AI sees only what that person can see. Recommended.</span></span></label><label class="choice"><input type="radio" name="si"><span><b>One org connection</b><span class="d">Everyone uses the same shared account. Actions won’t show who asked.</span></span></label></fieldset>
            ${kv([["Tools", `${cnt("allowed")} read tools allowed<br>${cnt("approval")} write tools need approval<br>${cnt("blocked")} delete tool blocked`, 1]])}
            <p class="small muted" id="perr" role="alert"></p>`,
            foot: `<button type="button" class="btn ghost" data-close>Cancel</button><button type="button" class="btn pri" id="go">Publish</button>`,
            onOpen(d, api) {
              const gob = $("#go", d), pick = () => {
                const all = $("input[name=who]:checked", d).value === "all", gs = $$("#gps input:checked", d);
                $$("#gps input", d).forEach(x => x.disabled = all);
                if (all || $$("#gps input:checked", d).length) $("#perr", d).textContent = "";
                const n = gs.reduce((a, x) => a + +x.dataset.n, 0);
                $("#gsum", d).textContent = gs.length ? `${gs.map(x => x.value).join(", ")} · ${n} people` : "Choose one or more groups";
                gob.textContent = all ? "Publish for everyone" : gs.length ? `Publish for ${gs.length === 1 ? gs[0].value : gs.length + " groups"}` : "Publish";
                return { all, gs };
              };
              d.addEventListener("change", pick); pick();
              gob.onclick = () => { const { all, gs } = pick();
                if (!all && !gs.length) { $("#perr", d).textContent = "Choose at least one group, or Everyone."; $("#gps input", d).focus(); return; }
                c.published = true; c.audience = all ? "everyone" : gs.length === 1 ? gs[0].value : `${gs.length} groups`;
                c.tools.push(Object.assign({}, c.laterTool)); save(); api.close(); rerender(); toast(`${c.name} published for ${c.audience} · logged`); };
            } }); },
        deleteDraft() { S().connectors = data().filter(x => x !== c); save(); go("/ai/connectors"); toast(`${c.name} draft deleted`); },
        off() { dialog({ title: `Turn off ${c.name} for everyone?`, body: `<p class="muted">24 people lose access right away, in chat and in agents. Open sessions stop within a few minutes. You can turn it back on.</p>`,
          foot: `<button type="button" class="btn ghost" data-close>Cancel</button><button type="button" class="btn pri" id="tf">Turn off</button>`,
          onOpen: (d, api) => $("#tf", d).onclick = () => { api.close(); toast("Turning off isn't part of this prototype yet"); } }); }
      }, toolActs(c)) };
  });

  function toolsTab(c) {
    const s = S(), draft = s.toolDraft && s.toolDraft.id === c.id ? s.toolDraft.sets : {}, changed = Object.keys(draft).length;
    const val = t => draft[t.id] !== undefined ? draft[t.id] : t.set;
    const fresh = c.tools.filter(t => t.isNew && !t.reviewed);
    const rows = ["read", "write", "delete"].map(kd => { const ts = c.tools.filter(t => t.kind === kd); if (!ts.length) return "";
      const nn = ts.filter(t => t.isNew && !t.reviewed).length;
      return `<tr><th scope="rowgroup" colspan="4" style="background:var(--subtle);color:var(--ink);font-size:12.5px">${KIND[kd]} <span class="muted" style="font-weight:400">${ts.length - nn} tool${ts.length - nn === 1 ? "" : "s"}${nn ? ` · ${nn} new` : ""}</span></th></tr>` +
        ts.map(t => { const v = val(t), held = t.isNew && !t.reviewed && v == null;
          return `<tr id="row-${t.id}"${s.focusTool === t.id ? ' class="hl"' : ""}><th scope="row" style="font-weight:500;color:var(--ink)">${esc(t.name)}${t.isNew && !t.reviewed ? ' <span class="chip out">new</span>' : ""}<span class="mono muted" style="display:block;font-size:11px;font-weight:400">${t.id}</span></th>
            <td>${esc(t.what)}${v === "approval" && t.isNew ? `<span class="sub">The AI asks the person to confirm before it ${esc(t.name.toLowerCase().replace("hold", "holds"))}.</span>` : ""}</td><td>${v === "blocked" || held ? "Off" : esc(t.on)}</td>
            <td><fieldset class="seg" style="border:1px solid var(--rule-strong);flex-wrap:nowrap;margin:0;white-space:nowrap" aria-label="${esc(t.name)} setting"><legend class="vh">${esc(t.name)}</legend>${SET.map(([k2, n2]) => `<label><input type="radio" name="set-${t.id}" value="${k2}" data-change="setTool" data-id="${t.id}" ${v === k2 ? "checked" : ""}>${n2}</label>`).join("")}</fieldset>
              ${held ? '<span class="small" style="margin-left:8px;font-weight:500">Off until reviewed</span>' : ""}</td></tr>`; }).join(""); }).join("");
    return `<div class="row" style="min-height:36px"><span class="muted">Publishing a connector doesn’t turn on every tool. <b style="color:var(--ink)">People can’t override these settings.</b></span><span class="spacer"></span>
        ${changed ? `<span class="small" style="font-weight:500" aria-live="polite">${changed} change${changed === 1 ? "" : "s"}</span><button type="button" class="btn sm ghost" data-act="cancelTools">Cancel</button><button type="button" class="btn sm pri" data-act="saveTools">Save</button>` : ""}</div>
      ${fresh.map(t => `<div class="banner" style="margin-top:10px"><span class="chip dk">New tool</span><div class="tx"><b>${esc(t.name)}</b> was added by ${esc(c.publisher)} since it was tested. It’s off until you review it.</div><button type="button" class="btn sm" data-act="reviewTool" data-id="${t.id}">Review</button></div>`).join("")}
      <table style="margin-top:10px;table-layout:fixed"><colgroup><col style="width:24%"><col><col style="width:13%"><col style="width:330px"></colgroup><caption class="vh">${esc(c.name)} tools, grouped by what they do</caption><thead><tr><th scope="col">Tool</th><th scope="col">What it does</th><th scope="col">On in</th><th scope="col">Setting</th></tr></thead><tbody>${rows}</tbody></table>
      <p class="small muted">Allowed: the AI uses it when it helps. Needs approval: the AI asks the person to confirm first. Blocked: the AI can’t use it.</p>`;
  }
  function toolActs(c) {
    return {
      reviewTool(b) { S().focusTool = b.dataset.id; save(); rerender(); const r = $(`#row-${b.dataset.id} input`); r && r.focus(); announce("Choose a setting for the new tool"); },
      setTool(el) { const s = S(); if (!s.toolDraft || s.toolDraft.id !== c.id) s.toolDraft = { id: c.id, sets: {} };
        const t = c.tools.find(x => x.id === el.dataset.id); if (t.set === el.value && !t.isNew) delete s.toolDraft.sets[t.id]; else s.toolDraft.sets[t.id] = el.value; save(); rerender(); },
      cancelTools() { S().toolDraft = null; S().focusTool = null; save(); rerender(); announce("Changes discarded"); },
      saveTools() { const s = S(); Object.entries(s.toolDraft.sets).forEach(([id, v]) => { const t = c.tools.find(x => x.id === id); t.set = v; if (t.isNew) t.reviewed = true; });
        s.toolDraft = null; s.focusTool = null; save(); rerender(); toast("Tool settings saved · applies within a few minutes · logged"); }
    };
  }
})();
