import fs from "node:fs/promises";
import path from "node:path";
import { Presentation, PresentationFile } from "@oai/artifact-tool";

export const SIZE = { width: 1280, height: 720 };
export const FRAME = { left: 72, top: 58, width: 1136, height: 604 };

export const COLORS = {
  pink: "#F83F8F",
  pinkDeep: "#C91866",
  coral: "#F3604F",
  orange: "#FB9305",
  gold: "#FFBE06",
  inkDeep: "#17191F",
  ink: "#20252D",
  inkSoft: "#4E4E4E",
  muted: "#6E6E73",
  paper: "#FFF9F6",
  paper2: "#FFF1E8",
  white: "#FFFFFF",
  line: "#20252D/10",
};

export const TYPE = {
  display: "Arial",
  text: "Arial",
};

export const FILLS = {
  warm: "linear(315deg, #F3604F 0%, #FB9305 62%, #FFBE06 100%)",
  light: "linear(180deg, #FFFFFF 0%, #FFFDFC 100%)",
  dark: "linear(145deg, #17191F 0%, #20252D 100%)",
};

export function createPresentation() {
  return Presentation.create({ slideSize: SIZE });
}

export async function loadImageAsset(imagePath, alt = path.basename(imagePath)) {
  const bytes = await fs.readFile(imagePath);
  const ext = path.extname(imagePath).toLowerCase();
  const contentType = ext === ".jpg" || ext === ".jpeg"
    ? "image/jpeg"
    : ext === ".webp"
      ? "image/webp"
      : "image/png";
  return {
    blob: bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength),
    contentType,
    alt,
  };
}

function addRect(slide, name, position, fill, options = {}) {
  return slide.shapes.add({
    geometry: options.geometry ?? "rect",
    name,
    position,
    fill,
    line: options.line ?? { style: "solid", fill: "none", width: 0 },
    borderRadius: options.radius,
    shadow: options.shadow,
  });
}

function addText(slide, name, text, position, options = {}) {
  const shape = slide.shapes.add({
    geometry: "textbox",
    name,
    position,
    fill: "none",
    line: { style: "solid", fill: "none", width: 0 },
  });
  shape.text = text;
  shape.text.style = {
    typeface: options.typeface ?? TYPE.text,
    fontSize: options.fontSize ?? 20,
    bold: options.bold ?? false,
    italic: options.italic ?? false,
    color: options.color ?? COLORS.ink,
    alignment: options.alignment ?? "left",
    verticalAlignment: options.verticalAlignment ?? "top",
    lineSpacing: options.lineSpacing ?? 1.08,
    autoFit: options.autoFit ?? "shrinkText",
    insets: options.insets ?? { top: 0, right: 0, bottom: 0, left: 0 },
  };
  return shape;
}

function addImage(slide, name, image, position, options = {}) {
  if (!image) return null;
  if (options.shadow) {
    addRect(
      slide,
      `${name}-shadow-frame`,
      position,
      options.frameFill ?? COLORS.white,
      {
        radius: options.radius ?? 30,
        line: { style: "solid", fill: options.frameLine ?? "#FFFFFF/70", width: 1 },
        shadow: options.shadow,
      },
    );
  }
  return slide.images.add({
    name,
    blob: image.blob,
    contentType: image.contentType,
    alt: image.alt,
    fit: options.fit ?? "cover",
    position,
    geometry: "roundRect",
    borderRadius: options.radius ?? 30,
  });
}

function stateColors(state) {
  const reverse = state === "warm" || state === "dark";
  return {
    primary: reverse ? COLORS.white : COLORS.ink,
    secondary: reverse ? "#FFFFFF/74" : COLORS.muted,
    line: reverse ? "#FFFFFF/14" : COLORS.line,
  };
}

function baseSlide(presentation, layoutId, state) {
  const slide = presentation.slides.add();
  slide.name = `${layoutId}-${state}`;
  slide.background.fill = FILLS[state];

  if (state === "light") {
    addRect(slide, `${layoutId}-warm-wash`, { left: 1060, top: 0, width: 220, height: 220 },
      "radial(#FB9305/10 0%, #F3604F/4 48%, #FFFFFF/0 100%)",
      { geometry: "ellipse" });
  }
  if (state === "dark") {
    addRect(slide, `${layoutId}-pink-wash`, { left: 1040, top: 0, width: 240, height: 240 },
      "radial(#F83F8F/16 0%, #F83F8F/0 72%)",
      { geometry: "ellipse" });
  }
  return slide;
}

function addEyebrow(slide, text, x, y, state) {
  const colors = stateColors(state);
  addRect(slide, `${text}-dot`, { left: x, top: y + 5, width: 9, height: 9 },
    state === "warm" ? COLORS.white : COLORS.pink,
    { geometry: "ellipse" });
  return addText(slide, `${text}-eyebrow`, text.toUpperCase(), { left: x + 18, top: y, width: 370, height: 22 }, {
    fontSize: 14,
    bold: true,
    color: colors.primary,
    lineSpacing: 1,
  });
}

function addLogo(slide, logo, state, x = 72, y = 54) {
  if (!logo) return;
  if (state === "warm") {
    addRect(slide, "gopomelo-logo-pill", { left: x, top: y, width: 164, height: 48 }, COLORS.white, {
      radius: 24,
      shadow: "0px 10px 26px #5B2E36/15",
    });
    slide.images.add({
      name: "gopomelo-logo",
      blob: logo.blob,
      contentType: logo.contentType,
      alt: "GoPomelo logo",
      fit: "contain",
      position: { left: x + 16, top: y + 13, width: 132, height: 22 },
    });
  } else {
    slide.images.add({
      name: "gopomelo-logo",
      blob: logo.blob,
      contentType: logo.contentType,
      alt: "GoPomelo logo",
      fit: "contain",
      position: { left: x, top: y + 8, width: 142, height: 27 },
    });
  }
}

function addChrome(slide, page, state, label = "GoPomelo") {
  const colors = stateColors(state);
  addText(slide, `chrome-${page}-brand`, label, { left: 72, top: 680, width: 280, height: 18 }, {
    fontSize: 12,
    bold: true,
    color: colors.secondary,
    lineSpacing: 1,
  });
  addText(slide, `chrome-${page}-page`, String(page).padStart(2, "0"), { left: 1160, top: 680, width: 48, height: 18 }, {
    fontSize: 12,
    bold: true,
    color: colors.secondary,
    alignment: "right",
    lineSpacing: 1,
  });
}

function addSlideTitle(slide, title, state, eyebrow) {
  const colors = stateColors(state);
  if (eyebrow) addEyebrow(slide, eyebrow, 72, 72, state);
  addText(slide, "slide-title", title, { left: 72, top: eyebrow ? 112 : 78, width: 920, height: 114 }, {
    typeface: TYPE.display,
    fontSize: 48,
    bold: true,
    color: colors.primary,
    lineSpacing: .96,
  });
}

export function addGP01(presentation, spec) {
  const state = spec.state ?? "dark";
  const colors = stateColors(state);
  const slide = baseSlide(presentation, "GP01", state);
  addLogo(slide, spec.logo, state);
  addEyebrow(slide, spec.eyebrow ?? "GoPomelo presentations", 72, 156, state);
  addText(slide, "cover-title", spec.title, { left: 72, top: 205, width: 1050, height: 210 }, {
    typeface: TYPE.display,
    fontSize: spec.titleSize ?? 82,
    bold: true,
    color: colors.primary,
    lineSpacing: .91,
  });
  if (spec.subtitle) {
    addText(slide, "cover-subtitle", spec.subtitle, { left: 72, top: 468, width: 760, height: 78 }, {
      fontSize: 22,
      color: colors.secondary,
      lineSpacing: 1.28,
    });
  }
  (spec.tags ?? []).slice(0, 4).forEach((tag, i) => {
    const width = 116 + tag.length * 4;
    const left = 72 + i * 154;
    addRect(slide, `cover-tag-${i + 1}`, { left, top: 575, width, height: 38 }, state === "light" ? "#FFFFFF" : "#FFFFFF/06", {
      radius: 19,
      line: { style: "solid", fill: colors.line, width: 1 },
    });
    addText(slide, `cover-tag-${i + 1}-text`, tag, { left: left + 12, top: 585, width: width - 24, height: 18 }, {
      fontSize: 13,
      bold: true,
      color: colors.primary,
      alignment: "center",
      lineSpacing: 1,
    });
  });
  addChrome(slide, spec.page ?? 1, state, spec.chrome ?? "GoPomelo");
  return slide;
}

export function addGP02(presentation, spec) {
  const state = spec.state ?? "light";
  const slide = baseSlide(presentation, "GP02", state);
  const colors = stateColors(state);
  addLogo(slide, spec.logo, state, 1060, 52);
  addEyebrow(slide, spec.eyebrow ?? "Narrative", 72, 92, state);
  addText(slide, "index-title", spec.title, { left: 72, top: 140, width: 460, height: 150 }, {
    typeface: TYPE.display,
    fontSize: 52,
    bold: true,
    color: colors.primary,
    lineSpacing: .96,
  });
  if (spec.lead) addText(slide, "index-lead", spec.lead, { left: 72, top: 320, width: 430, height: 150 }, {
    fontSize: 20,
    color: colors.secondary,
    lineSpacing: 1.35,
  });
  const items = (spec.items ?? []).slice(0, 4);
  items.forEach((item, i) => {
    const top = 92 + i * 132;
    addRect(slide, `index-item-${i + 1}`, { left: 615, top, width: 593, height: 112 }, state === "dark" ? "#FFFFFF/08" : "#FFFFFF/82", {
      radius: 22,
      line: { style: "solid", fill: colors.line, width: 1 },
      shadow: state === "light" ? "0px 10px 28px #5B2E36/7" : "shadow-none",
    });
    addText(slide, `index-number-${i + 1}`, String(i + 1).padStart(2, "0"), { left: 635, top: top + 24, width: 50, height: 28 }, {
      fontSize: 17,
      bold: true,
      color: COLORS.pinkDeep,
    });
    addText(slide, `index-heading-${i + 1}`, item.title, { left: 700, top: top + 18, width: 470, height: 34 }, {
      typeface: TYPE.display,
      fontSize: 23,
      bold: true,
      color: colors.primary,
    });
    addText(slide, `index-copy-${i + 1}`, item.text, { left: 700, top: top + 58, width: 470, height: 36 }, {
      fontSize: 16,
      color: colors.secondary,
      lineSpacing: 1.22,
    });
  });
  addChrome(slide, spec.page, state, spec.chrome);
  return slide;
}

export function addGP03(presentation, spec) {
  const state = spec.state ?? "dark";
  const slide = baseSlide(presentation, "GP03", state);
  const colors = stateColors(state);
  addLogo(slide, spec.logo, state, 1044, 52);
  addEyebrow(slide, spec.eyebrow ?? "Point of view", 72, 124, state);
  addText(slide, "statement", spec.statement, { left: 72, top: 198, width: 1080, height: 280 }, {
    typeface: TYPE.display,
    fontSize: spec.statementSize ?? 72,
    bold: true,
    color: colors.primary,
    lineSpacing: .94,
  });
  if (spec.support) addText(slide, "statement-support", spec.support, { left: 72, top: 520, width: 720, height: 82 }, {
    fontSize: 20,
    color: colors.secondary,
    lineSpacing: 1.34,
  });
  addChrome(slide, spec.page, state, spec.chrome);
  return slide;
}

export function addGP04(presentation, spec) {
  const state = spec.state ?? "light";
  const slide = baseSlide(presentation, "GP04", state);
  const colors = stateColors(state);
  addSlideTitle(slide, spec.title, state, spec.eyebrow ?? "Capabilities");
  addLogo(slide, spec.logo, state, 1060, 52);
  const cards = (spec.cards ?? []).slice(0, 3);
  cards.forEach((card, i) => {
    const left = 72 + i * 376;
    addRect(slide, `capability-card-${i + 1}`, { left, top: 240, width: 352, height: 356 }, state === "dark" ? "#FFFFFF/08" : "#FFFFFF/84", {
      radius: 30,
      line: { style: "solid", fill: colors.line, width: 1 },
      shadow: state === "light" ? "0px 14px 36px #5B2E36/8" : "shadow-none",
    });
    addRect(slide, `capability-chip-${i + 1}`, { left: left + 28, top: 272, width: 52, height: 52 },
      state === "dark" ? "#FFFFFF/09" : "#F83F8F/09",
      { radius: 16 });
    addText(slide, `capability-code-${i + 1}`, card.code ?? String(i + 1).padStart(2, "0"), { left: left + 39, top: 289, width: 30, height: 18 }, {
      fontSize: 14,
      bold: true,
      color: state === "dark" ? COLORS.pink : COLORS.pinkDeep,
      alignment: "center",
    });
    addText(slide, `capability-title-${i + 1}`, card.title, { left: left + 28, top: 355, width: 296, height: 70 }, {
      typeface: TYPE.display,
      fontSize: 27,
      bold: true,
      color: colors.primary,
      lineSpacing: .98,
    });
    addText(slide, `capability-copy-${i + 1}`, card.text, { left: left + 28, top: 448, width: 296, height: 112 }, {
      fontSize: 17,
      color: colors.secondary,
      lineSpacing: 1.36,
    });
  });
  addChrome(slide, spec.page, state, spec.chrome);
  return slide;
}

export function addGP05(presentation, spec) {
  const state = spec.state ?? "light";
  const slide = baseSlide(presentation, "GP05", state);
  const colors = stateColors(state);
  addLogo(slide, spec.logo, state, 72, 52);
  addEyebrow(slide, spec.eyebrow ?? "Visual evidence", 72, 138, state);
  addText(slide, "split-title", spec.title, { left: 72, top: 186, width: 430, height: 158 }, {
    typeface: TYPE.display,
    fontSize: 48,
    bold: true,
    color: colors.primary,
    lineSpacing: .96,
  });
  if (spec.text) addText(slide, "split-copy", spec.text, { left: 72, top: 382, width: 420, height: 150 }, {
    fontSize: 19,
    color: colors.secondary,
    lineSpacing: 1.38,
  });
  addImage(slide, "split-image", spec.image, { left: 555, top: 92, width: 653, height: 500 }, {
    fit: spec.fit ?? "cover",
    radius: 32,
    shadow: "0px 18px 52px #5B2E36/13",
  });
  if (spec.caption) {
    addRect(slide, "split-caption-surface", { left: 579, top: 524, width: 420, height: 46 }, "#FFFFFF/86", {
      radius: 16,
      line: { style: "solid", fill: "#FFFFFF/70", width: 1 },
    });
    addText(slide, "split-caption", spec.caption, { left: 595, top: 538, width: 388, height: 18 }, {
      fontSize: 14,
      bold: true,
      color: COLORS.ink,
      lineSpacing: 1,
    });
  }
  addChrome(slide, spec.page, state, spec.chrome);
  return slide;
}

export function addGP06(presentation, spec) {
  const slide = baseSlide(presentation, "GP06", "warm");
  addLogo(slide, spec.logo, "warm", 1044, 52);
  addText(slide, "act-number", spec.number ?? "02", { left: 72, top: 220, width: 300, height: 180 }, {
    typeface: TYPE.display,
    fontSize: 150,
    bold: true,
    color: "#FFFFFF/25",
    lineSpacing: .82,
  });
  addEyebrow(slide, spec.eyebrow ?? "Next act", 412, 185, "warm");
  addText(slide, "divider-title", spec.title, { left: 412, top: 234, width: 760, height: 220 }, {
    typeface: TYPE.display,
    fontSize: 64,
    bold: true,
    color: COLORS.white,
    lineSpacing: .94,
  });
  if (spec.support) addText(slide, "divider-support", spec.support, { left: 412, top: 482, width: 650, height: 72 }, {
    fontSize: 20,
    color: "#FFFFFF/78",
    lineSpacing: 1.32,
  });
  addChrome(slide, spec.page, "warm", spec.chrome);
  return slide;
}

export function addGP07(presentation, spec) {
  const state = spec.state ?? "dark";
  const slide = baseSlide(presentation, "GP07", state);
  const colors = stateColors(state);
  addSlideTitle(slide, spec.title, state, spec.eyebrow ?? "Workflow");
  addLogo(slide, spec.logo, state, 1060, 52);
  addRect(slide, "workflow-route", { left: 150, top: 324, width: 980, height: 3 },
    "linear(90deg, #F83F8F 0%, #F83F8F 58%, #F3604F 82%, #FB9305 100%)",
    { radius: 2 });
  const steps = (spec.steps ?? []).slice(0, 4);
  steps.forEach((step, i) => {
    const left = 72 + i * 284;
    addRect(slide, `workflow-node-${i + 1}`, { left: left + 30, top: 290, width: 72, height: 72 }, COLORS.white, {
      radius: 22,
      shadow: "0px 12px 32px #000000/16",
    });
    addText(slide, `workflow-node-text-${i + 1}`, String(i + 1).padStart(2, "0"), { left: left + 46, top: 316, width: 40, height: 20 }, {
      fontSize: 17,
      bold: true,
      color: COLORS.pinkDeep,
      alignment: "center",
      lineSpacing: 1,
    });
    addText(slide, `workflow-title-${i + 1}`, step.title, { left, top: 395, width: 245, height: 62 }, {
      typeface: TYPE.display,
      fontSize: 23,
      bold: true,
      color: colors.primary,
      lineSpacing: 1,
    });
    addText(slide, `workflow-copy-${i + 1}`, step.text, { left, top: 468, width: 245, height: 95 }, {
      fontSize: 16,
      color: colors.secondary,
      lineSpacing: 1.32,
    });
  });
  addChrome(slide, spec.page, state, spec.chrome);
  return slide;
}

export function addGP08(presentation, spec) {
  const state = spec.state ?? "light";
  const slide = baseSlide(presentation, "GP08", state);
  const colors = stateColors(state);
  addSlideTitle(slide, spec.title, state, spec.eyebrow ?? "Data hero");
  addLogo(slide, spec.logo, state, 1060, 52);
  addText(slide, "hero-value", spec.value, { left: 72, top: 245, width: 630, height: 190 }, {
    typeface: TYPE.display,
    fontSize: spec.valueSize ?? 150,
    bold: true,
    color: colors.primary,
    lineSpacing: .8,
  });
  addText(slide, "hero-meaning", spec.meaning, { left: 72, top: 465, width: 610, height: 100 }, {
    fontSize: 21,
    color: colors.secondary,
    lineSpacing: 1.36,
  });
  (spec.metrics ?? []).slice(0, 3).forEach((metric, i) => {
    const top = 200 + i * 132;
    addRect(slide, `metric-${i + 1}`, { left: 785, top, width: 423, height: 112 }, state === "dark" ? "#FFFFFF/08" : "#FFFFFF/82", {
      radius: 24,
      line: { style: "solid", fill: colors.line, width: 1 },
      shadow: state === "light" ? "0px 10px 28px #5B2E36/7" : "shadow-none",
    });
    addText(slide, `metric-value-${i + 1}`, metric.value, { left: 813, top: top + 20, width: 150, height: 38 }, {
      typeface: TYPE.display,
      fontSize: 32,
      bold: true,
      color: COLORS.pinkDeep,
    });
    addText(slide, `metric-label-${i + 1}`, metric.label, { left: 813, top: top + 65, width: 350, height: 28 }, {
      fontSize: 16,
      color: colors.secondary,
    });
  });
  addChrome(slide, spec.page, state, spec.chrome);
  return slide;
}

export function addGP09(presentation, spec) {
  const state = spec.state ?? "dark";
  const slide = baseSlide(presentation, "GP09", state);
  const colors = stateColors(state);
  addImage(slide, "case-image", spec.image, { left: 72, top: 92, width: 650, height: 500 }, {
    fit: spec.fit ?? "cover",
    radius: 32,
    shadow: "0px 18px 54px #000000/22",
    frameFill: COLORS.ink,
    frameLine: "#FFFFFF/14",
  });
  addEyebrow(slide, spec.eyebrow ?? "Case study", 770, 94, state);
  addText(slide, "case-title", spec.title, { left: 770, top: 138, width: 420, height: 116 }, {
    typeface: TYPE.display,
    fontSize: 43,
    bold: true,
    color: colors.primary,
    lineSpacing: .96,
  });
  (spec.evidence ?? []).slice(0, 3).forEach((item, i) => {
    const top = 290 + i * 108;
    if (i > 0) addRect(slide, `case-rule-${i + 1}`, { left: 770, top: top - 12, width: 420, height: 1 }, colors.line);
    addText(slide, `case-label-${i + 1}`, item.label.toUpperCase(), { left: 770, top, width: 150, height: 18 }, {
      fontSize: 13,
      bold: true,
      color: COLORS.pink,
    });
    addText(slide, `case-heading-${i + 1}`, item.title, { left: 770, top: top + 25, width: 420, height: 34 }, {
      typeface: TYPE.display,
      fontSize: 22,
      bold: true,
      color: colors.primary,
    });
    addText(slide, `case-copy-${i + 1}`, item.text, { left: 770, top: top + 62, width: 420, height: 42 }, {
      fontSize: 16,
      color: colors.secondary,
      lineSpacing: 1.25,
    });
  });
  addChrome(slide, spec.page, state, spec.chrome);
  return slide;
}

export function addGP10(presentation, spec) {
  const state = spec.state ?? "light";
  const colors = stateColors(state);
  const slide = baseSlide(presentation, "GP10", state);
  addLogo(slide, spec.logo, state);
  addEyebrow(slide, spec.eyebrow ?? "Next step", 72, 164, state);
  addText(slide, "closing-title", spec.title, { left: 72, top: 220, width: 1050, height: 190 }, {
    typeface: TYPE.display,
    fontSize: spec.titleSize ?? 72,
    bold: true,
    color: colors.primary,
    lineSpacing: .94,
  });
  if (spec.support) addText(slide, "closing-support", spec.support, { left: 72, top: 452, width: 760, height: 90 }, {
    fontSize: 21,
    color: colors.secondary,
    lineSpacing: 1.34,
  });
  if (spec.cta) {
    addRect(slide, "closing-cta", { left: 72, top: 568, width: 220, height: 50 }, state === "light" ? COLORS.ink : COLORS.white, {
      radius: 25,
      shadow: "0px 12px 30px #000000/12",
    });
    addText(slide, "closing-cta-text", spec.cta, { left: 88, top: 584, width: 188, height: 20 }, {
      fontSize: 16,
      bold: true,
      color: state === "light" ? COLORS.white : COLORS.ink,
      alignment: "center",
    });
  }
  addChrome(slide, spec.page, state, spec.chrome);
  return slide;
}

export function addGP11(presentation, spec) {
  const state = spec.state ?? "light";
  const slide = baseSlide(presentation, "GP11", state);
  const colors = stateColors(state);
  addSlideTitle(slide, spec.title, state, spec.eyebrow ?? "Comparison");
  addLogo(slide, spec.logo, state, 1060, 52);
  [spec.left, spec.right].forEach((panel, i) => {
    const left = i === 0 ? 72 : 650;
    const fill = i === 0
      ? (state === "dark" ? "#FFFFFF/07" : "#FFFFFF/78")
      : (state === "dark" ? "linear(145deg, #F83F8F/16 0%, #FB9305/12 100%)" : "linear(145deg, #F83F8F/10 0%, #FFF4E8 100%)");
    addRect(slide, `compare-panel-${i + 1}`, { left, top: 230, width: 558, height: 370 }, fill, {
      radius: 32,
      line: { style: "solid", fill: colors.line, width: 1 },
    });
    addText(slide, `compare-title-${i + 1}`, panel.title, { left: left + 30, top: 262, width: 490, height: 55 }, {
      typeface: TYPE.display,
      fontSize: 34,
      bold: true,
      color: colors.primary,
    });
    (panel.items ?? []).slice(0, 4).forEach((item, j) => {
      const top = 345 + j * 58;
      addRect(slide, `compare-rule-${i + 1}-${j + 1}`, { left: left + 30, top: top - 8, width: 490, height: 1 }, colors.line);
      addText(slide, `compare-item-${i + 1}-${j + 1}`, item, { left: left + 30, top, width: 490, height: 42 }, {
        fontSize: 17,
        color: colors.secondary,
        lineSpacing: 1.25,
      });
    });
  });
  addChrome(slide, spec.page, state, spec.chrome);
  return slide;
}

export function addGP12(presentation, spec) {
  const state = spec.state ?? "light";
  const slide = baseSlide(presentation, "GP12", state);
  addSlideTitle(slide, spec.title, state, spec.eyebrow ?? "Visual range");
  addLogo(slide, spec.logo, state, 1060, 52);
  const images = (spec.images ?? []).slice(0, 4);
  const slots = [
    { left: 72, top: 225, width: 548, height: 375 },
    { left: 640, top: 225, width: 276, height: 178 },
    { left: 932, top: 225, width: 276, height: 178 },
    { left: 640, top: 421, width: 568, height: 179 },
  ];
  images.forEach((item, i) => {
    addImage(slide, `mosaic-image-${i + 1}`, item.image ?? item, slots[i], {
      fit: item.fit ?? "cover",
      radius: 24,
      shadow: "0px 12px 32px #5B2E36/9",
    });
    if (item.caption) {
      const slot = slots[i];
      addRect(slide, `mosaic-caption-surface-${i + 1}`, { left: slot.left + 12, top: slot.top + slot.height - 42, width: Math.min(slot.width - 24, 230), height: 30 }, "#FFFFFF/86", { radius: 15 });
      addText(slide, `mosaic-caption-${i + 1}`, item.caption, { left: slot.left + 22, top: slot.top + slot.height - 33, width: Math.min(slot.width - 44, 210), height: 15 }, {
        fontSize: 12,
        bold: true,
        color: COLORS.ink,
      });
    }
  });
  addChrome(slide, spec.page, state, spec.chrome);
  return slide;
}

async function writeBlob(filePath, blob) {
  await fs.writeFile(filePath, new Uint8Array(await blob.arrayBuffer()));
}

export async function exportPresentation(presentation, outputDir, pptxPath) {
  await fs.mkdir(outputDir, { recursive: true });
  for (const [index, slide] of presentation.slides.items.entries()) {
    const stem = `slide-${String(index + 1).padStart(2, "0")}`;
    const png = await presentation.export({ slide, format: "png", scale: 1 });
    await writeBlob(path.join(outputDir, `${stem}.png`), png);
    const layout = await slide.export({ format: "layout" });
    await fs.writeFile(path.join(outputDir, `${stem}.layout.json`), await layout.text());
  }
  const montage = await presentation.export({ format: "webp", montage: true, scale: 1 });
  await writeBlob(path.join(outputDir, "deck-montage.webp"), montage);
  const pptx = await PresentationFile.exportPptx(presentation);
  await pptx.save(pptxPath);
}
