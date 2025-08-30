"use client";
import React from "react";

type Experience = {
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  dates: string;
  summary: string;
  tags: string[];
};

const EXPERIENCES: Experience[] = [
  {
    role: "Project Member",
    company: "Coders for Causes",
    companyUrl: "https://codersforcauses.org",
    location: "Perth, WA",
    dates: "Jun 2024 – Feb 2025",
    summary:
      "Helped create full-stack event management applications for non-profit organisations via Coders for Causes—Next.js + Tailwind UI with a Django + REST API backend—implementing RSVP flows, authentication, and automated API tests for dependable releases.",
    tags: ["Next.js", "Tailwind", "Django", "Django REST", "API Testing"],
  },
  {
    role: "Artificial Intelligence Development & Research Intern",
    company: "Indigo Australasia Inc.",
    companyUrl: "https://www.indigowa.com.au/",
    location: "Perth, WA",
    dates: "Nov 2023 – Dec 2023",
    summary:
      "Led a 100-hour review of AI in aged care and healthcare, uncovering process-improvement opportunities and delivering stakeholder-ready recommendations to guide responsible adoption.",
    tags: ["AI Research", "Healthcare", "Strategy"],
  },
];

// Blue theme tokens
const BLUE = {
  pillFrom: "#38bdf8",
  pillTo: "#2563eb",
  chipBg: "rgba(59,130,246,0.12)",
  chipBorder: "rgba(59,130,246,0.35)",
  chipText: "#93c5fd",
  link: "#60a5fa",
  panelBg: "rgba(12,18,34,0.62)",
  panelBorder: "rgba(147,197,253,0.18)",
};

function DatePill({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${BLUE.pillFrom}, ${BLUE.pillTo})`,
        color: "white",
        fontWeight: 600,
        padding: "10px 16px",
        borderRadius: 999,
        boxShadow: "0 6px 20px rgba(37, 99, 235, 0.35)",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </div>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "6px 10px",
        borderRadius: 999,
        background: BLUE.chipBg,
        border: `1px solid ${BLUE.chipBorder}`,
        color: BLUE.chipText,
        fontSize: 13,
        fontWeight: 600,
      }}
    >
      {label}
    </span>
  );
}

function ExperienceCard({ item }: { item: Experience }) {
  return (
    <article
      style={{
        background: "rgba(24, 28, 40, 0.72)",
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
        borderRadius: 16,
        padding: "clamp(18px, 3.2vw, 28px)",
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 16,
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <div style={{ minWidth: 240 }}>
          <h3
            style={{
              margin: 0,
              fontSize: "clamp(18px, 2.2vw, 24px)",
              fontWeight: 800,
              color: "#e7e7ef",
            }}
          >
            {item.role}
          </h3>
          <a
            href={item.companyUrl}
            target="_blank"
            rel="noreferrer noopener"
            style={{
              display: "inline-block",
              marginTop: 6,
              color: BLUE.link,
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            {item.company}
          </a>
          <div style={{ opacity: 0.8, fontSize: 13, marginTop: 2 }}>
            {item.location}
          </div>
        </div>
        <DatePill>{item.dates}</DatePill>
      </header>

      <p style={{ margin: "14px 0 0", color: "#d6d6e7", lineHeight: 1.7 }}>
        {item.summary}
      </p>

      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 14 }}
      >
        {item.tags.map((t) => (
          <Tag key={t} label={t} />
        ))}
      </div>
    </article>
  );
}

export function AboutPage(): React.ReactElement {
  return (
    <section
      id="about"
      style={{
        position: "relative",
        zIndex: 1,
        padding: "clamp(24px, 4vw, 64px)",
      }}
    >
      <div
        style={{
          width: "min(1100px, 94vw)",
          margin: "0 auto",
          background: BLUE.panelBg,
          border: `1px solid ${BLUE.panelBorder}`,
          borderRadius: 20,
          boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
          backdropFilter: "blur(10px) saturate(140%)",
          WebkitBackdropFilter: "blur(10px) saturate(140%)",
          padding: "clamp(22px, 4vw, 38px)",
        }}
      >
        <header style={{ marginBottom: 18 }}>
          <h1
            style={{
              margin: 0,
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 800,
              color: "#eaf2ff",
              textShadow: "0 1px 0 rgba(0,0,0,0.25)",
            }}
          >
            Experience
          </h1>
          <p style={{ margin: "8px 0 0", opacity: 0.9, color: "#d7e8ff" }}>
            A snapshot of recent roles and work.
          </p>
        </header>

        <div style={{ display: "grid", gap: 20 }}>
          {EXPERIENCES.map((e) => (
            <ExperienceCard key={e.role + e.dates} item={e} />
          ))}
        </div>
      </div>
    </section>
  );
}
