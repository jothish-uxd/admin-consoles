"""Record a motion scene to MP4 with interaction sounds.

    python3 motion/render.py request-access media/access-requests/request-access.mp4
    python3 motion/render.py request-access --stills 0,2.5,4.6,7.8,9.5   # check frames only
    python3 motion/render.py request-access media/access-requests/request-access.mp4 --audio-only  # new sound, same picture

The scene (motion/<name>/scene.html) exposes renderAt(t), DURATION and EVENTS.
Needs: playwright (Python) with a Chrome/Chromium, ffmpeg, numpy.
"""
import argparse, json, os, pathlib, subprocess, sys, tempfile

from playwright.sync_api import sync_playwright

sys.path.insert(0, str(pathlib.Path(__file__).parent))
import sfx  # noqa: E402

FPS = 30
W, H, SCALE = 1280, 720, 1.5  # drawn at 1280x720, recorded at 1920x1080
CHROME = os.environ.get("CHROME", "/usr/bin/google-chrome")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("scene")
    ap.add_argument("out", nargs="?")
    ap.add_argument("--stills", help="comma-separated seconds; writes JPEGs next to out or in /tmp")
    ap.add_argument("--audio-only", action="store_true", help="remix the sound onto the existing video, keeping its picture")
    a = ap.parse_args()
    root = pathlib.Path(__file__).parent
    url = (root / a.scene / "scene.html").resolve().as_uri()

    with sync_playwright() as p:
        b = p.chromium.launch(executable_path=CHROME if os.path.exists(CHROME) else None)
        pg = b.new_page(viewport={"width": W, "height": H}, device_scale_factor=SCALE)
        pg.goto(url)
        pg.wait_for_function("window.READY === true")
        dur, events = pg.evaluate("[window.DURATION, window.EVENTS]")

        if a.audio_only:
            b.close()
            out = pathlib.Path(a.out)
            wav = out.with_suffix(".wav"); tmp = out.with_name(out.stem + ".partial.mp4")
            sfx.mix(events, dur, str(wav))
            subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(out), "-i", str(wav), "-map", "0:v", "-map", "1:a",
                            "-c:v", "copy", "-c:a", "aac", "-b:a", "128k", "-shortest", "-movflags", "+faststart", str(tmp)], check=True)
            tmp.replace(out); wav.unlink()
            print(out, "audio only", json.dumps({"events": len(events)}))
            return

        if a.stills:
            outdir = pathlib.Path(tempfile.gettempdir()) / f"{a.scene}-stills"
            outdir.mkdir(exist_ok=True)
            for s in a.stills.split(","):
                pg.evaluate(f"renderAt({float(s)})")
                pg.screenshot(path=str(outdir / f"t{float(s):05.2f}.jpg"), type="jpeg", quality=92)
            print(outdir)
            return

        out = pathlib.Path(a.out)
        out.parent.mkdir(parents=True, exist_ok=True)
        tmp = out.with_name(out.stem + ".partial.mp4")
        silent = out.with_name(out.stem + ".video.mp4")
        frames = round(dur * FPS)
        enc = subprocess.Popen(
            ["ffmpeg", "-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", str(FPS), "-c:v", "mjpeg", "-i", "-",
             "-c:v", "libx264", "-preset", "veryfast", "-crf", "18", "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(silent)],
            stdin=subprocess.PIPE)
        for i in range(frames):
            pg.evaluate(f"renderAt({i / FPS})")
            enc.stdin.write(pg.screenshot(type="jpeg", quality=92))
        enc.stdin.close()
        if enc.wait():
            sys.exit("ffmpeg failed")
        # poster = first frame
        pg.evaluate("renderAt(0)")
        pg.screenshot(path=str(out.with_suffix(".jpg")), type="jpeg", quality=88)
        b.close()

    wav = out.with_suffix(".wav")
    sfx.mix(events, dur, str(wav))
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(silent), "-i", str(wav), "-map", "0:v", "-map", "1:a",
                    "-c:v", "copy", "-c:a", "aac", "-b:a", "128k", "-shortest", "-movflags", "+faststart", str(tmp)], check=True)
    tmp.replace(out)
    silent.unlink(); wav.unlink()
    print(out, json.dumps({"seconds": dur, "events": len(events)}))


if __name__ == "__main__":
    main()
