# Saku Hukum ULM — Design Direction

## Three Design Approaches

### 1. River Margin
**Very Brief Intro:** A warm editorial study companion informed by Banjarmasin’s river culture, legal notebooks, and library marginalia. It feels careful, personal, and quietly scholarly rather than institutional.
**Probability:** 0.07

### 2. Courtroom Archive
**Very Brief Intro:** A restrained archival system of deep ink, filed-paper ivory, redacted bars, and docket labels. It conveys the discipline and evidentiary rigor of criminal law study.
**Probability:** 0.04

### 3. Campus Field Notes
**Very Brief Intro:** A bright field-guide aesthetic with botanical accents, annotated maps, and practical tabs. It makes campus information feel discoverable and usable on a phone.
**Probability:** 0.09

## Chosen Approach: River Margin

### Design Movement
**Contemporary Indonesian editorial design** meets the physical language of a well-used legal notebook. The interface will use deliberate hierarchy, soft paper texture, evidence-like annotations, and a loose river-current motif rather than a corporate dashboard structure.

### Core Principles
1. **Study-ready clarity:** Dense information is eased by strong headings, readable line lengths, useful labels, and predictable paths back home.
2. **Personal rather than official:** The design respects the university context while remaining visibly a carefully assembled independent study companion.
3. **Editorial asymmetry:** Pages lead with a content column, a narrower marginal reference rail, and occasional angled section breaks rather than conventional centered cards.
4. **Tactile restraint:** Paper, ink, and stamped-label cues create warmth without becoming decorative clutter.

### Color Philosophy
The foundation is a warm paper ivory that reduces the sterile feeling of pure white and supports long reading sessions. A deep **Martapura Ink** blue-green acts as the intellectual anchor, referencing river water in shadow and formal legal writing. Clay red is reserved for important directional moments, while reed green marks study progress and supporting metadata. Contrast stays high, with near-black ink for reading and no text placed directly over variable imagery without a contrast layer.

### Layout Paradigm
The site behaves like a curated case file. A compact top bar carries the wordmark and utility actions, while desktop pages use a flexible **document column plus marginalia rail**; mobile collapses this into stacked sections and a focused navigation drawer. Page transitions and section breaks follow a slow horizontal river-line rather than a rigid dashboard grid.

### Signature Elements
- **River rule:** A thin, gently flowing horizontal line used as a divider, progress marker, and selected-navigation indicator.
- **Marginalia tags:** Small all-caps category labels and source badges that sit at the edge of cards and articles.
- **Case-file tabs:** Offset navigation markers and study cards with subtle clipped-corner details, never repeated as generic rounded rectangles.

### Interaction Philosophy
Interaction should feel like turning to a marked page in a study book. Navigation opens quickly and clearly, source links make their external destination explicit, cards rise by a few pixels on hover, and the language choice persists across routes. The shULM logo always returns the reader home.

### Animation
Use short 140–240ms transitions with a crisp ease-out. On first view, content blocks may lift from `translateY(8px)` while fading in, with a 40–60ms stagger; dividers draw or shift subtly only when visible. Button presses compress to `scale(0.97)`. Motion is disabled or reduced for `prefers-reduced-motion` users, and no essential navigation relies on animation.

### Typography System
**DM Serif Display** is reserved for display headings and key quotations, bringing a bookish legal-library character. **Manrope** handles navigation, body content, facts, data labels, and the shULM wordmark, with calibrated weight contrast. Headings are left-aligned, editorial, and spacious; body text stays generous but disciplined for long reading. Inter is not used.

### Brand Essence
**Saku Hukum ULM is a bilingual, source-aware pocket guide for Law Faculty students mapping their way through ULM and the prosecutor-track study journey.**

Personality: **attentive, grounded, scholarly**.

### Brand Voice
Headlines are concise, specific, and navigational; CTAs help the student locate evidence, context, or the next study step. Microcopy is supportive, never promotional or institutional.

> “Mulai dari mata kuliah, lanjutkan dengan arah karier.”

> “Buka sumber resmi sebelum mencatatnya sebagai rujukan.”

### Wordmark & Logo
The header wordmark is always **shULM**, rendered as one uninterrupted mark. The **sh** remains lowercase in Manrope at a lighter weight and slightly muted Martapura Ink; **ULM** is uppercase, heavier, and near-black, forming the visual anchor. The full name **Saku Hukum ULM** does not appear in the header.

The supporting icon is an abstract, bold bookmark shaped by a single continuous folded river line. It contains **no lettering**, works on a transparent background, and becomes the simplified favicon. The wordmark remains the primary header logo on every route.

### Signature Brand Color
**Martapura Ink — #173E44.**

## Style Decisions

- Header wordmark: use only **shULM**, with `sh` lighter/more muted and `ULM` heavier; both remain in the same font family.
- The wordmark must be a homepage link on every page.
- The full title, **Saku Hukum ULM**, belongs in page metadata, footer, and the About page—not in the header.
- The favicon uses the no-text folded-river bookmark symbol.
- UI copy defaults to Bahasa Indonesia, with a complete persistent English alternative.
- Index pages interrupt a uniform card catalogue with a visible marginal rail, offset annotations, and irregular editorial groupings.
- The river rule is a continuous visual family for dividers, selection, progress, and group transitions—not an ordinary straight underline.
- Source cards are clipped case-file notes with platform-color tabs and docket-like edge labels, layered with restrained paper texture.
- River Margin’s flowing current appears consistently in active navigation, page dividers, source-link underlines, and public-process connectors; straight rules are reserved only for structural reading aids.
- Information grids use offset case-file cards, marginal labels, or a dominant evidence panel so that a layout never reads as a generic even catalogue.
- Documentary campus/facility references take priority; editorial imagery must carry a specific Banjarmasin, notebook, source-document, or practice-file cue.
