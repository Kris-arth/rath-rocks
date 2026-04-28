# RATH Translations — Source Handoff

This folder contains the **finished, approved** source for the RATH Translations website.

## Files

- `index.html` — the complete site. Single file. All CSS and JS inline. No build step. No dependencies except Google Fonts (loaded via `<link>` from `fonts.googleapis.com`).

## How to deploy

1. Upload `index.html` to any static host (Netlify Drop, Cloudflare Pages, GitHub Pages, Vercel, plain S3 + CloudFront, or any web server).
2. Done. Nothing to build.

If you need a single-file offline version (fonts inlined, no network calls), use the bundled `RATH Translations (offline).html` shipped separately.

---

## Instructions for Claude Code (or any AI assistant)

**READ THIS BEFORE TOUCHING THE FILE.**

This file is the **source of truth**. It is finished. It has been designed and approved.

### Rules

1. **Do NOT redesign.** Do not change the typography, color palette, spacing, layout, copy, or animations. Do not "improve" the aesthetic. Do not swap fonts. Do not add sections. Do not remove sections.
2. **Do NOT regenerate.** Do not rebuild this site from a description of what it should look like. Use the existing `index.html` as-is.
3. **Do NOT introduce a build system.** No React, no Vite, no Tailwind, no PostCSS, no bundler. The file is a single self-contained `.html` document and must remain that way unless the user explicitly asks otherwise.
4. **Do NOT add libraries.** No GSAP, no Framer Motion, no Lenis, no jQuery, no analytics. The cursor, parallax, scroll reveals, and form handling are already implemented in vanilla JS inside the file.
5. **Only make changes the user explicitly requests.** If the user asks for a copy tweak, change only that copy. If the user asks for a color tweak, change only that variable. Do not touch anything else.

### Design system (locked — do not change without explicit instruction)

- **Background:** `#080808` (CSS variable `--bg`)
- **Foreground text:** `#ECE7DF` (`--fg`)
- **Dim text:** `#8A8580` (`--fg-dim`)
- **Faint text / hairlines:** `#4A4843` (`--fg-faint`)
- **Single accent (gold):** `#C9A96A` (`--gold`)
- **Display font:** Cormorant Garamond, weight 300 (and italic 300/400)
- **Label / body font:** Montserrat, weight 300/400
- **No other colors. No other fonts. No gradients. No shadows. No borders around content blocks. No cards.**

### Structure (locked)

In order, the page contains:

1. Fixed nav — `RATH` wordmark left, "Est. Budapest — Warsaw" right
2. Hero — the giant "RATH" wordmark, the gold hairline that animates in once on load, the italic tagline "a quiet study in language", and a bottom caption "RATH ROCKS · Hungarian · Polish · English"
3. Statement — single italic paragraph about the HU↔PL direct pair USP
4. Three Pairs — Magyar↔Polski, Magyar↔English, Polski↔English, set typographically (no boxes, no borders)
5. Selected Disciplines — four typographic lines with roman-numeral gold markers
6. Enquire — contact form (Name, Email, Language Pair dropdown, Message, Send) that submits via `mailto:rath.rocks@proton.me`
7. Get in Touch — gold underlined email link `rath.rocks@proton.me` at display scale, with city meta below
8. Footer — `© MMXXVI — RATH ROCKS` and `Discretion Assured`

### Effects (locked)

- Magnetic cursor (gold ring + dot, expands on hoverable elements, mix-blend-difference on nav)
- Parallax drift on the RATH wordmark (mouse + scroll)
- Word- and character-level reveals on scroll
- One gold hairline animates in once on load **only in the hero** — nowhere else on the page

### Allowed changes (without asking)

- Fixing typos in copy that the user points out
- Adjusting the email destination if the user provides a new one
- Updating the year in the footer

### Changes requiring user confirmation

- Anything else.

---

## Contact form note

The form opens the user's mail client via `mailto:rath.rocks@proton.me` with subject and body prefilled. If the user wants real server-side email delivery (Formspree, Resend, a custom endpoint), that's an explicit feature request — implement only when asked, and only the smallest possible change.
