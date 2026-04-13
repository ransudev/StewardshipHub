import { Card, CardContent } from "@/components/ui/card";
import type { WasteItem } from "@/lib/game";

type GameItemProps = Pick<WasteItem, "id" | "name" | "type" | "icon">;
type GameItemStateProps = {
  isDraggable: boolean;
};

type DragPayload = {
  id: number;
  type: WasteItem["type"];
};

export default function GameItem({ id, name, type, icon, isDraggable }: GameItemProps & GameItemStateProps) {
  const handleDragStart = (event: React.DragEvent<HTMLLIElement>) => {
    if (!isDraggable) {
      event.preventDefault();
      return;
    }

    // Native HTML5 drag payload consumed by the drop zone.
    const payload: DragPayload = { id, type };
    event.dataTransfer.setData("application/json", JSON.stringify(payload));
    event.dataTransfer.effectAllowed = "move";

    const target = event.currentTarget;
    target.classList.add("translate-y-[5px]", "scale-[1.02]");
  };

  const handleDragEnd = (event: React.DragEvent<HTMLLIElement>) => {
    event.currentTarget.classList.remove("translate-y-[5px]", "scale-[1.02]");
  };

  return (
    <li
      draggable={isDraggable}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`transition-all duration-200 ${
        isDraggable
          ? "cursor-grab hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(76,175,80,0.2)] active:cursor-grabbing"
          : "cursor-not-allowed opacity-60"
      }`}
    >
      <Card className="border-[var(--border)] bg-[var(--card)] shadow-[0_8px_20px_rgba(10,20,12,0.35)]">
        <CardContent className="flex flex-col items-center justify-center gap-2 p-5 text-center">
          <span className="text-4xl leading-none">{icon}</span>
          <p className="text-base font-semibold text-[var(--foreground)]">{name}</p>
        </CardContent>
      </Card>
    </li>
  );
}
