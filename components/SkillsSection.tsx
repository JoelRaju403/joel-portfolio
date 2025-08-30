"use client";
import React from "react";

const BLUE = {
  chipBg: "rgba(59,130,246,0.12)",
  chipBorder: "rgba(59,130,246,0.35)",
  chipText: "#93c5fd",
  panelBg: "rgba(12,18,34,0.62)",
  panelBorder: "rgba(147,197,253,0.18)",
};

type Group = { title: string; items: string[] };

const GROUPS: Group[] = [
  {
    title: "Programming",
    items: [
      "Python",
      "Java",
      "JavaScript",
      "R",
      "C",
      "HTML5",
      "TypeScript",
      "CSS",
      "Prolog",
      "SQLite",
    ],
  },
  { title: "JavaScript Libraries", items: ["jQuery", "ReactJS"] },
  {
    title: "Frameworks",
    items: ["NextJS", "Django", "Flask", "Django Rest API"],
  },
  { title: "Tools", items: ["Git", "Docker"] },
  {
    title: "Machine Learning",
    items: ["Scikit-learn", "PyTorch", "NumPy", "Pandas"],
  },
];

function Tag({ label }: { label: string }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "8px 12px",
        borderRadius: 999,
        background: BLUE.chipBg,
        border: `1px solid ${BLUE.chipBorder}`,
        color: BLUE.chipText,
        fontSize: 14,
        fontWeight: 600,
        letterSpacing: 0.2,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

function GroupBlock({ group }: { group: Group }) {
  return (
    <section style={{ padding: "8px 0" }}>
      <h2
        style={{
          margin: 0,
          fontSize: "clamp(18px, 2.2vw, 22px)",
          fontWeight: 800,
          color: "#eaf2ff",
          letterSpacing: 0.3,
        }}
      >
        {group.title}
      </h2>
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 12 }}
      >
        {group.items.map((it) => (
          <Tag key={it} label={it} />
        ))}
      </div>
    </section>
  );
}

export function SkillsSection(): React.ReactElement {
  return (
    <section
      id="skills"
      style={{
        position: "relative",
        zIndex: 1,
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "clamp(24px, 4vw, 64px)",
      }}
    >
      {/* Centered glass panel at ~70% viewport width */}
      <div
        style={{
          width: "clamp(320px, 70vw, 1400px)",
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
            Skills
          </h1>
          <p style={{ margin: "8px 0 0", opacity: 0.9, color: "#d7e8ff" }}>
            A snapshot of languages, frameworks, and tools I work with.
          </p>
        </header>

        {/* Responsive grid */}
        <div
          style={{
            display: "grid",
            gap: 20,
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          }}
        >
          {GROUPS.map((g) => (
            <GroupBlock key={g.title} group={g} />
          ))}
        </div>
      </div>
    </section>
  );
}
