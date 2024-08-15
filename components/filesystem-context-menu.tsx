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
import { useRightClickFilesystemStore } from "@/store/use-right-click-filesystem-store";
import { useFilesystemStore } from "@/store/use-filesystem-store";
import { getTopLevelNodeNames } from "@/lib/utils";

type FilesystemContextMenuProps = {
  children: React.ReactNode;
  isModifiable?: boolean;
};

export default function FilesystemContextMenu({
  children,
  isModifiable = true,
}: FilesystemContextMenuProps) {
  const { onOpen, setAction, setNode } = useFilesystemManageModalStore();
  const {
    rightClickState,
    setRightClickState,
    setTempRightClickState,
    leftState,
  } = useRightClickFilesystemStore();
  const { nodes: storageNodes } = useFilesystemStore();
  const isFile = !rightClickState?.nodes;
  const PERMANENT_FOLDER = getTopLevelNodeNames(storageNodes);
  return (
    <ContextMenu
      onOpenChange={(e) => {
        if (!e) {
          // Setting null to setRightClickState will no update immediately because useState is sync
          setRightClickState(null);
          setTempRightClickState(null);
          if (rightClickState) {
            setNode(rightClickState!);
          }
        }
      }}
    >
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="bg-neutral-700 bg-clip-padding backdrop-filter flex flex-col backdrop-blur-xl bg-opacity-100 select-none text-neutral-100 border-gray-500 cursor-pointer overflow-auto">
        {/* TODO: Fix logic here */}
        {leftState ? (
          <>
            <ContextMenuItem
              onClick={() => {
                setAction(FilesystemActions.CREATE);
                onOpen(FilesystemCreateType.FOLDER);
              }}
            >
              new folder
            </ContextMenuItem>
          </>
        ) : (
          !isFile && (
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
          )
        )}
        {isModifiable && (
          <>
            {!PERMANENT_FOLDER.includes(rightClickState?.name!) &&
              !leftState && (
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
                  className="text-red-500"
                >
                  Delete
                </ContextMenuItem>
              )}
            {!leftState && (
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
            )}
          </>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
}
