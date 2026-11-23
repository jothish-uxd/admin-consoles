/* Echo Base Console prototype: the starting data.
   The same people, numbers and story as the pattern clips. The app copies this into its own state,
   keeps changes in this browser, and "Reset demo data" brings this back. */
window.SEED = {
  today: "Sun 22 Nov 2026",
  me: { name: "Lavanya Sienna", initials: "LS", titles: { admin: "Jedi Master", member: "Jedi in training" } },
  role: "admin",

  /* ---------- People ---------- */
  people: [
    { id: "wedge", name: "Wedge Antilles", initials: "WA", title: "Pilot", team: "Red Squadron", license: "Console + AI", by: "Rogue Squadron (group)", last: "Today", status: "active" },
    { id: "toryn", name: "Toryn Farr", initials: "TF", title: "Shield Ops lead", team: "Shield Ops", license: "Console + AI", by: "Individual", last: "Today", status: "active" },
    { id: "hobbie", name: "Hobbie Klivian", initials: "HK", title: "Pilot", team: "Fleet", license: "Console", by: "Fleet (group)", last: "Yesterday", status: "active" },
    { id: "cal", name: "Cal Alder", initials: "CA", title: "Patrol lead", team: "Fleet", license: "Console", by: "Fleet (group)", last: "3 days ago", status: "active" },
    { id: "cassian", name: "Cassian Andor", initials: "CA", title: "Intelligence officer", team: "Rogue One", license: "Console", by: "Individual", last: "Today", status: "active" },
    { id: "jyn", name: "Jyn Erso", initials: "JE", title: "Field agent", team: "Rogue One", license: "Console", by: "Individual", last: "Today", status: "active" },
    { id: "dodonna", name: "Gen. Jan Dodonna", initials: "JD", title: "Command", team: "Command", license: "Console + AI", by: "Individual", last: "Today", status: "active" },
    { id: "mothma", name: "Mon Mothma", initials: "MM", title: "Finance", team: "Senate liaison", license: "Console", by: "Individual", last: "Today", status: "active" },
    { id: "porkins", name: "Jek Porkins", initials: "JP", title: "Pilot", team: "Red Squadron", license: "Console", by: "Individual", last: "120 days ago", status: "active", inactive: true },
    { id: "dak", name: "Dak Ralter", initials: "DR", title: "Gunner", team: "Rogue Squadron", license: "Console", by: "Individual", last: "92 days ago", status: "active", inactive: true },
    { id: "tycho", name: "Tycho Celchu", initials: "TC", title: "Pilot", team: "Rogue Squadron", license: "Console", by: "Rogue Squadron (group)", last: "88 days ago", status: "active", inactive: true },
    { id: "zev", name: "Zev Senesca", initials: "ZS", title: "Pilot", team: "Fleet", license: "Console", by: "Fleet (group)", last: "61 days ago", status: "active", inactive: true },
    { id: "biggs", name: "Biggs Darklighter", initials: "BD", title: "Pilot", team: "Red Squadron", license: "Console", by: "Rogue Squadron (group)", last: "74 days ago", status: "deactivated", manager: "Gen. Jan Dodonna",
      offboarding: { deactivated: true, signedOut: true, transferred: false, groupsRemoved: false } }
  ],
  groups: [
    { id: "rogue-sq", name: "Rogue Squadron", desc: "X-wing pilots", members: 12, owner: "Wedge Antilles", license: "Console + AI" },
    { id: "fleet", name: "Fleet", desc: "Transports and escorts", members: 82, owner: "Gen. Rieekan", license: "Console" },
    { id: "shield", name: "Shield Ops", desc: "Shield generator crew", members: 19, owner: "Toryn Farr", license: "Console" },
    { id: "intel", name: "Intelligence", desc: "Analysts and slicers", members: 41, owner: "Gen. Madine", license: "Console" },
    { id: "secadmins", name: "Security admins", desc: "Audit and access reviews", members: 6, owner: "Lavanya Sienna", license: "Console + AI" }
  ],
  roles: [
    { id: "content-admin", name: "Content admin", desc: "Manage content, tags and sharing", members: 8, perms: 24, scope: "Echo Base / Operations" },
    { id: "security-admin", name: "Security admin", desc: "Audit, alerts and access reviews", members: 6, perms: 31, scope: "Whole org" },
    { id: "billing-viewer", name: "Billing viewer", desc: "See plan and invoices", members: 2, perms: 4, scope: "Billing" },
    { id: "viewer", name: "Viewer", desc: "Read-only access", members: 140, perms: 6, scope: "Whole org" }
  ],
  invite: { file: "rogue-one-pilot.csv", count: 38, group: "Rogue One pilot", outside: 2, domain: "rogueone.alliance" },

  /* ---------- Access ---------- */
  requests: [
    { id: "ahsoka", who: "Ahsoka Tano", initials: "AT", title: "Commander", what: "Holonet relay keys", level: "Editor · 30 days", why: "Rotate keys after the Ord Mantell breach", waiting: "2d 4h", note: "Escalates in 3h", risk: "High", status: "pending" },
    { id: "wedge-logs", who: "Wedge Antilles", initials: "WA", title: "Pilot, Red Squadron", what: "X-wing flight logs", level: "Viewer · 7 days", why: "Debrief prep for the Yavin run", waiting: "1d 6h", risk: "Low", status: "pending" },
    { id: "biggs-logs", who: "Biggs Darklighter", initials: "BD", title: "Pilot, Red Squadron", what: "X-wing flight logs", level: "Viewer · 7 days", why: "Same debrief, flying as Wedge's wingman", waiting: "1d 5h", risk: "Low", status: "pending" },
    { id: "cassian-man", who: "Cassian Andor", initials: "CA", title: "Intelligence officer", what: "Yavin IV supply manifests", level: "Viewer · 7 days", why: "Trace crates missing from the last supply run", waiting: "20h", risk: "Low", status: "pending" },
    { id: "bodhi", who: "Bodhi Rook", initials: "BR", title: "Cargo pilot · contractor", what: "Shield generator telemetry", level: "Editor · 1 day", why: "Recalibrate the coolant sensor readings", waiting: "6h", risk: "High", status: "pending", detail: true },
    { id: "jyn-plans", who: "Jyn Erso", initials: "JE", title: "Field agent", what: "Death Star plans · archive", level: "Viewer · 7 days", why: "Cross-check the exhaust port data", waiting: "2h", risk: "High", status: "pending" }
  ],
  grants: [
    { id: "g1", what: "X-wing flight logs", level: "Editor", by: "Red Squadron", ends: null, endsLabel: "No end date" },
    { id: "g2", what: "Death Star plans · archive", level: "Viewer", by: "Gen. Dodonna", ends: "Today, 18:00", inLabel: "in 30 min", soon: true, extendable: true },
    { id: "g3", what: "Shield generator telemetry", level: "Viewer", by: "Base Engineering", ends: "Fri 27 Nov, 09:00", inLabel: "in 5 days", extendable: true },
    { id: "g4", what: "Yavin IV supply manifests", level: "Viewer", by: "Logistics", ends: "Mon 1 Dec, 12:00", inLabel: "in 9 days", extendable: true }
  ],
  myRequests: [],
  review: {
    name: "Q4 access review · Rebel Intelligence archives", due: "Fri 5 Dec", done: 38, total: 52,
    items: [
      { id: "r1", who: "Biggs Darklighter", initials: "BD", team: "Moved to Blue Squadron", what: "Death Star plans", level: "Read and download", last: "142 days ago", why: "Not used in 90 days", suggest: "remove", decision: null },
      { id: "r2", who: "Jek Porkins", initials: "JP", team: "Red Squadron", what: "Hangar 3 schedules", level: "Add and change files", last: "210 days ago", why: "Not used in 90 days", suggest: "remove", decision: null },
      { id: "r3", who: "K-2SO", initials: "K2", team: "Rogue One", what: "Holonet relay keys", level: "Add and change files", last: "3 days ago", why: "Unusual: 1 of 8 on Rogue One has this", suggest: "keep", decision: null }
    ]
  },

  /* ---------- Content ---------- */
  files: [
    { id: "deathstar", name: "Death Star plans.pdf", type: "PDF", owner: "Jyn Erso", ownerSub: "Rebel Intelligence", sharing: "Restricted", last: "2 days ago", size: "48 MB", tags: ["Restricted"] },
    { id: "layout", name: "Echo Base layout.dwg", type: "DWG", owner: "Base Engineering", ownerSub: "Team", sharing: "Internal", last: "5 hours ago", size: "212 MB", tags: [] },
    { id: "poster", name: "Recruitment poster.png", type: "PNG", owner: "Mon Mothma", ownerSub: "Senate liaison", sharing: "Public link", last: "3 hours ago", size: "6 MB", tags: [] },
    { id: "patrol", name: "Hoth patrol routes.xlsx", type: "XLS", owner: "Biggs Darklighter", ownerSub: "Deactivated", deact: true, sharing: "Public link", last: "41 days ago", size: "1 MB", label: "Confidential", tags: ["Hoth", "Patrol"] },
    { id: "supply", name: "Supply run notes.md", type: "MD", owner: "Cassian Andor", ownerSub: "Intelligence", sharing: "Specific people", last: "Yesterday", size: "24 KB", tags: [] },
    { id: "trench", name: "Trench run briefing.mp4", type: "MP4", owner: "Gen. Dodonna", ownerSub: "Command", sharing: "Internal", last: "4 days ago", size: "1.2 GB", tags: [] },
    { id: "roster", name: "Red Squadron roster.pdf", type: "PDF", owner: "Jek Porkins", ownerSub: "Deactivated", deact: true, sharing: "Public link", last: "63 days ago", size: "2 MB", tags: [] },
    { id: "evac", name: "Hoth evacuation plan.docx", type: "DOC", owner: "Gen. Rieekan", ownerSub: "Command", sharing: "Internal", last: "Today", size: "48 KB", label: "Internal", tags: ["Hoth", "Operations"], versions: true }
  ],
  versions: [
    { n: 12, note: "Replaced 42 pages with an empty template", who: "Holonet sync bot", initials: "SB", when: "Today 09:14", pages: 1 },
    { n: 11, note: "Added Hoth evacuation routes", who: "Gen. Rieekan", initials: "CR", when: "Yesterday 18:02", pages: 43 },
    { n: 10, note: "Updated shield gate schedule", who: "Toryn Farr", initials: "TF", when: "19 Nov, 11:40", pages: 41 },
    { n: 9, note: "Added transport loading order", who: "Gen. Rieekan", initials: "CR", when: "18 Nov, 16:05", pages: 38 },
    { n: 8, note: "First draft", who: "Gen. Rieekan", initials: "CR", when: "17 Nov, 09:30", pages: 22 }
  ],
  sharing: { mode: "anyone", domains: ["alliance.gov", "mon-cala.org", "hoth-relief.org"], moreDomains: 12, expire: true, password: true, newLinks: "People in Echo Base", publicLinks: 38, partnerShares: 412 },
  tags: [
    { id: "hoth", name: "Hoth", color: "#3b82f6", uses: 1240, last: "Today" },
    { id: "hoth2", name: "hoth", color: "#3b82f6", uses: 86, last: "Yesterday" },
    { id: "hoth3", name: "Hoth ", color: "#3b82f6", uses: 12, last: "19 Nov", trailing: true },
    { id: "endor", name: "Endor", color: "#16a34a", uses: 430, last: "18 Nov" },
    { id: "yavin", name: "Yavin IV", color: "#f59e0b", uses: 310, last: "12 Nov" },
    { id: "oldops", name: "old-ops", color: "#a3a3a3", uses: 0, last: "2 Mar" }
  ],

  /* ---------- AI ---------- */
  features: [
    { id: "search", name: "Holonet search assist", what: "Suggests answers from the Holonet archives as you search.", status: "On for 4 groups", who: "96 people", adoption: "62% active", groups: ["Rogue One", "Red Squadron", "Base Engineering", "Intelligence"] },
    { id: "brief", name: "Briefing summaries", what: "Sums up long mission briefings in five points. Uses only briefings the person can already open.", status: "Pilot · 1 group", who: "Rogue One · 8 people", adoption: "7 of 8 using", groups: ["Rogue One"] },
    { id: "translate", name: "Protocol translation", what: "Translates messages between languages and droid dialects.", status: "Off", who: "No one", adoption: "—", groups: [] },
    { id: "droid", name: "Droid summaries", what: "Writes a short summary of each droid's mission log.", status: "Off", who: "Arrives 2 Dec", adoption: "—", groups: [], isNew: true }
  ],
  aiData: { retention: "30", labels: ["Top secret", "Medical", "Personnel files"], regions: [["Core Worlds", "Coruscant"], ["Outer Rim", "Yavin"]] },
  models: { mode: "approved", region: "Outer Rim", list: [
    { id: "astro", name: "Astromech Fast", ver: "r2-2026.3", desc: "Quick answers and short summaries", provider: "Kuat AI", powers: "Briefing titles", speed: "Fast", quality: "Good", cost: "$", where: "Yavin", on: true },
    { id: "arch", name: "Archivist Large", ver: "v4.2", desc: "Careful, longer answers for briefings", provider: "Kuat AI", powers: "Briefing summaries", speed: "Slower", quality: "Best", cost: "$$$", where: "Yavin", on: true },
    { id: "holo", name: "Holocron Open", ver: "h-7b", desc: "Fast, low-cost search answers", provider: "Outer Rim Labs", powers: "Holonet search assist", speed: "Fast", quality: "Good", cost: "$", where: "Mid Rim", outside: true, on: true }
  ] },
  usage: { used: 4120, budget: 6000, forecast: 5900, requests: 18400, saved: 310, groups: [
    { id: "rogue1", name: "Rogue One", cc: "CC-114", req: 7900, credits: 1980, budget: 2000, spike: "3× usual on 20 Nov" },
    { id: "red", name: "Red Squadron", cc: "CC-108", req: 5200, credits: 1040, budget: 1500 },
    { id: "eng", name: "Base Engineering", cc: "CC-201", req: 3100, credits: 720, budget: 1500 },
    { id: "log", name: "Logistics", cc: "CC-305", req: 2200, credits: 380, budget: 1000 }
  ] },
  safety: { strength: "standard", topics: ["Hyperdrive schematics", "Base coordinates", "Fleet movements"], resolved: 23, reports: [
    { id: "s1", kind: "Blocked by mistake", text: "Asked for the supply drop's coordinates on Hoth. It was blocked.", who: "Wedge Antilles", when: "21 Nov", feature: "Holonet search assist", matched: "Base coordinates", open: true },
    { id: "s2", kind: "Wrong facts", text: "Summary said the trench run was on Endor.", who: "Biggs Darklighter", when: "20 Nov", feature: "Briefing summaries", open: true },
    { id: "s3", kind: "Wrong facts", text: "Listed the wrong hangar for Gold Squadron.", who: "Hobbie Klivian", when: "19 Nov", feature: "Holonet search assist", open: true },
    { id: "s4", kind: "Tone", text: "The answer was curt with a new recruit.", who: "Cal Alder", when: "18 Nov", feature: "Holonet search assist", open: true }
  ] },

  /* ---------- Compliance ---------- */
  events: [
    { id: "e1", time: "09:42:10", date: "Nov 22", actor: "Toryn Farr", type: "Admin", text: "Toryn Farr removed Cal Alder from Shield Ops", code: "group.member.remove", target: "Shield Ops · group", ok: true },
    { id: "e2", time: "09:40:55", ms: ".312", date: "Nov 22", actor: "archive-sync", type: "API key", text: "archive-sync tried to download Death Star plans.pdf", code: "file.download", target: "Death Star plans · archive", ok: false, reason: "no access",
      ctx: { ip: "10.4.22.8", where: "Outer Rim relay · new for this key", ua: "archive-sync/2.3 python-requests", session: "ses_41c9e2 · started 08:58:30", req: "req_7f3a90b1 · also in Storage service" }, why: "Blocked because the key's scopes don't include Death Star plans · archive." },
    { id: "e3", time: "09:40:51", date: "Nov 22", actor: "archive-sync", type: "API key", text: "archive-sync tried to download Death Star plans.pdf", code: "file.download", target: "Death Star plans · archive", ok: false, reason: "no access" },
    { id: "e4", time: "09:40:48", date: "Nov 22", actor: "archive-sync", type: "API key", text: "archive-sync tried to open Death Star plans · archive", code: "folder.open", target: "Death Star plans · archive", ok: false, reason: "no access" },
    { id: "e5", time: "09:31:02", date: "Nov 22", actor: "Retention rule", type: "Automation", text: "Retention rule deleted 212 expired files", code: "retention.purge", target: "Trash", ok: true },
    { id: "e6", time: "09:14:00", date: "Nov 22", actor: "Holonet sync bot", type: "System", text: "Holonet sync bot saved a new version of Hoth evacuation plan.docx", code: "file.version.create", target: "Hoth evacuation plan.docx", ok: true },
    { id: "e7", time: "08:58:30", date: "Nov 22", actor: "archive-sync", type: "API key", text: "archive-sync signed in from a new IP address", code: "auth.token.use", target: "10.4.22.8", ok: true },
    { id: "e8", time: "17:20:04", ms: ".880", date: "Nov 21", actor: "Toryn Farr", type: "Admin", text: "Toryn Farr changed archive-sync's API key settings", code: "apikey.update", target: "archive-sync · API key", ok: true,
      changes: [["Allowed IPs", "Echo Base network", "Any IP address", "Changed"], ["Expires", "31 Dec 2026", "Never", "Changed"], ["Secret", null, "Rotated · value not shown", "Rotated"]],
      ctx: { ip: "10.0.1.14 · Echo Base", ua: "Console · Chrome 131", req: "req_2b81c4de" } },
    { id: "e9", time: "22:14:03", date: "Nov 20", actor: "archive-sync", type: "API key", text: "archive-sync tried to open Death Star plans · archive", code: "folder.open", target: "Death Star plans · archive", ok: false, reason: "no access", old: 2 },
    { id: "e10", time: "03:02:41", date: "Nov 18", actor: "archive-sync", type: "API key", text: "archive-sync tried to download Kyber shipments.xlsx", code: "file.download", target: "Kyber logistics", ok: false, reason: "no access", old: 4 },
    { id: "e11", time: "11:20:09", date: "Nov 17", actor: "archive-sync", type: "API key", text: "archive-sync tried to export the member list", code: "people.export", target: "People", ok: false, reason: "no access", old: 5 }
  ],
  views: [],
  streams: [
    { id: "splunk", name: "Security SIEM", dest: "Splunk", what: "all events", state: "healthy", last: "4 seconds ago", rate: "1.2M events an hour" },
    { id: "s3", name: "Archive bucket", dest: "Amazon S3", what: "failed and admin events only", state: "delayed", delay: 14, buffered: 38210, since: "09:26 PT", bucket: "echo-base-audit" }
  ],
  alerts: [
    { id: "a1", name: "Admin role granted", builtin: true, when: "Any admin role grant", to: "Email · #sec-alerts", week: 2 },
    { id: "a2", name: "Mass deletion", builtin: true, when: "500+ files deleted in 10 min", to: "PagerDuty", week: 0 },
    { id: "a3", name: "New sign-in location", builtin: true, when: "Any new location", to: "Email", week: 41, muted: "Muted until 26 Nov · by Toryn Farr, 19 Nov: VPN rollout" }
  ],
  alertHistory: [
    { when: "Nov 21 · 17:20 PT", name: "Admin role granted", text: "Toryn Farr gave Cal Alder the Content admin role.", sent: "Sent to email, #sec-alerts" }
  ],
  policies: [
    { id: "hoth-ops", name: "Hoth operations · restricted", owner: "Mon Mothma", applies: "Echo Base / Operations", template: "Restricted data handling v3", review: "Every 90 days" },
    { id: "contractor", name: "Contractor access", owner: "Toryn Farr", applies: "Contractors group", template: "Contractor access v2", review: "Every 60 days" },
    { id: "hold", name: "Legal hold · Scarif inquiry", owner: "Gen. Madine", applies: "4 people, 2 folders", template: "Legal hold v1", review: "Until released" }
  ],
  templates: [
    { id: "restricted", name: "Restricted data handling", desc: "Restricted label, internal sharing only, 7-year retention.", owner: "Mon Mothma", initials: "MM", v: 3, required: "Required for Restricted folders",
      sets: [["Classification", "Restricted"], ["Sharing", "Internal only"], ["External links", "Off"], ["Retention", "7 years"]], review: 90 },
    { id: "contractor", name: "Contractor access", desc: "Time-bound access, no downloads, 60-day review.", owner: "Toryn Farr", initials: "TF", v: 2,
      sets: [["Access", "Time-bound, 30 days max"], ["Downloads", "Off"], ["Sharing", "Internal only"]], review: 60 },
    { id: "hold", name: "Legal hold", desc: "Preserves content and blocks deletion until released.", owner: "Gen. Madine", initials: "GM", v: 1,
      sets: [["Deletion", "Blocked"], ["Retention", "Until released"], ["Notice", "Custodians are told"]], review: 0 }
  ],
  builtinTemplates: ["Data retention, 7 years", "Public sharing off", "Guest access", "Device sign-in", "Export controls", "Two-person delete"],

  /* ---------- Billing ---------- */
  plan: { name: "Rebel Alliance Business", perSeat: 18, renews: "1 March 2027", cancelBy: "1 February 2027", period: "1 March 2026 – 28 February 2027", seats: 250, ai: { used: 64, of: 80 }, daysLeft: 99, card: { brand: "Visa", last4: "4417", exp: "12/26" } },
  deps: [["Operations", 99], ["Fleet", 82], ["Intelligence", 41], ["Engineering", 24]],
  invoices: [
    { id: "i3", date: "3 Jun 2026", what: "AI add-on, 80 seats", amount: 8640, status: "Paid" },
    { id: "i2", date: "14 Apr 2026", what: "2 seats removed in the first 30 days", amount: -432, status: "Refunded", credit: true },
    { id: "i1", date: "1 Mar 2026", what: "Annual renewal, 250 seats", amount: 54000, status: "Paid" }
  ],
  billingDetails: { entity: "Rebel Alliance · Echo Base", entities: 2, address: "Echo Base, North Ridge, Hoth", tax: "RA-VAT 4471 09", po: "PO-7781", contacts: "Mon Mothma, Lavanya Sienna" },

  /* ---------- Settings ---------- */
  integrations: [
    { id: "splunk", name: "Splunk", logo: "SP", state: "Connected", desc: "Streams audit events to the Security SIEM." },
    { id: "ledger", name: "Holonet Ledger", logo: "HL", state: "draft", desc: "Finance system for invoices and seat counts.", draft: { by: "Toryn Farr", step: 2, account: "rebel-finance@holonet" } },
    { id: "comms", name: "HoloComms", logo: "HC", state: "Connected", desc: "Sends alerts to #sec-alerts." },
    { id: "pd", name: "PagerDuty", logo: "PD", state: "Connected", desc: "Pages Security on-call." }
  ],
  connectorPolicy: "approved",
  connectors: [
    { id: "holonet", name: "Holonet Docs", publisher: "Echo Base", type: "Built-in", can: "Reads", status: "Published · everyone", published: true },
    { id: "mission", name: "Mission Board", publisher: "Corellian Systems", type: "Partner", can: "Reads and writes", status: "Published · 3 groups", published: true },
    { id: "supply", name: "Supply Depot", publisher: "Echo Base", type: "Built-in", can: "Reads and writes", status: "Published · Logistics", published: true },
    { id: "comms", name: "Comms Relay", publisher: "Bothan Networks", type: "Partner", can: "Reads", status: "Draft · tested Nov 20", published: false }
  ],
  connectorCatalog: [
    { id: "mission", name: "Mission Board", publisher: "Corellian Systems", label: "Verified partner", can: "Reads and writes" },
    { id: "comms", name: "Comms Relay", publisher: "Bothan Networks", label: "Verified partner", can: "Reads" },
    { id: "ledger-mcp", name: "Holonet Ledger", publisher: "Muunilinst Banking", label: "Verified partner", can: "Reads and writes" },
    { id: "droid", name: "Droid Workshop", publisher: "Industrial Automaton", label: "Community · not reviewed", can: "Reads" },
    { id: "fleetcmd", name: "Fleet Command", publisher: "Rebel Fleet Systems", label: "Verified partner", can: "Reads" },
    { id: "fleet", name: "Fleet Tracker", publisher: "Kessel Logistics", label: "Community · not reviewed", can: "Reads, writes and deletes", url: "https://mcp.fleettracker.kessel/mcp", runs: "Kessel Logistics servers · Outer Rim",
      published: false, connected: false, tested: false,
      tools: [
        { id: "search_ships", name: "Find ships", what: "Finds ships by name or route", kind: "read", on: "Chat · Agents", set: "allowed" },
        { id: "get_manifest", name: "Get manifest", what: "Shows what a ship is carrying", kind: "read", on: "Chat · Agents", set: "allowed" },
        { id: "list_routes", name: "List routes", what: "Lists routes and their status", kind: "read", on: "Chat", set: "allowed" },
        { id: "update_manifest", name: "Update manifest", what: "Changes what a ship is carrying", kind: "write", on: "Agents", set: "approval" },
        { id: "reroute_ship", name: "Reroute ship", what: "Sends a ship on a different route", kind: "write", on: "Agents", set: "approval" },
        { id: "cancel_shipment", name: "Cancel shipment", what: "Cancels a shipment for good", kind: "delete", on: "Off", set: "blocked" }
      ],
      laterTool: { id: "hold_shipment", name: "Hold shipment", what: "Stops a shipment from leaving", kind: "write", on: "Agents", set: null, isNew: true }
    }
  ]
};
