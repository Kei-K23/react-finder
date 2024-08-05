import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import useClientCheck from "@/hooks/use-client-check";
import { Button } from "./ui/button";
import { AVAILABLE_WALLPAPERS } from "@/constant";
import { cn } from "@/lib/utils";
import { useSettingsStore } from "@/store/use-settings-store";

export default function SettingsHoverCard() {
  const { wallpaper: currentWallpaper, setWallpaper } = useSettingsStore();
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
      <HoverCardContent className="bg-neutral-700 bg-clip-padding backdrop-filter flex flex-col backdrop-blur-xl bg-opacity-100 select-none text-neutral-100 border-gray-500">
        <h3 className="select-none">Settings</h3>

        <p className="mt-3 text-[14px] select-none">Wallpapers</p>
        <div className="flex justify-evenly w-full select-none space-x-2 mt-2">
          {AVAILABLE_WALLPAPERS.map((wallpaper) => (
            <img
              key={wallpaper}
              src={wallpaper}
              alt="available wallpaper image"
              className={cn(
                "cursor-pointer w-[60px] h-[60px] rounded-full select-none object-cover select-none",
                currentWallpaper === wallpaper && "border-[2px] border-blue-500"
              )}
              onClick={() => setWallpaper(wallpaper)}
            />
          ))}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
