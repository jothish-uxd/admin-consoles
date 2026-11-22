# Changelog

## v0.2.2 preview — 2026-11-21

### Changed
- **Sidebar A–Z** shows each category's number of patterns instead of screens (screen readers hear "5 patterns"). *By group* still shows screens.
- **Sidebar credit** is now two lines: **Patterns for Enterprise Admin Consoles**, then Jothish John · © 2026.

### Added
- **Pattern clips.** A short clip can sit above a pattern's card on the Patterns tab. The first one is *Access requests › Request access*: it starts on the access-denied page, asks what the person needs to do rather than which role, shows an example reason, confirms who the request was sent to and offers Follow up and Cancel request. It's a 15-second walkthrough in a mock Echo Base console that ends on a grey credit card, with small interaction sounds and no music. The end card is silent. It waits on its first frame with a play button and never starts on its own; A player bar runs along the bottom: play / pause, elapsed and total time, a timeline you can drag, click or step with the arrow keys, sound on / off and full screen. While a clip plays, the bar fades if the pointer rests and comes back on movement or keyboard focus. *What happens in this clip*, a collapsed grey accordion under the clip, lists the steps as text. When a clip ends, a grey end card shows the replay button with the credit (**Patterns for Enterprise Admin Consoles** / Jothish John · © 2026) centred in its lower half. Sound on / off is remembered in your browser. In every clip the signed-in user is Lavanya Sienna, with a Star Wars title that fits the scene (Jedi in training when she asks, Jedi Master when she approves).
- **Clips follow their cards.** Each clip shows the card's guidance and nothing that contradicts it; the scene file lists which card points each moment covers.
- **Clip length:** clips with fewer than 5 steps run 10 seconds, and those with 5 or more run 15, including the end card. The extra time goes to the moments that matter: every click, and key beats such as the high-risk tooltip, which the camera also zooms in on.
- **Access requests clips:** *Request access*, *Approval queue* (oldest-first queue, an escalation warning, bulk approval for low-risk requests only, a single high-risk approval from its row, and Undo), *Review detail* (who's asking, what they'd get in plain words, peer context and an unusual-request flag, narrowing scope and duration, a required comment, and the decision record) and *Time-bound access* (end times in local and relative time, a warning before expiry, a one-step extension that keeps the original reason, and automatic, logged revocation of a just-in-time grant) and *Access reviews* (a campaign with a deadline, progress and reminders, risky and unused access first, suggested decisions, keyboard shortcuts, automatic removals and saved audit evidence). Every Access requests & approvals pattern now has a clip.
- **AI governance clips:** *Feature availability* (every AI feature in one place with plain descriptions, status in words and adoption; new features off until turned on, with a heads-up banner; a pilot widened by group; what people see when it's off; an org-wide off switch).

## v0.2.1 preview — 2026-11-19

### Added
- **By group / A–Z switch** in the sidebar, under Overview. By group shows the six collapsible group sections; A–Z lists all 23 categories alphabetically. The choice is remembered in your browser.

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
- **Sidebar:** the Getting started heading is gone, and the credit read "Patterns for enterprise admin consoles, by Jothish John, © 2026".
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
