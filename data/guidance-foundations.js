/* Guidance for the Foundations group: cross-cutting UI that every console leans on.
   Same shape as guidance.js. Tags: WCAG 2.2 success criteria or UD principles. */

Object.assign(window.WCAG, {
  "1.4.12": "Text Spacing",
  "2.1.4": "Character Key Shortcuts",
  "2.5.7": "Dragging Movements"
});

Object.assign(window.GUIDANCE, {

  /* ------------------------------------------------------------------ */
  "tables-grids": {
    scale: {
      intro: "Tables are where admins spend most of their time. Users, groups, devices, logs, invoices: nearly every admin object ends up in a table. A table that is fine with 50 rows becomes the bottleneck at 50,000, and at enterprise size most tables are windows onto server-side queries rather than lists held in the browser. The design job is to keep tables fast, scannable and actionable, whatever the row count, and for every way people read them.",
      tiers: [
        ["Tens", "A simple table with a few columns, sortable by clicking headers."],
        ["Thousands", "Pagination, column choices, density options and row actions become essential."],
        ["Hundreds of thousands", "Everything runs on the server: sort, filter, count and export. Column sets differ by role, and tables must stay responsive while data changes underneath."]
      ],
      principles: [
        "Sort, filter, paginate and count on the server. The browser shows a window, not the dataset.",
        "Pick columns by the decisions admins make, and let them adjust the rest.",
        "Keep identity columns, usually name, fixed while scrolling sideways.",
        "Make row actions reachable without hover and without a mouse.",
        "Use real table markup. Grids that look like tables but aren’t are invisible to assistive tech."
      ]
    },
    patterns: {
      "Column management": {
        think: [
          "Different admins need different columns from the same table. A security admin and a helpdesk agent look for different things.",
          "Defaults should serve the most common task; customisation serves the rest."
        ],
        do: [
          "Let admins show, hide and reorder columns from a menu.",
          "Remember choices per admin, and offer a reset to default.",
          "Keep the primary column fixed and always visible.",
          "Allow resizing with a keyboard alternative, such as width presets."
        ],
        dont: [
          "Don’t show every available field by default.",
          "Don’t allow hiding the column that identifies each row.",
          "Don’t make drag the only way to reorder or resize columns."
        ],
        access: [
          ["WCAG 2.5.7", "Reordering and resizing by drag must have a single-pointer alternative, such as move up and down buttons."],
          ["WCAG 2.1.1", "The column menu works fully by keyboard."],
          ["WCAG 4.1.2", "Show and hide checkboxes expose their state and column name."],
          ["UD 2", "Let each admin shape the table to their task."]
        ],
        scale: [
          "Offer role-based default column sets.",
          "Share column layouts as part of saved views.",
          "Only fetch the columns that are shown, to keep queries fast."
        ]
      },

      "Sorting & pagination": {
        think: [
          "Sorting and pagination decide what admins see first and how they move through large sets.",
          "With huge datasets, exact counts and deep pages become expensive. Design for that honestly."
        ],
        do: [
          "Sort by clicking column headers, with a clear direction indicator.",
          "Show the range and total, such as ‘1–50 of 12,408’.",
          "Let admins choose page size, and keep it across sessions.",
          "Keep sort and page in the URL so views can be shared."
        ],
        dont: [
          "Don’t sort only the current page.",
          "Don’t use infinite scroll for audit and management tables.",
          "Don’t reset the page when an admin returns from a detail view."
        ],
        access: [
          ["WCAG 4.1.2", "Sortable headers are buttons, and expose sort state with aria-sort."],
          ["WCAG 4.1.3", "Announce the new sort or page when it changes."],
          ["WCAG 2.4.3", "After changing page, move focus to the top of the table or announce the change."],
          ["UD 4", "Show sort direction with an icon and text for screen readers."]
        ],
        scale: [
          "Use cursor-based pagination for large or changing datasets.",
          "Use approximate counts when exact ones are too slow, and label them, such as ‘about 2.4M’.",
          "Add indexes for sortable columns, and limit sorting on unindexed fields."
        ]
      },

      "Row actions": {
        think: [
          "Row actions let admins act on one item without opening it. They must be easy to find and hard to trigger by mistake.",
          "Hover-only actions fail for keyboard, touch and screen reader users."
        ],
        do: [
          "Use an overflow menu on each row, always visible or visible on focus.",
          "Put the most common action first, and destructive actions last and separated.",
          "Name menus with the row, such as ‘Actions for Alex Chen’.",
          "Make the row open the detail page, separate from the actions menu."
        ],
        dont: [
          "Don’t show actions only on hover.",
          "Don’t put many icon-only buttons in each row.",
          "Don’t let a row click trigger an action."
        ],
        access: [
          ["WCAG 2.1.1", "Row actions are reachable and usable by keyboard."],
          ["WCAG 1.4.13", "Actions revealed on hover must also appear on focus, and not hide content."],
          ["WCAG 2.5.8", "Action buttons are at least 24 by 24 pixels with spacing."],
          ["WCAG 4.1.2", "Menu buttons have accessible names including the row."]
        ],
        scale: [
          "Check permissions per row on the server, and hide or disable actions accordingly.",
          "Keep row action menus consistent across all tables.",
          "Offer the same actions in bulk for selected rows."
        ]
      },

      "Density": {
        think: [
          "Dense tables show more at once; comfortable ones are easier to read and click. Admins differ.",
          "Density is a preference, not a fixed design choice."
        ],
        do: [
          "Offer compact and comfortable densities.",
          "Remember the choice per admin.",
          "Keep text size and target sizes acceptable in compact mode.",
          "Test density with zoom and larger text."
        ],
        dont: [
          "Don’t make compact mode shrink text below readable sizes.",
          "Don’t truncate key values without a way to see them.",
          "Don’t make targets too small in compact mode."
        ],
        access: [
          ["WCAG 1.4.4", "Text can be resized to 200% without loss of content."],
          ["WCAG 1.4.12", "Tables still work when text spacing is increased."],
          ["WCAG 2.5.8", "Targets meet minimum size even in compact mode."],
          ["UD 2", "Let people choose density to suit how they read."]
        ],
        scale: [
          "Compact mode helps power users scan large datasets.",
          "Make density part of saved views.",
          "Use the same density settings across all tables."
        ]
      },

      "Expandable rows": {
        think: [
          "Expandable rows show detail without leaving the list, useful for logs, errors and nested items.",
          "They work for a few details. Rich detail belongs on its own page."
        ],
        do: [
          "Use a clear expand control at the start of the row.",
          "Show the detail directly below the row, indented.",
          "Let several rows be expanded at once.",
          "Offer ‘Expand all’ and ‘Collapse all’ for small lists."
        ],
        dont: [
          "Don’t make the whole row the expand target if it also opens a page.",
          "Don’t load heavy content for every row up front.",
          "Don’t nest expandable rows deeply."
        ],
        access: [
          ["WCAG 4.1.2", "Expand buttons expose aria-expanded and name the row."],
          ["WCAG 1.3.1", "Expanded content is associated with its row."],
          ["WCAG 2.1.1", "Expand and collapse work by keyboard."]
        ],
        scale: [
          "Load expanded details on demand.",
          "Keep expansion state when sorting or paging, where possible.",
          "Link to the full detail page for more."
        ]
      }
    }
  },

  /* ------------------------------------------------------------------ */
  "search-filtering": {
    scale: {
      intro: "At enterprise size, nobody browses. Admins arrive with a name, an ID, an error message or a question, and search and filters are how they find the one item among millions. Good search is forgiving and fast; good filters are visible, combinable and shareable. Together they decide whether an admin finishes a task in seconds or gives up and files a ticket.",
      tiers: [
        ["Tens", "A search box that matches names is enough."],
        ["Thousands", "Filters by status, role and date. Saved views for repeated checks."],
        ["Hundreds of thousands", "Server-side search across many fields, query languages for experts, shared saved views, and a global search across the whole console."]
      ],
      principles: [
        "Search on the server, across the fields admins actually know: name, email, ID.",
        "Show active filters clearly, and make clearing them easy.",
        "Put search and filter state in the URL so views can be shared and bookmarked.",
        "Offer simple filters for most admins and a query language for experts.",
        "Make empty results helpful: explain why and suggest what to change."
      ]
    },
    patterns: {
      "Filter bar": {
        think: [
          "The filter bar narrows a list by facets. It should show what is filtered at a glance.",
          "Most admins use a few filters; keep those up front."
        ],
        do: [
          "Show common filters as chips or dropdowns above the list.",
          "Show active filters with a clear remove action, and a ‘Clear all’.",
          "Show counts for filter values where possible.",
          "Update results quickly as filters change."
        ],
        dont: [
          "Don’t hide active filters inside a closed panel.",
          "Don’t apply filters that leave the admin wondering why the list is empty.",
          "Don’t reset filters when navigating back."
        ],
        access: [
          ["WCAG 4.1.2", "Filter chips expose their state, such as pressed or selected."],
          ["WCAG 4.1.3", "Announce result counts when filters change."],
          ["WCAG 3.2.2", "Changing a filter doesn’t move focus unexpectedly."],
          ["UD 4", "Active filters are shown in text, not only by colour."]
        ],
        scale: [
          "Load filter values from the server, with search inside long value lists.",
          "Show approximate counts when exact ones are expensive.",
          "Save filter combinations as views."
        ]
      },

      "Advanced query": {
        think: [
          "Experts need precise queries: combinations, ranges, exclusions. A visual builder and a query language serve different people.",
          "Both should produce the same query, and switching between them should be possible."
        ],
        do: [
          "Offer a visual builder with conditions and AND/OR groups.",
          "Offer a query language with autocomplete and syntax help.",
          "Validate queries as they’re typed, with clear errors.",
          "Show a readable summary of the query."
        ],
        dont: [
          "Don’t make the query language the only way to filter.",
          "Don’t fail silently on invalid queries.",
          "Don’t lose a query when switching between builder and text."
        ],
        access: [
          ["WCAG 3.3.1", "Identify query errors in text, with position."],
          ["WCAG 3.3.2", "Provide syntax help and examples."],
          ["WCAG 4.1.2", "Autocomplete suggestions are exposed as a listbox."],
          ["UD 2", "Builder and text modes serve different people."]
        ],
        scale: [
          "Run heavy queries asynchronously.",
          "Set and explain limits on query complexity.",
          "Share queries by link and as saved views."
        ]
      },

      "Saved views": {
        think: [
          "Saved views turn repeated checks into one click.",
          "Views can be personal or shared with the team."
        ],
        do: [
          "Save filters, sort, columns and density together.",
          "Let admins name, share and set a default view.",
          "Show who created shared views and when they changed.",
          "Warn when a saved view is outdated by a change in the data model."
        ],
        dont: [
          "Don’t let shared views be changed by anyone without notice.",
          "Don’t clutter the list with unused views.",
          "Don’t hide which view is currently active."
        ],
        access: [
          ["WCAG 2.4.6", "Views have descriptive names."],
          ["WCAG 4.1.3", "Announce when a view is applied."],
          ["UD 6", "Saved views remove repeated filter work."]
        ],
        scale: [
          "Provide org-wide shared views for common checks.",
          "Scope views to admin permissions.",
          "Track view use and archive unused views."
        ]
      },

      "Global admin search": {
        think: [
          "Global search lets admins jump anywhere: a user, a setting, a group, a page.",
          "It’s often the fastest navigation, especially for experienced admins."
        ],
        do: [
          "Search across users, groups, settings and pages from anywhere.",
          "Group results by type, and show enough context to choose.",
          "Open with a keyboard shortcut that can be changed or turned off.",
          "Show recent items and searches."
        ],
        dont: [
          "Don’t return results the admin can’t access.",
          "Don’t use single-letter shortcuts that can’t be turned off.",
          "Don’t make global search the only way to find settings."
        ],
        access: [
          ["WCAG 2.1.4", "Single-key shortcuts must be remappable, disableable, or active only when focused."],
          ["WCAG 4.1.2", "Results use proper combobox or listbox semantics."],
          ["WCAG 2.4.5", "Search is one of several ways to find pages."],
          ["UD 6", "Jumping straight to an item saves many clicks."]
        ],
        scale: [
          "Index across services with permission filtering.",
          "Return results fast, with partial results streaming in.",
          "Rank by relevance and recency for each admin."
        ]
      }
    }
  },

  /* ------------------------------------------------------------------ */
  "empty-onboarding": {
    scale: {
      intro: "Empty states are moments when there’s nothing to show: a new org, a filter with no matches, or a page an admin can’t see. They’re easy to ignore and expensive to get wrong, because they’re where admins decide whether they’re lost. At enterprise size, onboarding involves multiple admins, integrations and policies, so setup becomes a shared project rather than a quick tour.",
      tiers: [
        ["Tens", "A short welcome and a clear first action."],
        ["Thousands", "Setup checklists across several admins, with progress tracking."],
        ["Hundreds of thousands", "Onboarding is a project with stages, integrations, migration and rollout by region, coordinated across teams."]
      ],
      principles: [
        "Every empty state explains why it’s empty and what to do next.",
        "Distinguish ‘nothing yet’, ‘nothing matches’ and ‘you can’t see this’.",
        "Offer one clear next action.",
        "Track setup progress across admins.",
        "Don’t hide product capabilities behind empty states."
      ]
    },
    patterns: {
      "Setup checklist": {
        think: [
          "A setup checklist guides admins through the steps that make the product work for their org.",
          "Setup often spans days and several people."
        ],
        do: [
          "List setup tasks in a sensible order, with progress.",
          "Link each task to where it’s done.",
          "Detect completed tasks automatically.",
          "Let admins assign tasks to colleagues and skip optional ones."
        ],
        dont: [
          "Don’t block the product until setup is done.",
          "Don’t include upsells in the checklist.",
          "Don’t make the checklist impossible to dismiss."
        ],
        access: [
          ["WCAG 1.3.1", "Use a list, with completion state in text."],
          ["WCAG 4.1.3", "Announce task completion."],
          ["UD 3", "Order tasks logically and explain each."]
        ],
        scale: [
          "Track setup across sub-orgs and regions.",
          "Integrate setup with migration and identity tasks.",
          "Report setup progress to stakeholders."
        ]
      },

      "Empty table": {
        think: [
          "An empty table before anything is created is a chance to explain and start.",
          "It should look different from ‘no results’."
        ],
        do: [
          "Explain what will appear here and why it’s useful.",
          "Offer the primary action, such as ‘Add users’, and alternatives such as import or sync.",
          "Link to help.",
          "Keep the table structure hidden or minimal."
        ],
        dont: [
          "Don’t show an empty table grid with no explanation.",
          "Don’t offer many competing actions.",
          "Don’t use decorative illustrations without meaning."
        ],
        access: [
          ["WCAG 1.1.1", "Illustrations are decorative with empty alt, or described."],
          ["WCAG 2.4.6", "Use a heading for the empty state."],
          ["UD 3", "One clear first action."]
        ],
        scale: [
          "Suggest import or sync for large orgs.",
          "Explain sync delays when data is expected but not yet present.",
          "Show different guidance for scoped admins."
        ]
      },

      "No results": {
        think: [
          "No results after a search or filter is usually a dead end the admin didn’t expect.",
          "The fix is in the filters, so point there."
        ],
        do: [
          "Say no results matched, and show the search and filters applied.",
          "Offer to clear filters or broaden the search.",
          "Suggest likely corrections, such as spelling.",
          "Keep the filter controls visible."
        ],
        dont: [
          "Don’t show the same message as an empty table.",
          "Don’t hide the active filters.",
          "Don’t clear filters automatically."
        ],
        access: [
          ["WCAG 4.1.3", "Announce that no results were found."],
          ["WCAG 3.3.3", "Suggest corrections."],
          ["UD 5", "Make recovery one click."]
        ],
        scale: [
          "Explain when results are limited by scope.",
          "Suggest searching other areas through global search.",
          "Detect common no-result queries to improve search."
        ]
      },

      "Permission empty state": {
        think: [
          "When an admin can’t see something, they need to know it’s a permission issue, not missing data.",
          "Tell them who can grant access."
        ],
        do: [
          "Say they don’t have access, and why.",
          "Name who can grant access, or offer to request it.",
          "Show what they can see instead.",
          "Keep navigation working."
        ],
        dont: [
          "Don’t show an empty list that looks like no data.",
          "Don’t reveal sensitive details about what is hidden.",
          "Don’t show a generic error page."
        ],
        access: [
          ["WCAG 2.4.6", "Use a heading such as ‘You don’t have access to this page’."],
          ["WCAG 2.4.4", "‘Request access’ links say what they do."],
          ["UD 4", "Explain the situation in plain words."]
        ],
        scale: [
          "Connect to access request workflows.",
          "Explain scoped admin limits.",
          "Log permission denials for security review."
        ]
      }
    }
  }
});
