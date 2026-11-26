"""Content › All content for the Search & filtering clips (Filter bar, Advanced query, Saved views), on content_page.make,
so the page is the same markup as Asset library and No results. Adds: the alerts bell, ids on the Owner and Sharing filters,
a ✕ on active filters, Clear all, and one more result set (tD: public links, any owner). No eyebrow headers.
Usage: from allcontent_page import make."""
import sys, pathlib; sys.path.insert(0, __file__.rsplit("/", 1)[0])
from content_page import make as _make, ROOT
import bell

CSS = r"""
.flt .x { display: none; color: #fff; font-size: 11px; margin-left: 2px; }
.flt.on .x { display: inline; }
.flt.on .cv { display: none; }
.clr { font-size: 12.5px; color: var(--ink); text-decoration: underline; text-underline-offset: 3px; visibility: hidden; white-space: nowrap; }
.menu .ms { display: flex; gap: 6px; align-items: center; justify-content: flex-start; height: 30px; border: 1px solid var(--ink); border-radius: 6px; margin: 2px 2px 6px; padding: 0 8px; color: var(--faint); font-size: 12.5px; }
.menu .ms svg { width: 12px; height: 12px; }
.menu .ms .q { color: var(--ink); white-space: pre; }
.menu .ms .c { width: 1.5px; height: 15px; background: var(--ink); }
.menu.om { width: 230px; }
.sv { margin-left: 4px; color: var(--ink); font-size: 12.5px; text-decoration: underline; text-underline-offset: 3px; }
.menu .hint { display: block; font-size: 11.5px; color: var(--faint); padding: 2px 10px 4px; }
"""
OWNER = ('<span class="flt" id="fOwn"><span id="foL">Owner</span><i class="cv"></i><span class="x" id="foX" aria-label="Remove Owner filter">✕</span>'
         '<div class="menu om" id="mOwn"><div class="ms"><svg><use href="#srch"/></svg><span class="q" id="omQ"></span><span class="c" id="omC"></span><span id="omPh">Search 4,812 owners</span></div>'
         '<div class="o1">Rebel Intelligence<span>612K</span></div><div class="o1">Command<span>480K</span></div><div class="o1">Base Engineering<span>355K</span></div>'
         '<div id="oDe">Deactivated people<span>112</span></div></div></span>')
TD = '''        <div id="tD" style="opacity:0">
          <table><thead><tr><th class="ck"><span class="cb"></span></th><th>Name</th><th>Owner</th><th>Sharing</th><th>Last activity</th><th>Size</th></tr></thead><tbody>
            <tr><td class="ck"><span class="cb"></span></td><td><div class="nm"><span class="ty">PNG</span>Recruitment poster.png</div></td><td class="own"><div class="a">Mon Mothma</div><div class="b">Senate liaison</div></td><td><span class="sh pub">Public link</span></td><td>3 hours ago</td><td class="num">6 MB</td></tr>
            <tr><td class="ck"><span class="cb"></span></td><td><div class="nm"><span class="ty">PDF</span>Volunteer guide.pdf</div></td><td class="own"><div class="a">Leia Organa</div><div class="b">Command</div></td><td><span class="sh pub">Public link</span></td><td>Yesterday</td><td class="num">4 MB</td></tr>
            <tr><td class="ck"><span class="cb"></span></td><td><div class="nm"><span class="ty">XLS</span>Hoth patrol routes.xlsx</div></td><td class="own"><div class="a">Biggs Darklighter</div><div class="b off">Deactivated</div></td><td><span class="sh pub">Public link</span></td><td>41 days ago</td><td class="num">1 MB</td></tr>
            <tr><td class="ck"><span class="cb"></span></td><td><div class="nm"><span class="ty">MP4</span>X-wing maintenance.mp4</div></td><td class="own"><div class="a">Biggs Darklighter</div><div class="b off">Deactivated</div></td><td><span class="sh pub">Public link</span></td><td>45 days ago</td><td class="num">640 MB</td></tr>
          </tbody></table><div class="cnt">Showing 1–38 of 38 · sorted by last activity</div>
        </div>
'''
def make(name, title, comment, css, extra, toast, script, edit=None):
    s = _make(name, title, comment, CSS + css, extra, toast, script)
    s = s.replace('<span class="flt">Owner<i class="cv"></i></span>', OWNER, 1)
    s = s.replace('<span id="fsL">Sharing</span><i class="cv"></i>', '<span id="fsL">Sharing</span><i class="cv"></i><span class="x" id="fsX" aria-label="Remove Sharing filter">✕</span>', 1)
    s = s.replace('<div>Internal only<span>1.9M</span></div><div>Specific people<span>410K</span></div><div id="optPub">Public link<span>38</span></div>',
                  '<div>Internal only<span id="msI">1.9M</span></div><div>Specific people<span id="msS">410K</span></div><div id="optPub">Public link<span id="msP">38</span></div>', 1)
    s = s.replace('<span class="flt">Size<i class="cv"></i></span>', '<span class="flt">Size<i class="cv"></i></span><span class="flt" id="fAdv"><span id="faL">Advanced</span><span class="x" id="faX" aria-label="Remove advanced filter">✕</span></span><span class="clr" id="clr">Clear all</span>', 1)
    s = s.replace('<div class="meta" style="margin-top:14px">', '<div class="meta" style="margin-top:14px" role="status" aria-live="polite">', 1)
    s = s.replace('<span id="m2" style="opacity:0">', '<span id="m3" style="opacity:0"><b>38 items</b> shared by public link</span><span id="m2" style="opacity:0">', 1)
    s = s.replace('        <div id="gC"', TD + '        <div id="gC"', 1)
    s = s.replace('<span class="view">Large files <span class="n">2.1K</span></span>', '<span class="view" id="vLg">Large files <span class="n">2.1K</span></span><span class="sv" id="bSave">+ Save view</span>', 1)
    if edit: s = edit(s)
    (ROOT / name / "scene.html").write_text(s)
    bell.add(name, 3)
    return s
