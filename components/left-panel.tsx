import React, { Dispatch, SetStateAction } from "react";
import WindowActionsContainer from "./window-actions-container";
import { Node } from "@/type";
import LeftPanelNodeItem from "./left-panel-node-item";

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
  setSize: Dispatch<
    SetStateAction<{
      width: number;
      height: number;
    }>
  >;
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
  setSize,
  backHistory,
  forwardHistory,
}: LeftPanelProps) {
  return (
    <div className="flex flex-col h-full w-full bg-gray-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-70 ">
      <WindowActionsContainer
        handleMouseDown={handleMouseDown}
        mainLayoutRef={mainLayoutRef}
        containerRef={containerRef}
        headerRef={headerRef}
        footerRef={footerRef}
        setSize={setSize}
        selectedNode={selectedNode}
        backHistory={backHistory}
        forwardHistory={forwardHistory}
      />
      <p className="text-xs text-neutral-300 p-2">Favorites</p>
      <ul className="select-none p-2">
        {nodes.map((node) => (
          <LeftPanelNodeItem
            key={node.name}
            node={node}
            selectedNode={selectedNode}
            handleNodeClick={handleNodeClick}
          />
        ))}
      </ul>
    </div>
  );
}
