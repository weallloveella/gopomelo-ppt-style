# GoPomelo deck checklist

## P0 · Must pass

- Every slide has one `GP01`–`GP12` layout ID and one `warm`, `light`, or `dark` state.
- The title, subtitle, and all visible copy are audience-facing.
- No TODO, placeholder, prompt, internal note, or production wording remains.
- HTML preserves the landing-page SF Pro/system font stack; PPTX uses the approved Arial mapping from that stack.
- BytePlus blue/cyan tokens are absent unless required by approved partner/source material.
- Dark pages use warm charcoal, not navy.
- The default cover uses the approved pink–orange–gold layered gradient.
- The white cover logo sits directly on the gradient without a white pill, card, or backdrop.
- Every text element placed directly on a warm gradient is white at 86–100% opacity; no gray, muted, or dark support copy remains.
- Pink remains the first brand-recognition signal while appearing mainly through accents and localized gradient elements.
- Deck title is at least 50pt-equivalent, slide titles at least 35pt-equivalent, and body text at least 16pt-equivalent.
- No one-line title wraps unexpectedly.
- No text, image, caption, or footer leaves the slide canvas or enters the navigation safe zone.
- All unintended overlap warnings are fixed.
- Every local asset path resolves and delivered files use relative paths.
- Standard content pages default to the top-right logo; any omission is justified by content occupying the logo reserve.

## P1 · Narrative and rhythm

- The communication job is clear.
- Every page advances the story and has one primary claim.
- The opening creates a reason to continue.
- The closing resolves the opening with an action, decision, implication, or useful question.
- An eight-page-or-longer deck uses all three states.
- No state repeats on three consecutive pages.
- An eight-page-or-longer deck uses at least six layout IDs.
- Dense and sparse pages alternate intentionally.
- At least one image-led page appears when useful visual evidence exists.

## P2 · Visual system

- Full warm gradients are concentrated on the cover and one major divider or emphasis page.
- In an 8–12 page deck, the full warm gradient appears no more than twice by default.
- Light and dark content pages may use one localized pink-led gradient card, halo, or cropped field.
- Orange supports the pink-led brand system rather than becoming an independent primary color.
- Light pages use no more than one dominant gradient wash.
- Cards use consistent 28–34px primary radii and 16–20px nested radii.
- Shadows are restrained and warm-neutral.
- Not every page is a card grid.
- Pills contain short labels only.
- Images follow standard ratios and consistent crop logic.
- The GoPomelo logo has sufficient contrast and is not stretched.
- GP10 uses the approved favicon/pomelo-slice motif when a large brand shape is needed, not an arbitrary rounded rectangle.

## P3 · Interaction and output

### HTML

- Arrow, PageUp/PageDown, Home/End, Space, wheel, and swipe navigation work.
- Escape overview works and thumbnails reveal content.
- `B` low-power mode disables nonessential motion.
- `prefers-reduced-motion` leaves all content visible.
- The deck has no horizontal overflow inside an individual page.

### PPTX

- Text, cards, charts, and simple workflow elements remain editable.
- Every slide is rendered and inspected individually.
- Montage rhythm matches the HTML version when both are requested.
- Overflow test passes.
- The PPTX opens without unresolved fonts, missing images, or repair warnings.
