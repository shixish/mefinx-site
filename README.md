# mefinx.com

The marketing site for [mefinx](https://mefinx.app), the personal CRM you talk to. Built with
[EmDash](https://emdashcms.com) (an Astro CMS) and deployed to Cloudflare Workers, with D1 for
content and R2 for media. Page copy is edited in the EmDash admin at `/_emdash/admin`, not in code.

## Local development

Needs Node 22.16 or later and pnpm.

```sh
pnpm install
pnpm dev          # http://localhost:4321
```

The first request creates a local D1 database. Open
http://localhost:4321/_emdash/api/setup/dev-bypass?redirect=/_emdash/admin to finish setup as a dev
admin; setup applies `seed/seed.json`, which holds the schema and all the launch copy.

```sh
pnpm build        # production build
pnpm typecheck    # astro check
```

## What's on the page

| Section            | Block                    | Anchor      |
| ------------------ | ------------------------ | ----------- |
| Hero               | `marketing_hero`         |             |
| Chat demo          | `marketing_conversation` | `#how`      |
| Feature grid       | `marketing_features`     | `#features` |
| FAQ                | `marketing_faq`          | `#faq`      |
| Closing call to go | `marketing_hero`         | `#start`    |

Every call to action points at https://mefinx.app. Privacy and Terms link to the app's own pages.

## Deploying to mefinx.com

Every push to `main` deploys. `.github/workflows/deploy.yml` typechecks and builds on every push
and pull request, and on `main` it runs `wrangler deploy`. Nothing is published from a developer
machine.

CI authenticates with two repository secrets (Settings → Secrets and variables → Actions). This
repo is public, so they must never be written into a file or printed in a workflow step. The
deploy step also filters email addresses out of wrangler's output, since its error messages name
the account by the owner's email.

| Secret                  | Value                                                                              |
| ----------------------- | ---------------------------------------------------------------------------------- |
| `CLOUDFLARE_API_TOKEN`  | Account token with Edit on **Workers Scripts**, **D1**, **Workers R2 Storage** and **Workers KV Storage** |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account ID                                                              |

The Worker is about 4.2 MB gzipped, above the Workers free plan's 3 MB limit, so the account needs
Workers Paid. R2 has to be enabled on the account once, in the dashboard.

The site is served only on **mefinx.com**. `wrangler.jsonc` attaches mefinx.com and www.mefinx.com
as custom domains, with workers.dev and preview URLs turned off, and `src/worker.ts` redirects www
to the bare domain. `siteUrl` in `astro.config.mjs` is the same origin: EmDash refuses production
setup without it, and the admin passkey is bound to it. The deploy token therefore also needs
**Zone → Workers Routes: Edit** on the mefinx.com zone.

The one-time steps after the first green deploy:

1. Visit https://mefinx.com/_emdash/admin and complete setup. That creates the admin account
   (passkey) and applies the seed. Do it straight away: until setup is done, whoever reaches the
   admin first can claim it.
2. Set the encryption key EmDash uses for plugin settings:
   `pnpm wrangler secret put EMDASH_ENCRYPTION_KEY` (generate one with `npx emdash secrets`).
   Worker secrets survive later deploys.

See [Deploy to Cloudflare](https://docs.emdashcms.com/deployment/cloudflare/) for the full guide.
