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
        "The requester follows a link to the Death Star plans archive and lands on an access-denied page. It says who owns the archive and who reviews requests, Gen. Jan Dodonna, usually within 2 hours, with Request access right there.",
        "Request access opens one short form in place. The archive and her name are already filled in.",
        "It asks what she needs to do, not which role she wants. She picks Read and download, and 7 days, so access ends on its own.",
        "She writes a one-line reason. An example of a good one sits under the field: Prepping the Yavin briefing on Friday.",
        "After she sends it, the page confirms Request sent to Gen. Jan Dodonna (screen readers announce it too) and shows the request's progress, with Follow up and Cancel request.",
        "Dodonna approves. The page now says You have access, until Fri Nov 28, with Open the archive."
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
    },
    "Time-bound access": {
      src: "media/access-requests/time-bound-access.mp4",
      poster: "media/access-requests/time-bound-access.jpg",
      label: "Time-bound access, shown in a mock Echo Base console",
      steps: [
        "The requester opens My access. Every grant shows when it ends in her own time zone, as a time and as a relative time, such as Today, 18:00 · in 30 min. Only an internal resource has no end date.",
        "A banner warns her that her access to Death Star plans ends in 30 minutes, with Extend right there.",
        "Extend opens one short request. She picks 1 day from the presets (1 hour, 1 day, 1 week or a custom date), and the new end is spelled out: tomorrow, Sun Nov 22, 18:00, in 1 day.",
        "Her original reason is already filled in, and the request goes to the person who approved it the first time.",
        "Gen. Dodonna approves. The row now reads Tomorrow, 18:00 · in 1 day, marked extended, and the warning goes away.",
        "Her one-hour just-in-time Editor grant on Hangar 3 schedules counts down to zero, is revoked automatically and is logged."
      ]
    },
    "Access reviews": {
      src: "media/access-requests/access-reviews.mp4",
      poster: "media/access-requests/access-reviews.jpg",
      label: "Access reviews, shown in a mock Echo Base console",
      steps: [
        "The admin opens the Q4 access review for the Rebel Intelligence archives. It's due Fri Dec 5, 14 days away, it was assigned to her as the resource owner, a reminder went out Nov 19, and 38 of 52 grants are reviewed. Campaigns like this one are scheduled to recur.",
        "Risky and unused access comes first, in a Start here group of 3. The 11 people who used their access in the last 30 days sit below, collapsed, with a suggestion to keep.",
        "Each row is a table row with headers for person, access, last used, why it's flagged and decision, and carries a suggestion such as Not used in 90 days, suggested: remove.",
        "She works by keyboard, following the legend (arrow keys to move, K keep, R remove, S skip): R removes Biggs, R removes Porkins, and K keeps K-2SO, who is unusual for the team but used the keys 3 days ago.",
        "There's no Approve all. She submits her 3 decisions.",
        "Removals are applied automatically, progress moves to 41 of 52, and the decisions are saved to the audit evidence, ready to export."
      ]
    }
  },
  "ai-governance": {
    "Feature availability": {
      src: "media/ai-governance/feature-availability.mp4",
      poster: "media/ai-governance/feature-availability.jpg",
      label: "Feature availability, shown in a mock Echo Base console",
      steps: [
        "The admin opens AI features, its own item in the admin menu. Every AI feature is listed in one place, each with its own control, and a Turn off all AI switch sits in the header for incidents.",
        "The default for new features is off until she turns them on, applied across all regions. A banner says Droid summaries arrives Dec 2 and stays off until she turns it on.",
        "Each row says what the feature does in plain language, its status in words (such as On for 4 groups or Pilot · 1 group) and its adoption (62% active, 7 of 8 using).",
        "She opens Briefing summaries, piloted by Rogue One, and adds Red Squadron under Selected groups. The status updates to On for 2 groups · 20 people.",
        "The panel shows what people without the feature see: it isn't on for their team, the full briefing is still there, and they can ask their admin.",
        "She saves. The row now reads On for 2 groups · 20 people, and a message confirms Briefing summaries is on for Red Squadron."
      ]
    },
    "Data usage controls": {
      src: "media/ai-governance/data-usage-controls.mp4",
      poster: "media/ai-governance/data-usage-controls.jpg",
      label: "Data usage controls, shown in a mock Echo Base console",
      steps: [
        "The admin opens AI data use. It leads with three direct answers: not used to train models, kept for 30 days then deleted, and processed in your region (Yavin for the Outer Rim).",
        "Below them: a link to the AI data processing terms that names the document (PDF, 6 pages), a note that the terms last changed Oct 2 with 30 days' notice, and that AI uses only content the person can open.",
        "She sets AI prompts and answers to be kept for 7 days. The consequence appears in plain words: they're deleted after 7 days, and people won't see older AI history.",
        "She adds Personnel files to the labels that are never sent to AI, next to Top secret and Medical. Every AI feature skips content with these labels.",
        "Processing location is set per region: Coruscant for the Core Worlds, Yavin for the Outer Rim.",
        "She saves. The Kept for answer updates to 7 days, a message confirms it, and the change is logged with who made it."
      ]
    },
    "Model & provider settings": {
      src: "media/ai-governance/model-provider-settings.mp4",
      poster: "media/ai-governance/model-provider-settings.jpg",
      label: "Model and provider settings, shown in a mock Echo Base console",
      steps: [
        "The admin opens AI models. Recommended models is the default: models are chosen and updated for her, with 30 days' notice of any change, so most teams never need to pick one.",
        "A banner announces ahead of time that Archivist Large v4.2 is replaced by v5 on Jan 15, with the same data location.",
        "She switches to Choose approved models for the Outer Rim. A comparison table lists each model with a plain description and its version, provider, the features it powers, speed, quality, cost and where data is processed.",
        "Holocron Open processes data in the Mid Rim, outside her region. She unticks it, and the page says what changes: Holonet search assist moves to Astromech Fast, and data stays in Yavin.",
        "She saves. The change is logged with who made it, and every AI answer records which model produced it."
      ]
    }
  }
};
