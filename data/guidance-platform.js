/* Guidance for the Platform & configuration group.
   Same shape as guidance.js. Tags: WCAG 2.2 success criteria or UD principles. */

Object.assign(window.WCAG, {
  "2.2.2": "Pause, Stop, Hide",
  "2.4.5": "Multiple Ways",
  "3.2.3": "Consistent Navigation",
  "1.4.3": "Contrast (Minimum)"
});

Object.assign(window.GUIDANCE, {

  /* ------------------------------------------------------------------ */
  "billing-licenses": {
    scale: {
      intro: "Billing is where the product meets procurement. Small teams pay by card and add seats on a whim; enterprises sign contracts, buy licences in blocks, allocate them across departments, and true up once a year. The admin’s real questions are ‘what are we paying for, who is using it, and what happens if we add or remove people?’ Money makes every surprise expensive, so predictability matters more than speed.",
      tiers: [
        ["Tens", "One plan, a card on file, seats added automatically as people join."],
        ["Thousands", "Several products and licence types, seats assigned by group, unused licences reclaimed regularly."],
        ["Hundreds of thousands", "Contracts with committed volumes, licences allocated by cost centre, true-ups, purchase orders, and finance teams who never log into the product."]
      ],
      principles: [
        "Show the cost of every change before it’s made, including proration.",
        "Separate who can see billing from who can change it, and both from who can assign licences.",
        "Make unused licences visible. Reclaiming them is often the fastest way to save money.",
        "Never let a billing issue lock people out without warning and a grace period.",
        "Support how enterprises actually buy: contracts, invoices, purchase orders and cost centres."
      ]
    },
    patterns: {
      "Plan overview": {
        think: [
          "The overview answers: what plan are we on, what does it include, what does it cost, and when does it renew?",
          "Admins often come here to justify spend or plan a change."
        ],
        do: [
          "Show plan name, price, billing period, renewal date and payment method.",
          "Show seats purchased, assigned and available, by product.",
          "Show what the plan includes, and what higher plans add.",
          "Make renewal terms and cancellation clear."
        ],
        dont: [
          "Don’t hide renewal dates or auto-renewal.",
          "Don’t make the overview a sales page for upgrades.",
          "Don’t show prices without the currency and whether tax is included."
        ],
        access: [
          ["WCAG 1.3.1", "Present plan details as a description list or table."],
          ["WCAG 1.4.1", "Usage bars are labelled with numbers, not only colour."],
          ["UD 4", "State renewal in words and dates, such as ‘Renews automatically on 1 March 2027’."]
        ],
        scale: [
          "Enterprises have several contracts and products. Show each with its own terms and usage.",
          "Allocate cost by department or cost centre for chargeback.",
          "Give finance read-only access without admin rights."
        ]
      },

      "Seat assignment": {
        think: [
          "Licences are a limited resource. Admins assign them, reclaim them, and explain who has which.",
          "Assignment should follow group membership wherever possible, so it stays accurate."
        ],
        do: [
          "Show who has which licence, with last activity, so unused ones are easy to spot.",
          "Assign licences by group, with individual overrides.",
          "Reclaim licences from inactive users in bulk, with notice.",
          "Warn before running out, and explain what happens to new people when seats are full."
        ],
        dont: [
          "Don’t remove licences without telling users and preserving their data.",
          "Don’t assign paid licences automatically without the admin knowing.",
          "Don’t show licence counts that disagree with billing."
        ],
        access: [
          ["WCAG 1.3.1", "The assignment list is a table with headers for user, licence and last activity."],
          ["WCAG 4.1.3", "Announce how many licences were assigned or reclaimed."],
          ["UD 5", "Give a grace period after reclaiming, so mistakes can be reversed."]
        ],
        scale: [
          "Group-based licensing keeps hundreds of thousands of assignments accurate as people move.",
          "Report licence use by department for true-ups.",
          "Automate reclaiming from people who leave or stay inactive."
        ]
      },

      "Add seats": {
        think: [
          "Adding seats is a purchase. The admin must know the cost before committing.",
          "Enterprises often can’t buy by card; they need quotes and purchase orders."
        ],
        do: [
          "Show the price per seat, the prorated charge today and the new recurring total.",
          "Confirm the purchase with a clear summary.",
          "Offer a request or quote path for admins who can’t purchase directly.",
          "Send a receipt and update seat counts immediately."
        ],
        dont: [
          "Don’t charge without a confirmation step that shows the amount.",
          "Don’t pre-select extra products or add-ons.",
          "Don’t hide proration rules."
        ],
        access: [
          ["WCAG 3.3.4", "Financial transactions must be reversible, checked, or confirmed."],
          ["WCAG 3.3.2", "Label quantity fields and show the price update next to them."],
          ["WCAG 4.1.3", "Announce price changes as quantity changes."],
          ["UD 5", "Show a final review before purchase."]
        ],
        scale: [
          "Large orgs add seats through procurement. Generate quotes and accept purchase orders.",
          "Allow temporary overage with a true-up, so new hires aren’t blocked.",
          "Require approval for purchases above a threshold."
        ]
      },

      "Invoices & payment": {
        think: [
          "Invoices are for finance teams. They need accurate, downloadable documents that match their records.",
          "Payment problems need early, clear warnings with a way to fix them."
        ],
        do: [
          "List invoices with date, amount, status and a downloadable PDF.",
          "Allow updating payment methods and billing contacts.",
          "Let admins add tax IDs, PO numbers and billing addresses to invoices.",
          "Warn well ahead of failed payments affecting access."
        ],
        dont: [
          "Don’t suspend service immediately on a failed payment.",
          "Don’t show full card numbers.",
          "Don’t make invoices available only by email."
        ],
        access: [
          ["WCAG 1.3.1", "The invoice list is a table with headers."],
          ["WCAG 2.4.4", "Download links name the invoice, such as ‘Download invoice for October 2026’."],
          ["UD 4", "Payment status is shown in words, not only colour."]
        ],
        scale: [
          "Send invoices to billing contacts and integrate with finance systems.",
          "Support multiple billing entities and currencies.",
          "Keep a complete billing history for audits."
        ]
      }
    }
  },

  /* ------------------------------------------------------------------ */
  "integrations-api": {
    scale: {
      intro: "Integrations and API keys are how other software gets into the org’s data. Every connected app and every key is a door, often opened by one person years ago and forgotten. At enterprise size there are hundreds of apps and thousands of keys, and the admin’s job is to know which doors exist, what each can reach, who opened it, and whether it’s still needed.",
      tiers: [
        ["Tens", "A few connected apps and a couple of API keys, all known to the admin."],
        ["Thousands", "Many teams connect their own apps. Admins approve integrations, review permissions and rotate keys."],
        ["Hundreds of thousands", "Hundreds of integrations, service accounts and webhooks. Approved app lists, scoped keys with expiry, usage monitoring and automatic revocation."]
      ],
      principles: [
        "Grant the narrowest scope that works, and show it plainly.",
        "Every integration and key has an owner, a purpose and a last-used date.",
        "Keys expire by default. Permanent keys are the exception and are reviewed.",
        "Show what each integration can reach in plain language, not just scope codes.",
        "Make revocation instant and complete."
      ]
    },
    patterns: {
      "Integration catalog": {
        think: [
          "The catalog is where admins discover, approve and connect apps.",
          "In larger orgs, the catalog also sets which apps people may connect themselves."
        ],
        do: [
          "Show each integration with a description, what it accesses, who makes it, and whether it’s connected.",
          "Let admins pre-approve or block apps for the org.",
          "Explain permissions before connecting.",
          "Show which integrations are in use and by whom."
        ],
        dont: [
          "Don’t let users connect apps with broad access without admin approval in managed orgs.",
          "Don’t show permission requests only as scope codes.",
          "Don’t mix partner promotion with security information."
        ],
        access: [
          ["WCAG 1.1.1", "App logos have text alternatives, or the app name is next to them."],
          ["WCAG 2.4.4", "‘Connect’ buttons name the app."],
          ["UD 3", "Describe what each app can do in everyday terms."]
        ],
        scale: [
          "Maintain an approved app list and request process.",
          "Search and filter by category, status and risk.",
          "Report integrations by data access level."
        ]
      },

      "App permissions": {
        think: [
          "Connected apps keep their access long after anyone remembers granting it. Reviewing them is a key security task.",
          "Admins need to see what each app can do and revoke it quickly."
        ],
        do: [
          "List connected apps with scopes, who authorised them, when, and last activity.",
          "Explain scopes in plain language, such as ‘Can read all files’.",
          "Revoke access for one user or the whole org.",
          "Flag apps with broad access or no recent activity."
        ],
        dont: [
          "Don’t hide user-authorised apps from admins.",
          "Don’t make revocation slow or partial.",
          "Don’t let apps keep working after the person who authorised them leaves, without review."
        ],
        access: [
          ["WCAG 1.3.1", "Use a table with headers for app, scopes, authorised by and last used."],
          ["WCAG 3.3.4", "Confirm revocations that affect many users."],
          ["UD 4", "Mark broad access in words, such as ‘Full access’, not only an icon."]
        ],
        scale: [
          "Thousands of user-authorised apps need grouping by app, with counts of users.",
          "Run periodic access reviews for connected apps.",
          "Revoke automatically after long inactivity."
        ]
      },

      "Create API key": {
        think: [
          "An API key is a password for software. It should be narrow, owned and short-lived.",
          "The secret is shown once. Make that moment clear and safe."
        ],
        do: [
          "Ask for a name, owner, scopes and expiry.",
          "Default to the narrowest scopes and a set expiry.",
          "Show the secret once with a copy button and a clear warning that it won’t be shown again.",
          "List keys with last used date and allow rotation."
        ],
        dont: [
          "Don’t create keys with full access by default.",
          "Don’t show the secret again after creation.",
          "Don’t allow keys without an owner."
        ],
        access: [
          ["WCAG 3.3.8", "Allow copying the key; never require people to transcribe it."],
          ["WCAG 4.1.3", "Announce ‘Copied’ after copying."],
          ["WCAG 3.3.2", "Explain each scope in plain words."],
          ["UD 5", "Warn clearly before closing the dialog that shows the secret."]
        ],
        scale: [
          "Enforce maximum expiry and scope policies for the org.",
          "Detect leaked keys and revoke them automatically.",
          "Report keys by owner, age and use, and flag those unused for long periods."
        ]
      },

      "Webhooks": {
        think: [
          "Webhooks push events to other systems. Admins need to know what is sent where, and whether it’s arriving.",
          "Failures are silent unless the UI shows them."
        ],
        do: [
          "Let admins choose events, endpoint and signing secret.",
          "Send a test event and show the response.",
          "Show delivery history with status codes and retry information.",
          "Pause and resume webhooks, and replay failed deliveries."
        ],
        dont: [
          "Don’t accept non-HTTPS endpoints.",
          "Don’t disable webhooks silently after failures.",
          "Don’t send all events by default."
        ],
        access: [
          ["WCAG 1.3.1", "Delivery logs are tables with headers."],
          ["WCAG 1.4.1", "Success and failure use text and icons, not only colour."],
          ["UD 4", "Explain failures in plain words, such as ‘Endpoint returned 500. Retrying in 5 minutes’."]
        ],
        scale: [
          "Handle high event volumes with queues, retries and backoff.",
          "Alert owners when deliveries fail repeatedly.",
          "Keep delivery logs for a defined period."
        ]
      }
    }
  },

  /* ------------------------------------------------------------------ */
  "settings": {
    scale: {
      intro: "Org settings start as one page and become a hundred. Each one is a decision that applies to everyone unless something overrides it. At enterprise size settings are inherited from parent orgs, overridden by regions, locked by policy, and changed by several admins with different responsibilities. The design job is findability and clarity: where is the setting, what is it set to, who set it, and does it actually apply here?",
      tiers: [
        ["Tens", "A single settings page with a few sections."],
        ["Thousands", "Settings span many pages. Search becomes essential. Some settings vary by group."],
        ["Hundreds of thousands", "Settings inherit through org hierarchies, are locked by parent admins, change through review, and are managed as configuration by automation."]
      ],
      principles: [
        "Make every setting findable by search.",
        "Show where each value comes from: default, set here, inherited, or locked by policy.",
        "Explain the effect of a setting next to it, not in separate docs.",
        "Log every change with the old and new value.",
        "Keep settings consistent across pages: same controls, same save behaviour, same language."
      ]
    },
    patterns: {
      "Settings navigation": {
        think: [
          "Admins come to settings looking for one thing. Navigation should get them there quickly.",
          "Group settings by what admins are trying to do, not by internal system structure."
        ],
        do: [
          "Use a left nav grouped by area, with search across all settings.",
          "Search should find individual settings, not just pages, and jump to them.",
          "Keep the nav consistent across all settings pages.",
          "Give each setting a stable URL so it can be shared."
        ],
        dont: [
          "Don’t nest settings more than two levels deep.",
          "Don’t put the same setting in two places with different behaviour.",
          "Don’t rename sections often."
        ],
        access: [
          ["WCAG 2.4.5", "Offer more than one way to find a setting: navigation and search."],
          ["WCAG 3.2.3", "Navigation stays in the same order on every settings page."],
          ["WCAG 2.4.6", "Section headings describe their settings."],
          ["UD 3", "Group settings by task, in words admins use."]
        ],
        scale: [
          "Index all settings for search, including synonyms.",
          "Show only the settings an admin can change, with the rest read-only or hidden.",
          "Provide a configuration export of all settings."
        ]
      },

      "Org profile": {
        think: [
          "The org profile is the org’s identity in the product: name, logo, domain, contacts.",
          "Changes here are visible to everyone and sometimes to people outside the org."
        ],
        do: [
          "Show name, logo, primary domain, contacts, region and org ID.",
          "Preview how name and logo appear to users.",
          "Explain what changes affect, such as sign-in pages and emails.",
          "Make the org ID easy to copy for support."
        ],
        dont: [
          "Don’t let profile changes take effect without preview where they’re visible externally.",
          "Don’t require a support ticket to change basic details.",
          "Don’t accept logos without guidance on size and contrast."
        ],
        access: [
          ["WCAG 1.1.1", "Logos need text alternatives, usually the org name."],
          ["WCAG 3.3.2", "State image size and format requirements before upload."],
          ["UD 4", "Preview branding in light and dark themes."]
        ],
        scale: [
          "Large orgs have sub-orgs with their own profiles. Show the hierarchy.",
          "Log and notify on profile changes.",
          "Handle region and data residency information carefully."
        ]
      },

      "Defaults": {
        think: [
          "Defaults decide how most people experience the product. Few will ever change them.",
          "Admins need to see the product default, the org default and any overrides."
        ],
        do: [
          "Show the current default and explain its effect.",
          "Allow overrides by group, and show where overrides exist.",
          "Say whether changing a default affects existing users or only new ones.",
          "Offer a way to reset to the product default."
        ],
        dont: [
          "Don’t change defaults for existing users without saying so.",
          "Don’t hide overrides that make a default meaningless.",
          "Don’t ship insecure defaults."
        ],
        access: [
          ["WCAG 3.3.2", "Each default has a label and explanation."],
          ["WCAG 3.2.2", "Changing a default doesn’t apply until saved."],
          ["UD 5", "Provide a reset option."]
        ],
        scale: [
          "Show how many users each default affects.",
          "Roll out default changes in stages.",
          "Track default changes in the audit log."
        ]
      },

      "Save patterns": {
        think: [
          "Settings either save instantly or wait for a save button. Mixing the two on one page confuses everyone.",
          "Admins need to know whether a change has taken effect."
        ],
        do: [
          "Choose one save model per page and use it consistently.",
          "For explicit save, show a sticky save bar when there are unsaved changes.",
          "For instant save, show saving and saved states next to each control.",
          "Warn before leaving with unsaved changes."
        ],
        dont: [
          "Don’t mix instant toggles and a page save button without making it clear which is which.",
          "Don’t save high-risk settings instantly.",
          "Don’t show ‘Saved’ before the server confirms."
        ],
        access: [
          ["WCAG 3.2.2", "Changing a control doesn’t trigger unexpected saves or navigation."],
          ["WCAG 4.1.3", "Announce saved and error states."],
          ["WCAG 2.4.11", "A sticky save bar must not cover the focused control."],
          ["UD 5", "Warn about unsaved changes and allow discarding them."]
        ],
        scale: [
          "Handle concurrent edits by several admins with clear conflict messages.",
          "Require review for changes to sensitive settings.",
          "Support applying settings by API or configuration file."
        ]
      },

      "Inherited settings": {
        think: [
          "In large orgs, settings are set at the top and inherited down, with some allowed to be overridden.",
          "Admins lower down need to know why a setting is locked and who can change it."
        ],
        do: [
          "Show the source of each value: inherited from, set here, or locked by.",
          "Let admins override where allowed, and show the inherited value next to it.",
          "Explain locks and name who can change them.",
          "Offer ‘Reset to inherited’."
        ],
        dont: [
          "Don’t show locked settings as editable.",
          "Don’t hide that a value is inherited.",
          "Don’t make overrides silently stop following parent changes."
        ],
        access: [
          ["WCAG 4.1.2", "Locked controls are exposed as disabled, with a description of why."],
          ["WCAG 1.4.1", "Inheritance status is shown in text, not only by colour or opacity."],
          ["UD 4", "State the source in words, such as ‘Inherited from Acme Global’."]
        ],
        scale: [
          "Show a hierarchy view of where each setting is overridden.",
          "Report drift from parent settings.",
          "Allow parent admins to lock settings across many child orgs at once."
        ]
      }
    }
  },

  /* ------------------------------------------------------------------ */
  "usage-analytics": {
    scale: {
      intro: "Admin analytics answer whether the product is being used, whether it’s worth what it costs, and whether anything needs attention. Executives want adoption numbers; admins want to know who needs help and what to fix. At enterprise size, the numbers must be broken down by department and region, respect privacy, and be exportable into the org’s own reporting.",
      tiers: [
        ["Tens", "A few counts: active users, items created, recent activity."],
        ["Thousands", "Adoption by team, feature usage, trends, and scheduled reports for leaders."],
        ["Hundreds of thousands", "Breakdowns by org unit and region, privacy-preserving aggregates, exports to BI tools, and benchmarks."]
      ],
      principles: [
        "Lead with the question each metric answers, not the metric.",
        "Define every metric in place: what counts as active, over what period.",
        "Respect privacy. Aggregate where individual data isn’t needed, and follow regional rules.",
        "Make numbers consistent across the product, reports and exports.",
        "Turn insights into actions with links to where things can be changed."
      ]
    },
    patterns: {
      "Admin home": {
        think: [
          "The admin home is a briefing: what needs attention, how things are going, and shortcuts to common tasks.",
          "It should change based on what is actually happening in the org."
        ],
        do: [
          "Lead with items needing action, such as pending requests, expiring certificates or sync errors.",
          "Show a few key metrics with trends.",
          "Offer shortcuts to frequent tasks.",
          "Let admins dismiss or snooze items."
        ],
        dont: [
          "Don’t fill the home with marketing for other features.",
          "Don’t show metrics without context or comparison.",
          "Don’t make the home slow by loading every report."
        ],
        access: [
          ["WCAG 2.4.6", "Each card has a heading."],
          ["WCAG 1.1.1", "Charts have text summaries."],
          ["WCAG 2.4.1", "Allow skipping past cards to main navigation and content."],
          ["UD 3", "Prioritise action items at the top."]
        ],
        scale: [
          "Personalise by admin role and scope.",
          "Load cards independently so one slow card doesn’t block the page.",
          "Aggregate alerts across regions."
        ]
      },

      "Adoption metrics": {
        think: [
          "Adoption metrics show whether people use the product and its features.",
          "They’re often used to justify renewal or expansion, so they must be accurate and defined."
        ],
        do: [
          "Show active users by day, week and month, with clear definitions.",
          "Break down by group, region and feature.",
          "Show trends and compare periods.",
          "Link to who isn’t active, so admins can follow up."
        ],
        dont: [
          "Don’t use vague definitions of ‘active’.",
          "Don’t show individual activity where aggregate data is enough.",
          "Don’t rely on colour to distinguish series."
        ],
        access: [
          ["WCAG 1.1.1", "Provide text summaries and data tables for charts."],
          ["WCAG 1.4.1", "Distinguish lines with patterns or direct labels."],
          ["WCAG 1.4.11", "Chart lines and markers have 3:1 contrast."],
          ["UD 4", "Offer charts and tables, so people can choose."]
        ],
        scale: [
          "Pre-compute metrics and show when data was last updated.",
          "Apply privacy thresholds so small groups aren’t identifiable.",
          "Export to BI tools."
        ]
      },

      "Reports": {
        think: [
          "Reports package data for people outside the console: executives, finance and auditors.",
          "They should be reproducible: the same report for the same period gives the same numbers."
        ],
        do: [
          "Offer standard reports with clear descriptions and periods.",
          "Let admins schedule reports and send them to recipients.",
          "Export as CSV and PDF.",
          "Show report definitions and data freshness."
        ],
        dont: [
          "Don’t generate large reports on page load.",
          "Don’t email sensitive reports as attachments.",
          "Don’t change report definitions without notice."
        ],
        access: [
          ["WCAG 1.3.1", "Report tables have headers."],
          ["WCAG 2.4.2", "Generated PDF reports have titles and tagged structure."],
          ["UD 2", "Offer multiple formats."]
        ],
        scale: [
          "Generate reports in the background.",
          "Support custom reports through APIs.",
          "Keep a history of generated reports."
        ]
      },

      "Recommendations": {
        think: [
          "Recommendations suggest actions based on the org’s data, such as reclaiming unused licences or enabling MFA.",
          "They earn trust only if they’re accurate, explained and easy to dismiss."
        ],
        do: [
          "Explain why each recommendation appears and what it would change.",
          "Show the impact, such as ‘Saves 42 licences’.",
          "Let admins act in one step, or dismiss with a reason.",
          "Track which recommendations were acted on."
        ],
        dont: [
          "Don’t present upsells as recommendations.",
          "Don’t repeat dismissed recommendations.",
          "Don’t take action without confirmation."
        ],
        access: [
          ["WCAG 2.4.6", "Each recommendation has a heading."],
          ["WCAG 4.1.3", "Announce when a recommendation is applied or dismissed."],
          ["UD 3", "Use plain language for the reason and the action."]
        ],
        scale: [
          "Prioritise recommendations by impact.",
          "Group similar recommendations across regions.",
          "Measure outcomes of applied recommendations."
        ]
      }
    }
  },

  /* ------------------------------------------------------------------ */
  "notifications": {
    scale: {
      intro: "Notifications are how the console reaches admins and users when they’re not looking. Too few and an expiring certificate takes down sign-in; too many and every alert is ignored. At enterprise size, notifications must route to the right people by role and region, arrive through the channels they actually watch, and never become noise.",
      tiers: [
        ["Tens", "Emails to the one admin about important events."],
        ["Thousands", "Several admins with different responsibilities. Notification preferences and banners for org-wide notices."],
        ["Hundreds of thousands", "Routing by role and region, delivery to chat and incident tools, announcements to large audiences, and escalation."]
      ],
      principles: [
        "Notify only when someone needs to act or know.",
        "Route to the people responsible, not everyone.",
        "Every notification links to where the action can be taken.",
        "Let people choose channels, but keep critical security notices mandatory.",
        "Group repeated events instead of sending one message each."
      ]
    },
    patterns: {
      "Alert center": {
        think: [
          "The alert center is the inbox for things admins need to act on: security alerts, failures, expirations.",
          "Alerts must be prioritised, so critical ones aren’t lost among routine ones."
        ],
        do: [
          "List alerts with severity, time, summary and status.",
          "Let admins acknowledge, assign and resolve alerts.",
          "Link each alert to the details and the fix.",
          "Group repeated alerts."
        ],
        dont: [
          "Don’t show every event as an alert.",
          "Don’t use colour alone for severity.",
          "Don’t let alerts disappear without being resolved."
        ],
        access: [
          ["WCAG 1.4.1", "Severity uses text labels such as ‘Critical’."],
          ["WCAG 1.3.1", "Alerts are a list or table with headers."],
          ["WCAG 4.1.3", "New alerts are announced politely, not interrupting focus."],
          ["UD 4", "Summaries say what happened and what to do."]
        ],
        scale: [
          "Route alerts by role and region.",
          "Integrate with incident tools.",
          "Track response times."
        ]
      },

      "Banners": {
        think: [
          "Banners announce org-wide states: outages, maintenance, policy changes or required actions.",
          "They take space from everyone, so they must be important and dismissible where possible."
        ],
        do: [
          "Use banners for things affecting many people.",
          "State what is happening, what it means, and what to do.",
          "Allow dismissal for non-critical banners.",
          "Show end times for maintenance."
        ],
        dont: [
          "Don’t stack several banners.",
          "Don’t use banners for marketing.",
          "Don’t animate banners or auto-rotate messages."
        ],
        access: [
          ["WCAG 2.2.2", "Banners don’t move, scroll or auto-rotate without a way to pause them."],
          ["WCAG 4.1.3", "Banner messages are announced as status messages."],
          ["WCAG 1.4.3", "Banner text has sufficient contrast with its background."],
          ["UD 4", "Use text, not only icons, to state the banner’s purpose."]
        ],
        scale: [
          "Target banners by group or region.",
          "Schedule banners in advance.",
          "Track who has seen critical banners."
        ]
      },

      "Notification rules": {
        think: [
          "Rules decide who gets what, and how. Admins set org rules; users set personal preferences within them.",
          "Critical notices must not be turned off by accident."
        ],
        do: [
          "List events with recipients and channels.",
          "Let admins route by role, group or region.",
          "Mark mandatory notifications and explain why.",
          "Send a test notification."
        ],
        dont: [
          "Don’t send every notification to every admin.",
          "Don’t allow critical security notices to be disabled.",
          "Don’t hide where notifications go."
        ],
        access: [
          ["WCAG 1.3.1", "Rules are a table with event, recipients and channels."],
          ["WCAG 3.3.2", "Explain each event."],
          ["UD 2", "Offer email, chat and in-product channels."]
        ],
        scale: [
          "Use roles and groups rather than individual recipients.",
          "Rate-limit and digest frequent events.",
          "Escalate unacknowledged critical notifications."
        ]
      },

      "Announcements": {
        think: [
          "Announcements are admin-to-user messages, such as a policy change or a new tool.",
          "They reach many people, so they must be targeted, clear and respectful of attention."
        ],
        do: [
          "Let admins target by group, region or role.",
          "Preview the announcement as recipients will see it.",
          "Schedule announcements.",
          "Show reach and acknowledgements where needed."
        ],
        dont: [
          "Don’t send announcements to everyone by default.",
          "Don’t allow unreviewed announcements to the whole org.",
          "Don’t use announcements for routine updates."
        ],
        access: [
          ["WCAG 1.1.1", "Images in announcements need text alternatives."],
          ["WCAG 2.4.6", "Announcements have clear titles."],
          ["UD 1", "Write in plain language for a broad audience."]
        ],
        scale: [
          "Require approval for org-wide announcements.",
          "Support translations for global orgs.",
          "Track acknowledgements for required notices."
        ]
      }
    }
  }
});
