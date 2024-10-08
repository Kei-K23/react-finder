"use client";

import Finder from "@/components/finder";
import FooterActionBar from "@/components/footer-action-bar";
import HeaderActon from "@/components/header-action";
import useDraggable from "@/hooks/use-draggable";
import useResizeWidthAndHeight from "@/hooks/use-resize-width-and-height";
import { cn } from "@/lib/utils";
import { useFinderState } from "@/store/use-finder-state";
import { useSettingsStore } from "@/store/use-settings-store";
import { useRef } from "react";

export default function Home() {
  const { wallpaper } = useSettingsStore();
  const { isFinderOpen, isFinderResizeClose, finderMinimizeState } =
    useFinderState();

  const headerRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mainLayoutRef = useRef<HTMLDivElement | null>(null);
  const { width, height, ResizeControlElements, setWidth, setHeight } =
    useResizeWidthAndHeight({
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
        src={wallpaper}
        alt="wallpaper image"
        className="w-full h-full absolute object-cover select-none"
      />
      {isFinderOpen && (
        <div
          ref={containerRef}
          className={cn("absolute")}
          style={{
            width: width,
            height: height,
            top: !isFinderResizeClose
              ? headerRef?.current?.clientHeight
              : finderMinimizeState?.position !== null
              ? finderMinimizeState?.position.top
              : "",
            left: !isFinderResizeClose
              ? 0
              : finderMinimizeState?.position !== null
              ? finderMinimizeState?.position.left
              : "",
          }}
        >
          <Finder
            handleMouseDown={handleMouseDown}
            mainLayoutRef={mainLayoutRef}
            containerRef={containerRef}
            headerRef={headerRef}
            footerRef={footerRef}
            setWidth={setWidth}
            setHeight={setHeight}
            width={width}
            height={height}
          />
          <ResizeControlElements />
        </div>
      )}
      <FooterActionBar
        mainLayoutRef={mainLayoutRef}
        containerRef={containerRef}
        headerRef={headerRef}
        footerRef={footerRef}
      />
    </div>
  );
}
