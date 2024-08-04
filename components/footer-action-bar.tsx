import React from "react";
import { useFinderState } from "@/store/use-finder-state";
import { ImFinder } from "react-icons/im";
import ActionTooltip from "./action-tooltip";

type FooterActionBarProps = {
  footerRef: React.MutableRefObject<HTMLDivElement | null>;
};

export default function FooterActionBar({ footerRef }: FooterActionBarProps) {
  const { onOpen, isfinderResizeOpen, onClose } = useFinderState();
  return (
    <div
      ref={footerRef}
      className="fixed bottom-3 left-[50%] -translate-x-[50%] w-[650px] h-[70px] rounded-xl flex items-center px-3 py-2 z-10 bg-gray-700 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-50 border border-gray-500"
    >
      <ActionTooltip title="Finder" offSet={20}>
        <div className="relative">
          <div className="size-12 bg-white rounded-lg">
            <ImFinder
              onClick={() => {
                isfinderResizeOpen ? onClose() : onOpen();
              }}
              className="w-full h-full text-sky-600 "
            />
          </div>
          {isfinderResizeOpen && (
            <div className="size-[5px] absolute -bottom-2 left-[50%] -translate-x-[50%] rounded-full bg-gray-300" />
          )}
        </div>
      </ActionTooltip>
    </div>
  );
}
