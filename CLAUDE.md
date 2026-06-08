# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server
- `npm run build` — type-check (`tsc -b`) then build to `dist/`
- `npm run lint` — run ESLint over the repo
- `npm run preview` — serve the production build locally
- `npm run deploy` — build and publish `dist/` to GitHub Pages via `gh-pages` (site: https://marianfigula.com)

There is no test runner configured.

## Architecture

Single-page personal portfolio built with **React 19 + TypeScript + Vite + Tailwind CSS v4**. There is no router despite `react-router-dom` being a dependency — `App.tsx` renders one long page composed of section components (`Hero`, `About`, `Skills`, `Projects`, `Contact`) between a `Header` and `Footer`. Navigation is anchor-based scrolling to section `id`s.

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
