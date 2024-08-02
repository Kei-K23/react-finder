"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import { Expand, File, Folder, Minus, X } from "lucide-react";
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
  const [selectedNodes, setSelectedNodes] = useState<Node>();

  const leftPanelRef = useRef<HTMLDivElement | null>(null);
  const { width } = UseResizeWidth(leftPanelRef);
  const handlePrimaryNodeClick = (node: Node) => {
    setSelectedNodes(node);
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
                  selectedNodes?.name === node.name && "bg-neutral-300/30"
                )}
                key={node.name}
                onClick={() => handlePrimaryNodeClick(node)}
              >
                {node.name}
              </li>
            ))}
          </ul>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={70}>
        <div ref={leftPanelRef} className="flex h-full flex-col p-6">
          {selectedNodes?.nodes && selectedNodes?.nodes?.length > 0 ? (
            <ul className="">
              {selectedNodes?.nodes?.map((node) => (
                <li key={node.name}>
                  <span className="flex items-center flex-col gap-1">
                    {node.nodes ? (
                      <Folder className="size-12 fill-blue-400" />
                    ) : (
                      <File className="size-12 fill-gray-200" />
                    )}
                    {node.name}
                  </span>
                </li>
              ))}
            </ul>
          ) : selectedNodes?.name ? (
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
