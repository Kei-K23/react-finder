import React from "react";
import { Button } from "./ui/button";
import { Minus, X } from "lucide-react";
import { useFinderState } from "@/store/use-finder-state";
import { RiExpandDiagonal2Fill } from "react-icons/ri";
import useResizeWindow from "@/hooks/use-resize-window";
import { Node } from "@/type";
import { useFinderStateMinimize } from "@/store/use-finder-minimize-state";
import { useFilesystemStore } from "@/store/use-filesystem-store";

type WindowActionsContainerProps = {
  handleMouseDown: (e: React.MouseEvent) => void;
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
  mainLayoutRef: React.MutableRefObject<HTMLDivElement | null>;
  headerRef: React.MutableRefObject<HTMLDivElement | null>;
  footerRef: React.MutableRefObject<HTMLDivElement | null>;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
  selectedNode: Node | null;
  backHistory: Node[];
  forwardHistory: Node[];
};

export default function WindowActionsContainer({
  handleMouseDown,
  containerRef,
  mainLayoutRef,
  headerRef,
  footerRef,
  setHeight,
  setWidth,
  selectedNode,
  backHistory,
  forwardHistory,
}: WindowActionsContainerProps) {
  const { currentSelectedNode } = useFilesystemStore();
  const { onClose, onOpen, setFinderMinimizeState } = useFinderState();
  const { finderMinimizeOpen, finderMinimizeClose, isFinderMinimize } =
    useFinderStateMinimize();
  const { handleResize } = useResizeWindow({
    headerRef,
    mainLayoutRef,
    footerRef,
    setWidth,
    setHeight,
  });

  const handleFinderMinimize = () => {
    if (isFinderMinimize) {
      finderMinimizeClose();
      onOpen();
    } else {
      const containerCtx = containerRef?.current?.getBoundingClientRect();
      finderMinimizeOpen({
        size: {
          width: containerCtx?.width!,
          height: containerCtx?.height!,
        },
        position: {
          top: containerCtx?.top!,
          left: containerCtx?.left!,
        },
        backHistory,
        forwardHistory,
        selectedNode: currentSelectedNode,
      });
      onClose();
    }
  };

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
        onClick={() => {
          setFinderMinimizeState(null);
          onClose();
        }}
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
        onClick={(e) => {
          e.stopPropagation();
          handleFinderMinimize();
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
