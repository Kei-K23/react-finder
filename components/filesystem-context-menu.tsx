import React from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

type FilesystemContextMenuProps = {
  children: React.ReactNode;
  isModifiable?: boolean;
};

export default function FilesystemContextMenu({
  children,
  isModifiable = true,
}: FilesystemContextMenuProps) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="bg-neutral-700 bg-clip-padding backdrop-filter flex flex-col backdrop-blur-xl bg-opacity-100 select-none text-neutral-100 border-gray-500 cursor-pointer">
        <ContextMenuItem>new file</ContextMenuItem>
        <ContextMenuItem>new folder</ContextMenuItem>
        {isModifiable && (
          <>
            <ContextMenuItem>Delete</ContextMenuItem>
            <ContextMenuItem>Edit</ContextMenuItem>
          </>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
}
