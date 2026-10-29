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
    screens: [
      {
        "src": "https://docs.azure.cn/en-us/entra/fundamentals/media/how-to-manage-groups/new-group.png",
        "product": "Microsoft Entra ID",
        "title": "Groups list with New group",
        "pattern": "Create group",
        "notes": "New group lives in the command bar above the directory of groups, next to bulk and download actions.",
        "credit": "Microsoft",
        "source": "https://docs.azure.cn/en-us/entra/fundamentals/how-to-manage-groups",
        "sourceTitle": "Microsoft Learn: Manage Microsoft Entra groups and group membership",
        "alt": "Microsoft Entra groups page with the New group option highlighted"
      },
      {
        "src": "https://docs.azure.cn/en-us/entra/identity/users/media/groups-create-rule/create-new-group.png",
        "product": "Microsoft Entra ID",
        "title": "New group form",
        "pattern": "Create group",
        "notes": "Group type and membership type (assigned or dynamic) are chosen up front, with owners named at creation.",
        "credit": "Microsoft",
        "source": "https://docs.azure.cn/en-us/entra/identity/users/groups-create-rule",
        "sourceTitle": "Microsoft Learn: Create or update a dynamic membership group",
        "alt": "Microsoft Entra new group form with group type, name, owners and membership type"
      },
      {
        "src": "https://experienceleague.adobe.com/en/docs/support-resources/adobe-support-tools-guide/adobe-admin-console/media_13e6785831a0157bd8ea4499a92f57a621f3e8ca2.png?width=750&format=png&optimize=medium",
        "product": "Adobe Admin Console",
        "title": "User groups",
        "pattern": "Create group",
        "notes": "User groups listed per organization, with Add User Group at the top and edit actions in each row’s menu.",
        "credit": "Adobe",
        "source": "https://experienceleague.adobe.com/en/docs/support-resources/adobe-support-tools-guide/adobe-admin-console/manage-user-groups",
        "sourceTitle": "Adobe Experience League: Manage user groups in the Global Admin Console",
        "alt": "Adobe Global Admin Console user groups tab with the Edit user group option"
      },
      {
        "src": "https://docs.azure.cn/en-us/entra/fundamentals/media/how-to-manage-groups/add-members.png",
        "product": "Microsoft Entra ID",
        "title": "Add members during creation",
        "pattern": "Manage members",
        "notes": "People can be picked while the group is being created, so it isn’t born empty.",
        "credit": "Microsoft",
        "source": "https://docs.azure.cn/en-us/entra/fundamentals/how-to-manage-groups",
        "sourceTitle": "Microsoft Learn: Manage Microsoft Entra groups and group membership",
        "alt": "Selecting members for a new Microsoft Entra group"
      },
      {
        "src": "https://docs.azure.cn/en-us/entra/fundamentals/media/how-to-manage-groups/groups-members-owners.png",
        "product": "Microsoft Entra ID",
        "title": "Group overview",
        "pattern": "Manage members",
        "notes": "Members and owners are separate entries in the group’s menu, keeping who manages the group distinct from who belongs to it.",
        "credit": "Microsoft",
        "source": "https://docs.azure.cn/en-us/entra/fundamentals/how-to-manage-groups",
        "sourceTitle": "Microsoft Learn: Manage Microsoft Entra groups and group membership",
        "alt": "Microsoft Entra group overview with Members and Owners menu options"
      },
      {
        "src": "https://docs.azure.cn/en-us/entra/fundamentals/media/how-to-manage-groups/groups-remove-member.png",
        "product": "Microsoft Entra ID",
        "title": "Remove a member",
        "pattern": "Manage members",
        "notes": "Select in the member list, then Remove in the command bar: the same pattern as everywhere else in the console.",
        "credit": "Microsoft",
        "source": "https://docs.azure.cn/en-us/entra/fundamentals/how-to-manage-groups",
        "sourceTitle": "Microsoft Learn: Manage Microsoft Entra groups and group membership",
        "alt": "Microsoft Entra group members list with one member selected and Remove highlighted"
      },
      {
        "src": "https://docs.azure.cn/en-us/entra/identity/users/media/groups-create-rule/update-dynamic-group-rule.png",
        "product": "Microsoft Entra ID",
        "title": "Dynamic membership rule builder",
        "pattern": "Dynamic groups",
        "notes": "Rows of attribute, operator and value joined by And/Or, with a text editor alongside for complex rules.",
        "credit": "Microsoft",
        "source": "https://docs.azure.cn/en-us/entra/identity/users/groups-create-rule",
        "sourceTitle": "Microsoft Learn: Create or update a dynamic membership group",
        "alt": "Microsoft Entra dynamic membership rule builder"
      },
      {
        "src": "https://docs.azure.cn/en-us/entra/identity/users/media/groups-create-rule/group-status.png",
        "product": "Microsoft Entra ID",
        "title": "Membership processing status",
        "pattern": "Dynamic groups",
        "notes": "The group shows whether its rule has finished evaluating and when membership last changed.",
        "credit": "Microsoft",
        "source": "https://docs.azure.cn/en-us/entra/identity/users/groups-create-rule",
        "sourceTitle": "Microsoft Learn: Create or update a dynamic membership group",
        "alt": "Microsoft Entra dynamic group overview showing membership processing status"
      },
      {
        "src": "https://docs.azure.cn/en-us/entra/fundamentals/media/how-to-manage-groups/nested-groups-selected.png",
        "product": "Microsoft Entra ID",
        "title": "Add a group to another group",
        "pattern": "Nested groups",
        "notes": "Nesting is managed from the child group’s Group memberships page, choosing which parent groups it joins.",
        "credit": "Microsoft",
        "source": "https://docs.azure.cn/en-us/entra/fundamentals/how-to-manage-groups",
        "sourceTitle": "Microsoft Learn: Manage Microsoft Entra groups and group membership",
        "alt": "Making a Microsoft Entra group a member of another group"
      },
      {
        "src": "https://docs.azure.cn/en-us/entra/fundamentals/media/how-to-manage-groups/remove-nested-group.png",
        "product": "Microsoft Entra ID",
        "title": "Group memberships",
        "pattern": "Nested groups",
        "notes": "Lists the parent groups a group belongs to, so inherited access can be traced and removed.",
        "credit": "Microsoft",
        "source": "https://docs.azure.cn/en-us/entra/fundamentals/how-to-manage-groups",
        "sourceTitle": "Microsoft Learn: Manage Microsoft Entra groups and group membership",
        "alt": "Microsoft Entra group memberships page showing parent groups"
      },
      {
        "src": "https://docs.dd-static.net/images/account_management/teams/team-filter.3f0bdfe72bf8abacca6e1b3df23fa411.png?auto=format&fit=max&w=850",
        "product": "Datadog",
        "title": "Team filter with subteams",
        "pattern": "Nested groups",
        "notes": "Parent teams expand to show subteams, each with its own checkbox, so people can pick a team with or without its children.",
        "credit": "Datadog",
        "source": "https://docs.datadoghq.com/account_management/teams/",
        "sourceTitle": "Datadog Docs: Teams",
        "alt": "Datadog team filter with a parent team expanded to show selected subteams"
      },
      {
        "src": "https://docs.azure.cn/en-us/entra/includes/media/cloud-sync-sign-in/cloud-sync-configurations.png",
        "product": "Microsoft Entra ID",
        "title": "Cloud Sync configurations",
        "pattern": "Directory sync",
        "notes": "Each sync configuration listed with its status, the entry point for checking whether directory sync is healthy.",
        "credit": "Microsoft",
        "source": "https://docs.azure.cn/en-us/entra/identity/hybrid/on-demand-provision",
        "sourceTitle": "Microsoft Learn: On-demand provisioning using cloud sync",
        "alt": "Microsoft Entra Connect Cloud Sync configurations page"
      },
      {
        "src": "https://docs.azure.cn/en-us/Entra/identity/monitoring-health/media/concept-provisioning-logs/steps.png",
        "product": "Microsoft Entra ID",
        "title": "Provisioning log steps",
        "pattern": "Directory sync",
        "notes": "One synced object, step by step: imported, checked for scope, matched, then provisioned, each with a result.",
        "credit": "Microsoft",
        "source": "https://docs.azure.cn/en-us/entra/identity/monitoring-health/concept-provisioning-logs",
        "sourceTitle": "Microsoft Learn: Provisioning logs in Microsoft Entra ID",
        "alt": "Microsoft Entra provisioning log Steps tab showing each sync step with its result"
      },
      {
        "src": "https://docs.dd-static.net/images/account_management/saml/create_mapping.8a9905c485c106611e1c3ab430e419b8.png?auto=format&fit=max&w=850",
        "product": "Datadog",
        "title": "Map identity provider groups",
        "pattern": "Directory sync",
        "notes": "A group attribute from the identity provider is mapped to a role, so membership is managed upstream, not in Datadog.",
        "credit": "Datadog",
        "source": "https://docs.datadoghq.com/account_management/saml/mapping/",
        "sourceTitle": "Datadog Docs: Mapping SAML attributes to roles and teams",
        "alt": "Datadog New Mapping dialog linking a SAML attribute to a role"
      }
    ]
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
    screens: [
      {
        "src": "https://docs.azure.cn/en-us/entra/identity/enterprise-apps/media/add-application-portal-setup-sso/saml-configuration.png",
        "product": "Microsoft Entra ID",
        "title": "SAML single sign-on setup",
        "pattern": "SSO setup",
        "notes": "Setup laid out as numbered cards (basic configuration, attributes, certificate, app setup), each with its own edit action and copyable values.",
        "credit": "Microsoft",
        "source": "https://docs.azure.cn/en-us/entra/identity/enterprise-apps/add-application-portal-setup-sso",
        "sourceTitle": "Microsoft Learn: Enable SAML single sign-on for an enterprise application",
        "alt": "Microsoft Entra SAML-based single sign-on page with numbered configuration sections"
      },
      {
        "src": "https://docs.dd-static.net/images/account_management/saml/saml_metadata_url.688ff08d5a4c5c717cba6ae54de82f77.png?auto=format&fit=max&w=850",
        "product": "Datadog",
        "title": "SAML enabled, service provider details",
        "pattern": "SSO setup",
        "notes": "A clear ‘SAML is enabled’ state, followed by the values the identity provider needs, each ready to copy.",
        "credit": "Datadog",
        "source": "https://docs.datadoghq.com/account_management/saml/",
        "sourceTitle": "Datadog Docs: Single sign-on with SAML",
        "alt": "Datadog SAML settings showing SAML is enabled and service provider details"
      },
      {
        "src": "https://docs.dd-static.net/images/account_management/saml/saml_jit_default.100ecd798a6f2d621d85cef6fde8f299.png?auto=format&fit=max&w=850",
        "product": "Datadog",
        "title": "Just-in-time provisioning",
        "pattern": "SSO setup",
        "notes": "SSO paired with account creation on first sign-in, limited to listed domains and given a default role.",
        "credit": "Datadog",
        "source": "https://docs.datadoghq.com/account_management/saml/",
        "sourceTitle": "Datadog Docs: Single sign-on with SAML",
        "alt": "Datadog SAML additional features with just-in-time provisioning domains and default role"
      },
      {
        "src": "https://docs.azure.cn/en-us/entra/identity/authentication/media/concept-authentication-methods-manage/authentication-methods-policy.png",
        "product": "Microsoft Entra ID",
        "title": "Authentication methods policy",
        "pattern": "MFA enforcement",
        "notes": "Every factor in one list (passkeys, Authenticator, SMS and more) with whether it’s enabled and who it targets.",
        "credit": "Microsoft",
        "source": "https://docs.azure.cn/en-us/entra/identity/authentication/concept-authentication-methods-manage",
        "sourceTitle": "Microsoft Learn: Manage authentication methods",
        "alt": "Microsoft Entra authentication methods policy listing methods with status and targets"
      },
      {
        "src": "https://docs.azure.cn/en-us/entra/identity/authentication/media/how-to-mfa-registration-campaign/enabled-passkey-campaign.png",
        "product": "Microsoft Entra ID",
        "title": "Registration campaign",
        "pattern": "MFA enforcement",
        "notes": "Enrolment nudges configured by method, target groups and how many days people can snooze before they must register.",
        "credit": "Microsoft",
        "source": "https://docs.azure.cn/en-us/entra/identity/authentication/how-to-mfa-registration-campaign",
        "sourceTitle": "Microsoft Learn: Run a registration campaign",
        "alt": "Microsoft Entra registration campaign settings with method, snooze and target settings"
      },
      {
        "src": "https://docs.azure.cn/en-us/entra/identity/authentication/media/how-to-mfa-registration-campaign/user-prompt.png",
        "product": "Microsoft Entra ID",
        "title": "Enrolment prompt for users",
        "pattern": "MFA enforcement",
        "notes": "The person’s side of the rollout: a plain prompt with ‘Skip for now (3 times left)’, a grace period people can see.",
        "credit": "Microsoft",
        "source": "https://docs.azure.cn/en-us/entra/identity/authentication/how-to-mfa-registration-campaign",
        "sourceTitle": "Microsoft Learn: Run a registration campaign",
        "alt": "Sign-in prompt asking the user to set up Microsoft Authenticator with a skip option showing remaining skips"
      },
      {
        "src": "https://docs.azure.cn/en-us/entra/identity/conditional-access/media/howto-conditional-access-session-lifetime/conditional-access-policy-session-sign-in-frequency.png",
        "product": "Microsoft Entra ID",
        "title": "Sign-in frequency",
        "pattern": "Session management",
        "notes": "Session length set per policy rather than org-wide, so admins and risky sign-ins can have stricter rules than everyone else.",
        "credit": "Microsoft",
        "source": "https://docs.azure.cn/en-us/entra/identity/conditional-access/howto-conditional-access-session-lifetime",
        "sourceTitle": "Microsoft Learn: Configure adaptive session lifetime policies",
        "alt": "Microsoft Entra Conditional Access session controls with sign-in frequency configured"
      },
      {
        "src": "https://docs.github.com/assets/cb-66704/images/help/organizations/continue-verifying-domain.png",
        "product": "GitHub",
        "title": "Verified & approved domains",
        "pattern": "Domain verification",
        "notes": "Each domain with a clear status badge such as ‘Pending verification’, and a row menu to continue or remove.",
        "credit": "GitHub",
        "source": "https://docs.github.com/en/organizations/managing-organization-settings/verifying-or-approving-a-domain-for-your-organization",
        "sourceTitle": "GitHub Docs: Verifying or approving a domain for your organization",
        "alt": "GitHub verified and approved domains list with a domain pending verification"
      },
      {
        "src": "https://docs.azure.cn/en-us/entra/identity/devices/media/manage-device-identities/all-devices-azure-portal.png",
        "product": "Microsoft Entra ID",
        "title": "All devices",
        "pattern": "Device management",
        "notes": "Device inventory with OS, join type, owner, compliance and last activity, plus enable, disable and delete in the command bar.",
        "credit": "Microsoft",
        "source": "https://docs.azure.cn/en-us/entra/identity/devices/manage-device-identities",
        "sourceTitle": "Microsoft Learn: Manage devices in Microsoft Entra ID",
        "alt": "Microsoft Entra All devices list with device details"
      },
      {
        "src": "https://docs.azure.cn/en-us/entra/identity/devices/media/manage-device-identities/device-settings-azure-portal.png",
        "product": "Microsoft Entra ID",
        "title": "Device settings",
        "pattern": "Device management",
        "notes": "Org-wide rules for who can join devices, how many each person can register, and whether MFA is required to do it.",
        "credit": "Microsoft",
        "source": "https://docs.azure.cn/en-us/entra/identity/devices/manage-device-identities",
        "sourceTitle": "Microsoft Learn: Manage devices in Microsoft Entra ID",
        "alt": "Microsoft Entra device settings page"
      },
      {
        "src": "https://docs.azure.cn/en-us/entra/identity/conditional-access/media/concept-assignment-network/named-locations.png",
        "product": "Microsoft Entra ID",
        "title": "Named locations",
        "pattern": "IP allowlists",
        "notes": "IP ranges and countries saved once with a name and a trusted flag, then reused across policies.",
        "credit": "Microsoft",
        "source": "https://docs.azure.cn/en-us/entra/identity/conditional-access/concept-assignment-network",
        "sourceTitle": "Microsoft Learn: Conditional Access network assignment",
        "alt": "Microsoft Entra named locations list with IP ranges and countries"
      },
      {
        "src": "https://docs.azure.cn/en-us/entra/identity/conditional-access/media/concept-assignment-network/network-assignment.png",
        "product": "Microsoft Entra ID",
        "title": "Network condition in a policy",
        "pattern": "IP allowlists",
        "notes": "Policies include or exclude named locations rather than raw IP lists, keeping the rule readable.",
        "credit": "Microsoft",
        "source": "https://docs.azure.cn/en-us/entra/identity/conditional-access/concept-assignment-network",
        "sourceTitle": "Microsoft Learn: Conditional Access network assignment",
        "alt": "Microsoft Entra Conditional Access policy network condition selecting locations"
      }
    ]
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
