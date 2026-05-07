# Social templates — quick-fill

Two blank, branded templates. Edit them directly, save under a new name, screenshot to publish.

## Files
- `story-template.html` — 1080 × 1920 (IG / FB story, TikTok cover)
- `post-template.html` — 1080 × 1080 (IG feed, LinkedIn square)

## What to edit
Both templates have HTML comments marking each editable field. Pattern is identical:

| Slot | Where | What goes there |
|---|---|---|
| **Eyebrow** | `<div class="eyebrow">` | `// new essay` · `// note` · `// shipped` · `// pinned`. Keep it short, lowercase, lead with `//`. |
| **Headline / Title** | `<h1 class="quote">` (story) or `<h1 class="title">` (post) | The hook. 6–14 words for stories, 4–10 for posts. |
| **Body** *(post only)* | `<div class="body">` | One supporting sentence in Verdana. Delete the div if not needed. |
| **Tag** *(story only)* | `<span class="tag">` | Date or context — `// 04 · 2026`, `// part 02`, `// 5 min read`. |
| **Page counter** *(post only)* | `<span class="page">` | `01 / 01` for standalone, `01 / 06` etc. for carousel sequences. |

## Pink emphasis
Wrap any word(s) in `<em>...</em>` to render them pink. Use sparingly — one phrase per slide max. The pink is the only accent color; overusing it kills the rhythm.

## Don't touch
- The ghost `ULTRAWINNING_` watermark
- The pink rule (the 2px bar)
- The `ultrawinning.com_` URL slug

These are brand chrome and should stay consistent across every post.

## Export
Open in browser, screenshot the frame at native 1080px scale (zoom to 100%, capture the `.frame` div). Or print-to-PDF and crop. Both fit any viewport — you'll see them letterboxed during editing; the frame itself is always exactly 1080 × {1920 or 1080}.
