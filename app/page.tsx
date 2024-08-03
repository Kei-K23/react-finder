"use client";

import Finder from "@/components/finder";
import useDraggable from "@/hooks/use-draggable";
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { handleMouseDown } = useDraggable({
    containerRef,
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <div ref={containerRef} className="absolute w-[672px]">
        <Finder handleMouseDown={handleMouseDown} />
      </div>
    </main>
  );
}
