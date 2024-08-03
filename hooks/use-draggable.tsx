import React, { useState } from "react";

type UseDraggableProps = {
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
};

export default function useDraggable({ containerRef }: UseDraggableProps) {
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    console.log("hrer");

    const container = containerRef.current;
    if (container) {
      const rect = container.getBoundingClientRect();
      setOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setDragging(true);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (dragging && containerRef.current) {
      containerRef.current.style.left = `${e.clientX - offset.x}px`;
      containerRef.current.style.top = `${e.clientY - offset.y}px`;
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  React.useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  return { handleMouseDown };
}
