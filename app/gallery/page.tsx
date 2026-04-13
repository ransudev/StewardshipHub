"use client";

import { FormEvent, useState } from "react";
import { ImagePlus } from "lucide-react";
import Card from "@/components/Card";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { INITIAL_GALLERY_POSTS, type GalleryPost } from "@/lib/content";

type FormValues = {
  image: string;
  title: string;
  description: string;
};

const initialFormValues: FormValues = {
  image: "",
  title: "",
  description: ""
};

export default function GalleryPage() {
  const [posts, setPosts] = useState<GalleryPost[]>(INITIAL_GALLERY_POSTS);
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [formError, setFormError] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const updateFormValue = (field: keyof FormValues, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedValues: FormValues = {
      image: formValues.image.trim(),
      title: formValues.title.trim(),
      description: formValues.description.trim()
    };

    if (!trimmedValues.image || !trimmedValues.title || !trimmedValues.description) {
      setFormError("Please fill in all fields before adding a post.");
      return;
    }

    const newPost: GalleryPost = {
      id: Date.now(),
      image: trimmedValues.image,
      title: trimmedValues.title,
      description: trimmedValues.description
    };

    setPosts((prev) => [newPost, ...prev]);
    setFormValues(initialFormValues);
    setFormError("");
    setIsDialogOpen(false);
  };

  return (
    <section className="space-y-8 py-16">
      <UiCard className="border-[var(--border)] shadow-[0_12px_26px_rgba(10,20,12,0.35)]">
        <CardHeader className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <CardTitle className="text-4xl">Eco Gallery</CardTitle>
              <p className="mt-2 text-[var(--muted-foreground)]">
                Scroll through community environmental stories and share your own.
              </p>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <ImagePlus className="mr-2 h-4 w-4" />
                  Add Post
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add a New Eco Post</DialogTitle>
                  <DialogDescription>
                    Share an image, title, and short description to inspire the community.
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={formValues.image}
                      onChange={(event) => updateFormValue("image", event.target.value)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      type="text"
                      placeholder="Title"
                      value={formValues.title}
                      onChange={(event) => updateFormValue("title", event.target.value)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Description"
                      value={formValues.description}
                      onChange={(event) => updateFormValue("description", event.target.value)}
                    />
                  </div>

                  {formError ? (
                    <p className="rounded-lg bg-[color:color-mix(in_srgb,var(--destructive)_14%,var(--card)_86%)] px-3 py-2 text-sm text-[var(--destructive)]">
                      {formError}
                    </p>
                  ) : null}

                  <Button type="submit" className="w-full sm:w-fit">
                    Submit Post
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </UiCard>

      <div className="mx-auto max-w-2xl space-y-6">
        {posts.length === 0 ? (
          <UiCard className="border-[var(--border)] shadow-[0_12px_26px_rgba(10,20,12,0.35)]">
            <CardContent className="p-6 text-center text-[var(--muted-foreground)]">
              No posts yet. Be the first to share!
            </CardContent>
          </UiCard>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="transition-all duration-300 hover:-translate-y-0.5">
              <Card image={post.image} title={post.title} description={post.description} />
            </div>
          ))
        )}
      </div>
    </section>
  );
}
