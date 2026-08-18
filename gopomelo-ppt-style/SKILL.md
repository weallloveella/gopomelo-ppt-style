---
name: gopomelo-ppt-style
description: Create or refine visually varied GoPomelo-branded presentation decks as horizontal HTML, editable PowerPoint (.pptx), or Google Slides-targeted imports. Use for GoPomelo presentations, pitch decks, internal reports, training decks, long-form keynote decks, web slides, presentation templates, or when an existing GoPomelo deck feels repetitive and needs stronger visual rhythm, diagrams, data views, timelines, evidence pages, or richer layout selection.
---

# GoPomelo PPT Style

Create premium GoPomelo presentations that translate the landing-page visual language into a flexible 16:9 system. Preserve the original brand rules while adding stronger long-deck composition, semantic layout selection, and deterministic variety checks.

## Core rules

- Treat [references/brand-system.md](references/brand-system.md) as the visual source of truth.
- Use the landing-page system font stack. Map it to Arial for cross-platform PPTX and Google Slides delivery.
- Use only `warm`, `light`, and `dark` page states. Use warm gradients for the cover and rare major turns; let light and dark pages carry most content.
- Keep pink as the primary brand identifier through logos, labels, rules, numbers, and localized gradients. Use orange and gold inside warm transitions, not as independent brand systems.
- Place the standard logo in the top-right safe reserve. Use `omit` when primary content occupies that area; use `special` only for covers, dividers, and closings.
- Keep direct text on warm gradients white at 86–100% opacity.
- Prefer one clear composition over repeated card grids. Use images, diagrams, data structures, and spatial relationships as evidence rather than decoration.
- Keep visible content audience-facing. Never expose prompts, planning notes, or production labels.
- Never invent data, metrics, quotes, sources, or outcomes.
- Build independently. Do not copy code or templates from other presentation skills.

Read [references/layouts.md](references/layouts.md) before planning. For decks of 20 or more slides, also read [references/long-decks.md](references/long-decks.md) completely.

## Workflow

### 1. Define the communication job

Infer or confirm the audience, setting, desired outcome, central takeaway, duration, source material, assets, and output format.

Write one internal sentence:

```text
By the end, [audience] should [outcome] because [central takeaway].
```

### 2. Build a slide register

Plan the cumulative narrative before authoring:

```text
Page | Layout ID | Variant | State | Logo | Visual mode | Density | Claim | Asset | Reuse distance
```

Use registered layouts `GP01`–`GP20`. Select layouts by content shape, not by visual preference. Use `data-visual="text|diagram|data|image|mixed"` on every HTML slide.

Use the registered `GP03` `contrast` variant for a short old-belief → new-direction reversal. Do not substitute a dense GP11 comparison when the narrative needs a sparse, high-impact pause.

For 8–19 slides:

- Use at least six layout IDs and all three states.
- Include at least two diagram-, data-, image-, or mixed-led pages when the content supports them.
- Avoid the same layout on consecutive pages.

For 20–29 slides:

- Use at least eight layout IDs.
- Make at least 25% of pages diagram-, data-, image-, or mixed-led.
- Keep any one layout at or below 20% of the deck.

For 30 or more slides:

- Use at least ten layout IDs.
- Make at least 30% of pages diagram-, data-, image-, or mixed-led.
- Keep any one layout at or below 15% of the deck unless an intentional recurring motif is documented.
- Keep the top four layout IDs below 65% combined.
- Plan acts of four to seven pages. Use state changes to express narrative turns, not mechanical light/dark alternation.

### 3. Prepare assets

Use approved assets from `assets/brand/`. Copy required files into the delivered artifact and use relative paths. Preserve the closing pomelo-slice motif at 1:1 and crop it only through slide overflow.

Read [references/image-guidelines.md](references/image-guidelines.md) for image-led work. Use each non-background image once by default. Use constructed HTML visuals only when they clarify a real relationship and do not impersonate a screenshot.

### 4. Generate

#### HTML

Read [references/html-output.md](references/html-output.md). Copy `assets/html/template.html`, insert registered slide sections, and use the supplied expanded layout classes. Preserve keyboard, wheel, touch, overview, low-power, and capture controls.

#### PPTX

Read [references/pptx-output.md](references/pptx-output.md) and use the installed Presentations skill with `@oai/artifact-tool`. Keep text, cards, charts, and simple diagrams editable. Recreate the registered layout geometry with native editable shapes rather than flattening whole slides.

#### Google Slides

Create and verify the editable PPTX first, then import it as native Google Slides. Do not embed the HTML presentation in Slides.

### 5. Validate and inspect

Read [references/checklist.md](references/checklist.md) completely.

Run:

```bash
node <SKILL_ROOT>/scripts/validate-html.mjs /absolute/path/to/index.html
```

Fix every error and review every warning. Inspect every slide at 1280×720 after motion settles, inspect overview rhythm, and inspect at least one 3× capture-mode export.

### 6. Deliver

Return only requested artifacts. Preserve original source decks when producing a test or redesign.

## Resource map

- [references/brand-system.md](references/brand-system.md): color, typography, state, logo, and motif rules.
- [references/layouts.md](references/layouts.md): registered `GP01`–`GP20` content shapes.
- [references/long-decks.md](references/long-decks.md): act planning, diversity targets, and long-deck rhythm.
- [references/html-output.md](references/html-output.md): HTML assembly and metadata requirements.
- [references/pptx-output.md](references/pptx-output.md): PPTX and Google Slides parity.
- [references/image-guidelines.md](references/image-guidelines.md): image selection and framing.
- [references/checklist.md](references/checklist.md): mandatory QA.
- `assets/html/template.html`: HTML engine and reusable layout classes.
- `assets/pptx/gopomelo-deck.mjs`: editable PPTX theme baseline.
- `assets/brand/`: approved GoPomelo assets.
- `scripts/validate-html.mjs`: semantic and diversity validator.
