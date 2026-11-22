/* Short pattern clips, shown above the pattern card on the Patterns tab.
   Keyed by category slug, then pattern name (must match data/categories.js).
   Clips are made from motion/<name>/scene.html with motion/render.py.
   `steps` is the text alternative: what happens in the clip, in order. */
window.VIDEOS = {
  "access-requests": {
    "Request access": {
      src: "media/access-requests/request-access.mp4",
      poster: "media/access-requests/request-access.jpg",
      label: "Request access, shown in a mock Echo Base console",
      steps: [
        "Lavanya Sienna, a Jedi in training, opens the resource catalog and chooses Request access on Death Star plans, a restricted archive she can't see yet.",
        "A side panel opens on the same page. She picks Viewer, the least-privilege option, and 7 days, so access ends on its own.",
        "She types why she needs it. The panel already says who will review it: Gen. Jan Dodonna, the resource owner, who usually replies within 2 hours.",
        "After she submits, the panel shows the request's progress: submitted, owner review, access granted.",
        "Dodonna approves. Back in the catalog, the row now reads Viewer · 7 days."
      ]
    }
  }
};
