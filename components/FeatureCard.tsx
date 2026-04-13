import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type FeatureCardProps = {
  title: string;
  description: string;
  image: string;
  href: string;
  buttonLabel: string;
  icon: LucideIcon;
};

export default function FeatureCard({ title, description, image, href, buttonLabel, icon: Icon }: FeatureCardProps) {
  return (
    <Card className="group overflow-hidden shadow-[0_10px_24px_rgba(10,20,12,0.35)] hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(76,175,80,0.3)]">
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-all duration-300 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardHeader className="space-y-3">
        <Badge className="w-fit bg-[var(--accent)] text-[var(--accent-foreground)]">
          <Icon className="mr-1 h-3.5 w-3.5" />
          Featured Tool
        </Badge>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild className="w-full sm:w-auto">
          <Link href={href}>
            {buttonLabel}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
