"use client";
import FilesystemDeleteModal from "@/components/filesystem-delete-modal";
import FilesystemManageModal from "@/components/filesystem-manage-modal";
import useClientCheck from "@/hooks/use-client-check";
import React from "react";

export default function ModalProvider() {
  const { isClient } = useClientCheck();
  if (!isClient) {
    return null;
  }
  return (
    <>
      <FilesystemManageModal />
      <FilesystemDeleteModal />
    </>
  );
}
