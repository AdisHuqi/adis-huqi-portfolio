import type { Project, ProjectImage } from "./projects";

const shot = (file: string, alt: string, caption: string): ProjectImage => ({
  src: `/images/asis-current/${file}.jpg`, alt, caption,
});
const website = shot("website-entry", "ASIS TAXI website home with Durrës taxi photography, service navigation and booking action", "Customer website · Home");
const driverWeb = shot("driver-web-entry", "ASIS Driver website dedicated driver sign-in interface", "Driver website · Sign in");
const customerApp = shot("customer-app-booking", "ASIS TAXI customer app booking interface at a phone viewport", "Customer app · Booking");
const driverApp = shot("driver-app-entry", "ASIS Driver app sign-in interface at a phone viewport", "Driver app · Sign in");
const sharedFrontend = ["TypeScript", "React 19", "Vite", "TanStack Router", "TanStack Query", "Tailwind CSS", "Radix UI"];
const sharedBackend = ["Supabase", "PostgreSQL", "Row Level Security", "Supabase Realtime", "Deno Edge Functions"];
const security = "Supabase Auth supplies sessions; database policies and RPCs enforce ownership and role boundaries. Account lifecycle and email-verification gates are shared across clients. Playwright, Vitest and database-focused tests support regression checks for booking, authentication and ride workflows.";

export const asisProjects: Project[] = [
  {
    slug: "asis-taxi", title: "ASIS TAXI Website", category: "Customer website", family: true,
    summary: "A responsive taxi website for Durrës and Albania, connecting service discovery to booking, live ride updates and a customer account.",
    problem: "Customers need to discover the service, choose a pickup and destination, understand an estimated fare and follow their ride from one interface that works on desktop and mobile browsers.",
    role: "Full-stack development across the customer website, shared booking components, database contracts and service integrations, alongside the connected driver and administration products.",
    features: ["Responsive public pages for services, destinations, service areas and airport transfers", "English and Albanian interfaces", "Pickup-first booking, map search, route estimates and scheduled rides", "Fare display in ALL and EUR, promotion codes and payment-method selection", "Live ride states, driver information and cancellation flows", "Customer accounts, email verification and password recovery", "Ride history, reviews, favourite addresses, messages and support"],
    stack: [...sharedFrontend, "TanStack Start", ...sharedBackend, "Google Maps JavaScript API", "Google Places", "Google Routes", "POK Payments", "Clerk email verification", "Resend", "Vercel", "Vercel Analytics", "Playwright", "Vitest"],
    challenges: "The website shares accounts, fares, bookings and messages with the installed apps. Its interface must stay synchronized with database-controlled ride transitions without duplicating the dispatch or payment rules in the browser.",
    security, accent: "blue", cover: website, liveUrl: "https://asistaxi.com",
    connections: [
      { title: "One booking record, several interfaces", description: "The website calls Supabase APIs and RPCs. PostgreSQL stores accounts, rides, driver assignments, fares, reviews and messages; Realtime subscriptions update connected customer and driver views." },
      { title: "Location and routing", description: "Google Maps, Places and route services support map presentation, address lookup and journey estimates. Driver location is supplied by the driver clients." },
      { title: "Payments and account messages", description: "Server-side Edge Functions connect POK payment and webhook workflows, Clerk email-verification challenges and Resend email delivery. The clients consume the resulting account and payment state through the shared backend." },
    ],
    gallery: [{title: "Customer website", description: "Fresh desktop captures of the current local website. Signed-in screens use a disposable local account and seeded ride data.", format: "desktop", images: [website, shot("website-booking", "ASIS TAXI website pickup and destination booking screen", "Customer website · Book a ride"), shot("website-rides", "ASIS TAXI customer website ride history using local demonstration data", "Customer website · Ride history")]}, {title: "Website on mobile", description: "The same customer website at a phone viewport, with responsive navigation and content.", format: "mobile", images: [shot("website-mobile", "ASIS TAXI responsive website home on a mobile browser", "Customer website · Mobile layout")]}, {title: "Shared administration", description: "Existing operations-dashboard captures retained from the previous case study. The admin application manages the platform shared by all four products.", format: "desktop", images: [{src: "/images/asis-taxi/admin-operations-console.png", alt: "ASIS TAXI administration operations console", caption: "Shared backend · Operations"}, {src: "/images/asis-taxi/admin-settings.png", alt: "ASIS TAXI administrator account settings", caption: "Shared backend · Admin settings"}, {src: "/images/asis-taxi/admin-two-factor.png", alt: "ASIS TAXI administration two-factor authentication screen", caption: "Shared backend · Admin verification"}]}],
  },
  {
    slug: "asis-driver-website", title: "ASIS Driver Website", category: "Driver web application", family: true,
    summary: "A dedicated browser workspace for drivers to manage availability, incoming work, active trips and passenger conversations.",
    problem: "Drivers need a role-specific workspace with clear trip controls and live operational information, separate from the public customer website.",
    role: "Built the driver web entry point, role-aware navigation and operational screens on the shared ASIS TAXI backend.",
    features: ["Office-provisioned driver sign-in and account recovery", "Online and offline availability controls", "Driver dashboard and ride-request workflows", "Pickup, arrival, in-trip and completion controls", "Maps, navigation links and live location workflows", "Passenger messaging, trip history and fare information", "Driver profile, settings and English / Albanian translations"],
    stack: [...sharedFrontend, ...sharedBackend, "Supabase Auth", "Google Maps JavaScript API", "Google Places", "Google Routes", "Vercel", "Playwright"],
    challenges: "Driver actions need to remain valid against the server's ride lifecycle and dispatch rules. The browser shares components and contracts with the driver app, while native background location remains an app-specific capability.",
    security, accent: "blue", cover: driverWeb, liveUrl: "https://driver.asistaxi.com",
    connections: [
      {title: "Shared dispatch and conversations", description: "Driver availability, assignment changes and trip actions go through the shared Supabase backend. Customer clients observe the same ride records, and both roles read and send messages within authorized conversations."},
      {title: "Browser location", description: "The web client uses browser location and map integrations. Android foreground-service tracking belongs to the installed driver app and is not a browser capability."},
    ],
    gallery: [{title: "Driver workspace", description: "Fresh desktop captures from the dedicated driver-web application. Authenticated views use the local test driver.", format: "desktop", images: [driverWeb, shot("driver-web-messages", "ASIS Driver website passenger conversations using local demonstration data", "Driver website · Messages"), shot("driver-web-trip", "ASIS Driver website current-trip workspace with local demonstration data", "Driver website · Fare collection")]}],
  },
  {
    slug: "asis-taxi-app", title: "ASIS TAXI App", category: "Customer mobile application", family: true,
    summary: "The customer mobile product: a shared React booking experience packaged with Capacitor and native Android and iOS projects.",
    problem: "Passengers need quick access to booking, ride updates, saved places and their account, with mobile navigation and platform behavior that fit an installed app.",
    role: "Developed the Capacitor customer application, shared customer flows and native integration for app startup, navigation, notifications and device layout.",
    features: ["Mobile booking with pickup, destination, route and fare information", "Scheduled rides, payment-method selection and promotions", "Active-ride tracking, cancellation, history and reviews", "Passenger–driver messaging and saved addresses", "Account verification, profile and password recovery", "Native push integration and app / deep-link handling", "Safe-area insets, keyboard-aware layouts and English / Albanian support"],
    stack: [...sharedFrontend, "Capacitor 7", "Android", "iOS", "Android Studio / Gradle", "Xcode", ...sharedBackend, "Google Maps Platform", "Firebase Cloud Messaging", "Capacitor Push Notifications", "Capacitor App", "Capacitor Browser", "Capacitor Keyboard", "POK Payments", "Playwright"],
    challenges: "The customer app reuses booking and account contracts while providing its own entry point, session storage and mobile styles. Device insets, keyboards and payment-return links must preserve the active session and ride state.",
    security, accent: "blue", cover: customerApp,
    connections: [{title: "Native shell, shared platform", description: "Capacitor packages the React frontend. Supabase provides the same customer account, ride and message data as the website; native plugins bridge app events, push notifications, external browser handling and keyboard behavior."}],
    gallery: [{title: "Customer app interface", description: "Fresh captures of the actual Capacitor app frontend at 390 × 844. Browser captures against local demonstration data; these show the app frontend, not a physical-device capture.", format: "mobile", images: [shot("customer-app-entry", "ASIS TAXI app customer sign-in screen at phone size", "Customer app · Sign in"), customerApp, shot("customer-app-rides", "ASIS TAXI app ride history at phone size with local demonstration data", "Customer app · Ride history")]}],
  },
  {
    slug: "asis-driver-app", title: "ASIS Driver App", category: "Driver Android application", family: true,
    summary: "An Android driver application combining the shared trip workspace with native location tracking and notification integrations.",
    problem: "Driver work continues beyond a single foreground browser tab. The installed app needs to connect operational screens with Android location and app-lifecycle behavior.",
    role: "Developed the Capacitor driver frontend and its integration with Android tracking, shared dispatch APIs, ride transitions and account controls.",
    features: ["Driver authentication and role-specific account access", "Online availability and incoming ride workflows", "Active-trip controls from pickup through completion", "Maps, route information and navigation actions", "Passenger messaging, history and fare summaries", "Custom Android foreground location-tracking service", "Push notifications, session restoration and mobile safe-area handling", "English and Albanian interfaces"],
    stack: [...sharedFrontend, "Capacitor 7", "Android", "Java", "Android Studio / Gradle", "Custom Capacitor Plugin", "Android Foreground Service", ...sharedBackend, "Google Maps Platform", "Firebase Cloud Messaging", "Capacitor Push Notifications", "Capacitor App", "Capacitor Browser", "Playwright"],
    challenges: "The custom AsisDriverTracking plugin connects Android location collection with driver availability and Supabase sessions. The frontend coordinates foreground and background behavior while keeping trip actions consistent with the website and customer app.",
    security, accent: "blue", cover: driverApp,
    connections: [{title: "Android location bridge", description: "AsisDriverTrackingPlugin and AsisDriverTrackingService connect the Capacitor frontend to Android foreground tracking. Authenticated location updates feed the shared driver state used by dispatch and customer ride views."}, {title: "One driver identity", description: "The app and driver website use the same backend role and trip contracts, with app-specific session storage."}],
    gallery: [{title: "Driver app interface", description: "Fresh captures of the actual Capacitor driver frontend at 390 × 844 using the local test driver. Browser captures show the app frontend with local demonstration data.", format: "mobile", images: [driverApp, shot("driver-app-messages", "ASIS Driver app conversation list with local demonstration data", "Driver app · Messages"), shot("driver-app-trip", "ASIS Driver app current-trip interface with local demonstration data", "Driver app · Fare collection")]}],
  },
];
