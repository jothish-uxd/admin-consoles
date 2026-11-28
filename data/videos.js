/* Short pattern clips, shown above the pattern card on the Patterns tab.
   Keyed by category slug, then pattern name (must match data/categories.js).
   Clips are made from motion/<name>/scene.html with motion/render.py.
   `steps` is the text alternative: what happens in the clip, in order. */
window.VIDEOS = {
  "access-requests": {
    "Request access": {
      src: "media/access-requests/request-access.mp4?v=1a848edd",
      poster: "media/access-requests/request-access.jpg?v=c16fbdc1",
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
      src: "media/access-requests/approval-queue.mp4?v=b0f4c567",
      poster: "media/access-requests/approval-queue.jpg?v=af8e9a17",
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
      src: "media/access-requests/review-detail.mp4?v=914ff949",
      poster: "media/access-requests/review-detail.jpg?v=3b165233",
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
      src: "media/access-requests/time-bound-access.mp4?v=f347651d",
      poster: "media/access-requests/time-bound-access.jpg?v=fb76f00c",
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
      src: "media/access-requests/access-reviews.mp4?v=41dd3191",
      poster: "media/access-requests/access-reviews.jpg?v=6c39ad5d",
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
      src: "media/ai-governance/feature-availability.mp4?v=93505af1",
      poster: "media/ai-governance/feature-availability.jpg?v=eed7ec60",
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
      src: "media/ai-governance/data-usage-controls.mp4?v=60a80a51",
      poster: "media/ai-governance/data-usage-controls.jpg?v=6c209b9d",
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
      src: "media/ai-governance/model-provider-settings.mp4?v=b061e887",
      poster: "media/ai-governance/model-provider-settings.jpg?v=15131009",
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
      src: "media/ai-governance/usage-cost.mp4?v=0696ae3f",
      poster: "media/ai-governance/usage-cost.jpg?v=f0d9b1a2",
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
      src: "media/ai-governance/content-safety.mp4?v=39a3388e",
      poster: "media/ai-governance/content-safety.jpg?v=afaa986d",
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
      src: "media/asset-management/asset-library.mp4?v=1198e518",
      poster: "media/asset-management/asset-library.jpg?v=6b768926",
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
      src: "media/asset-management/asset-detail.mp4?v=f65b7fe6",
      poster: "media/asset-management/asset-detail.jpg?v=9c38b388",
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
      src: "media/asset-management/transfer-ownership.mp4?v=d6a7808a",
      poster: "media/asset-management/transfer-ownership.jpg?v=54093c90",
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
      src: "media/asset-management/sharing-controls.mp4?v=cd417ac3",
      poster: "media/asset-management/sharing-controls.jpg?v=e5699ab6",
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
      src: "media/asset-management/versions-restore.mp4?v=28feb7d1",
      poster: "media/asset-management/versions-restore.jpg?v=bd0af351",
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
      src: "media/asset-management/tags-metadata.mp4?v=4055f288",
      poster: "media/asset-management/tags-metadata.jpg?v=320463a8",
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
      src: "media/audit-logs/audit-log-table.mp4?v=619967ba",
      poster: "media/audit-logs/audit-log-table.jpg?v=1afc5022",
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
      src: "media/audit-logs/event-detail.mp4?v=790e7f9a",
      poster: "media/audit-logs/event-detail.jpg?v=e9197656",
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
      src: "media/audit-logs/filters-saved-views.mp4?v=916f45ae",
      poster: "media/audit-logs/filters-saved-views.jpg?v=4afd6a59",
      label: "Filters and saved views, shown in a mock Echo Base console",
      steps: [
        "From an event, the admin goes back to the audit log. Her filters, the last 24 hours and the actor archive-sync, are still set and shown as chips.",
        "Quick filters for common checks, such as Failed sign-ins or API key changes, sit above detailed filters for time, actor, action, target, result and IP. The same filters appear as a query she can edit.",
        "She opens the time range. There is no All time option; a custom range labels its fields with the expected format, and ranges over 90 days run in the background with a notification when ready.",
        "She picks Last 7 days. The count changes to 9 events, 8 of them failed, and is announced to screen readers; older attempts on other folders appear.",
        "She saves the filters as a view named archive-sync investigation, shared with the 6 Security admins. Opening it later re-runs the query.",
        "A message confirms the view is saved and shared, and Copy link shares the investigation with its filters in the link."
      ]
    },
    "Export & SIEM streaming": {
      src: "media/audit-logs/export-siem-streaming.mp4?v=2e734d19",
      poster: "media/audit-logs/export-siem-streaming.jpg?v=c7c0964b",
      label: "Export and SIEM streaming, shown in a mock Echo Base console",
      steps: [
        "From the saved view, the admin chooses Export. The dialog uses the view's filters, 9 events over the last 7 days, and offers CSV or JSON. Events come ordered by time in a documented, versioned schema, and ranges over 100,000 events run as a job.",
        "Full-log export is limited to Security admins, which she is. She exports JSON, and a message confirms the export and that it was logged.",
        "She opens the Streaming tab. Streams can go to Splunk, Microsoft Sentinel, Datadog, Amazon S3 or a webhook. The Security SIEM stream to Splunk is Healthy, with its last event delivered 4 seconds ago.",
        "The Amazon S3 archive stream is Delayed, in words and with an icon: events are delayed by 14 minutes because the bucket rejected writes at 09:26, and 38,210 events are buffered and retried, none dropped.",
        "The stream sends only failed and admin events, to keep volume and cost down, and its settings say what each field expects, such as the bucket name without an s3:// prefix.",
        "She chooses Replay now. The stream catches up from 09:26 in order, then shows Healthy again, and the replay is logged like every export and stream change."
      ]
    },
    "Alerts on events": {
      src: "media/audit-logs/alerts-on-events.mp4?v=1f4d075c",
      poster: "media/audit-logs/alerts-on-events.jpg?v=dd5330f3",
      label: "Alerts on events, shown in a mock Echo Base console",
      steps: [
        "The admin opens the Alerts tab of the audit log. Built-in alerts cover high-risk events, such as admin role grants and mass deletion, each with a threshold.",
        "A noisy built-in alert, New sign-in location, is muted, and the record says who muted it, when, why and until when.",
        "She creates a new alert from the saved view archive-sync investigation. It fires when 3 or more failed events happen within 10 minutes, with an example of what would and wouldn't trigger it.",
        "It sends to email, chat and PagerDuty, routed to Echo Base admins, and each alert says what happened, who and when, with a link to the events. It is checked on the live stream within seconds, and repeats within an hour join one incident.",
        "She creates it, and a message confirms it is live and logged. The new alert appears at the top of the list.",
        "Alert history shows its first alert as a sentence, archive-sync failed 3 times to reach the archive between 09:40 and 09:41, with a link to the 3 events, grouped into one incident. In-product alert banners stay until dismissed."
      ]
    }
  },
  "billing-licenses": {
    "Plan overview": {
      src: "media/billing-licenses/plan-overview.mp4?v=09c61472",
      poster: "media/billing-licenses/plan-overview.jpg?v=3acb2226",
      label: "Plan overview, shown in a mock Echo Base console",
      steps: [
        "From Home, the admin opens Billing. The plan, Rebel Alliance Business, is shown as labelled details: $18 per seat per month, billed annually, in USD and excluding tax, with the billing period and the Visa card it is paid with.",
        "Renewal is stated in words and a date: it renews automatically on 1 March 2027 for $54,000 a year, and auto-renew can be turned off or the plan cancelled any time before 1 February 2027.",
        "Seats are shown by product with numbers on each bar: 246 of 250 Console seats assigned, and 64 of 80 for the AI add-on.",
        "What's included is listed, with one plain line on what Enterprise adds and a link to compare plans. A contract switcher covers the org's 2 contracts.",
        "She switches Cost to By department, which splits the yearly cost across Operations, Fleet, Intelligence and Engineering for chargeback. Mon Mothma from Finance has view-only access."
      ]
    },
    "Seat assignment": {
      src: "media/billing-licenses/seat-assignment.mp4?v=94dfdc34",
      poster: "media/billing-licenses/seat-assignment.jpg?v=863ca7a9",
      label: "Seat assignment, shown in a mock Echo Base console",
      steps: [
        "From the plan, the admin opens Manage seats. The seat count, 246 of 250, matches the plan, and the page explains that when seats are full, new people join as viewers until more are added.",
        "A table lists each person, their license, whether a group or an individual assignment gave it to them, and when they were last active. Most licenses follow groups such as Rogue Squadron and Fleet, and licenses are reclaimed automatically when someone leaves.",
        "She filters to people inactive for 60 days or more: 14 people.",
        "She chooses Reclaim 14 licenses. The confirmation says each person is emailed today and keeps access until 29 November, their files, settings and history are kept, and the change can be undone for 30 days.",
        "She reclaims them. A message, also announced to screen readers, confirms 14 licenses reclaimed with an Undo link.",
        "The count drops to 232 of 250, and each person's status shows the date their access ends."
      ]
    },
    "Add seats": {
      src: "media/billing-licenses/add-seats.mp4?v=4acbc57b",
      poster: "media/billing-licenses/add-seats.jpg?v=28bb9fb2",
      label: "Add seats, shown in a mock Echo Base console",
      steps: [
        "A Rogue One pilot needs 38 seats, and 18 are available. The admin chooses Add seats.",
        "She types 20 in the labelled Seats to add field. Next to it, the price updates as she types, and is read out: $216 a year per seat, $1,171.73 today for the 99 days left in this term, then $58,320 a year from 1 March 2027.",
        "Nothing extra is pre-selected: the AI add-on is shown as not added. Purchases over $5,000 need finance approval, new hires can go 5% over until the next true-up, and anyone who can't pay by card can request a quote or pay by purchase order.",
        "She chooses Review. The review repeats the seats, the amount charged today to the Visa card, the yearly total after renewal, and says nothing is charged until she buys.",
        "She buys 20 seats for $1,171.73.",
        "A message confirms the receipt went to the billing contacts, and the seat count changes straight away to 232 of 270, with 38 available for the pilot."
      ]
    },
    "Invoices & payment": {
      src: "media/billing-licenses/invoices-payment.mp4?v=69deea31",
      poster: "media/billing-licenses/invoices-payment.jpg?v=2d44d7df",
      label: "Invoices and payment, shown in a mock Echo Base console",
      steps: [
        "The admin opens the Invoices tab. A banner warns, well before renewal, that the Visa card ending 4417 expires on 31 December, and that if a payment fails, access continues for 14 days while billing retries and emails the billing contacts.",
        "Invoices are a table of date, invoice, amount and status, with status written out as Paid or Refunded. Each download link names its invoice, such as Download invoice for 22 Nov 2026, the seats she just bought.",
        "Billing details hold the billing entity, one of two, the address, the tax ID, a PO number added to every invoice and the billing contacts. Invoices are also emailed and synced to the finance system, with full history since 2024 in two currencies.",
        "She chooses Update card and enters a new card. Only the last 4 digits are shown.",
        "She saves it. The warning goes away, the payment method shows Visa ending 0921, and a message confirms the billing contacts were notified and the change was logged."
      ]
    }
  },
  "creation-flows": {
    "Create modal": {
      src: "media/creation-flows/create-modal.mp4?v=3e14cccc",
      poster: "media/creation-flows/create-modal.jpg?v=91e2c0a6",
      label: "Create modal, shown in a mock Echo Base console",
      steps: [
        "In People / Groups, the admin chooses New group for the Rogue One pilot. A small modal titled New group opens over the list, with three fields: Name, an optional Description and Owner. Focus moves into the modal, Esc closes it, and at high zoom it fills the screen.",
        "She types Rogue Squadron. The name is checked against existing groups as she types, and an error under the field says a group with that name already exists.",
        "She edits the name to Rogue One pilot. Nothing else she entered is lost, and the field confirms the name is available.",
        "Create group is the last button, after Cancel, with Create another beside it for adding several. Clicking outside or pressing Esc on a partly filled modal would ask before discarding it.",
        "She creates it. The button shows Creating… and is disabled while saving, so it can't be submitted twice. The modal closes, focus returns, and the new group is highlighted at the top of the list with a confirmation."
      ]
    },
    "Multi-step wizard": {
      src: "media/creation-flows/multi-step-wizard.mp4?v=d469013b",
      poster: "media/creation-flows/multi-step-wizard.jpg?v=df8ad54d",
      label: "Multi-step wizard, shown in a mock Echo Base console",
      steps: [
        "In Settings / Integrations, Holonet Ledger shows Setup in progress: a draft Toryn Farr saved and shared, with 1 of 4 steps done. The admin chooses Continue setup.",
        "The stepper shows Connect as done, Permissions as current, Sync as optional and Review not yet reachable, and says Step 2 of 4 in text. Each step has a heading, and focus moves to it when the step changes.",
        "The step asks one question, what Holonet Ledger can see. The Ledger account from step 1 is shown rather than asked again. She picks Invoices and seat counts and continues.",
        "Sync is marked optional, so she skips it and keeps the default, every hour.",
        "Review summarises each step with an Edit link, checks the live connection and permissions, and says what will happen: invoices and seat counts sync every hour, starting now. The configuration can be exported.",
        "She connects it. Holonet Ledger shows Connected and syncing, and a message, also announced, confirms the first sync is running."
      ]
    },
    "Create from template": {
      src: "media/creation-flows/create-from-template.mp4?v=5e8c2085",
      poster: "media/creation-flows/create-from-template.jpg?v=e6f28179",
      label: "Create from template, shown in a mock Echo Base console",
      steps: [
        "In Compliance / Policies, the admin chooses New policy. Templates are split into Echo Base's own and built-in ones, with search, and Start blank is an equal choice.",
        "Each org template shows its owner and version, and Restricted data handling is marked as required for Restricted folders.",
        "She picks it. A text preview lists exactly what it sets: Restricted classification, internal-only sharing, external links off and 7-year retention.",
        "Before creating, she names the policy Death Star plans · restricted and changes the access review from every 90 days to every 30.",
        "She chooses Use Restricted data handling, a button that names the template.",
        "The new policy records that it came from Restricted data handling v3 and that her review change differs from it. Later template changes won't update it silently: she'll be told about new versions and can review the differences."
      ]
    },
    "Inline create": {
      src: "media/creation-flows/inline-create.mp4?v=2da1e6dc",
      poster: "media/creation-flows/inline-create.jpg?v=513db6a8",
      label: "Inline create, shown in a mock Echo Base console",
      steps: [
        "On the Tags page, the admin chooses Add tag. A new row appears at the top of the table, focused and ready to type, with visible Save and Cancel buttons and a hint that Enter and Esc work too. The field is named, the hint is linked to it, and everything works by keyboard.",
        "She types rogue-one. Typing doesn't save anything or move focus.",
        "She chooses Save. The row shows Saving…, then Saved, and the result is announced to screen readers without moving focus.",
        "The new tag stays pinned at the top, marked New, instead of jumping to its place in the sorted list.",
        "She adds another, types Hoth and presses Enter. The server finds that Hoth already exists, and the row shows the error, linked to the field, with an offer to use the existing tag, keeping what she typed. She chooses Cancel, which works even when a screen reader holds on to Esc, and focus returns to Add tag.",
        "Anything bigger than a tag has a full form instead: a link offers New managed field for controlled lists."
      ]
    },
    "Duplicate / clone": {
      src: "media/creation-flows/duplicate-clone.mp4?v=68e7b81f",
      poster: "media/creation-flows/duplicate-clone.jpg?v=9543e32f",
      label: "Duplicate and clone, shown in a mock Echo Base console",
      steps: [
        "In People / Roles, the admin opens the menu on Content admin and chooses Duplicate. The product uses the same word, Duplicate, in the menu, the title and the button.",
        "The dialog focuses the name field with Copy of Content admin selected, and she renames it Content admin · Rogue One.",
        "Each thing to copy has a label and a short explanation. Permissions and scope are copied; members are off by default, because copying members would give them this role too.",
        "A note says API keys, tokens and audit history are never copied. A link offers duplicating to several teams at once.",
        "She chooses Duplicate role. The copy opens ready to edit, marked Duplicated from Content admin so it can't be mistaken for the original.",
        "It has no members yet, and the page says so, with a button to add the Rogue One pilot group."
      ]
    },
    "Success & next steps": {
      src: "media/creation-flows/success-next-steps.mp4?v=21e1c4ee",
      poster: "media/creation-flows/success-next-steps.jpg?v=26912362",
      label: "Success and next steps, shown in a mock Echo Base console",
      steps: [
        "In People / Users, the admin reviews an invite for the Rogue One pilot, with each label above its value: 38 people from a file, the group, the license, the start date and a message. She chooses Send 38 invites.",
        "Sending runs as a job with a progress count, and says she can leave the page and will be notified.",
        "A success panel, not a disappearing toast, confirms 38 invitations sent, that they were added to Rogue One pilot and given Console seats. It is announced, and stays until she chooses Done.",
        "It flags the one follow-up that's required: 2 people use an outside domain, which must be verified before they can sign in.",
        "Three likely next steps follow: assign the new role, share the onboarding guide and track who has accepted. Setup progress shows 2 of 4 done, with a link to open the group.",
        "She opens View API call, which shows the same invite as a request she could automate."
      ]
    }
  },
  "mcp-connectors": {
    "Approving connectors": {
      src: "media/mcp-connectors/approving-connectors.mp4?v=b4372190",
      poster: "media/mcp-connectors/approving-connectors.jpg?v=2ffbbfd4",
      label: "Approving connectors, shown in a mock Echo Base console",
      steps: [
        "The admin opens AI › Connectors, where the policy reads approved connectors only, and chooses Add connector. The catalog opens with a search box, and Add by URL for servers that aren't listed. Nothing is available to people until she publishes it.",
        "She searches for fleet. Each result shows its publisher, what it can do in plain words and a label: Fleet Command is a Verified partner; Fleet Tracker, from Kessel Logistics, is Community · not reviewed, and can read, write and delete. She adds Fleet Tracker.",
        "Fleet Tracker opens as a draft. Its details show the publisher, where it runs, the server URL, and that she added it from the catalog today. A note warns that Echo Base hasn't reviewed this server: it sees what the AI sends it, its tools can change after it's published, and its tool descriptions may try to steer the AI.",
        "She connects with a test account. The page confirms Connected · 6 tools found, and lists them by what they do: 3 read, 2 write and 1 delete tool.",
        "She runs a test call, Find ships with the query Hoth, and gets 3 ships back in 240 milliseconds.",
        "Only now can she publish. The Publish dialog asks who gets it: everyone in Echo Base (250 people) or selected groups. She adds Logistics (24 people), checks that each person signs in with their own account and which tools are on, and publishes for Logistics. A message confirms it and says the change is logged."
      ]
    },
    "Choosing tools": {
      src: "media/mcp-connectors/choosing-tools.mp4?v=2654275b",
      poster: "media/mcp-connectors/choosing-tools.jpg?v=a931668a",
      label: "Choosing tools, shown in a mock Echo Base console",
      steps: [
        "On the published Fleet Tracker page, the admin opens the Tools tab. A line explains that publishing a connector doesn't turn on every tool, and that people can't override these settings.",
        "Every tool is listed in plain words, with its function name in small type underneath, grouped as read, write and delete, along with where it's on: Chat, Agents or both.",
        "Each tool has one setting: Allowed, Needs approval or Blocked. Read tools are allowed, the write tools need approval and Cancel shipment is blocked.",
        "A banner says the server added a new tool since she published it, Hold shipment, and that it's off until she reviews it. She chooses Review, and the new row is highlighted with Off until reviewed.",
        "She sets Hold shipment to Needs approval. The row explains what that means: the AI asks the person to confirm before it holds a shipment.",
        "She saves. A message confirms the tool settings are saved, apply within a few minutes and are logged, and the Write group now has 3 tools."
      ]
    },
    "Sign-in & credentials": {
      src: "media/mcp-connectors/sign-in-credentials.mp4?v=5dd46b4e",
      poster: "media/mcp-connectors/sign-in-credentials.jpg?v=a931668a",
      label: "Sign-in & credentials, shown in a mock Echo Base console",
      steps: [
        "On the published Fleet Tracker page, the admin opens the Sign-in tab. A line explains that whose account Fleet Tracker uses decides what the AI can reach.",
        "Three choices are stacked, each explained in a sentence: Each person signs in (recommended, and selected), Org-managed sign-in through the identity provider, and One org connection.",
        "She tries One org connection. A warning says actions will show the shared account, fleet-svc, not the person who asked, and to use a least-privilege service account, never an admin's.",
        "She chooses Org-managed sign-in instead: Holonet ID, with groups synced. She runs a test, and it confirms a test user signed in through Holonet ID.",
        "Beside it, a preview shows what each person sees when they connect: what Fleet Tracker will be able to do, with changes asking first, and that they're connected as w.antilles@echobase through Holonet ID. The client secret is masked and was shown only once, when it was added.",
        "She saves. A message confirms that Logistics will connect through Holonet ID at their next login, and that the change is logged."
      ]
    },
    "Who gets each connector": {
      src: "media/mcp-connectors/who-gets-each-connector.mp4?v=cb84d64d",
      poster: "media/mcp-connectors/who-gets-each-connector.jpg?v=a931668a",
      label: "Who gets each connector, shown in a mock Echo Base console",
      steps: [
        "On the published Fleet Tracker page, the admin opens the Access tab. A note says it's a pilot: Logistics only since November 23, with 18 of 24 people connected.",
        "A table shows who has it and how: Logistics as a group, Base Ops leads as a role, and Biggs Darklighter as a person, each with the tools they get.",
        "She chooses Add group, and picks Rogue One, 8 people, from the menu.",
        "The new row offers a tools setting with visible Add and Cancel buttons. She opens the dropdown and picks Read only: Find ships, Get manifest and List routes.",
        "She adds it. A message announces that Fleet Tracker is now available to Rogue One, read only, and Biggs's row now says his own access overrides Rogue One, so it's clear which setting wins.",
        "Below the table, a note shows what everyone else sees: Fleet Tracker isn't on for you; ask Lavanya Sienna."
      ]
    },
    "Allowed connectors": {
      src: "media/mcp-connectors/allowed-connectors.mp4?v=8de71328",
      poster: "media/mcp-connectors/allowed-connectors.jpg?v=d6abdf64",
      label: "Allowed connectors, shown in a mock Echo Base console",
      steps: [
        "On AI › Connectors, the admin chooses the Policy: approved connectors only pill, which opens Connector policy.",
        "Three choices run from most to least restrictive: Off, Approved connectors only (marked Recommended, and selected) and Any server.",
        "She picks Any server. A dialog asks her to confirm, and lists what a rogue server could do: read everything the AI sends it, hide instructions in its tool descriptions, and change its tools after it's added. People would have to accept these risks, and every server added would be logged. She keeps approved only.",
        "The approved list shows every connector in one place, where it came from (built-in or the catalog) and its owner.",
        "Enforced in shows the web, desktop and mobile apps enforcing the list, and coding tools not yet, so people could still add local servers there. She chooses Enforce and saves, and a message confirms it applies within 10 minutes and is logged.",
        "A preview shows what people see when a server is blocked: Rebel Radar isn't approved by Echo Base, with a Request it button."
      ]
    },
    "Data leaving the org": {
      src: "media/mcp-connectors/data-leaving-the-org.mp4?v=cbd7474d",
      poster: "media/mcp-connectors/data-leaving-the-org.jpg?v=a931668a",
      label: "Data leaving the org, shown in a mock Echo Base console",
      steps: [
        "On the published Fleet Tracker page, the admin opens the Data tab. A line explains it shows what Fleet Tracker sends out, where it goes, and whose rules apply once it's there.",
        "Where data goes, with each label above its value: it runs on Kessel Logistics servers in the Outer Rim, Kessel keeps data for 30 days under their terms, and it sends the AI's question and the ships, routes or manifests it asks about.",
        "A note explains that Echo Base's AI region, Core Worlds, doesn't move Fleet Tracker, and that Echo Base's AI data policy stops there: once data reaches Kessel Logistics, their retention and privacy rules apply.",
        "Under What can be sent, Only what the tool asks for is on, so the tool gets the fields it needs, not whole documents. Content labelled Confidential is never sent.",
        "She chooses Add label, picks Restricted from the menu and saves. A message confirms Restricted content won't be sent to Fleet Tracker.",
        "On the right, Outside AI tools that can reach Echo Base lists each tool with its domain and what it can do. API tokens are off, because token connections would skip that list."
      ]
    },
    "AI activity record": {
      src: "media/mcp-connectors/ai-activity-record.mp4?v=a3d37713",
      poster: "media/mcp-connectors/ai-activity-record.jpg?v=c774fe24",
      label: "AI activity record, shown in a mock Echo Base console",
      steps: [
        "In Compliance › Audit log, the admin opens the Action filter and picks AI tool calls. The filter chip and the query update; tool calls live in the same audit log as everything else.",
        "A summary line reads: 38 AI tool calls, 12 people, top tool Find ships, 1 failed, 1 by a shared account.",
        "Each row names the person and the AI client, such as Wedge Antilles via Holonet Assistant, says what the AI did as a sentence, and shows the tool, whether it read, wrote or deleted, the target and the result.",
        "A call by fleet-svc is marked as a shared account with no person, and a failed call says Failed · blocked in words, not just with a red icon.",
        "Admin changes appear in the same list, such as Lavanya Sienna setting Hold shipment to Needs approval and giving Rogue One read-only access.",
        "She chooses Export, then JSON. A message confirms 38 AI tool calls were exported to audit-log.json, and that the export is logged."
      ]
    },
    "Health & revoking": {
      src: "media/mcp-connectors/health-revoking.mp4?v=69730f9a",
      poster: "media/mcp-connectors/health-revoking.jpg?v=9bb45414",
      label: "Health & revoking, shown in a mock Echo Base console",
      steps: [
        "On AI › Connectors, the Status column reads in words, with the last good call: Holonet Docs is connected, Mission Board is failing and last worked at 09:40.",
        "Fleet Tracker shows 3 people need sign-in, and that they see Reconnect in their AI.",
        "A banner says Mission Board is failing since 09:40, with 42 failed calls, and that its tools changed since it was approved. The admin opens Mission Board.",
        "Its health panel shows the status, the last successful call, the failed calls and who uses it: 3 groups, 61 people, in chat and agents. Changed since you approved it lists a new Delete board tool, a changed Update card description and a new server address.",
        "She chooses Turn off for everyone. The dialog confirms who it affects (3 groups, 61 people), where (chat and agents, in every app) and how long (open sessions stop within 10 minutes), with Also sign everyone out ticked.",
        "She turns it off for 61 people. The status reads Off for everyone, applies within 10 minutes, and a note says open sessions stop too and what people now see."
      ]
    }
  },
  "destructive-actions": {
    "Delete confirmation": {
      src: "media/destructive-actions/delete-confirmation.mp4?v=1184636a",
      poster: "media/destructive-actions/delete-confirmation.jpg?v=6b768926",
      label: "Delete confirmation, shown in a mock Echo Base console",
      steps: [
        "In Content › All content, the admin opens the Owner deactivated saved view: 112 items owned by people who have left.",
        "She selects the three files shared by public link. A selection bar says 3 selected and offers Delete.",
        "Delete opens a dialog titled Delete 3 files? It names each file and says what breaks: 3 public links stop working and 14 people lose access they were given.",
        "It also says the files stay in Trash for 30 days, then they're gone for good. Focus starts on Cancel, and the Delete 3 files button is outlined in red rather than styled as the default.",
        "She confirms. The three rows leave the list, the count drops to 109, and a message says 3 files moved to Trash and can be restored within 30 days."
      ]
    },
    "Type-to-confirm": {
      src: "media/destructive-actions/type-to-confirm.mp4?v=f7d3aa59",
      poster: "media/destructive-actions/type-to-confirm.jpg?v=a879423b",
      label: "Type-to-confirm, shown in a mock Echo Base console",
      steps: [
        "In Settings › Organization, the irreversible actions sit in their own bordered section. The admin chooses Delete sandbox.",
        "The dialog says what goes: 1,204 files, 3 integrations and 18 test users, all deleted for good. The live Echo Base organization isn't touched.",
        "It asks her to type Echo Base Sandbox to confirm, and offers Copy name. Delete sandbox stays off, with the reason beside it: type the name to turn on Delete.",
        "She types echo base sandbox in lower case, with a space at the end. It still matches: the dialog announces Matches, and says capitals and spaces don't matter.",
        "She deletes. A message says the sandbox is being deleted and owners are notified, and the row now reads Deleting…, started by her, about 10 minutes."
      ]
    },
    "Archive vs. delete": {
      src: "media/destructive-actions/archive-vs-delete.mp4?v=ed2a2fe9",
      poster: "media/destructive-actions/archive-vs-delete.jpg?v=12138a88",
      label: "Archive vs. delete, shown in a mock Echo Base console",
      steps: [
        "In People › Groups, the admin opens the menu on Hoth Evacuation. Archive group comes first; Delete group… sits below a divider.",
        "She chooses Archive group. The dialog says archiving keeps everything: the group is hidden and its 64 members lose the access it gives, but members, shared files and history are kept, so it can be restored any time.",
        "Deleting for good is a small separate link, Delete permanently instead, not the main button. She archives.",
        "The row leaves the list, a message says where to find it, and an Archived filter appears. In it, the group carries a text label, Archived, with when and by whom.",
        "She chooses Restore. The group is back in the list, highlighted, and a message says its 64 members have their access back."
      ]
    },
    "Undo toast": {
      src: "media/destructive-actions/undo-toast.mp4?v=e669bc44",
      poster: "media/destructive-actions/undo-toast.jpg?v=6b768926",
      label: "Undo toast, shown in a mock Echo Base console",
      steps: [
        "In Content › All content, the admin hovers Supply run notes.md. A Move to Trash button appears at the end of the row.",
        "She moves it to Trash. There's no dialog for a routine, reversible delete: the row leaves the list right away.",
        "A message names the file, says Trash keeps it for 30 days, and offers Undo with a 10-second timer.",
        "When she points at the message, the timer pauses and says Paused, so it won't disappear while she decides.",
        "She chooses Undo. The row comes back exactly where it was, and the message says so."
      ]
    },
    "Cascading impact": {
      src: "media/destructive-actions/cascading-impact.mp4?v=b5c3194b",
      poster: "media/destructive-actions/cascading-impact.jpg?v=9543e32f",
      label: "Cascading impact, shown in a mock Echo Base console",
      steps: [
        "In People › Roles, the admin opens the menu on Content admin and chooses Delete.",
        "Before anything is deleted, the dialog lists what depends on the role, grouped by what happens to it: Detached, 8 people lose this role but keep their others; Deleted, 2 saved permission sets; Breaks, the Holonet sync integration, with a link to open it.",
        "Delete role is off while something would break. The reason sits beside it: Holonet sync uses this role, switch it first.",
        "She gives the 8 people Viewer, and switches Holonet sync to Viewer. Its label changes to Fixed, and the dialog says nothing breaks now.",
        "She deletes the role. It leaves the list, Viewer now has 148 members, and a message confirms it and says the change is logged."
      ]
    },
    "Danger zone": {
      src: "media/destructive-actions/danger-zone.mp4?v=bc63e133",
      poster: "media/destructive-actions/danger-zone.jpg?v=a879423b",
      label: "Danger zone, shown in a mock Echo Base console",
      steps: [
        "Settings › Organization starts with routine settings: name, domain, time zone, owner, plan and data region.",
        "Below them, a bordered Irreversible actions section, marked Only owners see this section, has one row per action: reset all public links, transfer ownership, delete sandbox and delete organization. Each says what happens, and each button names its action.",
        "The admin chooses Reset public links. It asks for a plain confirmation, with no name to type: 38 public links stop working right away and their owners are told by email. Focus starts on Cancel.",
        "She resets them. A message confirms it, and the row now says who reset the links and when.",
        "Pointing at Delete organization shows that it asks for the organization's name first, as Delete sandbox does."
      ]
    }
  },
  "edit-bulk-actions": {
    "Selection model": {
      src: "media/edit-bulk-actions/selection-model.mp4?v=7b9df515",
      poster: "media/edit-bulk-actions/selection-model.jpg?v=147e64d0",
      label: "Selection model, shown in a mock Echo Base console",
      steps: [
        "People › Users is filtered to Team: Fleet, 82 people. Every row has a checkbox named for its person.",
        "The admin checks Hobbie Klivian. A bar takes the place of the results line, above the table, and says 1 selected.",
        "She shift-clicks Wes Janson to select the range between them: 4 selected. The header checkbox shows the page is partly selected.",
        "The header checkbox selects this page only, and the bar says so: 25 on this page selected.",
        "Select all 82 matching selects everyone in the results, including the people who aren't on screen."
      ]
    },
    "Contextual action bar": {
      src: "media/edit-bulk-actions/contextual-action-bar.mp4?v=2b48e75e",
      poster: "media/edit-bulk-actions/contextual-action-bar.jpg?v=147e64d0",
      label: "Contextual action bar, shown in a mock Echo Base console",
      steps: [
        "On People › Users, selecting Cal Alder brings up the action bar above the table, where the results line was, so it covers no row.",
        "It shows the count and Clear, then the common actions: Edit, Add to group, Change license and Export. Suspend comes last, set apart by a divider.",
        "The admin adds Zev Senesca, then Bren Derlin, who is deactivated. Suspend turns off in the same place; the actions never change order.",
        "Pointing at Suspend explains why: Bren Derlin is already deactivated, so unselect them to suspend the other 2."
      ]
    },
    "Bulk edit": {
      src: "media/edit-bulk-actions/bulk-edit.mp4?v=a645e9c5",
      poster: "media/edit-bulk-actions/bulk-edit.jpg?v=c0b5456a",
      label: "Bulk edit, shown in a mock Echo Base console",
      steps: [
        "All 82 people matching Team: Fleet are selected. Edit… opens a dialog that says who that is, including the 57 not on this page.",
        "The admin picks the field first: Groups. Team is off, because it's synced from Holonet HR.",
        "Then the operation, each in plain words: Add to existing, Remove, Replace all or Clear. She chooses Add to existing, which keeps each person's groups.",
        "She picks the group, Hoth Evacuation. The current value is shown honestly as Various: these 82 people are in 14 different groups.",
        "A preview shows 3 of the 82 before and after, with the added group marked. The button says what it does and to how many: Add Hoth Evacuation to 82 people. It runs as a job, logged as one change."
      ]
    },
    "Inline edit": {
      src: "media/edit-bulk-actions/inline-edit.mp4?v=991be6a0",
      poster: "media/edit-bulk-actions/inline-edit.jpg?v=932ff6d4",
      label: "Inline edit, shown in a mock Echo Base console",
      steps: [
        "In Content › All content, pointing at Supply run notes.md shows a pencil beside the name. Owner and Sharing have none, because changing them has side effects.",
        "The pencil opens the name in place, with the name part selected so the extension stays, and visible Save and Cancel buttons. Enter saves and Esc cancels.",
        "The admin types a name with a slash. It's refused before saving, and the field stays open with the reason: names can't include /.",
        "She fixes it and presses Enter. The row shows Saving…, then Saved · renamed by you just now, and Last activity reads Just now."
      ]
    },
    "Progress & results": {
      src: "media/edit-bulk-actions/progress-results.mp4?v=f4605353",
      poster: "media/edit-bulk-actions/progress-results.jpg?v=a8a79e58",
      label: "Progress & results, shown in a mock Echo Base console",
      steps: [
        "The bulk edit runs as a job above the People list: a labelled progress bar, how many are done and about how long is left.",
        "The page stays usable while it runs, and the list picks up the change as each person is done. The admin can leave the page and be notified.",
        "It finishes as Done with issues, not Done: 79 added, 2 skipped because they were already in the group, and 1 failed because Zev Senesca's account is locked.",
        "Retry failed acts on just that one person. Download list and View in audit log are beside it.",
        "After the retry the job reads Done: 80 added, 2 skipped. The results stay until she dismisses them."
      ]
    }
  },
  "empty-onboarding": {
    "Setup checklist": {
      src: "media/empty-onboarding/setup-checklist.mp4?v=28e9018f",
      poster: "media/empty-onboarding/setup-checklist.jpg?v=e88a3dc5",
      label: "Setup checklist, shown in a mock Echo Base console",
      steps: [
        "Home's first run shows a checklist to set up Echo Base, with progress in words and as a bar: 2 of 6 done. The rest of the console works meanwhile.",
        "Tasks already done were detected on their own: the domain is verified and 412 people are synced from Holonet HR.",
        "The admin skips the optional task, Invite another admin. It stays in the list, crossed out, with Undo skip.",
        "She assigns Set sharing limits to Toryn Farr, who is sent a link.",
        "When Toryn finishes single sign-on, it ticks off as done by her, and progress moves to 3 of 6. Start on Create groups goes to where that task is done."
      ]
    },
    "Empty table": {
      src: "media/empty-onboarding/empty-table.mp4?v=d7bace80",
      poster: "media/empty-onboarding/empty-table.jpg?v=89ea106f",
      label: "Empty table, shown in a mock Echo Base console",
      steps: [
        "Before any groups exist, People › Groups shows a heading, No groups yet, and what groups are for, instead of an empty grid.",
        "There's one primary action, Create group, and the alternative a large org usually wants: Sync from Holonet HR. Importing a CSV and How groups work are links below.",
        "The admin syncs from Holonet HR. Progress shows in place of the empty state.",
        "The list appears with 6 groups, and a line says where they came from and that they stay in step every hour."
      ]
    },
    "No results": {
      src: "media/empty-onboarding/no-results.mp4?v=cbca78b5",
      poster: "media/empty-onboarding/no-results.jpg?v=932ff6d4",
      label: "No results, shown in a mock Echo Base console",
      steps: [
        "In Content › All content, a search for trench plans finds 2 items.",
        "Adding the filter Sharing: Public link finds none. The filter stays visible and highlighted.",
        "The message says no items match trench plans with this filter, and shows both the search and the filter as chips.",
        "It says 2 items match without the Sharing filter, and that neither is shared by public link. Nothing is cleared automatically.",
        "Remove Sharing filter is one click, and the 2 results come back. It looks nothing like a first-run empty table."
      ]
    },
    "Permission empty state": {
      src: "media/empty-onboarding/permission-empty-state.mp4?v=e0cf763a",
      poster: "media/empty-onboarding/permission-empty-state.jpg?v=1b035d2e",
      label: "Permission empty state, shown in a mock Echo Base console",
      steps: [
        "Wes Janson, a member, opens a link to Audit log that an admin shared with him. His rail only shows Workspace.",
        "The page says it's about access, not missing data: You don't have access to Audit log. It's for Security admins, and his role is Member.",
        "It says who can give access and how long it usually takes. Nothing about the page's contents is shown.",
        "Request access asks in place: Request sent to Lavanya Sienna, and he'll get an email when she answers.",
        "Below, What you can see instead points to his own sign-ins and devices in My access, and navigation keeps working."
      ]
    }
  },
  "groups-teams": {
    "Create group": {
      src: "media/groups-teams/create-group.mp4?v=2e2ca6cb",
      poster: "media/groups-teams/create-group.jpg?v=240ca447",
      label: "Create group, shown in a mock Echo Base console",
      steps: [
        "On People › Groups, New group opens a dialog that asks for the name first.",
        "The admin types shield ops, and it's flagged: a group named Shield Ops already exists, with a link to open it. She names hers Shield maintenance.",
        "She adds a description and an owner, Toryn Farr. The dialog asks for at least one owner who isn't an org admin, so someone on the team is responsible.",
        "The type is chosen up front: Static by default, with Dynamic and Synced explained in place.",
        "After Create group, the row is marked New at the top of the list, and the message offers Add members and Give access."
      ]
    },
    "Manage members": {
      src: "media/groups-teams/manage-members.mp4?v=b44a49ba",
      poster: "media/groups-teams/manage-members.jpg?v=a7f37f9b",
      label: "Manage members, shown in a mock Echo Base console",
      steps: [
        "Hoth Evacuation's page shows what members get above the list: a Console licence, Edit on Evacuation plans and the Shield Ops channel.",
        "Each member shows their role in the group, how they were added (directly, through Shield Ops, or through Fleet) and when and by whom.",
        "The admin pastes 3 names. The preview says what they'll get, and notes that Cal Alder already has a Console licence.",
        "Adding them announces 3 members added. They appear at the top, and the count goes to 67.",
        "Remove is off for Gen. Rieekan, the only owner, and says why: add another owner first."
      ]
    },
    "Dynamic groups": {
      src: "media/groups-teams/dynamic-groups.mp4?v=7b63f697",
      poster: "media/groups-teams/dynamic-groups.jpg?v=fc7b27e5",
      label: "Dynamic groups, shown in a mock Echo Base console",
      steps: [
        "All pilots is a dynamic group. Its rule is a structured editor: attribute, operator and value, each labelled.",
        "Where Title contains Pilot matches 52 people, with a preview of who.",
        "The admin adds a condition, Location is Echo Base. The live count drops to 38, and says it was 52.",
        "Saving a live rule that removes people asks first: 14 people would leave All pilots and lose its Console + AI licence.",
        "Once saved, the rule reads in plain words, with 38 members and when it was evaluated."
      ]
    },
    "Nested groups": {
      src: "media/groups-teams/nested-groups.mp4?v=4a4f0f6c",
      poster: "media/groups-teams/nested-groups.jpg?v=9fd88450",
      label: "Nested groups, shown in a mock Echo Base console",
      steps: [
        "Rebel Fleet's members are split into direct members, nested groups and everyone. The page says it includes 4 nested groups, 180 people in total.",
        "Nested groups show as a tree. Rogue Squadron expands in place to show Red Squadron and Gold Squadron.",
        "Beside it, what access flows down to everyone, nested groups included, and which group Rebel Fleet is part of: All Echo Base.",
        "The admin tries to add All Echo Base as a nested group. It's blocked, with the reason: All Echo Base already includes Rebel Fleet, so this would make a loop."
      ]
    },
    "Directory sync": {
      src: "media/groups-teams/directory-sync.mp4?v=8955415c",
      poster: "media/groups-teams/directory-sync.jpg?v=03c96afa",
      label: "Directory sync, shown in a mock Echo Base console",
      steps: [
        "Directory sync shows the source, Holonet ID over SCIM: healthy, in text and an icon, with the last sync, how many changes and which groups it syncs.",
        "2 groups didn't sync. Each says what failed, why, and what to do, with a link to the source.",
        "Synced groups are badged. Opening Fleet shows its details as read-only: Managed in Holonet ID. Change it there.",
        "Sync now shows progress in place of the status line.",
        "It finishes with Synced just now · 3 changes, and the rows show who joined and left."
      ]
    }
  },
  "import-export": {
    "CSV import": {
      src: "media/import-export/csv-import.mp4?v=0249b9b5",
      poster: "media/import-export/csv-import.jpg?v=b0250c72",
      label: "CSV import, shown in a mock Echo Base console",
      steps: [
        "On People › Users, Invite people opens a menu: Invite by email for a few people, or Import a CSV for many.",
        "The import page shows its four steps, and a template with an example row. Required columns are marked, and columns can be in any order.",
        "The admin drops fleet-new-hires.csv in. The encoding and delimiter are detected for her.",
        "Before anything changes, a summary: 48 rows found, 41 ready, 4 with problems, 3 people who already exist.",
        "For the existing people she chooses Update them, then continues to map fields. Nothing changes until the last step."
      ]
    },
    "Field mapping": {
      src: "media/import-export/field-mapping.mp4?v=0e0524a5",
      poster: "media/import-export/field-mapping.jpg?v=7b128164",
      label: "Field mapping, shown in a mock Echo Base console",
      steps: [
        "Each column in the file is matched to a field, with sample values beside it so the admin can check the match.",
        "Each match says how it was made: by name, by a similar name, or not at all. Badge no. has no matching field, so it isn't imported.",
        "Role was matched to Console role, and it's flagged: the samples look like job titles.",
        "She changes it to Title from the menu, and the row now says Changed by you.",
        "She saves the mapping as Holonet HR new hires for the next file with these columns, then continues to review."
      ]
    },
    "Validation & errors": {
      src: "media/import-export/validation-errors.mp4?v=a3faf8c9",
      poster: "media/import-export/validation-errors.jpg?v=40726b93",
      label: "Validation and errors, shown in a mock Echo Base console",
      steps: [
        "The review shows how many rows are ready, and groups the problems by type. Errors that block a row are kept apart from warnings that don't.",
        "Each error says what's wrong, by row, and how to fix it. The admin fixes an email inline, and the count updates.",
        "A team name that doesn't exist is fixed for both rows at once: Use Hoth Evacuation for 2 rows.",
        "She downloads the one row that still has an error, to fix later, instead of re-uploading the whole file.",
        "She imports the 47 good rows. The result says 44 added, 3 updated and 1 not imported."
      ]
    },
    "Export": {
      src: "media/import-export/export.mp4?v=4731bf5e",
      poster: "media/import-export/export.jpg?v=b0250c72",
      label: "Export, shown in a mock Echo Base console",
      steps: [
        "On People › Users, filtered to Team: Fleet, the admin selects all 82 matching people and chooses Export in the bar. The filter is the export's scope.",
        "She picks the fields, and turns off Last active. Sensitive fields such as phone, home address and employee ID are off unless she needs them.",
        "CSV or JSON, each described: one opens in a spreadsheet, the other is for scripts and other tools.",
        "The export runs, with its progress in the dialog.",
        "When it's ready she downloads it right there, and the same link is sent as a notification. It expires in 7 days, only she can open it, and the export is in the audit log."
      ]
    }
  },
  "integrations-api": {
    "Integration catalog": {
      src: "media/integrations-api/integration-catalog.mp4?v=865584ff",
      poster: "media/integrations-api/integration-catalog.jpg?v=1ea69d39",
      label: "Integration catalog, shown in a mock Echo Base console",
      steps: [
        "On Settings › Integrations, the admin goes from the org's connected apps to Browse. Each integration shows what it does, who makes it, and its status: allowed, needs approval or blocked.",
        "She searches for “cal”. Holonet Calendar needs approval, and 14 people are asking for it.",
        "Its detail says what it can do for each person who connects it, in plain words, including what it can't: no files, messages or other people's calendars.",
        "Who can connect it: admins approve each request, anyone in the org, or blocked. She picks Anyone in the org.",
        "Saving approves the 14 waiting requests, the tile now says Anyone can connect, and the change is logged."
      ]
    },
    "App permissions": {
      src: "media/integrations-api/app-permissions.mp4?v=88d65f57",
      poster: "media/integrations-api/app-permissions.jpg?v=1ea69d39",
      label: "App permissions, shown in a mock Echo Base console",
      steps: [
        "Connected by people lists the apps people authorised with their own accounts, grouped by app, with what each can do, how many people, who authorised it and when it was last used.",
        "Starmap Notes is marked Full access in words, and flagged as unused for 94 days.",
        "Its detail shows it was first authorised by Bren Derlin, who left in August, and that the app kept working for 12 people.",
        "The admin chooses Revoke for all 12 people. The confirmation says what stops and what stays, and she also blocks it so no one can connect it again.",
        "The row now shows Revoked and blocked, with 0 people, and the change is logged."
      ]
    },
    "Create API key": {
      src: "media/integrations-api/create-api-key.mp4?v=9dda0181",
      poster: "media/integrations-api/create-api-key.jpg?v=5ad8f81a",
      label: "Create API key, shown in a mock Echo Base console",
      steps: [
        "On Settings › API keys, every key has an owner, what it can do, an expiry and when it was last used. A key that never expires is flagged.",
        "Create key asks for a name, an owner and an expiry, set to 90 days by default within the org's 1-year maximum.",
        "Only People · read is on to start, each scope in plain words. The admin adds People · write. Full access needs an owner's approval.",
        "The secret is shown once, with a clear warning. She copies it, and Copied is announced.",
        "The key is listed as New, with Last used: Never, and can be rotated."
      ]
    },
    "Webhooks": {
      src: "media/integrations-api/webhooks.mp4?v=0ada27f6",
      poster: "media/integrations-api/webhooks.jpg?v=29d6f2ea",
      label: "Webhooks, shown in a mock Echo Base console",
      steps: [
        "Settings › Webhooks lists each endpoint with its events and status. A failing one says Retrying, rather than being switched off quietly.",
        "The admin adds an endpoint. An http:// address is refused, and she fixes it to https:// in place.",
        "She picks only the two events this system needs. There's no all-events option, so nothing is sent by accident.",
        "A signing secret is created for the system to check every request.",
        "Saving sends a test: 200 OK in 142 ms. The history shows each delivery and its attempts, the retry policy is spelled out, and she can pause the endpoint."
      ]
    }
  },
  "knowledge-content": {
    "Add content source": {
      src: "media/knowledge-content/add-content-source.mp4?v=e4ebaa9f",
      poster: "media/knowledge-content/add-content-source.jpg?v=e0421d06",
      label: "Add content source, shown in a mock Echo Base console",
      steps: [
        "On Content › Sources, the admin chooses Add source and picks Holonet Drive. The steps are in view: source, what to include, review.",
        "It says what the connector needs and why: read files and who they're shared with, so results respect it. It can't change, move or delete anything.",
        "Selected folders is the default, not everything. She picks Fleet manuals and Hangar procedures, and the estimate updates: about 18,400 items, about 3 hours.",
        "The review says who can find it, only people who can open it in Holonet Drive, and that nothing shows in search or AI until the first permission sync.",
        "She starts indexing. The source is listed with its progress and not searchable yet."
      ]
    },
    "Sync status": {
      src: "media/knowledge-content/sync-status.mp4?v=1842dbd3",
      poster: "media/knowledge-content/sync-status.jpg?v=28c17938",
      label: "Sync status, shown in a mock Echo Base console",
      steps: [
        "Each source shows items indexed and failed, when it last synced, and its state in words and an icon. Coruscant Wiki is Partly failing, not green, and HoloComms' sign-in expires in 4 days.",
        "The admin opens Coruscant Wiki: last synced 2 days ago, 87% coverage, 6,180 failed.",
        "Failures are grouped by cause, each with what happened and the fix. Access to 3 spaces was restored, so she retries those 5,900 items.",
        "Progress shows in place. Coverage reaches 99%, and the 280 unsupported files are explained, not hidden.",
        "She turns on an email for when this source stops syncing or falls a day behind."
      ]
    },
    "Source permissions": {
      src: "media/knowledge-content/source-permissions.mp4?v=1b43fc6f",
      poster: "media/knowledge-content/source-permissions.jpg?v=e08ebb10",
      label: "Source permissions, shown in a mock Echo Base console",
      steps: [
        "The admin opens Holonet Drive and its Permissions tab. Permissions synced 4 minutes ago, and removals arrive first.",
        "Each Holonet Drive group is shown beside the console group it maps to, with how many people.",
        "One group isn't mapped, so its 1,120 files are left out until it is, rather than shown to everyone.",
        "She tests as a person: Hobbie Klivian searching for “hyperdrive”.",
        "He'd find 2 items, each with the group that lets him. A third matches, but isn't shown, because he can't open it in Holonet Drive."
      ]
    },
    "Content exclusions": {
      src: "media/knowledge-content/content-exclusions.mp4?v=0d3ff22f",
      poster: "media/knowledge-content/content-exclusions.jpg?v=28c17938",
      label: "Content exclusions, shown in a mock Echo Base console",
      steps: [
        "On Content › Sources › Exclusions, each rule shows what it covers, who added it and why. Exclusions work alongside permissions, not instead of them.",
        "The admin adds a rule. It can exclude by location, file type, sensitivity label, keyword or owner. She keeps Location.",
        "She picks Crew evaluations in Holonet Drive. A preview says it matches 214 items, all already indexed.",
        "A reason is required, and shown to other admins: Open HR reviews.",
        "The rule is listed first, and the 214 items are being removed from search, caches and AI answers, in about 10 minutes."
      ]
    }
  },
  "notifications": {
    "Alert center": {
      src: "media/notifications/alert-center.mp4?v=9fc4b59e",
      poster: "media/notifications/alert-center.jpg?v=385580f6",
      label: "Alert center, shown in a mock Echo Base console",
      steps: [
        "The admin opens the alerts bell in the top bar. Alerts are listed by severity, written as words: Critical first, then High.",
        "The critical one says what happened and what to do: the sign-in certificate for Holonet ID expires in 2 days, and no one can sign in without it. The fix is one click away.",
        "She assigns it to herself. It stays in the list as Acknowledged and assigned, rather than disappearing.",
        "Three failed sign-ins from a new country are grouped into one alert. She opens it to see each attempt.",
        "A new alert arrives and is announced politely, without moving her focus."
      ]
    },
    "Banners": {
      src: "media/notifications/banners.mp4?v=830031bb",
      poster: "media/notifications/banners.jpg?v=508b33ad",
      label: "Banners, shown in a mock Echo Base console",
      steps: [
        "On Settings › Announcements › Banners, the admin sees that only one banner shows at a time. If two overlap, the later one waits instead of stacking.",
        "She starts a banner and picks Maintenance. The template asks what's happening, what it means for people and what they should do.",
        "It runs Saturday 02:00 to 04:00 UTC, with the end time stated in the banner.",
        "A preview shows how it will look at the top of every page: text and an icon, not colour alone, and it doesn't move. Maintenance banners can be dismissed; incident banners stay until they end.",
        "She schedules it, and it's listed with when it shows and who sees it."
      ]
    },
    "Notification rules": {
      src: "media/notifications/notification-rules.mp4?v=4401251b",
      poster: "media/notifications/notification-rules.jpg?v=db3c06cd",
      label: "Notification rules, shown in a mock Echo Base console",
      steps: [
        "Settings › Notifications lists each event, explained in a line, with who gets it and how.",
        "Sign-in certificate expiring is marked Required: no one can turn it off, because missing it takes sign-in down for everyone.",
        "The admin opens Source sync failing and sends it to the 3 content admins who can fix it, instead of all 12 admins.",
        "She adds chat (#content-ops) and groups repeats into one message an hour.",
        "She sends a test, which reaches 3 people and the channel, then saves. The table shows the new routing."
      ]
    },
    "Announcements": {
      src: "media/notifications/announcements.mp4?v=2cd2839c",
      poster: "media/notifications/announcements.jpg?v=508b33ad",
      label: "Announcements, shown in a mock Echo Base console",
      steps: [
        "Settings › Announcements lists each message with who got it and how many have seen or acknowledged it. Org-wide ones need a second admin's approval.",
        "The admin writes a clear title: Holonet Drive is now in search.",
        "No one is chosen by default. She picks Fleet, 82 people, rather than everyone.",
        "She previews it as Fleet will see it, at the top of Home, in plain language.",
        "She schedules it for Monday at 09:00 in each person's time zone, and it's listed with its audience."
      ]
    }
  },
  "settings": {
    "Settings navigation": {
      src: "media/org-settings/settings-navigation.mp4?v=4fe0b6c7",
      poster: "media/org-settings/settings-navigation.jpg?v=c5d5dc85",
      label: "Settings navigation, shown in a mock Echo Base console",
      steps: [
        "Every Settings page has the same tabs in the same order, and Search settings beside the title.",
        "The admin searches for “session”. It finds individual settings, not just pages, each with where it lives and its current value.",
        "A setting she can't change is marked View only.",
        "She picks Session timeout. It jumps to the setting itself on Defaults, highlighted.",
        "Every setting has its own link. She copies it to share."
      ]
    },
    "Org profile": {
      src: "media/org-settings/org-profile.mp4?v=72c16d09",
      poster: "media/org-settings/org-profile.jpg?v=c5d5dc85",
      label: "Org profile, shown in a mock Echo Base console",
      steps: [
        "On Settings › Organization, the admin edits the profile in place, with Save and Cancel, without a support ticket.",
        "The logo upload says what it needs before she starts: SVG or PNG, at least 256 × 256 px, readable on light and dark.",
        "She drops in the new logo. A preview shows the sign-in page as people will see it, in light and dark.",
        "The org ID, for support and the API, copies in one click.",
        "Saving says what changes: the new logo shows on sign-in pages and emails from now on."
      ]
    },
    "Defaults": {
      src: "media/org-settings/defaults.mp4?v=8afaf70f",
      poster: "media/org-settings/defaults.jpg?v=a8c2d6af",
      label: "Defaults, shown in a mock Echo Base console",
      steps: [
        "Settings › Defaults shows each default with what it does, its value and the product default. Labels sit above their values.",
        "Each says who it applies to: files created from now on, or everyone at their next sign-in. A locked one names who can change it.",
        "The admin tightens Sharing for new files to Only people added.",
        "Before saving, it says the effect: the 48,200 existing files keep their sharing, and Hangar 3 still overrides it. Reset to product default is beside it.",
        "Nothing applies until she saves. Saving is confirmed and logged."
      ]
    },
    "Save patterns": {
      src: "media/org-settings/save-patterns.mp4?v=d85ca960",
      poster: "media/org-settings/save-patterns.jpg?v=a8c2d6af",
      label: "Save patterns, shown in a mock Echo Base console",
      steps: [
        "Defaults uses one save model: changes wait for the save bar. The admin changes session timeout and resets sharing to the product default.",
        "The save bar sits under the tabs, so it never covers the control she's using, and says there are 2 unsaved changes.",
        "She clicks another tab. A warning says which 2 changes would be lost, with Keep editing and Discard and leave.",
        "She keeps editing and saves.",
        "The bar shows Saving…, then Saved once the server confirms, and it's announced."
      ]
    },
    "Inherited settings": {
      src: "media/org-settings/inherited-settings.mp4?v=2aa2a1d3",
      poster: "media/org-settings/inherited-settings.jpg?v=a8c2d6af",
      label: "Inherited settings, shown in a mock Echo Base console",
      steps: [
        "The admin switches Defaults from the whole org to the Hangar 3 group.",
        "Each value says where it comes from, in words: Set here, Inherited from Echo Base, or Locked by Rebel Alliance.",
        "The locked one is disabled and names who can change it: Rebel Alliance admins, such as Mon Mothma.",
        "She overrides Session timeout for Hangar 3 to 8 hours. Echo Base's 12 hours stays in view, and it says Hangar 3 stops following Echo Base for this until it's reset.",
        "Reset to inherited is beside it. She saves, and the change is logged."
      ]
    }
  },
  "policies": {
    "Policy list": {
      src: "media/policies/policy-list.mp4?v=5ebfbb3f",
      poster: "media/policies/policy-list.jpg?v=c42ea4e8",
      label: "Policy list, shown in a mock Echo Base console",
      steps: [
        "Compliance › Policies lists each policy in priority order, with its type, its status in words, who it applies to, what it did in the last 7 days and when it last changed.",
        "Block .exe uploads is flagged: it hasn't matched anything in 120 days. Drafts and policies that are off stay in the same list.",
        "The admin moves Contractor access up with Move up in its menu, not only by dragging.",
        "The new priority is announced: Contractor access is now priority 3, above External links expire.",
        "She filters by type. The priority numbers stay as they are, so the order still means something."
      ]
    },
    "Policy builder": {
      src: "media/policies/policy-builder.mp4?v=de163e32",
      poster: "media/policies/policy-builder.jpg?v=c42ea4e8",
      label: "Policy builder, shown in a mock Echo Base console",
      steps: [
        "The admin starts a new policy from the template Block external sharing of labelled content.",
        "The builder reads as When, To and Do, with a labelled field for each part. No rule syntax is needed.",
        "She picks the Restricted label and adds Tell the file's owner. A plain-language sentence updates as she goes.",
        "A conflict shows while she edits: Death Star plans · restricted already blocks this and wins at priority 1.",
        "Enforce stays off until the policy has been simulated, so she saves it as a draft."
      ]
    },
    "Retention policies": {
      src: "media/policies/retention-policies.mp4?v=927d2bcb",
      poster: "media/policies/retention-policies.jpg?v=09b52646",
      label: "Retention policies, shown in a mock Echo Base console",
      steps: [
        "Compliance › Retention lists each policy by what it covers, how long it keeps it, what happens then, and what's due in the next 30 days.",
        "The page says legal holds win: held content is kept whatever these policies say.",
        "The admin shortens Chat messages from 2 years to 1. Before saving, it says 84,300 messages become deletable at once, and 2,140 on legal hold will be kept.",
        "She picks Review first, so owners confirm before anything is deleted.",
        "A review comes before saving a change that will delete content. She confirms, and the row shows 84,300 to review."
      ]
    },
    "Legal hold": {
      src: "media/policies/legal-hold.mp4?v=fb6d284d",
      poster: "media/policies/legal-hold.jpg?v=38760dfe",
      label: "Legal hold, shown in a mock Echo Base console",
      steps: [
        "Compliance › Legal holds lists holds by matter. A released one says who released it.",
        "The admin opens Scarif inquiry: its sources, dates, keywords and what's preserved, and that held content can't be deleted by anyone, by retention or when someone leaves.",
        "Custodians are listed in a table, with the hold notice's acknowledgement in its own column.",
        "She adds Bodhi Rook. His mailbox and drive are preserved as a job, then the count is confirmed, and his notice reads Not yet.",
        "Releasing the hold is a separate, deliberate step."
      ]
    },
    "Scope & targeting": {
      src: "media/policies/scope-targeting.mp4?v=5d61249d",
      poster: "media/policies/scope-targeting.jpg?v=b2630255",
      label: "Scope & targeting, shown in a mock Echo Base console",
      steps: [
        "No one is in scope by default. The admin opens Applies to on the policy External links expire.",
        "She adds Fleet and Hangar 3 from one list. Everyone is marked as too broad for this policy.",
        "Except is in the same view. She adds Contractors, and it says how many of them were included.",
        "The result shows, not just the inputs: 86 people and 29,800 files, updated as the scope changes.",
        "She checks Wes Janson: in scope through Fleet, with no exception applying, and 412 of his files covered."
      ]
    },
    "Simulate / test": {
      src: "media/policies/simulate-test.mp4?v=034b0fc2",
      poster: "media/policies/simulate-test.jpg?v=0000dc12",
      label: "Simulate / test, shown in a mock Echo Base console",
      steps: [
        "On the policy's Simulation tab, the admin runs a simulation. It runs against real data, and nothing changes and no one is notified.",
        "It runs as a job through 29,800 files.",
        "The result: 1,980 links would expire, about 4× the 500 she expected, mostly Hangar 3's maintenance links.",
        "Sample matches are listed in a table, and it confirms nothing was changed.",
        "She enforces with these results. The confirmation says what will happen, and the simulation is attached to the change."
      ]
    }
  },
  "roles-permissions": {
    "Role catalog": {
      src: "media/roles-permissions/role-catalog.mp4?v=a66fbb39",
      poster: "media/roles-permissions/role-catalog.jpg?v=76e05524",
      label: "Role catalog, shown in a mock Echo Base console",
      steps: [
        "People › Roles lists roles from most to least powerful: Owner, Admin, Security admin, Content admin, Billing admin and Member.",
        "Each says what it can do in everyday words, whether it's built-in or custom, what a custom role is based on, and how many people have it.",
        "The admin ticks Admin and Security admin, and Compare counts them.",
        "The comparison shows only what's different first: what only Admin can do, and that Security admin is a narrower Admin. Then what both can do.",
        "From there she can duplicate Admin as the start of a custom role."
      ]
    },
    "Permission matrix": {
      src: "media/roles-permissions/permission-matrix.mp4?v=94ed67b3",
      poster: "media/roles-permissions/permission-matrix.jpg?v=76e05524",
      label: "Permission matrix, shown in a mock Echo Base console",
      steps: [
        "The admin switches People › Roles from Roles to Permissions.",
        "Capabilities are grouped by area down the side, with a count for each, and roles run across the top. A legend says what each mark means.",
        "Each cell says Yes, No or Own groups in words as well as a shape, never colour alone.",
        "She opens Data & export. Export people is marked Risky.",
        "She opens its explanation: it downloads the full people list, and its use isn't logged after download. Export for audit sits in the toolbar."
      ]
    },
    "Create custom role": {
      src: "media/roles-permissions/create-custom-role.mp4?v=71c827a7",
      poster: "media/roles-permissions/create-custom-role.jpg?v=76e05524",
      label: "Create custom role, shown in a mock Echo Base console",
      steps: [
        "The admin opens Member's menu and picks Duplicate, so the new role starts from a built-in one, not a blank list.",
        "She names it Help desk and says who it's for. A summary beside the form updates as she goes.",
        "Capabilities are grouped by area in plain words. Use the console comes from Member and stays on.",
        "She ticks Reset sign-in and MFA. View people is added too, and the row says why: Reset sign-in needs it.",
        "She adds Unlock devices and leaves Export people, marked Risky, off.",
        "She creates the role. It's listed with the others, based on Member, with nobody in it yet."
      ]
    },
    "Assign role": {
      src: "media/roles-permissions/assign-role.mp4?v=e4026ed5",
      poster: "media/roles-permissions/assign-role.jpg?v=7859396e",
      label: "Assign role, shown in a mock Echo Base console",
      steps: [
        "The admin opens Security admin from People › Roles.",
        "Who has it lists groups first, then people added directly, with how and when each got it.",
        "She adds Wes Janson. Before assigning, she sees what he gains and that he keeps Member: nothing he has now is taken away.",
        "Security admin is an admin-level role, so Assign waits for a reason. Her reason goes in the audit log.",
        "She assigns it. Wes is listed straight away with the reason, and a toast offers Undo."
      ]
    },
    "Scoped access": {
      src: "media/roles-permissions/scoped-access.mp4?v=b7755efc",
      poster: "media/roles-permissions/scoped-access.jpg?v=7859396e",
      label: "Scoped access, shown in a mock Echo Base console",
      steps: [
        "The admin opens Admin from People › Roles. Its people show the role with its scope, such as Admin · Ground forces.",
        "She adds Cal Alder and chooses where it applies: Only part of it, rather than the whole organization.",
        "She picks Fleet from the org tree, which shows how many people each part has.",
        "Before assigning, she sees what Admin · Fleet covers and what it doesn't: not Echo Base settings, other teams or billing.",
        "She gives a reason, as for any admin-level role, and assigns it. Cal is listed as Admin · Fleet, the same label as in the toast."
      ]
    },
    "Effective permissions": {
      src: "media/roles-permissions/effective-permissions.mp4?v=de8b4d20",
      poster: "media/roles-permissions/effective-permissions.jpg?v=2635a187",
      label: "Effective permissions, shown in a mock Echo Base console",
      steps: [
        "The admin opens Check access from People › Roles.",
        "She asks one question: can Hobbie Klivian share files outside Echo Base?",
        "The answer comes first, in words: No. A locked setting wins over his role.",
        "Then each step that decided it, in order: his Content admin role, through the Fleet content group, allows it.",
        "But External sharing is Off, locked by Rebel Alliance, and locked settings win. Each step links to where it can be changed."
      ]
    }
  },
  "search-filtering": {
    "Filter bar": {
      src: "media/search-filtering/filter-bar.mp4?v=5bb7385a",
      poster: "media/search-filtering/filter-bar.jpg?v=20bc0a39",
      label: "Filter bar, shown in a mock Echo Base console",
      steps: [
        "Content › All content has its common filters up front: Owner, Sharing, Last modified, Size and Advanced.",
        "The admin opens Owner. With 4,812 owners, the list has its own search, and every value has a count.",
        "She types deac and picks Deactivated people. The filter now reads Owner: Deactivated, with a ✕, and the count, 112 items, is announced.",
        "She opens Sharing. Its counts now follow the Owner filter, and Public link brings it to 3 items.",
        "She removes the Owner filter with its ✕, leaving 38 items shared by public link, then uses Clear all to get back to everything."
      ]
    },
    "Advanced query": {
      src: "media/search-filtering/advanced-query.mp4?v=d5df8c9e",
      poster: "media/search-filtering/advanced-query.jpg?v=20bc0a39",
      label: "Advanced query, shown in a mock Echo Base console",
      steps: [
        "Beside the simple filters, the admin opens Advanced. A builder joins conditions with AND: type is PDF or DOC, last activity more than 90 days ago, tag is not Legal hold.",
        "A sentence below says what it finds, in plain words.",
        "She switches to Query. The same query is there as text, with the fields it understands listed.",
        "She adds sise:>10MB. The error names the unknown field and its position, and offers Use size.",
        "She takes the fix and switches back to Builder: the size condition is there too. She applies it, and it shows as Advanced: 4 conditions, with 214 items."
      ]
    },
    "Saved views": {
      src: "media/search-filtering/saved-views.mp4?v=309215cc",
      poster: "media/search-filtering/saved-views.jpg?v=ca558cc7",
      label: "Saved views, shown in a mock Echo Base console",
      steps: [
        "With Owner: Deactivated and Sharing: Public link set, the admin clicks Save view.",
        "She names it Stale public links. The dialog lists what's saved together: both filters, the sort, the 6 columns and the list layout.",
        "She shares it with Content admins, and only she can change it. She also makes it the view Content opens with.",
        "Saved, it's the active view, marked Shared, and its name is announced.",
        "Hovering Owner deactivated, another shared view, shows who shared it, and who changed it, when and how."
      ]
    },
    "Global admin search": {
      src: "media/search-filtering/global-admin-search.mp4?v=551708c7",
      poster: "media/search-filtering/global-admin-search.jpg?v=2001be7c",
      label: "Global admin search, shown in a mock Echo Base console",
      steps: [
        "From People › Roles, the admin clicks Search Echo Base in the top bar. ⌘K opens it too.",
        "It opens on her recent items.",
        "She types fleet. Results are grouped as People, Groups, Roles and Settings, each with enough context to choose, and only what she can access.",
        "She moves down to the Fleet group with the arrow keys, and opens it with Enter.",
        "She lands on Fleet's own page. A note in the search says the shortcut can be changed or turned off."
      ]
    }
  },
  "security-identity": {
    "SSO setup": {
      src: "media/security-identity/sso-setup.mp4?v=9736b7b0",
      poster: "media/security-identity/sso-setup.jpg?v=653225ee",
      label: "SSO setup, shown in a mock Echo Base console",
      steps: [
        "The admin is setting up single sign-on with Holonet ID. The steps read Provider, Connect, Map attributes, Test and Enforce.",
        "On Connect, she copies Echo Base's ACS URL. Each value says what Holonet ID calls it, and Copied is announced.",
        "She pastes Holonet ID's metadata URL. What was read from it shows straight away, including when the certificate expires and that she'll be warned 30 days before.",
        "She runs a test sign-in as herself. It shows the attributes received and how they matched. Enforce stays off until the test passes.",
        "She enforces SSO for Fleet first, not everyone. The 2 owners keep password sign-in, so a broken connection can't lock every admin out."
      ]
    },
    "MFA enforcement": {
      src: "media/security-identity/mfa-enforcement.mp4?v=79e0731e",
      poster: "media/security-identity/mfa-enforcement.jpg?v=36824fdb",
      label: "MFA enforcement, shown in a mock Echo Base console",
      steps: [
        "People › Sign-in & security › MFA shows enrolment first: 1,084 of 1,214 people, with 130 not yet enrolled.",
        "Admins already need MFA now. The admin sets everyone else to After 14 days, with reminders on days 1, 7 and 13.",
        "She allows passkeys too. Text message is only a fallback.",
        "Two exemptions are listed with their reasons, who made them, and when they were last reviewed.",
        "Before she saves, the effect is said in words: from Dec 10, the 130 people not enrolled must enrol at their next sign-in."
      ]
    },
    "Session management": {
      src: "media/security-identity/session-management.mp4?v=6e6b6939",
      poster: "media/security-identity/session-management.jpg?v=b12c6f25",
      label: "Session management, shown in a mock Echo Base console",
      steps: [
        "Session rules come first: 12-hour sessions, sign-out after 30 minutes without activity, and a warning 2 minutes ahead. Drafts are kept either way.",
        "The admin looks up Hobbie Klivian. His 3 sessions show the device, a place she can read with its IP, when he signed in, and when he was last active.",
        "A session from Yavin 4 is marked New place, in words.",
        "She chooses Sign out everywhere. Before it happens, it says his sessions end, his drafts are kept, and his 2 API tokens are revoked too.",
        "She confirms. The list now says there are no active sessions, signed out everywhere just now."
      ]
    },
    "Domain verification": {
      src: "media/security-identity/domain-verification.mp4?v=3c05577e",
      poster: "media/security-identity/domain-verification.jpg?v=af2f2cbd",
      label: "Domain verification, shown in a mock Echo Base console",
      steps: [
        "Each domain shows its status in words, when it was last checked, and what it's used for.",
        "The admin adds a domain. gmail.com is refused as she types: it's a public email domain, and only domains Echo Base owns can be verified.",
        "She types yavin4.org instead and gets the TXT record to add, with its type, name and value, each with Copy.",
        "Send instructions passes it to whoever manages that DNS.",
        "Check now hasn't found it yet. It says DNS can take up to 48 hours, and that it checks every hour and will tell her. The domain is listed as Pending."
      ]
    },
    "Device management": {
      src: "media/security-identity/device-management.mp4?v=237ad1ef",
      poster: "media/security-identity/device-management.jpg?v=c21dff34",
      label: "Device management, shown in a mock Echo Base console",
      steps: [
        "People › Devices shows 312 devices: 296 compliant and 16 needing attention, with the requirements in plain terms.",
        "The admin filters to Needs attention. Each status is in words with an icon, such as Needs OS update: macOS 15 or later.",
        "She opens Hobbie's iPhone, which he reported lost today.",
        "Remove from Echo Base and Wipe Echo Base data are separate, each saying what it does and what it leaves alone. A note says what admins can and can't see on a device.",
        "She chooses Wipe Echo Base data, and confirms again. The wipe is sent and runs when the phone next connects."
      ]
    },
    "IP allowlists": {
      src: "media/security-identity/ip-allowlists.mp4?v=0987950a",
      poster: "media/security-identity/ip-allowlists.jpg?v=e48b6377",
      label: "IP allowlists, shown in a mock Echo Base console",
      steps: [
        "People › Sign-in & security › Network shows the admin's own IP and the range that covers it, so she knows saving won't block her.",
        "She adds a range labelled Hoth outpost.",
        "She types 198.51.100.0/33. The row says /33 isn't valid and to use /0 to /32.",
        "She changes it to /24, and the row says it covers 256 addresses. The list applies to web, API and mobile apps.",
        "It's in Monitor only, which blocks nothing and logs what would have been blocked: 14 sign-ins in the last 7 days. She saves."
      ]
    }
  },
  "storage-quotas": {
    "Storage overview": {
      src: "media/storage-quotas/storage-overview.mp4?v=276dd868",
      poster: "media/storage-quotas/storage-overview.jpg?v=6c434f56",
      label: "Storage overview, shown in a mock Echo Base console",
      steps: [
        "Content › Storage opens on the numbers, in text: 3.2 TB of 5 TB used, growing 4% a month, full around Oct 2027 at this rate.",
        "A bar breaks the 5 TB down by type, each part labelled: files, old versions, trash, backups and what's free. Trash and old versions count, and it says so.",
        "Alerts go out at 80%, 90% and 95%, by email and in the console. Below, the last 12 months and the forecast reach the limit.",
        "The admin switches to By group. Base Engineering uses the most, at 1.1 TB.",
        "She opens it and sees what's in it, biggest first, including its old versions and trash."
      ]
    },
    "Per-user quotas": {
      src: "media/storage-quotas/per-user-quotas.mp4?v=9007cc00",
      poster: "media/storage-quotas/per-user-quotas.jpg?v=bc685f0a",
      label: "Per-user quotas, shown in a mock Echo Base console",
      steps: [
        "The default quota is 50 GB per person. Over it, uploads stop with a message saying why, and files stay and can still be opened and shared.",
        "Overrides list who they're for, who set them and when they end. One with no end date is flagged for review.",
        "People near or over their quota are listed in numbers.",
        "Wes Janson asks for 100 GB, with his reason. The admin sets it to end in 90 days rather than until she removes it.",
        "She approves it. It's listed as an override that ends Feb 24, 2027, and Wes is told."
      ]
    },
    "Largest items": {
      src: "media/storage-quotas/largest-items.mp4?v=fb3f570c",
      poster: "media/storage-quotas/largest-items.jpg?v=80620bbd",
      label: "Largest items, shown in a mock Echo Base console",
      steps: [
        "Largest items is a report from the background, sorted by size, with the sort shown. Shared files are counted once, for their owner.",
        "The admin filters to Owner deactivated. Each item shows its owner, that they've left, and its last activity.",
        "She selects all. One item is under legal hold, so it's locked and left out. The bar says the 3 others free 22.6 GB once deleted forever.",
        "The actions are safe ones: ask their manager, move to archive, or move to trash.",
        "She moves them to trash. The confirmation says they're deleted forever on Dec 26 unless restored, and that the item on hold was left out."
      ]
    },
    "Trash & recovery": {
      src: "media/storage-quotas/trash-recovery.mp4?v=34cc56d6",
      poster: "media/storage-quotas/trash-recovery.jpg?v=f2d69eb9",
      label: "Trash & recovery, shown in a mock Echo Base console",
      steps: [
        "Content › Trash can be searched across all of Echo Base. Items stay 30 days, and the 310 GB in trash counts toward storage.",
        "A banner flags something unusual: 1,204 items deleted from Biggs Darklighter's account in 40 minutes.",
        "The admin reviews them, filtered to that person and time window. Each shows where it was, who deleted it and when, and when it's deleted forever, as a date and the days left.",
        "She selects all 1,204 and restores them. Items go back where they were, and a deleted folder is restored first so its items can go back in it.",
        "The restore runs in the background with progress. Empty trash is kept well away from Restore, at the top of the page."
      ]
    }
  },
  "tables-grids": {
    "Column management": {
      src: "media/tables-grids/column-management.mp4?v=f89b8ab0",
      poster: "media/tables-grids/column-management.jpg?v=378e759c",
      label: "Column management, shown in a mock Echo Base console",
      steps: [
        "On People › Users, the admin opens Columns. Each column has a checkbox to show it and ↑ ↓ buttons to move it, so dragging isn't the only way.",
        "Person is always shown. It identifies each row, so it can't be hidden.",
        "She turns on MFA, and the column appears in the table straight away.",
        "She moves MFA up with ↑ so it sits next to Person, and the table follows.",
        "She hides Groups. Her columns are saved for her, with Reset to default if she wants the original set back."
      ]
    },
    "Sorting & pagination": {
      src: "media/tables-grids/sorting-pagination.mp4?v=0b88b187",
      poster: "media/tables-grids/sorting-pagination.jpg?v=378e759c",
      label: "Sorting & pagination, shown in a mock Echo Base console",
      steps: [
        "The table is sorted by name, A to Z, and says so. The pager shows 1–25 of 82, Page 1 of 4.",
        "The admin sorts by Last active. The header shows ↓ newest first, the change is announced, and all 82 people are sorted, not just this page.",
        "She goes to the next page: 26–50 of 82, Page 2 of 4.",
        "She changes the page size to 50 rows, which is kept for next time. The range becomes 1–50, Page 1 of 2.",
        "Copy link copies the view with its sort and page size, so it opens the same way for someone else."
      ]
    },
    "Row actions": {
      src: "media/tables-grids/row-actions.mp4?v=b295ba09",
      poster: "media/tables-grids/row-actions.jpg?v=53d3f394",
      label: "Row actions, shown in a mock Echo Base console",
      steps: [
        "Every row has a ⋯ that's always visible, not only on hover. The admin does this by keyboard, and the keys are shown under the window.",
        "Tab moves the focus ring from one row's ⋯ to the next.",
        "Enter opens Actions for Zev Senesca. The menu is named for the row.",
        "The most common action is first. Change license is disabled and says why: Billing admins only. Suspend is last, set apart.",
        "She arrows down to Reset sign-in and presses Enter. Zev is emailed a link."
      ]
    },
    "Density": {
      src: "media/tables-grids/density.mp4?v=b7bbfea8",
      poster: "media/tables-grids/density.jpg?v=bb9618af",
      label: "Density, shown in a mock Echo Base console",
      steps: [
        "The Users table is Comfortable, with room to read and click.",
        "The admin opens Density. Each choice says what it does.",
        "She picks Compact: more rows, with the same text size and targets.",
        "Rows get tighter and more people fit on screen. Job titles move beside names, the text stays 13 px and the ⋯ stays a 28 px target.",
        "Her choice is saved for her, on every table."
      ]
    },
    "Expandable rows": {
      src: "media/tables-grids/expandable-rows.mp4?v=9161626c",
      poster: "media/tables-grids/expandable-rows.jpg?v=378e759c",
      label: "Expandable rows, shown in a mock Echo Base console",
      steps: [
        "Each row starts with an expand button, separate from opening the person.",
        "The admin expands Zev Senesca. The detail sits right under his row: when he last signed in and from where, MFA, his device, and how long he's been in Fleet.",
        "Open profile links to the full page for more.",
        "She expands Bren Derlin too, since several rows can be open at once.",
        "The header's button now says Collapse all, and closes them both."
      ]
    }
  },
  "usage-analytics": {
    "Admin home": {
      src: "media/usage-analytics/admin-home.mp4?v=1adc3710",
      poster: "media/usage-analytics/admin-home.jpg?v=72e61d37",
      label: "Admin home, shown in a mock Echo Base console",
      steps: [
        "Home opens on what needs the admin: 4 items, each saying what it affects and with a button to the fix.",
        "The Holonet ID certificate expires in 12 days. 3 access requests are waiting. The Coruscant Wiki sync is failing for 13% of items. 130 people haven't enrolled in MFA.",
        "Below them, three numbers, each with a comparison: 1,092 active this week, up 3%; 3.2 of 5 TB of storage; 1,214 of 1,250 seats. Then shortcuts to common tasks.",
        "She opens the MFA item's menu and snoozes it for a week.",
        "It says Snoozed until Dec 3, with Undo, and Needs you drops to 3."
      ]
    },
    "Adoption metrics": {
      src: "media/usage-analytics/adoption-metrics.mp4?v=0e2e5adc",
      poster: "media/usage-analytics/adoption-metrics.jpg?v=6396e7f3",
      label: "Adoption metrics, shown in a mock Echo Base console",
      steps: [
        "Insights › Adoption asks its question first: are people using Echo Base? 640 today, 1,092 this week and 1,168 of 1,214 this month.",
        "What active means is written under the numbers: signed in and opened, edited or shared something, counted once per person.",
        "A 13-week trend by group tells the lines apart by pattern and direct labels, not colour. The admin compares to the previous 90 days.",
        "She switches to Table for the same numbers. Groups under 5 people aren't shown, so no one can be picked out.",
        "She opens 46 not active in 30 days, a list with each person's group, when they were last active and their manager, to follow up."
      ]
    },
    "Reports": {
      src: "media/usage-analytics/reports.mp4?v=d1a1bead",
      poster: "media/usage-analytics/reports.jpg?v=8e4524c5",
      label: "Reports, shown in a mock Echo Base console",
      steps: [
        "Insights › Reports lists standard reports, each with what it shows, its period and when it was last made.",
        "The admin schedules Monthly adoption: monthly, on the 1st at 9:00.",
        "She adds Mon Mothma beside Finance. It goes as PDF and CSV.",
        "Recipients get a link and sign in to open it, not an attachment, so the data stays in Echo Base. It uses the same definitions as Insights, and the next report says if one changes.",
        "Saved, the row shows the next run and who gets it. A history keeps the 38 reports made so far."
      ]
    },
    "Recommendations": {
      src: "media/usage-analytics/recommendations.mp4?v=e1bea85d",
      poster: "media/usage-analytics/recommendations.jpg?v=87f4f3aa",
      label: "Recommendations, shown in a mock Echo Base console",
      steps: [
        "Home › Recommendations come from Echo Base's own data, sorted by impact, and nothing happens until the admin confirms.",
        "She opens Why am I seeing this? under Reclaim 42 unused licenses, and the reason opens right below the link: it's based on sign-ins since Aug 28, and 3 people on leave are left out.",
        "She reviews the 42 and confirms. The confirmation says they keep their files and can ask again.",
        "The result is announced: 42 licenses back in the pool, $5,040 a year saved, with Undo. The count of recommendations acted on goes up.",
        "She dismisses another with a reason, We handle it elsewhere, and it says it won't show again."
      ]
    }
  },
  "user-management": {
    "Invite / add user": {
      src: "media/user-management/invite-user.mp4?v=ec171c8a",
      poster: "media/user-management/invite-user.jpg?v=378e759c",
      label: "Invite / add user, shown in a mock Echo Base console",
      steps: [
        "From People › Users, the admin opens Invite people and pastes three email addresses. Each becomes a chip and is checked on its own.",
        "biggs@echobase.org is already in Echo Base, with a link to open his account or remove it. han@smuggler.io isn't on a verified domain, so he'll join as a guest.",
        "Role and group have visible defaults. Before she sends, it says each person uses a seat when they accept, with 36 left, and that the invite expires in 7 days.",
        "She removes Biggs, and the button becomes Send 2 invites.",
        "Invitations sent to 2 people is announced, with the next likely steps: invite more, add them to a group, or view pending invites."
      ]
    },
    "User directory": {
      src: "media/user-management/user-directory.mp4?v=ec77e1a6",
      poster: "media/user-management/user-directory.jpg?v=ebb42bc0",
      label: "User directory, shown in a mock Echo Base console",
      steps: [
        "People › Users leads with search, which matches name, email and employee ID as the admin types.",
        "She types EB-22. Ved Foslo matches, and the row shows the match in his employee ID.",
        "The count says 1 of 82 people, out of the whole directory, and is announced.",
        "She clears the search and opens Status. Each status has a count.",
        "She picks Suspended: 3 of 82. Each row says Suspended in words with an icon, with when and why."
      ]
    },
    "User detail": {
      src: "media/user-management/user-detail.mp4?v=c3ad1ae5",
      poster: "media/user-management/user-detail.jpg?v=c6315afa",
      label: "User detail, shown in a mock Echo Base console",
      steps: [
        "Zev Senesca's page puts his identity and status at the top: Active, his email and that it comes from Holonet ID. Reset sign-in and Edit come first, Suspend is set apart.",
        "Access says where each piece comes from: Member directly, Editor through Fleet content.",
        "The admin opens Through Fleet content. It explains the group gives Editor to its 18 members and who added Zev, with links to the group and to remove him from it.",
        "Security is in words: MFA not enrolled, 1 device, last sign-in 61 days ago from Hoth.",
        "She sends him a reminder to enrol, and it says MFA is required from Dec 10. Activity links to his audit log."
      ]
    },
    "Edit profile": {
      src: "media/user-management/edit-profile.mp4?v=fd95f0b4",
      poster: "media/user-management/edit-profile.jpg?v=53ff7c34",
      label: "Edit profile, shown in a mock Echo Base console",
      steps: [
        "On Zev's page, the admin chooses Edit. A side panel opens, and his page stays in view.",
        "Name and email are locked: they're managed by Holonet ID, with a link to change them there. It also says his email is his sign-in name.",
        "She changes his title from Pilot to Flight lead. The panel says there's 1 unsaved change.",
        "She saves explicitly. Nothing changes until then.",
        "His page shows Flight lead, with Edited by you just now, was Pilot, and Undo."
      ]
    },
    "Suspend / deactivate": {
      src: "media/user-management/suspend-user.mp4?v=a8088634",
      poster: "media/user-management/suspend-user.jpg?v=e8c9aea6",
      label: "Suspend / deactivate, shown in a mock Echo Base console",
      steps: [
        "On Zev's page, the admin chooses Suspend, which is set apart from the routine actions.",
        "Before she commits, it says what happens: he can't sign in, his session ends now and his 2 API tokens are revoked.",
        "It also says what's kept: his files, shared links and groups keep working, and his license stays until she frees it. She can reactivate him in one step.",
        "A reason is required, shown on his page and in the audit log. She enters Extended leave.",
        "His page now says Suspended by you, today, with the reason and a single Reactivate button. Security shows he's signed out and his tokens are revoked."
      ]
    },
    "Offboarding": {
      src: "media/user-management/offboarding.mp4?v=2b81d044",
      poster: "media/user-management/offboarding.jpg?v=e70f77e4",
      label: "Offboarding, shown in a mock Echo Base console",
      steps: [
        "Offboard Bren Derlin is a checklist, with the safe steps first and deletion last. A check at the top shows there's no legal hold.",
        "His access is already removed: he was deactivated on Nov 18, with sessions ended and tokens revoked.",
        "What he owned is listed with counts: 1,284 files, 12 shared links, 2 API keys and an admin role. It goes to his manager, Cal Alder, by default.",
        "The admin starts the transfer. It runs as a job with progress, and nothing is deleted until it finishes. His license is freed when it's done.",
        "Deleting the account is scheduled for after a 30-day restore window, and she types his name to confirm. Offboarding says it isn't done until every step is."
      ]
    },
    "Pending invites": {
      src: "media/user-management/pending-invites.mp4?v=d7c4dab5",
      poster: "media/user-management/pending-invites.jpg?v=27e85450",
      label: "Pending invites, shown in a mock Echo Base console",
      steps: [
        "Pending invites lists the 14 people who haven't joined yet: who invited them, the status, when it expires, as a date and days left, and whether it holds a seat.",
        "They aren't counted as active people, and the page says so.",
        "The admin filters to Expired, selects all 4 and resends them together. They're pending again, expiring Dec 3.",
        "She filters to Bounced. chirrut@echobase.org says why: the mailbox doesn't exist.",
        "From its menu, with Revoke set apart from Fix email and Copy invite link, she revokes it."
      ]
    },
    "Bulk add users": {
      src: "media/user-management/bulk-add-users.mp4?v=530f9fa7",
      poster: "media/user-management/bulk-add-users.jpg?v=25829d80",
      label: "Bulk add users, shown in a mock Echo Base console",
      steps: [
        "This is the last step of Import people, after upload, mapping and review. The admin adds 46 people, and it runs in the background with progress.",
        "44 are added. 2 rows couldn't be, each named by row, with why: one already has a pending invite, one names a manager who isn't here.",
        "She fixes them here, without the file: resend the existing invite instead, and pick Cal Alder as the manager.",
        "She adds the 2. All 46 are in Fleet as Members. Running the same file again is safe, since people already added are skipped.",
        "The import history records who ran it, the file and the result, with a report."
      ]
    },
    "Auto-join by domain": {
      src: "media/user-management/auto-join.mp4?v=a858db2b",
      poster: "media/user-management/auto-join.jpg?v=44c90b14",
      label: "Auto-join by domain, shown in a mock Echo Base console",
      steps: [
        "Auto-join by domain only lists verified domains, and public ones like gmail.com can never be used.",
        "echobase.org lets people join automatically. The admin switches it to Ask to join, so a People admin approves each person.",
        "People join as Members with no admin rights, and now a seat is only used once they're approved.",
        "What they see updates too: which org they're joining, who runs it, and that an admin will approve them.",
        "She saves, and echobase.org now says Ask to join."
      ]
    }
  }
};
