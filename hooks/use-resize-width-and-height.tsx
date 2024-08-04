import { useFinderState } from "@/store/use-finder-state";
import React, { useState } from "react";

type UseResizeWidthAndHeightProps = {
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
  mainLayoutRef: React.MutableRefObject<HTMLDivElement | null>;
  footerRef: React.MutableRefObject<HTMLDivElement | null>;
  headerRef: React.MutableRefObject<HTMLDivElement | null>;
};

export default function useResizeWidthAndHeight({
  containerRef,
  mainLayoutRef,
  footerRef,
  headerRef,
}: UseResizeWidthAndHeightProps) {
  const [size, setSize] = useState({ width: 800, height: 500 });
  const { isFinderResizeClose, finderResizeClose } = useFinderState();

  const handleResize = (e: MouseEvent, direction: string) => {
    const container = containerRef.current;
    const footerCtx = footerRef?.current?.getBoundingClientRect();
    const mainCtx = mainLayoutRef?.current?.getBoundingClientRect();
    const headerHeight =
      headerRef?.current?.getBoundingClientRect().height || 0;
    const footerHeight =
      footerCtx?.height! + (mainCtx?.height! - footerCtx?.bottom!);

    if (container) {
      const rect = container.getBoundingClientRect();
      const newWidth = e.clientX - rect.left;
      const newHeight = e.clientY - rect.top;

      if (direction.includes("right")) {
        setSize((prevSize) => ({
          ...prevSize,
          width: newWidth,
        }));
      }
      if (direction.includes("left")) {
        setSize((prevSize) => ({
          ...prevSize,
          width: rect.right - e.clientX,
        }));
        container.style.left = `${e.clientX}px`;
      }
      if (direction.includes("bottom")) {
        const potentialNewHeight = e.clientY - rect.top;
        if (
          potentialNewHeight <=
          mainCtx?.height! - headerHeight - footerHeight
        ) {
          setSize((prevSize) => ({
            ...prevSize,
            height: potentialNewHeight,
          }));
        }
      }
      if (direction.includes("top")) {
        const potentialNewHeight = rect.bottom - e.clientY;
        const newTopPosition = e.clientY;

        if (isFinderResizeClose || headerHeight <= newTopPosition) {
          setSize((prevSize) => ({
            ...prevSize,
            height: potentialNewHeight,
          }));
          container.style.top = `${newTopPosition}px`;
        }
      }
    }
  };

  const startResizing = (e: React.MouseEvent, direction: string) => {
    e.preventDefault();
    const onMouseMove = (event: MouseEvent) => handleResize(event, direction);
    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const ResizeControlElements = () => (
    <>
      <div
        onMouseDown={(e) => startResizing(e, "right")}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "10px",
          height: "100%",
          cursor: "ew-resize",
        }}
      />
      <div
        onMouseDown={(e) => startResizing(e, "left")}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "10px",
          height: "100%",
          cursor: "ew-resize",
        }}
      />
      <div
        onMouseDown={(e) => startResizing(e, "bottom")}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "10px",
          cursor: "ns-resize",
        }}
      />
      <div
        onMouseDown={(e) => startResizing(e, "top")}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "10px",
          cursor: "ns-resize",
        }}
      />
      <div
        onMouseDown={(e) => {
          finderResizeClose();
          startResizing(e, "bottom-right");
        }}
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "10px",
          height: "10px",
          cursor: "nwse-resize",
        }}
      />
      <div
        onMouseDown={(e) => {
          // Behavior to reset the state to close full max windows for Finder when resize to corner
          finderResizeClose();
          startResizing(e, "bottom-left");
        }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "10px",
          height: "10px",
          cursor: "nesw-resize",
        }}
      />
      <div
        onMouseDown={(e) => {
          finderResizeClose();
          startResizing(e, "top-right");
        }}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "10px",
          height: "10px",
          cursor: "nesw-resize",
        }}
      />
      <div
        onMouseDown={(e) => {
          finderResizeClose();
          startResizing(e, "top-left");
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "10px",
          height: "10px",
          cursor: "nwse-resize",
        }}
      />
    </>
  );

  return { ResizeControlElements, size, setSize };
}
