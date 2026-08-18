# GoPomelo layout catalog

## Contents

1. Selection rules
2. Core layouts GP01–GP12
3. Expanded layouts GP13–GP20
4. Content-shape routing
5. Image slots

## 1. Selection rules

- Select a layout from the shape of the content, not from a desired decoration.
- Use one `data-layout="GPxx"` and one `data-visual` value per HTML slide.
- Give each slide one primary claim and one dominant visual hierarchy.
- Do not count a light/dark change as a new silhouette.
- Do not force content into cards. Prefer flat composition, direct labels, lines, and spatial relationships.
- Use A/B direction variants only when they preserve the registered skeleton.

## 2. Core layouts

### GP01 · Brand gradient cover

Opening only. Use a short title, optional subtitle, presenter/date metadata, and the white logo directly on the pink–orange–gold gradient. Do not add a card grid.

### GP02 · Narrative index

Use for three or four cumulative beats. Place the main framing on one side and numbered progression on the other.

### GP03 · Big statement

Use for a thesis, tension, or decisive takeaway. Limit the primary sentence to three lines and add at most one short explanation. Prefer dark; use sparingly in long decks.

#### GP03 contrast statement variant

Use `data-variant="contrast"` when the message explicitly replaces an old belief, behavior, or direction with a new one.

- Use `.centered-claim` and `.contrast-statement` on the inner safe frame.
- Put the old phrase in `.strike-soft` and the new phrase in `.contrast-new`.
- Keep each phrase short enough to read as one visual unit; two to five words per phrase is ideal.
- Prefer a dark page for the strongest pause. A light page is allowed when the surrounding act is already dark-heavy.
- Add at most one short supporting sentence.
- Use GP11 instead when the audience needs detailed side-by-side evidence rather than a decisive verbal reversal.

### GP04 · Three capabilities

Use only for exactly three equal concepts with short explanations. Keep peer alignment consistent and highlight at most one item.

### GP05 · Split visual story

Use when a real image, screenshot, or clearly constructed visual is primary evidence. Use a 5/7 or 6/6 split, one caption, and no more than two supporting points. Do not use it as a text-only two-column page.

### GP06 · Act divider

Use at major narrative turns. Keep it sparse: one act number, one statement, and optional one-line framing. Warm is the default, but dark is allowed when another warm page would be excessive.

### GP07 · Workflow

Use for three to five linear sequential steps. Use a single route and action-oriented labels. Do not use for loops, levels, or unordered collections.

### GP08 · Data hero

Use for one verified primary metric and up to three supporting indicators. Explain its meaning and source. Do not invent or decorate an unverified number.

### GP09 · Case study

Use for a factual challenge–approach–outcome arc anchored by real media or a clearly constructed evidence visual. Do not use as a generic three-row summary.

### GP10 · Resolved closing

Resolve the opening with an action, implication, decision, or productive question. Use the approved square pomelo-slice motif emerging from the bottom-right. Keep copy in the left two-thirds.

### GP11 · Before / after

Use for two equivalent operating models, states, or choices. Maintain a visible comparison axis and equal categories.

### GP12 · Visual mosaic

Use three to six images that collectively prove variety or coverage. Apply one crop logic and short semantic captions.

## 3. Expanded layouts

### GP13 · Timeline / progression

Use for time, maturity, escalation, or ordered progression where position expresses advancement.

- Use three to six milestones.
- Use `.timeline-layout`, `.timeline-track`, `.timeline-stop`, `.timeline-node`, and `.timeline-copy` in HTML. Every milestone must wrap its heading and description in `.timeline-copy` so the node row and copy rows cannot collide.
- Use horizontal progression by default; use a vertical variant only for longer milestone descriptions.
- Alternate `.timeline-copy` above and below the line while keeping every `.timeline-node` in the dedicated center row. Never absolutely position a node over unwrapped text.
- Do not use for circular or unordered relationships.

### GP14 · Loop / flywheel

Use for three to five steps where the final step visibly feeds the first.

- Use `.loop-layout`, `.loop-copy`, `.loop-ring`, and `.loop-node`.
- Give `.loop-copy` at least half of the usable width when the headline exceeds roughly 35 characters; keep the ring compact enough that its outside labels remain within the other half.
- Keep labels outside or on the ring; keep the center for one concise outcome.
- Use a clear return path. A linear process arranged in a circle is still the wrong layout.

### GP15 · Layered system

Use for nested levels, stacked capabilities, or a system whose outer layers depend on an inner core.

- Use `.layer-layout`, `.layer-stack`, and `.layer-band`.
- Use three or four layers only.
- Make layer width, depth, or containment express hierarchy.
- Do not use for peer concepts.

### GP16 · Ecosystem map

Use for relationships among a central platform, several inputs, outputs, teams, or stakeholders.

- Use `.ecosystem-layout`, `.ecosystem-map`, `.ecosystem-core`, `.ecosystem-node`, and `.ecosystem-line`.
- Keep the central object visually dominant.
- Wrap the core title and description in one inner `<div>`; the template centers that group as a single unit.
- Use a small number of meaningful connections; avoid decorative network noise.
- Use HTML labels for text and CSS/SVG only for relationship lines.

### GP17 · KPI ledger

Use for four to six verified metrics that should be scanned as a vertical business ledger.

- Use `.ledger-layout`, `.ledger-list`, and `.ledger-row`.
- Align values, labels, and explanations consistently.
- Keep numbers large but below the slide-title hierarchy.
- Include sources or definitions for specialist metrics.

### GP18 · Benchmark bars

Use for ranked or comparable verified values sharing a real denominator or scale.

- Use `.benchmark-layout`, `.bar-list`, `.bar-row`, `.bar-track`, and `.bar-fill`.
- Label every value directly and preserve the true scale.
- Pair each bar with a short interpretation when the action matters more than the ranking.
- Never assign arbitrary percentages to qualitative concepts.

### GP19 · Decision matrix

Use for two explicit dimensions, a barrier-response mapping, prioritization, or a structured row/column comparison.

- Use `.matrix-layout`, `.matrix-grid`, and `.matrix-cell`; set `--data-cols` and `--data-rows` to count content columns and rows only.
- Label both axes or all row/column headers.
- Add `.row-header` to y-axis cells so they sit directly beside the first data column; keep the top header row compact rather than sizing it like a content row.
- Use one localized gradient cell or marker for the primary implication.
- Keep to a maximum 4×4 visible grid.

### GP20 · Screenshot theater

Use when one real product, website, document, or interface screenshot is the evidence.

- Use `.screenshot-layout`, `.screenshot-stage`, `.screenshot-frame`, and `.screenshot-callout`.
- Let the screenshot occupy 55–72% of the canvas.
- Use `contain` for UI and text-heavy screenshots.
- Add no more than three concise callouts. Do not redraw or fabricate UI while presenting it as real.

## 4. Content-shape routing

| Content shape | Use |
| --- | --- |
| Opening | GP01 |
| Narrative map | GP02 |
| One decisive sentence | GP03 |
| Three equal concepts | GP04 |
| One image plus explanation | GP05 |
| Major act turn | GP06 |
| Linear three-to-five-step workflow | GP07 |
| One dominant verified metric | GP08 |
| Challenge–approach–outcome evidence | GP09 |
| Closing action or implication | GP10 |
| Two equivalent states | GP11 |
| Three-to-six images | GP12 |
| Time or maturity progression | GP13 |
| Feedback loop or flywheel | GP14 |
| Nested levels or system stack | GP15 |
| Multiple entities around a core | GP16 |
| Four-to-six business metrics | GP17 |
| Ranked comparable values | GP18 |
| Two-dimensional mapping | GP19 |
| One real screenshot as hero evidence | GP20 |

## 5. Image slots

| Layout | Slot |
| --- | --- |
| GP05 | 16:10 or 4:3 |
| GP09 | 16:9 or 3:2 |
| GP12 | one consistent 16:10, 3:2, or 1:1 group |
| GP20 | 16:10 preferred; use `contain` for UI |

Keep important subjects away from rounded crop corners. Use `contain` for interfaces, documents, diagrams, and charts whose labels must remain visible.
