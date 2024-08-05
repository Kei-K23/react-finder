import React, { Dispatch, SetStateAction, useRef } from "react";
import { Node } from "@/type";
import RightPanelActionBar from "./right-panel-action-bar";
import RightPanelNodeItem from "./right-panel-node-item";
import useWidthChange from "@/hooks/use-width-change";
import { cn } from "@/lib/utils";

type RightPanelProps = {
  selectedNode: Node | null;
  handleNodeClick: (node: Node) => void;
  backHistory: Node[];
  forwardHistory: Node[];
  handlePrevClick: () => void;
  handleNextClick: () => void;
  handleMouseDown: (e: React.MouseEvent) => void;
  mainLayoutRef: React.MutableRefObject<HTMLDivElement | null>;
  headerRef: React.MutableRefObject<HTMLDivElement | null>;
  footerRef: React.MutableRefObject<HTMLDivElement | null>;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
};

export default function RightPanel({
  selectedNode,
  handleNodeClick,
  backHistory,
  forwardHistory,
  handlePrevClick,
  handleNextClick,
  handleMouseDown,
  mainLayoutRef,
  headerRef,
  footerRef,
  setWidth,
  setHeight,
}: RightPanelProps) {
  const rightPanelRef = useRef<HTMLDivElement | null>(null);
  const { width: rightPanelWidth } = useWidthChange(rightPanelRef);

  return (
    <div ref={rightPanelRef} className="flex h-full flex-col bg-neutral-800">
      <RightPanelActionBar
        handleMouseDown={handleMouseDown}
        selectedNode={selectedNode}
        handleNextClick={handleNextClick}
        handlePrevClick={handlePrevClick}
        backHistory={backHistory}
        forwardHistory={forwardHistory}
        mainLayoutRef={mainLayoutRef}
        headerRef={headerRef}
        footerRef={footerRef}
        setHeight={setHeight}
        setWidth={setWidth}
      />

      {selectedNode?.nodes && selectedNode?.nodes?.length > 0 ? (
        <ul
          className={cn(
            "grid grid-cols-2 gap-3 overflow-auto p-3  scrollbar-thin",
            rightPanelWidth > 400 && rightPanelWidth < 500 && "grid-cols-2",
            rightPanelWidth > 500 && rightPanelWidth < 600 && "grid-cols-3",
            rightPanelWidth > 600 && rightPanelWidth < 700 && "grid-cols-4",
            rightPanelWidth > 700 && rightPanelWidth < 800 && "grid-cols-5",
            rightPanelWidth > 800 && rightPanelWidth < 900 && "grid-cols-6",
            rightPanelWidth > 900 && rightPanelWidth < 1000 && "grid-cols-7",
            rightPanelWidth > 1000 && rightPanelWidth < 1100 && "grid-cols-8",
            rightPanelWidth > 1100 && rightPanelWidth < 1200 && "grid-cols-9",
            rightPanelWidth > 1200 && rightPanelWidth < 1300 && "grid-cols-10",
            rightPanelWidth > 1300 && rightPanelWidth < 1400 && "grid-cols-11",
            rightPanelWidth > 1400 && rightPanelWidth < 1500 && "grid-cols-12",
            rightPanelWidth > 1500 && rightPanelWidth < 1600 && "grid-cols-13",
            rightPanelWidth > 1600 && rightPanelWidth < 1700 && "grid-cols-14",
            rightPanelWidth > 1700 && rightPanelWidth < 1800 && "grid-cols-15",
            rightPanelWidth > 1800 && rightPanelWidth < 1900 && "grid-cols-16",
            rightPanelWidth > 1900 && rightPanelWidth < 2000 && "grid-cols-17"
          )}
        >
          {selectedNode?.nodes?.map((node) => (
            <RightPanelNodeItem
              key={node.name}
              node={node}
              handleNodeClick={handleNodeClick}
            />
          ))}
        </ul>
      ) : selectedNode?.name ? (
        <div className="h-full w-full flex justify-center items-center">
          <p className="text-muted-foreground">No item found</p>
        </div>
      ) : (
        <div className="h-full w-full flex justify-center items-center">
          <p className="text-muted-foreground">Select a folder</p>
        </div>
      )}
    </div>
  );
}
