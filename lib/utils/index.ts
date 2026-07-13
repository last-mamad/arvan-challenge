import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// tailwind-merge doesn't know about the project's custom composite `text-*`
// typography tokens (tokens/typography-tokens.json -> app/globals.css), so it
// falls back to bucketing them with `text-color` utilities and drops whichever
// one comes last in the class string. Registering them under `font-size`
// keeps them from colliding with color classes like `text-neutral-fg2`.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "title3",
            "body1",
            "body2",
            "body2-strong",
            "caption1",
            "caption1-strong",
            "caption2",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
