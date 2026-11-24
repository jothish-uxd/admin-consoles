"""Builds MCP connector clips on the Fleet Tracker page from choosing-tools/scene.html, so the page header,
tabs and Overview stay identical (same markup and styles). Usage: from fleet_page import make."""
import pathlib
ROOT = pathlib.Path(__file__).resolve().parent.parent
L = (ROOT / "choosing-tools/scene.html").read_text().split("\n")
INFO_CSS = "\n".join(L[43:47])  # .info, .info b, .info .sp, .info .chg
def make(name, title, comment, css, section, toast, script):
    base_mid = "\n".join(L[67:122]).replace('<div>Sign-in</div><div>Access</div><div>Data</div>', '<div id="tbS">Sign-in</div><div id="tbA">Access</div><div id="tbD">Data</div>')
    out = "\n".join(L[0:4]) + f"\n<title>{title} · motion scene</title>\n<!--\n{comment}\n-->\n" + "\n".join(L[19:42]) + "\n" + INFO_CSS + "\n" + css + "\n" + base_mid + "\n" + section + "\n" + "\n".join(L[143:145]) + "\n" + toast + "\n" + "\n".join(L[146:150]) + "\n<script>\n" + script + "\n</script>\n</body>\n</html>\n"
    d = ROOT / name; d.mkdir(exist_ok=True); (d / "scene.html").write_text(out)
    return out
