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

Not done yet. The one-time steps:

1. `pnpm wrangler login`, then `pnpm deploy`. The first deploy creates the `mefinx-site` D1
   database and the `mefinx-site-media` R2 bucket named in `wrangler.jsonc`, and serves the site on
   a `workers.dev` URL.
2. Set the encryption key EmDash uses for plugin settings:
   `pnpm wrangler secret put EMDASH_ENCRYPTION_KEY` (generate one with `npx emdash secrets`).
3. Visit `/_emdash/admin` on the deployed URL and complete setup. That creates the admin account
   (passkey) and applies the seed.
4. Once it works on `workers.dev`, add the domain to `wrangler.jsonc` and deploy again:

   ```jsonc
   "routes": [
     { "pattern": "mefinx.com", "custom_domain": true },
     { "pattern": "www.mefinx.com", "custom_domain": true }
   ]
   ```

   This needs mefinx.com to be a zone on the same Cloudflare account.

See [Deploy to Cloudflare](https://docs.emdashcms.com/deployment/cloudflare/) for the full guide.
