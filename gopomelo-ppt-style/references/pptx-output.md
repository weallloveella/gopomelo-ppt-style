# PPTX output workflow

## Required route

Use the installed `Presentations` skill and `@oai/artifact-tool` from a JavaScript ES module. Do not use `python-pptx`, PptxGenJS, or direct Open XML manipulation for net-new decks.

## Build sequence

1. Create an external scratch workspace as required by the `Presentations` skill.
2. Initialize artifact-tool module resolution in that scratch workspace.
3. Copy `assets/pptx/gopomelo-deck.mjs` and the required brand/image assets into scratch.
4. Build a 1280×720 presentation using the registered `GPxx` geometry. Use the helper for GP01–GP12 and compose GP13–GP20 with editable native shapes from `references/layouts.md`.
5. Export slide PNGs, layout JSON, a montage, and the final PPTX.
6. Run overflow detection and visually inspect every slide.

## Typography

Use:

- `Arial Bold` for display titles and key headings.
- `Arial` for body and captions.
- Keep the HTML output on the landing-page system/SF stack. The PPTX mapping uses Arial because it preserves weight and editability more reliably across PowerPoint and Google Slides.

Keep deck titles at least 50pt-equivalent, slide titles at least 35pt-equivalent, mid-level headings at least 24pt-equivalent, and body text at least 16pt-equivalent. Artifact-tool uses pixels, so use the size table in `brand-system.md`.

## Visual parity

- Use native gradient fills for the warm cover and one major transition or emphasis page.
- Approximate the HTML layered gradient with a pink–coral–orange base plus one concentrated gold focal light.
- Place an approved white GoPomelo logo directly on the warm cover; do not create a white logo pill or backdrop.
- Keep all text placed directly on a warm gradient white at 86–100% opacity. Do not use gray or muted supporting text on the open gradient field.
- Default standard content slides to a top-right logo. Omit it when the title, chart, media, or data panel occupies the reserve; never reflow content solely to force the logo in.
- Use the approved favicon/pomelo-slice mark as the GP10 closing motif when a large brand shape is needed; apply a localized warm gradient rather than an arbitrary rounded rectangle.
- Pass state-specific logo assets to the helper: a white/reverse logo for `warm` pages and the standard logo for `light` or `dark` pages. The helper must place the logo directly on the warm field without a pill.
- For GP10, pass `gopomelo-icon-gradient.svg` as `spec.motif`. Treat it as a conceptual 560×560 square starting near `left:900; top:365`. The helper converts the off-canvas portion into a matched normalized crop inside the slide bounds, preserving the circular source while satisfying overflow checks. Do not stretch or rotate it.
- On light and dark pages, use pink as the primary brand signal through editable accents or one localized gradient field.
- Keep editable text and grouping surfaces.
- Simulate HTML glass cards with pale solid fills, fine borders, and restrained warm shadows.
- Use images for primary visual evidence rather than recreating photos or illustrations with shapes.
- Use native shapes for simple workflow lines and boxes only.
- Create connectors before nodes when a diagram genuinely requires connectors.
- For the GP03 contrast statement variant, call `addGP03` with `variant: "contrast"`, `before`, and `after`. Keep both text elements editable and use a separate editable rule across the muted `before` phrase to reproduce the strike-through treatment.

```js
addGP03(deck, {
  variant: "contrast",
  state: "dark",
  eyebrow: "The breakthrough",
  before: "Ask better.",
  after: "Design clearer.",
  support: "Define the system, not only the answer.",
});
```

## Helper asset

`assets/pptx/gopomelo-deck.mjs` provides:

- Shared palette, typography, safe frame, gradients, and chrome.
- Helpers for the stable `GP01`–`GP12` baseline.
- Shared primitives, palette, typography, safe frame, gradients, and chrome for composing editable GP13–GP20 slides.
- Preview, layout, montage, and PPTX export helpers.

Load the reverse logo and faded closing motif from SVG when needed:

```js
const logo = {
  default: await loadImageAsset(blackLogoPath, "GoPomelo logo"),
  white: await loadImageAsset(blackLogoPath, "GoPomelo logo", { svgFill: "#FFFFFF" }),
};
const motif = await loadImageAsset(motifPath, "GoPomelo motif", { svgOpacity: 0.58 });
```

Copy the helper into scratch before importing it so the ESM module resolves the scratch workspace’s artifact-tool dependency.

## QA

- Fix every unintended overlap warning.
- Inspect each slide PNG individually; a montage is not enough.
- Verify one-line titles do not wrap.
- Verify page markers and logo placement remain consistent.
- Verify the GP10 motif remains circular and is intentionally clipped only at the right and bottom edges.
- Verify no chart bubble or label obscures another name or key value.
- Check that partner-colored source images have not changed the deck’s GoPomelo accent system.
