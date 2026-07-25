/**
 * Hardcoded belt-and-suspenders check, on top of `profiles.role === 'admin'` —
 * David is the only admin for now, so this is an extra hard gate that doesn't
 * depend on the `profiles` row being correct. Deliberate, not a TODO: revisit
 * only if/when a second real admin account is added. Kept in its own file
 * (no `server-only`) so both server checks (lib/require-admin.ts) and the
 * client-side login redirect can import it without pulling server-only code
 * into the client bundle.
 */
export const ADMIN_EMAIL = 'demoreno@gmail.com'
