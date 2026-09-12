// ---------------------------------------------------------------------------
// Edit this file to update the personal / about / skills content on the site.
// Project content lives separately in src/data/projects.ts
// ---------------------------------------------------------------------------

export const profile = {
  name: "Adis Huqi",
  role: "Software Engineer",
  location: "Albania",
  githubUser: "AdisHuqi",
  githubUrl: "https://github.com/AdisHuqi",

  tagline:
    "I build web applications, mobile apps, and practical business software — from ride booking and store sales to event ticketing and rental management.",

  intro: [
    "I'm a Software Engineering graduate of Western Balkans University in Albania (2026), where I finished with a 9.63/10 GPA, President's List honors in my first two years, and the Rector's Honor List at graduation.",
    "Most of what I build starts from an actual operational problem — a driver who needs to see fares in Lek, a cashier who needs a barcode scanner to just work, an organizer who needs to manage event tickets. I like the unglamorous parts: schemas, auth, and the interface someone will actually use under pressure.",
  ],

  // Real, verifiable facts only — no invented metrics.
  credentials: [
    { label: "GPA", value: "9.63 / 10" },
    { label: "Thesis score", value: "98 / 100" },
    { label: "1st & 2nd year", value: "President's List" },
    { label: "Graduation", value: "Rector's Honor List" },
  ],

  education: [
    {
      period: "Graduated 2026",
      title: "B.Sc. Software Engineering",
      place: "Western Balkans University, Albania",
      detail:
        "Graduated with a 9.63/10 GPA. Bachelor thesis: “Design and Implementation of a Cross-Platform Event Ticketing System with Mobile Application and Web Administration Panel,” presented with a score of 98/100.",
    },
  ],

  skills: [
    {
      group: "Languages",
      items: ["TypeScript", "JavaScript", "Dart", "SQL", "Java"],
    },
    {
      group: "Frontend",
      items: ["React", "Flutter", "JavaFX", "Responsive & mobile UI"],
    },
    {
      group: "Backend",
      items: ["Node.js", "Express", "REST API design", "JWT auth"],
    },
    {
      group: "Data & infrastructure",
      items: ["MySQL", "MongoDB", "Supabase"],
    },
    {
      group: "Other",
      items: ["Google Maps platform", "Hardware/POS integration", "Git"],
    },
  ],

  footerNote:
    "Explore more of my software projects and source code on GitHub.",
};

export type Profile = typeof profile;
