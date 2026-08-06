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

function fail(message) { errors.push(message); }
function warn(message) { warnings.push(message); }

const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim();
if (!title) fail("Missing document <title>.");
if (title && /\[|replace|placeholder|todo/i.test(title)) fail(`Unresolved document title: ${title}`);

if (html.includes("<!-- SLIDES_HERE -->")) fail("Template marker <!-- SLIDES_HERE --> remains.");
if (/\b(TODO|PLACEHOLDER)\b/i.test(html)) fail("Unresolved TODO or PLACEHOLDER remains in the deck.");
if (/\/Users\//.test(html) || /[A-Za-z]:\\/.test(html)) fail("Absolute local filesystem path found in delivered HTML.");

const slideTags = [...html.matchAll(/<section\b([^>]*\bclass=["'][^"']*\bslide\b[^"']*["'][^>]*)>/gi)];
if (!slideTags.length) fail("No <section class=\"slide\"> elements found.");

const layouts = [];
const states = [];
const logoTreatments = [];
for (const [i, match] of slideTags.entries()) {
  const attrs = match[1];
  const layout = attrs.match(/data-layout=["'](GP\d{2})["']/i)?.[1]?.toUpperCase();
  const state = attrs.match(/data-state=["'](warm|light|dark)["']/i)?.[1]?.toLowerCase();
  const logo = attrs.match(/data-logo=["'](special|top-right|omit)["']/i)?.[1]?.toLowerCase();
  if (!layout) fail(`Slide ${i + 1}: missing valid data-layout=\"GPxx\".`);
  if (layout && !/^GP(0[1-9]|1[0-2])$/.test(layout)) fail(`Slide ${i + 1}: unregistered layout ${layout}.`);
  if (!state) fail(`Slide ${i + 1}: missing data-state warm/light/dark.`);
  if (!logo) fail(`Slide ${i + 1}: missing data-logo special/top-right/omit.`);
  layouts.push(layout ?? "missing");
  states.push(state ?? "missing");
  logoTreatments.push(logo ?? "missing");
}

if (states.length >= 8) {
  for (const required of ["warm", "light", "dark"]) {
    if (!states.includes(required)) fail(`Deck has ${states.length} slides but never uses the ${required} state.`);
  }
  if (new Set(layouts.filter(x => x !== "missing")).size < 6) {
    fail("Deck has eight or more slides but uses fewer than six layout IDs.");
  }
}

for (let i = 2; i < states.length; i += 1) {
  if (states[i] !== "missing" && states[i] === states[i - 1] && states[i] === states[i - 2]) {
    fail(`Slides ${i - 1}–${i + 1}: state ${states[i]} appears three times consecutively.`);
  }
}

const prohibited = ["#2354ff", "#0b2cc4", "#00c7d8", "#0066cc", "#0b1220", "#080f22"];
for (const color of prohibited) {
  if (html.toLowerCase().includes(color)) fail(`Prohibited legacy blue/navy token found: ${color}`);
}

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

console.log(`Validation passed: ${slideTags.length} slides, ${new Set(layouts).size} layouts, states ${[...new Set(states)].join(", ")}, logo treatments ${[...new Set(logoTreatments)].join(", ")}.`);
if (warnings.length) console.log(`${warnings.length} warning(s) require review.`);
