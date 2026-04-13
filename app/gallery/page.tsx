"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
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
import { fetchPosts, savePost, subscribeToPosts, type GalleryPostData, type GalleryPostDocument } from "@/lib/posts";
import { uploadImage } from "@/lib/upload";

type FormValues = {
  title: string;
  description: string;
};

const initialFormValues: FormValues = {
  title: "",
  description: ""
};

export default function GalleryPage() {
  const [posts, setPosts] = useState<GalleryPostDocument[]>([]);
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [file, setFile] = useState<File | null>(null);
  const [formError, setFormError] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoadingPosts, setIsLoadingPosts] = useState<boolean>(true);

  const updateFormValue = (field: keyof FormValues, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
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

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] ?? null;

    if (!selectedFile) {
      setFile(null);
      return;
    }

    if (!selectedFile.type.startsWith("image/")) {
      setFormError("Please select a valid image file.");
      setFile(null);
      return;
    }

    setFormError("");
    setFile(selectedFile);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = formValues.title.trim();
    const trimmedDescription = formValues.description.trim();

    if (!file) {
      setFormError("Please upload an image file.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setFormError("Only image files are allowed.");
      return;
    }

    if (!trimmedTitle || !trimmedDescription) {
      setFormError("Please fill in title and description.");
      return;
    }

    setIsSubmitting(true);
    setFormError("");

    try {
      const imageUrl = await uploadImage(file);

      const postPayload: GalleryPostData = {
        image: imageUrl,
        title: trimmedTitle,
        description: trimmedDescription,
        createdAt: Date.now()
      };

      await savePost(postPayload);

      setFormValues(initialFormValues);
      setFile(null);
      setIsDialogOpen(false);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown upload error";
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

                <form onSubmit={handleSubmit} className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="image">Image File</Label>
                    <input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full rounded-lg border border-[var(--input)] bg-[var(--card)] px-4 py-2 text-sm text-[var(--foreground)] file:mr-3 file:rounded-full file:border-0 file:bg-[var(--primary)] file:px-3 file:py-1 file:text-[var(--primary-foreground)]"
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

                  <Button type="submit" disabled={isSubmitting} className="w-full sm:w-fit">
                    {isSubmitting ? "Uploading..." : "Submit Post"}
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
            <div key={post.id} className="transition-all duration-300 hover:-translate-y-0.5">
              <Card image={post.image} title={post.title} description={post.description} />
            </div>
          ))
        )}
      </div>
    </section>
  );
}
