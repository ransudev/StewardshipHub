/*
export type GalleryPost = {
  id: string;
  image: string;
  title: string;
  description: string;
};

export const ECO_FACTS: string[] = [
  "Recycling one aluminum can saves enough energy to run a TV for about three hours.",
  "Composting food scraps reduces methane emissions from landfills and enriches soil quality.",
  "Turning off running tap water while brushing can save liters of clean water each day.",
  "Planting native trees supports pollinators, wildlife habitat, and healthier local ecosystems.",
  "Reusable bottles, bags, and food containers can cut significant single-use plastic waste over a year."
];

export const GROUP_MEMBERS = ["Lance Maiso", "Patrick Han", "Farrel Alim", "Diana Manuel"];
*/
// ─────────────────────────────────────────────
//  lib/content.ts
//  All site content lives here.
//  To edit a topic: find it below and change the
//  fields — title, lead, body, stats, actions.
//  To add a topic: copy one full topic block and
//  paste it inside the STEWARDSHIP_TOPICS array.
// ─────────────────────────────────────────────

// ── Type definitions ─────────────────────────
// These describe the shape of your data.
// Don't change these unless you're adding a new field.

export type GalleryPost = {
  id: string;
  image: string;
  title: string;
  description: string;
};

export type TopicStat = {
  number: string;   // e.g. "8M" or "1.1°C"
  label: string;    // short description below the number
};

export type StewardshipTopic = {
  id: string;               // unique slug, used internally — no spaces
  icon: string;             // emoji shown on the sidebar button
  sidebarLabel: string;     // short label on the sidebar (2–3 words max)
  category: string;         // category badge shown on the detail panel
  categoryColor: string;    // tailwind color name: "blue" | "green" | "amber" | "teal" | "red"
  title: string;            // main heading in the detail panel
  lead: string;             // first paragraph — the hook, the alarming truth
  body: string;             // second paragraph — deeper context
  stats: TopicStat[];       // exactly 2 stat boxes
  actions: string[];        // 3 bullet points: what the reader can do
};

// ── Topic data ────────────────────────────────
// ✏️  EDIT YOUR TOPICS HERE.
// Each object between { } is one topic card.

export const STEWARDSHIP_TOPICS: StewardshipTopic[] = [
  {
    id: "plastic-pollution",
    icon: "🌊",
    sidebarLabel: "Plastic pollution",
    category: "Ocean health",
    categoryColor: "blue",

    // ✏️ Edit the text below freely
    title: "Plastic & ocean pollution",
    lead: "8 million metric tons of plastic enter our oceans every year. At current rates, oceans will contain more plastic than fish by weight by 2050.",
    body: "Plastic breaks into microplastics that enter the food chain — now found in fish, drinking water, and even human blood. This is largely driven by single-use packaging and poor waste infrastructure, making it a solvable problem if demand and policy shift together.",
    stats: [
      { number: "8M",   label: "tons of plastic enter oceans each year" },
      { number: "2050", label: "projected year plastic outweighs fish" },
    ],
    actions: [
      "Switch to reusable bags, bottles, and containers in your daily routine.",
      "Refuse single-use straws and cutlery when eating out or ordering in.",
      "Join or organise a local beach, river, or community cleanup drive.",
    ],
  },

  {
    id: "deforestation",
    icon: "🌳",
    sidebarLabel: "Deforestation",
    category: "Biodiversity",
    categoryColor: "green",

    title: "Deforestation & habitat loss",
    lead: "The world loses forest equivalent to a football pitch every single second. Forests are home to 80% of all land-based animal and plant species on Earth.",
    body: "Primary drivers are industrial agriculture — especially beef and palm oil — alongside logging and urban sprawl. When forests disappear, species vanish and the carbon sinks that buffer our climate are destroyed, compounding every other environmental crisis.",
    stats: [
      { number: "4.7M", label: "hectares of forest lost per year" },
      { number: "80%",  label: "of land animals that depend on forests" },
    ],
    actions: [
      "Reduce consumption of beef and products containing palm oil.",
      "Plant native trees locally and support certified reforestation programmes.",
      "Choose products with FSC (timber) or RSPO (palm oil) certification.",
    ],
  },

  {
    id: "climate-change",
    icon: "🌡️",
    sidebarLabel: "Climate change",
    category: "Climate",
    categoryColor: "amber",

    title: "Carbon emissions & global warming",
    lead: "Global average temperatures are already 1.1 °C above pre-industrial levels. The internationally agreed safe limit is 1.5 °C — and at current emissions rates, we will breach it within the decade.",
    body: "Transport, food systems, and home energy use make up the largest parts of a household carbon footprint. While individual action matters, the most powerful lever is collective pressure on industries and governments to accelerate the transition away from fossil fuels.",
    stats: [
      { number: "1.1°C", label: "warming already locked in today" },
      { number: "1.5°C", label: "Paris Agreement safe limit" },
    ],
    actions: [
      "Fly less — a single return long-haul flight can equal months of car emissions.",
      "Switch your home to a renewable energy tariff or install solar panels.",
      "Eat less red meat; shifting to plant-based meals reduces your footprint significantly.",
    ],
  },

  {
    id: "water-scarcity",
    icon: "💧",
    sidebarLabel: "Water scarcity",
    category: "Freshwater",
    categoryColor: "teal",

    title: "The global freshwater crisis",
    lead: "Only 3% of Earth's water is fresh, and two-thirds of that is locked in glaciers and ice caps. Today, 2 billion people lack access to safe drinking water.",
    body: "Rising populations and intensive agriculture are pushing demand beyond what aquifers can replenish. Climate change is shrinking glaciers and disrupting rainfall patterns — by 2030, global demand for fresh water is projected to exceed supply by 40%.",
    stats: [
      { number: "2B",   label: "people without safe drinking water" },
      { number: "40%",  label: "projected supply gap by 2030" },
    ],
    actions: [
      "Fix household leaks — a single dripping tap wastes over 3,000 litres per year.",
      "Collect rainwater for watering plants and cleaning outdoor spaces.",
      "Choose water-efficient appliances (look for WELS or equivalent ratings).",
    ],
  },

  {
    id: "food-waste",
    icon: "🍎",
    sidebarLabel: "Food waste",
    category: "Food systems",
    categoryColor: "red",

    title: "Food waste & sustainable eating",
    lead: "One third of all food produced globally is wasted — roughly 1.3 billion tons per year. Meanwhile, 780 million people go hungry every night.",
    body: "Food waste is one of the largest sources of greenhouse gas emissions globally. When food rots in landfill, it produces methane — a gas 80 times more potent than CO₂ over 20 years. Changing what and how we eat is one of the highest-impact individual actions available.",
    stats: [
      { number: "1/3",  label: "of all food produced is wasted" },
      { number: "8%",   label: "of global emissions from food waste" },
    ],
    actions: [
      "Plan your meals weekly and shop with a list to avoid overbuying.",
      "Compost food scraps instead of sending them to landfill.",
      "Understand 'best before' vs 'use by' — most food is safe past the best before date.",
    ],
  },

  {
    id: "biodiversity",
    icon: "🐝",
    sidebarLabel: "Pollinator decline",
    category: "Wildlife",
    categoryColor: "amber",

    title: "Pollinator decline & biodiversity loss",
    lead: "40% of insect species are declining globally. Bees, butterflies, and other pollinators are responsible for one in every three bites of food we eat.",
    body: "Pesticide use, habitat destruction, monoculture farming, and climate change are driving the sixth mass extinction event in Earth's history. We are losing species at 1,000 times the natural background rate — and most of it is happening quietly, without headlines.",
    stats: [
      { number: "40%",  label: "of insect species in decline globally" },
      { number: "1000×", label: "faster than the natural extinction rate" },
    ],
    actions: [
      "Plant pollinator-friendly native flowers in your garden or on your balcony.",
      "Avoid pesticides — use natural alternatives like neem oil or companion planting.",
      "Leave parts of your garden 'wild' — long grass and leaf piles are vital habitat.",
    ],
  },
];

// ── Legacy export (used by other pages — do not remove) ──
export const ECO_FACTS: string[] = STEWARDSHIP_TOPICS.map(t => t.lead);

export const GROUP_MEMBERS = ["Lance Maiso", "Patrick Han", "Farrel Alim", "Diana Manuel"];