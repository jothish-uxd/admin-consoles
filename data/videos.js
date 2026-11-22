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
    },
    "Usage & cost": {
      src: "media/ai-governance/usage-cost.mp4",
      poster: "media/ai-governance/usage-cost.jpg",
      label: "Usage and cost, shown in a mock Echo Base console",
      steps: [
        "The admin opens AI usage for November: 4,120 of 6,000 credits used, 18,400 requests, and about 310 hours saved. Usage can be viewed by group or by feature, and exported for finance.",
        "A trend chart shows actual usage as a solid line and the forecast as a dashed line against the budget, each labelled. Under it, a summary in words: on track to use 5,900 of 6,000 credits by Nov 30.",
        "Groups are listed by credits, most first, with cost centres, requests, credits and how much of their budget they've used. Rogue One is at 99% and flagged with a spike: 3 times usual on Nov 20.",
        "She opens Rogue One's budget and raises it from 2,000 to 2,500 credits, keeping the alert at 80%.",
        "The panel says what happens at the limit: current tasks finish, then new requests pause, so nothing is cut off mid-task. It previews the message people see, including when requests resume.",
        "She saves. Rogue One now reads 79% of 2,500, and a message confirms the new budget."
      ]
    },
    "Content safety": {
      src: "media/ai-governance/content-safety.mp4",
      poster: "media/ai-governance/content-safety.jpg",
      label: "Content safety, shown in a mock Echo Base console",
      steps: [
        "The admin opens AI safety for the Outer Rim; the Core Worlds have their own settings. Built-in protections for harmful content and personal data are always on. They can't be turned off here, and changes need a request to support and are logged.",
        "Filter strength is Standard, and its effect is spelled out: Strict also holds back borderline answers.",
        "She adds Fleet movements to the blocked topics, next to Hyperdrive schematics and Base coordinates. AI won't answer about these, and says why.",
        "What people see updates to match: a calm message saying the answer was held back because it mentions fleet movements, and where to ask instead. Screen readers announce it when it appears.",
        "Reports from people are grouped by type with counts, newest first. She opens Blocked by mistake: Wedge Antilles asked for a supply drop's coordinates on Hoth, and the request matched Base coordinates.",
        "She excludes supply drops from that rule. The report is marked resolved and saved to the safety record, which can be exported."
      ]
    }
  },
  "asset-management": {
    "Asset library": {
      src: "media/asset-management/asset-library.mp4",
      poster: "media/asset-management/asset-library.jpg",
      label: "Asset library, shown in a mock Echo Base console",
      steps: [
        "The admin opens All content: one inventory of about 2.4M items, with no folders to dig through, and a note that the search index was updated 2 minutes ago.",
        "She can search by name, owner, type or tag and filter by owner, sharing, last modified and size. The list is a table, and every row shows owner, sharing and last activity.",
        "She opens the saved view Owner deactivated (112 items), then filters Sharing to Public link. That leaves 3 files from people who have left, still shared publicly.",
        "She switches to Grid. Cards show a file-type icon, the name, owner and sharing, with previews off by default. The icons are decorative, since the name sits right beside them, and the view switch works by keyboard.",
        "She exports the results. It runs in the background, and a message says the file will be sent when it's ready."
      ]
    },
    "Asset detail": {
      src: "media/asset-management/asset-detail.mp4",
      poster: "media/asset-management/asset-detail.jpg",
      label: "Asset detail, shown in a mock Echo Base console",
      steps: [
        "The admin opens Hoth patrol routes.xlsx, one of the files from the Asset library clip; the page title names it. A banner says why she's here: it's shared by public link and the owner is deactivated. A note says this is an admin view, the contents aren't opened, and her visit is logged.",
        "Details is a list of terms and values: owner (Biggs Darklighter, deactivated), location, size, created and modified dates, the Confidential label and versions.",
        "Access lists all 21 people by how they got in, in words: anyone with the link can view, the Rogue One group, inherited from the Red Squadron folder, and shared directly with Wedge. See everyone opens the full list.",
        "Activity shows the recent events: a download by someone outside Echo Base 2 hours ago, 14 views by link this week, and when the link was created. A link opens the audit log filtered to this file.",
        "Admin actions sit together, apart from any owner controls: change owner, remove external access, apply label, restore version. She chooses Remove external access, and the confirmation explains what happens: the link stops working outside Echo Base, people inside keep access, and the owner is told.",
        "She removes the link. Access now reads Public link removed, no outside access, and the removal appears at the top of Activity."
      ]
    },
    "Transfer ownership": {
      src: "media/asset-management/transfer-ownership.mp4",
      poster: "media/asset-management/transfer-ownership.jpg",
      label: "Transfer ownership, shown in a mock Echo Base console",
      steps: [
        "The admin starts from Biggs Darklighter's page in People, where his offboarding checklist shows what's done (account deactivated, signed out of all devices) and what's left. Delete account stays locked until his content is transferred.",
        "She chooses Transfer content. The page says why: Biggs left Red Squadron on Oct 14, and his deactivated account stays until the transfer finishes.",
        "Everything he owns moves in one go (1,284 items, 3.2 GB), or she could choose specific items. The new owner is filled in with his manager, Gen. Jan Dodonna, marked suggested. When she opens the list of people, Biggs himself can't be chosen because he's deactivated, and R2-D2 can't because external accounts can't own Echo Base content. Each says why.",
        "How it moves: sharing stays as it is, so 46 shared links and 12 groups keep working. Items go into a folder named From Biggs Darklighter, and Dodonna is told what he received. A mapping file can move many people at once.",
        "A summary shows what moves, from whom, to whom and where, with sharing unchanged. She starts the transfer, which runs in the background with a progress count that screen readers announce without moving focus.",
        "It finishes: 1,281 items moved, and 3 couldn't, with a link to see which and why. Dodonna has been sent a summary, and the transfer can be reassigned to someone else."
      ]
    },
    "Sharing controls": {
      src: "media/asset-management/sharing-controls.mp4",
      poster: "media/asset-management/sharing-controls.jpg",
      label: "Sharing controls, shown in a mock Echo Base console",
      steps: [
        "The admin opens Sharing in Content. A report shows what's shared outside Echo Base right now: 38 public links and 412 shares with partner domains.",
        "Who can receive shares is listed from most to least restrictive, each with a plain description and its level in words: Off, Allowed domains only (recommended), and Anyone with the link (not recommended). Anyone with the link is the current setting.",
        "She chooses Allowed domains only. Before anything changes, the page shows the impact: 38 existing public links will stop working outside partner domains, 412 partner shares aren't affected, and owners of the 38 are asked to confirm or remove them.",
        "She rolls it out over 14 days, so owners get notice, instead of applying it now. Partner domains can be imported as a list.",
        "External links expire after 30 days and need a password, and new links default to People in Echo Base, the narrowest useful setting. Exceptions by label and group sit alongside: when settings disagree, the most restrictive one wins.",
        "She saves, and a message confirms the rollout over 14 days and that the owners of the 38 links have been told."
      ]
    },
    "Versions & restore": {
      src: "media/asset-management/versions-restore.mp4",
      poster: "media/asset-management/versions-restore.jpg",
      label: "Versions and restore, shown in a mock Echo Base console",
      steps: [
        "The admin opens Hoth evacuation plan.docx, which shrank from 2.1 MB to 48 KB this morning, and switches to its Versions tab. The page can also restore a whole folder to a point in time.",
        "Each version is listed with its number, time, author and a short note, read together. The latest, by a sync bot, replaced 42 pages with an empty template. Versions are kept for 1 year, set by policy.",
        "She selects v11 from yesterday and compares it side by side with the current version: 1 empty page against 43 pages of routes and the gate schedule. 42 pages come back if she restores it.",
        "Restore v11 asks first, and explains that it becomes a new version, v13, while the current v12 stays in history, so the restore can be undone too.",
        "She restores. v13, restored from v11, is now current at the top, v12 is still listed below it, and the restore is logged with her name."
      ]
    },
    "Tags & metadata": {
      src: "media/asset-management/tags-metadata.mp4",
      poster: "media/asset-management/tags-metadata.jpg",
      label: "Tags and metadata, shown in a mock Echo Base console",
      steps: [
        "The admin is in Content, where files carry the tags Hoth, hoth and \"Hoth \" for the same thing, and switches to the Tags tab.",
        "Free tags are listed with how many items use each one; every tag has a text name, with a colour dot only as an extra cue. A notice says three tags look alike, and the trailing space is shown as text.",
        "She selects them and chooses Merge. Rename sits beside it; the unused tag old-ops, on 0 items, is the only one offered to retire.",
        "The merge dialog suggests keeping Hoth, the most used, and says 98 items move to it, the other two become synonyms so searches still find them, and the merge runs as a job across all items.",
        "She merges. Hoth now shows 1,338 items with its synonyms, and a message confirms the job is running and logged.",
        "Beside the tags, managed fields hold the vocabularies policies rely on, such as Classification and a Mission hierarchy, and an auto-tag rule shows 2 exceptions for her to review. Import taxonomy sits in the header."
      ]
    }
  },
  "audit-logs": {
    "Audit log table": {
      src: "media/audit-logs/audit-log-table.mp4",
      poster: "media/audit-logs/audit-log-table.jpg",
      label: "Audit log table, shown in a mock Echo Base console",
      steps: [
        "On Home, an Unusual activity card says an API key, archive-sync, failed 3 times to reach the Death Star plans archive. The admin opens the audit log from it.",
        "The log is a table with Time, Actor, Event, Target and Result columns. Each event is a short sentence, with its code in small text below; each actor shows its type, such as Admin, API key, Automation or System; and failures are written out as Failed, not shown by colour alone. A skip link lets keyboard users jump past the filters to the results.",
        "Times are absolute, in Pacific Time, and the zone is labelled. A time range of the last 24 hours is always set, and the log says it is showing 50 of 18,204 events, how to narrow them, and pages with Next 50.",
        "She hovers a time to see the exact moment, to the millisecond, with UTC beside it.",
        "She clicks archive-sync to filter by that actor. A filter chip appears, and the log narrows to its 4 events: a sign-in from a new IP address and the 3 failed attempts."
      ]
    },
    "Event detail": {
      src: "media/audit-logs/event-detail.mp4",
      poster: "media/audit-logs/event-detail.jpg",
      label: "Event detail, shown in a mock Echo Base console",
      steps: [
        "From the audit log filtered to archive-sync, the admin opens the failed download at 09:40:55.",
        "The event opens on a summary, with headings for Changes, Context and Related events. There were no changes, as it was a read attempt, and it says why it was blocked: the key's scopes don't include the archive.",
        "Context lists the IP address, a location new for this key, the user agent, the session and a request ID that also appears in the Storage service.",
        "Related events are grouped by the same actor, the same session and the same key. One shows that Toryn Farr changed the key's settings yesterday, and she opens it.",
        "The change shows a table of Field, Before and After, each marked with a text label: allowed IPs went from the Echo Base network to any IP address, the key no longer expires, and the secret was rotated without its value being shown.",
        "She switches from Summary to Raw JSON, which shows the event's schema version, audit.v3, with the secret redacted. Large bulk changes would appear as one event that links to the full list."
      ]
    },
    "Filters & saved views": {
      src: "media/audit-logs/filters-saved-views.mp4",
      poster: "media/audit-logs/filters-saved-views.jpg",
      label: "Filters and saved views, shown in a mock Echo Base console",
      steps: [
        "From an event, the admin goes back to the audit log. Her filters, the last 24 hours and the actor archive-sync, are still set and shown as chips.",
        "Quick filters for common checks, such as Failed sign-ins or API key changes, sit above detailed filters for time, actor, action, target, result and IP. The same filters appear as a query she can edit.",
        "She opens the time range. There is no All time option; a custom range labels its fields with the expected format, and ranges over 90 days run in the background with a notification when ready.",
        "She picks Last 7 days. The count changes to 9 events, 8 of them failed, and is announced to screen readers; older attempts on other folders appear.",
        "She saves the filters as a view named archive-sync investigation, shared with the 6 Security admins. Opening it later re-runs the query.",
        "A message confirms the view is saved and shared, and Copy link shares the investigation with its filters in the link."
      ]
    }
  }
};
