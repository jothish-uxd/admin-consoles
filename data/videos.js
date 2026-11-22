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
    },
    "Approval queue": {
      src: "media/access-requests/approval-queue.mp4",
      poster: "media/access-requests/approval-queue.jpg",
      label: "Approval queue, shown in a mock Echo Base console",
      steps: [
        "Lavanya Sienna, a Jedi Master, opens her approvals. Six requests are pending, oldest first, each row showing who, what, why, how long it has waited and its risk.",
        "The oldest, from Ahsoka Tano, is marked Escalates in 3h.",
        "She ticks three low-risk requests for flight logs and supply manifests. A bar replaces the table header: 3 selected, low risk only.",
        "The high-risk rows can't be ticked. Pointing at one explains that high-risk requests are approved one at a time, from their row.",
        "She approves the three together. They're marked Approved and leave the list, the Pending count drops to 3, and a toast offers Undo.",
        "She approves Ahsoka's high-risk request from its own row. It leaves the list, and the toast confirms Ahsoka's request was approved, again with Undo."
      ]
    }
  }
};
