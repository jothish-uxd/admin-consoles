# Changelog

## v0.2 preview — 2026-11-17

### Added
- **Header search** on every page (⌘K). Finds the 23 categories and the 116 patterns by name, shown as two groups. Choosing a category opens its page; choosing a pattern opens it on the Patterns tab. Collapses to a search button on narrow screens and at high zoom.
- **Screen sheet.** Screenshots open in a side sheet (90% of the window) with the details on the left, the image on the right, a Group › Category › Pattern title, previous / next and a link to the source page.
- **Pattern chips.** The Patterns tab shows one chip per pattern, with a dropdown when space is narrow, and previous / next under the selected pattern.

### Changed
- **Pattern card layout:** *How to think about it* first, then a 2×2 of *Recommended*, *Avoid*, *At enterprise scale* and *Accessibility*, with *Universal design* across the bottom. Example screenshots were removed from the card, since they're on the Screens tab.
- **Do / Don't** is now **Recommended / Avoid**.
- **Category tabs** are now Patterns, Screens, Scale, and each category opens on Patterns. Links ending in `#scale` still work.
- **Scale tab:** a cool-grey tier ramp with dark-mode colours. *Principles that hold at every size* now has the same heading level as *Designing for scale*.
- **Overview hero:** "Patterns for enterprise admin consoles." Stats read categories, patterns and screenshots collected.
- **Sidebar:** the Getting started heading is gone, and the credit reads "Patterns for enterprise admin consoles, by Jothish John, © 2026".
- **Category page eyebrow** (group · patterns · screens) removed, because its counts read as belonging to the group.

### Removed
- **Overview search.** The header search replaces it; the group filter chips stay.

### Fixed
- **Creation flows:** replaced the 3 Cloudflare screenshots whose images stopped loading with Datadog, Miro and GitHub examples.

## v0.1 preview — 2026-10-29

First public version.
- 23 categories in 6 groups, 116 patterns with guidance on usability, accessibility (WCAG 2.2 and the 7 Principles of Universal Design) and enterprise scale.
- About 300 screenshots from public vendor documentation, each credited and linked to its source.
- Overview gallery with wireframe thumbnails, a collapsible sidebar, light and dark themes.
