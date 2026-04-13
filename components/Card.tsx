import Image from "next/image";
import { Sparkles } from "lucide-react";
import { Card as UiCard, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CardProps = {
  image: string;
  title: string;
  description: string;
};

export default function Card({ image, title, description }: CardProps) {
  return (
    <UiCard className="group overflow-hidden border-[var(--border)] shadow-[0_10px_24px_rgba(10,20,12,0.35)] hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(76,175,80,0.3)]">
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-all duration-300 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardHeader className="space-y-2">
        <p className="inline-flex w-fit items-center gap-1 rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-semibold text-[var(--accent-foreground)]">
          <Sparkles className="h-3.5 w-3.5" />
          Community Story
        </p>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-[var(--muted-foreground)]">{description}</p>
      </CardContent>
    </UiCard>
  );
}
