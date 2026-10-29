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
      },
      {
        "src": "https://help.asana.com/servlet/rtaImage?eid=ka0Pc000000S5ZR&feoid=00NPc000003Pw7h&refid=0EMPc00000HLyU1",
        "product": "Asana",
        "title": "Members",
        "pattern": "User directory",
        "notes": "A full members table with role, status, licence, last activity and who added them, plus tabs for members, guests, invited and removed.",
        "credit": "Asana",
        "source": "https://help.asana.com/s/article/managing-members-in-an-organization",
        "sourceTitle": "Asana Help Center: Manage members in your organization",
        "alt": "Asana admin members table with role, status, licence and activity columns"
      },
      {
        "src": "https://assets.asana.biz/transform/0c5b27b4-5e29-432c-9019-bc737212044d/productui-helpcenter-managing_your_subscription-managing-members-in-an-organization-005-en-us.png",
        "product": "Asana",
        "title": "Filter by member type",
        "pattern": "User directory",
        "notes": "Filters sit above the table as compact menus, here narrowing to super admins or admins.",
        "credit": "Asana",
        "source": "https://help.asana.com/s/article/managing-members-in-an-organization",
        "sourceTitle": "Asana Help Center: Manage members in your organization",
        "alt": "Asana members list filtered by member type"
      },
      {
        "src": "https://help.asana.com/servlet/rtaImage?eid=ka0Pc000000S5ZR&feoid=00NPc000003Pw7h&refid=0EMPc00000HLxZa",
        "product": "Asana",
        "title": "Bulk status change",
        "pattern": "Suspend / deactivate",
        "notes": "Selecting rows brings up a floating bar; Change status offers pause, unpause, restore and remove for everyone selected.",
        "credit": "Asana",
        "source": "https://help.asana.com/s/article/managing-members-in-an-organization",
        "sourceTitle": "Asana Help Center: Manage members in your organization",
        "alt": "Asana members list with several rows selected and a bulk action bar for changing status"
      },
      {
        "src": "https://assets.asana.biz/transform/c5039485-c857-468d-865d-7e17acee0b7e/productui-helpcenter-managing_your_subscription-managing-members-in-an-organization-004-en-us.png",
        "product": "Asana",
        "title": "Reactivate a member",
        "pattern": "Suspend / deactivate",
        "notes": "Removed members stay listed in their own tab, with reactivation one menu action away.",
        "credit": "Asana",
        "source": "https://help.asana.com/s/article/managing-members-in-an-organization",
        "sourceTitle": "Asana Help Center: Manage members in your organization",
        "alt": "Asana removed members list with a reactivate option"
      },
      {
        "src": "https://storage.googleapis.com/apollo-public-assets/kb_images/add_deactivate_and_reactivate_users/i50.png",
        "product": "Apollo",
        "title": "Invite your team",
        "pattern": "Invite / add user",
        "notes": "Several email addresses at once, placed straight into a team, with the invite count shown before sending.",
        "credit": "Apollo",
        "source": "https://knowledge.apollo.io/hc/en-us/articles/4409130537101",
        "sourceTitle": "Apollo Knowledge Base: Add, manage and deactivate users",
        "alt": "Apollo invite dialog with several email addresses and a team selected"
      },
      {
        "src": "https://storage.googleapis.com/apollo-public-assets/kb_images/add_deactivate_and_reactivate_users/i51.png",
        "product": "Apollo",
        "title": "Permission profile inline",
        "pattern": "Edit profile",
        "notes": "A user’s permission profile is changed from a dropdown in their row, without opening a separate page.",
        "credit": "Apollo",
        "source": "https://knowledge.apollo.io/hc/en-us/articles/4409130537101",
        "sourceTitle": "Apollo Knowledge Base: Add, manage and deactivate users",
        "alt": "Apollo users page with an inline permission profile dropdown"
      },
      {
        "src": "https://storage.googleapis.com/apollo-public-assets/kb_images/add_deactivate_and_reactivate_users/i58.png",
        "product": "Apollo",
        "title": "Deactivate from the row menu",
        "pattern": "Suspend / deactivate",
        "notes": "Deactivate sits at the end of the row’s menu, after routine actions like force logout.",
        "credit": "Apollo",
        "source": "https://knowledge.apollo.io/hc/en-us/articles/4409130537101",
        "sourceTitle": "Apollo Knowledge Base: Add, manage and deactivate users",
        "alt": "Apollo users page row menu with Deactivate highlighted"
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
      },
      {
        "src": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjt71dvL1GZB2kLqS1Sv-3IsAkq4Xi-7na8jfsmG-M5hjnlDkO59GkR7xDnf-bfqUoh-WCOq5fA6p1nilAZ8oj__gnHQF-eSj22mrBJ5N8fw0fHbOibm721MDoNX4gMhPKgj-snPiYj5RtWwymH52LlH9IF-gfnlJuib6B6aQ-N-abtdOGQzw7eswag/s16000/1.png",
        "product": "Google Workspace",
        "title": "Admin role privileges",
        "pattern": "Create custom role",
        "notes": "Privileges as a searchable, expandable tree grouped by area, with storage management as its own privilege that can be granted without full admin rights.",
        "credit": "Google",
        "source": "https://workspaceupdates.googleblog.com/2022/04/updated-storage-management-admin-console.html",
        "sourceTitle": "Google Workspace Updates: Storage management tools in the Admin console",
        "alt": "Google Admin role privileges tree with a search box and checkboxes for each privilege"
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
    screens: [
      {
        "src": "https://docs.azure.cn/en-us/entra/id-governance/media/entitlement-management-shared/my-access-request-access.png",
        "product": "Microsoft Entra My Access",
        "title": "Request form with justification",
        "pattern": "Request access",
        "notes": "A short side panel: a couple of questions and a required business justification, rather than a separate request portal page.",
        "credit": "Microsoft",
        "source": "https://docs.azure.cn/en-us/entra/id-governance/entitlement-management-request-access",
        "sourceTitle": "Microsoft Learn: Request an access package in entitlement management",
        "alt": "My Access request panel with additional questions and a required business justification"
      },
      {
        "src": "https://docs.azure.cn/en-us/entra/id-governance/media/entitlement-management-request-access/my-access-multiple-policies.png",
        "product": "Microsoft Entra My Access",
        "title": "Choose how to request",
        "pattern": "Request access",
        "notes": "When the same access can be granted in different ways, the requester picks the policy that fits, each described in plain words.",
        "credit": "Microsoft",
        "source": "https://docs.azure.cn/en-us/entra/id-governance/entitlement-management-request-access",
        "sourceTitle": "Microsoft Learn: Request an access package in entitlement management",
        "alt": "My Access request panel offering more than one request policy"
      },
      {
        "src": "https://docs.azure.cn/en-us/entra/id-governance/media/entitlement-management-request-approve/my-access-approve-request.png",
        "product": "Microsoft Entra My Access",
        "title": "Approvals with decision panel",
        "pattern": "Approval queue",
        "notes": "Pending requests listed on the left; selecting one opens a panel with the details, approve or deny, and a reason field.",
        "credit": "Microsoft",
        "source": "https://docs.azure.cn/en-us/entra/id-governance/entitlement-management-request-approve",
        "sourceTitle": "Microsoft Learn: Approve or deny access requests in entitlement management",
        "alt": "My Access approvals list with a side panel to approve or deny the selected request with a reason"
      },
      {
        "src": "https://docs.azure.cn/en-us/entra/id-governance/privileged-identity-management/media/azure-ad-pim-approval-workflow/resources-approve-pane.png",
        "product": "Microsoft Entra PIM",
        "title": "Approve requests",
        "pattern": "Approval queue",
        "notes": "Role activation requests in one list, with requester, role, reason and time requested in each row.",
        "credit": "Microsoft",
        "source": "https://docs.azure.cn/en-us/entra/id-governance/privileged-identity-management/pim-approval-workflow",
        "sourceTitle": "Microsoft Learn: Approve or deny requests for roles in PIM",
        "alt": "Privileged Identity Management Approve requests page listing pending role requests"
      },
      {
        "src": "https://docs.azure.cn/en-us/entra/id-governance/media/entitlement-management-shared/approver-request-email.png",
        "product": "Microsoft Entra ID",
        "title": "Approval request email",
        "pattern": "Approval queue",
        "notes": "Approvers can act straight from email: who is asking, for what, and a single button into the decision.",
        "credit": "Microsoft",
        "source": "https://docs.azure.cn/en-us/entra/id-governance/entitlement-management-request-approve",
        "sourceTitle": "Microsoft Learn: Approve or deny access requests in entitlement management",
        "alt": "Email asking an approver to review an access package request with an approve or deny button"
      },
      {
        "src": "https://docs.azure.cn/en-us/entra/id-governance/media/entitlement-management-request-approve/requestor-information-requestor-answers.png",
        "product": "Microsoft Entra My Access",
        "title": "Request details",
        "pattern": "Review detail",
        "notes": "Everything the approver needs in one column: requester, access package, dates, justification and answers to the questions.",
        "credit": "Microsoft",
        "source": "https://docs.azure.cn/en-us/entra/id-governance/entitlement-management-request-approve",
        "sourceTitle": "Microsoft Learn: Approve or deny access requests in entitlement management",
        "alt": "Request details panel showing requester, access package, dates and the requester's answers"
      },
      {
        "src": "https://docs.azure.cn/en-us/entra/id-governance/privileged-identity-management/media/pim-how-to-activate-role/activate-page.png",
        "product": "Microsoft Entra PIM",
        "title": "Activate a role",
        "pattern": "Time-bound access",
        "notes": "Elevated access is switched on for a set number of hours, with scope, start time and a required reason.",
        "credit": "Microsoft",
        "source": "https://docs.azure.cn/en-us/entra/id-governance/privileged-identity-management/pim-how-to-activate-role",
        "sourceTitle": "Microsoft Learn: Activate a Microsoft Entra role in PIM",
        "alt": "PIM Activate pane with duration, scope and justification fields"
      },
      {
        "src": "https://docs.azure.cn/en-us/entra/includes/media/entitlement-management-lifecycle-policy/expiration.png",
        "product": "Microsoft Entra ID",
        "title": "Assignment expiration",
        "pattern": "Time-bound access",
        "notes": "Access ends on a date, after a number of days, or never, and admins choose whether people can ask for an extension.",
        "credit": "Microsoft",
        "source": "https://docs.azure.cn/en-us/entra/id-governance/entitlement-management-access-package-lifecycle-policy",
        "sourceTitle": "Microsoft Learn: Change lifecycle settings for an access package",
        "alt": "Access package lifecycle expiration settings with options for a date, number of days or never"
      },
      {
        "src": "https://docs.azure.cn/en-us/entra/id-governance/privileged-identity-management/media/pim-how-to-change-default-settings/role-settings-edit.png",
        "product": "Microsoft Entra PIM",
        "title": "Role settings",
        "pattern": "Time-bound access",
        "notes": "Per-role rules for activation: maximum duration, required MFA, justification and approval, laid out as a readable settings table.",
        "credit": "Microsoft",
        "source": "https://docs.azure.cn/en-us/entra/id-governance/privileged-identity-management/pim-how-to-change-default-settings",
        "sourceTitle": "Microsoft Learn: Configure role settings in PIM",
        "alt": "PIM role settings page listing activation and assignment rules for a role"
      },
      {
        "src": "https://docs.azure.cn/en-us/entra/id-governance/media/perform-access-review/access-reviews-list-preview.png",
        "product": "Microsoft Entra My Access",
        "title": "Pending access reviews",
        "pattern": "Access reviews",
        "notes": "Each reviewer sees their open reviews with a due date and progress, so the campaign has a visible deadline.",
        "credit": "Microsoft",
        "source": "https://docs.azure.cn/en-us/entra/id-governance/perform-access-review",
        "sourceTitle": "Microsoft Learn: Review access to groups and applications",
        "alt": "List of pending access reviews with due dates and progress"
      },
      {
        "src": "https://docs.azure.cn/en-us/entra/id-governance/media/perform-access-review/user-list-preview.png",
        "product": "Microsoft Entra My Access",
        "title": "Review users",
        "pattern": "Access reviews",
        "notes": "People to review with a recommendation per row (approve or deny) based on recent sign-in activity.",
        "credit": "Microsoft",
        "source": "https://docs.azure.cn/en-us/entra/id-governance/perform-access-review",
        "sourceTitle": "Microsoft Learn: Review access to groups and applications",
        "alt": "Open access review listing users with recommendations"
      },
      {
        "src": "https://docs.azure.cn/en-us/entra/id-governance/media/perform-access-review/accept-recommendations-preview.png",
        "product": "Microsoft Entra My Access",
        "title": "Accept recommendations",
        "pattern": "Access reviews",
        "notes": "One action applies every recommendation, with a confirmation that names what will change, which reduces reviewer fatigue.",
        "credit": "Microsoft",
        "source": "https://docs.azure.cn/en-us/entra/id-governance/perform-access-review",
        "sourceTitle": "Microsoft Learn: Review access to groups and applications",
        "alt": "Access review dialog confirming acceptance of all recommendations"
      },
      {
        "src": "https://docs.azure.cn/en-us/entra/id-governance/media/review-your-access/review-access-preview.png",
        "product": "Microsoft Entra My Access",
        "title": "Self-review",
        "pattern": "Access reviews",
        "notes": "The person’s own side of a review: a single yes or no question and a reason, nothing else.",
        "credit": "Microsoft",
        "source": "https://docs.azure.cn/en-us/entra/id-governance/review-your-access",
        "sourceTitle": "Microsoft Learn: Review your own access",
        "alt": "Self-review asking whether the person still needs access to a group, with a reason field"
      }
    ]
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
    screens: [
      {
        "src": "https://3990409212-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FyqPwsbMSaogAot23rTIu%2Fuploads%2Fgit-blob-72c4e9addbe299e4c1e1e2a9cf21436fbdece451%2Fasset-inventory-1.png?alt=media",
        "product": "Palo Alto Networks Prisma Cloud",
        "title": "Asset inventory",
        "pattern": "Asset library",
        "notes": "An inventory of every cloud resource, summarised by type and account with counts you can drill into, rather than a folder tree.",
        "credit": "Palo Alto Networks",
        "source": "https://docs.prismacloud.io/content-collections/cloud-and-software-inventory/asset-inventory",
        "sourceTitle": "Prisma Cloud Docs: Asset inventory",
        "alt": "Prisma Cloud asset inventory with resource counts grouped by service and account"
      },
      {
        "src": "https://3990409212-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FyqPwsbMSaogAot23rTIu%2Fuploads%2Fgit-blob-ca4c6aa8ab958092a31b2a0c95f0efe7f5a45748%2Fasset-explorer-1.png?alt=media",
        "product": "Palo Alto Networks Prisma Cloud",
        "title": "Asset explorer",
        "pattern": "Asset library",
        "notes": "The same inventory as a dense, filterable table: name, type, account, region and risk columns side by side.",
        "credit": "Palo Alto Networks",
        "source": "https://docs.prismacloud.io/content-collections/cloud-and-software-inventory/asset-inventory",
        "sourceTitle": "Prisma Cloud Docs: Asset inventory",
        "alt": "Prisma Cloud asset explorer table of cloud resources with filters"
      },
      {
        "src": "https://3990409212-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FyqPwsbMSaogAot23rTIu%2Fuploads%2Fgit-blob-dc2ac2896d3656ebe7b3c12d71d157f4152999fa%2Fasset-details-1.png?alt=media",
        "product": "Palo Alto Networks Prisma Cloud",
        "title": "Asset details",
        "pattern": "Asset detail",
        "notes": "One resource in full: identity and metadata up top, then tabs for configuration, findings and related assets.",
        "credit": "Palo Alto Networks",
        "source": "https://docs.prismacloud.io/content-collections/cloud-and-software-inventory/asset-inventory",
        "sourceTitle": "Prisma Cloud Docs: Asset inventory",
        "alt": "Prisma Cloud asset details view with metadata and tabs"
      },
      {
        "src": "https://assets.asana.biz/transform/cf13ce9d-333d-4503-b5ba-a8f952bfd8b7/productui-helpcenter-managing_your_subscription-managing-members-in-an-organization-002-en-us.png",
        "product": "Asana",
        "title": "Remove member and keep their work",
        "pattern": "Transfer ownership",
        "notes": "Removing someone offers to gather their tasks into a new project and asks who should own it, so nothing is orphaned.",
        "credit": "Asana",
        "source": "https://help.asana.com/s/article/managing-members-in-an-organization",
        "sourceTitle": "Asana Help Center: Manage members in your organization",
        "alt": "Asana remove member dialog offering to create a project for the person's tasks and assign an owner"
      },
      {
        "src": "https://storage.googleapis.com/apollo-public-assets/kb_images/edit_a_contact_or_account_owner/i26.png",
        "product": "Apollo",
        "title": "Set owner in bulk",
        "pattern": "Transfer ownership",
        "notes": "Reassign many records at once, with an explicit choice to cascade the new owner to related contacts.",
        "credit": "Apollo",
        "source": "https://knowledge.apollo.io/hc/en-us/articles/5631686093069",
        "sourceTitle": "Apollo Knowledge Base: Edit a contact or account owner",
        "alt": "Apollo Set owner dialog with a new owner selected and an option to update related contact owners"
      },
      {
        "src": "https://storage.googleapis.com/apollo-public-assets/kb_images/add_deactivate_and_reactivate_users/i46.png",
        "product": "Apollo",
        "title": "Edit owner on a record",
        "pattern": "Transfer ownership",
        "notes": "The owner field sits in the record’s details with an inline edit action, for one-off reassignments.",
        "credit": "Apollo",
        "source": "https://knowledge.apollo.io/hc/en-us/articles/4409130537101",
        "sourceTitle": "Apollo Knowledge Base: Add, manage and deactivate users",
        "alt": "Apollo contact record with the Edit owner action highlighted"
      },
      {
        "src": "https://images.ctfassets.net/spoqsaf9291f/2iS3PIrEQK48h7IaAj54cs/fa0fb649f62a43e4be1a8080b6b299b1/Screenshot_2024-04-19_at_15.35.16.png",
        "product": "Notion",
        "title": "Workspace security settings",
        "pattern": "Sharing controls",
        "notes": "Org-wide switches for public page sharing, duplicating to other workspaces and export, each explained in a line.",
        "credit": "Notion",
        "source": "https://www.notion.com/help/guides/understanding-notions-sharing-settings",
        "sourceTitle": "Notion Help: Understanding Notion’s sharing settings",
        "alt": "Notion workspace security settings with toggles for public page sharing, duplication and export"
      },
      {
        "src": "https://images.ctfassets.net/spoqsaf9291f/332vSdSIMc8rGwDBv81YZo/8d5b15af47096e2f7432b4efdbed7783/Screen_Shot_2021-03-11_at_11.14.08.png",
        "product": "Notion",
        "title": "Page access levels",
        "pattern": "Sharing controls",
        "notes": "Four access levels from full access to view, each with a one-line description in the picker.",
        "credit": "Notion",
        "source": "https://www.notion.com/help/guides/understanding-notions-sharing-settings",
        "sourceTitle": "Notion Help: Understanding Notion’s sharing settings",
        "alt": "Notion share menu showing full access, can edit, can comment and can view options"
      },
      {
        "src": "https://support.box.com/hc/article_attachments/4720700012563/SharedLinks_UI.png",
        "product": "Box",
        "title": "Shared link settings",
        "pattern": "Sharing controls",
        "notes": "Shared links governed by grouped radio choices: what can be shared, who can open links, the default access and what recipients may do.",
        "credit": "Box",
        "source": "https://support.box.com/hc/en-us/articles/360043696814-Folder-and-Account-Sharing-Settings",
        "sourceTitle": "Box Support: Folder and account sharing settings",
        "alt": "Box shared link settings with options for who can access links and default access"
      },
      {
        "src": "https://confluence.atlassian.com/doc/files/139379/858771846/233/1791529160504/PageHistory_CollabEditing.png",
        "product": "Confluence Data Center",
        "title": "Page history",
        "pattern": "Versions & restore",
        "notes": "Every version as a row with author, date and comment, plus restore and delete per version and compare by selecting two.",
        "credit": "Atlassian",
        "source": "https://confluence.atlassian.com/doc/page-history-and-page-comparison-views-139379.html",
        "sourceTitle": "Confluence Data Center docs: Page history and page comparison views",
        "alt": "Confluence page history table with restore and delete actions for each version"
      },
      {
        "src": "https://confluence.atlassian.com/doc/files/139379/321983616/386/1791529160257/CompareChanges.png",
        "product": "Confluence Data Center",
        "title": "Compare versions",
        "pattern": "Versions & restore",
        "notes": "Additions, removals and formatting changes shown side by side with a key, using strikethrough as well as colour.",
        "credit": "Atlassian",
        "source": "https://confluence.atlassian.com/doc/page-history-and-page-comparison-views-139379.html",
        "sourceTitle": "Confluence Data Center docs: Page history and page comparison views",
        "alt": "Confluence version comparison with a key for added, removed and reformatted lines"
      },
      {
        "src": "https://confluence.atlassian.com/doc/files/139379/319946826/388/1791529160636/PageHistoryHeader.png",
        "product": "Confluence Data Center",
        "title": "Viewing an old version",
        "pattern": "Versions & restore",
        "notes": "A clear banner says you are looking at an old version, with compare and restore one click away.",
        "credit": "Atlassian",
        "source": "https://confluence.atlassian.com/doc/page-history-and-page-comparison-views-139379.html",
        "sourceTitle": "Confluence Data Center docs: Page history and page comparison views",
        "alt": "Confluence banner indicating an old version with compare and restore links"
      },
      {
        "src": "https://support.box.com/hc/article_attachments/38417427631123",
        "product": "Box",
        "title": "Version history",
        "pattern": "Versions & restore",
        "notes": "Versions listed newest first with uploader and size; Make Current restores without deleting anything newer.",
        "credit": "Box",
        "source": "https://support.box.com/hc/en-us/articles/360043697054",
        "sourceTitle": "Box Support: Accessing version history",
        "alt": "Box version history panel with preview, download, make current and delete actions"
      },
      {
        "src": "https://3990409212-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FyqPwsbMSaogAot23rTIu%2Fuploads%2Fgit-blob-69dd45741803f78fd1a0ee259407e41be69d8efc%2Fmedia_1c25bcc7f2ec368915efd6eb43cd15d828af46239.png?alt=media",
        "product": "Palo Alto Networks Prisma Cloud",
        "title": "Key:value tags",
        "pattern": "Tags & metadata",
        "notes": "Tags as removable key:value chips, added in place with Enter to apply.",
        "credit": "Palo Alto Networks",
        "source": "https://docs.prismacloud.io/content-collections/data-security-posture-management/how-to-articles/assets-and-files/tag-assets-within-dig-security-using-keyvalue-tagging",
        "sourceTitle": "Prisma Cloud Docs: Tag assets using key:value tagging",
        "alt": "Prisma Cloud DSPM tags shown as key:value chips with an input to add a new tag"
      },
      {
        "src": "https://3990409212-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FyqPwsbMSaogAot23rTIu%2Fuploads%2Fgit-blob-d45f649ad082e5eb270c9e877d21b06644037208%2Fmedia_1910df78cfe1008d950113aaafb72a535a19cf029.png?alt=media",
        "product": "Palo Alto Networks Prisma Cloud",
        "title": "Filter inventory by tag",
        "pattern": "Tags & metadata",
        "notes": "Tags become a filter on the inventory, so metadata pays off in finding things, not just labelling them.",
        "credit": "Palo Alto Networks",
        "source": "https://docs.prismacloud.io/content-collections/data-security-posture-management/how-to-articles/assets-and-files/tag-assets-within-dig-security-using-keyvalue-tagging",
        "sourceTitle": "Prisma Cloud Docs: Tag assets using key:value tagging",
        "alt": "Prisma Cloud inventory filter list with a tag filter option"
      }
    ]
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
    screens: [
      {
        "src": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjxzRvwRlRVIkkVl5HI0P1AxJUEgx6yo7bu3LtPzhJ7K-TZuTOJ2Oh4uFH6iXfsAKs-8jdd_HXeIz_YdvR-bbotQ1o_9RMGTbhyVrXf_oeizG4G8eqWWr_7d6pj5_XEF1vCoJSpeedZ7P0XBI1uTKwflvdTLWwDZ-VaAzXriSuOS_j-d8Vn-fg8Cw0P/s16000/unnamed.jpeg",
        "product": "Google Workspace",
        "title": "Workspace storage",
        "pattern": "Storage overview",
        "notes": "Used and total in plain numbers (60 TB of 100 TB), a bar split by product, and right below it the users and shared drives using the most, so the overview leads straight to cleanup.",
        "credit": "Google",
        "source": "https://workspaceupdates.googleblog.com/2022/04/updated-storage-management-admin-console.html",
        "sourceTitle": "Google Workspace Updates: Storage management tools in the Admin console",
        "alt": "Google Admin storage page with a usage bar by product and lists of the users and shared drives using the most storage"
      },
      {
        "src": "https://docs.github.com/assets/cb-37384/images/help/billing/org-budget-example.png",
        "product": "GitHub",
        "title": "Organization budgets",
        "pattern": "Per-user quotas",
        "notes": "Limits set per product rather than per person, each with spend against budget, a percentage badge at 100%, and whether usage stops when the limit is reached.",
        "credit": "GitHub",
        "source": "https://docs.github.com/en/enterprise-cloud@latest/billing/how-tos/set-up-budgets",
        "sourceTitle": "GitHub Docs: Set up budgets",
        "alt": "GitHub organization budgets list showing spend against each budget and whether usage stops at the limit"
      },
      {
        "src": "https://help.miro.com/hc/article_attachments/23122118937362",
        "product": "Miro",
        "title": "Trash",
        "pattern": "Trash & recovery",
        "notes": "Each deleted board shows who deleted it, when, and a countdown such as ‘Deleting forever in 90 days’, with Restore first and Delete forever second.",
        "credit": "Miro",
        "source": "https://help.miro.com/hc/en-us/articles/360017572614-How-to-restore-a-deleted-board",
        "sourceTitle": "Miro Help Center: How to restore a deleted board",
        "alt": "Miro trash list with deleted boards, deletion countdowns and a menu offering restore or delete forever"
      },
      {
        "src": "https://help.miro.com/hc/article_attachments/21016968160146",
        "product": "Miro",
        "title": "Content lifecycle settings",
        "pattern": "Trash & recovery",
        "notes": "Admins set how long items stay in trash and decide separately who may restore and who may delete permanently.",
        "credit": "Miro",
        "source": "https://help.miro.com/hc/en-us/articles/19205385407250-Configure-who-can-restore-deleted-boards",
        "sourceTitle": "Miro Help Center: Configure who can restore deleted boards",
        "alt": "Miro content lifecycle settings with trash retention period and deleted board permissions"
      },
      {
        "src": "https://help.miro.com/hc/article_attachments/21017515434258",
        "product": "Miro",
        "title": "Board has been deleted",
        "pattern": "Trash & recovery",
        "notes": "Someone opening a deleted board’s link is told what happened and offered a restore, instead of a dead end.",
        "credit": "Miro",
        "source": "https://help.miro.com/hc/en-us/articles/360017572614-How-to-restore-a-deleted-board",
        "sourceTitle": "Miro Help Center: How to restore a deleted board",
        "alt": "Miro notice that a board has been deleted with an option to restore it"
      },
      {
        "src": "https://confluence.atlassian.com/doc/files/139429/1331232922/1/1701837313910/Space+trash+details.png",
        "product": "Confluence Data Center",
        "title": "Space trash",
        "pattern": "Trash & recovery",
        "notes": "Deleted pages and files with who created and deleted them and when, per-item Restore or Purge, and a separate Purge all.",
        "credit": "Atlassian",
        "source": "https://confluence.atlassian.com/doc/delete-or-restore-a-page-139429.html",
        "sourceTitle": "Confluence Data Center docs: Delete or restore a page",
        "alt": "Confluence space trash table with restore and purge actions for each item"
      }
    ]
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
    screens: [
      {
        "src": "https://docs.coveo.com/en/assets/images/index-content/sources-page.png",
        "product": "Coveo",
        "title": "Sources list",
        "pattern": "Sync status",
        "notes": "Each source row shows its type, item count, last refresh status and next scheduled update, so admins can see failing connectors at a glance.",
        "credit": "Coveo",
        "source": "https://docs.coveo.com/en/3390/index-content/manage-sources",
        "sourceTitle": "Coveo Docs: Manage sources",
        "alt": "Coveo Sources page listing connected sources with status, item counts and refresh information"
      },
      {
        "src": "https://docs.coveo.com/en/assets/images/index-content/add-a-source.png",
        "product": "Coveo",
        "title": "Add a source of content",
        "pattern": "Add content source",
        "notes": "A connector catalogue with tabs for cloud, on-premises and other source types, plus a search field and a request link when nothing fits.",
        "credit": "Coveo",
        "source": "https://docs.coveo.com/en/3390/index-content/manage-sources",
        "sourceTitle": "Coveo Docs: Manage sources",
        "alt": "Coveo Add a source of content dialog with a grid of connector tiles such as Box, Confluence and Amazon S3"
      },
      {
        "src": "https://docs.coveo.com/en/assets/images/index-content/connector-recommendations.png",
        "product": "Coveo",
        "title": "Connector recommendations",
        "pattern": "Add content source",
        "notes": "When an admin searches for a system, the catalogue suggests the best-fit connector and explains when to use the alternative.",
        "credit": "Coveo",
        "source": "https://docs.coveo.com/en/3390/index-content/manage-sources",
        "sourceTitle": "Coveo Docs: Manage sources",
        "alt": "Coveo connector search with a recommendation banner explaining which connector to choose"
      },
      {
        "src": "https://docs.coveo.com/en/assets/images/index-content/source-manage-menu.png",
        "product": "Coveo",
        "title": "Source actions menu",
        "pattern": "Sync status",
        "notes": "Per-source actions such as rescan, rebuild and open in content browser live in one overflow menu next to the source.",
        "credit": "Coveo",
        "source": "https://docs.coveo.com/en/3390/index-content/manage-sources",
        "sourceTitle": "Coveo Docs: Manage sources",
        "alt": "Coveo source detail with an overflow menu of management actions"
      },
      {
        "src": "https://docs.coveo.com/en/assets/images/index-content/content-browser-legend.png",
        "product": "Coveo",
        "title": "Content browser",
        "pattern": "Source permissions",
        "notes": "Inspect individual indexed items, their fields and permissions to check what was crawled and who can see it.",
        "credit": "Coveo",
        "source": "https://docs.coveo.com/en/2053/index-content/inspect-items-with-the-content-browser",
        "sourceTitle": "Coveo Docs: Inspect items with the content browser",
        "alt": "Coveo Content Browser showing facets on the left and a grid of indexed item cards"
      },
      {
        "src": "https://docs.glean.com/img/get-started/review-connector-crawl-task.webp",
        "product": "Glean",
        "title": "Review connector crawl",
        "pattern": "Sync status",
        "notes": "A setup checklist step that confirms each data source has finished its first crawl before rollout.",
        "credit": "Glean",
        "source": "https://docs.glean.com/get-started/review/review-connector-crawl",
        "sourceTitle": "Glean Docs: Review connector crawl",
        "alt": "Glean setup checklist with a step to review data source crawl status"
      },
      {
        "src": "https://docs.glean.com/assets/images/manage-data-rules-30c1ac3727da9cb76dc926fbc4a2b5f2.png",
        "product": "Glean",
        "title": "Inclusion and exclusion rules",
        "pattern": "Content exclusions",
        "notes": "Per-connector tabs separate inclusion rules, exclusion rules and additional rules, with a warning that changes apply on the next crawl.",
        "credit": "Glean",
        "source": "https://docs.glean.com/connectors/connectors-settings-visibility",
        "sourceTitle": "Glean Docs: Connector settings and visibility",
        "alt": "Glean Confluence connector settings with collapsible inclusion, exclusion and additional rules"
      },
      {
        "src": "https://docs.glean.com/assets/images/results-visibility-4a5bc22e241a48a6575526eac65d7aa1.png",
        "product": "Glean",
        "title": "Results visibility",
        "pattern": "Content exclusions",
        "notes": "Hide specific documents or sources from results without disconnecting the connector, and preview a document before changing its visibility.",
        "credit": "Glean",
        "source": "https://docs.glean.com/connectors/connectors-settings-visibility",
        "sourceTitle": "Glean Docs: Connector settings and visibility",
        "alt": "Glean connector Results display tab with a document preview and visibility controls"
      },
      {
        "src": "https://dam-cdn.atl.orangelogic.com/AssetLink/56q63qp344bg8o577q75tho13rx8l7p6.png",
        "product": "Atlassian Rovo",
        "title": "Connect a source",
        "pattern": "Add content source",
        "notes": "Connected sources show their item counts; sources not yet connected sit in the same list with a single Connect action.",
        "credit": "Atlassian",
        "source": "https://www.atlassian.com/software/rovo/guides/admin-guide/rovo-connectors",
        "sourceTitle": "Atlassian: Rovo connectors admin guide",
        "alt": "Rovo source list with counts for Confluence, Jira and Slack, and Connect links for Google Drive and Teams"
      },
      {
        "src": "https://images.ctfassets.net/spoqsaf9291f/687lFB9B62dMPdTgm1wyZo/4bff015b609109b92fb49d77e917fcf6/Google_Drive_Annotation__1_.png",
        "product": "Notion",
        "title": "AI connector source picker",
        "pattern": "Add content source",
        "notes": "Connected apps appear as selectable sources right inside the AI search scope menu, so users can narrow what AI searches.",
        "credit": "Notion",
        "source": "https://www.notion.com/help/guides/use-ai-connectors-to-access-more-of-your-teams-knowledge",
        "sourceTitle": "Notion Help: Use AI connectors",
        "alt": "Notion AI menu listing connected sources such as Slack and Google Drive"
      },
      {
        "src": "https://images.ctfassets.net/spoqsaf9291f/36WstA84JSlKxpb4JpknMt/c16f8b263f2746ee6d21363a8dae651d/Screenshot_2024-09-23_at_2.06.45_PM.png",
        "product": "Notion",
        "title": "Answers respect upstream access",
        "pattern": "Source permissions",
        "notes": "AI answers draw only on content the person can already open in the connected tool, so permissions are inherited, not re-modelled.",
        "credit": "Notion",
        "source": "https://www.notion.com/help/guides/use-ai-connectors-to-access-more-of-your-teams-knowledge",
        "sourceTitle": "Notion Help: Use AI connectors",
        "alt": "Notion page with an AI answer panel citing sources from connected apps"
      }
    ]
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
    screens: [
      {
        "src": "https://docs.github.com/assets/cb-33121/images/help/projects-v2/issue-create-form.png",
        "product": "GitHub",
        "title": "Create new issue dialog",
        "pattern": "Create modal",
        "notes": "Repository picker, title and body in a dialog, with a ‘Create more’ checkbox that keeps it open for entering several in a row.",
        "credit": "GitHub",
        "source": "https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/creating-an-issue",
        "sourceTitle": "GitHub Docs: Creating an issue",
        "alt": "GitHub Create new issue dialog with repository selector, title, description, Create more checkbox and Create button"
      },
      {
        "src": "https://docs.dd-static.net/images/dashboards/create-dashboard.eb5fec8e46e09ec3bb248f78c11453c3.png?auto=format&fit=max&w=850&dpr=2",
        "product": "Datadog",
        "title": "Create a dashboard",
        "pattern": "Create modal",
        "notes": "Name it, then pick a layout type, each explained with a small illustration, rather than a blank form.",
        "credit": "Datadog",
        "source": "https://docs.datadoghq.com/dashboards/",
        "sourceTitle": "Datadog Docs: Dashboards",
        "alt": "Datadog Create a Dashboard dialog with a name field and two layout choices with illustrations"
      },
      {
        "src": "https://docs.github.com/assets/cb-89988/images/help/repository/create-repository-name.png",
        "product": "GitHub",
        "title": "Name with live availability",
        "pattern": "Create modal",
        "notes": "Owner and name sit together like the final path, and the name is checked for availability as you type.",
        "credit": "GitHub",
        "source": "https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository",
        "sourceTitle": "GitHub Docs: Creating a new repository",
        "alt": "GitHub new repository form with owner menu, repository name field and a green ‘is available’ message"
      },
      {
        "src": "https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1202,height=884,format=webp/_astro/token-summary.BFSJoL8C.png",
        "product": "Cloudflare",
        "title": "Review before create",
        "pattern": "Multi-step wizard",
        "notes": "The API token wizard ends on a plain-language summary of what the token can do, with Back and Create buttons.",
        "credit": "Cloudflare",
        "source": "https://developers.cloudflare.com/fundamentals/api/get-started/create-token/",
        "sourceTitle": "Cloudflare Docs: Create API token",
        "alt": "Cloudflare API token summary step listing the token's permissions and resources before creation"
      },
      {
        "src": "https://docs.dd-static.net/images/getting_started/monitors/monitor_query.cc7d61c048d474419ea8f7b03a3c3207.png?auto=format&fit=max&w=850&dpr=2",
        "product": "Datadog",
        "title": "Numbered monitor setup",
        "pattern": "Multi-step wizard",
        "notes": "Monitor creation is one long page split into numbered steps (define, set conditions, notify), so all steps stay visible.",
        "credit": "Datadog",
        "source": "https://docs.datadoghq.com/getting_started/monitors/",
        "sourceTitle": "Datadog Docs: Getting started with monitors",
        "alt": "Datadog new monitor page with a numbered Define the metric step"
      },
      {
        "src": "https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1677,height=1328,format=webp/_astro/template-customize.Bt5BDoKm.png",
        "product": "Cloudflare",
        "title": "Customise a token template",
        "pattern": "Create from template",
        "notes": "Pick a template such as ‘Edit zone DNS’, then adjust prefilled permissions, resources and IP filters before continuing.",
        "credit": "Cloudflare",
        "source": "https://developers.cloudflare.com/fundamentals/api/get-started/create-token/",
        "sourceTitle": "Cloudflare Docs: Create API token",
        "alt": "Cloudflare create token form prefilled from a template with permissions, zone resources and client IP filtering"
      },
      {
        "src": "https://docs.github.com/assets/cb-41629/images/help/projects-v2/rec-template-select.png",
        "product": "GitHub",
        "title": "Recommended templates for the org",
        "pattern": "Create from template",
        "notes": "Admins choose which templates appear first for everyone in the organization, so new projects start consistent.",
        "credit": "GitHub",
        "source": "https://docs.github.com/en/issues/planning-and-tracking-with-projects/managing-your-project/managing-project-templates-in-your-organization",
        "sourceTitle": "GitHub Docs: Managing project templates in your organization",
        "alt": "GitHub Customize recommended templates dialog with a filter and checkboxes for project templates"
      },
      {
        "src": "https://docs.github.com/assets/cb-35262/images/help/issues/blank-issue-link.png",
        "product": "GitHub",
        "title": "Template chooser with blank option",
        "pattern": "Create from template",
        "notes": "Templates are offered first, but ‘Open a blank issue’ stays available for anything that doesn’t fit.",
        "credit": "GitHub",
        "source": "https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/creating-an-issue",
        "sourceTitle": "GitHub Docs: Creating an issue",
        "alt": "GitHub issue template chooser listing Bug report, Feature request and Security vulnerability with an Open a blank issue link"
      },
      {
        "src": "https://docs.dd-static.net/images/monitors/recommended/recommended_templates.bd5da24e0e042184da8f94b289e80639.png?auto=format&fit=max&w=850&dpr=2",
        "product": "Datadog",
        "title": "Monitor templates",
        "pattern": "Create from template",
        "notes": "Template cards say what each monitor watches for and why it matters, so admins can pick one without reading its query.",
        "credit": "Datadog",
        "source": "https://docs.datadoghq.com/monitors/templates/",
        "sourceTitle": "Datadog Docs: Monitor templates",
        "alt": "Datadog recommended monitor template cards with titles and short descriptions"
      },
      {
        "src": "https://docs.github.com/assets/cb-11265/images/help/projects-v2/add-item.png",
        "product": "GitHub",
        "title": "Add item row",
        "pattern": "Inline create",
        "notes": "The last table row is an always-present ‘Add item’ input, so new entries are created where they will live.",
        "credit": "GitHub",
        "source": "https://docs.github.com/en/issues/planning-and-tracking-with-projects/managing-items-in-your-project/adding-items-to-your-project",
        "sourceTitle": "GitHub Docs: Adding items to your project",
        "alt": "Bottom of a GitHub project table with an Add item input row"
      },
      {
        "src": "https://docs.cloud.google.com/static/compute/images/create-similar.png",
        "product": "Google Cloud",
        "title": "Create similar",
        "pattern": "Duplicate / clone",
        "notes": "‘Create similar’ on a VM opens the create form prefilled from it, rather than copying silently, so admins can change the name and settings first.",
        "credit": "Google Cloud",
        "source": "https://docs.cloud.google.com/compute/docs/instances/create-vm-from-similar-instance",
        "sourceTitle": "Google Cloud Docs: Create a VM that is similar to an existing VM",
        "alt": "Google Cloud Compute Engine VM details toolbar with a Create similar button highlighted"
      },
      {
        "src": "https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1204,height=940,format=webp/_astro/token-complete.Dg4S1W72.png",
        "product": "Cloudflare",
        "title": "Token created, shown once",
        "pattern": "Success & next steps",
        "notes": "Success shows the secret once with a copy button and a ready-to-run test command, the next thing the admin needs to do.",
        "credit": "Cloudflare",
        "source": "https://developers.cloudflare.com/fundamentals/api/get-started/create-token/",
        "sourceTitle": "Cloudflare Docs: Create API token",
        "alt": "Cloudflare API token created page with the token value, a copy button and a curl command to test it"
      }
    ]
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
    screens: [
      {
        "src": "https://docs.github.com/assets/cb-30625/images/help/issues/select-all-checkbox.png",
        "product": "GitHub",
        "title": "Select-all in the list header",
        "pattern": "Selection model",
        "notes": "The header checkbox sits beside the open/closed counts, so it’s clear what ‘all’ refers to before you select.",
        "credit": "GitHub",
        "source": "https://docs.github.com/en/issues/planning-and-tracking-with-projects/managing-items-in-your-project/adding-items-to-your-project",
        "sourceTitle": "GitHub Docs: Adding items to your project",
        "alt": "GitHub issues list with the select-all checkbox in the header next to the open and closed counts"
      },
      {
        "src": "https://docs.github.com/assets/cb-38474/images/help/teams/list-of-members-selected-bulk.png",
        "product": "GitHub",
        "title": "Selected members",
        "pattern": "Selection model",
        "notes": "Row checkboxes, a mixed-state header checkbox and a live ‘2 members selected’ count keep the selection obvious.",
        "credit": "GitHub",
        "source": "https://docs.github.com/en/organizations/managing-membership-in-your-organization/removing-a-member-from-your-organization",
        "sourceTitle": "GitHub Docs: Removing a member from your organization",
        "alt": "GitHub organization members list with two members checked and a 2 members selected menu"
      },
      {
        "src": "https://docs.github.com/assets/cb-22235/images/help/graphs/select-multiple-alerts.png",
        "product": "GitHub",
        "title": "Select alerts",
        "pattern": "Selection model",
        "notes": "Selecting alerts swaps the list header for a selection count and the actions that apply to them.",
        "credit": "GitHub",
        "source": "https://docs.github.com/en/code-security/dependabot/dependabot-alerts/viewing-and-updating-dependabot-alerts",
        "sourceTitle": "GitHub Docs: Viewing and updating Dependabot alerts",
        "alt": "GitHub Dependabot alerts list with two alerts selected and a header showing 2 selected"
      },
      {
        "src": "https://docs.github.com/assets/cb-38857/images/help/teams/user-bulk-management-options.png",
        "product": "GitHub",
        "title": "Selection menu replaces filters",
        "pattern": "Contextual action bar",
        "notes": "Once rows are selected, a ‘members selected’ menu appears in the header with the bulk actions; export and invite stay put.",
        "credit": "GitHub",
        "source": "https://docs.github.com/en/organizations/managing-membership-in-your-organization/removing-a-member-from-your-organization",
        "sourceTitle": "GitHub Docs: Removing a member from your organization",
        "alt": "GitHub members list header with a members selected dropdown next to Export and Invite member buttons"
      },
      {
        "src": "https://docs.dd-static.net/images/monitors/manage_monitor/monitor_page-2.93689f1aa9becb4587e011b9b43cd171.png?auto=format&fit=max&w=850&dpr=2",
        "product": "Datadog",
        "title": "Monitor list bulk toolbar",
        "pattern": "Contextual action bar",
        "notes": "Mute, Resolve, Delete, Edit Tags, Edit Recipients and Edit Teams sit in a toolbar above the table, disabled until something is selected.",
        "credit": "Datadog",
        "source": "https://docs.datadoghq.com/monitors/manage/",
        "sourceTitle": "Datadog Docs: Monitor list",
        "alt": "Datadog monitor list with facets on the left and a row of bulk action buttons above the table"
      },
      {
        "src": "https://docs.github.com/assets/cb-31119/images/help/graphs/dismiss-multiple-alerts.png",
        "product": "GitHub",
        "title": "Dismiss with a reason",
        "pattern": "Bulk edit",
        "notes": "A bulk dismiss asks for one reason that applies to every selected alert, which keeps the audit trail meaningful.",
        "credit": "GitHub",
        "source": "https://docs.github.com/en/code-security/dependabot/dependabot-alerts/viewing-and-updating-dependabot-alerts",
        "sourceTitle": "GitHub Docs: Viewing and updating Dependabot alerts",
        "alt": "GitHub Dismiss alerts menu listing reasons to dismiss two selected alerts"
      },
      {
        "src": "https://docs.github.com/assets/cb-13183/images/help/repository/edit-properties.png",
        "product": "GitHub",
        "title": "Edit properties across repositories",
        "pattern": "Bulk edit",
        "notes": "Org admins select repositories and set custom property values on all of them at once from one ‘Edit properties’ action.",
        "credit": "GitHub",
        "source": "https://docs.github.com/en/organizations/managing-organization-settings/managing-custom-properties-for-repositories-in-your-organization",
        "sourceTitle": "GitHub Docs: Managing custom properties for repositories",
        "alt": "GitHub repository properties list with one repository selected and an Edit properties button"
      },
      {
        "src": "https://docs.github.com/assets/cb-20968/images/help/projects-v2/edit-single-select.png",
        "product": "GitHub",
        "title": "Edit options in place",
        "pattern": "Inline edit",
        "notes": "Each option has its own pencil and remove control, so changes happen in the list rather than in a separate form.",
        "credit": "GitHub",
        "source": "https://docs.github.com/en/issues/planning-and-tracking-with-projects/understanding-fields/about-single-select-fields",
        "sourceTitle": "GitHub Docs: About single select fields",
        "alt": "GitHub single select field options with a pencil icon to edit an option in place"
      },
      {
        "src": "https://docs.github.com/assets/cb-20492/images/help/projects-v2/select-row-number.png",
        "product": "GitHub",
        "title": "Row number as handle",
        "pattern": "Selection model",
        "notes": "In the project table the row number is the selection and drag handle, keeping cells free for direct editing.",
        "credit": "GitHub",
        "source": "https://docs.github.com/en/issues/planning-and-tracking-with-projects/customizing-views-in-your-project/customizing-the-table-layout",
        "sourceTitle": "GitHub Docs: Customizing the table layout",
        "alt": "GitHub project table rows with one row number highlighted as the selection handle"
      }
    ]
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
    screens: [
      {
        "src": "https://help.miro.com/hc/article_attachments/21019693273234",
        "product": "Miro",
        "title": "Delete team confirmation",
        "pattern": "Delete confirmation",
        "notes": "The dialog names the team, says where it goes (Deleted Teams) and what stops working, and repeats the verb on the red button.",
        "credit": "Miro",
        "source": "https://help.miro.com/hc/en-us/articles/360017571334-Delete-and-restore-teams",
        "sourceTitle": "Miro Help: Delete and restore teams",
        "alt": "Miro Delete Obsolete Team dialog explaining the team moves to Deleted Teams, with Delete team and Cancel buttons"
      },
      {
        "src": "https://help.miro.com/hc/article_attachments/21017429125778",
        "product": "Miro",
        "title": "Delete profile",
        "pattern": "Delete confirmation",
        "notes": "Spells out the timeline (permanent after a set number of days) and that an email link is required, so the user knows it’s recoverable for now.",
        "credit": "Miro",
        "source": "https://help.miro.com/hc/en-us/articles/360017571354-How-to-delete-your-profile",
        "sourceTitle": "Miro Help: How to delete your profile",
        "alt": "Miro Delete profile dialog explaining when the profile will be permanently deleted"
      },
      {
        "src": "https://mintcdn.com/product-docs/C1Xd19VH3eRYplPn/images/box-admin-tools/deactivation-confirmation.png",
        "product": "Box",
        "title": "Deactivate file request",
        "pattern": "Delete confirmation",
        "notes": "A short, specific question with the irreversible part stated plainly (‘you will no longer be able to reactivate’).",
        "credit": "Box",
        "source": "https://docs.box.com/en/box-admin-tools/managing-content/file-requests/managing-file-requests",
        "sourceTitle": "Box Docs: Managing file requests",
        "alt": "Box Deactivate File Request confirmation dialog with Cancel and Deactivate buttons"
      },
      {
        "src": "https://docs.github.com/assets/cb-81130/images/help/repository/archive-repository-warnings.png",
        "product": "GitHub",
        "title": "Archive with type-to-confirm",
        "pattern": "Type-to-confirm",
        "notes": "Lists what will stop working, then asks you to type the full repository name; the button stays disabled and reads ‘I understand the consequences’.",
        "credit": "GitHub",
        "source": "https://docs.github.com/en/repositories/archiving-a-github-repository/archiving-repositories",
        "sourceTitle": "GitHub Docs: Archiving repositories",
        "alt": "GitHub Archive repository dialog listing consequences, a field to type the repository name and a disabled confirm button"
      },
      {
        "src": "https://docs.dd-static.net/images/dashboards/list/recently_deleted_restore.8877b577bdba31793a79378091668656.png?auto=format&fit=max&w=850&dpr=2",
        "product": "Datadog",
        "title": "Recently deleted dashboards",
        "pattern": "Archive vs. delete",
        "notes": "Deleted dashboards go to a Recently Deleted list for 30 days, with a ‘recoverable until’ date per row and bulk Restore.",
        "credit": "Datadog",
        "source": "https://docs.datadoghq.com/dashboards/list/",
        "sourceTitle": "Datadog Docs: Dashboard list",
        "alt": "Datadog Recently Deleted dashboards list with selected rows, a Restore button and recoverable-until dates"
      },
      {
        "src": "https://help.miro.com/hc/article_attachments/21119727475090",
        "product": "Miro",
        "title": "Admin trash",
        "pattern": "Archive vs. delete",
        "notes": "Trashed boards show who deleted them, time left in trash and retention date, with a quick filter for what’s about to be gone forever.",
        "credit": "Miro",
        "source": "https://help.miro.com/hc/en-us/articles/21118388045970-Review-boards-in-Trash",
        "sourceTitle": "Miro Help: Review boards in Trash",
        "alt": "Miro Content explorer Trash table with owner, deleted date, time left in trash and retention until columns"
      },
      {
        "src": "https://help.miro.com/hc/article_attachments/21122533003538",
        "product": "Miro",
        "title": "Restore or delete permanently",
        "pattern": "Archive vs. delete",
        "notes": "The detail panel puts the soft option (Restore) first and the permanent one in red, with deletion and modification dates for context.",
        "credit": "Miro",
        "source": "https://help.miro.com/hc/en-us/articles/21118388045970-Review-boards-in-Trash",
        "sourceTitle": "Miro Help: Review boards in Trash",
        "alt": "Miro trashed board detail panel with Restore and Delete permanently buttons"
      },
      {
        "src": "https://docs.github.com/assets/cb-9678/images/help/settings/restore-button.png",
        "product": "GitHub",
        "title": "Restore deleted repository",
        "pattern": "Archive vs. delete",
        "notes": "Deleted repositories stay listed for a window with a one-click Restore, so a mistaken delete isn’t a support ticket.",
        "credit": "GitHub",
        "source": "https://docs.github.com/en/repositories/creating-and-managing-repositories/restoring-a-deleted-repository",
        "sourceTitle": "GitHub Docs: Restoring a deleted repository",
        "alt": "GitHub deleted repositories list entry with a Restore button"
      },
      {
        "src": "https://help.miro.com/hc/article_attachments/21017515322002",
        "product": "Miro",
        "title": "Delete user, reassign content",
        "pattern": "Cascading impact",
        "notes": "Removing a user asks who inherits their boards and templates, and offers a separate ‘Delete user and content’ for the heavier option.",
        "credit": "Miro",
        "source": "https://help.miro.com/hc/en-us/articles/360017571234-Remove-users",
        "sourceTitle": "Miro Help: Remove users",
        "alt": "Miro Delete user from company dialog choosing a person to reassign boards to, with Delete user and Delete user and content buttons"
      },
      {
        "src": "https://help.miro.com/hc/article_attachments/25008759156370",
        "product": "Miro",
        "title": "Bulk delete from team",
        "pattern": "Cascading impact",
        "notes": "Bulk deletion lives behind a Bulk actions menu with the selection count beside it, never as a bare button.",
        "credit": "Miro",
        "source": "https://help.miro.com/hc/en-us/articles/360017571234-Remove-users",
        "sourceTitle": "Miro Help: Remove users",
        "alt": "Miro team members list with three users selected and a Bulk actions menu open on Delete from team"
      },
      {
        "src": "https://help.miro.com/hc/article_attachments/21017515434258",
        "product": "Miro",
        "title": "What others see after delete",
        "pattern": "Cascading impact",
        "notes": "People who open a deleted board get a clear message and a way to request restoration, the downstream side of a delete.",
        "credit": "Miro",
        "source": "https://help.miro.com/hc/en-us/articles/360017572614-How-to-restore-a-deleted-board",
        "sourceTitle": "Miro Help: How to restore a deleted board",
        "alt": "Miro Board has been deleted message shown to a user opening a deleted board"
      },
      {
        "src": "https://help.miro.com/hc/article_attachments/23921803181586",
        "product": "Miro",
        "title": "Delete team section",
        "pattern": "Danger zone",
        "notes": "The delete action sits at the bottom of the team profile, separated from everyday fields, with its consequences and scope explained above the button.",
        "credit": "Miro",
        "source": "https://help.miro.com/hc/en-us/articles/4766759572114-Enterprise-Developer-teams",
        "sourceTitle": "Miro Help: Enterprise Developer teams",
        "alt": "Miro team profile settings with a Delete DEV Team section and Delete team button at the bottom"
      },
      {
        "src": "https://docs.cloud.google.com/static/compute/images/vm-deletion-new-vm.png",
        "product": "Google Cloud",
        "title": "Deletion protection",
        "pattern": "Danger zone",
        "notes": "A per-resource switch that blocks deletion until it is turned off, a deliberate extra step for critical VMs.",
        "credit": "Google Cloud",
        "source": "https://docs.cloud.google.com/compute/docs/instances/preventing-accidental-vm-deletion",
        "sourceTitle": "Google Cloud Docs: Prevent accidental VM deletion",
        "alt": "Google Cloud VM settings with an Enable deletion protection checkbox"
      },
      {
        "src": "https://help.miro.com/hc/article_attachments/21016968160146",
        "product": "Miro",
        "title": "Who can restore deleted boards",
        "pattern": "Danger zone",
        "notes": "Admins decide who can recover deleted content and for how long, setting the safety net before anyone needs it.",
        "credit": "Miro",
        "source": "https://help.miro.com/hc/en-us/articles/19205385407250-Configure-who-can-restore-deleted-boards",
        "sourceTitle": "Miro Help: Configure who can restore deleted boards",
        "alt": "Miro admin trash settings controlling who can restore deleted boards"
      }
    ]
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
    screens: [
      {
        "src": "https://images.ctfassets.net/zsv3d0ugroxu/6LmH29GyYkq7fEmAVo5BuF/093dbf1ba64c2bf23b9202b947d1e774/Screenshot_data_security_policy_active_controls.png",
        "product": "Atlassian Guard",
        "title": "Data security policy controls",
        "pattern": "Policy list",
        "notes": "One policy, many rules: each control (export, public links, app access, anonymous access) lists its status and which data it covers.",
        "credit": "Atlassian",
        "source": "https://support.atlassian.com/security-and-access-policies/docs/edit-a-data-security-policy/",
        "sourceTitle": "Atlassian Support: Edit a data security policy",
        "alt": "Atlassian data security policy screen listing active controls with their status"
      },
      {
        "src": "https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1152,height=304,format=webp/_astro/cf-firewall-rules-list.Co9nTUAW.png",
        "product": "Cloudflare",
        "title": "Ordered rules list",
        "pattern": "Policy list",
        "notes": "Rules run in priority order: each row has its action, an inline on/off toggle and drag handles to reorder. (Firewall Rules has since moved to WAF custom rules.)",
        "credit": "Cloudflare",
        "source": "https://developers.cloudflare.com/firewall/cf-dashboard/create-edit-delete-rules/",
        "sourceTitle": "Cloudflare Docs: Create, edit, and delete rules",
        "alt": "Cloudflare firewall rules list with action, description, enable toggle and reorder controls"
      },
      {
        "src": "https://docs.github.com/assets/cb-14841/images/help/repository/ruleset-history-options.png",
        "product": "GitHub",
        "title": "Ruleset history",
        "pattern": "Policy list",
        "notes": "Every change to a ruleset is versioned; admins can compare versions, restore an earlier one or download it as JSON.",
        "credit": "GitHub",
        "source": "https://docs.github.com/en/enterprise-cloud@latest/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/managing-rulesets-for-a-repository",
        "sourceTitle": "GitHub Docs: Managing rulesets for a repository",
        "alt": "GitHub ruleset history with a menu offering compare changes, restore and download"
      },
      {
        "src": "https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2360,height=1088,format=webp/_astro/gateway-create-with-ai.BYG07coh.png",
        "product": "Cloudflare One",
        "title": "Create policy with AI",
        "pattern": "Policy builder",
        "notes": "Gateway firewall policies can be drafted from a plain-language description, then reviewed in the normal builder before saving.",
        "credit": "Cloudflare",
        "source": "https://developers.cloudflare.com/changelog/post/2026-05-12-natural-language-policy-creation/",
        "sourceTitle": "Cloudflare Changelog: Natural language policy creation",
        "alt": "Cloudflare Gateway firewall policies page with a Create with AI button next to Add a policy"
      },
      {
        "src": "https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=983,height=289,format=webp/_astro/firewall-rules-expression-builder-value.Cm4ecLGt.png",
        "product": "Cloudflare",
        "title": "Expression builder",
        "pattern": "Policy builder",
        "notes": "Field, operator and value dropdowns build each condition, with a live preview of the generated expression underneath.",
        "credit": "Cloudflare",
        "source": "https://developers.cloudflare.com/firewall/cf-dashboard/create-edit-delete-rules/",
        "sourceTitle": "Cloudflare Docs: Create, edit, and delete rules",
        "alt": "Cloudflare expression builder row with field, operator and value selectors and an expression preview"
      },
      {
        "src": "https://confluence.atlassian.com/doc/files/1108681072/1108681073/1/1643588430528/retention-rules-global-all.png",
        "product": "Confluence Data Center",
        "title": "Global retention rules",
        "pattern": "Retention policies",
        "notes": "One global rule for page versions, attachments and trash, followed by a table of spaces that are exempt with their own rules.",
        "credit": "Atlassian",
        "source": "https://confluence.atlassian.com/doc/set-retention-rules-to-delete-unwanted-data-1108681072.html",
        "sourceTitle": "Confluence Docs: Set retention rules to delete unwanted data",
        "alt": "Confluence global retention rules with a list of space exemptions"
      },
      {
        "src": "https://confluence.atlassian.com/doc/files/1108681072/1108681076/1/1643588430799/retention-rules-space.png",
        "product": "Confluence Data Center",
        "title": "Space retention rules",
        "pattern": "Retention policies",
        "notes": "Space admins choose keep-all, keep by count or keep by age for versions and trash, each with plain-language helper text.",
        "credit": "Atlassian",
        "source": "https://confluence.atlassian.com/doc/set-retention-rules-to-delete-unwanted-data-1108681072.html",
        "sourceTitle": "Confluence Docs: Set retention rules to delete unwanted data",
        "alt": "Confluence space tools retention rules tab with options for page versions, attachments and trash"
      },
      {
        "src": "https://confluence.atlassian.com/doc/files/1108681072/1108681075/1/1643588430720/exemptions-table.png",
        "product": "Confluence Data Center",
        "title": "Space exemptions",
        "pattern": "Scope & targeting",
        "notes": "Exceptions to the global policy are listed per space with who set them and the effective rule, so overrides stay visible.",
        "credit": "Atlassian",
        "source": "https://confluence.atlassian.com/doc/set-retention-rules-to-delete-unwanted-data-1108681072.html",
        "sourceTitle": "Confluence Docs: Set retention rules to delete unwanted data",
        "alt": "Table of space exemptions showing each space's retention rules and who last modified them"
      },
      {
        "src": "https://images.ctfassets.net/spoqsaf9291f/3lPHkODsTqNyr8c7nNolmz/30ae25171d5c376363dca92e6519c6ab/Legal_holds_entrypoint.png",
        "product": "Notion",
        "title": "Legal holds entry point",
        "pattern": "Legal hold",
        "notes": "Legal holds sit under Data & compliance next to retention settings, so admins see both preservation controls together.",
        "credit": "Notion",
        "source": "https://www.notion.com/help/legal-holds",
        "sourceTitle": "Notion Help: Legal holds",
        "alt": "Notion settings Data and compliance page with a legal holds section"
      },
      {
        "src": "https://help.miro.com/hc/article_attachments/22137403285010",
        "product": "Miro",
        "title": "Boards under legal hold",
        "pattern": "Legal hold",
        "notes": "Each case lists the held boards with classification labels, owners and last-modified dates, filterable by search.",
        "credit": "Miro",
        "source": "https://help.miro.com/hc/en-us/articles/22120628583570-Review-boards-under-legal-hold",
        "sourceTitle": "Miro Help: Review boards under legal hold",
        "alt": "Miro legal hold case page listing boards with classification, owner and last modified date"
      },
      {
        "src": "https://help.miro.com/hc/article_attachments/22136887470610",
        "product": "Miro",
        "title": "Close hold confirmation",
        "pattern": "Legal hold",
        "notes": "Releasing a hold warns that content not covered by other holds or retention may be deleted forever, with a destructive red action.",
        "credit": "Miro",
        "source": "https://help.miro.com/hc/en-us/articles/21922521629330-Close-a-legal-hold",
        "sourceTitle": "Miro Help: Close a legal hold",
        "alt": "Miro Close hold dialog warning that data not protected by other holds might be deleted"
      },
      {
        "src": "https://docs.github.com/assets/cb-110007/images/help/repository/rule-insights.png",
        "product": "GitHub",
        "title": "Rule insights with Evaluate mode",
        "pattern": "Simulate / test",
        "notes": "Rulesets can run in Evaluate mode: insights show which pushes would have failed, labelled evaluate, without blocking anyone.",
        "credit": "GitHub",
        "source": "https://docs.github.com/en/enterprise-cloud@latest/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/managing-rulesets-for-a-repository",
        "sourceTitle": "GitHub Docs: Managing rulesets for a repository",
        "alt": "GitHub Rule Insights listing pass, bypass and fail results, with the failure marked evaluate"
      },
      {
        "src": "https://docs.cloud.google.com/static/policy-intelligence/img/simulator-results.png",
        "product": "Google Cloud IAM",
        "title": "Policy Simulator results",
        "pattern": "Simulate / test",
        "notes": "Replays 90 days of access logs against a proposed policy and summarises how many accesses would be revoked, gained or unknown.",
        "credit": "Google Cloud",
        "source": "https://docs.cloud.google.com/iam/docs/simulating-access",
        "sourceTitle": "Google Cloud Docs: Test role changes with Policy Simulator",
        "alt": "Google Cloud Policy Simulator results with proposed changes and a table of access changes"
      },
      {
        "src": "https://docs.cloud.google.com/static/policy-intelligence/img/simulator-policy-diff.png",
        "product": "Google Cloud IAM",
        "title": "Proposed policy diff",
        "pattern": "Simulate / test",
        "notes": "A side-by-side diff of the current and proposed policy, with removed bindings highlighted, before anything is applied.",
        "credit": "Google Cloud",
        "source": "https://docs.cloud.google.com/iam/docs/simulating-access",
        "sourceTitle": "Google Cloud Docs: Test role changes with Policy Simulator",
        "alt": "Side-by-side JSON diff of current and proposed IAM policy with removed lines highlighted"
      },
      {
        "src": "https://docs.cloud.google.com/static/policy-intelligence/img/simulator-access-change-details-2x.png",
        "product": "Google Cloud IAM",
        "title": "Access change details",
        "pattern": "Simulate / test",
        "notes": "Drill into one affected access to see existing versus proposed access for a specific resource and permission.",
        "credit": "Google Cloud",
        "source": "https://docs.cloud.google.com/iam/docs/simulating-access",
        "sourceTitle": "Google Cloud Docs: Test role changes with Policy Simulator",
        "alt": "Access change details panel showing access revoked, existing access granted and proposed access not granted"
      }
    ]
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
    screens: [
      {
        "src": "https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=3450,height=1738,format=webp/_astro/Audit_logs_v2_organization_dashboard.De-uwPva.png",
        "product": "Cloudflare",
        "title": "Organization audit logs",
        "pattern": "Audit log table",
        "notes": "One org-wide log spanning every account: time, actor, action, resource and result in a dense, scannable table.",
        "credit": "Cloudflare",
        "source": "https://developers.cloudflare.com/changelog/post/2026-06-24-audit-logs-v2-organization-dashboard-ui/",
        "sourceTitle": "Cloudflare Changelog: Audit logs v2 organization dashboard",
        "alt": "Cloudflare organization audit logs table with timestamp, actor, action and resource columns"
      },
      {
        "src": "https://docs.cloud.google.com/static/logging/docs/images/logs-explorer-interface.png",
        "product": "Google Cloud Logging",
        "title": "Logs Explorer",
        "pattern": "Audit log table",
        "notes": "Query editor on top, a histogram of volume over time, field facets on the left and expandable entries below.",
        "credit": "Google Cloud",
        "source": "https://docs.cloud.google.com/logging/docs/view/overview",
        "sourceTitle": "Google Cloud Docs: View and analyze logs",
        "alt": "Google Cloud Logs Explorer with query pane, field explorer, histogram and query results"
      },
      {
        "src": "https://images.ctfassets.net/zsv3d0ugroxu/5rDJIxkaZxc4Q4jATqVy94/b39be249924ee9f0338e0df6090bad68/Detailed_panel_full_screen",
        "product": "Atlassian Guard",
        "title": "Activity detail panel",
        "pattern": "Event detail",
        "notes": "Selecting a row opens a side panel with actor, location, IP and the full event context without losing your place in the list.",
        "credit": "Atlassian",
        "source": "https://support.atlassian.com/security-and-access-policies/docs/view-audit-log-activities/",
        "sourceTitle": "Atlassian Support: View audit log activities",
        "alt": "Atlassian organization audit log with a detail panel open on the right"
      },
      {
        "src": "https://docs.dd-static.net/images/account_management/audit_logs/inspect_changes.ff02585a891cad5e15d4887bf6b7e2af.png?auto=format&fit=max&w=850&dpr=2",
        "product": "Datadog",
        "title": "Inspect changes diff",
        "pattern": "Event detail",
        "notes": "Configuration changes show as a before/after diff, with additions in green and removals in red.",
        "credit": "Datadog",
        "source": "https://docs.datadoghq.com/account_management/audit_trail/",
        "sourceTitle": "Datadog Docs: Audit Trail",
        "alt": "Datadog audit event side panel showing a JSON diff of a monitor configuration change"
      },
      {
        "src": "https://docs.dd-static.net/images/account_management/audit_logs/monitor_change_diff.a75602f4ffd0ea59de3e0fe8f255ad82.png?auto=format&fit=max&w=850&dpr=2",
        "product": "Datadog",
        "title": "Single change, in plain words",
        "pattern": "Event detail",
        "notes": "The event header states the change as a sentence (who modified which monitor) before showing the exact field diff.",
        "credit": "Datadog",
        "source": "https://docs.datadoghq.com/account_management/audit_trail/guides/track_monitor_access_and_configuration_changes/",
        "sourceTitle": "Datadog Docs: Track monitor access and configuration changes",
        "alt": "Datadog audit event showing user modified a monitor, with a diff adding a tag"
      },
      {
        "src": "https://docs.dd-static.net/images/account_management/audit_logs/attributes.14eb439122bddb3283b02721dea0ff5c.png?auto=format&fit=max&w=850&dpr=2",
        "product": "Datadog",
        "title": "Filter from an attribute",
        "pattern": "Filters & saved views",
        "notes": "Any attribute in an event can become a filter (include or exclude) straight from the detail panel.",
        "credit": "Datadog",
        "source": "https://docs.datadoghq.com/account_management/audit_trail/",
        "sourceTitle": "Datadog Docs: Audit Trail",
        "alt": "Datadog audit event attributes with a menu to filter by or exclude a value"
      },
      {
        "src": "https://docs.dd-static.net/images/account_management/audit_logs/notable_events.2e9700c7a1eb13fcb9c3178765d24654.png?auto=format&fit=max&w=850&dpr=2",
        "product": "Datadog",
        "title": "Notable events facet",
        "pattern": "Filters & saved views",
        "notes": "A curated Notable events toggle cuts a huge log down to the changes that usually matter, alongside product facets.",
        "credit": "Datadog",
        "source": "https://docs.datadoghq.com/account_management/audit_trail/",
        "sourceTitle": "Datadog Docs: Audit Trail",
        "alt": "Datadog audit facet panel with Notable events checked and product facets below"
      },
      {
        "src": "https://docs.dd-static.net/images/account_management/audit_logs/audit_dashboard.4e932e7da78f3a91a086ee8a31f43f24.png?auto=format&fit=max&w=850&dpr=2",
        "product": "Datadog",
        "title": "Audit overview dashboard",
        "pattern": "Filters & saved views",
        "notes": "An out-of-the-box dashboard summarises who is changing what, so admins start from trends rather than raw rows.",
        "credit": "Datadog",
        "source": "https://docs.datadoghq.com/account_management/audit_trail/",
        "sourceTitle": "Datadog Docs: Audit Trail",
        "alt": "Datadog Audit Trail overview dashboard with charts of events by product and user"
      },
      {
        "src": "https://docs.dd-static.net/images/account_management/audit_logs/audit_events_forwarding.e0020de4485e16c36afb054c1d721704.png?auto=format&fit=max&w=850&dpr=2",
        "product": "Datadog",
        "title": "Forward to custom destinations",
        "pattern": "Export & SIEM streaming",
        "notes": "Each destination shows its filter query, status and estimated volume, so admins can stream only login events to a SIEM.",
        "credit": "Datadog",
        "source": "https://docs.datadoghq.com/account_management/audit_trail/forwarding_audit_events",
        "sourceTitle": "Datadog Docs: Forwarding audit events to custom destinations",
        "alt": "Datadog custom destinations list with an active SIEM destination filtered to login events"
      },
      {
        "src": "https://docs.dd-static.net/images/account_management/audit_logs/retention_period.ae9827c126577cf57f0e783f38371c70.png?auto=format&fit=max&w=850&dpr=2",
        "product": "Datadog",
        "title": "Audit retention period",
        "pattern": "Export & SIEM streaming",
        "notes": "Retention is set in one dropdown with clear options, a reminder that anything older must be exported elsewhere.",
        "credit": "Datadog",
        "source": "https://docs.datadoghq.com/account_management/audit_trail/",
        "sourceTitle": "Datadog Docs: Audit Trail",
        "alt": "Datadog Audit Trail retention setting with a dropdown of retention periods"
      },
      {
        "src": "https://images.ctfassets.net/zsv3d0ugroxu/6CuUZuZXE0SLgDTRSu9GTe/e2682cadc28c33eff6c21085bb92249e/Screenshot_Detect-alerts-list.png",
        "product": "Atlassian Guard",
        "title": "Detect alerts list",
        "pattern": "Alerts on events",
        "notes": "Risky activity becomes alerts with severity, status and assignee, so triage happens in a queue rather than in the raw log.",
        "credit": "Atlassian",
        "source": "https://support.atlassian.com/security-and-access-policies/docs/view-an-alert",
        "sourceTitle": "Atlassian Support: View an alert",
        "alt": "Atlassian Guard Detect alerts list showing four example alerts with status and assignee"
      },
      {
        "src": "https://images.ctfassets.net/zsv3d0ugroxu/4wzxRzIt3t7pxamFP6UpHw/46c0a5b58016f019b53b159dcc7309e8/Screenshot_detect-alert-annotated.png",
        "product": "Atlassian Guard",
        "title": "Alert detail",
        "pattern": "Alerts on events",
        "notes": "An alert explains what happened, who did it and recommended next steps, with status and assignee in a side column.",
        "credit": "Atlassian",
        "source": "https://support.atlassian.com/security-and-access-policies/docs/view-an-alert",
        "sourceTitle": "Atlassian Support: View an alert",
        "alt": "Annotated Atlassian Guard alert page with sections numbered in two columns"
      }
    ]
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
    screens: [
      {
        "src": "https://help.asana.com/servlet/rtaImage?eid=ka0Pc000000S6Gz&feoid=00NPc000003Pw7h&refid=0EMPc00000EPtu5",
        "product": "Asana",
        "title": "Enable Asana AI",
        "pattern": "Feature availability",
        "notes": "One org-level switch with plain-language consequences, and a visible ‘default off’ tag for regulated (Gov) tenants.",
        "credit": "Asana",
        "source": "https://help.asana.com/s/article/Asana-AI-customization",
        "sourceTitle": "Asana Help: Asana AI customization",
        "alt": "Asana admin checkbox labelled Enable Asana AI with a Gov default off tag"
      },
      {
        "src": "https://mintcdn.com/product-docs/pLC-uWMnSTtWjsJb/images/box-ai/box-ai-settings-page-listing.png",
        "product": "Box",
        "title": "Box AI settings",
        "pattern": "Feature availability",
        "notes": "Each AI capability is listed with its own status and configure link, so admins can turn on some features and not others.",
        "credit": "Box",
        "source": "https://docs.box.com/en/box-ai/admins/enabling-box-ai-studio-and-managing-agents",
        "sourceTitle": "Box Docs: Enabling Box AI Studio and managing agents",
        "alt": "Box Admin Console AI settings page listing AI features with their enabled status"
      },
      {
        "src": "https://mintcdn.com/product-docs/pLC-uWMnSTtWjsJb/images/box-ai/ai-studio-agents-table-listing.png",
        "product": "Box",
        "title": "AI agents table",
        "pattern": "Feature availability",
        "notes": "Custom AI agents are governed like any other asset: owner, status and who can use each one, with a create action on top.",
        "credit": "Box",
        "source": "https://docs.box.com/en/box-ai/admins/enabling-box-ai-studio-and-managing-agents",
        "sourceTitle": "Box Docs: Enabling Box AI Studio and managing agents",
        "alt": "Box AI Studio agents table with agent names, status and access columns"
      },
      {
        "src": "https://mintcdn.com/product-docs/8QqqEjYxDfvboQc3/images/shared/box-ai-product-addendum-clickwrap-png.jpg",
        "product": "Box",
        "title": "AI product addendum",
        "pattern": "Data usage controls",
        "notes": "Before AI turns on, an admin must read and accept the data-processing terms in a scrollable clickwrap; Accept stays disabled until they agree.",
        "credit": "Box",
        "source": "https://docs.box.com/en/box-ai/admins/configuring-box-ai",
        "sourceTitle": "Box Docs: Configuring Box AI",
        "alt": "Box AI Product Addendum dialog with scrollable terms, an agreement checkbox and a disabled Accept button"
      },
      {
        "src": "https://help.asana.com/servlet/rtaImage?eid=ka0Pc000000Tj4z&feoid=00NPc000003Pw7h&refid=0EMPc00000QSHuz",
        "product": "Asana",
        "title": "AI providers",
        "pattern": "Model & provider settings",
        "notes": "Admins pick which third-party providers can power AI, with data-protection promises stated right above the choices.",
        "credit": "Asana",
        "source": "https://help.asana.com/s/article/asana-ai-features-and-admin-controls",
        "sourceTitle": "Asana Help: Asana AI features and admin controls",
        "alt": "Asana domain AI settings with a Providers and APIs section listing OpenAI, Anthropic, Google, AWS Bedrock and Fireworks checkboxes"
      },
      {
        "src": "https://mintcdn.com/product-docs/cwJeew3iU12hOBZZ/images/box-ai/model_filters.png",
        "product": "Box",
        "title": "Model list with compliance filters",
        "pattern": "Model & provider settings",
        "notes": "Models can be filtered by provider, tier and compliance level (FedRAMP, DoD impact), so regulated orgs only see what they may enable.",
        "credit": "Box",
        "source": "https://docs.box.com/en/box-ai/admins/enabling-box-ai-studio-and-managing-agents",
        "sourceTitle": "Box Docs: Enabling Box AI Studio and managing agents",
        "alt": "Box AI model list with a compliance filter menu for FedRAMP certification and DoD impact level"
      },
      {
        "src": "https://docs.glean.com/assets/images/image-1-cc04db32556905ccc77035a4ec8bdfd6.png",
        "product": "Glean",
        "title": "Default model for an agent",
        "pattern": "Model & provider settings",
        "notes": "Model choice is also set per agent, in the builder's settings, within whatever the admin has allowed.",
        "credit": "Glean",
        "source": "https://docs.glean.com/administration/configure-llms",
        "sourceTitle": "Glean Docs: Configure LLMs",
        "alt": "Glean agent builder with settings open to choose the model"
      },
      {
        "src": "https://mintcdn.com/product-docs/FfFNOXD1EjYB5JFI/images/box-ai/Monthly-Usage.png",
        "product": "Box",
        "title": "Monthly AI usage",
        "pattern": "Usage & cost",
        "notes": "A usage meter against the monthly allowance, plus per-user query limits, so admins see consumption before it becomes overage.",
        "credit": "Box",
        "source": "https://docs.box.com/en/box-ai/admins/viewing-box-ai-usage",
        "sourceTitle": "Box Docs: Viewing Box AI usage",
        "alt": "Box AI monthly usage meter with total units used and user query limit settings"
      },
      {
        "src": "https://docs.dd-static.net/images/account_management/billing/view-ai-credit-usage.5b7565e1d85a5893c6ffd7b47dd2d7c2.png?auto=format&fit=max&w=850&dpr=2",
        "product": "Datadog",
        "title": "AI credits usage",
        "pattern": "Usage & cost",
        "notes": "Cost and usage overviews sit beside the AI products toggle, with a chart broken down by each AI feature.",
        "credit": "Datadog",
        "source": "https://docs.datadoghq.com/account_management/billing/ai_credits/",
        "sourceTitle": "Datadog Docs: AI Credits",
        "alt": "Datadog AI Credits page with an AI products toggle, cost overview and a usage bar chart by product"
      },
      {
        "src": "https://blog.cloudflare.com/_image?href=https%3A%2F%2Fblog.cloudflare.com%2F_emdash%2Fapi%2Fmedia%2Ffile%2F01KW460QY6YRTH1SAGBPJ3E52F.png&w=715&h=543&f=webp&fit=cover&position=center",
        "product": "Cloudflare AI Gateway",
        "title": "Guardrail categories",
        "pattern": "Content safety",
        "notes": "Each hazard category gets its own setting for prompts and for responses: ignore, flag or block.",
        "credit": "Cloudflare",
        "source": "https://blog.cloudflare.com/guardrails-in-ai-gateway/",
        "sourceTitle": "Cloudflare Blog: Guardrails in AI Gateway",
        "alt": "Cloudflare AI Gateway advanced guardrails table with flag or block settings per hazard category for prompts and responses"
      },
      {
        "src": "https://blog.cloudflare.com/_image?href=https%3A%2F%2Fblog.cloudflare.com%2F_emdash%2Fapi%2Fmedia%2Ffile%2F01KW47XRKH2ZRC4D3XPXMKT21X.png&w=715&h=427&f=webp&fit=cover&position=center",
        "product": "Cloudflare AI Gateway",
        "title": "Blocked prompt in the log",
        "pattern": "Content safety",
        "notes": "The request log shows exactly which category blocked a prompt and the message returned, which is what reviewers need to tune rules.",
        "credit": "Cloudflare",
        "source": "https://blog.cloudflare.com/guardrails-in-ai-gateway/",
        "sourceTitle": "Cloudflare Blog: Guardrails in AI Gateway",
        "alt": "Cloudflare AI Gateway log entry showing a prompt blocked under the Non-Violent Crimes category"
      }
    ]
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
    screens: [
      {
        "src": "https://docs.github.com/assets/cb-81597/images/help/billing/cancel-pending-changes-org.png",
        "product": "GitHub",
        "title": "Current plan with pending change",
        "pattern": "Plan overview",
        "notes": "Plan, features, price per seat and a seats-used meter in one card, with a banner for a scheduled downgrade and a Cancel link.",
        "credit": "GitHub",
        "source": "https://docs.github.com/en/billing/how-tos/manage-plan-and-licenses/manage-pending-changes",
        "sourceTitle": "GitHub Docs: Manage pending changes",
        "alt": "GitHub Current plan card for GitHub Team with seats used, Add seats link and a pending downgrade banner with Cancel"
      },
      {
        "src": "https://docs.dd-static.net/images/account_management/billing/subscription_details.05bafa4e33fd025417731e644e1d2f70.png?auto=format&fit=max&w=850&dpr=2",
        "product": "Datadog",
        "title": "Subscription summary and details",
        "pattern": "Plan overview",
        "notes": "Contract terms (plan, commitment, dates) at the top, then each product's quantity, unit price and on-demand rate in collapsible groups.",
        "credit": "Datadog",
        "source": "https://docs.datadoghq.com/account_management/billing/",
        "sourceTitle": "Datadog Docs: Billing",
        "alt": "Datadog Plan page with subscription summary, payment method card and subscription details grouped by product"
      },
      {
        "src": "https://docs.dd-static.net/images/account_management/plan_and_usage/bill-overview-main-light.0ccecfb1e1b2ee1d3482e08f677419e1.png?auto=format&fit=max&w=850&dpr=2",
        "product": "Datadog",
        "title": "Bill overview",
        "pattern": "Plan overview",
        "notes": "Month-to-date spend against the previous month, with a stacked chart by product so admins see what is driving the bill.",
        "credit": "Datadog",
        "source": "https://docs.datadoghq.com/account_management/plan_and_usage/bill_overview/",
        "sourceTitle": "Datadog Docs: Bill overview",
        "alt": "Datadog bill overview with month-to-date cost, comparison to last month and a stacked bar chart by product"
      },
      {
        "src": "https://docs.github.com/assets/cb-37384/images/help/billing/org-budget-example.png",
        "product": "GitHub",
        "title": "Spending budgets",
        "pattern": "Plan overview",
        "notes": "Per-product budgets show spend against limit with a progress bar, and whether usage stops when the budget is reached.",
        "credit": "GitHub",
        "source": "https://docs.github.com/en/billing/how-tos/set-up-budgets",
        "sourceTitle": "GitHub Docs: Set up budgets",
        "alt": "GitHub organization budgets list with spend progress bars for Actions budgets"
      },
      {
        "src": "https://docs.github.com/assets/cb-36645/images/help/copilot/enable-access-for-selected-members.png",
        "product": "GitHub",
        "title": "Assign seats to people or teams",
        "pattern": "Seat assignment",
        "notes": "Seats can be granted to individual users or whole teams from one search field, with the billing impact linked right there.",
        "credit": "GitHub",
        "source": "https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-access/grant-access",
        "sourceTitle": "GitHub Docs: Grant access to Copilot",
        "alt": "GitHub Enable Copilot access dialog with tabs for users and teams and a search field"
      },
      {
        "src": "https://docs.github.com/assets/cb-31963/images/help/copilot/cancel-copilot-seat.png",
        "product": "GitHub",
        "title": "Reclaim a seat",
        "pattern": "Seat assignment",
        "notes": "Select a member in Access management and ‘Cancel seat’ appears in the selection bar, keeping reclaiming as easy as assigning.",
        "credit": "GitHub",
        "source": "https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-access/revoke-access",
        "sourceTitle": "GitHub Docs: Revoke access to Copilot",
        "alt": "GitHub Copilot access management list with one member selected and a Cancel seat button"
      },
      {
        "src": "https://help.miro.com/hc/article_attachments/38132163160850",
        "product": "Miro",
        "title": "License pool across billing groups",
        "pattern": "Seat assignment",
        "notes": "A headline count of assigned versus total licenses (2,015 of 2,037), with the groups that draw from the pool listed below.",
        "credit": "Miro",
        "source": "https://help.miro.com/hc/en-us/articles/6574185673874-Billing-groups",
        "sourceTitle": "Miro Help: Billing groups",
        "alt": "Miro admin Billing groups page showing 2,015 of 2,037 full licenses used and a list of billing groups"
      },
      {
        "src": "https://help.miro.com/hc/article_attachments/38132135303058",
        "product": "Miro",
        "title": "Group license detail",
        "pattern": "Seat assignment",
        "notes": "Inside a group, each member’s license type, role and last active date help admins spot seats worth reclaiming.",
        "credit": "Miro",
        "source": "https://help.miro.com/hc/en-us/articles/20150819688338-Soft-quotas-for-billing-groups",
        "sourceTitle": "Miro Help: Soft quotas for billing groups",
        "alt": "Miro billing group detail with license counts and a member table showing license type and last active date"
      },
      {
        "src": "https://docs.github.com/assets/cb-55150/images/help/enterprises/enterprise-filter-pending-invitations.png",
        "product": "GitHub",
        "title": "Filter invitations by license",
        "pattern": "Seat assignment",
        "notes": "Pending invitations hold licenses too; filtering them by license type shows seats committed but not yet used.",
        "credit": "GitHub",
        "source": "https://docs.github.com/en/enterprise-cloud@latest/admin/managing-accounts-and-repositories/managing-users-in-your-enterprise/viewing-people-in-your-enterprise",
        "sourceTitle": "GitHub Docs: Viewing people in your enterprise",
        "alt": "GitHub enterprise Invitations page with License, Organizations and Source filter menus"
      },
      {
        "src": "https://docs.github.com/assets/cb-53422/images/help/enterprises/ghas-add-licenses.png",
        "product": "GitHub",
        "title": "Add licenses with live cost",
        "pattern": "Add seats",
        "notes": "A stepper for total licenses updates the new monthly payment and the prorated amount due today before you confirm.",
        "credit": "GitHub",
        "source": "https://docs.github.com/en/billing/how-tos/products/manage-ghas-licenses",
        "sourceTitle": "GitHub Docs: Manage Advanced Security licenses",
        "alt": "GitHub Advanced Security license screen with a quantity stepper, monthly payment, amount due today and Confirm licenses button"
      },
      {
        "src": "https://help.miro.com/hc/article_attachments/21017592958994",
        "product": "Miro",
        "title": "Proration on the invoice",
        "pattern": "Add seats",
        "notes": "Adding a license shows as two lines, remaining time charged and unused time credited, so the prorated total is explainable.",
        "credit": "Miro",
        "source": "https://help.miro.com/hc/en-us/articles/360021047619-Understanding-your-invoice",
        "sourceTitle": "Miro Help: Understanding your invoice",
        "alt": "Miro invoice lines showing a charge for remaining time and a credit for unused time after adding licenses"
      },
      {
        "src": "https://help.miro.com/hc/article_attachments/21019603655442",
        "product": "Miro",
        "title": "Order summary",
        "pattern": "Add seats",
        "notes": "Seats, billing period, tax and total are itemised before payment, with a promo code link kept secondary.",
        "credit": "Miro",
        "source": "https://help.miro.com/hc/en-us/articles/4408846055314-Taxes",
        "sourceTitle": "Miro Help: Taxes",
        "alt": "Miro checkout order summary with seat price, tax and total before payment"
      },
      {
        "src": "https://docs.github.com/assets/cb-29441/images/help/business-accounts/download-invoice.png",
        "product": "GitHub",
        "title": "Past invoices",
        "pattern": "Invoices & payment",
        "notes": "A plain table of invoice number, date, amount and status, each with a download, for finance teams who just need the PDF.",
        "credit": "GitHub",
        "source": "https://docs.github.com/en/billing/how-tos/set-up-payment/manage-enterprise-invoice",
        "sourceTitle": "GitHub Docs: Manage your enterprise invoice",
        "alt": "GitHub Past invoices table with invoice numbers, dates, amounts, status and download links"
      },
      {
        "src": "https://docs.github.com/assets/cb-72099/images/help/business-accounts/pay-invoice-button.png",
        "product": "GitHub",
        "title": "Invoice due with Pay now",
        "pattern": "Invoices & payment",
        "notes": "The billing overview surfaces the latest invoice amount and due date with a Pay now button beside current usage.",
        "credit": "GitHub",
        "source": "https://docs.github.com/en/billing/how-tos/set-up-payment/manage-enterprise-invoice",
        "sourceTitle": "GitHub Docs: Manage your enterprise invoice",
        "alt": "GitHub enterprise billing overview with current usage and a latest invoice card with a Pay now button"
      },
      {
        "src": "https://help.miro.com/hc/article_attachments/21016927933074",
        "product": "Miro",
        "title": "Invoices in billing settings",
        "pattern": "Invoices & payment",
        "notes": "Invoices sit in their own tab of billing settings alongside plan and payment details.",
        "credit": "Miro",
        "source": "https://help.miro.com/hc/en-us/articles/360010961020-Payment-options-invoicing-and-automated-payments",
        "sourceTitle": "Miro Help: Payment options",
        "alt": "Miro billing settings Invoices tab listing invoices"
      },
      {
        "src": "https://help.miro.com/hc/article_attachments/21016927931666",
        "product": "Miro",
        "title": "Choose payment method",
        "pattern": "Invoices & payment",
        "notes": "Card or bank transfer as two clear choices, with card details only shown for the option picked.",
        "credit": "Miro",
        "source": "https://help.miro.com/hc/en-us/articles/360010961020-Payment-options-invoicing-and-automated-payments",
        "sourceTitle": "Miro Help: Payment options",
        "alt": "Miro Choose how you'd like to pay dialog with Card and Bank transfer options and card fields"
      },
      {
        "src": "https://docs.dd-static.net/images/account_management/billing/PaymentMethodOverview.e946755fe70e2b62f640a17b53c25317.png?auto=format&fit=max&w=850&dpr=2",
        "product": "Datadog",
        "title": "Payment method and billing contact",
        "pattern": "Invoices & payment",
        "notes": "Payment method and billing contact each get an edit action next to the subscription summary, separate from usage.",
        "credit": "Datadog",
        "source": "https://docs.datadoghq.com/account_management/billing/",
        "sourceTitle": "Datadog Docs: Billing",
        "alt": "Datadog Plan page with a payment method card and billing contact details"
      }
    ]
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
    screens: [
      {
        "src": "https://help.miro.com/hc/article_attachments/5021611044242",
        "product": "Miro",
        "title": "Marketplace",
        "pattern": "Integration catalog",
        "notes": "Featured and categorised apps with short descriptions, so people can browse by job rather than knowing the vendor name.",
        "credit": "Miro",
        "source": "https://help.miro.com/hc/en-us/articles/360017731093-How-to-install-apps",
        "sourceTitle": "Miro Help: How to install apps",
        "alt": "Miro Marketplace page with featured app cards and categories"
      },
      {
        "src": "https://docs.dd-static.net/images/getting_started/integrations/ad_integrations_1.49b95c9ec5e558552a4e97e4f567604f.png?auto=format&fit=max&w=850&dpr=2",
        "product": "Datadog",
        "title": "Integrations catalog",
        "pattern": "Integration catalog",
        "notes": "A searchable grid of integration tiles with logos, with installed ones marked so admins see what’s already connected.",
        "credit": "Datadog",
        "source": "https://docs.datadoghq.com/getting_started/integrations/",
        "sourceTitle": "Datadog Docs: Getting started with integrations",
        "alt": "Datadog integrations page with a grid of integration tiles"
      },
      {
        "src": "https://docs.dd-static.net/images/actions/connections/new-connection-2.6163cdeab0f54d3d983bb6caa2e08f5c.png?auto=format&fit=max&w=850&dpr=2",
        "product": "Datadog",
        "title": "New connection",
        "pattern": "Integration catalog",
        "notes": "Connecting a service asks only for a name, the identity type and credentials, in one short form.",
        "credit": "Datadog",
        "source": "https://docs.datadoghq.com/actions/connections/",
        "sourceTitle": "Datadog Docs: Connections",
        "alt": "Datadog Create a New Connection dialog with connection name, identifier type and credentials fields"
      },
      {
        "src": "https://docs.github.com/assets/cb-118277/images/github-apps/install-app.png",
        "product": "GitHub",
        "title": "Permissions before install",
        "pattern": "App permissions",
        "notes": "Before install, the app’s scope (all or selected repositories) and each read/write permission are listed in plain words.",
        "credit": "GitHub",
        "source": "https://docs.github.com/en/apps/using-github-apps/installing-a-github-app-from-github-marketplace-for-your-organizations",
        "sourceTitle": "GitHub Docs: Installing a GitHub App from Marketplace",
        "alt": "GitHub install app page with repository scope options and a list of read and write permissions"
      },
      {
        "src": "https://docs.github.com/assets/cb-37629/images/help/settings/settings-third-party-deny-edit.png",
        "product": "GitHub",
        "title": "Third-party access policy",
        "pattern": "App permissions",
        "notes": "With access restricted, only approved apps reach org data; each approved app has its status and an edit control to revoke.",
        "credit": "GitHub",
        "source": "https://docs.github.com/en/organizations/managing-oauth-access-to-your-organizations-data/denying-access-to-a-previously-approved-oauth-app-for-your-organization",
        "sourceTitle": "GitHub Docs: Denying access to a previously approved OAuth app",
        "alt": "GitHub Third-party application access policy page listing an approved app with an edit icon"
      },
      {
        "src": "https://docs.github.com/assets/cb-56741/images/help/settings/revoke-github-app.png",
        "product": "GitHub",
        "title": "Authorized apps with Revoke",
        "pattern": "App permissions",
        "notes": "Each authorized app shows its owner and last used date next to a Revoke button, which helps spot stale grants.",
        "credit": "GitHub",
        "source": "https://docs.github.com/en/apps/using-github-apps/reviewing-and-revoking-authorization-of-github-apps",
        "sourceTitle": "GitHub Docs: Reviewing and revoking authorization of GitHub Apps",
        "alt": "GitHub Authorized GitHub Apps tab with apps, last used dates and Revoke buttons"
      },
      {
        "src": "https://help.miro.com/hc/article_attachments/23921780921490",
        "product": "Miro",
        "title": "Allow only listed apps",
        "pattern": "App permissions",
        "notes": "A single switch flips the org from open to an allowlist, then admins add apps by name or ID.",
        "credit": "Miro",
        "source": "https://help.miro.com/hc/en-us/articles/4404659741458-App-management",
        "sourceTitle": "Miro Help: App management",
        "alt": "Miro admin Apps settings with an Allow only apps from the list below toggle and an app search field"
      },
      {
        "src": "https://help.miro.com/hc/article_attachments/21019791264274",
        "product": "Miro",
        "title": "Request an app",
        "pattern": "App permissions",
        "notes": "When an app isn’t allowed, members can send a request to admins instead of hitting a dead end.",
        "credit": "Miro",
        "source": "https://help.miro.com/hc/en-us/articles/4592785249810-App-request-flow",
        "sourceTitle": "Miro Help: App request flow",
        "alt": "Miro dialog for a member to send an app request to the admin"
      },
      {
        "src": "https://docs.dd-static.net/images/account_management/mobile_third_party_access/org-management-page.d97e0a6fb48c8444a8358c2e98d04f00.png?auto=format&fit=max&w=850&dpr=2",
        "product": "Datadog",
        "title": "Third-party access",
        "pattern": "App permissions",
        "notes": "Connected apps are listed with enabled/disabled filters; opening one shows status, last used and a Disable Application action.",
        "credit": "Datadog",
        "source": "https://docs.datadoghq.com/account_management/org_settings/oauth_apps/",
        "sourceTitle": "Datadog Docs: OAuth apps",
        "alt": "Datadog Mobile and Third-Party Access page with an app detail panel showing status and Disable Application"
      },
      {
        "src": "https://docs.dd-static.net/images/account_management/mobile_third_party_access/app-detail-scopes.5b2fa64ab35efc6a4b768a49cd98e70a.png?auto=format&fit=max&w=850&dpr=2",
        "product": "Datadog",
        "title": "App scopes",
        "pattern": "App permissions",
        "notes": "A Scopes tab lists exactly what the app can access, and a Users tab shows who authorised it.",
        "credit": "Datadog",
        "source": "https://docs.datadoghq.com/account_management/org_settings/oauth_apps/",
        "sourceTitle": "Datadog Docs: OAuth apps",
        "alt": "Datadog app detail with Scopes and Users tabs listing granted scopes"
      },
      {
        "src": "https://docs.dd-static.net/images/account_management/unrevoke-api-key.d96d9cf946574c12dd8e74464145f5c3.png?auto=format&fit=max&w=850&dpr=2",
        "product": "Datadog",
        "title": "API keys table",
        "pattern": "Create API key",
        "notes": "Keys are listed by name, owner, masked value and creation date, with revoked keys kept visible and restorable.",
        "credit": "Datadog",
        "source": "https://docs.datadoghq.com/account_management/api-app-keys/",
        "sourceTitle": "Datadog Docs: API and application keys",
        "alt": "Datadog API Keys list with status filter, masked keys, creation dates and an unrevoke action"
      },
      {
        "src": "https://docs.github.com/assets/cb-17251/images/help/settings/personal-access-tokens.png",
        "product": "GitHub",
        "title": "Copy token now",
        "pattern": "Create API key",
        "notes": "A new token is shown once with a copy button and a warning that it won’t be shown again.",
        "credit": "GitHub",
        "source": "https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens",
        "sourceTitle": "GitHub Docs: Managing your personal access tokens",
        "alt": "GitHub personal access tokens page with a newly created token and a copy icon"
      },
      {
        "src": "https://docs.github.com/assets/cb-38063/images/enterprise/site-admin-settings/click-global-webhook.png",
        "product": "GitHub",
        "title": "Webhooks list",
        "pattern": "Webhooks",
        "notes": "Each endpoint is listed by its URL with edit and delete actions, and the events it sends.",
        "credit": "GitHub",
        "source": "https://docs.github.com/en/webhooks/testing-and-troubleshooting-webhooks/viewing-webhook-deliveries",
        "sourceTitle": "GitHub Docs: Viewing webhook deliveries",
        "alt": "GitHub webhooks list with a webhook URL and Edit and Delete buttons"
      },
      {
        "src": "https://docs.github.com/assets/cb-26490/images/enterprise/site-admin-settings/global-webhooks-recent-deliveries.png",
        "product": "GitHub",
        "title": "Recent deliveries",
        "pattern": "Webhooks",
        "notes": "Every delivery has a success or failure icon, an ID and a timestamp; opening one shows the request and response for redelivery.",
        "credit": "GitHub",
        "source": "https://docs.github.com/en/webhooks/testing-and-troubleshooting-webhooks/viewing-webhook-deliveries",
        "sourceTitle": "GitHub Docs: Viewing webhook deliveries",
        "alt": "GitHub Recent Deliveries list with status icons, delivery IDs and timestamps"
      }
    ]
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
    screens: [
      {
        "src": "https://mintcdn.com/product-docs/C1Xd19VH3eRYplPn/images/box-admin-tools/adminconsole-enterprisesettingssearch.png",
        "product": "Box",
        "title": "Search across settings",
        "pattern": "Settings navigation",
        "notes": "Typing in the admin console search returns individual settings as ‘Section / Setting’ with the match highlighted, so admins skip the nav tree.",
        "credit": "Box",
        "source": "https://docs.box.com/en/box-admin-tools/how-to-guides-for-admins/searching-the-admin-console",
        "sourceTitle": "Box Docs: Searching the Admin Console",
        "alt": "Box Admin Console Enterprise Settings with a search dropdown listing matching settings with their section names"
      },
      {
        "src": "https://docs.dd-static.net/images/account_management/org_settings/nav.7cc83024673d821b5ff61bd4df489267.png?auto=format&fit=max&w=850&dpr=2",
        "product": "Datadog",
        "title": "Personal vs organization settings",
        "pattern": "Settings navigation",
        "notes": "One menu splits personal and organization settings into two labelled columns, so nobody changes org settings thinking they’re personal.",
        "credit": "Datadog",
        "source": "https://docs.datadoghq.com/account_management/org_settings/",
        "sourceTitle": "Datadog Docs: Organization settings",
        "alt": "Datadog account menu with Personal Settings and Organization Settings columns"
      },
      {
        "src": "https://docs.github.com/assets/cb-66704/images/help/organizations/continue-verifying-domain.png",
        "product": "GitHub",
        "title": "Verified and approved domains",
        "pattern": "Org profile",
        "notes": "Domains are listed with their verification state and a per-domain menu to continue or remove, alongside an Add a domain action.",
        "credit": "GitHub",
        "source": "https://docs.github.com/en/organizations/managing-organization-settings/verifying-or-approving-a-domain-for-your-organization",
        "sourceTitle": "GitHub Docs: Verifying or approving a domain",
        "alt": "GitHub Verified and approved domains page with a domain pending verification and an Add a domain button"
      },
      {
        "src": "https://docs.github.com/assets/cb-26751/images/help/organizations/domains-approve-it-instead.png",
        "product": "GitHub",
        "title": "Verify or approve instead",
        "pattern": "Org profile",
        "notes": "When DNS verification isn’t possible, a lighter ‘Approve it instead’ path sits right next to Verify.",
        "credit": "GitHub",
        "source": "https://docs.github.com/en/organizations/managing-organization-settings/verifying-or-approving-a-domain-for-your-organization",
        "sourceTitle": "GitHub Docs: Verifying or approving a domain",
        "alt": "GitHub Verify domain step with a Verify button and an Approve it instead link"
      },
      {
        "src": "https://docs.github.com/assets/cb-80374/images/help/organizations/profile-view-switcher-public.png",
        "product": "GitHub",
        "title": "Preview profile as public",
        "pattern": "Org profile",
        "notes": "A ‘View as’ switch lets admins see the org profile the way outsiders or members will.",
        "credit": "GitHub",
        "source": "https://docs.github.com/en/organizations/collaborating-with-groups-in-organizations/customizing-your-organizations-profile",
        "sourceTitle": "GitHub Docs: Customizing your organization’s profile",
        "alt": "GitHub organization profile page with a View as Public dropdown in the sidebar"
      },
      {
        "src": "https://help.miro.com/hc/article_attachments/39362714392338",
        "product": "Miro",
        "title": "Brand center",
        "pattern": "Org profile",
        "notes": "Brand themes, logos, typography and asset folders live in one admin area, so branding is set once for the whole company.",
        "credit": "Miro",
        "source": "https://help.miro.com/hc/en-us/articles/13061918433426-Brand-center",
        "sourceTitle": "Miro Help: Brand center",
        "alt": "Miro Brand center in the admin console showing brand themes"
      },
      {
        "src": "https://help.miro.com/hc/article_attachments/39362683656466",
        "product": "Miro",
        "title": "Brand logos",
        "pattern": "Org profile",
        "notes": "Logo variants (light, dark, icon) are uploaded side by side with clear labels for where each is used.",
        "credit": "Miro",
        "source": "https://help.miro.com/hc/en-us/articles/13061918433426-Brand-center",
        "sourceTitle": "Miro Help: Brand center",
        "alt": "Miro Brand center Logos tab with three logo variants"
      },
      {
        "src": "https://help.miro.com/hc/article_attachments/39362693098898",
        "product": "Miro",
        "title": "Set as default theme",
        "pattern": "Defaults",
        "notes": "Any brand theme can be made the default from its menu, so new content starts on-brand without being locked.",
        "credit": "Miro",
        "source": "https://help.miro.com/hc/en-us/articles/13061918433426-Brand-center",
        "sourceTitle": "Miro Help: Brand center",
        "alt": "Miro brand theme menu with Set as default theme, Edit details, Duplicate and Delete"
      },
      {
        "src": "https://help.miro.com/hc/article_attachments/21016941369618",
        "product": "Miro",
        "title": "Default sharing settings",
        "pattern": "Defaults",
        "notes": "Team defaults for who can create and how boards are shared are set with radio groups, each option spelled out in full.",
        "credit": "Miro",
        "source": "https://help.miro.com/hc/en-us/articles/360017572174-Default-sharing-settings",
        "sourceTitle": "Miro Help: Default sharing settings",
        "alt": "Miro team sharing settings with radio options for who can create assets and default board sharing"
      },
      {
        "src": "https://docs.dd-static.net/images/account_management/org_settings/max_session_duration.a9c220a750dab62f23cecf3bb6f255fb.png?auto=format&fit=max&w=850&dpr=2",
        "product": "Datadog",
        "title": "Max session duration",
        "pattern": "Defaults",
        "notes": "An org-wide security default shown as a sentence with the current value and a single edit action.",
        "credit": "Datadog",
        "source": "https://docs.datadoghq.com/account_management/org_settings/",
        "sourceTitle": "Datadog Docs: Organization settings",
        "alt": "Datadog Max Session Duration setting showing the current value with an edit button"
      },
      {
        "src": "https://docs.dd-static.net/images/account_management/org_settings/idle_session_timeout.2372b892ae5d1abf9a55916f392f25b8.png?auto=format&fit=max&w=850&dpr=2",
        "product": "Datadog",
        "title": "Idle session timeout",
        "pattern": "Defaults",
        "notes": "A simple on/off switch with an explanation of exactly what happens to idle sessions.",
        "credit": "Datadog",
        "source": "https://docs.datadoghq.com/account_management/org_settings/",
        "sourceTitle": "Datadog Docs: Organization settings",
        "alt": "Datadog Idle Session Timeout setting with a toggle and description"
      },
      {
        "src": "https://docs.github.com/assets/cb-128111/images/help/enterprises/select-advanced-security-individual-organization-policy.png",
        "product": "GitHub",
        "title": "Enterprise policy per organization",
        "pattern": "Inherited settings",
        "notes": "The enterprise sets a policy, then can allow it for selected organizations and pick a plan for each one in a row-level menu.",
        "credit": "GitHub",
        "source": "https://docs.github.com/en/enterprise-cloud@latest/admin/enforcing-policies/enforcing-policies-for-your-enterprise/enforcing-policies-for-code-security-and-analysis-for-your-enterprise",
        "sourceTitle": "GitHub Docs: Enforcing policies for code security and analysis",
        "alt": "GitHub enterprise Advanced Security policy with Allow for selected organizations and a per-organization plan menu"
      },
      {
        "src": "https://docs.github.com/assets/cb-15907/images/help/business-accounts/view-current-policy-implementation-link.png",
        "product": "GitHub",
        "title": "See how orgs are configured",
        "pattern": "Inherited settings",
        "notes": "When orgs may choose for themselves, a link shows each org’s current setting before the enterprise enforces one.",
        "credit": "GitHub",
        "source": "https://docs.github.com/en/enterprise-cloud@latest/admin/enforcing-policies/enforcing-policies-for-your-enterprise/enforcing-repository-management-policies-in-your-enterprise",
        "sourceTitle": "GitHub Docs: Enforcing repository management policies",
        "alt": "GitHub enterprise policy with a View your organizations' current configurations link"
      },
      {
        "src": "https://help.miro.com/hc/article_attachments/23921782079378",
        "product": "Miro",
        "title": "Company allowed domains",
        "pattern": "Inherited settings",
        "notes": "The company sets which domains boards can be shared with; teams inherit this list.",
        "credit": "Miro",
        "source": "https://help.miro.com/hc/en-us/articles/360017730133-Sharing-policy-on-Enterprise-Plan",
        "sourceTitle": "Miro Help: Sharing policy on Enterprise Plan",
        "alt": "Miro company sharing settings with an allowed domains toggle and domain list"
      },
      {
        "src": "https://help.miro.com/hc/article_attachments/23921804702226",
        "product": "Miro",
        "title": "Team-level domain restriction",
        "pattern": "Inherited settings",
        "notes": "A team can narrow sharing further within the company rules, with a warning until at least one domain is added.",
        "credit": "Miro",
        "source": "https://help.miro.com/hc/en-us/articles/360017730133-Sharing-policy-on-Enterprise-Plan",
        "sourceTitle": "Miro Help: Sharing policy on Enterprise Plan",
        "alt": "Miro team settings Allowed domains for team with a Restrict domains toggle and a domain name field"
      }
    ]
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
    screens: [
      {
        "src": "https://help.miro.com/hc/article_attachments/23921781994386",
        "product": "Miro",
        "title": "Admin insights overview",
        "pattern": "Admin home",
        "notes": "A row of headline numbers (licenses allocated, total users, active teams, projects, boards) each with a 30-day change, above an active-users chart. (Miro has since replaced this page with Analytics.)",
        "credit": "Miro",
        "source": "https://help.miro.com/hc/en-us/articles/360019358000-Admin-Insights-Deprecated",
        "sourceTitle": "Miro Help: Admin Insights (deprecated)",
        "alt": "Miro admin Insights page with KPI tiles for licenses, users, teams, projects and boards above an Active users bar chart"
      },
      {
        "src": "https://mintcdn.com/product-docs/xwgKJKhu_rJvniNQ/images/box-admin-tools/platforminsights-default-updated.png",
        "product": "Box",
        "title": "Platform insights",
        "pattern": "Admin home",
        "notes": "Usage trend charts sit beside summary cards, giving admins a one-page read on how the platform is being used.",
        "credit": "Box",
        "source": "https://docs.box.com/en/box-admin-tools/reporting-and-insights/platform-insights",
        "sourceTitle": "Box Docs: Platform insights",
        "alt": "Box Admin Console Platform Insights page with usage trend charts and summary metric cards"
      },
      {
        "src": "https://docs.github.com/assets/cb-26806/images/help/copilot/copilot-usage-overview.png",
        "product": "GitHub",
        "title": "Seat usage at a glance",
        "pattern": "Admin home",
        "notes": "Two numbers that matter (seats assigned, estimated monthly cost) at the top of the Copilot admin page, each linking to the detail.",
        "credit": "GitHub",
        "source": "https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/review-activity/review-user-activity-data",
        "sourceTitle": "GitHub Docs: Review user activity data",
        "alt": "GitHub Copilot Business overview showing seats assigned and estimated monthly cost"
      },
      {
        "src": "https://help.miro.com/hc/article_attachments/23921781999762",
        "product": "Miro",
        "title": "Active users over time",
        "pattern": "Adoption metrics",
        "notes": "Monthly active users as bars, with a hover tooltip for exact counts and a period selector.",
        "credit": "Miro",
        "source": "https://help.miro.com/hc/en-us/articles/360019358000-Admin-Insights-Deprecated",
        "sourceTitle": "Miro Help: Admin Insights (deprecated)",
        "alt": "Miro Active users bar chart by month with a tooltip"
      },
      {
        "src": "https://help.miro.com/hc/article_attachments/23921804622482",
        "product": "Miro",
        "title": "Active boards",
        "pattern": "Adoption metrics",
        "notes": "Created versus active boards on the same chart separates growth from real usage.",
        "credit": "Miro",
        "source": "https://help.miro.com/hc/en-us/articles/360019358000-Admin-Insights-Deprecated",
        "sourceTitle": "Miro Help: Admin Insights (deprecated)",
        "alt": "Miro Active boards bar chart comparing new and active boards"
      },
      {
        "src": "https://help.miro.com/hc/article_attachments/23921804630546",
        "product": "Miro",
        "title": "Popular templates",
        "pattern": "Adoption metrics",
        "notes": "A ranked list with usage bars shows which templates teams actually adopt, which helps decide what to promote.",
        "credit": "Miro",
        "source": "https://help.miro.com/hc/en-us/articles/360019358000-Admin-Insights-Deprecated",
        "sourceTitle": "Miro Help: Admin Insights (deprecated)",
        "alt": "Miro Popular templates ranked list with usage bars"
      },
      {
        "src": "https://docs.github.com/assets/cb-101335/images/help/security-overview/security-overview-enablement-trends.png",
        "product": "GitHub",
        "title": "Feature enablement trends",
        "pattern": "Adoption metrics",
        "notes": "Shows how many repositories have each security feature turned on over 30 days, so rollout progress is measurable.",
        "credit": "GitHub",
        "source": "https://docs.github.com/en/code-security/how-tos/view-and-interpret-data/analyze-organization-data/assessing-adoption-code-security",
        "sourceTitle": "GitHub Docs: Assessing adoption of code security",
        "alt": "GitHub security overview Enablement trends chart and table for Dependabot over 30 days"
      },
      {
        "src": "https://docs.dd-static.net/images/account_management/billing/usage-details-v2-01.850f197eb967fc41a20d409e4cff9a8e.png?auto=format&fit=max&w=850&dpr=2",
        "product": "Datadog",
        "title": "Usage summary tiles",
        "pattern": "Reports",
        "notes": "One tile per product with this month's usage and the change, scannable before drilling into any one product.",
        "credit": "Datadog",
        "source": "https://docs.datadoghq.com/account_management/plan_and_usage/usage_details/",
        "sourceTitle": "Datadog Docs: Usage details",
        "alt": "Datadog Usage Summary with a grid of product usage tiles"
      },
      {
        "src": "https://docs.dd-static.net/images/account_management/billing/UsageTrendsOverviewAndCSV.511d56eaaef4d2cc465947bc7ddb1e49.png?auto=format&fit=max&w=850&dpr=2",
        "product": "Datadog",
        "title": "Usage trends with CSV",
        "pattern": "Reports",
        "notes": "Small-multiple trend charts per product with a ‘Download as CSV’ action, for admins who report outside the tool.",
        "credit": "Datadog",
        "source": "https://docs.datadoghq.com/account_management/plan_and_usage/usage_details/",
        "sourceTitle": "Datadog Docs: Usage details",
        "alt": "Datadog Usage Trends charts per product with a Download as CSV button highlighted"
      },
      {
        "src": "https://docs.github.com/assets/cb-155037/images/help/security-overview/security-overview-dashboard-filters-3-tab.png",
        "product": "GitHub",
        "title": "Report filters and date range",
        "pattern": "Reports",
        "notes": "A date range and filter bar sit above the whole report, so every chart answers the same question.",
        "credit": "GitHub",
        "source": "https://docs.github.com/en/code-security/how-tos/view-and-interpret-data/analyze-organization-data/viewing-security-insights",
        "sourceTitle": "GitHub Docs: Viewing security insights",
        "alt": "GitHub security overview dashboard with date range and filter controls above charts"
      },
      {
        "src": "https://docs.dd-static.net/images/cloud_cost/recommendations/cost_recommendations_1.4c0a58bb9a1f570d3c5d80231ef07d5d.png?auto=format&fit=max&w=850&dpr=2",
        "product": "Datadog",
        "title": "Cost recommendations",
        "pattern": "Recommendations",
        "notes": "Potential monthly and annual savings up top, then a breakdown by recommendation type, each with its own savings estimate.",
        "credit": "Datadog",
        "source": "https://docs.datadoghq.com/cloud_cost_management/recommendations/",
        "sourceTitle": "Datadog Docs: Cloud cost recommendations",
        "alt": "Datadog Cloud Cost Recommendations with potential savings totals, a donut chart and a list of top recommendations"
      },
      {
        "src": "https://docs.dd-static.net/images/monitors/quality/filter_monitor_quality.08a574bf94f02723494d4f8d792e160f.png?auto=format&fit=max&w=850&dpr=2",
        "product": "Datadog",
        "title": "Monitors that need improvement",
        "pattern": "Recommendations",
        "notes": "A single ratio bar of healthy versus ‘to improve’ monitors, filterable by team and service, turns hygiene into a to-do list.",
        "credit": "Datadog",
        "source": "https://docs.datadoghq.com/monitors/quality/",
        "sourceTitle": "Datadog Docs: Monitor quality",
        "alt": "Datadog Monitor Quality bar showing 34 healthy monitors and 98 monitors to improve with filters"
      }
    ]
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
    screens: [
      {
        "src": "https://docs.github.com/assets/cb-20787/images/help/notifications-v2/triage-multiple-notifications-together.png",
        "product": "GitHub",
        "title": "Triage the inbox",
        "pattern": "Alert center",
        "notes": "Select several notifications and mark them Done or Unsubscribe in one go, so the inbox works like a queue.",
        "credit": "GitHub",
        "source": "https://docs.github.com/en/subscriptions-and-notifications/how-tos/viewing-and-triaging-notifications/managing-notifications-from-your-inbox",
        "sourceTitle": "GitHub Docs: Managing notifications from your inbox",
        "alt": "GitHub notifications inbox with two notifications selected and Done and Unsubscribe actions"
      },
      {
        "src": "https://docs.github.com/assets/cb-72123/images/help/notifications-v2/custom-filter-example.png",
        "product": "GitHub",
        "title": "Custom inbox filters",
        "pattern": "Alert center",
        "notes": "Saved filters with a name and query let people carve the inbox into the views they check most.",
        "credit": "GitHub",
        "source": "https://docs.github.com/en/subscriptions-and-notifications/how-tos/viewing-and-triaging-notifications/managing-notifications-from-your-inbox",
        "sourceTitle": "GitHub Docs: Managing notifications from your inbox",
        "alt": "GitHub notification filters dialog with name and filter query fields for a custom filter"
      },
      {
        "src": "https://docs.dd-static.net/images/incident_response/on-call/notification_page.daa7e914865641789d565bd04bf92a24.png?auto=format&fit=max&w=850&dpr=2",
        "product": "Datadog",
        "title": "Page with urgency",
        "pattern": "Alert center",
        "notes": "A page shows what triggered, who it’s routed to and its urgency, with the actions to acknowledge or escalate in one place.",
        "credit": "Datadog",
        "source": "https://docs.datadoghq.com/service_management/on-call/",
        "sourceTitle": "Datadog Docs: On-Call",
        "alt": "Datadog On-Call page notification showing the alert, routing and urgency"
      },
      {
        "src": "https://docs.dd-static.net/images/monitors/notifications/notification_rules/notification_rules_table.53b67d9cf18528a076ffcaff24644c80.png?auto=format&fit=max&w=850&dpr=2",
        "product": "Datadog",
        "title": "Notification rules table",
        "pattern": "Notification rules",
        "notes": "Each rule lists its scope (tags), owning team, recipients and how many monitors it covers, so routing is managed centrally.",
        "credit": "Datadog",
        "source": "https://docs.datadoghq.com/monitors/notify/notification_rules/",
        "sourceTitle": "Datadog Docs: Notification rules",
        "alt": "Datadog Monitor Notification Rules table with name, scope, team, recipients and coverage columns"
      },
      {
        "src": "https://docs.dd-static.net/images/security/notification-rules-overview-1.92a734fdc624398741bb5ec477b5523d.png?auto=format&fit=max&w=850&dpr=2",
        "product": "Datadog",
        "title": "Security notification rules",
        "pattern": "Notification rules",
        "notes": "Rules read as a sentence: when this signal type at this severity, notify these channels, each with an on/off switch.",
        "credit": "Datadog",
        "source": "https://docs.datadoghq.com/security/notifications/rules/",
        "sourceTitle": "Datadog Docs: Security notification rules",
        "alt": "Datadog Security Notification Rules list with conditions, recipients and enable toggles"
      },
      {
        "src": "https://docs.dd-static.net/images/monitors/notifications/test_notification_modal.ae58decbf944c8b89818e277b8fa2a6b.png?auto=format&fit=max&w=850&dpr=2",
        "product": "Datadog",
        "title": "Test notifications",
        "pattern": "Notification rules",
        "notes": "Pick the state changes to simulate and a group, then send real test notifications before relying on the alert.",
        "credit": "Datadog",
        "source": "https://docs.datadoghq.com/monitors/notify/",
        "sourceTitle": "Datadog Docs: Notifications",
        "alt": "Datadog Test notifications dialog with selectable state transitions such as Alert and Alert Recovery and a Run Test button"
      },
      {
        "src": "https://docs.dd-static.net/images/monitors/status/header_downtimes.a539064af91493af16298f36780cfe5e.png?auto=format&fit=max&w=850&dpr=2",
        "product": "Datadog",
        "title": "Mute with a duration",
        "pattern": "Notification rules",
        "notes": "Muting asks for how long and for which groups, with an optional note, so silence has an end date and a reason.",
        "credit": "Datadog",
        "source": "https://docs.datadoghq.com/monitors/status/",
        "sourceTitle": "Datadog Docs: Monitor status page",
        "alt": "Datadog monitor status page with a Create a downtime to mute this monitor popover with duration, scope and comment"
      },
      {
        "src": "https://docs.github.com/assets/cb-70021/images/help/dependabot/dependabot-notification-frequency.png",
        "product": "GitHub",
        "title": "Digest frequency",
        "pattern": "Notification rules",
        "notes": "Alerts can arrive as they happen or as a weekly or daily digest, chosen from one menu.",
        "credit": "GitHub",
        "source": "https://docs.github.com/en/code-security/how-tos/secure-your-supply-chain/manage-your-dependency-security/configure-dependabot-notifications",
        "sourceTitle": "GitHub Docs: Configure Dependabot notifications",
        "alt": "GitHub Dependabot alerts notification options with a frequency dropdown"
      },
      {
        "src": "https://help.miro.com/hc/article_attachments/33980377194770",
        "product": "Miro",
        "title": "Notification preferences matrix",
        "pattern": "Notification rules",
        "notes": "Each event type has a row and each channel (email, mobile, Slack) a column of checkboxes, so people tune noise per channel.",
        "credit": "Miro",
        "source": "https://help.miro.com/hc/en-us/articles/360017571314-Manage-notifications-and-email-preferences",
        "sourceTitle": "Miro Help: Manage notifications and email preferences",
        "alt": "Miro Notification Preferences with checkbox columns for each channel against board activity events"
      }
    ]
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
