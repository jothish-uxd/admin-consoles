/* Guidance for the Governance & compliance group.
   Same shape as guidance.js. Tags: WCAG 2.2 success criteria or UD principles. */

Object.assign(window.WCAG, {
  "1.3.2": "Meaningful Sequence",
  "2.4.1": "Bypass Blocks"
});

Object.assign(window.GUIDANCE, {

  /* ------------------------------------------------------------------ */
  "policies": {
    scale: {
      intro: "Policies are rules that act on their own, across everyone, every day. A retention rule deletes content nobody looked at; a sharing rule blocks a sales rep mid-deal; a hold keeps data a lawyer will need in two years. Because policies run unattended at scale, the design job is to make their effect predictable before they’re switched on, explainable while they run, and traceable afterward. In regulated orgs the policy screen is also evidence that controls exist.",
      tiers: [
        ["Tens", "A few on/off settings with sensible defaults. Admins rarely think of them as policies."],
        ["Thousands", "Policies target groups and content types. Conflicts appear, and admins need to know which rule wins."],
        ["Hundreds of thousands", "Hundreds of policies across regions and regulations, managed by compliance teams, changed through review, simulated before enforcement, and reported to auditors."]
      ],
      principles: [
        "Simulate before enforcing. Show who and what a policy would affect before it affects anyone.",
        "Make precedence explicit. When policies conflict, the UI says which wins and why.",
        "Holds beat retention, and retention beats deletion. No user or admin action should silently override a hold.",
        "Separate who writes policy from who approves it for high-impact rules.",
        "Version every policy and keep its history. Auditors ask what the rule was on a given date."
      ]
    },
    patterns: {
      "Policy list": {
        think: [
          "The list answers ‘what rules are in effect, on whom, and are they working?’",
          "Order and precedence often matter. The list may be the place where priority is set."
        ],
        do: [
          "Show each policy’s name, type, status (draft, simulating, enforced, off), scope and last change.",
          "Show priority order where it affects outcomes, and allow reordering with a clear explanation.",
          "Filter by type, status, scope and owner.",
          "Show recent matches or actions per policy, so admins know it’s doing something."
        ],
        dont: [
          "Don’t show only on/off switches with no scope or status.",
          "Don’t let drag-and-drop be the only way to change priority.",
          "Don’t hide disabled or draft policies in a separate place."
        ],
        access: [
          ["WCAG 1.3.1", "Use a table with headers so status and scope are announced with each policy."],
          ["WCAG 2.1.1", "Reordering priority works with keyboard controls, such as move up and move down."],
          ["WCAG 1.3.2", "Visual order matches priority order in the code, so screen readers get the same sequence."],
          ["UD 4", "Status is stated in words alongside any icon."]
        ],
        scale: [
          "Compliance teams manage hundreds of policies. Support grouping by regulation or region, and search.",
          "Show policy health: errors, unusual match volumes, or policies that never match.",
          "Export the full policy set for audit evidence."
        ]
      },

      "Policy builder": {
        think: [
          "A policy is ‘when this happens, to these things, do that’. The builder should read like that sentence.",
          "Admins writing policies are often compliance specialists, not engineers. Avoid query languages as the only option."
        ],
        do: [
          "Structure the builder as conditions, scope and actions, with a plain-language summary that updates as it’s built.",
          "Offer templates for common policies, such as ‘Block external sharing of labelled content’.",
          "Validate conflicts and unreachable conditions as the policy is edited.",
          "Save as draft, and require simulation before enforcement."
        ],
        dont: [
          "Don’t make the raw rule syntax the only editor.",
          "Don’t allow enforcing a policy with no scope.",
          "Don’t let a policy edit apply instantly to everyone without review."
        ],
        access: [
          ["WCAG 3.3.2", "Every condition has visible labels for field, operator and value."],
          ["WCAG 4.1.3", "Announce the updated plain-language summary and validation results."],
          ["WCAG 2.1.1", "Adding, removing and reordering conditions works by keyboard."],
          ["UD 3", "The plain-language summary lets anyone check the rule’s meaning."]
        ],
        scale: [
          "Policies may be evaluated millions of times a day. Warn about expensive conditions.",
          "Support policy as code export, so rules can be reviewed in version control.",
          "Require approval workflows for policies with broad scope."
        ]
      },

      "Retention policies": {
        think: [
          "Retention answers two questions: how long must we keep this, and when must we delete it? Regulations often require both.",
          "Retention deletes data automatically. Mistakes are permanent and may themselves be compliance violations."
        ],
        do: [
          "Define retention by content type, location or label, with a period and an end action: delete, review or keep.",
          "Show how much content each policy currently covers and what will be deleted soon.",
          "Allow disposition review, where an owner confirms before deletion.",
          "Explain how retention interacts with holds and with user deletion."
        ],
        dont: [
          "Don’t shorten a retention period without showing how much content becomes eligible for deletion immediately.",
          "Don’t delete content under legal hold.",
          "Don’t let users permanently delete content that must be retained."
        ],
        access: [
          ["WCAG 3.3.4", "Show a review before enabling a policy that will delete content."],
          ["WCAG 3.3.2", "Explain periods in plain terms, such as ‘7 years after last modified’."],
          ["UD 5", "Disposition review gives a human checkpoint before irreversible deletion."]
        ],
        scale: [
          "Retention runs on billions of items. Process in batches, report progress and failures.",
          "Keep a record of what was deleted, when and under which policy.",
          "Handle different regulations by region, with clear mapping from policy to regulation."
        ]
      },

      "Legal hold": {
        think: [
          "A hold preserves everything relevant to a legal matter, overriding retention and deletion, until it’s released.",
          "Holds are usually managed by legal teams, not IT. The language and workflow should fit them."
        ],
        do: [
          "Organise holds by matter, with custodians, data sources, date ranges and keywords.",
          "Show what each hold preserves, with counts, and confirm when preservation is active.",
          "Notify custodians where required, and track acknowledgements.",
          "Make releasing a hold a deliberate step with review."
        ],
        dont: [
          "Don’t let hold status be invisible to admins trying to delete content or offboard people.",
          "Don’t release holds automatically.",
          "Don’t let deleting a user remove held content."
        ],
        access: [
          ["WCAG 2.4.6", "Use headings for matter details, custodians, sources and status."],
          ["WCAG 1.3.1", "Custodian lists are tables with acknowledgement status in its own column."],
          ["UD 4", "Show hold status in words wherever held content or custodians appear."]
        ],
        scale: [
          "Large matters cover thousands of custodians and petabytes. Apply holds as jobs with confirmation of coverage.",
          "Check holds in every destructive workflow: offboarding, retention, trash, storage cleanup.",
          "Keep a defensible audit trail of hold creation, changes and release."
        ]
      },

      "Scope & targeting": {
        think: [
          "Scope decides who and what a policy affects. Getting it wrong is the most common policy error.",
          "Scopes combine groups, locations, labels and exclusions. Admins need to see the result, not just the inputs."
        ],
        do: [
          "Let admins include and exclude by group, user, location and content type.",
          "Show the resulting count of people and items in scope.",
          "Let admins check whether a specific person or item is in scope, and why.",
          "Support dynamic scopes that follow group membership."
        ],
        dont: [
          "Don’t make ‘everyone’ the default scope for restrictive policies.",
          "Don’t hide exclusions in a separate tab.",
          "Don’t allow overlapping scopes without showing which policy wins."
        ],
        access: [
          ["WCAG 3.3.2", "Label include and exclude lists clearly."],
          ["WCAG 4.1.3", "Announce updated counts as the scope changes."],
          ["UD 5", "Show the count before saving, so overly broad scopes are caught."]
        ],
        scale: [
          "Evaluate scope on the server and cache it, with ‘last evaluated’ shown.",
          "Support adaptive scopes based on attributes such as department or location.",
          "Report scope changes over time for audit."
        ]
      },

      "Simulate / test": {
        think: [
          "Simulation shows what a policy would do, without doing it. It turns a risky switch into a reviewable report.",
          "Simulation is only useful if it runs against real data and reports in terms admins understand."
        ],
        do: [
          "Run the policy in simulation mode against real data and report matches.",
          "Show sample matches so admins can check them for false positives.",
          "Compare simulation results with expectations, such as ‘matched 4,200 items, expected about 500’.",
          "Promote from simulation to enforcement in one step, with the results attached."
        ],
        dont: [
          "Don’t let simulation take actions, including notifications.",
          "Don’t report only a total count with no examples.",
          "Don’t skip simulation for broad-scope policies."
        ],
        access: [
          ["WCAG 4.1.3", "Announce when a simulation completes and its headline result."],
          ["WCAG 1.3.1", "Sample matches are presented as a table."],
          ["UD 5", "Simulation makes the cost of a bad rule visible before it does damage."]
        ],
        scale: [
          "Simulations over large data take time. Run as jobs and notify when done.",
          "Keep simulation results as evidence for change approvals.",
          "Re-run simulations periodically for enforced policies to watch for drift."
        ]
      }
    }
  },

  /* ------------------------------------------------------------------ */
  "audit-logs": {
    scale: {
      intro: "The audit log is the console’s memory. Security teams use it to investigate incidents, compliance teams use it as evidence, and admins use it to answer ‘who changed this?’ At enterprise size it holds billions of events, so finding the right ten matters more than showing all of them. Logs also leave the product: most large orgs stream them to a SIEM and expect them to be complete, consistent and tamper-evident.",
      tiers: [
        ["Tens", "A simple list of recent admin changes, searchable by person."],
        ["Thousands", "Filters by actor, action, target and time. Exports for audits. Retention periods matter."],
        ["Hundreds of thousands", "Billions of events, streamed to SIEM tools, retained for years, queried by security teams, with alerts on risky events."]
      ],
      principles: [
        "Every event has the same core fields: who, what, which target, when, from where, and the result.",
        "Log admin and system actions, not only user actions. Automation must be traceable too.",
        "Make logs tamper-evident and retained according to policy. Admins can’t edit or delete them.",
        "Use consistent, documented event names across the product and API.",
        "Design for investigation: pivot from one event to related events by actor, target or session."
      ]
    },
    patterns: {
      "Audit log table": {
        think: [
          "The table is for scanning and narrowing down. Each row must be readable without opening it.",
          "Time is the main axis, but most investigations start from a person or object."
        ],
        do: [
          "Show time, actor, action, target and result in each row, in plain language.",
          "Show times in the admin’s time zone, with the zone labelled, and exact time on demand.",
          "Let admins click an actor or target to filter by it.",
          "Show the actor type: person, admin, API key, automation or system."
        ],
        dont: [
          "Don’t show raw event codes as the main description.",
          "Don’t use relative times only (‘2 hours ago’) in an investigation tool.",
          "Don’t hide failed attempts. Failures are often the most important events."
        ],
        access: [
          ["WCAG 1.3.1", "Use a table with column headers for time, actor, action, target and result."],
          ["WCAG 1.4.1", "Result states such as success and failure use text, not only colour."],
          ["WCAG 2.4.1", "Provide a way to skip past filters to the results."],
          ["UD 4", "Write each event as a short sentence, such as ‘Priya Shah removed Alex Chen from Admins’."]
        ],
        scale: [
          "Query billions of events with indexed search and time-bounded queries.",
          "Use cursor pagination and stable ordering for long investigations.",
          "Show query limits and how to narrow results when they’re exceeded."
        ]
      },

      "Event detail": {
        think: [
          "The detail answers ‘exactly what changed?’ Before and after values are the heart of it.",
          "Investigators need context: the session, IP address, device and related events."
        ],
        do: [
          "Show before and after values for changes, clearly marked.",
          "Show context: IP, location, user agent, session and request ID.",
          "Link to related events by the same actor, session or target.",
          "Offer the raw event as JSON for technical users."
        ],
        dont: [
          "Don’t show only ‘Settings changed’ without what changed.",
          "Don’t show secrets or passwords in before and after values.",
          "Don’t make the raw JSON the only view."
        ],
        access: [
          ["WCAG 1.3.1", "Present before and after values in a table with labelled columns."],
          ["WCAG 1.4.1", "Mark changes with text labels or symbols, not only colour highlights."],
          ["WCAG 2.4.6", "Use headings for summary, changes, context and related events."]
        ],
        scale: [
          "Large changes such as bulk actions summarise in one event with a link to the full list.",
          "Keep event schemas versioned so old events remain readable.",
          "Correlate across services using shared request or session IDs."
        ]
      },

      "Filters & saved views": {
        think: [
          "Investigations repeat. Security teams look for the same patterns again and again.",
          "Filters must be precise enough for an investigation and simple enough for a quick check."
        ],
        do: [
          "Filter by time range, actor, action type, target, result and IP.",
          "Offer quick filters for common questions, such as ‘Admin role changes’ or ‘Failed sign-ins’.",
          "Save views and share them with other admins.",
          "Put active filters in the URL so investigations can be shared by link."
        ],
        dont: [
          "Don’t default to an unbounded time range on large logs.",
          "Don’t lose filters when opening an event and coming back.",
          "Don’t hide active filters."
        ],
        access: [
          ["WCAG 3.3.2", "Label date range fields with the expected format."],
          ["WCAG 4.1.3", "Announce result counts when filters change."],
          ["UD 2", "Offer quick filters for common checks and detailed filters for investigations."]
        ],
        scale: [
          "Require time bounds on very large queries, and suggest narrowing when results exceed limits.",
          "Run heavy queries asynchronously and notify when ready.",
          "Provide a query language for security teams alongside the visual filters."
        ]
      },

      "Export & SIEM streaming": {
        think: [
          "In large orgs, the audit log’s main consumer isn’t the console UI; it’s the security team’s SIEM.",
          "Exports and streams must be complete, ordered and in a documented format."
        ],
        do: [
          "Export filtered results as CSV or JSON, run as a job for large ranges.",
          "Offer streaming to common SIEM and storage destinations, with setup steps.",
          "Show stream health: last event delivered, delays and failures.",
          "Document the event schema and changes to it."
        ],
        dont: [
          "Don’t drop events silently when a destination is down. Buffer and retry.",
          "Don’t change event formats without versioning and notice.",
          "Don’t let any admin export the full log. Restrict it by role."
        ],
        access: [
          ["WCAG 3.3.2", "Explain each destination’s required settings in labels and help text."],
          ["WCAG 1.4.1", "Stream health uses text, not only coloured indicators."],
          ["UD 4", "State delays and gaps in plain words, such as ‘Events delayed by 14 minutes’."]
        ],
        scale: [
          "Handle millions of events per hour with backpressure and replay.",
          "Allow filtering what is streamed, to control volume and cost.",
          "Log exports and stream configuration changes themselves."
        ]
      },

      "Alerts on events": {
        think: [
          "Alerts turn the audit log from a record into a warning system for risky actions.",
          "Too many alerts get ignored. Precision matters more than coverage."
        ],
        do: [
          "Offer built-in alerts for high-risk events, such as admin role grants or mass deletion.",
          "Let admins create alerts from a saved filter, with thresholds.",
          "Send alerts to email, chat and incident tools, with a link to the matching events.",
          "Show alert history and let admins mute or tune noisy alerts."
        ],
        dont: [
          "Don’t alert on every event of a type with no threshold.",
          "Don’t send alerts without a link to the events.",
          "Don’t let alerts be turned off without a record."
        ],
        access: [
          ["WCAG 3.3.2", "Explain thresholds and time windows with examples."],
          ["WCAG 2.2.1", "In-product alert banners stay until dismissed."],
          ["UD 4", "Alert messages state what happened, who and when, in a sentence."]
        ],
        scale: [
          "Evaluate alerts on streams in near real time.",
          "Group repeated alerts into one incident.",
          "Route alerts by scope, so regional admins receive their own."
        ]
      }
    }
  },

  /* ------------------------------------------------------------------ */
  "ai-governance": {
    scale: {
      intro: "AI features read org data, generate content, and increasingly take actions. Admins need to decide who gets them, what data they can use, which models are allowed, what it costs, and how output is checked. At enterprise size these decisions differ by region, department and regulation, and they change quickly as models and rules change. The console has to make AI controllable without making it unusable.",
      tiers: [
        ["Tens", "One switch to turn AI features on or off for the org."],
        ["Thousands", "AI is enabled for some groups first. Admins set data rules and watch usage and cost."],
        ["Hundreds of thousands", "Controls by region and department, approved model lists, data residency, usage budgets, content safety rules, and audit records that satisfy regulators."]
      ],
      principles: [
        "AI only sees what the person using it is allowed to see.",
        "Be explicit about data use: what is sent where, whether it’s stored, and whether it’s used for training.",
        "Roll out by group, with the ability to turn off quickly.",
        "Make AI activity auditable: who used which feature, on what data, with what result.",
        "Explain AI controls in plain language. Admins are making decisions their legal and security teams will ask about."
      ]
    },
    patterns: {
      "Feature availability": {
        think: [
          "Admins need to decide which AI features are on, for whom, and when.",
          "Many orgs want to pilot with a small group, then expand."
        ],
        do: [
          "List AI features with a short description, status and who has access.",
          "Enable by group or org unit, with a default for new features.",
          "Tell admins about new AI features before they’re turned on.",
          "Explain what users will see when a feature is off."
        ],
        dont: [
          "Don’t turn on new AI features by default for orgs that have chosen to opt in manually.",
          "Don’t bundle unrelated AI features under one switch.",
          "Don’t make AI controls hard to find."
        ],
        access: [
          ["WCAG 4.1.2", "Toggles expose their state, such as ‘On for 3 groups’, to assistive tech."],
          ["WCAG 3.3.2", "Each feature has a plain-language description of what it does."],
          ["UD 3", "Group AI controls in one place."]
        ],
        scale: [
          "Manage availability by policy across regions and departments.",
          "Report adoption by group to support rollout decisions.",
          "Provide a quick org-wide off switch for incidents."
        ]
      },

      "Data usage controls": {
        think: [
          "The first question security and legal teams ask is what happens to data sent to AI.",
          "Admins need to answer confidently: where data goes, how long it’s kept, and whether it trains models."
        ],
        do: [
          "State clearly whether data is used for training, how long prompts and outputs are retained, and where they’re processed.",
          "Let admins set retention for AI interactions, and choose data residency where offered.",
          "Allow excluding sensitive content or labels from AI processing.",
          "Link to the detailed data processing terms."
        ],
        dont: [
          "Don’t bury data use answers in legal documents.",
          "Don’t change data use terms without notice.",
          "Don’t send content to AI features that the person couldn’t open."
        ],
        access: [
          ["WCAG 3.3.2", "Explain each setting in plain language, with consequences."],
          ["WCAG 2.4.4", "Links to terms say what document they open."],
          ["UD 4", "Lead with direct answers, such as ‘Not used for training’."]
        ],
        scale: [
          "Different regions need different residency and retention settings.",
          "Honour sensitivity labels automatically across all AI features.",
          "Keep records of settings changes for compliance."
        ]
      },

      "Model & provider settings": {
        think: [
          "Some orgs need control over which models and providers are used, for compliance, cost or quality.",
          "Most admins don’t want to manage models. Provide good defaults and controls for those who do."
        ],
        do: [
          "Show which models and providers power each feature.",
          "Let admins restrict to approved models or providers.",
          "Explain trade-offs in plain terms: speed, quality, cost and data location.",
          "Announce model changes ahead of time."
        ],
        dont: [
          "Don’t switch models silently in ways that change data handling.",
          "Don’t require model choices for basic setup.",
          "Don’t use version codes without descriptions."
        ],
        access: [
          ["WCAG 1.3.1", "Present model comparisons as a table."],
          ["WCAG 3.3.2", "Explain each option with a short description."],
          ["UD 2", "Defaults for most admins; controls for those who need them."]
        ],
        scale: [
          "Set approved models by region to satisfy local rules.",
          "Track which model produced each output for audit.",
          "Plan for model deprecations with migration notices."
        ]
      },

      "Usage & cost": {
        think: [
          "AI usage costs money and grows quickly. Admins need visibility and limits.",
          "Usage data also shows whether AI is actually helping."
        ],
        do: [
          "Show usage by feature, group and time, with costs where relevant.",
          "Let admins set budgets and alerts by group.",
          "Explain what happens when a limit is reached.",
          "Show trends and forecasts."
        ],
        dont: [
          "Don’t cut off AI mid-task when a budget is reached without warning.",
          "Don’t show usage only in units like tokens without converting to cost or actions.",
          "Don’t hide which groups drive the most usage."
        ],
        access: [
          ["WCAG 1.1.1", "Charts have text summaries of key figures."],
          ["WCAG 1.4.1", "Chart series are distinguishable without colour."],
          ["UD 4", "Show usage in units people understand, such as requests and cost."]
        ],
        scale: [
          "Allocate budgets by department and cost centre.",
          "Report usage to finance through exports or integrations.",
          "Detect unusual usage spikes and alert."
        ]
      },

      "Content safety": {
        think: [
          "Admins need confidence that AI output is appropriate, and a way to act when it isn’t.",
          "Safety controls include filters, blocked topics, human review and feedback handling."
        ],
        do: [
          "Explain built-in safety measures and what admins can adjust.",
          "Let admins add org-specific blocked topics or terms.",
          "Collect user reports on problematic output, and let admins review them.",
          "Show what happens when content is blocked, from the user’s point of view."
        ],
        dont: [
          "Don’t let admins disable core safety measures without clear warnings.",
          "Don’t block content without telling the user why.",
          "Don’t discard user reports without a record."
        ],
        access: [
          ["WCAG 3.3.2", "Explain each control and its effect."],
          ["WCAG 4.1.3", "Messages to users when content is blocked are announced."],
          ["UD 1", "Safety messages are clear and respectful for every user."]
        ],
        scale: [
          "Review reports at scale with grouping and prioritisation.",
          "Apply different safety settings by region where laws differ.",
          "Keep records of safety settings and incidents for regulators."
        ]
      }
    }
  }
});
