import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { getProject, projects, type Project, type ProjectImage } from "./data/projects";
import { profile } from "./data/profile";

// The hero illustration brings the Stageshow kit with it, so it loads after the page.
const RideDemo = lazy(() => import("./RideDemo"));

const EMAIL = "huqiadis@gmail.com";
const CV = "/Adis-Huqi-CV.pdf";

type Route = { page: "home" | "projects" | "about" | "contact" | "detail"; slug?: string };

const readRoute = (): Route => {
  const path = location.pathname.replace(/\/+$/, "") || "/";
  if (path.startsWith("/projects/")) return { page: "detail", slug: path.split("/")[2] };
  if (path === "/projects") return { page: "projects" };
  if (path === "/about") return { page: "about" };
  if (path === "/contact") return { page: "contact" };
  return { page: "home" };
};

function navigate(to: string) {
  history.pushState({}, "", to);
  dispatchEvent(new PopStateEvent("popstate"));
  scrollTo(0, 0);
}

function Link({ to, className, current, children }: { to: string; className?: string; current?: boolean; children: ReactNode }) {
  return (
    <a
      href={to}
      className={className}
      aria-current={current ? "page" : undefined}
      onClick={(e) => {
        // Leave new-tab and new-window clicks to the browser.
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        navigate(to);
      }}
    >
      {children}
    </a>
  );
}

const Arrow = ({ out }: { out?: boolean }) => (
  <span className="arrow" aria-hidden="true">
    {out ? "↗" : "→"}
  </span>
);

const family = projects.filter((p) => p.family);
const others = projects.filter((p) => !p.family);
const number = (p: Project) => String(projects.indexOf(p) + 1).padStart(2, "0");

// Placeholder artwork stays in the data for later replacement, but is never shown to visitors.
const isReal = (image: ProjectImage) => !image.src.includes("/placeholders/");
const realGroups = (p: Project) =>
  p.gallery.map((g) => ({ ...g, images: g.images.filter(isReal) })).filter((g) => g.images.length > 0);

/** The screenshots that introduce a project: one desktop capture, or three phone screens. */
function leadShots(p: Project) {
  const group = realGroups(p)[0];
  if (!group) return null;
  return group.format === "mobile"
    ? { mobile: true, images: group.images.slice(0, 3) }
    : { mobile: false, images: [p.cover ?? group.images[0]] };
}

function Shots({ project, decorative }: { project: Project; decorative?: boolean }) {
  const lead = leadShots(project);
  if (!lead) return null;
  return (
    <div className={`shots ${lead.mobile ? "shots-mobile" : "shots-desktop"}`}>
      {lead.images.map((image) => (
        <img key={image.src} src={image.src} alt={decorative ? "" : image.alt} loading="lazy" decoding="async" />
      ))}
    </div>
  );
}

export default function App() {
  const [route, setRoute] = useState(readRoute);
  const [shot, setShot] = useState<ProjectImage | null>(null);
  const main = useRef<HTMLElement>(null);
  const path = location.pathname;
  const focusedPath = useRef(path);

  useEffect(() => {
    const onPop = () => setRoute(readRoute());
    addEventListener("popstate", onPop);
    return () => removeEventListener("popstate", onPop);
  }, []);

  const project = route.page === "detail" ? getProject(route.slug ?? "") : undefined;
  const pageTitle =
    route.page === "home"
      ? null
      : route.page === "detail"
        ? (project?.title ?? "Project not found")
        : { projects: "Work", about: "About", contact: "Contact" }[route.page];

  // A client-side route change is silent to assistive tech unless the title and focus move with it.
  useEffect(() => {
    document.title = pageTitle ? `${pageTitle} — ${profile.name}` : `${profile.name} — ${profile.role}`;
    if (focusedPath.current === path) return;
    focusedPath.current = path;
    main.current?.focus({ preventScroll: true });
  }, [path, pageTitle]);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="wrap">
          <Link to="/" className="brand">
            {profile.name}
          </Link>
          <nav aria-label="Primary">
            <Link to="/projects" current={route.page === "projects" || route.page === "detail"}>
              Work
            </Link>
            <Link to="/about" current={route.page === "about"}>
              About
            </Link>
            <Link to="/contact" current={route.page === "contact"}>
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <main id="main" ref={main} tabIndex={-1}>
        <div className="route" key={path}>
          {route.page === "home" && <Home />}
          {route.page === "projects" && <Projects />}
          {route.page === "about" && <About />}
          {route.page === "contact" && <Contact />}
          {route.page === "detail" && <Detail project={project} open={setShot} />}
        </div>
      </main>

      <footer className="site-footer">
        <div className="wrap">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <a href={profile.githubUrl} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={`mailto:${EMAIL}`}>Email</a>
          <Link to="/contact">Contact</Link>
        </div>
      </footer>

      {shot && <ScreenshotDialog image={shot} close={() => setShot(null)} />}
    </>
  );
}

function Home() {
  return (
    <>
      <section className="hero wrap">
        <p className="kicker">
          {profile.role} · {profile.location}
        </p>
        <h1>
          Software for drivers, cashiers <span className="nowrap">and organizers.</span>
        </h1>
        <div className="hero-body">
          <div className="hero-copy">
            <div className="hero-person">
              <img src="/adis-huqi.jpg" alt="Adis Huqi in graduation attire" width="400" height="400" />
              <p>
                I’m {profile.name}. {profile.tagline}
              </p>
            </div>
            <div className="actions">
              <Link to="/projects" className="button">
                See the work
              </Link>
              <Link to="/contact" className="link">
                Get in touch <Arrow />
              </Link>
            </div>
          </div>
          <RideFigure />
        </div>
      </section>

      <Facts />

      <section className="section wrap" aria-labelledby="work-title">
        <div className="section-head">
          <p className="kicker">Selected work</p>
          <h2 id="work-title">Projects with a job to do.</h2>
        </div>
        <Platform />
        <ol className="work-list">
          {others.filter(leadShots).map((p) => (
            <WorkRow key={p.slug} project={p} />
          ))}
        </ol>
        <p className="section-more">
          <Link to="/projects" className="link">
            All {projects.length} projects <Arrow />
          </Link>
        </p>
      </section>

      <section className="section wrap split" aria-labelledby="approach-title">
        <div>
          <p className="kicker">How I work</p>
          <h2 id="approach-title">From the workflow outward.</h2>
        </div>
        <p className="lead">
          I enjoy working where product decisions meet implementation: mapping the real task, keeping the interface
          calm, and building the less visible foundations—data, access, and integrations—that make it dependable.
        </p>
      </section>

      <section className="section wrap" aria-labelledby="tools-title">
        <div className="section-head">
          <p className="kicker">Tools I reach for</p>
          <h2 id="tools-title">The stack, by layer.</h2>
        </div>
        <dl className="skills">
          {profile.skills.map((group) => (
            <div key={group.group}>
              <dt>{group.group}</dt>
              <dd>{group.items.join(" · ")}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="closing" aria-labelledby="closing-title">
        <div className="wrap">
          <p className="kicker">Start a conversation</p>
          <h2 id="closing-title">Have a product problem worth solving?</h2>
          <a className="mail" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
          <p className="closing-links">
            <Link to="/contact" className="link">
              Other ways to reach me <Arrow />
            </Link>
            <a className="link" href={CV} target="_blank" rel="noreferrer">
              CV (PDF) <Arrow out />
            </a>
          </p>
        </div>
      </section>
    </>
  );
}

function RideFigure() {
  const [run, setRun] = useState(0);
  return (
    <figure className="demo">
      {/* Decorative for assistive tech: the caption says what it shows. */}
      <div className="demo-stage" aria-hidden="true">
        <Suspense fallback={null}>
          <RideDemo key={run} />
        </Suspense>
      </div>
      <figcaption>
        <span>
          Illustration of ASIS TAXI, not a recording: a driver accepts a request in the browser and the customer’s
          phone is notified through the shared backend.
        </span>
        <button type="button" className="replay" onClick={() => setRun((n) => n + 1)}>
          Replay
        </button>
      </figcaption>
    </figure>
  );
}

function Facts() {
  return (
    <dl className="facts wrap">
      {profile.credentials.map((c) => (
        <div key={c.label}>
          <dt>{c.label}</dt>
          <dd>{c.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** ASIS TAXI is one platform in four products, so it is shown once, with a way into each. */
function Platform() {
  const [website, , app] = family;
  return (
    <article className="platform" aria-labelledby="platform-title">
      <div className="platform-art">
        {website.cover && <img className="platform-desktop" src={website.cover.src} alt={website.cover.alt} loading="lazy" decoding="async" />}
        {app.cover && <img className="platform-phone" src={app.cover.src} alt={app.cover.alt} loading="lazy" decoding="async" />}
      </div>
      <div className="platform-copy">
        <p className="kicker">One platform · {family.length} products</p>
        <h3 id="platform-title">ASIS TAXI</h3>
        <p>
          A taxi platform for Durrës and Albania: a customer website, a driver website and two installed apps, all
          working from one shared Supabase backend.
        </p>
        <ol className="platform-list">
          {family.map((p) => (
            <li key={p.slug}>
              <Link to={`/projects/${p.slug}`}>
                <span className="num">{number(p)}</span>
                <span className="platform-name">{p.title}</span>
                <span className="platform-kind">{p.category}</span>
                <Arrow />
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </article>
  );
}

function WorkRow({ project }: { project: Project }) {
  return (
    <li className="work-row">
      <Link to={`/projects/${project.slug}`}>
        <span className="num">{number(project)}</span>
        <span className="work-text">
          <span className="work-kind">{project.category}</span>
          <span className="work-title">
            {project.title} <Arrow />
          </span>
          <span className="work-summary">{project.summary}</span>
        </span>
        <Shots project={project} decorative />
      </Link>
    </li>
  );
}

function Projects() {
  return (
    <section className="page wrap">
      <p className="kicker">All work</p>
      <h1>Work built around real use.</h1>
      <p className="lead">
        A selection of software projects, each with its own context, decisions, and implementation details.
      </p>
      <Platform />
      <ol className="work-list">
        {others.map((p) => (
          <WorkRow key={p.slug} project={p} />
        ))}
      </ol>
    </section>
  );
}

function About() {
  return (
    <section className="page wrap">
      <p className="kicker">About</p>
      <h1>Thoughtful engineering, grounded in the actual task.</h1>
      <div className="about">
        <div className="about-text">
          {profile.intro.map((paragraph, i) => (
            <p key={paragraph} className={i === 0 ? "lead" : undefined}>
              {paragraph}
            </p>
          ))}
        </div>
        <aside className="about-side">
          <img src="/adis-huqi.jpg" alt="Adis Huqi in graduation attire" width="400" height="400" />
          <a className="button" href={CV} target="_blank" rel="noreferrer">
            View my CV (PDF) <Arrow out />
          </a>
          <a className="link" href={profile.githubUrl} target="_blank" rel="noreferrer">
            github.com/{profile.githubUser} <Arrow out />
          </a>
        </aside>
      </div>
      <Facts />
      <h2 className="about-heading">Background</h2>
      <ol className="education">
        {profile.education.map((e) => (
          <li key={e.title}>
            <p className="kicker">{e.period}</p>
            <div>
              <h3>{e.title}</h3>
              <p className="education-place">{e.place}</p>
              <p>{e.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Contact() {
  return (
    <section className="page wrap">
      <p className="kicker">Contact</p>
      <h1>Let’s make something useful.</h1>
      <p className="lead">
        If you have a product, workflow, or interface that needs careful engineering, I’d be glad to hear about it.
      </p>
      <a className="mail" href={`mailto:${EMAIL}`}>
        {EMAIL}
      </a>
      <ul className="contact-rows">
        <li>
          <a href="tel:+355699661428">
            <span className="kicker">Phone</span>
            <span>0699661428</span>
            <Arrow out />
          </a>
        </li>
        <li>
          <a href={profile.githubUrl} target="_blank" rel="noreferrer">
            <span className="kicker">GitHub</span>
            <span>github.com/{profile.githubUser}</span>
            <Arrow out />
          </a>
        </li>
        <li>
          <a href={CV} target="_blank" rel="noreferrer">
            <span className="kicker">CV</span>
            <span>View or download the PDF</span>
            <Arrow out />
          </a>
        </li>
      </ul>
    </section>
  );
}

const LIFECYCLE = ["Searching", "Accepted", "Arriving", "Arrived", "In progress", "Completed"];

function Spec({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="spec">
      <h2 className="kicker">{label}</h2>
      <div className="spec-body">{children}</div>
    </section>
  );
}

function Detail({ project, open }: { project?: Project; open: (image: ProjectImage) => void }) {
  if (!project)
    return (
      <section className="page wrap">
        <p className="kicker">404</p>
        <h1>Project not found.</h1>
        <p className="lead">
          <Link to="/projects" className="link">
            Back to all work <Arrow />
          </Link>
        </p>
      </section>
    );

  const i = projects.indexOf(project);
  const previous = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  const groups = realGroups(project);

  return (
    <article className="detail wrap">
      <header className="detail-head">
        <p className="kicker">
          <span className="num">{number(project)}</span> {project.category}
        </p>
        <h1>{project.title}</h1>
        <p className="lead">{project.summary}</p>
        <div className="actions">
          {project.liveUrl && (
            <a className="button" href={project.liveUrl} target="_blank" rel="noreferrer">
              Visit website <Arrow out />
            </a>
          )}
          {project.github && (
            <a className="button" href={project.github} target="_blank" rel="noreferrer">
              View on GitHub <Arrow out />
            </a>
          )}
          <Link to="/projects" className="link">
            All work <Arrow />
          </Link>
        </div>
      </header>

      <Shots project={project} />

      <Spec label="Problem / goal">
        <p className="lead">{project.problem}</p>
      </Spec>
      <Spec label="My role">
        <p>{project.role}</p>
      </Spec>
      {project.slug === "asis-taxi" && (
        <Spec label="Ride lifecycle">
          <ol className="lifecycle">
            {LIFECYCLE.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </Spec>
      )}
      <Spec label="Key features">
        <ul className="features">
          {project.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </Spec>
      <Spec label="Stack">
        <ul className="tags">
          {project.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Spec>
      <Spec label="Challenges">
        <p>{project.challenges}</p>
      </Spec>
      {project.security && (
        <Spec label="Security & testing">
          <p>{project.security}</p>
        </Spec>
      )}
      {project.connections && (
        <Spec label="How it fits together">
          <div className="connections">
            {project.connections.map((c) => (
              <div key={c.title}>
                <h3>{c.title}</h3>
                <p>{c.description}</p>
              </div>
            ))}
          </div>
        </Spec>
      )}
      {project.family && (
        <Spec label="The ASIS TAXI platform">
          <nav className="family" aria-label="ASIS TAXI products">
            {family
              .filter((p) => p.slug !== project.slug)
              .map((p) => (
                <Link key={p.slug} to={`/projects/${p.slug}`} className="link">
                  {p.title} <Arrow />
                </Link>
              ))}
          </nav>
        </Spec>
      )}

      {groups.length > 0 && (
        <section className="gallery" aria-labelledby="gallery-title">
          <p className="kicker">Interface gallery</p>
          <h2 id="gallery-title">Inside the project.</h2>
          {groups.map((group) => (
            <section key={group.title} className="gallery-group">
              <div className="gallery-intro">
                <h3>{group.title}</h3>
                <p>{group.description}</p>
              </div>
              <div className={`gallery-grid gallery-${group.format ?? "desktop"}`}>
                {group.images.map((image) => (
                  <figure key={image.src}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.currentTarget.focus(); // Safari doesn't focus buttons on click; the dialog returns focus here.
                        open(image);
                      }}
                      aria-label={`Enlarge: ${image.caption || image.alt}`}
                    >
                      <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
                    </button>
                    {image.caption && <figcaption>{image.caption}</figcaption>}
                  </figure>
                ))}
              </div>
            </section>
          ))}
        </section>
      )}

      <nav className="project-nav" aria-label="Project navigation">
        <Link to={`/projects/${previous.slug}`}>
          <span className="kicker">
            <span aria-hidden="true">← </span>Previous
          </span>
          <span className="project-nav-title">{previous.title}</span>
        </Link>
        <Link to={`/projects/${next.slug}`}>
          <span className="kicker">
            Next<span aria-hidden="true"> →</span>
          </span>
          <span className="project-nav-title">{next.title}</span>
        </Link>
      </nav>
    </article>
  );
}

function ScreenshotDialog({ image, close }: { image: ProjectImage; close: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-label="Screenshot preview"
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <button type="button" aria-label="Close screenshot" onClick={close}>
        ×
      </button>
      <figure>
        <img src={image.src} alt={image.alt} />
        {image.caption && <figcaption>{image.caption}</figcaption>}
      </figure>
    </dialog>
  );
}
