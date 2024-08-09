import { cn } from "@/lib/utils";
import { useRightClickFilesystemStore } from "@/store/use-right-click-filesystem-store";
import { Node } from "@/type";
import React from "react";

type LeftPanelNodeItemProps = {
  node: Node;
  selectedNode: Node | null;
  handleNodeClick: (node: Node) => void;
  handleRightClick: (node: Node | null) => void;
};

export default function LeftPanelNodeItem({
  node,
  selectedNode,
  handleNodeClick,
  handleRightClick,
}: LeftPanelNodeItemProps) {
  const { setRightClickState } = useRightClickFilesystemStore();
  return (
    <li
      className={cn(
        "cursor-pointer hover:bg-neutral-300/15 transition-all rounded-lg px-2 py-1 text-[15px] text-neutral-100",
        selectedNode?.name === node.name && "bg-neutral-300/15"
      )}
      key={node?.name}
      onClick={() => handleNodeClick(node)}
      onContextMenu={(e) => {
        if (!node) {
          return;
        }
        handleRightClick(node);
        setRightClickState(node);
      }}
    >
      {node.name}
    </li>
  );
}
