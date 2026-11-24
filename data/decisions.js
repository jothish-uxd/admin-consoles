/* Decisions & trade-offs: when to use a pattern, when not to, what else could work, and how it usually
   goes wrong when built. One entry per category; a category without one has no Decisions tab.
   Shape: { intro, patterns: { "<pattern name>": { tradeoff, use: [], avoid: [], alternatives: [[name, when]], mistakes: [] } } } */
window.DECISIONS = Object.assign(window.DECISIONS || {}, {
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
