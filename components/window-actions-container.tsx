import React from "react";
import { Button } from "./ui/button";
import { Expand, Minus, X } from "lucide-react";

export default function WindowActionsContainer() {
  return (
    <div className="mb-4 flex items-center gap-x-1">
      <Button size={"xsm"} variant={"destructive"} className="group">
        <X className="size-[14px] hidden group-hover:block" />
        <div className="size-[14px] block group-hover:hidden" />
      </Button>
      <Button size={"xsm"} variant={"warning"} className="group">
        <Minus className="size-[14px] hidden group-hover:block" />
        <div className="size-[14px] block group-hover:hidden" />
      </Button>
      <Button size={"xsm"} variant={"success"} className="group">
        <Expand className="size-[14px] hidden group-hover:block" />
        <div className="size-[14px] block group-hover:hidden" />
      </Button>
    </div>
  );
}
