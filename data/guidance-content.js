/* Guidance for the Content & assets group.
   Same shape as guidance.js. Tags: WCAG 2.2 success criteria or UD principles. */

Object.assign(window.WCAG, {
  "1.1.1": "Non-text Content",
  "2.4.2": "Page Titled",
  "1.4.4": "Resize Text"
});

Object.assign(window.GUIDANCE, {

  /* ------------------------------------------------------------------ */
  "asset-management": {
    scale: {
      intro: "Admins rarely care about one file. They care about the org’s content as a whole: who owns it, who can see it, what is exposed outside, and what happens when people leave. At enterprise size there are hundreds of millions of items, so the admin console stops being a file browser and becomes a set of reports, policies and bulk actions with a way to drill down to the single item when something is wrong.",
      tiers: [
        ["Tens", "Admins browse content like users do and fix problems one item at a time."],
        ["Thousands", "Content is found by search and filter, not folders. Ownership transfers and external sharing need regular attention."],
        ["Hundreds of thousands", "Content is managed by policy and report: external sharing audits, orphaned content, retention and labels. Admins act on result sets, not items."]
      ],
      principles: [
        "Lead with questions, not folders: what is shared externally, what is orphaned, what is sensitive, what is stale.",
        "Respect user privacy. Admins often need metadata, not content. Show the least that answers the question, and log access to anything more.",
        "Every item has an owner. When people leave, ownership moves, it never just disappears.",
        "Make bulk actions safe: preview the set, show counts, run as a job, report results, and allow rollback where possible.",
        "Admin views of content must agree with what users see. Different numbers in two places destroy trust."
      ]
    },
    patterns: {
      "Asset library": {
        think: [
          "The admin library is an inventory, not a workspace. It answers ‘what do we have, who owns it, and is anything risky?’",
          "Admins look across everyone’s content at once. Search, filters and columns matter far more than folder trees."
        ],
        do: [
          "Lead with search across name, owner, type and tags, plus filters for owner, sharing level, last modified and size.",
          "Offer both a dense list view with sortable columns and a grid view for visual assets.",
          "Show owner, sharing state and last activity on every row, since those drive most admin decisions.",
          "Provide saved views for recurring checks, such as ‘Shared publicly’ or ‘Owner deactivated’."
        ],
        dont: [
          "Don’t make admins navigate folders to find content across the org.",
          "Don’t show content previews by default if admins only need metadata. It raises privacy concerns.",
          "Don’t rely on thumbnails alone to identify items. Many files look alike."
        ],
        access: [
          ["WCAG 1.1.1", "Thumbnails need text alternatives, usually the file name and type, or empty alt if the name is already next to them."],
          ["WCAG 1.3.1", "The list view is a real table with headers, so owner and sharing state are announced with each item."],
          ["WCAG 2.1.1", "Switching between grid and list, selecting items and opening menus all work by keyboard."],
          ["UD 2", "Offer list and grid views. Some people scan text faster, others recognise images."]
        ],
        scale: [
          "Hundreds of millions of items need a search index, not database queries from the UI. Show index freshness.",
          "Use cursor pagination and server-side sort. Counts above a threshold can be approximate, labelled ‘about 2.4M’.",
          "Exports of large result sets run as background jobs and arrive as files."
        ]
      },

      "Asset detail": {
        think: [
          "The detail page answers ‘what is this, who owns it, who can see it, and what has happened to it?’",
          "Admins arrive here mostly from a problem: an external share, a sensitivity alert, or a request from legal."
        ],
        do: [
          "Show owner, location, size, created and modified dates, and sensitivity label at the top.",
          "List everyone with access and how they got it: direct share, link, group or inheritance.",
          "Show recent activity: views, edits, downloads and sharing changes.",
          "Put the common admin actions together: change owner, remove external access, apply label, restore version."
        ],
        dont: [
          "Don’t open the file’s content just because an admin viewed its details.",
          "Don’t show access lists that leave out link-based or inherited access.",
          "Don’t mix admin actions with the owner’s own editing controls."
        ],
        access: [
          ["WCAG 2.4.6", "Use clear section headings: Details, Access, Activity, Versions."],
          ["WCAG 1.3.1", "Present metadata as a description list."],
          ["WCAG 2.4.2", "The page title names the item, so people with many tabs open can find it."],
          ["UD 4", "Describe sharing in words (‘Anyone with the link can view’), not only with an icon."]
        ],
        scale: [
          "Popular items have thousands of viewers. Summarise access by type and paginate the full list.",
          "Activity logs can be huge. Show recent items and link to a filtered audit log for the rest.",
          "Log admin views of sensitive items, since admin access is itself auditable."
        ]
      },

      "Transfer ownership": {
        think: [
          "Ownership transfer usually happens because someone left, changed role or went on leave. It is part of offboarding, not a standalone chore.",
          "The new owner inherits responsibility. They should know it happened and what they now own."
        ],
        do: [
          "Transfer everything a person owns in one action, with an option to choose specific items.",
          "Suggest the person’s manager as the default recipient.",
          "Keep existing sharing intact, and say so.",
          "Notify the new owner with a summary of what they received.",
          "Place transferred items in a clearly named folder, such as ‘From Alex Chen’."
        ],
        dont: [
          "Don’t transfer to a deactivated or external account.",
          "Don’t silently break shared links or permissions during transfer.",
          "Don’t delete the old owner before the transfer has finished."
        ],
        access: [
          ["WCAG 3.3.4", "Show a summary of what will move and to whom, and confirm before running."],
          ["WCAG 4.1.3", "Announce progress and completion of long transfers without moving focus."],
          ["UD 5", "Allow reassigning to a different owner afterward if the first choice was wrong."]
        ],
        scale: [
          "One person can own millions of items. Run transfers as jobs with progress, and resume after failures.",
          "Support bulk transfers for re-orgs, mapping many old owners to new ones from a file.",
          "Report items that failed to transfer, with reasons, so nothing is left orphaned."
        ]
      },

      "Sharing controls": {
        think: [
          "Sharing is where data leaves the org. Admins set the outer limits; people share within them.",
          "The question isn’t ‘can people share?’ but ‘with whom, how, and with what defaults?’"
        ],
        do: [
          "Set org-wide limits for external sharing: off, allowed domains only, or anyone, with a default link type.",
          "Allow different settings by group or sensitivity label.",
          "Default new links to the narrowest useful setting, such as ‘people in the org’.",
          "Offer link expiry and require passwords for external links where appropriate.",
          "Show a report of what is currently shared externally."
        ],
        dont: [
          "Don’t change sharing settings retroactively without showing how many existing shares are affected.",
          "Don’t make ‘anyone with the link’ the default.",
          "Don’t hide which setting wins when org, group and label policies disagree."
        ],
        access: [
          ["WCAG 3.3.2", "Explain each sharing option in plain words next to the choice."],
          ["WCAG 1.4.1", "Restriction levels use text labels, not only colour."],
          ["UD 3", "Present options in order from most to least restrictive, with the recommended one marked."]
        ],
        scale: [
          "Tightening policy affects millions of existing links. Preview the impact and roll out over time.",
          "Allowed-domain lists grow to hundreds of partners. Support import, labels and expiry.",
          "Run regular external sharing reports, and let owners confirm or remove their own shares."
        ]
      },

      "Versions & restore": {
        think: [
          "Version history is the undo button for the whole org: accidental edits, overwrites and ransomware all end here.",
          "Restoring is high stakes. People need to see what they’re restoring before they do it."
        ],
        do: [
          "List versions with time, author and a short description of the change.",
          "Preview a version before restoring it, and compare it with the current one where possible.",
          "Restore as a new version, so the current state is never lost.",
          "Support restoring a whole folder or account to a point in time."
        ],
        dont: [
          "Don’t overwrite the current version when restoring.",
          "Don’t hide how long versions are kept.",
          "Don’t show only timestamps with no author."
        ],
        access: [
          ["WCAG 1.3.1", "Present versions as a list or table with time, author and action announced together."],
          ["WCAG 3.3.4", "Confirm before restoring, and explain that the current version will be kept."],
          ["UD 5", "Restoring creates a new version, so any restore can itself be undone."]
        ],
        scale: [
          "Ransomware recovery needs point-in-time restore for thousands of files at once, run as a job.",
          "Version retention costs storage. Show limits and let admins set them by policy.",
          "Log every restore with who did it and what was affected."
        ]
      },

      "Tags & metadata": {
        think: [
          "Metadata makes content findable and governable. Tags help people; labels and classifications help policies.",
          "Free tagging grows messy fast. Admins need a way to curate."
        ],
        do: [
          "Let admins define managed fields and controlled vocabularies alongside free tags.",
          "Show how many items use each tag, so admins can merge or retire them.",
          "Support merging and renaming tags across all items.",
          "Apply metadata in bulk and by rule."
        ],
        dont: [
          "Don’t allow unlimited near-duplicate tags such as ‘Q4’, ‘q4’ and ‘Q4 ’.",
          "Don’t delete a tag in use without showing how many items it affects.",
          "Don’t rely on colour alone to distinguish tags or labels."
        ],
        access: [
          ["WCAG 1.4.1", "Tags and labels have text names; colour is only an extra cue."],
          ["WCAG 4.1.2", "Tag input widgets expose each tag and its remove button to assistive tech."],
          ["WCAG 2.1.1", "Adding and removing tags works with the keyboard."],
          ["UD 3", "Suggest existing tags as people type to keep vocabulary consistent."]
        ],
        scale: [
          "Taxonomies grow to thousands of terms. Support hierarchy, synonyms and import.",
          "Apply metadata automatically by rule or classifier, with admins reviewing exceptions.",
          "Renames and merges across millions of items run as jobs."
        ]
      }
    }
  },

  /* ------------------------------------------------------------------ */
  "storage-quotas": {
    scale: {
      intro: "Storage is a shared pool with a price. Admins need to know how full it is, who is using it, how fast it is growing, and what can safely be removed. At scale the questions shift from ‘are we out of space?’ to ‘where is the spend going, and what does policy let us clean up?’",
      tiers: [
        ["Tens", "One storage bar and a warning before it fills."],
        ["Thousands", "Per-user and per-team limits, a list of the biggest consumers, and regular cleanup."],
        ["Hundreds of thousands", "Storage by department and cost centre, growth forecasts, retention-driven cleanup, and chargeback reports for finance."]
      ],
      principles: [
        "Show usage, limit and trend together. A number without a limit or direction doesn’t support a decision.",
        "Warn early and in stages, well before anything stops working.",
        "Never let a full quota cause silent data loss. Uploads fail clearly; existing content is untouched.",
        "Cleanup goes through trash and retention policy, never straight to permanent deletion.",
        "Make storage attributable: by user, group, department or workspace, so costs can be traced."
      ]
    },
    patterns: {
      "Storage overview": {
        think: [
          "The overview answers three things: how much is used, how much is left, and when will it run out?",
          "Admins also need to know what is using the space, by type and by owner."
        ],
        do: [
          "Show used and total storage with a clear bar and exact numbers in text.",
          "Break usage down by category, such as files, versions, trash and backups.",
          "Show a trend line and a forecast of when the limit will be reached.",
          "Link each breakdown to a list of what is in it."
        ],
        dont: [
          "Don’t show only a percentage without the real numbers.",
          "Don’t use a pie chart with many small slices for a breakdown.",
          "Don’t count trash and old versions without saying so."
        ],
        access: [
          ["WCAG 1.4.1", "Usage bars and charts can’t rely on colour; label segments directly."],
          ["WCAG 1.1.1", "Charts have a text summary, such as ‘3.2 TB of 5 TB used, growing 4% a month’."],
          ["WCAG 1.4.11", "Bar segments and their borders need 3:1 contrast with neighbours."],
          ["UD 4", "Present key numbers as text first, with charts as support."]
        ],
        scale: [
          "Pre-compute usage. Calculating it live across millions of items is too slow.",
          "Break down by org unit and cost centre for chargeback.",
          "Alert admins at thresholds such as 80%, 90% and 95%, by email and in the console."
        ]
      },

      "Per-user quotas": {
        think: [
          "Quotas spread a shared pool fairly. Defaults should fit most people, with overrides for heavy users.",
          "When someone hits their limit, they need to know why and what to do."
        ],
        do: [
          "Set a default quota with overrides by group and by person.",
          "Show who is near or over their quota.",
          "Explain to users what happens at the limit and how to free space or request more.",
          "Let people request a higher quota with a reason."
        ],
        dont: [
          "Don’t lower a quota below someone’s current usage without a plan for what happens next.",
          "Don’t block access to existing files when someone is over quota.",
          "Don’t make overrides invisible; they become permanent by accident."
        ],
        access: [
          ["WCAG 3.3.1", "If a quota value is invalid, say why next to the field."],
          ["WCAG 4.1.3", "Quota warnings appear as status messages that screen readers announce."],
          ["UD 1", "Apply the same rules to everyone in a group, and make exceptions visible."]
        ],
        scale: [
          "Manage quotas by group and policy rather than per person.",
          "Review overrides periodically and expire them.",
          "Report quota distribution to spot users who need a different default."
        ]
      },

      "Largest items": {
        think: [
          "When storage is tight, most of it is usually in a few places. This view finds them fast.",
          "Big doesn’t mean safe to delete. Admins need context before removing anything."
        ],
        do: [
          "List the largest files, folders and owners, with size, owner and last activity.",
          "Filter by type, age and owner status, such as owners who have left.",
          "Offer safe actions: notify the owner, move to archive, or delete to trash.",
          "Show how much space each action would free."
        ],
        dont: [
          "Don’t encourage deleting large items with no recent activity check.",
          "Don’t skip retention and legal hold checks before deletion.",
          "Don’t count shared items twice."
        ],
        access: [
          ["WCAG 1.3.1", "Use a sortable table with headers and announce the sort direction."],
          ["WCAG 4.1.2", "Sortable column headers expose their sort state, such as aria-sort."],
          ["UD 5", "Send items to trash, not permanent deletion, so mistakes can be undone."]
        ],
        scale: [
          "Generate these reports in the background on a schedule, not on page load.",
          "Let admins ask owners to clean up, with tracked responses, instead of deleting for them.",
          "Integrate with retention policies so expired content is removed automatically."
        ]
      },

      "Trash & recovery": {
        think: [
          "Trash is a safety net with a timer. People and admins need to know how long things stay and how to get them back.",
          "Admin trash covers deleted users’ content and org-wide deletions, not only one person’s files."
        ],
        do: [
          "Show when each item was deleted, by whom, and when it will be permanently removed.",
          "Restore to the original location, or ask where if that location is gone.",
          "Let admins search trash across the whole org.",
          "Explain whether trash counts toward storage."
        ],
        dont: [
          "Don’t make ‘Empty trash’ a one-click action next to restore.",
          "Don’t permanently delete items under legal hold.",
          "Don’t shorten the retention period without warning."
        ],
        access: [
          ["WCAG 3.3.4", "Permanent deletion requires confirmation with a count of affected items."],
          ["WCAG 2.5.8", "Separate restore and delete controls with enough space to avoid mistakes."],
          ["UD 4", "Show both the date and the time remaining, such as ‘Deleted forever in 6 days’."]
        ],
        scale: [
          "Bulk restore after accidental or malicious mass deletion, filtered by person and time window.",
          "Permanent deletion runs in the background with progress.",
          "Make retention periods policy-driven by content type and regulation."
        ]
      }
    }
  },

  /* ------------------------------------------------------------------ */
  "knowledge-content": {
    scale: {
      intro: "Connecting a content source decides what search and AI can see. The stakes are higher than ordinary sync: if permissions are wrong, an assistant will happily summarise a document someone was never allowed to open. At enterprise size there are dozens of sources and billions of items, each with its own permission model, and admins need to know that what is indexed is complete, current and correctly permissioned.",
      tiers: [
        ["Tens", "One or two sources, a connect button, and a status light."],
        ["Thousands", "Several sources, scoped to certain sites or folders. Admins exclude sensitive areas and watch for sync errors."],
        ["Hundreds of thousands", "Dozens of sources across regions, permission-aware retrieval, sensitivity labels honoured, freshness and coverage reported, and every change audited."]
      ],
      principles: [
        "Permissions travel with content. Search and AI must only return what the person asking could open at the source.",
        "Start narrow. Connect specific sites or folders first, then widen once results and permissions are verified.",
        "Show coverage and freshness: what is indexed, what failed, and how old it is.",
        "Exclusions beat cleanup. Make it easy to keep sensitive areas out before they are indexed.",
        "Explain every answer’s sources so people and admins can check them."
      ]
    },
    patterns: {
      "Add content source": {
        think: [
          "Connecting a source is a scoping decision as much as a technical one. What should be included, and for whom?",
          "The admin connecting the source may not own it. They need the source owner’s consent and the right credentials."
        ],
        do: [
          "Walk through connect, scope, permissions and review in clear steps.",
          "Let admins choose specific sites, drives or folders rather than ‘everything’.",
          "Explain what permissions the connector needs and why.",
          "Show an estimate of how many items will be indexed and how long it will take."
        ],
        dont: [
          "Don’t default to indexing everything in a source.",
          "Don’t request broader access than the connector needs.",
          "Don’t make the source searchable before the first permission sync finishes."
        ],
        access: [
          ["WCAG 3.3.2", "Explain each scope option and what it means for who can find the content."],
          ["WCAG 2.4.6", "Label wizard steps clearly, and announce the current step."],
          ["UD 3", "Use recommended defaults that are safe, such as selected folders only."]
        ],
        scale: [
          "Initial indexing of large sources takes days. Show progress, allow pausing, and keep the rest of the product usable.",
          "Support connecting many sources of the same type, such as one per region or subsidiary.",
          "Throttle against source rate limits and show when the source is slowing indexing."
        ]
      },

      "Sync status": {
        think: [
          "Sync status tells admins whether search and AI answers are trustworthy right now.",
          "‘Connected’ isn’t the same as ‘working’. Admins need coverage, freshness and errors."
        ],
        do: [
          "Show per source: last successful sync, items indexed, items failed and current state.",
          "Group errors by cause, such as permission denied or unsupported file type, with fixes.",
          "Offer manual re-sync for a source or a single item.",
          "Alert admins when a source stops syncing or falls behind."
        ],
        dont: [
          "Don’t show a green status when a large share of items failed.",
          "Don’t list thousands of individual errors without grouping.",
          "Don’t hide credential expiry until sync breaks."
        ],
        access: [
          ["WCAG 1.4.1", "Status combines text and icons, not only colour."],
          ["WCAG 4.1.3", "Announce sync start, completion and failure when an admin triggers it."],
          ["UD 4", "State freshness in words, such as ‘Last synced 12 minutes ago’."]
        ],
        scale: [
          "Use incremental sync and change notifications from sources, not full re-crawls.",
          "Report coverage trends over time to spot slow degradation.",
          "Give each source a health score with drill-down for troubleshooting."
        ]
      },

      "Source permissions": {
        think: [
          "This is the most important and least visible part of a knowledge system. Every result must respect source permissions at the moment of asking.",
          "Admins need to verify permissions, not just trust them."
        ],
        do: [
          "Mirror source permissions, including groups and inheritance, and keep them in sync.",
          "Let admins test as a person: ‘What could Priya find for this query?’",
          "Show how permissions were mapped from the source, including any unmapped groups.",
          "Show how recently permissions were synced."
        ],
        dont: [
          "Don’t index content under a service account and show it to everyone.",
          "Don’t cache permissions longer than the source allows.",
          "Don’t silently drop permissions that couldn’t be mapped. Exclude that content until resolved."
        ],
        access: [
          ["WCAG 1.3.1", "Present permission mappings as a table, with source group and mapped group in headed columns."],
          ["WCAG 2.4.4", "Links to the source system say where they go."],
          ["UD 5", "When mapping fails, exclude content rather than expose it."]
        ],
        scale: [
          "Permission sync must keep up with frequent changes across millions of items. Prioritise removals over additions.",
          "Map external identities to org users across many sources reliably.",
          "Audit permission-aware retrieval regularly with sample checks."
        ]
      },

      "Content exclusions": {
        think: [
          "Some content should never reach search or AI, even if permissions would allow it: HR cases, legal matters, M&A, secrets.",
          "Exclusions should be easy to set before indexing and easy to verify after."
        ],
        do: [
          "Exclude by location, file type, sensitivity label, keyword or owner.",
          "Preview what an exclusion rule matches before applying it.",
          "Remove already-indexed content when a new exclusion is added, and say how long that will take.",
          "Show a list of active exclusions with who added them and why."
        ],
        dont: [
          "Don’t treat exclusions as a substitute for proper permissions.",
          "Don’t leave excluded content in caches or AI memory.",
          "Don’t allow exclusions with no reason recorded."
        ],
        access: [
          ["WCAG 3.3.2", "Explain each rule type with an example."],
          ["WCAG 4.1.3", "Announce how many items a rule matches as it’s edited."],
          ["UD 5", "Preview before applying, and keep a history so changes can be reversed."]
        ],
        scale: [
          "Honour sensitivity labels automatically, so labelled content is excluded without separate rules.",
          "Removing content from indexes across many sources runs as a job with confirmation when done.",
          "Review exclusions periodically with their owners."
        ]
      }
    }
  }
});
