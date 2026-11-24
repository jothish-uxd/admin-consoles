/* Compliance: Audit log (events with filters, saved views and export; event detail; streaming; alerts)
   and Policies (list, new from a template, a policy). */
(() => {
  const { route, esc, $, $$, icon, okSt, badSt, toast, announce, dialog, head, tabs, kv, empty, go, rerender, save } = App;
  const S = () => App.S;
  const cmp = at => tabs("Compliance", [["audit", "Audit log", "/compliance/audit"], ["policies", "Policies", "/compliance/policies"]], at);
  const guard = (crumbs) => S().role === "admin" ? null : { nav: "compliance", crumbs, title: "Admins only", html: `${head("This page is for admins")}<p class="lede">Switch to the admin view from your name at the top right.</p>` };
  const RANGES = [["1h", "Last hour"], ["24h", "Last 24 hours"], ["7d", "Last 7 days"], ["30d", "Last 30 days"]];
  const rangeLabel = r => (RANGES.find(x => x[0] === r) || RANGES[1])[1];

  // the Audit log page frame: the same header and tabs on Events, Streaming and Alerts
  function auditHead(p, at, viewName) {
    return `${head("Audit log", `<span class="chip" style="min-height:32px;border-radius:7px;background:var(--hover);border-color:var(--hover)">Views: <b style="font-weight:500">${esc(viewName || "All events")}</b></span>
      <button type="button" class="btn" data-act="copyLink">Copy link</button><button type="button" class="btn" data-act="export">Export</button><button type="button" class="btn" data-act="saveView">Save view</button>`)}
      ${tabs("Audit log", [["events", "Events", "/compliance/audit"], ["streaming", "Streaming", "/compliance/audit/streaming"], ["alerts", "Alerts", "/compliance/audit/alerts"]], at)}`;
  }
  function filtered(p) {
    const r = p.range || "24h";
    return (S().events.some(e => e.kind === "ai") ? S().events : S().events.concat(window.SEED.events.filter(e => e.kind === "ai"))).filter(e => (!p.kind || e.kind === p.kind) && (!p.actor || e.actor === p.actor) && (!p.result || (p.result === "failed" ? !e.ok : e.ok)) && (r === "7d" || r === "30d" ? true : !e.old) && (!p.q || (e.text + e.target + e.actor).toLowerCase().includes(p.q.toLowerCase())));
  }
  const qstr = (p, o = {}) => { const x = Object.assign({ kind: p.kind, actor: p.actor, range: p.range, result: p.result, q: p.q }, o); const s = Object.entries(x).filter(([k, v]) => v && !(k === "range" && v === "24h")).map(([k, v]) => k + "=" + encodeURIComponent(v)).join("&"); return s ? "?" + s : ""; };
  const query = p => [p.kind === "ai" && "action:ai.tool_call", p.actor && `actor:"${p.actor}"`, p.result && `result:${p.result}`, `time:last_${p.range || "24h"}`].filter(Boolean).join(" ");
  const sharedAct = p => ({
    copyLink() { const url = location.href; try { navigator.clipboard && navigator.clipboard.writeText(url).catch(() => {}); } catch (e) {} toast("Link copied · it includes your filters"); },
    export() {
      const rows = filtered(p);
      dialog({ title: "Export this view", body: `<fieldset style="border:0;padding:0;margin:8px 0 0"><legend style="font-size:12.5px;font-weight:500">Format</legend><div class="seg"><label><input type="radio" name="fmt" value="csv">CSV</label><label><input type="radio" name="fmt" value="json" checked>JSON</label></div></fieldset>
        <p style="margin:12px 0 0">Uses this view: <b style="font-weight:500">${rows.length} events · ${rangeLabel(p.range).toLowerCase()}</b></p>
        <p class="small muted" style="margin:4px 0 0">Ordered by time, in schema audit.v3 (<button type="button" class="link">docs</button>). Ranges over 100,000 events run as a job, and you'll be notified.</p>
        <p class="small muted" style="border-top:1px solid var(--rule);margin-top:12px;padding-top:10px">Full-log export is limited to Security admins. You're a Security admin.</p>`,
        foot: `<button type="button" class="btn ghost" data-close>Cancel</button><button type="button" class="btn pri" id="ex">Export</button>`,
        onOpen: (d, api) => $("#ex", d).onclick = () => { const f = $("input[name=fmt]:checked", d).value; api.close(); toast(`Exported ${rows.length} events · audit-log.${f} · logged`); } });
    },
    saveView() {
      dialog({ title: "Save view", body: `<div class="field" style="margin-top:8px"><label for="vn">Name</label><input type="text" id="vn" value="${p.actor ? esc(p.actor) + " investigation" : "My view"}" autofocus></div>
        <label class="check"><input type="checkbox" id="vsh" checked><span>Share with Security admins (6)</span></label>
        <p class="small muted">Saves these filters and the time range: <code>${esc(query(p))}</code>. Opening the view re-runs the query.</p>`,
        foot: `<button type="button" class="btn ghost" data-close>Cancel</button><button type="button" class="btn pri" id="sv">Save view</button>`,
        onOpen: (d, api) => $("#sv", d).onclick = () => { const s = S(), name = $("#vn", d).value.trim() || "My view"; s.views.push({ name, shared: $("#vsh", d).checked, qs: qstr(p) }); s.activeView = name; save(); api.close(); rerender(); toast(`View saved${$("#vsh", d) && $("#vsh", d).checked ? " and shared with Security admins" : ""} · link includes filters`); } });
    }
  });

  /* ================= Events ================= */
  route("/compliance/audit", p => {
    const g = guard([["Compliance", "/compliance/audit"], ["Audit log", ""]]); if (g) return g;
    const s = S(), rows = filtered(p), failed = rows.filter(e => !e.ok).length;
    const view = s.views.find(v => v.qs === qstr(p));
    const quick = [["AI tool calls", { kind: "ai" }], ["Failed sign-ins", { result: "failed" }], ["Admin role changes", { q: "role" }], ["API key changes", { q: "API key" }], ["New IP addresses", { q: "new IP" }]];
    return { nav: "compliance", crumbs: [["Compliance", "/compliance/audit"], ["Audit log", ""]], title: "Audit log",
      html: `${auditHead(p, "events", view && view.name)}
      <div class="body">
        <div class="row small muted" role="group" aria-label="Quick filters">Quick filters ${quick.map(([n, o]) => `<a class="chip" href="#/compliance/audit${qstr({}, o)}">${n}</a>`).join("")}${s.views.length ? ` · Saved: ${s.views.map(v => `<a class="chip dk" href="#/compliance/audit${v.qs}">${esc(v.name)}</a>`).join("")}` : ""}</div>
        <div class="row" style="margin-top:10px" role="group" aria-label="Filters">
          <label for="rg" class="vh">Time range</label><select id="rg" style="width:auto" data-change="range" aria-describedby="rg-h">${RANGES.map(([v, n]) => `<option value="${v}" ${(p.range || "24h") === v ? "selected" : ""}>${n}</option>`).join("")}<option value="custom">Custom range…</option></select>
          ${p.actor ? `<span class="chip out">Actor: ${esc(p.actor)} <a href="#/compliance/audit${qstr(p, { actor: "" })}" aria-label="Remove actor filter ${esc(p.actor)}" style="text-decoration:none">✕</a></span>` : ""}
          ${p.result ? `<span class="chip out">Result: ${esc(p.result)} <a href="#/compliance/audit${qstr(p, { result: "" })}" aria-label="Remove result filter" style="text-decoration:none">✕</a></span>` : ""}
          ${p.kind === "ai" ? `<span class="chip out">Action: AI tool calls <a href="#/compliance/audit${qstr(p, { kind: "" })}" aria-label="Remove AI tool calls filter" style="text-decoration:none">✕</a></span>` : ""}
          ${p.q ? `<span class="chip out">Text: ${esc(p.q)} <a href="#/compliance/audit${qstr(p, { q: "" })}" aria-label="Remove text filter" style="text-decoration:none">✕</a></span>` : ""}
          <label for="aq" class="vh">Search events</label><input type="search" id="aq" placeholder="Search events" value="${esc(p.q || "")}" style="flex:1;min-width:180px" data-change="search"></div>
        <span id="rg-h" class="vh">There is no all-time option. Ranges over 90 days run in the background.</span>
        <p class="small muted" style="margin:10px 0 0">Query <code style="color:var(--ink);background:var(--subtle);border:1px solid var(--rule);border-radius:6px;padding:2px 7px">${esc(query(p))}</code> <button type="button" class="link" data-act="editQuery">Edit as query</button></p>
        <p class="small muted" style="margin:8px 0 0" role="status">Times in <b style="color:var(--ink);font-weight:500">Pacific Time (PT)</b> · ${p.kind === "ai" ? `<b style="color:var(--ink);font-weight:500">${rows.length} AI tool calls</b> · ${new Set(rows.filter(e => e.via).map(e => e.actor)).size} people · ${rows.filter(e => !e.ok).length} failed · ${rows.filter(e => e.type === "Shared account").length} by a shared account` : p.actor || p.result || p.q || p.range ? `<b style="color:var(--ink);font-weight:500">${rows.length} events</b>${failed ? ` · ${failed} failed` : ""}` : `Showing <b style="color:var(--ink);font-weight:500">${rows.length}</b> of 18,204 events · narrow by actor, target or time`}</p>
        <table style="margin-top:8px"><caption class="vh">Audit events, newest first</caption><thead><tr><th scope="col">Time (PT)</th><th scope="col">Actor</th><th scope="col">Event</th><th scope="col">Target</th><th scope="col">Result</th></tr></thead><tbody>
        ${rows.map(e => `<tr><td class="mono" style="color:var(--ink)"><abbr title="${esc(e.date)} 2026 · ${e.time}${e.ms || ".000"} PT" style="text-decoration:underline dotted;text-underline-offset:3px">${e.date !== "Nov 22" ? e.date + " · " : ""}${e.time}</abbr></td>
          <td><a href="#/compliance/audit${qstr(p, { actor: e.actor })}" aria-label="Filter by actor ${esc(e.actor)}">${esc(e.actor)}</a><span class="sub">${esc(e.type)}</span></td>
          <td><a href="#/compliance/audit/event/${e.id}" style="color:var(--ink)">${esc(e.text)}</a><span class="sub mono">${esc(e.code)}</span></td><td>${esc(e.target)}</td><td>${e.ok ? okSt("Success") : badSt("Failed · " + e.reason)}</td></tr>`).join("") || `<tr><td colspan="5">${empty("No events match", "Widen the time range or remove a filter.")}</td></tr>`}
        </tbody></table>
        <div class="row" style="margin-top:12px"><span class="small muted">Newest first</span><span class="spacer"></span><button type="button" class="btn sm" data-act="next">Next 50 →</button></div></div>`,
      act: Object.assign({
        range(el) { if (el.value === "custom") { customRange(p); return; } go("/compliance/audit" + qstr(p, { range: el.value })); announce(`Showing ${rangeLabel(el.value).toLowerCase()}`); },
        search(el) { go("/compliance/audit" + qstr(p, { q: el.value })); },
        editQuery() { toast("Query editing isn't part of this prototype yet"); },
        next() { toast("The sample data ends here. The real log pages with a cursor, in a stable order."); }
      }, sharedAct(p)) };
  });
  function customRange(p) {
    dialog({ title: "Custom range", body: `<div class="cols even" style="grid-template-columns:1fr 1fr;gap:12px"><div class="field"><label for="cf">From <span class="opt">(YYYY-MM-DD HH:MM, PT)</span></label><input type="text" id="cf" value="2026-11-15 00:00"></div><div class="field"><label for="ctt">To <span class="opt">(YYYY-MM-DD HH:MM, PT)</span></label><input type="text" id="ctt" value="2026-11-22 23:59"></div></div>
      <p class="small muted">Ranges over 90 days run in the background; you'll be notified when results are ready.</p>`,
      foot: `<button type="button" class="btn ghost" data-close>Cancel</button><button type="button" class="btn pri" id="ap">Apply</button>`,
      onOpen: (d, api) => $("#ap", d).onclick = () => { api.close(); go("/compliance/audit" + qstr(p, { range: "7d" })); toast("Showing 15–22 Nov"); } });
  }

  /* ================= Event detail ================= */
  route("/compliance/audit/event/:id", p => {
    const g = guard([["Compliance", "/compliance/audit"], ["Audit log", "/compliance/audit"]]); if (g) return g;
    const s = S(), e = s.events.find(x => x.id === p.id) || window.SEED.events.find(x => x.id === p.id);
    if (!e) return { nav: "compliance", crumbs: [["Compliance", "/compliance/audit"]], html: head("Event not found") };
    const raw = p.raw === "1";
    const related = e.actor === "archive-sync" ? [["Same actor", [["e4", "09:40:48", "3 failed attempts on this archive"]]], ["Same session", [["e7", "08:58:30", "Signed in from a new IP address"]]], ["Same key, settings", [["e8", "21 Nov", "Toryn Farr changed archive-sync's API key settings"]]]]
      : e.id === "e8" ? [["Same key, after this", [["e7", "08:58:30", "archive-sync signed in from a new IP address"], ["e4", "09:40:48", "3 failed attempts on Death Star plans · archive"]]], ["Same actor", [["e1", "09:42:10", "Toryn Farr removed Cal Alder from Shield Ops"]]]] : [];
    const json = JSON.stringify({ schema: "audit.v3", action: e.code, actor: { type: e.type.toLowerCase().replace(" ", "_"), name: e.actor }, target: e.target, result: e.ok ? "success" : "failure",
      changes: e.changes ? Object.fromEntries(e.changes.map(([k, b, a]) => [k.toLowerCase().replace(/ /g, "_"), k === "Secret" ? "[redacted]" : [b, a]])) : undefined, request_id: e.ctx && e.ctx.req ? e.ctx.req.split(" ")[0] : undefined, time: `2026-11-${e.date.split(" ")[1]}T${e.time}${e.ms || ".000"}-08:00` }, null, 2);
    return { nav: "compliance", crumbs: [["Compliance", "/compliance/audit"], ["Audit log", "/compliance/audit"], ["Event", ""]], title: e.text,
      html: `<a class="back" href="#/compliance/audit" onclick="if(history.length>1){history.back();return false}">← Audit log</a>
      <div class="hd"><h1>${esc(e.text)}</h1><div class="seg" role="radiogroup" aria-label="Show"><label><input type="radio" name="vw" value="sum" ${raw ? "" : "checked"} data-change="raw">Summary</label><label><input type="radio" name="vw" value="raw" ${raw ? "checked" : ""} data-change="raw">Raw JSON</label></div></div>
      <p class="lede">${e.ok ? okSt("Success") : badSt("Failed · " + e.reason)} · ${esc(e.date)} 2026 · ${e.time}${e.ms || ""} PT · <code>${esc(e.code)}</code></p>
      <div class="body cols"><div>${raw ? `<h2>Raw event</h2><pre class="json">${esc(json)}</pre>` : `
        <section aria-labelledby="ch-h"><h2 id="ch-h">Changes</h2>${e.changes ? `<table><caption class="vh">Changes</caption><thead><tr><th scope="col">Field</th><th scope="col">Before</th><th scope="col">After</th><th scope="col">Change</th></tr></thead><tbody>
          ${e.changes.map(([k, b, a, c]) => `<tr><td>${k}</td>${b === null ? `<td colspan="2" class="muted">${esc(a)}</td>` : `<td><del>${esc(b)}</del><span class="vh"> (before)</span></td><td style="color:var(--ink)">${esc(a)}</td>`}<td><span class="chip out">${c}</span></td></tr>`).join("")}</tbody></table>`
          : e.kind === "ai" ? `<div class="note"><b>AI tool call</b> · ${esc(e.code)}. ${e.via ? `Asked by ${esc(e.actor)}, run by ${esc(e.type.replace("via ", ""))}.` : e.type === "Shared account" ? "Run by a shared account, so no person is attached." : ""}</div>` : `<div class="note">No changes: this was a read attempt.${e.why ? ` <b>${esc(e.why)}</b>` : ""}</div>`}</section>
        ${e.ctx ? `<section style="margin-top:18px" aria-labelledby="cx-h"><h2 id="cx-h">Context</h2>${kv(Object.entries({ "IP address": e.ctx.ip, Location: e.ctx.where, "User agent": e.ctx.ua, Session: e.ctx.session, "Request ID": e.ctx.req }).filter(([, v]) => v).map(([k, v]) => [k, esc(v)]))}</section>` : ""}`}</div>
      <aside aria-labelledby="rl-h"><h2 id="rl-h">Related events</h2>${related.length ? `<div class="card">${related.map(([g, items]) => `<h3 class="small muted" style="font-weight:500;text-transform:uppercase;letter-spacing:.05em;margin:8px 0 4px">${g}</h3><ul style="list-style:none;padding:0;margin:0">${items.map(([id, t, x]) => `<li class="row small" style="padding:4px 0;flex-wrap:nowrap"><span class="mono muted" style="width:64px;flex:none">${t}</span><a href="#/compliance/audit/event/${id}">${esc(x)}</a></li>`).join("")}</ul>`).join("")}</div>` : '<p class="muted">None found in the last 7 days.</p>'}</aside></div>`,
      act: { raw(el) { go(`/compliance/audit/event/${e.id}${el.value === "raw" ? "?raw=1" : ""}`); } } };
  });

  /* ================= Streaming ================= */
  route("/compliance/audit/streaming", p => {
    const g = guard([["Compliance", "/compliance/audit"], ["Audit log", "/compliance/audit"], ["Streaming", ""]]); if (g) return g;
    const s = S();
    const stState = st => st.state === "healthy" ? okSt("Healthy") : st.state === "catching" ? `<span class="st">${icon("back")}Catching up</span>` : `<span class="st bad">${icon("warn")}Delayed</span>`;
    return { nav: "compliance", crumbs: [["Compliance", "/compliance/audit"], ["Audit log", "/compliance/audit"], ["Streaming", ""]], title: "Streaming",
      html: `${auditHead(p, "streaming")}<div class="body" style="max-width:860px">
        <div class="hd"><h2 style="margin:0;flex:1">Streams</h2><button type="button" class="btn" data-act="addStream">Add stream</button></div>
        <p class="small muted row" style="margin:8px 0 0">Destinations ${["Splunk", "Microsoft Sentinel", "Datadog", "Amazon S3", "Webhook"].map(d => `<span class="chip">${d}</span>`).join("")}</p>
        ${s.streams.map(st => `<section class="card ${st.state === "delayed" ? "strong" : ""}" style="margin-top:12px" aria-labelledby="st-${st.id}"><div class="row"><h3 id="st-${st.id}" style="margin:0">${esc(st.name)}</h3><span class="small muted">${esc(st.dest)} · ${esc(st.what)}</span><span class="spacer"></span><span aria-live="polite">${stState(st)}</span></div>
          <p class="muted" style="margin:6px 0 0">${st.state === "healthy" ? `Last event delivered <b style="color:var(--ink);font-weight:500">${esc(st.last)}</b>${st.rate ? ` · ${st.rate}` : ""} · ordered by time · schema audit.v3`
            : st.state === "catching" ? `<b style="color:var(--ink);font-weight:500">Replaying from ${st.since}, in order.</b> <span id="left-${st.id}">${st.buffered.toLocaleString()}</span> buffered events left.`
            : `<b style="color:var(--ink);font-weight:500">Events delayed by ${st.delay} minutes.</b> The bucket rejected writes at ${st.since}. ${st.buffered.toLocaleString()} events are buffered and retried every minute; none dropped.`}</p>
          ${st.dest === "Amazon S3" ? `${st.state === "delayed" ? `<div class="row" style="margin-top:10px"><button type="button" class="btn pri sm" data-act="replay" data-id="${st.id}">Replay now</button><button type="button" class="btn sm" data-act="settings">Settings</button></div>` : st.state === "catching" ? `<div class="bar" style="margin-top:10px;max-width:220px" role="progressbar" aria-label="Replay progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" id="rp"><i id="rpf" style="width:0"></i></div>` : ""}
            <div style="margin-top:10px;padding-top:10px;border-top:1px solid var(--rule)">${kv([["Bucket name", `${esc(st.bucket)} <span class="muted">· the bucket only, no s3:// prefix</span>`], ["Streams", 'Failed and admin events only <span class="muted">· keeps volume and cost down</span>']])}</div>` : ""}</section>`).join("")}
        <p class="small muted" style="margin-top:12px">Every export and stream change is logged · Schema audit.v3 · <button type="button" class="link" data-act="changelog">Changelog</button></p></div>`,
      mount() {
        const st = S().streams.find(x => x.state === "catching"); if (!st) return;
        const start = st.buffered; let left = start;
        const tick = setInterval(() => { left = Math.max(0, left - 2400); const l = $("#left-" + st.id); if (!l) { clearInterval(tick); return; }
          l.textContent = left.toLocaleString(); const pc = Math.round((1 - left / start) * 100); $("#rp").setAttribute("aria-valuenow", pc); $("#rpf").style.width = pc + "%";
          if (!left) { clearInterval(tick); st.state = "healthy"; st.last = "2 seconds ago"; delete st.delay; save(); rerender(); announce("Archive bucket caught up. Healthy."); } }, 120);
      },
      act: Object.assign({
        replay(b) { const st = S().streams.find(x => x.id === b.dataset.id); st.state = "catching"; save(); rerender(); toast(`Replaying ${st.buffered.toLocaleString()} buffered events from ${st.since}, in order · logged`); },
        addStream() { toast("Adding a stream isn't part of this prototype yet"); }, settings() { toast("Stream settings aren't part of this prototype yet"); }, changelog() { toast("The schema changelog isn't part of this prototype yet"); }
      }, sharedAct(p)) };
  });

  /* ================= Alerts ================= */
  route("/compliance/audit/alerts", p => {
    const g = guard([["Compliance", "/compliance/audit"], ["Audit log", "/compliance/audit"], ["Alerts", ""]]); if (g) return g;
    const s = S();
    return { nav: "compliance", crumbs: [["Compliance", "/compliance/audit"], ["Audit log", "/compliance/audit"], ["Alerts", ""]], title: "Alerts",
      html: `${auditHead(p, "alerts")}<div class="body cols"><div>
        <div class="hd"><h2 style="margin:0;flex:1">Alerts</h2><button type="button" class="btn" data-act="newAlert" id="newAlert">New alert from a view</button></div>
        <table style="margin-top:8px"><caption class="vh">Alerts</caption><thead><tr><th scope="col">Alert</th><th scope="col">When</th><th scope="col">Sends to</th><th scope="col">7 days</th><th scope="col"><span class="vh">Actions</span></th></tr></thead><tbody>
        ${s.alerts.map(a => `<tr${a.fresh ? ' class="hl"' : ""}><td>${esc(a.name)}${a.builtin ? ' <span class="chip">built-in</span>' : ""}${a.from ? `<span class="sub">from view · ${esc(a.from)}</span>` : ""}</td>
          <td>${a.muted ? `<b style="color:var(--ink);font-weight:500">Muted until 26 Nov</b><span class="sub">${esc(a.muted.split(" · ")[1] || "")}</span>` : esc(a.when)}</td><td>${esc(a.to)}</td><td>${a.week}</td>
          <td class="act"><button type="button" class="btn sm ghost" data-act="mute" data-id="${a.id}">${a.muted ? "Unmute" : "Mute"}</button></td></tr>`).join("")}</tbody></table></div>
      <aside aria-labelledby="ah-h"><h2 id="ah-h">Alert history</h2><div class="card"><ul style="list-style:none;padding:0;margin:0">${s.alertHistory.map(h => `<li style="padding:8px 0;border-bottom:1px solid var(--rule)"><span class="mono small muted">${esc(h.when)} · ${esc(h.name)}</span><div>${esc(h.text)}</div>
        <div class="row small" style="margin-top:4px"><a class="link" href="#${h.link || "/compliance/audit"}">${h.link ? "View 3 events →" : "View event →"}</a><span class="muted">${esc(h.sent)}</span></div></li>`).join("")}</ul></div></aside></div>`,
      act: Object.assign({
        mute(b) { const a = S().alerts.find(x => x.id === b.dataset.id);
          if (a.muted) { delete a.muted; save(); rerender(); toast(`${a.name} unmuted · logged`); return; }
          dialog({ title: `Mute ${a.name}?`, body: `<div class="field" style="margin-top:8px"><label for="mu">For how long</label><select id="mu"><option>7 days</option><option>1 day</option><option>30 days</option></select></div><div class="field"><label for="mr">Why</label><input type="text" id="mr" placeholder="For example: VPN rollout" autofocus aria-describedby="mr-h"><span class="hint" id="mr-h">Saved with the mute, so others know why.</span></div>`,
            foot: `<button type="button" class="btn ghost" data-close>Cancel</button><button type="button" class="btn pri" id="mm">Mute</button>`,
            onOpen: (d, api) => $("#mm", d).onclick = () => { const r = $("#mr", d); if (!r.value.trim()) { r.setAttribute("aria-invalid", "true"); r.focus(); announce("Add a reason"); return; } a.muted = `Muted until 29 Nov · by Lavanya Sienna, today: ${r.value.trim()}`; save(); api.close(); rerender(); toast(`${a.name} muted · logged`); } }); },
        newAlert() {
          const views = S().views.length ? S().views : [{ name: "archive-sync investigation", qs: "?actor=archive-sync&range=7d" }];
          dialog({ title: "New alert", wide: true, body: `<div class="field" style="margin-top:8px"><label for="av">From the saved view</label><select id="av">${views.map((v, i) => `<option value="${i}">${esc(v.name)}</option>`).join("")}</select></div>
            <fieldset style="border:0;padding:0;margin:14px 0 0"><legend style="font-size:12.5px;font-weight:500">Alert when</legend><div class="row" style="flex-wrap:wrap">
              <label for="an" class="vh">Number of events</label><input type="number" id="an" value="3" min="1" style="width:70px"> or more <label for="ak" class="vh">Result</label><select id="ak" style="width:auto"><option>failed</option><option>any</option></select> events happen within <label for="aw" class="vh">Time window</label><select id="aw" style="width:auto"><option>10 minutes</option><option>1 hour</option></select></div>
              <p class="note small" style="margin-top:8px" id="aex">Example: 3 failed downloads between 09:40 and 09:41 would send one alert. 2 would not.</p></fieldset>
            <div class="cols even" style="grid-template-columns:1fr 1fr;gap:16px"><fieldset style="border:0;padding:0;margin:8px 0 0"><legend style="font-size:12.5px;font-weight:500">Send to</legend>
              <label class="check"><input type="checkbox" checked><span>Email <span class="muted">· Security admins (6)</span></span></label><label class="check"><input type="checkbox" checked><span>Chat <span class="muted">· #sec-alerts</span></span></label><label class="check"><input type="checkbox" checked><span>PagerDuty <span class="muted">· Security on-call</span></span></label></fieldset>
              <div><div class="field"><label for="ar">Route to</label><select id="ar"><option>Echo Base admins</option><option>Whole org</option></select></div><p class="small muted">Each alert says what happened, who and when, with a link to the matching events.</p></div></div>
            <p class="small muted">Checked on the live stream within seconds. Repeats within an hour join the same incident.</p>`,
            foot: `<button type="button" class="btn ghost" data-close>Cancel</button><button type="button" class="btn pri" id="ca">Create alert</button>`,
            onOpen(d, api) {
              const ex = () => { $("#aex", d).textContent = `Example: ${$("#an", d).value} ${$("#ak", d).value} downloads between 09:40 and 09:41 would send one alert. ${Math.max(0, $("#an", d).value - 1)} would not.`; };
              $("#an", d).addEventListener("input", ex); $("#ak", d).addEventListener("change", ex);
              $("#ca", d).onclick = () => { const s = S(), v = views[+$("#av", d).value]; s.alerts.forEach(a => a.fresh = false);
                s.alerts.unshift({ id: "a" + Date.now(), name: v.name.replace(" investigation", "") + " failed access", when: `${$("#an", d).value}+ ${$("#ak", d).value} events in ${$("#aw", d).value.replace("minutes", "min")}`, to: "Email · #sec-alerts · PagerDuty", week: "1 incident", from: $("#ar", d).value, fresh: true });
                s.alertHistory.unshift({ when: "Today · 09:41 PT", name: v.name.replace(" investigation", "") + " failed access", text: "archive-sync, an API key, failed 3 times to reach Death Star plans · archive between 09:40 and 09:41 PT.", sent: "3 matches · 1 incident", link: "/compliance/audit?actor=archive-sync&result=failed" });
                save(); api.close(); rerender(); toast("Alert created · checked on the live stream · logged"); };
            } });
        }
      }, sharedAct(p)) };
  });

  /* ================= Policies ================= */
  route("/compliance/policies", () => {
    const g = guard([["Compliance", "/compliance/audit"], ["Policies", ""]]); if (g) return g;
    const s = S();
    return { nav: "policies", crumbs: [["Compliance", "/compliance/audit"], ["Policies", ""]], title: "Policies",
      html: `${head("Policies", `<a class="btn pri" href="#/compliance/policies/new">New policy</a>`)}
      <table style="margin-top:16px"><caption class="vh">Policies</caption><thead><tr><th scope="col">Policy</th><th scope="col">Applies to</th><th scope="col">From template</th><th scope="col">Review access</th></tr></thead><tbody>
      ${s.policies.map(x => `<tr${x.fresh ? ' class="hl"' : ""}><td><a href="#/compliance/policies/${x.id}">${esc(x.name)}</a><span class="sub">${esc(x.owner)}</span></td><td>${esc(x.applies)}</td><td>${esc(x.template)}</td><td>${esc(x.review)}</td></tr>`).join("")}</tbody></table>` };
  });
  route("/compliance/policies/new", p => {
    const g = guard([["Compliance", "/compliance/audit"], ["Policies", "/compliance/policies"], ["New policy", ""]]); if (g) return g;
    const s = S(), src = p.src || "org", q = (p.q || "").toLowerCase(), t = s.templates.find(x => x.id === p.t);
    const list = src === "org" ? s.templates.filter(x => !q || x.name.toLowerCase().includes(q)) : [];
    return { nav: "policies", crumbs: [["Compliance", "/compliance/audit"], ["Policies", "/compliance/policies"], ["New policy", ""]], title: "New policy",
      html: `${head("New policy", `<a class="btn ghost" href="#/compliance/policies">Cancel</a>`)}
      <div class="row" style="margin-top:12px;border-bottom:1px solid var(--rule);align-items:flex-end"><nav class="tabs" aria-label="Template source" style="border:0;margin:0"><a href="#/compliance/policies/new"${src === "org" ? ' aria-current="page"' : ""}>Echo Base · ${s.templates.length}</a><a href="#/compliance/policies/new?src=builtin"${src === "builtin" ? ' aria-current="page"' : ""}>Built-in · ${s.builtinTemplates.length}</a></nav>
        <span class="spacer"></span><label for="tq" class="vh">Search templates</label><input type="search" id="tq" placeholder="Search templates" value="${esc(p.q || "")}" style="width:240px;margin-bottom:8px" data-change="search"></div>
      <div class="body cols"><ul style="list-style:none;padding:0;margin:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px;align-content:start">
        <li><a class="card" style="display:block;margin:0;border-style:dashed;text-decoration:none;min-height:140px" href="#/compliance/policies/new?t=blank"><b>Start blank</b><span class="small muted" style="display:block">Set every option yourself.</span></a></li>
        ${src === "org" ? list.map(x => `<li><a class="card ${t && t.id === x.id ? "strong" : ""}" style="display:block;margin:0;text-decoration:none;min-height:140px${t && t.id === x.id ? ";background:var(--subtle)" : ""}" href="#/compliance/policies/new?t=${x.id}" ${t && t.id === x.id ? 'aria-current="true"' : ""}><b>${esc(x.name)}</b><span class="small muted" style="display:block">${esc(x.desc)}</span>
          <span class="row small" style="margin-top:8px"><span class="av sm" aria-hidden="true">${x.initials}</span>${esc(x.owner)} · v${x.v}</span>${x.required ? `<span class="chip out" style="margin-top:6px">${esc(x.required)}</span>` : ""}</a></li>`).join("")
          : s.builtinTemplates.map(n => `<li class="card" style="margin:0;min-height:140px"><b>${esc(n)}</b><span class="small muted" style="display:block">Built-in · maintained by Echo Base Console</span></li>`).join("")}</ul>
      <aside>${t ? `<section class="card strong" aria-labelledby="tp-h"><h2 id="tp-h">${esc(t.name)}</h2><p class="small muted" style="margin:-6px 0 10px">Org template · ${esc(t.owner)} · version ${t.v}</p>
          <h3 class="small muted" style="font-weight:500">This template sets</h3>${kv(t.sets.map(([k, v]) => [k, esc(v)]))}
          <div class="field"><label for="pn">Policy name</label><input type="text" id="pn" value="${esc(p.t === "restricted" ? "Death Star plans · restricted" : t.name)}"></div>
          ${t.review ? `<fieldset style="border:0;padding:0;margin:14px 0 0"><legend style="font-size:12.5px;font-weight:500">Review access every</legend><div class="seg" style="margin-top:5px">${[30, 60, 90].map(n => `<label><input type="radio" name="rv" value="${n}" ${n === t.review ? "checked" : ""}>${n} days</label>`).join("")}</div></fieldset>` : ""}
          <button type="button" class="btn pri" style="margin-top:16px;width:100%" data-act="use">Use ${esc(t.name)}</button></section>` : p.t === "blank" ? `<section class="card"><h2>Start blank</h2><p class="muted">A blank policy isn't part of this prototype yet. Pick a template to see how it works.</p></section>` : `<section class="card"><h2>Preview</h2><p class="muted" style="margin:0">Choose a template to see exactly what it sets before you create anything.</p></section>`}</aside></div>`,
      act: {
        search(el) { go("/compliance/policies/new?" + (el.value ? "q=" + encodeURIComponent(el.value) : "")); },
        use() { const s = S(), name = $("#pn").value.trim() || t.name, rv = $("input[name=rv]:checked"), days = rv ? +rv.value : 0;
          const np = { id: "p" + Date.now(), name, owner: "Lavanya Sienna", applies: "Not applied yet", template: `${t.name} v${t.v}`, review: days ? `Every ${days} days` : "Until released", changed: days && days !== t.review ? `Review changed from ${t.review} to ${days} days` : "", sets: t.sets, fresh: true };
          s.policies.forEach(x => x.fresh = false); s.policies.unshift(np); save(); go("/compliance/policies/" + np.id); toast(`Policy created from ${t.name} v${t.v} · logged`); }
      } };
  });
  route("/compliance/policies/:id", ({ id }) => {
    const g = guard([["Compliance", "/compliance/audit"], ["Policies", "/compliance/policies"]]); if (g) return g;
    const x = S().policies.find(y => y.id === id);
    if (!x) return { nav: "policies", crumbs: [["Compliance", "/compliance/audit"], ["Policies", "/compliance/policies"]], html: head("Policy not found") };
    return { nav: "policies", crumbs: [["Compliance", "/compliance/audit"], ["Policies", "/compliance/policies"], [x.name, ""]], title: x.name,
      html: `<a class="back" href="#/compliance/policies">← Policies</a>${head(x.name, `<button type="button" class="btn" data-act="apply">Apply to folders</button>`)}
      <div class="row" style="margin-top:8px"><span class="chip">${icon("ok")} From ${esc(x.template)}</span></div>
      <section class="card" style="margin-top:16px;max-width:720px" aria-labelledby="ps-h"><h2 id="ps-h">Settings</h2>${kv((x.sets || [["Applies to", x.applies]]).map(([k, v]) => [k, esc(v)]).concat([["Review access", `${esc(x.review)}${x.changed ? ` <span class="muted">· ${esc(x.changed.replace("Review ", "").replace("changed", "changed"))}</span>` : ""}`]]))}</section>
      <p class="note" style="max-width:720px;margin-top:12px">Later changes to the template won't update this policy. You'll be told when a new version is out, and can review the differences before applying them.</p>`,
      act: { apply() { toast("Applying to folders isn't part of this prototype yet"); } } };
  });
})();
