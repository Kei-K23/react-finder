import React, { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";

import { Node } from "@/type";
import LeftPanel from "./left-panel";
import RightPanel from "./right-panel";

const nodes: Node[] = [
  {
    name: "Recents",
    nodes: [],
  },
  {
    name: "Home",
    nodes: [
      {
        name: "Movies",
        nodes: [
          {
            name: "Action",
            nodes: [
              {
                name: "2000s",
                nodes: [
                  { name: "Gladiator.mp4" },
                  { name: "The-Dark-Knight.mp4" },
                ],
              },
              { name: "2010s", nodes: [] },
            ],
          },
          {
            name: "Comedy",
            nodes: [{ name: "2000s", nodes: [{ name: "Superbad.mp4" }] }],
          },
          {
            name: "Drama",
            nodes: [
              { name: "2000s", nodes: [{ name: "American-Beauty.mp4" }] },
            ],
          },
        ],
      },
      {
        name: "Music",
        nodes: [
          { name: "Rock", nodes: [] },
          { name: "Classical", nodes: [] },
        ],
      },
      { name: "Pictures", nodes: [] },
      {
        name: "Documents",
        nodes: [],
      },
      { name: "passwords.txt" },
    ],
  },
  {
    name: "Desktop",
    nodes: [],
  },
];

type FinderProps = {
  handleMouseDown: (e: React.MouseEvent) => void;
};

export default function Finder({ handleMouseDown }: FinderProps) {
  const [backHistory, setBackHistory] = useState<Node[]>([]);
  const [forwardHistory, setForwardHistory] = useState<Node[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const handleNodeClick = (node: Node) => {
    if (!node.nodes) {
      return;
    }
    setBackHistory((prevHistory) => [...prevHistory, selectedNode!]);
    setForwardHistory([]);
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
  };

  const handleNextClick = () => {
    if (forwardHistory.length === 0) {
      return;
    }
    const nextNode = forwardHistory[0];
    setForwardHistory((prevHistory) => prevHistory.slice(1));
    setBackHistory((prevHistory) => [...prevHistory, selectedNode!]);
    setSelectedNode(nextNode);
  };

  return (
    <ResizablePanelGroup direction="horizontal" className="rounded-lg border">
      <ResizablePanel defaultSize={20}>
        <LeftPanel
          nodes={nodes}
          selectedNode={selectedNode}
          handleNodeClick={handleNodeClick}
          handleMouseDown={handleMouseDown}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={80}>
        <RightPanel
          selectedNode={selectedNode}
          handleNodeClick={handleNodeClick}
          handleNextClick={handleNextClick}
          handlePrevClick={handlePrevClick}
          backHistory={backHistory}
          forwardHistory={forwardHistory}
          handleMouseDown={handleMouseDown}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
