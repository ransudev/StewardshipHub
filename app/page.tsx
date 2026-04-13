"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Lightbulb, Recycle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const featureCards = [
  {
    title: "Interactive Waste Sorting Game",
    description: "Build stronger habits by sorting everyday items into the right bins.",
    href: "/game",
    buttonLabel: "Play Game",
    icon: Recycle
  },
  {
    title: "Did You Know Facts",
    description: "Discover short, practical insights that make eco-action easier every day.",
    href: "/facts",
    buttonLabel: "Read Facts",
    icon: Lightbulb
  },
  {
    title: "Community Gallery",
    description: "Explore and share stories of local actions creating measurable impact.",
    href: "/gallery",
    buttonLabel: "View Gallery",
    icon: Users
  }
];

export default function HomePage() {
  const handleScrollDown = () => {
    const nextSection = document.getElementById("home-editorial");
    nextSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="space-y-0">
      <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-screen w-screen overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=2200&q=80"
          alt="Misty forest landscape"
          fill
          priority
          className="animate-slowzoom object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(31,38,30,0.72)_0%,rgba(57,69,52,0.56)_42%,rgba(78,65,45,0.42)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,12,7,0.42)_0%,rgba(28,42,31,0.26)_48%,rgba(10,18,11,0.62)_100%)]" />

        <div className="relative flex h-full items-center justify-center px-4 text-center">
          <div className="space-y-4 animate-fadeInUp text-[color:color-mix(in_srgb,var(--foreground)_85%,var(--card)_15%)]">
            <p className="text-sm uppercase tracking-[0.28em]">Stewardship Hub</p>
            <h1 className="mx-auto max-w-4xl text-5xl font-semibold leading-[1.1] drop-shadow-[0_0_20px_rgba(76,175,80,0.22)] md:text-7xl">
              Small Actions, Lasting Impact
            </h1>
            <p className="mx-auto max-w-xl text-base text-[var(--muted-foreground)] md:text-lg">
              Practical environmental habits, presented with calm intention.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleScrollDown}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 rounded-full border border-[color:color-mix(in_srgb,var(--border)_65%,transparent)] bg-[color:color-mix(in_srgb,var(--card)_22%,transparent)] p-3 text-[var(--primary)] shadow-[0_0_20px_rgba(76,175,80,0.3)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:scale-105"
          aria-label="Scroll to next section"
        >
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </button>
      </section>

      <section id="home-editorial" className="bg-[var(--secondary)] py-24">
        <div className="pointer-events-none absolute left-8 top-[calc(100vh+6rem)] h-40 w-40 rounded-full bg-[color:color-mix(in_srgb,var(--primary)_30%,transparent)] blur-3xl" />
        <div className="pointer-events-none absolute right-12 top-[calc(100vh+18rem)] h-44 w-44 rounded-full bg-[color:color-mix(in_srgb,var(--accent)_28%,transparent)] blur-3xl" />
        <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
          <h2 className="text-4xl font-semibold leading-tight text-[var(--foreground)] md:text-5xl">An Editorial Approach to Stewardship</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-[var(--muted-foreground)]">
            Stewardship Hub blends learning, interaction, and community stories into one soft, nature-inspired
            experience that encourages thoughtful action.
          </p>
        </div>
      </section>

      <section className="bg-[var(--background)] py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="mb-12 text-center">
            <h3 className="text-4xl font-semibold text-[var(--foreground)] md:text-5xl">Explore the Platform</h3>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--muted-foreground)]">
              Move gently through features designed to educate, inspire, and support everyday environmental care.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {featureCards.map((feature) => (
              <Card
                key={feature.title}
                className="group border-[var(--border)] bg-[var(--card)] shadow-[0_10px_26px_rgba(10,20,12,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(76,175,80,0.3)]"
              >
                <CardHeader>
                  <div className="mb-2 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[color:color-mix(in_srgb,var(--secondary)_72%,var(--card)_28%)] text-[var(--primary)] shadow-[0_0_20px_rgba(76,175,80,0.24)]">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-2xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base leading-7 text-[var(--muted-foreground)]">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="rounded-full">
                    <Link href={feature.href}>{feature.buttonLabel}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
