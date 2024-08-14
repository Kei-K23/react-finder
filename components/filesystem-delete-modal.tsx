"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FilesystemActions,
  FilesystemCreateType,
  useFilesystemManageModalStore,
} from "@/store/use-filesystem-manage-modal-store";

import { Button } from "@/components/ui/button";
import { useFilesystemStore } from "@/store/use-filesystem-store";
import { findNodeByName } from "@/lib/utils";
import { toast } from "sonner";

export default function FilesystemDeleteModal() {
  const { isOpen, onClose, node, action, type } =
    useFilesystemManageModalStore();

  const {
    nodes: storageNodes,
    deleteNode,
    currentSelectedNode,
    setCurrentSelectedNode,
  } = useFilesystemStore();

  const handleDelete = () => {
    const isExistingNode = findNodeByName(storageNodes, node?.name!);
    if (isExistingNode === undefined) {
      toast.error(`'${node?.name!}' is not exist to delete`);
      return;
    }

    deleteNode(node?.name!);
    const newCurrentSelectedNode = {
      id: currentSelectedNode?.id!,
      order: currentSelectedNode?.order!,
      name: currentSelectedNode?.name!,
      nodes: currentSelectedNode?.nodes?.filter((n) => n.name !== node?.name),
    };

    setCurrentSelectedNode(newCurrentSelectedNode);
    onClose();
  };

  const open = isOpen && action === FilesystemActions.DELETE;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-neutral-700 bg-clip-padding backdrop-filter flex items-center flex-col backdrop-blur-xl bg-opacity-100 select-none text-neutral-100 border-gray-500">
        <DialogHeader>
          <DialogTitle>
            Are you sure to delete this {node?.name}{" "}
            {type === FilesystemCreateType.FILE ? "file" : "folder"}?
          </DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant={"destructive"} onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
