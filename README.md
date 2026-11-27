# Enterprise Library

A personal inspiration library of admin console UI patterns. Screens are grouped by the job the admin is doing (adding users, setting policy, deleting things) rather than by product, and each pattern comes with guidance on usability, accessibility and enterprise scale.

**Live site:** https://jothish-uxd.github.io/admin-consoles/

Static site, no build step. Open `index.html` or serve the folder.

## What's in it

24 categories in 6 groups, 124 patterns and about 300 screenshots from public vendor documentation.

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

**Header search** (every page, ⌘K): searches the 24 category names and the 124 pattern names, shown as two groups, Categories then Patterns. Each typed word has to match the start of a word in a name, so "bulk add" finds "Bulk add users". Choosing a category opens its page; choosing a pattern opens that category's Patterns tab with the pattern selected. On narrow screens and at high zoom it collapses to a search button.

**Category pages** have three tabs, opening on Patterns:

- **Patterns**: a row of chips, one per pattern (a dropdown when the space is narrow); the chosen pattern shows below with previous / next. Its card leads with *How to think about it*, then a 2×2 of *Recommended*, *Avoid*, *At enterprise scale* and *Accessibility* (WCAG 2.2 criteria, linked to W3C Understanding docs), and *Universal design* (the 7 Principles) along the bottom.
  Some patterns open with a short clip above the card, with a player bar (play, time, timeline, sound, full screen); see *Pattern clips* below.
- **Scale**: how the category changes from a small team to hundreds of thousands of users, shown as a cool-grey tier ramp, plus principles that hold at every size.
- **Real-world examples**: the saved screenshots from real companies, filterable by pattern. Each opens in a side sheet with the details on the left and the image on the right, a Group › Category › Pattern title, previous / next, and a link to the source page.

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

Clips are drawn as HTML and recorded frame by frame. `motion/shared/` holds what every clip shares: the mock console's look, the camera, cursor, click ring and silent end card (`console.css`, `motion.js`). Each `motion/<name>/scene.html` adds its own screen, timeline and sound cues; `motion/sfx.py` synthesizes the clicks, key ticks, whooshes and chime.

```
pip install playwright numpy   # plus ffmpeg and Chrome
python3 motion/render.py request-access media/access-requests/request-access.mp4
python3 motion/render.py request-access --stills 1.3,4.8,7.9   # check single frames
python3 motion/render.py request-access media/access-requests/request-access.mp4 --audio-only   # new sound, same picture
```

Open a scene with `?play` to watch it live in a browser while editing.

All clips are set in one mock product, the **Echo Base Console**, with one fixed rail (Workspace for everyone; Admin for admins only). [`motion/CONSOLE.md`](motion/CONSOLE.md) gives every pattern its section and page; a scene sets them with `data-at` on the rail and `data-path` on the breadcrumb, and `motion.js` draws both.

Each clip is a guide, so it must agree with its pattern card: before building, map every point on the card (How to think about it, Recommended, Avoid, Accessibility) to a moment in the clip, show nothing the card says to avoid, and list the mapping in a comment at the top of the scene. Points a video can't show, such as screen reader labels, go in the steps text.

The way in: when a page isn't reached straight from the rail, open with a short beat showing how the person gets there (for example, Transfer ownership starts from the person's offboarding checklist in People). Skip it for pages the rail leads to directly, where the highlighted section already shows the way.

Framing: whatever the viewer should look at sits in the middle of the frame and is never cut off. Prefer one steady framing per view (zoomed so the whole card or region fits) over panning across it, and keep camera moves few and slow.

If something to centre sits near the window's edge, pass `clamp: false` so the camera can move past the edge of the stage (the backdrop there is the same grey).

Player bar: on the site, the player's control bar covers the bottom of the frame. Every click, and the thing it lands on, stays above y = 590 of 720 (`SAFE_Y` in `shared/motion.js`). `render.py` warns when a click lands lower, and `python3 motion/audit.py` checks every scene, and also that `render()` sets every element on every branch, so a frame (and the poster, drawn after the last frame) never keeps state from later in the clip.

Same page, same pixels: a page that appears in more than one clip looks identical in each, so moving between patterns never shifts anything. The page frame (`.main` padding, `.main > .view`, `h1`, `.hd`, page tabs) lives only in `shared/console.css`, and scenes don't restyle it. Pages shown in several clips share their header actions and tabs too: Home, Billing (Contract and Add seats; Plan · Seats · Invoices), People (one primary action per tab; Users · Groups · Roles), Content (All content · Sharing · Tags · Storage · Trash, with the same toolbar on All content and on Tags), the item page (Details · Access · Activity · Versions) and the Audit log (Views, Copy link, Export, Save view; Events · Streaming · Alerts; quick filters, filters, query and count in the same rows, styled by `.alog`). Only the content of the moment changes, such as a new row, a filter chip or an open dialog.

Checklist for every clip (all 31 existing clips were brought up to it on 23 Nov 2026):
- Contrast meets WCAG AA, 4.5:1 for small text. The lightest grey is `--faint` (#737373, as on the site); grey text on `--hover` uses `--soft` or darker.
- Key/value details put each label above its value with `.kv` in `shared/console.css`, never a label column beside a value column.
- Same page, same pixels (above), clicks above the player bar, and `render()` sets every element on every branch. `python3 motion/audit.py` checks the last two.
- Dropdowns use the drawn chevron (stroke 1.6, `--soft`, 14px) set 12px in from the right edge, with 36px of right padding so text never runs under it; never a ▾ character tight against the border. Use `<i class="cv"></i>` from `shared/console.css`. Open dropdown menus use the shared `.menu` panel (10px corners, one shadow, 7px 10px rows); a scene sets only its position, width and timing.
- Inline edits show visible Save and Cancel buttons, with Enter and Esc as shortcuts; the steps text covers the field name, announcements and where focus goes. To lift a low button while keeping the clamp, pass `clamp: <px>` (extra room past the bottom of the stage) instead of `false`.

Length: a clip runs as long as its action needs, up to 10 seconds for fewer than 5 steps and 15 for 5 or more. A short, simple clip isn't stretched to fill the cap: leave `duration` out and it runs at its natural length (`T.end`). Keep one steady framing per view rather than panning around a page, and keep the camera inside the window.

Set the length with `duration` in the scene's `Motion.scene({ ... })` call, and the clip is stretched to fit, with the end card kept at its own length. Time isn't stretched evenly: every click is slowed automatically so viewers see the cursor arrive, the press and what changed, and `slow: [[from, to, weight], ...]` lingers on other key moments (a tooltip, rows leaving a list). Ordinary moves get whatever time is left.

## Known gaps

Some patterns are rarely shown in public docs and have no screens yet: table density and expandable rows, empty tables, global admin search, undo toasts, settings save patterns, banners and announcements, and bulk-job progress.

## Versions

The header badge shows the current version. See [CHANGELOG.md](CHANGELOG.md) for what changed in each one; each version is also a git tag (`v0.1`, `v0.2`, `v0.2.1`, `v0.2.2`).

## Publishing

GitHub Pages, deployed from `main` / root.

## Versions and releases

The version lives in one place: the newest heading in `CHANGELOG.md`. The site's header badge shows it and links to `changelog.html`, which renders the changelog.

- **Major** (1.0, 2.0): changes to how patterns are found or cited, such as category names or URLs, and the public launch.
- **Minor** (0.3, 0.4): a new category, new patterns, or a new layout across the site.
- **Patch** (0.3.1): fixes, such as a re-rendered clip or a copy edit.
- *preview* means the work is on `v3-videos` and not public yet. It comes off at the merge to `main` (v1.0.0).

To release:

1. Add an entry at the top of `CHANGELOG.md` (`## vX.Y.Z preview — YYYY-MM-DD`, then Added / Changed / Fixed).
2. Run `python3 tools/stamp.py`. It writes the version into the badge and sets every cache key (`?v=` on scripts, styles, clips and posters) to a hash of the file, so only changed files are fetched again. `--check` reports anything out of date.
3. Commit, then tag: `git tag -a vX.Y.Z -m "vX.Y.Z"` and `git push origin vX.Y.Z`.

