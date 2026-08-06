---
name: gopomelo-ppt-style
description: Create or refine GoPomelo-branded presentation decks as editable PowerPoint (.pptx), native Google Slides-targeted imports, horizontal slide HTML, or matched outputs. Use when a user asks for a GoPomelo PPT, Google Slides deck, pitch deck, proposal, keynote, event deck, sales presentation, internal report, presentation template, web slides, HTML deck, or wants an existing presentation restyled to the GoPomelo visual language.
---

# GoPomelo PPT Style

Create premium GoPomelo presentation artifacts that translate the existing landing-page language into a 16:9 presentation system. Keep PPTX and HTML outputs visually aligned while respecting the capabilities of each format.

## Core rules

- Treat the GoPomelo landing-page design as the visual source of truth.
- Use the landing-page font stack. Do not introduce Product Sans or a new display font unless the user explicitly asks.
- Use three page states only: `warm`, `light`, and `dark`. Let `warm` create the branded opening and major turn; use `light` and `dark` for clarity, contrast, and breathing room.
- Treat pink as the primary brand identifier, but express it through logo details, dots, rules, keywords, numbers, buttons, and localized gradient fields rather than repeating flat full-slide pink backgrounds.
- Build warm gradients from GoPomelo pink flowing into orange and gold. Orange provides energy and transition; it does not replace pink as the brand anchor.
- Use the gradient cover by default. Place the white GoPomelo logo directly on the gradient without a white pill, card, or container.
- On a `warm` gradient, all text placed directly on the gradient must be white at 86–100% opacity. Do not use gray, `muted`, or dark text unless it sits inside a genuinely light surface with independent contrast.
- On standard content slides, place the GoPomelo logo in the top-right safe-frame corner by default. If primary content, media, or a data panel occupies that reserve, omit the logo instead of shrinking or shifting the content. Cover, divider, and closing slides may use special placement.
- Do not introduce a generic technology blue/cyan system. Permit blue only inside an approved partner logo, product screenshot, chart category, or source image that must remain faithful.
- Keep visible copy audience-facing. Never expose planning notes, placeholders, prompt language, or production commentary.
- Build independently. Do not copy templates, scripts, shaders, or layout code from `guizang-ppt-skill`.

Always read [references/brand-system.md](references/brand-system.md) before authoring. Read [references/layouts.md](references/layouts.md) before planning slide layouts.

## Workflow

### 1. Define the communication job

Infer or confirm:

- Output: PPTX, HTML, or both.
- Audience and presentation setting.
- Desired outcome and central takeaway.
- Duration or target page count.
- Source material, images, screenshots, data, and required language.

Ask no more than three questions at once. If missing information does not materially change the result, make a reasonable assumption and state it.

Write one internal sentence before planning:

```text
By the end, [audience] should [outcome] because [central takeaway].
```

### 2. Plan the narrative and slide register

Build a cumulative narrative rather than a gallery of unrelated pages. Give every slide one narrative job and one primary claim.

Create a slide register before authoring:

```text
Page | Layout ID | State | Logo | Claim | Image slot | Output notes
```

Use only registered `GP01`–`GP12` layouts unless the user explicitly requests an experimental layout. For decks of eight or more pages:

- Use all three states.
- Do not use one state on three consecutive pages.
- Use at least six different layout IDs.
- Include one image-led layout unless the material genuinely has no useful visual evidence.
- Use one or two `warm` pages by default: the cover plus one major act divider or emphasis page.

### 3. Prepare assets

Use the official logo and icon assets in `assets/brand/`. Copy required assets into the output folder; do not reference the skill directory from a delivered artifact. Use `gopomelo-icon-gradient.svg` or its inline SVG path for the closing motif rather than an external CSS mask or a generic closing-page blob.

For image-heavy work, read [references/image-guidelines.md](references/image-guidelines.md). Prefer original high-resolution assets. Do not reuse the same non-background image more than once.

### 4. Generate the selected format

#### HTML

Read [references/html-output.md](references/html-output.md), copy `assets/html/template.html`, insert registered slide sections at `<!-- SLIDES_HERE -->`, and keep all slide classes sourced from the template.

Preserve keyboard, wheel, touch, overview, and low-power controls. Use relative image paths.

#### PPTX

Read [references/pptx-output.md](references/pptx-output.md). Use the installed `Presentations` skill and `@oai/artifact-tool`; do not use `python-pptx` or PptxGenJS. Copy `assets/pptx/gopomelo-deck.mjs` into the presentation scratch workspace and use its design tokens and layout helpers.

Keep text, cards, charts, and simple diagrams editable. Use supplied images for primary visual evidence.

#### Both

Use one slide register and the same layout IDs, titles, order, page states, and assets. Adapt effects that do not translate literally:

- HTML may use blur and browser-native motion.
- PPTX should simulate glass with pale solid fills, fine borders, and restrained shadows.
- Never redesign the PPTX into a different visual system merely because effects differ.

#### Google Slides

Create and validate the editable PPTX first, then use the installed Google Slides/Drive skill to import it as native Google Slides. Do not embed the HTML deck inside Slides. Use HTML for design approval and browser presentation only.

After import, verify that text, shapes, images, and page order remain editable and visually intact. Once a native GoPomelo reference deck exists, copy that deck for future work instead of re-importing every time.

### 5. Validate and inspect

Read [references/checklist.md](references/checklist.md) completely.

For HTML, run:

```bash
node <SKILL_ROOT>/scripts/validate-html.mjs /absolute/path/to/index.html
```

Open the HTML at 1280×720 and inspect every page after motion settles. Verify overview mode and keyboard/touch navigation.

For PPTX, render every slide, inspect each full-size image, inspect a montage for rhythm, and run the presentation overflow test. Fix all unintended overlaps, clipped text, and wrapping before delivery.

### 6. Deliver

Return the requested final artifact paths. Keep scratch builders, previews, layout JSON, and QA logs outside the deliverables unless the user asks for them.

## Resource map

- [references/brand-system.md](references/brand-system.md): colors, typography, spacing, cards, and state rules.
- [references/layouts.md](references/layouts.md): registered `GP01`–`GP12` layout catalog.
- [references/html-output.md](references/html-output.md): HTML assembly and interaction requirements.
- [references/pptx-output.md](references/pptx-output.md): artifact-tool workflow and PPTX parity rules.
- [references/image-guidelines.md](references/image-guidelines.md): asset selection, cropping, and screenshot treatment.
- [references/checklist.md](references/checklist.md): mandatory visual and technical QA.
- `assets/html/template.html`: original GoPomelo horizontal deck engine.
- `assets/pptx/gopomelo-deck.mjs`: editable PPTX theme and layout helpers.
- `assets/pptx/gopomelo-ppt-style-sampler.pptx`: tested 10-slide editable style reference.
- `assets/pptx/gopomelo-ppt-style-sampler-montage.png`: quick visual reference for the complete system.
- `assets/brand/`: approved GoPomelo logo assets.
- `scripts/validate-html.mjs`: deterministic HTML deck validation.
