#!/usr/bin/env node
/**
 * Measure where a screen sits in a photograph.
 *
 * The composite route warps the real IMS components onto the screen in a plate
 * photograph, which only works if the four screen corners are known to about a
 * pixel. Eyeballing them is not good enough, so this walks scan lines outward
 * from a seed point inside the screen until the dark bezel starts, fits a line
 * to each edge, and intersects them.
 *
 * The numbers it prints are the `quad` values in src/content/stills.ts.
 *
 * The cab plate is not listed here. Its photographed screen was already showing a
 * near black interface, so screen and bezel share the same luminance and there is
 * no edge to find. That quad was stepped out by hand against the bezel highlight
 * and checked with /lab/composite/cab?debug=1.
 *
 * Usage: node scripts/measure-screen-quad.mjs hand|desk [--raw]
 */

import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const SCRATCH = join(tmpdir(), "bad-form-quad.ppm");

/**
 * Detector settings per plate. `seed` is any point inside the screen, `dark` is
 * the luminance below which a pixel counts as bezel, and `run` is how many dark
 * pixels in a row are needed before an edge is called, which is what keeps body
 * text and hairline table borders from reading as the edge of the screen.
 *
 * Scan lines are chosen to stay inside the screen for their whole travel: a
 * rotated screen narrows as you move along it, and a phone's notch has to be
 * scanned around.
 */
const plates = {
  hand: {
    file: "public/images/plates/hand.webp",
    seed: [900, 420],
    dark: 32,
    run: 6,
    rows: [200, 260, 320, 380, 440, 500, 560, 620, 680, 740],
    colsTop: [905, 920, 935, 950, 960],
    colsBottom: [820, 860, 900, 940, 980],
  },
  desk: {
    file: "public/images/plates/desk.webp",
    seed: [1150, 430],
    dark: 31,
    run: 10,
    rowsLeft: [280, 330, 380, 480, 530, 580, 620],
    // The screen runs off the right of the frame above roughly y=480, so the
    // right edge is fitted low and extrapolated up to the top corner.
    rowsRight: [500, 540, 580, 620, 660, 700],
    runRight: 5,
    cols: [820, 920, 1020, 1120, 1220, 1320],
  },
};

function loadImage(path) {
  execFileSync("ffmpeg", ["-y", "-i", path, "-pix_fmt", "rgb24", "-f", "image2", SCRATCH], {
    stdio: "ignore",
  });
  const buf = readFileSync(SCRATCH);
  const white = [0x20, 0x0a, 0x0d, 0x09];
  const tokens = [];
  let pos = 0;
  while (tokens.length < 4) {
    while (white.includes(buf[pos])) pos += 1;
    if (buf[pos] === 0x23) {
      while (buf[pos] !== 0x0a) pos += 1;
      continue;
    }
    const start = pos;
    while (pos < buf.length && !white.includes(buf[pos])) pos += 1;
    tokens.push(buf.subarray(start, pos).toString());
  }
  pos += 1;
  return { width: Number(tokens[1]), height: Number(tokens[2]), data: buf.subarray(pos) };
}

function luminance(image, x, y) {
  const i = (Math.round(y) * image.width + Math.round(x)) * 3;
  return 0.2126 * image.data[i] + 0.7152 * image.data[i + 1] + 0.0722 * image.data[i + 2];
}

function findEdge(image, x, y, dx, dy, dark, run) {
  let lastBright = null;
  for (let step = 0; step < 1600; step += 1) {
    const cx = x + dx * step;
    const cy = y + dy * step;
    if (cx < 1 || cy < 1 || cx >= image.width - 1 || cy >= image.height - 1) return null;
    if (luminance(image, cx, cy) >= dark) {
      lastBright = { x: cx, y: cy };
      continue;
    }
    let darkRun = 0;
    while (darkRun < run) {
      const px = cx + dx * darkRun;
      const py = cy + dy * darkRun;
      if (px < 1 || py < 1 || px >= image.width - 1 || py >= image.height - 1) break;
      if (luminance(image, px, py) >= dark) break;
      darkRun += 1;
    }
    if (darkRun >= run) return lastBright;
  }
  return null;
}

/** Least squares fit. `alongY` fits x = a*y + b, otherwise y = a*x + b. */
function fitLine(points, alongY) {
  const n = points.length;
  if (n < 2) throw new Error("An edge found fewer than two points. Retune the scan lines.");
  let su = 0;
  let sv = 0;
  let suu = 0;
  let suv = 0;
  for (const point of points) {
    const u = alongY ? point.y : point.x;
    const v = alongY ? point.x : point.y;
    su += u;
    sv += v;
    suu += u * u;
    suv += u * v;
  }
  const a = (n * suv - su * sv) / (n * suu - su * su);
  const b = (sv - a * su) / n;
  let worst = 0;
  for (const point of points) {
    const u = alongY ? point.y : point.x;
    const v = alongY ? point.x : point.y;
    worst = Math.max(worst, Math.abs(v - (a * u + b)));
  }
  return { a, b, worst, n };
}

function intersect(horizontal, vertical) {
  const x = (vertical.a * horizontal.b + vertical.b) / (1 - vertical.a * horizontal.a);
  const y = horizontal.a * x + horizontal.b;
  return [Number(x.toFixed(1)), Number(y.toFixed(1))];
}

function measure(config) {
  const image = loadImage(join(ROOT, config.file));
  const keep = (points) => points.filter(Boolean);
  const rowsLeft = config.rowsLeft ?? config.rows;
  const rowsRight = config.rowsRight ?? config.rows;
  const colsTop = config.colsTop ?? config.cols;
  const colsBottom = config.colsBottom ?? config.cols;
  const { seed, dark, run } = config;

  const runRight = config.runRight ?? run;

  const edges = {
    left: keep(rowsLeft.map((y) => findEdge(image, seed[0], y, -1, 0, dark, run))),
    right: keep(rowsRight.map((y) => findEdge(image, seed[0], y, 1, 0, dark, runRight))),
    top: keep(colsTop.map((x) => findEdge(image, x, seed[1], 0, -1, dark, run))),
    bottom: keep(colsBottom.map((x) => findEdge(image, x, seed[1], 0, 1, dark, run))),
  };

  const left = fitLine(edges.left, true);
  const right = fitLine(edges.right, true);
  const top = fitLine(edges.top, false);
  const bottom = fitLine(edges.bottom, false);

  return {
    quad: [
      intersect(top, left),
      intersect(top, right),
      intersect(bottom, left),
      intersect(bottom, right),
    ],
    worst: {
      left: Number(left.worst.toFixed(2)),
      right: Number(right.worst.toFixed(2)),
      top: Number(top.worst.toFixed(2)),
      bottom: Number(bottom.worst.toFixed(2)),
    },
    edges,
  };
}

const slug = process.argv[2];
if (!plates[slug]) {
  console.error(`Usage: node scripts/measure-screen-quad.mjs ${Object.keys(plates).join("|")}`);
  process.exit(1);
}

const result = measure(plates[slug]);
console.log(`${slug} quad (top-left, top-right, bottom-left, bottom-right):`);
for (const corner of result.quad) console.log(`  [${corner[0]}, ${corner[1]}],`);
console.log("worst fit deviation in px:", JSON.stringify(result.worst));
console.log("A deviation above about 3px means a scan line left the screen. Retune it.");
if (process.argv.includes("--raw")) console.log(JSON.stringify(result.edges, null, 1));
