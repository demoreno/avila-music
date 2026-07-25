# Customer accounts — `feat/user-accounts`

Status: **in progress**. This covers what's built so far (signup/login) — `orders` and the
cart-to-WhatsApp checkout are the next slice, not started yet.

## Why

Long-term goal (per the reference UX, libreriabookstore.com): a customer can register, log in,
build a cart, and check out into an "order" they can later see under "Mis pedidos" — no online
payment, no saved addresses yet (a free-text field per order instead). The cart still ends in a
WhatsApp message with pre-filled info, same as today; the difference is that a record of the
order persists and is tied to the customer's account.

## Security prerequisite (done first, before any public signup)

Every admin table's RLS policy was `auth.role() = 'authenticated'` — full access to **any**
logged-in Supabase user, because until now the only kind of logged-in user was the store owner.
The moment customer signup exists, that policy would give every customer full read/write on
sales, costs, and inventory.

Fixed via the `profiles` table + `is_admin()` (see [`schema.md`](./schema.md#profiles) for the
table shape and the rewritten RLS policies). Also replaced 4 call sites that only checked "is
someone logged in" (3 admin `actions.ts` files using the service-role client, plus
`app/api/admin/stock/route.ts`) with a shared `lib/require-admin.ts` that checks `role='admin'`.
The admin dashboard layout (`app/(admin)/admin/(dashboard)/layout.tsx`) now also redirects
non-admins to `/admin/login` — previously it didn't redirect anyone at all.

## What's built

- **Signup / login** — `app/(store)/cuenta/registro/page.tsx`, `app/(store)/cuenta/login/page.tsx`.
  Client components using `@supabase/ssr`'s `createBrowserClient`, mirroring the existing admin
  login pattern. Password fields use a shared `components/store/PasswordInput.tsx` (show/hide
  toggle).
- **Account page** — `app/(store)/cuenta/page.tsx`, server-rendered, redirects to `/cuenta/login`
  if not authenticated. Placeholder "Mis pedidos" section (no `orders` table yet).
- **Header account menu** — `components/store/AccountMenu.tsx`. Logged out: "Iniciar sesión"
  link. Logged in: first name (or "Mi cuenta" if none set) with a dropdown → "Mi cuenta" /
  "Cerrar sesión". Closes on outside click or Escape.
- **Email confirmation is ON** for this project (Supabase default). Signup handles both cases:
  if `data.session` comes back null, shows a "revisa tu correo" screen instead of erroring.

## Email delivery

Supabase's built-in email sender has a very low rate limit and is not meant for production. This
project now uses **Resend** as custom SMTP (`smtp.resend.com`, username `resend`, password = the
Resend API key from `.env.local`), configured in the Supabase dashboard at
**Authentication → Emails → SMTP Settings** — there's no API/MCP tool for this, it's a manual
one-time dashboard step. Sender domain: `avilamusic.store`, verified in Resend.

Branded HTML email templates (matching the storefront's navy/amber identity, not Supabase's
plain default) live in [`supabase/email-templates/`](../supabase/email-templates/) — **that
folder is the source of truth**, since the Supabase dashboard has no version history. Currently:
`confirm-signup.html` (in use) and `reset-password.html` (ready for when "olvidé mi contraseña"
is built). See that folder's README for the HTML-email constraints (inline styles only, no
gradients, system font fallbacks).

## Open items / not yet built

- `orders` / `order_items` tables — the actual next step.
- Checkout flow: cart → order record (if logged in) → WhatsApp CTA with pre-filled info.
- "Mis pedidos" showing real data on the account page.
- Saved addresses (deliberately deferred — free-text field per order for now).
- Custom SMTP rate limits / deliverability warm-up for `avilamusic.store` (new sending domain,
  early emails may land in spam until reputation builds).
