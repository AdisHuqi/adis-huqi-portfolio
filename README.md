# Adis Huqi — Portfolio

Static, single-page portfolio built with **React 19, TypeScript 6, Vite 8, and npm**.
The existing paper/ink palette, Space Grotesk / Inter / IBM Plex Mono typography,
SVG interface concepts, alternating project cards, and hero animation are preserved.
No backend, database, authentication, or contact service is required.

## Setup and local development

Run commands inside `portfolio/` (the folder containing `package.json`).
Use Node.js **24 LTS** (`.nvmrc`); `package.json` also permits Node 22.12+ in the 22 line.
The previous Node 18 recommendation was incompatible with this toolchain.

```sh
npm ci
npm run dev
```

Use the URL printed by Vite. Keep `package-lock.json` committed and use npm;
do not replace the package manager or regenerate this app from a template.

## Checks and production build

```sh
npm run lint
npm run build
npm run preview
```

The build runs TypeScript project checks and emits the production site to `dist/`.
Preview serves that build locally; it is not a production server. After source
changes, rebuild before testing preview. There is no unit-test runner configured.

## Deployment (not performed)

No existing hosting configuration was present. This is a static site with hash
navigation; no API server or application route rewrites are needed.

For a static host with build support, configure:

| Setting | Value |
| --- | --- |
| Project/root directory | `portfolio` if importing this enclosing folder; `.` if importing only the app |
| Node version | `24` |
| Install command | `npm ci` |
| Build command | `npm run build` |
| Publish/output directory | `dist` relative to the project directory |
| Environment variables | None |

Alternatively, run the build locally and upload the **contents** of `dist/` to a
static web host. Enable HTTPS through the host. Never upload `node_modules`, local
credentials, or the development server. This source copy has no `.git` directory;
initialize or import it into your chosen repository if the host deploys from Git.

The default build assumes the site is served at `/`. If deploying beneath a path,
set Vite's `base` to the actual path (including the trailing slash), or build with:

```sh
npm run build -- --base=/your-actual-path/
```

Replace that example path with the real host path, then test at that same path.
Do not invent a production URL. Once a domain is selected, an absolute canonical
URL and `og:url` can be added to `index.html`. Neither is required for the current
build. The branded SVG favicon and social metadata text are already included;
no social preview image has been supplied.

## Editing content

- `src/data/profile.ts`: name, location, GitHub, hero copy, credentials, education,
  about copy, skills, and footer note. All GitHub controls read this data.
- `src/data/projects.ts`: project names, descriptions, technology lists, features,
  optional role, status copy, accent color, preview selector, and optional repository.
- `src/components/Work.tsx`: introductory text above the project list.
- `index.html`: page title, search/social descriptions, font links, and favicon.
  Update these separately when changing the site's identity or summary.

All five supplied projects are represented, including Rental Management System
(Java, JavaFX, MySQL). It is specifically about properties, tenants, and payment
records; no unrelated vehicle-rental project or repository is substituted.

To add a project, add an object with a unique `id` to `projects`. Card layout,
alternating sides, accessible names, and details disclosure are automatic.
`statusLabel` is displayed; `status` is descriptive data and does not indicate a
live deployment. Use verified facts only. The project ID also supplies a stable
fragment link, such as `#rental-management`.

### Repository availability

A repository link appears only when **both** `repoUrl` and `repoPublic: true` are
set. Verify the URL while signed out before enabling it. If a supplied URL is
unavailable, the card displays a non-clickable availability note.

On 2026-09-07, the GitHub profile was reachable, but these supplied URLs returned
404 publicly (private or renamed repositories can produce the same response):

- `https://github.com/AdisHuqi/ride-together`
- `https://github.com/AdisHuqi/quick-lek-pos`

Both URLs are retained in data with `repoPublic: false`. Supply a publicly
accessible URL, or make the intended repository public yourself, then verify and
set `repoPublic: true`. No links were guessed for AnticoEvent, FitShop / FitGym,
or Rental Management System.

### Visual assets

`src/components/previews/` contains lightweight, illustrative SVG concepts.
`PreviewFrame.tsx` adds the shared corner marks, image label, and visible
"interface concept" tag. RentalPreview follows that same visual system.
These are not screenshots or evidence of project implementation. The original
assets are small vectors; no large raster assets need compression.

To introduce an actual supplied screenshot, create a preview component using an
`img` with descriptive `alt`, intrinsic `width` and `height`, `loading="lazy"`,
and responsive sizing. Register it in `ProjectCard.tsx` and the `Project.preview`
union, preserving the existing framing and aspect ratio. Label it accurately;
do not label a real screenshot as a concept. There is no implemented `screenshot`
data field; merely adding such a field will not display an image.

Keep layout and section styles in `src/App.css`, and colors, fonts, reset,
keyboard focus, and reduced-motion rules in `src/index.css`.

## Contact, CV, and secrets

- No contact form exists, so no form endpoint, destination, or credentials are
  needed and no message-delivery success is simulated.
- No email, LinkedIn, or actual CV file was supplied. There is no inactive CV
  control. To add one later, supply the real file and verify the downloaded file.
- GitHub is the only supplied external channel. No project live URLs or app-store
  publication are claimed.
- Payments and QR validation for AnticoEvent are not verified implementations.
  Datecs integration is described as in progress, not production-ready.
- No environment variables are required. `.env*`, local keys, build output, and
  dependencies are ignored. If future functionality needs configuration, document
  variable names in a value-free `.env.example`. **Every `VITE_*` value is public
  in the browser bundle**; never use it for secrets, SMTP credentials, or privileged
  Supabase keys. Do not copy the showcased projects' backend credentials here.
- Fonts load from Google Fonts, with system fallbacks if unavailable.

## Verification and regression checklist

Completed on 2026-09-07 with Node 24.11.1 / npm 11.6.2:

- `npm ci`, `npm run lint`, TypeScript checks, and production build passed.
- npm dependency audit reported zero vulnerabilities.
- A fresh production browser session logged no warnings or errors. HTML, CSS,
  JavaScript, and favicon requests returned HTTP 200; the favicon parsed as SVG.
- The skip link was reached with Tab, showed a visible focus outline, and moved
  focus to the main landmark on Enter.
- Production browser testing covered all five project disclosures with Enter
  to expand and Space to collapse; hidden panels are actually removed from layout.
- Main navigation anchors, mobile menu opening, Escape dismissal with focus
  restoration, outside-click dismissal, section focus after selection, and reset
  when resizing to desktop were checked.
- Expanded cards were measured at 320, 375, 640, 720, approximately 721 and 861
  (browser-rounded to 722 and 862), 860, 1024, and 1440px. No horizontal page
  overflow or clipped text containers were detected. Desktop and mobile layouts
  were also inspected visually.
- Semantic landmarks, accessible button names, focus styles, sticky-header scroll
  clearance, SVG labeling, and reduced-motion CSS were reviewed. The reduced-motion
  rules now remove animation delays as well as reducing duration.

Before publishing, repeat the build and browser checks after any content change.
Use Tab from the top to verify the skip link; exercise every project disclosure;
check the narrow menu in portrait and landscape; verify external links while
signed out. Real-device Safari/Firefox, a screen reader, and an OS-level
reduced-motion preference were not tested in this environment.
