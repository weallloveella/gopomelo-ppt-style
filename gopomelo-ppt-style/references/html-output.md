# HTML output workflow

## Assemble the deck

1. Copy `assets/html/template.html` to the target `index.html`.
2. Copy the required logo and image assets into a sibling `assets/` folder.
3. Replace the document title placeholder.
4. Replace `<!-- SLIDES_HERE -->` with registered slide sections.
5. Keep every slide in this form:

```html
<section class="slide" data-layout="GP04" data-state="light" data-logo="top-right">
  <!-- audience-facing slide content -->
</section>
```

Use only classes already defined in the template. Add a reusable class to the template stylesheet when a required behavior is missing; do not accumulate one-off inline styles across slides.

For warm slides, use the direct logo treatment from the template. The pink logo asset may be converted to white with the template's CSS filter; never add a white logo pill or card. On light and dark content pages, use at most one localized pink-led gradient field per page.

Use `data-logo="special"` for covers, dividers, and closing pages; `data-logo="top-right"` for standard content pages; and `data-logo="omit"` when primary content occupies the top-right reserve. For `top-right`, use the template's `.logo-top-right` class. Never move or shrink meaningful content just to make room for the logo.

On `warm` pages, the template redefines `--muted` to high-contrast white. Keep every direct title, paragraph, caption, label, and number at 86–100% white. If a light card on a warm page genuinely needs dark text, add `.on-light` to that light surface; do not reintroduce gray text on the open gradient.

When GP10 uses the approved closing motif, prefer the inline SVG path from `assets/brand/gopomelo-icon-gradient.svg`. Do not use an external PNG as a CSS mask on local `file://` decks because that treatment may fail silently. A normal `<img>` using the gradient SVG is the fallback when inline SVG is not practical.

## Preserve the engine

Keep:

- Left/right arrows, PageUp/PageDown, Home/End, and Space navigation.
- Wheel navigation with threshold protection.
- Touch swipe navigation.
- Escape overview mode.
- `B` low-power/static mode.
- Page counter and navigation dots.
- `prefers-reduced-motion` support.

The engine uses browser-native animation and contains no code copied from another presentation skill.

## Content and sizing

- Validate at 1280×720 first.
- Keep title and key content inside the safe frame.
- Use relative image paths.
- Ensure important meaning remains visible without hover.
- Keep slide content readable when motion is disabled.
- Do not use autoplay audio or essential autoplay video.

## Final checks

Run `scripts/validate-html.mjs`, then inspect each page at full size. Test keyboard, wheel, swipe, Escape, and `B` controls. Open overview mode and verify all thumbnails reveal their content.
