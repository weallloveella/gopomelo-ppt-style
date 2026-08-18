# HTML output workflow

## Assemble

1. Copy `assets/html/template.html` to the output `index.html`.
2. Copy required brand and content assets into a sibling `assets/` folder.
3. Replace the title and `<!-- SLIDES_HERE -->` marker.
4. Use one registered layout, state, logo treatment, and visual mode on every slide:

```html
<section class="slide"
  data-layout="GP14"
  data-state="dark"
  data-logo="top-right"
  data-visual="diagram">
  <!-- audience-facing content -->
</section>
```

Use only reusable classes from the template. Add a class to the template stylesheet when a required behavior is missing; do not accumulate one-off inline layout systems.

For a GP03 contrast statement, use the registered variant structure:

```html
<section class="slide"
  data-layout="GP03"
  data-variant="contrast"
  data-state="dark"
  data-logo="top-right"
  data-visual="text">
  <div class="safe centered-claim contrast-statement">
    <div>
      <p class="eyebrow">The breakthrough</p>
      <h2 class="statement">
        <span class="strike-soft">Ask better.</span><br>
        <span class="contrast-new">Design clearer.</span>
      </h2>
      <p class="lead">Define the system, not only the answer.</p>
    </div>
  </div>
</section>
```

## Preserve brand behavior

- Use `special` for cover, divider, and closing composition; `top-right` for standard pages; `omit` only when primary content occupies the reserve.
- Keep the top-right 182×72px reserve clear when the logo is present.
- Keep every direct text element on a warm gradient white at 86–100% opacity.
- Use at most one localized pink-led gradient field on a light or dark content page.
- Preserve the closing mark as a square, undistorted SVG emerging from the bottom-right.

## Preserve the engine

Keep arrow, PageUp/PageDown, Home/End, Space, wheel, swipe, Escape overview, `B` low-power mode, navigation dots, page numbers, and `prefers-reduced-motion` support.

## Apply semantic classes

Use the registered expanded class families:

- GP03 contrast: `.centered-claim`, `.contrast-statement`, `.strike-soft`, `.contrast-new`; add `data-variant="contrast"`.
- GP13: `.timeline-layout`, `.timeline-track`, `.timeline-stop`, `.timeline-node`, `.timeline-copy`. Wrap every milestone heading and body in `.timeline-copy`.
- GP14: `.loop-layout`, `.loop-copy`, `.loop-ring`, `.loop-node`.
- GP15: `.layer-layout`, `.layer-stack`, `.layer-band`.
- GP16: `.ecosystem-layout`, `.ecosystem-map`, `.ecosystem-core`, `.ecosystem-node`, `.ecosystem-line`.
- GP17: `.ledger-layout`, `.ledger-list`, `.ledger-row`.
- GP18: `.benchmark-layout`, `.bar-list`, `.bar-row`, `.bar-track`, `.bar-fill`.
- GP19: `.matrix-layout`, `.matrix-grid`, `.matrix-cell`, `.row-header`. Set `--data-cols` and `--data-rows` for content cells, excluding axis headers.
- GP20: `.screenshot-layout`, `.screenshot-stage`, `.screenshot-frame`, `.screenshot-callout`.

Do not use a new layout ID while retaining the visual skeleton of GP03, GP04, or GP07.

## Capture mode

Use `index.html?capture=1&slide=N`. Capture a 1280×720 CSS viewport at 3× device scale for 3840×2160 output. Hide browser-presentation controls but keep on-slide page chrome.

## Final checks

Run `scripts/validate-html.mjs`. Inspect every page at full size, overview rhythm, one dark page, one light page, one expanded layout, and the closing page in capture mode.
