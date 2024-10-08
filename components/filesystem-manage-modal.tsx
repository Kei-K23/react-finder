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
import { v4 as uuidv4 } from "uuid";
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
import {
  findNodeByName,
  getNextOrderNumber,
  getNextOrderNumberAtTopLevel,
} from "@/lib/utils";
import { toast } from "sonner";
import { updateNode as updatedNode } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(1).max(50),
});

export default function FilesystemManageModal() {
  const {
    addNewNode,
    addNewNodeForLeft,
    updateNode,
    setCurrentSelectedNode,
    nodes: storageNodes,
    currentSelectedNode,
  } = useFilesystemStore();
  const { setRightClickState, leftState, setLeftState } =
    useRightClickFilesystemStore();
  const { isOpen, onClose, node, type, action } =
    useFilesystemManageModalStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // UUID
    const newNodeId = uuidv4();

    // Create file in the left side of finder
    if (leftState) {
      const nextOrderNumberForTopLevel =
        getNextOrderNumberAtTopLevel(storageNodes);
      const newNodeForLeft =
        type === FilesystemCreateType.FILE
          ? {
              id: newNodeId,
              name: values.name,
              order: nextOrderNumberForTopLevel,
            }
          : {
              id: newNodeId,
              name: values.name,
              nodes: [],
              order: nextOrderNumberForTopLevel,
            };

      addNewNodeForLeft(newNodeForLeft);
      form.reset();
      setLeftState(false);
      onClose();
      return;
    } else {
      if (!node) {
        return;
      }

      const isExistingNode = findNodeByName(storageNodes, values.name);

      if (!!isExistingNode) {
        toast.error(`'${values.name}' name already been taken`);
        return;
      }

      if (action === FilesystemActions.CREATE) {
        const nextNewOrderNumber = getNextOrderNumber(storageNodes, node.name);

        const newNode =
          type === FilesystemCreateType.FILE
            ? {
                id: newNodeId,
                name: values.name,
                order: nextNewOrderNumber,
              }
            : {
                id: newNodeId,
                name: values.name,
                nodes: [],
                order: nextNewOrderNumber,
              };

        addNewNode(node?.name!, newNode);

        const newCurrentSelectedNode = {
          id: node.id,
          name: node.name,
          nodes: [...node?.nodes!, newNode],
          order: node.order,
        };

        // TODO: Need to add logic to setup current node correctly for pre and next buttons
        setCurrentSelectedNode(newCurrentSelectedNode);
        setRightClickState(null);
        setLeftState(false);
        form.reset();
        onClose();
        return;
      }

      if (action === FilesystemActions.UPDATE) {
        const newNode =
          type === FilesystemCreateType.FILE
            ? { id: node.id, name: values.name, order: node.order }
            : {
                id: node.id,
                name: values.name,
                nodes: node.nodes,
                order: node.order,
              };

        updateNode(node?.name!, newNode);
        const newStateForCurrent = updatedNode(
          currentSelectedNode?.nodes!,
          node?.name!,
          newNode.name!
        );

        const newCurrentSelectedNode = {
          id: currentSelectedNode?.id!,
          name: currentSelectedNode?.name!,
          nodes: [...newStateForCurrent],
          order: currentSelectedNode?.order!,
        };

        // TODO: Implement logic to prevent from entering to the folder when updating
        setCurrentSelectedNode(newCurrentSelectedNode);
        setRightClickState(null);
        form.reset();
        onClose();
        return;
      }
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
            {type === FilesystemCreateType.FILE
              ? "Manage the file"
              : "Manage the folder"}
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
            <Button type="submit">Save</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
