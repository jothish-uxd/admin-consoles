# Admin Consoles

A personal inspiration library of admin console UI patterns. Screens are grouped by the job the admin is doing (adding users, setting policy, deleting things) rather than by product, and each pattern comes with guidance on usability, accessibility and enterprise scale.

**Live site:** https://jothish-uxd.github.io/admin-consoles/

Static site, no build step. Open `index.html` or serve the folder.

## What's in it

23 categories in 6 groups, 116 patterns and about 300 screenshots from public vendor documentation.

| Group | Categories |
|---|---|
| People & access | User management, Roles & permissions, Groups & teams, Security & identity, Access requests & approvals |
| Content & assets | Asset management, Storage & quotas, Knowledge & content sources |
| Actions & flows | Creation flows, Edit & bulk actions, Destructive actions, Import & export |
| Governance & compliance | Policies & rules, Audit logs & activity, AI governance |
| Platform & configuration | Billing & licenses, Integrations & API keys, Org settings, Usage & insights, Notifications & alerts |
| Foundations | Tables & data grids, Search & filtering, Empty states & onboarding |

Screenshots come from the public help centres and docs of GitHub, Datadog, Miro, Atlassian (Jira, Confluence, Guard, Rovo), Google Cloud, Cloudflare, Box, Asana, Notion, Glean, Coveo, Okta, Palo Alto Networks, Adobe, Microsoft and others. Every screen is credited and links back to the page it came from.

## Pages

**Overview** (home): the categories as a gallery with wireframe thumbnails, totals, a search field (⌘K to focus) and group filter chips.

**Category pages** have three tabs:

- **Scale**: how the category changes from a small team to hundreds of thousands of users, shown as a cool grey → slate → black tier ramp, plus principles that hold at every size.
- **Patterns**: one accordion per pattern. An open pattern's content sits in a nested card with:
  - How to think about it
  - Do / Don't
  - Accessibility & universal design, tagged with WCAG 2.2 success criteria (linked to W3C Understanding docs) or the 7 Principles of Universal Design
  - At enterprise scale
- **Screens**: the saved screenshots, filterable by pattern. Each card shows the product, what to notice, and a credit with a link to the source page.

Deep links: `?c=user-management#scale`, `#patterns`, `#screens`, or a single pattern such as `#p-offboarding`. Pages swap in place, so the sidebar keeps its position and scroll.

## Design

Mirrors the Enterprise Library docs: white page, Geist and Geist Mono, hairline rules instead of boxes. The left nav starts with **Getting started → Overview**, then one collapsible section per group (icon, label, chevron; open/closed is remembered per browser) with a screen count per category. The header shows the wordmark and a version badge (`v0.1 preview`). Only screenshots and open pattern cards sit in framed containers. Light and dark themes, reduced motion and Windows High Contrast are supported.

## Structure

```
index.html            App shell: Overview and category pages (?c=slug)
category.html         Alias of index.html, kept so older links work
data/categories.js    Groups, categories, patterns and screen entries
data/guidance*.js     Scale tiers and per-pattern guidance, one file per group
assets/               Styles, app script, monochrome wireframe thumbnails
screens/<slug>/       Optional local screenshots, one folder per category
```

## Adding a screenshot

Add an entry to the category's `screens` array in `data/categories.js`. Most screens link directly to the image on the vendor's docs; a local file in `screens/<category-slug>/` works too.

```js
{
  src: "https://docs.example.com/images/add-user.png",  // or "screens/user-management/add-user.png"
  product: "Example",
  title: "Add user dialog",
  pattern: "Invite / add user",     // must match one of the category's patterns
  notes: "What's worth noticing in this screen.",
  credit: "Example Inc.",
  source: "https://docs.example.com/add-users",
  sourceTitle: "Example Docs: Add users",
  alt: "Describe the screen for screen reader users"
}
```

Remote images load with `referrerpolicy="no-referrer"`; if one stops loading, the card shows a placeholder instead of a broken image. Counts on the Overview and in the sidebar update automatically.

When you change data or styles, bump the `?v=` query on the script and stylesheet tags in `index.html` and `category.html` (keep both files identical) so browsers pick up the new version straight away.

## Known gaps

Some patterns are rarely shown in public docs and have no screens yet: table density and expandable rows, empty tables, global admin search, undo toasts, settings save patterns, banners and announcements, and bulk-job progress.

## Publishing

GitHub Pages, deployed from `main` / root.
