import useGetIconBasedOnFileExtension from "@/hooks/use-get-icon-based-on-file-extension";
import { cn } from "@/lib/utils";
import { useRightClickFilesystemStore } from "@/store/use-right-click-filesystem-store";
import { Node } from "@/type";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Folder } from "lucide-react";
import React from "react";
import { Skeleton } from "./ui/skeleton";

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
  const { setRightClickState, rightClickState } =
    useRightClickFilesystemStore();
  const IconNode = useGetIconBasedOnFileExtension(node.name);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: node.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      style={style}
      ref={setNodeRef}
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
      {...attributes}
      {...listeners}
    >
      <div className="flex items-center flex-col gap-1">
        {node.nodes ? (
          <Folder className="size-16 fill-blue-400 text-blue-400" />
        ) : (
          <IconNode className="size-16 fill-gray-200" />
        )}
        <span
          className={cn(
            "text-wrap text-[13px] text-neutral-100",
            rightClickState?.name === node.name && "text-blue-500"
          )}
        >
          {node.name}
        </span>
      </div>
    </li>
  );
}

export const RightPanelNodeItemSkeleton = () => {
  return <Skeleton className="size-16 rounded-md bg-white/20" />;
};
