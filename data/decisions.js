/* Decisions & trade-offs: when to use a pattern, when not to, what else could work, and how it usually
   goes wrong when built. One entry per category; a category without one has no Decisions tab.
   Shape: { intro, patterns: { "<pattern name>": { tradeoff, use: [], avoid: [], alternatives: [[name, when]], mistakes: [] } } } */
window.DECISIONS = Object.assign(window.DECISIONS || {}, {
  "empty-onboarding": {
    overview: {
      sizes: [
        ["Tens of people", ["Empty table", "No results"], "A short welcome and a clear first action. Empty lists explain themselves, and searches that find nothing say why."],
        ["Thousands", ["Setup checklist", "Permission empty state"], "Setup is shared across several admins and tracked. Roles and scoped admins mean people regularly reach pages they can’t see."],
        ["Hundreds of thousands", [], "The same patterns, for onboarding run as a project: stages, integrations, migration and rollout by region, coordinated across teams."]
      ],
      principles: [
        "Every empty state explains why it’s empty and what to do next.",
        "Distinguish ‘nothing yet’, ‘nothing matches’ and ‘you can’t see this’. They need different words and different actions.",
        "Don’t hide what the product can do behind an empty state."
      ]
    },
    intro: "Empty states trade guidance for clutter. Saying more helps people who are lost, and gets in the way of people who aren’t. The right amount depends on why the page is empty.",
    patterns: {
      "Setup checklist": {
        payoff: "At thousands, when setup takes days and is shared between several admins.",
        tradeoff: "A checklist turns setup into progress people can see, but it competes with the real work on Home and can feel like nagging. Make it easy to share, skip and hide.",
        use: [
          "Setup has several steps that make the product work for the org: domain, sign-in, people, groups, policies.",
          "Setup spans days and more than one admin.",
          "Some steps can be detected as done automatically.",
          "People keep asking ‘what’s left to do?’"
        ],
        avoid: [
          "Setup is one step. A clear first action on the empty page is enough.",
          "The list would mostly be upsells or feature tours.",
          "Tasks can’t be checked automatically, so the list would always be out of date."
        ],
        alternatives: [
          ["One first action", "When there’s a single thing to do first, such as adding people. Put it on the empty page."],
          ["Guided setup wizard", "When steps must happen in order and in one sitting."],
          ["Onboarding project page", "When setup is a project across teams and regions. Stages, owners and dates, outside Home."]
        ]
      },
      "Empty table": {
        payoff: "From the start: every list is empty before its first item.",
        tradeoff: "An empty state can teach what the page is for, but too much explanation and too many actions bury the one that matters. One heading, one sentence, one primary action.",
        use: [
          "A list has nothing in it yet, and people don’t know what will appear there.",
          "There’s a clear first action, and alternatives such as import or sync.",
          "Large orgs usually bring data in rather than creating it by hand."
        ],
        avoid: [
          "Data is still syncing. Say it’s on its way, not that there’s nothing.",
          "The empty state would show a grid with no rows and no explanation.",
          "The list is empty because of a filter. That’s No results, not an empty table."
        ],
        alternatives: [
          ["Sample data", "When seeing examples helps more than reading. Show labelled examples people can remove."],
          ["Sync in progress", "When data is on its way. Show progress and when it should arrive."],
          ["Hide the page until there’s data", "When the page only makes sense with data, and another page leads to it."]
        ]
      },
      "No results": {
        payoff: "From the start, wherever there’s search or filters.",
        tradeoff: "Explaining why nothing matched helps people recover, but suggestions can be wrong. Show exactly what was applied, and make undoing it one click.",
        use: [
          "Searches and filters can combine to match nothing.",
          "People don’t notice which filter is narrowing the results.",
          "Results without one filter can be counted cheaply."
        ],
        avoid: [
          "The page is empty because nothing exists yet. Use the empty table message instead.",
          "Results are limited by what the admin may see. Say that, not ‘no results’.",
          "Suggestions would guess wildly at what was meant."
        ],
        alternatives: [
          ["Relax the filter automatically", "When it’s always safe. Show close matches, clearly labelled as such."],
          ["Global search", "When the item may live elsewhere. Offer to search the whole console."],
          ["Saved views", "When people keep building the same filters. Save the view so the mistake doesn’t repeat."]
        ]
      },
      "Permission empty state": {
        payoff: "At thousands, when roles and scoped admins mean people regularly follow links to pages they can’t see.",
        tradeoff: "Explaining what someone can’t see helps them get access, but saying too much about the hidden page can leak what’s on it. Name the page and who can help, nothing more.",
        use: [
          "Links to admin pages are shared with people who may not have access.",
          "Roles limit what different admins can see.",
          "There’s a request process, and someone to approve it."
        ],
        avoid: [
          "The page’s very existence is sensitive. Show a plain not-found instead.",
          "There’s nobody who could grant access. Say who to contact rather than offering a request that goes nowhere.",
          "The person should never have reached the link. Fix the link instead of explaining it."
        ],
        alternatives: [
          ["Request access in place", "When there’s an approval flow. One button, with who it goes to."],
          ["Not found", "When revealing that the page exists is itself a risk."],
          ["Read-only view", "When people may see but not change it. Show the page with controls disabled and the reason."]
        ]
      }
    }
  },
  "groups-teams": {
    overview: {
      sizes: [
        ["Tens of people", ["Create group", "Manage members"], "A few teams, managed by hand. Groups are mostly for convenience, and owners add people themselves."],
        ["Thousands", ["Dynamic groups", "Nested groups"], "Groups become the main way to grant access. Rules replace lists, and groups mirror the org chart."],
        ["Hundreds of thousands", ["Directory sync"], "Groups come from the identity provider or HR. The console mostly shows and explains them rather than editing them."]
      ],
      principles: [
        "Show where every group comes from: created here, generated by a rule, or synced from an identity provider.",
        "Make the impact of membership visible. Before adding someone, show what access the group grants.",
        "Never let a sync and a manual edit fight. One source wins, and the UI says which."
      ]
    },
    intro: "Groups trade precision for leverage. Granting to a group instead of a person keeps access manageable, and every change to one membership opens or closes access for everyone in it.",
    patterns: {
      "Create group": {
        payoff: "From the start: even a small org groups people to give access once instead of person by person.",
        tradeoff: "Easy creation lets teams organise themselves, but every group is something that grants access and needs an owner. Ask for the owner and purpose up front, and catch duplicates.",
        use: [
          "Several people need the same access, licence or settings.",
          "Team leads should manage their own membership without being org admins.",
          "The group will be used to grant access somewhere."
        ],
        avoid: [
          "Groups come from the identity provider. Create them there and sync them.",
          "A group would hold one person. Grant to the person instead.",
          "A rule would describe the members better than a list. Make it dynamic."
        ],
        alternatives: [
          ["Dynamic group", "When membership follows attributes such as team, title or location."],
          ["Synced group", "When the identity provider already has it."],
          ["Role", "When the need is a set of permissions rather than a set of people."]
        ]
      },
      "Manage members": {
        payoff: "From the start, once any group grants access.",
        tradeoff: "Fast adding saves owners time, but every person added gets everything the group grants. Show the access before adding, and make removals deliberate.",
        use: [
          "Owners add and remove people themselves.",
          "Membership comes from several places: directly, nested groups and rules.",
          "People need to know when and by whom someone was added."
        ],
        avoid: [
          "The group is synced. Show members read-only, and link to the source.",
          "Membership follows a rule. Editing people by hand would be overwritten.",
          "The group is huge, such as everyone in the org. Search and reports, not lists."
        ],
        alternatives: [
          ["Rule-based membership", "When the same people would be added by hand every week."],
          ["Self-service join", "When the group is open. People join and leave, and owners are told."],
          ["Bulk import", "When members come from a list elsewhere."]
        ]
      },
      "Dynamic groups": {
        payoff: "At thousands, when people join, move and leave too often for lists to stay accurate.",
        tradeoff: "Rules keep membership accurate without anyone editing it, but a small rule change can remove hundreds of people at once. Preview every change and confirm large ones.",
        use: [
          "Membership follows attributes such as team, title, location or employment type.",
          "People move often, and lists drift.",
          "The attributes are reliable and kept up to date."
        ],
        avoid: [
          "Attributes are incomplete or wrong. The rule would be wrong too.",
          "Membership is a judgement call, not a fact about people.",
          "Admins can’t see the attributes the rule uses."
        ],
        alternatives: [
          ["Static group with reviews", "When membership is a decision. Review it every quarter."],
          ["Synced group", "When the identity provider already has the rule."],
          ["Rule plus exceptions", "When a few people must be added or excluded by hand. Show them separately."]
        ]
      },
      "Nested groups": {
        payoff: "At thousands, when groups mirror the org chart and access should flow down it.",
        tradeoff: "Nesting mirrors how the org is shaped, but hides who is actually a member. Show direct members and everyone separately, and say how many in total.",
        use: [
          "Teams sit inside departments, and access should flow from the department to everyone in it.",
          "The same team belongs to several larger groups.",
          "Auditors ask who has access, including through nesting."
        ],
        avoid: [
          "Nesting would only be one level deep. A larger group with members is clearer.",
          "Nobody can explain why someone has access through four levels of groups.",
          "The identity provider already flattens the hierarchy."
        ],
        alternatives: [
          ["Dynamic group by department", "When the hierarchy is an attribute. One rule instead of a tree."],
          ["Flat groups with roles", "When access differs at each level."],
          ["Synced hierarchy", "When the identity provider already models it."]
        ]
      },
      "Directory sync": {
        payoff: "At hundreds of thousands, or sooner if groups already live in an identity provider such as Entra or Okta.",
        tradeoff: "Syncing keeps one source of truth, but takes editing out of the console, and sync problems become access problems. Show health and errors in plain words.",
        use: [
          "The org manages groups in an identity provider or HR system.",
          "People join and leave too often to keep two systems in step by hand.",
          "Auditors expect access to follow the identity provider."
        ],
        avoid: [
          "Groups only exist in the console and nobody manages them elsewhere.",
          "The identity provider’s groups are messy. Syncing all of them brings the mess in. Choose which ones.",
          "Nobody watches sync health, so failures would go unnoticed."
        ],
        alternatives: [
          ["Sync people only", "When groups are console-specific. Sync users, and build groups here by rule."],
          ["Import once", "When the source won’t be kept up. Bring groups in, then manage them here."],
          ["Choose which groups sync", "When only some groups matter to the console."]
        ]
      }
    }
  },
  "import-export": {
    overview: {
      sizes: [
        ["Tens of people", ["CSV import", "Export"], "A file now and then, for onboarding a team or answering a question. A template and a clear summary are enough."],
        ["Thousands", ["Field mapping", "Validation & errors"], "Files come from HR and other systems, with their own column names and their own mistakes. Mapping and fixing become most of the work."],
        ["Hundreds of thousands", [], "Imports run as jobs with history and rollback, and the API or sync replaces most files. Exports are scheduled, scoped and audited."]
      ],
      principles: [
        "Check everything before changing anything. Nothing is written until the last step, and the summary says what will happen.",
        "Make imports safe to run twice. Match existing records and ask what to do with them, so a retry never creates duplicates.",
        "Treat every export as data leaving the org. Scope it, leave sensitive fields off by default, deliver a link that expires, and log it."
      ]
    },
    intro: "Import and export move data in bulk, so mistakes are bulk mistakes too. The work is in the checks around the file: what it will change on the way in, and who can see it on the way out.",
    patterns: {
      "CSV import": {
        payoff: "From the start, as soon as people arrive in batches rather than one at a time.",
        tradeoff: "A file adds dozens of people in one go, but it also adds dozens of mistakes in one go. Summarise before writing, and decide up front what happens to people who already exist.",
        use: [
          "People or records arrive in batches, such as a new team or a term's students.",
          "The data already lives in a spreadsheet or another system's export.",
          "Admins are comfortable with spreadsheets but not with APIs."
        ],
        avoid: [
          "There are only a few. A form or invite by email is quicker.",
          "The data changes every day. Sync from the source instead of re-importing.",
          "The source has an API or connector. Connect it once."
        ],
        alternatives: [
          ["Invite by email", "When there are only a few people."],
          ["Directory sync", "When the identity provider or HR system is the source."],
          ["API", "When another system will send changes on its own."]
        ]
      },
      "Field mapping": {
        payoff: "At thousands, when files come from systems that don't use your column names.",
        tradeoff: "Automatic matching saves time on every file, but a confident wrong match is worse than none. Show sample values and how each match was made, and flag the doubtful ones.",
        use: [
          "Files come from other systems, with their own column names.",
          "The same kind of file arrives again and again. Save the mapping.",
          "Some columns shouldn't be imported at all."
        ],
        avoid: [
          "Every file comes from your own template. The columns already match.",
          "There are only two or three columns. Mapping adds a step for nothing.",
          "The source is connected. Map once in the connector settings."
        ],
        alternatives: [
          ["Strict template", "When you control the file and can reject anything else."],
          ["Saved mapping", "When the same source sends the same columns each time."],
          ["Connector field settings", "When the data comes through an integration."]
        ]
      },
      "Validation & errors": {
        payoff: "At thousands, when one bad row shouldn't stop the other 47.",
        tradeoff: "Importing the good rows and keeping the bad ones keeps work moving, but it leaves a partial result to finish later. Say exactly what was and wasn't imported, and hand back the rows that failed.",
        use: [
          "Files are large enough that some rows will always be wrong.",
          "Admins can fix most problems in place without going back to the source.",
          "Some problems block a row and others don't."
        ],
        avoid: [
          "Every row depends on every other. Reject the whole file and say why.",
          "The file is tiny. A single clear error message is enough.",
          "Fixes need data only the source has. Send the errors back instead of editing here."
        ],
        alternatives: [
          ["All-or-nothing import", "When a partial result would be worse than none."],
          ["Error file download", "When fixes have to happen in the source spreadsheet."],
          ["Dry run", "When admins want the report before committing to anything."]
        ]
      },
      "Export": {
        payoff: "From the start: admins always need to answer questions with the data outside the console.",
        tradeoff: "Exports let admins work with data anywhere, but every file is data that has left the org. Scope it from the current view, leave sensitive fields off, and deliver a link that expires instead of an attachment.",
        use: [
          "Admins need the data in a spreadsheet, report or another tool.",
          "The current filter already describes what they need.",
          "Audit, finance or compliance ask for a snapshot."
        ],
        avoid: [
          "The need is ongoing. Schedule it or stream it to the other system.",
          "The answer is a number. Show a report in the console instead.",
          "The data is too sensitive to leave. Give viewing access instead."
        ],
        alternatives: [
          ["Scheduled export", "When the same file is needed every week."],
          ["Report in the console", "When the question has an answer that can be shown here."],
          ["API or streaming", "When another system needs the data continuously."]
        ]
      }
    }
  },
  "integrations-api": {
    overview: {
      sizes: [
        ["Tens of people", ["Integration catalog", "Create API key"], "A few connected apps and a couple of keys, all known to the admin. Clear access descriptions and keys that expire are enough."],
        ["Thousands", ["App permissions", "Webhooks"], "Teams connect their own apps and systems listen for events. Admins review what people authorised, revoke what's unused and watch deliveries."],
        ["Hundreds of thousands", [], "Hundreds of integrations, service accounts and endpoints. Approved app lists, scope and expiry policies, leaked-key detection and automatic revocation."]
      ],
      principles: [
        "Say what each app or key can reach in plain words, including what it can't. Scope codes alone aren't an explanation.",
        "Give every integration, key and endpoint an owner, a purpose and a last-used date, so anything unused can be found.",
        "Make access narrow and temporary by default: the least scope, an expiry, and revocation that takes effect at once."
      ]
    },
    intro: "Integrations, API keys and webhooks are doors into and out of the org's data. Each is opened by one person for one reason, and they outlast both. The work is knowing which doors exist, what each reaches, and closing the ones no one needs.",
    patterns: {
      "Integration catalog": {
        payoff: "From the start, as soon as people want to connect their own tools.",
        tradeoff: "Letting people connect apps themselves saves admins time, but every app they connect can reach their data. Decide per app who may connect it, and say what it reaches before anyone does.",
        use: [
          "People want to connect their own tools, such as calendars or diagram apps.",
          "Some apps should be allowed for everyone, and others only with approval.",
          "Admins need to see what's connected and what's being requested."
        ],
        avoid: [
          "There are only two or three integrations, all set up by admins. A list of connected apps is enough.",
          "Every integration is org-wide and configured once. Use a setup wizard instead.",
          "The catalog would mainly promote partners. Keep marketing out of a security decision."
        ],
        alternatives: [
          ["Approved app list", "When admins only need to allow or block, not browse."],
          ["Request access flow", "When each connection needs a reason and a decision."],
          ["Multi-step wizard", "When one org-wide integration needs configuring once."]
        ]
      },
      "App permissions": {
        payoff: "At thousands, when people have authorised more apps than anyone remembers.",
        tradeoff: "Letting people authorise apps keeps work moving, but the access stays long after the reason has gone. Group by app, flag broad and unused access, and make revoking for everyone one confirmed step.",
        use: [
          "People authorise apps with their own accounts.",
          "Apps keep working after the person who authorised them leaves.",
          "Security reviews need to see broad access across the org."
        ],
        avoid: [
          "Only admins can connect apps. The catalog already shows everything connected.",
          "The apps reach nothing sensitive, such as a theme or a clock.",
          "The identity provider already manages app grants. Link to it instead."
        ],
        alternatives: [
          ["Periodic access review", "When owners should confirm each app is still needed."],
          ["Automatic revocation", "When apps unused for a set time should lose access on their own."],
          ["Block list", "When some apps should never be connected at all."]
        ]
      },
      "Create API key": {
        payoff: "From the start: the first script or sync needs a key, and keys are hard to rein in later.",
        tradeoff: "Keys let other software do useful work without a person, but a key is a password that doesn't log out. Ask for an owner, start with the narrowest scope and an expiry, and show the secret only once.",
        use: [
          "Scripts, syncs or other systems need to use the API.",
          "Each key's access should be limited and owned by someone.",
          "Keys should expire and be rotated."
        ],
        avoid: [
          "The other system supports OAuth. Let it connect as an app with an approval instead.",
          "A person needs access. Give them an account, not a key.",
          "The key would need full access. Use a service account with an owner's approval."
        ],
        alternatives: [
          ["OAuth app", "When the other system can ask for access the standard way."],
          ["Service account", "When the software needs its own identity, roles and audit trail."],
          ["Short-lived tokens", "When keys can be issued on demand and expire in minutes."]
        ]
      },
      "Webhooks": {
        payoff: "At thousands, when other systems need to react to changes as they happen.",
        tradeoff: "Pushing events saves other systems from polling, but every event sent is data leaving the org, and failures go unnoticed. Send only chosen events, require https and a signature, and show every delivery.",
        use: [
          "Other systems need to act on changes right away, such as provisioning or alerts.",
          "The same event should reach several systems.",
          "The receiving team can verify signatures and handle retries."
        ],
        avoid: [
          "Changes are rare, and a daily export is enough.",
          "The receiver can't verify signatures or handle duplicates.",
          "The data is too sensitive to push. Let the other system pull with a scoped key."
        ],
        alternatives: [
          ["Scheduled export", "When the other system only needs a daily or weekly snapshot."],
          ["Polling the API", "When the receiver can't accept incoming requests."],
          ["Streaming to a SIEM", "When the events are for security monitoring."]
        ]
      }
    }
  },
  "billing-licenses": {
    overview: {
      sizes: [
        ["Tens of people", ["Plan overview", "Invoices & payment"], "One plan and a card on file. Admins need to see what they pay, when it renews, and their receipts."],
        ["Thousands", ["Seat assignment", "Add seats"], "Several products and licence types. Seats are assigned by group, unused ones reclaimed, and every purchase shows its cost first."],
        ["Hundreds of thousands", [], "The same patterns, run on contracts: committed volumes, cost centres, purchase orders, true-ups, and finance teams who never sign in."]
      ],
      principles: [
        "Show the cost of every change before it’s made, including proration.",
        "Separate who can see billing from who can change it, and both from who can assign licences.",
        "Never let a billing issue lock people out without warning and a grace period."
      ]
    },
    intro: "Billing trades flexibility for predictability. Making it easy to add seats and change plans helps admins move fast, and every easy change is also a charge someone has to explain.",
    patterns: {
      "Plan overview": {
        payoff: "From the start: even a small team needs to see what it pays and when it renews.",
        tradeoff: "A full overview answers ‘what are we paying for?’, but every upgrade prompt on it makes it feel like a sales page. Lead with what the org has, and keep what higher plans add to one clear section.",
        use: [
          "The product is paid, and someone has to justify the spend.",
          "Plans include different features or limits that admins need to compare.",
          "Renewal and cancellation terms affect what admins can do and when.",
          "Several products or contracts need showing side by side."
        ],
        avoid: [
          "Billing happens entirely outside the product, through a reseller or contract. Link to it instead.",
          "The page would mostly exist to sell upgrades.",
          "There’s one free plan with nothing to manage."
        ],
        alternatives: [
          ["Billing portal from the payment provider", "When billing is simple and handled by a provider. Link out, and show only the plan name in the console."],
          ["Contract summary", "When enterprises buy by contract. Show terms, volumes and dates, with a contact instead of self-service changes."],
          ["Usage-first page", "When cost follows usage. Lead with usage and forecast, and put plan details below."]
        ]
      },
      "Seat assignment": {
        payoff: "At thousands, when licences are limited, assigned by group, and reclaimed from people who left.",
        tradeoff: "Assigning seats by hand gives exact control, but it drifts as people join and leave. Assigning by group stays accurate, but makes it harder to see why one person has a licence.",
        use: [
          "Licences are limited and paid per seat.",
          "Different people need different licence types or add-ons.",
          "Unused licences cost money and should be reclaimed.",
          "New people need a licence the day they join."
        ],
        avoid: [
          "Everyone in the org gets the same access, billed as a flat fee.",
          "Licences are assigned automatically to anyone who signs in, and that’s the deal the org wants.",
          "Seat counts here would disagree with what billing charges."
        ],
        alternatives: [
          ["Group-based licensing only", "When access follows teams. Licences come with the group, and the console shows each person’s source."],
          ["Assign on first sign-in", "When growth matters more than control. Give a seat when someone first signs in, and true up later."],
          ["Org-wide licence", "When the contract covers everyone. Nothing to assign, only usage to report."]
        ]
      },
      "Add seats": {
        payoff: "At thousands, when buying more seats is routine and the cost has to be clear before anyone commits.",
        tradeoff: "One-click buying keeps new hires unblocked, but surprises finance. A quote or approval path keeps spend controlled, but slows people down. Show the price either way.",
        use: [
          "Admins buy seats themselves, by card or on account.",
          "Prices depend on proration, tiers or contract rates.",
          "Seats running out would block new people.",
          "Purchases above a set amount need approval."
        ],
        avoid: [
          "All purchasing goes through procurement. Offer a request or quote instead of a checkout.",
          "Seats are unlimited under the contract.",
          "The admin can’t see the price, so the flow would charge without a clear amount."
        ],
        alternatives: [
          ["Request a quote", "When enterprises buy by purchase order. Collect the count and send a quote."],
          ["Temporary overage with true-up", "When blocking new hires is worse than a later bill. Allow going over, and settle at renewal."],
          ["Approval before purchase", "When spend needs a second person. Route the request to a billing owner."]
        ]
      },
      "Invoices & payment": {
        payoff: "From the start: anyone paying needs receipts and a way to fix a failed payment.",
        tradeoff: "Self-service payment keeps things running, but card details and invoices are sensitive. Limit who can change payment details, and give finance read-only access.",
        use: [
          "The org pays the product directly, by card or invoice.",
          "Finance teams need invoices that match their records, with PO numbers and tax IDs.",
          "Failed payments can happen and need fixing before access is affected.",
          "Several billing contacts or entities are involved."
        ],
        avoid: [
          "A reseller or partner bills the org. Show who to contact instead.",
          "Invoices are only ever needed by finance in their own system. Send them there.",
          "The page would show full card numbers or other details that should stay masked."
        ],
        alternatives: [
          ["Invoices by email only", "When finance never signs in. Send each invoice to billing contacts, and keep a copy in the console."],
          ["Finance system integration", "When the org reconciles automatically. Send invoices to their system."],
          ["Billing contact role", "When finance needs access but not admin rights. A role that can see invoices and nothing else."]
        ]
      }
    }
  },

  "creation-flows": {
    overview: {
      sizes: [
        ["Tens of people", ["Create modal", "Inline create", "Success & next steps"], "Admins create things one at a time with a short form. Good defaults matter more than options."],
        ["Thousands", ["Multi-step wizard", "Create from template", "Duplicate / clone"], "The same kinds of things are created over and over. Guided setups, templates and cloning keep results consistent."],
        ["Hundreds of thousands", [], "The same patterns, with most objects created by API, configuration or provisioning rules. The UI handles exceptions and must match what the automation would create."]
      ],
      principles: [
        "Match the container to the complexity: inline for a single field, a modal for a few, a page or wizard for many.",
        "Ask only what can’t be defaulted, and show the defaults before creating.",
        "Name and own everything at creation. Unowned, unnamed objects become clutter nobody can clean up."
      ]
    },
    intro: "Creation flows trade speed for guidance. The quicker it is to create something, the more often it’s created half set up; the more guided it is, the longer the simple case takes.",
    patterns: {
      "Create modal": {
        payoff: "From the start, for small objects with a few fields.",
        tradeoff: "A modal keeps the admin in context, but it has no room to grow, and it hides the page behind it, which is sometimes the reference the admin needs.",
        use: [
          "The object needs a few fields, such as a group, tag or API key.",
          "Admins create it while working on a list, and want to stay there.",
          "Defaults cover most settings, and the rest can be edited later.",
          "Admins create several in a row."
        ],
        avoid: [
          "The form needs more than one screen or several sections.",
          "Admins need to look at the page behind while filling it in.",
          "A single field would do. Create it inline instead."
        ],
        alternatives: [
          ["Inline create", "When one field is enough. Add the row in place."],
          ["Full page", "When the form is long or has sections. Give it its own page with a clear way back."],
          ["Side panel", "When admins need the list in view while filling in a medium form."]
        ]
      },
      "Multi-step wizard": {
        payoff: "At thousands, for setups where later choices depend on earlier ones, such as SSO or an integration.",
        tradeoff: "Steps make a complex setup manageable, but they hide what comes next and slow down people who already know the answers. Keep each step to one decision, and end with a review.",
        use: [
          "Later choices depend on earlier ones.",
          "The setup is long and may be finished by someone else later.",
          "Mistakes are costly, so a review before finishing matters.",
          "Each step needs its own explanation."
        ],
        avoid: [
          "Steps would have no decisions in them, only fields.",
          "Experienced admins create this often. One form with sections is quicker.",
          "Every step is optional. Use a single page with defaults."
        ],
        alternatives: [
          ["One page with sections", "When choices don’t depend on each other. Everything visible, with a summary at the end."],
          ["Checklist after creation", "When the object can exist half set up. Create it, then guide the remaining steps."],
          ["Configuration file", "When admins set it up many times. Import a file instead of clicking through."]
        ]
      },
      "Create from template": {
        payoff: "At thousands, when the same kind of thing is created often and should follow the org’s standards.",
        tradeoff: "Templates make the right setup the easy one, but every template needs an owner and keeping up to date, and a gallery nobody curates becomes noise.",
        use: [
          "The org has standards for naming, permissions or defaults.",
          "Many admins create the same kind of object and results should match.",
          "Some objects must follow policy, such as workspaces for regulated teams.",
          "Admins want a head start rather than a blank form."
        ],
        avoid: [
          "Each object is different, so a template would be changed every time.",
          "Nobody would own or update the templates.",
          "Defaults alone would give the same result."
        ],
        alternatives: [
          ["Better defaults", "When one setup fits most cases. Make it the default and skip the gallery."],
          ["Duplicate an existing one", "When the best example is something that already exists."],
          ["Enforced policy", "When the rule must always apply. Apply it automatically instead of hoping people choose the template."]
        ]
      },
      "Inline create": {
        payoff: "From the start, for lightweight items added while working in a list.",
        tradeoff: "Creating in place is the fastest flow there is, but it’s easy to create things by accident or half-name them. Make saving explicit, and keep the row if validation fails.",
        use: [
          "The item needs one or two fields, such as a tag or a label.",
          "Admins add several while working in the same list.",
          "The new item should appear where it will live."
        ],
        avoid: [
          "The item needs more than a few fields.",
          "Creating it has side effects, such as inviting people or charging for seats.",
          "The list is sorted so the new row would jump out of view."
        ],
        alternatives: [
          ["Create modal", "When a few more fields are needed."],
          ["Bulk add", "When admins add many at once. Paste a list or upload a file."],
          ["Create from search", "When people type a value that doesn’t exist yet. Offer ‘Create tag Q4’ in the menu."]
        ]
      },
      "Duplicate / clone": {
        payoff: "At thousands, when a good existing setup is the fastest starting point.",
        tradeoff: "Cloning copies a proven setup in seconds, and also copies things nobody meant to: members, secrets, history. Say exactly what comes along.",
        use: [
          "A new object should be like an existing one with small changes.",
          "Admins roll out one setup to many teams or regions.",
          "The existing object holds settings that are tedious to recreate."
        ],
        avoid: [
          "Copying would bring access or secrets that shouldn’t move.",
          "A template already captures the standard setup.",
          "The original is out of date, so copies would spread its problems."
        ],
        alternatives: [
          ["Create from template", "When the setup is a standard the org maintains."],
          ["Export and import", "When the setup moves between environments or orgs."],
          ["Bulk clone", "When the same setup goes to many teams at once. Run it as a job."]
        ]
      },
      "Success & next steps": {
        payoff: "From the start: every create flow needs to say it worked and what to do next.",
        tradeoff: "Suggesting next steps helps admins finish the setup, but a long list of suggestions gets ignored. Offer the two or three that matter for this object.",
        use: [
          "The new object isn’t useful until more is done, such as adding members or verifying a domain.",
          "Creation runs in the background and finishes later.",
          "Admins need to find the new object quickly."
        ],
        avoid: [
          "The object is complete on creation and there’s nothing next. Show it in the list and move on.",
          "The suggestions would be generic and the same for every object.",
          "The success step would interrupt admins creating many in a row."
        ],
        alternatives: [
          ["Open the new object", "When its page already shows what’s missing. Go straight there."],
          ["Setup checklist on the object", "When setup takes days. A checklist on the object’s page that persists."],
          ["Toast with a link", "When creation is routine. Confirm and link, without a full success screen."]
        ]
      }
    }
  },

  "destructive-actions": {
    overview: {
      sizes: [
        ["Tens of people", ["Delete confirmation", "Type-to-confirm", "Undo toast", "Danger zone"], "Confirmations that name the item and its consequences, undo for routine deletes, and the few irreversible actions kept apart and asking for the name."],
        ["Thousands", ["Archive vs. delete", "Cascading impact"], "Deletes reach into content, access and integrations. The reversible option comes first, and dependents are shown before anything goes."],
        ["Hundreds of thousands", [], "The same patterns, with approvals, retention and legal-hold checks, staged deletions and complete audit records."]
      ],
      principles: [
        "Offer the reversible option first: archive, suspend or disable before delete.",
        "Make consequences concrete with names and counts, not generic warnings.",
        "Scale the friction to the risk. A tag deletion needs undo; deleting an org needs typed confirmation."
      ]
    },
    intro: "Destructive actions trade safety for speed. Every confirmation protects against a mistake and slows down everyone who meant it. The aim is friction that matches the risk.",
    patterns: {
      "Delete confirmation": {
        payoff: "From the start, for any delete that can’t simply be undone.",
        tradeoff: "A confirmation catches mistakes, but confirmations shown for everything get clicked through without reading. Use them where the consequences are worth reading.",
        use: [
          "The delete removes more than the item: access, links, shared copies.",
          "It can’t be undone, or only from Trash within a window.",
          "Several items are deleted at once.",
          "The admin may not know what depends on the item."
        ],
        avoid: [
          "The action is routine and reversible. Use undo instead.",
          "The dialog would only say ‘Are you sure?’ with nothing specific.",
          "The action is so risky it needs typed confirmation or approval."
        ],
        alternatives: [
          ["Undo toast", "When the action is reversible and frequent."],
          ["Type-to-confirm", "When the action is irreversible and high impact."],
          ["Approval by a second admin", "When one person shouldn’t be able to do it alone."]
        ]
      },
      "Type-to-confirm": {
        payoff: "From the start, for the one or two actions that can’t be undone, such as deleting the org.",
        tradeoff: "Typing the name forces a pause, but it adds friction for everyone, including people for whom typing is hard. Keep it for the rare action where a pause is worth it.",
        use: [
          "The action is irreversible and affects a lot: an org, a sandbox, a production integration.",
          "Similar names make it easy to act on the wrong thing.",
          "Auditors expect evidence that the action was deliberate."
        ],
        avoid: [
          "The deletion is routine, or can be restored.",
          "The text to type would be long or random.",
          "An approval step would protect better than typing."
        ],
        alternatives: [
          ["Delete confirmation", "When the action can be restored, even within a window."],
          ["Approval by a second person", "When the risk is one person acting alone."],
          ["Delayed deletion", "When a cooling-off period helps. Schedule it for 30 days and allow cancelling."]
        ]
      },
      "Archive vs. delete": {
        payoff: "At thousands, when most deletes are really ‘get this out of the way’ and something would be lost for good.",
        tradeoff: "Archive gives admins a safe default, but it’s one more choice, and archived things still cost storage or seats. Make the difference between them concrete.",
        use: [
          "Most people who delete want the item hidden, not destroyed.",
          "Items may be needed again, for audits or a returning team.",
          "Deleting would remove history that matters."
        ],
        avoid: [
          "Items must be deleted for privacy or legal reasons. Archive would keep data that should go.",
          "Archived items would keep costing seats or storage without anyone noticing.",
          "There’s no view for archived items, so they’d be lost anyway."
        ],
        alternatives: [
          ["Trash with a recovery window", "When the risk is accidental deletion. Delete, and keep it restorable for 30 days."],
          ["Suspend or disable", "When the item should stop working but stay intact, such as an account or integration."],
          ["Archive by rule", "When inactivity decides. Archive anything unused for a year automatically."]
        ]
      },
      "Undo toast": {
        payoff: "From the start, for frequent actions that are easy to reverse.",
        tradeoff: "Undo keeps admins moving without a dialog, but it only protects for as long as the toast is on screen. Pair it with another way back, such as Trash.",
        use: [
          "The action is frequent and low risk, such as removing a tag or moving a file to Trash.",
          "It can be reversed exactly, or held back until the undo window ends.",
          "A confirmation every time would slow admins down."
        ],
        avoid: [
          "The action can’t really be reversed.",
          "The action is high impact. A missed toast would mean a real loss.",
          "Many toasts would stack and cover the page."
        ],
        alternatives: [
          ["Trash", "When people notice mistakes later. Keep deleted items for 30 days."],
          ["Delete confirmation", "When the consequences need reading before acting."],
          ["Version history", "When the change is an edit, not a delete."]
        ]
      },
      "Cascading impact": {
        payoff: "At thousands, when deleting one thing reaches into access, content and integrations elsewhere.",
        tradeoff: "Showing every dependent makes consequences clear, but a long list overwhelms. Group them by what happens, and block only on what would break.",
        use: [
          "Other things depend on the item: people, saved settings, integrations.",
          "Some dependents would break, not just be removed.",
          "Admins can fix dependents before deleting."
        ],
        avoid: [
          "The item has no dependents. A plain confirmation is enough.",
          "Dependents can’t be worked out reliably. A list that might be wrong is worse than none.",
          "The list would be thousands long. Show counts with a link to the full list."
        ],
        alternatives: [
          ["Block until resolved", "When any dependent would break. Say what to fix, and stop there."],
          ["Replace on delete", "When dependents can move automatically. Ask which role or group should take over."],
          ["Impact report", "When the chain is long. Generate a report to review before deleting."]
        ]
      },
      "Danger zone": {
        payoff: "From the start, for the few settings that can’t be undone.",
        tradeoff: "A separate section keeps irreversible actions away from routine settings, but makes it look like the only dangerous place. Keep it short, and still confirm each action.",
        use: [
          "A settings page mixes routine changes with a few irreversible ones.",
          "Only owners should see or use those actions.",
          "Admins need to find them when they really mean it."
        ],
        avoid: [
          "There’s only one dangerous action. Confirm it where it lives.",
          "The section would grow into a dumping ground for anything risky.",
          "The actions belong next to what they affect, such as deleting a group on its own page."
        ],
        alternatives: [
          ["Action on the object’s page", "When the action is about one object. Keep it with that object, behind a menu."],
          ["Owner-only page", "When there are many owner actions. Give them their own page."],
          ["Support request", "When the action is rare and risky. Ask support to do it with verification."]
        ]
      }
    }
  },

  "edit-bulk-actions": {
    overview: {
      sizes: [
        ["Tens of people", ["Selection model", "Contextual action bar", "Inline edit"], "Checkboxes on a page, a few actions, and quick fixes in place."],
        ["Thousands", ["Bulk edit", "Progress & results"], "Selections span pages, the same change goes to hundreds of records, and actions run in the background with partial failures to report."],
        ["Hundreds of thousands", [], "The same patterns, acting on queries rather than selections. Changes are queued, throttled, logged and sometimes approved first."]
      ],
      principles: [
        "Make the scope unmistakable: these 50 rows, all 12,408 matches, or a saved query.",
        "Preview the impact before running: how many records, and what changes.",
        "Log every bulk action as one auditable event with the full list of affected records."
      ]
    },
    intro: "Bulk actions trade effort for risk. One decision instead of a thousand clicks is a huge saving, and one mistake now reaches a thousand records.",
    patterns: {
      "Selection model": {
        payoff: "From the start: any list that has actions on more than one row needs selection.",
        tradeoff: "Selecting across pages makes bulk work possible, but the selected items aren’t on screen. The count and scope must always be visible.",
        use: [
          "Admins act on several rows at once.",
          "Lists are paged or filtered, and actions need to reach rows not on screen.",
          "Admins pick ranges or patterns of rows."
        ],
        avoid: [
          "Actions only ever apply to one row. Put them on the row.",
          "The action applies to everything matching a filter. Act on the filter instead.",
          "Clicking a row also opens it, and checkboxes would make rows ambiguous."
        ],
        alternatives: [
          ["Act on a filter", "When the set is defined by a rule. ‘Suspend everyone inactive for 90 days’."],
          ["Row actions only", "When bulk actions aren’t needed."],
          ["Upload a list", "When the set comes from elsewhere, such as a spreadsheet of names."]
        ]
      },
      "Contextual action bar": {
        payoff: "From the start, once there’s selection and more than one action.",
        tradeoff: "Showing actions only on selection keeps the page calm, but hides what’s possible until something is chosen. Keep the bar in a fixed place and its actions in a fixed order.",
        use: [
          "Several actions apply to selected rows.",
          "Some actions don’t apply to every selected item and need explaining.",
          "Destructive actions need to sit apart from common ones."
        ],
        avoid: [
          "There’s one bulk action. A button above the list is enough.",
          "The bar would cover the rows being worked on.",
          "Actions would change order depending on the selection."
        ],
        alternatives: [
          ["Toolbar always visible", "When actions should be discoverable. Disable them until rows are selected."],
          ["Menu on the selection count", "When there are many actions. One ‘Actions’ menu next to the count."],
          ["Row actions", "When most work is on single items."]
        ]
      },
      "Bulk edit": {
        payoff: "At thousands, when the same field changes on hundreds of records at once.",
        tradeoff: "Editing many records at once saves hours, but replace, add and remove are easy to confuse, and one wrong choice changes every record. Name the operation and preview the result.",
        use: [
          "The same field changes across many records, such as groups after a re-org.",
          "Fields can hold several values, so adding and replacing differ.",
          "Changes need a preview and a record."
        ],
        avoid: [
          "The field is synced from another system. Change it there.",
          "Each record needs a different value. Use import instead.",
          "The change has large side effects, such as role or email."
        ],
        alternatives: [
          ["Import a file", "When each record gets its own value."],
          ["Rule-based assignment", "When the value follows another field. ‘Everyone in Fleet gets Hoth Evacuation’."],
          ["Edit in the source system", "When the field is synced from HR or the identity provider."]
        ]
      },
      "Inline edit": {
        payoff: "From the start, for quick corrections to a single field in a list.",
        tradeoff: "Editing in place is fast, but in a dense table it causes accidental edits. Make editing a deliberate step with visible Save and Cancel.",
        use: [
          "Admins correct one field on one row, such as a name or label.",
          "Leaving the list to edit would lose their place.",
          "The field has no side effects."
        ],
        avoid: [
          "The field has side effects, such as email, role or owner.",
          "Most cells would be editable, inviting accidental changes.",
          "Edits need review or approval."
        ],
        alternatives: [
          ["Edit in a side panel", "When several fields change together."],
          ["Detail page", "When the edit needs context or has side effects."],
          ["Bulk edit", "When the same correction applies to many rows."]
        ]
      },
      "Progress & results": {
        payoff: "At thousands, when bulk actions take longer than a click and some items will fail.",
        tradeoff: "A job with progress and results keeps admins informed, but adds a place to check and something to dismiss. Report partial success honestly, and keep the page usable meanwhile.",
        use: [
          "Actions take more than a few seconds.",
          "Some items may be skipped or fail, and the admin needs to know which.",
          "Admins need to leave and come back, or be notified."
        ],
        avoid: [
          "Actions finish instantly and always succeed. A toast is enough.",
          "Nobody will read the results.",
          "Failures can’t be retried or explained."
        ],
        alternatives: [
          ["Toast with a summary", "When actions are quick and rarely fail."],
          ["Jobs page", "When admins run many jobs. List them all with status and results."],
          ["Email or notification", "When jobs take hours. Notify on completion with a link to results."]
        ]
      }
    }
  },
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
