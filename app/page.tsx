"use client";

import Finder from "@/components/finder";
import FooterActionBar from "@/components/footer-action-bar";
import useDraggable from "@/hooks/use-draggable";
import useResizeWidthAndHeight from "@/hooks/use-resize-width-and-height";
import { useFinderState } from "@/store/use-finder-state";
import { useRef } from "react";

export default function Home() {
  const { isFinderOpen } = useFinderState();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const { size, ResizeControlElements } = useResizeWidthAndHeight({
    containerRef,
  });
  const { handleMouseDown } = useDraggable({
    containerRef,
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {isFinderOpen && (
        <div
          ref={containerRef}
          className="absolute"
          style={{
            width: size.width,
            height: size.height,
          }}
        >
          <Finder handleMouseDown={handleMouseDown} />
          <ResizeControlElements />
        </div>
      )}
      <FooterActionBar />
    </main>
  );
}
