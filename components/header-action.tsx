import React from "react";
import { FaApple } from "react-icons/fa";
import CurrentTime from "./current-time";
import Battery from "./battery";
import AboutHoverCard from "./about-hover-card";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import SettingsHoverCard from "./settings-hover-card";

type HeaderActonProps = {
  headerRef: React.MutableRefObject<HTMLDivElement | null>;
};

export default function HeaderActon({ headerRef }: HeaderActonProps) {
  return (
    <div
      ref={headerRef}
      className="fixed top-0 left-[50%] -translate-x-[50%] w-full h-[38px] px-8 py-2 z-10 bg-gray-700 bg-clip-padding backdrop-filter flex items-center backdrop-blur-xl bg-opacity-50 select-none"
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3 text-neutral-100">
          <FaApple className="text-neutral-100 size-5" />
          <AboutHoverCard />
          <SettingsHoverCard />
          <Link
            href={"https://github.com/Kei-K23/react-finder"}
            target="_blank"
            className={cn(
              buttonVariants({
                size: "xs",
                variant: "glass",
              })
            )}
          >
            GitHub
          </Link>
        </div>
        <div className="flex items-center gap-4 text-neutral-100">
          <Battery />
          <CurrentTime />
        </div>
      </div>
    </div>
  );
}
