/*
  Admin Consoles — category + screenshot data.

  To add a screenshot:
    1. Drop the image in  screens/<category-slug>/  (PNG, JPG or WebP).
    2. Add an entry to that category's `screens` array:

       {
         src: "screens/user-management/okta-add-person.png",
         product: "Okta",
         title: "Add person modal",
         pattern: "Invite / add user",        // should match one of the category's patterns
         notes: "Activation choice lives inline, not in a second step.",
         source: "https://help.okta.com/..."   // optional, where it came from
       }

  `thumb` picks the monochrome wireframe drawn on the home page card.
*/

window.GROUPS = [
  { id: "people",     name: "People & access",          blurb: "Who is in the org and what they can touch." },
  { id: "content",    name: "Content & assets",         blurb: "The things admins own, move and clean up." },
  { id: "actions",    name: "Actions & flows",          blurb: "Create, edit, delete, at one or a thousand rows." },
  { id: "governance", name: "Governance & compliance",  blurb: "Rules, records and proof that the rules held." },
  { id: "platform",   name: "Platform & configuration", blurb: "Plans, plumbing and org-wide settings." },
  { id: "foundations",name: "Foundations",              blurb: "Cross-cutting UI every console leans on." }
];

window.CATEGORIES = [
  /* ---------- People & access ---------- */
  {
    slug: "user-management",
    name: "User management",
    group: "people",
    thumb: "userTable",
    summary: "Directories of people: invite, add, edit, suspend, offboard.",
    patterns: [
      ["Invite / add user", "Single add, email invite, magic link"],
      ["User directory", "Table of members with status and role"],
      ["User detail", "Profile, access, devices, activity in one place"],
      ["Edit profile", "Inline vs. drawer vs. full-page edit"],
      ["Suspend / deactivate", "Reversible removal of access"],
      ["Offboarding", "Transfer ownership, revoke sessions, delete"],
      ["Pending invites", "Resend, revoke, expired states"]
    ],
    screens: []
  },
  {
    slug: "roles-permissions",
    name: "Roles & permissions",
    group: "people",
    thumb: "matrix",
    summary: "Role catalogs, permission matrices, custom roles and scoped access.",
    patterns: [
      ["Role catalog", "Built-in vs. custom roles"],
      ["Permission matrix", "Capabilities × roles grid"],
      ["Create custom role", "Clone from existing, pick capabilities"],
      ["Assign role", "From the user, or from the role"],
      ["Scoped access", "Per workspace, folder or resource"],
      ["Effective permissions", "Explain why someone can do something"]
    ],
    screens: []
  },
  {
    slug: "groups-teams",
    name: "Groups & teams",
    group: "people",
    thumb: "groups",
    summary: "Groups, teams, departments and the membership rules behind them.",
    patterns: [
      ["Create group", "Name, owners, visibility"],
      ["Manage members", "Add, remove, change owner"],
      ["Dynamic groups", "Rule-based membership"],
      ["Nested groups", "Hierarchy and inheritance"],
      ["Directory sync", "SCIM / HRIS-sourced groups, read-only states"]
    ],
    screens: []
  },
  {
    slug: "security-identity",
    name: "Security & identity",
    group: "people",
    thumb: "toggles",
    summary: "SSO, SAML, MFA, password policy, sessions and devices.",
    patterns: [
      ["SSO setup", "SAML / OIDC configuration wizard"],
      ["MFA enforcement", "Org-wide and per-group rules"],
      ["Session management", "Active sessions, force sign-out"],
      ["Domain verification", "DNS record flows"],
      ["Device management", "Trusted devices, revoke"],
      ["IP allowlists", "Network restrictions"]
    ],
    screens: []
  },
  {
    slug: "access-requests",
    name: "Access requests & approvals",
    group: "people",
    thumb: "approvals",
    summary: "Request, review, approve or deny, with a paper trail.",
    patterns: [
      ["Request access", "Requester-side form and status"],
      ["Approval queue", "Pending, approved, denied tabs"],
      ["Review detail", "Context to make the call"],
      ["Time-bound access", "Expiring grants"],
      ["Access reviews", "Periodic certification campaigns"]
    ],
    screens: []
  },

  /* ---------- Content & assets ---------- */
  {
    slug: "asset-management",
    name: "Asset management",
    group: "content",
    thumb: "assetGrid",
    summary: "Files, libraries and content collections the org owns.",
    patterns: [
      ["Asset library", "Grid and list views of org content"],
      ["Asset detail", "Metadata, versions, sharing, owner"],
      ["Transfer ownership", "Reassign when people leave"],
      ["Sharing controls", "Internal, external, link settings"],
      ["Versions & restore", "History and rollback"],
      ["Tags & metadata", "Taxonomy management"]
    ],
    screens: []
  },
  {
    slug: "storage-quotas",
    name: "Storage & quotas",
    group: "content",
    thumb: "meters",
    summary: "Capacity, limits, usage by user and cleanup tools.",
    patterns: [
      ["Storage overview", "Used vs. available"],
      ["Per-user quotas", "Set and override limits"],
      ["Largest items", "Find what to clean up"],
      ["Trash & recovery", "Soft-deleted content, retention window"]
    ],
    screens: []
  },
  {
    slug: "knowledge-content",
    name: "Knowledge & content sources",
    group: "content",
    thumb: "sources",
    summary: "Connected sources, indexing status and what AI can see.",
    patterns: [
      ["Add content source", "Connect a drive, site or repository"],
      ["Sync status", "Indexed, syncing, failed"],
      ["Source permissions", "Respecting upstream access"],
      ["Content exclusions", "Keep things out of search or AI"]
    ],
    screens: []
  },

  /* ---------- Actions & flows ---------- */
  {
    slug: "creation-flows",
    name: "Creation flows",
    group: "actions",
    thumb: "wizard",
    summary: "Creating workspaces, projects, policies and anything else new.",
    patterns: [
      ["Create modal", "Small objects, few fields"],
      ["Multi-step wizard", "Stepped setup with review"],
      ["Create from template", "Start from a preset"],
      ["Inline create", "Add a row right in the table"],
      ["Duplicate / clone", "Copy settings from existing"],
      ["Success & next steps", "What happens after create"]
    ],
    screens: []
  },
  {
    slug: "edit-bulk-actions",
    name: "Edit & bulk actions",
    group: "actions",
    thumb: "bulkBar",
    summary: "Selecting many rows and changing them safely.",
    patterns: [
      ["Selection model", "Checkboxes, select all, select across pages"],
      ["Contextual action bar", "Actions that appear on selection"],
      ["Bulk edit", "Change one field across many"],
      ["Inline edit", "Edit in place in the table"],
      ["Progress & results", "Long-running jobs, partial failures"]
    ],
    screens: []
  },
  {
    slug: "destructive-actions",
    name: "Destructive actions",
    group: "actions",
    thumb: "confirm",
    summary: "Delete, revoke, archive, reset: confirmations and recovery.",
    patterns: [
      ["Delete confirmation", "Consequences spelled out"],
      ["Type-to-confirm", "Name the thing to delete it"],
      ["Archive vs. delete", "Offering the softer option"],
      ["Undo toast", "Recover without a dialog"],
      ["Cascading impact", "What else goes with it"],
      ["Danger zone", "Settings section for irreversible actions"]
    ],
    screens: []
  },
  {
    slug: "import-export",
    name: "Import & export",
    group: "actions",
    thumb: "upload",
    summary: "CSV uploads, field mapping, validation and data exports.",
    patterns: [
      ["CSV import", "Upload, template download"],
      ["Field mapping", "Match columns to fields"],
      ["Validation & errors", "Row-level error reporting"],
      ["Export", "Format, scope, delivery"]
    ],
    screens: []
  },

  /* ---------- Governance & compliance ---------- */
  {
    slug: "policies",
    name: "Policies & rules",
    group: "governance",
    thumb: "rules",
    summary: "Retention, DLP, sharing and conditional rules.",
    patterns: [
      ["Policy list", "Status, scope, priority"],
      ["Policy builder", "If / then condition editors"],
      ["Retention policies", "Keep and delete schedules"],
      ["Legal hold", "Preserve content for matters"],
      ["Scope & targeting", "Who and what a policy applies to"],
      ["Simulate / test", "Preview impact before enforcing"]
    ],
    screens: []
  },
  {
    slug: "audit-logs",
    name: "Audit logs & activity",
    group: "governance",
    thumb: "timeline",
    summary: "Who did what, when, and how to find it again.",
    patterns: [
      ["Audit log table", "Actor, action, target, time"],
      ["Event detail", "Before / after values"],
      ["Filters & saved views", "Narrowing large logs"],
      ["Export & SIEM streaming", "Getting logs out"],
      ["Alerts on events", "Notify on risky actions"]
    ],
    screens: []
  },
  {
    slug: "ai-governance",
    name: "AI governance",
    group: "governance",
    thumb: "aiControls",
    summary: "Controls for AI features: availability, data use and oversight.",
    patterns: [
      ["Feature availability", "Turn AI on per group or app"],
      ["Data usage controls", "Training, retention, residency"],
      ["Model & provider settings", "Which models are allowed"],
      ["Usage & cost", "Who is using AI, how much"],
      ["Content safety", "Filters, blocked topics, review"]
    ],
    screens: []
  },

  /* ---------- Platform & configuration ---------- */
  {
    slug: "billing-licenses",
    name: "Billing & licenses",
    group: "platform",
    thumb: "seats",
    summary: "Plans, seats, license assignment and invoices.",
    patterns: [
      ["Plan overview", "Current plan, renewal, upgrade"],
      ["Seat assignment", "Assign and reclaim licenses"],
      ["Add seats", "Purchase flows with proration"],
      ["Invoices & payment", "History and methods"]
    ],
    screens: []
  },
  {
    slug: "integrations-api",
    name: "Integrations & API keys",
    group: "platform",
    thumb: "keys",
    summary: "Connected apps, OAuth grants, API keys and webhooks.",
    patterns: [
      ["Integration catalog", "Browse and connect"],
      ["App permissions", "Review and revoke grants"],
      ["Create API key", "Scopes, expiry, reveal once"],
      ["Webhooks", "Endpoints, events, delivery logs"]
    ],
    screens: []
  },
  {
    slug: "settings",
    name: "Org settings",
    group: "platform",
    thumb: "settings",
    summary: "Settings layout, org profile, defaults and branding.",
    patterns: [
      ["Settings navigation", "Left nav vs. tabs vs. search"],
      ["Org profile", "Name, domain, logo"],
      ["Defaults", "Org-wide defaults with overrides"],
      ["Save patterns", "Autosave vs. explicit save bar"],
      ["Inherited settings", "Locked by parent, override"]
    ],
    screens: []
  },
  {
    slug: "usage-analytics",
    name: "Usage & insights",
    group: "platform",
    thumb: "chart",
    summary: "Admin dashboards for adoption, activity and health.",
    patterns: [
      ["Admin home", "At-a-glance health and to-dos"],
      ["Adoption metrics", "Active users, feature usage"],
      ["Reports", "Scheduled and downloadable"],
      ["Recommendations", "Suggested actions for admins"]
    ],
    screens: []
  },
  {
    slug: "notifications",
    name: "Notifications & alerts",
    group: "platform",
    thumb: "alerts",
    summary: "System alerts, admin notices and notification settings.",
    patterns: [
      ["Alert center", "Security and system alerts"],
      ["Banners", "Org-wide notices and incidents"],
      ["Notification rules", "Who gets notified of what"],
      ["Announcements", "Admin-to-user messaging"]
    ],
    screens: []
  },

  /* ---------- Foundations ---------- */
  {
    slug: "tables-grids",
    name: "Tables & data grids",
    group: "foundations",
    thumb: "dataTable",
    summary: "Dense tables: columns, sorting, pagination, density.",
    patterns: [
      ["Column management", "Show, hide, reorder, resize"],
      ["Sorting & pagination", "Server-side large datasets"],
      ["Row actions", "Overflow menus, hover actions"],
      ["Density", "Compact vs. comfortable"],
      ["Expandable rows", "Detail without leaving the list"]
    ],
    screens: []
  },
  {
    slug: "search-filtering",
    name: "Search & filtering",
    group: "foundations",
    thumb: "filters",
    summary: "Finding the one row among millions.",
    patterns: [
      ["Filter bar", "Chips, dropdowns, clear all"],
      ["Advanced query", "Builder or query language"],
      ["Saved views", "Personal and shared views"],
      ["Global admin search", "Jump to any user, setting, object"]
    ],
    screens: []
  },
  {
    slug: "empty-onboarding",
    name: "Empty states & onboarding",
    group: "foundations",
    thumb: "empty",
    summary: "First run, setup checklists and nothing-here-yet moments.",
    patterns: [
      ["Setup checklist", "Guided first-run tasks"],
      ["Empty table", "Explain and offer the first action"],
      ["No results", "Recover from a filter that found nothing"],
      ["Permission empty state", "You can't see this, here's why"]
    ],
    screens: []
  }
];
