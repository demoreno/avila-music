# Blog — `feat/blog`

Status: **done** (publishing flow + SEO plumbing). Writing actual articles is next.

## Why

Attract organic search traffic to the storefront. Every published post needs to hold up as a
real SEO landing page, not just a list of words — that's why the admin form nudges title/meta
description length and every post gets full metadata + structured data, not just a title and
body.

## What's built

- **`blog_posts` table** — `title`, `slug` (set once at creation, never edited — changing it
  would break indexed/shared links), `excerpt`, `content` (Markdown), `cover_image_url` (plain
  URL, no upload flow — paste one you already have, e.g. from Productos), `meta_description`
  (optional SEO override, falls back to `excerpt`), `is_published`, `published_at`. RLS: admin
  full access via `is_admin()`; public can only `SELECT` where `is_published = true`.
- **Admin** (`app/(admin)/admin/(dashboard)/blog/`) — list page, `/nuevo`, `/[id]/editar`. One
  shared `components/admin/BlogPostForm.tsx`: Markdown textarea with a live preview toggle
  (`react-markdown` + `remark-gfm`), publish checkbox, character counters for title (~60) and
  meta description (~160) as soft guidance, not hard limits.
- **Storefront** — `/blog` (grid of published posts) and `/blog/[slug]` (article). Each post page
  ships `generateMetadata` (title, description, canonical, OG/article type) plus two JSON-LD
  blocks (`BlogPosting`, `BreadcrumbList`). Posts are included in `app/sitemap.ts`. "Blog" is in
  the main nav and footer.
- **`@tailwindcss/typography`** was added (wasn't installed before) so the `prose` classes used
  to render Markdown actually apply — branded via `prose-headings:heading-serif
  prose-headings:text-[#1e4d6b]` etc. in `blog/[slug]/page.tsx`.
- Cover images render via a plain `<img>`, not `next/image` — `cover_image_url` can be any
  pasted URL, and `next/image` requires the host to be listed in `next.config.ts`
  `remotePatterns` (only the Supabase storage domain is). Trades away automatic image
  optimization for not having to touch that config every time someone pastes a new host.

## Branch note

`feat/blog` was branched before the `feat/user-accounts` security work (`profiles`, `is_admin()`,
`lib/require-admin.ts`) landed, so those files had to be hand-recreated here to avoid shipping a
new admin feature on the old "any logged-in user" gate. **This branch should be rebased onto
`feat/user-accounts` before merging** — the DB-side migrations already apply regardless of git
branch (Supabase project is shared), only the app code was out of sync.

## Open items

- Write the first real article (SEO-driven, using the `copywriting` skill).
- No image upload for cover images yet — deliberately deferred, see above.
- No tags/categories on posts — add if/when there are enough posts to need filtering.
