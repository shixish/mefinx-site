This is an EmDash site -- a CMS built on Astro with a full admin UI.

## Commands

```bash
pnpm dev              # Start the Astro dev server
npx emdash types      # Regenerate TypeScript types from a running site
```

The admin UI is at `http://localhost:4321/_emdash/admin`.

## Key Files

| File                     | Purpose                                                                            |
| ------------------------ | ---------------------------------------------------------------------------------- |
| `astro.config.mjs`       | Astro config with `emdash()` integration, database, and storage                    |
| `src/live.config.ts`     | EmDash loader registration (boilerplate -- don't modify)                           |
| `seed/seed.json`         | Schema definition + demo content (collections, fields, taxonomies, menus, widgets) |
| `emdash-env.d.ts`        | Generated types for collections (auto-regenerated on dev server start)             |
| `src/layouts/Base.astro` | Base layout with EmDash wiring (menus, search, page contributions)                 |
| `src/pages/`             | Astro pages -- all server-rendered                                                 |

## Skills

Agent skills are in `.agents/skills/`. Load them when working on specific tasks:

- **building-emdash-site** -- Querying content, rendering Portable Text, schema design, seed files, site features (menus, widgets, search, SEO, comments, bylines). Start here.
- **creating-plugins** -- Building EmDash plugins with hooks, storage, admin UI, API routes, and Portable Text block types.
- **emdash-cli** -- CLI commands for content management, seeding, type generation, and visual editing flow.

## Documentation

The EmDash docs are available as an MCP server at `https://docs.emdashcms.com/mcp`. When you need to verify an API, hook, config option, field type, or pattern, call `search_docs` against the live documentation rather than relying on training-data recall. The docs reflect current behaviour; assumptions may not.

This template ships with `.mcp.json`, `.cursor/mcp.json`, and `.vscode/mcp.json` so Claude Code, Cursor, and VS Code auto-discover the docs server. Other tools (OpenCode, Windsurf, etc.) need a manual one-time setup -- see [docs.emdashcms.com/docs-mcp](https://docs.emdashcms.com/docs-mcp).

## Rules

- All content pages must be server-rendered (`output: "server"`). No `getStaticPaths()` for CMS content.
- Image fields are objects (`{ src, alt }`), not strings. Use `<Image image={...} />` from `"emdash/ui"`.
- `entry.id` is the slug (for URLs). `entry.data.id` is the database ULID (for API calls like `getEntryTerms`).
- When Astro's cache is enabled, pass content-query hints to `Astro.cache.set(cacheHint)`. Use the `WithCacheHint` variants for site settings, menus, taxonomies, and widget areas rendered by cached routes.
- Taxonomy names in queries must match the seed's `"name"` field exactly (e.g., `"category"` not `"categories"`).

## This Site

The marketing site for **mefinx**, the personal CRM at https://mefinx.app, served at **mefinx.com**.
It started from EmDash's `marketing-cloudflare` template and keeps its hero, features and FAQ
blocks. Pricing, testimonials and the contact page were removed because mefinx has none of those;
don't add invented quotes or plans.

- `marketing_conversation` is this site's own block: a short chat exchange (speaker `you` or
  `mefinx`) that shows how talking to the app works. Schema in `seed/seed.json`, component in
  `src/components/blocks/Conversation.astro`.
- Feature icons are named in the seed's `icon` select and mapped to Phosphor icons in
  `src/components/blocks/Features.astro`. A new icon must also go in the `include` list in
  `astro.config.mjs`, or it won't ship.
- The site is dark-only, like the app: there is no theme switch, and `theme.css` pins
  `color-scheme: dark`. Sections fade in through `data-reveal` (observer in `Base.astro`).
- Brand tokens live in `src/styles/theme.css` and mirror the app's `styles.css`: the logo's cyan,
  magenta and amber, and the graph's colours for people (blue), places (amber) and events (green).
  `public/logo.svg` and the icons are copied from the app repo's `public/`.
- Claims about the app should be checkable against the app repo (its README and `/privacy` page).
