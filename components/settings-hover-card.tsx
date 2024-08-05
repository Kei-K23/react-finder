import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import useClientCheck from "@/hooks/use-client-check";
import { Button } from "./ui/button";
import Link from "next/link";

export default function SettingsHoverCard() {
  const { isClient } = useClientCheck();
  if (!isClient) {
    return null;
  }
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Button size={"xs"} variant={"glass"}>
          Settings
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="bg-neutral-700 bg-clip-padding backdrop-filter flex items-center flex-col backdrop-blur-xl bg-opacity-100 select-none text-neutral-100 border-gray-500">
        <h3>React Finder</h3>
        <p className="mt-3 text-[14px] text-center">
          Recreating Mac OS file explore &apos;Finder&apos; 🗂️ but this one is
          for web with the power of NextJS, TailwindCSS and ShadcnUI.
        </p>
        <p className="text-[13px] mt-3">
          Create 💙 with by{" "}
          <Link
            href={"https://github.com/Kei-K23"}
            target="_blank"
            className="text-blue-400 hover:underline font-bold"
          >
            Kei
          </Link>
        </p>
      </HoverCardContent>
    </HoverCard>
  );
}
