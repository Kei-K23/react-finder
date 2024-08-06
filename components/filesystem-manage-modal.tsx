import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FilesystemCreateType,
  useFilesystemManageModalStore,
} from "@/store/use-filesystem-manage-modal-store";

export default function FilesystemManageModal() {
  const { isOpen, onClose, node, type } = useFilesystemManageModalStore();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-neutral-700 bg-clip-padding backdrop-filter flex items-center flex-col backdrop-blur-xl bg-opacity-100 select-none text-neutral-100 border-gray-500">
        <DialogHeader>
          <DialogTitle>
            {!node
              ? type === FilesystemCreateType.FILE
                ? "Create new file"
                : "Create new folder"
              : type === FilesystemCreateType.FILE
              ? "Rename the file"
              : "Rename the folder"}
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
