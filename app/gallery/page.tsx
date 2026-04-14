"use client";

import { useState } from "react";
import { ClipboardList, ExternalLink, ImageUp, ListChecks, PenSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card as UiCard, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

type GalleryFeedPost = {
  id: string;
  image: string;
  title: string;
  description: string;
};

const sampleFeedPosts: GalleryFeedPost[] = [
  {
    id: "post-1",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80",
    title: "Community Tree Planting Day",
    description: "Volunteers planted native trees along local streets to improve shade and biodiversity."
  },
  {
    id: "post-2",
    image: "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&w=1600&q=80",
    title: "Neighborhood Cleanup Drive",
    description: "Residents collected and sorted plastic waste from parks and sidewalks for proper disposal."
  },
  {
    id: "post-3",
    image: "https://images.unsplash.com/photo-1492496913980-501348b61469?auto=format&fit=crop&w=1600&q=80",
    title: "School Eco Garden",
    description: "Students grew vegetables using compost and learned practical sustainability habits together."
  }
];

const submissionSteps = [
  {
    icon: ExternalLink,
    text: "Click the button below to open the submission form"
  },
  {
    icon: PenSquare,
    text: "Fill out the required details"
  },
  {
    icon: ImageUp,
    text: "Upload your image"
  },
  {
    icon: ClipboardList,
    text: "Submit your entry"
  }
];

export default function GalleryPage() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  return (
    <section className="space-y-8 py-16">
      <UiCard className="border-[var(--border)] shadow-[0_12px_26px_rgba(10,20,12,0.35)]">
        <CardHeader className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <CardTitle className="text-4xl">Eco Gallery</CardTitle>
              <p className="mt-2 text-[var(--muted-foreground)]">
                Scroll through community environmental stories and shared stewardship actions.
              </p>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <ListChecks className="mr-2 h-4 w-4" />
                  Add Post
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader className="text-center">
                  <DialogTitle>Submit Your Post</DialogTitle>
                  <DialogDescription>Follow these steps to share your environmental action.</DialogDescription>
                </DialogHeader>

                <div className="space-y-3">
                  {submissionSteps.map((step, index) => (
                    <div
                      key={step.text}
                      className="flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--secondary)] px-4 py-3"
                    >
                      <div className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--primary)]">
                        <step.icon className="h-4 w-4" />
                      </div>
                      <p className="text-sm text-[var(--foreground)]">
                        <span className="font-semibold text-[var(--primary)]">{index + 1}.</span> {step.text}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center pt-2">
                  <Button asChild className="transition-all duration-300 hover:scale-105">
                    <a href="https://forms.gle/ufUKvowEh8dwcL947" target="_blank" rel="noreferrer">
                      Open Submission Form
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </UiCard>

      <div className="mx-auto max-w-2xl space-y-6">
        {sampleFeedPosts.map((post) => (
          <UiCard
            key={post.id}
            className="overflow-hidden border-[var(--border)] shadow-[0_10px_24px_rgba(10,20,12,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(76,175,80,0.3)]"
          >
            <div className="h-64 w-full">
              <img src={post.image} alt={post.title} referrerPolicy="no-referrer" className="h-full w-full rounded-xl object-cover" />
            </div>
            <CardHeader>
              <CardTitle className="text-2xl">{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[var(--muted-foreground)]">{post.description}</p>
            </CardContent>
          </UiCard>
        ))}
      </div>
    </section>
  );
}
