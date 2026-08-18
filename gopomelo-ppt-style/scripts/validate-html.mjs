#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const input = process.argv[2];
if (!input) {
  console.error("Usage: node validate-html.mjs /absolute/path/to/index.html");
  process.exit(2);
}

const htmlPath = path.resolve(input);
if (!fs.existsSync(htmlPath)) {
  console.error(`Deck not found: ${htmlPath}`);
  process.exit(2);
}

const html = fs.readFileSync(htmlPath, "utf8");
const errors = [];
const warnings = [];
const fail = message => errors.push(message);
const warn = message => warnings.push(message);

const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim();
if (!title) fail("Missing document <title>.");
if (title && /\[|replace|placeholder|todo/i.test(title)) fail(`Unresolved document title: ${title}`);
if (html.includes("<!-- SLIDES_HERE -->")) fail("Template marker <!-- SLIDES_HERE --> remains.");
if (/\b(TODO|PLACEHOLDER)\b/i.test(html)) fail("Unresolved TODO or PLACEHOLDER remains in the deck.");
if (/\/Users\//.test(html) || /[A-Za-z]:\\/.test(html)) fail("Absolute local filesystem path found in delivered HTML.");

const slideMatches = [...html.matchAll(/<section\b([^>]*\bclass=["'][^"']*\bslide\b[^"']*["'][^>]*)>([\s\S]*?)<\/section>/gi)];
if (!slideMatches.length) fail("No <section class=\"slide\"> elements found.");

const slides = slideMatches.map((match, index) => {
  const attrs = match[1];
  const body = match[2];
  const read = (name, pattern) => attrs.match(new RegExp(`data-${name}=["'](${pattern})["']`, "i"))?.[1]?.toLowerCase();
  return {
    index: index + 1,
    attrs,
    body,
    layout: read("layout", "GP\\d{2}")?.toUpperCase(),
    state: read("state", "warm|light|dark"),
    logo: read("logo", "special|top-right|omit"),
    visual: read("visual", "text|diagram|data|image|mixed"),
    variant: read("variant", "[a-z0-9-]+"),
  };
});

const registered = new Set(Array.from({ length: 20 }, (_, i) => `GP${String(i + 1).padStart(2, "0")}`));
for (const slide of slides) {
  if (!slide.layout) fail(`Slide ${slide.index}: missing valid data-layout=\"GPxx\".`);
  else if (!registered.has(slide.layout)) fail(`Slide ${slide.index}: unregistered layout ${slide.layout}.`);
  if (!slide.state) fail(`Slide ${slide.index}: missing data-state warm/light/dark.`);
  if (!slide.logo) fail(`Slide ${slide.index}: missing data-logo special/top-right/omit.`);
  if (!slide.visual) fail(`Slide ${slide.index}: missing data-visual text/diagram/data/image/mixed.`);
  if (slide.variant === "contrast" && slide.layout !== "GP03") fail(`Slide ${slide.index}: data-variant="contrast" is registered only for GP03.`);
  if (slide.variant === "contrast" && slide.state === "warm") fail(`Slide ${slide.index}: GP03 contrast variant supports light or dark state, not warm.`);
}

const layouts = slides.map(slide => slide.layout).filter(Boolean);
const states = slides.map(slide => slide.state).filter(Boolean);
const logos = slides.map(slide => slide.logo).filter(Boolean);
const visuals = slides.map(slide => slide.visual).filter(Boolean);
const count = values => values.reduce((map, value) => map.set(value, (map.get(value) || 0) + 1), new Map());
const layoutCounts = count(layouts);

if (slides.length >= 8) {
  for (const required of ["warm", "light", "dark"]) {
    if (!states.includes(required)) fail(`Deck has ${slides.length} slides but never uses the ${required} state.`);
  }
}

const requiredLayouts = slides.length >= 30 ? 10 : slides.length >= 20 ? 8 : slides.length >= 8 ? 6 : 1;
if (new Set(layouts).size < requiredLayouts) {
  fail(`Deck has ${slides.length} slides but uses ${new Set(layouts).size} layouts; minimum is ${requiredLayouts}.`);
}

for (let i = 2; i < states.length; i += 1) {
  if (states[i] === states[i - 1] && states[i] === states[i - 2]) {
    fail(`Slides ${i - 1}–${i + 1}: state ${states[i]} appears three times consecutively.`);
  }
}

for (let i = 1; i < layouts.length; i += 1) {
  if (layouts[i] === layouts[i - 1]) fail(`Slides ${i}–${i + 1}: layout ${layouts[i]} repeats consecutively.`);
  if (i >= 2 && layouts[i] === layouts[i - 2]) warn(`Slides ${i - 1} and ${i + 1}: distinctive layout ${layouts[i]} returns after only one intervening slide.`);
}

if (slides.length >= 20) {
  const visualEvidence = visuals.filter(value => value && value !== "text").length;
  const minimumShare = slides.length >= 30 ? 0.30 : 0.25;
  if (visualEvidence / slides.length < minimumShare) {
    fail(`Visual-evidence share is ${(100 * visualEvidence / slides.length).toFixed(1)}%; minimum is ${minimumShare * 100}%.`);
  }

  const sorted = [...layoutCounts.entries()].sort((a, b) => b[1] - a[1]);
  const maxShare = slides.length >= 30 ? 0.15 : 0.20;
  if (sorted[0] && sorted[0][1] / slides.length > maxShare) {
    fail(`${sorted[0][0]} occupies ${(100 * sorted[0][1] / slides.length).toFixed(1)}%; maximum is ${maxShare * 100}%.`);
  }
  const topFour = sorted.slice(0, 4).reduce((sum, entry) => sum + entry[1], 0) / slides.length;
  const topFourLimit = slides.length >= 30 ? 0.65 : 0.70;
  if (topFour > topFourLimit) fail(`Top four layouts occupy ${(100 * topFour).toFixed(1)}%; maximum is ${topFourLimit * 100}%.`);
}

const hasNumber = body => /(?:\d[\d,.]*\s*(?:%|x|×|k|m|h|days?|hrs?|hours?)?|\$\s*\d)/i.test(body.replace(/<[^>]+>/g, " "));
const hasConstructedVisual = body => /class=["'][^"']*(?:media-frame|operator-window|doc-visual|origin-visual|content-system-visual|screenshot-stage|screenshot-frame)[^"']*["']/i.test(body);

for (const slide of slides) {
  const body = slide.body;
  const imageCount = (body.match(/<img\b/gi) || []).length;
  if (slide.layout === "GP03" && slide.variant === "contrast") {
    for (const requiredClass of ["centered-claim", "contrast-statement", "strike-soft", "contrast-new"]) {
      const classPattern = new RegExp(`class=["'][^"']*\\b${requiredClass}\\b`, "i");
      if (!classPattern.test(body)) fail(`Slide ${slide.index}: GP03 contrast variant requires .${requiredClass}.`);
    }
  }
  if (["GP05", "GP09"].includes(slide.layout) && imageCount === 0 && !hasConstructedVisual(body)) {
    fail(`Slide ${slide.index}: ${slide.layout} requires an image, screenshot, or constructed evidence visual.`);
  }
  if (slide.layout === "GP12" && imageCount < 3) fail(`Slide ${slide.index}: GP12 requires at least three images.`);
  if (slide.layout === "GP13" && !/class=["'][^"']*timeline-/i.test(body)) fail(`Slide ${slide.index}: GP13 requires the timeline class family.`);
  if (slide.layout === "GP14" && !/class=["'][^"']*loop-/i.test(body)) fail(`Slide ${slide.index}: GP14 requires the loop class family.`);
  if (slide.layout === "GP15" && !/class=["'][^"']*layer-/i.test(body)) fail(`Slide ${slide.index}: GP15 requires the layer class family.`);
  if (slide.layout === "GP16" && !/class=["'][^"']*ecosystem-/i.test(body)) fail(`Slide ${slide.index}: GP16 requires the ecosystem class family.`);
  if (slide.layout === "GP17" && !/class=["'][^"']*ledger-/i.test(body)) fail(`Slide ${slide.index}: GP17 requires the ledger class family.`);
  if (slide.layout === "GP18" && !/class=["'][^"']*bar-/i.test(body)) fail(`Slide ${slide.index}: GP18 requires the benchmark bar class family.`);
  if (slide.layout === "GP19" && !/class=["'][^"']*matrix-/i.test(body)) fail(`Slide ${slide.index}: GP19 requires the matrix class family.`);
  if (slide.layout === "GP20" && imageCount === 0) fail(`Slide ${slide.index}: GP20 requires a real screenshot or image.`);
  if (["GP08", "GP17", "GP18"].includes(slide.layout) && !hasNumber(body)) fail(`Slide ${slide.index}: ${slide.layout} requires verified numerical content.`);
}

const prohibited = ["#2354ff", "#0b2cc4", "#00c7d8", "#0066cc", "#0b1220", "#080f22"];
for (const color of prohibited) if (html.toLowerCase().includes(color)) fail(`Prohibited legacy blue/navy token found: ${color}`);

const cssBlocks = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(match => match[1]).join("\n");
let braceBalance = 0;
for (const char of cssBlocks.replace(/\/\*[\s\S]*?\*\//g, "")) {
  if (char === "{") braceBalance += 1;
  if (char === "}") braceBalance -= 1;
  if (braceBalance < 0) break;
}
if (braceBalance !== 0) fail(`CSS braces are unbalanced (${braceBalance}).`);

const imageSources = [...html.matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["']/gi)].map(match => match[1]);
for (const src of imageSources) {
  if (/^(data:|https?:|\/\/)/i.test(src)) continue;
  const assetPath = path.resolve(path.dirname(htmlPath), src);
  if (!fs.existsSync(assetPath)) fail(`Missing image asset: ${src}`);
}

if (!/id=["']nav["']/.test(html)) fail("Missing slide navigation container #nav.");
if (!/id=["']overview["']/.test(html)) fail("Missing overview container #overview.");
if (!/event\.key\.toLowerCase\(\) === ["']b["']/.test(html)) warn("Could not confirm B low-power shortcut.");
if (!/touchstart/.test(html) || !/touchend/.test(html)) warn("Could not confirm touch swipe handling.");

for (const warning of warnings) console.warn(`WARN: ${warning}`);
for (const error of errors) console.error(`ERROR: ${error}`);

if (errors.length) {
  console.error(`\nValidation failed: ${errors.length} error(s), ${warnings.length} warning(s).`);
  process.exit(1);
}

const distribution = [...layoutCounts.entries()].sort((a, b) => b[1] - a[1]).map(([key, value]) => `${key}:${value}`).join(", ");
console.log(`Validation passed: ${slides.length} slides, ${new Set(layouts).size} layouts, states ${[...new Set(states)].join(", ")}, visuals ${[...new Set(visuals)].join(", ")}, logos ${[...new Set(logos)].join(", ")}.`);
console.log(`Layout distribution: ${distribution}`);
if (warnings.length) console.log(`${warnings.length} warning(s) require review.`);
