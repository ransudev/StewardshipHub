export type WasteType = "biodegradable" | "recyclable" | "residual";

export type WasteItem = {
  id: number;
  name: string;
  type: WasteType;
  icon: string;
};

export type BinConfig = {
  type: WasteType;
  label: string;
  icon: string;
  baseClassName: string;
};

export const INITIAL_WASTE_ITEMS: WasteItem[] = [
  { id: 1, name: "Banana Peel", type: "biodegradable", icon: "🍌" },
  { id: 2, name: "Apple Core", type: "biodegradable", icon: "🍎" },
  { id: 3, name: "Vegetable Scraps", type: "biodegradable", icon: "🥬" },
  { id: 4, name: "Tea Bag", type: "biodegradable", icon: "🍵" },
  { id: 5, name: "Eggshells", type: "biodegradable", icon: "🥚" },
  { id: 6, name: "Coffee Grounds", type: "biodegradable", icon: "☕" },
  { id: 7, name: "Orange Peel", type: "biodegradable", icon: "🍊" },
  { id: 8, name: "Wilted Flowers", type: "biodegradable", icon: "💐" },
  { id: 9, name: "Grass Clippings", type: "biodegradable", icon: "🌿" },
  { id: 10, name: "Bread Crumbs", type: "biodegradable", icon: "🍞" },

  { id: 11, name: "Plastic Bottle", type: "recyclable", icon: "🧴" },
  { id: 12, name: "Aluminum Can", type: "recyclable", icon: "🥫" },
  { id: 13, name: "Glass Jar", type: "recyclable", icon: "🫙" },
  { id: 14, name: "Cardboard Box", type: "recyclable", icon: "📦" },
  { id: 15, name: "Newspaper", type: "recyclable", icon: "📰" },
  { id: 16, name: "Soda Can", type: "recyclable", icon: "🥤" },
  { id: 17, name: "Milk Carton", type: "recyclable", icon: "🥛" },
  { id: 18, name: "Plastic Container", type: "recyclable", icon: "🍱" },
  { id: 19, name: "Magazine", type: "recyclable", icon: "📚" },
  { id: 20, name: "Paper Bag", type: "recyclable", icon: "🛍️" },

  { id: 21, name: "Candy Wrapper", type: "residual", icon: "🍬" },
  { id: 22, name: "Broken Ceramic", type: "residual", icon: "🏺" },
  { id: 23, name: "Used Tissue", type: "residual", icon: "🤧" },
  { id: 24, name: "Chip Packet", type: "residual", icon: "🍟" },
  { id: 25, name: "Styrofoam Cup", type: "residual", icon: "☕" },
  { id: 26, name: "Disposable Mask", type: "residual", icon: "😷" },
  { id: 27, name: "Dust Sweepings", type: "residual", icon: "🧹" },
  { id: 28, name: "Old Sponge", type: "residual", icon: "🧽" },
  { id: 29, name: "Broken Mirror", type: "residual", icon: "🪞" },
  { id: 30, name: "Rubber Eraser", type: "residual", icon: "✏️" }
];

export const BIN_CONFIGS: BinConfig[] = [
  {
    type: "biodegradable",
    label: "Biodegradable",
    icon: "🌱",
    baseClassName:
      "border-[color:color-mix(in_srgb,var(--primary)_55%,var(--border)_45%)] bg-[color:color-mix(in_srgb,var(--accent)_38%,var(--card)_62%)]"
  },
  {
    type: "recyclable",
    label: "Recyclable",
    icon: "♻️",
    baseClassName:
      "border-[color:color-mix(in_srgb,var(--chart-2)_52%,var(--border)_48%)] bg-[color:color-mix(in_srgb,var(--secondary)_66%,var(--card)_34%)]"
  },
  {
    type: "residual",
    label: "Residual",
    icon: "🗑️",
    baseClassName:
      "border-[color:color-mix(in_srgb,var(--muted-foreground)_35%,var(--border)_65%)] bg-[color:color-mix(in_srgb,var(--muted)_76%,var(--card)_24%)]"
  }
];
