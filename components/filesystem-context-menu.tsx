import React from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  FilesystemActions,
  FilesystemCreateType,
  useFilesystemManageModalStore,
} from "@/store/use-filesystem-manage-modal-store";
import { useFilesystemStore } from "@/store/use-filesystem-store";
import { Node } from "@/type";
import { PERMANENT_FOLDER } from "@/constant";

type FilesystemContextMenuProps = {
  children: React.ReactNode;
  isModifiable?: boolean;
  currentNode: Node;
};

export default function FilesystemContextMenu({
  children,
  isModifiable = true,
  currentNode,
}: FilesystemContextMenuProps) {
  const { currentSelectedNode, setCurrentSelectedNode } = useFilesystemStore();
  const { onOpen, setAction } = useFilesystemManageModalStore();

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="bg-neutral-700 bg-clip-padding backdrop-filter flex flex-col backdrop-blur-xl bg-opacity-100 select-none text-neutral-100 border-gray-500 cursor-pointer">
        <ContextMenuItem
          onClick={() => {
            setCurrentSelectedNode(currentNode);
            setAction(FilesystemActions.CREATE);
            onOpen(FilesystemCreateType.FILE);
          }}
        >
          new file
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => {
            setAction(FilesystemActions.CREATE);
            setCurrentSelectedNode(currentNode);
            onOpen(FilesystemCreateType.FOLDER);
          }}
        >
          new folder
        </ContextMenuItem>
        {isModifiable && (
          <>
            {!PERMANENT_FOLDER.includes(currentSelectedNode?.name!) && (
              <ContextMenuItem
                onClick={() => {
                  setAction(FilesystemActions.DELETE);
                  onOpen(
                    currentNode.nodes
                      ? FilesystemCreateType.FOLDER
                      : FilesystemCreateType.FILE,
                    currentNode
                  );
                }}
              >
                Delete
              </ContextMenuItem>
            )}
            <ContextMenuItem
              onClick={() => {
                if (!currentSelectedNode) {
                  return;
                }

                setAction(FilesystemActions.UPDATE);
                onOpen(
                  currentNode.nodes
                    ? FilesystemCreateType.FOLDER
                    : FilesystemCreateType.FILE,
                  currentNode
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
