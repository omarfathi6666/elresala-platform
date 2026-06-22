import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes safely.
 * Used across the entire application.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}