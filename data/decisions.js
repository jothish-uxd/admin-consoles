/* Decisions & trade-offs: when to use a pattern, when not to, what else could work, and how it usually
   goes wrong when built. One entry per category; a category without one has no Decisions tab.
   Shape: { intro, patterns: { "<pattern name>": { tradeoff, use: [], avoid: [], alternatives: [[name, when]], mistakes: [] } } } */
window.DECISIONS = Object.assign(window.DECISIONS || {}, {
  "access-requests": {
    intro: "Access requests trade speed for control. Every request is a moment where someone is waiting to work, and every shortcut is a moment where access goes unchecked. These notes help decide which pattern fits, what to use instead, and where implementations usually go wrong.",
    patterns: {
      "Request access": {
        tradeoff: "A request flow adds a wait in exchange for a record and a second pair of eyes. It only pays off if asking is easier than going around it.",
        use: [
          "Access is granted per resource or per role, and people regularly hit things they can’t open.",
          "Someone other than the requester should decide: the resource owner, a manager or a security team.",
          "You need a record of who asked, why, and who agreed, for audits or investigations.",
          "Default access is deliberately narrow, so asking for more is a normal part of work."
        ],
        avoid: [
          "Nearly everyone who asks is approved. Grant it by default, or by group membership, and skip the wait.",
          "The resource is low risk and open to the whole org. A request step only adds friction.",
          "Nobody is clearly responsible for approving. Requests will sit with no one to answer them."
        ],
        alternatives: [
          ["Access by group or role", "When the same people always need the same access. Give it through the group they join, not one request at a time."],
          ["Auto-approval by policy", "When requests that match a rule (same team, low risk, short duration) are always approved. Grant instantly and log it."],
          ["Self-service join", "When a group is open to anyone in a team or domain. Let people join and leave, with the owner notified."],
          ["Share link from the owner", "When access is to one file or space for one task. The owner shares directly and no admin is involved."]
        ],
        mistakes: [
          "Putting the request form in a separate portal, so people have to find it and retype what they were trying to open.",
          "Asking requesters to pick a technical role name they don’t understand, then routing the wrong role to the approver.",
          "Not saying who the request went to or how long it usually takes, so people chase it in chat.",
          "Allowing duplicate requests for the same access, which splits the approver’s attention and the audit trail."
        ]
      },

      "Approval queue": {
        tradeoff: "A queue makes approvers efficient at volume, but it also makes approving feel routine. The design has to keep speed for safe requests and slow people down for risky ones.",
        use: [
          "One person or team approves many requests a week, often for different resources.",
          "Requests vary in risk, so some can be handled in bulk and some need a closer look.",
          "Requests age, and a slow answer has a real cost to the person waiting.",
          "Approvers need to hand off work when they’re away."
        ],
        avoid: [
          "Approvers see only one or two requests a month. A notification with Approve and Deny is enough.",
          "Every request needs the same careful review. Bulk tools invite rubber-stamping.",
          "Approvals already happen in chat or email and work well there. Add actions to those, not a new place to check."
        ],
        alternatives: [
          ["Approve from the notification", "When volume is low. Put Approve and Deny, with the key context, in the email or chat message."],
          ["Inbox of mixed tasks", "When approvers also handle reviews, alerts and other work. One list of everything waiting, filterable by type."],
          ["Auto-approval with a review afterwards", "When most requests are fine and speed matters more. Grant now, and sample decisions later."],
          ["Escalation to a group", "When individual approvers are often away. Route to a group where anyone can answer."]
        ],
        mistakes: [
          "Making approvers open each request to approve it, so a dozen routine requests take a dozen page loads.",
          "Allowing bulk approval of high-risk requests along with low-risk ones.",
          "Sorting newest first, so the oldest requests, the ones closest to escalation, sink to the bottom.",
          "No delegation: requests pile up behind someone on leave, and requesters can’t tell why."
        ]
      },

      "Review detail": {
        tradeoff: "More context makes for better decisions but slower ones. Show what changes the decision, and keep everything else one click away.",
        use: [
          "The approver isn’t sure whether this person should have this access, and the answer depends on who they are and what they’d get.",
          "Requests can be narrowed: a shorter duration, a smaller scope or a lower level.",
          "Some requests are unusual compared with the requester’s peers, and that’s worth flagging.",
          "Decisions are audited, so the reason and the context at the time need keeping."
        ],
        avoid: [
          "Requests are routine and low risk, and the queue row already holds everything needed.",
          "The approver can’t act on the context anyway: for example, approval is a formality required by policy.",
          "The detail page would mostly repeat the queue row. Expand the row instead of opening a page."
        ],
        alternatives: [
          ["Expandable row in the queue", "When a little more context is enough. Open details inline and keep the approver in the list."],
          ["Side panel", "When approvers move through requests one after another. Keep the queue visible beside the detail."],
          ["Risk summary only", "When volume is very high. Show a plain-language risk level and the one fact that drives it, with the full detail behind it."]
        ],
        mistakes: [
          "Showing a permission code like files.write.all without saying in plain words what it lets someone do.",
          "Hiding that the requester is also an owner or an approver of the same resource.",
          "Requiring a comment on every approval, so comments become ‘ok’ and stop meaning anything.",
          "Offering only approve or deny, when the right answer is ‘yes, but for a week’ or ‘yes, but read only’."
        ]
      },

      "Time-bound access": {
        tradeoff: "Expiry removes standing access but adds interruptions: renewals, extensions and access ending mid-task. It’s worth it where the access is sensitive or rarely needed.",
        use: [
          "Access is sensitive: admin rights, production systems, legal or financial data.",
          "The need is tied to a task, a project or an incident with an end.",
          "Auditors ask how much standing access exists and how it’s limited.",
          "Revocation can be done reliably, everywhere the access reaches."
        ],
        avoid: [
          "The access is part of someone’s everyday job. Constant renewals teach people to request the longest duration.",
          "Expiry can’t be enforced in every system, so the console says it ended while access quietly continues.",
          "Nobody is told before access ends, and losing it would interrupt critical work."
        ],
        alternatives: [
          ["Standing access with periodic reviews", "When access is part of a role. Keep it, and confirm it in an access review every quarter or so."],
          ["Just-in-time elevation", "When admin rights are needed for minutes, not days. Grant on request, scoped to the task, and log every action."],
          ["Break-glass account", "When access is only for emergencies. A sealed account that alerts security whenever it’s used."]
        ],
        mistakes: [
          "Showing expiry only as a UTC timestamp, so people can’t tell when their access actually ends.",
          "No warning before expiry, so access ends in the middle of work and the person files an urgent request.",
          "Extensions that start a brand-new request, losing the original reason and approver.",
          "Revoking in the console but not in connected systems, so the record and reality drift apart."
        ]
      },

      "Access reviews": {
        tradeoff: "Reviews catch access that should have gone, but they ask a lot of reviewers. Too many items, and reviewers approve everything to get through.",
        use: [
          "An audit standard or policy requires periodic certification of who has access.",
          "Access builds up over time through moves, projects and exceptions, and nothing else removes it.",
          "Managers or owners can judge whether access is still needed, given the right context.",
          "Removals can be applied automatically once decided."
        ],
        avoid: [
          "Most access is time-bound already, so there’s little standing access to review.",
          "Reviewers have no way to judge: no usage data, no context, unfamiliar systems. The review becomes a formality.",
          "Removals would need manual follow-up that nobody owns."
        ],
        alternatives: [
          ["Event-driven reviews", "When access should change at moments: a team move, a manager change, a project ending. Review then, not on a calendar."],
          ["Automatic removal of unused access", "When usage data is reliable. Remove access unused for 90 days, with notice, and let people ask again."],
          ["Risk-based sampling", "When volume is huge. Review risky and unusual access in full, and sample the rest."]
        ],
        mistakes: [
          "Presenting thousands of rows where Approve all is the only realistic option.",
          "No usage or peer context, so reviewers can’t tell which access matters.",
          "Leaving removals as a task for later, so the campaign ends with nothing actually removed.",
          "No deadline or reminders, so campaigns drift and the evidence is incomplete when auditors ask."
        ]
      }
    }
  }
});
