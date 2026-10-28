/*
  Pattern guidance, keyed by category slug, then by pattern name
  (must match the names in data/categories.js).

  Per category:
    scale: { intro, tiers: [[label, what changes]], principles: [...] }
  Per pattern:
    think:  how to frame the problem before designing
    do / dont
    access: [tag, text] pairs. Tags are WCAG 2.2 success criteria
            ("WCAG 3.3.1") or Principles of Universal Design ("UD 5").
    scale:  what breaks, and what to do, at enterprise size

  Universal Design principles (Center for Universal Design, NC State, 1997):
    UD 1 Equitable use · UD 2 Flexibility in use · UD 3 Simple and intuitive use
    UD 4 Perceptible information · UD 5 Tolerance for error
    UD 6 Low physical effort · UD 7 Size and space for approach and use
*/

window.UD = {
  "UD 1": "Equitable use",
  "UD 2": "Flexibility in use",
  "UD 3": "Simple and intuitive use",
  "UD 4": "Perceptible information",
  "UD 5": "Tolerance for error",
  "UD 6": "Low physical effort",
  "UD 7": "Size and space for approach and use"
};

window.WCAG = {
  "1.3.1": "Info and Relationships",
  "1.3.5": "Identify Input Purpose",
  "1.4.10": "Reflow",
  "1.4.11": "Non-text Contrast",
  "1.4.13": "Content on Hover or Focus",
  "2.1.1": "Keyboard",
  "2.2.1": "Timing Adjustable",
  "2.4.3": "Focus Order",
  "2.4.6": "Headings and Labels",
  "2.4.11": "Focus Not Obscured (Minimum)",
  "2.5.8": "Target Size (Minimum)",
  "3.2.2": "On Input",
  "3.3.1": "Error Identification",
  "3.3.2": "Labels or Instructions",
  "3.3.3": "Error Suggestion",
  "3.3.4": "Error Prevention (Legal, Financial, Data)",
  "3.3.7": "Redundant Entry",
  "4.1.2": "Name, Role, Value",
  "4.1.3": "Status Messages"
};

window.GUIDANCE = {
  "user-management": {
    scale: {
      intro: "A directory that works for 40 people breaks quietly at 4,000 and loudly at 400,000. Most of the people in an enterprise directory were never typed in by an admin: they arrive from an identity provider or HR system. Design for the admin who manages exceptions, not the one who adds people one by one.",
      tiers: [
        ["Tens", "Admins add people by hand and recognise every name. A simple list and a modal are enough."],
        ["Thousands", "Search replaces scrolling. CSV import, groups and saved filters become daily tools. Several admins work in parallel."],
        ["Hundreds of thousands", "People arrive through SCIM or HR sync, not the UI. Admins are scoped to regions or business units. Every change is a background job with a result, and every action needs an audit trail."]
      ],
      principles: [
        "Know the source of truth for every field. If a value is synced from Okta, Entra or Workday, show it as read-only with the source named, and link to where it can be changed.",
        "Assume delegated admin. Not every admin can see every user, so lists, counts and search results must respect scope, and say so.",
        "Make bulk the default path and single-record the special case. Anything you can do to one user, an admin will need to do to 5,000.",
        "Treat long operations as jobs: queued, in progress, done with partial failures, downloadable results. Never block the UI on them.",
        "Log every change with actor, target, before and after, and reason. In regulated orgs the audit trail is a feature, not plumbing."
      ]
    },

    patterns: {
      "Invite / add user": {
        think: [
          "Separate the two jobs: creating an account the org controls, and inviting someone who will finish setup themselves. They have different fields, states and failure modes.",
          "Ask what the admin needs to decide at creation (identity, role, licence, groups) and defer everything else to the user’s detail page.",
          "Most users at scale will never pass through this form. It is for exceptions: contractors, guests, service accounts and break-glass admins."
        ],
        do: [
          "Ask for the minimum: name, email, and one access decision such as role or group. Offer defaults the admin can see before submitting.",
          "Let admins add several emails at once with the same role, the way Stripe and Atlassian do, and show per-email validation.",
          "Detect duplicates and existing accounts as the email is typed, and offer to open the existing user instead.",
          "Say exactly what happens next: an email goes out, the invite expires in N days, a licence is consumed now or on acceptance.",
          "End on a success state that offers the next likely action: add another, assign to a group, or view the user."
        ],
        dont: [
          "Don’t put every profile field in the create form. Long forms at creation cause abandonment and stale data.",
          "Don’t silently consume a paid seat. Show the licence impact before the admin confirms.",
          "Don’t let admins assign permissions higher than their own.",
          "Don’t hide the invite versus create distinction behind jargon like ‘provision’ or ‘federate’."
        ],
        access: [
          ["WCAG 3.3.2", "Label every field visibly. Placeholder text is not a label, and it disappears exactly when people need it."],
          ["WCAG 1.3.5", "Use autocomplete tokens (name, email) so assistive tech and password managers can help fill fields."],
          ["WCAG 3.3.1", "When an email is invalid or already in use, say which one and why, in text next to the field, not just a red outline."],
          ["WCAG 4.1.3", "Announce ‘Invitation sent to 3 people’ with a live region so screen reader users know it worked without moving focus."],
          ["UD 5", "Let admins review the batch before sending. A typo in an email address creates a ghost account and a wasted seat."]
        ],
        scale: [
          "At thousands of users, the single-add form is the exception path. Put CSV import and directory sync one click away from it.",
          "Validate against the whole directory server-side, not just the current page, for duplicates and domain rules.",
          "Seat limits become real. Show remaining seats in the form and handle the case where the org runs out mid-batch.",
          "With delegated admins, scope role and group pickers to what this admin is allowed to grant.",
          "Rate-limit invite emails and show the queue, so a 10,000-person invite does not look like it failed."
        ]
      },

      "User directory": {
        think: [
          "The directory is the admin’s home base. It answers ‘who is here, what can they do, and is anything wrong?’",
          "Admins arrive with a name, an email, a group or a problem. Design for search first, browse second.",
          "Decide which columns earn a place by asking what admins sort and filter on, not what the data model holds."
        ],
        do: [
          "Lead with a search box that matches name, email, employee ID and username, with results as you type.",
          "Show status clearly in its own column: active, invited, suspended, deactivated, locked.",
          "Offer filters for the facets admins actually use: role, group, status, last sign-in, licence and source (local or synced).",
          "Keep the total count visible and accurate, and update it as filters change (‘1,204 of 48,310 users’).",
          "Let the row open the user’s detail. Keep row-level actions in an overflow menu, plus checkboxes for bulk."
        ],
        dont: [
          "Don’t use infinite scroll for a list people need to audit. Admins lose their place and can’t share a position.",
          "Don’t show client-side counts that only reflect the loaded page.",
          "Don’t use colour alone for status. A red dot means nothing to someone who can’t see red.",
          "Don’t default to sorting by name when admins usually look for recent or problem accounts."
        ],
        access: [
          ["WCAG 1.3.1", "Use a real table with column headers and a caption, so screen readers announce ‘Status: Suspended’ rather than a bare word."],
          ["WCAG 1.4.11", "Status badges and checkboxes need 3:1 contrast against their background, in both themes."],
          ["WCAG 4.1.3", "Announce result counts after filtering (‘38 users found’) without moving focus."],
          ["WCAG 1.4.10", "Tables must still work at 400% zoom. Let low-priority columns collapse, and keep name and status visible."],
          ["UD 2", "Offer density and column choices. A security admin and a helpdesk agent need different views of the same list."]
        ],
        scale: [
          "Search, sort, filter and paginate on the server. Never load the whole directory to the browser.",
          "Use cursor-based pagination and stable sorting so rows don’t shift between pages while a sync is running.",
          "Provide saved and shared views (‘Contractors with no sign-in in 90 days’) so admins stop rebuilding the same filters.",
          "Make ‘select all’ explicit about scope: this page (50) versus every match (12,408).",
          "Offer export of the current filtered view as a background job for lists too large to render."
        ]
      },

      "User detail": {
        think: [
          "This page is the answer to ‘why can or can’t this person do X?’ Build it around that question.",
          "Group information by what admins act on: identity, access (roles, groups, apps, licences), security (MFA, sessions, devices) and activity.",
          "Every piece of access shown should explain where it came from: assigned directly, through a group, or by policy."
        ],
        do: [
          "Put identity and status at the top with the most common actions: reset password, suspend, resend invite.",
          "Show effective access with its source, like ‘Editor, via Design team group’, and link to that group.",
          "Show recent activity and last sign-in, so admins can tell a dormant account from an active one.",
          "Mark synced fields as read-only and name the source system."
        ],
        dont: [
          "Don’t scatter one user’s access across five separate admin pages.",
          "Don’t show raw IDs and internal codes as the primary label.",
          "Don’t put destructive actions next to routine ones without separation."
        ],
        access: [
          ["WCAG 2.4.6", "Use clear headings for each section so screen reader users can jump straight to Security or Access."],
          ["WCAG 1.3.1", "Present label and value pairs as a description list or table, not loose text."],
          ["WCAG 2.1.1", "Tabs, menus and expanders must all work with the keyboard alone."],
          ["UD 4", "State status in words and icons, not colour alone, and explain what each status means for the person."]
        ],
        scale: [
          "A user can belong to hundreds of groups and apps. Paginate and search within each section instead of rendering everything.",
          "Compute effective permissions server-side and cache them. Explaining inheritance across nested groups is expensive.",
          "Link to the audit log pre-filtered to this user, not a copy of it on the page."
        ]
      },

      "Edit profile": {
        think: [
          "Most profile fields in an enterprise belong to another system. The first question for every field is ‘who owns this?’",
          "Editing should feel safe. Admins are changing someone else’s account, often while that person is signed in."
        ],
        do: [
          "Edit in place or in a side panel so the admin keeps context of the user’s page.",
          "Show synced fields as locked with the reason and source, for example ‘Managed by Workday’.",
          "Confirm changes with a clear summary and keep a visible ‘last edited by’ line.",
          "Warn when an edit has side effects, such as changing email also changing the sign-in name."
        ],
        dont: [
          "Don’t let admins edit a synced field only to have the next sync overwrite it silently.",
          "Don’t autosave changes to identity fields. Use an explicit save for anything that affects sign-in.",
          "Don’t discard unsaved edits on navigation without warning."
        ],
        access: [
          ["WCAG 3.2.2", "Changing a field must not trigger navigation or saving by itself without warning."],
          ["WCAG 3.3.3", "Error messages say how to fix the problem, not just that one exists."],
          ["WCAG 2.4.3", "When a side panel opens, move focus into it, and return focus to the trigger when it closes."],
          ["UD 5", "Offer undo or show the previous value after saving, so mistakes are cheap to reverse."]
        ],
        scale: [
          "With directory sync, most edits should route to the source system. Deep-link there instead of building a second editor.",
          "Bulk edit is the real need at scale: change department or manager for 300 people at once.",
          "Handle concurrent edits. Two admins, or an admin and a sync job, may touch the same record."
        ]
      },

      "Suspend / deactivate": {
        think: [
          "Suspend is the safe, reversible way to remove access. Make it the easiest removal option, and delete the rarer one.",
          "Define precisely what suspension does: sign-in blocked, sessions ended, licence kept or released, content kept, shared links working or not."
        ],
        do: [
          "Explain the effect in plain language in the confirmation before the admin commits.",
          "End active sessions and revoke tokens as part of suspension, and say that you did.",
          "Show suspended users clearly in the directory and on their page, with who suspended them, when and why.",
          "Make reactivation a single, obvious action."
        ],
        dont: [
          "Don’t use ‘deactivate’, ‘disable’, ‘suspend’ and ‘block’ for the same thing in different places.",
          "Don’t release a licence on suspension without saying so. Reactivating may then fail.",
          "Don’t let admins suspend themselves or the last remaining super admin."
        ],
        access: [
          ["WCAG 3.3.4", "Actions that cut off someone’s access must be reversible, checked, or confirmed."],
          ["WCAG 2.4.3", "Confirmation dialogs trap focus while open and return it to a sensible place after closing."],
          ["UD 3", "Use one term consistently and define it once, in the dialog, where the decision is made."]
        ],
        scale: [
          "Security incidents need mass suspension in minutes. Support bulk suspend from a filtered list or uploaded list.",
          "Many orgs suspend through the identity provider. Reflect that state rather than fighting it.",
          "Report results per user: suspended, already suspended, failed and why."
        ]
      },

      "Offboarding": {
        think: [
          "Offboarding is a checklist, not a button: remove access, then decide what happens to the person’s content, licences, devices and open responsibilities.",
          "The riskiest part is what the person owned. Orphaned files, shared links, API keys and admin roles are where breaches happen."
        ],
        do: [
          "Guide the admin through ownership transfer before deletion, and suggest the person’s manager as the default recipient.",
          "Spell out what will be deleted, kept or transferred, with counts: ‘1,284 files, 12 shared links, 2 API keys’.",
          "Offer a grace period and restore window, such as 30 days, and say when it ends.",
          "Require typing the name or email to confirm permanent deletion."
        ],
        dont: [
          "Don’t delete content by default when access is removed.",
          "Don’t hide legal hold. If a user is under hold, block deletion and say why.",
          "Don’t treat offboarding as complete until transfers have actually finished."
        ],
        access: [
          ["WCAG 3.3.4", "Irreversible deletion needs a review step and an explicit confirmation."],
          ["WCAG 4.1.3", "Announce progress and completion of long transfer jobs without moving focus."],
          ["UD 5", "Order the steps so the safe, reversible actions come first and permanent deletion comes last."]
        ],
        scale: [
          "Large orgs offboard hundreds of people a week, mostly triggered by HR. Design the automated path first and make the UI a review and exception tool.",
          "Transferring a large content owner’s files can take hours. Run it as a job with progress and a result report.",
          "Check retention and legal-hold policies before every deletion, for every user in a batch."
        ]
      },

      "Pending invites": {
        think: [
          "An invite is a user in limbo. Admins need to see who hasn’t joined, why, and what to do about it.",
          "Treat invites as first-class rows with their own status and age, not as a hidden side list."
        ],
        do: [
          "Show sent date, expiry, inviter and status: pending, expired or bounced.",
          "Offer resend, copy link and revoke in the row menu, as GitHub does for failed invitations.",
          "Let admins filter and bulk-resend expired invites.",
          "Say whether a pending invite holds a seat."
        ],
        dont: [
          "Don’t let invites expire silently with no way to tell they failed.",
          "Don’t count pending invites as active users in totals and reports.",
          "Don’t send repeated reminder emails with no admin control."
        ],
        access: [
          ["WCAG 1.4.13", "Any tooltip explaining an invite status must be dismissible, hoverable, and stay visible while needed."],
          ["WCAG 2.5.8", "Row menu buttons need a target of at least 24 by 24 pixels."],
          ["UD 4", "Show expiry as a date and as relative time (‘expires in 2 days’)."]
        ],
        scale: [
          "Large invite waves leave thousands pending. Provide aging filters and a bulk resend or revoke.",
          "Track bounces from the mail provider and surface them, because bad addresses multiply in CSV imports.",
          "Auto-expire and reclaim seats on a policy the admin can set."
        ]
      },

      "Bulk add users": {
        think: [
          "Bulk add is a data import job with three stages: get the data in, find the problems, commit what’s valid.",
          "Expect messy spreadsheets. The design challenge is error recovery, not upload."
        ],
        do: [
          "Provide a downloadable template with example rows and required columns marked.",
          "Validate before creating anything, and show a summary: 480 ready, 12 with errors, 8 duplicates.",
          "Point to each error by row and column with a fix, and let admins fix it inline or re-upload just the failed rows.",
          "Let admins choose what happens to duplicates: skip, update or stop."
        ],
        dont: [
          "Don’t create half the users and then fail with a generic error.",
          "Don’t require a specific column order when headers can be matched.",
          "Don’t make admins re-upload the whole file to fix one row."
        ],
        access: [
          ["WCAG 3.3.1", "Identify each error in text with its row number, not only by highlighting a cell."],
          ["WCAG 3.3.7", "Don’t make admins re-enter data they already provided. Keep valid rows when fixing invalid ones."],
          ["WCAG 2.1.1", "File upload must work with the keyboard, not only drag and drop."],
          ["UD 6", "One upload should replace hundreds of form submissions. That is the whole point."]
        ],
        scale: [
          "Process imports asynchronously and stream progress. A 50,000-row file should never time out a browser request.",
          "Make imports idempotent, so re-running the same file doesn’t create duplicates.",
          "Keep a history of imports with who ran them, the original file, and the result report."
        ]
      },

      "Auto-join by domain": {
        think: [
          "Domain capture trades admin control for adoption. Decide which one the org values more, and let the admin choose.",
          "It must be anchored in verified domain ownership, or it becomes a takeover risk."
        ],
        do: [
          "Require domain verification through DNS before turning it on.",
          "Let admins choose the behaviour: join automatically, request to join with approval, or block.",
          "Choose the default role for auto-joined users conservatively, and make it visible.",
          "Show the joining person which org they’re entering and who administers it, as Plaid’s flow does."
        ],
        dont: [
          "Don’t allow auto-join for public email domains such as gmail.com.",
          "Don’t give auto-joined users admin rights or paid seats without approval.",
          "Don’t hide the setting deep in security pages where no one will review it."
        ],
        access: [
          ["WCAG 3.3.2", "Explain DNS verification steps with copyable values and clear instructions."],
          ["UD 1", "People joining should get the same clear explanation whatever device or assistive tech they use."],
          ["UD 5", "Let admins preview who would match a domain rule before switching it on."]
        ],
        scale: [
          "Large orgs own many domains and subsidiaries. Support multiple domains, each mapped to a default group or region.",
          "Pair auto-join with SSO enforcement, so people who join by domain still sign in through the corporate identity provider.",
          "Report auto-joins over time, so a spike signals a misconfiguration quickly."
        ]
      }
    }
  }
};
