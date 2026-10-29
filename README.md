# Admin Consoles

A personal pattern library of admin console UIs — like Mobbin, but just for me and just for admin work. Screens are grouped by the job the admin is doing (adding users, deleting things, setting policy) rather than by product.

Static site, no build step. Open `index.html` or serve the folder.

## Design

Mirrors the Enterprise Library docs: white page, Geist and Geist Mono, hairline rules instead of boxes, and a light sidebar with collapsible sections (icon, label, chevron; open/closed is remembered per browser). Only screenshots sit in framed containers. Light and dark themes, reduced motion and Windows High Contrast are respected.

## Structure

```
index.html            App shell: home view + category views (?c=slug)
                      Home: all categories, search (⌘K / Ctrl+K to focus), group filters
category.html         Alias of index.html, kept so older links work
data/categories.js    Groups, categories, patterns and screen entries
data/guidance*.js     Per-pattern guidance: think, do, dont, accessibility, scale (one file per group)
assets/               Styles, app script, monochrome wireframe thumbnails
screens/<slug>/       Screenshot images, one folder per category
```

## Adding a screenshot

1. Put the image in `screens/<category-slug>/`.
2. Add an entry to that category's `screens` array in `data/categories.js`:

```js
{
  src: "screens/user-management/okta-add-person.png",
  product: "Okta",
  title: "Add person modal",
  pattern: "Invite / add user",   // match one of the category's patterns
  notes: "Activation choice lives inline.",
  source: "https://..."           // optional
}
```

Counts on the home page and sidebar update automatically.

## Pattern guidance

Each category page has three tabs. **Scale** shows how the category changes from tens to hundreds of thousands of users (a grey-to-black tier ramp) plus principles that hold at every size. **Patterns** has one accordion per pattern; an open pattern's content sits in a nested card with:

- How to think about it
- Do / Don't
- Accessibility & universal design, tagged with WCAG 2.2 success criteria (linked to W3C Understanding docs) or the 7 Principles of Universal Design
- At enterprise scale

Guidance lives in `data/guidance.js`, keyed by category slug and pattern name. Patterns without guidance show "No guidance yet".

Deep links: `?c=user-management#scale`, `#patterns`, `#screens`, or a single pattern such as `#p-offboarding`. Views swap in place, so the sidebar never reloads.

## Publishing

Settings → Pages → Deploy from branch → `main` / root.
