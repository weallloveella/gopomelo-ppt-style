# GoPomelo layout catalog

## Contents

1. Layout selection rules
2. Layout registry
3. Page rhythm
4. Image slots

## 1. Layout selection rules

Use the content shape to select a layout. Do not force all content into cards.

- Use one layout ID per slide and include it in HTML as `data-layout="GPxx"`.
- Give every slide one claim and one primary visual hierarchy.
- Use at least six different IDs in decks of eight or more pages.
- Avoid repeating the same silhouette on consecutive pages.
- Use `warm`, `light`, and `dark` as states; states do not change the layout ID.

## 2. Layout registry

### GP01 · Brand gradient cover

Use for the opening page.

- One short title, optional subtitle, presenter/date metadata.
- Layered pink–orange–gold gradient field by default.
- White logo placed directly on the gradient without a white container.
- No card grid or agenda.

### GP02 · Narrative index

Use to establish the argument or sections.

- Strong slide title on the left.
- Three or four numbered beats on the right or lower band.
- Each beat should describe a progression, not a generic topic label.

### GP03 · Big statement

Use for a thesis, tension, transition, or decisive takeaway.

- One large sentence using no more than three lines.
- One short supporting paragraph or source note.
- Prefer `dark` or `warm`.

### GP04 · Three capabilities

Use for three equal concepts that need short explanations.

- One title plus three equal cards.
- Keep each card to one heading and approximately 25–40 words.
- Use one visual marker per card; do not add decorative UI controls.

### GP05 · Split visual story

Use when an image or screenshot is primary evidence.

- 5/7 or 6/6 text-image split.
- Align the image top edge with the text title area.
- Use a 16:10 or 4:3 visual slot.
- Add at most one caption and two supporting points.

### GP06 · Act divider

Use every three to five pages when the narrative turns.

- Warm pink–orange–gold state by default; shift the gradient focal point so it does not duplicate the cover exactly.
- Large act number or short kicker.
- One compact statement; no dense supporting content.

### GP07 · Workflow

Use for three to five sequential steps.

- Use a horizontal route for three or four steps.
- Use a vertical route when descriptions are longer.
- Make the progression cumulative and action-oriented.
- Avoid arrow spaghetti; a single route line is enough.

### GP08 · Data hero

Use for one primary metric and up to three supporting indicators.

- The hero value must dominate the page.
- Explain what the number means and why it matters.
- Do not use this layout for invented or unverified data.

### GP09 · Case study

Use for `Challenge → Approach → Outcome` or an equivalent evidence arc.

- Combine one strong image with three concise evidence blocks.
- Keep the outcome factual; do not invent impact numbers.
- Prefer `dark` when media is cinematic or high contrast.

### GP10 · Resolved closing

Use for the final page.

- Resolve the opening tension.
- End with a decision, next step, implication, or productive question.
- Use light or dark state and one clear CTA when the deck is commercial.
- Do not repeat the full warm gradient from GP06 by default.
- Prefer the approved GoPomelo favicon as the closing motif. It may carry a localized pink–coral–orange–gold gradient; do not replace it with an arbitrary rounded rectangle or blob.

### GP11 · Before / after

Use for a meaningful contrast between two operating models, choices, or states.

- Use two balanced columns and a visible contrast axis.
- Keep comparison categories equivalent.
- Do not make the “before” side artificially weak.

### GP12 · Visual mosaic

Use when multiple images collectively prove variety or coverage.

- Use three to six images with consistent crop logic.
- Give every image a short caption or semantic label.
- Avoid repeating one source image in different crops.

## 3. Page rhythm

Example 10-page sampler:

```text
01 GP01 warm  — cover
02 GP02 light — narrative index
03 GP03 dark  — central thesis
04 GP04 light — capability set
05 GP05 light — visual evidence
06 GP06 warm  — act divider
07 GP07 dark  — workflow
08 GP08 light — data hero
09 GP09 dark  — case study
10 GP10 light — resolved close
```

This rhythm is a starting point, not a mandatory story template.

## 4. Image slots

Use standard ratios:

| Layout | Slot |
| --- | --- |
| GP05 | 16:10 or 4:3 |
| GP09 | 16:9 or 3:2 |
| GP12 | consistent 16:10, 3:2, or 1:1 group |
| Full-bleed experiment | 16:9 with centered safe area |

Keep the important subject away from the crop edge. Use `contain` only for UI, diagrams, or evidence that must remain fully visible.
