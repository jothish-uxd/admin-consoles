/* Access: the Archives (members are denied and can ask), My access (grants, expiring, extend), Approvals
   (queue, bulk approve low risk, a request with narrowing), Access reviews (keep or remove). */
(() => {
  const { route, esc, $, $$, icon, okSt, badSt, toast, announce, dialog, head, tabs, kv, empty, go, rerender, save } = App;
  const S = () => App.S;
  const at = a => tabs("Access", [["approvals", "Approvals", "/access/approvals"], ["reviews", "Access reviews", "/access/reviews"]], a);
  const guard = crumbs => S().role === "admin" ? null : { nav: "access", crumbs, title: "Admins only", html: `${head("This page is for admins")}<p class="lede">Switch to the admin view from your name at the top right.</p>` };
  const riskChip = r => `<span class="chip ${r === "High" ? "dk" : ""}">${r} risk</span>`; // the request page header, as in the Review detail clip
  const riskPill = r => `<span class="risk ${r === "High" ? "hi" : ""}">${r}</span>`; // queue rows, as in the Approval queue clip

  /* ================= Archives ================= */
  route("/archives", () => {
    const s = S(), ITEM = "Rebel Intelligence dossiers", mine = s.grants.find(g => g.what === ITEM && !g.expired), req = s.myRequests.find(r => r.what === ITEM);
    if (s.role === "admin" || mine) return { nav: "archives", crumbs: [["Archives", "/archives"]], title: ITEM,
      html: `${head(ITEM, `<span class="chip dk">Restricted</span>`)}<p class="lede">${s.role === "admin" ? "You can open this as an admin. Your visit is logged." : `You have Viewer access ${mine.ends ? "until " + esc(mine.ends) : ""}.`}</p>
        <ul class="card" style="list-style:none;max-width:640px">${["Agent roster.xlsx", "Fulcrum contacts.pdf", "Safe houses · Outer Rim.pdf"].map(n => `<li style="padding:8px 0;border-bottom:1px solid var(--rule)">${n}</li>`).join("")}</ul>` };
    return { nav: "archives", crumbs: [["Archives", "/archives"]], title: "You don't have access",
      html: `<div style="max-width:560px"><h1>You don't have access to ${ITEM}</h1>
        <p class="lede">It's restricted to Rebel Intelligence. Gen. Dodonna owns it.</p>
        ${req ? `<section class="card" aria-labelledby="rq-h"><h2 id="rq-h">Request sent</h2>${kv([["Asked for", `${esc(req.level)} · ${esc(req.days)}`], ["Reason", esc(req.why)], ["Status", `<span class="st">${icon("back")}Waiting for Gen. Dodonna · usually within a day</span>`]])}
          <div class="row" style="margin-top:10px"><a class="btn" href="#/my-access">See my access</a><button type="button" class="btn ghost" data-act="withdraw">Withdraw request</button></div></section>` :
        `<form class="card" id="rf" novalidate aria-labelledby="rf-h"><h2 id="rf-h">Ask for access</h2>
          <fieldset style="border:0;padding:0;margin:0"><legend style="font-size:12.5px;font-weight:500">Access</legend><div class="seg" style="margin-top:5px"><label><input type="radio" name="lvl" value="Viewer" checked>Viewer</label><label><input type="radio" name="lvl" value="Editor">Editor</label></div></fieldset>
          <div class="field"><label for="rd">For how long</label><select id="rd"><option>7 days</option><option>1 day</option><option>30 days</option></select><span class="hint">Shorter requests are approved faster.</span></div>
          <div class="field"><label for="rw">Why you need it</label><textarea id="rw" rows="3" aria-describedby="rw-h rw-e"></textarea><span class="hint" id="rw-h">Gen. Dodonna sees this.</span><span id="rw-e"></span></div>
          <button type="submit" class="btn pri" style="margin-top:12px">Send request</button></form>`}</div>`,
      mount() { const f = $("#rf"); if (!f) return; f.addEventListener("submit", e => { e.preventDefault(); const w = $("#rw");
        if (!w.value.trim()) { w.setAttribute("aria-invalid", "true"); $("#rw-e").innerHTML = `<span class="err">${icon("no")}Say why you need it</span>`; w.focus(); return; }
        s.myRequests.push({ what: ITEM, level: $("input[name=lvl]:checked").value, days: $("#rd").value, why: w.value.trim(), status: "Waiting" }); save(); rerender(); toast("Request sent to Gen. Dodonna"); }); },
      act: { withdraw() { s.myRequests = s.myRequests.filter(r => r !== req); save(); rerender(); toast("Request withdrawn"); } } };
  });

  /* ================= My access ================= */
  route("/my-access", () => {
    const s = S(), soon = s.grants.filter(g => g.soon && !g.expired);
    return { nav: "myaccess", crumbs: [["My access", "/my-access"]], title: "My access",
      html: `${head("My access", `<a class="btn" href="#/archives">Ask for access</a>`)}
      ${soon.map(g => `<div class="banner" style="margin-top:14px" role="status"><span style="width:18px">${icon("warn")}</span><div class="tx"><b>${esc(g.what)}</b> ends ${esc(g.inLabel)}, ${esc(g.ends)}.</div><button type="button" class="btn sm" data-act="extend" data-id="${g.id}">Ask to extend</button></div>`).join("")}
      <table style="margin-top:16px"><caption class="vh">What you can open</caption><thead><tr><th scope="col">Item</th><th scope="col">Access</th><th scope="col">Given by</th><th scope="col">Ends</th><th scope="col"><span class="vh">Actions</span></th></tr></thead><tbody>
      ${s.grants.filter(g => !g.expired).map(g => `<tr><td>${esc(g.what)}</td><td>${esc(g.level)}</td><td>${esc(g.by)}</td><td>${g.ends ? `${esc(g.ends)}<span class="sub">${esc(g.inLabel)}${g.asked ? " · extension asked" : ""}</span>` : esc(g.endsLabel)}</td>
        <td class="act">${g.extendable ? `<button type="button" class="btn sm ghost" data-act="extend" data-id="${g.id}" ${g.asked ? "disabled" : ""}>${g.asked ? "Asked" : "Extend"}</button>` : ""}</td></tr>`).join("")}</tbody></table>
      ${s.myRequests.length ? `<h2 style="margin-top:24px">Requests</h2><table><caption class="vh">Your requests</caption><thead><tr><th scope="col">Item</th><th scope="col">Asked for</th><th scope="col">Status</th></tr></thead><tbody>${s.myRequests.map(r => `<tr><td>${esc(r.what)}</td><td>${esc(r.level)} · ${esc(r.days)}</td><td><span class="st">${icon("back")}${esc(r.status)}</span></td></tr>`).join("")}</tbody></table>` : ""}`,
      act: { extend(b) { const g = s.grants.find(x => x.id === b.dataset.id);
        dialog({ title: `Extend ${g.what}`, body: `<div class="field" style="margin-top:8px"><label for="xd">Extend by</label><select id="xd"><option>1 day</option><option>7 days</option></select><span class="hint">Your current access ends ${esc(g.ends)}.</span></div><div class="field"><label for="xw">Why</label><input type="text" id="xw" autofocus></div>`,
          foot: `<button type="button" class="btn ghost" data-close>Cancel</button><button type="button" class="btn pri" id="xs">Ask ${esc(g.by)}</button>`,
          onOpen: (d, api) => $("#xs", d).onclick = () => { const w = $("#xw", d); if (!w.value.trim()) { w.setAttribute("aria-invalid", "true"); w.focus(); announce("Say why"); return; } g.asked = true; g.soon = false; save(); api.close(); rerender(); toast(`Asked ${g.by} to extend by ${$("#xd", d).value}`); } }); } } };
  });

  /* ================= Approvals ================= */
  route("/access/approvals", () => {
    const g = guard([["Access", "/access/approvals"], ["Approvals", ""]]); if (g) return g;
    const s = S(), pend = s.requests.filter(r => r.status === "pending"), sel = new Set(s.apSel || []);
    return { nav: "access", crumbs: [["Access", "/access/approvals"], ["Approvals", ""]], title: "Approvals",
      html: `${head("Access")}${at("approvals")}<div class="body">
        <div class="row" style="min-height:46px">${sel.size ? `<div class="banner spacer" style="padding:6px 8px 6px 14px;background:var(--ink)"><div class="tx" style="color:#fff"><b style="color:#fff">${sel.size} selected</b></div><button type="button" class="btn sm" data-act="bulk">Approve ${sel.size}</button><button type="button" class="btn sm" data-act="clear" style="background:transparent;color:#fff;border-color:transparent">Clear</button></div>`
          : `<span class="small muted">${pend.length} waiting · oldest ${pend[0] ? esc(pend[0].waiting) : "—"}</span><span class="spacer"></span><button type="button" class="btn" data-act="lowRisk" ${pend.some(r => r.risk === "Low") ? "" : "disabled"}>Select low risk</button>`}</div>
        <table style="margin-top:8px"><caption class="vh">Requests waiting for you</caption><thead><tr><th scope="col"><span class="vh">Select</span></th><th scope="col">Who</th><th scope="col">Wants</th><th scope="col">Why</th><th scope="col">Waiting</th><th scope="col">Risk</th><th scope="col"><span class="vh">Open</span></th></tr></thead><tbody>
        ${pend.map(r => `<tr><td>${r.risk === "High" ? `<input type="checkbox" disabled aria-label="${esc(r.who)}, ${esc(r.what)}: high risk, review on its own" aria-describedby="hr-note">` : `<input type="checkbox" aria-label="Select ${esc(r.who)}, ${esc(r.what)}" data-change="sel" data-id="${r.id}" ${sel.has(r.id) ? "checked" : ""}>`}</td>
          <td><span class="row" style="flex-wrap:nowrap"><span class="av sm" aria-hidden="true">${r.initials}</span><span>${esc(r.who)}<span class="sub">${esc(r.title)}</span></span></span></td>
          <td>${esc(r.what)}<span class="sub">${esc(r.level)}</span></td><td>${esc(r.why)}</td><td>${esc(r.waiting)}${r.note ? `<span class="sub">${esc(r.note)}</span>` : ""}</td><td>${riskPill(r.risk)}</td>
          <td class="act"><a class="btn sm" href="#/access/approvals/${r.id}" aria-label="Review ${esc(r.who)}'s request">Review</a></td></tr>`).join("") || `<tr><td colspan="7">${empty("You're all caught up", "New requests show up here.")}</td></tr>`}</tbody></table>
        <p class="small muted" id="hr-note" style="margin:10px 0 0">Low-risk requests can be approved together. High-risk requests are approved one at a time, from their row.</p></div>`,
      act: {
        sel(el) { const set = new Set(s.apSel || []); el.checked ? set.add(el.dataset.id) : set.delete(el.dataset.id); s.apSel = [...set]; save(); rerender(); },
        lowRisk() { s.apSel = pend.filter(r => r.risk === "Low").map(r => r.id); save(); rerender(); announce(`${s.apSel.length} low-risk requests selected`); },
        clear() { s.apSel = []; save(); rerender(); },
        bulk() { const ids = [...sel]; ids.forEach(id => s.requests.find(r => r.id === id).status = "approved"); s.apSel = []; save(); rerender();
          toast(`Approved ${ids.length} requests · each person is told`, () => { ids.forEach(id => s.requests.find(r => r.id === id).status = "pending"); save(); rerender(); }); }
      } };
  });
  route("/access/approvals/:id", ({ id }) => {
    const g = guard([["Access", "/access/approvals"], ["Approvals", "/access/approvals"]]); if (g) return g;
    const s = S(), r = s.requests.find(x => x.id === id);
    if (!r) return { nav: "access", crumbs: [["Access", "/access/approvals"]], html: head("Request not found") };
    const [lvl, dur] = r.level.split(" · ");
    return { nav: "access", crumbs: [["Access", "/access/approvals"], ["Approvals", "/access/approvals"], [r.who, ""]], title: `${r.who}'s request`,
      html: `<a class="back" href="#/access/approvals">← Approvals</a>${head(`${r.who} wants ${r.what}`, riskChip(r.risk))}
      <div class="body cols"><div>
        <section class="card" aria-labelledby="as-h"><h2 id="as-h">The request</h2>${kv([["Who", `${esc(r.who)} · ${esc(r.title)}`], ["Asked for", esc(r.level)], ["Why", esc(r.why)], ["Waiting", esc(r.waiting)]])}</section>
        ${r.status !== "pending" ? `<div class="note" role="status">${r.status === "approved" ? okSt("Approved") : badSt("Declined")} · ${esc(r.decided || "")}</div>` :
        `<form class="card" id="df" novalidate aria-labelledby="df-h"><h2 id="df-h">Your decision</h2>
          <fieldset style="border:0;padding:0;margin:0"><legend style="font-size:12.5px;font-weight:500">Give</legend><div class="seg" style="margin-top:5px">${["Viewer", "Editor"].map(v => `<label><input type="radio" name="lv" value="${v}" ${v === lvl ? "checked" : ""}>${v}${v === "Viewer" && lvl === "Editor" ? " · narrower" : ""}</label>`).join("")}</div></fieldset>
          <div class="field"><label for="du">For</label><select id="du">${["1 day", "7 days", "30 days"].map(v => `<option ${v === dur ? "selected" : ""}>${v}</option>`).join("")}</select><span class="hint">You can give less than asked. ${esc(r.who.split(" ")[0])} sees what changed.</span></div>
          <div class="field"><label for="cm">Comment <span class="opt">(required)</span></label><textarea id="cm" rows="2" aria-describedby="cm-e"></textarea><span id="cm-e"></span></div>
          <div class="row" style="margin-top:12px"><button type="submit" class="btn pri">Approve</button><button type="button" class="btn" data-act="decline">Decline</button></div></form>`}</div>
      <aside><section class="card" aria-labelledby="ct-h"><h2 id="ct-h">Context</h2>${kv([["Already has", r.id === "bodhi" ? "Nothing in Base Engineering" : "Viewer on 2 related items"], ["Peers with this", r.risk === "High" ? "1 of 12" : "9 of 12"], ["Owner", "Base Engineering"]])}</section></aside></div>`,
      mount() { const f = $("#df"); if (!f) return; f.addEventListener("submit", e => { e.preventDefault(); decide("approved"); }); },
      act: { decline() { decide("declined"); } } };
    function decide(st) {
      const c = $("#cm"); if (!c.value.trim()) { c.setAttribute("aria-invalid", "true"); $("#cm-e").innerHTML = `<span class="err">${icon("no")}Add a comment. ${esc(r.who.split(" ")[0])} sees it.</span>`; c.focus(); return; }
      const lv = $("input[name=lv]:checked").value, du = $("#du").value;
      r.status = st; r.decided = st === "approved" ? `${lv} · ${du}${`${lv} · ${du}` !== r.level ? ` (asked ${r.level})` : ""} · “${c.value.trim()}”` : `“${c.value.trim()}”`; save(); rerender();
      toast(`${st === "approved" ? "Approved" : "Declined"} · ${r.who} is told · logged`);
    }
  });

  /* ================= Access reviews ================= */
  route("/access/reviews", () => {
    const g = guard([["Access", "/access/approvals"], ["Access reviews", ""]]); if (g) return g;
    const rv = S().review, done = rv.done + rv.items.filter(i => i.decision).length;
    return { nav: "access", crumbs: [["Access", "/access/approvals"], ["Access reviews", ""]], title: "Access reviews",
      html: `${head("Access")}${at("reviews")}<div class="body"><h2 style="margin:0">${esc(rv.name)}</h2>
        <p class="small muted" style="margin:6px 0 0">Due ${esc(rv.due)} · <b style="color:var(--ink)" aria-live="polite">${done} of ${rv.total}</b> decided</p>
        <div class="bar" style="max-width:320px;margin-top:6px" role="progressbar" aria-label="Review progress" aria-valuemin="0" aria-valuemax="${rv.total}" aria-valuenow="${done}"><i style="width:${Math.round(done / rv.total * 100)}%"></i></div>
        <p class="small muted" style="margin:12px 0 0">Tip: with a row focused, press <kbd>K</kbd> to keep or <kbd>R</kbd> to remove.</p>
        <table style="margin-top:8px"><caption class="vh">Access to review</caption><thead><tr><th scope="col">Who</th><th scope="col">Has</th><th scope="col">Last used</th><th scope="col">Suggested</th><th scope="col">Decision</th></tr></thead><tbody>
        ${rv.items.map(i => `<tr tabindex="0" data-row="${i.id}" aria-label="${esc(i.who)}, ${esc(i.what)}"><td><span class="row" style="flex-wrap:nowrap"><span class="av sm" aria-hidden="true">${i.initials}</span><span>${esc(i.who)}<span class="sub">${esc(i.team)}</span></span></span></td>
          <td>${esc(i.what)}<span class="sub">${esc(i.level)}</span></td><td>${esc(i.last)}<span class="sub">${esc(i.why)}</span></td><td>${i.suggest === "remove" ? "Remove" : "Keep"}</td>
          <td class="act">${i.decision ? `${i.decision === "keep" ? okSt("Kept") : badSt("Removed")} <button type="button" class="link" data-act="undo" data-id="${i.id}">Undo</button>` :
            `<span class="row" style="gap:6px;flex-wrap:nowrap"><button type="button" class="btn sm" data-act="keep" data-id="${i.id}">Keep</button><button type="button" class="btn sm" data-act="remove" data-id="${i.id}">Remove</button></span>`}</td></tr>`).join("")}</tbody></table></div>`,
      mount() { $$("tr[data-row]").forEach(tr => tr.addEventListener("keydown", e => { if (e.target !== tr || e.metaKey || e.ctrlKey || e.altKey) return; const k = e.key.toLowerCase(); if (k === "k" || k === "r") { e.preventDefault(); decide(tr.dataset.row, k === "k" ? "keep" : "remove", true); } })); },
      act: { keep(b) { decide(b.dataset.id, "keep"); }, remove(b) { decide(b.dataset.id, "remove"); }, undo(b) { const i = rv.items.find(x => x.id === b.dataset.id); i.decision = null; save(); rerender(); announce(`${i.who}: undecided`); } } };
    function decide(id, d, fromKey) {
      const i = rv.items.find(x => x.id === id); i.decision = d; save(); rerender(); announce(`${i.who}: ${d === "keep" ? "kept" : "removed"}`);
      if (fromKey) { const next = $$("tr[data-row]").find(t => !rv.items.find(x => x.id === t.dataset.row).decision) || $(`tr[data-row="${id}"]`); next && next.focus(); }
    }
  });
})();
