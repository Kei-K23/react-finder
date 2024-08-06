import { Node } from "@/type";
import { File, Folder } from "lucide-react";
import React from "react";

type RightPanelNodeItemProps = {
  node: Node;
  handleNodeClick: (node: Node) => void;
};

export default function RightPanelNodeItem({
  node,
  handleNodeClick,
}: RightPanelNodeItemProps) {
  return (
    <li
      key={node.name}
      onDoubleClick={(e) => {
        e.stopPropagation();
        handleNodeClick(node);
      }}
    >
      <div className="flex items-center flex-col gap-1">
        {node.nodes ? (
          <Folder className="size-16 fill-blue-400 text-blue-400" />
        ) : (
          <File className="size-16 fill-gray-200" />
        )}
        <span className=" text-wrap text-[13px] text-neutral-100">
          {node.name}
        </span>
      </div>
    </li>
  );
}
