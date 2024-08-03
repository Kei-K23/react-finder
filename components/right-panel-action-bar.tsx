import React from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Node } from "@/type";

type RightPanelActionBarProps = {
  selectedNode: Node | null;
  backHistory: Node[];
  forwardHistory: Node[];
  handlePrevClick: () => void;
  handleNextClick: () => void;
  handleMouseDown: (e: React.MouseEvent) => void;
};

export default function RightPanelActionBar({
  selectedNode,
  handlePrevClick,
  handleNextClick,
  backHistory,
  forwardHistory,
  handleMouseDown,
}: RightPanelActionBarProps) {
  return (
    <div
      onMouseDown={handleMouseDown}
      className="flex items-center w-full h-12 bg-gray-200 mb-4 px-4 py-2 cursor-grab select-none"
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
