/*
  POST /api/contact — the contact form's mail endpoint.

  Cloudflare Pages turns this file's path into the route and runs it
  beside the static site. Next.js never sees it; `next build` and
  `next dev` ignore the functions/ folder.

  It needs three values in the Pages project (Settings, Variables and
  Secrets). Local testing reads the same names from a .dev.vars file,
  see .dev.vars.example.

    RESEND_API_KEY   secret. Resend dashboard, API Keys
    CONTACT_FROM     sender on a domain verified in Resend
    CONTACT_TO       the inbox enquiries should land in

  The logic is in src/lib/contactMail.ts. It is imported by relative
  path because Pages bundles this folder on its own and does not read the
  "@/" alias from tsconfig.
*/
import { handleContact, type ContactEnv } from "../../src/lib/contactMail";

/*
  One handler for every method, so a stray GET gets a 405 from the same
  code that serves the POST instead of falling through to a 404 page.
*/
export const onRequest = ({ request, env }: { request: Request; env: ContactEnv }) =>
  handleContact(request, env);
