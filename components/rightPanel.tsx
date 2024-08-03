import UseResizeWidth from "@/hooks/use-resize-width";
import React, { useRef } from "react";
import { Node } from "@/type";
import RightPanelActionBar from "./right-panel-action-bar";
import RightPanelNodeItem from "./right-panel-node-item";

type RightPanelProps = {
  selectedNode: Node | null;
  handleNodeClick: (node: Node) => void;
  backHistory: Node[];
  forwardHistory: Node[];
  handlePrevClick: () => void;
  handleNextClick: () => void;
};

export default function RightPanel({
  selectedNode,
  handleNodeClick,
  backHistory,
  forwardHistory,
  handlePrevClick,
  handleNextClick,
}: RightPanelProps) {
  const rightPanelRef = useRef<HTMLDivElement | null>(null);
  const { width } = UseResizeWidth(rightPanelRef);

  return (
    <div ref={rightPanelRef} className="flex h-full flex-col ">
      <RightPanelActionBar
        selectedNode={selectedNode}
        handleNextClick={handleNextClick}
        handlePrevClick={handlePrevClick}
        backHistory={backHistory}
        forwardHistory={forwardHistory}
      />

      {selectedNode?.nodes && selectedNode?.nodes?.length > 0 ? (
        <ul className="grid grid-cols-4 gap-3">
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
          <p className="text-muted-foreground">No folder found</p>
        </div>
      ) : (
        <div className="h-full w-full flex justify-center items-center">
          <p className="text-muted-foreground">Select a folder</p>
        </div>
      )}
    </div>
  );
}
