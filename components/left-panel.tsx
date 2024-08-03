import React from "react";
import WindowActionsContainer from "./window-actions-container";
import { Node } from "@/type";
import LeftPanelNodeItem from "./left-panel-node-item";

type LeftPanelProps = {
  nodes: Node[];
  selectedNode: Node | null;
  handleNodeClick: (node: Node) => void;
};

export default function LeftPanel({
  nodes,
  selectedNode,
  handleNodeClick,
}: LeftPanelProps) {
  return (
    <div className="flex h-full flex-col p-3">
      <WindowActionsContainer />
      <p className="text-xs text-muted-foreground">Favorites</p>
      <ul className="select-none">
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
