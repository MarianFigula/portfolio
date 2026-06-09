# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server
- `npm run build` — type-check (`tsc -b`) then build to `dist/`. This is a **multi-page build**: `vite.config.ts` declares two Rollup inputs — `index.html` (the portfolio) and `weby/index.html` (the `/weby` landing page).
- `npm run lint` — run ESLint over the repo
- `npm run preview` — serve the production build locally
- `npm run deploy` — build and publish `dist/` to GitHub Pages via `gh-pages` (site: https://marianfigula.com)

There is no test runner configured.

## Architecture

**React 19 + TypeScript + Vite + Tailwind CSS v4**. There is no client-side router despite `react-router-dom` being a dependency — instead there are **two independent single-page apps**, each its own Vite entry, mounted into separate HTML files. Navigation within a page is anchor-based scrolling to section `id`s.

- **Portfolio** — `index.html` → `src/main.tsx` → `App.tsx`. One long page: `Hero`, `About`, `Skills`, `Projects`, `Contact` between a `Header` and `Footer`.
- **`/weby` landing page** — `weby/index.html` → `src/weby/main.tsx` → `src/weby/WebyApp.tsx`. A Slovak-first marketing page for web-design clients: `WebyHeader`, `WebyHero`, `WebyProblem`, `WhatYouGet`, `Showcase`, `Reviews`, `Process`, plus the **shared** `Contact` and `Footer` from `src/components/`. Its components live in `src/weby/components/`.

The two apps never load together (separate documents), but they share a lot: see *Shared components* below. `weby/index.html` carries its own SEO/structured-data `<head>` (ProfessionalService schema, OG tags, gtag).

### Shared components (`src/components/shared/`)
Both apps render the same building blocks, parameterized rather than duplicated:
- `Header.tsx` — sticky header (transparent over hero, frosted on scroll, mobile burger). Takes `logo`, `links`, and a `rightSlot` (language selector for the portfolio, back-link for weby). The portfolio's `src/components/Header.tsx` and weby's `WebyHeader.tsx` are thin wrappers that supply those props.
- `ContactForm.tsx` — the EmailJS form (see *Contact form*).
- `ProjectNumber.tsx`, `SplitRow.tsx` — presentational helpers.
- `useScrollReveal` (`src/lib/hooks/useScrollReveal.ts`) — IntersectionObserver hook returning `{ ref, visible }` to drive scroll-in entrance transitions; used by both apps.

### Internationalization (the core cross-cutting concern)
All user-facing text flows through **i18next / react-i18next**. Components contain no hard-coded copy — they call `t('some.key')`, and the strings live in `src/translations/en.json` and `src/translations/sk.json`. When adding or changing any visible text, update **both** JSON files with matching key paths.

- `src/lib/language/i18n.ts` initializes i18next, persists the active language to `localStorage` under the key `language`, and seeds from it on load. Imported for its side effect in `main.tsx`.
- `src/lib/language/languages.ts` is the single source of truth for supported languages (`en`, `sk`); `DEFAULT_LANGUAGE` is `en`.
- `LanguageProvider` (`src/lib/language/LanguageProvider/`) wraps the app and exposes `currentLanguage` / `changeLanguage` via context; consume it with the `useLanguage` hook. The provider derives state from i18next, so it stays in sync.

Note: structured data like the projects list lives **inside components** as hooks (e.g. `useRealWorldProjects`, `usePersonalProjects` in `Projects.tsx`) that call `t()` per field. Translatable copy goes in the JSON files; non-translatable data (image paths, URLs, tag arrays, `isGithubLink`) stays inline in those hooks. The `Project` shape is in `src/lib/definitions.ts`.

### Styling
Tailwind v4 is configured via the Vite plugin (`@tailwindcss/vite`) — there is no `tailwind.config.js`. The design system lives entirely in `src/index.css`:
- `@theme` block defines the color tokens (`--color-primary`, `--color-card`, etc.) that map to Tailwind utility classes like `bg-primary`, `text-muted-foreground`.
- Custom component classes (`.btn-primary`, `.btn-outline`) and animations (`.animate-fade-up`, `.animate-fade-in`, `.animate-slide-in` with their `@keyframes`) are hand-written CSS, not Tailwind plugins.
- The theme is a fixed dark "deep ocean blue" palette — there is no light mode toggle.

Use the `cn()` helper from `src/lib/utils.ts` (clsx + tailwind-merge) when conditionally composing class names.

### Contact form
`Contact.tsx` submits directly to **EmailJS** from the browser via `emailjs.sendForm`. The service/template/public-key IDs are hard-coded in the component, and form `name` attributes (`from_name`, `from_email`, `message`) must match the EmailJS template fields.

## Conventions

- `src/components/` holds page sections; `src/lib/` holds non-UI logic (i18n, language context, helpers, type definitions).
- TypeScript path is relative imports with explicit `.tsx`/`.ts` extensions in places — there are no path aliases configured.
- `LanguageCode` / `LanguageLabel` use the `const object + derived type` pattern rather than `enum`.
