/* Guidance for the People & access group (user management lives in guidance.js).
   Same shape as guidance.js. Tags: WCAG 2.2 success criteria or UD principles. */

Object.assign(window.GUIDANCE, {

  /* ------------------------------------------------------------------ */
  "roles-permissions": {
    scale: {
      intro: "Permissions start as a handful of checkboxes and end as the most consequential settings in the product. Every org eventually asks for a custom role, then a scoped one, then one more exception. The design job is to keep the model explainable as it grows: an admin should always be able to answer who can do what, and why.",
      tiers: [
        ["Tens", "Three built-in roles (owner, admin, member) cover nearly everyone. A dropdown on the user is enough."],
        ["Thousands", "Custom roles appear, along with roles scoped to a workspace, project or region. Admins start asking why someone has access."],
        ["Hundreds of thousands", "Hundreds of custom roles, granted mostly through groups. Access is reviewed by auditors, and least privilege is a compliance requirement, not a preference."]
      ],
      principles: [
        "Grant to groups, not individuals. Direct grants don't scale and are hard to review.",
        "Keep built-in roles stable and versioned. A product release that silently widens a built-in role is a security incident.",
        "Make every permission explainable: who granted it, through what path, and when.",
        "Separate who can administer from who can use. Admin capabilities deserve their own roles and their own audit trail.",
        "Default to least privilege. New roles, new users and new features should start with the narrowest useful access."
      ]
    },
    patterns: {
      "Role catalog": {
        think: [
          "The catalog is where admins learn the model. Its job is to make the difference between roles obvious before anyone assigns one.",
          "Describe roles by what people can do, not by internal permission names.",
          "Built-in and custom roles behave differently. Built-ins can't be edited; custom ones can drift. Show that distinction."
        ],
        do: [
          "List each role with a one-line plain-language summary, how many people hold it, and whether it's built-in or custom.",
          "Order roles from most to least powerful, so the hierarchy reads at a glance.",
          "Let admins compare two roles side by side to see exactly what differs.",
          "Offer 'Duplicate' on built-in roles as the starting point for custom ones."
        ],
        dont: [
          "Don't name roles after people or teams ('Sarah's role', 'Marketing role'). They outlive both.",
          "Don't let built-in role definitions change without a changelog and notice.",
          "Don't hide how many users a role affects. That number is the blast radius."
        ],
        access: [
          ["WCAG 1.3.1", "If roles are shown in a table, use proper headers so 'Members: 1,204' is announced with its column."],
          ["WCAG 2.4.6", "Role names and descriptions should be distinct enough to tell apart when read aloud in a list."],
          ["UD 3", "Use everyday verbs in descriptions ('can invite people, can't change billing') rather than permission codes."]
        ],
        scale: [
          "Catalogs grow to hundreds of custom roles. Add search, filters for built-in versus custom, and 'unused roles' to support cleanup.",
          "Show usage over time so admins can retire roles that nobody holds.",
          "Support role naming conventions and descriptions as required fields once an org passes a threshold of custom roles."
        ]
      },

      "Permission matrix": {
        think: [
          "A matrix answers 'which roles can do this?' across the whole product. It is a reference and comparison tool more than an editor.",
          "The rows are capabilities, grouped by area. The columns are roles. Every cell is a decision someone will audit."
        ],
        do: [
          "Group capabilities by product area with collapsible sections and a count of granted items per section.",
          "Freeze the capability column and the role header so both stay visible while scrolling.",
          "Use distinct symbols for granted, not granted, and partially granted or conditional, with a legend.",
          "Explain each capability in a tooltip or expandable row, including risky ones like data export."
        ],
        dont: [
          "Don't rely on green and red to show granted versus denied.",
          "Don't put hundreds of editable checkboxes on one page with a single save button at the bottom.",
          "Don't mix view-only and editable roles in the same grid without marking which columns can change."
        ],
        access: [
          ["WCAG 1.4.1", "Granted and not granted must differ by shape or text, not colour alone."],
          ["WCAG 1.3.1", "Mark capability names as row headers and role names as column headers, so each cell is announced with both."],
          ["WCAG 2.1.1", "Arrow-key navigation across cells helps, but every cell must at least be reachable with Tab."],
          ["WCAG 1.4.10", "At high zoom, switch to a per-role view instead of forcing a two-dimensional scroll."],
          ["UD 4", "Pair each mark with a text alternative such as 'Can export data: yes'."]
        ],
        scale: [
          "Products accumulate hundreds of capabilities. Group, search and collapse them, or the matrix becomes unreadable.",
          "With many roles, let admins pick which columns to compare instead of showing all of them.",
          "Export the matrix for auditors. It is often the evidence for an access control review."
        ]
      },

      "Create custom role": {
        think: [
          "Custom roles are where over-permissioning happens. Make the safe path the easy one.",
          "Starting from a blank list of 200 checkboxes is the hardest way to build a role. Start from something close."
        ],
        do: [
          "Start by cloning an existing role, then add or remove capabilities.",
          "Show a running summary of what the role can do, and flag high-risk capabilities as they're added.",
          "Ask for a name and a description of who the role is for.",
          "Handle dependencies: if a capability requires another, add it and say why."
        ],
        dont: [
          "Don't let a custom role exceed the permissions of the admin creating it.",
          "Don't save a role with no capabilities or a duplicate of an existing role without warning.",
          "Don't expose raw API scopes as the only way to define a role."
        ],
        access: [
          ["WCAG 3.3.2", "Group checkboxes in fieldsets with legends, so each one is announced with its product area."],
          ["WCAG 4.1.3", "Announce automatically added dependencies ('Also added: View projects') without moving focus."],
          ["WCAG 3.3.4", "Show a review of the full role before it's created, since it may be assigned to many people."],
          ["UD 5", "Warn on risky capabilities and let admins remove them before saving."]
        ],
        scale: [
          "Role sprawl is the main risk. Detect near-duplicate roles and suggest reusing an existing one.",
          "When editing a role held by thousands of people, show the count and require confirmation.",
          "Version roles, so you can see what changed, when, and roll back."
        ]
      },

      "Assign role": {
        think: [
          "Admins assign roles from two directions: from the person ('what can Alex do?') and from the role ('who are the editors?'). Support both.",
          "Every assignment is a security decision. Make its impact visible before it happens."
        ],
        do: [
          "Let admins assign from the user's page and from the role's member list.",
          "Show what the person gains and loses when their role changes.",
          "Support assigning to groups as the primary path, and to individuals as an exception.",
          "Require a reason for granting admin-level roles, and log it."
        ],
        dont: [
          "Don't let an admin grant a role higher than their own.",
          "Don't allow removing the last owner or super admin.",
          "Don't hide inherited roles when showing direct ones, or admins will grant duplicates."
        ],
        access: [
          ["WCAG 4.1.2", "Role pickers built as custom dropdowns must expose their name, role and selected value to assistive tech."],
          ["WCAG 3.2.2", "Selecting a role in a dropdown shouldn't apply it immediately. Confirm first."],
          ["UD 5", "Show the before and after of the change and allow undo right after assigning."]
        ],
        scale: [
          "Bulk assign from a filtered user list or a CSV, run as a job with a result report.",
          "Integrate with identity provider group mapping, so roles follow group membership automatically.",
          "Rate-limit and alert on unusual spikes in admin-role grants."
        ]
      },

      "Scoped access": {
        think: [
          "Scoping answers 'admin of what?' A regional admin, a project owner and a billing admin all need power over a slice, not the whole org.",
          "The scope must be visible everywhere the role appears, or 'Admin' will be misread as global."
        ],
        do: [
          "Show role and scope together, for example 'Admin · EMEA workspaces'.",
          "Let admins choose scope with a searchable tree or picker that mirrors the org's structure.",
          "Make out-of-scope items invisible or clearly read-only for scoped admins, and say why.",
          "Explain how scopes combine when a person holds several."
        ],
        dont: [
          "Don't show a scoped admin counts or search results that include people they can't see.",
          "Don't let scope silently widen when the org structure changes.",
          "Don't use the same role name for global and scoped versions."
        ],
        access: [
          ["WCAG 1.3.1", "Tree pickers need proper tree roles and states (expanded, selected) so structure is conveyed."],
          ["WCAG 2.1.1", "Expanding, collapsing and selecting nodes must all work with the keyboard."],
          ["UD 4", "Always state the scope in text next to the role name, not only in a tooltip."]
        ],
        scale: [
          "Orgs with thousands of workspaces need scope by attribute or rule, such as region or cost centre, not by hand-picking items.",
          "Evaluate scope on the server for every list, count and export.",
          "Let auditors list every scoped admin and their scope in one report."
        ]
      },

      "Effective permissions": {
        think: [
          "This is the question admins actually ask: 'Why can this person do this?' or 'Why can't they?'",
          "Effective permissions combine direct roles, group roles, scopes, policies and denies. The UI's job is to show the chain."
        ],
        do: [
          "Offer a 'check access' tool: pick a person and a resource or action, get yes or no with the reason.",
          "Show every path that grants the permission, such as 'via Design group → Editor role'.",
          "Show denials and policies that override grants, not just the grants.",
          "Link each step of the chain to where it can be changed."
        ],
        dont: [
          "Don't show only direct assignments and call it the user's access.",
          "Don't answer 'yes' without the reason. Unexplained access can't be fixed.",
          "Don't compute the answer on the client from partial data."
        ],
        access: [
          ["WCAG 1.3.1", "Present the inheritance chain as an ordered list or tree so its structure is announced."],
          ["WCAG 2.4.4", "Links in the chain should name their destination ('Open Design group'), not just say 'View'."],
          ["UD 4", "Lead with the plain answer in words, then the detail."]
        ],
        scale: [
          "Nested groups and many roles make this expensive. Compute on the server and cache, with a 'last evaluated' time.",
          "Support the reverse question at scale: 'Who can export customer data?' as a report.",
          "Use this same engine for access reviews and audit evidence."
        ]
      }
    }
  },

  /* ------------------------------------------------------------------ */
  "groups-teams": {
    scale: {
      intro: "Groups are how access scales. Instead of granting 10,000 people one by one, admins grant to a few hundred groups. That makes groups the most leveraged object in the console: a change to one membership can open or close access for thousands. Most large orgs don't manage groups in the product at all; they sync them from an identity provider.",
      tiers: [
        ["Tens", "A few teams, managed by hand. Groups are mostly for convenience."],
        ["Thousands", "Groups become the main way to grant access. Owners outside IT manage their own groups. Rules start replacing manual membership."],
        ["Hundreds of thousands", "Groups sync from Entra, Okta or HR. Many are nested and rule-based. The console mostly shows and explains groups rather than editing them."]
      ],
      principles: [
        "Show where every group comes from: created here, synced from an identity provider, or generated by a rule.",
        "Make the impact of membership visible. Before adding someone, show what access the group grants.",
        "Distribute ownership. Let group owners manage membership without making them org admins.",
        "Prefer rules to lists at scale. Rule-based groups stay accurate as people join, move and leave.",
        "Never let a sync and a manual edit fight. One source wins, and the UI says which."
      ]
    },
    patterns: {
      "Create group": {
        think: [
          "A group is a container for access. Its name, owner and purpose matter more than its member list at creation.",
          "Decide up front: is this a static list, a rule-based group, or a mirror of a group in the identity provider?"
        ],
        do: [
          "Ask for name, description, owners and type (static, dynamic or synced).",
          "Require at least one owner other than the org admin, so the group has a responsible person.",
          "Check for groups with similar names and suggest them.",
          "After creating, offer to add members and assign access right away."
        ],
        dont: [
          "Don't create groups with no owner or description.",
          "Don't allow duplicate names that differ only by case or spacing.",
          "Don't grant access at creation without showing what the group will be able to do."
        ],
        access: [
          ["WCAG 3.3.2", "Explain each group type in text next to the choice, not only in help docs."],
          ["WCAG 3.3.1", "Name conflicts are reported in text next to the field, with the existing group named."],
          ["UD 3", "Default to the simplest type, a static group, with rules as an advanced option."]
        ],
        scale: [
          "Large orgs have tens of thousands of groups. Enforce naming conventions and prefixes.",
          "Offer lifecycle policies: expire unused groups, or ask owners to confirm every year.",
          "Prefer creating groups in the identity provider and syncing them. Show that path in the create flow."
        ]
      },

      "Manage members": {
        think: [
          "Adding someone to a group grants every permission the group holds. The UI should make that visible.",
          "Group membership is managed by owners and admins with different needs. Owners want speed; admins want oversight."
        ],
        do: [
          "Show the group's access at the top of the member list, so the impact is clear.",
          "Let owners add many people at once by search, paste or CSV.",
          "Distinguish owners from members, and direct members from those added by nesting or rules.",
          "Show when and by whom each member was added."
        ],
        dont: [
          "Don't allow removing the last owner.",
          "Don't let people edit membership of a synced group here, only to see it overwritten.",
          "Don't paginate members without search once a group passes a few dozen people."
        ],
        access: [
          ["WCAG 1.3.1", "Label the member list as a table with columns for name, role in group and how added."],
          ["WCAG 4.1.3", "Announce '12 members added' after a bulk add."],
          ["WCAG 2.5.8", "Remove buttons on each row need enough size and spacing to avoid removing the wrong person."],
          ["UD 5", "Confirm removals that would take away access, and offer undo."]
        ],
        scale: [
          "Groups can hold hundreds of thousands of members, such as 'All employees'. Use server-side search and never load all members.",
          "Bulk membership changes run as jobs, with results per person.",
          "Alert owners when a group with high-risk access grows unusually fast."
        ]
      },

      "Dynamic groups": {
        think: [
          "A dynamic group is a saved query. Its members change on their own as attributes change.",
          "The risk is a rule that matches far more, or far fewer, people than intended. Preview is essential."
        ],
        do: [
          "Build rules with a structured editor (attribute, operator, value) and offer a raw expression view for experts.",
          "Preview matching members and the count before saving.",
          "Show the rule on the group's page in readable form.",
          "Show when membership was last evaluated and how many people joined or left."
        ],
        dont: [
          "Don't save a rule without a preview of who it matches.",
          "Don't let people manually add or remove members of a dynamic group.",
          "Don't evaluate rules silently on attributes admins can't see."
        ],
        access: [
          ["WCAG 3.3.2", "Each condition row needs labels for attribute, operator and value, not just placeholders."],
          ["WCAG 4.1.3", "Announce updated match counts as conditions change."],
          ["WCAG 2.1.1", "Adding, removing and reordering conditions must work by keyboard."],
          ["UD 5", "Show the before and after count when editing a live rule, and require confirmation if the change is large."]
        ],
        scale: [
          "Evaluate rules in the background with a visible processing state. Large directories take time.",
          "Guard against catastrophic edits: block or confirm rule changes that would remove more than a threshold of members.",
          "Keep a history of rule changes and membership deltas."
        ]
      },

      "Nested groups": {
        think: [
          "Nesting lets groups mirror an org chart, but it hides who is actually a member.",
          "Admins need both views: the direct members, and the full flattened membership."
        ],
        do: [
          "Show direct members and nested groups separately, with a total effective member count.",
          "Let admins expand a nested group in place.",
          "Show which parent groups a group belongs to, and what access flows down.",
          "Detect and block circular nesting."
        ],
        dont: [
          "Don't show only direct members and call it the group's membership.",
          "Don't allow unlimited nesting depth without a warning.",
          "Don't let access granted through deep nesting go unexplained."
        ],
        access: [
          ["WCAG 1.3.1", "Use a tree with expandable nodes and announce nesting level."],
          ["WCAG 2.1.1", "Expand and collapse with the keyboard."],
          ["UD 4", "State 'Includes 4 nested groups, 1,820 people in total' in text."]
        ],
        scale: [
          "Flattening deep hierarchies is expensive. Compute effective membership on the server and cache it.",
          "Cap nesting depth and show the longest chain in diagnostics.",
          "Effective membership counts power licensing and audits, so keep them accurate and timestamped."
        ]
      },

      "Directory sync": {
        think: [
          "Synced groups belong to the identity provider. The console's job is to show them clearly, use them for access, and explain any sync problems.",
          "Sync health is an ongoing concern, not a one-time setup."
        ],
        do: [
          "Badge synced groups with their source, such as 'Synced from Entra ID', and make them read-only here.",
          "Link to the group in the source system.",
          "Show last sync time, status, and the number of changes.",
          "Surface errors with what failed, why, and what to do."
        ],
        dont: [
          "Don't allow local edits to synced groups that the next sync will undo.",
          "Don't fail sync silently.",
          "Don't sync every group by default. Let admins choose which groups come in."
        ],
        access: [
          ["WCAG 4.1.3", "Announce sync completion or failure when the admin triggers a manual sync."],
          ["WCAG 1.4.1", "Sync status uses text and icons, not just a green or red dot."],
          ["UD 4", "Explain read-only fields in place: 'Managed in Entra ID. Change it there.'"]
        ],
        scale: [
          "Large tenants sync tens of thousands of groups. Support filtering which groups sync, and incremental syncs.",
          "Handle sync conflicts and deletions safely, with a holding period before removing access.",
          "Provide a sync log with per-object results for troubleshooting."
        ]
      }
    }
  },

  /* ------------------------------------------------------------------ */
  "security-identity": {
    scale: {
      intro: "Security settings are org-wide switches with org-wide consequences. A wrong SSO configuration can lock out every user, including the admin who made it. At enterprise size, identity is owned by a separate team with its own provider, and these screens are where the two systems meet. Design for safe rollout, clear status, and a way back.",
      tiers: [
        ["Tens", "Passwords and optional MFA. One admin turns things on and off."],
        ["Thousands", "SSO is required. MFA is enforced. Session length and device rules vary by group."],
        ["Hundreds of thousands", "Multiple identity providers, many verified domains, conditional access by network and device, and security changes that go through change control."]
      ],
      principles: [
        "Never let a configuration lock out every admin. Keep a break-glass path and test before enforcing.",
        "Roll out in stages: test with one group, then a percentage, then everyone.",
        "Show current state and its effect plainly, such as 'MFA required for 48,120 of 48,310 users'.",
        "Delegate the identity provider's job to the identity provider. Reflect its settings rather than duplicating them.",
        "Log every security setting change with who, when, what changed, and the previous value."
      ]
    },
    patterns: {
      "SSO setup": {
        think: [
          "SSO setup is a handshake between two admin consoles, often run by two different people. Design for copy-paste between them.",
          "The riskiest moment is enforcement. Testing must come before turning it on for everyone."
        ],
        do: [
          "Walk through setup in steps: choose provider, exchange metadata, map attributes, test, then enforce.",
          "Provide provider-specific instructions for common identity providers, and a generic SAML or OIDC path.",
          "Make every value copyable, and accept metadata by URL or file.",
          "Require a successful test sign-in before allowing enforcement."
        ],
        dont: [
          "Don't enforce SSO for admins without a break-glass account.",
          "Don't show cryptic errors like 'Invalid assertion' without the likely cause and fix.",
          "Don't hide certificate expiry. Expired certificates cause org-wide outages."
        ],
        access: [
          ["WCAG 3.3.2", "Label every field with what it is called in the identity provider, since names differ."],
          ["WCAG 3.3.3", "Error messages explain the fix, such as 'The ACS URL doesn't match. Copy it from step 2.'"],
          ["WCAG 4.1.3", "Announce 'Copied to clipboard' when a value is copied."],
          ["UD 5", "Test mode and a break-glass account make a misconfiguration recoverable."]
        ],
        scale: [
          "Large orgs run several identity providers, by subsidiary or region. Support multiple connections routed by domain.",
          "Warn well ahead of certificate expiry and support rotating certificates with no downtime.",
          "Pair SSO with SCIM, so accounts are created and removed automatically, not just signed in."
        ]
      },

      "MFA enforcement": {
        think: [
          "Enforcing MFA is easy to switch on and hard to land. The question is how people who aren't enrolled will get through.",
          "Different people need different factors. Not everyone has a smartphone or can use one."
        ],
        do: [
          "Show enrolment status before enforcing: how many are enrolled, and who isn't.",
          "Offer a grace period and reminders before enforcement.",
          "Allow a range of factors: authenticator app, security key, passkey, and a fallback.",
          "Let admins exempt service accounts and break-glass accounts explicitly, with a reason."
        ],
        dont: [
          "Don't enforce MFA instantly for everyone with no enrolment window.",
          "Don't rely on SMS as the only factor.",
          "Don't hide exemptions. They should be listed and reviewed."
        ],
        access: [
          ["WCAG 3.3.8", "Don't require people to memorise or transcribe codes without support. Allow paste, passkeys or security keys."],
          ["WCAG 2.2.1", "If a code expires, warn in time and let people request a new one easily."],
          ["UD 1", "Offer factors that work for people with different abilities, devices and circumstances."],
          ["UD 2", "Let people choose their preferred factor and register more than one."]
        ],
        scale: [
          "Roll out by group or percentage, with a dashboard of enrolment progress.",
          "Provide self-service recovery so lost devices don't flood the helpdesk.",
          "Prefer enforcing MFA in the identity provider and reflect its status here."
        ]
      },

      "Session management": {
        think: [
          "Sessions decide how long access lasts after sign-in. Admins tune the trade-off between security and interruption.",
          "During an incident, the most important action is ending sessions now."
        ],
        do: [
          "Let admins set session length and idle timeout, with sensible defaults.",
          "Show a user's active sessions with device, location and last activity.",
          "Offer 'Sign out everywhere' for one user and for a group.",
          "Explain what happens to unsaved work when a session ends."
        ],
        dont: [
          "Don't make idle timeouts so short that people lose work.",
          "Don't end sessions without warning users who are mid-task, unless it's a security response.",
          "Don't show IP addresses without a readable location."
        ],
        access: [
          ["WCAG 2.2.1", "Warn people before an idle timeout and let them extend the session, unless it's a security requirement."],
          ["WCAG 1.3.1", "Present sessions as a table with headers for device, location and time."],
          ["UD 5", "Preserve drafts when a session expires, so a timeout doesn't cost work."]
        ],
        scale: [
          "Incident response needs bulk sign-out for whole groups or the whole org in seconds.",
          "Session revocation must propagate to all services and API tokens, not just the web app.",
          "Allow different session rules by group, such as stricter timeouts for admins."
        ]
      },

      "Domain verification": {
        think: [
          "Verifying a domain proves the org owns it. It unlocks SSO, domain capture and account takeover of existing users.",
          "The steps happen in a DNS console the admin may not control. Design for handing off to someone else."
        ],
        do: [
          "Show the exact TXT record with copy buttons for name and value.",
          "Explain that DNS can take time, and let admins check again manually.",
          "Show status per domain: pending, verified, failed, with the last check time.",
          "Let admins share setup instructions with whoever manages DNS."
        ],
        dont: [
          "Don't time out verification after a few minutes.",
          "Don't claim existing accounts on a domain without telling the account holders.",
          "Don't allow verifying public email domains."
        ],
        access: [
          ["WCAG 3.3.2", "Explain each step and where to enter the record."],
          ["WCAG 4.1.3", "Announce verification results when a check finishes."],
          ["UD 3", "Use plain steps instead of assuming DNS knowledge."]
        ],
        scale: [
          "Enterprises own hundreds of domains. Support bulk adding and status filtering.",
          "Re-verify periodically and alert when a domain record disappears.",
          "Map domains to identity providers and default groups."
        ]
      },

      "Device management": {
        think: [
          "Device rules decide which computers and phones can access org data. They touch people's personal devices, so trust matters.",
          "Admins need to see devices, set requirements, and remove a lost device fast."
        ],
        do: [
          "List devices per user with type, OS, last seen and compliance status.",
          "Explain requirements in plain terms, such as 'Requires screen lock and current OS'.",
          "Offer remove and wipe as separate actions, with clear consequences for each.",
          "Tell users what admins can and can't see on their devices."
        ],
        dont: [
          "Don't wipe a personal device without a clear, separate confirmation.",
          "Don't block access without telling the person what to fix.",
          "Don't rely on colour to show compliant versus non-compliant."
        ],
        access: [
          ["WCAG 1.4.1", "Compliance status uses text and icons, not colour alone."],
          ["WCAG 3.3.4", "Wiping a device needs explicit confirmation and a clear statement of what is erased."],
          ["UD 1", "Explain policies so people on any device understand why they're blocked and how to fix it."]
        ],
        scale: [
          "Large fleets come from a device management system. Integrate and reflect status rather than re-managing devices.",
          "Support bulk actions for a lost shipment or a compromised device type.",
          "Report compliance trends by group and platform."
        ]
      },

      "IP allowlists": {
        think: [
          "An allowlist is a blunt, powerful control. One typo can lock out the whole org, including the admin.",
          "Test before enforcing, and always show the admin's own current IP."
        ],
        do: [
          "Show the admin's current IP address and warn if the new list would block it.",
          "Validate CIDR ranges as they're typed, and show how many addresses each range covers.",
          "Offer a monitor-only mode that logs what would have been blocked.",
          "Let each entry have a label, such as 'London office'."
        ],
        dont: [
          "Don't apply a list that blocks the admin making the change without a strong warning.",
          "Don't accept invalid ranges silently.",
          "Don't hide which services the allowlist applies to (web, API, mobile)."
        ],
        access: [
          ["WCAG 3.3.1", "Identify invalid entries in text next to each row."],
          ["WCAG 3.3.4", "Review and confirm before enforcing a list that affects everyone."],
          ["UD 5", "Monitor-only mode makes mistakes visible before they cause lockouts."]
        ],
        scale: [
          "Large orgs have hundreds of ranges. Support import, labels, search and expiry dates.",
          "Allow different lists by group or service.",
          "Log blocked attempts and alert on unusual patterns."
        ]
      }
    }
  },

  /* ------------------------------------------------------------------ */
  "access-requests": {
    scale: {
      intro: "Access requests replace 'ask an admin in chat' with a tracked workflow. At scale they are how least privilege actually works: people start with little and ask for more, with approvals and expiry. The design must be fast for requesters and approvers, or people will route around it, and auditable, or it won't satisfy compliance.",
      tiers: [
        ["Tens", "People ask an admin directly. A simple request button and an email to the admin is enough."],
        ["Thousands", "Requests go to resource owners and managers, not just IT. Approvals are queued, and access often expires."],
        ["Hundreds of thousands", "Policy-driven routing, multi-step approvals for sensitive access, automatic expiry, and periodic reviews that auditors rely on."]
      ],
      principles: [
        "Route each request to the person who knows whether it's appropriate, usually the resource owner or manager, not a central admin.",
        "Make approving and denying a one-step decision with the context needed to decide.",
        "Default sensitive access to expire. Permanent access should be the exception.",
        "Record who requested, who approved, why, and when. That record is audit evidence.",
        "Escalate stale requests. A request that waits forever teaches people to bypass the process."
      ]
    },
    patterns: {
      "Request access": {
        think: [
          "Requests happen when someone hits a wall. The best entry point is right there, on the denied page.",
          "Requesters don't know the permission model. Ask what they need to do, not which role they need."
        ],
        do: [
          "Offer 'Request access' on the access-denied screen, with the resource already filled in.",
          "Ask for a short reason and, where relevant, how long access is needed.",
          "Say who will review the request and how long it usually takes.",
          "Show request status and let people cancel or follow up."
        ],
        dont: [
          "Don't make people find a separate portal and re-enter what they were trying to open.",
          "Don't ask requesters to pick from technical role names.",
          "Don't let requests disappear with no status or notification."
        ],
        access: [
          ["WCAG 3.3.7", "Prefill the resource and requester, rather than asking people to retype them."],
          ["WCAG 4.1.3", "Announce 'Request sent to Priya Shah' after submitting."],
          ["WCAG 3.3.2", "Explain what a good reason looks like with an example."],
          ["UD 3", "One short form, reached from where the person already is."]
        ],
        scale: [
          "Route requests by policy: owner, manager, or a group of approvers, with fallbacks when someone is away.",
          "Auto-approve low-risk requests that match policy, and log them.",
          "Prevent duplicate requests for the same access."
        ]
      },

      "Approval queue": {
        think: [
          "Approvers are busy and not admins. The queue must make the decision fast and safe.",
          "Every pending request is someone waiting to work. Age matters."
        ],
        do: [
          "Show requester, what they're asking for, reason, age and risk level in each row.",
          "Let approvers approve or deny from the row, and in bulk for low-risk requests.",
          "Sort by oldest first by default, and highlight requests close to escalation.",
          "Let approvers act from email or chat, not only in the console."
        ],
        dont: [
          "Don't require opening each request to approve it.",
          "Don't allow bulk approval of high-risk access.",
          "Don't let requests sit with an approver who is away, with no delegation."
        ],
        access: [
          ["WCAG 1.3.1", "Use a table with headers so each request's details are announced together."],
          ["WCAG 2.5.8", "Approve and deny buttons need enough size and space to avoid mistakes."],
          ["WCAG 2.4.6", "Buttons say 'Approve Alex's request', not just 'Approve', for screen reader users scanning by button."],
          ["UD 5", "Allow undoing an approval shortly after, or revoking promptly."]
        ],
        scale: [
          "Busy approvers see hundreds of requests. Provide filters, saved views and bulk actions for low-risk items.",
          "Delegate approvals during absence, and escalate after a set time.",
          "Track approval times and backlogs per approver and per resource."
        ]
      },

      "Review detail": {
        think: [
          "The approver needs to judge whether this person should have this access, right now. Give them what they need for that call.",
          "Context answers the question: who is this, what will they get, who else has it, and is anything unusual?"
        ],
        do: [
          "Show the requester's role, team, manager and current access.",
          "Explain exactly what will be granted, in plain language, and its risk level.",
          "Show who else on the requester's team has the same access.",
          "Let the approver adjust the request, such as shorter duration or narrower scope, before approving."
        ],
        dont: [
          "Don't show only a permission code with no explanation.",
          "Don't require a comment for routine approvals. Require it for denials and high-risk grants.",
          "Don't hide that the requester is also the owner or approver."
        ],
        access: [
          ["WCAG 2.4.6", "Use headings for requester, requested access and context."],
          ["WCAG 1.3.1", "Present details as a description list."],
          ["UD 4", "State risk in words, not only with a colour or icon."]
        ],
        scale: [
          "Enforce separation of duties: people can't approve their own requests.",
          "Use peer comparisons and usage signals to flag unusual requests.",
          "Keep the full decision record for audits."
        ]
      },

      "Time-bound access": {
        think: [
          "Temporary access is how least privilege survives contact with real work. People get what they need for as long as they need it.",
          "Expiry must be visible and predictable, both to the person and to admins."
        ],
        do: [
          "Offer preset durations, such as 1 hour, 1 day, 1 week, or a custom date.",
          "Show when access expires wherever the access is shown.",
          "Notify people before expiry and let them request an extension.",
          "Revoke automatically and log the revocation."
        ],
        dont: [
          "Don't make permanent access the default for sensitive resources.",
          "Don't let access expire without warning in the middle of work.",
          "Don't show expiry only in UTC timestamps."
        ],
        access: [
          ["WCAG 2.2.1", "Warn ahead of expiry and offer a way to extend, where policy allows."],
          ["UD 4", "Show expiry as both a date in local time and a relative time ('in 3 hours')."],
          ["UD 5", "Make extension a single request, with the original context kept."]
        ],
        scale: [
          "Just-in-time admin access, granted for minutes and logged, is common for privileged roles in large orgs.",
          "Revocation must be reliable across every system the access touched.",
          "Report on standing versus temporary access for compliance."
        ]
      },

      "Access reviews": {
        think: [
          "Access reviews ask owners to confirm that people still need what they have. They are required by many audit standards.",
          "The real challenge is reviewer fatigue. Long lists get approved without being read."
        ],
        do: [
          "Assign reviews to the people who know: managers or resource owners.",
          "Show each item with useful context, such as last used date and whether access is unusual for their team.",
          "Suggest decisions, such as 'Not used in 90 days, consider removing'.",
          "Track campaign progress and send reminders.",
          "Apply decisions automatically and keep a record for auditors."
        ],
        dont: [
          "Don't present thousands of rows with only 'Approve all' as a realistic option.",
          "Don't leave removals to manual follow-up after the review.",
          "Don't run reviews with no deadline."
        ],
        access: [
          ["WCAG 1.3.1", "Each review item is a table row with headers for person, access, last used and decision."],
          ["WCAG 2.1.1", "Keep, remove and skip work by keyboard, ideally with shortcuts for long lists."],
          ["UD 6", "Recommendations and grouping reduce the number of decisions reviewers must make."]
        ],
        scale: [
          "Campaigns cover millions of grants. Focus reviewers on risky and unused access first.",
          "Schedule recurring campaigns by resource type and risk.",
          "Export a complete evidence package: who reviewed what, when, and what changed."
        ]
      }
    }
  }
});
