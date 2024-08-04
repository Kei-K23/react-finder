"use client";

import { DEFAULT_SIZE_FOR_FINDER } from "@/constant";
import { useFinderState } from "@/store/use-finder-state";
import React, { Dispatch, SetStateAction } from "react";

type UseResizeWindowProps = {
  mainLayoutRef: React.MutableRefObject<HTMLDivElement | null>;
  footerRef: React.MutableRefObject<HTMLDivElement | null>;
  headerRef: React.MutableRefObject<HTMLDivElement | null>;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
};

export default function useResizeWindow({
  mainLayoutRef,
  headerRef,
  footerRef,
  setWidth,
  setHeight,
}: UseResizeWindowProps) {
  const { isFinderResizeClose, finderResizeClose, finderResizeOpen } =
    useFinderState();

  const handleResize = () => {
    const footerCtx = footerRef?.current?.getBoundingClientRect();
    const mainCtx = mainLayoutRef?.current?.getBoundingClientRect();
    const footerHeightAndPosition =
      footerCtx?.height! + (mainCtx?.height! - footerCtx?.bottom!);

    if (isFinderResizeClose) {
      setWidth(mainLayoutRef?.current?.clientWidth!);
      setHeight(
        mainLayoutRef?.current?.clientHeight! -
          (headerRef?.current?.clientHeight! + footerHeightAndPosition!)
      );
      // setSize({
      //   width: mainLayoutRef?.current?.clientWidth!,
      //   height:
      //     mainLayoutRef?.current?.clientHeight! -
      //     (headerRef?.current?.clientHeight! + footerHeightAndPosition!),
      // });
      finderResizeOpen();
    } else {
      setWidth(DEFAULT_SIZE_FOR_FINDER.width);
      setHeight(DEFAULT_SIZE_FOR_FINDER.height);
      // setSize({
      //   width: 800,
      //   height: 500,
      // });
      finderResizeClose();
    }
  };

  return { handleResize };
}
