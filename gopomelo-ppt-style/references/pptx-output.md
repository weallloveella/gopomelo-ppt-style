# PPTX output workflow

## Required route

Use the installed `Presentations` skill and `@oai/artifact-tool` from a JavaScript ES module. Do not use `python-pptx`, PptxGenJS, or direct Open XML manipulation for net-new decks.

## Build sequence

1. Create an external scratch workspace as required by the `Presentations` skill.
2. Initialize artifact-tool module resolution in that scratch workspace.
3. Copy `assets/pptx/gopomelo-deck.mjs` and the required brand/image assets into scratch.
4. Build a 1280×720 presentation using registered `GPxx` helpers.
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
- On light and dark pages, use pink as the primary brand signal through editable accents or one localized gradient field.
- Keep editable text and grouping surfaces.
- Simulate HTML glass cards with pale solid fills, fine borders, and restrained warm shadows.
- Use images for primary visual evidence rather than recreating photos or illustrations with shapes.
- Use native shapes for simple workflow lines and boxes only.
- Create connectors before nodes when a diagram genuinely requires connectors.

## Helper asset

`assets/pptx/gopomelo-deck.mjs` provides:

- Shared palette, typography, safe frame, gradients, and chrome.
- Helpers for `GP01`–`GP12`.
- Preview, layout, montage, and PPTX export helpers.

Copy the helper into scratch before importing it so the ESM module resolves the scratch workspace’s artifact-tool dependency.

## QA

- Fix every unintended overlap warning.
- Inspect each slide PNG individually; a montage is not enough.
- Verify one-line titles do not wrap.
- Verify page markers and logo placement remain consistent.
- Check that partner-colored source images have not changed the deck’s GoPomelo accent system.
