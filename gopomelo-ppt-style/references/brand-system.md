# GoPomelo presentation brand system

## Contents

1. Design character
2. Color tokens
3. Page states
4. Logo placement
5. Typography
6. Grid and spacing
7. Cards and surfaces
8. Management data language
9. Brand motifs
10. Prohibited patterns

## 1. Design character

Translate the GoPomelo landing page into presentation scale:

- Premium, spacious, expressive, confident, and practical.
- Large confident titles with short line lengths.
- Apple-style typography, clean grids, and generous margins.
- Branded warm-gradient openings, white and near-black content canvases, localized color fields, translucent pale cards, and large rounded corners.
- Images as evidence, not decoration pasted into a card library.

Avoid generic corporate templates, neon cyber aesthetics, developer dashboards, or dense component-library pages.

## 2. Color tokens

Use these tokens as the default palette:

| Token | Value | Role |
| --- | --- | --- |
| `pink` | `#ED2E7B` | Primary GoPomelo brand identifier |
| `pink-bright` | `#F83F8F` | Bright accent and optional highlight |
| `pink-deep` | `#C91866` | Pink text on light backgrounds |
| `coral` | `#F45138` | Bridge between pink and orange |
| `orange` | `#FF6A00` | Gradient energy and transition color |
| `gold` | `#FFB900` | Warm focal light inside gradients |
| `ink` | `#141414` | Main dark surface from the current website language |
| `ink-soft` | `#2A2A2A` | Secondary dark surface |
| `ink-muted` | `#4E4E4E` | Secondary dark text |
| `muted` | `#6E6E73` | Body and supporting copy |
| `paper` | `#FFFFFF` | Main light canvas |
| `paper-2` | `#F4F4F4` | Soft website-style card and section tint |
| `paper-3` | `#EBEBEB` | Deeper neutral card surface |
| `white` | `#FFFFFF` | Clean surface and reverse text |
| `line` | `rgba(20,20,20,.10)` | Hairline border on light pages |

Default warm gradient, inspired by the current GoPomelo homepage hero:

```css
radial-gradient(70% 110% at 84% 22%, rgba(255,185,0,.98) 0%, rgba(255,185,0,0) 55%),
radial-gradient(66% 96% at 48% 88%, rgba(237,46,123,.98) 0%, rgba(237,46,123,0) 68%),
linear-gradient(118deg, #FF6A00 0%, #F45138 48%, #ED2E7B 100%)
```

Default dark wash:

```css
radial-gradient(circle at 90% 8%, rgba(237,46,123,.18), transparent 25%),
#141414
```

Color hierarchy:

- Pink is the first brand-recognition signal even when it occupies a small area.
- On light and dark content pages, use pink through small accents or one localized pink-led gradient field rather than a flat full-slide fill.
- Orange and coral carry motion through the warm gradient; gold provides one concentrated focal light.
- White and near-black still carry most information-heavy pages, echoing the website's white sections, gray cards, and black evidence blocks.
- In a 10-page deck, two full warm pages are normally enough: the cover and one major transition.

Do not use the BytePlus landing-page blues `#2354FF`, `#0B2CC4`, `#00C7D8`, or blue-derived navy surfaces as GoPomelo defaults.

## 3. Page states

### `warm`

Use for the cover, one major act divider, or a high-energy statement.

- Use the pink–orange–gold layered gradient rather than a flat orange fill.
- Use white text at 86–100% opacity for every title, paragraph, caption, label, and number placed directly on the gradient. Gray, `muted`, `ink-muted`, and dark text are prohibited on the open gradient field.
- Dark text is allowed only inside a clearly light card or panel that provides its own contrast.
- Use the white GoPomelo logo directly on the gradient. Never add a white pill, card, or backdrop behind it.
- Keep content sparse.
- In an 8–12 page deck, use this state once or twice by default.

### `light`

Use for most explanation, comparison, process, data, and image-led pages.

- Use `paper` or white as the canvas.
- Prefer a clean white field with `paper-2` cards. Add one localized pink-led gradient panel or cropped halo when the page needs stronger brand presence.
- Use translucent or pale cards only when grouping materially improves comprehension.
- Prefer flat text-and-image composition over filling every gap with a card.

### `dark`

Use as a visual reset for evidence, workflow, case study, and high-contrast data.

- Use near-black or warm charcoal, never blue-black.
- Use white primary text and warm gray secondary text.
- Use pink labels, rules, or one localized pink–orange gradient evidence panel.
- Use dark cards only when the page needs explicit grouping.

### Cover and closing defaults

- Default cover: `warm`, using the layered pink–orange–gold gradient, white typography, and the white logo directly on the field.
- Alternate cover: `light` or `dark`, with one localized pink-led gradient element.
- Do not place the cover logo inside a white frame.
- Default closing: `light` or `dark`; use one clear action and the approved gradient pomelo-slice motif as the dominant brand accent.
- Keep the closing motif square at source: a 1:1 HTML wrapper with `object-fit: contain`, or a proportional crop of a conceptual square in PPTX.
- Scale the motif to about 44% of slide width, anchor it beyond the right and bottom edges, and reveal roughly 65–75% of its diameter. The cropped mark should feel as though it is emerging from the bottom-right corner.
- Do not rotate, squash, or center the closing motif. Keep the left two-thirds of the page available for the resolved message and CTA.

## 4. Logo placement

Use one of three explicit treatments per page:

- `special`: cover, act divider, and resolved closing only. Place the logo where it supports that composition.
- `top-right`: default for normal content slides. Place the logo at the top-right of the safe frame, about 142px wide in a 1280×720 HTML deck.
- `omit`: use only when the top-right reserve is occupied by primary content, media, a chart, or a data panel. Do not compress, shift, or reduce content merely to force the logo into the page.

Treat the top-right 182×72px area inside the safe frame as the logo reserve. If meaningful content enters that area or the logo would visually crowd the title, use `omit`. The Marketing Review data-hero pattern with a top-aligned right column is a valid omission case. Keep the footer brand marker when the layout already uses standard page chrome.

## 5. Typography

Use the landing-page font stack exactly:

```css
-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text",
"Helvetica Neue", Helvetica, Arial, sans-serif
```

For HTML, preserve the stack above exactly. For PPTX and Google Slides-targeted output:

- Use `Arial` for titles, body, and captions.
- Use bold and size hierarchy to preserve the landing-page character.
- Treat Arial as the cross-platform member of the landing-page stack, not as a new brand font.
- Do not use SF Pro or Helvetica Neue in PPTX unless the deck is Mac-only and a full render/import test confirms the intended weight.
- Do not add Product Sans in the first version.

Recommended 1280×720 scale:

| Role | HTML | PPTX |
| --- | --- | --- |
| Cover title | 76–96px | 68–82px |
| Section title | 56–72px | 52–64px |
| Slide title | 42–56px | 40–50px |
| Mid-level heading | 24–32px | 24–30px |
| Body | 18–22px | 18–22px |
| Caption/meta | 13–16px | 14–16px |

Use line-height `0.92–1.02` for display titles and `1.35–1.5` for body copy. Use modest negative tracking on Latin headings only. If a title wraps badly, shorten it before shrinking it.

## 6. Grid and spacing

- Canvas: 1280×720, 16:9.
- Default safe frame: 72px left/right, 56–64px top, 52–64px bottom.
- Use a 12-column mental grid with 20–28px gutters.
- Keep equal left and right outer margins unless an image intentionally bleeds.
- Reserve the bottom 42px for page chrome in HTML.
- Do not push images, captions, or footnotes into the navigation safe zone.

## 7. Cards and surfaces

- Primary radius: 28–34px.
- Small nested radius: 16–20px.
- Light glass: white at 72–88% opacity, 1px pale border, subtle warm shadow.
- PPTX glass simulation: opaque `#FFFDFC` or `#FFF6F1`, 1px border, minimal shadow.
- Do not combine a heavy border, strong shadow, and strong gradient on one card.
- Use pills for short metadata only; never turn paragraphs into pill collections.
- Left-align values and labels in dense metric cards. If a card contains five or more measures, use a balanced two- or three-row grid.
- Keep peer cards aligned internally; a centered middle card inside an otherwise left-aligned comparison row is an error unless it is intentionally dominant.

## 8. Management data language

- Use plain business terms before technical terms. Define unfamiliar measures in a subtitle, source line, or speaker note at first use.
- Label opportunity amount as opportunity or pipeline value, not revenue, forecast, or business won.
- Call `opportunity value ÷ recorded spend` a value-to-cost multiple or pipeline-efficiency indicator, not ROI.
- When a rate can exceed 100%, state the denominator and explain why before management has to ask.
- Treat visual clarity as data integrity: separate overlapping bubbles or labels without changing the underlying scale or category values.

## 9. Brand motifs

Use these motifs sparingly:

- The approved GoPomelo favicon/pomelo-slice mark from `assets/brand/gopomelo-icon-gradient.svg`, using the pink–coral–orange–gold gradient.
- A localized pink-led gradient card, halo, or cropped field.
- Thin gradient rule.
- Small glowing dot for eyebrow labels.
- White glass labels on imagery.

For the GP10 closing motif:

- Use only `gopomelo-icon-gradient.svg` or the same approved path embedded inline.
- Preserve the SVG's square viewBox and circular outer silhouette with a 1:1 rendered box.
- On a 1280×720 canvas, start near 560px square, position around `right:-180px; bottom:-205px`, and adjust only enough to protect the message. Use the same proportional placement at other sizes.
- Let the slide itself clip the overflow. Do not crop the source SVG into a new distorted asset.
- Use subdued opacity and a restrained warm shadow so the mark supports rather than competes with the closing copy.

Do not invent unrelated waves, cloud icons, circuit traces, or arbitrary blobs.

## 10. Prohibited patterns

- Unexplained blue/cyan accent systems.
- Blue-black backgrounds or blue-tinted shadows.
- Repeating flat full-slide pink fields.
- More than two full warm-gradient pages in a standard 8–12 page deck without a narrative reason.
- White logo pills or logo cards on a warm gradient.
- Gray or dark supporting copy placed directly on a warm gradient.
- Forcing a top-right logo into a page whose primary content already occupies the logo reserve.
- Three consecutive pages with the same state.
- More than one large gradient object on a light content page.
- Tiny body copy used to force content into a layout.
- Repeated 3–4 card grids on every page.
- Generic “Thank you” ending without a resolved action or implication.
- Stretched, oval, centered, or fully exposed closing motifs.
- Chart bubbles, labels, legends, or annotations that overlap enough to hide a name or key value.
