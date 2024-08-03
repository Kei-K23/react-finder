import React, { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";
import { Expand, Minus, X } from "lucide-react";
import { useFinderState } from "@/store/use-finder-state";

type WindowActionsContainerProps = {
  handleMouseDown: (e: React.MouseEvent) => void;
  mainLayoutRef: React.MutableRefObject<HTMLDivElement | null>;
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
  setSize: Dispatch<
    SetStateAction<{
      width: number;
      height: number;
    }>
  >;
};

export default function WindowActionsContainer({
  handleMouseDown,
  mainLayoutRef,
  containerRef,
  setSize,
}: WindowActionsContainerProps) {
  const { isFinderClose, finderClose, finderOpen, onClose } = useFinderState();
  const handleResize = () => {
    if (isFinderClose) {
      setSize({
        width: mainLayoutRef?.current?.clientWidth!,
        height: mainLayoutRef?.current?.clientHeight!,
      });
      finderOpen();
    } else {
      setSize({
        width: 800,
        height: 500,
      });
      finderClose();
    }
  };
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
        onClick={handleResize}
      >
        <Expand className="size-[12px] text-neutral-800 font-semibold stroke-[3px] hidden group-hover:block" />
        <div className="size-[12px] block group-hover:hidden" />
      </Button>
    </div>
  );
}
