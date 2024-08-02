import React, { useState } from "react";
import { Node } from "./file-tree-container";
import { Folder, File, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type FileTreeItemProps = {
  node: Node;
};

export default function FileTreeItem({ node }: FileTreeItemProps) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <li key={node.name}>
      <span className="flex items-center gap-1.5 py-1">
        {node.nodes && node.nodes.length > 0 && (
          <ChevronRight
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "size-5 cursor-pointer stroke-[2.3px] text-gray-500",
              isOpen && "rotate-90"
            )}
          />
        )}

        {node.nodes ? (
          <Folder
            className={cn(
              "fill-blue-400",
              node.nodes.length === 0 && "ml-[26px]"
            )}
          />
        ) : (
          <File className="ml-[26px]" />
        )}
        {node.name}
      </span>
      {isOpen && (
        <ul className="pl-6">
          {node.nodes?.map((node) => (
            <FileTreeItem key={node.name} node={node} />
          ))}
        </ul>
      )}
    </li>
  );
}
