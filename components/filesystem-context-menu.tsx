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
import { PERMANENT_FOLDER } from "@/constant";
import { useRightClickFilesystemStore } from "@/store/use-right-click-filesystem-store";

type FilesystemContextMenuProps = {
  children: React.ReactNode;
  isModifiable?: boolean;
};

export default function FilesystemContextMenu({
  children,
  isModifiable = true,
}: FilesystemContextMenuProps) {
  const { onOpen, setAction } = useFilesystemManageModalStore();
  const { rightClickState, setRightClickState, setTempRightClickState } =
    useRightClickFilesystemStore();
  const isFile = !rightClickState?.nodes;
  return (
    <ContextMenu
      onOpenChange={(e) => {
        if (!e) {
          setRightClickState(null);
          setTempRightClickState(null);
        }
      }}
    >
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="bg-neutral-700 bg-clip-padding backdrop-filter flex flex-col backdrop-blur-xl bg-opacity-100 select-none text-neutral-100 border-gray-500 cursor-pointer">
        {!isFile && (
          <>
            <ContextMenuItem
              onClick={() => {
                setAction(FilesystemActions.CREATE);
                onOpen(FilesystemCreateType.FILE);
              }}
            >
              new file
            </ContextMenuItem>
            <ContextMenuItem
              onClick={() => {
                setAction(FilesystemActions.CREATE);
                onOpen(FilesystemCreateType.FOLDER);
              }}
            >
              new folder
            </ContextMenuItem>
          </>
        )}
        {isModifiable && (
          <>
            {!PERMANENT_FOLDER.includes(rightClickState?.name!) && (
              <ContextMenuItem
                onClick={() => {
                  if (!rightClickState) {
                    return;
                  }
                  setAction(FilesystemActions.DELETE);
                  onOpen(
                    rightClickState?.nodes
                      ? FilesystemCreateType.FOLDER
                      : FilesystemCreateType.FILE,
                    rightClickState!
                  );
                }}
              >
                Delete
              </ContextMenuItem>
            )}
            <ContextMenuItem
              onClick={() => {
                if (!rightClickState) {
                  return;
                }

                setAction(FilesystemActions.UPDATE);
                onOpen(
                  rightClickState.nodes
                    ? FilesystemCreateType.FOLDER
                    : FilesystemCreateType.FILE,
                  rightClickState
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
