"""Reuses the page of an existing scene: keeps its head, styles and markup up to `cut`, then adds the new
scene's overlays and script, so the page is the same pixels. Usage: from cut_page import make."""
import pathlib, re
ROOT = pathlib.Path(__file__).resolve().parent.parent
def make(src, name, title, comment, css, cut, close, extra, script, edits=()):
    s = (ROOT / src / "scene.html").read_text()
    s = re.sub(r"<title>.*?</title>", f"<title>{title} · motion scene</title>", s, count=1)
    s = re.sub(r"<!--.*?-->", "<!--\n" + comment + "\n-->", s, count=1, flags=re.S)
    s = s.replace("</style>", css + "\n</style>", 1)
    for a, b in edits:
        assert a in s, a
        s = s.replace(a, b, 1)
    s = s[:s.index(cut)] + close + extra + "\n  </div>\n</div>\n" + '<script src="../shared/motion.js"></script>\n<script>\n' + script + "\n</script>\n</body>\n</html>\n"
    d = ROOT / name; d.mkdir(exist_ok=True); (d / "scene.html").write_text(s)
    return s
