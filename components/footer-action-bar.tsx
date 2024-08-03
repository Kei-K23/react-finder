import React from "react";
import { Button } from "./ui/button";
import { Folders } from "lucide-react";
import { useFinderState } from "@/store/use-finder-state";

export default function FooterActionBar() {
  const { onOpen, isFinderOpen, onClose } = useFinderState();
  return (
    <div className="fixed bottom-3 left-[50%] -translate-x-[50%] w-[650px] h-[70px] rounded-xl flex items-center px-3 py-2 z-10 bg-gray-700 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-50 border border-gray-500">
      <div className="relative">
        <Button
          onClick={() => {
            isFinderOpen ? onClose() : onOpen();
          }}
          variant={"secondary"}
        >
          <Folders />
        </Button>
        {isFinderOpen && (
          <div className="size-[6px] absolute -bottom-3 left-[50%] -translate-x-[50%] rounded-full bg-gray-300" />
        )}
      </div>
    </div>
  );
}
