import React, { Dispatch, SetStateAction } from "react";
import WindowActionsContainer from "./window-actions-container";
import { Node } from "@/type";
import LeftPanelNodeItem from "./left-panel-node-item";

type LeftPanelProps = {
  nodes: Node[];
  selectedNode: Node | null;
  handleNodeClick: (node: Node) => void;
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

export default function LeftPanel({
  nodes,
  selectedNode,
  handleNodeClick,
  handleMouseDown,
  mainLayoutRef,
  containerRef,
  setSize,
}: LeftPanelProps) {
  return (
    <div className="flex flex-col h-full w-full bg-gray-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-50 ">
      <WindowActionsContainer
        handleMouseDown={handleMouseDown}
        mainLayoutRef={mainLayoutRef}
        containerRef={containerRef}
        setSize={setSize}
      />
      <p className="text-xs text-neutral-300 p-2">Favorites</p>
      <ul className="select-none p-2">
        {nodes.map((node) => (
          <LeftPanelNodeItem
            key={node.name}
            node={node}
            selectedNode={selectedNode}
            handleNodeClick={handleNodeClick}
          />
        ))}
      </ul>
    </div>
  );
}
