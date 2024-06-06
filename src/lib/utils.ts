import Cite from "citation-js";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateBibliography = async (value: string, template: string) => {
  // @ts-ignore
  let cite = new Cite(value);
  const bibliography = cite.format("bibliography", {
    format: "html",
    template: template,
    lang: "en-US",
  });

  return bibliography;
};
