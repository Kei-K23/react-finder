"use client";

import Finder from "@/components/finder";
import FooterActionBar from "@/components/footer-action-bar";
import useDraggable from "@/hooks/use-draggable";
import useResizeWidthAndHeight from "@/hooks/use-resize-width-and-height";
import { cn } from "@/lib/utils";
import { useFinderState } from "@/store/use-finder-state";
import { useRef } from "react";

export default function Home() {
  const { isFinderOpen, isFinderClose } = useFinderState();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const mainLayoutRef = useRef<HTMLDivElement | null>(null);
  const { size, ResizeControlElements, setSize } = useResizeWidthAndHeight({
    containerRef,
  });
  const { handleMouseDown } = useDraggable({
    containerRef,
  });

  return (
    <div
      ref={mainLayoutRef}
      className="flex min-h-screen flex-col items-center justify-center overflow-hidden"
    >
      {isFinderOpen && (
        <div
          ref={containerRef}
          className={cn("absolute")}
          style={{
            width: size.width,
            height: size.height,
            top: !isFinderClose ? 0 : "",
            left: !isFinderClose ? 0 : "",
          }}
        >
          <Finder
            handleMouseDown={handleMouseDown}
            mainLayoutRef={mainLayoutRef}
            containerRef={containerRef}
            setSize={setSize}
          />
          <ResizeControlElements />
        </div>
      )}
      <FooterActionBar />
    </div>
  );
}
