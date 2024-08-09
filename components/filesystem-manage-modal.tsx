"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FilesystemActions,
  FilesystemCreateType,
  useFilesystemManageModalStore,
} from "@/store/use-filesystem-manage-modal-store";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFilesystemStore } from "@/store/use-filesystem-store";
import { useRightClickFilesystemStore } from "@/store/use-right-click-filesystem-store";

const formSchema = z.object({
  name: z.string().min(1).max(50),
});

export default function FilesystemManageModal() {
  const { addNewNode, updateNode, setCurrentSelectedNode } =
    useFilesystemStore();
  const { setRightClickState } = useRightClickFilesystemStore();
  const { isOpen, onClose, node, type, action } =
    useFilesystemManageModalStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: node?.name || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!node) {
      return;
    }

    if (action === FilesystemActions.CREATE) {
      const newNode =
        type === FilesystemCreateType.FILE
          ? { name: values.name }
          : { name: values.name, nodes: [] };

      addNewNode(node?.name!, newNode);
      const newCurrentSelectedNode = {
        name: node.name,
        nodes: [...node?.nodes!, newNode],
      };

      // TODO: Need to add logic to setup current node correctly for pre and next buttons
      setCurrentSelectedNode(newCurrentSelectedNode);
      setRightClickState(null);
      form.reset();
      onClose();
      return;
    }

    if (action === FilesystemActions.UPDATE) {
      const newNode =
        type === FilesystemCreateType.FILE
          ? { name: values.name }
          : { name: values.name, nodes: node.nodes };

      updateNode(node?.name!, newNode);

      const newCurrentSelectedNode = {
        name: newNode.name,
        nodes: [...node?.nodes!],
      };

      setCurrentSelectedNode(newCurrentSelectedNode);
      setRightClickState(null);
      form.reset();
      onClose();
      return;
    }
  }

  const open =
    isOpen &&
    (action === FilesystemActions.CREATE ||
      action === FilesystemActions.UPDATE);

  return (
    <Dialog open={open} onOpenChange={onClose}>
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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Awesome"
                      {...field}
                      className="text-neutral-900"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Add</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
