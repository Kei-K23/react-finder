"use client";

import Finder from "@/components/finder";
import FooterActionBar from "@/components/footer-action-bar";
import HeaderActon from "@/components/header-action";
import useDraggable from "@/hooks/use-draggable";
import useResizeWidthAndHeight from "@/hooks/use-resize-width-and-height";
import { cn } from "@/lib/utils";
import { useFinderState } from "@/store/use-finder-state";
import { useRef } from "react";

export default function Home() {
  const { isFinderOpen, isFinderResizeClose } = useFinderState();

  const headerRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mainLayoutRef = useRef<HTMLDivElement | null>(null);
  const { size, ResizeControlElements, setSize } = useResizeWidthAndHeight({
    containerRef,
    footerRef,
    mainLayoutRef,
    headerRef,
  });
  const { handleMouseDown } = useDraggable({
    containerRef,
  });

  return (
    <div
      ref={mainLayoutRef}
      className="flex min-h-screen flex-col items-center justify-center overflow-hidden"
    >
      <HeaderActon headerRef={headerRef} />
      <img
        src={"/wallpaper_1.jpg"}
        alt="wallpaper image"
        className="w-full h-full absolute object-cover select-none"
      />
      {isFinderOpen && (
        <div
          ref={containerRef}
          className={cn("absolute")}
          style={{
            width: size.width,
            height: size.height,
            top: !isFinderResizeClose ? headerRef?.current?.clientHeight : "",
            left: !isFinderResizeClose ? 0 : "",
          }}
        >
          <Finder
            handleMouseDown={handleMouseDown}
            mainLayoutRef={mainLayoutRef}
            containerRef={containerRef}
            headerRef={headerRef}
            footerRef={footerRef}
            setSize={setSize}
            size={size}
          />
          <ResizeControlElements />
        </div>
      )}
      <FooterActionBar footerRef={footerRef} />
    </div>
  );
}
