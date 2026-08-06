# GoPomelo PPT Style

A reusable presentation-design skill for creating GoPomelo-branded PowerPoint decks, Google Slides-ready presentations, and horizontal HTML decks.

The system combines clean B2B layouts with GoPomelo's visual identity:

- Pink as the primary brand accent, used with restraint
- Coral, orange, and gold for selected gradient moments
- Light, dark, and warm presentation states
- Consistent typography, card treatments, spacing, and logo placement
- Editable PPTX output and browser-based HTML presentation output

## Install

### Any supported AI coding tool

Install globally with the Skills CLI:

```bash
npx skills add weallloveella/gopomelo-ppt-style \
  --skill gopomelo-ppt-style \
  -g
```

Install for selected tools:

```bash
npx skills add weallloveella/gopomelo-ppt-style \
  --skill gopomelo-ppt-style \
  -g \
  -a codex -a claude-code -a cursor \
  -y
```

### Codex

Ask Codex:

```text
$skill-installer install from
https://github.com/weallloveella/gopomelo-ppt-style/tree/main/gopomelo-ppt-style
```

Or run the bundled installer directly:

```bash
python ~/.codex/skills/.system/skill-installer/scripts/install-skill-from-github.py \
  --repo weallloveella/gopomelo-ppt-style \
  --path gopomelo-ppt-style
```

The skill becomes available on the next Codex turn after installation.

## Use

Invoke the skill explicitly when requesting a deck:

```text
$gopomelo-ppt-style Create a 12-slide quarterly business review as editable PPTX.
```

```text
$gopomelo-ppt-style Turn this content into a horizontal HTML presentation.
```

## Repository layout

```text
gopomelo-ppt-style/
  SKILL.md
  agents/
  assets/
  references/
  scripts/
```

The sample PPTX and montage are included under `gopomelo-ppt-style/assets/pptx/`.
