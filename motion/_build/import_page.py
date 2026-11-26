"""People › Users › Import, shared by CSV import, Field mapping and Validation & errors.
Usage: from import_page import CSS, head; head(step) gives the header and stepper, with steps before `step` done."""
CSS = r"""
.imp .back { font-size: 12.5px; color: var(--soft); }
.imp h1 { margin: 6px 0 0; }
.stp { margin-top: 14px; display: flex; gap: 0; align-items: center; font-size: 13px; color: var(--soft); }
.stp .s { display: flex; gap: 8px; align-items: center; }
.stp .n { width: 22px; height: 22px; border-radius: 50%; border: 1.5px solid var(--rule-strong); display: grid; place-items: center; font-size: 11.5px; font-family: "Geist Mono", monospace; color: var(--soft); background: var(--bg); }
.stp .n svg { width: 11px; height: 11px; }
.stp .s.on { color: var(--ink); font-weight: 600; }
.stp .s.on .n { border-color: var(--ink); color: var(--ink); }
.stp .s.dn .n { background: var(--ink); border-color: var(--ink); color: #fff; }
.stp .s.dn { color: var(--ink); }
.stp .ln { width: 48px; height: 1.5px; background: var(--rule-strong); margin: 0 10px; }
.card { margin-top: 14px; border: 1px solid var(--rule-strong); border-radius: 12px; padding: 14px 16px; font-size: 13px; color: var(--soft); }
.card h3 { margin: 0 0 4px; font-size: 14px; color: var(--ink); }
.foot { margin-top: 14px; display: flex; gap: 8px; justify-content: flex-end; align-items: center; }
.foot .note { flex: 1; font-size: 12.5px; color: var(--soft); }
.foot .btn { height: 36px; }
.btn.dn2 { background: #404040; border-color: #404040; color: #fff; }
"""
STEPS = ["Upload", "Map fields", "Review", "Import"]
def head(step, ids=False):
    out = []
    for i, n in enumerate(STEPS, 1):
        cls = "dn" if i < step else "on" if i == step else ""
        mark = '<svg><use href="#ok"/></svg>' if i < step else str(i)
        sid = f' id="st{i}"' if ids else ""
        out.append(f'<span class="s {cls}"{sid}><span class="n">{mark}</span>{n}</span>')
    return ('          <div class="back">← People</div>\n          <h1>Import people</h1>\n'
            '          <div class="stp" aria-label="Import steps">' + '<span class="ln"></span>'.join(out) + '</div>\n')
