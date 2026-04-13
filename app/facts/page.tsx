"use client";

import { useState } from "react";
import { Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ECO_FACTS } from "@/lib/content";

export default function FactsPage() {
  const [currentFact, setCurrentFact] = useState<string>(ECO_FACTS[0]);

  const handleShowAnotherFact = () => {
    if (ECO_FACTS.length < 2) {
      return;
    }

    let nextFact = currentFact;
    while (nextFact === currentFact) {
      const randomIndex = Math.floor(Math.random() * ECO_FACTS.length);
      nextFact = ECO_FACTS[randomIndex];
    }

    setCurrentFact(nextFact);
  };

  return (
    <section className="mx-auto max-w-4xl space-y-8 py-16">
      <Card className="overflow-hidden border-[var(--border)] shadow-[0_12px_26px_rgba(10,20,12,0.35)]">
        <CardHeader className="space-y-3">
          <CardTitle className="text-4xl">Eco Facts</CardTitle>
          <p className="text-lg text-[var(--muted-foreground)]">Quick insights that help make your everyday choices greener.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <Card className="border-[var(--border)] bg-[var(--secondary)]">
            <CardContent className="p-8 text-center">
              <Lightbulb className="mx-auto mb-4 h-10 w-10 text-[var(--primary)]" />
              <p className="text-xl leading-8 text-[var(--foreground)]">{currentFact}</p>
            </CardContent>
          </Card>

          <Separator />

          <Button onClick={handleShowAnotherFact}>Show Another Fact</Button>
        </CardContent>
      </Card>
    </section>
  );
}
