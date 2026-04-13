"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { ExternalLink, ImagePlus } from "lucide-react";
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
import { fetchPosts, savePost, subscribeToPosts, type GalleryPostData, type GalleryPostDocument } from "@/lib/posts";

type FormValues = {
  imageUrl: string;
  title: string;
  description: string;
};

const initialFormValues: FormValues = {
  imageUrl: "",
  title: "",
  description: ""
};

export default function GalleryPage() {
  const [posts, setPosts] = useState<GalleryPostDocument[]>([]);
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [formError, setFormError] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoadingPosts, setIsLoadingPosts] = useState<boolean>(true);
  const [previewError, setPreviewError] = useState<boolean>(false);

  const updateFormValue = (field: keyof FormValues, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    if (field === "imageUrl") {
      setPreviewError(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadInitialPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts();
        if (isMounted) {
          setPosts(fetchedPosts);
        }
      } catch {
        if (isMounted) {
          setFormError("Unable to load posts right now.");
        }
      } finally {
        if (isMounted) {
          setIsLoadingPosts(false);
        }
      }
    };

    loadInitialPosts();

    const unsubscribe = subscribeToPosts(
      (livePosts: GalleryPostDocument[]) => {
        if (!isMounted) {
          return;
        }

        setPosts(livePosts);
        setIsLoadingPosts(false);
      },
      () => {
        if (isMounted) {
          setFormError("Unable to sync posts in real time.");
        }
      }
    );

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedImageUrl = formValues.imageUrl.trim();
    const trimmedTitle = formValues.title.trim();
    const trimmedDescription = formValues.description.trim();

    if (!trimmedImageUrl || !trimmedImageUrl.startsWith("http")) {
      setFormError("Please enter a valid image URL that starts with http.");
      return;
    }

    if (!trimmedTitle || !trimmedDescription) {
      setFormError("Please fill in title and description.");
      return;
    }

    setIsSubmitting(true);
    setFormError("");

    try {
      const postPayload: GalleryPostData = {
        image: trimmedImageUrl,
        title: trimmedTitle,
        description: trimmedDescription,
        createdAt: Date.now()
      };

      await savePost(postPayload);

      setFormValues(initialFormValues);
      setPreviewError(false);
      setIsDialogOpen(false);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown post error";
      setFormError(`Failed to publish post: ${message}`);
    } finally {
      setIsSubmitting(false);
    }
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

                <div className="rounded-lg border border-[var(--border)] bg-[var(--secondary)] p-4 text-sm text-[var(--muted-foreground)]">
                  <p className="font-semibold text-[var(--foreground)]">How to add an image using ImgBB</p>
                  <ol className="mt-2 space-y-1">
                    <li>Step 1: Click the button below to open ImgBB</li>
                    <li>Step 2: Upload your image there</li>
                    <li>Step 3: Copy the "Direct Link"</li>
                    <li>Step 4: Paste the link here</li>
                  </ol>
                  <Button asChild variant="outline" className="mt-3">
                    <a href="https://imgbb.com/" target="_blank" rel="noreferrer">
                      Upload Image (ImgBB)
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>

                <form onSubmit={handleSubmit} className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="imageUrl">Image URL</Label>
                    <Input
                      id="imageUrl"
                      type="text"
                      placeholder="https://i.ibb.co/xxxx/image.jpg"
                      value={formValues.imageUrl}
                      onChange={(event) => updateFormValue("imageUrl", event.target.value)}
                    />
                  </div>

                  {formValues.imageUrl.trim().startsWith("http") ? (
                    <div className="overflow-hidden rounded-xl border border-[var(--border)]">
                      <img
                        src={formValues.imageUrl}
                        alt="Image preview"
                        onError={() => setPreviewError(true)}
                        onLoad={() => setPreviewError(false)}
                        className="h-44 w-full object-cover"
                      />
                      {previewError ? (
                        <p className="p-3 text-sm text-[var(--destructive)]">Preview failed to load. Check your image URL.</p>
                      ) : null}
                    </div>
                  ) : null}

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

                  <Button type="submit" disabled={isSubmitting} className="w-full sm:w-fit">
                    {isSubmitting ? "Publishing..." : "Submit Post"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </UiCard>

      <div className="mx-auto max-w-2xl space-y-6">
        {isLoadingPosts ? (
          <UiCard className="border-[var(--border)] shadow-[0_12px_26px_rgba(10,20,12,0.35)]">
            <CardContent className="p-6 text-center text-[var(--muted-foreground)]">Loading posts...</CardContent>
          </UiCard>
        ) : posts.length === 0 ? (
          <UiCard className="border-[var(--border)] shadow-[0_12px_26px_rgba(10,20,12,0.35)]">
            <CardContent className="p-6 text-center text-[var(--muted-foreground)]">
              No posts yet. Be the first to share!
            </CardContent>
          </UiCard>
        ) : (
          posts.map((post) => (
            <UiCard
              key={post.id}
              className="overflow-hidden border-[var(--border)] shadow-[0_10px_24px_rgba(10,20,12,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(76,175,80,0.3)]"
            >
              <div className="relative h-64 w-full">
                <Image src={post.image} alt={post.title} fill className="rounded-xl object-cover" sizes="100vw" />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[var(--muted-foreground)]">{post.description}</p>
              </CardContent>
            </UiCard>
          ))
        )}
      </div>
    </section>
  );
}
