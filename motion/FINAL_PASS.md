# Final consistency pass

Run once, before merging `v3-videos` into `main`. Every item is a console-wide change that needs every clip re-rendered, so they're batched into one pass (decided 25 Nov 2026).

## Checklist

- [ ] **Alerts bell in every clip.** Only the Notifications & alerts clips (and new clips from then on) have it. Add it to the shared builders (`shell.py`, `users_page.py`, `content_page.py`, `settings_page.py`, `sources_page.py`, the rest) and to the hand-made scenes with `_build/bell.py`, then check each clip for anything near the top right it could collide with: toasts, menus, cursor paths, camera framing.
- [ ] **End card reads "Patterns for Enterprise Workflows".** Decided 27 Nov 2026: keep the end card. First row: **Patterns for Enterprise Workflows**; second row: Jothish John · © 2026. Set in `shared/motion.js` (`CREDIT`, one place); every existing clip still shows the old "Patterns for Enterprise Admin Consoles" until it is re-rendered. The sizzle reel's end card is separate (`motion/_sizzle/sizzle.html`).
- [ ] **Search settings beside the Settings title.** New Settings clips have it (`settings_page.head(..., search=True)`); make it the default and rebuild the earlier Settings clips: Type to confirm, Danger zone, the Integrations & API keys clips, Multi-step wizard, and the Notifications & alerts clips on Settings.
- [ ] **Eyebrow headers.** Find every eyebrow (the small label above a heading, such as "Pattern 2 of 4" or a tier's "01") across the site and the clips, and remove the ones that only repeat what the heading or the page already says.
- [ ] **Compliance › Policies list.** *Create from template* shows an older, simpler list. Rebuild its list view from `_build/compliance_page.py` so it matches the Policies & rules clips.
- [ ] **Global search in the top bar.** Only *Global admin search* has Search Echo Base ⌘K in the top bar (added in `_build/global_search.py`, before the bell). Move it into the shared top bar (`shell.py`, `content_page.py` and the hand-made scenes) so every clip has it, and check it doesn't collide with crumbs, toasts or camera framing.
- [ ] **People tabs.** The Security & identity clips show People with Users, Groups, Roles, Sign-in & security and Devices (`_build/security_page.py`). Give the same five tabs to the earlier People clips: `users_page.py`, `roles_page.py`, the Groups clips and the hand-made People scenes.
- [ ] **Users table toolbar.** The Tables & data grids clips show People › Users with Columns and Density buttons, a pager beside the count, sortable headers, and an expand button and ⋯ on each row (`_build/tables_page.py`). Give the Edit & bulk actions clips (`users_page.py`: Selection model, Contextual action bar, Bulk edit, Progress & results) the same table.
- [ ] **Toasts centred on the window.** Toasts used to sit at `left: 700px` (the centre of the content area), which reads as off-centre in the top bar. The shared builders now use `left: 600px`, the window's centre (`shell.py`, `tables_page.py`, `bulk_edit.py`, `danger_zone.py`, `undo_toast.py`, `type_to_confirm.py`). Reports and Recommendations are already re-rendered; the rest move when every clip is rebuilt. Check hand-made scenes for `left: 700px` too.
- [ ] **Modals centred.** Every modal dialog, in the clips and in the prototype, sits in the middle of the window, both horizontally and vertically. Several are pinned near the top or left of centre, for example Invite people in *Invite / add user*. Check each `.dlg` / `.dl` / `section[role=dialog]` position (side drawers stay on the right).
- [ ] **Labels above values.** In every key/value pair, in the clips and in the prototype, the label sits on its own line above the value (stacked pairs), never label-left / value-right with a gap between. Look for `dl` grids and rows with a fixed label column (`grid-template-columns: <n>px 1fr`). Fixed so far: *Create from template*, *Transfer ownership*, *Export & SIEM streaming*, *Multi-step wizard* (v0.3.4). Still to check: the change list in *Health & revoking* and the tool groups in the MCP connectors clips.
- [ ] Add anything else that drifts between now and then here.


## Progress

Done, category by category in A–Z order: the first 16 (Access requests & approvals through Org settings) have every item above, as of v0.3.6. The rest get them batch by batch, five categories at a time, with the whole checklist each time. The engine now adds the top-bar search, the bell and the five People tabs to every clip, and `settings_page.head` and `settings_org.py` add Search settings, so most items need only a re-render. The prototype's dialogs are centred (proto.css).

## Then

1. Run `audit.py` on every scene and check a still or two per clip.
2. Re-render every clip (about 40 minutes for ~75 clips).
3. Bump the cache-bust in `index.html` and `category.html`, and cache-bust the clip URLs in `data/videos.js`.
4. Update the preview artifact, then merge.
