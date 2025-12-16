# Environment Variables

| NAME | Scope | Required? | Default / Example | Description |
| --- | --- | --- | --- | --- |
| `RESEND_API_KEY` | Server | Yes | *(none, keep secret)* | Required by `src/app/api/contact/route.ts::sendEmail`; contact submissions and the Resend HTTP call throw if this key is missing. |
| `RESEND_FROM_EMAIL` | Server | No | `Apigen Contact Form <onboarding@resend.dev>` | Controls the Resend "from" identity for the notification email. Set this to a verified Apigen address (e.g., `Apigen_Contact_Form <noreply@apigen.ca>`) before going to production to avoid delivery issues. |
| `CONTACT_EMAIL` | Server | No | `sunny@apigen.ca` | Destination inbox for contact form submissions; the code falls back to `sunny@apigen.ca` but you can point it to whatever mailbox owns the incoming messages. |
| `PREVIEW_SECRET` | Server | No | *(none)* | Optional secret checked by `src/app/api/preview/route.ts` when a `secret` query parameter is supplied; keeps preview mode gated so only the known token can enable `draftMode`. |
| `NEXT_PUBLIC_SITE_URL` | Both | No | `http://localhost:3000` | Used by `src/app/layout.tsx` and `src/lib/seo.ts` to build canonical URLs, schema.org metadata, and og:image links. Set to your production origin to avoid broken metadata and scripts that reference `/brand/logo.png`. |
| `NODE_ENV` | Both | No | `development` / `production` | Standard Next.js flag that the client and server code consults for logging and SEO fallbacks (`src/lib/utils.ts` and `src/config/site.ts`). The build already sets this automatically, but missing values can skew the robots metadata. |
| `VERCEL_ENV` | Server | No | `production` (Vercel default) | Used inside `isProductionEnv()` (`src/config/site.ts`) to decide whether to render `index,follow`. Vercel supplies this when running the production build; without it the code falls back to `NODE_ENV`. |
| `SUPABASE_SERVICE_ROLE_KEY` | Server | Yes | *(none, keep secret)* | Used by `/api/admin/images/unused/delete` and other tooling (seed scripts) to delete images or upload with service privileges; keep this value private inside Vercel secrets. |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | Client (docs-only) | No | `your_service_id_here` | Mentioned in `docs/EmailJS-Setup-Guide.md` as part of the old EmailJS contact flow. The current codebase no longer reads this value; keep it documented for cleanup but it plays no role in production. |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | Client (docs-only) | No | `your_template_id_here` | Same as above; appears only in documentation and can be removed once EmailJS references are deleted. |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | Client (docs-only) | No | `your_public_key_here` | Same as above; purely informational for the deprecated EmailJS instructions. |

## Contact form & Resend configuration

The contact form API lives in `src/app/api/contact/route.ts` and depends on Resend for notifications. The following environment variables **must** be defined in your Vercel Production environment (server-only).

- `RESEND_API_KEY` – API key from the Resend project that owns the Apigen Contact Form sending identity. Without this key the contact route throws before sending mail, so make sure it matches the project with the validated domain used for `Apigen_Contact_Form <noreply@apigen.ca>`.
- `RESEND_FROM_EMAIL` – Example: `Apigen_Contact_Form <noreply@apigen.ca>`. This value becomes the `from` address on the outgoing Resend email; it should be a verified identity inside the same Resend project and **must** use a domain you control.
- `CONTACT_EMAIL` – Example: `sunny@apigen.ca`. Controls the recipient of contact submissions (falls back to `sunny@apigen.ca` if omitted, but production should point to the right inbox).

Assume that Vercel’s Production environment exposes each of these values as **server-only** secrets; do not bake them into client bundles or commit them to source control.
