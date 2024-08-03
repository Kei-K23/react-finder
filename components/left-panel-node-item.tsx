import { cn } from "@/lib/utils";
import { Node } from "@/type";
import React from "react";

type LeftPanelNodeItemProps = {
  node: Node;
  selectedNode: Node | null;
  handleNodeClick: (node: Node) => void;
};

export default function LeftPanelNodeItem({
  node,
  selectedNode,
  handleNodeClick,
}: LeftPanelNodeItemProps) {
  return (
    <li
      className={cn(
        "cursor-pointer hover:bg-neutral-300/30 transition-all rounded-lg px-2 py-1 text-[15px]",
        selectedNode?.name === node.name && "bg-neutral-300/30"
      )}
      key={node?.name}
      onClick={() => handleNodeClick(node)}
    >
      {node.name}
    </li>
  );
}
