---
name: ultrawinning-design
description: Use this skill to generate well-branded interfaces and assets for Ultrawinning (Emil Hodzovic's personal site and content brand), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, social content), copy assets out and create static HTML files for the user to view. Pull `colors_and_type.css` + `fonts.css` into your output; reference the SVGs in `assets/` directly.

If working on production code, read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Non-negotiable rules
- Pink `#ff1a8c` is the ONLY accent color. Never a background, never a gradient.
- Sharp corners only. `border-radius: 0` everywhere.
- No drop shadows. No gradients (except the single ambient radial pink glow).
- Dark mode is the default. Light is opt-in.
- Article prose uses Verdana. UI + wordmark (logo / ghost / footer / any `ultrawinning.com` reference) use Rajdhani. Terminal chrome (`System:`, `// comment`, slide counters, date slugs) uses Share Tech Mono.
- Never emit stock photos, decorative illustrations, or rounded cards.
- Every ULTRAWINNING instance gets a blinking pink `_` cursor after it.
- Voice: direct, first-person, plainspoken. Ban "leverage", "unlock", "seamless", "delve", "Here's the thing".

## Reference files
- `README.md` — full brand, content & visual foundations
- `colors_and_type.css` — tokens
- `preview/` — example cards for every component cluster
- `ui_kits/ultrawinning-web/` — working React recreation of the site
- `social/` — IG story / post / carousel / pull-quote templates
