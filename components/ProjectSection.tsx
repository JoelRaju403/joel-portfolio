"use client";
import React from "react";
import Image from "next/image";

const BLUE = {
  pillFrom: "#38bdf8",
  pillTo: "#2563eb",
  chipBg: "rgba(59,130,246,0.12)",
  chipBorder: "rgba(59,130,246,0.35)",
  chipText: "#93c5fd",
  panelBg: "rgba(12,18,34,0.62)",
  panelBorder: "rgba(147,197,253,0.18)",
};

type Project = {
  title: string;
  href: string;
  image: string;
  summary: string;
  tags?: string[];
};

const PROJECTS: Project[] = [
  {
    title: "Wordle Clone",
    href: "Wordle/wordle.html",
    image: "/wordle.png",
    summary: "A Wordle clone, where players guess a four letter word.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
  },
  {
    title: "Quizlet Clone",
    href: "https://github.com/JoelRaju403/agileproject",
    image: "/quizlet.png",
    summary:
      "A web application that allows users to create, study, and share flashcards for effective learning.",
    tags: ["HTML5", "CSS3", "JavaScript", "OpenAI API"],
  },
  {
    title: "Co-Exist",
    href: "https://github.com/codersforcauses/coexist",
    image: "/CoExist.png",
    summary:
      "A web plaform where users can register to find coexist events near them.",
    tags: ["Next.js", "Django", "Tailwind"],
  },
  {
    title: "WaJo",
    href: "https://github.com/codersforcauses/coexist",
    image: "/WAJO.png",
    summary:
      "A Web-App based quiz platform for the Western Australian Junior Olympiad. Users can take quizzes, view scores, and track progress over time.",
    tags: ["Django", "REST API", "Docker"],
  },
  {
    title: "ICRAR Dashboard",
    href: "https://www.icrar.org/",
    image: "/ICRAR.png",
    summary:
      "Data visualisation dashboard for monitoring astronomical data and telescope status. Developed for the International Centre for Radio Astronomy Research.",
    tags: ["Next.js", "Shadcn", "Flask"],
  },
];

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
        fontWeight: 500,
      }}
    >
      {label}
    </span>
  );
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <a
      href={p.href}
      target="_blank"
      rel="noreferrer noopener"
      style={{
        display: "block",
        background: "rgba(24, 28, 40, 0.72)",
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
        borderRadius: 16,
        overflow: "hidden",
        textDecoration: "none",
        color: "inherit",
        transition: "transform .25s ease, box-shadow .25s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform =
          "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform =
          "translateY(0)";
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", aspectRatio: "16/9" }}>
        <Image
          src={p.image}
          alt={p.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          style={{ objectFit: "cover" }}
          priority={false}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0.05))",
          }}
        />
      </div>

      {/* Content */}
      <div style={{ padding: 16 }}>
        <h3
          style={{
            margin: 0,
            fontSize: 18,
            fontWeight: 700,
            color: "#e7e7ef",
          }}
        >
          {p.title}
        </h3>
        <p style={{ margin: "8px 0 0", color: "#d6d6e7", lineHeight: 1.6 }}>
          {p.summary}
        </p>
        {p.tags?.length ? (
          <div
            style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}
          >
            {p.tags.map((t) => (
              <Tag key={t} label={t} />
            ))}
          </div>
        ) : null}
      </div>
    </a>
  );
}

function ComingSoonCard() {
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        background: "rgba(24, 28, 40, 0.72)",
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
        borderRadius: 16,
        display: "grid",
        placeItems: "center",
        minHeight: 240,
      }}
    >
      {/* shimmering gradient */}
      <div className="shimmer" />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          padding: 24,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "10px 16px",
            borderRadius: 999,
            background: `linear-gradient(135deg, ${BLUE.pillFrom}, ${BLUE.pillTo})`,
            color: "#fff",
            fontWeight: 700,
            boxShadow: "0 6px 20px rgba(37,99,235,0.35)",
          }}
        >
          Coming soon
        </div>
        <p
          style={{
            marginTop: 12,
            color: "#cfe4ff",
            opacity: 0.9,
          }}
        >
          New project drops here shortly.
        </p>
      </div>

      <style jsx>{`
        .shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            120deg,
            rgba(37, 99, 235, 0.15),
            rgba(56, 189, 248, 0.12),
            rgba(37, 99, 235, 0.15)
          );
          background-size: 200% 100%;
          animation: shimmer 3.2s linear infinite, float 6s ease-in-out infinite;
        }
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
      `}</style>
    </div>
  );
}

/** Section you can reuse anywhere */
export function ProjectsSection(): React.ReactElement {
  return (
    <section
      id="projects"
      style={{
        position: "relative",
        zIndex: 1,
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
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
            Projects
          </h1>
          <p style={{ margin: "8px 0 0", opacity: 0.9, color: "#d7e8ff" }}>
            Selected work and experiments.
          </p>
        </header>

        <div
          style={{
            display: "grid",
            gap: 18,
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          }}
        >
          {PROJECTS.map((p) => (
            <ProjectCard key={p.title} p={p} />
          ))}
          <ComingSoonCard />
        </div>
      </div>
    </section>
  );
}
