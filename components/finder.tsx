import React, { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";

import { Node } from "@/type";
import LeftPanel from "./left-panel";
import RightPanel from "./right-panel";
import { useFinderState } from "@/store/use-finder-state";
import { useFilesystemStore } from "@/store/use-filesystem-store";

type FinderProps = {
  handleMouseDown: (e: React.MouseEvent) => void;
  mainLayoutRef: React.MutableRefObject<HTMLDivElement | null>;
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
  headerRef: React.MutableRefObject<HTMLDivElement | null>;
  footerRef: React.MutableRefObject<HTMLDivElement | null>;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
  width: number;
  height: number;
};

export default function Finder({
  handleMouseDown,
  mainLayoutRef,
  containerRef,
  headerRef,
  footerRef,
  setHeight,
  setWidth,
  width,
  height,
}: FinderProps) {
  const { nodes, currentSelectedNode, setCurrentSelectedNode } =
    useFilesystemStore();

  const [selectedNode, setSelectedNode] = useState<Node | null>(
    currentSelectedNode
  );

  useEffect(() => {
    // TODO: Check to find better way to handle this state
    // Update the current selected node value
    setSelectedNode(currentSelectedNode);
  }, [nodes, currentSelectedNode]);

  const { finderMinimizeState } = useFinderState();

  const [backHistory, setBackHistory] = useState<Node[]>(
    finderMinimizeState?.backHistory || []
  );
  const [forwardHistory, setForwardHistory] = useState<Node[]>(
    finderMinimizeState?.forwardHistory || []
  );

  const handleNodeClick = (node: Node) => {
    if (!node.nodes) {
      return;
    }
    setBackHistory((prevHistory) => [...prevHistory, selectedNode!]);
    setForwardHistory([]);
    setCurrentSelectedNode(node);
    setSelectedNode(node);
  };

  const handlePrevClick = () => {
    if (backHistory.length === 0) {
      return;
    }
    const prevNode = backHistory[backHistory.length - 1];
    setBackHistory((prevHistory) => prevHistory.slice(0, -1));
    setForwardHistory((prevHistory) => [selectedNode!, ...prevHistory]);
    setSelectedNode(prevNode);
    setCurrentSelectedNode(prevNode);
  };

  const handleNextClick = () => {
    if (forwardHistory.length === 0) {
      return;
    }
    const nextNode = forwardHistory[0];
    setForwardHistory((prevHistory) => prevHistory.slice(1));
    setBackHistory((prevHistory) => [...prevHistory, selectedNode!]);
    setCurrentSelectedNode(nextNode);
    setSelectedNode(nextNode);
  };

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="rounded-lg border border-gray-500 drop-shadow-3xl"
    >
      <ResizablePanel defaultSize={20}>
        <LeftPanel
          nodes={nodes}
          handleNodeClick={handleNodeClick}
          handleMouseDown={handleMouseDown}
          mainLayoutRef={mainLayoutRef}
          containerRef={containerRef}
          headerRef={headerRef}
          footerRef={footerRef}
          setWidth={setWidth}
          setHeight={setHeight}
          selectedNode={selectedNode}
          backHistory={backHistory}
          forwardHistory={forwardHistory}
        />
      </ResizablePanel>
      <ResizableHandle
        withHandle={false}
        className="border-[0.7px] border-gray-500"
      />
      <ResizablePanel defaultSize={80}>
        <RightPanel
          selectedNode={selectedNode}
          handleNodeClick={handleNodeClick}
          handleNextClick={handleNextClick}
          handlePrevClick={handlePrevClick}
          backHistory={backHistory}
          forwardHistory={forwardHistory}
          handleMouseDown={handleMouseDown}
          mainLayoutRef={mainLayoutRef}
          headerRef={headerRef}
          footerRef={footerRef}
          setWidth={setWidth}
          setHeight={setHeight}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
