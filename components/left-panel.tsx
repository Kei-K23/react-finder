"use client";

import React from "react";
import WindowActionsContainer from "./window-actions-container";
import { Node } from "@/type";
import LeftPanelNodeItem from "./left-panel-node-item";
import FilesystemContextMenu from "./filesystem-context-menu";
import { useRightClickFilesystemStore } from "@/store/use-right-click-filesystem-store";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { reorderNodes } from "@/lib/utils";
import { useFilesystemStore } from "@/store/use-filesystem-store";

type LeftPanelProps = {
  nodes: Node[];
  selectedNode: Node | null;
  backHistory: Node[];
  forwardHistory: Node[];
  handleNodeClick: (node: Node) => void;
  handleMouseDown: (e: React.MouseEvent) => void;
  mainLayoutRef: React.MutableRefObject<HTMLDivElement | null>;
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
  headerRef: React.MutableRefObject<HTMLDivElement | null>;
  footerRef: React.MutableRefObject<HTMLDivElement | null>;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
};

export default function LeftPanel({
  nodes,
  selectedNode,
  handleNodeClick,
  handleMouseDown,
  mainLayoutRef,
  containerRef,
  headerRef,
  footerRef,
  setHeight,
  setWidth,
  backHistory,
  forwardHistory,
}: LeftPanelProps) {
  const { setTempRightClickState, setLeftState } =
    useRightClickFilesystemStore();
  const { nodes: storageNodes, setNodes } = useFilesystemStore();

  const handleRightClick = (node: Node | null) => {
    setTempRightClickState(node);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { delay: 100, tolerance: 100 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!active || !over || active.id === over.id) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    // Reorder the nodes based on the drag-and-drop operation
    const reorderNodeResults = reorderNodes(storageNodes, activeId, overId);
    setNodes(reorderNodeResults);
  }

  return (
    <FilesystemContextMenu>
      <div
        onContextMenu={(e) => {
          if (!e.defaultPrevented) {
            setLeftState(true);
          }
        }}
        className="flex flex-col h-full w-full bg-neutral-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-70 "
      >
        <WindowActionsContainer
          handleMouseDown={handleMouseDown}
          mainLayoutRef={mainLayoutRef}
          containerRef={containerRef}
          headerRef={headerRef}
          footerRef={footerRef}
          selectedNode={selectedNode}
          backHistory={backHistory}
          forwardHistory={forwardHistory}
          setHeight={setHeight}
          setWidth={setWidth}
        />
        <p className="text-xs text-neutral-300 p-2 select-none">Favorites</p>
        <ul className="select-none p-2">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={(e) => {
              handleDragEnd(e);
            }}
          >
            <SortableContext
              items={nodes}
              strategy={verticalListSortingStrategy}
            >
              {nodes.map((node) => (
                <FilesystemContextMenu key={node.name}>
                  <LeftPanelNodeItem
                    key={node.name}
                    node={node}
                    selectedNode={selectedNode}
                    handleNodeClick={handleNodeClick}
                    handleRightClick={handleRightClick}
                  />
                </FilesystemContextMenu>
              ))}
            </SortableContext>
          </DndContext>
        </ul>
      </div>
    </FilesystemContextMenu>
  );
}
