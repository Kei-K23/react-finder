import React from "react";
import { FaApple } from "react-icons/fa";
import CurrentTime from "./current-time";

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
        <FaApple className="text-neutral-100 size-5" />
        <CurrentTime />
      </div>
    </div>
  );
}
