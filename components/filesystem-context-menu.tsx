import React from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  FilesystemCreateType,
  useFilesystemManageModalStore,
} from "@/store/use-filesystem-manage-modal-store";
import { useFilesystemStore } from "@/store/use-filesystem-store";

type FilesystemContextMenuProps = {
  children: React.ReactNode;
  isModifiable?: boolean;
};

export default function FilesystemContextMenu({
  children,
  isModifiable = true,
}: FilesystemContextMenuProps) {
  const { currentSelectedNode } = useFilesystemStore();
  const { onOpen } = useFilesystemManageModalStore();
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="bg-neutral-700 bg-clip-padding backdrop-filter flex flex-col backdrop-blur-xl bg-opacity-100 select-none text-neutral-100 border-gray-500 cursor-pointer">
        <ContextMenuItem onClick={() => onOpen(FilesystemCreateType.FILE)}>
          new file
        </ContextMenuItem>
        <ContextMenuItem onClick={() => onOpen(FilesystemCreateType.FOLDER)}>
          new folder
        </ContextMenuItem>
        {isModifiable && (
          <>
            <ContextMenuItem>Delete</ContextMenuItem>
            <ContextMenuItem
              onClick={() => {
                if (!currentSelectedNode) {
                  return;
                }
                onOpen(
                  currentSelectedNode.nodes
                    ? FilesystemCreateType.FOLDER
                    : FilesystemCreateType.FILE,
                  currentSelectedNode
                );
              }}
            >
              Rename
            </ContextMenuItem>
          </>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
}
