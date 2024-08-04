import React, { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";
import { Minus, X } from "lucide-react";
import { useFinderState } from "@/store/use-finder-state";
import { RiExpandDiagonal2Fill } from "react-icons/ri";
import useResizeWindow from "@/hooks/use-resize-window";

type WindowActionsContainerProps = {
  handleMouseDown: (e: React.MouseEvent) => void;
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
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

export default function WindowActionsContainer({
  handleMouseDown,
  containerRef,
  mainLayoutRef,
  headerRef,
  footerRef,
  setSize,
}: WindowActionsContainerProps) {
  const { onClose } = useFinderState();
  const { handleResize } = useResizeWindow({
    headerRef,
    mainLayoutRef,
    footerRef,
    setSize,
  });

  return (
    <div
      className="flex items-center gap-x-1 w-full h-12 p-2 cursor-grab"
      onMouseDown={handleMouseDown}
      onDoubleClick={handleResize}
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
        <RiExpandDiagonal2Fill className="size-[12px] text-neutral-800 font-semibold stroke-[2px] hidden group-hover:block" />
        <div className="size-[12px] block group-hover:hidden" />
      </Button>
    </div>
  );
}
