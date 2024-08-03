import React from "react";
import { Button } from "./ui/button";
import { Folders } from "lucide-react";
import { useFinderState } from "@/store/use-finder-state";

export default function FooterActionBar() {
  const { onOpen, isFinderOpen, onClose } = useFinderState();
  return (
    <div className="fixed bottom-3 left-[50%] -translate-x-[50%] w-[650px] h-[70px] bg-muted rounded-xl flex items-center px-3 py-2 z-10">
      <div className="relative">
        <Button
          onClick={() => {
            isFinderOpen ? onClose() : onOpen();
          }}
        >
          <Folders />
        </Button>
        {isFinderOpen && (
          <div className="size-[6px] absolute -bottom-3 left-[50%] -translate-x-[50%] rounded-full bg-gray-500" />
        )}
      </div>
    </div>
  );
}
