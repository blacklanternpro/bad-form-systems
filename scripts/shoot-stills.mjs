#!/usr/bin/env node
/**
 * Shoot the product stills.
 *
 * Each still is a photograph (the plate) with the real IMS components warped onto
 * the screen in the glass, so the product shots always show the product as it is
 * actually built. No image model draws the UI.
 *
 * Usage:
 *   npm run dev            # in another terminal
 *   node scripts/shoot-stills.mjs [slug ...] [--scale 2] [--port 3000] [--keep-png]
 */

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const OUT_DIR = join(ROOT, "public", "images");
const WORK_DIR = join(tmpdir(), "bad-form-stills");

function parseArgs(argv) {
  const slugs = [];
  const opts = { scale: 2, port: 3000, keepPng: false, quality: 88 };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--scale") opts.scale = Number(argv[(i += 1)]);
    else if (arg === "--port") opts.port = Number(argv[(i += 1)]);
    else if (arg === "--quality") opts.quality = Number(argv[(i += 1)]);
    else if (arg === "--keep-png") opts.keepPng = true;
    else if (arg.startsWith("--")) throw new Error(`Unknown flag: ${arg}`);
    else slugs.push(arg);
  }
  return { slugs, opts };
}

/** Read the still config out of the TypeScript source without a build step. */
function readPlates() {
  const source = readFileSync(join(ROOT, "src", "content", "stills.ts"), "utf8");
  const slugList = source.match(/stillSlugs = \[([^\]]+)\]/)?.[1] ?? "";
  const slugs = [...slugList.matchAll(/"(\w+)"/g)].map((match) => match[1]);
  const table = source.slice(source.indexOf("export const stillPlates"));
  const plates = [];
  for (const slug of slugs) {
    const block = table.slice(table.indexOf(`  ${slug}: {`));
    const read = (key) => block.match(new RegExp(`${key}: "([^"]+)"`))?.[1];
    const stage = block.match(/stage: \{ width: (\d+), height: (\d+) \}/);
    if (!stage) continue;
    plates.push({
      slug,
      output: read("output"),
      width: Number(stage[1]),
      height: Number(stage[2]),
    });
  }
  return plates;
}

function chromeBinary() {
  const candidates = [
    process.env.CHROME_PATH,
    "google-chrome",
    "google-chrome-stable",
    "chromium",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ].filter(Boolean);
  for (const candidate of candidates) {
    try {
      execFileSync("which", [candidate], { stdio: "ignore" });
      return candidate;
    } catch {
      if (existsSync(candidate)) return candidate;
    }
  }
  throw new Error("No Chrome found. Set CHROME_PATH.");
}

function capture({ chrome, url, file, width, height, scale }) {
  // Headless Chrome writes the file and then does not always exit, so it is
  // fenced with a timeout and judged on whether the file landed.
  try {
    execFileSync(
      "timeout",
      [
        "40",
        chrome,
        "--headless=new",
        "--no-sandbox",
        "--disable-gpu",
        "--hide-scrollbars",
        "--force-color-profile=srgb",
        `--force-device-scale-factor=${scale}`,
        `--window-size=${width},${height}`,
        `--screenshot=${file}`,
        url,
      ],
      { stdio: "ignore" },
    );
  } catch {
    /* exit code is unreliable, the file check below is the real test */
  }
  if (!existsSync(file) || statSync(file).size < 10_000) {
    throw new Error(`Capture failed for ${url}`);
  }
}

function encode({ png, out, width, height, quality }) {
  execFileSync(
    "ffmpeg",
    [
      "-y",
      "-i",
      png,
      "-vf",
      `scale=${width}:${height}:flags=lanczos,unsharp=5:5:0.35:5:5:0.0`,
      "-quality",
      String(quality),
      "-frames:v",
      "1",
      out,
    ],
    { stdio: "ignore" },
  );
}

async function main() {
  const { slugs, opts } = parseArgs(process.argv.slice(2));
  const plates = readPlates().filter((plate) => slugs.length === 0 || slugs.includes(plate.slug));
  if (plates.length === 0) throw new Error("No matching stills in src/content/stills.ts");

  const base = `http://localhost:${opts.port}`;
  const probe = await fetch(base).catch(() => null);
  if (!probe?.ok) throw new Error(`No dev server on ${base}. Run npm run dev first.`);

  const chrome = chromeBinary();
  mkdirSync(WORK_DIR, { recursive: true });

  for (const plate of plates) {
    const png = join(WORK_DIR, `${plate.slug}.png`);
    const out = join(OUT_DIR, plate.output);
    capture({
      chrome,
      url: `${base}/lab/composite/${plate.slug}?capture=1`,
      file: png,
      width: plate.width,
      height: plate.height,
      scale: opts.scale,
    });
    encode({ png, out, width: plate.width, height: plate.height, quality: opts.quality });
    const kb = Math.round(statSync(out).size / 1024);
    console.log(`${plate.slug} -> public/images/${plate.output} (${kb} kB)`);
  }

  if (!opts.keepPng) rmSync(WORK_DIR, { recursive: true, force: true });
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
