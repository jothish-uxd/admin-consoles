/* Home, People (users, groups, roles, invites, offboarding, transfer), Billing, Settings, Insights. */
(() => {
  const { route, esc, $, $$, money, num, icon, okSt, badSt, toast, announce, dialog, head, tabs, kv, empty, go, rerender, save } = App;
  const S = () => App.S;
  const adminOnly = (crumbs, nav) => ({ nav, crumbs, title: "Admins only",
    html: `${head("This page is for admins")}<p class="lede">You're viewing as a member. Switch to the admin view from your name at the top right.</p>` });
  const isAdmin = () => S().role === "admin";

  /* ================= Home ================= */
  route("/home", () => {
    const s = S(), alertOn = s.role === "admin" && !s.homeAlertDismissed;
    const pending = s.requests.filter(r => r.status === "pending").length;
    return { nav: "home", crumbs: [["Home", "/home"]], title: "Home",
      html: `${head("Good morning, Lavanya")}
      <div class="hgrid" style="margin-top:16px;display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px">
        ${alertOn ? `<section class="card strong" style="grid-column:1/-1" aria-labelledby="ua"><div class="row"><span style="width:18px">${icon("warn")}</span>
          <div class="spacer"><h2 id="ua" style="margin:0 0 2px">Unusual activity</h2><span class="muted"><b style="font-weight:500;color:var(--ink)">archive-sync</b>, an API key, failed 3 times to reach <b style="font-weight:500;color:var(--ink)">Death Star plans · archive</b> in the last hour.</span></div>
          <a class="btn pri" href="#/compliance/audit">Open audit log</a><button type="button" class="btn ghost" data-act="dismiss">Dismiss</button></div></section>` : ""}
        ${s.role === "admin" ? `
        <section class="card" aria-labelledby="h-req"><h2 id="h-req">Access requests</h2><span class="stat">${pending}</span> <span class="muted">waiting for you</span><div style="margin-top:8px"><a class="link" href="#/access/approvals">Review requests</a></div></section>
        <section class="card" aria-labelledby="h-seats"><h2 id="h-seats">Seats</h2><span class="stat">${s.plan.assigned}</span> <span class="muted">of ${s.plan.seats} in use</span><div style="margin-top:8px"><a class="link" href="#/billing/seats">Manage seats</a></div></section>
        <section class="card" aria-labelledby="h-ren"><h2 id="h-ren">Renewal</h2><span class="muted">Business plan renews ${esc(s.plan.renews)}</span><div style="margin-top:8px"><a class="link" href="#/billing/plan">See the plan</a></div></section>` : `
        <section class="card" aria-labelledby="h-acc"><h2 id="h-acc">Your access</h2><span class="muted">One of your accesses ends today at 18:00.</span><div style="margin-top:8px"><a class="link" href="#/my-access">Open My access</a></div></section>
        <section class="card" aria-labelledby="h-arc"><h2 id="h-arc">Archives</h2><span class="muted">Briefings, plans and records you can open.</span><div style="margin-top:8px"><a class="link" href="#/archives">Browse archives</a></div></section>`}
      </div>
      <section style="margin-top:28px" aria-labelledby="h-tour"><h2 id="h-tour">About this prototype</h2>
        <p class="muted" style="max-width:720px">A working version of the console in the pattern clips, from <i>Patterns for Enterprise Admin Consoles</i>. Everything is sample data. Changes stay in this browser, and <b style="font-weight:500;color:var(--ink)">Reset demo data</b> at the bottom of the menu puts it back. Switch between the admin and member views from your name at the top right.</p></section>`,
      act: { dismiss() { S().homeAlertDismissed = true; save(); rerender(); announce("Alert dismissed"); } } };
  });

  /* ================= People ================= */
  const peopleTabs = at => tabs("People", [["users", "Users", "/people/users"], ["groups", "Groups", "/people/groups"], ["roles", "Roles", "/people/roles"]], at);
  const pc = (t, h) => [["People", "/people/users"], [t, h]];

  route("/people/users", () => {
    if (!isAdmin()) return adminOnly(pc("Users", "/people/users"), "people");
    const s = S();
    return { nav: "people", crumbs: pc("Users", "/people/users"), title: "Users",
      html: `${head("People", `<a class="btn pri" href="#/people/users/invite">Invite people</a>`)}${peopleTabs("users")}
      <div class="body"><table><caption class="vh">People in Echo Base</caption><thead><tr><th scope="col">Person</th><th scope="col">Team</th><th scope="col">License</th><th scope="col">Last active</th><th scope="col">Status</th></tr></thead><tbody>
      ${s.people.map(p => `<tr><td><a href="#/people/users/${p.id}" style="text-decoration:none"><span class="row" style="gap:10px"><span class="av sm">${p.initials}</span><span><span style="text-decoration:underline;text-decoration-color:var(--rule-strong);text-underline-offset:3px">${esc(p.name)}</span><span class="sub">${esc(p.title)}</span></span></span></a></td>
        <td>${esc(p.team)}</td><td>${esc(p.license)}</td><td>${esc(p.last)}</td><td>${p.status === "deactivated" ? '<span class="chip">Deactivated</span>' : p.reclaim ? `<span class="chip">Until ${esc(p.reclaim)}</span>` : '<span class="muted">Active</span>'}</td></tr>`).join("")}
      ${s.invited ? `<tr class="hl"><td>Rogue One pilot<span class="sub">${s.invite.count} invitations · ${s.accepted || 0} accepted</span></td><td>Rogue One pilot</td><td>Console</td><td>—</td><td><span class="chip">Invited</span></td></tr>` : ""}
      </tbody></table><p class="small muted" style="margin-top:10px">Showing ${s.people.length} of ${s.plan.assigned} people with licenses.</p></div>` };
  });

  /* ----- Invite → job → success panel (Success & next steps) ----- */
  route("/people/users/invite", p => {
    if (!isAdmin()) return adminOnly(pc("Invite", "/people/users/invite"), "people");
    const s = S(), inv = s.invite, state = s.inviteState || "review";
    const avail = s.plan.seats - s.plan.assigned;
    let panel;
    if (state === "review") panel = `<section class="card" aria-labelledby="inv-h"><h2 id="inv-h" style="font-size:17px">Invite to Rogue One pilot</h2>
        ${kv([["People", `${inv.count} from ${esc(inv.file)}`], ["Group", esc(inv.group)], ["License", `Console · ${avail >= inv.count ? `${inv.count} of ${avail} available seats` : `<span class="err" style="margin:0">${icon("no")}Only ${avail} seats available. <a class="link" href="#/billing/seats">Add seats</a></span>`}`], ["Starts", "1 December 2026"], ["Message", "Welcome to the Rogue One pilot, starting 1 December.", 1]])}
        <div class="row end" style="margin-top:16px"><a class="btn ghost" href="#/people/users">Back</a><button type="button" class="btn pri" data-act="send" ${avail < inv.count ? 'aria-disabled="true"' : ""}>Send ${inv.count} invites</button></div></section>`;
    else if (state === "sending") panel = `<section class="card" aria-labelledby="inv-h" aria-busy="true"><h2 id="inv-h" style="font-size:17px">Sending invitations…</h2><div id="cnt" class="muted">0 of ${inv.count} sent</div>
        <div class="bar" style="margin-top:12px" role="progressbar" aria-label="Invitations sent" aria-valuemin="0" aria-valuemax="${inv.count}" aria-valuenow="0" id="pbar"><i id="pfill" style="width:0"></i></div>
        <p class="small muted">You can leave this page. We'll tell you when it's done.</p></section>`;
    else panel = `<section class="card" aria-labelledby="inv-h"><h2 id="inv-h" style="font-size:17px" class="row">${icon("ok")} ${inv.count} invitations sent</h2>
        <p class="muted" style="margin:2px 0 0">Added to <b style="font-weight:500;color:var(--ink)">Rogue One pilot</b> · ${inv.count} Console seats assigned · ${esc(s.today)}</p>
        ${s.domainVerified ? `<div class="note" style="margin-top:14px">${icon("ok")} Domain <b>${esc(inv.domain)}</b> verified. Everyone can sign in.</div>` :
        `<div class="banner" style="margin-top:14px"><div class="tx"><b>Needed before they can sign in:</b> ${inv.outside} people use an outside domain, ${esc(inv.domain)}. Verify it first.</div><button type="button" class="btn pri sm" data-act="verify">Verify domain</button></div>`}
        <h3 style="margin-top:16px">Next steps</h3>
        <ul style="list-style:none;padding:0;margin:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px">
          <li class="card" style="margin:0"><b>Assign a role</b><div class="small muted">Content admin · Rogue One, made for this pilot</div><a class="link small" href="#/people/roles">Open roles</a></li>
          <li class="card" style="margin:0"><b>Share the onboarding guide</b><div class="small muted">Send the pilot handbook to the group</div><button type="button" class="link small" data-act="guide">Share it</button></li>
          <li class="card" style="margin:0"><b>Track who has accepted</b><div class="small muted">${s.accepted || 0} of ${inv.count} so far</div><a class="link small" href="#/people/users">See users</a></li>
        </ul>
        <div class="row" style="margin-top:14px"><span class="small muted">Setup ${s.domainVerified ? 3 : 2} of 4 done</span><a class="link small" href="#/people/groups">Open Rogue One pilot</a>
          <button type="button" class="link small" data-act="api" aria-expanded="${!!p.api}" aria-controls="apiBox">${p.api ? "Hide" : "View"} API call</button><span class="spacer"></span><a class="btn" href="#/people/users" data-act="done">Done</a></div>
        <div id="apiBox" ${p.api ? "" : "hidden"} style="margin-top:12px"><pre class="json">POST /v2/invitations
{ "group": "rogue-one-pilot", "license": "console",
  "emails": [ "jyn.erso@rogueone.alliance", "… ${inv.count - 1} more" ] }</pre></div></section>`;
    return { nav: "people", crumbs: [["People", "/people/users"], ["Users", "/people/users"], ["Invite", "/people/users/invite"]], title: "Invite people",
      html: `${head("People", `<a class="btn pri" href="#/people/users/invite">Invite people</a>`)}${peopleTabs("users")}<div class="body" style="max-width:820px">${panel}</div>`,
      mount() {
        if (S().inviteState !== "sending") return;
        let n = 0; const tick = setInterval(() => {
          n = Math.min(inv.count, n + 3);
          const c = $("#cnt"), b = $("#pbar"), f = $("#pfill");
          if (!c) { clearInterval(tick); return; }
          c.textContent = `${n} of ${inv.count} sent`; b.setAttribute("aria-valuenow", n); f.style.width = (n / inv.count * 100) + "%";
          if (n >= inv.count) { clearInterval(tick); const s = S(); s.inviteState = "done"; s.invited = true; s.plan.assigned += inv.count; s.accepted = 0; save(); rerender(); $("#inv-h") && $("#inv-h").focus(); announce(`${inv.count} invitations sent. Added to Rogue One pilot.`); }
        }, 90);
      },
      act: {
        send(b) { if (b.getAttribute("aria-disabled") === "true") { announce("Not enough seats. Add seats first."); return; } S().inviteState = "sending"; save(); rerender(); announce("Sending invitations"); },
        verify() { S().domainVerified = true; save(); rerender(); toast(`${S().invite.domain} verified`); },
        guide() { toast("Onboarding guide shared with Rogue One pilot"); },
        api() { const q = App.parse(); go("/people/users/invite" + (q.q.api ? "" : "?api=1")); },
        done() { go("/people/users"); }
      } };
  });

  /* ----- A person, offboarding, transfer ownership ----- */
  route("/people/users/:id", ({ id }) => {
    if (!isAdmin()) return adminOnly(pc("User", "/people/users"), "people");
    const s = S(), p = s.people.find(x => x.id === id);
    if (!p) return { nav: "people", crumbs: pc("Users", "/people/users"), html: head("Person not found") };
    const ob = p.offboarding;
    const steps = ob ? [
      ["Account deactivated", "14 Oct · by Lavanya Sienna", ob.deactivated],
      ["Signed out of all devices", "14 Oct", ob.signedOut],
      ["Transfer his content", ob.transferred ? `Moved to Gen. Jan Dodonna · ${esc(ob.transferredAt || "just now")}` : "1,284 items · 3.2 GB still owned by Biggs", ob.transferred, ob.transferred ? "" : `<a class="btn sm pri" href="#/people/users/${p.id}/transfer">Transfer content</a>`],
      ["Remove from 3 groups", "Red Squadron, Rogue One, Pilots", ob.groupsRemoved, ob.groupsRemoved ? "" : `<button type="button" class="btn sm" data-act="groups">Review</button>`],
      ["Delete account", ob.transferred ? "Ready. His content has been transferred." : "Available after his content is transferred", false, `<button type="button" class="btn sm danger" ${ob.transferred ? "" : 'disabled aria-describedby="del-why"'} data-act="del">Delete account</button>${ob.transferred ? "" : '<span id="del-why" class="vh">Available after his content is transferred</span>'}`]
    ] : null;
    const done = steps ? steps.filter(x => x[2]).length : 0;
    return { nav: "people", crumbs: [["People", "/people/users"], ["Users", "/people/users"], [p.name, ""]], title: p.name,
      html: `<a class="back" href="#/people/users">← Users</a>${head(p.name, p.status === "deactivated" ? `<span class="chip">Deactivated 14 Oct</span>` : "")}
      <p class="lede">${esc(p.title)} · ${esc(p.team)}${p.manager ? ` · Manager: ${esc(p.manager)}` : ""}</p>
      <div class="cols" style="margin-top:18px"><div>
      ${steps ? `<section class="card" aria-labelledby="ob-h"><h2 id="ob-h">Offboarding <span class="n">${done} of ${steps.length} done</span></h2>
        <ol style="list-style:none;margin:0;padding:0">${steps.map(([t, d, ok, a]) => `<li class="row" style="padding:10px 0;border-top:1px solid var(--rule)"><span style="width:18px">${ok ? icon("ok") : '<span class="dot" style="background:var(--rule-strong)"></span>'}</span><span class="spacer"><b style="font-weight:500">${t}</b><span class="sub small muted" style="display:block">${d}</span></span>${a || ""}<span class="vh">${ok ? "Done" : "Not done"}</span></li>`).join("")}</ol></section>` :
      `<section class="card"><h2>Details</h2>${kv([["Team", esc(p.team)], ["License", esc(p.license)], ["Assigned by", esc(p.by)], ["Last active", esc(p.last)]])}</section>`}
      </div><aside class="card" aria-labelledby="pd-h"><h2 id="pd-h">Details</h2>${kv([["Team", esc(p.team)], ["License", esc(p.license)], ["Assigned by", esc(p.by)], ["Last active", esc(p.last)]])}</aside></div>`,
      act: {
        groups() { p.offboarding.groupsRemoved = true; save(); rerender(); toast("Removed Biggs from 3 groups"); },
        del(b) { if (b.disabled) return; dialog({ title: "Delete Biggs Darklighter's account?", body: `<p class="muted">His content now belongs to Gen. Jan Dodonna, so nothing is lost. The account can't be restored after 30 days.</p>`,
          foot: `<button type="button" class="btn ghost" data-close>Cancel</button><button type="button" class="btn pri" id="dd">Delete account</button>`,
          onOpen: (d, api) => $("#dd", d).onclick = () => { const s = S(); s.people = s.people.filter(x => x.id !== "biggs"); save(); api.close(); go("/people/users"); toast("Biggs Darklighter's account deleted · logged"); } }); }
      } };
  });

  route("/people/users/:id/transfer", ({ id }) => {
    if (!isAdmin()) return adminOnly(pc("Transfer", "/people/users"), "people");
    const s = S(), p = s.people.find(x => x.id === id) || s.people[0], ts = s.transferState || "form";
    const owners = [["dodonna", "Gen. Jan Dodonna", "Biggs's manager · suggested", false], ["wedge", "Wedge Antilles", "Red Squadron", false], ["biggs", "Biggs Darklighter", "Deactivated, can't receive", true], ["r2", "R2-D2", "External, can't own Echo Base content", true]];
    let body;
    if (ts === "form") body = `<div class="cols"><form id="tf" onsubmit="return false"><fieldset class="card" style="margin:0"><legend class="vh">What moves</legend><h2>What moves</h2>
        <label class="choice"><input type="radio" name="what" value="all" checked><span><b>Everything Biggs owns</b><span class="d">1,284 items · 3.2 GB</span></span></label>
        <label class="choice"><input type="radio" name="what" value="some"><span><b>Choose specific items</b><span class="d">Pick folders or files</span></span></label></fieldset>
        <div class="card"><label for="owner">New owner</label><select id="owner" aria-describedby="owner-h">${owners.map(([v, n, d, dis]) => `<option value="${v}" ${dis ? "disabled" : ""}>${n} · ${d}</option>`).join("")}</select>
          <span class="hint" id="owner-h">Only active people in Echo Base can own content.</span></div>
        <fieldset class="card"><legend class="vh">How it moves</legend><h2>How it moves</h2>
          <div class="note">${icon("ok")} <b>Sharing stays as it is.</b> 46 shared links and 12 groups keep working.</div>
          <label class="check"><input type="checkbox" checked id="fold"><span><b>Put items in a folder named "From Biggs Darklighter"</b></span></label>
          <label class="check"><input type="checkbox" checked><span><b>Tell the new owner what they received</b></span></label>
          <p class="small muted" style="margin-top:10px">Moving many people? <button type="button" class="link" data-act="map">Upload a mapping file</button></p></fieldset></form>
        <aside class="card" aria-labelledby="sum-h"><h2 id="sum-h">Summary</h2>${kv([["Moves", "1,284 items · 3.2 GB"], ["From", "Biggs Darklighter"], ["To", '<span id="toName">Gen. Jan Dodonna</span>'], ["Into", "From Biggs Darklighter"], ["Sharing", "Unchanged", 1]])}
          <button type="button" class="btn pri" style="margin-top:14px;width:100%" data-act="start">Start transfer</button></aside></div>`;
    else if (ts === "running") body = `<section class="card" aria-busy="true" style="max-width:720px"><h2>Transferring…</h2><p class="muted" id="tcnt">0 of 1,284</p><div class="bar" role="progressbar" aria-label="Items moved" aria-valuemin="0" aria-valuemax="1284" aria-valuenow="0" id="tbar"><i id="tfill" style="width:0"></i></div><p class="small muted">Runs in the background · you can leave this page.</p></section>`;
    else body = `<section class="card" style="max-width:720px"><h2 class="row" id="tdone">${icon("ok")} Transfer finished</h2>${kv([["Moved", "1,281 items into From Biggs Darklighter"], ["Couldn't move", '3 · <button type="button" class="link" data-act="three">See the 3 and why</button>'], ["New owner", "Gen. Jan Dodonna has been sent a summary", 1]])}
        <div class="row" style="margin-top:14px"><a class="btn pri" href="#/people/users/${p.id}">Back to offboarding</a><button type="button" class="btn" data-act="three">Reassign the 3</button></div></section>`;
    return { nav: "people", crumbs: [["People", "/people/users"], ["Users", "/people/users"], [p.name, "/people/users/" + p.id], ["Transfer content", ""]], title: "Transfer content",
      html: `<a class="back" href="#/people/users/${p.id}">← ${esc(p.name)}</a>${head("Transfer Biggs Darklighter's content")}<p class="lede">Biggs left Red Squadron on 14 Oct. His account stays until the transfer finishes.</p><div class="body">${body}</div>`,
      mount() {
        const o = $("#owner"); o && o.addEventListener("change", () => { $("#toName").textContent = o.options[o.selectedIndex].text.split(" · ")[0]; });
        if (ts !== "running") return;
        let n = 0; const tick = setInterval(() => { n = Math.min(1284, n + 61); const c = $("#tcnt"); if (!c) { clearInterval(tick); return; }
          c.textContent = `${num(n)} of 1,284`; $("#tbar").setAttribute("aria-valuenow", n); $("#tfill").style.width = (n / 1284 * 100) + "%";
          if (n >= 1284) { clearInterval(tick); const s = S(); s.transferState = "done"; p.offboarding.transferred = true; p.offboarding.transferredAt = "just now"; save(); rerender(); $("#tdone") && ($("#tdone").tabIndex = -1, $("#tdone").focus()); announce("Transfer finished. 1,281 moved, 3 couldn't move."); } }, 80);
      },
      act: {
        start() { S().transferState = "running"; save(); rerender(); announce("Transfer started"); },
        map() { toast("Mapping file upload isn't part of this prototype yet"); },
        three() { dialog({ title: "3 items couldn't move", body: `<table><thead><tr><th>Item</th><th>Why</th></tr></thead><tbody><tr><td>Trench run notes.md</td><td>On legal hold · Scarif inquiry</td></tr><tr><td>Old flight sim.exe</td><td>File type not allowed</td></tr><tr><td>Rogue roster.xlsx</td><td>Owned jointly with Wedge Antilles</td></tr></tbody></table>`,
          foot: `<button type="button" class="btn pri" data-close>Close</button>` }); }
      } };
  });

  /* ----- Groups: Create modal ----- */
  route("/people/groups", p => {
    if (!isAdmin()) return adminOnly(pc("Groups", "/people/groups"), "people");
    const s = S(), arch = p.show === "archived", nArch = s.groups.filter(g => g.archived).length;
    const rows = s.groups.filter(g => arch ? g.archived : !g.archived);
    const filter = nArch ? `<div class="row" style="margin-top:12px" role="group" aria-label="Show"><a class="chip ${arch ? "" : "dk"}" href="#/people/groups" ${arch ? "" : 'aria-current="true"'}>Active</a><a class="chip ${arch ? "dk" : ""}" href="#/people/groups?show=archived" ${arch ? 'aria-current="true"' : ""}>Archived <span class="mono">${nArch}</span></a></div>` : "";
    return { nav: "people", crumbs: pc("Groups", "/people/groups"), title: "Groups",
      html: `${head("People", `<button type="button" class="btn pri" data-act="newGroup" id="newGroup">New group</button>`)}${peopleTabs("groups")}
      <div class="body">${filter}<table><caption class="vh">${arch ? "Archived groups" : "Groups"}</caption><thead><tr><th scope="col">Group</th><th scope="col">Members</th>${arch ? '<th scope="col">Status</th><th scope="col">Archived</th>' : '<th scope="col">Owner</th><th scope="col">Licenses</th>'}<th scope="col"><span class="vh">Actions</span></th></tr></thead><tbody>
      ${rows.map(g => `<tr${g.fresh ? ' class="hl"' : ""}><td>${esc(g.name)}${g.fresh ? ' <span class="chip">New</span>' : ""}<span class="sub">${esc(g.desc || "")}</span></td><td>${g.members}</td>
        ${arch ? `<td><span class="lab">Archived</span></td><td>${esc(g.archived)}</td><td class="act"><button type="button" class="btn sm" data-act="restore" data-id="${g.id}">Restore</button></td>` :
        `<td>${esc(g.owner)}</td><td>${esc(g.license)}</td><td class="act"><div class="has-menu"><button type="button" class="icon-btn" aria-label="More actions for ${esc(g.name)}" aria-haspopup="menu" aria-expanded="false" data-act="menu" data-menu="gm-${g.id}">···</button>
          <div class="menu" role="menu" id="gm-${g.id}" hidden><button role="menuitem" data-act="archive" data-id="${g.id}">Archive group</button><div class="sep"></div><button role="menuitem" class="danger" data-act="delGroup" data-id="${g.id}">Delete group…</button></div></div></td>`}</tr>`).join("") || `<tr><td colspan="5">${empty(arch ? "Nothing archived" : "No groups", "")}</td></tr>`}
      </tbody></table></div>`,
      act: {
        newGroup() { openNewGroup(); },
        archive(b) {
          App.closeMenus(); const g = S().groups.find(x => x.id === b.dataset.id);
          dialog({ title: `Archive ${g.name}?`, label: "Archive group",
            body: `<div class="impact"><b>Archive keeps everything.</b> The group is hidden from lists and its ${g.members} members lose the access it gives. Members, shared files and history are kept, so you can restore it any time.</div>
              <p style="margin:10px 0 0">Deleting removes the group and its history for good. <button type="button" class="link" style="color:#b91c1c" id="delInstead">Delete permanently instead</button></p>`,
            foot: `<button type="button" class="btn" data-close>Cancel</button><button type="button" class="btn pri" id="arcGo" autofocus>Archive group</button>`,
            onOpen(d, api) {
              $("#arcGo", d).onclick = () => { g.archived = "Today · Lavanya Sienna"; g.fresh = false; save(); api.close(); rerender(); toast(`${g.name} archived · find it under Archived`); };
              $("#delInstead", d).onclick = () => { api.close(); openDeleteGroup(g); };
            } });
        },
        delGroup(b) { App.closeMenus(); openDeleteGroup(S().groups.find(x => x.id === b.dataset.id)); },
        restore(b) { const g = S().groups.find(x => x.id === b.dataset.id); delete g.archived; g.fresh = true; save(); go("/people/groups"); rerender(); toast(`${g.name} restored · ${g.members} members have their access back`); }
      } };
  });
  function openDeleteGroup(g) {
    dialog({ title: `Delete ${g.name} for good?`, label: "Delete group",
      body: `<div class="impact"><b>${g.members} members lose the access this group gives</b>, and its history is deleted. This can’t be undone.</div><p style="margin:10px 0 0">Archiving keeps everything and can be restored.</p>`,
      foot: `<button type="button" class="btn" data-close autofocus>Cancel</button><button type="button" class="btn dgr" id="dgGo">Delete group</button>`,
      onOpen(d, api) { $("#dgGo", d).onclick = () => { const s = S(); s.groups = s.groups.filter(x => x !== g); save(); api.close(); rerender(); toast(`${g.name} deleted · logged`); }; } });
  }
  function openNewGroup(prefill) {
    const names = () => S().groups.map(g => g.name.trim().toLowerCase());
    dialog({ title: "New group", body: `<form id="ng" novalidate onsubmit="return false">
        <div class="field" style="margin-top:8px"><label for="gn">Name</label><input type="text" id="gn" autocomplete="off" aria-describedby="gn-msg" value="${esc(prefill || "")}" autofocus><div id="gn-msg" aria-live="polite"></div></div>
        <div class="field"><label for="gd">Description <span class="opt">· optional</span></label><input type="text" id="gd" value=""></div>
        <div class="field"><label for="go">Owner</label><select id="go"><option>Lavanya Sienna</option><option>Toryn Farr</option><option>Wedge Antilles</option></select></div></form>`,
      foot: `<label class="check spacer" style="margin:0"><input type="checkbox" id="another"><span>Create another</span></label><button type="button" class="btn ghost" data-close>Cancel</button><button type="button" class="btn pri" id="cg">Create group</button>`,
      onOpen(d, api) {
        const n = $("#gn", d), msg = $("#gn-msg", d), btn = $("#cg", d);
        const check = () => {
          const v = n.value.trim();
          if (!v) { n.removeAttribute("aria-invalid"); msg.innerHTML = ""; return false; }
          if (names().includes(v.toLowerCase())) { n.setAttribute("aria-invalid", "true"); msg.innerHTML = `<div class="err">${icon("no")}A group named ${esc(v)} already exists. Try another name.</div>`; return false; }
          n.removeAttribute("aria-invalid"); msg.innerHTML = `<div class="ok-msg">${icon("ok")}Name is available</div>`; return true;
        };
        n.addEventListener("input", check);
        const submit = () => {
          if (!n.value.trim()) { n.setAttribute("aria-invalid", "true"); msg.innerHTML = `<div class="err">${icon("no")}Enter a name for the group.</div>`; n.focus(); return; }
          if (!check()) { n.focus(); return; }
          btn.disabled = true; btn.textContent = "Creating…";
          setTimeout(() => {
            const s = S(); s.groups.forEach(g => g.fresh = false);
            s.groups.unshift({ id: "g" + Date.now(), name: n.value.trim(), desc: $("#gd", d).value, members: 0, owner: $("#go", d).value, license: "Console", fresh: true });
            save(); const again = $("#another", d).checked, name = n.value.trim(); api.close(); go("/people/groups"); rerender();
            toast(`${name} created`);
            if (again) setTimeout(() => openNewGroup(), 50);
          }, 700);
        };
        btn.onclick = submit; n.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); submit(); } });
      } });
  }

  /* ----- Roles: Duplicate / clone ----- */
  route("/people/roles", () => {
    if (!isAdmin()) return adminOnly(pc("Roles", "/people/roles"), "people");
    const s = S();
    return { nav: "people", crumbs: pc("Roles", "/people/roles"), title: "Roles",
      html: `${head("People", `<button type="button" class="btn pri" data-act="newRole">New role</button>`)}${peopleTabs("roles")}
      <div class="body"><table><caption class="vh">Roles</caption><thead><tr><th scope="col">Role</th><th scope="col">Members</th><th scope="col">Permissions</th><th scope="col">Scope</th><th scope="col"><span class="vh">Actions</span></th></tr></thead><tbody>
      ${s.roles.map(r => `<tr><td><a href="#/people/roles/${r.id}">${esc(r.name)}</a>${r.copiedFrom ? ` <span class="chip">Copy of ${esc(r.copiedFrom)}</span>` : ""}<span class="sub">${esc(r.desc)}</span></td><td>${r.members}</td><td>${r.perms}</td><td>${esc(r.scope)}</td>
        <td class="act"><div class="has-menu"><button type="button" class="icon-btn" aria-label="More actions for ${esc(r.name)}" aria-haspopup="menu" aria-expanded="false" data-act="menu" data-menu="m-${r.id}">···</button>
          <div class="menu" role="menu" id="m-${r.id}" hidden><a role="menuitem" href="#/people/roles/${r.id}">Edit</a><button role="menuitem" data-act="dup" data-id="${r.id}">Duplicate</button><div class="sep"></div><button role="menuitem" class="danger" data-act="delRole" data-id="${r.id}">Delete</button></div></div></td></tr>`).join("")}
      </tbody></table></div>`,
      act: {
        newRole() { toast("New role isn't part of this prototype yet. Try Duplicate."); },
        delRole(b) { App.closeMenus(); openDeleteRole(S().roles.find(x => x.id === b.dataset.id)); },
        dup(b) {
          App.closeMenus(); const r = S().roles.find(x => x.id === b.dataset.id);
          dialog({ title: `Duplicate ${r.name}`, body: `<div class="field" style="margin-top:8px"><label for="rn">Name of the copy</label><input type="text" id="rn" value="Copy of ${esc(r.name)}" autofocus></div>
            <fieldset style="border:0;padding:0;margin:14px 0 0"><legend style="font-size:12.5px;font-weight:500">What to copy</legend>
            <label class="check"><input type="checkbox" checked id="cp1"><span><b>Permissions · ${r.perms}</b><span class="d">What people with this role can do.</span></span></label>
            <label class="check"><input type="checkbox" checked id="cp2"><span><b>Scope · ${esc(r.scope)}</b><span class="d">Where the permissions apply.</span></span></label>
            <label class="check"><input type="checkbox" id="cp3"><span><b>Members · ${r.members}</b><span class="d">Off by default, because copying members gives them this role too.</span></span></label></fieldset>
            <div class="note" style="margin-top:12px"><b>Never copied:</b> API keys, tokens and audit history.</div>`,
            foot: `<button type="button" class="link spacer" data-act="several" style="text-align:left">Duplicate to several teams</button><button type="button" class="btn ghost" data-close>Cancel</button><button type="button" class="btn pri" id="dr">Duplicate role</button>`,
            onOpen(d, api) {
              const n = $("#rn", d); n.select();
              $("#dr", d).onclick = () => {
                const name = n.value.trim() || "Copy of " + r.name, s = S();
                const nr = { id: "r" + Date.now(), name, desc: r.desc, members: $("#cp3", d).checked ? r.members : 0, perms: $("#cp1", d).checked ? r.perms : 0, scope: $("#cp2", d).checked ? r.scope : "Not set", copiedFrom: r.name };
                s.roles.push(nr); save(); api.close(); go("/people/roles/" + nr.id); toast("Role duplicated · logged");
              };
            } });
        },
        several() { toast("Duplicating to several teams runs as a job. Not part of this prototype yet."); }
      } };
  });
  /* Cascading impact: what depends on a role, grouped by what happens; Delete stays off while something would break */
  function openDeleteRole(r) {
    const s = S(), dep = (s.roleDeps || {})[r.id] || {}, others = s.roles.filter(x => x !== r);
    let moveTo = null, switched = !dep.integration;
    const ok = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    dialog({ title: `Delete ${r.name}?`, label: "Delete role", wide: true,
      body: `<p style="margin:0">Here’s what depends on this role.</p>
        ${r.members ? `<div class="dep"><span class="tg">Detached</span><div><b>${r.members} people lose this role</b>They keep their other roles.</div><div id="dm"><label class="vh" for="mvTo">Give them</label><select id="mvTo" style="width:auto"><option value="">Leave them without it</option>${others.map(o => `<option value="${o.id}">Give them ${esc(o.name)}</option>`).join("")}</select></div></div>` : ""}
        ${dep.sets ? `<div class="dep"><span class="tg">Deleted</span><div><b>${dep.sets.length} saved permission sets</b>${dep.sets.join(" and ")} are built on it and go with it.</div><div></div></div>` : ""}
        ${dep.integration ? `<div class="dep"><span class="tg br" id="tgI">Breaks</span><div><b>${esc(dep.integration)} integration</b>It signs in with this role. <a href="#/settings/integrations">Open ${esc(dep.integration)} ↗</a></div><div id="dsw"><button type="button" class="btn sm" id="swGo">Switch to Viewer</button></div></div>` : ""}
        ${!r.members && !dep.sets && !dep.integration ? '<div class="impact">Nothing depends on this role.</div>' : ""}`,
      foot: `<span class="spacer small" id="why" aria-live="polite"></span><button type="button" class="btn" data-close>Cancel</button><button type="button" class="btn dgr" id="drGo">Delete role</button>`,
      onOpen(d, api) {
        const go_ = $("#drGo", d), why = $("#why", d);
        const sync = () => {
          go_.setAttribute("aria-disabled", switched ? "false" : "true");
          go_.setAttribute("aria-describedby", "why");
          why.innerHTML = switched ? "Nothing breaks now." : `<b style="color:var(--ink)">${esc(dep.integration)} uses this role.</b> Switch it first.`;
        };
        const mv = $("#mvTo", d); if (mv) mv.onchange = () => { moveTo = mv.value || null; };
        const sw = $("#swGo", d);
        if (sw) sw.onclick = () => { switched = true; $("#dsw", d).innerHTML = `<span class="done">${ok}Switched to Viewer</span>`; const tg = $("#tgI", d); tg.textContent = "Fixed"; tg.className = "tg"; sync(); announce(`${dep.integration} switched to Viewer. Nothing breaks now.`); $("#drGo", d).focus(); };
        go_.onclick = () => {
          if (!switched) { why.focus && announce(why.textContent); return; }
          const st = S(), to = moveTo && st.roles.find(x => x.id === moveTo);
          if (to) to.members += r.members;
          st.roles = st.roles.filter(x => x !== r); if (st.roleDeps) delete st.roleDeps[r.id];
          save(); api.close(); rerender();
          toast(`${r.name} deleted${to ? ` · ${r.members} people now have ${to.name}` : ""} · logged`);
        };
        sync();
      } });
  }
  route("/people/roles/:id", ({ id }) => {
    if (!isAdmin()) return adminOnly(pc("Roles", "/people/roles"), "people");
    const r = S().roles.find(x => x.id === id);
    if (!r) return { nav: "people", crumbs: pc("Roles", "/people/roles"), html: head("Role not found") };
    return { nav: "people", crumbs: [["People", "/people/users"], ["Roles", "/people/roles"], [r.name, ""]], title: r.name,
      html: `<a class="back" href="#/people/roles">← Roles</a>${head(r.name, `<button type="button" class="btn" data-act="edit">Edit permissions</button>`)}
      <div class="row" style="margin-top:8px">${r.copiedFrom ? `<span class="chip">Duplicated from ${esc(r.copiedFrom)}</span>` : ""}<span class="chip">Scope: ${esc(r.scope)}</span></div>
      <section style="margin-top:18px" aria-labelledby="mem-h"><h2 id="mem-h">Members · ${r.members}</h2>
      ${r.members ? `<p class="muted">${r.members} people have this role.</p>` : empty("No members yet", `Members weren't copied, so nobody has this role until you add them.<br><button type="button" class="btn pri" style="margin-top:12px" data-act="addPilot">Add Rogue One pilot group</button>`)}</section>
      <section style="margin-top:18px" aria-labelledby="perm-h"><h2 id="perm-h">Permissions · ${r.perms}</h2><p class="muted">Manage content, tags and sharing in ${esc(r.scope)}.</p></section>`,
      act: { edit() { toast("Editing permissions isn't part of this prototype yet"); }, addPilot() { r.members = 38; save(); rerender(); toast("Rogue One pilot added · 38 people now have this role"); } } };
  });

  /* ================= Billing ================= */
  const bt = at => tabs("Billing", [["plan", "Plan", "/billing/plan"], ["seats", "Seats", "/billing/seats"], ["invoices", "Invoices", "/billing/invoices"]], at);
  const bhead = () => head("Billing", `<span class="chip" style="min-height:32px;border-radius:7px;background:var(--hover);border-color:var(--hover)">Contract: <b style="font-weight:500">Echo Base</b> · 2 contracts</span><button type="button" class="btn" data-act="addSeats">Add seats</button>`);
  const bc = (t, h) => [["Billing", "/billing/plan"], [t, h]];
  const billingAct = { addSeats() { openAddSeats(); } };

  route("/billing/plan", p => {
    if (!isAdmin()) return adminOnly(bc("Plan", "/billing/plan"), "billing");
    const s = S(), pl = s.plan, byDep = p.cost === "dep";
    const yearly = pl.assigned * pl.perSeat * 12;
    return { nav: "billing", crumbs: bc("Plan", "/billing/plan"), title: "Plan",
      html: `${bhead()}${bt("plan")}<div class="body cols"><div>
        <section class="card" aria-labelledby="pl-h"><h2 id="pl-h">${esc(pl.name)}</h2>${kv([
          ["Price", `$${pl.perSeat} per seat per month, billed annually <span class="muted">· USD, excluding tax</span>`, 1],
          ["Billing period", esc(pl.period)], ["Renewal", `<b style="font-weight:500">Renews automatically on ${esc(pl.renews)}</b><span class="muted"> · ${pl.seats} seats, ${money(pl.seats * pl.perSeat * 12)} a year</span>`],
          ["Payment", `${pl.card.brand} ending ${pl.card.last4} · <a class="link" href="#/billing/invoices">Change</a>`],
          ["Cancellation", `Turn off auto-renew or cancel any time before ${esc(pl.cancelBy)} · <button type="button" class="link" data-act="terms">Terms</button>`, 1]])}</section>
        <section class="card" aria-labelledby="se-h"><h2 id="se-h">Seats <a class="link n" style="font-size:12.5px;color:var(--ink)" href="#/billing/seats">Manage seats</a></h2>
          ${[["Console", pl.assigned, pl.seats], ["AI add-on", pl.ai.used, pl.ai.of]].map(([n, a, o]) => `<div style="margin-top:10px"><div class="row"><b style="font-weight:600">${n}</b><span class="spacer"></span><span class="muted"><b style="color:var(--ink)">${a}</b> of ${o} assigned · ${o - a} available</span></div>
            <div class="bar" style="margin-top:6px" role="img" aria-label="${n}: ${a} of ${o} seats assigned"><i style="width:${Math.min(100, a / o * 100)}%"></i></div></div>`).join("")}</section></div>
      <div><section class="card" aria-labelledby="inc-h"><h2 id="inc-h">What's included</h2>
          <ul style="margin:0;padding-left:18px"><li>Console for ${pl.seats} people</li><li>Audit log, 90 days</li><li>Access reviews and requests</li><li>Email and chat support</li></ul>
          <p class="small muted" style="margin:10px 0 0;padding-top:10px;border-top:1px solid var(--rule)">Enterprise adds SSO enforcement, 1-year log retention and a 99.95% SLA. <button type="button" class="link" data-act="compare">Compare plans</button></p></section>
        <section class="card" aria-labelledby="co-h"><h2 id="co-h">Cost</h2>
          <div class="seg" role="radiogroup" aria-label="Show cost">
            <label><input type="radio" name="cost" value="total" ${byDep ? "" : "checked"} data-change="cost">Total</label><label><input type="radio" name="cost" value="dep" ${byDep ? "checked" : ""} data-change="cost">By department</label></div>
          <div style="margin-top:12px">${byDep ? `<table><caption class="vh">Yearly cost by department</caption><thead><tr><th scope="col">Department</th><th scope="col">Seats</th><th scope="col" class="r">A year</th></tr></thead><tbody>
            ${s.deps.map(([d, n]) => `<tr><td>${d}</td><td>${n}</td><td class="r">${money(n * pl.perSeat * 12)}</td></tr>`).join("")}
            <tr><td><b>Total</b></td><td>${s.deps.reduce((a, d) => a + d[1], 0)}</td><td class="r"><b style="color:var(--ink)">${money(s.deps.reduce((a, d) => a + d[1], 0) * pl.perSeat * 12)}</b></td></tr></tbody></table>` :
            `<div class="stat">${money(yearly)}</div><div class="small muted">a year for ${pl.assigned} assigned seats · USD, excluding tax</div>`}</div>
          <div class="row" style="margin-top:12px;padding-top:10px;border-top:1px solid var(--rule)"><span class="av sm">MM</span><span>Mon Mothma <span class="muted">· Finance · view only</span></span></div></section></div></div>`,
      act: Object.assign({ cost(el) { go("/billing/plan" + (el.value === "dep" ? "?cost=dep" : "")); announce(el.value === "dep" ? "Showing cost by department" : "Showing total cost"); },
        terms() { toast("Terms open in a new tab in the real console"); }, compare() { toast("Plan comparison isn't part of this prototype yet"); } }, billingAct) };
  });

  route("/billing/seats", p => {
    if (!isAdmin()) return adminOnly(bc("Seats", "/billing/seats"), "billing");
    const s = S(), pl = s.plan, inactive = p.f === "inactive";
    const rows = s.people.filter(x => x.status !== "deactivated" && (!inactive || x.inactive));
    const n = s.people.filter(x => x.inactive && !x.reclaim).length + (s.reclaimed ? 0 : 9);
    return { nav: "billing", crumbs: bc("Seats", "/billing/seats"), title: "Seats",
      html: `${bhead()}${bt("seats")}<div class="body">
      <section class="card row" style="gap:18px" aria-labelledby="sc-h"><div class="spacer"><h2 id="sc-h" style="margin:0 0 6px;font-size:13px"><b>Console</b> <span class="muted" style="font-weight:400">· <b style="color:var(--ink)">${pl.assigned}</b> of ${pl.seats} assigned · ${pl.seats - pl.assigned} available</span></h2>
        <div class="bar" style="max-width:420px" role="img" aria-label="${pl.assigned} of ${pl.seats} seats assigned"><i style="width:${pl.assigned / pl.seats * 100}%"></i></div></div>
        <span class="small muted">${icon("ok")} Matches your plan</span><span class="small muted" style="max-width:280px">When seats are full, new people join as viewers until you add seats.</span></section>
      <div class="cols" style="margin-top:14px"><div>
        <div class="row" role="group" aria-label="Filter people">
          <a class="btn sm${inactive ? "" : " pri"}" href="#/billing/seats" ${inactive ? "" : 'aria-current="true"'}>All · ${pl.assigned}</a>
          <a class="btn sm${inactive ? " pri" : ""}" href="#/billing/seats?f=inactive" ${inactive ? 'aria-current="true"' : ""}>Inactive 60+ days · ${s.reclaimed ? 0 : 14}</a>
          <span class="spacer"></span>${inactive && !s.reclaimed ? `<span class="small muted">14 people</span><button type="button" class="btn sm pri" data-act="reclaim">Reclaim 14 licenses</button>` : ""}</div>
        <table style="margin-top:10px"><caption class="vh">People and their licenses${inactive ? ", inactive 60 days or more" : ""}</caption><thead><tr><th scope="col">Person</th><th scope="col">License</th><th scope="col">Assigned by</th><th scope="col">${s.reclaimed && inactive ? "Status" : "Last active"}</th></tr></thead><tbody>
        ${rows.map(x => `<tr><td>${esc(x.name)}</td><td>${esc(x.license)}</td><td>${esc(x.by)}</td><td>${x.reclaim ? `<b style="color:var(--ink);font-weight:500">Until ${esc(x.reclaim)}</b>` : esc(x.last)}</td></tr>`).join("")}
        </tbody></table>${inactive && !s.reclaimed ? '<p class="small muted">and 9 more</p>' : ""}</div>
        <aside class="card" aria-labelledby="ag-h"><h2 id="ag-h">Assigned by group</h2>
          ${[["Rogue Squadron", "Console + AI · 12"], ["Fleet", "Console · 82"], ["Individual overrides", "6 people"]].map(([a, b]) => `<div class="row small" style="padding:6px 0;border-bottom:1px solid var(--rule)"><span>${a}</span><span class="spacer"></span><span class="muted">${b}</span></div>`).join("")}
          <p class="small muted" style="margin:10px 0 0">Licenses are reclaimed automatically when someone leaves. <a class="link" href="#/billing/plan?cost=dep">Usage by department</a></p></aside></div></div>`,
      act: Object.assign({ reclaim() {
        dialog({ title: "Reclaim 14 Console licenses?", body: `<ul style="margin:0;padding-left:18px;color:var(--ink)"><li>Each person is emailed today and keeps access until 29 November.</li><li>Their files, settings and history are kept.</li><li>You can undo this for 30 days.</li></ul>`,
          foot: `<button type="button" class="btn ghost" data-close>Cancel</button><button type="button" class="btn pri" id="rc">Reclaim 14</button>`,
          onOpen: (d, api) => $("#rc", d).onclick = () => { const s = S(); s.reclaimed = true; s.plan.assigned -= 14; s.people.forEach(x => { if (x.inactive) x.reclaim = "29 Nov"; }); save(); api.close(); rerender();
            toast("14 licenses reclaimed · people notified", () => { const s = S(); s.reclaimed = false; s.plan.assigned += 14; s.people.forEach(x => delete x.reclaim); save(); rerender(); announce("Reclaim undone"); }); } });
      } }, billingAct) };
  });

  function openAddSeats() {
    const pl = S().plan, per = pl.perSeat * 12;
    dialog({ title: "Add Console seats", wide: true, body: `<p class="muted" style="margin:0">${esc(pl.name)} · USD, excluding tax</p><div id="step1">
        <div class="row" style="margin-top:14px;align-items:flex-end"><div style="width:130px"><label for="qty">Seats to add</label><input type="number" id="qty" min="1" max="500" inputmode="numeric" value="" autofocus aria-describedby="qty-h"></div><span class="muted" style="padding-bottom:8px" id="qty-h">× $${per}.00 a year per seat ($${pl.perSeat} a month)</span></div>
        <dl class="kv" style="margin-top:16px" id="price" aria-live="polite"></dl>
        <label class="check"><input type="checkbox" id="addon"><span><b>AI add-on</b><span class="d">Not added · $9 per seat per month</span></span></label>
        <p class="small muted">Purchases over $5,000 need finance approval. New hires can go 5% over until the next true-up.</p></div>
        <div id="step2" hidden></div>`,
      foot: `<span class="spacer" id="footnote">Can't pay by card? <button type="button" class="link" data-act="quote">Request a quote</button> or pay by purchase order.</span><button type="button" class="btn ghost" data-close id="cancelBtn">Cancel</button><button type="button" class="btn pri" id="next">Review</button>`,
      onOpen(d, api) {
        const q = $("#qty", d), price = $("#price", d), next = $("#next", d);
        const calc = () => { const n = Math.max(0, parseInt(q.value || "0", 10)); const today = Math.round(per * n * pl.daysLeft / 365 * 100) / 100;
          price.innerHTML = `<div><dt>Today, prorated</dt><dd><b>${money(today)}</b><span class="hint">For the ${pl.daysLeft} days left in this term</span></dd></div><div><dt>From ${esc(pl.renews)}</dt><dd><b>${money(per * (pl.seats + n))}</b> a year<span class="hint">${pl.seats + n} seats</span></dd></div>`;
          return { n, today }; };
        calc(); q.addEventListener("input", calc);
        let stage = 1;
        next.onclick = () => {
          const { n, today } = calc();
          if (stage === 1) {
            if (!n) { q.setAttribute("aria-invalid", "true"); q.focus(); announce("Enter how many seats to add"); return; }
            if (today > 5000) { announce("Over $5,000: this purchase needs finance approval"); }
            stage = 2; $("#step1", d).hidden = true; const s2 = $("#step2", d); s2.hidden = false;
            s2.innerHTML = `<h3 style="margin-top:12px" tabindex="-1" id="rv">Review your purchase</h3><p class="muted" style="margin:0 0 12px">Nothing is charged until you buy.</p>${kv([["Adding", `<b>${n} Console seats</b> · ${pl.seats + n} in total`], ["Charged today", `<b>${money(today)}</b> + tax to ${pl.card.brand} ending ${pl.card.last4}`], ["Then", `${money(per * (pl.seats + n))} a year from ${esc(pl.renews)}`], ["Seats available", "Right away · a receipt goes to the billing contacts"]])}`;
            $("#footnote", d).innerHTML = ""; $("#cancelBtn", d).textContent = "Back"; $("#cancelBtn", d).removeAttribute("data-close");
            $("#cancelBtn", d).onclick = () => { stage = 1; $("#step1", d).hidden = false; s2.hidden = true; next.textContent = "Review"; $("#cancelBtn", d).textContent = "Cancel"; $("#cancelBtn", d).setAttribute("data-close", ""); $("#cancelBtn", d).onclick = null; q.focus(); };
            next.textContent = `Buy ${n} seats · ${money(today)}`; $("#rv", d).focus();
          } else {
            const s = S(); s.plan.seats += n; s.invoices.unshift({ id: "i" + Date.now(), date: "22 Nov 2026", what: `${n} seats added`, amount: today, status: "Paid", fresh: true }); save(); api.close(); rerender();
            toast(`${n} seats added · receipt sent to billing contacts · logged`);
          }
        };
      } });
  }

  route("/billing/invoices", () => {
    if (!isAdmin()) return adminOnly(bc("Invoices", "/billing/invoices"), "billing");
    const s = S(), pl = s.plan, b = s.billingDetails, expiring = pl.card.last4 === "4417";
    return { nav: "billing", crumbs: bc("Invoices", "/billing/invoices"), title: "Invoices",
      html: `${bhead()}${bt("invoices")}<div class="body">
      ${expiring ? `<div class="banner" role="region" aria-label="Payment card expiring"><div class="tx"><b>Visa ending 4417 expires on 31 December</b>, before your ${esc(pl.renews)} renewal. If a payment fails, access continues for 14 days while we retry and email your billing contacts.</div><button type="button" class="btn pri sm" data-act="card" id="updCard">Update card</button></div>` : ""}
      <div class="cols" style="margin-top:14px"><div><table><caption class="vh">Invoices, newest first</caption><thead><tr><th scope="col">Date</th><th scope="col">Invoice</th><th scope="col" class="r">Amount</th><th scope="col">Status</th></tr></thead><tbody>
        ${s.invoices.map(i => `<tr${i.fresh ? ' class="hl"' : ""}><td>${esc(i.date)}</td><td><span style="color:var(--ink)">${esc(i.what)}</span><br><a class="link small" href="#/billing/invoices" data-act="pdf">Download ${i.credit ? "credit note" : "invoice"} for ${esc(i.date)} (PDF)</a></td><td class="r" style="color:var(--ink)">${money(i.amount)}</td>
          <td>${i.status === "Refunded" ? `<span class="st mute">${icon("back")}Refunded</span>` : okSt(i.status)}</td></tr>`).join("")}</tbody></table></div>
      <aside class="card" aria-labelledby="bd-h"><h2 id="bd-h">Billing details <button type="button" class="link n" style="font-size:12.5px;color:var(--ink)" data-act="edit">Edit</button></h2>
        ${kv([["Entity", `${esc(b.entity)} <span class="muted">(1 of ${b.entities})</span>`, 1], ["Address", esc(b.address), 1], ["Tax ID", esc(b.tax)], ["PO number", `${esc(b.po)} <span class="muted">· on every invoice</span>`], ["Contacts", esc(b.contacts), 1], ["Payment", `${pl.card.brand} ending ${pl.card.last4} · expires ${pl.card.exp}`, 1]])}
        <p class="small muted" style="margin:12px 0 0;padding-top:10px;border-top:1px solid var(--rule)">Invoices are also emailed to billing contacts and synced to Holonet Ledger. Full history since 2024, in USD and Galactic credits.</p></aside></div></div>`,
      act: Object.assign({
        pdf() { toast("The PDF downloads in the real console"); }, edit() { toast("Editing billing details isn't part of this prototype yet"); },
        card() { dialog({ title: "Update payment card", body: `<div class="field" style="margin-top:8px"><label for="cn">Card number</label><input type="text" id="cn" inputmode="numeric" autocomplete="cc-number" placeholder="16 digits" value="4242 4242 4242 0921" autofocus></div>
            <div class="cols even" style="gap:12px;grid-template-columns:1fr 1fr"><div class="field"><label for="ce">Expires <span class="opt">(MM/YY)</span></label><input type="text" id="ce" autocomplete="cc-exp" value="08/29"></div><div class="field"><label for="cnm">Name on card</label><input type="text" id="cnm" autocomplete="cc-name" value="Lavanya Sienna"></div></div>
            <p class="small muted">After saving, only the last 4 digits are shown.</p>`,
          foot: `<button type="button" class="btn ghost" data-close>Cancel</button><button type="button" class="btn pri" id="sv">Save card</button>`,
          onOpen: (d, api) => $("#sv", d).onclick = () => { const v = $("#cn", d).value.replace(/\D/g, ""); if (v.length < 12) { $("#cn", d).setAttribute("aria-invalid", "true"); announce("Enter the full card number"); return; }
            const s = S(); s.plan.card = { brand: "Visa", last4: v.slice(-4), exp: $("#ce", d).value }; save(); api.close(); rerender(); toast(`Card updated · Visa ending ${v.slice(-4)} · billing contacts notified · logged`); } }); }
      }, billingAct) };
  });

  /* ================= Settings: Integrations + wizard ================= */
  /* ----- Settings › Organization: routine settings, then the Danger zone (Type-to-confirm for the deletes) ----- */
  const setTabs = at => tabs("Settings", [["org", "Organization", "/settings/organization"], ["integrations", "Integrations", "/settings/integrations"]], at);
  const norm = v => v.trim().replace(/\s+/g, " ").toLowerCase();
  function typeToConfirm({ title, name, body, button, done }) {
    dialog({ title, label: title,
      body: `${body}<div class="field" style="margin-top:16px"><div class="row" style="justify-content:space-between"><label for="ttc">Type <b>${esc(name)}</b> to confirm</label><button type="button" class="btn ghost sm" id="cpy">Copy name</button></div>
        <input type="text" id="ttc" autocomplete="off" spellcheck="false" aria-describedby="ttc-st" autofocus><div class="match" id="ttc-st" aria-live="polite">Type the name to turn on ${esc(button)}</div></div>`,
      foot: `<button type="button" class="btn" data-close>Cancel</button><button type="button" class="btn dgr" id="ttcGo" aria-disabled="true" aria-describedby="ttc-st">${esc(button)}</button>`,
      onOpen(d, api) {
        const f = $("#ttc", d), st = $("#ttc-st", d), b = $("#ttcGo", d);
        const ok = () => norm(f.value) === norm(name);
        let was = false;
        f.addEventListener("input", () => {
          const m = ok(); b.setAttribute("aria-disabled", m ? "false" : "true");
          if (m !== was) st.innerHTML = m ? `<span style="color:var(--ink)">${icon("ok")} Matches · capitals and spaces don’t matter</span>` : `Type the name to turn on ${esc(button)}`;
          was = m;
        });
        f.addEventListener("keydown", e => { if (e.key === "Enter" && ok()) b.click(); });
        $("#cpy", d).onclick = () => { try { navigator.clipboard.writeText(name); } catch (e) { /* no clipboard */ } announce("Name copied"); };
        b.onclick = () => { if (!ok()) { f.focus(); announce(st.textContent); return; } api.close(); done(); };
      } });
  }
  route("/settings/organization", () => {
    if (!isAdmin()) return adminOnly([["Settings", "/settings/organization"], ["Organization", ""]], "settings");
    const o = S().org, sb = o.sandbox;
    return { nav: "settings", crumbs: [["Settings", "/settings/organization"], ["Organization", ""]], title: "Organization",
      html: `${head("Settings")}${setTabs("org")}<div class="body">
        <section class="secbox" aria-labelledby="op-h"><div class="row" style="justify-content:space-between"><h2 id="op-h" style="margin:0;font-size:14px">Organization profile</h2><button type="button" class="btn sm" data-act="edit">Edit</button></div>
          ${kv([["Name", esc(o.name)], ["Domain", esc(o.domain)], ["Time zone", esc(o.tz)], ["Owner", esc(o.owner)], ["Plan", esc(o.plan)], ["Data region", esc(o.region)]])}</section>
        <section class="dz" aria-labelledby="dz-h"><div class="h"><h2 id="dz-h">Irreversible actions</h2><span class="small muted">Only owners see this section</span></div>
          <div class="dzr"><div><b>Reset all public links</b>${o.linksReset ? `Reset ${esc(o.linksReset)} by Lavanya Sienna · links stopped working, owners told.` : "Every public link stops working right away. File owners are told by email."}</div><button type="button" class="btn dgr" data-act="resetLinks">Reset public links</button></div>
          <div class="dzr"><div><b>Transfer ownership</b>Someone else becomes the owner. You stay an admin.</div><button type="button" class="btn dgr" data-act="transfer">Transfer ownership</button></div>
          <div class="dzr"><div><b>Delete sandbox</b>${sb.state === "deleting" ? "Deletion started by Lavanya Sienna · takes about 10 minutes. Owners are notified." : `${esc(sb.name)} and everything in it is deleted. Asks you to type its name.`}</div>${sb.state === "deleting" ? '<button type="button" class="btn" aria-disabled="true">Deleting…</button>' : '<button type="button" class="btn dgr" data-act="delSandbox">Delete sandbox</button>'}</div>
          <div class="dzr"><div><b>Delete organization</b>${o.deleteAt ? `Scheduled by Lavanya Sienna · everything is deleted in 30 days unless you cancel.` : "Every person, file and setting is deleted after 30 days. Asks you to type its name."}</div>${o.deleteAt ? '<button type="button" class="btn" data-act="cancelOrg">Cancel deletion</button>' : '<button type="button" class="btn dgr" data-act="delOrg">Delete organization</button>'}</div>
        </section></div>`,
      act: {
        edit() { toast("Editing the profile comes with a later pattern"); },
        transfer() { toast("Transfer ownership comes with a later pattern"); },
        resetLinks() {
          const n = S().files.filter(f => f.sharing === "Public link").length || o.publicLinks;
          dialog({ title: "Reset all public links?", body: `<div class="impact"><b>${n} public links</b> stop working right away. Their file owners are told by email.</div><p style="margin:10px 0 0">Files and people’s access aren’t touched, and owners can share a new link. No name to type for this one.</p>`,
            foot: `<button type="button" class="btn" data-close autofocus>Cancel</button><button type="button" class="btn dgr" id="rlGo">Reset ${n} links</button>`,
            onOpen(d, api) { $("#rlGo", d).onclick = () => { S().files.forEach(f => { if (f.sharing === "Public link") f.sharing = "Internal"; }); o.linksReset = "just now"; save(); api.close(); rerender(); toast(`${n} public links reset · owners are told by email`); }; } });
        },
        delSandbox() {
          typeToConfirm({ title: `Delete ${sb.name}?`, name: sb.name, button: "Delete sandbox",
            body: `<dl class="kv" style="grid-template-columns:repeat(3,1fr)"><div><dt>Files</dt><dd>${sb.files}</dd></div><div><dt>Integrations</dt><dd>${sb.integrations}</dd></div><div><dt>Test users</dt><dd>${sb.users}</dd></div></dl><p style="margin:10px 0 0">All of it is deleted for good. The live ${esc(o.name)} organization isn’t touched.</p>`,
            done() { sb.state = "deleting"; save(); rerender(); toast(`Deleting ${sb.name} · owners are notified`); } });
        },
        delOrg() {
          typeToConfirm({ title: `Delete ${o.name}?`, name: o.name, button: "Delete organization",
            body: `<div class="impact"><b>Every person, file and setting</b> in ${esc(o.name)} is deleted after 30 days. Until then you can cancel.</div>`,
            done() { o.deleteAt = "30 days"; save(); rerender(); toast(`${o.name} is scheduled for deletion in 30 days · every owner is told`); } });
        },
        cancelOrg() { delete o.deleteAt; save(); rerender(); toast("Deletion cancelled"); }
      } };
  });
  route("/settings/integrations", () => {
    if (!isAdmin()) return adminOnly([["Settings", "/settings/integrations"], ["Integrations", ""]], "settings");
    const s = S();
    return { nav: "settings", crumbs: [["Settings", "/settings/organization"], ["Integrations", ""]], title: "Integrations",
      html: `${head("Settings", `<button type="button" class="btn" data-act="browse">Browse integrations</button>`)}${setTabs("integrations")}
      <div style="margin-top:16px;display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:14px">
      ${s.integrations.map(i => `<section class="card ${i.state === "draft" ? "strong" : ""}" style="margin:0" aria-labelledby="int-${i.id}"><div class="row"><span class="av" style="border-radius:8px">${i.logo}</span><h2 id="int-${i.id}" class="spacer" style="margin:0">${esc(i.name)}</h2>
        ${i.state === "draft" ? '<span class="chip">Setup in progress</span>' : `<span class="chip ${i.fresh ? "dk" : ""}">${esc(i.state)}</span>`}</div>
        <p class="small muted" style="margin:8px 0 0">${i.state === "draft" ? `<b style="color:var(--ink);font-weight:500">Draft by ${esc(i.draft.by)}</b>, shared with you · 1 of 4 steps done · saved yesterday` : esc(i.desc)}</p>
        ${i.state === "draft" ? `<div class="row" style="margin-top:10px"><a class="btn pri sm" href="#/settings/integrations/${i.id}/setup">Continue setup</a><button type="button" class="btn ghost sm" data-act="discard">Discard draft</button></div>` : ""}</section>`).join("")}</div>`,
      act: { browse() { toast("The integration catalogue isn't part of this prototype yet"); }, discard() { toast("Kept the draft. Discarding isn't part of this prototype."); } } };
  });
  route("/settings/integrations/:id/setup", p => {
    if (!isAdmin()) return adminOnly([["Settings", "/settings/integrations"]], "settings");
    const s = S(), i = s.integrations.find(x => x.id === p.id), w = s.wiz || (s.wiz = { step: 2, perm: "", sync: "hour", skipped: false });
    const steps = [["Connect"], ["Permissions"], ["Sync", "optional"], ["Review"]];
    const stepper = `<ol class="row" style="list-style:none;padding:0;margin:18px 0 0;gap:10px" aria-label="Setup steps">${steps.map(([n, o], k) => { const idx = k + 1, done = idx < w.step, cur = idx === w.step;
      return `<li class="row" style="gap:8px;${cur ? "font-weight:600" : done ? "" : "color:var(--faint)"}" ${cur ? 'aria-current="step"' : ""}><span class="av sm" style="${done ? "background:var(--ink);color:#fff;border-color:var(--ink)" : cur ? "border-color:var(--ink)" : ""}">${done ? "✓" : idx}</span>${n}${o ? ` <span class="small muted" style="font-weight:400">· ${idx === 3 && w.skipped && w.step > 3 ? "skipped" : o}</span>` : ""}<span class="vh">${done ? ", done" : cur ? ", current step" : ", not started"}</span></li>${k < 3 ? '<li aria-hidden="true" style="flex:1;min-width:20px;height:1.5px;background:var(--rule)"></li>' : ""}`; }).join("")}</ol>`;
    let pane;
    if (w.step === 2) pane = `<h2 tabindex="-1" id="stepH" style="font-size:17px;margin:0">Permissions</h2><p class="muted" style="margin:2px 0 0">What can Holonet Ledger see?</p>
      <div class="note" style="margin-top:12px;width:fit-content">Ledger account <b>${esc(i.draft.account)}</b>, from step 1</div>
      <fieldset style="border:0;padding:0;margin:4px 0 0;max-width:640px"><legend class="vh">What can Holonet Ledger see?</legend>
      ${[["inv", "Invoices only", "Amounts, dates and status"], ["seats", "Invoices and seat counts", "Adds seats per product and department, for chargeback"], ["names", "Invoices, seats and people's names", "Includes personal data; needs a data processing agreement"]].map(([v, b, d]) =>
        `<label class="choice"><input type="radio" name="perm" value="${v}" ${w.perm === v ? "checked" : ""} data-change="perm"><span><b>${b}</b><span class="d">${d}</span></span></label>`).join("")}</fieldset>
      <div id="permErr" aria-live="polite"></div>
      <div class="row" style="margin-top:18px;max-width:640px"><a class="btn ghost" href="#/settings/integrations">Save and exit</a><span class="spacer"></span><button type="button" class="btn pri" data-act="next">Next</button></div>`;
    else if (w.step === 3) pane = `<h2 tabindex="-1" id="stepH" style="font-size:17px;margin:0">Sync <span class="muted" style="font-weight:400;font-size:14px">· optional</span></h2><p class="muted" style="margin:2px 0 0">How often should it sync? Skip to keep the default, every hour.</p>
      <fieldset style="border:0;padding:0;margin:8px 0 0;max-width:640px"><legend class="vh">How often should it sync?</legend>
      ${[["hour", "Every hour", "Default"], ["15", "Every 15 minutes", "Uses more of the Ledger's API quota"]].map(([v, b, d]) => `<label class="choice"><input type="radio" name="sync" value="${v}" ${w.sync === v ? "checked" : ""} data-change="sync"><span><b>${b}</b><span class="d">${d}</span></span></label>`).join("")}</fieldset>
      <div class="row" style="margin-top:18px;max-width:640px"><button type="button" class="btn ghost" data-act="back">Back</button><span class="spacer"></span><button type="button" class="btn" data-act="skip">Skip</button><button type="button" class="btn pri" data-act="next">Next</button></div>`;
    else pane = `<h2 tabindex="-1" id="stepH" style="font-size:17px;margin:0">Review and connect</h2><p class="muted" style="margin:2px 0 0">Check each choice. Nothing connects until you finish.</p>
      <div class="card" style="margin-top:12px;max-width:680px">${[["Connect", `${esc(i.draft.account)} <span class="muted">· by ${esc(i.draft.by)}</span>`, 1], ["Permissions", w.perm === "inv" ? "Invoices only" : w.perm === "names" ? "Invoices, seats and people's names" : "Invoices and seat counts", 2], ["Sync", w.sync === "15" ? "Every 15 minutes" : `Every hour <span class="muted">· default${w.skipped ? ", skipped" : ""}</span>`, 3]].map(([k, v, st]) =>
        `<div class="row" style="padding:10px 0;border-bottom:1px solid var(--rule)"><div class="spacer"><div class="small muted">${k}</div><div>${v}</div></div><button type="button" class="link small" data-act="editStep" data-step="${st}" aria-label="Edit ${k}">Edit</button></div>`).join("")}</div>
      <div class="row" style="margin-top:12px">${App.okSt("Connection works")}${App.okSt("Permissions granted by Holonet")}</div>
      <p class="muted">When you connect, <b style="color:var(--ink);font-weight:500">invoices and seat counts sync every ${w.sync === "15" ? "15 minutes" : "hour"}, starting now.</b></p>
      <div class="row" style="max-width:680px"><button type="button" class="btn ghost" data-act="export">Export configuration</button><span class="spacer"></span><button type="button" class="btn ghost" data-act="back">Back</button><button type="button" class="btn pri" data-act="connect">Connect Holonet Ledger</button></div>`;
    return { nav: "settings", crumbs: [["Settings", "/settings/integrations"], ["Integrations", "/settings/integrations"], [i.name, ""]], title: "Connect " + i.name,
      html: `<div class="hd"><div class="spacer"><h1>Connect ${esc(i.name)}</h1><div class="small muted">Draft saved automatically · shared with ${esc(i.draft.by)}</div></div><a class="btn ghost" href="#/settings/integrations">Save and exit</a></div>
        ${stepper}<p class="small muted mono" style="margin-top:10px">Step ${w.step} of 4</p><div style="margin-top:12px">${pane}</div>`,
      act: {
        perm(el) { w.perm = el.value; save(); },
        sync(el) { w.sync = el.value; save(); },
        next() { if (w.step === 2 && !w.perm) { $("#permErr").innerHTML = `<div class="err">${icon("no")}Choose what Holonet Ledger can see.</div>`; $('input[name=perm]').focus(); return; }
          if (w.step === 3) w.skipped = false; w.step++; save(); rerender(); $("#stepH").focus(); announce(`Step ${w.step} of 4`); },
        back() { w.step--; save(); rerender(); $("#stepH").focus(); announce(`Step ${w.step} of 4`); },
        skip() { w.skipped = true; w.sync = "hour"; w.step = 4; save(); rerender(); $("#stepH").focus(); announce("Sync skipped. Step 4 of 4, review."); },
        editStep(b) { w.step = +b.dataset.step === 1 ? 2 : +b.dataset.step; save(); rerender(); $("#stepH").focus(); },
        export() { toast("Configuration exported as holonet-ledger.json"); },
        connect() { const s = S(); i.state = "Connected · syncing"; i.fresh = true; i.desc = `Invoices and seat counts sync every ${w.sync === "15" ? "15 minutes" : "hour"} · last sync just now`; delete s.wiz; save(); go("/settings/integrations"); toast("Holonet Ledger connected · first sync running · logged"); }
      } };
  });

  /* ================= Insights ================= */
  route("/insights", () => ({ nav: "insights", crumbs: [["Insights", "/insights"]], title: "Insights",
    html: `${head("Insights")}<div class="body">${App.empty("Insights come with a later set of patterns", "This prototype grows as each pattern gets its clip.")}</div>` }));
})();
