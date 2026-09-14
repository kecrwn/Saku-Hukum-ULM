# Saku Hukum ULM - Design System (River Margin)

This document serves as the standing reference for the visual design system of the Saku Hukum ULM project. Every future page or component built or edited must adhere strictly to these rules.

## Core Identity
**River Margin**: A warm, editorial law-study guide aesthetic mimicking physical case files. 
Do not use a dark mode toggle or arbitrary standard Tailwind colors. Stick exclusively to this palette.

## Colors
Defined in `src/index.css`.

- **Background (Paper)**
  - `--paper`: `#f7f2e9` (Warm cream / off-white, primary page background)
  - `--paper-strong`: `#efe5d6` (Slightly darker cream for bands/highlights)
  - `--card`: `#fffdfa` (Bright off-white for elevated cards)

- **Text (Ink)**
  - `--ink`: `#173e44` (Deep teal-navy, standard text)
  - `--ink-deep`: `#102d33` (Darker teal-navy, bold headings)
  - `--muted`: `#66736f` (Muted teal-gray, secondary text)

- **Accents**
  - `--clay`: `#b24d39` (Terracotta / rust accent. Used for labels, active links, and accent italic words in headings)
  - `--reed`: `#71826e` (Sage-green. Used primarily for icons)

- **Structural**
  - `--line`: `rgba(23,62,68,.17)` (Used for thin horizontal divider lines separating stacked sections and list items)
  - `--shadow`: `0 18px 44px rgba(30,48,43,.09)` (Soft drop shadow for elevated elements)

## Typography

- **Serif (Headlines)**: `DM Serif Display`, Georgia, serif
  - Used for large feature headlines (`h1`, `h2`, `h3`).
  - *Italic Accent*: Occasionally, a specific word in a headline is italicized and colored with `--clay` (e.g., `<em>`).

- **Sans-Serif (Body & UI)**: `Manrope`, Arial, sans-serif
  - Used for body copy, UI chrome, navigation, buttons, and tiny labels (eyebrows).

## Component Patterns

### Numbered List Cards ("Peta Saku")
This pattern is used for sequential grids or steps (e.g., career steps, route cards).
A list card is composed of the following, strictly arranged:
1. **Number Badge**: Top-left corner, uses `--clay` color, tiny bold font.
2. **Icon**: Uses `--reed` (sage-green).
3. **Title**: Serif typeface (`--serif`), slightly elevated font size.
4. **Description**: Sans-serif, small, uses `--muted` color.
5. **Trailing Arrow Icon**: Positioned at the bottom-right, uses `--clay` or `--reed` depending on context.
6. **Divider/Border**: Right border on desktop, bottom border on mobile (`border-line`).

### Section Dividers
Sections are separated by a 1px solid line using `var(--line)`. Often, decorative "river rules" (custom SVG wavy underlines) are used for primary navigation and major section breaks.

### Layout & Spacing
- Maximum content width is capped (e.g., `1180px`).
- Padding and margins are generous, utilizing CSS grid for strict column alignments.
- Mobile breakpoints (`max-width: 800px`, `520px`) stack elements vertically into single columns and rely on bottom borders instead of right borders for separation.

## Rules for Future Work
1. **Always match the palette**: Never introduce arbitrary hex codes or default Tailwind colors like `text-blue-500` or `bg-gray-100`.
2. **Typography**: Stick to the Serif/Sans dichotomy.
3. **No Dark Mode**: The warm paper aesthetic is the canonical design. Do not force inverted colors.
4. **Text Contrast**: Any text overlaying a photo must have sufficient contrast, utilizing a subtle dark gradient/scrim (`linear-gradient(transparent, rgba(0,0,0,0.76))`) behind the text if necessary.
