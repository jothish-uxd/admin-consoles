/* Decisions & trade-offs: when to use a pattern, when not to, what else could work, and how it usually
   goes wrong when built. One entry per category; a category without one has no Decisions tab.
   Shape: { intro, patterns: { "<pattern name>": { tradeoff, use: [], avoid: [], alternatives: [[name, when]], mistakes: [] } } } */
window.DECISIONS = Object.assign(window.DECISIONS || {}, {
  "asset-management": {
    overview: {
      sizes: [
        ["Tens of people", ["Asset library", "Sharing controls", "Versions & restore"], "Admins browse content like everyone else and fix things one item at a time. Sharing limits and version history matter from day one."],
        ["Thousands", ["Asset detail", "Transfer ownership"], "Content is found by search, not folders. Admins arrive at single items from alerts and requests, and people who leave need new owners for their files."],
        ["Hundreds of thousands", ["Tags & metadata"], "Content is governed by policy and report: labels, retention and external sharing audits, applied to result sets rather than items."]
      ],
      principles: [
        "Lead with questions, not folders: what is shared externally, what is orphaned, what is sensitive, what is stale.",
        "Respect privacy. Admins usually need metadata, not content. Show the least that answers the question, and log access to anything more.",
        "Admin views of content must agree with what people see. Different numbers in two places destroy trust."
      ]
    },
    intro: "Asset management trades oversight for privacy and effort. The more an admin can see and change across everyone’s content, the more useful the console is, and the more it looks like surveillance.",
    patterns: {
      "Asset library": {
        payoff: "From the start, as a list with search. Reports and saved questions pay off at thousands.",
        tradeoff: "An org-wide inventory makes problems findable, but it also puts everyone’s content in one place for one person to browse. Lead with metadata and questions, not previews.",
        use: [
          "Admins need to answer questions across everyone’s content: what’s shared outside, what’s orphaned, what’s sensitive.",
          "Content is too spread out to find by asking owners.",
          "Admins act on sets of items: transfer, restrict, label, delete.",
          "Legal, security or audit teams ask for lists of content that match a condition."
        ],
        avoid: [
          "Admins never need to look across people’s content. The product’s normal file browser is enough.",
          "The library would show content admins shouldn’t see, with no way to limit it to metadata.",
          "A report would answer the question better, such as a weekly list of external shares."
        ],
        alternatives: [
          ["Saved reports", "When the same questions come up every week. Send ‘external shares’ or ‘orphaned files’ as a list, with actions."],
          ["Search only", "When admins look for one item at a time. A search box with filters, and no browsing."],
          ["Owner self-service", "When owners can fix it themselves. Ask them to review their own shared files, and track who did."]
        ]
      },
      "Asset detail": {
        payoff: "At thousands, when admins arrive from alerts, requests from legal or a question about one file.",
        tradeoff: "A full detail page answers ‘what happened to this file?’ in one place, but every field shown is something an admin can now see about someone’s work. Show what the question needs, and log the rest when opened.",
        use: [
          "Admins land on single items from alerts, legal requests or support questions.",
          "Access is layered: direct, by group, by link, inherited. Someone needs to see all of it.",
          "Ownership, sharing and versions need to be checked together.",
          "Admin actions on one item, such as removing a link, need context first."
        ],
        avoid: [
          "Admins only ever act on items in bulk. Put the needed facts in the list row instead.",
          "Most fields would repeat the list row. Expand the row instead of opening a page.",
          "The page would open the content itself just to show its details."
        ],
        alternatives: [
          ["Side panel from the list", "When admins check several items in a row. Keep the list beside the details."],
          ["Expanded row", "When only a few facts matter, such as owner, sharing and last activity."],
          ["Access report for one item", "When the question is only ‘who can see this?’. A focused list of every path to access."]
        ]
      },
      "Transfer ownership": {
        payoff: "At thousands, when people leaving or changing teams happens every week.",
        tradeoff: "Moving content to a new owner keeps it alive, but the new owner inherits responsibility they didn’t ask for, and a transfer can break sharing if done carelessly.",
        use: [
          "People leave or change roles, and their content still matters.",
          "Content must always have an owner for retention, sharing or legal hold.",
          "Offboarding has a checklist, and content is part of it.",
          "Managers or successors need to pick up work in progress."
        ],
        avoid: [
          "Content lives in shared spaces owned by the team, not by people. Nothing needs to move.",
          "The departing person’s content should be deleted under the retention policy.",
          "There’s no sensible new owner. Put it in an archive owned by the org instead."
        ],
        alternatives: [
          ["Team-owned spaces", "When work belongs to teams. Content never belongs to one person, so nothing moves when they leave."],
          ["Org archive", "When content must be kept but not worked on. Move it to an archive with a records owner."],
          ["Delegate access", "When someone is on leave, not leaving. Give a colleague access without changing the owner."]
        ]
      },
      "Sharing controls": {
        payoff: "From the start: the org’s outer limit on sharing outside should be set before the first file goes out.",
        tradeoff: "Tight limits keep data in, but block legitimate work with partners, and people route around them with email attachments and personal accounts. Set limits people can live with, and show what each one blocks.",
        use: [
          "People share content outside the org, with partners, customers or the public.",
          "Some groups or labels need tighter rules than others.",
          "Regulations or contracts limit where certain data can go.",
          "Admins need to know how many existing shares a change would affect."
        ],
        avoid: [
          "Nothing is ever shared outside. One org-wide setting is enough.",
          "Rules by group would contradict rules by label, with no clear answer to which wins.",
          "The policy would be stricter than the work allows. People will just use email."
        ],
        alternatives: [
          ["Label-based rules", "When sensitivity decides what can be shared. Rules follow the label, wherever the file goes."],
          ["Approved domains", "When sharing is with known partners. Allow only those domains instead of everyone outside."],
          ["Expiring links by default", "When public links are needed but risky. Links end after a set time unless renewed."]
        ]
      },
      "Versions & restore": {
        payoff: "From the start. It’s the undo for accidental edits, overwrites and ransomware.",
        tradeoff: "Keeping more versions for longer makes recovery possible, but costs storage and can keep content longer than the retention policy allows. Say how long versions are kept, and why.",
        use: [
          "Content is edited by several people, and mistakes get saved over good work.",
          "The org needs to recover from bulk damage, such as ransomware or a bad sync.",
          "People need to see who changed what, and when.",
          "Legal or compliance needs earlier states of a document."
        ],
        avoid: [
          "Content is written once and never edited, such as exported reports. A version list adds nothing.",
          "Versions would be kept beyond what the retention policy allows.",
          "Restoring one file would quietly undo other people’s later work."
        ],
        alternatives: [
          ["Trash with a recovery window", "When the risk is deletion, not editing. Keep deleted items for 30 days."],
          ["Org-wide point-in-time restore", "When damage is bulk, such as ransomware. Restore everything changed after a time, as a job."],
          ["Backups outside the product", "When recovery must survive the product itself. A separate backup with its own retention."]
        ]
      },
      "Tags & metadata": {
        payoff: "At hundreds of thousands, when content is governed by labels and policies, not by people knowing where things are.",
        tradeoff: "Curated tags make content findable and policies possible, but every tag list needs an owner, and free tagging turns into a mess of near-duplicates.",
        use: [
          "Policies act on content by label: retention, sharing limits, AI exclusion.",
          "People search by project, client or type across many teams.",
          "Admins need to merge and retire tags as the org changes.",
          "Some labels must be applied automatically, not left to people."
        ],
        avoid: [
          "Folders or spaces already say what content is. Tags would repeat them.",
          "Nobody will curate the tag list, so it will grow without limit.",
          "Labels would be applied by hand to millions of items with no automation."
        ],
        alternatives: [
          ["Folders or spaces", "When content naturally sits in one place. Structure does the work tags would do."],
          ["Automatic classification", "When labels follow content patterns, such as ID numbers or contracts. Apply them by rule, and let people correct."],
          ["Fixed fields", "When the same facts matter for every item, such as client or region. Required fields with set values."]
        ]
      }
    }
  },

  // Written for Storage & quotas, which shares its guidance with Asset management. Not shown until that category gets its overview.
  "storage-quotas": {
    draft: true,
    patterns: {
      "Storage overview": {
        payoff: "At thousands, when storage is shared by many people and running out would stop work.",
        tradeoff: "A detailed breakdown helps admins free space and plan purchases, but it also shows who stores what. Show it by type and group first, and by person only when needed.",
        use: [
          "Storage is a shared, paid pool that can run out.",
          "Admins need to forecast when to buy more.",
          "A few people, groups or file types use most of the space.",
          "Trash, old versions and shared drives count toward the limit."
        ],
        avoid: [
          "Storage is effectively unlimited. Show the number and stop there.",
          "The breakdown would only be by person, inviting surveillance of who stores what.",
          "Nobody can act on it: no quotas, no cleanup, no purchasing."
        ],
        alternatives: [
          ["Plan usage meter", "When storage is part of the plan and rarely an issue. One number on the billing page."],
          ["Alerts at thresholds", "When admins only need to know when it matters. Warn at 80% and 95%."],
          ["Cleanup suggestions", "When space is the problem. List large, old and duplicate files with owners, and ask owners to act."]
        ]
      },
      "Per-user quotas": {
        payoff: "At hundreds of thousands, when one shared pool has to be spread fairly across many people.",
        tradeoff: "Quotas stop a few people using everything, but each limit someone hits interrupts their work, and overrides pile up. Set defaults that fit most people, and make overrides visible and temporary.",
        use: [
          "A few people use far more than everyone else.",
          "The storage pool is fixed and expensive to grow.",
          "Departments are charged for their share.",
          "Admins need overrides for people with real needs, such as video teams."
        ],
        avoid: [
          "The pool is large and usage is even. Quotas only add support tickets.",
          "Hitting a quota would block access to existing files.",
          "There’s no easy way for people to ask for more."
        ],
        alternatives: [
          ["Group quotas", "When teams share a budget. Limit the group, and let them manage within it."],
          ["Alerts without limits", "When the aim is awareness. Tell heavy users and their managers, and don’t block anyone."],
          ["Archive tiers", "When old content takes the space. Move it to cheaper storage automatically."]
        ]
      }
    }
  },

  "audit-logs": {
    overview: {
      sizes: [
        ["Tens of people", ["Audit log table"], "A list of recent admin changes, searchable by person, answers ‘who changed this?’"],
        ["Thousands", ["Event detail", "Filters & saved views", "Export & SIEM streaming"], "Investigations need before and after values, precise filters, and exports for auditors. Retention periods start to matter."],
        ["Hundreds of thousands", ["Alerts on events"], "Billions of events, streamed to security tools and kept for years, with alerts on the few that are risky."]
      ],
      principles: [
        "Every event has the same core fields: who, what, which target, when, from where, and the result.",
        "Log admin and system actions, not only people’s. Automation must be traceable too.",
        "Logs are tamper-evident and kept according to policy. Admins can’t edit or delete them."
      ]
    },
    intro: "Audit logs trade completeness for findability. Logging everything makes the record trustworthy, and also makes the ten events that matter harder to find.",
    patterns: {
      "Audit log table": {
        payoff: "From the start, even at tens of people: a list of who changed what.",
        tradeoff: "A table makes every event scannable, but at enterprise volume nobody scans. Design it for narrowing down, not reading through.",
        use: [
          "Admins need to answer ‘who changed this, and when?’",
          "Security and compliance teams investigate incidents.",
          "Auditors ask for evidence of admin activity.",
          "Several admins share the console and need to see each other’s changes."
        ],
        avoid: [
          "The only question is about one object. Show its history on that object instead.",
          "Events are only consumed by a security tool, never by people in the console.",
          "The table would mix audit events with product analytics. Keep them separate."
        ],
        alternatives: [
          ["Activity on each object", "When questions start from a user, file or setting. Show its history where it lives."],
          ["Change summaries", "When admins want awareness, not investigation. A weekly digest of admin changes."],
          ["Stream only", "When the security team works only in their own tools. Send events there, and keep a minimal view in the console."]
        ]
      },
      "Event detail": {
        payoff: "At thousands, when ‘settings changed’ isn’t enough and someone needs exactly what changed.",
        tradeoff: "Full before and after values answer the question, but they can expose secrets and personal data to anyone who can read the log. Show what changed, and mask what shouldn’t be seen.",
        use: [
          "Events change values, and the old and new values matter.",
          "Investigators need the session, IP address, device and related events.",
          "One event leads to others: same person, same target, same session.",
          "Auditors ask for exact evidence of a change."
        ],
        avoid: [
          "Events are simple, such as ‘signed in’. The row says everything.",
          "Before and after values would show secrets or personal data with no masking.",
          "The detail would only show raw JSON."
        ],
        alternatives: [
          ["Expanded row", "When a few more fields are enough. Show them inline in the table."],
          ["Raw event view", "When readers are engineers or a security tool. Show the event as data, with field names documented."],
          ["Object history", "When the question is about one object over time. Show each change to it in order."]
        ]
      },
      "Filters & saved views": {
        payoff: "At thousands, once the log is too long to read and the same investigations repeat.",
        tradeoff: "Precise filters make investigations possible, but complex filter builders are slow for quick checks. Give fast common filters, and keep the full builder one step away.",
        use: [
          "Logs are long, and most questions start from a person, an object or an action.",
          "Security teams repeat the same investigations.",
          "Views need sharing between people, such as ‘failed sign-ins this week’.",
          "Time ranges need to be bounded so queries stay fast."
        ],
        avoid: [
          "The log is short. Search by person and time is enough.",
          "Saved views would never be shared or reused.",
          "Most questions come in as alerts with links to the right events already."
        ],
        alternatives: [
          ["Quick filters only", "When questions are simple. Person, action and time, with no builder."],
          ["Query language", "When readers are security analysts. A query box with documented fields."],
          ["Alerts", "When the same question is asked to catch a problem. Turn it into an alert instead of a view people check."]
        ]
      },
      "Export & SIEM streaming": {
        payoff: "Exports at thousands, for auditors. Streaming at hundreds of thousands, when a security team watches events in its own tools.",
        tradeoff: "Getting logs out makes them useful to security teams, but every copy outside is one more place the data lives, and a dropped event can’t be got back. Make exports complete and restricted.",
        use: [
          "A security team uses a SIEM and expects every event there.",
          "Auditors ask for logs covering a period.",
          "Logs must be kept longer than the product keeps them.",
          "Events need to be combined with other systems’ logs."
        ],
        avoid: [
          "Nobody will read the exported data. It only spreads copies.",
          "Any admin could export the full log. Restrict it by role first.",
          "The event format isn’t documented or versioned yet."
        ],
        alternatives: [
          ["Scheduled exports", "When auditors need periodic files. Send a file each month to a set location."],
          ["API access", "When teams pull events into their own tools on their own schedule."],
          ["Longer retention in the product", "When the only reason to export is keeping logs longer."]
        ]
      },
      "Alerts on events": {
        payoff: "At hundreds of thousands, or sooner for a few high-risk actions such as admin rights given or MFA turned off.",
        tradeoff: "Alerts catch risky actions as they happen, but every alert that isn’t acted on teaches people to ignore the next one. Alert on few things, precisely, with a link to the events.",
        use: [
          "Some actions are rare and risky: admin rights given, MFA turned off, bulk downloads.",
          "Someone is responsible for responding, and has time to.",
          "Patterns matter more than single events, such as many failed sign-ins.",
          "The org has to show it monitors privileged actions."
        ],
        avoid: [
          "Nobody will respond to the alerts.",
          "The security team already alerts on these events in their SIEM.",
          "The event is common, and an alert would fire many times a day."
        ],
        alternatives: [
          ["Digest", "When awareness is enough. A daily or weekly summary of risky actions."],
          ["SIEM rules", "When the security team owns detection. Stream events and let them alert."],
          ["Approval before the action", "When the action itself is the risk. Require approval instead of alerting afterwards."]
        ]
      }
    }
  },
  "ai-governance": {
    overview: {
      sizes: [
        ["Tens of people", ["Feature availability", "Data usage controls"], "One switch for AI features, and straight answers to what happens to the data. Legal asks the data question at any size."],
        ["Thousands", ["Usage & cost", "Content safety"], "AI goes to some groups first. Usage and cost need watching, and the org adds its own blocked topics and reviews reports."],
        ["Hundreds of thousands", ["Model & provider settings"], "Approved models by region, residency, budgets by department, and records that satisfy regulators."]
      ],
      principles: [
        "AI only sees what the person using it is allowed to see.",
        "Make AI activity auditable: who used which feature, on what data, with what result.",
        "Explain AI controls in plain language. Admins are making decisions their legal and security teams will ask about."
      ]
    },
    intro: "AI governance trades adoption for control. Every switch, rule and budget makes AI safer to roll out, and every one is also a reason people can’t use it yet. These notes help decide which controls the org needs now, and what to use instead.",
    patterns: {
      "Feature availability": {
        payoff: "From the start, even at tens of people: at the very least, one switch and a clear list of what’s on.",
        tradeoff: "Turning features on by group lets an org pilot safely, but every group that waits is a group not getting the benefit. The design has to make widening as easy as narrowing.",
        use: [
          "The product ships more than one AI feature, and they carry different risks.",
          "The org wants to pilot with a small group before everyone gets it.",
          "New AI features arrive often, and the org has said it wants to opt in.",
          "Someone needs to turn AI off quickly, for an incident or a regulator."
        ],
        avoid: [
          "There’s a single AI feature with low risk. One org-wide switch is enough.",
          "Splitting features by group would mean people in the same team see different products, with no reason they can understand.",
          "Availability is already decided by license. Don’t add a second switch that can disagree with it."
        ],
        alternatives: [
          ["License-based access", "When AI is a paid add-on. Whoever has the license gets the features, and the license is the switch."],
          ["One org-wide switch", "When the org is small or has one AI feature. On or off, with a note on what people see."],
          ["Opt-in by each person", "When features are low risk and personal, such as writing help. People turn them on; admins see adoption."],
          ["Release channels", "When orgs want new features early or late. An early-access group gets them first, everyone else later."]
        ]
      },

      "Data usage controls": {
        payoff: "From the start: legal and security ask what happens to the data before anyone gets AI.",
        tradeoff: "Strict data settings make AI easier to approve but can make it less useful: shorter retention means no history, excluded labels mean answers with gaps. Show what each setting costs, not only what it protects.",
        use: [
          "AI features send org content to a model, inside or outside the product.",
          "The org has retention, residency or confidentiality rules that AI has to follow.",
          "Some content, such as legal or HR material, must never reach AI features.",
          "Security reviews ask for a written answer to where data goes and whether it trains models."
        ],
        avoid: [
          "The answer is fixed and the same for every customer. State it plainly on the page instead of offering settings that change nothing.",
          "The settings would conflict with the org’s main retention or label policies. Inherit those instead of adding a second set.",
          "No region or retention option is actually available. Showing disabled controls invites support tickets."
        ],
        alternatives: [
          ["A plain data statement", "When nothing is configurable. One page that answers training, retention, location and sub-processors directly."],
          ["Inherit existing policies", "When the org already has retention and sensitivity labels. AI follows them, and the page says so."],
          ["Separate AI workspace", "When some data must never mix with AI. Keep AI to a space that holds only approved content."]
        ]
      },

      "Model & provider settings": {
        payoff: "At hundreds of thousands, or earlier when a regulator or contract names which providers may process data.",
        tradeoff: "Choosing models gives control over cost, quality and data location, but most admins can’t judge models, and every pinned model needs migrating later. Offer good defaults first, and choices only to those who need them.",
        use: [
          "Contracts or regulators limit which providers may process the org’s data, or where.",
          "Features can run on models with real differences in speed, cost or data location.",
          "The org wants to know which model produced each answer, for audit.",
          "Models are retired regularly, and admins need warning before they change."
        ],
        avoid: [
          "There’s one model and no alternative. A model page only raises questions with no choices behind them.",
          "Admins would be asked to pick between version codes they can’t compare.",
          "Choosing a model wouldn’t change data handling, cost or quality in ways the org cares about."
        ],
        alternatives: [
          ["Recommended model, no choice", "When the product chooses well. Say which model and provider are used, and announce changes ahead."],
          ["Approved providers, not models", "When the concern is who processes data, not which model. Approve providers by region; the product picks models within them."],
          ["Quality tiers", "When the real choice is speed against quality. Offer Fast and Thorough, and keep model names in the details."]
        ]
      },

      "Usage & cost": {
        payoff: "At thousands of people, once AI usage shows up on an invoice someone has to explain.",
        tradeoff: "Budgets and limits keep spend predictable, but a limit that cuts people off mid-task costs more goodwill than it saves. Prefer alerts and soft limits, and make the hard stop rare and explained.",
        use: [
          "AI is billed by usage, credits or requests, and costs vary between groups.",
          "Finance needs spend by department or cost centre.",
          "The org wants to know whether AI is actually used, and by whom, before buying more.",
          "Sudden spikes are possible: a script, an agent loop, a whole team trying a new feature."
        ],
        avoid: [
          "AI is included at a flat price with no limits. Show adoption, not cost.",
          "Usage is counted in units nobody understands, such as tokens, and can’t be converted to cost or actions yet.",
          "A budget would block work the org depends on, with no one able to raise it in time."
        ],
        alternatives: [
          ["Adoption report only", "When there’s no usage billing. Show who uses which feature and how often, to guide rollout."],
          ["Alerts without limits", "When the org prefers to trust and review. Alert at thresholds, and never stop anyone."],
          ["Per-person allowance", "When fairness matters more than total spend. Each person gets a monthly amount, with a clear way to ask for more."]
        ]
      },

      "Content safety": {
        payoff: "At thousands, when the org needs its own rules on top of the built-in protections and someone to review reports.",
        tradeoff: "Stricter filters block more harmful output but also block legitimate work, and people stop trusting a tool that refuses without saying why. Keep the core protections fixed, and make the org’s own rules few, clear and explained to the person.",
        use: [
          "AI generates text, images or actions that people see or send.",
          "The org has topics or terms it must keep out, for legal, regulatory or brand reasons.",
          "People need a way to report bad output, and someone to act on reports.",
          "Laws on AI output differ by region where the org operates."
        ],
        avoid: [
          "AI only summarises content the person can already see, and adds nothing new. Built-in protections and reporting are enough.",
          "An org blocked list would duplicate what the built-in protections already do.",
          "Nobody will review reports. A report button with no one behind it is worse than none."
        ],
        alternatives: [
          ["Built-in protections only", "When the org has no special rules. Say what’s covered, and keep a report button."],
          ["Human review for some outputs", "When output goes outside the org, such as customer replies. Hold it for a person to approve."],
          ["Feature-level restriction", "When one feature carries the risk, such as image generation. Turn that feature off for some groups instead of filtering everything."]
        ]
      }
    }
  },
  "access-requests": {
    // trial of the one-view layout: the category page is an overview, each pattern is one complete view
    overview: {
      sizes: [
        ["Tens of people", ["Request access"], "People ask an admin, and a request button with a notification to the admin is enough."],
        ["Thousands", ["Approval queue", "Review detail", "Time-bound access"], "Requests go to resource owners and managers. Approvers need a queue and context, and sensitive access starts to expire."],
        ["Hundreds of thousands", ["Access reviews"], "Auditors expect periodic certification, routing runs on policy, and sensitive access needs more than one approver."]
      ],
      principles: [
        "Route each request to the person who knows whether it’s appropriate, usually the resource owner or manager, not a central admin.",
        "Make each decision one step, with the context needed to make it.",
        "Keep who asked, who decided, why and when. That record is the audit evidence."
      ]
    },
    intro: "Access requests trade speed for control. Every request is a moment where someone is waiting to work, and every shortcut is a moment where access goes unchecked. These notes help decide which pattern fits, what to use instead, and where implementations usually go wrong.",
    patterns: {
      "Request access": {
        payoff: "From the start, even at tens of people.",
        tradeoff: "A request flow adds a wait in exchange for a record and a second pair of eyes. It only pays off if asking is easier than going around it.",
        use: [
          "Access is granted per resource or per role, and people regularly hit things they can’t open.",
          "Someone other than the requester should decide: the resource owner, a manager or a security team.",
          "You need a record of who asked, why, and who agreed, for audits or investigations.",
          "Default access is deliberately narrow, so asking for more is a normal part of work."
        ],
        avoid: [
          "Nearly everyone who asks is approved. Grant it by default, or by group membership, and skip the wait.",
          "The resource is low risk and open to the whole org. A request step only adds friction.",
          "Nobody is clearly responsible for approving. Requests will sit with no one to answer them."
        ],
        alternatives: [
          ["Access by group or role", "When the same people always need the same access. Give it through the group they join, not one request at a time."],
          ["Auto-approval by policy", "When requests that match a rule (same team, low risk, short duration) are always approved. Grant instantly and log it."],
          ["Self-service join", "When a group is open to anyone in a team or domain. Let people join and leave, with the owner notified."],
          ["Share link from the owner", "When access is to one file or space for one task. The owner shares directly and no admin is involved."]
        ],
        mistakes: [
          "Putting the request form in a separate portal, so people have to find it and retype what they were trying to open.",
          "Asking requesters to pick a technical role name they don’t understand, then routing the wrong role to the approver.",
          "Not saying who the request went to or how long it usually takes, so people chase it in chat.",
          "Allowing duplicate requests for the same access, which splits the approver’s attention and the audit trail."
        ]
      },

      "Approval queue": {
        payoff: "At thousands of people, once approvers see more than a handful of requests a week.",
        tradeoff: "A queue makes approvers efficient at volume, but it also makes approving feel routine. The design has to keep speed for safe requests and slow people down for risky ones.",
        use: [
          "One person or team approves many requests a week, often for different resources.",
          "Requests vary in risk, so some can be handled in bulk and some need a closer look.",
          "Requests age, and a slow answer has a real cost to the person waiting.",
          "Approvers need to hand off work when they’re away."
        ],
        avoid: [
          "Approvers see only one or two requests a month. A notification with Approve and Deny is enough.",
          "Every request needs the same careful review. Bulk tools invite rubber-stamping.",
          "Approvals already happen in chat or email and work well there. Add actions to those, not a new place to check."
        ],
        alternatives: [
          ["Approve from the notification", "When volume is low. Put Approve and Deny, with the key context, in the email or chat message."],
          ["Inbox of mixed tasks", "When approvers also handle reviews, alerts and other work. One list of everything waiting, filterable by type."],
          ["Auto-approval with a review afterwards", "When most requests are fine and speed matters more. Grant now, and sample decisions later."],
          ["Escalation to a group", "When individual approvers are often away. Route to a group where anyone can answer."]
        ],
        mistakes: [
          "Making approvers open each request to approve it, so a dozen routine requests take a dozen page loads.",
          "Allowing bulk approval of high-risk requests along with low-risk ones.",
          "Sorting newest first, so the oldest requests, the ones closest to escalation, sink to the bottom.",
          "No delegation: requests pile up behind someone on leave, and requesters can’t tell why."
        ]
      },

      "Review detail": {
        payoff: "At thousands, when approvers can’t judge a request from its row alone.",
        tradeoff: "More context makes for better decisions but slower ones. Show what changes the decision, and keep everything else one click away.",
        use: [
          "The approver isn’t sure whether this person should have this access, and the answer depends on who they are and what they’d get.",
          "Requests can be narrowed: a shorter duration, a smaller scope or a lower level.",
          "Some requests are unusual compared with the requester’s peers, and that’s worth flagging.",
          "Decisions are audited, so the reason and the context at the time need keeping."
        ],
        avoid: [
          "Requests are routine and low risk, and the queue row already holds everything needed.",
          "The approver can’t act on the context anyway: for example, approval is a formality required by policy.",
          "The detail page would mostly repeat the queue row. Expand the row instead of opening a page."
        ],
        alternatives: [
          ["Expandable row in the queue", "When a little more context is enough. Open details inline and keep the approver in the list."],
          ["Side panel", "When approvers move through requests one after another. Keep the queue visible beside the detail."],
          ["Risk summary only", "When volume is very high. Show a plain-language risk level and the one fact that drives it, with the full detail behind it."]
        ],
        mistakes: [
          "Showing a permission code like files.write.all without saying in plain words what it lets someone do.",
          "Hiding that the requester is also an owner or an approver of the same resource.",
          "Requiring a comment on every approval, so comments become ‘ok’ and stop meaning anything.",
          "Offering only approve or deny, when the right answer is ‘yes, but for a week’ or ‘yes, but read only’."
        ]
      },

      "Time-bound access": {
        payoff: "At thousands, and from the start for admin rights and other sensitive access.",
        tradeoff: "Expiry removes standing access but adds interruptions: renewals, extensions and access ending mid-task. It’s worth it where the access is sensitive or rarely needed.",
        use: [
          "Access is sensitive: admin rights, production systems, legal or financial data.",
          "The need is tied to a task, a project or an incident with an end.",
          "Auditors ask how much standing access exists and how it’s limited.",
          "Revocation can be done reliably, everywhere the access reaches."
        ],
        avoid: [
          "The access is part of someone’s everyday job. Constant renewals teach people to request the longest duration.",
          "Expiry can’t be enforced in every system, so the console says it ended while access quietly continues.",
          "Nobody is told before access ends, and losing it would interrupt critical work."
        ],
        alternatives: [
          ["Standing access with periodic reviews", "When access is part of a role. Keep it, and confirm it in an access review every quarter or so."],
          ["Just-in-time elevation", "When admin rights are needed for minutes, not days. Grant on request, scoped to the task, and log every action."],
          ["Break-glass account", "When access is only for emergencies. A sealed account that alerts security whenever it’s used."]
        ],
        mistakes: [
          "Showing expiry only as a UTC timestamp, so people can’t tell when their access actually ends.",
          "No warning before expiry, so access ends in the middle of work and the person files an urgent request.",
          "Extensions that start a brand-new request, losing the original reason and approver.",
          "Revoking in the console but not in connected systems, so the record and reality drift apart."
        ]
      },

      "Access reviews": {
        payoff: "At hundreds of thousands, or sooner if an audit standard requires certification.",
        tradeoff: "Reviews catch access that should have gone, but they ask a lot of reviewers. Too many items, and reviewers approve everything to get through.",
        use: [
          "An audit standard or policy requires periodic certification of who has access.",
          "Access builds up over time through moves, projects and exceptions, and nothing else removes it.",
          "Managers or owners can judge whether access is still needed, given the right context.",
          "Removals can be applied automatically once decided."
        ],
        avoid: [
          "Most access is time-bound already, so there’s little standing access to review.",
          "Reviewers have no way to judge: no usage data, no context, unfamiliar systems. The review becomes a formality.",
          "Removals would need manual follow-up that nobody owns."
        ],
        alternatives: [
          ["Event-driven reviews", "When access should change at moments: a team move, a manager change, a project ending. Review then, not on a calendar."],
          ["Automatic removal of unused access", "When usage data is reliable. Remove access unused for 90 days, with notice, and let people ask again."],
          ["Risk-based sampling", "When volume is huge. Review risky and unusual access in full, and sample the rest."]
        ],
        mistakes: [
          "Presenting thousands of rows where Approve all is the only realistic option.",
          "No usage or peer context, so reviewers can’t tell which access matters.",
          "Leaving removals as a task for later, so the campaign ends with nothing actually removed.",
          "No deadline or reminders, so campaigns drift and the evidence is incomplete when auditors ask."
        ]
      }
    }
  }
});
