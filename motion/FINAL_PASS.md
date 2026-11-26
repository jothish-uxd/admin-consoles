# Final consistency pass

Run once, before merging `v3-videos` into `main`. Every item is a console-wide change that needs every clip re-rendered, so they're batched into one pass (decided 25 Nov 2026).

## Checklist

- [ ] **Alerts bell in every clip.** Only the Notifications & alerts clips (and new clips from then on) have it. Add it to the shared builders (`shell.py`, `users_page.py`, `content_page.py`, `settings_page.py`, `sources_page.py`, the rest) and to the hand-made scenes with `_build/bell.py`, then check each clip for anything near the top right it could collide with: toasts, menus, cursor paths, camera framing.
- [ ] **End card says Enterprise Library.** Change the credit line in `shared/motion.js` from "Patterns for Enterprise Admin Consoles" (one place).
- [ ] **Search settings beside the Settings title.** New Settings clips have it (`settings_page.head(..., search=True)`); make it the default and rebuild the earlier Settings clips: Type to confirm, Danger zone, the Integrations & API keys clips, Multi-step wizard, and the Notifications & alerts clips on Settings.
- [ ] **Eyebrow headers.** Find every eyebrow (the small label above a heading, such as "Pattern 2 of 4" or a tier's "01") across the site and the clips, and remove the ones that only repeat what the heading or the page already says.
- [ ] **Compliance › Policies list.** *Create from template* shows an older, simpler list. Rebuild its list view from `_build/compliance_page.py` so it matches the Policies & rules clips.
- [ ] Add anything else that drifts between now and then here.

## Then

1. Run `audit.py` on every scene and check a still or two per clip.
2. Re-render every clip (about 40 minutes for ~75 clips).
3. Bump the cache-bust in `index.html` and `category.html`, and cache-bust the clip URLs in `data/videos.js`.
4. Update the preview artifact, then merge.
