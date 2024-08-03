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
};

export default function RightPanelActionBar({
  selectedNode,
  handlePrevClick,
  handleNextClick,
  backHistory,
  forwardHistory,
}: RightPanelActionBarProps) {
  return (
    <div className="flex items-center w-full h-12 bg-gray-200 mb-4 px-4 py-2">
      <div className="flex items-center">
        <Button
          variant={"ghost"}
          size={"xs"}
          disabled={backHistory.length === 0}
          onClick={handlePrevClick}
        >
          <ChevronLeft />
        </Button>
        <Button
          variant={"ghost"}
          size={"xs"}
          disabled={forwardHistory.length === 0}
          onClick={handleNextClick}
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
