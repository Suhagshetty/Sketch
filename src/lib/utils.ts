import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const combinedSlug = (name: string, maxlLen = 80): string => {
  const base = name;
  if (!base) return "untitled";
  let s = base
    .normalize("NFKD")
    .replace(/\p{M}+/gu, "")
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9\-]+/g, "");
  if (!s) return "untitled";
  if (s.length > maxlLen) s = s.slice(0, maxlLen);
  return s;
};
