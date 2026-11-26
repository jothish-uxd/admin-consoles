"""A group's own page (People › Groups › <group>), shared by Manage members, Dynamic groups and Nested groups.
Usage: from group_page import CSS, head; head(name, badge, sub, tabs, on) gives the header markup."""
CSS = r"""
.view { position: absolute; inset: 0; padding: 22px 32px; }
.back { font-size: 12.5px; color: var(--soft); }
.gh { margin-top: 6px; display: flex; align-items: center; gap: 10px; }
.gh h1 { margin: 0; }
.bdg { font-size: 11.5px; font-weight: 600; border: 1px solid var(--rule-strong); border-radius: 999px; padding: 1px 9px; color: var(--ink); }
.gsub { margin-top: 3px; font-size: 13px; color: var(--soft); }
.tabs.page { margin-top: 14px; }
.acc { margin-top: 14px; border: 1px solid var(--rule); border-radius: 12px; padding: 10px 14px; display: flex; gap: 10px; align-items: center; flex-wrap: wrap; font-size: 12.5px; color: var(--soft); }
.acc b { color: var(--ink); font-weight: 600; }
.acc .ch { border: 1px solid var(--rule-strong); border-radius: 999px; padding: 2px 9px; color: var(--ink); font-size: 12px; background: var(--bg); }
table.m { margin-top: 10px; font-size: 13px; }
.m th { padding: 0 10px 8px; }
.m td { height: 46px; padding: 0 10px; }
.pp { display: flex; gap: 10px; align-items: center; color: var(--ink); font-weight: 500; }
.pp .av { width: 26px; height: 26px; font-size: 10px; }
.m .how { font-size: 12.5px; }
.m .how b { color: var(--ink); font-weight: 500; }
.cnt { margin-top: 8px; font-size: 12px; color: var(--faint); }
"""
def head(name, badge, sub, tabs, on):
    t = "".join(f'<div{" class=\"on\"" if x == on else ""}>{x}</div>' for x in tabs)
    return (f'        <div class="back">← Groups</div>\n'
            f'        <div class="gh"><h1>{name}</h1><span class="bdg">{badge}</span></div>\n'
            f'        <div class="gsub">{sub}</div>\n'
            f'        <div class="tabs page">{t}</div>\n')
