# ASIS TAXI portfolio update — 31 October 2026

The existing `/projects/asis-taxi` URL remains valid and now describes the customer website. Three additional case studies distinguish the driver website, customer Capacitor app and driver Capacitor app. Other project entries remain available; the original administration screenshots are retained on the website case study.

## Content and implementation

- `src/data/asisProjects.ts`: the four case studies, technology lists, connections, verified website destinations and screenshot captions.
- `src/data/projects.ts`: project/image types and integration into the existing project list.
- `src/data/profile.ts`: the portfolio skills section now includes the additional tools demonstrated by ASIS TAXI.
- `src/App.tsx`: image covers, live website links, related products, connection sections, responsive galleries and a native dialog for screenshot enlargement.
- `src/asisPortfolio.css`: styles scoped to product captures, desktop/portrait galleries and the screenshot viewer.
- `public/images/asis-current/`: 13 selected JPEG screenshots. Unused blank dashboard captures were removed.

## Source verification

Technology and product descriptions were checked against the taxi repository, rather than copied solely from its handoff:

- Root `package.json`: React, TypeScript, TanStack, Tailwind, Radix, Supabase, Clerk, POK, Firebase, Capacitor and test dependencies.
- `src/routes/__root.tsx` and the website components: root website, analytics and shared customer interface.
- `apps/customer/src/main.tsx`, `apps/driver/src/main.tsx`, `apps/driver-web/src/main.tsx`: distinct app entry points, router trees, shared components and app-specific styling.
- App Vite and Capacitor configurations: app identifiers, separate session storage, Capacitor shell and plugin settings.
- `apps/customer/ios` and the customer/driver Android projects: platform scope. The driver case study claims Android, not iOS.
- Driver Java tracking plugin/service and driver tracking bridge: native foreground location integration.
- `src/integrations/supabase/client.ts`, migrations and generated database types: shared database/authentication contracts.
- Edge Function directories: Clerk/email verification, Resend email delivery, POK payments, webhook/proof/reconciliation workflows.

Descriptions identify integrations implemented in source. They do not assert successful live payment processing, external email delivery or production background tracking during this portfolio update.

## Screenshot provenance

Fresh captures used the current local source:

- Website: home, booking, ride history at 1440 × 960; home at 390 × 844.
- Driver website: sign-in, conversations and fare collection at 1440 × 960.
- Customer app frontend: sign-in, booking and ride history at 390 × 844.
- Driver app frontend: sign-in, conversations and fare collection at 390 × 844.

Authenticated screens use existing disposable local accounts, seeded rides and messages against local Supabase. Production Supabase requests were blocked in capture contexts. Credentials and capture utilities remain outside the portfolio repository. No production accounts, payments or bookings were changed.

App images are actual app-frontend browser renders, not physical-device or emulator captures. Gallery descriptions state this. Native notification delivery, background tracking, real soft keyboards and payment returns are not verified by these captures.

The seeded driver's completed unpaid ride suppresses most dashboard content. Blank dashboard captures were discarded; useful sign-in, messaging and fare-collection screens were selected instead. No taxi application code or seeded database records were changed to obtain these images.

## Local commands

```sh
npm ci
npm run lint
npm run build
npm run preview -- --host 127.0.0.1 --port 5181
```

No portfolio environment variables or backend connections are needed. Screenshot images are static assets; the portfolio does not receive taxi credentials or API keys.

Publication is separate from implementation. Do not deploy any ASIS TAXI Vercel project or submit native store changes as part of this portfolio update.

## Verification

- Lint and TypeScript / Vite production build pass.
- Production-preview checks passed for the homepage, project listing and all four ASIS case studies in Chromium (320, 390, 768, 1440px) and WebKit (390, 1440px): 36 route/viewport combinations, no horizontal overflow, missing images or page JavaScript errors.
- All nine project cards remain available. Screenshot dialogs open and close, support Escape, use native modal behavior and restore focus to their gallery trigger.
- The initial dialog check exposed missing focus restoration; it was fixed and verified in both engines.
- After the final change to app-card screenshot strips, the affected homepage and project listing passed another 12 browser/viewport checks. Temporary app preview servers and review-only captures were then removed; the portfolio production preview remains available on port 5181.
- Dependency installation reports two existing high-severity advisory entries (`vite`, `source-map-js`). No dependency versions or lockfile were changed by this content update. This is not a dependency-remediation task.
