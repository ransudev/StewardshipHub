"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { RotateCcw, Timer, Trophy } from "lucide-react";
import Bin from "@/components/Bin";
import GameItem from "@/components/GameItem";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BIN_CONFIGS, INITIAL_WASTE_ITEMS, type WasteItem, type WasteType } from "@/lib/game";

type GameStatus = "idle" | "playing" | "finished";

type Feedback = {
  text: string;
  tone: "success" | "error";
};

type BinFeedbackState = Record<WasteType, "idle" | "correct" | "incorrect">;

const INITIAL_TIME = 30;
const BATCH_SIZE = 6;
const TOTAL_BATCHES = Math.ceil(INITIAL_WASTE_ITEMS.length / BATCH_SIZE);

const initialBinState: BinFeedbackState = {
  biodegradable: "idle",
  recyclable: "idle",
  residual: "idle"
};

const getBatchItems = (batchIndex: number): WasteItem[] => {
  const start = batchIndex * BATCH_SIZE;
  return INITIAL_WASTE_ITEMS.slice(start, start + BATCH_SIZE);
};

export default function GamePage() {
  const [visibleItems, setVisibleItems] = useState<WasteItem[]>([]);
  const [currentBatch, setCurrentBatch] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(INITIAL_TIME);
  const [score, setScore] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<GameStatus>("idle");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [binState, setBinState] = useState<BinFeedbackState>(initialBinState);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const gameSummary = useMemo(() => {
    if (score >= 20) {
      return "Excellent sorting speed! You are a true eco champion.";
    }

    if (score >= 12) {
      return "Great effort! Keep practicing to boost your score even more.";
    }

    return "Nice try! Play again and aim for a higher score.";
  }, [score]);

  useEffect(() => {
    if (gameStatus !== "playing") {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          setGameStatus("finished");
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [gameStatus]);

  const flashBin = (binType: WasteType, state: "correct" | "incorrect") => {
    setBinState((prev) => ({ ...prev, [binType]: state }));

    window.setTimeout(() => {
      setBinState((prev) => ({ ...prev, [binType]: "idle" }));
    }, 350);
  };

  const startGame = () => {
    setCurrentBatch(0);
    setVisibleItems(getBatchItems(0));
    setTimeLeft(INITIAL_TIME);
    setScore(0);
    setFeedback(null);
    setBinState(initialBinState);
    setGameStatus("playing");
  };

  const handleAdvanceBatch = (nextBatch: number) => {
    if (nextBatch >= TOTAL_BATCHES) {
      setGameStatus("finished");
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    setCurrentBatch(nextBatch);
    setVisibleItems(getBatchItems(nextBatch));
    setFeedback({ text: `Batch ${nextBatch + 1} started. Keep sorting!`, tone: "success" });
  };

  const handleDropItem = (itemId: number, itemType: WasteType, targetType: WasteType) => {
    if (gameStatus !== "playing") {
      return;
    }

    if (itemType === targetType) {
      setScore((prev) => prev + 1);
      flashBin(targetType, "correct");

      setVisibleItems((prev) => {
        const nextItems = prev.filter((item) => item.id !== itemId);

        if (nextItems.length === 0) {
          handleAdvanceBatch(currentBatch + 1);
        } else {
          setFeedback({ text: "Correct bin! Keep going.", tone: "success" });
        }

        return nextItems;
      });
      return;
    }

    setFeedback({ text: "Incorrect bin. Try again.", tone: "error" });
    flashBin(targetType, "incorrect");
  };

  return (
    <section className="flex h-full flex-col gap-6 py-12">
      <Card className="border-[var(--border)] bg-[var(--card)] shadow-[0_12px_26px_rgba(10,20,12,0.35)]">
        <CardHeader className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CardTitle className="text-4xl">Waste Segregation Game</CardTitle>
            <Badge variant="secondary" className="text-sm">
              <Timer className="mr-2 h-4 w-4" />
              Time:{" "}
              <span className={`ml-1 ${timeLeft < 10 && gameStatus === "playing" ? "text-[var(--destructive)]" : ""}`}>
                {timeLeft}s
              </span>
              <span className="mx-2">|</span>
              <Trophy className="mr-1 h-4 w-4" />
              Score: {score}
              <span className="mx-2">|</span>
              Batch: {Math.min(currentBatch + 1, TOTAL_BATCHES)} / {TOTAL_BATCHES}
            </Badge>
          </div>
          <p className="text-[var(--muted-foreground)]">
            Sort each batch of 6 items before time runs out. Complete all 5 batches to finish early.
          </p>
        </CardHeader>
      </Card>

      {gameStatus === "idle" ? (
        <Card className="border-[var(--border)] bg-[var(--card)] shadow-[0_12px_26px_rgba(10,20,12,0.35)]">
          <CardContent className="flex flex-col items-center gap-5 p-10 text-center">
            <h2 className="text-3xl font-semibold">Ready to start?</h2>
            <p className="max-w-xl text-[var(--muted-foreground)]">
              Drag items from the top and drop them into the correct bins below. You have 30 seconds.
            </p>
            <Button onClick={startGame}>Start Game</Button>
          </CardContent>
        </Card>
      ) : null}

      {gameStatus === "finished" ? (
        <Card className="border-[var(--border)] bg-[var(--card)] shadow-[0_12px_26px_rgba(10,20,12,0.35)]">
          <CardContent className="flex flex-col items-center gap-5 p-10 text-center">
            <h2 className="text-3xl font-semibold">Game Finished!</h2>
            <p className="text-xl">
              Final Score: <span className="text-[var(--primary)]">{score}</span>
            </p>
            <p className="max-w-xl text-[var(--muted-foreground)]">{gameSummary}</p>
            <Button onClick={startGame}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Play Again
            </Button>
          </CardContent>
        </Card>
      ) : null}

      {gameStatus === "playing" ? (
        <>
          {feedback ? (
            <p
              className={`rounded-xl px-4 py-3 text-sm font-semibold ${
                feedback.tone === "success"
                  ? "bg-[var(--accent)] text-[var(--accent-foreground)]"
                  : "bg-[color:color-mix(in_srgb,var(--destructive)_14%,var(--card)_86%)] text-[var(--destructive)]"
              }`}
            >
              {feedback.text}
            </p>
          ) : null}

          <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3">
            {visibleItems.map((item) => (
              <GameItem
                key={item.id}
                id={item.id}
                name={item.name}
                type={item.type}
                icon={item.icon}
                isDraggable={gameStatus === "playing"}
              />
            ))}
          </div>

          <Separator />

          <div className="sticky bottom-0 border-t border-[var(--border)] bg-[color:color-mix(in_srgb,var(--card)_80%,transparent)] py-6 backdrop-blur-md">
            <div className="flex justify-center gap-6">
              {BIN_CONFIGS.map((bin) => (
                <Bin
                  key={bin.type}
                  label={bin.label}
                  icon={bin.icon}
                  type={bin.type}
                  baseClassName={bin.baseClassName}
                  state={binState[bin.type]}
                  onDropItem={handleDropItem}
                />
              ))}
            </div>
          </div>
        </>
      ) : null}
    </section>
  );
}
