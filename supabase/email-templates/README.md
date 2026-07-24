# Email templates (Supabase Auth)

Supabase Auth sends its own transactional emails (signup confirmation, password reset, etc.)
directly — our app never renders or sends these. They're configured by pasting HTML into the
Supabase dashboard: **Authentication → Emails → Templates**.

These files are the source of truth for that HTML. The dashboard has no version history and no
way to import a file, so whenever a template changes: edit the `.html` file here first, then
copy-paste its full contents into the matching template in the dashboard and hit Save.

## Constraints (why these look the way they do)

- **No Tailwind, no `<style>` blocks that survive Gmail/Outlook stripping.** All styling is
  inline (`style="..."` on each tag) and layout uses `<table>`, not flexbox/grid — the
  bulletproof-email pattern. This is the only way the layout survives across email clients.
- **Fonts fall back to system fonts.** The site's actual fonts (DM Sans, Cormorant Garamond) are
  web fonts most email clients strip. `Georgia, serif` stands in for headings (matches the site's
  own `heading-serif` fallback in `app/globals.css`), `Arial, Helvetica, sans-serif` for body text.
- **No gradients.** Outlook desktop doesn't render CSS gradients reliably, so the CTA button uses
  solid `#f59e0b` (accent) instead of the site's `.btn-secondary` gradient.
- **Colors are pulled directly from the `@theme` block in `app/globals.css`** — primary `#1e4d6b`,
  accent `#f59e0b`, text `#1e293b`, text-muted `#64748b` — so these read as the same brand as the
  storefront, not a generic transactional email.
- **No logo image.** Swap in an `<img src="https://<public-domain>/avila-logo.jpeg" ...>` once
  the storefront has a stable public HTTPS URL — until then a broken image is worse than the
  text wordmark.

## Available Supabase template variables

Each template gets different variables. The ones used here:

| Template | Variable | Purpose |
|---|---|---|
| `confirm-signup.html` | `{{ .ConfirmationURL }}` | Link to confirm the new account |
| `reset-password.html` | `{{ .ConfirmationURL }}` | Link to set a new password |

Full list: https://supabase.com/docs/guides/local-development/customizing-email-templates#template-variables

## Files

- `confirm-signup.html` → dashboard tab **"Confirm signup"**
- `reset-password.html` → dashboard tab **"Reset Password"**
