import React, { useRef } from "react";
import { useFinderState } from "@/store/use-finder-state";
import { ImFinder } from "react-icons/im";
import ActionTooltip from "./action-tooltip";
import { useFinderStateMinimize } from "@/store/use-finder-minimize-state";
import useResizeWidthAndHeight from "@/hooks/use-resize-width-and-height";
import { Separator } from "./ui/separator";
import gsap from "gsap";

type FooterActionBarProps = {
  footerRef: React.MutableRefObject<HTMLDivElement | null>;
  mainLayoutRef: React.MutableRefObject<HTMLDivElement | null>;
  headerRef: React.MutableRefObject<HTMLDivElement | null>;
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
};

export default function FooterActionBar({
  footerRef,
  mainLayoutRef,
  headerRef,
  containerRef,
}: FooterActionBarProps) {
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const { onOpen, isFinderOpen, setFinderMinimizeState } = useFinderState();
  const { isFinderMinimize, finderMinimizeClose, prevState } =
    useFinderStateMinimize();
  const { resetSize } = useResizeWidthAndHeight({
    containerRef,
    mainLayoutRef,
    headerRef,
    footerRef,
  });
  return (
    <div
      ref={footerRef}
      className="fixed bottom-3 left-[50%] -translate-x-[50%] w-auto h-[70px] rounded-xl flex items-center px-3 py-2 z-10 bg-gray-700 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-50 border border-gray-500 transition-all"
    >
      <div className="mr-auto ">
        <ActionTooltip title="Finder" offSet={20}>
          <div className="relative">
            <div ref={buttonRef} className="size-12 bg-white rounded-lg">
              <ImFinder
                onClick={() => {
                  if (!isFinderOpen) {
                    // Click bounce animation
                    gsap.to(buttonRef.current, {
                      y: -50,
                      duration: 0.3,
                      onComplete: () => {
                        gsap.to(buttonRef.current, {
                          y: 0,
                          duration: 0.2,
                        });
                      },
                    });
                    if (prevState === null) {
                      resetSize();
                      onOpen();
                    } else {
                      setFinderMinimizeState(prevState);
                      finderMinimizeClose();
                      onOpen();
                    }
                  }
                }}
                className="w-full h-full text-sky-600 "
              />
            </div>
            {isFinderOpen && (
              <div className="size-[5px] absolute -bottom-2 left-[50%] -translate-x-[50%] rounded-full bg-gray-300" />
            )}
          </div>
        </ActionTooltip>
      </div>

      {isFinderMinimize && (
        <>
          <Separator orientation="vertical" className="mx-4" />
          <div>
            <ActionTooltip
              title={prevState?.selectedNode?.name! || "Finder"}
              offSet={20}
            >
              <div className="relative">
                <div className="size-12 bg-white rounded-lg">
                  <ImFinder
                    onClick={() => {
                      setFinderMinimizeState(prevState);
                      finderMinimizeClose();
                      onOpen();
                    }}
                    className="w-full h-full text-sky-600 "
                  />
                </div>
                {isFinderOpen && (
                  <div className="size-[5px] absolute -bottom-2 left-[50%] -translate-x-[50%] rounded-full bg-gray-300" />
                )}
              </div>
            </ActionTooltip>
          </div>
        </>
      )}
    </div>
  );
}
