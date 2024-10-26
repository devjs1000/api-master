import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const join_class: JoinClass = (...inputs) => {
  return twMerge(clsx(inputs));
};
type JoinClass = (...params: ClassValue[]) => string;

export { join_class };