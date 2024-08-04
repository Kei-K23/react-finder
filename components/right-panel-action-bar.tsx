import React, { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Node } from "@/type";
import { useFinderState } from "@/store/use-finder-state";
import useResizeWindow from "@/hooks/use-resize-window";

type RightPanelActionBarProps = {
  selectedNode: Node | null;
  backHistory: Node[];
  forwardHistory: Node[];
  handlePrevClick: () => void;
  handleNextClick: () => void;
  handleMouseDown: (e: React.MouseEvent) => void;
  mainLayoutRef: React.MutableRefObject<HTMLDivElement | null>;
  headerRef: React.MutableRefObject<HTMLDivElement | null>;
  footerRef: React.MutableRefObject<HTMLDivElement | null>;
  setSize: Dispatch<
    SetStateAction<{
      width: number;
      height: number;
    }>
  >;
};

export default function RightPanelActionBar({
  selectedNode,
  handlePrevClick,
  handleNextClick,
  backHistory,
  forwardHistory,
  handleMouseDown,
  mainLayoutRef,
  headerRef,
  footerRef,
  setSize,
}: RightPanelActionBarProps) {
  const { isFinderResizeClose, finderResizeClose, finderResizeOpen } =
    useFinderState();
  const { handleResize } = useResizeWindow({
    headerRef,
    mainLayoutRef,
    footerRef,
    setSize,
  });

  return (
    <div
      onMouseDown={handleMouseDown}
      className="flex items-center w-full h-12 px-4 py-2 cursor-grab select-none bg-neutral-700 text-neutral-100"
      onDoubleClick={handleResize}
    >
      <div className="flex items-center">
        <Button
          variant={"ghost"}
          size={"xs"}
          disabled={backHistory.length === 0}
          onClick={(e) => {
            e.stopPropagation();
            handlePrevClick();
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
          }}
        >
          <ChevronLeft />
        </Button>
        <Button
          variant={"ghost"}
          size={"xs"}
          disabled={forwardHistory.length === 0}
          onClick={handleNextClick}
          onMouseDown={(e) => {
            e.stopPropagation();
          }}
        >
          <ChevronRight />
        </Button>
        <span className="ml-1 text-sm font-extrabold">
          {selectedNode?.name}
        </span>
      </div>
    </div>
  );
}
