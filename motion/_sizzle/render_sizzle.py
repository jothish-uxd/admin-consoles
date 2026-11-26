"""Render the Enterprise Library sizzle: motion/_sizzle/sizzle.html → an mp4 with a soft synthesized music bed.
Usage: python3 motion/_sizzle/render_sizzle.py OUT.mp4 [--stills 1.0,5.0]"""
import pathlib, subprocess, sys, tempfile, wave
import numpy as np
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent.parent))
import sfx
from playwright.sync_api import sync_playwright

HERE = pathlib.Path(__file__).resolve().parent
FPS, SR = 30, 48000

def music(seconds):
    """A calm four-chord pad with a soft pulse at 96 bpm, faded in and out. No samples."""
    n = int(seconds * SR); t = np.arange(n) / SR
    chords = [[261.63, 329.63, 392.00, 493.88], [220.00, 261.63, 329.63, 392.00], [174.61, 220.00, 261.63, 329.63], [196.00, 246.94, 293.66, 392.00]]
    bar = 60 / 96 * 4
    out = np.zeros(n)
    for i, ch in enumerate(chords * 4):
        a = i * bar
        if a >= seconds: break
        s, e = int(a * SR), min(n, int((a + bar + .6) * SR))
        tt = t[s:e] - a
        envl = np.minimum(tt / .5, 1) * np.exp(-np.maximum(tt - bar, 0) / .25)
        for f in ch:
            out[s:e] += (np.sin(2 * np.pi * f * tt) + .3 * np.sin(2 * np.pi * 2 * f * tt + .4)) * envl * .045
        bass = ch[0] / 2
        out[s:e] += np.sin(2 * np.pi * bass * tt) * envl * .07
    beat = 60 / 96
    for k in range(int(seconds / beat)):      # soft pulse: a muted low tick on each beat
        s = int(k * beat * SR); m = min(n - s, int(.18 * SR))
        if m <= 0: break
        tt = np.arange(m) / SR
        out[s:s + m] += np.sin(2 * np.pi * (70 + 40 * np.exp(-tt / .03)) * tt) * np.exp(-tt / .07) * (.16 if k % 2 == 0 else .09)
    fade = np.minimum(1, t / 1.2) * np.minimum(1, (seconds - t) / 1.6)
    return out * fade

def main():
    out = pathlib.Path(sys.argv[1]); stills = None
    if "--stills" in sys.argv: stills = [float(x) for x in sys.argv[sys.argv.index("--stills") + 1].split(",")]
    with sync_playwright() as p:
        b = p.chromium.launch(); pg = b.new_page(viewport={"width": 1920, "height": 1080})
        pg.goto((HERE / "sizzle.html").as_uri()); pg.wait_for_load_state("load")
        pg.evaluate("document.fonts.ready")
        pg.evaluate("""Promise.all([...Array(window.CLIPN).keys()].map(i => new Promise(r => { const im = new Image(); im.onload = im.onerror = r; im.src = `assets/clip/f${String(i + 1).padStart(3, '0')}.jpg`; })))""")
        def at(t):
            pg.evaluate(f"renderAt({t})"); pg.evaluate("document.getElementById('clip').decode().catch(()=>{})")
        if stills:
            d = pathlib.Path(tempfile.gettempdir()) / "sizzle-stills"; d.mkdir(exist_ok=True)
            for s in stills:
                at(s); pg.screenshot(path=str(d / f"t{s:05.2f}.jpg"), type="jpeg", quality=92)
            print(d); return
        dur = pg.evaluate("window.DURATION"); events = pg.evaluate("window.EVENTS")
        silent = out.with_name(out.stem + ".video.mp4")
        enc = subprocess.Popen(["ffmpeg", "-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", str(FPS), "-c:v", "mjpeg", "-i", "-",
                                "-c:v", "libx264", "-preset", "veryfast", "-crf", "18", "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(silent)], stdin=subprocess.PIPE)
        for i in range(round(dur * FPS)):
            at(i / FPS); enc.stdin.write(pg.screenshot(type="jpeg", quality=92))
        enc.stdin.close()
        if enc.wait(): sys.exit("ffmpeg failed")
        at(17.0 + 1.6); pg.screenshot(path=str(out.with_suffix(".jpg")), type="jpeg", quality=90)
        b.close()
    # sound: the music bed plus the scene whooshes and a closing chime
    fx = out.with_name(out.stem + ".fx.wav"); sfx.mix(events, dur, str(fx))
    with wave.open(str(fx)) as w:
        ch, sr = w.getnchannels(), w.getframerate(); x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float64) / 32768
    x = x.reshape(-1, ch).mean(axis=1) if ch > 1 else x
    if sr != SR: x = np.interp(np.arange(int(len(x) * SR / sr)) * sr / SR, np.arange(len(x)), x)
    m = music(dur); L = max(len(m), len(x)); mix = np.zeros(L); mix[:len(m)] += m; mix[:len(x)] += x * .8
    mix = np.clip(mix / max(1, np.abs(mix).max() / .9), -1, 1)
    wav = out.with_suffix(".wav")
    with wave.open(str(wav), "w") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mix * 32767).astype(np.int16).tobytes())
    tmp = out.with_name(out.stem + ".partial.mp4")
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(silent), "-i", str(wav), "-map", "0:v", "-map", "1:a",
                    "-c:v", "copy", "-c:a", "aac", "-b:a", "160k", "-shortest", "-movflags", "+faststart", str(tmp)], check=True)
    tmp.replace(out); silent.unlink(); wav.unlink(); fx.unlink()
    print(out, dur)

main()
