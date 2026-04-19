
"use client";

import { useState } from "react";
import { STEWARDSHIP_TOPICS, type StewardshipTopic } from "@/lib/content";


const CATEGORY_COLORS: Record<string, { badge: string; stat: string; dot: string }> = {
  blue:  { badge: "bg-blue-900/40 text-blue-300",   stat: "bg-blue-900/20",  dot: "bg-blue-400" },
  green: { badge: "bg-green-900/40 text-green-300",  stat: "bg-green-900/20", dot: "bg-green-400" },
  amber: { badge: "bg-amber-900/40 text-amber-300",  stat: "bg-amber-900/20", dot: "bg-amber-400" },
  teal:  { badge: "bg-teal-900/40 text-teal-300",    stat: "bg-teal-900/20",  dot: "bg-teal-400" },
  red:   { badge: "bg-red-900/40 text-red-300",      stat: "bg-red-900/20",   dot: "bg-red-400" },
};


function DetailPanel({ topic }: { topic: StewardshipTopic }) {
  const colors = CATEGORY_COLORS[topic.categoryColor] ?? CATEGORY_COLORS.blue;

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 md:p-8">

      {/* Category badge — colour comes from categoryColor in content.ts */}
      <span className={`mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold ${colors.badge}`}>
        {topic.category}
      </span>

      {/*  title comes from topic.title in content.ts */}
      <h1 className="mb-3 font-serif text-2xl font-bold text-[var(--foreground)] md:text-3xl">
        {topic.title}
      </h1>

      {/*  lead paragraph — the alarming opener */}
      <p className="mb-5 text-base leading-relaxed text-[var(--muted-foreground)] md:text-lg">
        {topic.lead}
      </p>

      {/* ── Stat boxes ── */}
      {/* numbers and labels come from topic.stats in content.ts */}
      <div className="mb-6 grid grid-cols-2 gap-3">
        {topic.stats.map((stat) => (
          <div
            key={stat.label}
            className={`rounded-lg p-4 ${colors.stat}`}
          >
            <p className="text-2xl font-bold text-[var(--foreground)]">{stat.number}</p>
            <p className="mt-1 text-xs text-[var(--muted-foreground)]">{stat.label}</p>
          </div>
        ))}
      </div>

      {/*  body paragraph — deeper context */}
      <p className="mb-6 text-sm leading-relaxed text-[var(--muted-foreground)]">
        {topic.body}
      </p>

      {/* What you can do  */}
      <div className="mb-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">
          What you can do
        </p>
        {/*  action items found in actions in content.ts */}
        <ul className="space-y-3">
          {topic.actions.map((action) => (
            <li key={action} className="flex items-start gap-3 text-sm text-[var(--foreground)]">
              <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${colors.dot}`} />
              {action}
            </li>
          ))}
        </ul>
      </div>

      {/* Sources */}
      {topic.sources && topic.sources.length > 0 && (
        <div className="border-t border-[var(--border)] pt-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">
            Sources
          </p>
          <ul className="space-y-2">
            {topic.sources.map((source) => (
              <li key={source} className="text-xs text-[var(--muted-foreground)]">
                {source}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// Main page 
export default function FactsPage() {

  const [activeIndex, setActiveIndex] = useState(0);
  const activeTopic = STEWARDSHIP_TOPICS[activeIndex];

  return (
    <section className="mx-auto max-w-6xl space-y-6 py-16">

      {/* Page heading */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-[var(--foreground)] md:text-4xl">
          Stewardship Facts
        </h1>
        <p className="mt-2 text-[var(--muted-foreground)]">
          Real issues. Real data. What you can do today.
        </p>
      </div>

      {/* ── Two-column layout ── */}
      {/* On mobile this stacks vertically. On md+ screens it's side by side. */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start">

        {/* ── Sidebar ── */}
        {/* List of topic buttons. Clicking one updates activeIndex. */}
        <aside className="flex flex-row gap-2 overflow-x-auto md:w-56 md:shrink-0 md:flex-col">
          {STEWARDSHIP_TOPICS.map((topic, index) => (
            <button
              key={topic.id}
              onClick={() => setActiveIndex(index)}
              className={`flex items-center gap-3 rounded-lg border px-3 py-3 text-left transition-all duration-150
                ${activeIndex === index
                  // Active state styling
                  ? "border-[var(--primary)] bg-[var(--secondary)] text-[var(--foreground)]"
                  // Inactive state styling
                  : "border-transparent text-[var(--muted-foreground)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)]"
                }`}
            >
              {/* ✏️ icon comes from topic.icon in content.ts */}
              <span className="text-lg">{topic.icon}</span>
              <div className="min-w-0">
                {/* ✏️ label comes from topic.sidebarLabel in content.ts */}
                <p className="truncate text-sm font-medium">{topic.sidebarLabel}</p>
              </div>
            </button>
          ))}
        </aside>

        {/* ── Detail panel ── */}
        {/* Fills the remaining space and renders the selected topic */}
        <div className="flex-1">
          <DetailPanel topic={activeTopic} />
        </div>

      </div>
    </section>
  );
}
