# pavlotrinko.com

Personal site of Pavlo Trinko (PollyGlot): projects, posts and short notes, in
French and English. Astro (static) + MDX, deployed to Cloudflare Workers static
assets.

```sh
pnpm install
pnpm dev       # http://localhost:4321
pnpm check     # lint, typecheck, build: ends with "check: OK"
```

Content lives in `src/content/{posts,notes,projects}/{fr,en}/`. A translation
is the file with the same name in the other language folder.

CI (`.github/workflows/ci.yml`) runs `pnpm check` on every pull request and
push, and deploys `main` with `wrangler deploy`. It needs two repository
secrets: `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.
