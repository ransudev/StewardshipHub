import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { WasteType } from "@/lib/game";

type BinProps = {
  label: string;
  icon: string;
  type: WasteType;
  baseClassName: string;
  state?: "idle" | "correct" | "incorrect";
  onDropItem: (itemId: number, itemType: WasteType, targetType: WasteType) => void;
};

type DragData = {
  id: number;
  type: WasteType;
};

export default function Bin({ label, icon, type, baseClassName, state = "idle", onDropItem }: BinProps) {
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    // Required native drag event: enabling drop targets.
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    // Required native drag event: read the payload from GameItem.onDragStart.
    event.preventDefault();
    const rawData = event.dataTransfer.getData("application/json");
    if (!rawData) {
      return;
    }

    try {
      const data = JSON.parse(rawData) as DragData;
      onDropItem(data.id, data.type, type);
    } catch {
      return;
    }
  };

  return (
    <Card
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={cn(
        "min-w-[220px] border-2 border-dashed rounded-xl transition-all duration-300",
        "hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(76,175,80,0.2)]",
        baseClassName,
        state === "correct" &&
          "border-[var(--primary)] bg-[color:color-mix(in_srgb,var(--accent)_48%,var(--card)_52%)] ring-2 ring-[color:color-mix(in_srgb,var(--ring)_55%,transparent)]",
        state === "incorrect" &&
          "animate-shake border-[var(--destructive)] bg-[color:color-mix(in_srgb,var(--destructive)_12%,var(--card)_88%)] ring-2 ring-[color:color-mix(in_srgb,var(--destructive)_30%,transparent)]"
      )}
    >
      <CardContent className="flex min-h-52 flex-col items-center justify-center gap-2 p-6 text-center">
        <span className="text-4xl leading-none">{icon}</span>
        <p className="text-xl font-bold text-[var(--foreground)]">{label}</p>
        <p className="text-sm text-[var(--muted-foreground)]">Drop item here</p>
      </CardContent>
    </Card>
  );
}
