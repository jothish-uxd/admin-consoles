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
        "The requester opens the resource catalog and chooses Request access on Death Star plans, a restricted archive she can't see yet.",
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
        "The admin opens her approvals. Six requests are pending, oldest first, each row showing who, what, why, how long it has waited and its risk.",
        "The oldest, from Ahsoka Tano, is marked Escalates in 3h.",
        "She ticks three low-risk requests for flight logs and supply manifests. A bar replaces the table header: 3 selected, low risk only.",
        "The high-risk rows can't be ticked. Pointing at one explains that high-risk requests are approved one at a time, from their row.",
        "She approves the three together. They're marked Approved and leave the list, the Pending count drops to 3, and a toast offers Undo.",
        "She approves Ahsoka's high-risk request from its own row. It leaves the list, and the toast confirms Ahsoka's request was approved, again with Undo."
      ]
    },
    "Review detail": {
      src: "media/access-requests/review-detail.mp4",
      poster: "media/access-requests/review-detail.jpg",
      label: "Review detail, shown in a mock Echo Base console",
      steps: [
        "The admin opens Bodhi Rook's request for Editor on shield generator telemetry. It's marked High risk in words, and a line confirms it isn't her own request or resource.",
        "Who's asking: Bodhi is a cargo pilot and contractor on Rogue One. His manager is Cassian Andor, and he has two Viewer grants today.",
        "What he'd get, in plain language: changing calibration and deleting readings for every shield sensor, with the permission code shown small. The risk is spelled out: a bad change can take the shield offline.",
        "Context: 1 of 6 on his team has Editor. A flag says this is unusual, since only 2 of 41 contractors have Editor on shield systems.",
        "She narrows the request: coolant sensors only, for 4 hours instead of 1 day. The summary marks it as changed and says Bodhi will see what she changed.",
        "A comment is required for high-risk approvals, so Approve stays disabled until she writes one. She approves with changes, and the decision record is saved to the audit log."
      ]
    }
  }
};
