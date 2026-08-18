# Long-deck planning

Use these rules for decks of 20 or more slides. A long deck needs narrative rhythm, not just more pages.

## 1. Plan acts before layouts

Group the story into acts of four to seven pages. Give each act a distinct visual job:

1. Open or reframe with a sparse statement, divider, or timeline.
2. Explain with one structured page.
3. Prove with data, media, a diagram, or a real example.
4. Resolve with a takeaway, decision, or transition.

Do not alternate light and dark mechanically. Let an act run for two related pages when continuity helps, then use a deliberate reset.

Use the GP03 `contrast` variant as a sparse reset when an act replaces one short belief or behavior with another. Do not use it merely to add typographic variety.

## 2. Control reuse

For 20–29 slides:

- Use at least eight layout IDs.
- Keep one layout at or below 20%.
- Keep the top four layouts below 70% combined.

For 30 or more slides:

- Use at least ten layout IDs.
- Keep one layout at or below 15% unless a repeated motif is documented.
- Keep the top four layouts below 65% combined.
- Leave at least two intervening slides before reusing a highly distinctive silhouette.

Do not count different states of the same layout as different silhouettes.

## 3. Set a visual evidence quota

Use `data-visual` on every HTML slide:

- `text`: typography is the primary visual.
- `diagram`: spatial relationships, process, loop, system, or map.
- `data`: verified numbers, charts, bars, ledgers, or matrices.
- `image`: a real image or screenshot is the primary evidence.
- `mixed`: two evidence modes are equally important.

For 20–29 slides, at least 25% must be `diagram`, `data`, `image`, or `mixed`. For 30 or more slides, use at least 30%.

Constructed UI may count as `diagram` when it explains a workflow. Never label a constructed mockup as a real screenshot.

## 4. Vary five composition axes

Vary the combination, not just the layout ID:

- Axis: horizontal, vertical, radial, layered, or full-bleed.
- Density: sparse, medium, or dense.
- Dominant element: title, number, image, relationship, or sequence.
- State: warm, light, or dark.
- Direction: left-to-right, right-to-left, top-down, or centered.

Avoid more than two consecutive pages with the same axis and dominant element.

## 5. Validate semantic fit

- GP05, GP09, and GP20 require a real image, screenshot, or clearly constructed visual.
- GP08, GP17, and GP18 require verified numbers.
- GP12 requires three to six images.
- GP13 requires meaningful time or ordered progression.
- GP14 requires a real loop where the final step feeds the first.
- GP15 requires nested or stacked levels.
- GP16 requires relationships among multiple entities.
- GP19 requires two explicit dimensions or a structured row/column comparison.

If content does not match, change the layout instead of inventing evidence.

## 6. Use the slide register as a QA ledger

Add these fields:

```text
Page | Layout | Variant | State | Logo | Visual | Density | Claim | Asset | Reuse distance
```

Before authoring, scan the register for clusters of GP03/GP04/GP07, repeated card grids, missing evidence pages, and mechanical state alternation.
