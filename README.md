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

Screenshots come from the public help centres and docs of GitHub, Datadog, Miro, Atlassian (Jira, Confluence, Guard, Rovo), Google Cloud, Cloudflare, Box, Asana, Notion, Glean, Coveo, Palo Alto Networks, Adobe, Apollo, Plaid and Microsoft. Every screen is credited and links back to the page it came from.

## Pages

**Overview** (home): the categories as a gallery with wireframe thumbnails, totals and group filter chips.

**Header search** (every page, ⌘K): searches the 23 category names and the 116 pattern names, shown as two groups, Categories then Patterns. Each typed word has to match the start of a word in a name, so "bulk add" finds "Bulk add users". Choosing a category opens its page; choosing a pattern opens that category's Patterns tab with the pattern selected. On narrow screens and at high zoom it collapses to a search button.

**Category pages** have three tabs, opening on Patterns:

- **Patterns**: a row of chips, one per pattern (a dropdown when the space is narrow); the chosen pattern shows below with previous / next. Its card leads with *How to think about it*, then a 2×2 of *Recommended*, *Avoid*, *At enterprise scale* and *Accessibility* (WCAG 2.2 criteria, linked to W3C Understanding docs), and *Universal design* (the 7 Principles) along the bottom.
  Some patterns open with a short clip above the card (see *Pattern clips* below).
- **Screens**: the saved screenshots, filterable by pattern. Each opens in a side sheet with the details on the left and the image on the right, a Group › Category › Pattern title, previous / next, and a link to the source page.
- **Scale**: how the category changes from a small team to hundreds of thousands of users, shown as a cool-grey tier ramp, plus principles that hold at every size.

Deep links: `?c=user-management#scale`, `#patterns`, `#screens`, or a single pattern such as `#p-offboarding`. Pages swap in place, so the sidebar keeps its position and scroll.

## Design

White page, Geist and Geist Mono, hairline rules instead of boxes. The left nav starts with **Overview**, then a **By group / A–Z** switch: by group shows one collapsible section per group (icon, label, chevron; open/closed is remembered per browser), A–Z shows all 23 categories in one alphabetical list. Both show a screen count per category, and the choice is remembered per browser. The header shows the wordmark and a version badge (`v0.2.2 preview`). Only screenshots and open pattern cards sit in framed containers. Light and dark themes, reduced motion and Windows High Contrast are supported.

## Structure

```
index.html            App shell: Overview and category pages (?c=slug)
category.html         Alias of index.html, kept so older links work
data/categories.js    Groups, categories, patterns and screen entries
data/guidance*.js     Scale tiers and per-pattern guidance, one file per group
data/videos.js        Pattern clips: which pattern shows which clip
media/<slug>/         Rendered clips and their poster frames
motion/               Clip sources (HTML scenes), renderer and sound synth
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

## Pattern clips

Short clips that show a pattern in motion, using made-up Star Wars data in a mock console. Each is listed in `data/videos.js` (category slug → pattern name → `src`, `poster`, `label`, `steps`) and shows above that pattern's card. `steps` is the text alternative.

Clips are drawn as HTML and recorded frame by frame: `motion/<name>/scene.html` renders any moment with `renderAt(seconds)` and lists its sound cues; `motion/sfx.py` synthesizes the clicks, key ticks, whooshes and chime.

```
pip install playwright numpy   # plus ffmpeg and Chrome
python3 motion/render.py request-access media/access-requests/request-access.mp4
python3 motion/render.py request-access --stills 1.3,4.8,7.9   # check single frames
```

Open a scene with `?play` to watch it live in a browser while editing.

## Known gaps

Some patterns are rarely shown in public docs and have no screens yet: table density and expandable rows, empty tables, global admin search, undo toasts, settings save patterns, banners and announcements, and bulk-job progress.

## Versions

The header badge shows the current version. See [CHANGELOG.md](CHANGELOG.md) for what changed in each one; each version is also a git tag (`v0.1`, `v0.2`, `v0.2.1`, `v0.2.2`).

## Publishing

GitHub Pages, deployed from `main` / root.
