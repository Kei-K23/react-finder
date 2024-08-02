"use client";
import React, { useRef, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import {
  ChevronLeft,
  ChevronRight,
  Expand,
  File,
  Folder,
  Minus,
  X,
} from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import UseResizeWidth from "@/hooks/use-resize-width";

export type Node = {
  name: string;
  nodes?: Node[];
};

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

export default function FileTreeContainer() {
  const [backHistory, setBackHistory] = useState<Node[]>([]);
  const [forwardHistory, setForwardHistory] = useState<Node[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const leftPanelRef = useRef<HTMLDivElement | null>(null);
  const { width } = UseResizeWidth(leftPanelRef);

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
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[500px] max-w-2xl rounded-lg border"
    >
      <ResizablePanel defaultSize={30}>
        <div className="flex h-full flex-col p-3">
          <div className="mb-4 flex items-center gap-x-1">
            <Button size={"xsm"} variant={"destructive"}>
              <X className="size-[14px]" />
            </Button>
            <Button size={"xsm"} variant={"warning"}>
              <Minus className="size-[14px]" />
            </Button>
            <Button size={"xsm"} variant={"success"}>
              <Expand className="size-[14px]" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">Favorites</p>
          <ul>
            {nodes.map((node) => (
              <li
                className={cn(
                  "cursor-pointer hover:bg-neutral-300/30 transition-all rounded-lg px-2 py-1 text-[15px]",
                  selectedNode?.name === node.name && "bg-neutral-300/30"
                )}
                key={node.name}
                onClick={() => handleNodeClick(node)}
              >
                {node.name}
              </li>
            ))}
          </ul>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={70}>
        <div ref={leftPanelRef} className="flex h-full flex-col ">
          <div className="flex items-center w-full h-12 bg-gray-200 mb-4 px-4 py-2">
            <div className="flex items-center">
              <Button
                variant={"ghost"}
                size={"xs"}
                disabled={backHistory.length === 0}
                onClick={handlePrevClick}
              >
                <ChevronLeft />
              </Button>
              <Button
                variant={"ghost"}
                size={"xs"}
                disabled={forwardHistory.length === 0}
                onClick={handleNextClick}
              >
                <ChevronRight />
              </Button>
              <span className="ml-1 text-sm font-extrabold">
                {selectedNode?.name}
              </span>
            </div>
          </div>

          {selectedNode?.nodes && selectedNode?.nodes?.length > 0 ? (
            <ul className="grid grid-cols-4 gap-3">
              {selectedNode?.nodes?.map((node) => (
                <li key={node.name} onClick={() => handleNodeClick(node)}>
                  <div className="flex items-center flex-col gap-1">
                    {node.nodes ? (
                      <Folder className="size-10 fill-blue-400" />
                    ) : (
                      <File className="size-10 fill-gray-200" />
                    )}
                    <span className=" text-wrap ">{node.name}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : selectedNode?.name ? (
            <div className="h-full w-full flex justify-center items-center">
              <p className="text-muted-foreground">No folder found</p>
            </div>
          ) : (
            <div className="h-full w-full flex justify-center items-center">
              <p className="text-muted-foreground">Select a folder</p>
            </div>
          )}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
