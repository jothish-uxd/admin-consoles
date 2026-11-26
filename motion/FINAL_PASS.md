# Final consistency pass

Run once, before merging `v3-videos` into `main`. Every item is a console-wide change that needs every clip re-rendered, so they're batched into one pass (decided 25 Nov 2026).

## Checklist

- [ ] **Alerts bell in every clip.** Only the Notifications & alerts clips (and new clips from then on) have it. Add it to the shared builders (`shell.py`, `users_page.py`, `content_page.py`, `settings_page.py`, `sources_page.py`, the rest) and to the hand-made scenes with `_build/bell.py`, then check each clip for anything near the top right it could collide with: toasts, menus, cursor paths, camera framing.
- [ ] **End card says Enterprise Library.** Change the credit line in `shared/motion.js` from "Patterns for Enterprise Admin Consoles" (one place).
- [ ] Add anything else that drifts between now and then here.

## Then

1. Run `audit.py` on every scene and check a still or two per clip.
2. Re-render every clip (about 40 minutes for ~75 clips).
3. Bump the cache-bust in `index.html` and `category.html`, and cache-bust the clip URLs in `data/videos.js`.
4. Update the preview artifact, then merge.
