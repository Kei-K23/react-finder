import useGetIconBasedOnFileExtension from "@/hooks/use-get-icon-based-on-file-extension";
import { useRightClickFilesystemStore } from "@/store/use-right-click-filesystem-store";
import { Node } from "@/type";
import { Folder } from "lucide-react";
import React from "react";

type RightPanelNodeItemProps = {
  node: Node;
  handleNodeClick: (node: Node) => void;
  handleRightClick: (node: Node | null) => void;
};

export default function RightPanelNodeItem({
  node,
  handleNodeClick,
  handleRightClick,
}: RightPanelNodeItemProps) {
  const { setRightClickState } = useRightClickFilesystemStore();
  const IconNode = useGetIconBasedOnFileExtension(node.name);

  return (
    <li
      key={node.name}
      onDoubleClick={(e) => {
        e.stopPropagation();
        handleNodeClick(node);
      }}
      onContextMenu={(e) => {
        if (!node) {
          return;
        }
        handleRightClick(node);
        setRightClickState(node);
      }}
    >
      <div className="flex items-center flex-col gap-1">
        {node.nodes ? (
          <Folder className="size-16 fill-blue-400 text-blue-400" />
        ) : (
          <IconNode className="size-16 fill-gray-200" />
        )}
        <span className=" text-wrap text-[13px] text-neutral-100">
          {node.name}
        </span>
      </div>
    </li>
  );
}
