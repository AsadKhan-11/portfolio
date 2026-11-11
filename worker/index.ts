/*
  The site's one piece of server code, run by Cloudflare Workers.

  wrangler.jsonc serves the built site (out/) straight from Cloudflare's
  static assets and runs this Worker first only for /api/*, so ordinary page
  views never touch it. Right now that is a single route, the contact form's
  mail endpoint; the logic is in src/lib/contactMail.ts.

  Settings, and where they live:
    RESEND_API_KEY   a secret, set in the Worker's Settings, Variables & Secrets.
                     Secrets survive deploys; it is the only thing kept there.
    CONTACT_FROM     a plain variable in wrangler.jsonc, so it is versioned. A
                     deploy deletes plain variables that exist only in the
                     dashboard, so they cannot live there.
    TURNSTILE_SECRET a secret, like RESEND_API_KEY. Optional: once set, the form
                     must carry a passing Cloudflare Turnstile token. The matching
                     site key is TURNSTILE_SITE_KEY in src/lib/contactFields.ts.
    CONTACT_TO       optional. Defaults to the address shown on the site, so a
                     notification cannot go to a different inbox than the one
                     visitors are told to write to. Set it only to override,
                     for example when testing before the domain is verified.
*/
import { CONTACT_EMAIL } from "../src/lib/contactFields";
import { handleContact, type ContactEnv } from "../src/lib/contactMail";

interface Env extends ContactEnv {
  /* Cloudflare's static assets, bound by the "assets" block in wrangler.jsonc. */
  ASSETS: { fetch(request: Request): Promise<Response> };
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (new URL(request.url).pathname === "/api/contact") {
      return handleContact(request, { ...env, CONTACT_TO: env.CONTACT_TO ?? CONTACT_EMAIL });
    }

    /*
      Only /api/* reaches this Worker, so anything else here is an /api path
      with no handler. Hand it to the assets layer for its 404 page.
    */
    return env.ASSETS.fetch(request);
  },
};

export default worker;
