import React, { useState } from "react";

type UseResizeWidthAndHeightProps = {
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
};

export default function useResizeWidthAndHeight({
  containerRef,
}: UseResizeWidthAndHeightProps) {
  const [size, setSize] = useState({ width: 800, height: 500 });

  const handleResize = (e: MouseEvent, direction: string) => {
    const container = containerRef.current;
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
        setSize((prevSize) => ({
          ...prevSize,
          height: newHeight,
        }));
      }
      if (direction.includes("top")) {
        setSize((prevSize) => ({
          ...prevSize,
          height: rect.bottom - e.clientY,
        }));
        container.style.top = `${e.clientY}px`;
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
        onMouseDown={(e) => startResizing(e, "bottom-right")}
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
        onMouseDown={(e) => startResizing(e, "bottom-left")}
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
        onMouseDown={(e) => startResizing(e, "top-right")}
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
        onMouseDown={(e) => startResizing(e, "top-left")}
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
  return { ResizeControlElements, size };
}
