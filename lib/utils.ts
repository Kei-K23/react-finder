import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateRightPanelDefaultSize(width: number) {
  if (width <= 800) {
    return 20;
  } else if (width > 800) {
    return 10;
  } else {
    return 20;
  }
}
