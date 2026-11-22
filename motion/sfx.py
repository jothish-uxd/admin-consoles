"""Small synthesized UI sounds (no samples, no music): click, key, whoosh, chime, pop, sonar."""
import wave

import numpy as np

SR = 48000
rng = np.random.default_rng(7)


def env(n, attack, decay):
    t = np.arange(n) / SR
    return np.minimum(t / attack, 1) * np.exp(-t / decay)


def click():
    n = int(.05 * SR); t = np.arange(n) / SR
    body = np.sin(2 * np.pi * 1900 * t) * env(n, .0008, .006)
    thump = np.sin(2 * np.pi * 180 * t) * env(n, .001, .012) * .6
    return (body * .5 + thump) * .55


def key():
    n = int(.03 * SR); t = np.arange(n) / SR
    f = rng.uniform(3200, 4200)
    tick = np.sin(2 * np.pi * f * t) * env(n, .0004, .0025)
    noise = rng.standard_normal(n) * env(n, .0003, .0015) * .25
    return (tick + noise) * rng.uniform(.10, .16)


def whoosh():
    n = int(.32 * SR); t = np.arange(n) / SR
    noise = rng.standard_normal(n)
    # one-pole low-pass with a sweeping cutoff
    out = np.zeros(n); y = 0.0
    for i in range(n):
        fc = 400 + 2600 * np.sin(np.pi * i / n)
        a = 1 - np.exp(-2 * np.pi * fc / SR)
        y += a * (noise[i] - y); out[i] = y
    return out * np.sin(np.pi * t / t[-1]) ** 2 * .16


def chime():
    n = int(.9 * SR); t = np.arange(n) / SR
    tone = lambda f, d, g: np.sin(2 * np.pi * f * t) * env(n, .004, d) * g
    a = tone(1046.5, .28, .35) + tone(2093, .12, .08)
    b = np.zeros(n); off = int(.09 * SR)
    b[off:] = (tone(1568, .34, .32) + tone(3136, .14, .06))[: n - off]
    return (a + b) * .55


def pop():
    n = int(.08 * SR); t = np.arange(n) / SR
    f = 600 + 900 * np.exp(-t / .015)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, .001, .02) * .35


def sonar():
    """End-card ping: a quiet, soft-edged tone that dips slightly in pitch, with
    one faint echo, like a distant sonar return. Meant to draw the eye, not startle."""
    n = int(1.15 * SR); t = np.arange(n) / SR

    def ping(gain, decay, soften):
        f = 1040 - 30 * (1 - np.exp(-t / .25))
        x = np.sin(2 * np.pi * np.cumsum(f) / SR)
        x *= env(n, .03, decay) * gain
        if soften:  # moving average dulls the echoes
            k = np.ones(soften) / soften
            x = np.convolve(x, k, mode="same")
        return x

    out = ping(.13, .3, 0)
    for delay, gain, soften in [(.32, .035, 10)]:
        d = int(delay * SR)
        out[d:] += ping(gain, .3, soften)[: n - d]
    return out


SOUNDS = {"click": click, "key": key, "whoosh": whoosh, "chime": chime, "pop": pop, "sonar": sonar}


def mix(events, seconds, path):
    buf = np.zeros(int(seconds * SR) + SR)
    for name, at in events:
        s = SOUNDS[name](); i = int(at * SR)
        buf[i:i + len(s)] += s[: len(buf) - i]
    buf = buf[: int(seconds * SR)]
    peak = np.abs(buf).max() or 1
    buf = buf / peak * .7
    pcm = (np.repeat(buf[:, None], 2, axis=1) * 32767).astype("<i2")
    with wave.open(path, "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
