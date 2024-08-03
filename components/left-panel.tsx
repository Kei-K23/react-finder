import React from "react";
import WindowActionsContainer from "./window-actions-container";
import { Node } from "@/type";
import LeftPanelNodeItem from "./left-panel-node-item";

type LeftPanelProps = {
  nodes: Node[];
  selectedNode: Node | null;
  handleNodeClick: (node: Node) => void;
  handleMouseDown: (e: React.MouseEvent) => void;
};

export default function LeftPanel({
  nodes,
  selectedNode,
  handleNodeClick,
  handleMouseDown,
}: LeftPanelProps) {
  return (
    <div className="flex h-full flex-col">
      <WindowActionsContainer handleMouseDown={handleMouseDown} />
      <p className="text-xs text-muted-foreground p-2">Favorites</p>
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
