import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ActionTooltipProps = {
  children: React.ReactNode;
  title: string;
  offSet?: number;
};

export default function ActionTooltip({
  children,
  title,
  offSet,
}: ActionTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          sideOffset={offSet}
          className="bg-gray-700 bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-70 border border-gray-500 text-neutral-100"
        >
          <p>{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
