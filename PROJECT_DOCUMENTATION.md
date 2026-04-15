# StewardshipHub - Complete Code Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [File Structure](#file-structure)
3. [Architecture](#architecture)
4. [Key Technologies](#key-technologies)
5. [Detailed File Breakdown](#detailed-file-breakdown)
6. [How to Edit and Effects](#how-to-edit-and-effects)

---

## Project Overview

**StewardshipHub** is a Next.js-based environmental learning platform designed to encourage sustainable practices through three main features:

- **Interactive Waste Sorting Game** - Teaches users proper waste classification
- **Eco Facts** - Displays educational environmental tips
- **Community Gallery** - Allows users to share sustainability stories

The application emphasizes a "calm intention" approach with nature-inspired design, interactive learning, and community engagement.

---

## File Structure

```
StewardshipHub/
├── app/                          # Next.js App Router (routing structure)
│   ├── layout.tsx               # Root layout (applies to all pages)
│   ├── page.tsx                 # Home page (/ route)
│   ├── globals.css              # Global styles
│   ├── about/
│   │   └── page.tsx             # About page (/about route)
│   ├── facts/
│   │   └── page.tsx             # Facts page (/facts route)
│   ├── gallery/
│   │   └── page.tsx             # Gallery page (/gallery route)
│   └── game/
│       └── page.tsx             # Game page (/game route)
│
├── components/                   # Reusable React components
│   ├── Navbar.tsx               # Navigation bar
│   ├── Bin.tsx                  # Waste bin component for game
│   ├── Card.tsx                 # Custom card component
│   ├── FeatureCard.tsx          # Feature showcase card
│   ├── GameItem.tsx             # Draggable waste item in game
│   └── ui/                      # Shadcn/ui components (pre-built)
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── separator.tsx
│       └── textarea.tsx
│
├── lib/                          # Utility functions and data
│   ├── content.ts               # Static content (facts, members)
│   ├── game.ts                  # Game logic and waste items
│   ├── posts.ts                 # Gallery post management
│   ├── firebase.ts              # Firebase configuration
│   └── utils.ts                 # General utilities
│
├── package.json                 # Project dependencies
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
└── next.config.mjs              # Next.js configuration
```

---

## Architecture

### Next.js App Router System

StewardshipHub uses **Next.js 14's App Router**, which uses **file-based routing**. Here's how it works:

```
File Location                  → URL Route
app/page.tsx                  → http://localhost:3000/
app/about/page.tsx            → http://localhost:3000/about
app/facts/page.tsx            → http://localhost:3000/facts
app/gallery/page.tsx          → http://localhost:3000/gallery
app/game/page.tsx             → http://localhost:3000/game
```

Every `page.tsx` file becomes a route. The folder structure determines the URL structure.

### Layout System

The `app/layout.tsx` file is the **root layout** that wraps all pages:

- It loads global fonts (Merriweather, Montserrat, Source Code Pro)
- Includes the Navbar component that appears on every page
- Applies global styling
- Sets metadata (page title, description)

---

## Key Technologies

| Technology       | Purpose                                              |
| ---------------- | ---------------------------------------------------- |
| **Next.js 14**   | React framework for production                       |
| **React 18**     | UI library with hooks                                |
| **TypeScript**   | Type-safe JavaScript                                 |
| **Tailwind CSS** | Utility-first CSS framework                          |
| **Firebase**     | Real-time database for gallery posts                 |
| **Lucide React** | Icon library                                         |
| **Radix UI**     | Accessible component primitives                      |
| **React Hooks**  | State management (`useState`, `useEffect`, `useRef`) |

---

## Detailed File Breakdown

### Core Files Explained Line by Line

---

## **app/layout.tsx** - Root Layout

_This file applies to ALL pages on the site_

```typescript
import type { Metadata } from "next";                    // Line 1: Import Next.js metadata type
import { Merriweather, Montserrat, Source_Code_Pro }   // Line 2-3: Import Google fonts
  from "next/font/google";
import "./globals.css";                                  // Line 4: Import global CSS
import Navbar from "@/components/Navbar";               // Line 5: Import navigation component

// Lines 6-21: Configure three fonts with specific weights and CSS variables
const serifFont = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-serif"
});

const sansFont = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans"
});

const monoFont = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono"
});

// Lines 23-26: Set global metadata (page title, description visible in browser tabs)
export const metadata: Metadata = {
  title: "Stewardship Hub",
  description: "A simple and interactive environmental learning platform"
};

// Lines 28-43: Main layout component with children prop
export default function RootLayout({
  children                          // Line 30: children = content of specific pages
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">  // Line 35: HTML element with dark theme
      <body className={...}>           // Line 36: Apply font variables to body
        <div className="min-h-screen bg-[var(--background)]">  // Line 37: Main container
          <Navbar />                   // Line 38: Navigation appears on all pages
          <main className="...">       // Line 39-40: Page content goes here
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
```

**What This Does:**

- Sets up fonts used across the entire site
- Creates a consistent layout structure (Navbar + Content)
- The `{children}` placeholder is replaced by each page's content

**How to Edit:**

- Change `title` or `description` to update the browser tab text
- Modify font imports to use different Google Fonts
- Add components that should appear on every page in the `<body>` section

**Effects of Changes:**

- Changing fonts affects the look of entire site
- Removing Navbar would remove it from all pages
- Modifying className styles changes the dark theme appearance

---

## **app/page.tsx** - Home Page

_Route: http://localhost:3000/_

This is the landing page. It has three main sections:

### Section 1: Hero Section (Background Image)

```typescript
"use client";                    // Line 1: This is a client component (interactive)

import Image from "next/image";  // Line 3: Next.js optimized image component
import Link from "next/link";    // Line 4: Optimized link for routing

// Lines 6-8: Import icons from lucide-react library
import { ChevronDown, Lightbulb, Recycle, Users } from "lucide-react";

// Lines 9-10: Import custom components
import { Button } from "@/components/ui/button";
import { Card, CardContent, ... } from "@/components/ui/card";

// Lines 12-27: Define feature cards data (cards shown on homepage)
const featureCards = [
  {
    title: "Interactive Waste Sorting Game",
    description: "Build stronger habits by sorting everyday items into the right bins.",
    href: "/game",                    // Link destination
    buttonLabel: "Play Game",
    icon: Recycle                     // Icon to display
  },
  //... two more cards for Facts and Gallery
];

// Lines 29-30: Main component with handleScrollDown function
export default function HomePage() {
  const handleScrollDown = () => {
    const nextSection = document.getElementById("home-editorial");  // Find section by ID
    nextSection?.scrollIntoView({ behavior: "smooth" });            // Smooth scroll effect
  };
```

### What This Does:

- **Hero Section**: Full-screen background image with title and scroll button
- **Feature Cards Section**: Three card buttons linking to Game, Facts, Gallery
- **Editorial Section**: Text explaining the platform's mission

**How to Edit:**

1. **Change Hero Title:**

   ```typescript
   // Find this line in the hero section:
   <h1>Small Actions, Lasting Impact</h1>
   // Change to:
   <h1>Your New Title Here</h1>
   ```

   **Effect:** Updates main heading on homepage

2. **Modify Feature Cards:**

   ```typescript
   // Edit the featureCards array:
   const featureCards = [
     {
       title: "New Feature Name",
       description: "New description",
       href: "/new-route",
       buttonLabel: "New Button Text",
       icon: SomeIcon,
     },
   ];
   ```

   **Effect:** Changes the three cards displayed on homepage

3. **Change Background Image:**
   ```typescript
   <Image
     src="NEW_IMAGE_URL_HERE"  // Replace Unsplash URL
     alt="Description"
     ...
   />
   ```
   **Effect:** Updates the hero section background

---

## **app/about/page.tsx** - About Page

_Route: http://localhost:3000/about_

```typescript
import Image from "next/image";                    // Line 1: Image component
import { Users } from "lucide-react";              // Line 2: Icon
import { Badge } from "@/components/ui/badge";     // Line 3: Badge component
import { Card, ... } from "@/components/ui/card";  // Line 4: Card components
import { GROUP_MEMBERS } from "@/lib/content";     // Line 5: Import team members data

export default function AboutPage() {              // Line 7: Page component
  return (
    // Hero image section with gradient overlay
    <section className="...">
      <Image src="..." />                           // Team photo
      <div className="...gradient...">             // Dark overlay
    </section>

    // Content section with description
    <CardContent className="...">
      <p className="...">                           // About text
        Stewardship Hub is a student-led platform...
      </p>

      // Group members display
      {GROUP_MEMBERS.map((member) => (             // Loop through members
        <Card key={member} ...>
          <CardTitle>{member}</CardTitle>          // Display member name
        </Card>
      ))}

      // Mission badge
      <Badge>Building a cleaner future...</Badge>
    </CardContent>
  );
}
```

**What This Does:**

- Displays information about the Stewardship Hub project
- Shows team member names
- Includes a mission statement

**How to Edit:**

1. **Change About Text:**

   ```typescript
   <p className="...">
     Your new about text here, replacing the original description
   </p>
   ```

2. **Add/Remove Team Members:**
   - Edit `lib/content.ts`:

   ```typescript
   export const GROUP_MEMBERS = [
     "Lance Maiso",
     "Patrick Han",
     "Farrel Alim",
     "Diana Manuel",
     "NEW_MEMBER_NAME", // Add new member
   ];
   ```

   **Effect:** New member appears on About page

3. **Change Hero Image:**
   ```typescript
   <Image
     src="NEW_UNSPLASH_URL"
     alt="New description"
   />
   ```

---

## **app/facts/page.tsx** - Eco Facts Page

_Route: http://localhost:3000/facts_

```typescript
"use client";                              // Line 1: Client component (interactive)

import { useState } from "react";          // Line 3: State management hook
import { Lightbulb } from "lucide-react";  // Line 4: Icon
import { Button } from "@/components/ui/button";    // Line 5: Button
import { Card, ... } from "@/components/ui/card";   // Line 6: Card
import { Separator } from "@/components/ui/separator";  // Line 7: Divider
import { ECO_FACTS } from "@/lib/content";  // Line 8: Import facts array

export default function FactsPage() {
  // Line 10: State variable - stores current fact being displayed
  const [currentFact, setCurrentFact] = useState<string>(ECO_FACTS[0]);

  // Lines 12-20: Function to show random fact
  const handleShowAnotherFact = () => {
    if (ECO_FACTS.length < 2) return;      // Need at least 2 facts

    let nextFact = currentFact;
    // Keep generating random facts until it's different from current
    while (nextFact === currentFact) {
      const randomIndex = Math.floor(Math.random() * ECO_FACTS.length);
      nextFact = ECO_FACTS[randomIndex];
    }

    setCurrentFact(nextFact);               // Update displayed fact
  };

  return (
    <section ...>
      <Card>
        <CardHeader>
          <CardTitle>Eco Facts</CardTitle>
          <p>Quick insights that help make your everyday choices greener.</p>
        </CardHeader>

        <CardContent>
          {/* Display the lightbulb icon and current fact */}
          <Card className="...secondary">
            <Lightbulb className="..." />
            <p className="text-xl">{currentFact}</p>  {/* Displays current fact */}
          </Card>

          <Separator />

          {/* Button to show another fact */}
          <Button onClick={handleShowAnotherFact}>Show Another Fact</Button>
        </CardContent>
      </Card>
    </section>
  );
}
```

**What This Does:**

- Displays one eco fact at a time
- User clicks "Show Another Fact" button to see a random fact
- Facts are imported from `lib/content.ts`

**How to Edit:**

1. **Add New Facts:**
   - Edit `lib/content.ts`:

   ```typescript
   export const ECO_FACTS: string[] = [
     "Recycling one aluminum can saves enough energy to run a TV for about three hours.",
     "Composting food scraps reduces methane emissions from landfills...",
     // ... existing facts ...
     "YOUR_NEW_FACT_HERE - describe an eco-friendly tip",
   ];
   ```

   **Effect:** New fact appears in rotation when user clicks button

2. **Change Button Text:**

   ```typescript
   <Button onClick={handleShowAnotherFact}>New Button Text Here</Button>
   ```

3. **Change Title:**
   ```typescript
   <CardTitle>Your New Title</CardTitle>
   ```

**State Management Explained:**

- `useState()` creates a state variable `currentFact`
- `setCurrentFact()` updates it when button is clicked
- Random selection prevents showing the same fact twice in a row

---

## **app/gallery/page.tsx** - Community Gallery

_Route: http://localhost:3000/gallery_

```typescript
"use client";                                      // Line 1: Client component

import { FormEvent, useEffect, useState } from "react";  // Line 3: React hooks
import Image from "next/image";                    // Line 4: Image component
import { ExternalLink, ImagePlus } from "lucide-react";  // Line 5: Icons
import { Button } from "@/components/ui/button";  // Line 6: Button
import {
  Dialog,          // Modal popup for form
  DialogContent,   // Modal content
  DialogHeader,    // Modal header
  DialogTitle,     // Modal title
  DialogTrigger    // Button that opens modal
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";       // Line 12: Text input
import { Label } from "@/components/ui/label";       // Line 13: Form label
import { Textarea } from "@/components/ui/textarea";  // Line 14: Multi-line text
import {
  fetchPosts,      // Function to get posts from Firebase
  savePost,        // Function to save post to Firebase
  subscribeToPosts,// Function to listen for real-time updates
  type GalleryPostData,      // TypeScript type for form data
  type GalleryPostDocument   // TypeScript type for stored posts
} from "@/lib/posts";

// Lines 17-26: User form data structure
type FormValues = {
  imageUrl: string;       // URL of image
  title: string;          // Post title
  description: string;    // Post description
};

const initialFormValues: FormValues = {
  imageUrl: "",
  title: "",
  description: ""
};

export default function GalleryPage() {
  // Lines 32-48: State variables for managing form and posts
  const [posts, setPosts] = useState<GalleryPostDocument[]>([]);      // All posts from Firebase
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);  // Current form input
  const [formError, setFormError] = useState<string>("");             // Error message
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);   // Modal open/close
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);   // Loading state
  const [isLoadingPosts, setIsLoadingPosts] = useState<boolean>(true); // Data loading
  const [previewError, setPreviewError] = useState<boolean>(false);   // Image preview error

  // Lines 50-55: Update form field values
  const updateFormValue = (field: keyof FormValues, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    if (field === "imageUrl") {
      setPreviewError(false);  // Reset error when user types new URL
    }
  };

  // Lines 57+: useEffect hook - runs on component mount and when posts change
  useEffect(() => {
    let isMounted = true;  // Prevents memory leaks if component unmounts

    // Fetch existing posts and subscribe to real-time updates
    const unsubscribe = subscribeToPosts(
      (updatedPosts) => {
        if (isMounted) {
          setPosts(updatedPosts);        // Update posts list
          setIsLoadingPosts(false);      // Stop loading animation
        }
      },
      (error) => {
        console.error("Failed to fetch posts:", error);
      }
    );

    return () => {
      isMounted = false;
      unsubscribe();  // Clean up Firebase subscription
    };
  }, []);

  // Function to handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();  // Prevent page refresh

    // Validation
    if (!formValues.imageUrl || !formValues.title || !formValues.description) {
      setFormError("All fields are required");
      return;
    }

    try {
      setIsSubmitting(true);
      setFormError("");

      // Save post to Firebase
      await savePost({
        image: formValues.imageUrl,
        title: formValues.title,
        description: formValues.description,
        createdAt: Date.now()  // Timestamp
      });

      // Reset form
      setFormValues(initialFormValues);
      setIsDialogOpen(false);  // Close modal
    } catch (error) {
      setFormError("Failed to save post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ...>
      {/* Header section */}
      <div className="...">
        <h1>Community Gallery</h1>
        <p>Share your environmental actions and impact stories</p>

        {/* Button to open form modal */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <ImagePlus className="..." />
              Share Story
            </Button>
          </DialogTrigger>

          {/* Modal content - form for creating new post */}
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Share Your Story</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Image URL input */}
              <div>
                <Label>Image URL</Label>
                <Input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={formValues.imageUrl}
                  onChange={(e) => updateFormValue("imageUrl", e.target.value)}
                  required
                />
              </div>

              {/* Title input */}
              <div>
                <Label>Title</Label>
                <Input
                  type="text"
                  placeholder="Give your story a title"
                  value={formValues.title}
                  onChange={(e) => updateFormValue("title", e.target.value)}
                  required
                />
              </div>

              {/* Description input */}
              <div>
                <Label>Description</Label>
                <Textarea
                  placeholder="Describe your environmental action"
                  value={formValues.description}
                  onChange={(e) => updateFormValue("description", e.target.value)}
                  required
                />
              </div>

              {/* Submit button */}
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Share Story"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Display all posts from Firebase */}
      <div className="grid ...">
        {posts.map((post) => (
          <Card key={post.id} className="...">
            <Image
              src={post.image}
              alt={post.title}
              width={400}
              height={300}
              className="object-cover"
            />
            <CardContent className="p-4">
              <h3 className="font-bold">{post.title}</h3>
              <p className="text-sm text-muted">{post.description}</p>
              <a href={post.image} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="inline h-4 w-4" />
                View Full Image
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
```

**What This Does:**

- Displays community-submitted environmental action stories
- Has a form (in a modal popup) for users to submit new posts
- Uses Firebase Firestore for real-time data storage
- Shows images, titles, and descriptions of posts

**How to Edit:**

1. **Change Form Field Labels:**

   ```typescript
   <Label>Image URL</Label>
   // Change to:
   <Label>Your Custom Label</Label>
   ```

2. **Add New Form Field:**

   ```typescript
   // 1. Update FormValues type:
   type FormValues = {
     imageUrl: string;
     title: string;
     description: string;
     newField: string;  // Add this
   };

   // 2. Add input in form:
   <div>
     <Label>New Field</Label>
     <Input
       value={formValues.newField}
       onChange={(e) => updateFormValue("newField", e.target.value)}
     />
   </div>
   ```

3. **Change Modal Button Text:**
   ```typescript
   <Button>Share Story</Button>
   // Change to:
   <Button>Submit Your Story</Button>
   ```

**Firebase Integration:**

- `subscribeToPosts()` listens for real-time updates
- `savePost()` saves new posts to Firebase
- Posts are ordered by creation date (newest first)

---

## **app/game/page.tsx** - Waste Sorting Game

_Route: http://localhost:3000/game_

This is the most complex page. It's a drag-and-drop waste sorting game.

```typescript
"use client";                               // Line 1: Client component

import { useEffect, useMemo, useRef, useState } from "react";  // Line 3: React hooks
import { RotateCcw, Timer, Trophy } from "lucide-react";       // Line 4: Icons
import Bin from "@/components/Bin";             // Line 5: Waste bin component
import GameItem from "@/components/GameItem";   // Line 6: Draggable item component
import { Badge } from "@/components/ui/badge";  // Line 7: Badge
import { Button } from "@/components/ui/button";// Line 8: Button
import { Card, ... } from "@/components/ui/card";// Line 9: Card
import { Separator } from "@/components/ui/separator";  // Line 10: Divider
import {
  BIN_CONFIGS,         // Configuration for the three bins
  INITIAL_WASTE_ITEMS, // Array of waste items to sort
  type WasteItem,      // TypeScript type
  type WasteType       // TypeScript type for bin types
} from "@/lib/game";

// Lines 17-25: Type definitions for game state
type GameStatus = "idle" | "playing" | "finished";  // Game phases

type Feedback = {
  text: string;
  tone: "success" | "error";  // Green for correct, red for wrong
};

type BinFeedbackState = Record<WasteType, "idle" | "correct" | "incorrect">;

// Lines 26-29: Game constants
const INITIAL_TIME = 30;                    // 30 seconds per round
const BATCH_SIZE = 6;                       // 6 items shown at a time
const TOTAL_BATCHES = Math.ceil(INITIAL_WASTE_ITEMS.length / BATCH_SIZE);  // 5 batches total

const initialBinState: BinFeedbackState = {
  biodegradable: "idle",
  recyclable: "idle",
  residual: "idle"
};

// Helper function to get items for current batch
const getBatchItems = (batchIndex: number): WasteItem[] => {
  const start = batchIndex * BATCH_SIZE;
  return INITIAL_WASTE_ITEMS.slice(start, start + BATCH_SIZE);
};

export default function GamePage() {
  // Lines 41-49: State variables
  const [visibleItems, setVisibleItems] = useState<WasteItem[]>([]);     // Items displayed
  const [currentBatch, setCurrentBatch] = useState<number>(0);          // Which batch (0-4)
  const [timeLeft, setTimeLeft] = useState<number>(INITIAL_TIME);       // Seconds remaining
  const [score, setScore] = useState<number>(0);                        // Points earned
  const [gameStatus, setGameStatus] = useState<GameStatus>("idle");     // Game phase
  const [feedback, setFeedback] = useState<Feedback | null>(null);      // Success/error message
  const [binState, setBinState] = useState<BinFeedbackState>(initialBinState);  // Bin colors

  const timerRef = useRef<NodeJS.Timeout | null>(null);  // Reference to timer

  // Lines 51+: Determine win message based on score
  const gameSummary = useMemo(() => {
    if (score >= 20) {
      return "Excellent sorting speed! You are a true eco champion.";
    } else if (score >= 15) {
      return "Great job! Keep practicing to improve your sorting skills.";
    } else {
      return "Good effort! Learn more facts to improve your waste knowledge.";
    }
  }, [score]);

  // Lines 60+: Load first batch when game starts
  useEffect(() => {
    if (gameStatus === "playing" && visibleItems.length === 0) {
      setVisibleItems(getBatchItems(0));  // Show first 6 items
    }
  }, [gameStatus, visibleItems.length]);

  // Lines 68+: Timer effect - countdown every second
  useEffect(() => {
    if (gameStatus !== "playing") return;  // Only run during game

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameStatus("finished");  // Time's up!
          return 0;
        }
        return prev - 1;
      });
    }, 1000);  // Run every 1000ms (1 second)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);  // Clean up timer
      }
    };
  }, [gameStatus]);

  // Handle item drop into bin
  const handleItemDropped = (itemId: number, binType: WasteType) => {
    const item = visibleItems.find((i) => i.id === itemId);
    if (!item) return;

    // Check if item was sorted correctly
    const isCorrect = item.type === binType;

    // Show feedback message
    setFeedback({
      text: isCorrect ? "✓ Correct!" : "✗ Wrong bin. Try again!",
      tone: isCorrect ? "success" : "error"
    });

    // Highlight the bin with green or red
    setBinState((prev) => ({
      ...prev,
      [binType]: isCorrect ? "correct" : "incorrect"
    }));

    // Stop highlighting after 500ms
    setTimeout(() => {
      setBinState(initialBinState);
      setFeedback(null);
    }, 500);

    // If correct, remove item and add to score
    if (isCorrect) {
      setScore((prev) => prev + 1);
      setVisibleItems((prev) => prev.filter((i) => i.id !== itemId));

      // Load more items when all 6 are sorted correctly
      if (visibleItems.length === 1) {
        setCurrentBatch((prev) => prev + 1);
        if (currentBatch + 1 < TOTAL_BATCHES) {
          setVisibleItems(getBatchItems(currentBatch + 1));
        } else {
          setGameStatus("finished");  // All items sorted!
        }
      }
    }
  };

  // Start/restart game
  const handleStartGame = () => {
    setGameStatus("playing");
    setScore(0);
    setTimeLeft(INITIAL_TIME);
    setCurrentBatch(0);
    setVisibleItems(getBatchItems(0));
    setFeedback(null);
    setBinState(initialBinState);
  };

  return (
    <section className="...">
      {/* Game header with score and timer */}
      <div className="...">
        <div className="flex items-center gap-4">
          <Trophy className="..." />
          <Badge>Score: {score}</Badge>
          <Timer className="..." />
          <Badge>Time: {timeLeft}s</Badge>
        </div>
      </div>

      {/* Game playground - items and bins */}
      {gameStatus === "playing" ? (
        <div className="...">
          {/* Display draggable items */}
          <div className="grid ...">
            {visibleItems.map((item) => (
              <GameItem
                key={item.id}
                item={item}
                onDrop={handleItemDropped}
              />
            ))}
          </div>

          {/* Feedback message */}
          {feedback && (
            <div className={feedback.tone === "success" ? "text-green-500" : "text-red-500"}>
              {feedback.text}
            </div>
          )}

          {/* Three waste bins to drop items into */}
          <div className="grid grid-cols-3 gap-4">
            {BIN_CONFIGS.map((bin) => (
              <Bin
                key={bin.type}
                config={bin}
                state={binState[bin.type]}
              />
            ))}
          </div>
        </div>
      ) : gameStatus === "finished" ? (
        // Game over screen
        <div className="...">
          <Trophy className="..." />
          <h2>Game Complete!</h2>
          <p>Final Score: {score}/30</p>
          <p>{gameSummary}</p>
          <Button onClick={handleStartGame} className="...">
            <RotateCcw className="..." />
            Play Again
          </Button>
        </div>
      ) : (
        // Start screen
        <div className="...">
          <h2>Waste Sorting Game</h2>
          <p>Sort items into the correct bins before time runs out!</p>
          <Button onClick={handleStartGame} className="...">
            Start Game
          </Button>
        </div>
      )}
    </section>
  );
}
```

**What This Does:**

- Interactive drag-and-drop waste sorting game
- 30-second timer per round
- 6 items shown at a time across 5 batches (30 total items)
- Score increases for correct sorts
- Provides visual feedback (green = correct, red = wrong)
- Final score and message when complete

**How to Edit:**

1. **Change Time Limit:**

   ```typescript
   const INITIAL_TIME = 30; // Change to 60 for 60 seconds
   ```

   **Effect:** Game duration changes

2. **Change Items Per Batch:**

   ```typescript
   const BATCH_SIZE = 6; // Change to 5 for 5 items
   ```

   **Effect:** Fewer/more items shown at once

3. **Add New Waste Item:**
   - Edit `lib/game.ts`:

   ```typescript
   export const INITIAL_WASTE_ITEMS: WasteItem[] = [
     // ... existing items ...
     { id: 31, name: "Cork", type: "biodegradable", icon: "🍷" },
   ];
   ```

   **Effect:** Item appears in game to sort

4. **Change Score Messages:**
   ```typescript
   const gameSummary = useMemo(() => {
     if (score >= 25) {
       return "You're a waste sorting expert!";
     }
     // ... etc
   }, [score]);
   ```

---

## **Key Components Explained**

### **components/Navbar.tsx** - Navigation Bar

```typescript
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/game", label: "Game" },
  { href: "/gallery", label: "Gallery" },
  { href: "/facts", label: "Facts" },
  { href: "/about", label: "About" },
];
```

- Appears on every page
- Links to all main sections
- Changes style when scrolled down

**How to Edit:**

- Add new link:

```typescript
{ href: "/new-page", label: "New Page" }
```

### **components/GameItem.tsx** - Draggable Waste Item

- Individual waste item that can be dragged into bins
- Shows emoji icon and item name

### **components/Bin.tsx** - Waste Collection Bin

- Three bins: Biodegradable, Recyclable, Residual
- Changes color on correct/incorrect drop

---

## **Library Files**

### **lib/content.ts** - Static Content

```typescript
export const ECO_FACTS: string[] = [...]        // Facts for facts page
export const GROUP_MEMBERS = [...]              // Team members for about page
```

### **lib/game.ts** - Game Logic

```typescript
export const INITIAL_WASTE_ITEMS: WasteItem[] = [...]  // All waste items (30 total)
export const BIN_CONFIGS: BinConfig[] = [...]         // Bin definitions
export type WasteType = "biodegradable" | "recyclable" | "residual"  // Bin categories
```

### **lib/posts.ts** - Gallery Firebase Operations

```typescript
export async function savePost(post: GalleryPostData); // Save new post to Firebase
export async function fetchPosts(); // Get all posts from Firebase
export function subscribeToPosts(onData, onError); // Listen for real-time updates
```

### **lib/firebase.ts** - Firebase Configuration

```typescript
const firebaseConfig = {...}  // Connection credentials from environment variables
export const db = getFirestore(app);  // Firestore database instance
```

---

## Configuration Files

### **tsconfig.json**

- **target**: "es5" (DEPRECATED in TS 7.0) → Change to "ES2020"
- Configures TypeScript compiler options
- Path alias: `@/*` means you can import from root as `@/components/...`

### **tailwind.config.ts**

- Configures Tailwind CSS styling framework
- Defines colors, spacing, fonts

### **next.config.mjs**

- Next.js configuration for build and runtime

### **package.json**

```json
{
  "scripts": {
    "dev": "next dev", // Start development server
    "build": "next build", // Build for production
    "start": "next start", // Start production server
    "lint": "next lint" // Check code quality
  }
}
```

---

## How to Make Common Changes

### Add a New Page/Route

1. Create folder: `app/newpage/`
2. Create file: `app/newpage/page.tsx`
3. Write your component:

```typescript
export default function NewPage() {
  return <section>Your content here</section>;
}
```

4. Add to navbar in `components/Navbar.tsx`:

```typescript
{ href: "/newpage", label: "New Page" }
```

### Add New Eco Fact

1. Edit `lib/content.ts`
2. Add string to `ECO_FACTS` array
3. Fact automatically appears on Facts page

### Modify Game Items

1. Edit `lib/game.ts`
2. Change `INITIAL_WASTE_ITEMS` array
3. Changes appear in game immediately

### Change Global Styling

1. Edit `app/globals.css` for global styles
2. Edit `tailwind.config.ts` for theme colors
3. Use className prop in components

---

## Common Issues & Solutions

| Issue                     | Solution                                                     |
| ------------------------- | ------------------------------------------------------------ |
| Page not appearing        | Check file is in `app/` folder and named `page.tsx`          |
| Styling not working       | Check className syntax, Tailwind classes require exact names |
| Firebase posts not saving | Check Firebase config in `.env.local` with required keys     |
| Routes not working        | Restart dev server with `npm run dev`                        |
| Images not loading        | Check image URL is valid and accessible                      |

---

## Summary

**StewardshipHub** is structured as:

- **Next.js App Router** → File-based routing (folder = URL)
- **React Hooks** → State management (useState, useEffect)
- **Tailwind CSS** → Styling
- **Firebase** → Real-time database for gallery
- **TypeScript** → Type safety

All major functionality is explained above. Edit files according to the patterns shown to customize the platform!
