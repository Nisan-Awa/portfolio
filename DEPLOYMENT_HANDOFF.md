# Portfolio deployment handoff

The finished portfolio is the Next.js application at this repository root. Use this root as the Vercel Root Directory. The existing client/ and server/ folders are separate, unused projects and are excluded from this portfolio's TypeScript and lint checks.

## Verified on 10 November 2026

- Clean npm ci installation: passed.
- npm run lint: passed with no warnings or errors.
- npm run build and TypeScript: passed; 22 pages generated.
- npm audit: zero reported vulnerabilities.
- Browser checks: 9 page/viewport combinations passed, including desktop, tablet and phone widths.
- All 32 checked internal page/download links returned HTTP 200.
- No browser JavaScript errors, broken images or horizontal overflow in the final checks.
- Theme switching/persistence, mobile navigation, keyboard focus and Escape dismissal passed.
- Filename casing and referenced public assets checked for Linux deployment.
- Next.js 16.4.6, React/React DOM 19.3.1, Node 22.x.
- No push or deployment has been performed; the Gemini agent should handle those steps.

## Before committing

Use Node.js 22.x (declared in package.json). Run these commands from the repository root, one at a time:

    npm ci
    npm run lint
    npm run build

Commit package.json and package-lock.json together. Include all new files in app/, components/, lib/ and public/assets/. The new images and pages must be committed, not just the modified tracked files.

Suggested scope to review and stage:

    git add .gitignore .vercelignore package.json package-lock.json app components lib public/assets DEPLOYMENT_HANDOFF.md

Review the staged diff before committing. The pre-existing untracked client/ and server/ source folders are outside this update; review them separately rather than automatically including them.

Nested node_modules/, .next/, editor state and environment files are ignored. Keep those exclusions.

## Existing Vercel project

Use the existing GitHub repository and Vercel project connected to nisanawa.tech.

- Framework preset: Next.js.
- Root Directory: repository root.
- Install command: npm ci.
- Build command: npm run build.
- Output directory: framework default.
- Node.js: 22.x, matching engines.node.
- The active portfolio routes require no new environment variables or external API keys.

Preserve the existing custom-domain and project connections.

## Verify after deployment

Wait for a successful Vercel build/deployment. Check:

- Homepage, light/dark switch and mobile navigation.
- /profile, including the collaboration reflections and outbound links.
- /projects and both /projects/queenbrique and /projects/elegant-radiance-luxe.
- Education certificate, full engineering portrait and both student screenshots, including tablet width.
- Existing Android APK download links.
- /sitemap.xml and /robots.txt.

The existing APK files remain included so downloads continue to work. The largest is approximately 83.47 MiB: GitHub may warn about files above 50 MiB, but none of these files exceeds its 100 MiB hard limit.

Website screenshots are already compressed WebP assets and are served directly. This avoids a reproduced tablet-specific image-optimizer problem.

## Framework maintenance references

- Next.js November security release: https://nextjs.org/blog/november-2026-security-release
- Vercel Node versions: https://vercel.com/docs/functions/runtimes/node-js/node-js-versions
- GitHub file size limits: https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github

Local backups and detailed verification evidence are outside this repository in the portfolio-preview-review folder.

## Scoped development-tool patch

package.json temporarily overrides only the minimatch dependency used by @typescript-eslint/typescript-estree to 11.0.1, the patched release for GHSA-g3hv-75wg-m249. Other minimatch consumers are unchanged. Keep this scoped override until the upstream parser adopts a patched version. Lint and production build are checked after installation.
