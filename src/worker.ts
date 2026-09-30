import handler, { createScheduledHandler, PluginBridge } from "@emdash-cms/cloudflare/worker";

export { PluginBridge };

// www.mefinx.com is attached so the name resolves, but the site lives on the bare domain
// (astro.config.mjs siteUrl), so send it there.
const CANONICAL_HOST = "mefinx.com";

export default {
	...handler,
	fetch(request, env, ctx) {
		const url = new URL(request.url);
		if (url.hostname === `www.${CANONICAL_HOST}`) {
			url.hostname = CANONICAL_HOST;
			return Response.redirect(url.toString(), 301);
		}
		return handler.fetch!(request, env, ctx);
	},
	scheduled: createScheduledHandler(),
} satisfies ExportedHandler;
