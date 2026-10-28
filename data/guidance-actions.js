/* Guidance for the Actions & flows group.
   Same shape as guidance.js. Tags: WCAG 2.2 success criteria or UD principles. */

Object.assign(window.WCAG, {
  "2.1.2": "No Keyboard Trap",
  "3.2.4": "Consistent Identification",
  "3.3.6": "Error Prevention (All)"
});

Object.assign(window.GUIDANCE, {

  /* ------------------------------------------------------------------ */
  "creation-flows": {
    scale: {
      intro: "Creating something in an admin console is rarely just filling in a form. A new workspace, policy or integration has owners, defaults, permissions and dependencies, and at enterprise size it is created many times over by different admins who need consistent results. The aim is a flow that is quick for the simple case, guided for the complex one, and repeatable through templates and automation for the hundredth time.",
      tiers: [
        ["Tens", "Admins create things one at a time with a short form. Defaults matter more than options."],
        ["Thousands", "The same kind of object is created over and over. Templates, cloning and naming conventions keep results consistent."],
        ["Hundreds of thousands", "Most objects are created by API, infrastructure-as-code or provisioning rules. The UI is for exceptions, and must produce the same result the automation would."]
      ],
      principles: [
        "Match the container to the complexity: inline for a single field, a modal for a few, a page or wizard for many.",
        "Ask only what can’t be defaulted, and show the defaults before creating.",
        "Make creation idempotent and safe to retry. A double-click or timeout shouldn’t create two of something.",
        "Every UI create flow should have an API equivalent, and the UI can show the matching request.",
        "Name and own everything at creation. Unowned, unnamed objects become clutter nobody can clean up."
      ]
    },
    patterns: {
      "Create modal": {
        think: [
          "A modal suits small objects that need a few fields and keep the admin in context, such as a tag, a group or an API key.",
          "If the form grows past one screen, or needs reference material from the page behind it, it has outgrown a modal."
        ],
        do: [
          "Keep it to the essential fields, with a clear title that says what is being created.",
          "Put the primary action last, labelled with the verb and object, such as ‘Create group’.",
          "Validate inline and keep the modal open with entered values if creation fails.",
          "Close on success and show the new item highlighted, with a confirmation."
        ],
        dont: [
          "Don’t stack modals on top of modals.",
          "Don’t lose everything the admin typed when they click outside by accident.",
          "Don’t use a modal for long or multi-section forms."
        ],
        access: [
          ["WCAG 2.4.3", "Move focus into the modal on open, keep it there while open, and return it to the trigger on close."],
          ["WCAG 2.1.2", "Esc must close the modal, so keyboard users are never trapped."],
          ["WCAG 4.1.2", "Use a real dialog role with an accessible name taken from the title."],
          ["WCAG 1.4.10", "On small screens and at high zoom, the modal becomes full screen and scrolls."],
          ["UD 5", "Confirm before discarding a partly filled modal."]
        ],
        scale: [
          "Prevent duplicate creation from double-submits by disabling the button while saving and using idempotency keys.",
          "Check name uniqueness on the server, since many admins may create at once.",
          "Offer ‘Create another’ for repeated creation."
        ]
      },

      "Multi-step wizard": {
        think: [
          "Wizards suit setups with dependencies, where later choices depend on earlier ones, such as SSO, integrations or policies.",
          "Each step should answer one question. If a step has no decision in it, merge or remove it."
        ],
        do: [
          "Show the steps, which one is current, and which are complete.",
          "Let admins go back without losing later work, and save progress as a draft.",
          "End with a review step that summarises every choice and links back to edit it.",
          "Explain what will happen when they finish, such as ‘SSO will apply to new sign-ins’."
        ],
        dont: [
          "Don’t require completing the wizard in one sitting for long setups.",
          "Don’t hide which steps are optional.",
          "Don’t make the step indicator clickable for steps that can’t be reached yet."
        ],
        access: [
          ["WCAG 3.3.7", "Don’t ask for information already entered in an earlier step."],
          ["WCAG 2.4.6", "Each step has a heading naming it, and the step count is in text (‘Step 2 of 4’)."],
          ["WCAG 4.1.3", "Announce step changes and validation summaries."],
          ["WCAG 2.4.3", "Move focus to the new step’s heading when advancing."],
          ["UD 3", "One question per step keeps the load manageable."]
        ],
        scale: [
          "Long setups are often split between people. Let admins save a draft and share it with a colleague.",
          "Export the finished configuration so it can be reused or applied by automation.",
          "Validate against live systems at the end (connections, permissions) before committing."
        ]
      },

      "Create from template": {
        think: [
          "Templates encode an org’s standards: naming, defaults, permissions. They make the right setup the easy one.",
          "Templates come from the product and from the org. Admins need to tell them apart."
        ],
        do: [
          "Show what a template includes before it’s used: settings, permissions, content.",
          "Separate built-in templates from org-created ones, and show who owns each.",
          "Let admins adjust template values before creating.",
          "Offer ‘Start blank’ as an equal option."
        ],
        dont: [
          "Don’t apply a template without showing what it will set.",
          "Don’t silently update existing objects when a template changes.",
          "Don’t let template galleries grow with no search or ownership."
        ],
        access: [
          ["WCAG 1.1.1", "Template preview images have text descriptions of what they contain."],
          ["WCAG 2.4.4", "‘Use template’ buttons name the template."],
          ["UD 2", "Offer templates and blank creation so experienced and new admins both have a path."]
        ],
        scale: [
          "Enforce templates for certain object types, so every new workspace follows policy.",
          "Version templates and record which version each object came from.",
          "Report on template use and drift from the template over time."
        ]
      },

      "Inline create": {
        think: [
          "Inline creation suits lightweight items added while working in a list, such as a tag, a row or a label.",
          "It must be clear when the new item is saved, and what happens if it isn’t."
        ],
        do: [
          "Add a new row or field in place, focused and ready for input.",
          "Save on Enter or a visible check button, cancel on Esc.",
          "Show saving, saved and error states on the row itself.",
          "Fall back to a full form for anything that needs more than a few fields."
        ],
        dont: [
          "Don’t autosave a half-typed name on blur without confirmation.",
          "Don’t lose the new row if validation fails.",
          "Don’t sort the new item out of view as soon as it’s created."
        ],
        access: [
          ["WCAG 3.2.2", "Typing in the new row doesn’t save or move focus unexpectedly."],
          ["WCAG 4.1.3", "Announce ‘Saved’ or the error, without moving focus."],
          ["WCAG 2.1.1", "Create, save and cancel all work by keyboard."]
        ],
        scale: [
          "In large lists, keep new items pinned at the top until the admin navigates away.",
          "Check uniqueness on the server.",
          "Use optimistic updates with clear rollback when the server rejects a change."
        ]
      },

      "Duplicate / clone": {
        think: [
          "Cloning is the fastest way to create something similar. The risk is copying things that shouldn’t come along, like members, secrets or history.",
          "Say exactly what is copied and what isn’t."
        ],
        do: [
          "Let admins choose what to copy: settings, permissions, members, content.",
          "Name the copy clearly, such as ‘Copy of Finance policy’, and focus the name field.",
          "Exclude secrets, keys and audit history by default, and say so.",
          "Open the clone ready to edit."
        ],
        dont: [
          "Don’t copy credentials, tokens or API keys.",
          "Don’t copy members into a clone silently, which grants access unexpectedly.",
          "Don’t leave clones looking identical to the original in lists."
        ],
        access: [
          ["WCAG 3.3.2", "Each copy option has a label and short explanation."],
          ["WCAG 3.2.4", "Use the same word, ‘Duplicate’ or ‘Clone’, everywhere in the product."],
          ["UD 5", "Default to copying less, with an option to include more."]
        ],
        scale: [
          "Cloning large objects (workspaces with content) runs as a job.",
          "Record the source of each clone for traceability.",
          "Offer bulk cloning for rolling out a standard setup across many teams or regions."
        ]
      },

      "Success & next steps": {
        think: [
          "Creation isn’t the end of the task. The success state should help admins finish setting the object up.",
          "Admins need confidence that it worked and what changed."
        ],
        do: [
          "Confirm what was created and show where it is.",
          "Offer the two or three most likely next actions, such as add members or set permissions.",
          "Show any follow-up that’s required before the object works, such as verifying a domain.",
          "Link to the created object’s page."
        ],
        dont: [
          "Don’t end with a toast that disappears before it can be read.",
          "Don’t offer a long list of generic suggestions.",
          "Don’t send admins back to the top of a list where the new item isn’t visible."
        ],
        access: [
          ["WCAG 4.1.3", "Success messages are announced to screen readers."],
          ["WCAG 2.2.1", "Messages with actions stay until dismissed, or long enough to use."],
          ["UD 3", "Use a short, consistent success pattern across all creation flows."]
        ],
        scale: [
          "For objects created by background jobs, show pending and then ready states, and notify when done.",
          "Show the equivalent API call or configuration for automation.",
          "Track setup completion to spot objects created but never finished."
        ]
      }
    }
  },

  /* ------------------------------------------------------------------ */
  "edit-bulk-actions": {
    scale: {
      intro: "In an enterprise console, changing one thing is the exception. Admins change hundreds or thousands of records at a time: reassigning licences after a re-org, suspending accounts during an incident, retagging a library. Bulk actions turn hours of clicking into one decision, which also means one mistake can affect thousands of records. The design must make the selection obvious, the impact visible, and the outcome reportable.",
      tiers: [
        ["Tens", "Checkboxes on a page and a few actions are enough."],
        ["Thousands", "Selections span pages. Actions run in the background. Partial failures need reporting."],
        ["Hundreds of thousands", "Admins act on query results, not selections. Changes are queued, throttled, logged and sometimes approved first."]
      ],
      principles: [
        "Make the scope unmistakable: these 50 rows, all 12,408 matches, or a saved query.",
        "Preview the impact before running: how many records, and what changes.",
        "Run large actions as jobs with progress, and keep the UI usable while they run.",
        "Report results per item, including skipped and failed ones, with reasons and a retry.",
        "Log every bulk action as one auditable event with the full list of affected records."
      ]
    },
    patterns: {
      "Selection model": {
        think: [
          "Selection is the most misunderstood part of bulk actions. Admins must always know exactly what is selected.",
          "The hardest case is selecting across pages or ‘all results’, where the selected items aren’t on screen."
        ],
        do: [
          "Use row checkboxes and a header checkbox for the current page.",
          "After selecting a page, offer ‘Select all 12,408 matching’ with the count.",
          "Show the selection count clearly, and keep it when paging or sorting.",
          "Support shift-click to select a range."
        ],
        dont: [
          "Don’t let the header checkbox mean ‘all results’ without saying so.",
          "Don’t clear selections when filters change without warning.",
          "Don’t make the whole row toggle selection if the row also opens a detail page."
        ],
        access: [
          ["WCAG 4.1.2", "Checkboxes have names that identify the row, such as ‘Select Alex Chen’."],
          ["WCAG 4.1.3", "Announce the selection count when it changes."],
          ["WCAG 2.5.8", "Checkboxes have a target of at least 24 by 24 pixels."],
          ["UD 6", "Range selection and ‘select all matching’ save many repeated actions."]
        ],
        scale: [
          "‘Select all matching’ should store the query, not a list of IDs, and re-evaluate when the job runs.",
          "Warn if results changed between selection and action.",
          "Set and explain limits on selection size for risky actions."
        ]
      },

      "Contextual action bar": {
        think: [
          "When items are selected, the available actions change. The action bar shows what can be done to the selection.",
          "Its position should be predictable and not cover the content being worked on."
        ],
        do: [
          "Show the selection count and the actions in a bar that appears on selection.",
          "Put common actions first, and destructive actions last and separated.",
          "Disable actions that don’t apply to every selected item, and explain why.",
          "Include a clear way to deselect all."
        ],
        dont: [
          "Don’t hide the bar off screen on long pages.",
          "Don’t change the order of actions depending on what is selected.",
          "Don’t put delete next to the most common action."
        ],
        access: [
          ["WCAG 2.4.11", "A sticky action bar must not cover the focused row or control."],
          ["WCAG 4.1.3", "Announce that actions are available when the bar appears."],
          ["WCAG 2.4.3", "The bar is reachable in a sensible focus order, near the list it acts on."],
          ["UD 3", "Keep actions in the same place every time."]
        ],
        scale: [
          "Not all selected items may support an action. Show how many will be affected and how many skipped.",
          "Check permissions per item on the server, and report items the admin can’t change.",
          "Offer the same actions through API for scripted bulk work."
        ]
      },

      "Bulk edit": {
        think: [
          "Bulk edit changes one or a few fields across many records. The key question is what happens to the existing values.",
          "Mixed values need careful handling: replacing, adding to and removing from are different operations."
        ],
        do: [
          "Let admins pick the field, then the operation: set, add, remove or clear.",
          "Show mixed current values honestly, such as ‘Various’.",
          "Preview the change on a few example records with before and after.",
          "Confirm with a count before applying."
        ],
        dont: [
          "Don’t overwrite all values when the admin meant to add one tag.",
          "Don’t apply bulk edits without confirmation.",
          "Don’t allow editing fields that are synced from another system."
        ],
        access: [
          ["WCAG 3.3.2", "Explain each operation in plain words, such as ‘Add to existing tags’."],
          ["WCAG 3.3.4", "Show a review and confirm before changing many records."],
          ["UD 5", "Offer undo or a revert job for recent bulk edits."]
        ],
        scale: [
          "Large edits run as jobs with throttling to protect downstream systems.",
          "Keep before values so a bulk change can be reverted.",
          "Require approval for bulk edits above a threshold or on sensitive fields."
        ]
      },

      "Inline edit": {
        think: [
          "Inline edit suits quick corrections to a single field without leaving the list.",
          "It needs clear edit, save and cancel states so changes aren’t made or lost by accident."
        ],
        do: [
          "Show an edit affordance on hover and focus, such as a pencil icon.",
          "Save with Enter or a button, cancel with Esc, and show saving and saved states.",
          "Validate before saving and keep the field open on error.",
          "Show who changed it and when, nearby or in history."
        ],
        dont: [
          "Don’t make every cell editable by single click in a dense table. It causes accidental edits.",
          "Don’t save on blur without making that clear.",
          "Don’t allow inline edits to fields with large side effects, such as email or role."
        ],
        access: [
          ["WCAG 2.1.1", "Enter edit mode, save and cancel all work with the keyboard."],
          ["WCAG 1.4.13", "Edit icons shown on hover also appear on focus, and don’t hide content."],
          ["WCAG 4.1.3", "Announce saved and error states."]
        ],
        scale: [
          "Handle conflicts when someone else changed the value since the page loaded.",
          "Debounce and queue rapid edits rather than sending one request per keystroke.",
          "Log inline edits like any other change."
        ]
      },

      "Progress & results": {
        think: [
          "Bulk actions finish later than the click. Admins need to know where things stand and what happened.",
          "Partial success is the normal case at scale. Reporting it well is the whole job."
        ],
        do: [
          "Show progress with counts, such as ‘3,200 of 12,408 done’, and an estimate.",
          "Let admins leave the page and come back, or be notified when done.",
          "Report results: succeeded, skipped, failed, with reasons and a downloadable list.",
          "Offer ‘Retry failed’ on just the items that failed."
        ],
        dont: [
          "Don’t block the UI while a long job runs.",
          "Don’t report ‘Done’ when some items failed.",
          "Don’t make admins re-select failed items by hand."
        ],
        access: [
          ["WCAG 4.1.3", "Announce progress at sensible intervals and on completion, not on every item."],
          ["WCAG 4.1.2", "Progress bars have an accessible name and current value."],
          ["WCAG 2.2.1", "Results don’t disappear on a timer."],
          ["UD 4", "Give results in numbers and words, not only a coloured bar."]
        ],
        scale: [
          "Keep a jobs page listing recent bulk actions, who ran them and their results.",
          "Make jobs resumable after interruptions.",
          "Allow cancelling a running job, and report what was already applied."
        ]
      }
    }
  },

  /* ------------------------------------------------------------------ */
  "destructive-actions": {
    scale: {
      intro: "Destructive actions in a console don’t delete a file; they delete a workspace with ten thousand files, revoke access for a whole department, or reset an integration that a hundred workflows depend on. The goal isn’t to scare admins with warnings, but to make consequences concrete, offer the reversible option first, and keep a way back for as long as it’s practical.",
      tiers: [
        ["Tens", "A confirmation dialog that names the item and its consequences is enough."],
        ["Thousands", "Deletes cascade into content, access and integrations. Soft delete, restore windows and impact counts become essential."],
        ["Hundreds of thousands", "Destructive actions need approvals, retention and legal-hold checks, staged execution, and complete audit records."]
      ],
      principles: [
        "Offer the reversible option first: archive, suspend or disable before delete.",
        "Make consequences concrete with names and counts, not generic warnings.",
        "Scale the friction to the risk. A tag deletion needs undo; deleting an org needs typed confirmation.",
        "Keep a restore window and say how long it is.",
        "Never let a destructive action skip retention or legal-hold policy."
      ]
    },
    patterns: {
      "Delete confirmation": {
        think: [
          "A confirmation is only useful if it tells the admin something they don’t already know: what else will be affected.",
          "Confirmations that appear for everything get clicked through without reading."
        ],
        do: [
          "Name the item and state the consequences specifically, such as ‘Deletes 312 files and removes access for 48 people’.",
          "Say whether it can be undone, and for how long.",
          "Label the button with the action, such as ‘Delete workspace’, not ‘OK’.",
          "Default focus to the safe option."
        ],
        dont: [
          "Don’t ask ‘Are you sure?’ with no information.",
          "Don’t confirm low-risk actions that undo could handle.",
          "Don’t style the destructive button as the default primary action."
        ],
        access: [
          ["WCAG 3.3.4", "Destructive changes to data must be reversible, checked, or confirmed."],
          ["WCAG 2.4.3", "Focus starts on the safe option and returns to a sensible place after closing."],
          ["WCAG 1.4.1", "The destructive button is identified by its label, not only red colour."],
          ["UD 5", "Make the consequences and the way back visible in the dialog."]
        ],
        scale: [
          "Compute impact counts on the server, and show ‘calculating’ while they load.",
          "For bulk deletes, show a summary across all selected items.",
          "Run large deletions as jobs, with the restore window starting when they finish."
        ]
      },

      "Type-to-confirm": {
        think: [
          "Typing the name forces a pause and confirms the admin is acting on the right thing. Use it only for the highest-risk actions.",
          "It adds friction for everyone, including people for whom typing is hard."
        ],
        do: [
          "Reserve it for irreversible, high-impact actions, such as deleting an org or a production integration.",
          "Show exactly what to type, and let it be copied.",
          "Match case-insensitively and ignore extra spaces.",
          "Enable the button only when the text matches, and say why it’s disabled."
        ],
        dont: [
          "Don’t use typed confirmation for routine deletions.",
          "Don’t ask people to type long random strings.",
          "Don’t block paste."
        ],
        access: [
          ["WCAG 3.3.2", "Label the field with the exact text required."],
          ["WCAG 4.1.3", "Announce when the text matches and the button becomes available."],
          ["UD 6", "Allow paste so people with motor or cognitive disabilities aren’t burdened."],
          ["UD 5", "The friction is the point, but only where an error would be severe."]
        ],
        scale: [
          "Combine with approvals for the most critical actions, so one admin can’t act alone.",
          "Log the confirmation as part of the audit record.",
          "For bulk high-risk deletions, confirm the count rather than each name."
        ]
      },

      "Archive vs. delete": {
        think: [
          "Most admins who click delete actually want the thing out of the way, not gone forever. Archive serves that.",
          "Archive must have clear, different consequences from delete, or it’s just a confusing second button."
        ],
        do: [
          "Offer archive first, with delete as a separate, secondary choice.",
          "Explain the difference: archived items are hidden and read-only, but kept and restorable.",
          "Show archived items in a filter or separate view, not mixed in.",
          "Let admins restore from archive in one step."
        ],
        dont: [
          "Don’t make archive and delete look the same.",
          "Don’t let archived items keep consuming paid seats without saying so.",
          "Don’t make archive the only option when people need to delete for privacy or legal reasons."
        ],
        access: [
          ["WCAG 3.2.4", "Use ‘Archive’ and ‘Delete’ consistently everywhere."],
          ["WCAG 1.4.1", "Archived state is shown in text, not only by greying out."],
          ["UD 5", "Archive gives a safe default for removing clutter."]
        ],
        scale: [
          "Archive large sets by rule, such as inactive for a year.",
          "Apply retention to archives, so they’re deleted on schedule.",
          "Report archive size and cost separately."
        ]
      },

      "Undo toast": {
        think: [
          "Undo replaces confirmation for low-risk, frequent actions. It keeps admins moving and still allows recovery.",
          "It only works if the action is truly deferred or reversible, and the toast stays long enough to use."
        ],
        do: [
          "Show what happened and an Undo button, such as ‘3 tags removed. Undo’.",
          "Keep the toast visible long enough to read and act, and pause the timer on hover or focus.",
          "Make undo restore everything exactly as it was.",
          "Offer another way back after the toast is gone, such as trash."
        ],
        dont: [
          "Don’t use undo for actions that can’t really be reversed.",
          "Don’t dismiss the toast after two or three seconds.",
          "Don’t stack many toasts that cover the page."
        ],
        access: [
          ["WCAG 2.2.1", "Give enough time to use Undo, and let people extend or pause it."],
          ["WCAG 4.1.3", "Announce the toast message and that Undo is available."],
          ["WCAG 2.4.11", "Toasts must not cover the focused element."],
          ["UD 5", "Undo makes errors cheap to fix without slowing everyone down."]
        ],
        scale: [
          "Undo for bulk actions should revert the whole batch.",
          "Delay execution on the server until the undo window closes, or keep enough data to reverse it.",
          "Log both the action and the undo."
        ]
      },

      "Cascading impact": {
        think: [
          "Deleting one object can remove access, break integrations and orphan content elsewhere. Admins need to see that chain.",
          "Some dependencies should block the action entirely until resolved."
        ],
        do: [
          "List dependent objects grouped by type, with counts and links.",
          "Separate what will be deleted, what will be detached, and what will break.",
          "Block deletion when something critical depends on the object, and say what to change first.",
          "Offer to reassign dependents before deleting."
        ],
        dont: [
          "Don’t delete dependents silently.",
          "Don’t show only a total count with no breakdown.",
          "Don’t let a delete break integrations without warning."
        ],
        access: [
          ["WCAG 1.3.1", "Group dependents with headings or lists so the structure is announced."],
          ["WCAG 2.4.4", "Links to dependents say what they open."],
          ["UD 4", "State the impact in words and numbers."]
        ],
        scale: [
          "Dependency graphs are large. Compute them on the server with limits and summaries.",
          "Provide a dry-run report before large deletions.",
          "Run cascades as jobs with ordered steps and a report."
        ]
      },

      "Danger zone": {
        think: [
          "A danger zone gathers irreversible, high-impact settings in one clearly marked place, away from routine settings.",
          "Its purpose is separation, so admins don’t change these settings by accident."
        ],
        do: [
          "Place it at the end of the settings page, visually separated.",
          "Explain each action’s consequences next to its button.",
          "Require confirmation, and typed confirmation for the most severe actions.",
          "Restrict access to owners or super admins."
        ],
        dont: [
          "Don’t mix danger-zone actions in with everyday settings.",
          "Don’t rely only on red colour to mark the section.",
          "Don’t show danger-zone actions to admins who can’t use them."
        ],
        access: [
          ["WCAG 2.4.6", "Give the section a clear heading such as ‘Irreversible actions’."],
          ["WCAG 1.4.1", "Mark the section with a heading and border, not only colour."],
          ["UD 7", "Give these controls space so they aren’t clicked by accident."]
        ],
        scale: [
          "Require approval from a second admin for org-level actions.",
          "Notify all owners when a danger-zone action is taken.",
          "Log and alert on every danger-zone action."
        ]
      }
    }
  },

  /* ------------------------------------------------------------------ */
  "import-export": {
    scale: {
      intro: "Import and export are how admin consoles connect to spreadsheets, HR systems, auditors and other tools. Files are messy, large and often sensitive. At enterprise size imports run to hundreds of thousands of rows and exports may contain the whole directory, so both must be background jobs, validated, logged and safe to run twice.",
      tiers: [
        ["Tens", "A CSV upload with a template and a download button."],
        ["Thousands", "Field mapping, validation reports and partial imports become essential. Exports are filtered and scheduled."],
        ["Hundreds of thousands", "Imports are jobs with history and rollback. Exports are scheduled, streamed, access-controlled and audited, with API and connector alternatives."]
      ],
      principles: [
        "Validate everything before changing anything, and report problems by row and column.",
        "Make imports idempotent, so re-running the same file doesn’t create duplicates.",
        "Run large files as jobs with progress and a history of every run.",
        "Treat exports as data leaving the org: permission-checked, logged and minimised.",
        "Offer an API or connector for anything people import or export regularly."
      ]
    },
    patterns: {
      "CSV import": {
        think: [
          "Import is a three-stage job: get the file in, find the problems, commit the good rows.",
          "Most effort goes into helping people fix their data, not into uploading it."
        ],
        do: [
          "Provide a template with example rows and required columns marked.",
          "Accept common formats and encodings, and detect delimiters.",
          "Show a summary before importing: rows found, ready, with errors, duplicates.",
          "Let admins choose how to handle existing records: skip, update or stop."
        ],
        dont: [
          "Don’t import partially and fail with a generic error.",
          "Don’t require an exact column order.",
          "Don’t reject a whole file for one bad row."
        ],
        access: [
          ["WCAG 2.1.1", "File selection works by keyboard, not only drag and drop."],
          ["WCAG 3.3.2", "State required columns and accepted formats before upload."],
          ["WCAG 4.1.3", "Announce upload progress and the validation summary."],
          ["UD 2", "Offer upload, paste and template download as different ways in."]
        ],
        scale: [
          "Stream large files and process them in the background.",
          "Keep an import history with the original file, who ran it and the result report.",
          "Rate-limit to protect downstream systems, and show the queue."
        ]
      },

      "Field mapping": {
        think: [
          "Mapping connects the file’s columns to the product’s fields. It’s where most import errors start.",
          "Good automatic matching saves time, but admins must be able to check and correct it."
        ],
        do: [
          "Auto-match columns by header names and synonyms, and show confidence.",
          "Show sample values next to each mapping so admins can check them.",
          "Allow ignoring columns and setting default values for unmapped fields.",
          "Save mappings for reuse with the same file layout."
        ],
        dont: [
          "Don’t hide automatic mappings; show them for review.",
          "Don’t allow two columns mapped to the same field without warning.",
          "Don’t lose mapping work if the admin goes back to re-upload."
        ],
        access: [
          ["WCAG 1.3.1", "Present mappings as a table: file column, sample values, product field."],
          ["WCAG 4.1.2", "Each mapping dropdown is labelled with its column name."],
          ["WCAG 3.3.7", "Remember mappings so admins don’t redo them for the same layout."],
          ["UD 3", "Automatic matching handles the common case; manual adjustment handles the rest."]
        ],
        scale: [
          "Org-level saved mappings support repeated imports from HR or other systems.",
          "Validate mapped values against field types and allowed values across the whole file.",
          "Version mappings when the product’s fields change."
        ]
      },

      "Validation & errors": {
        think: [
          "Validation is where admins spend most of their time in an import. Make errors specific, findable and fixable.",
          "Group similar errors. Five hundred rows with the same problem is one problem."
        ],
        do: [
          "Report errors by row and column, with what’s wrong and how to fix it.",
          "Group errors by type with counts.",
          "Let admins fix errors inline, or download only the failed rows to fix and re-upload.",
          "Separate errors (blocking) from warnings (allowed but suspicious)."
        ],
        dont: [
          "Don’t show only the first error.",
          "Don’t use technical messages like ‘constraint violation’.",
          "Don’t make admins re-upload the whole file to fix a few rows."
        ],
        access: [
          ["WCAG 3.3.1", "Identify each error in text with its row and field."],
          ["WCAG 3.3.3", "Suggest the fix, such as ‘Expected a date like 2026-10-27’."],
          ["WCAG 3.3.6", "Let admins review and correct before anything is submitted."],
          ["UD 5", "Valid rows are kept while invalid ones are fixed."]
        ],
        scale: [
          "Large files can have thousands of errors. Group, paginate and export them.",
          "Validate against live data (existing users, groups) on the server.",
          "Allow importing valid rows and queueing invalid ones for later."
        ]
      },

      "Export": {
        think: [
          "Every export is data leaving the system. It’s useful and risky at the same time.",
          "Admins export for audits, reporting, migrations and troubleshooting. Each needs different fields and formats."
        ],
        do: [
          "Export the current filtered view, or let admins choose fields.",
          "Offer common formats such as CSV and JSON, and say what each contains.",
          "Run large exports as jobs, with a notification and a time-limited download link.",
          "Show who exported what and when."
        ],
        dont: [
          "Don’t include sensitive fields by default.",
          "Don’t send exports as email attachments.",
          "Don’t let scoped admins export data outside their scope."
        ],
        access: [
          ["WCAG 4.1.3", "Announce when the export starts and when it’s ready."],
          ["WCAG 2.4.4", "Download links name the file and format."],
          ["UD 2", "Offer formats suited to spreadsheets and to other tools."]
        ],
        scale: [
          "Stream exports to file storage rather than building them in memory.",
          "Schedule recurring exports for reporting and compliance.",
          "Require approval or extra authentication for exports of sensitive data."
        ]
      }
    }
  }
});
