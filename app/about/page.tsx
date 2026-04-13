import Image from "next/image";
import { Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GROUP_MEMBERS } from "@/lib/content";

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-5xl space-y-8 py-16">
      <Card className="overflow-hidden border-[var(--border)] shadow-[0_12px_26px_rgba(10,20,12,0.35)]">
        <div className="relative h-64 w-full">
          <Image
            src="https://images.unsplash.com/photo-1494173853739-c21f58b16055?auto=format&fit=crop&w=1600&q=80"
            alt="Team planning an environmental community project"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,21,14,0.18)_0%,rgba(14,21,14,0.55)_100%)]" />
          <div className="relative flex h-full items-end p-6 text-[color:color-mix(in_srgb,var(--card)_88%,var(--accent)_12%)]">
            <h1 className="text-4xl font-bold md:text-5xl">About Stewardship Hub</h1>
          </div>
        </div>

        <CardContent className="space-y-8 p-6 md:p-8">
          <p className="text-lg leading-8 text-[var(--muted-foreground)]">
            Stewardship Hub is a student-led platform focused on turning environmental awareness into action.
            We created this project to help communities practice daily stewardship through education,
            interactive learning, and shared sustainability stories.
          </p>

          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--accent)] px-4 py-2 text-[var(--accent-foreground)]">
              <Users className="h-4 w-4" />
              <span className="text-sm font-semibold">Group Members</span>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {GROUP_MEMBERS.map((member) => (
                <Card key={member} className="border-[var(--border)] bg-[var(--secondary)]">
                  <CardHeader className="p-4">
                    <CardTitle className="text-xl text-[var(--secondary-foreground)]">{member}</CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          <Badge className="bg-[var(--accent)] px-4 py-2 text-sm text-[var(--accent-foreground)]">
            Building a cleaner future through simple collective action
          </Badge>
        </CardContent>
      </Card>
    </section>
  );
}
