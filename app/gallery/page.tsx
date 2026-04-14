"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Clipboard, Download, Edit3, ExternalLink, ImagePlus, ListChecks, Trash2 } from "lucide-react";
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
import postsData from "@/data/posts.json";

type GalleryPost = {
  id: number;
  image: string;
  title: string;
  description: string;
};

type FormValues = {
  title: string;
  description: string;
};

const ADMIN_QUERY_KEY = "admin";
const ADMIN_QUERY_VALUE = "hub-dev";

const initialFormValues: FormValues = {
  title: "",
  description: ""
};

const submissionSteps = [
  "Click the button below to open the submission form",
  "Fill in your title and description",
  "Upload your image",
  "Submit your entry"
];

export default function GalleryPage() {
  const [isAdminPanel, setIsAdminPanel] = useState<boolean>(false);

  const [posts, setPosts] = useState<GalleryPost[]>(postsData as GalleryPost[]);
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [formError, setFormError] = useState<string>("");

  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [editingPostId, setEditingPostId] = useState<number | null>(null);

  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [isSubmissionInfoOpen, setIsSubmissionInfoOpen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const exportJson = JSON.stringify(posts, null, 2);

  useEffect(() => {
    const updateAdminMode = () => {
      const params = new URLSearchParams(window.location.search);
      setIsAdminPanel(params.get(ADMIN_QUERY_KEY) === ADMIN_QUERY_VALUE);
    };

    updateAdminMode();
    window.addEventListener("popstate", updateAdminMode);

    return () => {
      window.removeEventListener("popstate", updateAdminMode);
    };
  }, []);

  const resetForm = () => {
    setFormValues(initialFormValues);
    setFile(null);
    setImagePreview("");
    setFormError("");
    setEditingPostId(null);
  };

  const handleDialogChange = (open: boolean) => {
    setIsEditorOpen(open);
    if (!open) {
      resetForm();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] ?? null;
    setFile(selectedFile);

    if (!selectedFile) {
      setImagePreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setImagePreview(objectUrl);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = formValues.title.trim();
    const trimmedDescription = formValues.description.trim();

    if (!trimmedTitle || !trimmedDescription) {
      setFormError("Please fill in title and description.");
      return;
    }

    if (!editingPostId && !file) {
      setFormError("Please select an image file.");
      return;
    }

    if (editingPostId) {
      const updatedPosts = posts.map((post) => {
        if (post.id !== editingPostId) {
          return post;
        }

        return {
          ...post,
          title: trimmedTitle,
          description: trimmedDescription,
          image: file ? `/images/${file.name}` : post.image
        };
      });

      setPosts(updatedPosts);
      handleDialogChange(false);
      return;
    }

    const newPost: GalleryPost = {
      id: Date.now(),
      image: `/images/${file!.name}`,
      title: trimmedTitle,
      description: trimmedDescription
    };

    setPosts([newPost, ...posts]);
    handleDialogChange(false);
  };

  const handleEdit = (post: GalleryPost) => {
    setEditingPostId(post.id);
    setFormValues({ title: post.title, description: post.description });
    setFile(null);
    setImagePreview(post.image);
    setFormError("");
    setIsEditorOpen(true);
  };

  const handleDelete = (id: number) => {
    const shouldDelete = window.confirm("Delete this post?");
    if (!shouldDelete) {
      return;
    }

    const nextPosts = posts.filter((post) => post.id !== id);
    setPosts(nextPosts);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(exportJson);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

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

            {isAdminPanel ? (
              <div className="flex flex-wrap gap-2">
                <Dialog open={isExportOpen} onOpenChange={setIsExportOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Export Posts
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Export Posts JSON</DialogTitle>
                      <DialogDescription>Copy this output into your posts file.</DialogDescription>
                    </DialogHeader>
                    <Textarea value={exportJson} readOnly className="min-h-[280px] font-mono text-xs" />
                    <Button onClick={handleCopy}>
                      <Clipboard className="mr-2 h-4 w-4" />
                      {copied ? "Copied" : "Copy to Clipboard"}
                    </Button>
                  </DialogContent>
                </Dialog>

                <Dialog open={isEditorOpen} onOpenChange={handleDialogChange}>
                  <DialogTrigger asChild>
                    <Button>
                      <ImagePlus className="mr-2 h-4 w-4" />
                      Add Post
                    </Button>
                  </DialogTrigger>

                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{editingPostId ? "Edit Post" : "Create Post"}</DialogTitle>
                      <DialogDescription>
                        Local dev only: create gallery entries and export JSON for code integration.
                      </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="image">Image Upload</Label>
                        <input
                          id="image"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="w-full rounded-lg border border-[var(--input)] bg-[var(--card)] px-4 py-2 text-sm text-[var(--foreground)] file:mr-3 file:rounded-full file:border-0 file:bg-[var(--primary)] file:px-3 file:py-1 file:text-[var(--primary-foreground)]"
                        />
                      </div>

                      {imagePreview ? (
                        <div className="overflow-hidden rounded-xl border border-[var(--border)]">
                          <img src={imagePreview} alt="Preview" className="h-44 w-full object-cover" />
                        </div>
                      ) : null}

                      <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          type="text"
                          placeholder="Title"
                          value={formValues.title}
                          onChange={(event) => setFormValues((prev) => ({ ...prev, title: event.target.value }))}
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Description"
                          value={formValues.description}
                          onChange={(event) => setFormValues((prev) => ({ ...prev, description: event.target.value }))}
                        />
                      </div>

                      {formError ? (
                        <p className="rounded-lg bg-[color:color-mix(in_srgb,var(--destructive)_14%,var(--card)_86%)] px-3 py-2 text-sm text-[var(--destructive)]">
                          {formError}
                        </p>
                      ) : null}

                      <Button type="submit">{editingPostId ? "Save Changes" : "Create Post"}</Button>
                    </form>

                    <div className="rounded-lg border border-[var(--border)] bg-[var(--secondary)] p-4 text-sm text-[var(--muted-foreground)]">
                      <p className="font-semibold text-[var(--foreground)]">After creating a post:</p>
                      <ol className="mt-2 space-y-1">
                        <li>1. Move your image into /public/images/</li>
                        <li>2. Make sure filename matches</li>
                        <li>3. Copy exported JSON into your posts file</li>
                      </ol>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            ) : (
              <Dialog open={isSubmissionInfoOpen} onOpenChange={setIsSubmissionInfoOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <ListChecks className="mr-2 h-4 w-4" />
                    Add Post
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Submit Your Post</DialogTitle>
                    <DialogDescription>
                      Share your environmental action by submitting through our form.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-2 rounded-lg border border-[var(--border)] bg-[var(--secondary)] p-4 text-sm text-[var(--foreground)]">
                    {submissionSteps.map((step, index) => (
                      <p key={step}>
                        <span className="font-semibold text-[var(--primary)]">{index + 1}.</span> {step}
                      </p>
                    ))}
                    <p className="pt-2 text-xs text-[var(--muted-foreground)]">
                      All submissions are reviewed before being added to the gallery.
                    </p>
                  </div>

                  <Button asChild className="w-full sm:w-fit">
                    <a href="https://forms.gle/ufUKvowEh8dwcL947" target="_blank" rel="noreferrer">
                      Open Submission Form
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardHeader>
      </UiCard>

      <div className="mx-auto max-w-2xl space-y-6">
        {posts.length === 0 ? (
          <UiCard className="border-[var(--border)] shadow-[0_12px_26px_rgba(10,20,12,0.35)]">
            <CardContent className="p-6 text-center text-[var(--muted-foreground)]">
              No posts yet. Use Add Post to create local entries.
            </CardContent>
          </UiCard>
        ) : (
          posts.map((post) => (
            <UiCard
              key={post.id}
              className="overflow-hidden border-[var(--border)] shadow-[0_10px_24px_rgba(10,20,12,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(76,175,80,0.3)]"
            >
              <div className="h-64 w-full">
                <img src={post.image} alt={post.title} className="h-full w-full rounded-xl object-cover" />
              </div>
              <CardHeader className="space-y-4">
                <div>
                  <CardTitle className="text-2xl">{post.title}</CardTitle>
                </div>
                {isAdminPanel ? (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(post)}>
                      <Edit3 className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(post.id)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                ) : null}
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
