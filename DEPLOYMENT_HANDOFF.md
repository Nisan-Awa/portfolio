# Portfolio deployment handoff

The finished portfolio is the Next.js application at this repository root. Use this root as the Vercel Root Directory. The existing client/ and server/ folders are separate, unused projects and are excluded from this portfolio's TypeScript and lint checks.

## Latest local addition: Python Lab, 23 November 2026

The new public learning page is `/learn/python`, intended for `https://www.nisanawa.tech/learn/python`. The existing domain and project connections remain authoritative. The user has approved this implementation and will ask Gemini to handle GitHub and Vercel; Codex has not committed, pushed or deployed it.

The universal course contains 40 original lessons across ten chapters, with four presentation styles for children, teens and adults. Every lesson stays open. It includes explanations, predictions, coding tasks, hints, sample solutions and real execution checks. Turtle is excluded. The independent playground runs users' own Python programs, supports input and compatible standard-library modules, opens and downloads `.py` files, reads attached data, and downloads generated text/CSV/JSON/Python files.

### Source and review locations

- Authoritative application: `C:\Users\Awa Nisan Tojah\Documents\SOFTWARE_PROJECTS\my-portfolio`.
- Owner's requested review folder: `C:\Users\Awa Nisan Tojah\portfolio-preview-review\python-lab-review`.
- The review contains `REVIEW.html`, preview screenshots, final verification JSON, detailed browser results and `SOURCE_SHA256.json`.
- The review folder is outside the Git repository. School PDFs, assessment keys, extracted notes, browser profiles and source backups are local review material and are not website assets.
- Pre-change source backup: `C:\Users\Awa Nisan Tojah\portfolio-preview-review\python-lab-backup-20261123-161615`.

### Deployment shape and cost constraint

The learning route is statically prerendered. Python runs in the visitor's browser using pinned Pyodide `314.0.8` from the public jsDelivr CDN, loaded only when code runs. There is no new server-side Python execution, paid API, AI assistant, database, account service, npm dependency or environment variable. Preserve the existing hosting plan; do not add paid resources. Existing domain charges, hosting terms and transfer/request limits continue to apply.

Use the existing Node 22 configuration and `npm run build`. The `prebuild` command regenerates `public/python-lab/runner.html` from `worker-source.js` and `runner-host.js`, with a matching CSP hash. `predev` does the same. Keep these hooks and all three source/helper files. The generator normalizes Windows line endings before hashing.

The runner uses an opaque-origin sandbox frame with `allow-scripts` only. A fresh worker is created per run, preventing state from leaking between programs. The classic blob entry uses dynamic ESM imports for Pyodide; this entry choice avoids a reproduced Chromium restriction on module workers created by opaque-origin frames. Keep `import()` rather than switching to `importScripts()`. The frame's policy restricts network connections to the runtime CDN. No site-wide COOP/COEP change is needed.

### Verification commands

From the repository root, on Windows:

    npm.cmd run lint
    npm.cmd run test:python
    npm.cmd run build

`test:python` uses the locally installed Python 3 and verifies all 40 examples and 55 solution test cases. Python is not required by the Vercel build.

To reproduce browser checks, start the production build in one terminal:

    npm.cmd run start -- --port 3038 --hostname 127.0.0.1

Then run these one at a time in another terminal:

    node scripts/python-lab-browser-qa.mjs --url=http://127.0.0.1:3038
    node scripts/python-lab-browser-qa.mjs --url=http://127.0.0.1:3038 --edges
    node scripts/python-lab-browser-qa.mjs --url=http://127.0.0.1:3038 --network-blocked
    node scripts/python-lab-browser-qa.mjs --url=http://127.0.0.1:3038 --alternatives

The browser script uses an installed Chrome/Chromium browser with Node's native WebSocket support. Override `CHROME_PATH` if needed. It stores local results in the ignored `.python-lab-qa/` directory. The blocked-network case affects only its temporary test browser. The core suite runs all 40 activities in the real browser interpreter. Separate checks cover input compatibility, storage restrictions, file import/export, keyboard access, larger text, high contrast, offline-download recovery and valid alternative solutions. See the final review JSON for actual results and counts.

### Runtime limits and learning records

- Execution: 8 seconds after loading; loading has a separate 60-second timeout.
- Output: 12,000 characters; code: 30,000 characters; input: 10,000 characters.
- Attachments: five UTF-8 text/CSV/JSON/Python files, up to 100 KB each. Generated downloads have the same file-size bound.
- Each run starts with a fresh Python namespace and temporary file space. Download generated files to retain them. Attached files live in tab memory and are excluded from progress backups.
- Input responses are supplied before Run. Both `input()` and standard-input reads are supported, including calls made by attached Python modules.
- Browser storage holds drafts and practice completion. Export/import supports moving devices. Clearing browser data can remove local work; storage restrictions fall back to a session-only state with working export.
- Local completion records are practice feedback, not secure examination marks or a teacher dashboard. Shared-device learners should use separate browser profiles or individual backups.
- CDN access is needed for initial execution; browser caching is helpful but reliable offline use is not guaranteed. Desktop applications and arbitrary third-party packages are outside this lab.
- A worker time limit is not a hard memory quota. Very large allocations can still exhaust a tab. The help text describes this limit.

### Files to review before Gemini commits

Include the changed `.gitignore`, `package.json`, `DEPLOYMENT_HANDOFF.md`, shared navigation, mentoring invitation, footer, global styles and sitemap. Include **all** new files in `app/learn/`, `components/python-lab/`, `lib/python-lab/`, `public/python-lab/` and `scripts/`. `AGENTS.md` was generated by this version of `next dev` and documents its installed framework guidance. No dependency addition required a lockfile change.

Review `git diff` and `git status` before staging. The ignored `client/`, `server/`, build output, local QA output and environment files remain outside this change. After deployment, check the main portfolio, `/learn/python`, a direct lesson link, the open playground, a first real Run on the live domain, file downloads, theme switching and phone navigation. Preserve the existing APK and project links.

### Runtime references

- Pyodide deployment: https://pyodide.org/en/stable/usage/downloading-and-deploying.html
- Pyodide compatibility: https://pyodide.org/en/stable/usage/wasm-constraints.html
- Python fundamentals: https://docs.python.org/3/tutorial/
- Existing Vercel plan limits: https://vercel.com/docs/plans/hobby

## Previous portfolio verification on 10 November 2026

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
