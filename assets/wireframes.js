/* Monochrome wireframe thumbnails for category cards.
   Every drawing sits in the same little admin-console window
   (top bar + left nav) so the grid reads as one system. */

(function () {
  const r = (x, y, w, h, c = "f", rx = 2) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" class="wf-${c}"/>`;
  const line = (x1, y1, x2, y2, c = "l") =>
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="wf-s${c}"/>`;
  const circ = (cx, cy, rad, c = "f") => `<circle cx="${cx}" cy="${cy}" r="${rad}" class="wf-${c}"/>`;
  const txt = (x, y, w, c = "f") => r(x, y, w, 4, c, 2);

  // Content area: x 74–302, y 34–182
  const X = 74, Y = 34, W = 228;

  function frame(inner, opts = {}) {
    const navItems = [0, 1, 2, 3, 4, 5]
      .map(i => r(18, 46 + i * 14, i === (opts.active ?? 1) ? 42 : 34, 6, i === (opts.active ?? 1) ? "k" : "f", 3))
      .join("");
    return `<svg viewBox="0 0 320 200" role="presentation" focusable="false" aria-hidden="true">
      ${r(8, 8, 304, 184, "win", 9)}
      ${r(8, 8, 304, 18, "bar", 9)}${r(8, 18, 304, 8, "bar", 0)}
      ${circ(19, 17, 2.5, "m")}${circ(27, 17, 2.5, "m")}${circ(35, 17, 2.5, "m")}
      ${line(64, 26, 64, 192)}
      ${navItems}
      ${inner}
    </svg>`;
  }

  function pageHead(title = 70, withButton = true) {
    return txt(X, Y + 4, title, "k") + (withButton ? r(X + W - 46, Y, 46, 12, "k", 3) : "");
  }

  function rows(n, y0, cols, opts = {}) {
    let out = "";
    for (let i = 0; i < n; i++) {
      const y = y0 + i * (opts.gap || 16);
      if (opts.check) out += r(X, y, 7, 7, opts.selected && opts.selected.includes(i) ? "k" : "box", 1.5);
      let cx = X + (opts.check ? 14 : 0);
      if (opts.avatar) { out += circ(cx + 4, y + 3.5, 4); cx += 13; }
      cols.forEach(w => { out += txt(cx, y + 1.5, w, opts.selected && opts.selected.includes(i) ? "m" : "f"); cx += w + 14; });
      out += line(X, y + 11, X + W, y + 11);
    }
    return out;
  }

  const T = {
    userTable: () => frame(
      pageHead(64) + r(X, Y + 20, 90, 11, "box", 3) +
      rows(7, Y + 40, [56, 64, 30], { avatar: true }) +
      r(X + W - 30, Y + 41, 30, 7, "pill", 3.5)
    ),

    matrix: () => {
      let g = pageHead(80);
      const cols = 4, rowsN = 7, cw = 30, x0 = X + 92, y0 = Y + 26;
      for (let c = 0; c < cols; c++) g += txt(x0 + c * cw + 6, y0, 18, "m");
      for (let i = 0; i < rowsN; i++) {
        const y = y0 + 14 + i * 15;
        g += txt(X, y, 60 + (i % 3) * 10, "f");
        for (let c = 0; c < cols; c++) {
          const on = (i + c) % 3 !== 0 && !(c === 3 && i > 2);
          g += r(x0 + c * cw + 9, y - 2, 9, 9, on ? "k" : "box", 2);
        }
        g += line(X, y + 10, X + W, y + 10);
      }
      return frame(g);
    },

    groups: () => {
      let g = pageHead(60);
      [[X, Y + 24], [X + 118, Y + 24], [X, Y + 88], [X + 118, Y + 88]].forEach(([x, y], i) => {
        g += r(x, y, 110, 56, "card", 5) + txt(x + 10, y + 10, 50, "k") + txt(x + 10, y + 20, 70);
        for (let a = 0; a < 4 - (i % 2); a++) g += `<circle cx="${x + 16 + a * 10}" cy="${y + 40}" r="5.5" class="wf-f wf-ring"/>`;
      });
      return frame(g);
    },

    toggles: () => {
      let g = pageHead(70, false);
      for (let i = 0; i < 6; i++) {
        const y = Y + 24 + i * 22, on = i !== 2 && i !== 4;
        g += txt(X, y + 1, 70 + (i % 3) * 18, "k") + txt(X, y + 9, 110, "f");
        g += r(X + W - 24, y, 24, 12, on ? "k" : "box", 6) + circ(on ? X + W - 6 : X + W - 18, y + 6, 4, on ? "inv" : "m");
        g += line(X, y + 17, X + W, y + 17);
      }
      return frame(g);
    },

    approvals: () => {
      let g = pageHead(70, false);
      g += r(X, Y + 20, 40, 10, "k", 5) + r(X + 46, Y + 20, 40, 10, "box", 5) + r(X + 92, Y + 20, 40, 10, "box", 5);
      for (let i = 0; i < 4; i++) {
        const y = Y + 40 + i * 27;
        g += r(X, y, W, 22, "card", 4) + circ(X + 12, y + 11, 5) + txt(X + 24, y + 6, 80, "k") + txt(X + 24, y + 13, 56);
        g += r(X + W - 62, y + 6, 26, 10, "box", 3) + r(X + W - 32, y + 6, 26, 10, "k", 3);
      }
      return frame(g);
    },

    assetGrid: () => {
      let g = pageHead(60) + r(X + W - 76, Y, 24, 12, "box", 3);
      for (let i = 0; i < 8; i++) {
        const x = X + (i % 4) * 58, y = Y + 22 + Math.floor(i / 4) * 64;
        g += r(x, y, 52, 40, "card", 4) + r(x + 14, y + 10, 24, 20, i === 2 ? "k" : "f", 2);
        g += txt(x, y + 46, 40, "k") + txt(x, y + 54, 28);
      }
      return frame(g);
    },

    meters: () => {
      let g = pageHead(70, false);
      g += r(X, Y + 22, W, 12, "box", 6) + r(X, Y + 22, W * 0.68, 12, "k", 6);
      g += txt(X, Y + 40, 60, "f") + txt(X + W - 40, Y + 40, 40, "f");
      for (let i = 0; i < 6; i++) {
        const y = Y + 56 + i * 16, pct = [0.82, 0.64, 0.47, 0.31, 0.22, 0.12][i];
        g += circ(X + 4, y + 3.5, 4) + txt(X + 14, y + 1.5, 50, "f");
        g += r(X + 80, y, 120, 7, "box", 3.5) + r(X + 80, y, 120 * pct, 7, "m", 3.5);
        g += txt(X + 206, y + 1.5, 22, "f");
      }
      return frame(g);
    },

    sources: () => {
      let g = pageHead(80);
      const st = ["k", "k", "m", "box", "k"];
      for (let i = 0; i < 5; i++) {
        const y = Y + 24 + i * 24;
        g += r(X, y, 18, 18, "card", 4) + r(X + 5, y + 5, 8, 8, "m", 1.5);
        g += txt(X + 26, y + 4, 70, "k") + txt(X + 26, y + 11, 48);
        g += r(X + 150, y + 5, 40, 8, st[i] === "k" ? "pill" : "box", 4);
        g += r(X + W - 14, y + 5, 14, 8, "f", 2);
      }
      return frame(g);
    },

    wizard: () => {
      let g = "";
      [0, 1, 2, 3].forEach(i => {
        const cx = X + 30 + i * 56;
        if (i < 3) g += line(cx + 7, Y + 12, cx + 49, Y + 12, i < 1 ? "k" : "l");
        g += circ(cx, Y + 12, 7, i <= 1 ? "k" : "box");
        g += txt(cx - 14, Y + 24, 28, i <= 1 ? "m" : "f");
      });
      g += r(X + 24, Y + 40, W - 48, 96, "card", 6);
      g += txt(X + 38, Y + 52, 70, "k");
      [0, 1, 2].forEach(i => { g += txt(X + 38, Y + 66 + i * 20, 40) + r(X + 38, Y + 72 + i * 20, W - 76, 8, "box", 2); });
      g += r(X + W - 92, Y + 140, 30, 11, "box", 3) + r(X + W - 56, Y + 140, 32, 11, "k", 3);
      return frame(g);
    },

    bulkBar: () => {
      const sel = [1, 2, 4];
      let g = pageHead(64, false);
      g += r(X, Y + 18, W, 18, "k", 5) + txt(X + 10, Y + 25, 44, "inv");
      g += r(X + 110, Y + 22, 30, 10, "invbox", 3) + r(X + 146, Y + 22, 30, 10, "invbox", 3) + r(X + 182, Y + 22, 38, 10, "invbox", 3);
      g += rows(7, Y + 44, [70, 50, 40], { check: true, selected: sel });
      return frame(g);
    },

    confirm: () => {
      let g = pageHead(64) + rows(7, Y + 22, [64, 50, 44], { avatar: true });
      g += r(8, 8, 304, 184, "scrim", 9);
      g += r(84, 52, 152, 98, "card", 8);
      g += circ(100, 70, 7, "k") + txt(114, 68, 80, "k");
      g += txt(96, 86, 124) + txt(96, 94, 108) + txt(96, 102, 92);
      g += r(96, 112, 128, 12, "box", 3);
      g += r(150, 132, 34, 11, "box", 3) + r(188, 132, 36, 11, "k", 3);
      return frame(g);
    },

    upload: () => {
      let g = pageHead(64, false);
      g += `<rect x="${X}" y="${Y + 20}" width="${W}" height="62" rx="8" class="wf-dash"/>`;
      g += `<path d="M${X + W / 2} ${Y + 58} v-20 m-8 8 l8 -8 l8 8" class="wf-sk wf-thick"/>`;
      g += txt(X + W / 2 - 40, Y + 66, 80, "f");
      [0, 1, 2].forEach(i => {
        const y = Y + 94 + i * 18;
        g += txt(X, y, 54, "k") + r(X + 70, y - 2, 60, 9, "box", 2) + line(X + 136, y + 2, X + 150, y + 2, "k") + r(X + 156, y - 2, 72, 9, i === 2 ? "k" : "box", 2);
      });
      return frame(g);
    },

    rules: () => {
      let g = pageHead(80);
      const block = (y, label, n) => {
        let b = r(X, y, W, 18 + n * 14, "card", 5) + r(X + 8, y + 6, 22, 8, "k", 2) + txt(X + 36, y + 8, label, "m");
        for (let i = 0; i < n; i++) {
          const yy = y + 20 + i * 14;
          b += r(X + 16, yy, 50, 9, "box", 2) + r(X + 72, yy, 36, 9, "box", 2) + r(X + 114, yy, 66, 9, "box", 2);
        }
        return b;
      };
      g += block(Y + 22, 60, 2) + line(X + 20, Y + 68, X + 20, Y + 76, "k") + block(Y + 76, 40, 2);
      g += r(X, Y + 128, 70, 11, "box", 3);
      return frame(g);
    },

    timeline: () => {
      let g = pageHead(64, false) + r(X, Y + 18, 60, 10, "box", 3) + r(X + 66, Y + 18, 48, 10, "box", 3);
      g += line(X + 6, Y + 38, X + 6, Y + 176, "l");
      for (let i = 0; i < 7; i++) {
        const y = Y + 40 + i * 19;
        g += circ(X + 6, y + 4, 3.5, i === 1 ? "k" : "m");
        g += txt(X + 18, y + 2, 30, "f") + txt(X + 56, y + 2, 34, "k") + txt(X + 98, y + 2, 60 + (i % 3) * 12);
      }
      return frame(g);
    },

    aiControls: () => {
      let g = pageHead(70, false);
      g += r(X, Y + 20, W, 34, "card", 6);
      g += `<path d="M${X + 16} ${Y + 28} l3 6 l6 3 l-6 3 l-3 6 l-3 -6 l-6 -3 l6 -3 z" class="wf-k"/>`;
      g += txt(X + 32, Y + 30, 80, "k") + txt(X + 32, Y + 38, 120);
      g += r(X + W - 30, Y + 31, 24, 12, "k", 6) + circ(X + W - 12, Y + 37, 4, "inv");
      for (let i = 0; i < 4; i++) {
        const y = Y + 64 + i * 22;
        g += txt(X, y + 2, 80, "k") + txt(X, y + 10, 120);
        g += r(X + W - 80, y + 1, 80, 12, "box", 3) + r(X + W - 12, y + 6, 6, 3, "m", 1);
        g += line(X, y + 18, X + W, y + 18);
      }
      return frame(g);
    },

    seats: () => {
      let g = pageHead(60);
      [0, 1, 2].forEach(i => {
        const x = X + i * 78;
        g += r(x, Y + 22, 72, 44, "card", 5) + txt(x + 8, Y + 30, 30, "f") + r(x + 8, Y + 40, 34, 10, i === 0 ? "k" : "m", 2) + txt(x + 8, Y + 56, 48);
      });
      g += rows(5, Y + 78, [64, 56], { avatar: true });
      for (let i = 0; i < 5; i++) g += r(X + W - 32, Y + 78 + i * 16, 32, 8, i < 3 ? "pill" : "box", 4);
      return frame(g);
    },

    keys: () => {
      let g = pageHead(60);
      g += r(X, Y + 22, W, 32, "card", 5) + txt(X + 10, Y + 30, 60, "k");
      g += r(X + 10, Y + 38, 150, 10, "box", 2);
      for (let i = 0; i < 16; i++) g += circ(X + 18 + i * 8, Y + 43, 1.6, "m");
      g += r(X + 166, Y + 38, 24, 10, "k", 2);
      for (let i = 0; i < 4; i++) {
        const y = Y + 66 + i * 22;
        g += `<path d="M${X + 4} ${y + 8} a4 4 0 1 1 6 0 l10 0 m-4 0 v4" class="wf-sk wf-thick"/>`;
        g += txt(X + 28, y + 3, 70, "k") + txt(X + 28, y + 10, 44) + r(X + 150, y + 3, 34, 8, "box", 4) + r(X + W - 10, y + 3, 10, 8, "f", 2);
        g += line(X, y + 18, X + W, y + 18);
      }
      return frame(g);
    },

    settings: () => {
      let g = "";
      for (let i = 0; i < 7; i++) g += txt(X, Y + 6 + i * 13, i === 2 ? 44 : 36, i === 2 ? "k" : "f");
      g += line(X + 56, Y, X + 56, Y + 148);
      const sx = X + 68, sw = W - 68;
      g += txt(sx, Y + 4, 60, "k") + txt(sx, Y + 12, 110);
      [0, 1, 2].forEach(i => { const y = Y + 26 + i * 28; g += txt(sx, y, 40) + r(sx, y + 7, sw, 12, "box", 3); });
      g += r(sx, Y + 112, sw, 28, "dangerbox", 5) + txt(sx + 8, Y + 120, 50, "k") + r(sx + sw - 44, Y + 120, 36, 11, "k", 3);
      return frame(g, { active: 5 });
    },

    chart: () => {
      let g = pageHead(64, false);
      [0, 1, 2, 3].forEach(i => {
        const x = X + i * 58;
        g += r(x, Y + 18, 52, 30, "card", 4) + txt(x + 6, Y + 24, 26) + r(x + 6, Y + 32, 30 - i * 4, 9, "k", 2);
      });
      g += r(X, Y + 56, W, 92, "card", 5);
      const pts = [70, 62, 66, 50, 54, 40, 44, 30, 34, 24].map((v, i) => `${X + 12 + i * 23},${Y + 56 + v + 10}`).join(" ");
      [0, 1, 2].forEach(i => { g += line(X + 10, Y + 76 + i * 22, X + W - 10, Y + 76 + i * 22); });
      g += `<polyline points="${pts}" class="wf-sk wf-thick" fill="none"/>`;
      return frame(g, { active: 0 });
    },

    alerts: () => {
      let g = pageHead(64, false);
      g += r(X, Y + 18, W, 22, "k", 5) + circ(X + 12, Y + 29, 4, "inv") + txt(X + 24, Y + 27, 110, "inv") + r(X + W - 16, Y + 26, 8, 6, "invbox", 2);
      for (let i = 0; i < 5; i++) {
        const y = Y + 50 + i * 24;
        g += r(X, y, 4, 18, i < 2 ? "k" : "m", 2) + txt(X + 12, y + 3, 90, "k") + txt(X + 12, y + 11, 140) + txt(X + W - 28, y + 3, 28);
        g += line(X, y + 20, X + W, y + 20);
      }
      return frame(g);
    },

    dataTable: () => {
      let g = pageHead(60, false) + r(X + W - 44, Y, 20, 12, "box", 3) + r(X + W - 20, Y, 20, 12, "box", 3);
      g += r(X, Y + 18, W, 14, "f", 3);
      [0, 1, 2, 3].forEach(i => { g += txt(X + 6 + i * 56, Y + 23, 30, "m"); });
      g += `<path d="M${X + 42} ${Y + 23} l3 3 l3 -3" class="wf-sk wf-thick"/>`;
      for (let i = 0; i < 8; i++) {
        const y = Y + 38 + i * 14;
        [0, 1, 2, 3].forEach(c => { g += txt(X + 6 + c * 56, y + 3, [40, 34, 26, 30][c] - ((i * 7 + c * 3) % 10)); });
        g += line(X, y + 10, X + W, y + 10);
      }
      g += r(X + W - 60, Y + 154, 60, 10, "box", 3);
      return frame(g);
    },

    filters: () => {
      let g = r(X, Y, W, 16, "box", 8) + circ(X + 10, Y + 8, 3.5, "m") + txt(X + 20, Y + 6, 70);
      g += r(X, Y + 22, 48, 11, "k", 5.5) + r(X + 52, Y + 22, 56, 11, "k", 5.5) + r(X + 112, Y + 22, 40, 11, "box", 5.5) + txt(X + 160, Y + 26, 30, "m");
      g += rows(7, Y + 44, [64, 52, 40], { avatar: true });
      return frame(g);
    },

    empty: () => {
      let g = pageHead(60, false);
      g += `<rect x="${X + W / 2 - 22}" y="${Y + 34}" width="44" height="36" rx="6" class="wf-dash"/>`;
      g += r(X + W / 2 - 10, Y + 46, 20, 3, "m", 1.5) + r(X + W / 2 - 14, Y + 54, 28, 3, "m", 1.5);
      g += txt(X + W / 2 - 46, Y + 84, 92, "k") + txt(X + W / 2 - 62, Y + 94, 124) + txt(X + W / 2 - 50, Y + 102, 100);
      g += r(X + W / 2 - 26, Y + 114, 52, 13, "k", 3);
      return frame(g);
    }
  };

  window.drawWireframe = function (name) {
    return (T[name] || T.empty)();
  };
})();
