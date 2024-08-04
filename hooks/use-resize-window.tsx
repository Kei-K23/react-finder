"use client";

import { useFinderState } from "@/store/use-finder-state";
import React, { Dispatch, SetStateAction } from "react";

type UseResizeWindowProps = {
  mainLayoutRef: React.MutableRefObject<HTMLDivElement | null>;
  footerRef: React.MutableRefObject<HTMLDivElement | null>;
  headerRef: React.MutableRefObject<HTMLDivElement | null>;
  setSize: Dispatch<
    SetStateAction<{
      width: number;
      height: number;
    }>
  >;
};

export default function useResizeWindow({
  mainLayoutRef,
  headerRef,
  footerRef,
  setSize,
}: UseResizeWindowProps) {
  const { isFinderResizeClose, finderResizeClose, finderResizeOpen } =
    useFinderState();

  const handleResize = () => {
    const footerCtx = footerRef?.current?.getBoundingClientRect();
    const mainCtx = mainLayoutRef?.current?.getBoundingClientRect();
    const footerHeightAndPosition =
      footerCtx?.height! + (mainCtx?.height! - footerCtx?.bottom!);

    if (isFinderResizeClose) {
      setSize({
        width: mainLayoutRef?.current?.clientWidth!,
        height:
          mainLayoutRef?.current?.clientHeight! -
          (headerRef?.current?.clientHeight! + footerHeightAndPosition!),
      });
      finderResizeOpen();
    } else {
      setSize({
        width: 800,
        height: 500,
      });
      finderResizeClose();
    }
  };

  return { handleResize };
}
