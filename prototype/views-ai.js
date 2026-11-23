/* AI: Features (who gets what), Data, Models, Usage (budgets), Safety (reports). */
(() => {
  const { route, esc, $, $$, icon, okSt, badSt, toast, announce, dialog, head, tabs, kv, empty, go, rerender, save, num } = App;
  const S = () => App.S;
  const at = a => tabs("AI", [["features", "Features", "/ai/features"], ["data", "Data", "/ai/data"], ["models", "Models", "/ai/models"], ["usage", "Usage", "/ai/usage"], ["safety", "Safety", "/ai/safety"], ["connectors", "Connectors", "/ai/connectors"]], a);
  const cr = (t, h) => [["AI", "/ai/features"], [t, h]];
  const guard = crumbs => S().role === "admin" ? null : { nav: "ai", crumbs, title: "Admins only", html: `${head("This page is for admins")}<p class="lede">Switch to the admin view from your name at the top right.</p>` };
  const GROUPS = ["Rogue One", "Red Squadron", "Base Engineering", "Intelligence", "Logistics"];

  route("/ai/features", () => {
    const g = guard(cr("Features", "")); if (g) return g;
    const s = S();
    return { nav: "ai", crumbs: cr("Features", ""), title: "AI features",
      html: `${head("AI")}${at("features")}<div class="body"><table><caption class="vh">AI features</caption><thead><tr><th scope="col">Feature</th><th scope="col">Status</th><th scope="col">Who</th><th scope="col">Adoption</th><th scope="col"><span class="vh">Actions</span></th></tr></thead><tbody>
        ${s.features.map(f => `<tr><td>${esc(f.name)}${f.isNew ? ' <span class="chip">New</span>' : ""}<span class="sub">${esc(f.what)}</span></td><td>${esc(f.status)}</td><td>${esc(f.who)}</td><td>${esc(f.adoption)}</td>
          <td class="act"><button type="button" class="btn sm" data-act="manage" data-id="${f.id}" ${f.isNew ? "disabled" : ""}>Manage</button></td></tr>`).join("")}</tbody></table></div>`,
      act: { manage(b) { const f = s.features.find(x => x.id === b.dataset.id);
        dialog({ title: `Who gets ${f.name}`, body: `<fieldset style="border:0;padding:0;margin:8px 0 0"><legend style="font-size:12.5px;font-weight:500">Turn on for</legend>${GROUPS.map(gr => `<label class="check"><input type="checkbox" value="${gr}" ${f.groups.includes(gr) ? "checked" : ""}><span>${gr}</span></label>`).join("")}</fieldset>
          <p class="small muted">It only uses what each person can already open.</p>`,
          foot: `<button type="button" class="btn ghost" data-close>Cancel</button><button type="button" class="btn pri" id="fs">Save</button>`,
          onOpen: (d, api) => $("#fs", d).onclick = () => { f.groups = $$("input:checked", d).map(i => i.value); const n = f.groups.length;
            f.status = n ? `On for ${n} group${n === 1 ? "" : "s"}` : "Off"; f.who = n ? f.groups.join(", ") : "No one"; save(); api.close(); rerender(); toast(`${f.name}: ${f.status.toLowerCase()} · logged`); } }); } } };
  });

  route("/ai/data", () => {
    const g = guard(cr("Data", "")); if (g) return g;
    const d = S().aiData;
    return { nav: "ai", crumbs: cr("Data", ""), title: "AI data",
      html: `${head("AI")}${at("data")}<div class="body cols"><div>
        <section class="card" aria-labelledby="rt-h"><h2 id="rt-h">How long prompts are kept</h2><div class="seg" role="radiogroup" aria-labelledby="rt-h">${[["0", "Not kept"], ["30", "30 days"], ["90", "90 days"]].map(([v, n]) => `<label><input type="radio" name="rt" value="${v}" ${d.retention === v ? "checked" : ""} data-change="ret">${n}</label>`).join("")}</div>
          <p class="small muted" style="margin:8px 0 0">Never used to train models.</p></section>
        <section class="card" aria-labelledby="lb-h"><h2 id="lb-h">AI never reads files labelled</h2><div class="row">${d.labels.map(l => `<span class="cls r">${esc(l)}</span>`).join("")}</div></section></div>
      <aside><section class="card" aria-labelledby="rg-h"><h2 id="rg-h">Where data is processed</h2>${kv(d.regions.map(([a, b]) => [a, esc(b)]))}</section></aside></div>`,
      act: { ret(el) { d.retention = el.value; save(); toast(`Prompts ${el.value === "0" ? "not kept" : "kept for " + el.value + " days"} · logged`); } } };
  });

  route("/ai/models", () => {
    const g = guard(cr("Models", "")); if (g) return g;
    const m = S().models;
    return { nav: "ai", crumbs: cr("Models", ""), title: "AI models",
      html: `${head("AI")}${at("models")}<div class="body"><p class="small muted" style="margin:0 0 10px">Only approved models run · processed in the <b style="color:var(--ink)">${esc(m.region)}</b> unless marked</p>
        <table><caption class="vh">Approved models</caption><thead><tr><th scope="col">Model</th><th scope="col">Powers</th><th scope="col">Speed</th><th scope="col">Quality</th><th scope="col">Cost</th><th scope="col">Runs in</th><th scope="col">On</th></tr></thead><tbody>
        ${m.list.map(x => `<tr><td>${esc(x.name)} <span class="mono muted">${esc(x.ver)}</span><span class="sub">${esc(x.provider)} · ${esc(x.desc)}</span></td><td>${esc(x.powers)}</td><td>${x.speed}</td><td>${x.quality}</td><td><span aria-label="${x.cost.length} of 3">${x.cost}</span></td>
          <td>${esc(x.where)}${x.outside ? `<span class="sub">${icon("warn")} outside your region</span>` : ""}</td><td><label class="check" style="margin:0"><input type="checkbox" data-change="toggle" data-id="${x.id}" ${x.on ? "checked" : ""}><span class="vh">${esc(x.name)} on</span></label></td></tr>`).join("")}</tbody></table></div>`,
      act: { toggle(el) { const x = m.list.find(y => y.id === el.dataset.id); x.on = el.checked; save(); toast(`${x.name} ${x.on ? "on" : "off"}${x.on ? "" : `. ${x.powers} falls back to another approved model.`}`); } } };
  });

  route("/ai/usage", () => {
    const g = guard(cr("Usage", "")); if (g) return g;
    const u = S().usage, pc = Math.round(u.used / u.budget * 100);
    return { nav: "ai", crumbs: cr("Usage", ""), title: "AI usage",
      html: `${head("AI", `<button type="button" class="btn" data-act="budget" data-id="org">Change org budget</button>`)}${at("usage")}<div class="body">
        <div style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:12px"><div class="card" style="margin:0"><div class="small muted">Credits this month</div><div><span class="stat">${num(u.used)}</span> <span class="muted">of ${num(u.budget)}</span></div><div class="bar" role="progressbar" aria-label="Credits used" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pc}"><i style="width:${pc}%"></i></div><div class="small muted">Forecast ${num(u.forecast)} by month end</div></div>
          <div class="card" style="margin:0"><div class="small muted">Requests</div><span class="stat">${num(u.requests)}</span></div><div class="card" style="margin:0"><div class="small muted">Hours saved, estimated</div><span class="stat">${num(u.saved)}</span></div></div>
        <table style="margin-top:16px"><caption class="vh">Usage by group</caption><thead><tr><th scope="col">Group</th><th scope="col">Requests</th><th scope="col">Credits</th><th scope="col">Budget</th><th scope="col"><span class="vh">Actions</span></th></tr></thead><tbody>
        ${u.groups.map(x => `<tr><td>${esc(x.name)}<span class="sub">${esc(x.cc)}${x.spike ? " · " + esc(x.spike) : ""}</span></td><td>${num(x.req)}</td><td>${num(x.credits)}${x.credits / x.budget > .9 ? `<span class="sub">${icon("warn")} ${Math.round(x.credits / x.budget * 100)}% of budget</span>` : ""}</td><td>${num(x.budget)}</td>
          <td class="act"><button type="button" class="btn sm ghost" data-act="budget" data-id="${x.id}">Change budget</button></td></tr>`).join("")}</tbody></table></div>`,
      act: { budget(b) { const x = b.dataset.id === "org" ? null : u.groups.find(y => y.id === b.dataset.id), cur = x ? x.budget : u.budget;
        dialog({ title: `${x ? x.name : "Org"} monthly budget`, body: `<div class="field" style="margin-top:8px"><label for="bv">Credits per month</label><input type="number" id="bv" value="${cur}" min="0" step="100"></div>
          <fieldset style="border:0;padding:0;margin:12px 0 0"><legend style="font-size:12.5px;font-weight:500">When it runs out</legend><label class="choice"><input type="radio" name="ro" checked><span><b>Warn and keep going</b><span class="d">Admins are told at 80% and 100%.</span></span></label><label class="choice"><input type="radio" name="ro"><span><b>Pause AI for this ${x ? "group" : "org"}</b><span class="d">Until next month or until you raise it.</span></span></label></fieldset>`,
          foot: `<button type="button" class="btn ghost" data-close>Cancel</button><button type="button" class="btn pri" id="bs">Save budget</button>`,
          onOpen: (d, api) => $("#bs", d).onclick = () => { const v = +$("#bv", d).value || 0; if (x) x.budget = v; else u.budget = v; save(); api.close(); rerender(); toast(`Budget set to ${num(v)} credits · logged`); } }); } } };
  });

  route("/ai/safety", () => {
    const g = guard(cr("Safety", "")); if (g) return g;
    const sf = S().safety, open = sf.reports.filter(r => r.open);
    return { nav: "ai", crumbs: cr("Safety", ""), title: "AI safety",
      html: `${head("AI")}${at("safety")}<div class="body cols"><div>
        <h2 style="margin:0">Reports from people <span class="n small muted" style="font-weight:400">${open.length} open · ${sf.resolved} resolved</span></h2>
        <ul style="list-style:none;padding:0;margin:10px 0 0">${sf.reports.map(r => `<li class="card" style="margin:0 0 10px"><div class="row"><span class="chip">${esc(r.kind)}</span><span class="small muted">${esc(r.who)} · ${esc(r.when)} · ${esc(r.feature)}</span><span class="spacer"></span>${r.open ? "" : okSt(r.outcome || "Resolved")}</div>
          <p style="margin:8px 0 0">${esc(r.text)}</p>${r.matched ? `<p class="small muted" style="margin:4px 0 0">Matched blocked topic <b style="color:var(--ink)">${esc(r.matched)}</b></p>` : ""}
          ${r.open ? `<div class="row" style="margin-top:8px">${r.matched ? `<button type="button" class="btn sm" data-act="allow" data-id="${r.id}">Allow this kind of question</button>` : ""}<button type="button" class="btn sm" data-act="resolve" data-id="${r.id}">Mark resolved</button></div>` : ""}</li>`).join("")}</ul></div>
      <aside><section class="card" aria-labelledby="fl-h"><h2 id="fl-h">Filter strength</h2><div class="seg" role="radiogroup" aria-labelledby="fl-h">${["relaxed", "standard", "strict"].map(v => `<label><input type="radio" name="fs" value="${v}" ${sf.strength === v ? "checked" : ""} data-change="strength">${v[0].toUpperCase() + v.slice(1)}</label>`).join("")}</div></section>
        <section class="card" aria-labelledby="bt-h"><h2 id="bt-h">Blocked topics</h2><div class="row">${sf.topics.map(t => `<span class="cls r">${esc(t)}</span>`).join("")}</div></section></aside></div>`,
      act: {
        strength(el) { sf.strength = el.value; save(); toast(`Filter set to ${el.value} · logged`); },
        resolve(b) { const r = sf.reports.find(x => x.id === b.dataset.id); r.open = false; r.outcome = "Resolved"; sf.resolved++; save(); rerender(); toast("Marked resolved · the reporter is told", () => { r.open = true; sf.resolved--; save(); rerender(); }); },
        allow(b) { const r = sf.reports.find(x => x.id === b.dataset.id); r.open = false; r.outcome = "Exception added"; sf.resolved++; save(); rerender(); toast(`Supply-drop questions now allowed for Echo Base staff. ${r.matched} stays blocked otherwise.`); }
      } };
  });
})();
