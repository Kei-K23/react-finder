"use client";
import React, { useEffect, useState } from "react";

export default function UseResizeWidth<T>(
  refEle: React.MutableRefObject<HTMLDivElement | null>
) {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      if (refEle?.current) {
        setWidth(refEle?.current.offsetWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial width

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (refEle?.current) {
      const observer = new ResizeObserver(() => {
        setWidth(refEle?.current!.offsetWidth);
      });

      observer.observe(refEle?.current);

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return { width };
}
