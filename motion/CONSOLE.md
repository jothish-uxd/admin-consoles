# Echo Base Console: where every pattern lives

Every clip is set in one mock product, the Echo Base Console, so the clips read as one product. This map gives each pattern its place in that console. Use it when building a clip: set the rail section with `data-at` and the breadcrumb with `data-path` (see motion/shared/motion.js).

## The rail

Fixed in every clip, in this order. Admin only shows when the person is an admin.

| Section | `data-at` | Holds |
|---|---|---|
| **Workspace** · Home | `home` | Setup checklist, admin home, recommendations |
| Archives | `archives` | The content people browse; access-denied pages |
| My access | `myaccess` | A person's own grants and requests |
| **Admin** · People | `people` | Users, Groups, Roles, Sign-in & security, Devices |
| Access | `access` | Approvals, Reviews |
| Content | `content` | All content, Tags, Storage, Trash, Sources |
| AI | `ai` | Features, Data use, Models, Usage, Safety |
| Compliance | `compliance` | Policies, Retention, Legal holds, Audit log |
| Insights | `insights` | Adoption, Reports |
| Billing | `billing` | Plan, Seats, Invoices |
| Settings | `settings` | Organization, Defaults, Integrations, API keys, Webhooks, Notifications, Announcements |

Cross-cutting patterns (actions, tables, search, empty states) are shown on a real page that needs them, listed below, so they appear in context rather than on a page of their own.

People: the person is Lavanya Sienna. As an admin her title fits the scene (Jedi Master); when she is the one asking (member view) she is a Jedi in training and sees only Workspace.

## People & access

### User management

| Pattern | Section / page |
|---|---|
| Invite / add user | People / Users |
| User directory | People / Users |
| User detail | People / Users |
| Edit profile | People / Users |
| Suspend / deactivate | People / Users |
| Offboarding | People / Users · Offboarding |
| Pending invites | People / Users · Invites |
| Bulk add users | People / Users |
| Auto-join by domain | People / Users · Auto-join |

### Roles & permissions

| Pattern | Section / page |
|---|---|
| Role catalog | People / Roles |
| Permission matrix | People / Roles |
| Create custom role | People / Roles |
| Assign role | People / Roles |
| Scoped access | People / Roles |
| Effective permissions | People / Roles |

### Groups & teams

| Pattern | Section / page |
|---|---|
| Create group | People / Groups |
| Manage members | People / Groups |
| Dynamic groups | People / Groups |
| Nested groups | People / Groups |
| Directory sync | People / Groups · Directory sync |

### Security & identity

| Pattern | Section / page |
|---|---|
| SSO setup | People / Sign-in & security |
| MFA enforcement | People / Sign-in & security |
| Session management | People / Sign-in & security |
| Domain verification | People / Sign-in & security |
| Device management | People / Devices |
| IP allowlists | People / Sign-in & security |

### Access requests & approvals

| Pattern | Section / page |
|---|---|
| Request access | Archives (member view) |
| Approval queue | Access / Approvals |
| Review detail | Access / Approvals |
| Time-bound access | My access (member view) |
| Access reviews | Access / Reviews |

## Content & assets

### Asset management

| Pattern | Section / page |
|---|---|
| Asset library | Content / All content |
| Asset detail | Content / All content / an item |
| Transfer ownership | Content / All content · Transfer |
| Sharing controls | Content / All content |
| Versions & restore | Content / All content |
| Tags & metadata | Content / Tags |

### Storage & quotas

| Pattern | Section / page |
|---|---|
| Storage overview | Content / Storage |
| Per-user quotas | Content / Storage |
| Largest items | Content / Storage |
| Trash & recovery | Content / Trash |

### Knowledge & content sources

| Pattern | Section / page |
|---|---|
| Add content source | Content / Sources |
| Sync status | Content / Sources |
| Source permissions | Content / Sources |
| Content exclusions | Content / Sources |

## Actions & flows

### Creation flows

| Pattern | Section / page |
|---|---|
| Create modal | People / Groups · New group |
| Multi-step wizard | Settings / Integrations · Connect |
| Create from template | Compliance / Policies · New policy |
| Inline create | Content / Tags |
| Duplicate / clone | People / Roles · Duplicate |
| Success & next steps | People / Users · after an invite |

### Edit & bulk actions

| Pattern | Section / page |
|---|---|
| Selection model | People / Users |
| Contextual action bar | People / Users |
| Bulk edit | People / Users |
| Inline edit | Content / All content |
| Progress & results | People / Users |

### Destructive actions

| Pattern | Section / page |
|---|---|
| Delete confirmation | Content / All content |
| Type-to-confirm | Settings / Organization · Danger zone |
| Archive vs. delete | People / Groups |
| Undo toast | Content / All content |
| Cascading impact | People / Roles · Delete role |
| Danger zone | Settings / Organization · Danger zone |

### Import & export

| Pattern | Section / page |
|---|---|
| CSV import | People / Users · Import |
| Field mapping | People / Users · Import |
| Validation & errors | People / Users · Import |
| Export | Compliance / Audit log · Export |

## Governance & compliance

### Policies & rules

| Pattern | Section / page |
|---|---|
| Policy list | Compliance / Policies |
| Policy builder | Compliance / Policies |
| Retention policies | Compliance / Retention |
| Legal hold | Compliance / Legal holds |
| Scope & targeting | Compliance / Policies |
| Simulate / test | Compliance / Policies |

### Audit logs & activity

| Pattern | Section / page |
|---|---|
| Audit log table | Compliance / Audit log |
| Event detail | Compliance / Audit log |
| Filters & saved views | Compliance / Audit log |
| Export & SIEM streaming | Compliance / Audit log · Streaming |
| Alerts on events | Compliance / Audit log · Alerts |

### AI governance

| Pattern | Section / page |
|---|---|
| Feature availability | AI / Features |
| Data usage controls | AI / Data use |
| Model & provider settings | AI / Models |
| Usage & cost | AI / Usage |
| Content safety | AI / Safety |

## Platform & configuration

### Billing & licenses

| Pattern | Section / page |
|---|---|
| Plan overview | Billing / Plan |
| Seat assignment | Billing / Seats |
| Add seats | Billing / Seats · Add |
| Invoices & payment | Billing / Invoices |

### Integrations & API keys

| Pattern | Section / page |
|---|---|
| Integration catalog | Settings / Integrations |
| App permissions | Settings / Integrations |
| Create API key | Settings / API keys |
| Webhooks | Settings / Webhooks |

### Org settings

| Pattern | Section / page |
|---|---|
| Settings navigation | Settings |
| Org profile | Settings / Organization |
| Defaults | Settings / Defaults |
| Save patterns | Settings / Organization |
| Inherited settings | Settings / Defaults · per group |

### Usage & insights

| Pattern | Section / page |
|---|---|
| Admin home | Home (admin view) |
| Adoption metrics | Insights / Adoption |
| Reports | Insights / Reports |
| Recommendations | Home (admin view) · Recommendations |

### Notifications & alerts

| Pattern | Section / page |
|---|---|
| Alert center | Top bar · alerts |
| Banners | Any page · top of the page |
| Notification rules | Settings / Notifications |
| Announcements | Settings / Announcements |

## Foundations

### Tables & data grids

| Pattern | Section / page |
|---|---|
| Column management | People / Users |
| Sorting & pagination | People / Users |
| Row actions | People / Users |
| Density | People / Users |
| Expandable rows | People / Users |

### Search & filtering

| Pattern | Section / page |
|---|---|
| Filter bar | Content / All content |
| Advanced query | Content / All content |
| Saved views | Content / All content |
| Global admin search | Top bar · search |

### Empty states & onboarding

| Pattern | Section / page |
|---|---|
| Setup checklist | Home (admin view) |
| Empty table | People / Groups · no groups yet |
| No results | Content / All content · no matches |
| Permission empty state | Any admin link, member view |
