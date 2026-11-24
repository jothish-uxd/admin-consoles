"""Builds Content › All content clips from asset-library/scene.html, so the page (header, tabs, search, filters,
saved views and table, with its select column) is the same markup and styles. Usage: from content_page import make."""
import pathlib, re
ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = (ROOT / "asset-library/scene.html").read_text()
def make(name, title, comment, css, extra, toast, script, row_ids=True):
    s = SRC
    s = s.replace("<title>Asset library · motion scene</title>", f"<title>{title} · motion scene</title>")
    s = re.sub(r"<!--.*?-->", "<!--\n" + comment + "\n-->", s, count=1, flags=re.S)
    s = s.replace("</style>", css + "\n</style>", 1)
    if row_ids:  # ids on every row and checkbox: aR1.. in the first table, bR1.. in the second
        for tid, p in (("tA", "a"), ("tB", "b"), ("tC", "c")):
            i = s.index(f'<div id="{tid}"'); j = s.index("</tbody>", i); block = s[i:j]; n = [0]
            def rep(m):
                n[0] += 1; return f'<tr id="{p}R{n[0]}"><td class="ck"><span class="cb" id="{p}C{n[0]}"></span></td>'
            block = re.sub(r'<tr><td class="ck"><span class="cb"></span></td>', rep, block)
            s = s[:i] + block + s[j:]
    s = re.sub(r'    <div class="toast" id="toast">.*?</div>\n', extra + "\n" + toast + "\n", s, count=1, flags=re.S)
    s = s[:s.index('<script src="../shared/motion.js"></script>')] + '<script src="../shared/motion.js"></script>\n<script>\n' + script + "\n</script>\n</body>\n</html>\n"
    d = ROOT / name; d.mkdir(exist_ok=True); (d / "scene.html").write_text(s)
    return s
