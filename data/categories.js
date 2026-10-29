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
      ["Pending invites", "Resend, revoke, expired states"],
      ["Bulk add users", "CSV upload and validation"],
      ["Auto-join by domain", "Verified domains route sign-ups to the org"]
    ],
    screens: [
      {
        src: "https://learn.microsoft.com/en-us/microsoft-365/media/classic-admin-center.png?view=o365-worldwide",
        product: "Microsoft 365 admin center",
        title: "Active users (dashboard view)",
        pattern: "User directory",
        notes: "Add a user lives in the command bar above the list rather than as a page-level button.",
        credit: "Microsoft",
        source: "https://learn.microsoft.com/en-us/office365/admin/add-users/add-users",
        sourceTitle: "Microsoft Learn: Add users and assign licenses",
        alt: "Microsoft 365 admin center dashboard view showing the Active users list"
      },
      {
        src: "https://docs.azure.cn/en-us/entra/fundamentals/media/how-to-create-delete-users/all-users-page.png",
        product: "Microsoft Entra ID",
        title: "All users",
        pattern: "User directory",
        notes: "Dense directory with a command bar for create, invite, bulk operations and delete.",
        credit: "Microsoft",
        source: "https://docs.azure.cn/en-us/entra/fundamentals/how-to-create-delete-users",
        sourceTitle: "Microsoft Learn: Create, invite and delete users",
        alt: "All users page in Microsoft Entra ID"
      },
      {
        src: "https://images.ctfassets.net/zsv3d0ugroxu/4xDJS7tC2c2Jzp82YL5aOJ/2881d05163a50739b7a08f16eae89569/SAC_Single_dir_cropped.png",
        product: "Atlassian Administration",
        title: "Users list (centralized)",
        pattern: "User directory",
        notes: "One org-wide directory with no site filter.",
        credit: "Atlassian",
        source: "https://support.atlassian.com/user-management/docs/invite-a-user/",
        sourceTitle: "Atlassian Support: Invite a user",
        alt: "Atlassian Administration Users page in the centralized user management experience"
      },
      {
        src: "https://images.ctfassets.net/zsv3d0ugroxu/7AevASHr0yJp0LZaXGBoxP/e142415a973bcf23c61a769f71c9a38c/SAC_Multi_dir_cropped.png",
        product: "Atlassian Administration",
        title: "Users list (per-site)",
        pattern: "User directory",
        notes: "Same page with a site filter, for orgs whose users are split by site. Good pairing for comparing scoping models.",
        credit: "Atlassian",
        source: "https://support.atlassian.com/user-management/docs/invite-a-user/",
        sourceTitle: "Atlassian Support: Invite a user",
        alt: "Atlassian Administration Users page with a Site filter in the original user management experience"
      },
      {
        src: "https://experienceleague.adobe.com/en/docs/workfront/using/administration-and-setup/add-users/create-manage-users/media_141841b5e1e76c1c29b66720d1e5e5baf63cf976c.png?width=750&format=png&optimize=medium",
        product: "Adobe Admin Console",
        title: "Product profiles",
        pattern: "User directory",
        notes: "Users and admins are reached through the product, then its profiles.",
        credit: "Adobe",
        source: "https://experienceleague.adobe.com/en/docs/workfront/using/administration-and-setup/add-users/create-manage-users/admin-console",
        sourceTitle: "Adobe Experience League: Manage users in the Adobe Admin Console",
        alt: "Adobe Admin Console product page showing product profiles"
      },
      {
        src: "https://learn.microsoft.com/en-us/microsoft-365/media/vsb-add-user-view.png?view=o365-worldwide",
        product: "Microsoft 365 admin center",
        title: "Add user (simplified view)",
        pattern: "Invite / add user",
        notes: "The simplified admin view for small businesses puts Add user front and centre.",
        credit: "Microsoft",
        source: "https://learn.microsoft.com/en-us/office365/admin/add-users/add-users",
        sourceTitle: "Microsoft Learn: Add users and assign licenses",
        alt: "Microsoft 365 admin center simplified view with the Add user action"
      },
      {
        src: "https://docs.azure.cn/en-us/entra/fundamentals/media/how-to-create-delete-users/create-new-user-menu.png",
        product: "Microsoft Entra ID",
        title: "New user menu",
        pattern: "Invite / add user",
        notes: "One button splits into create an internal user or invite an external one.",
        credit: "Microsoft",
        source: "https://docs.azure.cn/en-us/entra/fundamentals/how-to-create-delete-users",
        sourceTitle: "Microsoft Learn: Create, invite and delete users",
        alt: "Microsoft Entra new user menu with create and invite options"
      },
      {
        src: "https://docs.azure.cn/en-us/entra/fundamentals/media/how-to-create-delete-users/create-new-user-basics-tab.png",
        product: "Microsoft Entra ID",
        title: "Create new user, Basics tab",
        pattern: "Invite / add user",
        notes: "Tabbed create form: Basics, Properties, Assignments, then Review + create.",
        credit: "Microsoft",
        source: "https://docs.azure.cn/en-us/entra/fundamentals/how-to-create-delete-users",
        sourceTitle: "Microsoft Learn: Create, invite and delete users",
        alt: "Create new user form, Basics tab, in Microsoft Entra ID"
      },
      {
        src: "https://docs.azure.cn/en-us/entra/fundamentals/media/how-to-create-delete-users/add-group-assignment.png",
        product: "Microsoft Entra ID",
        title: "Assign groups during create",
        pattern: "Invite / add user",
        notes: "Group and role assignment happens inside the create flow, not after.",
        credit: "Microsoft",
        source: "https://docs.azure.cn/en-us/entra/fundamentals/how-to-create-delete-users",
        sourceTitle: "Microsoft Learn: Create, invite and delete users",
        alt: "Adding a group assignment while creating a user in Microsoft Entra ID"
      },
      {
        src: "https://docs.azure.cn/en-us/entra/fundamentals/media/how-to-create-delete-users/invite-external-user-basics-tab.png",
        product: "Microsoft Entra ID",
        title: "Invite external user",
        pattern: "Invite / add user",
        notes: "Guest invite form with an optional personal message.",
        credit: "Microsoft",
        source: "https://docs.azure.cn/en-us/entra/fundamentals/how-to-create-delete-users",
        sourceTitle: "Microsoft Learn: Create, invite and delete users",
        alt: "Invite external user Basics tab in Microsoft Entra ID"
      },
      {
        src: "https://experienceleague.adobe.com/en/docs/workfront/using/administration-and-setup/add-users/create-manage-users/media_1ef01d6d4e3b5d4c28c920a51b5977ca1a72de5f6.png?width=750&format=png&optimize=medium",
        product: "Adobe Admin Console",
        title: "Add an admin",
        pattern: "Invite / add user",
        notes: "Adding someone as a product admin from the product’s Admins tab.",
        credit: "Adobe",
        source: "https://experienceleague.adobe.com/en/docs/workfront/using/administration-and-setup/add-users/create-manage-users/admin-console",
        sourceTitle: "Adobe Experience League: Manage users in the Adobe Admin Console",
        alt: "Add an admin in the Adobe Admin Console"
      },
      {
        src: "https://learn.microsoft.com/en-us/microsoft-365/media/upload-csv-file.png?view=o365-worldwide",
        product: "Microsoft 365 admin center",
        title: "Add a list of users (CSV)",
        pattern: "Bulk add users",
        notes: "Template download, upload, then validate before creating.",
        credit: "Microsoft",
        source: "https://learn.microsoft.com/en-us/office365/admin/add-users/add-users",
        sourceTitle: "Microsoft Learn: Add users and assign licenses",
        alt: "Microsoft 365 admin center panel for adding a list of users by CSV upload"
      },
      {
        src: "https://plaid.com/assets/img/docs/domain-capture-user-flow.png",
        product: "Plaid Dashboard",
        title: "Domain capture, user flow",
        pattern: "Auto-join by domain",
        notes: "What a new person sees when their email domain is claimed by an existing team.",
        credit: "Plaid",
        source: "https://plaid.com/docs/account/teams/",
        sourceTitle: "Plaid Docs: Teams",
        alt: "Plaid Dashboard domain capture flow for a user joining an existing team"
      },
      {
        src: "https://plaid.com/assets/img/docs/domain-capture.png",
        product: "Plaid Dashboard",
        title: "Team domains",
        pattern: "Auto-join by domain",
        notes: "Admin side: verify a domain so sign-ups route to the team.",
        credit: "Plaid",
        source: "https://plaid.com/docs/account/teams/",
        sourceTitle: "Plaid Docs: Teams",
        alt: "Plaid Dashboard team domain settings"
      },
      {
        src: "https://docs.azure.cn/en-us/entra/fundamentals/media/how-to-create-delete-users/external-user-invitation-state.png",
        product: "Microsoft Entra ID",
        title: "Guest invitation state",
        pattern: "Pending invites",
        notes: "Invitation status and resend live on the user’s detail page.",
        credit: "Microsoft",
        source: "https://docs.azure.cn/en-us/entra/fundamentals/how-to-create-delete-users",
        sourceTitle: "Microsoft Learn: Create, invite and delete users",
        alt: "Microsoft Entra user details with invitation status options highlighted"
      },
      {
        src: "https://docs.github.com/assets/cb-27352/images/help/organizations/retry-or-cancel-invitation.png",
        product: "GitHub",
        title: "Failed invitations",
        pattern: "Pending invites",
        notes: "Row overflow menu offers Retry invitation or Cancel invitation.",
        credit: "GitHub",
        source: "https://docs.github.com/en/organizations/managing-membership-in-your-organization/inviting-users-to-join-your-organization",
        sourceTitle: "GitHub Docs: Inviting users to join your organization",
        alt: "GitHub failed invitations list with a row menu for retry or cancel"
      },
      {
        src: "https://docs.azure.cn/en-us/entra/fundamentals/media/how-to-create-delete-users/delete-existing-user.png",
        product: "Microsoft Entra ID",
        title: "Delete user from list",
        pattern: "Offboarding",
        notes: "Select in the directory, then Delete in the command bar. Deleted users stay restorable for 30 days.",
        credit: "Microsoft",
        source: "https://docs.azure.cn/en-us/entra/fundamentals/how-to-create-delete-users",
        sourceTitle: "Microsoft Learn: Create, invite and delete users",
        alt: "All users page with a user selected and the Delete button highlighted"
      }
    ]
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
    screens: [
      {
        "src": "https://docs.azure.cn/en-us/entra/media/common/entra-roles-admins.png",
        "product": "Microsoft Entra ID",
        "title": "Roles and administrators",
        "pattern": "Role catalog",
        "notes": "Built-in and custom roles in one searchable list, each with a one-line description and a type column.",
        "credit": "Microsoft",
        "source": "https://docs.azure.cn/en-us/entra/identity/role-based-access-control/manage-roles-portal",
        "sourceTitle": "Microsoft Learn: Assign Microsoft Entra roles",
        "alt": "Microsoft Entra Roles and administrators page listing roles with descriptions"
      },
      {
        "src": "https://docs.azure.cn/en-us/entra/identity/role-based-access-control/media/role-definitions-list/roles-admins-description.png",
        "product": "Microsoft Entra ID",
        "title": "Role description",
        "pattern": "Role catalog",
        "notes": "Opening a role shows its summary and the full permission list, so admins can check what it grants before assigning it.",
        "credit": "Microsoft",
        "source": "https://docs.azure.cn/en-us/entra/identity/role-based-access-control/role-definitions-list",
        "sourceTitle": "Microsoft Learn: List Microsoft Entra role definitions",
        "alt": "Microsoft Entra role description page showing the role summary and its permissions"
      },
      {
        "src": "https://docs.azure.cn/en-us/role-based-access-control/media/custom-roles-portal/custom-role-list.png",
        "product": "Microsoft Azure",
        "title": "Custom roles list",
        "pattern": "Role catalog",
        "notes": "Filtering the role list to custom roles only, a simple way to keep org-made roles separate from built-ins.",
        "credit": "Microsoft",
        "source": "https://docs.azure.cn/en-us/role-based-access-control/custom-roles-portal",
        "sourceTitle": "Microsoft Learn: Create or update Azure custom roles",
        "alt": "Azure roles list filtered to custom roles"
      },
      {
        "src": "https://confluence.atlassian.com/doc/files/139460/720410233/359/1791529078872/spacepermissions-new.png",
        "product": "Confluence Data Center",
        "title": "Space permissions",
        "pattern": "Permission matrix",
        "notes": "Classic groups-by-capabilities grid, grouped by area (pages, blog, comments, restrictions). Granted and denied differ only by colour here: a useful example of what to improve.",
        "credit": "Atlassian",
        "source": "https://confluence.atlassian.com/doc/assign-space-permissions-139460.html",
        "sourceTitle": "Confluence Data Center docs: Assign space permissions",
        "alt": "Confluence space permissions grid of groups and users against capabilities"
      },
      {
        "src": "https://confluence.atlassian.com/doc/files/139460/294912190/379/1791529074901/defaultspacepermissions.png",
        "product": "Confluence Data Center",
        "title": "Default space permissions",
        "pattern": "Permission matrix",
        "notes": "The same matrix used to set defaults for every new space, with an edit mode separate from viewing.",
        "credit": "Atlassian",
        "source": "https://confluence.atlassian.com/doc/assign-space-permissions-139460.html",
        "sourceTitle": "Confluence Data Center docs: Assign space permissions",
        "alt": "Confluence default space permissions grid"
      },
      {
        "src": "https://docs.azure.cn/en-us/role-based-access-control/media/custom-roles-portal/clone-menu.png",
        "product": "Microsoft Azure",
        "title": "Clone a role",
        "pattern": "Create custom role",
        "notes": "Clone sits on each role’s row menu, so the safest starting point is the easiest one to reach.",
        "credit": "Microsoft",
        "source": "https://docs.azure.cn/en-us/role-based-access-control/custom-roles-portal",
        "sourceTitle": "Microsoft Learn: Create or update Azure custom roles",
        "alt": "Azure role row menu with the Clone option"
      },
      {
        "src": "https://docs.azure.cn/en-us/Entra/identity/role-based-access-control/media/custom-create/basics-tab.png",
        "product": "Microsoft Entra ID",
        "title": "New custom role, Basics",
        "pattern": "Create custom role",
        "notes": "Name and description first, with a choice to start from scratch or clone.",
        "credit": "Microsoft",
        "source": "https://docs.azure.cn/en-us/Entra/identity/role-based-access-control/custom-create",
        "sourceTitle": "Microsoft Learn: Create a custom role in Microsoft Entra ID",
        "alt": "Microsoft Entra new custom role Basics tab with name and description fields"
      },
      {
        "src": "https://docs.azure.cn/en-us/Entra/identity/role-based-access-control/media/custom-create/permissions-tab.png",
        "product": "Microsoft Entra ID",
        "title": "New custom role, Permissions",
        "pattern": "Create custom role",
        "notes": "Searchable list of permissions with descriptions next to each one, rather than bare scope codes.",
        "credit": "Microsoft",
        "source": "https://docs.azure.cn/en-us/Entra/identity/role-based-access-control/custom-create",
        "sourceTitle": "Microsoft Learn: Create a custom role in Microsoft Entra ID",
        "alt": "Microsoft Entra custom role Permissions tab with a searchable permissions list"
      },
      {
        "src": "https://docs.azure.cn/en-us/role-based-access-control/media/shared/add-permissions-list.png",
        "product": "Microsoft Azure",
        "title": "Add permissions",
        "pattern": "Create custom role",
        "notes": "Permissions grouped by resource, with read, write and delete actions listed separately.",
        "credit": "Microsoft",
        "source": "https://docs.azure.cn/en-us/role-based-access-control/custom-roles-portal",
        "sourceTitle": "Microsoft Learn: Create or update Azure custom roles",
        "alt": "Azure Add permissions pane listing actions for a resource provider"
      },
      {
        "src": "https://docs.azure.cn/en-us/role-based-access-control/media/custom-roles-portal/review-create.png",
        "product": "Microsoft Azure",
        "title": "Review + create",
        "pattern": "Create custom role",
        "notes": "A full summary of the role before it exists, including permissions and assignable scopes.",
        "credit": "Microsoft",
        "source": "https://docs.azure.cn/en-us/role-based-access-control/custom-roles-portal",
        "sourceTitle": "Microsoft Learn: Create or update Azure custom roles",
        "alt": "Azure custom role Review and create tab summarising the role"
      },
      {
        "src": "https://docs.dd-static.net/images/account_management/rbac/role_templates.77463a85fb2912867212ae5acb42ab42.png?auto=format&fit=max&w=850",
        "product": "Datadog",
        "title": "Role templates",
        "pattern": "Create custom role",
        "notes": "Start a role from a template such as Billing Admin instead of a blank list.",
        "credit": "Datadog",
        "source": "https://docs.datadoghq.com/account_management/rbac",
        "sourceTitle": "Datadog Docs: Access control",
        "alt": "Datadog role templates dropdown with Billing Admin role selected"
      },
      {
        "src": "https://docs.azure.cn/en-us/entra/identity/role-based-access-control/media/manage-roles-portal/add-assignments.png",
        "product": "Microsoft Entra ID",
        "title": "Add assignments",
        "pattern": "Assign role",
        "notes": "Assigning from the role’s side: pick the role, then the people or groups who should hold it.",
        "credit": "Microsoft",
        "source": "https://docs.azure.cn/en-us/entra/identity/role-based-access-control/manage-roles-portal",
        "sourceTitle": "Microsoft Learn: Assign Microsoft Entra roles",
        "alt": "Microsoft Entra Add assignments pane for a selected role"
      },
      {
        "src": "https://experienceleague.adobe.com/en/docs/support-resources/adobe-support-tools-guide/adobe-admin-console/media_14cb4ffec29f344affe0a0bd8134fb6b67a31c4f3.png?width=750&format=png&optimize=medium",
        "product": "Adobe Admin Console",
        "title": "Add an administrator",
        "pattern": "Assign role",
        "notes": "Admin types listed with plain descriptions; choosing product or profile admin then asks which product, so scope is part of the choice.",
        "credit": "Adobe",
        "source": "https://experienceleague.adobe.com/en/docs/support-resources/adobe-support-tools-guide/admin-roles",
        "sourceTitle": "Adobe Experience League: Administrative roles",
        "alt": "Adobe Admin Console Add an administrator dialog with admin role options"
      },
      {
        "src": "https://images.ctfassets.net/zsv3d0ugroxu/7JYBgXNU6CasHtoK4FAqHj/3cd9b3d8fa910ba2f7b0720ed6e8779e/image-20251030-170601.png",
        "product": "Confluence Cloud",
        "title": "Add people to a space",
        "pattern": "Assign role",
        "notes": "Lightweight assign: search for people and pick a role in one dialog, from the space itself.",
        "credit": "Atlassian",
        "source": "https://support.atlassian.com/confluence-cloud/docs/assign-space-permissions/",
        "sourceTitle": "Atlassian Support: Assign space permissions",
        "alt": "Confluence Cloud dialog for adding people to a space with a role picker"
      },
      {
        "src": "https://docs.azure.cn/en-us/entra/identity/role-based-access-control/media/manage-roles-portal/admin-units-roles.png",
        "product": "Microsoft Entra ID",
        "title": "Roles within an administrative unit",
        "pattern": "Scoped access",
        "notes": "Roles assigned inside an administrative unit only apply to the users and groups in that unit.",
        "credit": "Microsoft",
        "source": "https://docs.azure.cn/en-us/entra/identity/role-based-access-control/manage-roles-portal",
        "sourceTitle": "Microsoft Learn: Assign Microsoft Entra roles",
        "alt": "Microsoft Entra Roles and administrators view inside an administrative unit"
      },
      {
        "src": "https://docs.azure.cn/en-us/entra/identity/role-based-access-control/media/admin-units-manage/assign-roles-admin-unit.png",
        "product": "Microsoft Entra ID",
        "title": "Assign a role scoped to a unit",
        "pattern": "Scoped access",
        "notes": "The scope is shown with the assignment, so a scoped admin isn’t mistaken for a global one.",
        "credit": "Microsoft",
        "source": "https://docs.azure.cn/en-us/entra/identity/role-based-access-control/admin-units-manage",
        "sourceTitle": "Microsoft Learn: Create or delete administrative units",
        "alt": "Microsoft Entra Add assignments pane scoped to an administrative unit"
      },
      {
        "src": "https://docs.azure.cn/en-us/entra/identity/role-based-access-control/media/manage-roles-portal/app-reg-add-assignment.png",
        "product": "Microsoft Entra ID",
        "title": "Role scoped to one app",
        "pattern": "Scoped access",
        "notes": "Scoping down to a single resource: the same role, granted for one app registration only.",
        "credit": "Microsoft",
        "source": "https://docs.azure.cn/en-us/entra/identity/role-based-access-control/manage-roles-portal",
        "sourceTitle": "Microsoft Learn: Assign Microsoft Entra roles",
        "alt": "Microsoft Entra role assignment scoped to an app registration"
      },
      {
        "src": "https://docs.azure.cn/en-us/role-based-access-control/media/custom-roles-portal/assignable-scopes.png",
        "product": "Microsoft Azure",
        "title": "Assignable scopes",
        "pattern": "Scoped access",
        "notes": "A custom role declares where it may be used, which limits how widely it can ever be granted.",
        "credit": "Microsoft",
        "source": "https://docs.azure.cn/en-us/role-based-access-control/custom-roles-portal",
        "sourceTitle": "Microsoft Learn: Create or update Azure custom roles",
        "alt": "Azure custom role Assignable scopes tab"
      },
      {
        "src": "https://docs.azure.cn/en-us/role-based-access-control/media/shared/rg-check-access-select.png",
        "product": "Microsoft Azure",
        "title": "Check access",
        "pattern": "Effective permissions",
        "notes": "Pick any user, group or app and see their access to this resource.",
        "credit": "Microsoft",
        "source": "https://docs.azure.cn/en-us/role-based-access-control/check-access",
        "sourceTitle": "Microsoft Learn: Check access for a user to Azure resources",
        "alt": "Azure Check access pane for selecting a user, group or app"
      },
      {
        "src": "https://docs.azure.cn/en-us/role-based-access-control/media/shared/rg-check-access-assignments-user.png",
        "product": "Microsoft Azure",
        "title": "Role and deny assignments for a user",
        "pattern": "Effective permissions",
        "notes": "Shows grants and denies together, and whether each comes from this resource or is inherited.",
        "credit": "Microsoft",
        "source": "https://docs.azure.cn/en-us/role-based-access-control/check-access",
        "sourceTitle": "Microsoft Learn: Check access for a user to Azure resources",
        "alt": "Azure role and deny assignments for a selected user"
      },
      {
        "src": "https://docs.cloud.google.com/static/policy-intelligence/img/troubleshooter-role-bindings.png",
        "product": "Google Cloud",
        "title": "Policy Troubleshooter: role bindings",
        "pattern": "Effective permissions",
        "notes": "Answers ‘why does this person have access?’ binding by binding, with granted or not shown in words.",
        "credit": "Google",
        "source": "https://docs.cloud.google.com/iam/docs/troubleshooting-access",
        "sourceTitle": "Google Cloud Docs: Troubleshoot IAM permissions",
        "alt": "Google Cloud Policy Troubleshooter role bindings showing which bindings grant access"
      }
    ]
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
