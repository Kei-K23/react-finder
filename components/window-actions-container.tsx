import React from "react";
import { Button } from "./ui/button";
import { Expand, Minus, X } from "lucide-react";
import { useFinderState } from "@/store/use-finder-state";

type WindowActionsContainerProps = {
  handleMouseDown: (e: React.MouseEvent) => void;
};

export default function WindowActionsContainer({
  handleMouseDown,
}: WindowActionsContainerProps) {
  const { onClose } = useFinderState();

  return (
    <div
      className="flex items-center gap-x-1 w-full h-12 p-2 cursor-grab"
      onMouseDown={handleMouseDown}
    >
      <Button
        size={"xsm"}
        variant={"destructive"}
        className="group"
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
        onClick={onClose}
      >
        <X className="size-[12px] text-neutral-800 font-semibold stroke-[3px] hidden group-hover:block" />
        <div className="size-[12px] block group-hover:hidden" />
      </Button>
      <Button
        size={"xsm"}
        variant={"warning"}
        className="group"
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
      >
        <Minus className="size-[12px] text-neutral-800 font-semibold stroke-[3px] hidden group-hover:block" />
        <div className="size-[12px] block group-hover:hidden" />
      </Button>
      <Button
        size={"xsm"}
        variant={"success"}
        className="group"
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
      >
        <Expand className="size-[12px] text-neutral-800 font-semibold stroke-[3px] hidden group-hover:block" />
        <div className="size-[12px] block group-hover:hidden" />
      </Button>
    </div>
  );
}
